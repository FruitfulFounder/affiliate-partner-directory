import {safeUrl} from '../src/render.mjs';
// Explicit adapter contracts. These descriptors never load third-party scripts.
export function bookingModule(config){return {enabled:Boolean(safeUrl(config.url)),url:safeUrl(config.url),mode:'external-scheduler'}}
export function paymentModule(config){const url=safeUrl(config.url);return {enabled:config.enabled===true&&Boolean(url)&&new URL(url).hostname==='buy.stripe.com',url,mode:'stripe-hosted-checkout'}}
export function chatModule(config){return {enabled:config.enabled===true&&Boolean(safeUrl(config.url)),url:safeUrl(config.url),requirements:['approved knowledge','human handoff','privacy review','provider testing']}}
export function automationEvent(lead){return {type:'lead.received',version:1,data:{name:lead.name,email:lead.email,service:lead.service},occurredAt:new Date().toISOString()}}
export const dashboardModule={enabled:false,requirements:['authentication','authorization per customer','data retention policy','server-side data adapter']};
