import {cp,mkdir,writeFile,access} from 'node:fs/promises';import path from 'node:path';
const [destination,name]=process.argv.slice(2);if(!destination||!name)throw Error('Usage: node scripts/new-client.mjs /absolute/new-directory "Business name"');
const target=path.resolve(destination);try{await access(target);throw Error('Destination already exists; refusing overwrite.')}catch(e){if(e.code!=='ENOENT')throw e}
await mkdir(target,{recursive:true});
for(const item of ['src','public','scripts','api','.env.example','integrations','tests','package.json','package-lock.json','vite.config.js','eslint.config.js','index.html','AGENTS.md','PROJECT_BLUEPRINT.md','README.md','.gitignore'])await cp(new URL('../'+item,import.meta.url),path.join(target,item),{recursive:true});
await writeFile(path.join(target,'CLIENT_START.md'),`# ${name}\n\nThis is source scaffolding, not a finished customer site. Replace AvaraPath copy, logos, examples, metadata and favicon. Write a distinct design brief, composition and stylesheet. Configure only authorized integrations. See PROJECT_BLUEPRINT.md.\n`);
console.log('Created isolated customer source at '+target);
