export function initializeInteractions(root) {
 const controller = new AbortController(); const { signal } = controller;
 const menu=root.querySelector('.menu-button');const nav=root.querySelector('#navigation');
 const closeMenu=()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open')};
 root.addEventListener('click',e=>{
  if(e.target.closest('.menu-button')){const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open)}
  if(e.target.closest('#navigation a'))closeMenu();
  const intent=e.target.closest('[data-intent]');if(intent)root.querySelector('[name="service"]').value=intent.dataset.intent;
 },{signal});
 root.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus()}},{signal});
 const form=root.querySelector('#quote-form');
 form?.addEventListener('submit',async e=>{
  e.preventDefault();if(!form.reportValidity())return;
  const status=root.querySelector('#form-status'),button=form.querySelector('button'),data=Object.fromEntries(new FormData(form));
  if(data.website){status.textContent='Unable to prepare this inquiry.';return}
  button.disabled=true;
  try{
   if(form.dataset.endpoint){
    const response=await fetch(form.dataset.endpoint,{method:'POST',body:JSON.stringify(data),headers:{'Content-Type':'application/json'},signal:AbortSignal.any([signal,AbortSignal.timeout(15000)])});
    if(!response.ok)throw Error('Submission failed');
    status.textContent='Your inquiry was accepted by the configured service.';form.reset();
   }else{
    const text=`AVARAPATH PROJECT INQUIRY\n\nName: ${data.name}\nEmail: ${data.email}\nBusiness: ${data.business||'Not provided'}\nService: ${data.service}\n\n${data.message}\n\nPrepared locally. This inquiry has NOT been sent.\n`;
    const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='avarapath-inquiry.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    status.textContent='Your inquiry file is ready. It has not been sent to AvaraPath. Keep it for your consultation.';
   }
  }catch{if(!signal.aborted)status.textContent='Your inquiry could not be confirmed. Your details remain here; please try again later.'}finally{button.disabled=false}
 },{signal});
 return ()=>controller.abort();
}
