import {initializeAssistant} from './assistant.mjs';
import {initializeContact} from './contact-client.mjs';
export function initializeInteractions(root,c) {
 const controller=new AbortController(),{signal}=controller;
 if(root.querySelector('[data-demo]')){
  root.querySelector('.demo-form')?.addEventListener('submit',ev=>{ev.preventDefault();const form=ev.currentTarget;if(form.reportValidity())form.querySelector('.demo-form-status').textContent='Demo validation complete. Nothing was sent and no appointment was booked. For a real project, contact AvaraPath.'},{signal});
  root.querySelector('[data-demo-appointment]')?.addEventListener('click',()=>{const select=root.querySelector('select');select.selectedIndex=select.options.length-1},{signal});
  return ()=>controller.abort();
 }
 const menu=root.querySelector('.menu-button'),nav=root.querySelector('#navigation');
 const closeMenu=()=>{menu?.setAttribute('aria-expanded','false');nav?.classList.remove('is-open')};
 root.addEventListener('click',ev=>{
  if(ev.target.closest('.menu-button')){const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open)}
  if(ev.target.closest('#navigation a'))closeMenu();
  const intent=ev.target.closest('[data-intent]');const select=root.querySelector('#quote-form [name="service"]');if(intent&&select)select.value=intent.dataset.intent;
 },{signal});
 root.addEventListener('keydown',ev=>{if(ev.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus()}},{signal});
 initializeAssistant(root,c,signal);const cleanup=initializeContact(root,signal);
 return ()=>{controller.abort();cleanup()};
}
