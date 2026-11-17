import {createProviderHandler} from './providers.mjs';
// Vercel Node function. Never trusts a client-supplied internal IP header.
export default async function contact(req,res){
 try{
  const env=process.env;const headers=new Headers();for(const [key,value] of Object.entries(req.headers))if(value!==undefined)headers.set(key,Array.isArray(value)?value.join(','):value);
  headers.set('x-inquiry-client-ip',env.VERCEL?(String(req.headers['x-vercel-forwarded-for']||'unknown').split(',')[0].trim()):req.socket?.remoteAddress||'local');
  let body;
  if(req.method==='POST'){
   if(req.body!==undefined)body=typeof req.body==='string'?req.body:JSON.stringify(req.body);
   else{const chunks=[];let size=0;for await(const chunk of req){size+=Buffer.byteLength(chunk);if(size>16000){res.statusCode=413;res.end(JSON.stringify({error:'Request too large.'}));return}chunks.push(Buffer.from(chunk))}body=Buffer.concat(chunks)}
   if(Buffer.byteLength(body)>16000){res.statusCode=413;res.end(JSON.stringify({error:'Request too large.'}));return}
  }
  const response=await createProviderHandler({env})(new Request('https://inquiry.internal/api/contact',{method:req.method,headers,...(body!==undefined?{body}:{} )}));
  res.statusCode=response.status;response.headers.forEach((value,key)=>res.setHeader(key,value));res.end(await response.text());
 }catch{res.statusCode=502;res.setHeader('Content-Type','application/json');res.end(JSON.stringify({error:'Your inquiry could not be confirmed. Please try again or use email.'}))}
}
