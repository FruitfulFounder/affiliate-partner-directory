export const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function safeUrl(value){if(!value)return null;try{const u=new URL(value);return u.protocol==='https:'?u.href:null}catch{return null}}
export function contactEndpoint(value){return value==='/api/contact'?value:safeUrl(value)}
export const arrow='<svg class="arrow-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M5 19 19 5M5 5h14v14"/></svg>';
