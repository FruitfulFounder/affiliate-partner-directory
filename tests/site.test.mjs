import test from 'node:test';import assert from 'node:assert/strict';import config from '../src/config.mjs';import {render,safeUrl} from '../src/render.mjs';import {createContactHandler,validateInquiry} from '../integrations/contact.mjs';import {paymentModule,bookingModule} from '../integrations/modules.mjs';
const valid={name:'Test User',email:'test@example.com',message:'A sample project inquiry with enough detail.',consent:'on'};
test('every local anchor resolves and IDs are unique',()=>{const html=render(config);const ids=[...html.matchAll(/id="([^"]+)"/g)].map(x=>x[1]);assert.equal(ids.length,new Set(ids).size);for(const [,id]of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(id),id)});
test('review contains honest integration states and no membership checkout',()=>{const h=render(config);assert.match(h,/inquiries are not sent/);assert.match(h,/not client projects/);assert.match(h,/noindex/);assert.doesNotMatch(h,/\$49|buy.stripe.com|<iframe|<script src="https:/)});
test('brand text is escaped and service sections are configurable',()=>{const c=structuredClone(config);c.brand.name='<script>alert(1)</script>';c.sections=['hero'];const h=render(c);assert.ok(!h.includes('<script>alert'));assert.ok(!h.includes('id="services"'));assert.match(h,/&lt;script&gt;/)});
test('external URLs require https and Stripe host is restricted',()=>{assert.equal(safeUrl('javascript:alert(1)'),null);assert.equal(safeUrl('http://example.com'),null);assert.equal(paymentModule({enabled:true,url:'https://evil.example'}).enabled,false);assert.equal(paymentModule({enabled:true,url:'https://buy.stripe.com/test'}).enabled,true);assert.equal(bookingModule({url:null}).enabled,false)});
test('validates consent, email, content and honeypot',()=>{assert.equal(validateInquiry(valid),null);for(const d of [{...valid,email:'invalid'},{...valid,consent:false},{...valid,website:'spam'},{...valid,message:'short'}])assert.ok(validateInquiry(d))});
const request=(data=valid,origin='https://example.com')=>new Request('https://example.com/api/contact',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(data)});
test('unconfigured adapter never claims delivery',async()=>assert.equal((await createContactHandler({})(request())).status,503));
test('adapter enforces origin, spam and rate limit before delivery',async()=>{let delivered=0;const base={origin:'https://example.com',verifySpam:async()=>true,rateLimit:async()=>true,deliver:async()=>{delivered++}};const handler=createContactHandler(base);assert.equal((await handler(request(valid,'https://evil.example'))).status,403);assert.equal(delivered,0);assert.equal((await handler(request())).status,202);assert.equal(delivered,1);assert.equal((await createContactHandler({...base,rateLimit:async()=>false})(request())).status,429);assert.equal((await createContactHandler({...base,verifySpam:async()=>false})(request())).status,403);assert.equal(delivered,1)});
test('adapter does not report success on provider failure or malformed body',async()=>{const handler=createContactHandler({origin:'https://example.com',verifySpam:async()=>true,rateLimit:async()=>true,deliver:async()=>{throw Error('provider')}});assert.equal((await handler(request())).status,502);assert.equal((await handler(request({...valid,message:'x'.repeat(17000)}))).status,413)});

test('integration uses original logos and leaves membership source out of build entry',async()=>{
 const {readFile}=await import('node:fs/promises');
 assert.match(render(config),/\/images\/brand\/avarapath-header-logo.png/);
 const app=await readFile(new URL('../src/App.jsx',import.meta.url),'utf8');
 assert.doesNotMatch(app,/MEMBERSHIP_PAYMENT_URL|buy\.stripe|TALLY_FORM_URL/);
 const index=await readFile(new URL('../index.html',import.meta.url),'utf8');
 assert.match(index,/avarapath-icon-only.png/);assert.match(index,/noindex/);
 const {scripts}=JSON.parse(await readFile(new URL('../package.json',import.meta.url),'utf8'));
 assert.equal(scripts.build,'vite build');
});
