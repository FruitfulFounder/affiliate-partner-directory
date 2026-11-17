let scriptPromise;
function loadTurnstile(){if(window.turnstile)return Promise.resolve();if(!scriptPromise)scriptPromise=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;script.onload=resolve;script.onerror=()=>{scriptPromise=null;script.remove();reject(Error('Spam protection unavailable'))};document.head.append(script)});return scriptPromise}
export function initializeContact(root,signal){
 const form=root.querySelector('#quote-form');if(!form)return ()=>{};
 const status=root.querySelector('#form-status'),button=form.querySelector('[type="submit"]'),availability=root.querySelector('#contact-availability'),detail=root.querySelector('#contact-availability-detail'),retry=root.querySelector('.retry-contact'),challenge=root.querySelector('#spam-challenge');
 let ready=false,token='',widget=null,checking=false;
 const unavailable=(message)=>{ready=false;button.disabled=true;availability.textContent='Online inquiries are not connected yet';detail.textContent=message||'Please use the email link to send an inquiry through your own mail app. Nothing has been submitted.';retry.hidden=false};
 const connect=async()=>{
  if(checking)return;checking=true;retry.hidden=true;button.disabled=true;
  try{
   if(!form.dataset.endpoint)throw Error('No endpoint');
   const response=await fetch(form.dataset.endpoint,{signal:AbortSignal.any([signal,AbortSignal.timeout(10000)]),headers:{Accept:'application/json'}});const data=await response.json();
   if(!response.ok||data.ready!==true||!data.siteKey){unavailable();return}
   await loadTurnstile();if(signal.aborted)return;
   if(widget!==null)window.turnstile.remove(widget);
   widget=window.turnstile.render(challenge,{sitekey:data.siteKey,action:'inquiry',callback:value=>{token=value;button.disabled=!ready},'expired-callback':()=>{token='';button.disabled=true},'error-callback':()=>{token='';button.disabled=true;status.textContent='Spam verification could not load. Retry the connection or use email.';retry.hidden=false}});
   ready=true;availability.textContent='Send a project inquiry';detail.textContent='Complete the form and spam verification. We confirm acceptance by the email provider before showing success.';button.disabled=!token;
  }catch{if(!signal.aborted)unavailable('We could not connect to the inquiry service. Your details have not been sent. Use the email link, or retry.')}finally{checking=false}
 };
 retry.addEventListener('click',connect,{signal});connect();
 form.addEventListener('submit',async ev=>{
  ev.preventDefault();if(!form.reportValidity())return;if(!ready||!token){status.textContent='Complete spam verification, or use the email link if inquiries are unavailable.';return}
  const data=Object.fromEntries(new FormData(form));if(data.website){status.textContent='Unable to submit this inquiry.';return}data.spamToken=token;button.disabled=true;button.textContent='Sending…';status.textContent='';
  try{
   const response=await fetch(form.dataset.endpoint,{method:'POST',body:JSON.stringify(data),headers:{'Content-Type':'application/json'},signal:AbortSignal.any([signal,AbortSignal.timeout(20000)])});const result=await response.json();
   if(!response.ok||result.accepted!==true)throw Error(response.status===429?'Please wait a minute before trying again.':response.status===503?'Online inquiries are not connected. Please use the email link.':'Your inquiry could not be confirmed. Your details remain here; please retry or use email.');
   status.textContent='Your inquiry was accepted by our email provider. We’ll reply to the email you provided. This does not confirm an appointment.';form.reset();
  }catch(error){if(!signal.aborted)status.textContent=error.name==='TimeoutError'?'No confirmation was received. Your inquiry may have been accepted; please check before resending.':error.message}
  finally{button.textContent='Send inquiry';token='';button.disabled=true;if(!signal.aborted&&widget!==null&&window.turnstile)window.turnstile.reset(widget)}
 },{signal});
 return ()=>{if(widget!==null&&window.turnstile)window.turnstile.remove(widget)};
}
