// Deployment adapter: bind this handler to /api/contact on a Worker/serverless host.
// Unconfigured handlers reject submissions. Secrets belong in host environment variables.
export function validateInquiry(d){
 if(!d||typeof d!=='object')return 'Invalid inquiry.';
 if(d.website)return 'Spam rejected.';
 if(typeof d.name!=='string'||d.name.trim().length<1||d.name.length>120)return 'Name is required.';
 if(typeof d.email!=='string'||d.email.length>254||!/^\S+@\S+\.\S+$/.test(d.email))return 'Valid email required.';
 if(typeof d.message!=='string'||d.message.trim().length<20||d.message.length>5000)return 'Message must contain 20–5000 characters.';
 if(d.business&& (typeof d.business!=='string'||d.business.length>160))return 'Invalid business name.';
 if(d.service&& (typeof d.service!=='string'||d.service.length>120))return 'Invalid service.';
 if(!['on',true].includes(d.consent))return 'Consent is required.';
 return null;
}
export function createContactHandler({origin,verifySpam,rateLimit,deliver}){
 const reply=(status,error)=>Response.json(error?{error}:{accepted:true},{status});
 return async request=>{
 if(request.method!=='POST')return reply(405,'Method not allowed.');
 if(!origin||!verifySpam||!rateLimit||!deliver)return reply(503,'Inquiry service is not configured.');
 if(request.headers.get('Origin')!==origin)return reply(403,'Origin rejected.');
 if(!request.headers.get('Content-Type')?.startsWith('application/json'))return reply(415,'JSON required.');
 // Read through a bounded stream to avoid trusting Content-Length.
 const reader=request.body?.getReader();if(!reader)return reply(400,'Body required.');let size=0,chunks=[];
 while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>16000){await reader.cancel();return reply(413,'Request too large.')}chunks.push(value)}
 let d;try{const all=new Uint8Array(size);let offset=0;for(const chunk of chunks){all.set(chunk,offset);offset+=chunk.length}d=JSON.parse(new TextDecoder().decode(all))}catch{return reply(400,'Invalid JSON.')}
 const error=validateInquiry(d);if(error)return reply(400,error);
 try{
 if(!await rateLimit(request))return reply(429,'Try again later.');
 if(!await verifySpam(d,request))return reply(403,'Spam verification failed.');
 // No user-controlled recipient, headers, or arbitrary event fields.
 await deliver({name:d.name.trim(),email:d.email.trim(),business:d.business||'',service:d.service||'',message:d.message.trim(),consent:true});
 return reply(202);
 }catch{return reply(502,'Inquiry could not be confirmed.')}
 };
}
