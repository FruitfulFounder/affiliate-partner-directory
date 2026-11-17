import {createHash} from 'node:crypto';
import {createContactHandler} from './contact.mjs';
import config from '../src/config.mjs';
const required=['RESEND_API_KEY','CONTACT_FROM_EMAIL','TURNSTILE_SECRET_KEY','TURNSTILE_SITE_KEY','UPSTASH_REDIS_REST_URL','UPSTASH_REDIS_REST_TOKEN'];
export function providerStatus(env){return {ready:required.every(k=>Boolean(env[k])),siteKey:required.every(k=>Boolean(env[k]))?env.TURNSTILE_SITE_KEY:null}}
export function allowedOrigins(env){return [...(env.CONTACT_ALLOWED_ORIGINS||'').split(',').map(s=>s.trim()).filter(Boolean),...(env.VERCEL_URL?['https://'+env.VERCEL_URL]:[]),...(env.NODE_ENV!=='production'&&!env.VERCEL?['http://localhost:5173','http://127.0.0.1:5173']:[])];}
export function createProviderHandler({env,fetcher=fetch}){
 const fetchJSON=async(url,options)=>{const response=await fetcher(url,{...options,signal:AbortSignal.timeout(10000)});if(!response.ok)throw Error('Provider unavailable');return response.json()};
 return async request=>{
  if(request.method==='GET')return Response.json(providerStatus(env),{headers:{'Cache-Control':'no-store'}});
  if(request.method!=='POST')return Response.json({error:'Method not allowed.'},{status:405,headers:{Allow:'GET, POST'}});
  if(!providerStatus(env).ready)return Response.json({error:'Online inquiries are not connected. Please use the email link.'},{status:503});
  const origin=request.headers.get('Origin');if(!allowedOrigins(env).includes(origin))return Response.json({error:'Origin rejected.'},{status:403});
  const rateUrl=new URL(env.UPSTASH_REDIS_REST_URL);if(rateUrl.protocol!=='https:')return Response.json({error:'Inquiry service is not configured securely.'},{status:503});
  const ip=request.headers.get('x-inquiry-client-ip')||'unknown';
  const handler=createContactHandler({origin,
   rateLimit:async()=>{
    const digest=createHash('sha256').update(env.UPSTASH_REDIS_REST_TOKEN+'|'+ip).digest('hex');
    const body=await fetchJSON(rateUrl.href,{method:'POST',headers:{Authorization:'Bearer '+env.UPSTASH_REDIS_REST_TOKEN,'Content-Type':'application/json'},body:JSON.stringify(['SET','avarapath:inquiry:'+digest,'1','EX',60,'NX'])});
    if(body.error||!Object.hasOwn(body,'result'))throw Error('Rate limiter failed');return body.result==='OK';
   },
   verifySpam:async(data)=>{
    if(typeof data.spamToken!=='string'||data.spamToken.length<1||data.spamToken.length>2048)return false;
    const result=await fetchJSON('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({secret:env.TURNSTILE_SECRET_KEY,response:data.spamToken})});
    return result.success===true&&result.hostname===new URL(origin).hostname&&result.action==='inquiry';
   },
   deliver:async lead=>{
    const result=await fetchJSON('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:env.CONTACT_FROM_EMAIL,to:[env.CONTACT_TO_EMAIL||config.contact.email],reply_to:lead.email,subject:'New website inquiry',text:`Name: ${lead.name}\nEmail: ${lead.email}\nBusiness: ${lead.business}\nService: ${lead.service}\n\n${lead.message}\n\nConsent: inquiry response only.`})});
    if(typeof result.id!=='string'||!result.id)throw Error('No provider confirmation');
   }
  });
  const response=await handler(request);response.headers.set('Cache-Control','no-store');return response;
 };
}
