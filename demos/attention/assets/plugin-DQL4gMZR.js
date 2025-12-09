(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();var qs={ui8:"ui8",ui16:"ui16",i32:"i32",ui32:"ui32",f32:"f32",eid:"eid"},Cd={i8:"Int8",ui8:"Uint8",ui8c:"Uint8Clamped",i16:"Int16",ui16:"Uint16",i32:"Int32",ui32:"Uint32",eid:"Uint32",f32:"Float32",f64:"Float64"},ss={i8:Int8Array,ui8:Uint8Array,ui8c:Uint8ClampedArray,i16:Int16Array,ui16:Uint16Array,i32:Int32Array,ui32:Uint32Array,f32:Float32Array,f64:Float64Array,eid:Uint32Array},Rd={uint8:2**8,uint16:2**16},b0=e=>t=>Math.ceil(t/e)*e,E0=b0(4),w0=Symbol("storeRef"),Zu=Symbol("storeSize"),T0=Symbol("storeMaps"),ls=Symbol("storeFlattened"),Ka=Symbol("storeBase"),A0=Symbol("storeType"),hg=Symbol("storeArrayElementCounts"),Fc=Symbol("storeSubarrays"),dg=Symbol("subarrayCursors"),C0=Symbol("subarray"),ju=Symbol("parentArray"),pg=Symbol("tagStore"),Pd=Symbol("indexType"),Ud=Symbol("indexBytes"),mg=Symbol("isEidType"),Wi={},R0=(e,t)=>{if(ArrayBuffer.isView(e))e[t]=e.slice(0);else{const n=e[ju].slice(0);e[t]=e.map((i,r)=>{const{length:s}=e[r],o=s*r,a=o+s;return n.subarray(o,a)})}},gg=(e,t)=>{e[ls]&&e[ls].forEach(n=>{ArrayBuffer.isView(n)?n[t]=0:n[t].fill(0)})},P0=(e,t)=>{const n=t*ss[e].BYTES_PER_ELEMENT,i=new ArrayBuffer(n),r=new ss[e](i);return r[mg]=e===qs.eid,r},U0=(e,t,n)=>{const i=e[Zu],r=Array(i).fill(0);r[A0]=t,r[mg]=t===qs.eid;const s=e[dg],o=n<=Rd.uint8?qs.ui8:n<=Rd.uint16?qs.ui16:qs.ui32;if(!n)throw new Error("bitECS - Must define component array length");if(!ss[t])throw new Error(`bitECS - Invalid component array property type ${t}`);if(!e[Fc][t]){const l=e[hg][t],u=new ss[t](E0(l*i));u[Pd]=Cd[o],u[Ud]=ss[o].BYTES_PER_ELEMENT,e[Fc][t]=u}const a=s[t],c=a+i*n;s[t]=c,r[ju]=e[Fc][t].subarray(a,c);for(let l=0;l<i;l++){const u=n*l,f=u+n;r[l]=r[ju].subarray(u,f),r[l][Pd]=Cd[o],r[l][Ud]=ss[o].BYTES_PER_ELEMENT,r[l][C0]=!0}return r},Dd=e=>Array.isArray(e)&&typeof e[0]=="string"&&typeof e[1]=="number",D0=(e,t)=>{const n=Symbol("store");if(!e||!Object.keys(e).length)return Wi[n]={[Zu]:t,[pg]:!0,[Ka]:()=>Wi[n]},Wi[n];e=JSON.parse(JSON.stringify(e));const i={},r=o=>{const a=Object.keys(o);for(const c of a)Dd(o[c])?(i[o[c][0]]||(i[o[c][0]]=0),i[o[c][0]]+=o[c][1]):o[c]instanceof Object&&r(o[c])};r(e);const s={[Zu]:t,[T0]:{},[Fc]:{},[w0]:n,[dg]:Object.keys(ss).reduce((o,a)=>({...o,[a]:0}),{}),[ls]:[],[hg]:i};if(e instanceof Object&&Object.keys(e).length){const o=(a,c)=>{if(typeof a[c]=="string")a[c]=P0(a[c],t),a[c][Ka]=()=>Wi[n],s[ls].push(a[c]);else if(Dd(a[c])){const[l,u]=a[c];a[c]=U0(s,l,u),a[c][Ka]=()=>Wi[n],s[ls].push(a[c])}else a[c]instanceof Object&&(a[c]=Object.keys(a[c]).reduce(o,a[c]));return a};return Wi[n]=Object.assign(Object.keys(e).reduce(o,e),s),Wi[n][Ka]=()=>Wi[n],Wi[n]}},ta=()=>{const e=[],t=[];e.sort=function(o){const a=Array.prototype.sort.call(this,o);for(let c=0;c<e.length;c++)t[e[c]]=c;return a};const n=o=>e[t[o]]===o;return{add:o=>{n(o)||(t[o]=e.push(o)-1)},remove:o=>{if(!n(o))return;const a=t[o],c=e.pop();c!==o&&(e[a]=c,t[c]=a)},has:n,sparse:t,dense:e,reset:()=>{e.length=0,t.length=0}}},ir=Symbol("entityMasks"),Na=Symbol("entityComponents"),rr=Symbol("entitySparseSet"),ca=Symbol("entityArray"),I0=1e5,qu=0,_g=I0,_h=()=>_g,ea=[],L0=.01,F0=L0,N0=()=>qu,O0=new Map,k0=e=>{const t=e[Mh]?ea.length?ea.shift():qu++:ea.length>Math.round(_g*F0)?ea.shift():qu++;if(t>e[Sh])throw new Error("bitECS - max entities reached");return e[rr].add(t),O0.set(t,e),e[vh].forEach(n=>{_l(e,n,t)&&vl(n,t)}),e[Na].set(t,new Set),t},vg=(e,t)=>{if(e[rr].has(t)){e[gl].forEach(n=>{yh(e,n,t)}),e[Mh]||ea.push(t),e[rr].remove(t),e[Na].delete(t),e[xg].delete(e[Ju].get(t)),e[Ju].delete(t);for(let n=0;n<e[ir].length;n++)e[ir][n][t]=0}},z0=(e,t)=>e[rr].has(t),B0=Symbol("$modifier"),gl=Symbol("queries"),vh=Symbol("notQueries"),G0=Symbol("queryAny"),V0=Symbol("queryAll"),H0=Symbol("queryNone"),Kc=Symbol("queryMap"),la=Symbol("$dirtyQueries"),yg=Symbol("queryComponents"),W0=(e,t)=>{const n=[],i=[],r=[];t[yg].forEach(T=>{if(typeof T=="function"&&T[B0]){const[b,w]=T();e[zi].has(b)||Ku(e,b),w==="not"&&i.push(b),w==="changed"&&(r.push(b),n.push(b))}else e[zi].has(T)||Ku(e,T),n.push(T)});const s=T=>e[zi].get(T),o=n.concat(i).map(s),a=ta(),c=[],l=[],u=ta(),f=ta(),h=ta(),d=o.map(T=>T.generationId).reduce((T,b)=>(T.includes(b)||T.push(b),T),[]),m=(T,b)=>(T[b.generationId]||(T[b.generationId]=0),T[b.generationId]|=b.bitflag,T),_=n.map(s).reduce(m,{}),g=i.map(s).reduce(m,{}),p=o.reduce(m,{}),y=n.filter(T=>!T[pg]).map(T=>Object.getOwnPropertySymbols(T).includes(ls)?T[ls]:[T]).reduce((T,b)=>T.concat(b),[]),v=Object.assign(a,{archetypes:c,changed:l,components:n,notComponents:i,changedComponents:r,allComponents:o,masks:_,notMasks:g,hasMasks:p,generations:d,flatProps:y,toRemove:u,entered:f,exited:h,shadows:[]});e[Kc].set(t,v),e[gl].add(v),o.forEach(T=>{T.queries.add(v)}),i.length&&e[vh].add(v);for(let T=0;T<N0();T++){if(!e[rr].has(T))continue;_l(e,v,T)&&vl(v,T)}},$0=(e,t)=>{const n=Symbol(),i=e.flatProps[t];return R0(i,n),e.shadows[t]=i[n],i[n]},X0=(e,t)=>{t&&(e.changed=[]);const{flatProps:n,shadows:i}=e;for(let r=0;r<e.dense.length;r++){const s=e.dense[r];let o=!1;for(let a=0;a<n.length;a++){const c=n[a],l=i[a]||$0(e,a);if(ArrayBuffer.isView(c[s])){for(let u=0;u<c[s].length;u++)if(c[s][u]!==l[s][u]){o=!0;break}l[s].set(c[s])}else c[s]!==l[s]&&(o=!0,l[s]=c[s])}o&&e.changed.push(s)}return e.changed},ee=(...e)=>{let t,n,i,r;if(Array.isArray(e[0])&&(t=e[0]),t===void 0||t[zi]!==void 0)return o=>o?o[ca]:t[ca];const s=function(o,a=!0){o[Kc].has(s)||W0(o,s);const c=o[Kc].get(s);return Z0(o),c.changedComponents.length?X0(c,a):c.dense};return s[yg]=t,s[G0]=n,s[V0]=i,s[H0]=r,s},_l=(e,t,n)=>{const{masks:i,notMasks:r,generations:s}=t;for(let o=0;o<s.length;o++){const a=s[o],c=i[a],l=r[a],u=e[ir][a][n];if(l&&(u&l)!==0||c&&(u&c)!==c)return!1}return!0},vl=(e,t)=>{e.toRemove.remove(t),e.entered.add(t),e.add(t)},Y0=e=>{for(let t=e.toRemove.dense.length-1;t>=0;t--){const n=e.toRemove.dense[t];e.toRemove.remove(n),e.remove(n)}},Z0=e=>{e[la].size&&(e[la].forEach(Y0),e[la].clear())},yh=(e,t,n)=>{!t.has(n)||t.toRemove.has(n)||(t.toRemove.add(n),e[la].add(t),t.exited.add(n))},zi=Symbol("componentMap"),re=(e,t)=>{const n=D0(e,_h());return e&&Object.keys(e).length,n},j0=e=>{e[ua]*=2,e[ua]>=2**31&&(e[ua]=1,e[ir].push(new Uint32Array(e[Sh])))},Ku=(e,t)=>{if(!t)throw new Error("bitECS - Cannot register null or undefined component");const n=new Set,i=new Set,r=new Set;e[gl].forEach(s=>{s.allComponents.includes(t)&&n.add(s)}),e[zi].set(t,{generationId:e[ir].length-1,bitflag:e[ua],store:t,queries:n,notQueries:i,changedQueries:r}),j0(e)},xh=(e,t,n)=>{const i=e[zi].get(t);if(!i)return!1;const{generationId:r,bitflag:s}=i;return(e[ir][r][n]&s)===s},q0=(e,t,n,i=!1)=>{if(n===void 0)throw new Error("bitECS - entity is undefined.");if(!e[rr].has(n))throw new Error("bitECS - entity does not exist in the world.");if(e[zi].has(t)||Ku(e,t),xh(e,t,n))return;const r=e[zi].get(t),{generationId:s,bitflag:o,queries:a,notQueries:c}=r;e[ir][s][n]|=o,a.forEach(l=>{l.toRemove.remove(n);const u=_l(e,l,n);u&&(l.exited.remove(n),vl(l,n)),u||(l.entered.remove(n),yh(e,l,n))}),e[Na].get(n).add(t),i&&gg(t,n)},K0=(e,t,n,i=!0)=>{if(n===void 0)throw new Error("bitECS - entity is undefined.");if(!e[rr].has(n))throw new Error("bitECS - entity does not exist in the world.");if(!xh(e,t,n))return;const r=e[zi].get(t),{generationId:s,bitflag:o,queries:a}=r;e[ir][s][n]&=~o,a.forEach(c=>{c.toRemove.remove(n);const l=_l(e,c,n);l&&(c.exited.remove(n),vl(c,n)),l||(c.entered.remove(n),yh(e,c,n))}),e[Na].get(n).delete(t),i&&gg(t,n)},Sh=Symbol("size"),ua=Symbol("bitflag"),J0=Symbol("archetypes"),xg=Symbol("localEntities"),Ju=Symbol("localEntityLookup"),Mh=Symbol("manualEntityRecycling"),Q0=(...e)=>{const t=typeof e[0]=="object"?e[0]:{},n=typeof e[0]=="number"?e[0]:typeof e[1]=="number"?e[1]:_h();return ty(t,n),t},ty=(e,t=_h())=>(e[Sh]=t,e[ca]&&e[ca].forEach(n=>vg(e,n)),e[ir]=[new Uint32Array(t)],e[Na]=new Map,e[J0]=[],e[rr]=ta(),e[ca]=e[rr].dense,e[ua]=1,e[zi]=new Map,e[Kc]=new Map,e[gl]=new Set,e[vh]=new Set,e[la]=new Set,e[xg]=new Map,e[Ju]=new Map,e[Mh]=!1,e),L=qs;function es(e){return e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").replace(/([A-Z])([A-Z][a-z])/g,"$1-$2").replace(/_/g,"-").replace(/([A-Z]+)/g,t=>t.toLowerCase()).replace(/--+/g,"-").replace(/^-+|-+$/g,"").toLowerCase()}function bh(e){return e.replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}let ey=class{parsers=new Map;componentDefaults={};componentShorthands={};componentEnums={};validations=[];skipProperties={};adapters={};register(t){if(t.parsers)for(const[n,i]of Object.entries(t.parsers)){const r=this.parsers.get(n)||[];r.push(i),this.parsers.set(n,r)}if(t.defaults)for(const[n,i]of Object.entries(t.defaults)){const r=es(n);this.componentDefaults[r]||(this.componentDefaults[r]={}),Object.assign(this.componentDefaults[r],i)}if(t.shorthands)for(const[n,i]of Object.entries(t.shorthands)){const r=es(n);this.componentShorthands[r]||(this.componentShorthands[r]={}),Object.assign(this.componentShorthands[r],i)}if(t.enums)for(const[n,i]of Object.entries(t.enums)){const r=es(n);this.componentEnums[r]||(this.componentEnums[r]={}),Object.assign(this.componentEnums[r],i)}if(t.validations&&this.validations.push(...t.validations),t.skip)for(const[n,i]of Object.entries(t.skip)){const r=es(n);this.skipProperties[r]||(this.skipProperties[r]=new Set);for(const s of i)this.skipProperties[r].add(s)}if(t.adapters)for(const[n,i]of Object.entries(t.adapters)){const r=es(n);this.adapters[r]||(this.adapters[r]={}),Object.assign(this.adapters[r],i)}}getParser(t){const n=this.parsers.get(t);if(!(!n||n.length===0))return n.length===1?n[0]:i=>{for(const r of n)r(i)}}getDefaults(t){return this.componentDefaults[t]||{}}getShorthands(t){return this.componentShorthands[t]||{}}getAllShorthands(){return this.componentShorthands}getEnums(t){return this.componentEnums[t]||{}}getValidations(){return this.validations}shouldSkip(t,n){const i=this.skipProperties[t];return i?i.has(n):!1}getAdapter(t,n){return this.adapters[t]?.[n]}getAdapterProperties(t){const n=this.adapters[t];return n?Object.keys(n):[]}};function Id(e,t,n){for(const[i,r]of Object.entries(n)){const s=e[i];s&&(s[t]=r)}}const Rr=re({entity:L.i32}),xa={FIXED_TIMESTEP:.02,DEFAULT_DELTA:.006944444444444444};function Jc(e,t){const n=new Error(t);return n.type=e,n}function ny(e){if(e.first&&e.last)throw Jc("validation","System cannot have both first and last constraints")}function iy(e,t){const n=e.group??"simulation";if(e.before)for(const i of e.before){if(!t.includes(i))continue;const r=i.group??"simulation";if(r!==n)throw Jc("group-mismatch",`System with before constraint references system in different group (${n} vs ${r})`)}if(e.after)for(const i of e.after){if(!t.includes(i))continue;const r=i.group??"simulation";if(r!==n)throw Jc("group-mismatch",`System with after constraint references system in different group (${n} vs ${r})`)}}function ry(e){const t=new Map;for(const n of e){if(t.has(n)||t.set(n,new Set),n.before)for(const i of n.before)e.includes(i)&&(t.has(i)||t.set(i,new Set),t.get(n).add(i));if(n.after)for(const i of n.after)e.includes(i)&&(t.has(i)||t.set(i,new Set),t.get(i).add(n))}return t}function sy(e){const t=new Set,n=new Set;function i(r){if(n.has(r))return!0;if(t.has(r))return!1;t.add(r),n.add(r);const s=e.get(r);return s?.size&&[...s].some(i)?!0:(n.delete(r),!1)}for(const r of e.keys())if(i(r))throw Jc("circular-dependency","Circular dependency detected in system constraints")}function Zl(e){if(e.length===0)return[];const t=ry(e);sy(t);const n=new Map;for(const s of e)n.set(s,0);for(const s of t.values())for(const o of s)n.set(o,(n.get(o)||0)+1);const i=[],r=[];for(const s of e)n.get(s)===0&&i.push(s);for(;i.length>0;){const s=i.shift();r.push(s);const o=t.get(s)||new Set;for(const a of o){const c=(n.get(a)||0)-1;n.set(a,c),c===0&&i.push(a)}}return r}function oy(e,t,n){const i=n||e;e.forEach(s=>{ny(s),iy(s,i)});const r=e.reduce((s,o)=>{const a=o.first?"first":o.last?"last":"normal";return s[a].push(o),s},{first:[],normal:[],last:[]});return[...Zl(r.first),...Zl(r.normal),...Zl(r.last)]}let ay=class{accumulator=0;setup=new WeakSet;systemGroupCache=new Map;lastSystemsSize=0;getAccumulator(){return this.accumulator}step(t,n=xa.DEFAULT_DELTA){const i=xa.FIXED_TIMESTEP,r=t.time;for(r.deltaTime=n,r.elapsed+=n,this.accumulator+=n,this.runSystemGroup(t,"setup");this.accumulator>=i;)r.deltaTime=i,this.runSystemGroup(t,"fixed"),this.accumulator-=i;r.deltaTime=n,this.runSystemGroup(t,"simulation"),this.runSystemGroup(t,"draw")}runSystemGroup(t,n){const i=this.getSystemsByGroup(t,n);for(const r of i)this.setup.has(r)||(r.setup?.(t),this.setup.add(r)),r.update?.(t)}getSystemsByGroup(t,n){t.systems.size!==this.lastSystemsSize&&(this.systemGroupCache.clear(),this.lastSystemsSize=t.systems.size);const i=n;if(this.systemGroupCache.has(i))return this.systemGroupCache.get(i);const r=Array.from(t.systems),s=r.filter(a=>(a.group??"simulation")===n),o=oy(s,n,r);return this.systemGroupCache.set(i,o),o}};function cy(e,t){const n=[];for(let i=0;i<=t.length;i++)n[i]=[i];for(let i=0;i<=e.length;i++)n[0][i]=i;for(let i=1;i<=t.length;i++)for(let r=1;r<=e.length;r++)t.charAt(i-1)===e.charAt(r-1)?n[i][r]=n[i-1][r-1]:n[i][r]=Math.min(n[i-1][r-1]+1,n[i][r-1]+1,n[i-1][r]+1);return n[t.length][e.length]}function yl(e,t,n=3){let i=null,r=n+1;for(const s of t){const o=cy(e.toLowerCase(),s.toLowerCase());o<r&&(r=o,i=s)}return r<=n?i:null}function Sa(e,t=5){if(e.length===0)return"none";if(e.length<=t)return e.join(", ");const n=e.slice(0,t),i=e.length-t;return`${n.join(", ")} (+${i} more)`}function Nc(e,t){const n=yl(e,t);let i=`Unknown element <${e}>`;return n&&(i+=` - did you mean <${n}>?`),t.length>0&&(i+=`
  Available recipes: ${Sa(t)}`),i}function ly(e,t,n,i){const r=yl(e,n);let s=`[${t}] Unknown attribute "${e}"`;return r&&(s+=` - did you mean "${r}"?`),i&&i.length>0&&(s+=`
  Shorthands: ${Sa(i)}`),n.length>0&&(s+=`
  Available: ${Sa(n)}`),e.includes("-")&&!r&&(s+=`
  Note: Custom components must be registered before creating the Game instance`),s}function uy(e,t,n,i){const r=i?yl(t,i):null;let s=`[${e}.${t}] ${n}`;return r&&(s+=` - did you mean "${r}"?`),i&&i.length>0&&(s+=`
  Available: ${Sa(i)}`),s}function Ld(e,t,n,i){return`[${e}] Syntax error in "${t}" - ${i}
  Expected: ${n}`}function Eh(e,t,n,i){const r=yl(n,i);let s=`[${e}.${t}] Invalid value "${n}"`;return r&&(s+=` - did you mean "${r}"?`),s+=`
  Valid options: ${Sa(i)}`,s}function Ja(e,t,n,i){return`[${e}.${t}] Type mismatch - expected ${n}, got ${i}`}function Wo(e,t,n,i){return`[${e}.${t}] Wrong number of values - expected ${n}, got ${i}`}function fy(e){const t=[];for(const n in e){if(typeof e[n]=="function"||n.startsWith("_"))continue;const i=n.replace(/([A-Z])/g,"-$1").toLowerCase();t.push(i)}return t}let Sg=class{constructor(t,n){this.state=t,this.ignoreSet=new Set(n?.ignoreUnknownAttributes??[])}ignoreSet;setName(t,n){this.state.setEntityName(t,n)}getEntityByName(t){return this.state.getEntityByName(t)}shouldIgnoreUnknownAttribute(t){return this.ignoreSet.has(t)}};const wh="170",hy=0,Fd=1,dy=2,Mg=1,bg=2,qi=3,Nr=0,On=1,Li=2,Pr=0,eo=1,Nd=2,Od=3,kd=4,py=5,ns=100,my=101,gy=102,_y=103,vy=104,yy=200,xy=201,Sy=202,My=203,Qu=204,tf=205,by=206,Ey=207,wy=208,Ty=209,Ay=210,Cy=211,Ry=212,Py=213,Uy=214,ef=0,nf=1,rf=2,fo=3,sf=4,of=5,af=6,cf=7,Eg=0,Dy=1,Iy=2,Ur=0,Ly=1,Fy=2,Ny=3,Oy=4,ky=5,zy=6,By=7,wg=300,ho=301,po=302,lf=303,uf=304,xl=306,ff=1e3,os=1001,hf=1002,Qn=1003,Gy=1004,Qa=1005,ui=1006,jl=1007,as=1008,sr=1009,Tg=1010,Ag=1011,Ma=1012,Th=1013,_s=1014,Oi=1015,Oa=1016,Ah=1017,Ch=1018,mo=1020,Cg=35902,Rg=1021,Pg=1022,Ci=1023,Ug=1024,Dg=1025,no=1026,go=1027,Rh=1028,Ph=1029,Ig=1030,Uh=1031,Dh=1033,Oc=33776,kc=33777,zc=33778,Bc=33779,df=35840,pf=35841,mf=35842,gf=35843,_f=36196,vf=37492,yf=37496,xf=37808,Sf=37809,Mf=37810,bf=37811,Ef=37812,wf=37813,Tf=37814,Af=37815,Cf=37816,Rf=37817,Pf=37818,Uf=37819,Df=37820,If=37821,Gc=36492,Lf=36494,Ff=36495,Lg=36283,Nf=36284,Of=36285,kf=36286,Vy=3200,Fg=3201,Ng=0,Hy=1,Sr="",ci="srgb",Ao="srgb-linear",Sl="linear",be="srgb",Ds=7680,zd=519,Wy=512,$y=513,Xy=514,Og=515,Yy=516,Zy=517,jy=518,qy=519,zf=35044,Ky=35048,Bd="300 es",Qi=2e3,Qc=2001;class Co{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const yn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Gd=1234567;const fa=Math.PI/180,ba=180/Math.PI;function tr(){const e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(yn[e&255]+yn[e>>8&255]+yn[e>>16&255]+yn[e>>24&255]+"-"+yn[t&255]+yn[t>>8&255]+"-"+yn[t>>16&15|64]+yn[t>>24&255]+"-"+yn[n&63|128]+yn[n>>8&255]+"-"+yn[n>>16&255]+yn[n>>24&255]+yn[i&255]+yn[i>>8&255]+yn[i>>16&255]+yn[i>>24&255]).toLowerCase()}function pn(e,t,n){return Math.max(t,Math.min(n,e))}function Ih(e,t){return(e%t+t)%t}function Jy(e,t,n,i,r){return i+(e-t)*(r-i)/(n-t)}function Qy(e,t,n){return e!==t?(n-e)/(t-e):0}function ha(e,t,n){return(1-n)*e+n*t}function tx(e,t,n,i){return ha(e,t,1-Math.exp(-n*i))}function ex(e,t=1){return t-Math.abs(Ih(e,t*2)-t)}function nx(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function ix(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function rx(e,t){return e+Math.floor(Math.random()*(t-e+1))}function sx(e,t){return e+Math.random()*(t-e)}function ox(e){return e*(.5-Math.random())}function ax(e){e!==void 0&&(Gd=e);let t=Gd+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function cx(e){return e*fa}function lx(e){return e*ba}function ux(e){return(e&e-1)===0&&e!==0}function fx(e){return Math.pow(2,Math.ceil(Math.log(e)/Math.LN2))}function hx(e){return Math.pow(2,Math.floor(Math.log(e)/Math.LN2))}function dx(e,t,n,i,r){const s=Math.cos,o=Math.sin,a=s(n/2),c=o(n/2),l=s((t+i)/2),u=o((t+i)/2),f=s((t-i)/2),h=o((t-i)/2),d=s((i-t)/2),m=o((i-t)/2);switch(r){case"XYX":e.set(a*u,c*f,c*h,a*l);break;case"YZY":e.set(c*h,a*u,c*f,a*l);break;case"ZXZ":e.set(c*f,c*h,a*u,a*l);break;case"XZX":e.set(a*u,c*m,c*d,a*l);break;case"YXY":e.set(c*d,a*u,c*m,a*l);break;case"ZYZ":e.set(c*m,c*d,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ti(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function xe(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}const px={DEG2RAD:fa,RAD2DEG:ba,generateUUID:tr,clamp:pn,euclideanModulo:Ih,mapLinear:Jy,inverseLerp:Qy,lerp:ha,damp:tx,pingpong:ex,smoothstep:nx,smootherstep:ix,randInt:rx,randFloat:sx,randFloatSpread:ox,seededRandom:ax,degToRad:cx,radToDeg:lx,isPowerOfTwo:ux,ceilPowerOfTwo:fx,floorPowerOfTwo:hx,setQuaternionFromProperEuler:dx,normalize:xe,denormalize:Ti};class oe{constructor(t=0,n=0){oe.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,i=this.y,r=t.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(pn(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-t.x,o=this.y-t.y;return this.x=s*i-o*r+t.x,this.y=s*r+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Jt{constructor(t,n,i,r,s,o,a,c,l){Jt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,r,s,o,a,c,l)}set(t,n,i,r,s,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=r,u[2]=a,u[3]=n,u[4]=s,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],f=i[7],h=i[2],d=i[5],m=i[8],_=r[0],g=r[3],p=r[6],y=r[1],x=r[4],v=r[7],T=r[2],b=r[5],w=r[8];return s[0]=o*_+a*y+c*T,s[3]=o*g+a*x+c*b,s[6]=o*p+a*v+c*w,s[1]=l*_+u*y+f*T,s[4]=l*g+u*x+f*b,s[7]=l*p+u*v+f*w,s[2]=h*_+d*y+m*T,s[5]=h*g+d*x+m*b,s[8]=h*p+d*v+m*w,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return n*o*u-n*a*l-i*s*u+i*a*c+r*s*l-r*o*c}invert(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=u*o-a*l,h=a*c-u*s,d=l*s-o*c,m=n*f+i*h+r*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return t[0]=f*_,t[1]=(r*l-u*i)*_,t[2]=(a*i-r*o)*_,t[3]=h*_,t[4]=(u*n-r*c)*_,t[5]=(r*s-a*n)*_,t[6]=d*_,t[7]=(i*c-l*n)*_,t[8]=(o*n-i*s)*_,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-r*l,r*c,-r*(-l*o+c*a)+a+n,0,0,1),this}scale(t,n){return this.premultiply(ql.makeScale(t,n)),this}rotate(t){return this.premultiply(ql.makeRotation(-t)),this}translate(t,n){return this.premultiply(ql.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,i=t.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ql=new Jt;function kg(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function tl(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function mx(){const e=tl("canvas");return e.style.display="block",e}const Vd={};function na(e){e in Vd||(Vd[e]=!0,console.warn(e))}function gx(e,t,n){return new Promise(function(i,r){function s(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:r();break;case e.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function _x(e){const t=e.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function vx(e){const t=e.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const he={enabled:!0,workingColorSpace:Ao,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===be&&(e.r=er(e.r),e.g=er(e.g),e.b=er(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===be&&(e.r=io(e.r),e.g=io(e.g),e.b=io(e.b))),e},fromWorkingColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},toWorkingColorSpace:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===Sr?Sl:this.spaces[e].transfer},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}};function er(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function io(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}const Hd=[.64,.33,.3,.6,.15,.06],Wd=[.2126,.7152,.0722],$d=[.3127,.329],Xd=new Jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yd=new Jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);he.define({[Ao]:{primaries:Hd,whitePoint:$d,transfer:Sl,toXYZ:Xd,fromXYZ:Yd,luminanceCoefficients:Wd,workingColorSpaceConfig:{unpackColorSpace:ci},outputColorSpaceConfig:{drawingBufferColorSpace:ci}},[ci]:{primaries:Hd,whitePoint:$d,transfer:be,toXYZ:Xd,fromXYZ:Yd,luminanceCoefficients:Wd,outputColorSpaceConfig:{drawingBufferColorSpace:ci}}});let Is;class yx{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Is===void 0&&(Is=tl("canvas")),Is.width=t.width,Is.height=t.height;const i=Is.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Is}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=tl("canvas");n.width=t.width,n.height=t.height;const i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=er(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(t.data){const n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(er(n[i]/255)*255):n[i]=er(n[i]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let xx=0;class zg{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:xx++}),this.uuid=tr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Kl(r[o].image)):s.push(Kl(r[o]))}else s=Kl(r);i.url=s}return n||(t.images[this.uuid]=i),i}}function Kl(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?yx.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Sx=0;class Mn extends Co{constructor(t=Mn.DEFAULT_IMAGE,n=Mn.DEFAULT_MAPPING,i=os,r=os,s=ui,o=as,a=Ci,c=sr,l=Mn.DEFAULT_ANISOTROPY,u=Sr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Sx++}),this.uuid=tr(),this.name="",this.source=new zg(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new oe(0,0),this.repeat=new oe(1,1),this.center=new oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==wg)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ff:t.x=t.x-Math.floor(t.x);break;case os:t.x=t.x<0?0:1;break;case hf:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ff:t.y=t.y-Math.floor(t.y);break;case os:t.y=t.y<0?0:1;break;case hf:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Mn.DEFAULT_IMAGE=null;Mn.DEFAULT_MAPPING=wg;Mn.DEFAULT_ANISOTROPY=1;class Se{constructor(t=0,n=0,i=0,r=1){Se.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,r){return this.x=t,this.y=n,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,i=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,r,s;const c=t.elements,l=c[0],u=c[4],f=c[8],h=c[1],d=c[5],m=c[9],_=c[2],g=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(m+g)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const x=(l+1)/2,v=(d+1)/2,T=(p+1)/2,b=(u+h)/4,w=(f+_)/4,C=(m+g)/4;return x>v&&x>T?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=b/i,s=w/i):v>T?v<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),i=b/r,s=C/r):T<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),i=w/s,r=C/s),this.set(i,r,s,n),this}let y=Math.sqrt((g-m)*(g-m)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(f-_)/y,this.z=(h-u)/y,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this.w=Math.max(t.w,Math.min(n.w,this.w)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this.w=Math.max(t,Math.min(n,this.w)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Mx extends Co{constructor(t=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=1,this.scissor=new Se(0,0,t,n),this.scissorTest=!1,this.viewport=new Se(0,0,t,n);const r={width:t,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ui,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new Mn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,r=t.textures.length;i<r;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},t.texture.image);return this.texture.source=new zg(n),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class vs extends Mx{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}}class Bg extends Mn{constructor(t=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:r},this.magFilter=Qn,this.minFilter=Qn,this.wrapR=os,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class bx extends Mn{constructor(t=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:r},this.magFilter=Qn,this.minFilter=Qn,this.wrapR=os,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class mi{constructor(t=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=r}static slerpFlat(t,n,i,r,s,o,a){let c=i[r+0],l=i[r+1],u=i[r+2],f=i[r+3];const h=s[o+0],d=s[o+1],m=s[o+2],_=s[o+3];if(a===0){t[n+0]=c,t[n+1]=l,t[n+2]=u,t[n+3]=f;return}if(a===1){t[n+0]=h,t[n+1]=d,t[n+2]=m,t[n+3]=_;return}if(f!==_||c!==h||l!==d||u!==m){let g=1-a;const p=c*h+l*d+u*m+f*_,y=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const T=Math.sqrt(x),b=Math.atan2(T,p*y);g=Math.sin(g*b)/T,a=Math.sin(a*b)/T}const v=a*y;if(c=c*g+h*v,l=l*g+d*v,u=u*g+m*v,f=f*g+_*v,g===1-a){const T=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=T,l*=T,u*=T,f*=T}}t[n]=c,t[n+1]=l,t[n+2]=u,t[n+3]=f}static multiplyQuaternionsFlat(t,n,i,r,s,o){const a=i[r],c=i[r+1],l=i[r+2],u=i[r+3],f=s[o],h=s[o+1],d=s[o+2],m=s[o+3];return t[n]=a*m+u*f+c*d-l*h,t[n+1]=c*m+u*h+l*f-a*d,t[n+2]=l*m+u*d+a*h-c*f,t[n+3]=u*m-a*f-c*h-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,r){return this._x=t,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const i=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(r/2),f=a(s/2),h=c(i/2),d=c(r/2),m=c(s/2);switch(o){case"XYZ":this._x=h*u*f+l*d*m,this._y=l*d*f-h*u*m,this._z=l*u*m+h*d*f,this._w=l*u*f-h*d*m;break;case"YXZ":this._x=h*u*f+l*d*m,this._y=l*d*f-h*u*m,this._z=l*u*m-h*d*f,this._w=l*u*f+h*d*m;break;case"ZXY":this._x=h*u*f-l*d*m,this._y=l*d*f+h*u*m,this._z=l*u*m+h*d*f,this._w=l*u*f-h*d*m;break;case"ZYX":this._x=h*u*f-l*d*m,this._y=l*d*f+h*u*m,this._z=l*u*m-h*d*f,this._w=l*u*f+h*d*m;break;case"YZX":this._x=h*u*f+l*d*m,this._y=l*d*f+h*u*m,this._z=l*u*m-h*d*f,this._w=l*u*f-h*d*m;break;case"XZY":this._x=h*u*f-l*d*m,this._y=l*d*f-h*u*m,this._z=l*u*m+h*d*f,this._w=l*u*f+h*d*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const i=n/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],c=n[9],l=n[2],u=n[6],f=n[10],h=i+a+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-c)*d,this._y=(s-l)*d,this._z=(o-r)*d}else if(i>a&&i>f){const d=2*Math.sqrt(1+i-a-f);this._w=(u-c)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+l)/d}else if(a>f){const d=2*Math.sqrt(1+a-i-f);this._w=(s-l)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+f-i-a);this._w=(o-r)/d,this._x=(s+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(pn(this.dot(t),-1,1)))}rotateTowards(t,n){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const i=t._x,r=t._y,s=t._z,o=t._w,a=n._x,c=n._y,l=n._z,u=n._w;return this._x=i*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-i*l,this._z=s*u+o*l+i*c-r*a,this._w=o*u-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+i*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-n;return this._w=d*o+n*this._w,this._x=d*i+n*this._x,this._y=d*r+n*this._y,this._z=d*s+n*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),f=Math.sin((1-n)*u)/l,h=Math.sin(n*u)/l;return this._w=o*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(n),s*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class j{constructor(t=0,n=0,i=0){j.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Zd.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Zd.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,i=this.y,r=this.z,s=t.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(t){const n=this.x,i=this.y,r=this.z,s=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*r-a*i),u=2*(a*n-s*r),f=2*(s*i-o*n);return this.x=n+c*l+o*f-a*u,this.y=i+c*u+a*l-s*f,this.z=r+c*f+s*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const i=t.x,r=t.y,s=t.z,o=n.x,a=n.y,c=n.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Jl.copy(this).projectOnVector(t),this.sub(Jl)}reflect(t){return this.sub(Jl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(pn(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return n*n+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){const r=Math.sin(n)*t;return this.x=r*Math.sin(i),this.y=Math.cos(n)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Jl=new j,Zd=new mi;class gi{constructor(t=new j(1/0,1/0,1/0),n=new j(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(Si.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(Si.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const i=Si.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Si):Si.fromBufferAttribute(s,o),Si.applyMatrix4(t.matrixWorld),this.expandByPoint(Si);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),tc.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),tc.copy(i.boundingBox)),tc.applyMatrix4(t.matrixWorld),this.union(tc)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Si),Si.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter($o),ec.subVectors(this.max,$o),Ls.subVectors(t.a,$o),Fs.subVectors(t.b,$o),Ns.subVectors(t.c,$o),dr.subVectors(Fs,Ls),pr.subVectors(Ns,Fs),Hr.subVectors(Ls,Ns);let n=[0,-dr.z,dr.y,0,-pr.z,pr.y,0,-Hr.z,Hr.y,dr.z,0,-dr.x,pr.z,0,-pr.x,Hr.z,0,-Hr.x,-dr.y,dr.x,0,-pr.y,pr.x,0,-Hr.y,Hr.x,0];return!Ql(n,Ls,Fs,Ns,ec)||(n=[1,0,0,0,1,0,0,0,1],!Ql(n,Ls,Fs,Ns,ec))?!1:(nc.crossVectors(dr,pr),n=[nc.x,nc.y,nc.z],Ql(n,Ls,Fs,Ns,ec))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Si).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Si).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:($i[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),$i[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),$i[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),$i[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),$i[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),$i[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),$i[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),$i[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints($i),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const $i=[new j,new j,new j,new j,new j,new j,new j,new j],Si=new j,tc=new gi,Ls=new j,Fs=new j,Ns=new j,dr=new j,pr=new j,Hr=new j,$o=new j,ec=new j,nc=new j,Wr=new j;function Ql(e,t,n,i,r){for(let s=0,o=e.length-3;s<=o;s+=3){Wr.fromArray(e,s);const a=r.x*Math.abs(Wr.x)+r.y*Math.abs(Wr.y)+r.z*Math.abs(Wr.z),c=t.dot(Wr),l=n.dot(Wr),u=i.dot(Wr);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const Ex=new gi,Xo=new j,tu=new j;class zr{constructor(t=new j,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const i=this.center;n!==void 0?i.copy(n):Ex.setFromPoints(t).getCenter(i);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Xo.subVectors(t,this.center);const n=Xo.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(Xo,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(tu.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Xo.copy(t.center).add(tu)),this.expandByPoint(Xo.copy(t.center).sub(tu))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Xi=new j,eu=new j,ic=new j,mr=new j,nu=new j,rc=new j,iu=new j;class wx{constructor(t=new j,n=new j(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Xi)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=Xi.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Xi.copy(this.origin).addScaledVector(this.direction,n),Xi.distanceToSquared(t))}distanceSqToSegment(t,n,i,r){eu.copy(t).add(n).multiplyScalar(.5),ic.copy(n).sub(t).normalize(),mr.copy(this.origin).sub(eu);const s=t.distanceTo(n)*.5,o=-this.direction.dot(ic),a=mr.dot(this.direction),c=-mr.dot(ic),l=mr.lengthSq(),u=Math.abs(1-o*o);let f,h,d,m;if(u>0)if(f=o*c-a,h=o*a-c,m=s*u,f>=0)if(h>=-m)if(h<=m){const _=1/u;f*=_,h*=_,d=f*(f+o*h+2*a)+h*(o*f+h+2*c)+l}else h=s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;else h=-s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;else h<=-m?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-c),s),d=-f*f+h*(h+2*c)+l):h<=m?(f=0,h=Math.min(Math.max(-s,-c),s),d=h*(h+2*c)+l):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-c),s),d=-f*f+h*(h+2*c)+l);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(eu).addScaledVector(ic,h),d}intersectSphere(t,n){Xi.subVectors(t.center,this.origin);const i=Xi.dot(this.direction),r=Xi.dot(Xi)-i*i,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,n):this.at(a,n)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){const i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,r,s,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(i=(t.min.x-h.x)*l,r=(t.max.x-h.x)*l):(i=(t.max.x-h.x)*l,r=(t.min.x-h.x)*l),u>=0?(s=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(s=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(t.min.z-h.z)*f,c=(t.max.z-h.z)*f):(a=(t.max.z-h.z)*f,c=(t.min.z-h.z)*f),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(t){return this.intersectBox(t,Xi)!==null}intersectTriangle(t,n,i,r,s){nu.subVectors(n,t),rc.subVectors(i,t),iu.crossVectors(nu,rc);let o=this.direction.dot(iu),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;mr.subVectors(this.origin,t);const c=a*this.direction.dot(rc.crossVectors(mr,rc));if(c<0)return null;const l=a*this.direction.dot(nu.cross(mr));if(l<0||c+l>o)return null;const u=-a*mr.dot(iu);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class le{constructor(t,n,i,r,s,o,a,c,l,u,f,h,d,m,_,g){le.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,r,s,o,a,c,l,u,f,h,d,m,_,g)}set(t,n,i,r,s,o,a,c,l,u,f,h,d,m,_,g){const p=this.elements;return p[0]=t,p[4]=n,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new le().fromArray(this.elements)}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){const n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){const n=this.elements,i=t.elements,r=1/Os.setFromMatrixColumn(t,0).length(),s=1/Os.setFromMatrixColumn(t,1).length(),o=1/Os.setFromMatrixColumn(t,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,i=t.x,r=t.y,s=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(t.order==="XYZ"){const h=o*u,d=o*f,m=a*u,_=a*f;n[0]=c*u,n[4]=-c*f,n[8]=l,n[1]=d+m*l,n[5]=h-_*l,n[9]=-a*c,n[2]=_-h*l,n[6]=m+d*l,n[10]=o*c}else if(t.order==="YXZ"){const h=c*u,d=c*f,m=l*u,_=l*f;n[0]=h+_*a,n[4]=m*a-d,n[8]=o*l,n[1]=o*f,n[5]=o*u,n[9]=-a,n[2]=d*a-m,n[6]=_+h*a,n[10]=o*c}else if(t.order==="ZXY"){const h=c*u,d=c*f,m=l*u,_=l*f;n[0]=h-_*a,n[4]=-o*f,n[8]=m+d*a,n[1]=d+m*a,n[5]=o*u,n[9]=_-h*a,n[2]=-o*l,n[6]=a,n[10]=o*c}else if(t.order==="ZYX"){const h=o*u,d=o*f,m=a*u,_=a*f;n[0]=c*u,n[4]=m*l-d,n[8]=h*l+_,n[1]=c*f,n[5]=_*l+h,n[9]=d*l-m,n[2]=-l,n[6]=a*c,n[10]=o*c}else if(t.order==="YZX"){const h=o*c,d=o*l,m=a*c,_=a*l;n[0]=c*u,n[4]=_-h*f,n[8]=m*f+d,n[1]=f,n[5]=o*u,n[9]=-a*u,n[2]=-l*u,n[6]=d*f+m,n[10]=h-_*f}else if(t.order==="XZY"){const h=o*c,d=o*l,m=a*c,_=a*l;n[0]=c*u,n[4]=-f,n[8]=l*u,n[1]=h*f+_,n[5]=o*u,n[9]=d*f-m,n[2]=m*f-d,n[6]=a*u,n[10]=_*f+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Tx,t,Ax)}lookAt(t,n,i){const r=this.elements;return Zn.subVectors(t,n),Zn.lengthSq()===0&&(Zn.z=1),Zn.normalize(),gr.crossVectors(i,Zn),gr.lengthSq()===0&&(Math.abs(i.z)===1?Zn.x+=1e-4:Zn.z+=1e-4,Zn.normalize(),gr.crossVectors(i,Zn)),gr.normalize(),sc.crossVectors(Zn,gr),r[0]=gr.x,r[4]=sc.x,r[8]=Zn.x,r[1]=gr.y,r[5]=sc.y,r[9]=Zn.y,r[2]=gr.z,r[6]=sc.z,r[10]=Zn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],f=i[5],h=i[9],d=i[13],m=i[2],_=i[6],g=i[10],p=i[14],y=i[3],x=i[7],v=i[11],T=i[15],b=r[0],w=r[4],C=r[8],M=r[12],S=r[1],U=r[5],P=r[9],D=r[13],I=r[2],V=r[6],O=r[10],tt=r[14],H=r[3],q=r[7],X=r[11],F=r[15];return s[0]=o*b+a*S+c*I+l*H,s[4]=o*w+a*U+c*V+l*q,s[8]=o*C+a*P+c*O+l*X,s[12]=o*M+a*D+c*tt+l*F,s[1]=u*b+f*S+h*I+d*H,s[5]=u*w+f*U+h*V+d*q,s[9]=u*C+f*P+h*O+d*X,s[13]=u*M+f*D+h*tt+d*F,s[2]=m*b+_*S+g*I+p*H,s[6]=m*w+_*U+g*V+p*q,s[10]=m*C+_*P+g*O+p*X,s[14]=m*M+_*D+g*tt+p*F,s[3]=y*b+x*S+v*I+T*H,s[7]=y*w+x*U+v*V+T*q,s[11]=y*C+x*P+v*O+T*X,s[15]=y*M+x*D+v*tt+T*F,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[4],r=t[8],s=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],f=t[6],h=t[10],d=t[14],m=t[3],_=t[7],g=t[11],p=t[15];return m*(+s*c*f-r*l*f-s*a*h+i*l*h+r*a*d-i*c*d)+_*(+n*c*d-n*l*h+s*o*h-r*o*d+r*l*u-s*c*u)+g*(+n*l*f-n*a*d-s*o*f+i*o*d+s*a*u-i*l*u)+p*(-r*a*u-n*c*f+n*a*h+r*o*f-i*o*h+i*c*u)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=n,r[14]=i),this}invert(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=t[9],h=t[10],d=t[11],m=t[12],_=t[13],g=t[14],p=t[15],y=f*g*l-_*h*l+_*c*d-a*g*d-f*c*p+a*h*p,x=m*h*l-u*g*l-m*c*d+o*g*d+u*c*p-o*h*p,v=u*_*l-m*f*l+m*a*d-o*_*d-u*a*p+o*f*p,T=m*f*c-u*_*c-m*a*h+o*_*h+u*a*g-o*f*g,b=n*y+i*x+r*v+s*T;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/b;return t[0]=y*w,t[1]=(_*h*s-f*g*s-_*r*d+i*g*d+f*r*p-i*h*p)*w,t[2]=(a*g*s-_*c*s+_*r*l-i*g*l-a*r*p+i*c*p)*w,t[3]=(f*c*s-a*h*s-f*r*l+i*h*l+a*r*d-i*c*d)*w,t[4]=x*w,t[5]=(u*g*s-m*h*s+m*r*d-n*g*d-u*r*p+n*h*p)*w,t[6]=(m*c*s-o*g*s-m*r*l+n*g*l+o*r*p-n*c*p)*w,t[7]=(o*h*s-u*c*s+u*r*l-n*h*l-o*r*d+n*c*d)*w,t[8]=v*w,t[9]=(m*f*s-u*_*s-m*i*d+n*_*d+u*i*p-n*f*p)*w,t[10]=(o*_*s-m*a*s+m*i*l-n*_*l-o*i*p+n*a*p)*w,t[11]=(u*a*s-o*f*s-u*i*l+n*f*l+o*i*d-n*a*d)*w,t[12]=T*w,t[13]=(u*_*r-m*f*r+m*i*h-n*_*h-u*i*g+n*f*g)*w,t[14]=(m*a*r-o*_*r-m*i*c+n*_*c+o*i*g-n*a*g)*w,t[15]=(o*f*r-u*a*r+u*i*c-n*f*c-o*i*h+n*a*h)*w,this}scale(t){const n=this.elements,i=t.x,r=t.y,s=t.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=t.x,a=t.y,c=t.z,l=s*o,u=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+i,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,r,s,o){return this.set(1,i,s,0,t,1,o,0,n,r,1,0,0,0,0,1),this}compose(t,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,c=n._w,l=s+s,u=o+o,f=a+a,h=s*l,d=s*u,m=s*f,_=o*u,g=o*f,p=a*f,y=c*l,x=c*u,v=c*f,T=i.x,b=i.y,w=i.z;return r[0]=(1-(_+p))*T,r[1]=(d+v)*T,r[2]=(m-x)*T,r[3]=0,r[4]=(d-v)*b,r[5]=(1-(h+p))*b,r[6]=(g+y)*b,r[7]=0,r[8]=(m+x)*w,r[9]=(g-y)*w,r[10]=(1-(h+_))*w,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,n,i){const r=this.elements;let s=Os.set(r[0],r[1],r[2]).length();const o=Os.set(r[4],r[5],r[6]).length(),a=Os.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Mi.copy(this);const l=1/s,u=1/o,f=1/a;return Mi.elements[0]*=l,Mi.elements[1]*=l,Mi.elements[2]*=l,Mi.elements[4]*=u,Mi.elements[5]*=u,Mi.elements[6]*=u,Mi.elements[8]*=f,Mi.elements[9]*=f,Mi.elements[10]*=f,n.setFromRotationMatrix(Mi),i.x=s,i.y=o,i.z=a,this}makePerspective(t,n,i,r,s,o,a=Qi){const c=this.elements,l=2*s/(n-t),u=2*s/(i-r),f=(n+t)/(n-t),h=(i+r)/(i-r);let d,m;if(a===Qi)d=-(o+s)/(o-s),m=-2*o*s/(o-s);else if(a===Qc)d=-o/(o-s),m=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,r,s,o,a=Qi){const c=this.elements,l=1/(n-t),u=1/(i-r),f=1/(o-s),h=(n+t)*l,d=(i+r)*u;let m,_;if(a===Qi)m=(o+s)*f,_=-2*f;else if(a===Qc)m=s*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=_,c[14]=-m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const n=this.elements,i=t.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}}const Os=new j,Mi=new le,Tx=new j(0,0,0),Ax=new j(1,1,1),gr=new j,sc=new j,Zn=new j,jd=new le,qd=new mi;class ni{constructor(t=0,n=0,i=0,r=ni.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,r=this._order){return this._x=t,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(n){case"XYZ":this._y=Math.asin(pn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-pn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(pn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-pn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(pn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-pn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return jd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(jd,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return qd.setFromEuler(this),this.setFromQuaternion(qd,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ni.DEFAULT_ORDER="XYZ";class Gg{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Cx=0;const Kd=new j,ks=new mi,Yi=new le,oc=new j,Yo=new j,Rx=new j,Px=new mi,Jd=new j(1,0,0),Qd=new j(0,1,0),tp=new j(0,0,1),ep={type:"added"},Ux={type:"removed"},zs={type:"childadded",child:null},ru={type:"childremoved",child:null};class mn extends Co{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Cx++}),this.uuid=tr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mn.DEFAULT_UP.clone();const t=new j,n=new ni,i=new mi,r=new j(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new le},normalMatrix:{value:new Jt}}),this.matrix=new le,this.matrixWorld=new le,this.matrixAutoUpdate=mn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return ks.setFromAxisAngle(t,n),this.quaternion.multiply(ks),this}rotateOnWorldAxis(t,n){return ks.setFromAxisAngle(t,n),this.quaternion.premultiply(ks),this}rotateX(t){return this.rotateOnAxis(Jd,t)}rotateY(t){return this.rotateOnAxis(Qd,t)}rotateZ(t){return this.rotateOnAxis(tp,t)}translateOnAxis(t,n){return Kd.copy(t).applyQuaternion(this.quaternion),this.position.add(Kd.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(Jd,t)}translateY(t){return this.translateOnAxis(Qd,t)}translateZ(t){return this.translateOnAxis(tp,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Yi.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?oc.copy(t):oc.set(t,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Yo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yi.lookAt(Yo,oc,this.up):Yi.lookAt(oc,Yo,this.up),this.quaternion.setFromRotationMatrix(Yi),r&&(Yi.extractRotation(r.matrixWorld),ks.setFromRotationMatrix(Yi),this.quaternion.premultiply(ks.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ep),zs.child=t,this.dispatchEvent(zs),zs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(Ux),ru.child=t,this.dispatchEvent(ru),ru.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Yi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Yi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Yi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ep),zs.child=t,this.dispatchEvent(zs),zs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(t,n);if(o!==void 0)return o}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yo,t,Rx),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yo,Px,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];s(t.shapes,f)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(t.materials,this.material[c]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(t.animations,c))}}if(n){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),f=o(t.shapes),h=o(t.skeletons),d=o(t.animations),m=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),m.length>0&&(i.nodes=m)}return i.object=r,i;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}mn.DEFAULT_UP=new j(0,1,0);mn.DEFAULT_MATRIX_AUTO_UPDATE=!0;mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const bi=new j,Zi=new j,su=new j,ji=new j,Bs=new j,Gs=new j,np=new j,ou=new j,au=new j,cu=new j,lu=new Se,uu=new Se,fu=new Se;class Ai{constructor(t=new j,n=new j,i=new j){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,r){r.subVectors(i,n),bi.subVectors(t,n),r.cross(bi);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,n,i,r,s){bi.subVectors(r,n),Zi.subVectors(i,n),su.subVectors(t,n);const o=bi.dot(bi),a=bi.dot(Zi),c=bi.dot(su),l=Zi.dot(Zi),u=Zi.dot(su),f=o*l-a*a;if(f===0)return s.set(0,0,0),null;const h=1/f,d=(l*c-a*u)*h,m=(o*u-a*c)*h;return s.set(1-d-m,m,d)}static containsPoint(t,n,i,r){return this.getBarycoord(t,n,i,r,ji)===null?!1:ji.x>=0&&ji.y>=0&&ji.x+ji.y<=1}static getInterpolation(t,n,i,r,s,o,a,c){return this.getBarycoord(t,n,i,r,ji)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,ji.x),c.addScaledVector(o,ji.y),c.addScaledVector(a,ji.z),c)}static getInterpolatedAttribute(t,n,i,r,s,o){return lu.setScalar(0),uu.setScalar(0),fu.setScalar(0),lu.fromBufferAttribute(t,n),uu.fromBufferAttribute(t,i),fu.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(lu,s.x),o.addScaledVector(uu,s.y),o.addScaledVector(fu,s.z),o}static isFrontFacing(t,n,i,r){return bi.subVectors(i,n),Zi.subVectors(t,n),bi.cross(Zi).dot(r)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,r){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,n,i,r){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return bi.subVectors(this.c,this.b),Zi.subVectors(this.a,this.b),bi.cross(Zi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ai.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return Ai.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,r,s){return Ai.getInterpolation(t,this.a,this.b,this.c,n,i,r,s)}containsPoint(t){return Ai.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ai.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const i=this.a,r=this.b,s=this.c;let o,a;Bs.subVectors(r,i),Gs.subVectors(s,i),ou.subVectors(t,i);const c=Bs.dot(ou),l=Gs.dot(ou);if(c<=0&&l<=0)return n.copy(i);au.subVectors(t,r);const u=Bs.dot(au),f=Gs.dot(au);if(u>=0&&f<=u)return n.copy(r);const h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return o=c/(c-u),n.copy(i).addScaledVector(Bs,o);cu.subVectors(t,s);const d=Bs.dot(cu),m=Gs.dot(cu);if(m>=0&&d<=m)return n.copy(s);const _=d*l-c*m;if(_<=0&&l>=0&&m<=0)return a=l/(l-m),n.copy(i).addScaledVector(Gs,a);const g=u*m-d*f;if(g<=0&&f-u>=0&&d-m>=0)return np.subVectors(s,r),a=(f-u)/(f-u+(d-m)),n.copy(r).addScaledVector(np,a);const p=1/(g+_+h);return o=_*p,a=h*p,n.copy(i).addScaledVector(Bs,o).addScaledVector(Gs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Vg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_r={h:0,s:0,l:0},ac={h:0,s:0,l:0};function hu(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}class ie{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=ci){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,he.toWorkingColorSpace(this,n),this}setRGB(t,n,i,r=he.workingColorSpace){return this.r=t,this.g=n,this.b=i,he.toWorkingColorSpace(this,r),this}setHSL(t,n,i,r=he.workingColorSpace){if(t=Ih(t,1),n=pn(n,0,1),i=pn(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=hu(o,s,t+1/3),this.g=hu(o,s,t),this.b=hu(o,s,t-1/3)}return he.toWorkingColorSpace(this,r),this}setStyle(t,n=ci){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=ci){const i=Vg[t.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=er(t.r),this.g=er(t.g),this.b=er(t.b),this}copyLinearToSRGB(t){return this.r=io(t.r),this.g=io(t.g),this.b=io(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ci){return he.fromWorkingColorSpace(xn.copy(this),t),Math.round(pn(xn.r*255,0,255))*65536+Math.round(pn(xn.g*255,0,255))*256+Math.round(pn(xn.b*255,0,255))}getHexString(t=ci){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=he.workingColorSpace){he.fromWorkingColorSpace(xn.copy(this),n);const i=xn.r,r=xn.g,s=xn.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=u<=.5?f/(o+a):f/(2-o-a),o){case i:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-i)/f+2;break;case s:c=(i-r)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,n=he.workingColorSpace){return he.fromWorkingColorSpace(xn.copy(this),n),t.r=xn.r,t.g=xn.g,t.b=xn.b,t}getStyle(t=ci){he.fromWorkingColorSpace(xn.copy(this),t);const n=xn.r,i=xn.g,r=xn.b;return t!==ci?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,n,i){return this.getHSL(_r),this.setHSL(_r.h+t,_r.s+n,_r.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(_r),t.getHSL(ac);const i=ha(_r.h,ac.h,n),r=ha(_r.s,ac.s,n),s=ha(_r.l,ac.l,n);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const xn=new ie;ie.NAMES=Vg;let Dx=0;class ka extends Co{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Dx++}),this.uuid=tr(),this.name="",this.blending=eo,this.side=Nr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qu,this.blendDst=tf,this.blendEquation=ns,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ie(0,0,0),this.blendAlpha=0,this.depthFunc=fo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ds,this.stencilZFail=Ds,this.stencilZPass=Ds,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const i=t[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==eo&&(i.blending=this.blending),this.side!==Nr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Qu&&(i.blendSrc=this.blendSrc),this.blendDst!==tf&&(i.blendDst=this.blendDst),this.blendEquation!==ns&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==fo&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==zd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ds&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ds&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ds&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(n){const s=r(t.textures),o=r(t.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ml extends ka{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.combine=Eg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ye=new j,cc=new oe;class pi{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=zf,this.updateRanges=[],this.gpuType=Oi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=n.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)cc.fromBufferAttribute(this,n),cc.applyMatrix3(t),this.setXY(n,cc.x,cc.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ye.fromBufferAttribute(this,n),Ye.applyMatrix3(t),this.setXYZ(n,Ye.x,Ye.y,Ye.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)Ye.fromBufferAttribute(this,n),Ye.applyMatrix4(t),this.setXYZ(n,Ye.x,Ye.y,Ye.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)Ye.fromBufferAttribute(this,n),Ye.applyNormalMatrix(t),this.setXYZ(n,Ye.x,Ye.y,Ye.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)Ye.fromBufferAttribute(this,n),Ye.transformDirection(t),this.setXYZ(n,Ye.x,Ye.y,Ye.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=Ti(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=xe(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Ti(n,this.array)),n}setX(t,n){return this.normalized&&(n=xe(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Ti(n,this.array)),n}setY(t,n){return this.normalized&&(n=xe(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Ti(n,this.array)),n}setZ(t,n){return this.normalized&&(n=xe(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Ti(n,this.array)),n}setW(t,n){return this.normalized&&(n=xe(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=xe(n,this.array),i=xe(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,r){return t*=this.itemSize,this.normalized&&(n=xe(n,this.array),i=xe(i,this.array),r=xe(r,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,n,i,r,s){return t*=this.itemSize,this.normalized&&(n=xe(n,this.array),i=xe(i,this.array),r=xe(r,this.array),s=xe(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==zf&&(t.usage=this.usage),t}}class Hg extends pi{constructor(t,n,i){super(new Uint16Array(t),n,i)}}class Wg extends pi{constructor(t,n,i){super(new Uint32Array(t),n,i)}}class ti extends pi{constructor(t,n,i){super(new Float32Array(t),n,i)}}let Ix=0;const oi=new le,du=new mn,Vs=new j,jn=new gi,Zo=new gi,nn=new j;class Vi extends Co{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ix++}),this.uuid=tr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(kg(t)?Wg:Hg)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Jt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return oi.makeRotationFromQuaternion(t),this.applyMatrix4(oi),this}rotateX(t){return oi.makeRotationX(t),this.applyMatrix4(oi),this}rotateY(t){return oi.makeRotationY(t),this.applyMatrix4(oi),this}rotateZ(t){return oi.makeRotationZ(t),this.applyMatrix4(oi),this}translate(t,n,i){return oi.makeTranslation(t,n,i),this.applyMatrix4(oi),this}scale(t,n,i){return oi.makeScale(t,n,i),this.applyMatrix4(oi),this}lookAt(t){return du.lookAt(t),du.updateMatrix(),this.applyMatrix4(du.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vs).negate(),this.translate(Vs.x,Vs.y,Vs.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ti(i,3))}else{for(let i=0,r=n.count;i<r;i++){const s=t[i];n.setXYZ(i,s.x,s.y,s.z||0)}t.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new gi);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new j(-1/0,-1/0,-1/0),new j(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];jn.setFromBufferAttribute(s),this.morphTargetsRelative?(nn.addVectors(this.boundingBox.min,jn.min),this.boundingBox.expandByPoint(nn),nn.addVectors(this.boundingBox.max,jn.max),this.boundingBox.expandByPoint(nn)):(this.boundingBox.expandByPoint(jn.min),this.boundingBox.expandByPoint(jn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zr);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new j,1/0);return}if(t){const i=this.boundingSphere.center;if(jn.setFromBufferAttribute(t),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];Zo.setFromBufferAttribute(a),this.morphTargetsRelative?(nn.addVectors(jn.min,Zo.min),jn.expandByPoint(nn),nn.addVectors(jn.max,Zo.max),jn.expandByPoint(nn)):(jn.expandByPoint(Zo.min),jn.expandByPoint(Zo.max))}jn.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)nn.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(nn));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)nn.fromBufferAttribute(a,l),c&&(Vs.fromBufferAttribute(t,l),nn.add(Vs)),r=Math.max(r,i.distanceToSquared(nn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pi(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let C=0;C<i.count;C++)a[C]=new j,c[C]=new j;const l=new j,u=new j,f=new j,h=new oe,d=new oe,m=new oe,_=new j,g=new j;function p(C,M,S){l.fromBufferAttribute(i,C),u.fromBufferAttribute(i,M),f.fromBufferAttribute(i,S),h.fromBufferAttribute(s,C),d.fromBufferAttribute(s,M),m.fromBufferAttribute(s,S),u.sub(l),f.sub(l),d.sub(h),m.sub(h);const U=1/(d.x*m.y-m.x*d.y);isFinite(U)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(f,-d.y).multiplyScalar(U),g.copy(f).multiplyScalar(d.x).addScaledVector(u,-m.x).multiplyScalar(U),a[C].add(_),a[M].add(_),a[S].add(_),c[C].add(g),c[M].add(g),c[S].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let C=0,M=y.length;C<M;++C){const S=y[C],U=S.start,P=S.count;for(let D=U,I=U+P;D<I;D+=3)p(t.getX(D+0),t.getX(D+1),t.getX(D+2))}const x=new j,v=new j,T=new j,b=new j;function w(C){T.fromBufferAttribute(r,C),b.copy(T);const M=a[C];x.copy(M),x.sub(T.multiplyScalar(T.dot(M))).normalize(),v.crossVectors(b,M);const U=v.dot(c[C])<0?-1:1;o.setXYZW(C,x.x,x.y,x.z,U)}for(let C=0,M=y.length;C<M;++C){const S=y[C],U=S.start,P=S.count;for(let D=U,I=U+P;D<I;D+=3)w(t.getX(D+0)),w(t.getX(D+1)),w(t.getX(D+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new pi(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);const r=new j,s=new j,o=new j,a=new j,c=new j,l=new j,u=new j,f=new j;if(t)for(let h=0,d=t.count;h<d;h+=3){const m=t.getX(h+0),_=t.getX(h+1),g=t.getX(h+2);r.fromBufferAttribute(n,m),s.fromBufferAttribute(n,_),o.fromBufferAttribute(n,g),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(i,m),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,g),a.add(u),c.add(u),l.add(u),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let h=0,d=n.count;h<d;h+=3)r.fromBufferAttribute(n,h+0),s.fromBufferAttribute(n,h+1),o.fromBufferAttribute(n,h+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)nn.fromBufferAttribute(t,n),nn.normalize(),t.setXYZ(n,nn.x,nn.y,nn.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,f=a.normalized,h=new l.constructor(c.length*u);let d=0,m=0;for(let _=0,g=c.length;_<g;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*u;for(let p=0;p<u;p++)h[m++]=l[d++]}return new pi(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Vi,i=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=t(c,i);n.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let u=0,f=l.length;u<f;u++){const h=l[u],d=t(h,i);c.push(d)}n.morphAttributes[a]=c}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];n.addGroup(l.start,l.count,l.materialIndex)}return n}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){const d=l[f];u.push(d.toJSON(t.data))}u.length>0&&(r[c]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(n));const r=t.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(n))}const s=t.morphAttributes;for(const l in s){const u=[],f=s[l];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(n));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ip=new le,$r=new wx,lc=new zr,rp=new j,uc=new j,fc=new j,hc=new j,pu=new j,dc=new j,sp=new j,pc=new j;class An extends mn{constructor(t=new Vi,n=new Ml){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){dc.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=a[c],f=s[c];u!==0&&(pu.fromBufferAttribute(f,t),o?dc.addScaledVector(pu,u):dc.addScaledVector(pu.sub(n),u))}n.add(dc)}return n}raycast(t,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),lc.copy(i.boundingSphere),lc.applyMatrix4(s),$r.copy(t.ray).recast(t.near),!(lc.containsPoint($r.origin)===!1&&($r.intersectSphere(lc,rp)===null||$r.origin.distanceToSquared(rp)>(t.far-t.near)**2))&&(ip.copy(s).invert(),$r.copy(t.ray).applyMatrix4(ip),!(i.boundingBox!==null&&$r.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,$r)))}_computeIntersections(t,n,i){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=h.length;m<_;m++){const g=h[m],p=o[g.materialIndex],y=Math.max(g.start,d.start),x=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let v=y,T=x;v<T;v+=3){const b=a.getX(v),w=a.getX(v+1),C=a.getX(v+2);r=mc(this,p,t,i,l,u,f,b,w,C),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const m=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let g=m,p=_;g<p;g+=3){const y=a.getX(g),x=a.getX(g+1),v=a.getX(g+2);r=mc(this,o,t,i,l,u,f,y,x,v),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,_=h.length;m<_;m++){const g=h[m],p=o[g.materialIndex],y=Math.max(g.start,d.start),x=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let v=y,T=x;v<T;v+=3){const b=v,w=v+1,C=v+2;r=mc(this,p,t,i,l,u,f,b,w,C),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const m=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let g=m,p=_;g<p;g+=3){const y=g,x=g+1,v=g+2;r=mc(this,o,t,i,l,u,f,y,x,v),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function Lx(e,t,n,i,r,s,o,a){let c;if(t.side===On?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,t.side===Nr,a),c===null)return null;pc.copy(a),pc.applyMatrix4(e.matrixWorld);const l=n.ray.origin.distanceTo(pc);return l<n.near||l>n.far?null:{distance:l,point:pc.clone(),object:e}}function mc(e,t,n,i,r,s,o,a,c,l){e.getVertexPosition(a,uc),e.getVertexPosition(c,fc),e.getVertexPosition(l,hc);const u=Lx(e,t,n,i,uc,fc,hc,sp);if(u){const f=new j;Ai.getBarycoord(sp,uc,fc,hc,f),r&&(u.uv=Ai.getInterpolatedAttribute(r,a,c,l,f,new oe)),s&&(u.uv1=Ai.getInterpolatedAttribute(s,a,c,l,f,new oe)),o&&(u.normal=Ai.getInterpolatedAttribute(o,a,c,l,f,new j),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:c,c:l,normal:new j,materialIndex:0};Ai.getNormal(uc,fc,hc,h.normal),u.face=h,u.barycoord=f}return u}class Ro extends Vi{constructor(t=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],u=[],f=[];let h=0,d=0;m("z","y","x",-1,-1,i,n,t,o,s,0),m("z","y","x",1,-1,i,n,-t,o,s,1),m("x","z","y",1,1,t,i,n,r,o,2),m("x","z","y",1,-1,t,i,-n,r,o,3),m("x","y","z",1,-1,t,n,i,r,s,4),m("x","y","z",-1,-1,t,n,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new ti(l,3)),this.setAttribute("normal",new ti(u,3)),this.setAttribute("uv",new ti(f,2));function m(_,g,p,y,x,v,T,b,w,C,M){const S=v/w,U=T/C,P=v/2,D=T/2,I=b/2,V=w+1,O=C+1;let tt=0,H=0;const q=new j;for(let X=0;X<O;X++){const F=X*U-D;for(let W=0;W<V;W++){const J=W*S-P;q[_]=J*y,q[g]=F*x,q[p]=I,l.push(q.x,q.y,q.z),q[_]=0,q[g]=0,q[p]=b>0?1:-1,u.push(q.x,q.y,q.z),f.push(W/w),f.push(1-X/C),tt+=1}}for(let X=0;X<C;X++)for(let F=0;F<w;F++){const W=h+F+V*X,J=h+F+V*(X+1),N=h+(F+1)+V*(X+1),z=h+(F+1)+V*X;c.push(W,J,z),c.push(J,N,z),H+=6}a.addGroup(d,H,M),d+=H,h+=tt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ro(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function _o(e){const t={};for(const n in e){t[n]={};for(const i in e[n]){const r=e[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=r.clone():Array.isArray(r)?t[n][i]=r.slice():t[n][i]=r}}return t}function wn(e){const t={};for(let n=0;n<e.length;n++){const i=_o(e[n]);for(const r in i)t[r]=i[r]}return t}function Fx(e){const t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function $g(e){const t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:he.workingColorSpace}const bl={clone:_o,merge:wn};var Nx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ox=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class or extends ka{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Nx,this.fragmentShader=Ox,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=_o(t.uniforms),this.uniformsGroups=Fx(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Xg extends mn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new le,this.projectionMatrix=new le,this.projectionMatrixInverse=new le,this.coordinateSystem=Qi}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const vr=new j,op=new oe,ap=new oe;class Fn extends Xg{constructor(t=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=ba*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(fa*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ba*2*Math.atan(Math.tan(fa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){vr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(vr.x,vr.y).multiplyScalar(-t/vr.z),vr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(vr.x,vr.y).multiplyScalar(-t/vr.z)}getViewSize(t,n){return this.getViewBounds(t,op,ap),n.subVectors(ap,op)}setViewOffset(t,n,i,r,s,o){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(fa*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,n-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Hs=-90,Ws=1;class kx extends mn{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Fn(Hs,Ws,t,n);r.layers=this.layers,this.add(r);const s=new Fn(Hs,Ws,t,n);s.layers=this.layers,this.add(s);const o=new Fn(Hs,Ws,t,n);o.layers=this.layers,this.add(o);const a=new Fn(Hs,Ws,t,n);a.layers=this.layers,this.add(a);const c=new Fn(Hs,Ws,t,n);c.layers=this.layers,this.add(c);const l=new Fn(Hs,Ws,t,n);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,c]=n;for(const l of n)this.remove(l);if(t===Qi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Qc)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of n)this.add(l),l.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(n,s),t.setRenderTarget(i,1,r),t.render(n,o),t.setRenderTarget(i,2,r),t.render(n,a),t.setRenderTarget(i,3,r),t.render(n,c),t.setRenderTarget(i,4,r),t.render(n,l),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,r),t.render(n,u),t.setRenderTarget(f,h,d),t.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class Yg extends Mn{constructor(t,n,i,r,s,o,a,c,l,u){t=t!==void 0?t:[],n=n!==void 0?n:ho,super(t,n,i,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class zx extends vs{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new Yg(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:ui}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ro(5,5,5),s=new or({name:"CubemapFromEquirect",uniforms:_o(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:On,blending:Pr});s.uniforms.tEquirect.value=n;const o=new An(r,s),a=n.minFilter;return n.minFilter===as&&(n.minFilter=ui),new kx(1,10,this).update(t,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,n,i,r){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(n,i,r);t.setRenderTarget(s)}}const mu=new j,Bx=new j,Gx=new Jt;class Jr{constructor(t=new j(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,r){return this.normal.set(t,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){const r=mu.subVectors(i,n).cross(Bx.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const i=t.delta(mu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const i=n||Gx.getNormalMatrix(t),r=this.coplanarPoint(mu).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Xr=new zr,gc=new j;class Lh{constructor(t=new Jr,n=new Jr,i=new Jr,r=new Jr,s=new Jr,o=new Jr){this.planes=[t,n,i,r,s,o]}set(t,n,i,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=Qi){const i=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],c=r[3],l=r[4],u=r[5],f=r[6],h=r[7],d=r[8],m=r[9],_=r[10],g=r[11],p=r[12],y=r[13],x=r[14],v=r[15];if(i[0].setComponents(c-s,h-l,g-d,v-p).normalize(),i[1].setComponents(c+s,h+l,g+d,v+p).normalize(),i[2].setComponents(c+o,h+u,g+m,v+y).normalize(),i[3].setComponents(c-o,h-u,g-m,v-y).normalize(),i[4].setComponents(c-a,h-f,g-_,v-x).normalize(),n===Qi)i[5].setComponents(c+a,h+f,g+_,v+x).normalize();else if(n===Qc)i[5].setComponents(a,f,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Xr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Xr.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Xr)}intersectsSprite(t){return Xr.center.set(0,0,0),Xr.radius=.7071067811865476,Xr.applyMatrix4(t.matrixWorld),this.intersectsSphere(Xr)}intersectsSphere(t){const n=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(gc.x=r.normal.x>0?t.max.x:t.min.x,gc.y=r.normal.y>0?t.max.y:t.min.y,gc.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(gc)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Zg(){let e=null,t=!1,n=null,i=null;function r(s,o){n(s,o),i=e.requestAnimationFrame(r)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(r),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){n=s},setContext:function(s){e=s}}}function Vx(e){const t=new WeakMap;function n(a,c){const l=a.array,u=a.usage,f=l.byteLength,h=e.createBuffer();e.bindBuffer(c,h),e.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=e.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=e.HALF_FLOAT:d=e.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=e.SHORT;else if(l instanceof Uint32Array)d=e.UNSIGNED_INT;else if(l instanceof Int32Array)d=e.INT;else if(l instanceof Int8Array)d=e.BYTE;else if(l instanceof Uint8Array)d=e.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,c,l){const u=c.array,f=c.updateRanges;if(e.bindBuffer(l,a),f.length===0)e.bufferSubData(l,0,u);else{f.sort((d,m)=>d.start-m.start);let h=0;for(let d=1;d<f.length;d++){const m=f[h],_=f[d];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++h,f[h]=_)}f.length=h+1;for(let d=0,m=f.length;d<m;d++){const _=f[d];e.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(e.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,n(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}class Es extends Vi{constructor(t=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:r};const s=t/2,o=n/2,a=Math.floor(i),c=Math.floor(r),l=a+1,u=c+1,f=t/a,h=n/c,d=[],m=[],_=[],g=[];for(let p=0;p<u;p++){const y=p*h-o;for(let x=0;x<l;x++){const v=x*f-s;m.push(v,-y,0),_.push(0,0,1),g.push(x/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<a;y++){const x=y+l*p,v=y+l*(p+1),T=y+1+l*(p+1),b=y+1+l*p;d.push(x,v,b),d.push(v,T,b)}this.setIndex(d),this.setAttribute("position",new ti(m,3)),this.setAttribute("normal",new ti(_,3)),this.setAttribute("uv",new ti(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Es(t.width,t.height,t.widthSegments,t.heightSegments)}}var Hx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Wx=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,$x=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Xx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Zx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,jx=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,qx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Kx=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Jx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Qx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,t1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,e1=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,n1=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,i1=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,r1=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,s1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,o1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,a1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,c1=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,l1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,u1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,f1=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,h1=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,d1=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,p1=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,m1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,g1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,v1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,y1="gl_FragColor = linearToOutputTexel( gl_FragColor );",x1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,S1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,M1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,b1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,E1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,w1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,T1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,A1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,C1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,R1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,P1=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,U1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,D1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,I1=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,L1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,F1=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,N1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,O1=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,k1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,z1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,B1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,G1=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,V1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,H1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,W1=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$1=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,X1=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Y1=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Z1=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,j1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,q1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,K1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,J1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Q1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,tS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,eS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,nS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,iS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rS=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,sS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,oS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,aS=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,cS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,uS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,fS=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,hS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,dS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,pS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,mS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,gS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_S=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,vS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,SS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,MS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ES=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,wS=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,TS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,AS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,CS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,RS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,PS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,US=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,DS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,IS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,LS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,FS=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,NS=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,OS=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,kS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,zS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,BS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,GS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const VS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,HS=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,WS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$S=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,XS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,YS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ZS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,jS=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,qS=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,KS=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,JS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,QS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,eM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,nM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,iM=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rM=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sM=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,aM=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cM=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,lM=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,uM=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fM=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hM=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,dM=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pM=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mM=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,_M=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vM=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,xM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,SM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,te={alphahash_fragment:Hx,alphahash_pars_fragment:Wx,alphamap_fragment:$x,alphamap_pars_fragment:Xx,alphatest_fragment:Yx,alphatest_pars_fragment:Zx,aomap_fragment:jx,aomap_pars_fragment:qx,batching_pars_vertex:Kx,batching_vertex:Jx,begin_vertex:Qx,beginnormal_vertex:t1,bsdfs:e1,iridescence_fragment:n1,bumpmap_pars_fragment:i1,clipping_planes_fragment:r1,clipping_planes_pars_fragment:s1,clipping_planes_pars_vertex:o1,clipping_planes_vertex:a1,color_fragment:c1,color_pars_fragment:l1,color_pars_vertex:u1,color_vertex:f1,common:h1,cube_uv_reflection_fragment:d1,defaultnormal_vertex:p1,displacementmap_pars_vertex:m1,displacementmap_vertex:g1,emissivemap_fragment:_1,emissivemap_pars_fragment:v1,colorspace_fragment:y1,colorspace_pars_fragment:x1,envmap_fragment:S1,envmap_common_pars_fragment:M1,envmap_pars_fragment:b1,envmap_pars_vertex:E1,envmap_physical_pars_fragment:F1,envmap_vertex:w1,fog_vertex:T1,fog_pars_vertex:A1,fog_fragment:C1,fog_pars_fragment:R1,gradientmap_pars_fragment:P1,lightmap_pars_fragment:U1,lights_lambert_fragment:D1,lights_lambert_pars_fragment:I1,lights_pars_begin:L1,lights_toon_fragment:N1,lights_toon_pars_fragment:O1,lights_phong_fragment:k1,lights_phong_pars_fragment:z1,lights_physical_fragment:B1,lights_physical_pars_fragment:G1,lights_fragment_begin:V1,lights_fragment_maps:H1,lights_fragment_end:W1,logdepthbuf_fragment:$1,logdepthbuf_pars_fragment:X1,logdepthbuf_pars_vertex:Y1,logdepthbuf_vertex:Z1,map_fragment:j1,map_pars_fragment:q1,map_particle_fragment:K1,map_particle_pars_fragment:J1,metalnessmap_fragment:Q1,metalnessmap_pars_fragment:tS,morphinstance_vertex:eS,morphcolor_vertex:nS,morphnormal_vertex:iS,morphtarget_pars_vertex:rS,morphtarget_vertex:sS,normal_fragment_begin:oS,normal_fragment_maps:aS,normal_pars_fragment:cS,normal_pars_vertex:lS,normal_vertex:uS,normalmap_pars_fragment:fS,clearcoat_normal_fragment_begin:hS,clearcoat_normal_fragment_maps:dS,clearcoat_pars_fragment:pS,iridescence_pars_fragment:mS,opaque_fragment:gS,packing:_S,premultiplied_alpha_fragment:vS,project_vertex:yS,dithering_fragment:xS,dithering_pars_fragment:SS,roughnessmap_fragment:MS,roughnessmap_pars_fragment:bS,shadowmap_pars_fragment:ES,shadowmap_pars_vertex:wS,shadowmap_vertex:TS,shadowmask_pars_fragment:AS,skinbase_vertex:CS,skinning_pars_vertex:RS,skinning_vertex:PS,skinnormal_vertex:US,specularmap_fragment:DS,specularmap_pars_fragment:IS,tonemapping_fragment:LS,tonemapping_pars_fragment:FS,transmission_fragment:NS,transmission_pars_fragment:OS,uv_pars_fragment:kS,uv_pars_vertex:zS,uv_vertex:BS,worldpos_vertex:GS,background_vert:VS,background_frag:HS,backgroundCube_vert:WS,backgroundCube_frag:$S,cube_vert:XS,cube_frag:YS,depth_vert:ZS,depth_frag:jS,distanceRGBA_vert:qS,distanceRGBA_frag:KS,equirect_vert:JS,equirect_frag:QS,linedashed_vert:tM,linedashed_frag:eM,meshbasic_vert:nM,meshbasic_frag:iM,meshlambert_vert:rM,meshlambert_frag:sM,meshmatcap_vert:oM,meshmatcap_frag:aM,meshnormal_vert:cM,meshnormal_frag:lM,meshphong_vert:uM,meshphong_frag:fM,meshphysical_vert:hM,meshphysical_frag:dM,meshtoon_vert:pM,meshtoon_frag:mM,points_vert:gM,points_frag:_M,shadow_vert:vM,shadow_frag:yM,sprite_vert:xM,sprite_frag:SM},Dt={common:{diffuse:{value:new ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Jt}},envmap:{envMap:{value:null},envMapRotation:{value:new Jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Jt},normalScale:{value:new oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0},uvTransform:{value:new Jt}},sprite:{diffuse:{value:new ie(16777215)},opacity:{value:1},center:{value:new oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}}},Nn={basic:{uniforms:wn([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.fog]),vertexShader:te.meshbasic_vert,fragmentShader:te.meshbasic_frag},lambert:{uniforms:wn([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,Dt.lights,{emissive:{value:new ie(0)}}]),vertexShader:te.meshlambert_vert,fragmentShader:te.meshlambert_frag},phong:{uniforms:wn([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,Dt.lights,{emissive:{value:new ie(0)},specular:{value:new ie(1118481)},shininess:{value:30}}]),vertexShader:te.meshphong_vert,fragmentShader:te.meshphong_frag},standard:{uniforms:wn([Dt.common,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.roughnessmap,Dt.metalnessmap,Dt.fog,Dt.lights,{emissive:{value:new ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag},toon:{uniforms:wn([Dt.common,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.gradientmap,Dt.fog,Dt.lights,{emissive:{value:new ie(0)}}]),vertexShader:te.meshtoon_vert,fragmentShader:te.meshtoon_frag},matcap:{uniforms:wn([Dt.common,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,{matcap:{value:null}}]),vertexShader:te.meshmatcap_vert,fragmentShader:te.meshmatcap_frag},points:{uniforms:wn([Dt.points,Dt.fog]),vertexShader:te.points_vert,fragmentShader:te.points_frag},dashed:{uniforms:wn([Dt.common,Dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:te.linedashed_vert,fragmentShader:te.linedashed_frag},depth:{uniforms:wn([Dt.common,Dt.displacementmap]),vertexShader:te.depth_vert,fragmentShader:te.depth_frag},normal:{uniforms:wn([Dt.common,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,{opacity:{value:1}}]),vertexShader:te.meshnormal_vert,fragmentShader:te.meshnormal_frag},sprite:{uniforms:wn([Dt.sprite,Dt.fog]),vertexShader:te.sprite_vert,fragmentShader:te.sprite_frag},background:{uniforms:{uvTransform:{value:new Jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:te.background_vert,fragmentShader:te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Jt}},vertexShader:te.backgroundCube_vert,fragmentShader:te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:te.cube_vert,fragmentShader:te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:te.equirect_vert,fragmentShader:te.equirect_frag},distanceRGBA:{uniforms:wn([Dt.common,Dt.displacementmap,{referencePosition:{value:new j},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:te.distanceRGBA_vert,fragmentShader:te.distanceRGBA_frag},shadow:{uniforms:wn([Dt.lights,Dt.fog,{color:{value:new ie(0)},opacity:{value:1}}]),vertexShader:te.shadow_vert,fragmentShader:te.shadow_frag}};Nn.physical={uniforms:wn([Nn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Jt},clearcoatNormalScale:{value:new oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Jt},sheen:{value:0},sheenColor:{value:new ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Jt},transmissionSamplerSize:{value:new oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Jt},attenuationDistance:{value:0},attenuationColor:{value:new ie(0)},specularColor:{value:new ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Jt},anisotropyVector:{value:new oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Jt}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag};const _c={r:0,b:0,g:0},Yr=new ni,MM=new le;function bM(e,t,n,i,r,s,o){const a=new ie(0);let c=s===!0?0:1,l,u,f=null,h=0,d=null;function m(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?n:t).get(x)),x}function _(y){let x=!1;const v=m(y);v===null?p(a,c):v&&v.isColor&&(p(v,1),x=!0);const T=e.xr.getEnvironmentBlendMode();T==="additive"?i.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(e.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function g(y,x){const v=m(x);v&&(v.isCubeTexture||v.mapping===xl)?(u===void 0&&(u=new An(new Ro(1,1,1),new or({name:"BackgroundCubeMaterial",uniforms:_o(Nn.backgroundCube.uniforms),vertexShader:Nn.backgroundCube.vertexShader,fragmentShader:Nn.backgroundCube.fragmentShader,side:On,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(T,b,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Yr.copy(x.backgroundRotation),Yr.x*=-1,Yr.y*=-1,Yr.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Yr.y*=-1,Yr.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(MM.makeRotationFromEuler(Yr)),u.material.toneMapped=he.getTransfer(v.colorSpace)!==be,(f!==v||h!==v.version||d!==e.toneMapping)&&(u.material.needsUpdate=!0,f=v,h=v.version,d=e.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new An(new Es(2,2),new or({name:"BackgroundMaterial",uniforms:_o(Nn.background.uniforms),vertexShader:Nn.background.vertexShader,fragmentShader:Nn.background.fragmentShader,side:Nr,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=he.getTransfer(v.colorSpace)!==be,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(f!==v||h!==v.version||d!==e.toneMapping)&&(l.material.needsUpdate=!0,f=v,h=v.version,d=e.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,x){y.getRGB(_c,$g(e)),i.buffers.color.setClear(_c.r,_c.g,_c.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(y,x=1){a.set(y),c=x,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(a,c)},render:_,addToRenderList:g}}function EM(e,t){const n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,o=!1;function a(S,U,P,D,I){let V=!1;const O=f(D,P,U);s!==O&&(s=O,l(s.object)),V=d(S,D,P,I),V&&m(S,D,P,I),I!==null&&t.update(I,e.ELEMENT_ARRAY_BUFFER),(V||o)&&(o=!1,v(S,U,P,D),I!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(I).buffer))}function c(){return e.createVertexArray()}function l(S){return e.bindVertexArray(S)}function u(S){return e.deleteVertexArray(S)}function f(S,U,P){const D=P.wireframe===!0;let I=i[S.id];I===void 0&&(I={},i[S.id]=I);let V=I[U.id];V===void 0&&(V={},I[U.id]=V);let O=V[D];return O===void 0&&(O=h(c()),V[D]=O),O}function h(S){const U=[],P=[],D=[];for(let I=0;I<n;I++)U[I]=0,P[I]=0,D[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:P,attributeDivisors:D,object:S,attributes:{},index:null}}function d(S,U,P,D){const I=s.attributes,V=U.attributes;let O=0;const tt=P.getAttributes();for(const H in tt)if(tt[H].location>=0){const X=I[H];let F=V[H];if(F===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(F=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(F=S.instanceColor)),X===void 0||X.attribute!==F||F&&X.data!==F.data)return!0;O++}return s.attributesNum!==O||s.index!==D}function m(S,U,P,D){const I={},V=U.attributes;let O=0;const tt=P.getAttributes();for(const H in tt)if(tt[H].location>=0){let X=V[H];X===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(X=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(X=S.instanceColor));const F={};F.attribute=X,X&&X.data&&(F.data=X.data),I[H]=F,O++}s.attributes=I,s.attributesNum=O,s.index=D}function _(){const S=s.newAttributes;for(let U=0,P=S.length;U<P;U++)S[U]=0}function g(S){p(S,0)}function p(S,U){const P=s.newAttributes,D=s.enabledAttributes,I=s.attributeDivisors;P[S]=1,D[S]===0&&(e.enableVertexAttribArray(S),D[S]=1),I[S]!==U&&(e.vertexAttribDivisor(S,U),I[S]=U)}function y(){const S=s.newAttributes,U=s.enabledAttributes;for(let P=0,D=U.length;P<D;P++)U[P]!==S[P]&&(e.disableVertexAttribArray(P),U[P]=0)}function x(S,U,P,D,I,V,O){O===!0?e.vertexAttribIPointer(S,U,P,I,V):e.vertexAttribPointer(S,U,P,D,I,V)}function v(S,U,P,D){_();const I=D.attributes,V=P.getAttributes(),O=U.defaultAttributeValues;for(const tt in V){const H=V[tt];if(H.location>=0){let q=I[tt];if(q===void 0&&(tt==="instanceMatrix"&&S.instanceMatrix&&(q=S.instanceMatrix),tt==="instanceColor"&&S.instanceColor&&(q=S.instanceColor)),q!==void 0){const X=q.normalized,F=q.itemSize,W=t.get(q);if(W===void 0)continue;const J=W.buffer,N=W.type,z=W.bytesPerElement,nt=N===e.INT||N===e.UNSIGNED_INT||q.gpuType===Th;if(q.isInterleavedBufferAttribute){const $=q.data,it=$.stride,vt=q.offset;if($.isInstancedInterleavedBuffer){for(let bt=0;bt<H.locationSize;bt++)p(H.location+bt,$.meshPerAttribute);S.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let bt=0;bt<H.locationSize;bt++)g(H.location+bt);e.bindBuffer(e.ARRAY_BUFFER,J);for(let bt=0;bt<H.locationSize;bt++)x(H.location+bt,F/H.locationSize,N,X,it*z,(vt+F/H.locationSize*bt)*z,nt)}else{if(q.isInstancedBufferAttribute){for(let $=0;$<H.locationSize;$++)p(H.location+$,q.meshPerAttribute);S.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let $=0;$<H.locationSize;$++)g(H.location+$);e.bindBuffer(e.ARRAY_BUFFER,J);for(let $=0;$<H.locationSize;$++)x(H.location+$,F/H.locationSize,N,X,F*z,F/H.locationSize*$*z,nt)}}else if(O!==void 0){const X=O[tt];if(X!==void 0)switch(X.length){case 2:e.vertexAttrib2fv(H.location,X);break;case 3:e.vertexAttrib3fv(H.location,X);break;case 4:e.vertexAttrib4fv(H.location,X);break;default:e.vertexAttrib1fv(H.location,X)}}}}y()}function T(){C();for(const S in i){const U=i[S];for(const P in U){const D=U[P];for(const I in D)u(D[I].object),delete D[I];delete U[P]}delete i[S]}}function b(S){if(i[S.id]===void 0)return;const U=i[S.id];for(const P in U){const D=U[P];for(const I in D)u(D[I].object),delete D[I];delete U[P]}delete i[S.id]}function w(S){for(const U in i){const P=i[U];if(P[S.id]===void 0)continue;const D=P[S.id];for(const I in D)u(D[I].object),delete D[I];delete P[S.id]}}function C(){M(),o=!0,s!==r&&(s=r,l(s.object))}function M(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:C,resetDefaultState:M,dispose:T,releaseStatesOfGeometry:b,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:g,disableUnusedAttributes:y}}function wM(e,t,n){let i;function r(l){i=l}function s(l,u){e.drawArrays(i,l,u),n.update(u,i,1)}function o(l,u,f){f!==0&&(e.drawArraysInstanced(i,l,u,f),n.update(u,i,f))}function a(l,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,f);let d=0;for(let m=0;m<f;m++)d+=u[m];n.update(d,i,1)}function c(l,u,f,h){if(f===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let m=0;m<l.length;m++)o(l[m],u[m],h[m]);else{d.multiDrawArraysInstancedWEBGL(i,l,0,u,0,h,0,f);let m=0;for(let _=0;_<f;_++)m+=u[_]*h[_];n.update(m,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function TM(e,t,n,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");r=e.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(w){return!(w!==Ci&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const C=w===Oa&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==sr&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Oi&&!C)}function c(w){if(w==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=n.precision!==void 0?n.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=n.logarithmicDepthBuffer===!0,h=n.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),p=e.getParameter(e.MAX_VERTEX_ATTRIBS),y=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),x=e.getParameter(e.MAX_VARYING_VECTORS),v=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),T=m>0,b=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reverseDepthBuffer:h,maxTextures:d,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:y,maxVaryings:x,maxFragmentUniforms:v,vertexTextures:T,maxSamples:b}}function AM(e){const t=this;let n=null,i=0,r=!1,s=!1;const o=new Jr,a=new Jt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||i!==0||r;return r=h,i=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){n=u(f,h,0)},this.setState=function(f,h,d){const m=f.clippingPlanes,_=f.clipIntersection,g=f.clipShadows,p=e.get(f);if(!r||m===null||m.length===0||s&&!g)s?u(null):l();else{const y=s?0:i,x=y*4;let v=p.clippingState||null;c.value=v,v=u(m,h,x,d);for(let T=0;T!==x;++T)v[T]=n[T];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,h,d,m){const _=f!==null?f.length:0;let g=null;if(_!==0){if(g=c.value,m!==!0||g===null){const p=d+_*4,y=h.matrixWorldInverse;a.getNormalMatrix(y),(g===null||g.length<p)&&(g=new Float32Array(p));for(let x=0,v=d;x!==_;++x,v+=4)o.copy(f[x]).applyMatrix4(y,a),o.normal.toArray(g,v),g[v+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function CM(e){let t=new WeakMap;function n(o,a){return a===lf?o.mapping=ho:a===uf&&(o.mapping=po),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===lf||a===uf)if(t.has(o)){const c=t.get(o).texture;return n(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new zx(c.height);return l.fromEquirectangularTexture(e,o),t.set(o,l),o.addEventListener("dispose",r),n(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}class za extends Xg{constructor(t=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,o=i+t,a=r+n,c=r-n;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Ks=4,cp=[.125,.215,.35,.446,.526,.582],is=20,gu=new za,lp=new ie;let _u=null,vu=0,yu=0,xu=!1;const Qr=(1+Math.sqrt(5))/2,$s=1/Qr,up=[new j(-Qr,$s,0),new j(Qr,$s,0),new j(-$s,0,Qr),new j($s,0,Qr),new j(0,Qr,-$s),new j(0,Qr,$s),new j(-1,1,-1),new j(1,1,-1),new j(-1,1,1),new j(1,1,1)];class fp{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,i=.1,r=100){_u=this._renderer.getRenderTarget(),vu=this._renderer.getActiveCubeFace(),yu=this._renderer.getActiveMipmapLevel(),xu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=dp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(_u,vu,yu),this._renderer.xr.enabled=xu,t.scissorTest=!1,vc(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===ho||t.mapping===po?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),_u=this._renderer.getRenderTarget(),vu=this._renderer.getActiveCubeFace(),yu=this._renderer.getActiveMipmapLevel(),xu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:ui,minFilter:ui,generateMipmaps:!1,type:Oa,format:Ci,colorSpace:Ao,depthBuffer:!1},r=hp(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hp(t,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=RM(s)),this._blurMaterial=PM(s,t,n)}return r}_compileMaterial(t){const n=new An(this._lodPlanes[0],t);this._renderer.compile(n,gu)}_sceneToCubeUV(t,n,i,r){const a=new Fn(90,1,n,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(lp),u.toneMapping=Ur,u.autoClear=!1;const d=new Ml({name:"PMREM.Background",side:On,depthWrite:!1,depthTest:!1}),m=new An(new Ro,d);let _=!1;const g=t.background;g?g.isColor&&(d.color.copy(g),t.background=null,_=!0):(d.color.copy(lp),_=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):y===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const x=this._cubeSize;vc(r,y*x,p>2?x:0,x,x),u.setRenderTarget(r),_&&u.render(m,a),u.render(t,a)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=h,u.autoClear=f,t.background=g}_textureToCubeUV(t,n){const i=this._renderer,r=t.mapping===ho||t.mapping===po;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=pp()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=dp());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new An(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const c=this._cubeSize;vc(n,0,0,3*c,2*c),i.setRenderTarget(n),i.render(o,gu)}_applyPMREM(t){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=up[(r-s-1)%up.length];this._blur(t,s-1,s,o,a)}n.autoClear=i}_blur(t,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,n,i,r,"latitudinal",s),this._halfBlur(o,t,i,i,r,"longitudinal",s)}_halfBlur(t,n,i,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new An(this._lodPlanes[r],l),h=l.uniforms,d=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*is-1),_=s/m,g=isFinite(s)?1+Math.floor(u*_):is;g>is&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${is}`);const p=[];let y=0;for(let w=0;w<is;++w){const C=w/_,M=Math.exp(-C*C/2);p.push(M),w===0?y+=M:w<g&&(y+=2*M)}for(let w=0;w<p.length;w++)p[w]=p[w]/y;h.envMap.value=t.texture,h.samples.value=g,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:x}=this;h.dTheta.value=m,h.mipInt.value=x-i;const v=this._sizeLods[r],T=3*v*(r>x-Ks?r-x+Ks:0),b=4*(this._cubeSize-v);vc(n,T,b,3*v,2*v),c.setRenderTarget(n),c.render(f,gu)}}function RM(e){const t=[],n=[],i=[];let r=e;const s=e-Ks+1+cp.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let c=1/a;o>e-Ks?c=cp[o-e+Ks-1]:o===0&&(c=0),i.push(c);const l=1/(a-2),u=-l,f=1+l,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,m=6,_=3,g=2,p=1,y=new Float32Array(_*m*d),x=new Float32Array(g*m*d),v=new Float32Array(p*m*d);for(let b=0;b<d;b++){const w=b%3*2/3-1,C=b>2?0:-1,M=[w,C,0,w+2/3,C,0,w+2/3,C+1,0,w,C,0,w+2/3,C+1,0,w,C+1,0];y.set(M,_*m*b),x.set(h,g*m*b);const S=[b,b,b,b,b,b];v.set(S,p*m*b)}const T=new Vi;T.setAttribute("position",new pi(y,_)),T.setAttribute("uv",new pi(x,g)),T.setAttribute("faceIndex",new pi(v,p)),t.push(T),r>Ks&&r--}return{lodPlanes:t,sizeLods:n,sigmas:i}}function hp(e,t,n){const i=new vs(e,t,n);return i.texture.mapping=xl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function vc(e,t,n,i,r){e.viewport.set(t,n,i,r),e.scissor.set(t,n,i,r)}function PM(e,t,n){const i=new Float32Array(is),r=new j(0,1,0);return new or({name:"SphericalGaussianBlur",defines:{n:is,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Fh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Pr,depthTest:!1,depthWrite:!1})}function dp(){return new or({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Pr,depthTest:!1,depthWrite:!1})}function pp(){return new or({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pr,depthTest:!1,depthWrite:!1})}function Fh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function UM(e){let t=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===lf||c===uf,u=c===ho||c===po;if(l||u){let f=t.get(a);const h=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return n===null&&(n=new fp(e)),f=l?n.fromEquirectangular(a,f):n.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{const d=a.image;return l&&d&&d.height>0||u&&d&&r(d)?(n===null&&(n=new fp(e)),f=l?n.fromEquirectangular(a):n.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function r(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function DM(e){const t={};function n(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=e.getExtension(i)}return t[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&na("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function IM(e,t,n,i){const r={},s=new WeakMap;function o(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const m in h.attributes)t.remove(h.attributes[m]);for(const m in h.morphAttributes){const _=h.morphAttributes[m];for(let g=0,p=_.length;g<p;g++)t.remove(_[g])}h.removeEventListener("dispose",o),delete r[h.id];const d=s.get(h);d&&(t.remove(d),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,n.memory.geometries++),h}function c(f){const h=f.attributes;for(const m in h)t.update(h[m],e.ARRAY_BUFFER);const d=f.morphAttributes;for(const m in d){const _=d[m];for(let g=0,p=_.length;g<p;g++)t.update(_[g],e.ARRAY_BUFFER)}}function l(f){const h=[],d=f.index,m=f.attributes.position;let _=0;if(d!==null){const y=d.array;_=d.version;for(let x=0,v=y.length;x<v;x+=3){const T=y[x+0],b=y[x+1],w=y[x+2];h.push(T,b,b,w,w,T)}}else if(m!==void 0){const y=m.array;_=m.version;for(let x=0,v=y.length/3-1;x<v;x+=3){const T=x+0,b=x+1,w=x+2;h.push(T,b,b,w,w,T)}}else return;const g=new(kg(h)?Wg:Hg)(h,1);g.version=_;const p=s.get(f);p&&t.remove(p),s.set(f,g)}function u(f){const h=s.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&l(f)}else l(f);return s.get(f)}return{get:a,update:c,getWireframeAttribute:u}}function LM(e,t,n){let i;function r(h){i=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function c(h,d){e.drawElements(i,d,s,h*o),n.update(d,i,1)}function l(h,d,m){m!==0&&(e.drawElementsInstanced(i,d,s,h*o,m),n.update(d,i,m))}function u(h,d,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,h,0,m);let g=0;for(let p=0;p<m;p++)g+=d[p];n.update(g,i,1)}function f(h,d,m,_){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<h.length;p++)l(h[p]/o,d[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(i,d,0,s,h,0,_,0,m);let p=0;for(let y=0;y<m;y++)p+=d[y]*_[y];n.update(p,i,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function FM(e){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case e.TRIANGLES:n.triangles+=a*(s/3);break;case e.LINES:n.lines+=a*(s/2);break;case e.LINE_STRIP:n.lines+=a*(s-1);break;case e.LINE_LOOP:n.lines+=a*s;break;case e.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:r,update:i}}function NM(e,t,n){const i=new WeakMap,r=new Se;function s(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==f){let M=function(){w.dispose(),i.delete(a),a.removeEventListener("dispose",M)};h!==void 0&&h.texture.dispose();const d=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let x=0;d===!0&&(x=1),m===!0&&(x=2),_===!0&&(x=3);let v=a.attributes.position.count*x,T=1;v>t.maxTextureSize&&(T=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);const b=new Float32Array(v*T*4*f),w=new Bg(b,v,T,f);w.type=Oi,w.needsUpdate=!0;const C=x*4;for(let S=0;S<f;S++){const U=g[S],P=p[S],D=y[S],I=v*T*4*S;for(let V=0;V<U.count;V++){const O=V*C;d===!0&&(r.fromBufferAttribute(U,V),b[I+O+0]=r.x,b[I+O+1]=r.y,b[I+O+2]=r.z,b[I+O+3]=0),m===!0&&(r.fromBufferAttribute(P,V),b[I+O+4]=r.x,b[I+O+5]=r.y,b[I+O+6]=r.z,b[I+O+7]=0),_===!0&&(r.fromBufferAttribute(D,V),b[I+O+8]=r.x,b[I+O+9]=r.y,b[I+O+10]=r.z,b[I+O+11]=D.itemSize===4?r.w:1)}}h={count:f,texture:w,size:new oe(v,T)},i.set(a,h),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(e,"morphTexture",o.morphTexture,n);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];const m=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(e,"morphTargetBaseInfluence",m),c.getUniforms().setValue(e,"morphTargetInfluences",l)}c.getUniforms().setValue(e,"morphTargetsTexture",h.texture,n),c.getUniforms().setValue(e,"morphTargetsTextureSize",h.size)}return{update:s}}function OM(e,t,n,i){let r=new WeakMap;function s(c){const l=i.render.frame,u=c.geometry,f=t.get(c,u);if(r.get(f)!==l&&(t.update(f),r.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(n.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,e.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const h=c.skeleton;r.get(h)!==l&&(h.update(),r.set(h,l))}return f}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),n.remove(l.instanceMatrix),l.instanceColor!==null&&n.remove(l.instanceColor)}return{update:s,dispose:o}}class jg extends Mn{constructor(t,n,i,r,s,o,a,c,l,u=no){if(u!==no&&u!==go)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===no&&(i=_s),i===void 0&&u===go&&(i=mo),super(null,r,s,o,a,c,u,i,l),this.isDepthTexture=!0,this.image={width:t,height:n},this.magFilter=a!==void 0?a:Qn,this.minFilter=c!==void 0?c:Qn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const qg=new Mn,mp=new jg(1,1),Kg=new Bg,Jg=new bx,Qg=new Yg,gp=[],_p=[],vp=new Float32Array(16),yp=new Float32Array(9),xp=new Float32Array(4);function Po(e,t,n){const i=e[0];if(i<=0||i>0)return e;const r=t*n;let s=gp[r];if(s===void 0&&(s=new Float32Array(r),gp[r]=s),t!==0){i.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=n,e[o].toArray(s,a)}return s}function Qe(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function tn(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function El(e,t){let n=_p[t];n===void 0&&(n=new Int32Array(t),_p[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function kM(e,t){const n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function zM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Qe(n,t))return;e.uniform2fv(this.addr,t),tn(n,t)}}function BM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Qe(n,t))return;e.uniform3fv(this.addr,t),tn(n,t)}}function GM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Qe(n,t))return;e.uniform4fv(this.addr,t),tn(n,t)}}function VM(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Qe(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),tn(n,t)}else{if(Qe(n,i))return;xp.set(i),e.uniformMatrix2fv(this.addr,!1,xp),tn(n,i)}}function HM(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Qe(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),tn(n,t)}else{if(Qe(n,i))return;yp.set(i),e.uniformMatrix3fv(this.addr,!1,yp),tn(n,i)}}function WM(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Qe(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),tn(n,t)}else{if(Qe(n,i))return;vp.set(i),e.uniformMatrix4fv(this.addr,!1,vp),tn(n,i)}}function $M(e,t){const n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function XM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Qe(n,t))return;e.uniform2iv(this.addr,t),tn(n,t)}}function YM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Qe(n,t))return;e.uniform3iv(this.addr,t),tn(n,t)}}function ZM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Qe(n,t))return;e.uniform4iv(this.addr,t),tn(n,t)}}function jM(e,t){const n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function qM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Qe(n,t))return;e.uniform2uiv(this.addr,t),tn(n,t)}}function KM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Qe(n,t))return;e.uniform3uiv(this.addr,t),tn(n,t)}}function JM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Qe(n,t))return;e.uniform4uiv(this.addr,t),tn(n,t)}}function QM(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r);let s;this.type===e.SAMPLER_2D_SHADOW?(mp.compareFunction=Og,s=mp):s=qg,n.setTexture2D(t||s,r)}function tb(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(t||Jg,r)}function eb(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(t||Qg,r)}function nb(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(t||Kg,r)}function ib(e){switch(e){case 5126:return kM;case 35664:return zM;case 35665:return BM;case 35666:return GM;case 35674:return VM;case 35675:return HM;case 35676:return WM;case 5124:case 35670:return $M;case 35667:case 35671:return XM;case 35668:case 35672:return YM;case 35669:case 35673:return ZM;case 5125:return jM;case 36294:return qM;case 36295:return KM;case 36296:return JM;case 35678:case 36198:case 36298:case 36306:case 35682:return QM;case 35679:case 36299:case 36307:return tb;case 35680:case 36300:case 36308:case 36293:return eb;case 36289:case 36303:case 36311:case 36292:return nb}}function rb(e,t){e.uniform1fv(this.addr,t)}function sb(e,t){const n=Po(t,this.size,2);e.uniform2fv(this.addr,n)}function ob(e,t){const n=Po(t,this.size,3);e.uniform3fv(this.addr,n)}function ab(e,t){const n=Po(t,this.size,4);e.uniform4fv(this.addr,n)}function cb(e,t){const n=Po(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function lb(e,t){const n=Po(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function ub(e,t){const n=Po(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function fb(e,t){e.uniform1iv(this.addr,t)}function hb(e,t){e.uniform2iv(this.addr,t)}function db(e,t){e.uniform3iv(this.addr,t)}function pb(e,t){e.uniform4iv(this.addr,t)}function mb(e,t){e.uniform1uiv(this.addr,t)}function gb(e,t){e.uniform2uiv(this.addr,t)}function _b(e,t){e.uniform3uiv(this.addr,t)}function vb(e,t){e.uniform4uiv(this.addr,t)}function yb(e,t,n){const i=this.cache,r=t.length,s=El(n,r);Qe(i,s)||(e.uniform1iv(this.addr,s),tn(i,s));for(let o=0;o!==r;++o)n.setTexture2D(t[o]||qg,s[o])}function xb(e,t,n){const i=this.cache,r=t.length,s=El(n,r);Qe(i,s)||(e.uniform1iv(this.addr,s),tn(i,s));for(let o=0;o!==r;++o)n.setTexture3D(t[o]||Jg,s[o])}function Sb(e,t,n){const i=this.cache,r=t.length,s=El(n,r);Qe(i,s)||(e.uniform1iv(this.addr,s),tn(i,s));for(let o=0;o!==r;++o)n.setTextureCube(t[o]||Qg,s[o])}function Mb(e,t,n){const i=this.cache,r=t.length,s=El(n,r);Qe(i,s)||(e.uniform1iv(this.addr,s),tn(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(t[o]||Kg,s[o])}function bb(e){switch(e){case 5126:return rb;case 35664:return sb;case 35665:return ob;case 35666:return ab;case 35674:return cb;case 35675:return lb;case 35676:return ub;case 5124:case 35670:return fb;case 35667:case 35671:return hb;case 35668:case 35672:return db;case 35669:case 35673:return pb;case 5125:return mb;case 36294:return gb;case 36295:return _b;case 36296:return vb;case 35678:case 36198:case 36298:case 36306:case 35682:return yb;case 35679:case 36299:case 36307:return xb;case 35680:case 36300:case 36308:case 36293:return Sb;case 36289:case 36303:case 36311:case 36292:return Mb}}class Eb{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=ib(n.type)}}class wb{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=bb(n.type)}}class Tb{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,n[a.id],i)}}}const Su=/(\w+)(\])?(\[|\.)?/g;function Sp(e,t){e.seq.push(t),e.map[t.id]=t}function Ab(e,t,n){const i=e.name,r=i.length;for(Su.lastIndex=0;;){const s=Su.exec(i),o=Su.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){Sp(n,l===void 0?new Eb(a,e,t):new wb(a,e,t));break}else{let f=n.map[a];f===void 0&&(f=new Tb(a),Sp(n,f)),n=f}}}class Vc{constructor(t,n){this.seq=[],this.map={};const i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(n,r),o=t.getUniformLocation(n,s.name);Ab(s,o,this)}}setValue(t,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(t,i,r)}setOptional(t,n,i){const r=n[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,r)}}static seqWithValue(t,n){const i=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in n&&i.push(o)}return i}}function Mp(e,t,n){const i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}const Cb=37297;let Rb=0;function Pb(e,t){const n=e.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}const bp=new Jt;function Ub(e){he._getMatrix(bp,he.workingColorSpace,e);const t=`mat3( ${bp.elements.map(n=>n.toFixed(4))} )`;switch(he.getTransfer(e)){case Sl:return[t,"LinearTransferOETF"];case be:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function Ep(e,t,n){const i=e.getShaderParameter(t,e.COMPILE_STATUS),r=e.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+Pb(e.getShaderSource(t),o)}else return r}function Db(e,t){const n=Ub(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function Ib(e,t){let n;switch(t){case Ly:n="Linear";break;case Fy:n="Reinhard";break;case Ny:n="Cineon";break;case Oy:n="ACESFilmic";break;case zy:n="AgX";break;case By:n="Neutral";break;case ky:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const yc=new j;function Lb(){he.getLuminanceCoefficients(yc);const e=yc.x.toFixed(4),t=yc.y.toFixed(4),n=yc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Fb(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ia).join(`
`)}function Nb(e){const t=[];for(const n in e){const i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function Ob(e,t){const n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=e.getActiveAttrib(t,r),o=s.name;let a=1;s.type===e.FLOAT_MAT2&&(a=2),s.type===e.FLOAT_MAT3&&(a=3),s.type===e.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:e.getAttribLocation(t,o),locationSize:a}}return n}function ia(e){return e!==""}function wp(e,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Tp(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const kb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Bf(e){return e.replace(kb,Bb)}const zb=new Map;function Bb(e,t){let n=te[t];if(n===void 0){const i=zb.get(t);if(i!==void 0)n=te[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Bf(n)}const Gb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ap(e){return e.replace(Gb,Vb)}function Vb(e,t,n,i){let r="";for(let s=parseInt(t);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Cp(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Hb(e){let t="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===Mg?t="SHADOWMAP_TYPE_PCF":e.shadowMapType===bg?t="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===qi&&(t="SHADOWMAP_TYPE_VSM"),t}function Wb(e){let t="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case ho:case po:t="ENVMAP_TYPE_CUBE";break;case xl:t="ENVMAP_TYPE_CUBE_UV";break}return t}function $b(e){let t="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode){case po:t="ENVMAP_MODE_REFRACTION";break}return t}function Xb(e){let t="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case Eg:t="ENVMAP_BLENDING_MULTIPLY";break;case Dy:t="ENVMAP_BLENDING_MIX";break;case Iy:t="ENVMAP_BLENDING_ADD";break}return t}function Yb(e){const t=e.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function Zb(e,t,n,i){const r=e.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const c=Hb(n),l=Wb(n),u=$b(n),f=Xb(n),h=Yb(n),d=Fb(n),m=Nb(s),_=r.createProgram();let g,p,y=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m].filter(ia).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m].filter(ia).join(`
`),p.length>0&&(p+=`
`)):(g=[Cp(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ia).join(`
`),p=[Cp(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+l:"",n.envMap?"#define "+u:"",n.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Ur?"#define TONE_MAPPING":"",n.toneMapping!==Ur?te.tonemapping_pars_fragment:"",n.toneMapping!==Ur?Ib("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",te.colorspace_pars_fragment,Db("linearToOutputTexel",n.outputColorSpace),Lb(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(ia).join(`
`)),o=Bf(o),o=wp(o,n),o=Tp(o,n),a=Bf(a),a=wp(a,n),a=Tp(a,n),o=Ap(o),a=Ap(a),n.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",n.glslVersion===Bd?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Bd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=y+g+o,v=y+p+a,T=Mp(r,r.VERTEX_SHADER,x),b=Mp(r,r.FRAGMENT_SHADER,v);r.attachShader(_,T),r.attachShader(_,b),n.index0AttributeName!==void 0?r.bindAttribLocation(_,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function w(U){if(e.debug.checkShaderErrors){const P=r.getProgramInfoLog(_).trim(),D=r.getShaderInfoLog(T).trim(),I=r.getShaderInfoLog(b).trim();let V=!0,O=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(V=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(r,_,T,b);else{const tt=Ep(r,T,"vertex"),H=Ep(r,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+P+`
`+tt+`
`+H)}else P!==""?console.warn("THREE.WebGLProgram: Program Info Log:",P):(D===""||I==="")&&(O=!1);O&&(U.diagnostics={runnable:V,programLog:P,vertexShader:{log:D,prefix:g},fragmentShader:{log:I,prefix:p}})}r.deleteShader(T),r.deleteShader(b),C=new Vc(r,_),M=Ob(r,_)}let C;this.getUniforms=function(){return C===void 0&&w(this),C};let M;this.getAttributes=function(){return M===void 0&&w(this),M};let S=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(_,Cb)),S},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Rb++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=b,this}let jb=0;class qb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){const n=this.shaderCache;let i=n.get(t);return i===void 0&&(i=new Kb(t),n.set(t,i)),i}}class Kb{constructor(t){this.id=jb++,this.code=t,this.usedTimes=0}}function Jb(e,t,n,i,r,s,o){const a=new Gg,c=new qb,l=new Set,u=[],f=r.logarithmicDepthBuffer,h=r.vertexTextures;let d=r.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return l.add(M),M===0?"uv":`uv${M}`}function g(M,S,U,P,D){const I=P.fog,V=D.geometry,O=M.isMeshStandardMaterial?P.environment:null,tt=(M.isMeshStandardMaterial?n:t).get(M.envMap||O),H=tt&&tt.mapping===xl?tt.image.height:null,q=m[M.type];M.precision!==null&&(d=r.getMaxPrecision(M.precision),d!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",d,"instead."));const X=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,F=X!==void 0?X.length:0;let W=0;V.morphAttributes.position!==void 0&&(W=1),V.morphAttributes.normal!==void 0&&(W=2),V.morphAttributes.color!==void 0&&(W=3);let J,N,z,nt;if(q){const Xt=Nn[q];J=Xt.vertexShader,N=Xt.fragmentShader}else J=M.vertexShader,N=M.fragmentShader,c.update(M),z=c.getVertexShaderID(M),nt=c.getFragmentShaderID(M);const $=e.getRenderTarget(),it=e.state.buffers.depth.getReversed(),vt=D.isInstancedMesh===!0,bt=D.isBatchedMesh===!0,St=!!M.map,ct=!!M.matcap,Ot=!!tt,k=!!M.aoMap,It=!!M.lightMap,wt=!!M.bumpMap,At=!!M.normalMap,at=!!M.displacementMap,Pt=!!M.emissiveMap,yt=!!M.metalnessMap,A=!!M.roughnessMap,E=M.anisotropy>0,B=M.clearcoat>0,Q=M.dispersion>0,K=M.iridescence>0,ot=M.sheen>0,gt=M.transmission>0,lt=E&&!!M.anisotropyMap,dt=B&&!!M.clearcoatMap,Lt=B&&!!M.clearcoatNormalMap,_t=B&&!!M.clearcoatRoughnessMap,Ct=K&&!!M.iridescenceMap,Rt=K&&!!M.iridescenceThicknessMap,Ut=ot&&!!M.sheenColorMap,ht=ot&&!!M.sheenRoughnessMap,Ht=!!M.specularMap,Ft=!!M.specularColorMap,Qt=!!M.specularIntensityMap,G=gt&&!!M.transmissionMap,ft=gt&&!!M.thicknessMap,et=!!M.gradientMap,pt=!!M.alphaMap,Mt=M.alphaTest>0,xt=!!M.alphaHash,kt=!!M.extensions;let Zt=Ur;M.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Zt=e.toneMapping);const Vt={shaderID:q,shaderType:M.type,shaderName:M.name,vertexShader:J,fragmentShader:N,defines:M.defines,customVertexShaderID:z,customFragmentShaderID:nt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:d,batching:bt,batchingColor:bt&&D._colorsTexture!==null,instancing:vt,instancingColor:vt&&D.instanceColor!==null,instancingMorph:vt&&D.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:$===null?e.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:Ao,alphaToCoverage:!!M.alphaToCoverage,map:St,matcap:ct,envMap:Ot,envMapMode:Ot&&tt.mapping,envMapCubeUVHeight:H,aoMap:k,lightMap:It,bumpMap:wt,normalMap:At,displacementMap:h&&at,emissiveMap:Pt,normalMapObjectSpace:At&&M.normalMapType===Hy,normalMapTangentSpace:At&&M.normalMapType===Ng,metalnessMap:yt,roughnessMap:A,anisotropy:E,anisotropyMap:lt,clearcoat:B,clearcoatMap:dt,clearcoatNormalMap:Lt,clearcoatRoughnessMap:_t,dispersion:Q,iridescence:K,iridescenceMap:Ct,iridescenceThicknessMap:Rt,sheen:ot,sheenColorMap:Ut,sheenRoughnessMap:ht,specularMap:Ht,specularColorMap:Ft,specularIntensityMap:Qt,transmission:gt,transmissionMap:G,thicknessMap:ft,gradientMap:et,opaque:M.transparent===!1&&M.blending===eo&&M.alphaToCoverage===!1,alphaMap:pt,alphaTest:Mt,alphaHash:xt,combine:M.combine,mapUv:St&&_(M.map.channel),aoMapUv:k&&_(M.aoMap.channel),lightMapUv:It&&_(M.lightMap.channel),bumpMapUv:wt&&_(M.bumpMap.channel),normalMapUv:At&&_(M.normalMap.channel),displacementMapUv:at&&_(M.displacementMap.channel),emissiveMapUv:Pt&&_(M.emissiveMap.channel),metalnessMapUv:yt&&_(M.metalnessMap.channel),roughnessMapUv:A&&_(M.roughnessMap.channel),anisotropyMapUv:lt&&_(M.anisotropyMap.channel),clearcoatMapUv:dt&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:Lt&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_t&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Ct&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:Rt&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:Ut&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:ht&&_(M.sheenRoughnessMap.channel),specularMapUv:Ht&&_(M.specularMap.channel),specularColorMapUv:Ft&&_(M.specularColorMap.channel),specularIntensityMapUv:Qt&&_(M.specularIntensityMap.channel),transmissionMapUv:G&&_(M.transmissionMap.channel),thicknessMapUv:ft&&_(M.thicknessMap.channel),alphaMapUv:pt&&_(M.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(At||E),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!V.attributes.uv&&(St||pt),fog:!!I,useFog:M.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:it,skinning:D.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:F,morphTextureStride:W,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:e.shadowMap.enabled&&U.length>0,shadowMapType:e.shadowMap.type,toneMapping:Zt,decodeVideoTexture:St&&M.map.isVideoTexture===!0&&he.getTransfer(M.map.colorSpace)===be,decodeVideoTextureEmissive:Pt&&M.emissiveMap.isVideoTexture===!0&&he.getTransfer(M.emissiveMap.colorSpace)===be,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Li,flipSided:M.side===On,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:kt&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(kt&&M.extensions.multiDraw===!0||bt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Vt.vertexUv1s=l.has(1),Vt.vertexUv2s=l.has(2),Vt.vertexUv3s=l.has(3),l.clear(),Vt}function p(M){const S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(const U in M.defines)S.push(U),S.push(M.defines[U]);return M.isRawShaderMaterial===!1&&(y(S,M),x(S,M),S.push(e.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function y(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function x(M,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),M.push(a.mask)}function v(M){const S=m[M.type];let U;if(S){const P=Nn[S];U=bl.clone(P.uniforms)}else U=M.uniforms;return U}function T(M,S){let U;for(let P=0,D=u.length;P<D;P++){const I=u[P];if(I.cacheKey===S){U=I,++U.usedTimes;break}}return U===void 0&&(U=new Zb(e,S,M,s),u.push(U)),U}function b(M){if(--M.usedTimes===0){const S=u.indexOf(M);u[S]=u[u.length-1],u.pop(),M.destroy()}}function w(M){c.remove(M)}function C(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:v,acquireProgram:T,releaseProgram:b,releaseShaderCache:w,programs:u,dispose:C}}function Qb(){let e=new WeakMap;function t(o){return e.has(o)}function n(o){let a=e.get(o);return a===void 0&&(a={},e.set(o,a)),a}function i(o){e.delete(o)}function r(o,a,c){e.get(o)[a]=c}function s(){e=new WeakMap}return{has:t,get:n,remove:i,update:r,dispose:s}}function tE(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.z!==t.z?e.z-t.z:e.id-t.id}function Rp(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function Pp(){const e=[];let t=0;const n=[],i=[],r=[];function s(){t=0,n.length=0,i.length=0,r.length=0}function o(f,h,d,m,_,g){let p=e[t];return p===void 0?(p={id:f.id,object:f,geometry:h,material:d,groupOrder:m,renderOrder:f.renderOrder,z:_,group:g},e[t]=p):(p.id=f.id,p.object=f,p.geometry=h,p.material=d,p.groupOrder=m,p.renderOrder=f.renderOrder,p.z=_,p.group=g),t++,p}function a(f,h,d,m,_,g){const p=o(f,h,d,m,_,g);d.transmission>0?i.push(p):d.transparent===!0?r.push(p):n.push(p)}function c(f,h,d,m,_,g){const p=o(f,h,d,m,_,g);d.transmission>0?i.unshift(p):d.transparent===!0?r.unshift(p):n.unshift(p)}function l(f,h){n.length>1&&n.sort(f||tE),i.length>1&&i.sort(h||Rp),r.length>1&&r.sort(h||Rp)}function u(){for(let f=t,h=e.length;f<h;f++){const d=e[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:c,finish:u,sort:l}}function eE(){let e=new WeakMap;function t(i,r){const s=e.get(i);let o;return s===void 0?(o=new Pp,e.set(i,[o])):r>=s.length?(o=new Pp,s.push(o)):o=s[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}function nE(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new j,color:new ie};break;case"SpotLight":n={position:new j,direction:new j,color:new ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new j,color:new ie,distance:0,decay:0};break;case"HemisphereLight":n={direction:new j,skyColor:new ie,groundColor:new ie};break;case"RectAreaLight":n={color:new ie,position:new j,halfWidth:new j,halfHeight:new j};break}return e[t.id]=n,n}}}function iE(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}let rE=0;function sE(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function oE(e){const t=new nE,n=iE(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new j);const r=new j,s=new le,o=new le;function a(l){let u=0,f=0,h=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let d=0,m=0,_=0,g=0,p=0,y=0,x=0,v=0,T=0,b=0,w=0;l.sort(sE);for(let M=0,S=l.length;M<S;M++){const U=l[M],P=U.color,D=U.intensity,I=U.distance,V=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)u+=P.r*D,f+=P.g*D,h+=P.b*D;else if(U.isLightProbe){for(let O=0;O<9;O++)i.probe[O].addScaledVector(U.sh.coefficients[O],D);w++}else if(U.isDirectionalLight){const O=t.get(U);if(O.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const tt=U.shadow,H=n.get(U);H.shadowIntensity=tt.intensity,H.shadowBias=tt.bias,H.shadowNormalBias=tt.normalBias,H.shadowRadius=tt.radius,H.shadowMapSize=tt.mapSize,i.directionalShadow[d]=H,i.directionalShadowMap[d]=V,i.directionalShadowMatrix[d]=U.shadow.matrix,y++}i.directional[d]=O,d++}else if(U.isSpotLight){const O=t.get(U);O.position.setFromMatrixPosition(U.matrixWorld),O.color.copy(P).multiplyScalar(D),O.distance=I,O.coneCos=Math.cos(U.angle),O.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),O.decay=U.decay,i.spot[_]=O;const tt=U.shadow;if(U.map&&(i.spotLightMap[T]=U.map,T++,tt.updateMatrices(U),U.castShadow&&b++),i.spotLightMatrix[_]=tt.matrix,U.castShadow){const H=n.get(U);H.shadowIntensity=tt.intensity,H.shadowBias=tt.bias,H.shadowNormalBias=tt.normalBias,H.shadowRadius=tt.radius,H.shadowMapSize=tt.mapSize,i.spotShadow[_]=H,i.spotShadowMap[_]=V,v++}_++}else if(U.isRectAreaLight){const O=t.get(U);O.color.copy(P).multiplyScalar(D),O.halfWidth.set(U.width*.5,0,0),O.halfHeight.set(0,U.height*.5,0),i.rectArea[g]=O,g++}else if(U.isPointLight){const O=t.get(U);if(O.color.copy(U.color).multiplyScalar(U.intensity),O.distance=U.distance,O.decay=U.decay,U.castShadow){const tt=U.shadow,H=n.get(U);H.shadowIntensity=tt.intensity,H.shadowBias=tt.bias,H.shadowNormalBias=tt.normalBias,H.shadowRadius=tt.radius,H.shadowMapSize=tt.mapSize,H.shadowCameraNear=tt.camera.near,H.shadowCameraFar=tt.camera.far,i.pointShadow[m]=H,i.pointShadowMap[m]=V,i.pointShadowMatrix[m]=U.shadow.matrix,x++}i.point[m]=O,m++}else if(U.isHemisphereLight){const O=t.get(U);O.skyColor.copy(U.color).multiplyScalar(D),O.groundColor.copy(U.groundColor).multiplyScalar(D),i.hemi[p]=O,p++}}g>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Dt.LTC_FLOAT_1,i.rectAreaLTC2=Dt.LTC_FLOAT_2):(i.rectAreaLTC1=Dt.LTC_HALF_1,i.rectAreaLTC2=Dt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const C=i.hash;(C.directionalLength!==d||C.pointLength!==m||C.spotLength!==_||C.rectAreaLength!==g||C.hemiLength!==p||C.numDirectionalShadows!==y||C.numPointShadows!==x||C.numSpotShadows!==v||C.numSpotMaps!==T||C.numLightProbes!==w)&&(i.directional.length=d,i.spot.length=_,i.rectArea.length=g,i.point.length=m,i.hemi.length=p,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=v+T-b,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=w,C.directionalLength=d,C.pointLength=m,C.spotLength=_,C.rectAreaLength=g,C.hemiLength=p,C.numDirectionalShadows=y,C.numPointShadows=x,C.numSpotShadows=v,C.numSpotMaps=T,C.numLightProbes=w,i.version=rE++)}function c(l,u){let f=0,h=0,d=0,m=0,_=0;const g=u.matrixWorldInverse;for(let p=0,y=l.length;p<y;p++){const x=l[p];if(x.isDirectionalLight){const v=i.directional[f];v.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(g),f++}else if(x.isSpotLight){const v=i.spot[d];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(g),d++}else if(x.isRectAreaLight){const v=i.rectArea[m];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(g),o.identity(),s.copy(x.matrixWorld),s.premultiply(g),o.extractRotation(s),v.halfWidth.set(x.width*.5,0,0),v.halfHeight.set(0,x.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),m++}else if(x.isPointLight){const v=i.point[h];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(g),h++}else if(x.isHemisphereLight){const v=i.hemi[_];v.direction.setFromMatrixPosition(x.matrixWorld),v.direction.transformDirection(g),_++}}}return{setup:a,setupView:c,state:i}}function Up(e){const t=new oE(e),n=[],i=[];function r(u){l.camera=u,n.length=0,i.length=0}function s(u){n.push(u)}function o(u){i.push(u)}function a(){t.setup(n)}function c(u){t.setupView(n,u)}const l={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function aE(e){let t=new WeakMap;function n(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new Up(e),t.set(r,[a])):s>=o.length?(a=new Up(e),o.push(a)):a=o[s],a}function i(){t=new WeakMap}return{get:n,dispose:i}}class t_ extends ka{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Vy,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class e_ extends ka{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const cE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,lE=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function uE(e,t,n){let i=new Lh;const r=new oe,s=new oe,o=new Se,a=new t_({depthPacking:Fg}),c=new e_,l={},u=n.maxTextureSize,f={[Nr]:On,[On]:Nr,[Li]:Li},h=new or({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new oe},radius:{value:4}},vertexShader:cE,fragmentShader:lE}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const m=new Vi;m.setAttribute("position",new pi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new An(m,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Mg;let p=this.type;this.render=function(b,w,C){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;const M=e.getRenderTarget(),S=e.getActiveCubeFace(),U=e.getActiveMipmapLevel(),P=e.state;P.setBlending(Pr),P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const D=p!==qi&&this.type===qi,I=p===qi&&this.type!==qi;for(let V=0,O=b.length;V<O;V++){const tt=b[V],H=tt.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",tt,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const q=H.getFrameExtents();if(r.multiply(q),s.copy(H.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/q.x),r.x=s.x*q.x,H.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/q.y),r.y=s.y*q.y,H.mapSize.y=s.y)),H.map===null||D===!0||I===!0){const F=this.type!==qi?{minFilter:Qn,magFilter:Qn}:{};H.map!==null&&H.map.dispose(),H.map=new vs(r.x,r.y,F),H.map.texture.name=tt.name+".shadowMap",H.camera.updateProjectionMatrix()}e.setRenderTarget(H.map),e.clear();const X=H.getViewportCount();for(let F=0;F<X;F++){const W=H.getViewport(F);o.set(s.x*W.x,s.y*W.y,s.x*W.z,s.y*W.w),P.viewport(o),H.updateMatrices(tt,F),i=H.getFrustum(),v(w,C,H.camera,tt,this.type)}H.isPointLightShadow!==!0&&this.type===qi&&y(H,C),H.needsUpdate=!1}p=this.type,g.needsUpdate=!1,e.setRenderTarget(M,S,U)};function y(b,w){const C=t.update(_);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new vs(r.x,r.y)),h.uniforms.shadow_pass.value=b.map.texture,h.uniforms.resolution.value=b.mapSize,h.uniforms.radius.value=b.radius,e.setRenderTarget(b.mapPass),e.clear(),e.renderBufferDirect(w,null,C,h,_,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,e.setRenderTarget(b.map),e.clear(),e.renderBufferDirect(w,null,C,d,_,null)}function x(b,w,C,M){let S=null;const U=C.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(U!==void 0)S=U;else if(S=C.isPointLight===!0?c:a,e.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const P=S.uuid,D=w.uuid;let I=l[P];I===void 0&&(I={},l[P]=I);let V=I[D];V===void 0&&(V=S.clone(),I[D]=V,w.addEventListener("dispose",T)),S=V}if(S.visible=w.visible,S.wireframe=w.wireframe,M===qi?S.side=w.shadowSide!==null?w.shadowSide:w.side:S.side=w.shadowSide!==null?w.shadowSide:f[w.side],S.alphaMap=w.alphaMap,S.alphaTest=w.alphaTest,S.map=w.map,S.clipShadows=w.clipShadows,S.clippingPlanes=w.clippingPlanes,S.clipIntersection=w.clipIntersection,S.displacementMap=w.displacementMap,S.displacementScale=w.displacementScale,S.displacementBias=w.displacementBias,S.wireframeLinewidth=w.wireframeLinewidth,S.linewidth=w.linewidth,C.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const P=e.properties.get(S);P.light=C}return S}function v(b,w,C,M,S){if(b.visible===!1)return;if(b.layers.test(w.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&S===qi)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,b.matrixWorld);const D=t.update(b),I=b.material;if(Array.isArray(I)){const V=D.groups;for(let O=0,tt=V.length;O<tt;O++){const H=V[O],q=I[H.materialIndex];if(q&&q.visible){const X=x(b,q,M,S);b.onBeforeShadow(e,b,w,C,D,X,H),e.renderBufferDirect(C,null,D,X,b,H),b.onAfterShadow(e,b,w,C,D,X,H)}}}else if(I.visible){const V=x(b,I,M,S);b.onBeforeShadow(e,b,w,C,D,V,null),e.renderBufferDirect(C,null,D,V,b,null),b.onAfterShadow(e,b,w,C,D,V,null)}}const P=b.children;for(let D=0,I=P.length;D<I;D++)v(P[D],w,C,M,S)}function T(b){b.target.removeEventListener("dispose",T);for(const C in l){const M=l[C],S=b.target.uuid;S in M&&(M[S].dispose(),delete M[S])}}}const fE={[ef]:nf,[rf]:af,[sf]:cf,[fo]:of,[nf]:ef,[af]:rf,[cf]:sf,[of]:fo};function hE(e,t){function n(){let G=!1;const ft=new Se;let et=null;const pt=new Se(0,0,0,0);return{setMask:function(Mt){et!==Mt&&!G&&(e.colorMask(Mt,Mt,Mt,Mt),et=Mt)},setLocked:function(Mt){G=Mt},setClear:function(Mt,xt,kt,Zt,Vt){Vt===!0&&(Mt*=Zt,xt*=Zt,kt*=Zt),ft.set(Mt,xt,kt,Zt),pt.equals(ft)===!1&&(e.clearColor(Mt,xt,kt,Zt),pt.copy(ft))},reset:function(){G=!1,et=null,pt.set(-1,0,0,0)}}}function i(){let G=!1,ft=!1,et=null,pt=null,Mt=null;return{setReversed:function(xt){if(ft!==xt){const kt=t.get("EXT_clip_control");ft?kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.ZERO_TO_ONE_EXT):kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.NEGATIVE_ONE_TO_ONE_EXT);const Zt=Mt;Mt=null,this.setClear(Zt)}ft=xt},getReversed:function(){return ft},setTest:function(xt){xt?$(e.DEPTH_TEST):it(e.DEPTH_TEST)},setMask:function(xt){et!==xt&&!G&&(e.depthMask(xt),et=xt)},setFunc:function(xt){if(ft&&(xt=fE[xt]),pt!==xt){switch(xt){case ef:e.depthFunc(e.NEVER);break;case nf:e.depthFunc(e.ALWAYS);break;case rf:e.depthFunc(e.LESS);break;case fo:e.depthFunc(e.LEQUAL);break;case sf:e.depthFunc(e.EQUAL);break;case of:e.depthFunc(e.GEQUAL);break;case af:e.depthFunc(e.GREATER);break;case cf:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}pt=xt}},setLocked:function(xt){G=xt},setClear:function(xt){Mt!==xt&&(ft&&(xt=1-xt),e.clearDepth(xt),Mt=xt)},reset:function(){G=!1,et=null,pt=null,Mt=null,ft=!1}}}function r(){let G=!1,ft=null,et=null,pt=null,Mt=null,xt=null,kt=null,Zt=null,Vt=null;return{setTest:function(Xt){G||(Xt?$(e.STENCIL_TEST):it(e.STENCIL_TEST))},setMask:function(Xt){ft!==Xt&&!G&&(e.stencilMask(Xt),ft=Xt)},setFunc:function(Xt,we,Re){(et!==Xt||pt!==we||Mt!==Re)&&(e.stencilFunc(Xt,we,Re),et=Xt,pt=we,Mt=Re)},setOp:function(Xt,we,Re){(xt!==Xt||kt!==we||Zt!==Re)&&(e.stencilOp(Xt,we,Re),xt=Xt,kt=we,Zt=Re)},setLocked:function(Xt){G=Xt},setClear:function(Xt){Vt!==Xt&&(e.clearStencil(Xt),Vt=Xt)},reset:function(){G=!1,ft=null,et=null,pt=null,Mt=null,xt=null,kt=null,Zt=null,Vt=null}}}const s=new n,o=new i,a=new r,c=new WeakMap,l=new WeakMap;let u={},f={},h=new WeakMap,d=[],m=null,_=!1,g=null,p=null,y=null,x=null,v=null,T=null,b=null,w=new ie(0,0,0),C=0,M=!1,S=null,U=null,P=null,D=null,I=null;const V=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,tt=0;const H=e.getParameter(e.VERSION);H.indexOf("WebGL")!==-1?(tt=parseFloat(/^WebGL (\d)/.exec(H)[1]),O=tt>=1):H.indexOf("OpenGL ES")!==-1&&(tt=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),O=tt>=2);let q=null,X={};const F=e.getParameter(e.SCISSOR_BOX),W=e.getParameter(e.VIEWPORT),J=new Se().fromArray(F),N=new Se().fromArray(W);function z(G,ft,et,pt){const Mt=new Uint8Array(4),xt=e.createTexture();e.bindTexture(G,xt),e.texParameteri(G,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(G,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let kt=0;kt<et;kt++)G===e.TEXTURE_3D||G===e.TEXTURE_2D_ARRAY?e.texImage3D(ft,0,e.RGBA,1,1,pt,0,e.RGBA,e.UNSIGNED_BYTE,Mt):e.texImage2D(ft+kt,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,Mt);return xt}const nt={};nt[e.TEXTURE_2D]=z(e.TEXTURE_2D,e.TEXTURE_2D,1),nt[e.TEXTURE_CUBE_MAP]=z(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),nt[e.TEXTURE_2D_ARRAY]=z(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),nt[e.TEXTURE_3D]=z(e.TEXTURE_3D,e.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),$(e.DEPTH_TEST),o.setFunc(fo),wt(!1),At(Fd),$(e.CULL_FACE),k(Pr);function $(G){u[G]!==!0&&(e.enable(G),u[G]=!0)}function it(G){u[G]!==!1&&(e.disable(G),u[G]=!1)}function vt(G,ft){return f[G]!==ft?(e.bindFramebuffer(G,ft),f[G]=ft,G===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=ft),G===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=ft),!0):!1}function bt(G,ft){let et=d,pt=!1;if(G){et=h.get(ft),et===void 0&&(et=[],h.set(ft,et));const Mt=G.textures;if(et.length!==Mt.length||et[0]!==e.COLOR_ATTACHMENT0){for(let xt=0,kt=Mt.length;xt<kt;xt++)et[xt]=e.COLOR_ATTACHMENT0+xt;et.length=Mt.length,pt=!0}}else et[0]!==e.BACK&&(et[0]=e.BACK,pt=!0);pt&&e.drawBuffers(et)}function St(G){return m!==G?(e.useProgram(G),m=G,!0):!1}const ct={[ns]:e.FUNC_ADD,[my]:e.FUNC_SUBTRACT,[gy]:e.FUNC_REVERSE_SUBTRACT};ct[_y]=e.MIN,ct[vy]=e.MAX;const Ot={[yy]:e.ZERO,[xy]:e.ONE,[Sy]:e.SRC_COLOR,[Qu]:e.SRC_ALPHA,[Ay]:e.SRC_ALPHA_SATURATE,[wy]:e.DST_COLOR,[by]:e.DST_ALPHA,[My]:e.ONE_MINUS_SRC_COLOR,[tf]:e.ONE_MINUS_SRC_ALPHA,[Ty]:e.ONE_MINUS_DST_COLOR,[Ey]:e.ONE_MINUS_DST_ALPHA,[Cy]:e.CONSTANT_COLOR,[Ry]:e.ONE_MINUS_CONSTANT_COLOR,[Py]:e.CONSTANT_ALPHA,[Uy]:e.ONE_MINUS_CONSTANT_ALPHA};function k(G,ft,et,pt,Mt,xt,kt,Zt,Vt,Xt){if(G===Pr){_===!0&&(it(e.BLEND),_=!1);return}if(_===!1&&($(e.BLEND),_=!0),G!==py){if(G!==g||Xt!==M){if((p!==ns||v!==ns)&&(e.blendEquation(e.FUNC_ADD),p=ns,v=ns),Xt)switch(G){case eo:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Nd:e.blendFunc(e.ONE,e.ONE);break;case Od:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case kd:e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case eo:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Nd:e.blendFunc(e.SRC_ALPHA,e.ONE);break;case Od:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case kd:e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}y=null,x=null,T=null,b=null,w.set(0,0,0),C=0,g=G,M=Xt}return}Mt=Mt||ft,xt=xt||et,kt=kt||pt,(ft!==p||Mt!==v)&&(e.blendEquationSeparate(ct[ft],ct[Mt]),p=ft,v=Mt),(et!==y||pt!==x||xt!==T||kt!==b)&&(e.blendFuncSeparate(Ot[et],Ot[pt],Ot[xt],Ot[kt]),y=et,x=pt,T=xt,b=kt),(Zt.equals(w)===!1||Vt!==C)&&(e.blendColor(Zt.r,Zt.g,Zt.b,Vt),w.copy(Zt),C=Vt),g=G,M=!1}function It(G,ft){G.side===Li?it(e.CULL_FACE):$(e.CULL_FACE);let et=G.side===On;ft&&(et=!et),wt(et),G.blending===eo&&G.transparent===!1?k(Pr):k(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),o.setFunc(G.depthFunc),o.setTest(G.depthTest),o.setMask(G.depthWrite),s.setMask(G.colorWrite);const pt=G.stencilWrite;a.setTest(pt),pt&&(a.setMask(G.stencilWriteMask),a.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),a.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),Pt(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?$(e.SAMPLE_ALPHA_TO_COVERAGE):it(e.SAMPLE_ALPHA_TO_COVERAGE)}function wt(G){S!==G&&(G?e.frontFace(e.CW):e.frontFace(e.CCW),S=G)}function At(G){G!==hy?($(e.CULL_FACE),G!==U&&(G===Fd?e.cullFace(e.BACK):G===dy?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):it(e.CULL_FACE),U=G}function at(G){G!==P&&(O&&e.lineWidth(G),P=G)}function Pt(G,ft,et){G?($(e.POLYGON_OFFSET_FILL),(D!==ft||I!==et)&&(e.polygonOffset(ft,et),D=ft,I=et)):it(e.POLYGON_OFFSET_FILL)}function yt(G){G?$(e.SCISSOR_TEST):it(e.SCISSOR_TEST)}function A(G){G===void 0&&(G=e.TEXTURE0+V-1),q!==G&&(e.activeTexture(G),q=G)}function E(G,ft,et){et===void 0&&(q===null?et=e.TEXTURE0+V-1:et=q);let pt=X[et];pt===void 0&&(pt={type:void 0,texture:void 0},X[et]=pt),(pt.type!==G||pt.texture!==ft)&&(q!==et&&(e.activeTexture(et),q=et),e.bindTexture(G,ft||nt[G]),pt.type=G,pt.texture=ft)}function B(){const G=X[q];G!==void 0&&G.type!==void 0&&(e.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function Q(){try{e.compressedTexImage2D.apply(e,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function K(){try{e.compressedTexImage3D.apply(e,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ot(){try{e.texSubImage2D.apply(e,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function gt(){try{e.texSubImage3D.apply(e,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function lt(){try{e.compressedTexSubImage2D.apply(e,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function dt(){try{e.compressedTexSubImage3D.apply(e,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Lt(){try{e.texStorage2D.apply(e,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function _t(){try{e.texStorage3D.apply(e,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ct(){try{e.texImage2D.apply(e,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Rt(){try{e.texImage3D.apply(e,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ut(G){J.equals(G)===!1&&(e.scissor(G.x,G.y,G.z,G.w),J.copy(G))}function ht(G){N.equals(G)===!1&&(e.viewport(G.x,G.y,G.z,G.w),N.copy(G))}function Ht(G,ft){let et=l.get(ft);et===void 0&&(et=new WeakMap,l.set(ft,et));let pt=et.get(G);pt===void 0&&(pt=e.getUniformBlockIndex(ft,G.name),et.set(G,pt))}function Ft(G,ft){const pt=l.get(ft).get(G);c.get(ft)!==pt&&(e.uniformBlockBinding(ft,pt,G.__bindingPointIndex),c.set(ft,pt))}function Qt(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),u={},q=null,X={},f={},h=new WeakMap,d=[],m=null,_=!1,g=null,p=null,y=null,x=null,v=null,T=null,b=null,w=new ie(0,0,0),C=0,M=!1,S=null,U=null,P=null,D=null,I=null,J.set(0,0,e.canvas.width,e.canvas.height),N.set(0,0,e.canvas.width,e.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:$,disable:it,bindFramebuffer:vt,drawBuffers:bt,useProgram:St,setBlending:k,setMaterial:It,setFlipSided:wt,setCullFace:At,setLineWidth:at,setPolygonOffset:Pt,setScissorTest:yt,activeTexture:A,bindTexture:E,unbindTexture:B,compressedTexImage2D:Q,compressedTexImage3D:K,texImage2D:Ct,texImage3D:Rt,updateUBOMapping:Ht,uniformBlockBinding:Ft,texStorage2D:Lt,texStorage3D:_t,texSubImage2D:ot,texSubImage3D:gt,compressedTexSubImage2D:lt,compressedTexSubImage3D:dt,scissor:Ut,viewport:ht,reset:Qt}}function Dp(e,t,n,i){const r=dE(i);switch(n){case Rg:return e*t;case Ug:return e*t;case Dg:return e*t*2;case Rh:return e*t/r.components*r.byteLength;case Ph:return e*t/r.components*r.byteLength;case Ig:return e*t*2/r.components*r.byteLength;case Uh:return e*t*2/r.components*r.byteLength;case Pg:return e*t*3/r.components*r.byteLength;case Ci:return e*t*4/r.components*r.byteLength;case Dh:return e*t*4/r.components*r.byteLength;case Oc:case kc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case zc:case Bc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case pf:case gf:return Math.max(e,16)*Math.max(t,8)/4;case df:case mf:return Math.max(e,8)*Math.max(t,8)/2;case _f:case vf:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case yf:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case xf:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Sf:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Mf:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case bf:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Ef:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case wf:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Tf:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Af:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Cf:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Rf:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Pf:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Uf:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Df:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case If:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Gc:case Lf:case Ff:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Lg:case Nf:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Of:case kf:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function dE(e){switch(e){case sr:case Tg:return{byteLength:1,components:1};case Ma:case Ag:case Oa:return{byteLength:2,components:1};case Ah:case Ch:return{byteLength:2,components:4};case _s:case Th:case Oi:return{byteLength:4,components:1};case Cg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}function pE(e,t,n,i,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new oe,u=new WeakMap;let f;const h=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(A,E){return d?new OffscreenCanvas(A,E):tl("canvas")}function _(A,E,B){let Q=1;const K=yt(A);if((K.width>B||K.height>B)&&(Q=B/Math.max(K.width,K.height)),Q<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const ot=Math.floor(Q*K.width),gt=Math.floor(Q*K.height);f===void 0&&(f=m(ot,gt));const lt=E?m(ot,gt):f;return lt.width=ot,lt.height=gt,lt.getContext("2d").drawImage(A,0,0,ot,gt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+ot+"x"+gt+")."),lt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),A;return A}function g(A){return A.generateMipmaps}function p(A){e.generateMipmap(A)}function y(A){return A.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?e.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function x(A,E,B,Q,K=!1){if(A!==null){if(e[A]!==void 0)return e[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ot=E;if(E===e.RED&&(B===e.FLOAT&&(ot=e.R32F),B===e.HALF_FLOAT&&(ot=e.R16F),B===e.UNSIGNED_BYTE&&(ot=e.R8)),E===e.RED_INTEGER&&(B===e.UNSIGNED_BYTE&&(ot=e.R8UI),B===e.UNSIGNED_SHORT&&(ot=e.R16UI),B===e.UNSIGNED_INT&&(ot=e.R32UI),B===e.BYTE&&(ot=e.R8I),B===e.SHORT&&(ot=e.R16I),B===e.INT&&(ot=e.R32I)),E===e.RG&&(B===e.FLOAT&&(ot=e.RG32F),B===e.HALF_FLOAT&&(ot=e.RG16F),B===e.UNSIGNED_BYTE&&(ot=e.RG8)),E===e.RG_INTEGER&&(B===e.UNSIGNED_BYTE&&(ot=e.RG8UI),B===e.UNSIGNED_SHORT&&(ot=e.RG16UI),B===e.UNSIGNED_INT&&(ot=e.RG32UI),B===e.BYTE&&(ot=e.RG8I),B===e.SHORT&&(ot=e.RG16I),B===e.INT&&(ot=e.RG32I)),E===e.RGB_INTEGER&&(B===e.UNSIGNED_BYTE&&(ot=e.RGB8UI),B===e.UNSIGNED_SHORT&&(ot=e.RGB16UI),B===e.UNSIGNED_INT&&(ot=e.RGB32UI),B===e.BYTE&&(ot=e.RGB8I),B===e.SHORT&&(ot=e.RGB16I),B===e.INT&&(ot=e.RGB32I)),E===e.RGBA_INTEGER&&(B===e.UNSIGNED_BYTE&&(ot=e.RGBA8UI),B===e.UNSIGNED_SHORT&&(ot=e.RGBA16UI),B===e.UNSIGNED_INT&&(ot=e.RGBA32UI),B===e.BYTE&&(ot=e.RGBA8I),B===e.SHORT&&(ot=e.RGBA16I),B===e.INT&&(ot=e.RGBA32I)),E===e.RGB&&B===e.UNSIGNED_INT_5_9_9_9_REV&&(ot=e.RGB9_E5),E===e.RGBA){const gt=K?Sl:he.getTransfer(Q);B===e.FLOAT&&(ot=e.RGBA32F),B===e.HALF_FLOAT&&(ot=e.RGBA16F),B===e.UNSIGNED_BYTE&&(ot=gt===be?e.SRGB8_ALPHA8:e.RGBA8),B===e.UNSIGNED_SHORT_4_4_4_4&&(ot=e.RGBA4),B===e.UNSIGNED_SHORT_5_5_5_1&&(ot=e.RGB5_A1)}return(ot===e.R16F||ot===e.R32F||ot===e.RG16F||ot===e.RG32F||ot===e.RGBA16F||ot===e.RGBA32F)&&t.get("EXT_color_buffer_float"),ot}function v(A,E){let B;return A?E===null||E===_s||E===mo?B=e.DEPTH24_STENCIL8:E===Oi?B=e.DEPTH32F_STENCIL8:E===Ma&&(B=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===_s||E===mo?B=e.DEPTH_COMPONENT24:E===Oi?B=e.DEPTH_COMPONENT32F:E===Ma&&(B=e.DEPTH_COMPONENT16),B}function T(A,E){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==Qn&&A.minFilter!==ui?Math.log2(Math.max(E.width,E.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?E.mipmaps.length:1}function b(A){const E=A.target;E.removeEventListener("dispose",b),C(E),E.isVideoTexture&&u.delete(E)}function w(A){const E=A.target;E.removeEventListener("dispose",w),S(E)}function C(A){const E=i.get(A);if(E.__webglInit===void 0)return;const B=A.source,Q=h.get(B);if(Q){const K=Q[E.__cacheKey];K.usedTimes--,K.usedTimes===0&&M(A),Object.keys(Q).length===0&&h.delete(B)}i.remove(A)}function M(A){const E=i.get(A);e.deleteTexture(E.__webglTexture);const B=A.source,Q=h.get(B);delete Q[E.__cacheKey],o.memory.textures--}function S(A){const E=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(E.__webglFramebuffer[Q]))for(let K=0;K<E.__webglFramebuffer[Q].length;K++)e.deleteFramebuffer(E.__webglFramebuffer[Q][K]);else e.deleteFramebuffer(E.__webglFramebuffer[Q]);E.__webglDepthbuffer&&e.deleteRenderbuffer(E.__webglDepthbuffer[Q])}else{if(Array.isArray(E.__webglFramebuffer))for(let Q=0;Q<E.__webglFramebuffer.length;Q++)e.deleteFramebuffer(E.__webglFramebuffer[Q]);else e.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&e.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&e.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let Q=0;Q<E.__webglColorRenderbuffer.length;Q++)E.__webglColorRenderbuffer[Q]&&e.deleteRenderbuffer(E.__webglColorRenderbuffer[Q]);E.__webglDepthRenderbuffer&&e.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const B=A.textures;for(let Q=0,K=B.length;Q<K;Q++){const ot=i.get(B[Q]);ot.__webglTexture&&(e.deleteTexture(ot.__webglTexture),o.memory.textures--),i.remove(B[Q])}i.remove(A)}let U=0;function P(){U=0}function D(){const A=U;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),U+=1,A}function I(A){const E=[];return E.push(A.wrapS),E.push(A.wrapT),E.push(A.wrapR||0),E.push(A.magFilter),E.push(A.minFilter),E.push(A.anisotropy),E.push(A.internalFormat),E.push(A.format),E.push(A.type),E.push(A.generateMipmaps),E.push(A.premultiplyAlpha),E.push(A.flipY),E.push(A.unpackAlignment),E.push(A.colorSpace),E.join()}function V(A,E){const B=i.get(A);if(A.isVideoTexture&&at(A),A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){const Q=A.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{N(B,A,E);return}}n.bindTexture(e.TEXTURE_2D,B.__webglTexture,e.TEXTURE0+E)}function O(A,E){const B=i.get(A);if(A.version>0&&B.__version!==A.version){N(B,A,E);return}n.bindTexture(e.TEXTURE_2D_ARRAY,B.__webglTexture,e.TEXTURE0+E)}function tt(A,E){const B=i.get(A);if(A.version>0&&B.__version!==A.version){N(B,A,E);return}n.bindTexture(e.TEXTURE_3D,B.__webglTexture,e.TEXTURE0+E)}function H(A,E){const B=i.get(A);if(A.version>0&&B.__version!==A.version){z(B,A,E);return}n.bindTexture(e.TEXTURE_CUBE_MAP,B.__webglTexture,e.TEXTURE0+E)}const q={[ff]:e.REPEAT,[os]:e.CLAMP_TO_EDGE,[hf]:e.MIRRORED_REPEAT},X={[Qn]:e.NEAREST,[Gy]:e.NEAREST_MIPMAP_NEAREST,[Qa]:e.NEAREST_MIPMAP_LINEAR,[ui]:e.LINEAR,[jl]:e.LINEAR_MIPMAP_NEAREST,[as]:e.LINEAR_MIPMAP_LINEAR},F={[Wy]:e.NEVER,[qy]:e.ALWAYS,[$y]:e.LESS,[Og]:e.LEQUAL,[Xy]:e.EQUAL,[jy]:e.GEQUAL,[Yy]:e.GREATER,[Zy]:e.NOTEQUAL};function W(A,E){if(E.type===Oi&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===ui||E.magFilter===jl||E.magFilter===Qa||E.magFilter===as||E.minFilter===ui||E.minFilter===jl||E.minFilter===Qa||E.minFilter===as)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(A,e.TEXTURE_WRAP_S,q[E.wrapS]),e.texParameteri(A,e.TEXTURE_WRAP_T,q[E.wrapT]),(A===e.TEXTURE_3D||A===e.TEXTURE_2D_ARRAY)&&e.texParameteri(A,e.TEXTURE_WRAP_R,q[E.wrapR]),e.texParameteri(A,e.TEXTURE_MAG_FILTER,X[E.magFilter]),e.texParameteri(A,e.TEXTURE_MIN_FILTER,X[E.minFilter]),E.compareFunction&&(e.texParameteri(A,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(A,e.TEXTURE_COMPARE_FUNC,F[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Qn||E.minFilter!==Qa&&E.minFilter!==as||E.type===Oi&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");e.texParameterf(A,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function J(A,E){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,E.addEventListener("dispose",b));const Q=E.source;let K=h.get(Q);K===void 0&&(K={},h.set(Q,K));const ot=I(E);if(ot!==A.__cacheKey){K[ot]===void 0&&(K[ot]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,B=!0),K[ot].usedTimes++;const gt=K[A.__cacheKey];gt!==void 0&&(K[A.__cacheKey].usedTimes--,gt.usedTimes===0&&M(E)),A.__cacheKey=ot,A.__webglTexture=K[ot].texture}return B}function N(A,E,B){let Q=e.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(Q=e.TEXTURE_2D_ARRAY),E.isData3DTexture&&(Q=e.TEXTURE_3D);const K=J(A,E),ot=E.source;n.bindTexture(Q,A.__webglTexture,e.TEXTURE0+B);const gt=i.get(ot);if(ot.version!==gt.__version||K===!0){n.activeTexture(e.TEXTURE0+B);const lt=he.getPrimaries(he.workingColorSpace),dt=E.colorSpace===Sr?null:he.getPrimaries(E.colorSpace),Lt=E.colorSpace===Sr||lt===dt?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,E.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,E.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Lt);let _t=_(E.image,!1,r.maxTextureSize);_t=Pt(E,_t);const Ct=s.convert(E.format,E.colorSpace),Rt=s.convert(E.type);let Ut=x(E.internalFormat,Ct,Rt,E.colorSpace,E.isVideoTexture);W(Q,E);let ht;const Ht=E.mipmaps,Ft=E.isVideoTexture!==!0,Qt=gt.__version===void 0||K===!0,G=ot.dataReady,ft=T(E,_t);if(E.isDepthTexture)Ut=v(E.format===go,E.type),Qt&&(Ft?n.texStorage2D(e.TEXTURE_2D,1,Ut,_t.width,_t.height):n.texImage2D(e.TEXTURE_2D,0,Ut,_t.width,_t.height,0,Ct,Rt,null));else if(E.isDataTexture)if(Ht.length>0){Ft&&Qt&&n.texStorage2D(e.TEXTURE_2D,ft,Ut,Ht[0].width,Ht[0].height);for(let et=0,pt=Ht.length;et<pt;et++)ht=Ht[et],Ft?G&&n.texSubImage2D(e.TEXTURE_2D,et,0,0,ht.width,ht.height,Ct,Rt,ht.data):n.texImage2D(e.TEXTURE_2D,et,Ut,ht.width,ht.height,0,Ct,Rt,ht.data);E.generateMipmaps=!1}else Ft?(Qt&&n.texStorage2D(e.TEXTURE_2D,ft,Ut,_t.width,_t.height),G&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,_t.width,_t.height,Ct,Rt,_t.data)):n.texImage2D(e.TEXTURE_2D,0,Ut,_t.width,_t.height,0,Ct,Rt,_t.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Ft&&Qt&&n.texStorage3D(e.TEXTURE_2D_ARRAY,ft,Ut,Ht[0].width,Ht[0].height,_t.depth);for(let et=0,pt=Ht.length;et<pt;et++)if(ht=Ht[et],E.format!==Ci)if(Ct!==null)if(Ft){if(G)if(E.layerUpdates.size>0){const Mt=Dp(ht.width,ht.height,E.format,E.type);for(const xt of E.layerUpdates){const kt=ht.data.subarray(xt*Mt/ht.data.BYTES_PER_ELEMENT,(xt+1)*Mt/ht.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,et,0,0,xt,ht.width,ht.height,1,Ct,kt)}E.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,et,0,0,0,ht.width,ht.height,_t.depth,Ct,ht.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,et,Ut,ht.width,ht.height,_t.depth,0,ht.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?G&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,et,0,0,0,ht.width,ht.height,_t.depth,Ct,Rt,ht.data):n.texImage3D(e.TEXTURE_2D_ARRAY,et,Ut,ht.width,ht.height,_t.depth,0,Ct,Rt,ht.data)}else{Ft&&Qt&&n.texStorage2D(e.TEXTURE_2D,ft,Ut,Ht[0].width,Ht[0].height);for(let et=0,pt=Ht.length;et<pt;et++)ht=Ht[et],E.format!==Ci?Ct!==null?Ft?G&&n.compressedTexSubImage2D(e.TEXTURE_2D,et,0,0,ht.width,ht.height,Ct,ht.data):n.compressedTexImage2D(e.TEXTURE_2D,et,Ut,ht.width,ht.height,0,ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?G&&n.texSubImage2D(e.TEXTURE_2D,et,0,0,ht.width,ht.height,Ct,Rt,ht.data):n.texImage2D(e.TEXTURE_2D,et,Ut,ht.width,ht.height,0,Ct,Rt,ht.data)}else if(E.isDataArrayTexture)if(Ft){if(Qt&&n.texStorage3D(e.TEXTURE_2D_ARRAY,ft,Ut,_t.width,_t.height,_t.depth),G)if(E.layerUpdates.size>0){const et=Dp(_t.width,_t.height,E.format,E.type);for(const pt of E.layerUpdates){const Mt=_t.data.subarray(pt*et/_t.data.BYTES_PER_ELEMENT,(pt+1)*et/_t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,pt,_t.width,_t.height,1,Ct,Rt,Mt)}E.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,_t.width,_t.height,_t.depth,Ct,Rt,_t.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,Ut,_t.width,_t.height,_t.depth,0,Ct,Rt,_t.data);else if(E.isData3DTexture)Ft?(Qt&&n.texStorage3D(e.TEXTURE_3D,ft,Ut,_t.width,_t.height,_t.depth),G&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,_t.width,_t.height,_t.depth,Ct,Rt,_t.data)):n.texImage3D(e.TEXTURE_3D,0,Ut,_t.width,_t.height,_t.depth,0,Ct,Rt,_t.data);else if(E.isFramebufferTexture){if(Qt)if(Ft)n.texStorage2D(e.TEXTURE_2D,ft,Ut,_t.width,_t.height);else{let et=_t.width,pt=_t.height;for(let Mt=0;Mt<ft;Mt++)n.texImage2D(e.TEXTURE_2D,Mt,Ut,et,pt,0,Ct,Rt,null),et>>=1,pt>>=1}}else if(Ht.length>0){if(Ft&&Qt){const et=yt(Ht[0]);n.texStorage2D(e.TEXTURE_2D,ft,Ut,et.width,et.height)}for(let et=0,pt=Ht.length;et<pt;et++)ht=Ht[et],Ft?G&&n.texSubImage2D(e.TEXTURE_2D,et,0,0,Ct,Rt,ht):n.texImage2D(e.TEXTURE_2D,et,Ut,Ct,Rt,ht);E.generateMipmaps=!1}else if(Ft){if(Qt){const et=yt(_t);n.texStorage2D(e.TEXTURE_2D,ft,Ut,et.width,et.height)}G&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,Ct,Rt,_t)}else n.texImage2D(e.TEXTURE_2D,0,Ut,Ct,Rt,_t);g(E)&&p(Q),gt.__version=ot.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function z(A,E,B){if(E.image.length!==6)return;const Q=J(A,E),K=E.source;n.bindTexture(e.TEXTURE_CUBE_MAP,A.__webglTexture,e.TEXTURE0+B);const ot=i.get(K);if(K.version!==ot.__version||Q===!0){n.activeTexture(e.TEXTURE0+B);const gt=he.getPrimaries(he.workingColorSpace),lt=E.colorSpace===Sr?null:he.getPrimaries(E.colorSpace),dt=E.colorSpace===Sr||gt===lt?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,E.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,E.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);const Lt=E.isCompressedTexture||E.image[0].isCompressedTexture,_t=E.image[0]&&E.image[0].isDataTexture,Ct=[];for(let pt=0;pt<6;pt++)!Lt&&!_t?Ct[pt]=_(E.image[pt],!0,r.maxCubemapSize):Ct[pt]=_t?E.image[pt].image:E.image[pt],Ct[pt]=Pt(E,Ct[pt]);const Rt=Ct[0],Ut=s.convert(E.format,E.colorSpace),ht=s.convert(E.type),Ht=x(E.internalFormat,Ut,ht,E.colorSpace),Ft=E.isVideoTexture!==!0,Qt=ot.__version===void 0||Q===!0,G=K.dataReady;let ft=T(E,Rt);W(e.TEXTURE_CUBE_MAP,E);let et;if(Lt){Ft&&Qt&&n.texStorage2D(e.TEXTURE_CUBE_MAP,ft,Ht,Rt.width,Rt.height);for(let pt=0;pt<6;pt++){et=Ct[pt].mipmaps;for(let Mt=0;Mt<et.length;Mt++){const xt=et[Mt];E.format!==Ci?Ut!==null?Ft?G&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Mt,0,0,xt.width,xt.height,Ut,xt.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Mt,Ht,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ft?G&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Mt,0,0,xt.width,xt.height,Ut,ht,xt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Mt,Ht,xt.width,xt.height,0,Ut,ht,xt.data)}}}else{if(et=E.mipmaps,Ft&&Qt){et.length>0&&ft++;const pt=yt(Ct[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,ft,Ht,pt.width,pt.height)}for(let pt=0;pt<6;pt++)if(_t){Ft?G&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,0,0,Ct[pt].width,Ct[pt].height,Ut,ht,Ct[pt].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,Ht,Ct[pt].width,Ct[pt].height,0,Ut,ht,Ct[pt].data);for(let Mt=0;Mt<et.length;Mt++){const kt=et[Mt].image[pt].image;Ft?G&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Mt+1,0,0,kt.width,kt.height,Ut,ht,kt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Mt+1,Ht,kt.width,kt.height,0,Ut,ht,kt.data)}}else{Ft?G&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,0,0,Ut,ht,Ct[pt]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,Ht,Ut,ht,Ct[pt]);for(let Mt=0;Mt<et.length;Mt++){const xt=et[Mt];Ft?G&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Mt+1,0,0,Ut,ht,xt.image[pt]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Mt+1,Ht,Ut,ht,xt.image[pt])}}}g(E)&&p(e.TEXTURE_CUBE_MAP),ot.__version=K.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function nt(A,E,B,Q,K,ot){const gt=s.convert(B.format,B.colorSpace),lt=s.convert(B.type),dt=x(B.internalFormat,gt,lt,B.colorSpace),Lt=i.get(E),_t=i.get(B);if(_t.__renderTarget=E,!Lt.__hasExternalTextures){const Ct=Math.max(1,E.width>>ot),Rt=Math.max(1,E.height>>ot);K===e.TEXTURE_3D||K===e.TEXTURE_2D_ARRAY?n.texImage3D(K,ot,dt,Ct,Rt,E.depth,0,gt,lt,null):n.texImage2D(K,ot,dt,Ct,Rt,0,gt,lt,null)}n.bindFramebuffer(e.FRAMEBUFFER,A),At(E)?a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Q,K,_t.__webglTexture,0,wt(E)):(K===e.TEXTURE_2D||K>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,Q,K,_t.__webglTexture,ot),n.bindFramebuffer(e.FRAMEBUFFER,null)}function $(A,E,B){if(e.bindRenderbuffer(e.RENDERBUFFER,A),E.depthBuffer){const Q=E.depthTexture,K=Q&&Q.isDepthTexture?Q.type:null,ot=v(E.stencilBuffer,K),gt=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,lt=wt(E);At(E)?a.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,lt,ot,E.width,E.height):B?e.renderbufferStorageMultisample(e.RENDERBUFFER,lt,ot,E.width,E.height):e.renderbufferStorage(e.RENDERBUFFER,ot,E.width,E.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,gt,e.RENDERBUFFER,A)}else{const Q=E.textures;for(let K=0;K<Q.length;K++){const ot=Q[K],gt=s.convert(ot.format,ot.colorSpace),lt=s.convert(ot.type),dt=x(ot.internalFormat,gt,lt,ot.colorSpace),Lt=wt(E);B&&At(E)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,Lt,dt,E.width,E.height):At(E)?a.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Lt,dt,E.width,E.height):e.renderbufferStorage(e.RENDERBUFFER,dt,E.width,E.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function it(A,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(e.FRAMEBUFFER,A),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=i.get(E.depthTexture);Q.__renderTarget=E,(!Q.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),V(E.depthTexture,0);const K=Q.__webglTexture,ot=wt(E);if(E.depthTexture.format===no)At(E)?a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,K,0,ot):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,K,0);else if(E.depthTexture.format===go)At(E)?a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,K,0,ot):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function vt(A){const E=i.get(A),B=A.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==A.depthTexture){const Q=A.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),Q){const K=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,Q.removeEventListener("dispose",K)};Q.addEventListener("dispose",K),E.__depthDisposeCallback=K}E.__boundDepthTexture=Q}if(A.depthTexture&&!E.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");it(E.__webglFramebuffer,A)}else if(B){E.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(n.bindFramebuffer(e.FRAMEBUFFER,E.__webglFramebuffer[Q]),E.__webglDepthbuffer[Q]===void 0)E.__webglDepthbuffer[Q]=e.createRenderbuffer(),$(E.__webglDepthbuffer[Q],A,!1);else{const K=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ot=E.__webglDepthbuffer[Q];e.bindRenderbuffer(e.RENDERBUFFER,ot),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,ot)}}else if(n.bindFramebuffer(e.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=e.createRenderbuffer(),$(E.__webglDepthbuffer,A,!1);else{const Q=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,K=E.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,K),e.framebufferRenderbuffer(e.FRAMEBUFFER,Q,e.RENDERBUFFER,K)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function bt(A,E,B){const Q=i.get(A);E!==void 0&&nt(Q.__webglFramebuffer,A,A.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),B!==void 0&&vt(A)}function St(A){const E=A.texture,B=i.get(A),Q=i.get(E);A.addEventListener("dispose",w);const K=A.textures,ot=A.isWebGLCubeRenderTarget===!0,gt=K.length>1;if(gt||(Q.__webglTexture===void 0&&(Q.__webglTexture=e.createTexture()),Q.__version=E.version,o.memory.textures++),ot){B.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(E.mipmaps&&E.mipmaps.length>0){B.__webglFramebuffer[lt]=[];for(let dt=0;dt<E.mipmaps.length;dt++)B.__webglFramebuffer[lt][dt]=e.createFramebuffer()}else B.__webglFramebuffer[lt]=e.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){B.__webglFramebuffer=[];for(let lt=0;lt<E.mipmaps.length;lt++)B.__webglFramebuffer[lt]=e.createFramebuffer()}else B.__webglFramebuffer=e.createFramebuffer();if(gt)for(let lt=0,dt=K.length;lt<dt;lt++){const Lt=i.get(K[lt]);Lt.__webglTexture===void 0&&(Lt.__webglTexture=e.createTexture(),o.memory.textures++)}if(A.samples>0&&At(A)===!1){B.__webglMultisampledFramebuffer=e.createFramebuffer(),B.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let lt=0;lt<K.length;lt++){const dt=K[lt];B.__webglColorRenderbuffer[lt]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,B.__webglColorRenderbuffer[lt]);const Lt=s.convert(dt.format,dt.colorSpace),_t=s.convert(dt.type),Ct=x(dt.internalFormat,Lt,_t,dt.colorSpace,A.isXRRenderTarget===!0),Rt=wt(A);e.renderbufferStorageMultisample(e.RENDERBUFFER,Rt,Ct,A.width,A.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+lt,e.RENDERBUFFER,B.__webglColorRenderbuffer[lt])}e.bindRenderbuffer(e.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=e.createRenderbuffer(),$(B.__webglDepthRenderbuffer,A,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(ot){n.bindTexture(e.TEXTURE_CUBE_MAP,Q.__webglTexture),W(e.TEXTURE_CUBE_MAP,E);for(let lt=0;lt<6;lt++)if(E.mipmaps&&E.mipmaps.length>0)for(let dt=0;dt<E.mipmaps.length;dt++)nt(B.__webglFramebuffer[lt][dt],A,E,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+lt,dt);else nt(B.__webglFramebuffer[lt],A,E,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);g(E)&&p(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(gt){for(let lt=0,dt=K.length;lt<dt;lt++){const Lt=K[lt],_t=i.get(Lt);n.bindTexture(e.TEXTURE_2D,_t.__webglTexture),W(e.TEXTURE_2D,Lt),nt(B.__webglFramebuffer,A,Lt,e.COLOR_ATTACHMENT0+lt,e.TEXTURE_2D,0),g(Lt)&&p(e.TEXTURE_2D)}n.unbindTexture()}else{let lt=e.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(lt=A.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(lt,Q.__webglTexture),W(lt,E),E.mipmaps&&E.mipmaps.length>0)for(let dt=0;dt<E.mipmaps.length;dt++)nt(B.__webglFramebuffer[dt],A,E,e.COLOR_ATTACHMENT0,lt,dt);else nt(B.__webglFramebuffer,A,E,e.COLOR_ATTACHMENT0,lt,0);g(E)&&p(lt),n.unbindTexture()}A.depthBuffer&&vt(A)}function ct(A){const E=A.textures;for(let B=0,Q=E.length;B<Q;B++){const K=E[B];if(g(K)){const ot=y(A),gt=i.get(K).__webglTexture;n.bindTexture(ot,gt),p(ot),n.unbindTexture()}}}const Ot=[],k=[];function It(A){if(A.samples>0){if(At(A)===!1){const E=A.textures,B=A.width,Q=A.height;let K=e.COLOR_BUFFER_BIT;const ot=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,gt=i.get(A),lt=E.length>1;if(lt)for(let dt=0;dt<E.length;dt++)n.bindFramebuffer(e.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+dt,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,gt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+dt,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let dt=0;dt<E.length;dt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(K|=e.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(K|=e.STENCIL_BUFFER_BIT)),lt){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,gt.__webglColorRenderbuffer[dt]);const Lt=i.get(E[dt]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Lt,0)}e.blitFramebuffer(0,0,B,Q,0,0,B,Q,K,e.NEAREST),c===!0&&(Ot.length=0,k.length=0,Ot.push(e.COLOR_ATTACHMENT0+dt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Ot.push(ot),k.push(ot),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,k)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ot))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),lt)for(let dt=0;dt<E.length;dt++){n.bindFramebuffer(e.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+dt,e.RENDERBUFFER,gt.__webglColorRenderbuffer[dt]);const Lt=i.get(E[dt]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,gt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+dt,e.TEXTURE_2D,Lt,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){const E=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[E])}}}function wt(A){return Math.min(r.maxSamples,A.samples)}function At(A){const E=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function at(A){const E=o.render.frame;u.get(A)!==E&&(u.set(A,E),A.update())}function Pt(A,E){const B=A.colorSpace,Q=A.format,K=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||B!==Ao&&B!==Sr&&(he.getTransfer(B)===be?(Q!==Ci||K!==sr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),E}function yt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=D,this.resetTextureUnits=P,this.setTexture2D=V,this.setTexture2DArray=O,this.setTexture3D=tt,this.setTextureCube=H,this.rebindTextures=bt,this.setupRenderTarget=St,this.updateRenderTargetMipmap=ct,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=vt,this.setupFrameBufferTexture=nt,this.useMultisampledRTT=At}function mE(e,t){function n(i,r=Sr){let s;const o=he.getTransfer(r);if(i===sr)return e.UNSIGNED_BYTE;if(i===Ah)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Ch)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Cg)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Tg)return e.BYTE;if(i===Ag)return e.SHORT;if(i===Ma)return e.UNSIGNED_SHORT;if(i===Th)return e.INT;if(i===_s)return e.UNSIGNED_INT;if(i===Oi)return e.FLOAT;if(i===Oa)return e.HALF_FLOAT;if(i===Rg)return e.ALPHA;if(i===Pg)return e.RGB;if(i===Ci)return e.RGBA;if(i===Ug)return e.LUMINANCE;if(i===Dg)return e.LUMINANCE_ALPHA;if(i===no)return e.DEPTH_COMPONENT;if(i===go)return e.DEPTH_STENCIL;if(i===Rh)return e.RED;if(i===Ph)return e.RED_INTEGER;if(i===Ig)return e.RG;if(i===Uh)return e.RG_INTEGER;if(i===Dh)return e.RGBA_INTEGER;if(i===Oc||i===kc||i===zc||i===Bc)if(o===be)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Oc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===kc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===zc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Bc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Oc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===kc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===zc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Bc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===df||i===pf||i===mf||i===gf)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===df)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===pf)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===mf)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===gf)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===_f||i===vf||i===yf)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===_f||i===vf)return o===be?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===yf)return o===be?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===xf||i===Sf||i===Mf||i===bf||i===Ef||i===wf||i===Tf||i===Af||i===Cf||i===Rf||i===Pf||i===Uf||i===Df||i===If)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===xf)return o===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Sf)return o===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Mf)return o===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===bf)return o===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ef)return o===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===wf)return o===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Tf)return o===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Af)return o===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Cf)return o===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Rf)return o===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Pf)return o===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Uf)return o===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Df)return o===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===If)return o===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Gc||i===Lf||i===Ff)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===Gc)return o===be?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Lf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ff)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Lg||i===Nf||i===Of||i===kf)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===Gc)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Nf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Of)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===kf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===mo?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}class gE extends Fn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class xc extends mn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _E={type:"move"};class Mu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new j,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new j),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new j,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new j),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const g=n.getJointPose(_,i),p=this._getHandJoint(l,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,m=.005;l.inputState.pinching&&h>d+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=d-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=n.getPose(t.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=n.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(_E)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const i=new xc;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}}const vE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,yE=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class xE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n,i){if(this.texture===null){const r=new Mn,s=t.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,i=new or({vertexShader:vE,fragmentShader:yE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new An(new Es(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class SE extends Co{constructor(t,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,f=null,h=null,d=null,m=null;const _=new xE,g=n.getContextAttributes();let p=null,y=null;const x=[],v=[],T=new oe;let b=null;const w=new Fn;w.viewport=new Se;const C=new Fn;C.viewport=new Se;const M=[w,C],S=new gE;let U=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(N){let z=x[N];return z===void 0&&(z=new Mu,x[N]=z),z.getTargetRaySpace()},this.getControllerGrip=function(N){let z=x[N];return z===void 0&&(z=new Mu,x[N]=z),z.getGripSpace()},this.getHand=function(N){let z=x[N];return z===void 0&&(z=new Mu,x[N]=z),z.getHandSpace()};function D(N){const z=v.indexOf(N.inputSource);if(z===-1)return;const nt=x[z];nt!==void 0&&(nt.update(N.inputSource,N.frame,l||o),nt.dispatchEvent({type:N.type,data:N.inputSource}))}function I(){r.removeEventListener("select",D),r.removeEventListener("selectstart",D),r.removeEventListener("selectend",D),r.removeEventListener("squeeze",D),r.removeEventListener("squeezestart",D),r.removeEventListener("squeezeend",D),r.removeEventListener("end",I),r.removeEventListener("inputsourceschange",V);for(let N=0;N<x.length;N++){const z=v[N];z!==null&&(v[N]=null,x[N].disconnect(z))}U=null,P=null,_.reset(),t.setRenderTarget(p),d=null,h=null,f=null,r=null,y=null,J.stop(),i.isPresenting=!1,t.setPixelRatio(b),t.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(N){s=N,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(N){a=N,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(N){l=N},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(N){if(r=N,r!==null){if(p=t.getRenderTarget(),r.addEventListener("select",D),r.addEventListener("selectstart",D),r.addEventListener("selectend",D),r.addEventListener("squeeze",D),r.addEventListener("squeezestart",D),r.addEventListener("squeezeend",D),r.addEventListener("end",I),r.addEventListener("inputsourceschange",V),g.xrCompatible!==!0&&await n.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(T),r.renderState.layers===void 0){const z={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,n,z),r.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new vs(d.framebufferWidth,d.framebufferHeight,{format:Ci,type:sr,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let z=null,nt=null,$=null;g.depth&&($=g.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,z=g.stencil?go:no,nt=g.stencil?mo:_s);const it={colorFormat:n.RGBA8,depthFormat:$,scaleFactor:s};f=new XRWebGLBinding(r,n),h=f.createProjectionLayer(it),r.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),y=new vs(h.textureWidth,h.textureHeight,{format:Ci,type:sr,depthTexture:new jg(h.textureWidth,h.textureHeight,nt,void 0,void 0,void 0,void 0,void 0,void 0,z),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),J.setContext(r),J.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function V(N){for(let z=0;z<N.removed.length;z++){const nt=N.removed[z],$=v.indexOf(nt);$>=0&&(v[$]=null,x[$].disconnect(nt))}for(let z=0;z<N.added.length;z++){const nt=N.added[z];let $=v.indexOf(nt);if($===-1){for(let vt=0;vt<x.length;vt++)if(vt>=v.length){v.push(nt),$=vt;break}else if(v[vt]===null){v[vt]=nt,$=vt;break}if($===-1)break}const it=x[$];it&&it.connect(nt)}}const O=new j,tt=new j;function H(N,z,nt){O.setFromMatrixPosition(z.matrixWorld),tt.setFromMatrixPosition(nt.matrixWorld);const $=O.distanceTo(tt),it=z.projectionMatrix.elements,vt=nt.projectionMatrix.elements,bt=it[14]/(it[10]-1),St=it[14]/(it[10]+1),ct=(it[9]+1)/it[5],Ot=(it[9]-1)/it[5],k=(it[8]-1)/it[0],It=(vt[8]+1)/vt[0],wt=bt*k,At=bt*It,at=$/(-k+It),Pt=at*-k;if(z.matrixWorld.decompose(N.position,N.quaternion,N.scale),N.translateX(Pt),N.translateZ(at),N.matrixWorld.compose(N.position,N.quaternion,N.scale),N.matrixWorldInverse.copy(N.matrixWorld).invert(),it[10]===-1)N.projectionMatrix.copy(z.projectionMatrix),N.projectionMatrixInverse.copy(z.projectionMatrixInverse);else{const yt=bt+at,A=St+at,E=wt-Pt,B=At+($-Pt),Q=ct*St/A*yt,K=Ot*St/A*yt;N.projectionMatrix.makePerspective(E,B,Q,K,yt,A),N.projectionMatrixInverse.copy(N.projectionMatrix).invert()}}function q(N,z){z===null?N.matrixWorld.copy(N.matrix):N.matrixWorld.multiplyMatrices(z.matrixWorld,N.matrix),N.matrixWorldInverse.copy(N.matrixWorld).invert()}this.updateCamera=function(N){if(r===null)return;let z=N.near,nt=N.far;_.texture!==null&&(_.depthNear>0&&(z=_.depthNear),_.depthFar>0&&(nt=_.depthFar)),S.near=C.near=w.near=z,S.far=C.far=w.far=nt,(U!==S.near||P!==S.far)&&(r.updateRenderState({depthNear:S.near,depthFar:S.far}),U=S.near,P=S.far),w.layers.mask=N.layers.mask|2,C.layers.mask=N.layers.mask|4,S.layers.mask=w.layers.mask|C.layers.mask;const $=N.parent,it=S.cameras;q(S,$);for(let vt=0;vt<it.length;vt++)q(it[vt],$);it.length===2?H(S,w,C):S.projectionMatrix.copy(w.projectionMatrix),X(N,S,$)};function X(N,z,nt){nt===null?N.matrix.copy(z.matrixWorld):(N.matrix.copy(nt.matrixWorld),N.matrix.invert(),N.matrix.multiply(z.matrixWorld)),N.matrix.decompose(N.position,N.quaternion,N.scale),N.updateMatrixWorld(!0),N.projectionMatrix.copy(z.projectionMatrix),N.projectionMatrixInverse.copy(z.projectionMatrixInverse),N.isPerspectiveCamera&&(N.fov=ba*2*Math.atan(1/N.projectionMatrix.elements[5]),N.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(h===null&&d===null))return c},this.setFoveation=function(N){c=N,h!==null&&(h.fixedFoveation=N),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=N)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(S)};let F=null;function W(N,z){if(u=z.getViewerPose(l||o),m=z,u!==null){const nt=u.views;d!==null&&(t.setRenderTargetFramebuffer(y,d.framebuffer),t.setRenderTarget(y));let $=!1;nt.length!==S.cameras.length&&(S.cameras.length=0,$=!0);for(let vt=0;vt<nt.length;vt++){const bt=nt[vt];let St=null;if(d!==null)St=d.getViewport(bt);else{const Ot=f.getViewSubImage(h,bt);St=Ot.viewport,vt===0&&(t.setRenderTargetTextures(y,Ot.colorTexture,h.ignoreDepthValues?void 0:Ot.depthStencilTexture),t.setRenderTarget(y))}let ct=M[vt];ct===void 0&&(ct=new Fn,ct.layers.enable(vt),ct.viewport=new Se,M[vt]=ct),ct.matrix.fromArray(bt.transform.matrix),ct.matrix.decompose(ct.position,ct.quaternion,ct.scale),ct.projectionMatrix.fromArray(bt.projectionMatrix),ct.projectionMatrixInverse.copy(ct.projectionMatrix).invert(),ct.viewport.set(St.x,St.y,St.width,St.height),vt===0&&(S.matrix.copy(ct.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),$===!0&&S.cameras.push(ct)}const it=r.enabledFeatures;if(it&&it.includes("depth-sensing")){const vt=f.getDepthInformation(nt[0]);vt&&vt.isValid&&vt.texture&&_.init(t,vt,r.renderState)}}for(let nt=0;nt<x.length;nt++){const $=v[nt],it=x[nt];$!==null&&it!==void 0&&it.update($,z,l||o)}F&&F(N,z),z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:z}),m=null}const J=new Zg;J.setAnimationLoop(W),this.setAnimationLoop=function(N){F=N},this.dispose=function(){}}}const Zr=new ni,ME=new le;function bE(e,t){function n(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,$g(e)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function r(g,p,y,x,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),f(g,p)):p.isMeshPhongMaterial?(s(g,p),u(g,p)):p.isMeshStandardMaterial?(s(g,p),h(g,p),p.isMeshPhysicalMaterial&&d(g,p,v)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),_(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,y,x):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,n(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,n(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,n(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===On&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,n(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===On&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,n(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,n(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,n(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const y=t.get(p),x=y.envMap,v=y.envMapRotation;x&&(g.envMap.value=x,Zr.copy(v),Zr.x*=-1,Zr.y*=-1,Zr.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Zr.y*=-1,Zr.z*=-1),g.envMapRotation.value.setFromMatrix4(ME.makeRotationFromEuler(Zr)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,n(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,n(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,n(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,y,x){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=x*.5,p.map&&(g.map.value=p.map,n(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,n(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,n(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,n(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function f(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function h(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,n(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,n(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,y){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,n(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,n(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,n(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,n(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,n(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===On&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,n(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,n(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,n(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,n(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,n(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,n(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,n(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const y=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function EE(e,t,n,i){let r={},s={},o=[];const a=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,x){const v=x.program;i.uniformBlockBinding(y,v)}function l(y,x){let v=r[y.id];v===void 0&&(m(y),v=u(y),r[y.id]=v,y.addEventListener("dispose",g));const T=x.program;i.updateUBOMapping(y,T);const b=t.render.frame;s[y.id]!==b&&(h(y),s[y.id]=b)}function u(y){const x=f();y.__bindingPointIndex=x;const v=e.createBuffer(),T=y.__size,b=y.usage;return e.bindBuffer(e.UNIFORM_BUFFER,v),e.bufferData(e.UNIFORM_BUFFER,T,b),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,x,v),v}function f(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){const x=r[y.id],v=y.uniforms,T=y.__cache;e.bindBuffer(e.UNIFORM_BUFFER,x);for(let b=0,w=v.length;b<w;b++){const C=Array.isArray(v[b])?v[b]:[v[b]];for(let M=0,S=C.length;M<S;M++){const U=C[M];if(d(U,b,M,T)===!0){const P=U.__offset,D=Array.isArray(U.value)?U.value:[U.value];let I=0;for(let V=0;V<D.length;V++){const O=D[V],tt=_(O);typeof O=="number"||typeof O=="boolean"?(U.__data[0]=O,e.bufferSubData(e.UNIFORM_BUFFER,P+I,U.__data)):O.isMatrix3?(U.__data[0]=O.elements[0],U.__data[1]=O.elements[1],U.__data[2]=O.elements[2],U.__data[3]=0,U.__data[4]=O.elements[3],U.__data[5]=O.elements[4],U.__data[6]=O.elements[5],U.__data[7]=0,U.__data[8]=O.elements[6],U.__data[9]=O.elements[7],U.__data[10]=O.elements[8],U.__data[11]=0):(O.toArray(U.__data,I),I+=tt.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,P,U.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function d(y,x,v,T){const b=y.value,w=x+"_"+v;if(T[w]===void 0)return typeof b=="number"||typeof b=="boolean"?T[w]=b:T[w]=b.clone(),!0;{const C=T[w];if(typeof b=="number"||typeof b=="boolean"){if(C!==b)return T[w]=b,!0}else if(C.equals(b)===!1)return C.copy(b),!0}return!1}function m(y){const x=y.uniforms;let v=0;const T=16;for(let w=0,C=x.length;w<C;w++){const M=Array.isArray(x[w])?x[w]:[x[w]];for(let S=0,U=M.length;S<U;S++){const P=M[S],D=Array.isArray(P.value)?P.value:[P.value];for(let I=0,V=D.length;I<V;I++){const O=D[I],tt=_(O),H=v%T,q=H%tt.boundary,X=H+q;v+=q,X!==0&&T-X<tt.storage&&(v+=T-X),P.__data=new Float32Array(tt.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=v,v+=tt.storage}}}const b=v%T;return b>0&&(v+=T-b),y.__size=v,y.__cache={},this}function _(y){const x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function g(y){const x=y.target;x.removeEventListener("dispose",g);const v=o.indexOf(x.__bindingPointIndex);o.splice(v,1),e.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function p(){for(const y in r)e.deleteBuffer(r[y]);o=[],r={},s={}}return{bind:c,update:l,dispose:p}}class wE{constructor(t={}){const{canvas:n=mx(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const y=[],x=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ci,this.toneMapping=Ur,this.toneMappingExposure=1;const v=this;let T=!1,b=0,w=0,C=null,M=-1,S=null;const U=new Se,P=new Se;let D=null;const I=new ie(0);let V=0,O=n.width,tt=n.height,H=1,q=null,X=null;const F=new Se(0,0,O,tt),W=new Se(0,0,O,tt);let J=!1;const N=new Lh;let z=!1,nt=!1;const $=new le,it=new le,vt=new j,bt=new Se,St={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ct=!1;function Ot(){return C===null?H:1}let k=i;function It(R,Z){return n.getContext(R,Z)}try{const R={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${wh}`),n.addEventListener("webglcontextlost",pt,!1),n.addEventListener("webglcontextrestored",Mt,!1),n.addEventListener("webglcontextcreationerror",xt,!1),k===null){const Z="webgl2";if(k=It(Z,R),k===null)throw It(Z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let wt,At,at,Pt,yt,A,E,B,Q,K,ot,gt,lt,dt,Lt,_t,Ct,Rt,Ut,ht,Ht,Ft,Qt,G;function ft(){wt=new DM(k),wt.init(),Ft=new mE(k,wt),At=new TM(k,wt,t,Ft),at=new hE(k,wt),At.reverseDepthBuffer&&h&&at.buffers.depth.setReversed(!0),Pt=new FM(k),yt=new Qb,A=new pE(k,wt,at,yt,At,Ft,Pt),E=new CM(v),B=new UM(v),Q=new Vx(k),Qt=new EM(k,Q),K=new IM(k,Q,Pt,Qt),ot=new OM(k,K,Q,Pt),Ut=new NM(k,At,A),_t=new AM(yt),gt=new Jb(v,E,B,wt,At,Qt,_t),lt=new bE(v,yt),dt=new eE,Lt=new aE(wt),Rt=new bM(v,E,B,at,ot,d,c),Ct=new uE(v,ot,At),G=new EE(k,Pt,At,at),ht=new wM(k,wt,Pt),Ht=new LM(k,wt,Pt),Pt.programs=gt.programs,v.capabilities=At,v.extensions=wt,v.properties=yt,v.renderLists=dt,v.shadowMap=Ct,v.state=at,v.info=Pt}ft();const et=new SE(v,k);this.xr=et,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const R=wt.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=wt.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(R){R!==void 0&&(H=R,this.setSize(O,tt,!1))},this.getSize=function(R){return R.set(O,tt)},this.setSize=function(R,Z,st=!0){if(et.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=R,tt=Z,n.width=Math.floor(R*H),n.height=Math.floor(Z*H),st===!0&&(n.style.width=R+"px",n.style.height=Z+"px"),this.setViewport(0,0,R,Z)},this.getDrawingBufferSize=function(R){return R.set(O*H,tt*H).floor()},this.setDrawingBufferSize=function(R,Z,st){O=R,tt=Z,H=st,n.width=Math.floor(R*st),n.height=Math.floor(Z*st),this.setViewport(0,0,R,Z)},this.getCurrentViewport=function(R){return R.copy(U)},this.getViewport=function(R){return R.copy(F)},this.setViewport=function(R,Z,st,rt){R.isVector4?F.set(R.x,R.y,R.z,R.w):F.set(R,Z,st,rt),at.viewport(U.copy(F).multiplyScalar(H).round())},this.getScissor=function(R){return R.copy(W)},this.setScissor=function(R,Z,st,rt){R.isVector4?W.set(R.x,R.y,R.z,R.w):W.set(R,Z,st,rt),at.scissor(P.copy(W).multiplyScalar(H).round())},this.getScissorTest=function(){return J},this.setScissorTest=function(R){at.setScissorTest(J=R)},this.setOpaqueSort=function(R){q=R},this.setTransparentSort=function(R){X=R},this.getClearColor=function(R){return R.copy(Rt.getClearColor())},this.setClearColor=function(){Rt.setClearColor.apply(Rt,arguments)},this.getClearAlpha=function(){return Rt.getClearAlpha()},this.setClearAlpha=function(){Rt.setClearAlpha.apply(Rt,arguments)},this.clear=function(R=!0,Z=!0,st=!0){let rt=0;if(R){let Y=!1;if(C!==null){const Tt=C.texture.format;Y=Tt===Dh||Tt===Uh||Tt===Ph}if(Y){const Tt=C.texture.type,ut=Tt===sr||Tt===_s||Tt===Ma||Tt===mo||Tt===Ah||Tt===Ch,Nt=Rt.getClearColor(),Bt=Rt.getClearAlpha(),Yt=Nt.r,jt=Nt.g,zt=Nt.b;ut?(m[0]=Yt,m[1]=jt,m[2]=zt,m[3]=Bt,k.clearBufferuiv(k.COLOR,0,m)):(_[0]=Yt,_[1]=jt,_[2]=zt,_[3]=Bt,k.clearBufferiv(k.COLOR,0,_))}else rt|=k.COLOR_BUFFER_BIT}Z&&(rt|=k.DEPTH_BUFFER_BIT),st&&(rt|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(rt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",pt,!1),n.removeEventListener("webglcontextrestored",Mt,!1),n.removeEventListener("webglcontextcreationerror",xt,!1),dt.dispose(),Lt.dispose(),yt.dispose(),E.dispose(),B.dispose(),ot.dispose(),Qt.dispose(),G.dispose(),gt.dispose(),et.dispose(),et.removeEventListener("sessionstart",Be),et.removeEventListener("sessionend",Cn),_n.stop()};function pt(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function Mt(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const R=Pt.autoReset,Z=Ct.enabled,st=Ct.autoUpdate,rt=Ct.needsUpdate,Y=Ct.type;ft(),Pt.autoReset=R,Ct.enabled=Z,Ct.autoUpdate=st,Ct.needsUpdate=rt,Ct.type=Y}function xt(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function kt(R){const Z=R.target;Z.removeEventListener("dispose",kt),Zt(Z)}function Zt(R){Vt(R),yt.remove(R)}function Vt(R){const Z=yt.get(R).programs;Z!==void 0&&(Z.forEach(function(st){gt.releaseProgram(st)}),R.isShaderMaterial&&gt.releaseShaderCache(R))}this.renderBufferDirect=function(R,Z,st,rt,Y,Tt){Z===null&&(Z=St);const ut=Y.isMesh&&Y.matrixWorld.determinant()<0,Nt=Ol(R,Z,st,rt,Y);at.setMaterial(rt,ut);let Bt=st.index,Yt=1;if(rt.wireframe===!0){if(Bt=K.getWireframeAttribute(st),Bt===void 0)return;Yt=2}const jt=st.drawRange,zt=st.attributes.position;let se=jt.start*Yt,me=(jt.start+jt.count)*Yt;Tt!==null&&(se=Math.max(se,Tt.start*Yt),me=Math.min(me,(Tt.start+Tt.count)*Yt)),Bt!==null?(se=Math.max(se,0),me=Math.min(me,Bt.count)):zt!=null&&(se=Math.max(se,0),me=Math.min(me,zt.count));const ve=me-se;if(ve<0||ve===1/0)return;Qt.setup(Y,rt,Nt,st,Bt);let an,ae=ht;if(Bt!==null&&(an=Q.get(Bt),ae=Ht,ae.setIndex(an)),Y.isMesh)rt.wireframe===!0?(at.setLineWidth(rt.wireframeLinewidth*Ot()),ae.setMode(k.LINES)):ae.setMode(k.TRIANGLES);else if(Y.isLine){let Gt=rt.linewidth;Gt===void 0&&(Gt=1),at.setLineWidth(Gt*Ot()),Y.isLineSegments?ae.setMode(k.LINES):Y.isLineLoop?ae.setMode(k.LINE_LOOP):ae.setMode(k.LINE_STRIP)}else Y.isPoints?ae.setMode(k.POINTS):Y.isSprite&&ae.setMode(k.TRIANGLES);if(Y.isBatchedMesh)if(Y._multiDrawInstances!==null)ae.renderMultiDrawInstances(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount,Y._multiDrawInstances);else if(wt.get("WEBGL_multi_draw"))ae.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{const Gt=Y._multiDrawStarts,$n=Y._multiDrawCounts,ue=Y._multiDrawCount,cn=Bt?Q.get(Bt).bytesPerElement:1,Pi=yt.get(rt).currentProgram.getUniforms();for(let Xe=0;Xe<ue;Xe++)Pi.setValue(k,"_gl_DrawID",Xe),ae.render(Gt[Xe]/cn,$n[Xe])}else if(Y.isInstancedMesh)ae.renderInstances(se,ve,Y.count);else if(st.isInstancedBufferGeometry){const Gt=st._maxInstanceCount!==void 0?st._maxInstanceCount:1/0,$n=Math.min(st.instanceCount,Gt);ae.renderInstances(se,ve,$n)}else ae.render(se,ve)};function Xt(R,Z,st){R.transparent===!0&&R.side===Li&&R.forceSinglePass===!1?(R.side=On,R.needsUpdate=!0,si(R,Z,st),R.side=Nr,R.needsUpdate=!0,si(R,Z,st),R.side=Li):si(R,Z,st)}this.compile=function(R,Z,st=null){st===null&&(st=R),p=Lt.get(st),p.init(Z),x.push(p),st.traverseVisible(function(Y){Y.isLight&&Y.layers.test(Z.layers)&&(p.pushLight(Y),Y.castShadow&&p.pushShadow(Y))}),R!==st&&R.traverseVisible(function(Y){Y.isLight&&Y.layers.test(Z.layers)&&(p.pushLight(Y),Y.castShadow&&p.pushShadow(Y))}),p.setupLights();const rt=new Set;return R.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;const Tt=Y.material;if(Tt)if(Array.isArray(Tt))for(let ut=0;ut<Tt.length;ut++){const Nt=Tt[ut];Xt(Nt,st,Y),rt.add(Nt)}else Xt(Tt,st,Y),rt.add(Tt)}),x.pop(),p=null,rt},this.compileAsync=function(R,Z,st=null){const rt=this.compile(R,Z,st);return new Promise(Y=>{function Tt(){if(rt.forEach(function(ut){yt.get(ut).currentProgram.isReady()&&rt.delete(ut)}),rt.size===0){Y(R);return}setTimeout(Tt,10)}wt.get("KHR_parallel_shader_compile")!==null?Tt():setTimeout(Tt,10)})};let we=null;function Re(R){we&&we(R)}function Be(){_n.stop()}function Cn(){_n.start()}const _n=new Zg;_n.setAnimationLoop(Re),typeof self<"u"&&_n.setContext(self),this.setAnimationLoop=function(R){we=R,et.setAnimationLoop(R),R===null?_n.stop():_n.start()},et.addEventListener("sessionstart",Be),et.addEventListener("sessionend",Cn),this.render=function(R,Z){if(Z!==void 0&&Z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),Z.parent===null&&Z.matrixWorldAutoUpdate===!0&&Z.updateMatrixWorld(),et.enabled===!0&&et.isPresenting===!0&&(et.cameraAutoUpdate===!0&&et.updateCamera(Z),Z=et.getCamera()),R.isScene===!0&&R.onBeforeRender(v,R,Z,C),p=Lt.get(R,x.length),p.init(Z),x.push(p),it.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),N.setFromProjectionMatrix(it),nt=this.localClippingEnabled,z=_t.init(this.clippingPlanes,nt),g=dt.get(R,y.length),g.init(),y.push(g),et.enabled===!0&&et.isPresenting===!0){const Tt=v.xr.getDepthSensingMesh();Tt!==null&&Wn(Tt,Z,-1/0,v.sortObjects)}Wn(R,Z,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(q,X),ct=et.enabled===!1||et.isPresenting===!1||et.hasDepthSensing()===!1,ct&&Rt.addToRenderList(g,R),this.info.render.frame++,z===!0&&_t.beginShadows();const st=p.state.shadowsArray;Ct.render(st,R,Z),z===!0&&_t.endShadows(),this.info.autoReset===!0&&this.info.reset();const rt=g.opaque,Y=g.transmissive;if(p.setupLights(),Z.isArrayCamera){const Tt=Z.cameras;if(Y.length>0)for(let ut=0,Nt=Tt.length;ut<Nt;ut++){const Bt=Tt[ut];Ri(rt,Y,R,Bt)}ct&&Rt.render(R);for(let ut=0,Nt=Tt.length;ut<Nt;ut++){const Bt=Tt[ut];vi(g,R,Bt,Bt.viewport)}}else Y.length>0&&Ri(rt,Y,R,Z),ct&&Rt.render(R),vi(g,R,Z);C!==null&&(A.updateMultisampleRenderTarget(C),A.updateRenderTargetMipmap(C)),R.isScene===!0&&R.onAfterRender(v,R,Z),Qt.resetDefaultState(),M=-1,S=null,x.pop(),x.length>0?(p=x[x.length-1],z===!0&&_t.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function Wn(R,Z,st,rt){if(R.visible===!1)return;if(R.layers.test(Z.layers)){if(R.isGroup)st=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(Z);else if(R.isLight)p.pushLight(R),R.castShadow&&p.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||N.intersectsSprite(R)){rt&&bt.setFromMatrixPosition(R.matrixWorld).applyMatrix4(it);const ut=ot.update(R),Nt=R.material;Nt.visible&&g.push(R,ut,Nt,st,bt.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||N.intersectsObject(R))){const ut=ot.update(R),Nt=R.material;if(rt&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),bt.copy(R.boundingSphere.center)):(ut.boundingSphere===null&&ut.computeBoundingSphere(),bt.copy(ut.boundingSphere.center)),bt.applyMatrix4(R.matrixWorld).applyMatrix4(it)),Array.isArray(Nt)){const Bt=ut.groups;for(let Yt=0,jt=Bt.length;Yt<jt;Yt++){const zt=Bt[Yt],se=Nt[zt.materialIndex];se&&se.visible&&g.push(R,ut,se,st,bt.z,zt)}}else Nt.visible&&g.push(R,ut,Nt,st,bt.z,null)}}const Tt=R.children;for(let ut=0,Nt=Tt.length;ut<Nt;ut++)Wn(Tt[ut],Z,st,rt)}function vi(R,Z,st,rt){const Y=R.opaque,Tt=R.transmissive,ut=R.transparent;p.setupLightsView(st),z===!0&&_t.setGlobalState(v.clippingPlanes,st),rt&&at.viewport(U.copy(rt)),Y.length>0&&Rn(Y,Z,st),Tt.length>0&&Rn(Tt,Z,st),ut.length>0&&Rn(ut,Z,st),at.buffers.depth.setTest(!0),at.buffers.depth.setMask(!0),at.buffers.color.setMask(!0),at.setPolygonOffset(!1)}function Ri(R,Z,st,rt){if((st.isScene===!0?st.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[rt.id]===void 0&&(p.state.transmissionRenderTarget[rt.id]=new vs(1,1,{generateMipmaps:!0,type:wt.has("EXT_color_buffer_half_float")||wt.has("EXT_color_buffer_float")?Oa:sr,minFilter:as,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:he.workingColorSpace}));const Tt=p.state.transmissionRenderTarget[rt.id],ut=rt.viewport||U;Tt.setSize(ut.z,ut.w);const Nt=v.getRenderTarget();v.setRenderTarget(Tt),v.getClearColor(I),V=v.getClearAlpha(),V<1&&v.setClearColor(16777215,.5),v.clear(),ct&&Rt.render(st);const Bt=v.toneMapping;v.toneMapping=Ur;const Yt=rt.viewport;if(rt.viewport!==void 0&&(rt.viewport=void 0),p.setupLightsView(rt),z===!0&&_t.setGlobalState(v.clippingPlanes,rt),Rn(R,st,rt),A.updateMultisampleRenderTarget(Tt),A.updateRenderTargetMipmap(Tt),wt.has("WEBGL_multisampled_render_to_texture")===!1){let jt=!1;for(let zt=0,se=Z.length;zt<se;zt++){const me=Z[zt],ve=me.object,an=me.geometry,ae=me.material,Gt=me.group;if(ae.side===Li&&ve.layers.test(rt.layers)){const $n=ae.side;ae.side=On,ae.needsUpdate=!0,en(ve,st,rt,an,ae,Gt),ae.side=$n,ae.needsUpdate=!0,jt=!0}}jt===!0&&(A.updateMultisampleRenderTarget(Tt),A.updateRenderTargetMipmap(Tt))}v.setRenderTarget(Nt),v.setClearColor(I,V),Yt!==void 0&&(rt.viewport=Yt),v.toneMapping=Bt}function Rn(R,Z,st){const rt=Z.isScene===!0?Z.overrideMaterial:null;for(let Y=0,Tt=R.length;Y<Tt;Y++){const ut=R[Y],Nt=ut.object,Bt=ut.geometry,Yt=rt===null?ut.material:rt,jt=ut.group;Nt.layers.test(st.layers)&&en(Nt,Z,st,Bt,Yt,jt)}}function en(R,Z,st,rt,Y,Tt){R.onBeforeRender(v,Z,st,rt,Y,Tt),R.modelViewMatrix.multiplyMatrices(st.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),Y.onBeforeRender(v,Z,st,rt,R,Tt),Y.transparent===!0&&Y.side===Li&&Y.forceSinglePass===!1?(Y.side=On,Y.needsUpdate=!0,v.renderBufferDirect(st,Z,rt,Y,R,Tt),Y.side=Nr,Y.needsUpdate=!0,v.renderBufferDirect(st,Z,rt,Y,R,Tt),Y.side=Li):v.renderBufferDirect(st,Z,rt,Y,R,Tt),R.onAfterRender(v,Z,st,rt,Y,Tt)}function si(R,Z,st){Z.isScene!==!0&&(Z=St);const rt=yt.get(R),Y=p.state.lights,Tt=p.state.shadowsArray,ut=Y.state.version,Nt=gt.getParameters(R,Y.state,Tt,Z,st),Bt=gt.getProgramCacheKey(Nt);let Yt=rt.programs;rt.environment=R.isMeshStandardMaterial?Z.environment:null,rt.fog=Z.fog,rt.envMap=(R.isMeshStandardMaterial?B:E).get(R.envMap||rt.environment),rt.envMapRotation=rt.environment!==null&&R.envMap===null?Z.environmentRotation:R.envMapRotation,Yt===void 0&&(R.addEventListener("dispose",kt),Yt=new Map,rt.programs=Yt);let jt=Yt.get(Bt);if(jt!==void 0){if(rt.currentProgram===jt&&rt.lightsStateVersion===ut)return Cs(R,Nt),jt}else Nt.uniforms=gt.getUniforms(R),R.onBeforeCompile(Nt,v),jt=gt.acquireProgram(Nt,Bt),Yt.set(Bt,jt),rt.uniforms=Nt.uniforms;const zt=rt.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(zt.clippingPlanes=_t.uniform),Cs(R,Nt),rt.needsLights=Rs(R),rt.lightsStateVersion=ut,rt.needsLights&&(zt.ambientLightColor.value=Y.state.ambient,zt.lightProbe.value=Y.state.probe,zt.directionalLights.value=Y.state.directional,zt.directionalLightShadows.value=Y.state.directionalShadow,zt.spotLights.value=Y.state.spot,zt.spotLightShadows.value=Y.state.spotShadow,zt.rectAreaLights.value=Y.state.rectArea,zt.ltc_1.value=Y.state.rectAreaLTC1,zt.ltc_2.value=Y.state.rectAreaLTC2,zt.pointLights.value=Y.state.point,zt.pointLightShadows.value=Y.state.pointShadow,zt.hemisphereLights.value=Y.state.hemi,zt.directionalShadowMap.value=Y.state.directionalShadowMap,zt.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,zt.spotShadowMap.value=Y.state.spotShadowMap,zt.spotLightMatrix.value=Y.state.spotLightMatrix,zt.spotLightMap.value=Y.state.spotLightMap,zt.pointShadowMap.value=Y.state.pointShadowMap,zt.pointShadowMatrix.value=Y.state.pointShadowMatrix),rt.currentProgram=jt,rt.uniformsList=null,jt}function Fo(R){if(R.uniformsList===null){const Z=R.currentProgram.getUniforms();R.uniformsList=Vc.seqWithValue(Z.seq,R.uniforms)}return R.uniformsList}function Cs(R,Z){const st=yt.get(R);st.outputColorSpace=Z.outputColorSpace,st.batching=Z.batching,st.batchingColor=Z.batchingColor,st.instancing=Z.instancing,st.instancingColor=Z.instancingColor,st.instancingMorph=Z.instancingMorph,st.skinning=Z.skinning,st.morphTargets=Z.morphTargets,st.morphNormals=Z.morphNormals,st.morphColors=Z.morphColors,st.morphTargetsCount=Z.morphTargetsCount,st.numClippingPlanes=Z.numClippingPlanes,st.numIntersection=Z.numClipIntersection,st.vertexAlphas=Z.vertexAlphas,st.vertexTangents=Z.vertexTangents,st.toneMapping=Z.toneMapping}function Ol(R,Z,st,rt,Y){Z.isScene!==!0&&(Z=St),A.resetTextureUnits();const Tt=Z.fog,ut=rt.isMeshStandardMaterial?Z.environment:null,Nt=C===null?v.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Ao,Bt=(rt.isMeshStandardMaterial?B:E).get(rt.envMap||ut),Yt=rt.vertexColors===!0&&!!st.attributes.color&&st.attributes.color.itemSize===4,jt=!!st.attributes.tangent&&(!!rt.normalMap||rt.anisotropy>0),zt=!!st.morphAttributes.position,se=!!st.morphAttributes.normal,me=!!st.morphAttributes.color;let ve=Ur;rt.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(ve=v.toneMapping);const an=st.morphAttributes.position||st.morphAttributes.normal||st.morphAttributes.color,ae=an!==void 0?an.length:0,Gt=yt.get(rt),$n=p.state.lights;if(z===!0&&(nt===!0||R!==S)){const Un=R===S&&rt.id===M;_t.setState(rt,R,Un)}let ue=!1;rt.version===Gt.__version?(Gt.needsLights&&Gt.lightsStateVersion!==$n.state.version||Gt.outputColorSpace!==Nt||Y.isBatchedMesh&&Gt.batching===!1||!Y.isBatchedMesh&&Gt.batching===!0||Y.isBatchedMesh&&Gt.batchingColor===!0&&Y.colorTexture===null||Y.isBatchedMesh&&Gt.batchingColor===!1&&Y.colorTexture!==null||Y.isInstancedMesh&&Gt.instancing===!1||!Y.isInstancedMesh&&Gt.instancing===!0||Y.isSkinnedMesh&&Gt.skinning===!1||!Y.isSkinnedMesh&&Gt.skinning===!0||Y.isInstancedMesh&&Gt.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Gt.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Gt.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Gt.instancingMorph===!1&&Y.morphTexture!==null||Gt.envMap!==Bt||rt.fog===!0&&Gt.fog!==Tt||Gt.numClippingPlanes!==void 0&&(Gt.numClippingPlanes!==_t.numPlanes||Gt.numIntersection!==_t.numIntersection)||Gt.vertexAlphas!==Yt||Gt.vertexTangents!==jt||Gt.morphTargets!==zt||Gt.morphNormals!==se||Gt.morphColors!==me||Gt.toneMapping!==ve||Gt.morphTargetsCount!==ae)&&(ue=!0):(ue=!0,Gt.__version=rt.version);let cn=Gt.currentProgram;ue===!0&&(cn=si(rt,Z,Y));let Pi=!1,Xe=!1,Hi=!1;const ye=cn.getUniforms(),Pn=Gt.uniforms;if(at.useProgram(cn.program)&&(Pi=!0,Xe=!0,Hi=!0),rt.id!==M&&(M=rt.id,Xe=!0),Pi||S!==R){at.buffers.depth.getReversed()?($.copy(R.projectionMatrix),_x($),vx($),ye.setValue(k,"projectionMatrix",$)):ye.setValue(k,"projectionMatrix",R.projectionMatrix),ye.setValue(k,"viewMatrix",R.matrixWorldInverse);const Xn=ye.map.cameraPosition;Xn!==void 0&&Xn.setValue(k,vt.setFromMatrixPosition(R.matrixWorld)),At.logarithmicDepthBuffer&&ye.setValue(k,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(rt.isMeshPhongMaterial||rt.isMeshToonMaterial||rt.isMeshLambertMaterial||rt.isMeshBasicMaterial||rt.isMeshStandardMaterial||rt.isShaderMaterial)&&ye.setValue(k,"isOrthographic",R.isOrthographicCamera===!0),S!==R&&(S=R,Xe=!0,Hi=!0)}if(Y.isSkinnedMesh){ye.setOptional(k,Y,"bindMatrix"),ye.setOptional(k,Y,"bindMatrixInverse");const Un=Y.skeleton;Un&&(Un.boneTexture===null&&Un.computeBoneTexture(),ye.setValue(k,"boneTexture",Un.boneTexture,A))}Y.isBatchedMesh&&(ye.setOptional(k,Y,"batchingTexture"),ye.setValue(k,"batchingTexture",Y._matricesTexture,A),ye.setOptional(k,Y,"batchingIdTexture"),ye.setValue(k,"batchingIdTexture",Y._indirectTexture,A),ye.setOptional(k,Y,"batchingColorTexture"),Y._colorsTexture!==null&&ye.setValue(k,"batchingColorTexture",Y._colorsTexture,A));const vn=st.morphAttributes;if((vn.position!==void 0||vn.normal!==void 0||vn.color!==void 0)&&Ut.update(Y,st,cn),(Xe||Gt.receiveShadow!==Y.receiveShadow)&&(Gt.receiveShadow=Y.receiveShadow,ye.setValue(k,"receiveShadow",Y.receiveShadow)),rt.isMeshGouraudMaterial&&rt.envMap!==null&&(Pn.envMap.value=Bt,Pn.flipEnvMap.value=Bt.isCubeTexture&&Bt.isRenderTargetTexture===!1?-1:1),rt.isMeshStandardMaterial&&rt.envMap===null&&Z.environment!==null&&(Pn.envMapIntensity.value=Z.environmentIntensity),Xe&&(ye.setValue(k,"toneMappingExposure",v.toneMappingExposure),Gt.needsLights&&Wa(Pn,Hi),Tt&&rt.fog===!0&&lt.refreshFogUniforms(Pn,Tt),lt.refreshMaterialUniforms(Pn,rt,H,tt,p.state.transmissionRenderTarget[R.id]),Vc.upload(k,Fo(Gt),Pn,A)),rt.isShaderMaterial&&rt.uniformsNeedUpdate===!0&&(Vc.upload(k,Fo(Gt),Pn,A),rt.uniformsNeedUpdate=!1),rt.isSpriteMaterial&&ye.setValue(k,"center",Y.center),ye.setValue(k,"modelViewMatrix",Y.modelViewMatrix),ye.setValue(k,"normalMatrix",Y.normalMatrix),ye.setValue(k,"modelMatrix",Y.matrixWorld),rt.isShaderMaterial||rt.isRawShaderMaterial){const Un=rt.uniformsGroups;for(let Xn=0,Dn=Un.length;Xn<Dn;Xn++){const No=Un[Xn];G.update(No,cn),G.bind(No,cn)}}return cn}function Wa(R,Z){R.ambientLightColor.needsUpdate=Z,R.lightProbe.needsUpdate=Z,R.directionalLights.needsUpdate=Z,R.directionalLightShadows.needsUpdate=Z,R.pointLights.needsUpdate=Z,R.pointLightShadows.needsUpdate=Z,R.spotLights.needsUpdate=Z,R.spotLightShadows.needsUpdate=Z,R.rectAreaLights.needsUpdate=Z,R.hemisphereLights.needsUpdate=Z}function Rs(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(R,Z,st){yt.get(R.texture).__webglTexture=Z,yt.get(R.depthTexture).__webglTexture=st;const rt=yt.get(R);rt.__hasExternalTextures=!0,rt.__autoAllocateDepthBuffer=st===void 0,rt.__autoAllocateDepthBuffer||wt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),rt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,Z){const st=yt.get(R);st.__webglFramebuffer=Z,st.__useDefaultFramebuffer=Z===void 0},this.setRenderTarget=function(R,Z=0,st=0){C=R,b=Z,w=st;let rt=!0,Y=null,Tt=!1,ut=!1;if(R){const Bt=yt.get(R);if(Bt.__useDefaultFramebuffer!==void 0)at.bindFramebuffer(k.FRAMEBUFFER,null),rt=!1;else if(Bt.__webglFramebuffer===void 0)A.setupRenderTarget(R);else if(Bt.__hasExternalTextures)A.rebindTextures(R,yt.get(R.texture).__webglTexture,yt.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const zt=R.depthTexture;if(Bt.__boundDepthTexture!==zt){if(zt!==null&&yt.has(zt)&&(R.width!==zt.image.width||R.height!==zt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(R)}}const Yt=R.texture;(Yt.isData3DTexture||Yt.isDataArrayTexture||Yt.isCompressedArrayTexture)&&(ut=!0);const jt=yt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(jt[Z])?Y=jt[Z][st]:Y=jt[Z],Tt=!0):R.samples>0&&A.useMultisampledRTT(R)===!1?Y=yt.get(R).__webglMultisampledFramebuffer:Array.isArray(jt)?Y=jt[st]:Y=jt,U.copy(R.viewport),P.copy(R.scissor),D=R.scissorTest}else U.copy(F).multiplyScalar(H).floor(),P.copy(W).multiplyScalar(H).floor(),D=J;if(at.bindFramebuffer(k.FRAMEBUFFER,Y)&&rt&&at.drawBuffers(R,Y),at.viewport(U),at.scissor(P),at.setScissorTest(D),Tt){const Bt=yt.get(R.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Bt.__webglTexture,st)}else if(ut){const Bt=yt.get(R.texture),Yt=Z||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,Bt.__webglTexture,st||0,Yt)}M=-1},this.readRenderTargetPixels=function(R,Z,st,rt,Y,Tt,ut){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Nt=yt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&ut!==void 0&&(Nt=Nt[ut]),Nt){at.bindFramebuffer(k.FRAMEBUFFER,Nt);try{const Bt=R.texture,Yt=Bt.format,jt=Bt.type;if(!At.textureFormatReadable(Yt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!At.textureTypeReadable(jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Z>=0&&Z<=R.width-rt&&st>=0&&st<=R.height-Y&&k.readPixels(Z,st,rt,Y,Ft.convert(Yt),Ft.convert(jt),Tt)}finally{const Bt=C!==null?yt.get(C).__webglFramebuffer:null;at.bindFramebuffer(k.FRAMEBUFFER,Bt)}}},this.readRenderTargetPixelsAsync=async function(R,Z,st,rt,Y,Tt,ut){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Nt=yt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&ut!==void 0&&(Nt=Nt[ut]),Nt){const Bt=R.texture,Yt=Bt.format,jt=Bt.type;if(!At.textureFormatReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!At.textureTypeReadable(jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(Z>=0&&Z<=R.width-rt&&st>=0&&st<=R.height-Y){at.bindFramebuffer(k.FRAMEBUFFER,Nt);const zt=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,zt),k.bufferData(k.PIXEL_PACK_BUFFER,Tt.byteLength,k.STREAM_READ),k.readPixels(Z,st,rt,Y,Ft.convert(Yt),Ft.convert(jt),0);const se=C!==null?yt.get(C).__webglFramebuffer:null;at.bindFramebuffer(k.FRAMEBUFFER,se);const me=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await gx(k,me,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,zt),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,Tt),k.deleteBuffer(zt),k.deleteSync(me),Tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,Z=null,st=0){R.isTexture!==!0&&(na("WebGLRenderer: copyFramebufferToTexture function signature has changed."),Z=arguments[0]||null,R=arguments[1]);const rt=Math.pow(2,-st),Y=Math.floor(R.image.width*rt),Tt=Math.floor(R.image.height*rt),ut=Z!==null?Z.x:0,Nt=Z!==null?Z.y:0;A.setTexture2D(R,0),k.copyTexSubImage2D(k.TEXTURE_2D,st,0,0,ut,Nt,Y,Tt),at.unbindTexture()},this.copyTextureToTexture=function(R,Z,st=null,rt=null,Y=0){R.isTexture!==!0&&(na("WebGLRenderer: copyTextureToTexture function signature has changed."),rt=arguments[0]||null,R=arguments[1],Z=arguments[2],Y=arguments[3]||0,st=null);let Tt,ut,Nt,Bt,Yt,jt,zt,se,me;const ve=R.isCompressedTexture?R.mipmaps[Y]:R.image;st!==null?(Tt=st.max.x-st.min.x,ut=st.max.y-st.min.y,Nt=st.isBox3?st.max.z-st.min.z:1,Bt=st.min.x,Yt=st.min.y,jt=st.isBox3?st.min.z:0):(Tt=ve.width,ut=ve.height,Nt=ve.depth||1,Bt=0,Yt=0,jt=0),rt!==null?(zt=rt.x,se=rt.y,me=rt.z):(zt=0,se=0,me=0);const an=Ft.convert(Z.format),ae=Ft.convert(Z.type);let Gt;Z.isData3DTexture?(A.setTexture3D(Z,0),Gt=k.TEXTURE_3D):Z.isDataArrayTexture||Z.isCompressedArrayTexture?(A.setTexture2DArray(Z,0),Gt=k.TEXTURE_2D_ARRAY):(A.setTexture2D(Z,0),Gt=k.TEXTURE_2D),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,Z.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,Z.unpackAlignment);const $n=k.getParameter(k.UNPACK_ROW_LENGTH),ue=k.getParameter(k.UNPACK_IMAGE_HEIGHT),cn=k.getParameter(k.UNPACK_SKIP_PIXELS),Pi=k.getParameter(k.UNPACK_SKIP_ROWS),Xe=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,ve.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,ve.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Bt),k.pixelStorei(k.UNPACK_SKIP_ROWS,Yt),k.pixelStorei(k.UNPACK_SKIP_IMAGES,jt);const Hi=R.isDataArrayTexture||R.isData3DTexture,ye=Z.isDataArrayTexture||Z.isData3DTexture;if(R.isRenderTargetTexture||R.isDepthTexture){const Pn=yt.get(R),vn=yt.get(Z),Un=yt.get(Pn.__renderTarget),Xn=yt.get(vn.__renderTarget);at.bindFramebuffer(k.READ_FRAMEBUFFER,Un.__webglFramebuffer),at.bindFramebuffer(k.DRAW_FRAMEBUFFER,Xn.__webglFramebuffer);for(let Dn=0;Dn<Nt;Dn++)Hi&&k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,yt.get(R).__webglTexture,Y,jt+Dn),R.isDepthTexture?(ye&&k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,yt.get(Z).__webglTexture,Y,me+Dn),k.blitFramebuffer(Bt,Yt,Tt,ut,zt,se,Tt,ut,k.DEPTH_BUFFER_BIT,k.NEAREST)):ye?k.copyTexSubImage3D(Gt,Y,zt,se,me+Dn,Bt,Yt,Tt,ut):k.copyTexSubImage2D(Gt,Y,zt,se,me+Dn,Bt,Yt,Tt,ut);at.bindFramebuffer(k.READ_FRAMEBUFFER,null),at.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else ye?R.isDataTexture||R.isData3DTexture?k.texSubImage3D(Gt,Y,zt,se,me,Tt,ut,Nt,an,ae,ve.data):Z.isCompressedArrayTexture?k.compressedTexSubImage3D(Gt,Y,zt,se,me,Tt,ut,Nt,an,ve.data):k.texSubImage3D(Gt,Y,zt,se,me,Tt,ut,Nt,an,ae,ve):R.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,Y,zt,se,Tt,ut,an,ae,ve.data):R.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,Y,zt,se,ve.width,ve.height,an,ve.data):k.texSubImage2D(k.TEXTURE_2D,Y,zt,se,Tt,ut,an,ae,ve);k.pixelStorei(k.UNPACK_ROW_LENGTH,$n),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,ue),k.pixelStorei(k.UNPACK_SKIP_PIXELS,cn),k.pixelStorei(k.UNPACK_SKIP_ROWS,Pi),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Xe),Y===0&&Z.generateMipmaps&&k.generateMipmap(Gt),at.unbindTexture()},this.copyTextureToTexture3D=function(R,Z,st=null,rt=null,Y=0){return R.isTexture!==!0&&(na("WebGLRenderer: copyTextureToTexture3D function signature has changed."),st=arguments[0]||null,rt=arguments[1]||null,R=arguments[2],Z=arguments[3],Y=arguments[4]||0),na('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,Z,st,rt,Y)},this.initRenderTarget=function(R){yt.get(R).__webglFramebuffer===void 0&&A.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?A.setTextureCube(R,0):R.isData3DTexture?A.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?A.setTexture2DArray(R,0):A.setTexture2D(R,0),at.unbindTexture()},this.resetState=function(){b=0,w=0,C=null,at.reset(),Qt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorspace=he._getDrawingBufferColorSpace(t),n.unpackColorSpace=he._getUnpackColorSpace()}}class TE extends mn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ni,this.environmentIntensity=1,this.environmentRotation=new ni,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class AE{constructor(t,n){this.isInterleavedBuffer=!0,this.array=t,this.stride=n,this.count=t!==void 0?t.length/n:0,this.usage=zf,this.updateRanges=[],this.version=0,this.uuid=tr()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,n,i){t*=this.stride,i*=n.stride;for(let r=0,s=this.stride;r<s;r++)this.array[t+r]=n.array[i+r];return this}set(t,n=0){return this.array.set(t,n),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=tr()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const n=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=tr()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const En=new j;class br{constructor(t,n,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=n,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let n=0,i=this.data.count;n<i;n++)En.fromBufferAttribute(this,n),En.applyMatrix4(t),this.setXYZ(n,En.x,En.y,En.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)En.fromBufferAttribute(this,n),En.applyNormalMatrix(t),this.setXYZ(n,En.x,En.y,En.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)En.fromBufferAttribute(this,n),En.transformDirection(t),this.setXYZ(n,En.x,En.y,En.z);return this}getComponent(t,n){let i=this.array[t*this.data.stride+this.offset+n];return this.normalized&&(i=Ti(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=xe(i,this.array)),this.data.array[t*this.data.stride+this.offset+n]=i,this}setX(t,n){return this.normalized&&(n=xe(n,this.array)),this.data.array[t*this.data.stride+this.offset]=n,this}setY(t,n){return this.normalized&&(n=xe(n,this.array)),this.data.array[t*this.data.stride+this.offset+1]=n,this}setZ(t,n){return this.normalized&&(n=xe(n,this.array)),this.data.array[t*this.data.stride+this.offset+2]=n,this}setW(t,n){return this.normalized&&(n=xe(n,this.array)),this.data.array[t*this.data.stride+this.offset+3]=n,this}getX(t){let n=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(n=Ti(n,this.array)),n}getY(t){let n=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(n=Ti(n,this.array)),n}getZ(t){let n=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(n=Ti(n,this.array)),n}getW(t){let n=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(n=Ti(n,this.array)),n}setXY(t,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(n=xe(n,this.array),i=xe(i,this.array)),this.data.array[t+0]=n,this.data.array[t+1]=i,this}setXYZ(t,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(n=xe(n,this.array),i=xe(i,this.array),r=xe(r,this.array)),this.data.array[t+0]=n,this.data.array[t+1]=i,this.data.array[t+2]=r,this}setXYZW(t,n,i,r,s){return t=t*this.data.stride+this.offset,this.normalized&&(n=xe(n,this.array),i=xe(i,this.array),r=xe(r,this.array),s=xe(s,this.array)),this.data.array[t+0]=n,this.data.array[t+1]=i,this.data.array[t+2]=r,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return new pi(new this.array.constructor(n),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new br(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:n,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class CE extends Mn{constructor(t=null,n=1,i=1,r,s,o,a,c,l=Qn,u=Qn,f,h){super(null,o,a,c,l,u,r,s,f,h),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Gf extends pi{constructor(t,n,i,r=1){super(t,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Xs=new le,Ip=new le,Sc=[],Lp=new gi,RE=new le,jo=new An,qo=new zr;class PE extends An{constructor(t,n,i){super(t,n),this.isInstancedMesh=!0,this.instanceMatrix=new Gf(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,RE)}computeBoundingBox(){const t=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new gi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Xs),Lp.copy(t.boundingBox).applyMatrix4(Xs),this.boundingBox.union(Lp)}computeBoundingSphere(){const t=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new zr),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Xs),qo.copy(t.boundingSphere).applyMatrix4(Xs),this.boundingSphere.union(qo)}copy(t,n){return super.copy(t,n),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,n){n.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,n){n.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,n){const i=n.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,o=t*s+1;for(let a=0;a<i.length;a++)i[a]=r[o+a]}raycast(t,n){const i=this.matrixWorld,r=this.count;if(jo.geometry=this.geometry,jo.material=this.material,jo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qo.copy(this.boundingSphere),qo.applyMatrix4(i),t.ray.intersectsSphere(qo)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Xs),Ip.multiplyMatrices(i,Xs),jo.matrixWorld=Ip,jo.raycast(t,Sc);for(let o=0,a=Sc.length;o<a;o++){const c=Sc[o];c.instanceId=s,c.object=this,n.push(c)}Sc.length=0}}setColorAt(t,n){this.instanceColor===null&&(this.instanceColor=new Gf(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,n){n.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,n){const i=n.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new CE(new Float32Array(r*this.count),r,this.count,Rh,Oi));const s=this.morphTexture.source.data.data;let o=0;for(let l=0;l<i.length;l++)o+=i[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=r*t;s[c]=a,s.set(i,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Nh extends Vi{constructor(t=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const u=[],f=new j,h=new j,d=[],m=[],_=[],g=[];for(let p=0;p<=i;p++){const y=[],x=p/i;let v=0;p===0&&o===0?v=.5/n:p===i&&c===Math.PI&&(v=-.5/n);for(let T=0;T<=n;T++){const b=T/n;f.x=-t*Math.cos(r+b*s)*Math.sin(o+x*a),f.y=t*Math.cos(o+x*a),f.z=t*Math.sin(r+b*s)*Math.sin(o+x*a),m.push(f.x,f.y,f.z),h.copy(f).normalize(),_.push(h.x,h.y,h.z),g.push(b+v,1-x),y.push(l++)}u.push(y)}for(let p=0;p<i;p++)for(let y=0;y<n;y++){const x=u[p][y+1],v=u[p][y],T=u[p+1][y],b=u[p+1][y+1];(p!==0||o>0)&&d.push(x,v,b),(p!==i-1||c<Math.PI)&&d.push(v,T,b)}this.setIndex(d),this.setAttribute("position",new ti(m,3)),this.setAttribute("normal",new ti(_,3)),this.setAttribute("uv",new ti(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Nh(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class UE extends Vi{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const n=[],i=new Set,r=new j,s=new j;if(t.index!==null){const o=t.attributes.position,a=t.index;let c=t.groups;c.length===0&&(c=[{start:0,count:a.count,materialIndex:0}]);for(let l=0,u=c.length;l<u;++l){const f=c[l],h=f.start,d=f.count;for(let m=h,_=h+d;m<_;m+=3)for(let g=0;g<3;g++){const p=a.getX(m+g),y=a.getX(m+(g+1)%3);r.fromBufferAttribute(o,p),s.fromBufferAttribute(o,y),Fp(r,s,i)===!0&&(n.push(r.x,r.y,r.z),n.push(s.x,s.y,s.z))}}}else{const o=t.attributes.position;for(let a=0,c=o.count/3;a<c;a++)for(let l=0;l<3;l++){const u=3*a+l,f=3*a+(l+1)%3;r.fromBufferAttribute(o,u),s.fromBufferAttribute(o,f),Fp(r,s,i)===!0&&(n.push(r.x,r.y,r.z),n.push(s.x,s.y,s.z))}}this.setAttribute("position",new ti(n,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function Fp(e,t,n){const i=`${e.x},${e.y},${e.z}-${t.x},${t.y},${t.z}`,r=`${t.x},${t.y},${t.z}-${e.x},${e.y},${e.z}`;return n.has(i)===!0||n.has(r)===!0?!1:(n.add(i),n.add(r),!0)}class DE extends ka{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new ie(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ng,this.normalScale=new oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class n_ extends mn{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new ie(t),this.intensity=n}dispose(){}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}class i_ extends n_{constructor(t,n,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(mn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ie(n)}copy(t,n){return super.copy(t,n),this.groundColor.copy(t.groundColor),this}}const bu=new le,Np=new j,Op=new j;class IE{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new oe(512,512),this.map=null,this.mapPass=null,this.matrix=new le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Lh,this._frameExtents=new oe(1,1),this._viewportCount=1,this._viewports=[new Se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const n=this.camera,i=this.matrix;Np.setFromMatrixPosition(t.matrixWorld),n.position.copy(Np),Op.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(Op),n.updateMatrixWorld(),bu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bu),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(bu)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class LE extends IE{constructor(){super(new za(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class r_ extends n_{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mn.DEFAULT_UP),this.updateMatrix(),this.target=new mn,this.shadow=new LE}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class s_ extends Vi{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class Vf extends AE{constructor(t,n,i=1){super(t,n),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const n=super.clone(t);return n.meshPerAttribute=this.meshPerAttribute,n}toJSON(t){const n=super.toJSON(t);return n.isInstancedInterleavedBuffer=!0,n.meshPerAttribute=this.meshPerAttribute,n}}class FE{constructor(t=1,n=0,i=0){return this.radius=t,this.phi=n,this.theta=i,this}set(t,n,i){return this.radius=t,this.phi=n,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,n,i){return this.radius=Math.sqrt(t*t+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(pn(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const kp=new j,Mc=new j;class NE{constructor(t=new j,n=new j){this.start=t,this.end=n}set(t,n){return this.start.copy(t),this.end.copy(n),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,n){return this.delta(n).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,n){kp.subVectors(t,this.start),Mc.subVectors(this.end,this.start);const i=Mc.dot(Mc);let s=Mc.dot(kp)/i;return n&&(s=pn(s,0,1)),s}closestPointToPoint(t,n,i){const r=this.closestPointToPointParameter(t,n);return this.delta(i).multiplyScalar(r).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wh);function Ea(e,t,n){return e+(t-e)*n}function Hf(e,t,n){const i=e*(Math.PI/180),r=t*(Math.PI/180),s=n*(Math.PI/180),o=new ni(i,r,s,"XYZ"),a=new mi().setFromEuler(o);return{x:a.x,y:a.y,z:a.z,w:a.w}}function o_(e,t,n,i){const r=new mi(e,t,n,i),s=new ni().setFromQuaternion(r,"XYZ");return{x:s.x*(180/Math.PI),y:s.y*(180/Math.PI),z:s.z*(180/Math.PI)}}function zp(e){return e.replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function OE(e){if(e=e.trim(),e.startsWith("0x"))return parseInt(e,16);if(e.startsWith("#"))return parseInt(e.slice(1),16);if(e==="true")return 1;if(e==="false")return 0;const t=parseFloat(e);return isNaN(t)?e:t}function Ko(e){return e.trim().split(/\s+/).map(OE)}function kE(e,t){const n=`${t}X`,i=`${t}Y`,r=`${t}Z`;return n in e&&i in e&&r in e}function zE(e,t){const n=`${t}X`,i=`${t}Y`,r=`${t}Z`,s=`${t}W`;return n in e&&i in e&&r in e&&s in e}function Bp(e,t,n,i){const r=i.config.getEnums(e);if(r&&r[t]){const s=r[t],o=n.toLowerCase();if(o in s)return s[o];const a=Object.keys(s),c=Eh(e,t,n,a);throw new Error(c)}return null}function BE(e,t,n,i,r,s){const o={},a=t.split(";").map(c=>c.trim()).filter(c=>c.length>0);for(const c of a){const l=c.indexOf(":");if(l===-1){const p=Ld(e,c,'"property: value"',"missing colon after property name");throw new Error(p)}const u=c.slice(0,l).trim(),f=c.slice(l+1).trim(),h=i.config.getAdapter(e,u);if(h){s!==void 0&&h(s,f,i);continue}if(i.config.shouldSkip(e,u))continue;if(!u||!f){const p=Ld(e,c,'"property: value"',u?"value is empty":"property name is empty");throw new Error(p)}const d=zp(u);if((d==="euler"||d==="rotation")&&"eulerX"in n){const p=Ko(f);if(p.length===1){const x=Number(p[0])||0;o.eulerX=x,o.eulerY=x,o.eulerZ=x}else if(p.length===3)o.eulerX=Number(p[0])||0,o.eulerY=Number(p[1])||0,o.eulerZ=Number(p[2])||0;else{const x=Wo(e,u,"1 (broadcast) or 3 (x, y, z degrees)",p.length);throw new Error(x)}const y=Hf(o.eulerX||0,o.eulerY||0,o.eulerZ||0);o.rotX=y.x,o.rotY=y.y,o.rotZ=y.z,o.rotW=y.w;continue}if(d==="rot"&&zE(n,"rot")){console.warn(`[${e}.rot] Direct quaternion values are deprecated. Use 'euler' or 'rotation' for Euler angles in degrees instead.`);const p=Ko(f);if(p.length===3){const y=Hf(Number(p[0])||0,Number(p[1])||0,Number(p[2])||0);o.rotX=y.x,o.rotY=y.y,o.rotZ=y.z,o.rotW=y.w,o.eulerX=Number(p[0])||0,o.eulerY=Number(p[1])||0,o.eulerZ=Number(p[2])||0}else if(p.length===4){o.rotX=Number(p[0])||0,o.rotY=Number(p[1])||0,o.rotZ=Number(p[2])||0,o.rotW=Number(p[3])||1;const y=o_(o.rotX,o.rotY,o.rotZ,o.rotW);o.eulerX=y.x,o.eulerY=y.y,o.eulerZ=y.z}else{const y=Wo(e,u,"3 (Euler angles) or 4 (quaternion)",p.length);throw new Error(y)}continue}if(kE(n,d)){const p=Ko(f);if(p.length===1){const y=Number(p[0])||0;o[`${d}X`]=y,o[`${d}Y`]=y,o[`${d}Z`]=y}else if(p.length===3)o[`${d}X`]=Number(p[0])||0,o[`${d}Y`]=Number(p[1])||0,o[`${d}Z`]=Number(p[2])||0;else{const y=Wo(e,u,"1 (broadcast) or 3 (x, y, z)",p.length);throw new Error(y)}continue}if(d in n){const p=Ko(f);if(p.length!==1){const x=Wo(e,u,"1",p.length);throw new Error(x)}const y=p[0];if(typeof y=="string"){const x=Bp(e,d,y,i);if(x!==null)o[d]=x;else if(r){const v=r.getEntityByName(y);if(v!==null)o[d]=v;else{const T=Ja(e,u,"number or entity name",`string "${y}"`);throw new Error(T)}}else{const v=Ja(e,u,"number",`string "${y}"`);throw new Error(v)}}else o[d]=y;continue}const m=zp(u);if(m in n){const p=Ko(f);if(p.length!==1){const x=Wo(e,u,"1",p.length);throw new Error(x)}const y=p[0];if(typeof y=="string"){const x=Bp(e,m,y,i);if(x!==null)o[m]=x;else if(r){const v=r.getEntityByName(y);if(v!==null)o[m]=v;else{const T=Ja(e,u,"number or entity name",`string "${y}"`);throw new Error(T)}}else{const v=Ja(e,u,"number",`string "${y}"`);throw new Error(v)}}else o[m]=y;continue}const _=fy(n),g=uy(e,u,"Property not found",_);throw new Error(g)}return o}function GE(e,t,n){const i={},r={},s=new Set;if(t.components)for(const o of t.components)s.add(o);for(const o of Object.keys(e))n.getComponent(o)&&s.add(o);for(const[o,a]of Object.entries(e)){const c=VE(a);let l=!1;for(const u of s){const f=n.getComponent(u);if(!f)continue;const h=n.config.getShorthands(u);if(h[o]){const d=h[o];typeof d=="string"&&Gp(u,d,c,f,r)&&(l=!0)}else Gp(u,o,c,f,r)&&(l=!0)}l||(i[o]=a)}for(const[o,a]of Object.entries(r)){const c=Object.entries(a).map(([l,u])=>`${l}: ${u}`).join("; ");if(o in i){const l=i[o];typeof l=="string"&&l.trim()?i[o]=`${c}; ${l}`:i[o]=c}else i[o]=c}return i}function VE(e){if(typeof e=="string")return e;if(typeof e=="object"&&e!==null&&"x"in e){const t=e;return"w"in t?`${t.x} ${t.y} ${t.z} ${t.w}`:"z"in t?`${t.x} ${t.y} ${t.z}`:`${t.x} ${t.y}`}else return String(e)}function Gp(e,t,n,i,r){const s=t.replace(/-([a-z])/g,(u,f)=>f.toUpperCase()),o=`${s}X`in i,a=`${s}Y`in i,c=`${s}Z`in i,l=`${s}W`in i;if(o&&a&&c){r[e]||(r[e]={});const u=n.trim().split(/\s+/);if(l&&u.length===4)return r[e][`${t}-x`]=u[0],r[e][`${t}-y`]=u[1],r[e][`${t}-z`]=u[2],r[e][`${t}-w`]=u[3],!0;if(u.length===3||u.length===1){const f=HE(n);return r[e][`${t}-x`]=String(f[0]),r[e][`${t}-y`]=String(f[1]),r[e][`${t}-z`]=String(f[2]),!0}}else if(s in i)return r[e]||(r[e]={}),r[e][t]=n,!0;return!1}function HE(e){const t=e.trim().split(/\s+/).map(n=>parseFloat(n)||0);if(t.length===1)return[t[0],t[0],t[0]];if(t.length===3)return t;throw new Error(`Invalid vector3 value: "${e}". Expected 1 or 3 numbers.`)}function mt(e,t,n){function i(a,c){var l;Object.defineProperty(a,"_zod",{value:a._zod??{},enumerable:!1}),(l=a._zod).traits??(l.traits=new Set),a._zod.traits.add(e),t(a,c);for(const u in o.prototype)u in a||Object.defineProperty(a,u,{value:o.prototype[u].bind(a)});a._zod.constr=o,a._zod.def=c}const r=n?.Parent??Object;class s extends r{}Object.defineProperty(s,"name",{value:e});function o(a){var c;const l=n?.Parent?new s:this;i(l,a),(c=l._zod).deferred??(c.deferred=[]);for(const u of l._zod.deferred)u();return l}return Object.defineProperty(o,"init",{value:i}),Object.defineProperty(o,Symbol.hasInstance,{value:a=>n?.Parent&&a instanceof n.Parent?!0:a?._zod?.traits?.has(e)}),Object.defineProperty(o,"name",{value:e}),o}let ro=class extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}},a_=class extends Error{constructor(t){super(`Encountered unidirectional transform during encode: ${t}`),this.name="ZodEncodeError"}};const c_={};function ys(e){return c_}function WE(e){const t=Object.values(e).filter(n=>typeof n=="number");return Object.entries(e).filter(([n,i])=>t.indexOf(+n)===-1).map(([n,i])=>i)}function Wf(e,t){return typeof t=="bigint"?t.toString():t}function Oh(e){return{get value(){{const t=e();return Object.defineProperty(this,"value",{value:t}),t}}}}function kh(e){return e==null}function zh(e){const t=e.startsWith("^")?1:0,n=e.endsWith("$")?e.length-1:e.length;return e.slice(t,n)}function $E(e,t){const n=(e.toString().split(".")[1]||"").length,i=t.toString();let r=(i.split(".")[1]||"").length;if(r===0&&/\d?e-\d?/.test(i)){const c=i.match(/\d?e-(\d?)/);c?.[1]&&(r=Number.parseInt(c[1]))}const s=n>r?n:r,o=Number.parseInt(e.toFixed(s).replace(".","")),a=Number.parseInt(t.toFixed(s).replace(".",""));return o%a/10**s}const Vp=Symbol("evaluating");function Pe(e,t,n){let i;Object.defineProperty(e,t,{get(){if(i!==Vp)return i===void 0&&(i=Vp,i=n()),i},set(r){Object.defineProperty(e,t,{value:r})},configurable:!0})}function ws(e,t,n){Object.defineProperty(e,t,{value:n,writable:!0,enumerable:!0,configurable:!0})}function Ts(...e){const t={};for(const n of e){const i=Object.getOwnPropertyDescriptors(n);Object.assign(t,i)}return Object.defineProperties({},t)}function Hp(e){return JSON.stringify(e)}const l_="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function el(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}const XE=Oh(()=>{if(typeof navigator<"u"&&navigator?.userAgent?.includes("Cloudflare"))return!1;try{const e=Function;return new e(""),!0}catch{return!1}});function wa(e){if(el(e)===!1)return!1;const t=e.constructor;if(t===void 0)return!0;const n=t.prototype;return!(el(n)===!1||Object.prototype.hasOwnProperty.call(n,"isPrototypeOf")===!1)}function u_(e){return wa(e)?{...e}:Array.isArray(e)?[...e]:e}const YE=new Set(["string","number","symbol"]);function vo(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Br(e,t,n){const i=new e._zod.constr(t??e._zod.def);return(!t||n?.parent)&&(i._zod.parent=e),i}function $t(e){const t=e;if(!t)return{};if(typeof t=="string")return{error:()=>t};if(t?.message!==void 0){if(t?.error!==void 0)throw new Error("Cannot specify both `message` and `error` params");t.error=t.message}return delete t.message,typeof t.error=="string"?{...t,error:()=>t.error}:t}function ZE(e){return Object.keys(e).filter(t=>e[t]._zod.optin==="optional"&&e[t]._zod.optout==="optional")}const jE={safeint:[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-34028234663852886e22,34028234663852886e22],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]};function qE(e,t){const n=e._zod.def,i=Ts(e._zod.def,{get shape(){const r={};for(const s in t){if(!(s in n.shape))throw new Error(`Unrecognized key: "${s}"`);t[s]&&(r[s]=n.shape[s])}return ws(this,"shape",r),r},checks:[]});return Br(e,i)}function KE(e,t){const n=e._zod.def,i=Ts(e._zod.def,{get shape(){const r={...e._zod.def.shape};for(const s in t){if(!(s in n.shape))throw new Error(`Unrecognized key: "${s}"`);t[s]&&delete r[s]}return ws(this,"shape",r),r},checks:[]});return Br(e,i)}function JE(e,t){if(!wa(t))throw new Error("Invalid input to extend: expected a plain object");const n=e._zod.def.checks;if(n&&n.length>0)throw new Error("Object schemas containing refinements cannot be extended. Use `.safeExtend()` instead.");const i=Ts(e._zod.def,{get shape(){const r={...e._zod.def.shape,...t};return ws(this,"shape",r),r},checks:[]});return Br(e,i)}function QE(e,t){if(!wa(t))throw new Error("Invalid input to safeExtend: expected a plain object");const n={...e._zod.def,get shape(){const i={...e._zod.def.shape,...t};return ws(this,"shape",i),i},checks:e._zod.def.checks};return Br(e,n)}function tw(e,t){const n=Ts(e._zod.def,{get shape(){const i={...e._zod.def.shape,...t._zod.def.shape};return ws(this,"shape",i),i},get catchall(){return t._zod.def.catchall},checks:[]});return Br(e,n)}function ew(e,t,n){const i=Ts(t._zod.def,{get shape(){const r=t._zod.def.shape,s={...r};if(n)for(const o in n){if(!(o in r))throw new Error(`Unrecognized key: "${o}"`);n[o]&&(s[o]=e?new e({type:"optional",innerType:r[o]}):r[o])}else for(const o in r)s[o]=e?new e({type:"optional",innerType:r[o]}):r[o];return ws(this,"shape",s),s},checks:[]});return Br(t,i)}function nw(e,t,n){const i=Ts(t._zod.def,{get shape(){const r=t._zod.def.shape,s={...r};if(n)for(const o in n){if(!(o in s))throw new Error(`Unrecognized key: "${o}"`);n[o]&&(s[o]=new e({type:"nonoptional",innerType:r[o]}))}else for(const o in r)s[o]=new e({type:"nonoptional",innerType:r[o]});return ws(this,"shape",s),s},checks:[]});return Br(t,i)}function Js(e,t=0){if(e.aborted===!0)return!0;for(let n=t;n<e.issues.length;n++)if(e.issues[n]?.continue!==!0)return!0;return!1}function f_(e,t){return t.map(n=>{var i;return(i=n).path??(i.path=[]),n.path.unshift(e),n})}function bc(e){return typeof e=="string"?e:e?.message}function xs(e,t,n){const i={...e,path:e.path??[]};if(!e.message){const r=bc(e.inst?._zod.def?.error?.(e))??bc(t?.error?.(e))??bc(n.customError?.(e))??bc(n.localeError?.(e))??"Invalid input";i.message=r}return delete i.inst,delete i.continue,t?.reportInput||delete i.input,i}function Bh(e){return Array.isArray(e)?"array":typeof e=="string"?"string":"unknown"}function Ta(...e){const[t,n,i]=e;return typeof t=="string"?{message:t,code:"custom",input:n,inst:i}:{...t}}const iw=/^[cC][^\s-]{8,}$/,rw=/^[0-9a-z]+$/,sw=/^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,ow=/^[0-9a-vA-V]{20}$/,aw=/^[A-Za-z0-9]{27}$/,cw=/^[a-zA-Z0-9_-]{21}$/,lw=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,uw=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,Wp=e=>e?new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`):/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,fw=/^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,hw="^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";function dw(){return new RegExp(hw,"u")}const pw=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,mw=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,gw=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,_w=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,vw=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,h_=/^[A-Za-z0-9_-]*$/,yw=/^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/,xw=/^\+(?:[0-9]){6,14}[0-9]$/,d_="(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",Sw=new RegExp(`^${d_}$`);function p_(e){const t="(?:[01]\\d|2[0-3]):[0-5]\\d";return typeof e.precision=="number"?e.precision===-1?`${t}`:e.precision===0?`${t}:[0-5]\\d`:`${t}:[0-5]\\d\\.\\d{${e.precision}}`:`${t}(?::[0-5]\\d(?:\\.\\d+)?)?`}function Mw(e){return new RegExp(`^${p_(e)}$`)}function bw(e){const t=p_({precision:e.precision}),n=["Z"];e.local&&n.push(""),e.offset&&n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");const i=`${t}(?:${n.join("|")})`;return new RegExp(`^${d_}T(?:${i})$`)}const Ew=e=>{const t=e?`[\\s\\S]{${e?.minimum??0},${e?.maximum??""}}`:"[\\s\\S]*";return new RegExp(`^${t}$`)},ww=/^-?\d+$/,Tw=/^-?\d+(?:\.\d+)?/,Aw=/^(?:true|false)$/i,Cw=/^[^A-Z]*$/,Rw=/^[^a-z]*$/,Hn=mt("$ZodCheck",(e,t)=>{var n;e._zod??(e._zod={}),e._zod.def=t,(n=e._zod).onattach??(n.onattach=[])}),m_={number:"number",bigint:"bigint",object:"date"},g_=mt("$ZodCheckLessThan",(e,t)=>{Hn.init(e,t);const n=m_[typeof t.value];e._zod.onattach.push(i=>{const r=i._zod.bag,s=(t.inclusive?r.maximum:r.exclusiveMaximum)??Number.POSITIVE_INFINITY;t.value<s&&(t.inclusive?r.maximum=t.value:r.exclusiveMaximum=t.value)}),e._zod.check=i=>{(t.inclusive?i.value<=t.value:i.value<t.value)||i.issues.push({origin:n,code:"too_big",maximum:t.value,input:i.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),__=mt("$ZodCheckGreaterThan",(e,t)=>{Hn.init(e,t);const n=m_[typeof t.value];e._zod.onattach.push(i=>{const r=i._zod.bag,s=(t.inclusive?r.minimum:r.exclusiveMinimum)??Number.NEGATIVE_INFINITY;t.value>s&&(t.inclusive?r.minimum=t.value:r.exclusiveMinimum=t.value)}),e._zod.check=i=>{(t.inclusive?i.value>=t.value:i.value>t.value)||i.issues.push({origin:n,code:"too_small",minimum:t.value,input:i.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),Pw=mt("$ZodCheckMultipleOf",(e,t)=>{Hn.init(e,t),e._zod.onattach.push(n=>{var i;(i=n._zod.bag).multipleOf??(i.multipleOf=t.value)}),e._zod.check=n=>{if(typeof n.value!=typeof t.value)throw new Error("Cannot mix number and bigint in multiple_of check.");(typeof n.value=="bigint"?n.value%t.value===BigInt(0):$E(n.value,t.value)===0)||n.issues.push({origin:typeof n.value,code:"not_multiple_of",divisor:t.value,input:n.value,inst:e,continue:!t.abort})}}),Uw=mt("$ZodCheckNumberFormat",(e,t)=>{Hn.init(e,t),t.format=t.format||"float64";const n=t.format?.includes("int"),i=n?"int":"number",[r,s]=jE[t.format];e._zod.onattach.push(o=>{const a=o._zod.bag;a.format=t.format,a.minimum=r,a.maximum=s,n&&(a.pattern=ww)}),e._zod.check=o=>{const a=o.value;if(n){if(!Number.isInteger(a)){o.issues.push({expected:i,format:t.format,code:"invalid_type",continue:!1,input:a,inst:e});return}if(!Number.isSafeInteger(a)){a>0?o.issues.push({input:a,code:"too_big",maximum:Number.MAX_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:i,continue:!t.abort}):o.issues.push({input:a,code:"too_small",minimum:Number.MIN_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:i,continue:!t.abort});return}}a<r&&o.issues.push({origin:"number",input:a,code:"too_small",minimum:r,inclusive:!0,inst:e,continue:!t.abort}),a>s&&o.issues.push({origin:"number",input:a,code:"too_big",maximum:s,inst:e})}}),Dw=mt("$ZodCheckMaxLength",(e,t)=>{var n;Hn.init(e,t),(n=e._zod.def).when??(n.when=i=>{const r=i.value;return!kh(r)&&r.length!==void 0}),e._zod.onattach.push(i=>{const r=i._zod.bag.maximum??Number.POSITIVE_INFINITY;t.maximum<r&&(i._zod.bag.maximum=t.maximum)}),e._zod.check=i=>{const r=i.value;if(r.length<=t.maximum)return;const s=Bh(r);i.issues.push({origin:s,code:"too_big",maximum:t.maximum,inclusive:!0,input:r,inst:e,continue:!t.abort})}}),Iw=mt("$ZodCheckMinLength",(e,t)=>{var n;Hn.init(e,t),(n=e._zod.def).when??(n.when=i=>{const r=i.value;return!kh(r)&&r.length!==void 0}),e._zod.onattach.push(i=>{const r=i._zod.bag.minimum??Number.NEGATIVE_INFINITY;t.minimum>r&&(i._zod.bag.minimum=t.minimum)}),e._zod.check=i=>{const r=i.value;if(r.length>=t.minimum)return;const s=Bh(r);i.issues.push({origin:s,code:"too_small",minimum:t.minimum,inclusive:!0,input:r,inst:e,continue:!t.abort})}}),Lw=mt("$ZodCheckLengthEquals",(e,t)=>{var n;Hn.init(e,t),(n=e._zod.def).when??(n.when=i=>{const r=i.value;return!kh(r)&&r.length!==void 0}),e._zod.onattach.push(i=>{const r=i._zod.bag;r.minimum=t.length,r.maximum=t.length,r.length=t.length}),e._zod.check=i=>{const r=i.value,s=r.length;if(s===t.length)return;const o=Bh(r),a=s>t.length;i.issues.push({origin:o,...a?{code:"too_big",maximum:t.length}:{code:"too_small",minimum:t.length},inclusive:!0,exact:!0,input:i.value,inst:e,continue:!t.abort})}}),wl=mt("$ZodCheckStringFormat",(e,t)=>{var n,i;Hn.init(e,t),e._zod.onattach.push(r=>{const s=r._zod.bag;s.format=t.format,t.pattern&&(s.patterns??(s.patterns=new Set),s.patterns.add(t.pattern))}),t.pattern?(n=e._zod).check??(n.check=r=>{t.pattern.lastIndex=0,!t.pattern.test(r.value)&&r.issues.push({origin:"string",code:"invalid_format",format:t.format,input:r.value,...t.pattern?{pattern:t.pattern.toString()}:{},inst:e,continue:!t.abort})}):(i=e._zod).check??(i.check=()=>{})}),Fw=mt("$ZodCheckRegex",(e,t)=>{wl.init(e,t),e._zod.check=n=>{t.pattern.lastIndex=0,!t.pattern.test(n.value)&&n.issues.push({origin:"string",code:"invalid_format",format:"regex",input:n.value,pattern:t.pattern.toString(),inst:e,continue:!t.abort})}}),Nw=mt("$ZodCheckLowerCase",(e,t)=>{t.pattern??(t.pattern=Cw),wl.init(e,t)}),Ow=mt("$ZodCheckUpperCase",(e,t)=>{t.pattern??(t.pattern=Rw),wl.init(e,t)}),kw=mt("$ZodCheckIncludes",(e,t)=>{Hn.init(e,t);const n=vo(t.includes),i=new RegExp(typeof t.position=="number"?`^.{${t.position}}${n}`:n);t.pattern=i,e._zod.onattach.push(r=>{const s=r._zod.bag;s.patterns??(s.patterns=new Set),s.patterns.add(i)}),e._zod.check=r=>{r.value.includes(t.includes,t.position)||r.issues.push({origin:"string",code:"invalid_format",format:"includes",includes:t.includes,input:r.value,inst:e,continue:!t.abort})}}),zw=mt("$ZodCheckStartsWith",(e,t)=>{Hn.init(e,t);const n=new RegExp(`^${vo(t.prefix)}.*`);t.pattern??(t.pattern=n),e._zod.onattach.push(i=>{const r=i._zod.bag;r.patterns??(r.patterns=new Set),r.patterns.add(n)}),e._zod.check=i=>{i.value.startsWith(t.prefix)||i.issues.push({origin:"string",code:"invalid_format",format:"starts_with",prefix:t.prefix,input:i.value,inst:e,continue:!t.abort})}}),Bw=mt("$ZodCheckEndsWith",(e,t)=>{Hn.init(e,t);const n=new RegExp(`.*${vo(t.suffix)}$`);t.pattern??(t.pattern=n),e._zod.onattach.push(i=>{const r=i._zod.bag;r.patterns??(r.patterns=new Set),r.patterns.add(n)}),e._zod.check=i=>{i.value.endsWith(t.suffix)||i.issues.push({origin:"string",code:"invalid_format",format:"ends_with",suffix:t.suffix,input:i.value,inst:e,continue:!t.abort})}}),Gw=mt("$ZodCheckOverwrite",(e,t)=>{Hn.init(e,t),e._zod.check=n=>{n.value=t.tx(n.value)}});let Vw=class{constructor(t=[]){this.content=[],this.indent=0,this&&(this.args=t)}indented(t){this.indent+=1,t(this),this.indent-=1}write(t){if(typeof t=="function"){t(this,{execution:"sync"}),t(this,{execution:"async"});return}const n=t.split(`
`).filter(s=>s),i=Math.min(...n.map(s=>s.length-s.trimStart().length)),r=n.map(s=>s.slice(i)).map(s=>" ".repeat(this.indent*2)+s);for(const s of r)this.content.push(s)}compile(){const t=Function,n=this?.args,i=[...(this?.content??[""]).map(r=>`  ${r}`)];return new t(...n,i.join(`
`))}};const v_=(e,t)=>{e.name="$ZodError",Object.defineProperty(e,"_zod",{value:e._zod,enumerable:!1}),Object.defineProperty(e,"issues",{value:t,enumerable:!1}),e.message=JSON.stringify(t,Wf,2),Object.defineProperty(e,"toString",{value:()=>e.message,enumerable:!1})},y_=mt("$ZodError",v_),x_=mt("$ZodError",v_,{Parent:Error});function Hw(e,t=n=>n.message){const n={},i=[];for(const r of e.issues)r.path.length>0?(n[r.path[0]]=n[r.path[0]]||[],n[r.path[0]].push(t(r))):i.push(t(r));return{formErrors:i,fieldErrors:n}}function Ww(e,t=n=>n.message){const n={_errors:[]},i=r=>{for(const s of r.issues)if(s.code==="invalid_union"&&s.errors.length)s.errors.map(o=>i({issues:o}));else if(s.code==="invalid_key")i({issues:s.issues});else if(s.code==="invalid_element")i({issues:s.issues});else if(s.path.length===0)n._errors.push(t(s));else{let o=n,a=0;for(;a<s.path.length;){const c=s.path[a];a===s.path.length-1?(o[c]=o[c]||{_errors:[]},o[c]._errors.push(t(s))):o[c]=o[c]||{_errors:[]},o=o[c],a++}}};return i(e),n}const Gh=e=>(t,n,i,r)=>{const s=i?Object.assign(i,{async:!1}):{async:!1},o=t._zod.run({value:n,issues:[]},s);if(o instanceof Promise)throw new ro;if(o.issues.length){const a=new(r?.Err??e)(o.issues.map(c=>xs(c,s,ys())));throw l_(a,r?.callee),a}return o.value},Vh=e=>async(t,n,i,r)=>{const s=i?Object.assign(i,{async:!0}):{async:!0};let o=t._zod.run({value:n,issues:[]},s);if(o instanceof Promise&&(o=await o),o.issues.length){const a=new(r?.Err??e)(o.issues.map(c=>xs(c,s,ys())));throw l_(a,r?.callee),a}return o.value},Tl=e=>(t,n,i)=>{const r=i?{...i,async:!1}:{async:!1},s=t._zod.run({value:n,issues:[]},r);if(s instanceof Promise)throw new ro;return s.issues.length?{success:!1,error:new(e??y_)(s.issues.map(o=>xs(o,r,ys())))}:{success:!0,data:s.value}},$w=Tl(x_),Al=e=>async(t,n,i)=>{const r=i?Object.assign(i,{async:!0}):{async:!0};let s=t._zod.run({value:n,issues:[]},r);return s instanceof Promise&&(s=await s),s.issues.length?{success:!1,error:new e(s.issues.map(o=>xs(o,r,ys())))}:{success:!0,data:s.value}},Xw=Al(x_),Yw=e=>(t,n,i)=>{const r=i?Object.assign(i,{direction:"backward"}):{direction:"backward"};return Gh(e)(t,n,r)},Zw=e=>(t,n,i)=>Gh(e)(t,n,i),jw=e=>async(t,n,i)=>{const r=i?Object.assign(i,{direction:"backward"}):{direction:"backward"};return Vh(e)(t,n,r)},qw=e=>async(t,n,i)=>Vh(e)(t,n,i),Kw=e=>(t,n,i)=>{const r=i?Object.assign(i,{direction:"backward"}):{direction:"backward"};return Tl(e)(t,n,r)},Jw=e=>(t,n,i)=>Tl(e)(t,n,i),Qw=e=>async(t,n,i)=>{const r=i?Object.assign(i,{direction:"backward"}):{direction:"backward"};return Al(e)(t,n,r)},tT=e=>async(t,n,i)=>Al(e)(t,n,i),eT={major:4,minor:1,patch:12},Ve=mt("$ZodType",(e,t)=>{var n;e??(e={}),e._zod.def=t,e._zod.bag=e._zod.bag||{},e._zod.version=eT;const i=[...e._zod.def.checks??[]];e._zod.traits.has("$ZodCheck")&&i.unshift(e);for(const r of i)for(const s of r._zod.onattach)s(e);if(i.length===0)(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{const r=(o,a,c)=>{let l=Js(o),u;for(const f of a){if(f._zod.def.when){if(!f._zod.def.when(o))continue}else if(l)continue;const h=o.issues.length,d=f._zod.check(o);if(d instanceof Promise&&c?.async===!1)throw new ro;if(u||d instanceof Promise)u=(u??Promise.resolve()).then(async()=>{await d,o.issues.length!==h&&(l||(l=Js(o,h)))});else{if(o.issues.length===h)continue;l||(l=Js(o,h))}}return u?u.then(()=>o):o},s=(o,a,c)=>{if(Js(o))return o.aborted=!0,o;const l=r(a,i,c);if(l instanceof Promise){if(c.async===!1)throw new ro;return l.then(u=>e._zod.parse(u,c))}return e._zod.parse(l,c)};e._zod.run=(o,a)=>{if(a.skipChecks)return e._zod.parse(o,a);if(a.direction==="backward"){const l=e._zod.parse({value:o.value,issues:[]},{...a,skipChecks:!0});return l instanceof Promise?l.then(u=>s(u,o,a)):s(l,o,a)}const c=e._zod.parse(o,a);if(c instanceof Promise){if(a.async===!1)throw new ro;return c.then(l=>r(l,i,a))}return r(c,i,a)}}e["~standard"]={validate:r=>{try{const s=$w(e,r);return s.success?{value:s.data}:{issues:s.error?.issues}}catch{return Xw(e,r).then(s=>s.success?{value:s.data}:{issues:s.error?.issues})}},vendor:"zod",version:1}}),Hh=mt("$ZodString",(e,t)=>{Ve.init(e,t),e._zod.pattern=[...e?._zod.bag?.patterns??[]].pop()??Ew(e._zod.bag),e._zod.parse=(n,i)=>{if(t.coerce)try{n.value=String(n.value)}catch{}return typeof n.value=="string"||n.issues.push({expected:"string",code:"invalid_type",input:n.value,inst:e}),n}}),Ne=mt("$ZodStringFormat",(e,t)=>{wl.init(e,t),Hh.init(e,t)}),nT=mt("$ZodGUID",(e,t)=>{t.pattern??(t.pattern=uw),Ne.init(e,t)}),iT=mt("$ZodUUID",(e,t)=>{if(t.version){const n={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[t.version];if(n===void 0)throw new Error(`Invalid UUID version: "${t.version}"`);t.pattern??(t.pattern=Wp(n))}else t.pattern??(t.pattern=Wp());Ne.init(e,t)}),rT=mt("$ZodEmail",(e,t)=>{t.pattern??(t.pattern=fw),Ne.init(e,t)}),sT=mt("$ZodURL",(e,t)=>{Ne.init(e,t),e._zod.check=n=>{try{const i=n.value.trim(),r=new URL(i);t.hostname&&(t.hostname.lastIndex=0,t.hostname.test(r.hostname)||n.issues.push({code:"invalid_format",format:"url",note:"Invalid hostname",pattern:yw.source,input:n.value,inst:e,continue:!t.abort})),t.protocol&&(t.protocol.lastIndex=0,t.protocol.test(r.protocol.endsWith(":")?r.protocol.slice(0,-1):r.protocol)||n.issues.push({code:"invalid_format",format:"url",note:"Invalid protocol",pattern:t.protocol.source,input:n.value,inst:e,continue:!t.abort})),t.normalize?n.value=r.href:n.value=i;return}catch{n.issues.push({code:"invalid_format",format:"url",input:n.value,inst:e,continue:!t.abort})}}}),oT=mt("$ZodEmoji",(e,t)=>{t.pattern??(t.pattern=dw()),Ne.init(e,t)}),aT=mt("$ZodNanoID",(e,t)=>{t.pattern??(t.pattern=cw),Ne.init(e,t)}),cT=mt("$ZodCUID",(e,t)=>{t.pattern??(t.pattern=iw),Ne.init(e,t)}),lT=mt("$ZodCUID2",(e,t)=>{t.pattern??(t.pattern=rw),Ne.init(e,t)}),uT=mt("$ZodULID",(e,t)=>{t.pattern??(t.pattern=sw),Ne.init(e,t)}),fT=mt("$ZodXID",(e,t)=>{t.pattern??(t.pattern=ow),Ne.init(e,t)}),hT=mt("$ZodKSUID",(e,t)=>{t.pattern??(t.pattern=aw),Ne.init(e,t)}),dT=mt("$ZodISODateTime",(e,t)=>{t.pattern??(t.pattern=bw(t)),Ne.init(e,t)}),pT=mt("$ZodISODate",(e,t)=>{t.pattern??(t.pattern=Sw),Ne.init(e,t)}),mT=mt("$ZodISOTime",(e,t)=>{t.pattern??(t.pattern=Mw(t)),Ne.init(e,t)}),gT=mt("$ZodISODuration",(e,t)=>{t.pattern??(t.pattern=lw),Ne.init(e,t)}),_T=mt("$ZodIPv4",(e,t)=>{t.pattern??(t.pattern=pw),Ne.init(e,t),e._zod.onattach.push(n=>{const i=n._zod.bag;i.format="ipv4"})}),vT=mt("$ZodIPv6",(e,t)=>{t.pattern??(t.pattern=mw),Ne.init(e,t),e._zod.onattach.push(n=>{const i=n._zod.bag;i.format="ipv6"}),e._zod.check=n=>{try{new URL(`http://[${n.value}]`)}catch{n.issues.push({code:"invalid_format",format:"ipv6",input:n.value,inst:e,continue:!t.abort})}}}),yT=mt("$ZodCIDRv4",(e,t)=>{t.pattern??(t.pattern=gw),Ne.init(e,t)}),xT=mt("$ZodCIDRv6",(e,t)=>{t.pattern??(t.pattern=_w),Ne.init(e,t),e._zod.check=n=>{const i=n.value.split("/");try{if(i.length!==2)throw new Error;const[r,s]=i;if(!s)throw new Error;const o=Number(s);if(`${o}`!==s)throw new Error;if(o<0||o>128)throw new Error;new URL(`http://[${r}]`)}catch{n.issues.push({code:"invalid_format",format:"cidrv6",input:n.value,inst:e,continue:!t.abort})}}});function S_(e){if(e==="")return!0;if(e.length%4!==0)return!1;try{return atob(e),!0}catch{return!1}}const ST=mt("$ZodBase64",(e,t)=>{t.pattern??(t.pattern=vw),Ne.init(e,t),e._zod.onattach.push(n=>{n._zod.bag.contentEncoding="base64"}),e._zod.check=n=>{S_(n.value)||n.issues.push({code:"invalid_format",format:"base64",input:n.value,inst:e,continue:!t.abort})}});function MT(e){if(!h_.test(e))return!1;const t=e.replace(/[-_]/g,i=>i==="-"?"+":"/"),n=t.padEnd(Math.ceil(t.length/4)*4,"=");return S_(n)}const bT=mt("$ZodBase64URL",(e,t)=>{t.pattern??(t.pattern=h_),Ne.init(e,t),e._zod.onattach.push(n=>{n._zod.bag.contentEncoding="base64url"}),e._zod.check=n=>{MT(n.value)||n.issues.push({code:"invalid_format",format:"base64url",input:n.value,inst:e,continue:!t.abort})}}),ET=mt("$ZodE164",(e,t)=>{t.pattern??(t.pattern=xw),Ne.init(e,t)});function wT(e,t=null){try{const n=e.split(".");if(n.length!==3)return!1;const[i]=n;if(!i)return!1;const r=JSON.parse(atob(i));return!("typ"in r&&r?.typ!=="JWT"||!r.alg||t&&(!("alg"in r)||r.alg!==t))}catch{return!1}}const TT=mt("$ZodJWT",(e,t)=>{Ne.init(e,t),e._zod.check=n=>{wT(n.value,t.alg)||n.issues.push({code:"invalid_format",format:"jwt",input:n.value,inst:e,continue:!t.abort})}}),M_=mt("$ZodNumber",(e,t)=>{Ve.init(e,t),e._zod.pattern=e._zod.bag.pattern??Tw,e._zod.parse=(n,i)=>{if(t.coerce)try{n.value=Number(n.value)}catch{}const r=n.value;if(typeof r=="number"&&!Number.isNaN(r)&&Number.isFinite(r))return n;const s=typeof r=="number"?Number.isNaN(r)?"NaN":Number.isFinite(r)?void 0:"Infinity":void 0;return n.issues.push({expected:"number",code:"invalid_type",input:r,inst:e,...s?{received:s}:{}}),n}}),AT=mt("$ZodNumber",(e,t)=>{Uw.init(e,t),M_.init(e,t)}),CT=mt("$ZodBoolean",(e,t)=>{Ve.init(e,t),e._zod.pattern=Aw,e._zod.parse=(n,i)=>{if(t.coerce)try{n.value=!!n.value}catch{}const r=n.value;return typeof r=="boolean"||n.issues.push({expected:"boolean",code:"invalid_type",input:r,inst:e}),n}}),RT=mt("$ZodUnknown",(e,t)=>{Ve.init(e,t),e._zod.parse=n=>n}),PT=mt("$ZodNever",(e,t)=>{Ve.init(e,t),e._zod.parse=(n,i)=>(n.issues.push({expected:"never",code:"invalid_type",input:n.value,inst:e}),n)});function $p(e,t,n){e.issues.length&&t.issues.push(...f_(n,e.issues)),t.value[n]=e.value}const UT=mt("$ZodArray",(e,t)=>{Ve.init(e,t),e._zod.parse=(n,i)=>{const r=n.value;if(!Array.isArray(r))return n.issues.push({expected:"array",code:"invalid_type",input:r,inst:e}),n;n.value=Array(r.length);const s=[];for(let o=0;o<r.length;o++){const a=r[o],c=t.element._zod.run({value:a,issues:[]},i);c instanceof Promise?s.push(c.then(l=>$p(l,n,o))):$p(c,n,o)}return s.length?Promise.all(s).then(()=>n):n}});function nl(e,t,n,i){e.issues.length&&t.issues.push(...f_(n,e.issues)),e.value===void 0?n in i&&(t.value[n]=void 0):t.value[n]=e.value}function b_(e){const t=Object.keys(e.shape);for(const i of t)if(!e.shape?.[i]?._zod?.traits?.has("$ZodType"))throw new Error(`Invalid element at key "${i}": expected a Zod schema`);const n=ZE(e.shape);return{...e,keys:t,keySet:new Set(t),numKeys:t.length,optionalKeys:new Set(n)}}function E_(e,t,n,i,r,s){const o=[],a=r.keySet,c=r.catchall._zod,l=c.def.type;for(const u of Object.keys(t)){if(a.has(u))continue;if(l==="never"){o.push(u);continue}const f=c.run({value:t[u],issues:[]},i);f instanceof Promise?e.push(f.then(h=>nl(h,n,u,t))):nl(f,n,u,t)}return o.length&&n.issues.push({code:"unrecognized_keys",keys:o,input:t,inst:s}),e.length?Promise.all(e).then(()=>n):n}const DT=mt("$ZodObject",(e,t)=>{if(Ve.init(e,t),!Object.getOwnPropertyDescriptor(t,"shape")?.get){const o=t.shape;Object.defineProperty(t,"shape",{get:()=>{const a={...o};return Object.defineProperty(t,"shape",{value:a}),a}})}const n=Oh(()=>b_(t));Pe(e._zod,"propValues",()=>{const o=t.shape,a={};for(const c in o){const l=o[c]._zod;if(l.values){a[c]??(a[c]=new Set);for(const u of l.values)a[c].add(u)}}return a});const i=el,r=t.catchall;let s;e._zod.parse=(o,a)=>{s??(s=n.value);const c=o.value;if(!i(c))return o.issues.push({expected:"object",code:"invalid_type",input:c,inst:e}),o;o.value={};const l=[],u=s.shape;for(const f of s.keys){const h=u[f]._zod.run({value:c[f],issues:[]},a);h instanceof Promise?l.push(h.then(d=>nl(d,o,f,c))):nl(h,o,f,c)}return r?E_(l,c,o,a,n.value,e):l.length?Promise.all(l).then(()=>o):o}}),IT=mt("$ZodObjectJIT",(e,t)=>{DT.init(e,t);const n=e._zod.parse,i=Oh(()=>b_(t)),r=f=>{const h=new Vw(["shape","payload","ctx"]),d=i.value,m=y=>{const x=Hp(y);return`shape[${x}]._zod.run({ value: input[${x}], issues: [] }, ctx)`};h.write("const input = payload.value;");const _=Object.create(null);let g=0;for(const y of d.keys)_[y]=`key_${g++}`;h.write("const newResult = {};");for(const y of d.keys){const x=_[y],v=Hp(y);h.write(`const ${x} = ${m(y)};`),h.write(`
        if (${x}.issues.length) {
          payload.issues = payload.issues.concat(${x}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${v}, ...iss.path] : [${v}]
          })));
        }
        
        
        if (${x}.value === undefined) {
          if (${v} in input) {
            newResult[${v}] = undefined;
          }
        } else {
          newResult[${v}] = ${x}.value;
        }
        
      `)}h.write("payload.value = newResult;"),h.write("return payload;");const p=h.compile();return(y,x)=>p(f,y,x)};let s;const o=el,a=!c_.jitless,c=a&&XE.value,l=t.catchall;let u;e._zod.parse=(f,h)=>{u??(u=i.value);const d=f.value;return o(d)?a&&c&&h?.async===!1&&h.jitless!==!0?(s||(s=r(t.shape)),f=s(f,h),l?E_([],d,f,h,u,e):f):n(f,h):(f.issues.push({expected:"object",code:"invalid_type",input:d,inst:e}),f)}});function Xp(e,t,n,i){for(const s of e)if(s.issues.length===0)return t.value=s.value,t;const r=e.filter(s=>!Js(s));return r.length===1?(t.value=r[0].value,r[0]):(t.issues.push({code:"invalid_union",input:t.value,inst:n,errors:e.map(s=>s.issues.map(o=>xs(o,i,ys())))}),t)}const LT=mt("$ZodUnion",(e,t)=>{Ve.init(e,t),Pe(e._zod,"optin",()=>t.options.some(r=>r._zod.optin==="optional")?"optional":void 0),Pe(e._zod,"optout",()=>t.options.some(r=>r._zod.optout==="optional")?"optional":void 0),Pe(e._zod,"values",()=>{if(t.options.every(r=>r._zod.values))return new Set(t.options.flatMap(r=>Array.from(r._zod.values)))}),Pe(e._zod,"pattern",()=>{if(t.options.every(r=>r._zod.pattern)){const r=t.options.map(s=>s._zod.pattern);return new RegExp(`^(${r.map(s=>zh(s.source)).join("|")})$`)}});const n=t.options.length===1,i=t.options[0]._zod.run;e._zod.parse=(r,s)=>{if(n)return i(r,s);let o=!1;const a=[];for(const c of t.options){const l=c._zod.run({value:r.value,issues:[]},s);if(l instanceof Promise)a.push(l),o=!0;else{if(l.issues.length===0)return l;a.push(l)}}return o?Promise.all(a).then(c=>Xp(c,r,e,s)):Xp(a,r,e,s)}}),FT=mt("$ZodIntersection",(e,t)=>{Ve.init(e,t),e._zod.parse=(n,i)=>{const r=n.value,s=t.left._zod.run({value:r,issues:[]},i),o=t.right._zod.run({value:r,issues:[]},i);return s instanceof Promise||o instanceof Promise?Promise.all([s,o]).then(([a,c])=>Yp(n,a,c)):Yp(n,s,o)}});function $f(e,t){if(e===t)return{valid:!0,data:e};if(e instanceof Date&&t instanceof Date&&+e==+t)return{valid:!0,data:e};if(wa(e)&&wa(t)){const n=Object.keys(t),i=Object.keys(e).filter(s=>n.indexOf(s)!==-1),r={...e,...t};for(const s of i){const o=$f(e[s],t[s]);if(!o.valid)return{valid:!1,mergeErrorPath:[s,...o.mergeErrorPath]};r[s]=o.data}return{valid:!0,data:r}}if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return{valid:!1,mergeErrorPath:[]};const n=[];for(let i=0;i<e.length;i++){const r=e[i],s=t[i],o=$f(r,s);if(!o.valid)return{valid:!1,mergeErrorPath:[i,...o.mergeErrorPath]};n.push(o.data)}return{valid:!0,data:n}}return{valid:!1,mergeErrorPath:[]}}function Yp(e,t,n){if(t.issues.length&&e.issues.push(...t.issues),n.issues.length&&e.issues.push(...n.issues),Js(e))return e;const i=$f(t.value,n.value);if(!i.valid)throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(i.mergeErrorPath)}`);return e.value=i.data,e}const NT=mt("$ZodEnum",(e,t)=>{Ve.init(e,t);const n=WE(t.entries),i=new Set(n);e._zod.values=i,e._zod.pattern=new RegExp(`^(${n.filter(r=>YE.has(typeof r)).map(r=>typeof r=="string"?vo(r):r.toString()).join("|")})$`),e._zod.parse=(r,s)=>{const o=r.value;return i.has(o)||r.issues.push({code:"invalid_value",values:n,input:o,inst:e}),r}}),OT=mt("$ZodLiteral",(e,t)=>{if(Ve.init(e,t),t.values.length===0)throw new Error("Cannot create literal schema with no valid values");e._zod.values=new Set(t.values),e._zod.pattern=new RegExp(`^(${t.values.map(n=>typeof n=="string"?vo(n):n?vo(n.toString()):String(n)).join("|")})$`),e._zod.parse=(n,i)=>{const r=n.value;return e._zod.values.has(r)||n.issues.push({code:"invalid_value",values:t.values,input:r,inst:e}),n}}),kT=mt("$ZodTransform",(e,t)=>{Ve.init(e,t),e._zod.parse=(n,i)=>{if(i.direction==="backward")throw new a_(e.constructor.name);const r=t.transform(n.value,n);if(i.async)return(r instanceof Promise?r:Promise.resolve(r)).then(s=>(n.value=s,n));if(r instanceof Promise)throw new ro;return n.value=r,n}});function Zp(e,t){return e.issues.length&&t===void 0?{issues:[],value:void 0}:e}const zT=mt("$ZodOptional",(e,t)=>{Ve.init(e,t),e._zod.optin="optional",e._zod.optout="optional",Pe(e._zod,"values",()=>t.innerType._zod.values?new Set([...t.innerType._zod.values,void 0]):void 0),Pe(e._zod,"pattern",()=>{const n=t.innerType._zod.pattern;return n?new RegExp(`^(${zh(n.source)})?$`):void 0}),e._zod.parse=(n,i)=>{if(t.innerType._zod.optin==="optional"){const r=t.innerType._zod.run(n,i);return r instanceof Promise?r.then(s=>Zp(s,n.value)):Zp(r,n.value)}return n.value===void 0?n:t.innerType._zod.run(n,i)}}),BT=mt("$ZodNullable",(e,t)=>{Ve.init(e,t),Pe(e._zod,"optin",()=>t.innerType._zod.optin),Pe(e._zod,"optout",()=>t.innerType._zod.optout),Pe(e._zod,"pattern",()=>{const n=t.innerType._zod.pattern;return n?new RegExp(`^(${zh(n.source)}|null)$`):void 0}),Pe(e._zod,"values",()=>t.innerType._zod.values?new Set([...t.innerType._zod.values,null]):void 0),e._zod.parse=(n,i)=>n.value===null?n:t.innerType._zod.run(n,i)}),GT=mt("$ZodDefault",(e,t)=>{Ve.init(e,t),e._zod.optin="optional",Pe(e._zod,"values",()=>t.innerType._zod.values),e._zod.parse=(n,i)=>{if(i.direction==="backward")return t.innerType._zod.run(n,i);if(n.value===void 0)return n.value=t.defaultValue,n;const r=t.innerType._zod.run(n,i);return r instanceof Promise?r.then(s=>jp(s,t)):jp(r,t)}});function jp(e,t){return e.value===void 0&&(e.value=t.defaultValue),e}const VT=mt("$ZodPrefault",(e,t)=>{Ve.init(e,t),e._zod.optin="optional",Pe(e._zod,"values",()=>t.innerType._zod.values),e._zod.parse=(n,i)=>(i.direction==="backward"||n.value===void 0&&(n.value=t.defaultValue),t.innerType._zod.run(n,i))}),HT=mt("$ZodNonOptional",(e,t)=>{Ve.init(e,t),Pe(e._zod,"values",()=>{const n=t.innerType._zod.values;return n?new Set([...n].filter(i=>i!==void 0)):void 0}),e._zod.parse=(n,i)=>{const r=t.innerType._zod.run(n,i);return r instanceof Promise?r.then(s=>qp(s,e)):qp(r,e)}});function qp(e,t){return!e.issues.length&&e.value===void 0&&e.issues.push({code:"invalid_type",expected:"nonoptional",input:e.value,inst:t}),e}const WT=mt("$ZodCatch",(e,t)=>{Ve.init(e,t),Pe(e._zod,"optin",()=>t.innerType._zod.optin),Pe(e._zod,"optout",()=>t.innerType._zod.optout),Pe(e._zod,"values",()=>t.innerType._zod.values),e._zod.parse=(n,i)=>{if(i.direction==="backward")return t.innerType._zod.run(n,i);const r=t.innerType._zod.run(n,i);return r instanceof Promise?r.then(s=>(n.value=s.value,s.issues.length&&(n.value=t.catchValue({...n,error:{issues:s.issues.map(o=>xs(o,i,ys()))},input:n.value}),n.issues=[]),n)):(n.value=r.value,r.issues.length&&(n.value=t.catchValue({...n,error:{issues:r.issues.map(s=>xs(s,i,ys()))},input:n.value}),n.issues=[]),n)}}),$T=mt("$ZodPipe",(e,t)=>{Ve.init(e,t),Pe(e._zod,"values",()=>t.in._zod.values),Pe(e._zod,"optin",()=>t.in._zod.optin),Pe(e._zod,"optout",()=>t.out._zod.optout),Pe(e._zod,"propValues",()=>t.in._zod.propValues),e._zod.parse=(n,i)=>{if(i.direction==="backward"){const s=t.out._zod.run(n,i);return s instanceof Promise?s.then(o=>Ec(o,t.in,i)):Ec(s,t.in,i)}const r=t.in._zod.run(n,i);return r instanceof Promise?r.then(s=>Ec(s,t.out,i)):Ec(r,t.out,i)}});function Ec(e,t,n){return e.issues.length?(e.aborted=!0,e):t._zod.run({value:e.value,issues:e.issues},n)}const XT=mt("$ZodReadonly",(e,t)=>{Ve.init(e,t),Pe(e._zod,"propValues",()=>t.innerType._zod.propValues),Pe(e._zod,"values",()=>t.innerType._zod.values),Pe(e._zod,"optin",()=>t.innerType._zod.optin),Pe(e._zod,"optout",()=>t.innerType._zod.optout),e._zod.parse=(n,i)=>{if(i.direction==="backward")return t.innerType._zod.run(n,i);const r=t.innerType._zod.run(n,i);return r instanceof Promise?r.then(Kp):Kp(r)}});function Kp(e){return e.value=Object.freeze(e.value),e}const YT=mt("$ZodCustom",(e,t)=>{Hn.init(e,t),Ve.init(e,t),e._zod.parse=(n,i)=>n,e._zod.check=n=>{const i=n.value,r=t.fn(i);if(r instanceof Promise)return r.then(s=>Jp(s,n,i,e));Jp(r,n,i,e)}});function Jp(e,t,n,i){if(!e){const r={code:"custom",input:n,inst:i,path:[...i._zod.def.path??[]],continue:!i._zod.def.abort};i._zod.def.params&&(r.params=i._zod.def.params),t.issues.push(Ta(r))}}let ZT=class{constructor(){this._map=new WeakMap,this._idmap=new Map}add(t,...n){const i=n[0];if(this._map.set(t,i),i&&typeof i=="object"&&"id"in i){if(this._idmap.has(i.id))throw new Error(`ID ${i.id} already exists in the registry`);this._idmap.set(i.id,t)}return this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(t){const n=this._map.get(t);return n&&typeof n=="object"&&"id"in n&&this._idmap.delete(n.id),this._map.delete(t),this}get(t){const n=t._zod.parent;if(n){const i={...this.get(n)??{}};delete i.id;const r={...i,...this._map.get(t)};return Object.keys(r).length?r:void 0}return this._map.get(t)}has(t){return this._map.has(t)}};function jT(){return new ZT}const wc=jT();function qT(e,t){return new e({type:"string",...$t(t)})}function KT(e,t){return new e({type:"string",format:"email",check:"string_format",abort:!1,...$t(t)})}function Qp(e,t){return new e({type:"string",format:"guid",check:"string_format",abort:!1,...$t(t)})}function JT(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,...$t(t)})}function QT(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v4",...$t(t)})}function t2(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v6",...$t(t)})}function e2(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v7",...$t(t)})}function n2(e,t){return new e({type:"string",format:"url",check:"string_format",abort:!1,...$t(t)})}function i2(e,t){return new e({type:"string",format:"emoji",check:"string_format",abort:!1,...$t(t)})}function r2(e,t){return new e({type:"string",format:"nanoid",check:"string_format",abort:!1,...$t(t)})}function s2(e,t){return new e({type:"string",format:"cuid",check:"string_format",abort:!1,...$t(t)})}function o2(e,t){return new e({type:"string",format:"cuid2",check:"string_format",abort:!1,...$t(t)})}function a2(e,t){return new e({type:"string",format:"ulid",check:"string_format",abort:!1,...$t(t)})}function c2(e,t){return new e({type:"string",format:"xid",check:"string_format",abort:!1,...$t(t)})}function l2(e,t){return new e({type:"string",format:"ksuid",check:"string_format",abort:!1,...$t(t)})}function u2(e,t){return new e({type:"string",format:"ipv4",check:"string_format",abort:!1,...$t(t)})}function f2(e,t){return new e({type:"string",format:"ipv6",check:"string_format",abort:!1,...$t(t)})}function h2(e,t){return new e({type:"string",format:"cidrv4",check:"string_format",abort:!1,...$t(t)})}function d2(e,t){return new e({type:"string",format:"cidrv6",check:"string_format",abort:!1,...$t(t)})}function p2(e,t){return new e({type:"string",format:"base64",check:"string_format",abort:!1,...$t(t)})}function m2(e,t){return new e({type:"string",format:"base64url",check:"string_format",abort:!1,...$t(t)})}function g2(e,t){return new e({type:"string",format:"e164",check:"string_format",abort:!1,...$t(t)})}function _2(e,t){return new e({type:"string",format:"jwt",check:"string_format",abort:!1,...$t(t)})}function v2(e,t){return new e({type:"string",format:"datetime",check:"string_format",offset:!1,local:!1,precision:null,...$t(t)})}function y2(e,t){return new e({type:"string",format:"date",check:"string_format",...$t(t)})}function x2(e,t){return new e({type:"string",format:"time",check:"string_format",precision:null,...$t(t)})}function S2(e,t){return new e({type:"string",format:"duration",check:"string_format",...$t(t)})}function M2(e,t){return new e({type:"number",checks:[],...$t(t)})}function b2(e,t){return new e({type:"number",check:"number_format",abort:!1,format:"safeint",...$t(t)})}function E2(e,t){return new e({type:"boolean",...$t(t)})}function w2(e){return new e({type:"unknown"})}function T2(e,t){return new e({type:"never",...$t(t)})}function tm(e,t){return new g_({check:"less_than",...$t(t),value:e,inclusive:!1})}function Eu(e,t){return new g_({check:"less_than",...$t(t),value:e,inclusive:!0})}function em(e,t){return new __({check:"greater_than",...$t(t),value:e,inclusive:!1})}function wu(e,t){return new __({check:"greater_than",...$t(t),value:e,inclusive:!0})}function nm(e,t){return new Pw({check:"multiple_of",...$t(t),value:e})}function w_(e,t){return new Dw({check:"max_length",...$t(t),maximum:e})}function il(e,t){return new Iw({check:"min_length",...$t(t),minimum:e})}function T_(e,t){return new Lw({check:"length_equals",...$t(t),length:e})}function A2(e,t){return new Fw({check:"string_format",format:"regex",...$t(t),pattern:e})}function C2(e){return new Nw({check:"string_format",format:"lowercase",...$t(e)})}function R2(e){return new Ow({check:"string_format",format:"uppercase",...$t(e)})}function P2(e,t){return new kw({check:"string_format",format:"includes",...$t(t),includes:e})}function U2(e,t){return new zw({check:"string_format",format:"starts_with",...$t(t),prefix:e})}function D2(e,t){return new Bw({check:"string_format",format:"ends_with",...$t(t),suffix:e})}function Ba(e){return new Gw({check:"overwrite",tx:e})}function I2(e){return Ba(t=>t.normalize(e))}function L2(){return Ba(e=>e.trim())}function F2(){return Ba(e=>e.toLowerCase())}function N2(){return Ba(e=>e.toUpperCase())}function O2(e,t,n){return new e({type:"array",element:t,...$t(n)})}function k2(e,t,n){return new e({type:"custom",check:"custom",fn:t,...$t(n)})}function z2(e){const t=B2(n=>(n.addIssue=i=>{if(typeof i=="string")n.issues.push(Ta(i,n.value,t._zod.def));else{const r=i;r.fatal&&(r.continue=!1),r.code??(r.code="custom"),r.input??(r.input=n.value),r.inst??(r.inst=t),r.continue??(r.continue=!t._zod.def.abort),n.issues.push(Ta(r))}},e(n.value,n)));return t}function B2(e,t){const n=new Hn({check:"custom",...$t(t)});return n._zod.check=e,n}const G2=mt("ZodISODateTime",(e,t)=>{dT.init(e,t),ze.init(e,t)});function V2(e){return v2(G2,e)}const H2=mt("ZodISODate",(e,t)=>{pT.init(e,t),ze.init(e,t)});function W2(e){return y2(H2,e)}const $2=mt("ZodISOTime",(e,t)=>{mT.init(e,t),ze.init(e,t)});function X2(e){return x2($2,e)}const Y2=mt("ZodISODuration",(e,t)=>{gT.init(e,t),ze.init(e,t)});function Z2(e){return S2(Y2,e)}const j2=(e,t)=>{y_.init(e,t),e.name="ZodError",Object.defineProperties(e,{format:{value:n=>Ww(e,n)},flatten:{value:n=>Hw(e,n)},addIssue:{value:n=>{e.issues.push(n),e.message=JSON.stringify(e.issues,Wf,2)}},addIssues:{value:n=>{e.issues.push(...n),e.message=JSON.stringify(e.issues,Wf,2)}},isEmpty:{get(){return e.issues.length===0}}})},_i=mt("ZodError",j2,{Parent:Error}),q2=Gh(_i),K2=Vh(_i),J2=Tl(_i),Q2=Al(_i),tA=Yw(_i),eA=Zw(_i),nA=jw(_i),iA=qw(_i),rA=Kw(_i),sA=Jw(_i),oA=Qw(_i),aA=tT(_i),$e=mt("ZodType",(e,t)=>(Ve.init(e,t),e.def=t,e.type=t.type,Object.defineProperty(e,"_def",{value:t}),e.check=(...n)=>e.clone(Ts(t,{checks:[...t.checks??[],...n.map(i=>typeof i=="function"?{_zod:{check:i,def:{check:"custom"},onattach:[]}}:i)]})),e.clone=(n,i)=>Br(e,n,i),e.brand=()=>e,e.register=(n,i)=>(n.add(e,i),e),e.parse=(n,i)=>q2(e,n,i,{callee:e.parse}),e.safeParse=(n,i)=>J2(e,n,i),e.parseAsync=async(n,i)=>K2(e,n,i,{callee:e.parseAsync}),e.safeParseAsync=async(n,i)=>Q2(e,n,i),e.spa=e.safeParseAsync,e.encode=(n,i)=>tA(e,n,i),e.decode=(n,i)=>eA(e,n,i),e.encodeAsync=async(n,i)=>nA(e,n,i),e.decodeAsync=async(n,i)=>iA(e,n,i),e.safeEncode=(n,i)=>rA(e,n,i),e.safeDecode=(n,i)=>sA(e,n,i),e.safeEncodeAsync=async(n,i)=>oA(e,n,i),e.safeDecodeAsync=async(n,i)=>aA(e,n,i),e.refine=(n,i)=>e.check(JA(n,i)),e.superRefine=n=>e.check(QA(n)),e.overwrite=n=>e.check(Ba(n)),e.optional=()=>om(e),e.nullable=()=>am(e),e.nullish=()=>om(am(e)),e.nonoptional=n=>$A(e,n),e.array=()=>DA(e),e.or=n=>pe([e,n]),e.and=n=>NA(e,n),e.transform=n=>cm(e,zA(n)),e.default=n=>VA(e,n),e.prefault=n=>WA(e,n),e.catch=n=>YA(e,n),e.pipe=n=>cm(e,n),e.readonly=()=>qA(e),e.describe=n=>{const i=e.clone();return wc.add(i,{description:n}),i},Object.defineProperty(e,"description",{get(){return wc.get(e)?.description},configurable:!0}),e.meta=(...n)=>{if(n.length===0)return wc.get(e);const i=e.clone();return wc.add(i,n[0]),i},e.isOptional=()=>e.safeParse(void 0).success,e.isNullable=()=>e.safeParse(null).success,e)),A_=mt("_ZodString",(e,t)=>{Hh.init(e,t),$e.init(e,t);const n=e._zod.bag;e.format=n.format??null,e.minLength=n.minimum??null,e.maxLength=n.maximum??null,e.regex=(...i)=>e.check(A2(...i)),e.includes=(...i)=>e.check(P2(...i)),e.startsWith=(...i)=>e.check(U2(...i)),e.endsWith=(...i)=>e.check(D2(...i)),e.min=(...i)=>e.check(il(...i)),e.max=(...i)=>e.check(w_(...i)),e.length=(...i)=>e.check(T_(...i)),e.nonempty=(...i)=>e.check(il(1,...i)),e.lowercase=i=>e.check(C2(i)),e.uppercase=i=>e.check(R2(i)),e.trim=()=>e.check(L2()),e.normalize=(...i)=>e.check(I2(...i)),e.toLowerCase=()=>e.check(F2()),e.toUpperCase=()=>e.check(N2())}),cA=mt("ZodString",(e,t)=>{Hh.init(e,t),A_.init(e,t),e.email=n=>e.check(KT(lA,n)),e.url=n=>e.check(n2(uA,n)),e.jwt=n=>e.check(_2(wA,n)),e.emoji=n=>e.check(i2(fA,n)),e.guid=n=>e.check(Qp(im,n)),e.uuid=n=>e.check(JT(Tc,n)),e.uuidv4=n=>e.check(QT(Tc,n)),e.uuidv6=n=>e.check(t2(Tc,n)),e.uuidv7=n=>e.check(e2(Tc,n)),e.nanoid=n=>e.check(r2(hA,n)),e.guid=n=>e.check(Qp(im,n)),e.cuid=n=>e.check(s2(dA,n)),e.cuid2=n=>e.check(o2(pA,n)),e.ulid=n=>e.check(a2(mA,n)),e.base64=n=>e.check(p2(MA,n)),e.base64url=n=>e.check(m2(bA,n)),e.xid=n=>e.check(c2(gA,n)),e.ksuid=n=>e.check(l2(_A,n)),e.ipv4=n=>e.check(u2(vA,n)),e.ipv6=n=>e.check(f2(yA,n)),e.cidrv4=n=>e.check(h2(xA,n)),e.cidrv6=n=>e.check(d2(SA,n)),e.e164=n=>e.check(g2(EA,n)),e.datetime=n=>e.check(V2(n)),e.date=n=>e.check(W2(n)),e.time=n=>e.check(X2(n)),e.duration=n=>e.check(Z2(n))});function qt(e){return qT(cA,e)}const ze=mt("ZodStringFormat",(e,t)=>{Ne.init(e,t),A_.init(e,t)}),lA=mt("ZodEmail",(e,t)=>{rT.init(e,t),ze.init(e,t)}),im=mt("ZodGUID",(e,t)=>{nT.init(e,t),ze.init(e,t)}),Tc=mt("ZodUUID",(e,t)=>{iT.init(e,t),ze.init(e,t)}),uA=mt("ZodURL",(e,t)=>{sT.init(e,t),ze.init(e,t)}),fA=mt("ZodEmoji",(e,t)=>{oT.init(e,t),ze.init(e,t)}),hA=mt("ZodNanoID",(e,t)=>{aT.init(e,t),ze.init(e,t)}),dA=mt("ZodCUID",(e,t)=>{cT.init(e,t),ze.init(e,t)}),pA=mt("ZodCUID2",(e,t)=>{lT.init(e,t),ze.init(e,t)}),mA=mt("ZodULID",(e,t)=>{uT.init(e,t),ze.init(e,t)}),gA=mt("ZodXID",(e,t)=>{fT.init(e,t),ze.init(e,t)}),_A=mt("ZodKSUID",(e,t)=>{hT.init(e,t),ze.init(e,t)}),vA=mt("ZodIPv4",(e,t)=>{_T.init(e,t),ze.init(e,t)}),yA=mt("ZodIPv6",(e,t)=>{vT.init(e,t),ze.init(e,t)}),xA=mt("ZodCIDRv4",(e,t)=>{yT.init(e,t),ze.init(e,t)}),SA=mt("ZodCIDRv6",(e,t)=>{xT.init(e,t),ze.init(e,t)}),MA=mt("ZodBase64",(e,t)=>{ST.init(e,t),ze.init(e,t)}),bA=mt("ZodBase64URL",(e,t)=>{bT.init(e,t),ze.init(e,t)}),EA=mt("ZodE164",(e,t)=>{ET.init(e,t),ze.init(e,t)}),wA=mt("ZodJWT",(e,t)=>{TT.init(e,t),ze.init(e,t)}),C_=mt("ZodNumber",(e,t)=>{M_.init(e,t),$e.init(e,t),e.gt=(i,r)=>e.check(em(i,r)),e.gte=(i,r)=>e.check(wu(i,r)),e.min=(i,r)=>e.check(wu(i,r)),e.lt=(i,r)=>e.check(tm(i,r)),e.lte=(i,r)=>e.check(Eu(i,r)),e.max=(i,r)=>e.check(Eu(i,r)),e.int=i=>e.check(rm(i)),e.safe=i=>e.check(rm(i)),e.positive=i=>e.check(em(0,i)),e.nonnegative=i=>e.check(wu(0,i)),e.negative=i=>e.check(tm(0,i)),e.nonpositive=i=>e.check(Eu(0,i)),e.multipleOf=(i,r)=>e.check(nm(i,r)),e.step=(i,r)=>e.check(nm(i,r)),e.finite=()=>e;const n=e._zod.bag;e.minValue=Math.max(n.minimum??Number.NEGATIVE_INFINITY,n.exclusiveMinimum??Number.NEGATIVE_INFINITY)??null,e.maxValue=Math.min(n.maximum??Number.POSITIVE_INFINITY,n.exclusiveMaximum??Number.POSITIVE_INFINITY)??null,e.isInt=(n.format??"").includes("int")||Number.isSafeInteger(n.multipleOf??.5),e.isFinite=!0,e.format=n.format??null});function so(e){return M2(C_,e)}const TA=mt("ZodNumberFormat",(e,t)=>{AT.init(e,t),C_.init(e,t)});function rm(e){return b2(TA,e)}const AA=mt("ZodBoolean",(e,t)=>{CT.init(e,t),$e.init(e,t)});function CA(e){return E2(AA,e)}const RA=mt("ZodUnknown",(e,t)=>{RT.init(e,t),$e.init(e,t)});function sm(){return w2(RA)}const PA=mt("ZodNever",(e,t)=>{PT.init(e,t),$e.init(e,t)});function R_(e){return T2(PA,e)}const UA=mt("ZodArray",(e,t)=>{UT.init(e,t),$e.init(e,t),e.element=t.element,e.min=(n,i)=>e.check(il(n,i)),e.nonempty=n=>e.check(il(1,n)),e.max=(n,i)=>e.check(w_(n,i)),e.length=(n,i)=>e.check(T_(n,i)),e.unwrap=()=>e.element});function DA(e,t){return O2(UA,e,t)}const IA=mt("ZodObject",(e,t)=>{IT.init(e,t),$e.init(e,t),Pe(e,"shape",()=>t.shape),e.keyof=()=>Ga(Object.keys(e._zod.def.shape)),e.catchall=n=>e.clone({...e._zod.def,catchall:n}),e.passthrough=()=>e.clone({...e._zod.def,catchall:sm()}),e.loose=()=>e.clone({...e._zod.def,catchall:sm()}),e.strict=()=>e.clone({...e._zod.def,catchall:R_()}),e.strip=()=>e.clone({...e._zod.def,catchall:void 0}),e.extend=n=>JE(e,n),e.safeExtend=n=>QE(e,n),e.merge=n=>tw(e,n),e.pick=n=>qE(e,n),e.omit=n=>KE(e,n),e.partial=(...n)=>ew(P_,e,n[0]),e.required=(...n)=>nw(U_,e,n[0])});function on(e,t){const n={type:"object",shape:e??{},...$t(t)};return new IA(n)}const LA=mt("ZodUnion",(e,t)=>{LT.init(e,t),$e.init(e,t),e.options=t.options});function pe(e,t){return new LA({type:"union",options:e,...$t(t)})}const FA=mt("ZodIntersection",(e,t)=>{FT.init(e,t),$e.init(e,t)});function NA(e,t){return new FA({type:"intersection",left:e,right:t})}const Xf=mt("ZodEnum",(e,t)=>{NT.init(e,t),$e.init(e,t),e.enum=t.entries,e.options=Object.values(t.entries);const n=new Set(Object.keys(t.entries));e.extract=(i,r)=>{const s={};for(const o of i)if(n.has(o))s[o]=t.entries[o];else throw new Error(`Key ${o} not found in enum`);return new Xf({...t,checks:[],...$t(r),entries:s})},e.exclude=(i,r)=>{const s={...t.entries};for(const o of i)if(n.has(o))delete s[o];else throw new Error(`Key ${o} not found in enum`);return new Xf({...t,checks:[],...$t(r),entries:s})}});function Ga(e,t){const n=Array.isArray(e)?Object.fromEntries(e.map(i=>[i,i])):e;return new Xf({type:"enum",entries:n,...$t(t)})}const OA=mt("ZodLiteral",(e,t)=>{OT.init(e,t),$e.init(e,t),e.values=new Set(t.values),Object.defineProperty(e,"value",{get(){if(t.values.length>1)throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");return t.values[0]}})});function Ac(e,t){return new OA({type:"literal",values:Array.isArray(e)?e:[e],...$t(t)})}const kA=mt("ZodTransform",(e,t)=>{kT.init(e,t),$e.init(e,t),e._zod.parse=(n,i)=>{if(i.direction==="backward")throw new a_(e.constructor.name);n.addIssue=s=>{if(typeof s=="string")n.issues.push(Ta(s,n.value,t));else{const o=s;o.fatal&&(o.continue=!1),o.code??(o.code="custom"),o.input??(o.input=n.value),o.inst??(o.inst=e),n.issues.push(Ta(o))}};const r=t.transform(n.value,n);return r instanceof Promise?r.then(s=>(n.value=s,n)):(n.value=r,n)}});function zA(e){return new kA({type:"transform",transform:e})}const P_=mt("ZodOptional",(e,t)=>{zT.init(e,t),$e.init(e,t),e.unwrap=()=>e._zod.def.innerType});function om(e){return new P_({type:"optional",innerType:e})}const BA=mt("ZodNullable",(e,t)=>{BT.init(e,t),$e.init(e,t),e.unwrap=()=>e._zod.def.innerType});function am(e){return new BA({type:"nullable",innerType:e})}const GA=mt("ZodDefault",(e,t)=>{GT.init(e,t),$e.init(e,t),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});function VA(e,t){return new GA({type:"default",innerType:e,get defaultValue(){return typeof t=="function"?t():u_(t)}})}const HA=mt("ZodPrefault",(e,t)=>{VT.init(e,t),$e.init(e,t),e.unwrap=()=>e._zod.def.innerType});function WA(e,t){return new HA({type:"prefault",innerType:e,get defaultValue(){return typeof t=="function"?t():u_(t)}})}const U_=mt("ZodNonOptional",(e,t)=>{HT.init(e,t),$e.init(e,t),e.unwrap=()=>e._zod.def.innerType});function $A(e,t){return new U_({type:"nonoptional",innerType:e,...$t(t)})}const XA=mt("ZodCatch",(e,t)=>{WT.init(e,t),$e.init(e,t),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});function YA(e,t){return new XA({type:"catch",innerType:e,catchValue:typeof t=="function"?t:()=>t})}const ZA=mt("ZodPipe",(e,t)=>{$T.init(e,t),$e.init(e,t),e.in=t.in,e.out=t.out});function cm(e,t){return new ZA({type:"pipe",in:e,out:t})}const jA=mt("ZodReadonly",(e,t)=>{XT.init(e,t),$e.init(e,t),e.unwrap=()=>e._zod.def.innerType});function qA(e){return new jA({type:"readonly",innerType:e})}const KA=mt("ZodCustom",(e,t)=>{YT.init(e,t),$e.init(e,t)});function JA(e,t={}){return k2(KA,e,t)}function QA(e){return z2(e)}const Kt=so(),Er=qt().regex(/^-?\d+(\.\d+)?$/).transform(e=>parseFloat(e)),oo=pe([CA(),Ac("true").transform(()=>!0),Ac("false").transform(()=>!1),Ac(1).transform(()=>!0),Ac(0).transform(()=>!1)]),Ce=pe([on({x:so(),y:so(),z:so()}),Kt.transform(e=>({x:e,y:e,z:e})),Er.transform(e=>({x:e,y:e,z:e})),qt().regex(/^-?\d+(\.\d+)?\s+-?\d+(\.\d+)?\s+-?\d+(\.\d+)?$/).transform(e=>{const[t,n,i]=e.split(/\s+/).map(Number);return{x:t,y:n,z:i}})]);pe([on({x:so(),y:so()}),Kt.transform(e=>({x:e,y:e})),Er.transform(e=>({x:e,y:e})),qt().regex(/^-?\d+(\.\d+)?\s+-?\d+(\.\d+)?$/).transform(e=>{const[t,n]=e.split(/\s+/).map(Number);return{x:t,y:n}})]);const Ss=pe([qt().regex(/^#[0-9a-fA-F]{6}$/).transform(e=>parseInt(e.slice(1),16)),qt().regex(/^0x[0-9a-fA-F]{6}$/).transform(e=>parseInt(e.slice(2),16)),Kt,Er]),Uo=Ga(["box","sphere"]),tC=Ga(["static","dynamic","kinematic"]),Do=on({pos:Ce.optional(),scale:Ce.optional(),euler:Ce.optional(),rot:R_().optional()}).strict(),Cl=on({type:tC.optional(),pos:Ce.optional(),euler:Ce.optional(),mass:Kt.optional(),"linear-damping":Kt.optional(),"angular-damping":Kt.optional(),"gravity-scale":Kt.optional()}).strict(),Va=on({shape:Uo.optional(),size:Ce.optional(),restitution:Kt.optional(),friction:Kt.optional(),density:Kt.optional(),sensor:oo.optional()}).strict(),Rl=on({shape:Uo.optional(),size:Ce.optional(),color:Ss.optional(),"cast-shadow":oo.optional(),"receive-shadow":oo.optional(),visible:oo.optional()}).strict(),D_=on({distance:Kt.optional(),"min-distance":Kt.optional(),"max-distance":Kt.optional(),"min-pitch":Kt.optional(),"max-pitch":Kt.optional(),"target-pitch":Kt.optional(),"target-yaw":Kt.optional(),sensitivity:Kt.optional(),smoothing:Kt.optional(),enabled:oo.optional()}).strict(),I_=on({speed:Kt.optional(),"jump-height":Kt.optional(),acceleration:Kt.optional(),"air-control":Kt.optional(),enabled:oo.optional()}).strict();on({transform:pe([qt(),Do]).optional(),body:pe([qt(),Cl]).optional(),collider:pe([qt(),Va]).optional(),renderer:pe([qt(),Rl]).optional(),"orbit-camera":pe([qt(),D_]).optional(),player:pe([qt(),I_]).optional(),pos:Ce.optional(),scale:Ce.optional(),euler:Ce.optional(),color:Ss.optional(),size:Ce.optional(),shape:Uo.optional(),id:qt().optional()}).passthrough();on({pos:Ce,shape:Uo,size:Ce,color:Ss,transform:pe([qt(),Do]).optional(),collider:pe([qt(),Va]).optional(),renderer:pe([qt(),Rl]).optional(),scale:Ce.optional(),euler:Ce.optional(),restitution:Kt.optional(),friction:Kt.optional(),id:qt().optional(),name:qt().optional()}).strict();on({pos:Ce,shape:Uo,size:Ce,color:Ss,transform:pe([qt(),Do]).optional(),body:pe([qt(),Cl]).optional(),collider:pe([qt(),Va]).optional(),renderer:pe([qt(),Rl]).optional(),scale:Ce.optional(),euler:Ce.optional(),mass:Kt.optional(),restitution:Kt.optional(),friction:Kt.optional(),id:qt().optional(),name:qt().optional()}).strict();on({pos:Ce,shape:Uo,size:Ce,color:Ss,transform:pe([qt(),Do]).optional(),body:pe([qt(),Cl]).optional(),collider:pe([qt(),Va]).optional(),renderer:pe([qt(),Rl]).optional(),scale:Ce.optional(),euler:Ce.optional(),id:qt().optional(),name:qt().optional()}).strict();on({pos:Ce.optional(),speed:Kt.optional(),"jump-height":Kt.optional(),acceleration:Kt.optional(),"air-control":Kt.optional(),transform:pe([qt(),Do]).optional(),body:pe([qt(),Cl]).optional(),collider:pe([qt(),Va]).optional(),player:pe([qt(),I_]).optional(),id:qt().optional()}).strict();on({distance:Kt.optional(),"min-distance":Kt.optional(),"max-distance":Kt.optional(),"target-pitch":Kt.optional(),"target-yaw":Kt.optional(),transform:pe([qt(),Do]).optional(),"orbit-camera":pe([qt(),D_]).optional(),id:qt().optional()}).strict();on({canvas:qt().optional(),sky:Ss.optional(),fog:Ss.optional(),"fog-near":Kt.optional(),"fog-far":Kt.optional(),gravity:Ce.optional(),id:qt().optional()}).strict();const eC=Ga(["linear","ease","ease-in","ease-out","ease-in-out","sine-in","sine-out","sine-in-out","quad-in","quad-out","quad-in-out","cubic-in","cubic-out","cubic-in-out","quart-in","quart-out","quart-in-out","expo-in","expo-out","expo-in-out","circ-in","circ-out","circ-in-out","back-in","back-out","back-in-out","elastic-in","elastic-out","elastic-in-out","bounce-in","bounce-out","bounce-in-out"]);Ga(["once","loop","ping-pong"]);on({target:qt(),attr:qt(),from:pe([Kt,Er,Ce]).optional(),to:pe([Kt,Er,Ce]),duration:pe([Kt,Er]).default(1),delay:pe([Kt,Er]).optional(),easing:eC.optional(),id:qt().optional(),name:qt().optional()}).strict();on({duration:pe([Kt,Er]).default(0)}).strict();on({id:qt().optional(),name:qt().optional()}).strict();function nC(e){return typeof e=="number"?e:typeof e=="string"?parseFloat(e)||0:typeof e=="boolean"&&e?1:0}function L_(e,t,n,i){const r=e.getRecipe(t);if(!r){const o=Array.from(e.getRecipeNames()),a=Nc(t,o);throw new Error(a)}const s=e.createEntity();if(r.components)for(const o of r.components){const a=e.getComponent(o);a&&e.addComponent(s,a)}if(r.components)for(const o of r.components){const a=e.getComponent(o);if(a){const c=e.config.getDefaults(o);for(const[l,u]of Object.entries(c))l in a&&(a[l][s]=u)}}if(r.overrides)for(const[o,a]of Object.entries(r.overrides)){const[c,l]=o.split("."),u=e.getComponent(c);if(u){e.hasComponent(s,u)||e.addComponent(s,u);const f=bh(l);f in u&&(u[f][s]=a)}}return oC(s,r,n,e,i),s}function iC(e,t,n={}){const i=new Sg(e);return L_(e,t,n,i)}function lm(e,t,n,i){const r=bh(n);return r in t?(t[r][e]=nC(i),!0):!1}function rC(e,t,n,i,r){if(n.includes(".")){const[s,o]=n.split("."),a=r.getComponent(s);return a?lm(e,a,o,i):!1}if(t.components)for(const s of t.components){const o=r.getComponent(s);if(o&&lm(e,o,n,i))return!0}if(t.components){const s=typeof i=="string"?i:String(i);for(const o of t.components){const a=r.config.getAdapter(o,n);if(a)return a(e,s,r),!0}}return!1}function sC(e,t){const n=new Set;if(e.components)for(const i of e.components){const r=t.config.getShorthands(i);for(const o of Object.keys(r))n.add(o);const s=t.config.getAdapterProperties(i);for(const o of s)n.add(o)}for(const i of t.getComponentNames())n.add(i);if(e.components)for(const i of e.components){const r=t.getComponent(i);if(r){n.add(i);for(const s in r)if(typeof r[s]!="function"&&!s.startsWith("_")){const o=s.replace(/([A-Z])/g,"-$1").toLowerCase();n.add(`${i}.${o}`),n.add(o)}}}return n.add("id"),n.add("name"),Array.from(n).sort()}function oC(e,t,n,i,r){const s=GE(n,t,i);for(const a of i.config.getValidations())a.condition(t.name,s)&&console.warn(`[${t.name}] Warning: ${a.warning}`);const o=!!i.getParser(t.name);for(const[a,c]of Object.entries(s)){if(a==="id")continue;if(a==="name"){typeof c=="string"&&r.setName(c,e);continue}const l=i.getComponent(a);if(l&&typeof c=="string"){if(!i.hasComponent(e,l)){i.addComponent(e,l);const f=i.config.getDefaults(a);for(const[h,d]of Object.entries(f))h in l&&(l[h][e]=d)}const u=BE(a,c,l,i,r,e);for(const[f,h]of Object.entries(u))f in l&&(l[f][e]=h)}else if(!rC(e,t,a,c,i)&&!o&&!r.shouldIgnoreUnknownAttribute(a)){const u=sC(t,i),f=[];if(t.components)for(const d of t.components){const m=i.config.getShorthands(d);f.push(...Object.keys(m))}for(const[d]of Object.entries(s))if(i.getComponent(d)){const m=i.config.getShorthands(d);for(const _ of Object.keys(m))f.includes(_)||f.push(_)}const h=ly(a,t.name,u,f);console.warn(h)}}}function aC(e,t,n){const i=[],r=new Sg(e,n);function s(o){if(e.hasRecipe(o.tagName)){const a=L_(e,o.tagName,o.attributes,r),c=e.getParser(o.tagName);if(c)return c({entity:a,element:o,state:e,context:r}),{entity:a,tagName:o.tagName,children:[]};const l=[];for(const u of o.children){const f=e.getParser(u.tagName);if(f)f({entity:a,element:u,state:e,context:r});else if(e.hasRecipe(u.tagName)){const h=s(u);if(h){l.push(h);const d=h.entity,m=e.getComponent("parent"),_=e.getComponent("transform");if(m&&_){if(!e.hasComponent(a,_)){console.warn(`[${o.tagName}] Parent entity is missing Transform component. Adding automatically.
  Consider adding transform="pos: 0 0 0" to the parent element.`),e.addComponent(a,_);const p=e.config.getDefaults("transform");for(const[y,x]of Object.entries(p))y in _&&(_[y][a]=x)}if(!e.hasComponent(d,_)){console.warn(`[${u.tagName}] Child entity is missing Transform component. Adding automatically.
  Consider adding transform="pos: 0 0 0" to the child element.`),e.addComponent(d,_);const p=e.config.getDefaults("transform");for(const[y,x]of Object.entries(p))y in _&&(_[y][d]=x)}e.addComponent(d,m),m.entity[d]=a;const g=e.getComponent("body");g&&e.hasComponent(a,g)&&e.hasComponent(d,g)&&console.warn(`[Physics Warning] "${u.tagName}" has a Body component and is nested inside "${o.tagName}" which also has a Body component.
This configuration is not supported - a physics body should not be a child of another physics body.
Consider one of these solutions:
  1. Remove the Body component from the child (keep only Collider if needed)
  2. Make "${u.tagName}" a sibling of "${o.tagName}" instead of a child
  3. Use physics constraints or joints to connect separate bodies`)}}}else{const h=Array.from(e.getRecipeNames()),d=Nc(u.tagName,h);throw new Error(d+`
  Note: Components must be specified as attributes, not child elements.
  Example: <entity transform="pos: 0 5 0" renderer="shape: box"></entity>`)}}return{entity:a,tagName:o.tagName,children:l}}return null}if(t.children.length>0)for(const o of t.children){const a=s(o);if(a)i.push(a);else{const c=Array.from(e.getRecipeNames()),l=Nc(o.tagName,c);throw new Error(l)}}else{if(t.tagName==="world")return i;const o=s(t);if(o)i.push(o);else{const a=Array.from(e.getRecipeNames()),c=Nc(t.tagName,a);throw new Error(c)}}return i}let cC=class{world;time;scheduler=new ay;systems=new Set;config=new ey;headless=!1;recipes=new Map;components=new Map;plugins=[];entityNames=new Map;isDisposed=!1;constructor(t){this.world=Q0(),this.time={deltaTime:0,fixedDeltaTime:xa.FIXED_TIMESTEP,elapsed:0},this.headless=t?.headless??!1,this.registerComponent("parent",Rr),this.registerRecipe({name:"entity",components:[]})}registerPlugin(t){if(this.plugins.push(t),t.components)for(const[n,i]of Object.entries(t.components))this.registerComponent(n,i);if(t.systems)for(const n of t.systems)this.registerSystem(n);if(t.recipes)for(const n of t.recipes)this.registerRecipe(n);t.config&&this.registerConfig(t.config)}async initializePlugins(){for(const t of this.plugins)t.initialize&&await t.initialize(this)}registerSystem(t){this.systems.has(t)||this.systems.add(t)}registerRecipe(t){this.recipes.set(t.name,t)}registerComponent(t,n){const i=es(t);this.components.set(i,n)}registerConfig(t){this.config.register(t)}getParser(t){return this.config.getParser(t)}getRecipe(t){return this.recipes.get(t)}getComponent(t){return this.components.get(es(t))}hasRecipe(t){return this.recipes.has(t)}getRecipeNames(){return new Set(this.recipes.keys())}getComponentNames(){return Array.from(this.components.keys())}setEntityName(t,n){this.entityNames.set(t,n)}getEntityByName(t){return this.entityNames.get(t)??null}getEntityName(t){for(const[n,i]of this.entityNames)if(i===t)return n}getNamedEntities(){return new Map(this.entityNames)}getComponentName(t){for(const[n,i]of this.components.entries())if(i===t)return n}step(t=xa.DEFAULT_DELTA){this.checkDisposed(),this.scheduler.step(this,t)}createEntity(){return this.checkDisposed(),k0(this.world)}destroyEntity(t){this.checkDisposed(),vg(this.world,t)}exists(t){return z0(this.world,t)}addComponent(t,n,i){q0(this.world,n,t);const r=this.getComponentName(n);if(r){const s=this.config.getDefaults(r);Id(n,t,s)}i&&Id(n,t,i)}removeComponent(t,n){K0(this.world,n,t)}hasComponent(t,n){return xh(this.world,n,t)}createFromRecipe(t,n={}){return iC(this,t,n)}dispose(){if(this.isDisposed)throw new Error("[VibeGame] State already disposed");for(const t of this.systems)t.dispose?.(this);this.systems.clear(),this.isDisposed=!0}checkDisposed(){if(this.isDisposed)throw new Error("[VibeGame] Cannot use disposed State")}};const um={red:16711680,green:65280,blue:255,yellow:16776960,purple:16711935,cyan:65535,white:16777215,black:0,gray:8421504,orange:16753920,pink:16761035,lime:65280,gold:16766720},lC=/^-?\d+(\.\d+)?(\s+-?\d+(\.\d+)?)+$/,uC={parse(e){return this.isVector(e)?this.parseVector(e):this.isHexColor(e)?this.parseHexColor(e):this.isNamedColor(e)?this.parseNamedColor(e):this.isBoolean(e)?this.parseBoolean(e):this.isNumber(e)?this.parseNumber(e):e},isVector(e){return lC.test(e)},parseVector(e){const t=e.split(/\s+/).map(Number);return t.length===2?{x:t[0],y:t[1]}:t.length===3?{x:t[0],y:t[1],z:t[2]}:t.length===4?{x:t[0],y:t[1],z:t[2],w:t[3]}:t},isHexColor(e){return e.startsWith("0x")?/^0x[0-9a-fA-F]+$/.test(e):e.startsWith("#")?/^#[0-9a-fA-F]+$/.test(e):!1},parseHexColor(e){return e.startsWith("0x")?parseInt(e,16):parseInt(e.slice(1),16)},isNamedColor(e){return Object.prototype.hasOwnProperty.call(um,e.toLowerCase())},parseNamedColor(e){return um[e.toLowerCase()]},isBoolean(e){return e==="true"||e==="false"},parseBoolean(e){return e==="true"},isNumber(e){return!isNaN(parseFloat(e))},parseNumber(e){return parseFloat(e)}},fC={parse(e){const t=new DOMParser().parseFromString(e,"text/xml");if(t.documentElement.tagName==="parsererror")throw new Error("Invalid XML syntax");return{root:F_(t.documentElement)}}};function F_(e){const t={};for(let i=0;i<e.attributes.length;i++){const r=e.attributes[i];t[r.name]=uC.parse(r.value)}const n=[];for(let i=0;i<e.children.length;i++)n.push(F_(e.children[i]));return{tagName:e.tagName.toLowerCase(),attributes:t,children:n}}const li=re({shape:L.ui8,sizeX:L.f32,sizeY:L.f32,sizeZ:L.f32,color:L.ui32,visible:L.ui8,unlit:L.ui8}),ao=re({clearColor:L.ui32,hasCanvas:L.ui8}),nr=re({projection:L.ui8,fov:L.f32,orthoSize:L.f32}),da=re({skyColor:L.ui32,groundColor:L.ui32,intensity:L.f32}),wi=re({color:L.ui32,intensity:L.f32,castShadow:L.ui8,shadowMapSize:L.ui32,directionX:L.f32,directionY:L.f32,directionZ:L.f32,distance:L.f32}),Ze=re({posX:L.f32,posY:L.f32,posZ:L.f32,rotX:L.f32,rotY:L.f32,rotZ:L.f32,rotW:L.f32,eulerX:L.f32,eulerY:L.f32,eulerZ:L.f32,scaleX:L.f32,scaleY:L.f32,scaleZ:L.f32}),Et=re({posX:L.f32,posY:L.f32,posZ:L.f32,rotX:L.f32,rotY:L.f32,rotZ:L.f32,rotW:L.f32,eulerX:L.f32,eulerY:L.f32,eulerZ:L.f32,scaleX:L.f32,scaleY:L.f32,scaleZ:L.f32});function Wh(e,t){const n=o_(e.rotX[t],e.rotY[t],e.rotZ[t],e.rotW[t]);e.eulerX[t]=n.x,e.eulerY[t]=n.y,e.eulerZ[t]=n.z}function hC(e,t){const n=Hf(e.eulerX[t],e.eulerY[t],e.eulerZ[t]);e.rotX[t]=n.x,e.rotY[t]=n.y,e.rotZ[t]=n.z,e.rotW[t]=n.w}function dC(e,t,n){t.posX[n]=e.posX[n],t.posY[n]=e.posY[n],t.posZ[n]=e.posZ[n],t.rotX[n]=e.rotX[n],t.rotY[n]=e.rotY[n],t.rotZ[n]=e.rotZ[n],t.rotW[n]=e.rotW[n],t.eulerX[n]=e.eulerX[n],t.eulerY[n]=e.eulerY[n],t.eulerZ[n]=e.eulerZ[n],t.scaleX[n]=e.scaleX[n],t.scaleY[n]=e.scaleY[n],t.scaleZ[n]=e.scaleZ[n]}function fm(e,t,n,i,r,s){i.set(e.posX[t],e.posY[t],e.posZ[t]),r.set(e.rotX[t],e.rotY[t],e.rotZ[t],e.rotW[t]),s.set(e.scaleX[t],e.scaleY[t],e.scaleZ[t]),n.compose(i,r,s)}function pC(e,t,n,i,r,s){e.decompose(i,r,s),t.posX[n]=i.x,t.posY[n]=i.y,t.posZ[n]=i.z,t.rotX[n]=r.x,t.rotY[n]=r.y,t.rotZ[n]=r.z,t.rotW[n]=r.w,Wh(t,n),t.scaleX[n]=s.x,t.scaleY[n]=s.y,t.scaleZ[n]=s.z}const hm=new le,Tu=new le,Au=new j,Cu=new mi,Ru=new j,mC=ee([Ze]),gC={group:"simulation",last:!0,update:e=>{const t=mC(e.world);for(const n of t)hC(Ze,n);for(const n of t)if(e.hasComponent(n,Et)||(e.addComponent(n,Et),Et.rotX[n]=0,Et.rotY[n]=0,Et.rotZ[n]=0,Et.rotW[n]=1,Et.scaleX[n]=1,Et.scaleY[n]=1,Et.scaleZ[n]=1),!e.hasComponent(n,Rr))dC(Ze,Et,n);else{const i=Rr.entity[n];if(!e.hasComponent(i,Et))continue;fm(Et,i,Tu,Au,Cu,Ru),fm(Ze,n,hm,Au,Cu,Ru),Tu.multiply(hm),pC(Tu,Et,n,Au,Cu,Ru)}for(const n of t)e.hasComponent(n,Rr)&&e.hasComponent(n,Et)&&Wh(Et,n)}},_C=1e3,dm=5e4,vC=1e4,yC=16777215,Yf={BOX:0,SPHERE:1},xC={ORTHOGRAPHIC:1},Pl=new Map,$h=new Map;function N_(e){const t=rl.get(e)?.canvas;let n=16,i=9;return t&&t.clientWidth&&t.clientHeight?(n=t.clientWidth,i=t.clientHeight):typeof window<"u"&&(n=window.innerWidth,i=window.innerHeight),{width:n,height:i,aspect:n/i}}function SC(e,t,n,i,r){const{aspect:s}=N_(t);let o;if(n===xC.ORTHOGRAPHIC){const a=r/2,c=a*s;o=new za(-c,c,a,-a,.1,1e3)}else o=new Fn(i,s,.1,1e3);return Pl.set(e,o),o}function MC(e,t,n){const{aspect:i}=N_(n);if(e instanceof za){const r=nr.orthoSize[t]/2,s=r*i;(e.top!==r||e.right!==s)&&(e.left=-s,e.right=s,e.top=r,e.bottom=-r,e.updateProjectionMatrix())}else if(e instanceof Fn){const r=nr.fov[t];e.fov!==r&&(e.fov=r,e.updateProjectionMatrix())}}function pm(e,t){const n=e.count;for(let i=0;i<n;i++)if(e.getMatrixAt(i,t),t.elements[0]===0&&t.elements[5]===0&&t.elements[10]===0)return i;return null}function O_(e,t,n=_C){const i=new PE(e,t,n);i.instanceMatrix.setUsage(Ky),i.castShadow=!0,i.receiveShadow=!0,i.frustumCulled=!1;const r=new le;r.makeScale(0,0,0);const s=new ie(yC);for(let o=0;o<n;o++)i.setMatrixAt(o,r),i.setColorAt(o,s);return i.instanceMatrix.needsUpdate=!0,i.instanceColor&&(i.instanceColor.needsUpdate=!0),i}function bC(e,t,n,i){const r=e.count,s=r*2,o=O_(t,n,s),a=new le,c=new ie;for(let l=0;l<r;l++)e.getMatrixAt(l,a),o.setMatrixAt(l,a),e.instanceColor&&(e.getColorAt(l,c),o.setColorAt(l,c));return o.instanceMatrix.needsUpdate=!0,o.instanceColor&&(o.instanceColor.needsUpdate=!0),i.remove(e),e.dispose(),i.add(o),o}const rl=new WeakMap;function EC(){const e=new Map;return e.set(Yf.BOX,new Ro),e.set(Yf.SPHERE,new Nh(1)),e}function wC(){const e=new TE,t=new i_(11657727,12155424,1.5);e.add(t);const n=new r_(16777215,2.5);return n.castShadow=!0,n.shadow.mapSize.width=4096,n.shadow.mapSize.height=4096,e.add(n),e.add(n.target),{scene:e,meshPools:new Map,unlitMeshPools:new Map,geometries:EC(),material:new DE({metalness:0,roughness:1}),unlitMaterial:new Ml,entityInstances:new Map,lights:{ambient:t,directional:n},totalInstanceCount:0,hasShownPerformanceWarning:!1}}function Dr(e){let t=rl.get(e);return t||(t=wC(),rl.set(e,t)),t}function Ul(e){return rl.get(e)?.scene||null}function TC(e,t){$h.set(e,t)}function AC(e){return $h.get(e)}function CC(e){$h.delete(e)}function RC(e,t){const n=new wE({canvas:e,antialias:!0}),i=e.clientWidth||window.innerWidth,r=e.clientHeight||window.innerHeight;return n.setSize(i,r,!1),n.setPixelRatio(window.devicePixelRatio),n.shadowMap.enabled=!0,n.shadowMap.type=bg,t!==0&&n.setClearColor(t),n}function PC(e,t){const n=Dr(e).canvas,i=n?.clientWidth||window.innerWidth,r=n?.clientHeight||window.innerHeight,s=i/r;t.setSize(i,r,!1);for(const[,o]of Pl)if(o instanceof Fn)o.aspect=s,o.updateProjectionMatrix();else if(o instanceof za){const a=(o.top-o.bottom)/2*s;o.left=-a,o.right=a,o.updateProjectionMatrix()}}const Mr={LIGHT_DIRECTION:new j(5,10,2).normalize(),LIGHT_DISTANCE:25,CAMERA_RADIUS:50,NEAR_PLANE:1,FAR_PLANE:200},Cc=new le,mm=new j,gm=new mi,yr=new j,UC=ee([nr,Et]);function DC(e,t,n=!1){const i=n?e.unlitMeshPools:e.meshPools,r=n?e.unlitMaterial:e.material;let s=i.get(t);if(!s){const o=e.geometries.get(t);if(!o)return null;s=O_(o,r),i.set(t,s),e.scene.add(s)}return s}function IC(e,t,n,i,r=!1){let s=n.entityInstances.get(t);if(!s){let o=pm(e,Cc);if(o===null){if(n.totalInstanceCount>=dm)throw new Error(`Maximum total instances (${dm}) exceeded. Cannot render entity ${t}. Consider reducing the number of rendered objects.`);const a=li.shape[t],c=n.geometries.get(a);if(!c)return e;const l=r?n.unlitMeshPools:n.meshPools,u=r?n.unlitMaterial:n.material;if(e=bC(e,c,u,n.scene),l.set(a,e),o=pm(e,Cc),o===null)return e}s={poolId:li.shape[t],instanceId:o,unlit:r},n.entityInstances.set(t,s),n.totalInstanceCount++,!n.hasShownPerformanceWarning&&n.totalInstanceCount>=vC&&(console.warn(`Performance warning: ${n.totalInstanceCount} rendered instances. Consider optimizing your scene or reducing object count for better performance.`),n.hasShownPerformanceWarning=!0)}if(i.hasComponent(t,Et)){if(mm.set(Et.posX[t],Et.posY[t],Et.posZ[t]),gm.set(Et.rotX[t],Et.rotY[t],Et.rotZ[t],Et.rotW[t]),yr.set(Et.scaleX[t],Et.scaleY[t],Et.scaleZ[t]),s.poolId===Yf.SPHERE){const a=li.sizeX[t]/2;yr.x*=a,yr.y*=a,yr.z*=a}else yr.x*=li.sizeX[t],yr.y*=li.sizeY[t],yr.z*=li.sizeZ[t];Cc.compose(mm,gm,yr),e.setMatrixAt(s.instanceId,Cc),e.instanceMatrix.needsUpdate=!0;const o=new ie(li.color[t]);e.setColorAt(s.instanceId,o),e.instanceColor&&(e.instanceColor.needsUpdate=!0)}return e}function _m(e,t,n){const i=n.entityInstances.get(t);if(i){const r=new le;r.makeScale(0,0,0),e.setMatrixAt(i.instanceId,r),e.instanceMatrix.needsUpdate=!0}}function LC(e,t){const n=UC(t.world);let i=null;for(const l of n){i=l;break}if(i===null)return;const r=e.lights.directional;if(!r)return;const s=new j(Et.posX[i],Et.posY[i],Et.posZ[i]),o=r.shadow.camera,a=s.clone().add(Mr.LIGHT_DIRECTION.clone().multiplyScalar(Mr.LIGHT_DISTANCE));r.position.copy(a),r.target.position.copy(s),r.target.updateMatrixWorld();const c=Mr.CAMERA_RADIUS;o.left=-c,o.right=c,o.top=c,o.bottom=-c,o.near=Mr.NEAR_PLANE,o.far=Mr.FAR_PLANE,o.position.copy(a),o.lookAt(s),o.updateProjectionMatrix(),o.updateMatrixWorld()}const FC=ee([li]),NC=ee([da]),OC=ee([wi]),k_=ee([nr,Et]),kC=ee([nr]),vm=ee([ao]),zC={group:"draw",update(e){if(e.headless)return;const t=Dr(e);for(const[i,r]of t.entityInstances)if(!e.exists(i)){const s=(r.unlit?t.unlitMeshPools:t.meshPools).get(r.poolId);s&&_m(s,i,t),t.entityInstances.delete(i),t.totalInstanceCount--}const n=FC(e.world);for(const i of n){const r=li.unlit[i]===1;let s=DC(t,li.shape[i],r);if(s){if(li.visible[i]!==1){_m(s,i,t);continue}s=IC(s,i,t,e,r)}}LC(t,e)}},BC={group:"draw",update(e){if(e.headless)return;const t=Dr(e),n=Ul(e);if(!n)return;const i=NC(e.world);for(const s of i){let o=t.lights.ambient;o||(o=new i_,n.add(o),t.lights.ambient=o),o.color.setHex(da.skyColor[s]),o.groundColor.setHex(da.groundColor[s]),o.intensity=da.intensity[s]}const r=OC(e.world);for(const s of r){let o=t.lights.directional;o||(o=new r_,o.castShadow=!0,n.add(o),n.add(o.target),t.lights.directional=o),o.color.setHex(wi.color[s]),o.intensity=wi.intensity[s],wi.castShadow[s]===1?(o.castShadow=!0,o.shadow.mapSize.width=wi.shadowMapSize[s],o.shadow.mapSize.height=wi.shadowMapSize[s]):o.castShadow=!1;const a=k_(e.world);let c=null;for(const l of a){c=l;break}if(c!==null){const l=new j(Et.posX[c],Et.posY[c],Et.posZ[c]),u=new j(wi.directionX[s],wi.directionY[s],wi.directionZ[s]).normalize(),f=l.clone().add(u.multiplyScalar(wi.distance[s]));o.position.copy(f),o.target.position.copy(l),o.target.updateMatrixWorld();const h=o.shadow.camera,d=Mr.CAMERA_RADIUS;h.left=-d,h.right=d,h.top=d,h.bottom=-d,h.near=Mr.NEAR_PLANE,h.far=Mr.FAR_PLANE,h.position.copy(f),h.lookAt(l),h.updateProjectionMatrix(),h.updateMatrixWorld()}}}},GC={group:"draw",update(e){if(e.headless)return;const t=k_(e.world);for(const n of t){let i=Pl.get(n);i||(i=SC(n,e,nr.projection[n],nr.fov[n],nr.orthoSize[n])),i.position.set(Et.posX[n],Et.posY[n],Et.posZ[n]),i.quaternion.set(Et.rotX[n],Et.rotY[n],Et.rotZ[n],Et.rotW[n]),MC(i,n,e)}}},VC={group:"draw",last:!0,setup(e){if(e.headless)return;const t=vm(e.world);if(t.length===0)return;const n=t[0],i=AC(n);if(!i)return;const r=ao.clearColor[n],s=RC(i,r),o=Dr(e);o.renderer=s,o.canvas=i,window.addEventListener("resize",()=>PC(e,s))},update(e){if(e.headless)return;const t=Dr(e);if(!t.renderer)return;const n=Ul(e);if(!n)return;const i=kC(e.world);if(i.length===0)return;const r=i[0],s=Pl.get(r);s&&t.renderer.render(n,s)},dispose(e){if(e.headless)return;const t=Dr(e);t.renderer&&(t.renderer.dispose(),t.renderer=void 0,t.canvas=void 0);const n=vm(e.world);for(const i of n)CC(i)}},Ie=re({moveX:L.f32,moveY:L.f32,moveZ:L.f32,lookX:L.f32,lookY:L.f32,scrollDelta:L.f32,jump:L.ui8,primaryAction:L.ui8,secondaryAction:L.ui8,leftMouse:L.ui8,rightMouse:L.ui8,middleMouse:L.ui8,jumpBufferTime:L.f32,primaryBufferTime:L.f32,secondaryBufferTime:L.f32}),Ei={mappings:{moveForward:["KeyW","ArrowUp"],moveBackward:["KeyS","ArrowDown"],moveLeft:["KeyA","ArrowLeft"],moveRight:["KeyD","ArrowRight"],moveUp:["KeyE"],moveDown:["KeyQ"]},bufferWindow:100,mouseSensitivity:{look:.5,scroll:.01}},Ke={keys:new Set,mouseButtons:new Set,mouseDeltaX:0,mouseDeltaY:0,scrollDelta:0},Le={jump:{lastPressTime:0,lastReleaseTime:0,lastConsumeTime:0,isPressed:!1},primary:{lastPressTime:0,lastReleaseTime:0,lastConsumeTime:0,isPressed:!1},secondary:{lastPressTime:0,lastReleaseTime:0,lastConsumeTime:0,isPressed:!1}};let Zf=null,Bi=null;function z_(e){return e instanceof HTMLCanvasElement?Zf===null||e===Zf:!1}function B_(e){return e instanceof HTMLCanvasElement&&e===Bi}function G_(e){Bi&&(Ke.keys.add(e.code),e.code==="Space"&&(e.preventDefault(),Le.jump.isPressed||(Le.jump.lastPressTime=performance.now(),Le.jump.isPressed=!0)))}function V_(e){Bi&&(Ke.keys.delete(e.code),e.code==="Space"&&(Le.jump.lastReleaseTime=performance.now(),Le.jump.isPressed=!1))}function HC(e){Ke.mouseButtons.add(e.button),e.button===0&&!Le.primary.isPressed?(Le.primary.lastPressTime=performance.now(),Le.primary.isPressed=!0):e.button===2&&(e.preventDefault(),Le.secondary.isPressed||(Le.secondary.lastPressTime=performance.now(),Le.secondary.isPressed=!0))}function WC(e){Ke.mouseButtons.delete(e.button),e.button===0?(Le.primary.lastReleaseTime=performance.now(),Le.primary.isPressed=!1):e.button===2&&(Le.secondary.lastReleaseTime=performance.now(),Le.secondary.isPressed=!1)}function $C(e){Ke.mouseDeltaX+=e.movementX,Ke.mouseDeltaY+=e.movementY}function XC(e){Ke.scrollDelta+=e.deltaY*Ei.mouseSensitivity.scroll,e.preventDefault()}function YC(e){e.preventDefault()}function H_(e){z_(e.target)&&(Bi=e.target)}function W_(e){e.target===Bi&&(Bi=null,jf())}function $_(e){z_(e.target)&&(e.target.tabIndex=e.target.tabIndex===-1?0:e.target.tabIndex,e.target.focus(),HC(e))}function X_(e){Bi&&WC(e)}function Y_(e){B_(e.target)&&$C(e)}function Z_(e){B_(e.target)&&XC(e)}function j_(e){Bi&&YC(e)}function ZC(){typeof window>"u"||(document.addEventListener("mousedown",$_,!0),document.addEventListener("mouseup",X_,!0),document.addEventListener("mousemove",Y_,!0),document.addEventListener("wheel",Z_,{passive:!1,capture:!0}),document.addEventListener("contextmenu",j_,!0),document.addEventListener("focusin",H_,!0),document.addEventListener("focusout",W_,!0),window.addEventListener("keydown",G_),window.addEventListener("keyup",V_))}function jC(){typeof window>"u"||(document.removeEventListener("mousedown",$_,!0),document.removeEventListener("mouseup",X_,!0),document.removeEventListener("mousemove",Y_,!0),document.removeEventListener("wheel",Z_,!0),document.removeEventListener("contextmenu",j_,!0),document.removeEventListener("focusin",H_,!0),document.removeEventListener("focusout",W_,!0),window.removeEventListener("keydown",G_),window.removeEventListener("keyup",V_),Zf=null,Bi=null)}function Pu(e,t){let n=0;for(const i of e)Ke.keys.has(i)&&(n+=1);for(const i of t)Ke.keys.has(i)&&(n-=1);return n}function Uu(e,t){const n=performance.now();return e.lastPressTime<=e.lastConsumeTime?!1:n-e.lastPressTime<=t}function qC(e){const t=Ei.mouseSensitivity;Ie.moveX[e]=Pu(Ei.mappings.moveRight,Ei.mappings.moveLeft),Ie.moveY[e]=Pu(Ei.mappings.moveForward,Ei.mappings.moveBackward),Ie.moveZ[e]=Pu(Ei.mappings.moveUp,Ei.mappings.moveDown),Ie.lookX[e]=Ke.mouseDeltaX*t.look,Ie.lookY[e]=Ke.mouseDeltaY*t.look,Ie.scrollDelta[e]=Ke.scrollDelta,Ie.jump[e]=Uu(Le.jump,Ei.bufferWindow)?1:0,Ie.primaryAction[e]=Uu(Le.primary,Ei.bufferWindow)?1:0,Ie.secondaryAction[e]=Uu(Le.secondary,Ei.bufferWindow)?1:0,Ie.leftMouse[e]=Ke.mouseButtons.has(0)?1:0,Ie.rightMouse[e]=Ke.mouseButtons.has(2)?1:0,Ie.middleMouse[e]=Ke.mouseButtons.has(1)?1:0,Ie.jumpBufferTime[e]=Le.jump.lastPressTime,Ie.primaryBufferTime[e]=Le.primary.lastPressTime,Ie.secondaryBufferTime[e]=Le.secondary.lastPressTime}function q_(){Ke.mouseDeltaX=0,Ke.mouseDeltaY=0,Ke.scrollDelta=0}function jf(){Ke.keys.clear(),Ke.mouseButtons.clear(),q_();const e=performance.now();Le.jump={lastPressTime:0,lastReleaseTime:e,lastConsumeTime:e,isPressed:!1},Le.primary={lastPressTime:0,lastReleaseTime:e,lastConsumeTime:e,isPressed:!1},Le.secondary={lastPressTime:0,lastReleaseTime:e,lastConsumeTime:e,isPressed:!1}}function KC(){return Bi}const JC=ee([Ie]),QC={group:"simulation",setup:()=>{ZC(),jf()},update:e=>{const t=KC(),n=Dr(e);if(!t||!n.canvas||n.canvas!==t)return;const i=JC(e.world);for(const r of i)qC(r);q_()},dispose:()=>{jC(),jf()}},tR={name:"renderer",components:["transform","renderer"]},eR={recipes:[tR],systems:[zC,BC,GC,VC],components:{Renderer:li,RenderContext:ao,MainCamera:nr,AmbientLight:da,DirectionalLight:wi},config:{defaults:{ambientLight:{skyColor:8900331,groundColor:4868682,intensity:.6},directionalLight:{color:16777215,intensity:1,castShadow:1,shadowMapSize:4096,directionX:-1,directionY:2,directionZ:-1,distance:30},renderer:{visible:1,sizeX:1,sizeY:1,sizeZ:1,color:16777215,unlit:0},mainCamera:{projection:0,fov:75,orthoSize:10}},enums:{renderer:{shape:{box:0,sphere:1}},mainCamera:{projection:{perspective:0,orthographic:1}}}}},nR={systems:[gC],components:{Transform:Ze,WorldTransform:Et},config:{defaults:{transform:{rotW:1,scaleX:1,scaleY:1,scaleZ:1},"world-transform":{rotW:1,scaleX:1,scaleY:1,scaleZ:1}},validations:[{condition:(e,t)=>"world-transform"in t,warning:`"world-transform" is read-only.
  Use "transform" for local transforms, or "body" for physics objects`}]}};var ar=(e=>(e[e.Additive=0]="Additive",e[e.Multiplicative=1]="Multiplicative",e))(ar||{});const rn=re({target:L.eid,value:L.f32,intensity:L.f32,mode:L.ui8}),Je=re({duration:L.f32,elapsed:L.f32,easingIndex:L.ui8}),Ee=re({source:L.ui32,target:L.ui32,componentId:L.ui32,fieldIndex:L.ui32,from:L.f32,to:L.f32,value:L.f32}),Ue=re({tweenEntity:L.ui32,targetEntity:L.ui32,axis:L.ui8,from:L.f32,to:L.f32,lastPosition:L.f32,targetPosition:L.f32}),De=re({tweenEntity:L.ui32,targetEntity:L.ui32,axis:L.ui8,from:L.f32,to:L.f32,lastRotation:L.f32,targetRotation:L.f32});var cr=(e=>(e[e.Idle=0]="Idle",e[e.Playing=1]="Playing",e))(cr||{});const de=re({state:L.ui8,currentIndex:L.ui32,itemCount:L.ui32,pauseRemaining:L.f32});var He=(e=>(e[e.Position=0]="Position",e[e.Scale=1]="Scale",e[e.Rotation=2]="Rotation",e))(He||{}),_e=(e=>(e[e.X=1]="X",e[e.Y=2]="Y",e[e.Z=4]="Z",e[e.XY=3]="XY",e[e.XZ=5]="XZ",e[e.YZ=6]="YZ",e[e.XYZ=7]="XYZ",e))(_e||{});const fe=re({target:L.eid,type:L.ui8,axes:L.ui8,value:L.f32,intensity:L.f32,mode:L.ui8});function Ki(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function K_(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var ei={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},yo={duration:.5,overwrite:!1,delay:0},Xh,gn,Fe,fi=1e8,Ae=1/fi,qf=Math.PI*2,iR=qf/4,rR=0,J_=Math.sqrt,sR=Math.cos,oR=Math.sin,sn=function(e){return typeof e=="string"},Ge=function(e){return typeof e=="function"},lr=function(e){return typeof e=="number"},Yh=function(e){return typeof e>"u"},Gi=function(e){return typeof e=="object"},kn=function(e){return e!==!1},Zh=function(){return typeof window<"u"},Rc=function(e){return Ge(e)||sn(e)},Q_=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},bn=Array.isArray,Kf=/(?:-?\.?\d|\.)+/gi,tv=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Qs=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Du=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,ev=/[+-]=-?[.\d]+/,nv=/[^,'"\[\]\s]+/gi,aR=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Oe,Ii,Jf,jh,ii={},sl={},iv,rv=function(e){return(sl=xo(e,ii))&&Vn},qh=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Aa=function(e,t){return!t&&console.warn(e)},sv=function(e,t){return e&&(ii[e]=t)&&sl&&(sl[e]=t)||ii},Ca=function(){return 0},cR={suppressEvents:!0,isStart:!0,kill:!1},Hc={suppressEvents:!0,kill:!1},lR={suppressEvents:!0},Kh={},Ir=[],Qf={},ov,qn={},Iu={},ym=30,Wc=[],Jh="",Qh=function(e){var t=e[0],n,i;if(Gi(t)||Ge(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=Wc.length;i--&&!Wc[i].targetTest(t););n=Wc[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new Pv(e[i],n)))||e.splice(i,1);return e},us=function(e){return e._gsap||Qh(hi(e))[0]._gsap},av=function(e,t,n){return(n=e[t])&&Ge(n)?e[t]():Yh(n)&&e.getAttribute&&e.getAttribute(t)||n},zn=function(e,t){return(e=e.split(",")).forEach(t)||e},We=function(e){return Math.round(e*1e5)/1e5||0},qe=function(e){return Math.round(e*1e7)/1e7||0},co=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},uR=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},ol=function(){var e=Ir.length,t=Ir.slice(0),n,i;for(Qf={},Ir.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},td=function(e){return!!(e._initted||e._startAt||e.add)},cv=function(e,t,n,i){Ir.length&&!gn&&ol(),e.render(t,n,!!(gn&&t<0&&td(e))),Ir.length&&!gn&&ol()},lv=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(nv).length<2?t:sn(e)?e.trim():e},uv=function(e){return e},ri=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},fR=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},xo=function(e,t){for(var n in t)e[n]=t[n];return e},xm=function e(t,n){for(var i in n)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(t[i]=Gi(n[i])?e(t[i]||(t[i]={}),n[i]):n[i]);return t},al=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},pa=function(e){var t=e.parent||Oe,n=e.keyframes?fR(bn(e.keyframes)):ri;if(kn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},hR=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},fv=function(e,t,n,i,r){var s=e[i],o;if(r)for(o=t[r];s&&s[r]>o;)s=s._prev;return s?(t._next=s._next,s._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=s,t.parent=t._dp=e,t},Dl=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var r=t._prev,s=t._next;r?r._next=s:e[n]===t&&(e[n]=s),s?s._prev=r:e[i]===t&&(e[i]=r),t._next=t._prev=t.parent=null},Or=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},fs=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},dR=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},th=function(e,t,n,i){return e._startAt&&(gn?e._startAt.revert(Hc):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},pR=function e(t){return!t||t._ts&&e(t.parent)},Sm=function(e){return e._repeat?So(e._tTime,e=e.duration()+e._rDelay)*e:0},So=function(e,t){var n=Math.floor(e=qe(e/t));return e&&n===e?n-1:n},cl=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Il=function(e){return e._end=qe(e._start+(e._tDur/Math.abs(e._ts||e._rts||Ae)||0))},Ll=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=qe(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Il(e),n._dirty||fs(n,e)),e},hv=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=cl(e.rawTime(),t),(!t._dur||Ha(0,t.totalDuration(),n)-t._tTime>Ae)&&t.render(n,!0)),fs(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Ae}},Fi=function(e,t,n,i){return t.parent&&Or(t),t._start=qe((lr(n)?n:n||e!==Oe?ai(e,n,t):e._time)+t._delay),t._end=qe(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),fv(e,t,"_first","_last",e._sort?"_start":0),eh(t)||(e._recent=t),i||hv(e,t),e._ts<0&&Ll(e,e._tTime),e},dv=function(e,t){return(ii.ScrollTrigger||qh("scrollTrigger",t))&&ii.ScrollTrigger.create(t,e)},pv=function(e,t,n,i,r){if(nd(e,t,r),!e._initted)return 1;if(!n&&e._pt&&!gn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&ov!==Kn.frame)return Ir.push(e),e._lazy=[r,i],1},mR=function e(t){var n=t.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||e(n))},eh=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},gR=function(e,t,n,i){var r=e.ratio,s=t<0||!t&&(!e._start&&mR(e)&&!(!e._initted&&eh(e))||(e._ts<0||e._dp._ts<0)&&!eh(e))?0:1,o=e._rDelay,a=0,c,l,u;if(o&&e._repeat&&(a=Ha(0,e._tDur,t),l=So(a,o),e._yoyo&&l&1&&(s=1-s),l!==So(e._tTime,o)&&(r=1-s,e.vars.repeatRefresh&&e._initted&&e.invalidate())),s!==r||gn||i||e._zTime===Ae||!t&&e._zTime){if(!e._initted&&pv(e,t,i,n,a))return;for(u=e._zTime,e._zTime=t||(n?Ae:0),n||(n=t&&!u),e.ratio=s,e._from&&(s=1-s),e._time=0,e._tTime=a,c=e._pt;c;)c.r(s,c.d),c=c._next;t<0&&th(e,t,n,!0),e._onUpdate&&!n&&Jn(e,"onUpdate"),a&&e._repeat&&!n&&e.parent&&Jn(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===s&&(s&&Or(e,1),!n&&!gn&&(Jn(e,s?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},_R=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},Mo=function(e,t,n,i){var r=e._repeat,s=qe(t)||0,o=e._tTime/e._tDur;return o&&!i&&(e._time*=s/e._dur),e._dur=s,e._tDur=r?r<0?1e10:qe(s*(r+1)+e._rDelay*r):s,o>0&&!i&&Ll(e,e._tTime=e._tDur*o),e.parent&&Il(e),n||fs(e.parent,e),e},Mm=function(e){return e instanceof Tn?fs(e):Mo(e,e._dur)},vR={_start:0,endTime:Ca,totalDuration:Ca},ai=function e(t,n,i){var r=t.labels,s=t._recent||vR,o=t.duration()>=fi?s.endTime(!1):t._dur,a,c,l;return sn(n)&&(isNaN(n)||n in r)?(c=n.charAt(0),l=n.substr(-1)==="%",a=n.indexOf("="),c==="<"||c===">"?(a>=0&&(n=n.replace(/=/,"")),(c==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(n.substr(1))||0)*(l?(a<0?s:i).totalDuration()/100:1)):a<0?(n in r||(r[n]=o),r[n]):(c=parseFloat(n.charAt(a-1)+n.substr(a+1)),l&&i&&(c=c/100*(bn(i)?i[0]:i).totalDuration()),a>1?e(t,n.substr(0,a-1),i)+c:o+c)):n==null?o:+n},ma=function(e,t,n){var i=lr(t[1]),r=(i?2:1)+(e<2?0:1),s=t[r],o,a;if(i&&(s.duration=t[1]),s.parent=n,e){for(o=s,a=n;a&&!("immediateRender"in o);)o=a.vars.defaults||{},a=kn(a.vars.inherit)&&a.parent;s.immediateRender=kn(o.immediateRender),e<2?s.runBackwards=1:s.startAt=t[r-1]}return new je(t[0],s,t[r+1])},Gr=function(e,t){return e||e===0?t(e):t},Ha=function(e,t,n){return n<e?e:n>t?t:n},Sn=function(e,t){return!sn(e)||!(t=aR.exec(e))?"":t[1]},yR=function(e,t,n){return Gr(n,function(i){return Ha(e,t,i)})},nh=[].slice,mv=function(e,t){return e&&Gi(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Gi(e[0]))&&!e.nodeType&&e!==Ii},xR=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var r;return sn(i)&&!t||mv(i,1)?(r=n).push.apply(r,hi(i)):n.push(i)})||n},hi=function(e,t,n){return Fe&&!t&&Fe.selector?Fe.selector(e):sn(e)&&!n&&(Jf||!bo())?nh.call((t||jh).querySelectorAll(e),0):bn(e)?xR(e,n):mv(e)?nh.call(e,0):e?[e]:[]},ih=function(e){return e=hi(e)[0]||Aa("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return hi(t,n.querySelectorAll?n:n===e?Aa("Invalid scope")||jh.createElement("div"):e)}},gv=function(e){return e.sort(function(){return .5-Math.random()})},_v=function(e){if(Ge(e))return e;var t=Gi(e)?e:{each:e},n=hs(t.ease),i=t.from||0,r=parseFloat(t.base)||0,s={},o=i>0&&i<1,a=isNaN(i)||o,c=t.axis,l=i,u=i;return sn(i)?l=u={center:.5,edges:.5,end:1}[i]||0:!o&&a&&(l=i[0],u=i[1]),function(f,h,d){var m=(d||t).length,_=s[m],g,p,y,x,v,T,b,w,C;if(!_){if(C=t.grid==="auto"?0:(t.grid||[1,fi])[1],!C){for(b=-fi;b<(b=d[C++].getBoundingClientRect().left)&&C<m;);C<m&&C--}for(_=s[m]=[],g=a?Math.min(C,m)*l-.5:i%C,p=C===fi?0:a?m*u/C-.5:i/C|0,b=0,w=fi,T=0;T<m;T++)y=T%C-g,x=p-(T/C|0),_[T]=v=c?Math.abs(c==="y"?x:y):J_(y*y+x*x),v>b&&(b=v),v<w&&(w=v);i==="random"&&gv(_),_.max=b-w,_.min=w,_.v=m=(parseFloat(t.amount)||parseFloat(t.each)*(C>m?m-1:c?c==="y"?m/C:C:Math.max(C,m/C))||0)*(i==="edges"?-1:1),_.b=m<0?r-m:r,_.u=Sn(t.amount||t.each)||0,n=n&&m<0?Av(n):n}return m=(_[f]-_.min)/_.max||0,qe(_.b+(n?n(m):m)*_.v)+_.u}},rh=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=qe(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(lr(n)?0:Sn(n))}},vv=function(e,t){var n=bn(e),i,r;return!n&&Gi(e)&&(i=n=e.radius||fi,e.values?(e=hi(e.values),(r=!lr(e[0]))&&(i*=i)):e=rh(e.increment)),Gr(t,n?Ge(e)?function(s){return r=e(s),Math.abs(r-s)<=i?r:s}:function(s){for(var o=parseFloat(r?s.x:s),a=parseFloat(r?s.y:0),c=fi,l=0,u=e.length,f,h;u--;)r?(f=e[u].x-o,h=e[u].y-a,f=f*f+h*h):f=Math.abs(e[u]-o),f<c&&(c=f,l=u);return l=!i||c<=i?e[l]:s,r||l===s||lr(s)?l:l+Sn(s)}:rh(e))},yv=function(e,t,n,i){return Gr(bn(e)?!t:n===!0?!!(n=0):!i,function(){return bn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},SR=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(r,s){return s(r)},i)}},MR=function(e,t){return function(n){return e(parseFloat(n))+(t||Sn(n))}},bR=function(e,t,n){return Sv(e,t,0,1,n)},xv=function(e,t,n){return Gr(n,function(i){return e[~~t(i)]})},ER=function e(t,n,i){var r=n-t;return bn(t)?xv(t,e(0,t.length),n):Gr(i,function(s){return(r+(s-t)%r)%r+t})},wR=function e(t,n,i){var r=n-t,s=r*2;return bn(t)?xv(t,e(0,t.length-1),n):Gr(i,function(o){return o=(s+(o-t)%s)%s||0,t+(o>r?s-o:o)})},Ra=function(e){for(var t=0,n="",i,r,s,o;~(i=e.indexOf("random(",t));)s=e.indexOf(")",i),o=e.charAt(i+7)==="[",r=e.substr(i+7,s-i-7).match(o?nv:Kf),n+=e.substr(t,i-t)+yv(o?r:+r[0],o?0:+r[1],+r[2]||1e-5),t=s+1;return n+e.substr(t,e.length-t)},Sv=function(e,t,n,i,r){var s=t-e,o=i-n;return Gr(r,function(a){return n+((a-e)/s*o||0)})},TR=function e(t,n,i,r){var s=isNaN(t+n)?0:function(d){return(1-d)*t+d*n};if(!s){var o=sn(t),a={},c,l,u,f,h;if(i===!0&&(r=1)&&(i=null),o)t={p:t},n={p:n};else if(bn(t)&&!bn(n)){for(u=[],f=t.length,h=f-2,l=1;l<f;l++)u.push(e(t[l-1],t[l]));f--,s=function(d){d*=f;var m=Math.min(h,~~d);return u[m](d-m)},i=n}else r||(t=xo(bn(t)?[]:{},t));if(!u){for(c in n)ed.call(a,t,c,"get",n[c]);s=function(d){return sd(d,a)||(o?t.p:t)}}}return Gr(i,s)},bm=function(e,t,n){var i=e.labels,r=fi,s,o,a;for(s in i)o=i[s]-t,o<0==!!n&&o&&r>(o=Math.abs(o))&&(a=s,r=o);return a},Jn=function(e,t,n){var i=e.vars,r=i[t],s=Fe,o=e._ctx,a,c,l;if(r)return a=i[t+"Params"],c=i.callbackScope||e,n&&Ir.length&&ol(),o&&(Fe=o),l=a?r.apply(c,a):r.call(c),Fe=s,l},ra=function(e){return Or(e),e.scrollTrigger&&e.scrollTrigger.kill(!!gn),e.progress()<1&&Jn(e,"onInterrupt"),e},to,Mv=[],bv=function(e){if(e)if(e=!e.name&&e.default||e,Zh()||e.headless){var t=e.name,n=Ge(e),i=t&&!n&&e.init?function(){this._props=[]}:e,r={init:Ca,render:sd,add:ed,kill:VR,modifier:GR,rawVars:0},s={targetTest:0,get:0,getSetter:rd,aliases:{},register:0};if(bo(),e!==i){if(qn[t])return;ri(i,ri(al(e,r),s)),xo(i.prototype,xo(r,al(e,s))),qn[i.prop=t]=i,e.targetTest&&(Wc.push(i),Kh[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}sv(t,i),e.register&&e.register(Vn,i,Bn)}else Mv.push(e)},Te=255,sa={aqua:[0,Te,Te],lime:[0,Te,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Te],navy:[0,0,128],white:[Te,Te,Te],olive:[128,128,0],yellow:[Te,Te,0],orange:[Te,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Te,0,0],pink:[Te,192,203],cyan:[0,Te,Te],transparent:[Te,Te,Te,0]},Lu=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Te+.5|0},Ev=function(e,t,n){var i=e?lr(e)?[e>>16,e>>8&Te,e&Te]:0:sa.black,r,s,o,a,c,l,u,f,h,d;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),sa[e])i=sa[e];else if(e.charAt(0)==="#"){if(e.length<6&&(r=e.charAt(1),s=e.charAt(2),o=e.charAt(3),e="#"+r+r+s+s+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Te,i&Te,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Te,e&Te]}else if(e.substr(0,3)==="hsl"){if(i=d=e.match(Kf),!t)a=+i[0]%360/360,c=+i[1]/100,l=+i[2]/100,s=l<=.5?l*(c+1):l+c-l*c,r=l*2-s,i.length>3&&(i[3]*=1),i[0]=Lu(a+1/3,r,s),i[1]=Lu(a,r,s),i[2]=Lu(a-1/3,r,s);else if(~e.indexOf("="))return i=e.match(tv),n&&i.length<4&&(i[3]=1),i}else i=e.match(Kf)||sa.transparent;i=i.map(Number)}return t&&!d&&(r=i[0]/Te,s=i[1]/Te,o=i[2]/Te,u=Math.max(r,s,o),f=Math.min(r,s,o),l=(u+f)/2,u===f?a=c=0:(h=u-f,c=l>.5?h/(2-u-f):h/(u+f),a=u===r?(s-o)/h+(s<o?6:0):u===s?(o-r)/h+2:(r-s)/h+4,a*=60),i[0]=~~(a+.5),i[1]=~~(c*100+.5),i[2]=~~(l*100+.5)),n&&i.length<4&&(i[3]=1),i},wv=function(e){var t=[],n=[],i=-1;return e.split(Lr).forEach(function(r){var s=r.match(Qs)||[];t.push.apply(t,s),n.push(i+=s.length+1)}),t.c=n,t},Em=function(e,t,n){var i="",r=(e+i).match(Lr),s=t?"hsla(":"rgba(",o=0,a,c,l,u;if(!r)return e;if(r=r.map(function(f){return(f=Ev(f,t,1))&&s+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(l=wv(e),a=n.c,a.join(i)!==l.c.join(i)))for(c=e.replace(Lr,"1").split(Qs),u=c.length-1;o<u;o++)i+=c[o]+(~a.indexOf(o)?r.shift()||s+"0,0,0,0)":(l.length?l:r.length?r:n).shift());if(!c)for(c=e.split(Lr),u=c.length-1;o<u;o++)i+=c[o]+r[o];return i+c[u]},Lr=(function(){var e="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in sa)e+="|"+t+"\\b";return new RegExp(e+")","gi")})(),AR=/hsl[a]?\(/,Tv=function(e){var t=e.join(" "),n;if(Lr.lastIndex=0,Lr.test(t))return n=AR.test(t),e[1]=Em(e[1],n),e[0]=Em(e[0],n,wv(e[1])),!0},Pa,Kn=(function(){var e=Date.now,t=500,n=33,i=e(),r=i,s=1e3/240,o=s,a=[],c,l,u,f,h,d,m=function _(g){var p=e()-r,y=g===!0,x,v,T,b;if((p>t||p<0)&&(i+=p-n),r+=p,T=r-i,x=T-o,(x>0||y)&&(b=++f.frame,h=T-f.time*1e3,f.time=T=T/1e3,o+=x+(x>=s?4:s-x),v=1),y||(c=l(_)),v)for(d=0;d<a.length;d++)a[d](T,h,b,g)};return f={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(_){return h/(1e3/(_||60))},wake:function(){iv&&(!Jf&&Zh()&&(Ii=Jf=window,jh=Ii.document||{},ii.gsap=Vn,(Ii.gsapVersions||(Ii.gsapVersions=[])).push(Vn.version),rv(sl||Ii.GreenSockGlobals||!Ii.gsap&&Ii||{}),Mv.forEach(bv)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,c&&f.sleep(),l=u||function(_){return setTimeout(_,o-f.time*1e3+1|0)},Pa=1,m(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),Pa=0,l=Ca},lagSmoothing:function(_,g){t=_||1/0,n=Math.min(g||33,t)},fps:function(_){s=1e3/(_||240),o=f.time*1e3+s},add:function(_,g,p){var y=g?function(x,v,T,b){_(x,v,T,b),f.remove(y)}:_;return f.remove(_),a[p?"unshift":"push"](y),bo(),y},remove:function(_,g){~(g=a.indexOf(_))&&a.splice(g,1)&&d>=g&&d--},_listeners:a},f})(),bo=function(){return!Pa&&Kn.wake()},ce={},CR=/^[\d.\-M][\d.\-,\s]/,RR=/["']/g,PR=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],r=1,s=n.length,o,a,c;r<s;r++)a=n[r],o=r!==s-1?a.lastIndexOf(","):a.length,c=a.substr(0,o),t[i]=isNaN(c)?c.replace(RR,"").trim():+c,i=a.substr(o+1).trim();return t},UR=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},DR=function(e){var t=(e+"").split("("),n=ce[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[PR(t[1])]:UR(e).split(",").map(lv)):ce._CE&&CR.test(e)?ce._CE("",e):n},Av=function(e){return function(t){return 1-e(1-t)}},Cv=function e(t,n){for(var i=t._first,r;i;)i instanceof Tn?e(i,n):i.vars.yoyoEase&&(!i._yoyo||!i._repeat)&&i._yoyo!==n&&(i.timeline?e(i.timeline,n):(r=i._ease,i._ease=i._yEase,i._yEase=r,i._yoyo=n)),i=i._next},hs=function(e,t){return e&&(Ge(e)?e:ce[e]||DR(e))||t},As=function(e,t,n,i){n===void 0&&(n=function(o){return 1-t(1-o)}),i===void 0&&(i=function(o){return o<.5?t(o*2)/2:1-t((1-o)*2)/2});var r={easeIn:t,easeOut:n,easeInOut:i},s;return zn(e,function(o){ce[o]=ii[o]=r,ce[s=o.toLowerCase()]=n;for(var a in r)ce[s+(a==="easeIn"?".in":a==="easeOut"?".out":".inOut")]=ce[o+"."+a]=r[a]}),r},Rv=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Fu=function e(t,n,i){var r=n>=1?n:1,s=(i||(t?.3:.45))/(n<1?n:1),o=s/qf*(Math.asin(1/r)||0),a=function(l){return l===1?1:r*Math.pow(2,-10*l)*oR((l-o)*s)+1},c=t==="out"?a:t==="in"?function(l){return 1-a(1-l)}:Rv(a);return s=qf/s,c.config=function(l,u){return e(t,l,u)},c},Nu=function e(t,n){n===void 0&&(n=1.70158);var i=function(s){return s?--s*s*((n+1)*s+n)+1:0},r=t==="out"?i:t==="in"?function(s){return 1-i(1-s)}:Rv(i);return r.config=function(s){return e(t,s)},r};zn("Linear,Quad,Cubic,Quart,Quint,Strong",function(e,t){var n=t<5?t+1:t;As(e+",Power"+(n-1),t?function(i){return Math.pow(i,n)}:function(i){return i},function(i){return 1-Math.pow(1-i,n)},function(i){return i<.5?Math.pow(i*2,n)/2:1-Math.pow((1-i)*2,n)/2})});ce.Linear.easeNone=ce.none=ce.Linear.easeIn;As("Elastic",Fu("in"),Fu("out"),Fu());(function(e,t){var n=1/t,i=2*n,r=2.5*n,s=function(o){return o<n?e*o*o:o<i?e*Math.pow(o-1.5/t,2)+.75:o<r?e*(o-=2.25/t)*o+.9375:e*Math.pow(o-2.625/t,2)+.984375};As("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);As("Expo",function(e){return Math.pow(2,10*(e-1))*e+e*e*e*e*e*e*(1-e)});As("Circ",function(e){return-(J_(1-e*e)-1)});As("Sine",function(e){return e===1?1:-sR(e*iR)+1});As("Back",Nu("in"),Nu("out"),Nu());ce.SteppedEase=ce.steps=ii.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),r=t?1:0,s=1-Ae;return function(o){return((i*Ha(0,s,o)|0)+r)*n}}};yo.ease=ce["quad.out"];zn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(e){return Jh+=e+","+e+"Params,"});var Pv=function(e,t){this.id=rR++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:av,this.set=t?t.getSetter:rd},Ua=(function(){function e(n){this.vars=n,this._delay=+n.delay||0,(this._repeat=n.repeat===1/0?-2:n.repeat||0)&&(this._rDelay=n.repeatDelay||0,this._yoyo=!!n.yoyo||!!n.yoyoEase),this._ts=1,Mo(this,+n.duration,1,1),this.data=n.data,Fe&&(this._ctx=Fe,Fe.data.push(this)),Pa||Kn.wake()}var t=e.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,Mo(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(bo(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(Ll(this,n),!r._dp||r.parent||hv(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Fi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===Ae||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),cv(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Sm(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Sm(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*r,i):this._repeat?So(this._tTime,r)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-Ae?0:this._rts;if(this._rts===n)return this;var r=this.parent&&this._ts?cl(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Ae?0:this._rts,this.totalTime(Ha(-Math.abs(this._delay),this.totalDuration(),r),i!==!1),Il(this),dR(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(bo(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Ae&&(this._tTime-=Ae)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Fi(i,this,n-this._delay),this}return this._start},t.endTime=function(n){return this._start+(kn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?cl(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=lR);var i=gn;return gn=n,td(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),gn=i,this},t.globalTime=function(n){for(var i=this,r=arguments.length?n:i.rawTime();i;)r=i._start+r/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):r},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Mm(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Mm(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(ai(this,n),kn(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,kn(i)),this._dur||(this._zTime=-Ae),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Ae:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-Ae,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,r;return!!(!n||this._ts&&this._initted&&n.isActive()&&(r=n.rawTime(!0))>=i&&r<this.endTime(!0)-Ae)},t.eventCallback=function(n,i,r){var s=this.vars;return arguments.length>1?(i?(s[n]=i,r&&(s[n+"Params"]=r),n==="onUpdate"&&(this._onUpdate=i)):delete s[n],this):s[n]},t.then=function(n){var i=this;return new Promise(function(r){var s=Ge(n)?n:uv,o=function(){var a=i.then;i.then=null,Ge(s)&&(s=s(i))&&(s.then||s===i)&&(i.then=a),r(s),i.then=a};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?o():i._prom=o})},t.kill=function(){ra(this)},e})();ri(Ua.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Ae,_prom:0,_ps:!1,_rts:1});var Tn=(function(e){K_(t,e);function t(i,r){var s;return i===void 0&&(i={}),s=e.call(this,i)||this,s.labels={},s.smoothChildTiming=!!i.smoothChildTiming,s.autoRemoveChildren=!!i.autoRemoveChildren,s._sort=kn(i.sortChildren),Oe&&Fi(i.parent||Oe,Ki(s),r),i.reversed&&s.reverse(),i.paused&&s.paused(!0),i.scrollTrigger&&dv(Ki(s),i.scrollTrigger),s}var n=t.prototype;return n.to=function(i,r,s){return ma(0,arguments,this),this},n.from=function(i,r,s){return ma(1,arguments,this),this},n.fromTo=function(i,r,s,o){return ma(2,arguments,this),this},n.set=function(i,r,s){return r.duration=0,r.parent=this,pa(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new je(i,r,ai(this,s),1),this},n.call=function(i,r,s){return Fi(this,je.delayedCall(0,i,r),s)},n.staggerTo=function(i,r,s,o,a,c,l){return s.duration=r,s.stagger=s.stagger||o,s.onComplete=c,s.onCompleteParams=l,s.parent=this,new je(i,s,ai(this,a)),this},n.staggerFrom=function(i,r,s,o,a,c,l){return s.runBackwards=1,pa(s).immediateRender=kn(s.immediateRender),this.staggerTo(i,r,s,o,a,c,l)},n.staggerFromTo=function(i,r,s,o,a,c,l,u){return o.startAt=s,pa(o).immediateRender=kn(o.immediateRender),this.staggerTo(i,r,o,a,c,l,u)},n.render=function(i,r,s){var o=this._time,a=this._dirty?this.totalDuration():this._tDur,c=this._dur,l=i<=0?0:qe(i),u=this._zTime<0!=i<0&&(this._initted||!c),f,h,d,m,_,g,p,y,x,v,T,b;if(this!==Oe&&l>a&&i>=0&&(l=a),l!==this._tTime||s||u){if(o!==this._time&&c&&(l+=this._time-o,i+=this._time-o),f=l,x=this._start,y=this._ts,g=!y,u&&(c||(o=this._zTime),(i||!r)&&(this._zTime=i)),this._repeat){if(T=this._yoyo,_=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(_*100+i,r,s);if(f=qe(l%_),l===a?(m=this._repeat,f=c):(v=qe(l/_),m=~~v,m&&m===v&&(f=c,m--),f>c&&(f=c)),v=So(this._tTime,_),!o&&this._tTime&&v!==m&&this._tTime-v*_-this._dur<=0&&(v=m),T&&m&1&&(f=c-f,b=1),m!==v&&!this._lock){var w=T&&v&1,C=w===(T&&m&1);if(m<v&&(w=!w),o=w?0:l%c?c:l,this._lock=1,this.render(o||(b?0:qe(m*_)),r,!c)._lock=0,this._tTime=l,!r&&this.parent&&Jn(this,"onRepeat"),this.vars.repeatRefresh&&!b&&(this.invalidate()._lock=1),o&&o!==this._time||g!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,a=this._tDur,C&&(this._lock=2,o=w?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!b&&this.invalidate()),this._lock=0,!this._ts&&!g)return this;Cv(this,b)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(p=_R(this,qe(o),qe(f)),p&&(l-=f-(f=p._start))),this._tTime=l,this._time=f,this._act=!y,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&l&&!r&&!v&&(Jn(this,"onStart"),this._tTime!==l))return this;if(f>=o&&i>=0)for(h=this._first;h;){if(d=h._next,(h._act||f>=h._start)&&h._ts&&p!==h){if(h.parent!==this)return this.render(i,r,s);if(h.render(h._ts>0?(f-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(f-h._start)*h._ts,r,s),f!==this._time||!this._ts&&!g){p=0,d&&(l+=this._zTime=-Ae);break}}h=d}else{h=this._last;for(var M=i<0?i:f;h;){if(d=h._prev,(h._act||M<=h._end)&&h._ts&&p!==h){if(h.parent!==this)return this.render(i,r,s);if(h.render(h._ts>0?(M-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(M-h._start)*h._ts,r,s||gn&&td(h)),f!==this._time||!this._ts&&!g){p=0,d&&(l+=this._zTime=M?-Ae:Ae);break}}h=d}}if(p&&!r&&(this.pause(),p.render(f>=o?0:-Ae)._zTime=f>=o?1:-1,this._ts))return this._start=x,Il(this),this.render(i,r,s);this._onUpdate&&!r&&Jn(this,"onUpdate",!0),(l===a&&this._tTime>=this.totalDuration()||!l&&o)&&(x===this._start||Math.abs(y)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(l===a&&this._ts>0||!l&&this._ts<0)&&Or(this,1),!r&&!(i<0&&!o)&&(l||o||!a)&&(Jn(this,l===a&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(l<a&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(i,r){var s=this;if(lr(r)||(r=ai(this,r,i)),!(i instanceof Ua)){if(bn(i))return i.forEach(function(o){return s.add(o,r)}),this;if(sn(i))return this.addLabel(i,r);if(Ge(i))i=je.delayedCall(0,i);else return this}return this!==i?Fi(this,i,r):this},n.getChildren=function(i,r,s,o){i===void 0&&(i=!0),r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=-fi);for(var a=[],c=this._first;c;)c._start>=o&&(c instanceof je?r&&a.push(c):(s&&a.push(c),i&&a.push.apply(a,c.getChildren(!0,r,s)))),c=c._next;return a},n.getById=function(i){for(var r=this.getChildren(1,1,1),s=r.length;s--;)if(r[s].vars.id===i)return r[s]},n.remove=function(i){return sn(i)?this.removeLabel(i):Ge(i)?this.killTweensOf(i):(i.parent===this&&Dl(this,i),i===this._recent&&(this._recent=this._last),fs(this))},n.totalTime=function(i,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=qe(Kn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),e.prototype.totalTime.call(this,i,r),this._forcing=0,this):this._tTime},n.addLabel=function(i,r){return this.labels[i]=ai(this,r),this},n.removeLabel=function(i){return delete this.labels[i],this},n.addPause=function(i,r,s){var o=je.delayedCall(0,r||Ca,s);return o.data="isPause",this._hasPause=1,Fi(this,o,ai(this,i))},n.removePause=function(i){var r=this._first;for(i=ai(this,i);r;)r._start===i&&r.data==="isPause"&&Or(r),r=r._next},n.killTweensOf=function(i,r,s){for(var o=this.getTweensOf(i,s),a=o.length;a--;)wr!==o[a]&&o[a].kill(i,r);return this},n.getTweensOf=function(i,r){for(var s=[],o=hi(i),a=this._first,c=lr(r),l;a;)a instanceof je?uR(a._targets,o)&&(c?(!wr||a._initted&&a._ts)&&a.globalTime(0)<=r&&a.globalTime(a.totalDuration())>r:!r||a.isActive())&&s.push(a):(l=a.getTweensOf(o,r)).length&&s.push.apply(s,l),a=a._next;return s},n.tweenTo=function(i,r){r=r||{};var s=this,o=ai(s,i),a=r,c=a.startAt,l=a.onStart,u=a.onStartParams,f=a.immediateRender,h,d=je.to(s,ri({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:r.duration||Math.abs((o-(c&&"time"in c?c.time:s._time))/s.timeScale())||Ae,onStart:function(){if(s.pause(),!h){var m=r.duration||Math.abs((o-(c&&"time"in c?c.time:s._time))/s.timeScale());d._dur!==m&&Mo(d,m,0,1).render(d._time,!0,!0),h=1}l&&l.apply(d,u||[])}},r));return f?d.render(0):d},n.tweenFromTo=function(i,r,s){return this.tweenTo(r,ri({startAt:{time:ai(this,i)}},s))},n.recent=function(){return this._recent},n.nextLabel=function(i){return i===void 0&&(i=this._time),bm(this,ai(this,i))},n.previousLabel=function(i){return i===void 0&&(i=this._time),bm(this,ai(this,i),1)},n.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+Ae)},n.shiftChildren=function(i,r,s){s===void 0&&(s=0);for(var o=this._first,a=this.labels,c;o;)o._start>=s&&(o._start+=i,o._end+=i),o=o._next;if(r)for(c in a)a[c]>=s&&(a[c]+=i);return fs(this)},n.invalidate=function(i){var r=this._first;for(this._lock=0;r;)r.invalidate(i),r=r._next;return e.prototype.invalidate.call(this,i)},n.clear=function(i){i===void 0&&(i=!0);for(var r=this._first,s;r;)s=r._next,this.remove(r),r=s;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),fs(this)},n.totalDuration=function(i){var r=0,s=this,o=s._last,a=fi,c,l,u;if(arguments.length)return s.timeScale((s._repeat<0?s.duration():s.totalDuration())/(s.reversed()?-i:i));if(s._dirty){for(u=s.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),l=o._start,l>a&&s._sort&&o._ts&&!s._lock?(s._lock=1,Fi(s,o,l-o._delay,1)._lock=0):a=l,l<0&&o._ts&&(r-=l,(!u&&!s._dp||u&&u.smoothChildTiming)&&(s._start+=l/s._ts,s._time-=l,s._tTime-=l),s.shiftChildren(-l,!1,-1/0),a=0),o._end>r&&o._ts&&(r=o._end),o=c;Mo(s,s===Oe&&s._time>r?s._time:r,1,1),s._dirty=0}return s._tDur},t.updateRoot=function(i){if(Oe._ts&&(cv(Oe,cl(i,Oe)),ov=Kn.frame),Kn.frame>=ym){ym+=ei.autoSleep||120;var r=Oe._first;if((!r||!r._ts)&&ei.autoSleep&&Kn._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||Kn.sleep()}}},t})(Ua);ri(Tn.prototype,{_lock:0,_hasPause:0,_forcing:0});var IR=function(e,t,n,i,r,s,o){var a=new Bn(this._pt,e,t,0,1,Nv,null,r),c=0,l=0,u,f,h,d,m,_,g,p;for(a.b=n,a.e=i,n+="",i+="",(g=~i.indexOf("random("))&&(i=Ra(i)),s&&(p=[n,i],s(p,e,t),n=p[0],i=p[1]),f=n.match(Du)||[];u=Du.exec(i);)d=u[0],m=i.substring(c,u.index),h?h=(h+1)%5:m.substr(-5)==="rgba("&&(h=1),d!==f[l++]&&(_=parseFloat(f[l-1])||0,a._pt={_next:a._pt,p:m||l===1?m:",",s:_,c:d.charAt(1)==="="?co(_,d)-_:parseFloat(d)-_,m:h&&h<4?Math.round:0},c=Du.lastIndex);return a.c=c<i.length?i.substring(c,i.length):"",a.fp=o,(ev.test(i)||g)&&(a.e=0),this._pt=a,a},ed=function(e,t,n,i,r,s,o,a,c,l){Ge(i)&&(i=i(r||0,e,s));var u=e[t],f=n!=="get"?n:Ge(u)?c?e[t.indexOf("set")||!Ge(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():u,h=Ge(u)?c?kR:Lv:id,d;if(sn(i)&&(~i.indexOf("random(")&&(i=Ra(i)),i.charAt(1)==="="&&(d=co(f,i)+(Sn(f)||0),(d||d===0)&&(i=d))),!l||f!==i||sh)return!isNaN(f*i)&&i!==""?(d=new Bn(this._pt,e,t,+f||0,i-(f||0),typeof u=="boolean"?BR:Fv,0,h),c&&(d.fp=c),o&&d.modifier(o,this,e),this._pt=d):(!u&&!(t in e)&&qh(t,i),IR.call(this,e,t,f,i,h,a||ei.stringFilter,c))},LR=function(e,t,n,i,r){if(Ge(e)&&(e=ga(e,r,t,n,i)),!Gi(e)||e.style&&e.nodeType||bn(e)||Q_(e))return sn(e)?ga(e,r,t,n,i):e;var s={},o;for(o in e)s[o]=ga(e[o],r,t,n,i);return s},Uv=function(e,t,n,i,r,s){var o,a,c,l;if(qn[e]&&(o=new qn[e]).init(r,o.rawVars?t[e]:LR(t[e],i,r,s,n),n,i,s)!==!1&&(n._pt=a=new Bn(n._pt,r,e,0,1,o.render,o,0,o.priority),n!==to))for(c=n._ptLookup[n._targets.indexOf(r)],l=o._props.length;l--;)c[o._props[l]]=a;return o},wr,sh,nd=function e(t,n,i){var r=t.vars,s=r.ease,o=r.startAt,a=r.immediateRender,c=r.lazy,l=r.onUpdate,u=r.runBackwards,f=r.yoyoEase,h=r.keyframes,d=r.autoRevert,m=t._dur,_=t._startAt,g=t._targets,p=t.parent,y=p&&p.data==="nested"?p.vars.targets:g,x=t._overwrite==="auto"&&!Xh,v=t.timeline,T,b,w,C,M,S,U,P,D,I,V,O,tt;if(v&&(!h||!s)&&(s="none"),t._ease=hs(s,yo.ease),t._yEase=f?Av(hs(f===!0?s:f,yo.ease)):0,f&&t._yoyo&&!t._repeat&&(f=t._yEase,t._yEase=t._ease,t._ease=f),t._from=!v&&!!r.runBackwards,!v||h&&!r.stagger){if(P=g[0]?us(g[0]).harness:0,O=P&&r[P.prop],T=al(r,Kh),_&&(_._zTime<0&&_.progress(1),n<0&&u&&a&&!d?_.render(-1,!0):_.revert(u&&m?Hc:cR),_._lazy=0),o){if(Or(t._startAt=je.set(g,ri({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!_&&kn(c),startAt:null,delay:0,onUpdate:l&&function(){return Jn(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,n<0&&(gn||!a&&!d)&&t._startAt.revert(Hc),a&&m&&n<=0&&i<=0){n&&(t._zTime=n);return}}else if(u&&m&&!_){if(n&&(a=!1),w=ri({overwrite:!1,data:"isFromStart",lazy:a&&!_&&kn(c),immediateRender:a,stagger:0,parent:p},T),O&&(w[P.prop]=O),Or(t._startAt=je.set(g,w)),t._startAt._dp=0,t._startAt._sat=t,n<0&&(gn?t._startAt.revert(Hc):t._startAt.render(-1,!0)),t._zTime=n,!a)e(t._startAt,Ae,Ae);else if(!n)return}for(t._pt=t._ptCache=0,c=m&&kn(c)||c&&!m,b=0;b<g.length;b++){if(M=g[b],U=M._gsap||Qh(g)[b]._gsap,t._ptLookup[b]=I={},Qf[U.id]&&Ir.length&&ol(),V=y===g?b:y.indexOf(M),P&&(D=new P).init(M,O||T,t,V,y)!==!1&&(t._pt=C=new Bn(t._pt,M,D.name,0,1,D.render,D,0,D.priority),D._props.forEach(function(H){I[H]=C}),D.priority&&(S=1)),!P||O)for(w in T)qn[w]&&(D=Uv(w,T,t,V,M,y))?D.priority&&(S=1):I[w]=C=ed.call(t,M,w,"get",T[w],V,y,0,r.stringFilter);t._op&&t._op[b]&&t.kill(M,t._op[b]),x&&t._pt&&(wr=t,Oe.killTweensOf(M,I,t.globalTime(n)),tt=!t.parent,wr=0),t._pt&&c&&(Qf[U.id]=1)}S&&Ov(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!tt,h&&n<=0&&v.render(fi,!0,!0)},FR=function(e,t,n,i,r,s,o,a){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],l,u,f,h;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,h=e._targets.length;h--;){if(l=f[h][t],l&&l.d&&l.d._pt)for(l=l.d._pt;l&&l.p!==t&&l.fp!==t;)l=l._next;if(!l)return sh=1,e.vars[t]="+=0",nd(e,o),sh=0,a?Aa(t+" not eligible for reset"):1;c.push(l)}for(h=c.length;h--;)u=c[h],l=u._pt||u,l.s=(i||i===0)&&!r?i:l.s+(i||0)+s*l.c,l.c=n-l.s,u.e&&(u.e=We(n)+Sn(u.e)),u.b&&(u.b=l.s+Sn(u.b))},NR=function(e,t){var n=e[0]?us(e[0]).harness:0,i=n&&n.aliases,r,s,o,a;if(!i)return t;r=xo({},t);for(s in i)if(s in r)for(a=i[s].split(","),o=a.length;o--;)r[a[o]]=r[s];return r},OR=function(e,t,n,i){var r=t.ease||i||"power1.inOut",s,o;if(bn(t))o=n[e]||(n[e]=[]),t.forEach(function(a,c){return o.push({t:c/(t.length-1)*100,v:a,e:r})});else for(s in t)o=n[s]||(n[s]=[]),s==="ease"||o.push({t:parseFloat(e),v:t[s],e:r})},ga=function(e,t,n,i,r){return Ge(e)?e.call(t,n,i,r):sn(e)&&~e.indexOf("random(")?Ra(e):e},Dv=Jh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Iv={};zn(Dv+",id,stagger,delay,duration,paused,scrollTrigger",function(e){return Iv[e]=1});var je=(function(e){K_(t,e);function t(i,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=e.call(this,o?r:pa(r))||this;var c=a.vars,l=c.duration,u=c.delay,f=c.immediateRender,h=c.stagger,d=c.overwrite,m=c.keyframes,_=c.defaults,g=c.scrollTrigger,p=c.yoyoEase,y=r.parent||Oe,x=(bn(i)||Q_(i)?lr(i[0]):"length"in r)?[i]:hi(i),v,T,b,w,C,M,S,U;if(a._targets=x.length?Qh(x):Aa("GSAP target "+i+" not found. https://gsap.com",!ei.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,m||h||Rc(l)||Rc(u)){if(r=a.vars,v=a.timeline=new Tn({data:"nested",defaults:_||{},targets:y&&y.data==="nested"?y.vars.targets:x}),v.kill(),v.parent=v._dp=Ki(a),v._start=0,h||Rc(l)||Rc(u)){if(w=x.length,S=h&&_v(h),Gi(h))for(C in h)~Dv.indexOf(C)&&(U||(U={}),U[C]=h[C]);for(T=0;T<w;T++)b=al(r,Iv),b.stagger=0,p&&(b.yoyoEase=p),U&&xo(b,U),M=x[T],b.duration=+ga(l,Ki(a),T,M,x),b.delay=(+ga(u,Ki(a),T,M,x)||0)-a._delay,!h&&w===1&&b.delay&&(a._delay=u=b.delay,a._start+=u,b.delay=0),v.to(M,b,S?S(T,M,x):0),v._ease=ce.none;v.duration()?l=u=0:a.timeline=0}else if(m){pa(ri(v.vars.defaults,{ease:"none"})),v._ease=hs(m.ease||r.ease||"none");var P=0,D,I,V;if(bn(m))m.forEach(function(O){return v.to(x,O,">")}),v.duration();else{b={};for(C in m)C==="ease"||C==="easeEach"||OR(C,m[C],b,m.easeEach);for(C in b)for(D=b[C].sort(function(O,tt){return O.t-tt.t}),P=0,T=0;T<D.length;T++)I=D[T],V={ease:I.e,duration:(I.t-(T?D[T-1].t:0))/100*l},V[C]=I.v,v.to(x,V,P),P+=V.duration;v.duration()<l&&v.to({},{duration:l-v.duration()})}}l||a.duration(l=v.duration())}else a.timeline=0;return d===!0&&!Xh&&(wr=Ki(a),Oe.killTweensOf(x),wr=0),Fi(y,Ki(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(f||!l&&!m&&a._start===qe(y._time)&&kn(f)&&pR(Ki(a))&&y.data!=="nested")&&(a._tTime=-Ae,a.render(Math.max(0,-u)||0)),g&&dv(Ki(a),g),a}var n=t.prototype;return n.render=function(i,r,s){var o=this._time,a=this._tDur,c=this._dur,l=i<0,u=i>a-Ae&&!l?a:i<Ae?0:i,f,h,d,m,_,g,p,y,x;if(!c)gR(this,i,r,s);else if(u!==this._tTime||!i||s||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==l||this._lazy){if(f=u,y=this.timeline,this._repeat){if(m=c+this._rDelay,this._repeat<-1&&l)return this.totalTime(m*100+i,r,s);if(f=qe(u%m),u===a?(d=this._repeat,f=c):(_=qe(u/m),d=~~_,d&&d===_?(f=c,d--):f>c&&(f=c)),g=this._yoyo&&d&1,g&&(x=this._yEase,f=c-f),_=So(this._tTime,m),f===o&&!s&&this._initted&&d===_)return this._tTime=u,this;d!==_&&(y&&this._yEase&&Cv(y,g),this.vars.repeatRefresh&&!g&&!this._lock&&f!==m&&this._initted&&(this._lock=s=1,this.render(qe(m*d),!0).invalidate()._lock=0))}if(!this._initted){if(pv(this,l?i:f,s,r,u))return this._tTime=0,this;if(o!==this._time&&!(s&&this.vars.repeatRefresh&&d!==_))return this;if(c!==this._dur)return this.render(i,r,s)}if(this._tTime=u,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=p=(x||this._ease)(f/c),this._from&&(this.ratio=p=1-p),!o&&u&&!r&&!_&&(Jn(this,"onStart"),this._tTime!==u))return this;for(h=this._pt;h;)h.r(p,h.d),h=h._next;y&&y.render(i<0?i:y._dur*y._ease(f/this._dur),r,s)||this._startAt&&(this._zTime=i),this._onUpdate&&!r&&(l&&th(this,i,r,s),Jn(this,"onUpdate")),this._repeat&&d!==_&&this.vars.onRepeat&&!r&&this.parent&&Jn(this,"onRepeat"),(u===this._tDur||!u)&&this._tTime===u&&(l&&!this._onUpdate&&th(this,i,!0,!0),(i||!c)&&(u===this._tDur&&this._ts>0||!u&&this._ts<0)&&Or(this,1),!r&&!(l&&!o)&&(u||o||g)&&(Jn(this,u===a?"onComplete":"onReverseComplete",!0),this._prom&&!(u<a&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),e.prototype.invalidate.call(this,i)},n.resetTo=function(i,r,s,o,a){Pa||Kn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),l;return this._initted||nd(this,c),l=this._ease(c/this._dur),FR(this,i,r,s,o,l,c,a)?this.resetTo(i,r,s,o,1):(Ll(this,0),this.parent||fv(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},n.kill=function(i,r){if(r===void 0&&(r="all"),!i&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?ra(this):this.scrollTrigger&&this.scrollTrigger.kill(!!gn),this;if(this.timeline){var s=this.timeline.totalDuration();return this.timeline.killTweensOf(i,r,wr&&wr.vars.overwrite!==!0)._first||ra(this),this.parent&&s!==this.timeline.totalDuration()&&Mo(this,this._dur*this.timeline._tDur/s,0,1),this}var o=this._targets,a=i?hi(i):o,c=this._ptLookup,l=this._pt,u,f,h,d,m,_,g;if((!r||r==="all")&&hR(o,a))return r==="all"&&(this._pt=0),ra(this);for(u=this._op=this._op||[],r!=="all"&&(sn(r)&&(m={},zn(r,function(p){return m[p]=1}),r=m),r=NR(o,r)),g=o.length;g--;)if(~a.indexOf(o[g])){f=c[g],r==="all"?(u[g]=r,d=f,h={}):(h=u[g]=u[g]||{},d=r);for(m in d)_=f&&f[m],_&&((!("kill"in _.d)||_.d.kill(m)===!0)&&Dl(this,_,"_pt"),delete f[m]),h!=="all"&&(h[m]=1)}return this._initted&&!this._pt&&l&&ra(this),this},t.to=function(i,r){return new t(i,r,arguments[2])},t.from=function(i,r){return ma(1,arguments)},t.delayedCall=function(i,r,s,o){return new t(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:r,onReverseComplete:r,onCompleteParams:s,onReverseCompleteParams:s,callbackScope:o})},t.fromTo=function(i,r,s){return ma(2,arguments)},t.set=function(i,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new t(i,r)},t.killTweensOf=function(i,r,s){return Oe.killTweensOf(i,r,s)},t})(Ua);ri(je.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});zn("staggerTo,staggerFrom,staggerFromTo",function(e){je[e]=function(){var t=new Tn,n=nh.call(arguments,0);return n.splice(e==="staggerFromTo"?5:4,0,0),t[e].apply(t,n)}});var id=function(e,t,n){return e[t]=n},Lv=function(e,t,n){return e[t](n)},kR=function(e,t,n,i){return e[t](i.fp,n)},zR=function(e,t,n){return e.setAttribute(t,n)},rd=function(e,t){return Ge(e[t])?Lv:Yh(e[t])&&e.setAttribute?zR:id},Fv=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},BR=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Nv=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},sd=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},GR=function(e,t,n,i){for(var r=this._pt,s;r;)s=r._next,r.p===i&&r.modifier(e,t,n),r=s},VR=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?Dl(this,t,"_pt"):t.dep||(n=1),t=i;return!n},HR=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},Ov=function(e){for(var t=e._pt,n,i,r,s;t;){for(n=t._next,i=r;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:s)?t._prev._next=t:r=t,(t._next=i)?i._prev=t:s=t,t=n}e._pt=r},Bn=(function(){function e(n,i,r,s,o,a,c,l,u){this.t=i,this.s=s,this.c=o,this.p=r,this.r=a||Fv,this.d=c||this,this.set=l||id,this.pr=u||0,this._next=n,n&&(n._prev=this)}var t=e.prototype;return t.modifier=function(n,i,r){this.mSet=this.mSet||this.set,this.set=HR,this.m=n,this.mt=r,this.tween=i},e})();zn(Jh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(e){return Kh[e]=1});ii.TweenMax=ii.TweenLite=je;ii.TimelineLite=ii.TimelineMax=Tn;Oe=new Tn({sortChildren:!1,defaults:yo,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});ei.stringFilter=Tv;var ds=[],$c={},WR=[],wm=0,$R=0,Ou=function(e){return($c[e]||WR).map(function(t){return t()})},oh=function(){var e=Date.now(),t=[];e-wm>2&&(Ou("matchMediaInit"),ds.forEach(function(n){var i=n.queries,r=n.conditions,s,o,a,c;for(o in i)s=Ii.matchMedia(i[o]).matches,s&&(a=1),s!==r[o]&&(r[o]=s,c=1);c&&(n.revert(),a&&t.push(n))}),Ou("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),wm=e,Ou("matchMedia"))},kv=(function(){function e(n,i){this.selector=i&&ih(i),this.data=[],this._r=[],this.isReverted=!1,this.id=$R++,n&&this.add(n)}var t=e.prototype;return t.add=function(n,i,r){Ge(n)&&(r=i,i=n,n=Ge);var s=this,o=function(){var a=Fe,c=s.selector,l;return a&&a!==s&&a.data.push(s),r&&(s.selector=ih(r)),Fe=s,l=i.apply(s,arguments),Ge(l)&&s._r.push(l),Fe=a,s.selector=c,s.isReverted=!1,l};return s.last=o,n===Ge?o(s,function(a){return s.add(null,a)}):n?s[n]=o:o},t.ignore=function(n){var i=Fe;Fe=null,n(this),Fe=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof e?n.push.apply(n,i.getTweens()):i instanceof je&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var r=this;if(n?(function(){for(var o=r.getTweens(),a=r.data.length,c;a--;)c=r.data[a],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(l){return o.splice(o.indexOf(l),1)}));for(o.map(function(l){return{g:l._dur||l._delay||l._sat&&!l._sat.vars.immediateRender?l.globalTime(0):-1/0,t:l}}).sort(function(l,u){return u.g-l.g||-1/0}).forEach(function(l){return l.t.revert(n)}),a=r.data.length;a--;)c=r.data[a],c instanceof Tn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof je)&&c.revert&&c.revert(n);r._r.forEach(function(l){return l(n,r)}),r.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i)for(var s=ds.length;s--;)ds[s].id===this.id&&ds.splice(s,1)},t.revert=function(n){this.kill(n||{})},e})(),XR=(function(){function e(n){this.contexts=[],this.scope=n,Fe&&Fe.data.push(this)}var t=e.prototype;return t.add=function(n,i,r){Gi(n)||(n={matches:n});var s=new kv(0,r||this.scope),o=s.conditions={},a,c,l;Fe&&!s.selector&&(s.selector=Fe.selector),this.contexts.push(s),i=s.add("onMatch",i),s.queries=n;for(c in n)c==="all"?l=1:(a=Ii.matchMedia(n[c]),a&&(ds.indexOf(s)<0&&ds.push(s),(o[c]=a.matches)&&(l=1),a.addListener?a.addListener(oh):a.addEventListener("change",oh)));return l&&i(s,function(u){return s.add(null,u)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},e})(),ll={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return bv(i)})},timeline:function(e){return new Tn(e)},getTweensOf:function(e,t){return Oe.getTweensOf(e,t)},getProperty:function(e,t,n,i){sn(e)&&(e=hi(e)[0]);var r=us(e||{}).get,s=n?uv:lv;return n==="native"&&(n=""),e&&(t?s((qn[t]&&qn[t].get||r)(e,t,n,i)):function(o,a,c){return s((qn[o]&&qn[o].get||r)(e,o,a,c))})},quickSetter:function(e,t,n){if(e=hi(e),e.length>1){var i=e.map(function(l){return Vn.quickSetter(l,t,n)}),r=i.length;return function(l){for(var u=r;u--;)i[u](l)}}e=e[0]||{};var s=qn[t],o=us(e),a=o.harness&&(o.harness.aliases||{})[t]||t,c=s?function(l){var u=new s;to._pt=0,u.init(e,n?l+n:l,to,0,[e]),u.render(1,u),to._pt&&sd(1,to)}:o.set(e,a);return s?c:function(l){return c(e,a,n?l+n:l,o,1)}},quickTo:function(e,t,n){var i,r=Vn.to(e,ri((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),s=function(o,a,c){return r.resetTo(t,o,a,c)};return s.tween=r,s},isTweening:function(e){return Oe.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=hs(e.ease,yo.ease)),xm(yo,e||{})},config:function(e){return xm(ei,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,r=e.defaults,s=e.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!qn[o]&&!ii[o]&&Aa(t+" effect requires "+o+" plugin.")}),Iu[t]=function(o,a,c){return n(hi(o),ri(a||{},r),c)},s&&(Tn.prototype[t]=function(o,a,c){return this.add(Iu[t](o,Gi(a)?a:(c=a)&&{},this),c)})},registerEase:function(e,t){ce[e]=hs(t)},parseEase:function(e,t){return arguments.length?hs(e,t):ce},getById:function(e){return Oe.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new Tn(e),i,r;for(n.smoothChildTiming=kn(e.smoothChildTiming),Oe.remove(n),n._dp=0,n._time=n._tTime=Oe._time,i=Oe._first;i;)r=i._next,(t||!(!i._dur&&i instanceof je&&i.vars.onComplete===i._targets[0]))&&Fi(n,i,i._start-i._delay),i=r;return Fi(Oe,n,0),n},context:function(e,t){return e?new kv(e,t):Fe},matchMedia:function(e){return new XR(e)},matchMediaRefresh:function(){return ds.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||oh()},addEventListener:function(e,t){var n=$c[e]||($c[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=$c[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:ER,wrapYoyo:wR,distribute:_v,random:yv,snap:vv,normalize:bR,getUnit:Sn,clamp:yR,splitColor:Ev,toArray:hi,selector:ih,mapRange:Sv,pipe:SR,unitize:MR,interpolate:TR,shuffle:gv},install:rv,effects:Iu,ticker:Kn,updateRoot:Tn.updateRoot,plugins:qn,globalTimeline:Oe,core:{PropTween:Bn,globals:sv,Tween:je,Timeline:Tn,Animation:Ua,getCache:us,_removeLinkedListItem:Dl,reverting:function(){return gn},context:function(e){return e&&Fe&&(Fe.data.push(e),e._ctx=Fe),Fe},suppressOverwrites:function(e){return Xh=e}}};zn("to,from,fromTo,delayedCall,set,killTweensOf",function(e){return ll[e]=je[e]});Kn.add(Tn.updateRoot);to=ll.to({},{duration:0});var YR=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},ZR=function(e,t){var n=e._targets,i,r,s;for(i in t)for(r=n.length;r--;)s=e._ptLookup[r][i],s&&(s=s.d)&&(s._pt&&(s=YR(s,i)),s&&s.modifier&&s.modifier(t[i],e,n[r],i))},ku=function(e,t){return{name:e,headless:1,rawVars:1,init:function(n,i,r){r._onInit=function(s){var o,a;if(sn(i)&&(o={},zn(i,function(c){return o[c]=1}),i=o),t){o={};for(a in i)o[a]=t(i[a]);i=o}ZR(s,i)}}}},Vn=ll.registerPlugin({name:"attr",init:function(e,t,n,i,r){var s,o,a;this.tween=n;for(s in t)a=e.getAttribute(s)||"",o=this.add(e,"setAttribute",(a||0)+"",t[s],i,r,0,0,s),o.op=s,o.b=a,this._props.push(s)},render:function(e,t){for(var n=t._pt;n;)gn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},ku("roundProps",rh),ku("modifiers"),ku("snap",vv))||ll;je.version=Tn.version=Vn.version="3.13.0";iv=1;Zh()&&bo();ce.Power0;ce.Power1;ce.Power2;ce.Power3;ce.Power4;ce.Linear;ce.Quad;ce.Cubic;ce.Quart;ce.Quint;ce.Strong;ce.Elastic;ce.Back;ce.SteppedEase;ce.Bounce;ce.Sine;ce.Expo;ce.Circ;var Tm,Tr,lo,od,cs,Am,ad,jR=function(){return typeof window<"u"},ur={},ts=180/Math.PI,uo=Math.PI/180,Ys=Math.atan2,Cm=1e8,cd=/([A-Z])/g,qR=/(left|right|width|margin|padding|x)/i,KR=/[\s,\(]\S/,ki={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},ah=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},JR=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},QR=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},t3=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},zv=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Bv=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},e3=function(e,t,n){return e.style[t]=n},n3=function(e,t,n){return e.style.setProperty(t,n)},i3=function(e,t,n){return e._gsap[t]=n},r3=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},s3=function(e,t,n,i,r){var s=e._gsap;s.scaleX=s.scaleY=n,s.renderTransform(r,s)},o3=function(e,t,n,i,r){var s=e._gsap;s[t]=n,s.renderTransform(r,s)},ke="transform",Gn=ke+"Origin",a3=function e(t,n){var i=this,r=this.target,s=r.style,o=r._gsap;if(t in ur&&s){if(this.tfm=this.tfm||{},t!=="transform")t=ki[t]||t,~t.indexOf(",")?t.split(",").forEach(function(a){return i.tfm[a]=Ji(r,a)}):this.tfm[t]=o.x?o[t]:Ji(r,t),t===Gn&&(this.tfm.zOrigin=o.zOrigin);else return ki.transform.split(",").forEach(function(a){return e.call(i,a,n)});if(this.props.indexOf(ke)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Gn,n,"")),t=ke}(s||n)&&this.props.push(t,n,s[t])},Gv=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},c3=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,r,s;for(r=0;r<e.length;r+=3)e[r+1]?e[r+1]===2?t[e[r]](e[r+2]):t[e[r]]=e[r+2]:e[r+2]?n[e[r]]=e[r+2]:n.removeProperty(e[r].substr(0,2)==="--"?e[r]:e[r].replace(cd,"-$1").toLowerCase());if(this.tfm){for(s in this.tfm)i[s]=this.tfm[s];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),r=ad(),(!r||!r.isStart)&&!n[ke]&&(Gv(n),i.zOrigin&&n[Gn]&&(n[Gn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Vv=function(e,t){var n={target:e,props:[],revert:c3,save:a3};return e._gsap||Vn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},Hv,ch=function(e,t){var n=Tr.createElementNS?Tr.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Tr.createElement(e);return n&&n.style?n:Tr.createElement(e)},di=function e(t,n,i){var r=getComputedStyle(t);return r[n]||r.getPropertyValue(n.replace(cd,"-$1").toLowerCase())||r.getPropertyValue(n)||!i&&e(t,Eo(n)||n,1)||""},Rm="O,Moz,ms,Ms,Webkit".split(","),Eo=function(e,t,n){var i=t||cs,r=i.style,s=5;if(e in r&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);s--&&!(Rm[s]+e in r););return s<0?null:(s===3?"ms":s>=0?Rm[s]:"")+e},lh=function(){jR()&&window.document&&(Tm=window,Tr=Tm.document,lo=Tr.documentElement,cs=ch("div")||{style:{}},ch("div"),ke=Eo(ke),Gn=ke+"Origin",cs.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Hv=!!Eo("perspective"),ad=Vn.core.reverting,od=1)},Pm=function(e){var t=e.ownerSVGElement,n=ch("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),r;i.style.display="block",n.appendChild(i),lo.appendChild(n);try{r=i.getBBox()}catch{}return n.removeChild(i),lo.removeChild(n),r},Um=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Wv=function(e){var t,n;try{t=e.getBBox()}catch{t=Pm(e),n=1}return t&&(t.width||t.height)||n||(t=Pm(e)),t&&!t.width&&!t.x&&!t.y?{x:+Um(e,["x","cx","x1"])||0,y:+Um(e,["y","cy","y1"])||0,width:0,height:0}:t},$v=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Wv(e))},Ms=function(e,t){if(t){var n=e.style,i;t in ur&&t!==Gn&&(t=ke),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(cd,"-$1").toLowerCase())):n.removeAttribute(t)}},Ar=function(e,t,n,i,r,s){var o=new Bn(e._pt,t,n,0,1,s?Bv:zv);return e._pt=o,o.b=i,o.e=r,e._props.push(n),o},Dm={deg:1,rad:1,turn:1},l3={grid:1,flex:1},kr=function e(t,n,i,r){var s=parseFloat(i)||0,o=(i+"").trim().substr((s+"").length)||"px",a=cs.style,c=qR.test(n),l=t.tagName.toLowerCase()==="svg",u=(l?"client":"offset")+(c?"Width":"Height"),f=100,h=r==="px",d=r==="%",m,_,g,p;if(r===o||!s||Dm[r]||Dm[o])return s;if(o!=="px"&&!h&&(s=e(t,n,i,"px")),p=t.getCTM&&$v(t),(d||o==="%")&&(ur[n]||~n.indexOf("adius")))return m=p?t.getBBox()[c?"width":"height"]:t[u],We(d?s/m*f:s/100*m);if(a[c?"width":"height"]=f+(h?o:r),_=r!=="rem"&&~n.indexOf("adius")||r==="em"&&t.appendChild&&!l?t:t.parentNode,p&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===Tr||!_.appendChild)&&(_=Tr.body),g=_._gsap,g&&d&&g.width&&c&&g.time===Kn.time&&!g.uncache)return We(s/g.width*f);if(d&&(n==="height"||n==="width")){var y=t.style[n];t.style[n]=f+r,m=t[u],y?t.style[n]=y:Ms(t,n)}else(d||o==="%")&&!l3[di(_,"display")]&&(a.position=di(t,"position")),_===t&&(a.position="static"),_.appendChild(cs),m=cs[u],_.removeChild(cs),a.position="absolute";return c&&d&&(g=us(_),g.time=Kn.time,g.width=_[u]),We(h?m*s/f:m&&s?f/m*s:0)},Ji=function(e,t,n,i){var r;return od||lh(),t in ki&&t!=="transform"&&(t=ki[t],~t.indexOf(",")&&(t=t.split(",")[0])),ur[t]&&t!=="transform"?(r=Ia(e,i),r=t!=="transformOrigin"?r[t]:r.svg?r.origin:fl(di(e,Gn))+" "+r.zOrigin+"px"):(r=e.style[t],(!r||r==="auto"||i||~(r+"").indexOf("calc("))&&(r=ul[t]&&ul[t](e,t,n)||di(e,t)||av(e,t)||(t==="opacity"?1:0))),n&&!~(r+"").trim().indexOf(" ")?kr(e,t,r,n)+n:r},u3=function(e,t,n,i){if(!n||n==="none"){var r=Eo(t,e,1),s=r&&di(e,r,1);s&&s!==n?(t=r,n=s):t==="borderColor"&&(n=di(e,"borderTopColor"))}var o=new Bn(this._pt,e.style,t,0,1,Nv),a=0,c=0,l,u,f,h,d,m,_,g,p,y,x,v;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=di(e,i.substring(4,i.indexOf(")")))),i==="auto"&&(m=e.style[t],e.style[t]=i,i=di(e,t)||i,m?e.style[t]=m:Ms(e,t)),l=[n,i],Tv(l),n=l[0],i=l[1],f=n.match(Qs)||[],v=i.match(Qs)||[],v.length){for(;u=Qs.exec(i);)_=u[0],p=i.substring(a,u.index),d?d=(d+1)%5:(p.substr(-5)==="rgba("||p.substr(-5)==="hsla(")&&(d=1),_!==(m=f[c++]||"")&&(h=parseFloat(m)||0,x=m.substr((h+"").length),_.charAt(1)==="="&&(_=co(h,_)+x),g=parseFloat(_),y=_.substr((g+"").length),a=Qs.lastIndex-y.length,y||(y=y||ei.units[t]||x,a===i.length&&(i+=y,o.e+=y)),x!==y&&(h=kr(e,t,m,y)||0),o._pt={_next:o._pt,p:p||c===1?p:",",s:h,c:g-h,m:d&&d<4||t==="zIndex"?Math.round:0});o.c=a<i.length?i.substring(a,i.length):""}else o.r=t==="display"&&i==="none"?Bv:zv;return ev.test(i)&&(o.e=0),this._pt=o,o},Im={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},f3=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=Im[n]||n,t[1]=Im[i]||i,t.join(" ")},h3=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,r=t.u,s=n._gsap,o,a,c;if(r==="all"||r===!0)i.cssText="",a=1;else for(r=r.split(","),c=r.length;--c>-1;)o=r[c],ur[o]&&(a=1,o=o==="transformOrigin"?Gn:ke),Ms(n,o);a&&(Ms(n,ke),s&&(s.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",Ia(n,1),s.uncache=1,Gv(i)))}},ul={clearProps:function(e,t,n,i,r){if(r.data!=="isFromStart"){var s=e._pt=new Bn(e._pt,t,n,0,0,h3);return s.u=i,s.pr=-10,s.tween=r,e._props.push(n),1}}},Da=[1,0,0,1,0,0],Xv={},Yv=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Lm=function(e){var t=di(e,ke);return Yv(t)?Da:t.substr(7).match(tv).map(We)},ld=function(e,t){var n=e._gsap||us(e),i=e.style,r=Lm(e),s,o,a,c;return n.svg&&e.getAttribute("transform")?(a=e.transform.baseVal.consolidate().matrix,r=[a.a,a.b,a.c,a.d,a.e,a.f],r.join(",")==="1,0,0,1,0,0"?Da:r):(r===Da&&!e.offsetParent&&e!==lo&&!n.svg&&(a=i.display,i.display="block",s=e.parentNode,(!s||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,lo.appendChild(e)),r=Lm(e),a?i.display=a:Ms(e,"display"),c&&(o?s.insertBefore(e,o):s?s.appendChild(e):lo.removeChild(e))),t&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},uh=function(e,t,n,i,r,s){var o=e._gsap,a=r||ld(e,!0),c=o.xOrigin||0,l=o.yOrigin||0,u=o.xOffset||0,f=o.yOffset||0,h=a[0],d=a[1],m=a[2],_=a[3],g=a[4],p=a[5],y=t.split(" "),x=parseFloat(y[0])||0,v=parseFloat(y[1])||0,T,b,w,C;n?a!==Da&&(b=h*_-d*m)&&(w=x*(_/b)+v*(-m/b)+(m*p-_*g)/b,C=x*(-d/b)+v*(h/b)-(h*p-d*g)/b,x=w,v=C):(T=Wv(e),x=T.x+(~y[0].indexOf("%")?x/100*T.width:x),v=T.y+(~(y[1]||y[0]).indexOf("%")?v/100*T.height:v)),i||i!==!1&&o.smooth?(g=x-c,p=v-l,o.xOffset=u+(g*h+p*m)-g,o.yOffset=f+(g*d+p*_)-p):o.xOffset=o.yOffset=0,o.xOrigin=x,o.yOrigin=v,o.smooth=!!i,o.origin=t,o.originIsAbsolute=!!n,e.style[Gn]="0px 0px",s&&(Ar(s,o,"xOrigin",c,x),Ar(s,o,"yOrigin",l,v),Ar(s,o,"xOffset",u,o.xOffset),Ar(s,o,"yOffset",f,o.yOffset)),e.setAttribute("data-svg-origin",x+" "+v)},Ia=function(e,t){var n=e._gsap||new Pv(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,r=n.scaleX<0,s="px",o="deg",a=getComputedStyle(e),c=di(e,Gn)||"0",l,u,f,h,d,m,_,g,p,y,x,v,T,b,w,C,M,S,U,P,D,I,V,O,tt,H,q,X,F,W,J,N;return l=u=f=m=_=g=p=y=x=0,h=d=1,n.svg=!!(e.getCTM&&$v(e)),a.translate&&((a.translate!=="none"||a.scale!=="none"||a.rotate!=="none")&&(i[ke]=(a.translate!=="none"?"translate3d("+(a.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(a.rotate!=="none"?"rotate("+a.rotate+") ":"")+(a.scale!=="none"?"scale("+a.scale.split(" ").join(",")+") ":"")+(a[ke]!=="none"?a[ke]:"")),i.scale=i.rotate=i.translate="none"),b=ld(e,n.svg),n.svg&&(n.uncache?(tt=e.getBBox(),c=n.xOrigin-tt.x+"px "+(n.yOrigin-tt.y)+"px",O=""):O=!t&&e.getAttribute("data-svg-origin"),uh(e,O||c,!!O||n.originIsAbsolute,n.smooth!==!1,b)),v=n.xOrigin||0,T=n.yOrigin||0,b!==Da&&(S=b[0],U=b[1],P=b[2],D=b[3],l=I=b[4],u=V=b[5],b.length===6?(h=Math.sqrt(S*S+U*U),d=Math.sqrt(D*D+P*P),m=S||U?Ys(U,S)*ts:0,p=P||D?Ys(P,D)*ts+m:0,p&&(d*=Math.abs(Math.cos(p*uo))),n.svg&&(l-=v-(v*S+T*P),u-=T-(v*U+T*D))):(N=b[6],W=b[7],q=b[8],X=b[9],F=b[10],J=b[11],l=b[12],u=b[13],f=b[14],w=Ys(N,F),_=w*ts,w&&(C=Math.cos(-w),M=Math.sin(-w),O=I*C+q*M,tt=V*C+X*M,H=N*C+F*M,q=I*-M+q*C,X=V*-M+X*C,F=N*-M+F*C,J=W*-M+J*C,I=O,V=tt,N=H),w=Ys(-P,F),g=w*ts,w&&(C=Math.cos(-w),M=Math.sin(-w),O=S*C-q*M,tt=U*C-X*M,H=P*C-F*M,J=D*M+J*C,S=O,U=tt,P=H),w=Ys(U,S),m=w*ts,w&&(C=Math.cos(w),M=Math.sin(w),O=S*C+U*M,tt=I*C+V*M,U=U*C-S*M,V=V*C-I*M,S=O,I=tt),_&&Math.abs(_)+Math.abs(m)>359.9&&(_=m=0,g=180-g),h=We(Math.sqrt(S*S+U*U+P*P)),d=We(Math.sqrt(V*V+N*N)),w=Ys(I,V),p=Math.abs(w)>2e-4?w*ts:0,x=J?1/(J<0?-J:J):0),n.svg&&(O=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!Yv(di(e,ke)),O&&e.setAttribute("transform",O))),Math.abs(p)>90&&Math.abs(p)<270&&(r?(h*=-1,p+=m<=0?180:-180,m+=m<=0?180:-180):(d*=-1,p+=p<=0?180:-180)),t=t||n.uncache,n.x=l-((n.xPercent=l&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-l)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+s,n.y=u-((n.yPercent=u&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-u)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+s,n.z=f+s,n.scaleX=We(h),n.scaleY=We(d),n.rotation=We(m)+o,n.rotationX=We(_)+o,n.rotationY=We(g)+o,n.skewX=p+o,n.skewY=y+o,n.transformPerspective=x+s,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[Gn]=fl(c)),n.xOffset=n.yOffset=0,n.force3D=ei.force3D,n.renderTransform=n.svg?p3:Hv?Zv:d3,n.uncache=0,n},fl=function(e){return(e=e.split(" "))[0]+" "+e[1]},zu=function(e,t,n){var i=Sn(t);return We(parseFloat(t)+parseFloat(kr(e,"x",n+"px",i)))+i},d3=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Zv(e,t)},jr="0deg",Jo="0px",qr=") ",Zv=function(e,t){var n=t||this,i=n.xPercent,r=n.yPercent,s=n.x,o=n.y,a=n.z,c=n.rotation,l=n.rotationY,u=n.rotationX,f=n.skewX,h=n.skewY,d=n.scaleX,m=n.scaleY,_=n.transformPerspective,g=n.force3D,p=n.target,y=n.zOrigin,x="",v=g==="auto"&&e&&e!==1||g===!0;if(y&&(u!==jr||l!==jr)){var T=parseFloat(l)*uo,b=Math.sin(T),w=Math.cos(T),C;T=parseFloat(u)*uo,C=Math.cos(T),s=zu(p,s,b*C*-y),o=zu(p,o,-Math.sin(T)*-y),a=zu(p,a,w*C*-y+y)}_!==Jo&&(x+="perspective("+_+qr),(i||r)&&(x+="translate("+i+"%, "+r+"%) "),(v||s!==Jo||o!==Jo||a!==Jo)&&(x+=a!==Jo||v?"translate3d("+s+", "+o+", "+a+") ":"translate("+s+", "+o+qr),c!==jr&&(x+="rotate("+c+qr),l!==jr&&(x+="rotateY("+l+qr),u!==jr&&(x+="rotateX("+u+qr),(f!==jr||h!==jr)&&(x+="skew("+f+", "+h+qr),(d!==1||m!==1)&&(x+="scale("+d+", "+m+qr),p.style[ke]=x||"translate(0, 0)"},p3=function(e,t){var n=t||this,i=n.xPercent,r=n.yPercent,s=n.x,o=n.y,a=n.rotation,c=n.skewX,l=n.skewY,u=n.scaleX,f=n.scaleY,h=n.target,d=n.xOrigin,m=n.yOrigin,_=n.xOffset,g=n.yOffset,p=n.forceCSS,y=parseFloat(s),x=parseFloat(o),v,T,b,w,C;a=parseFloat(a),c=parseFloat(c),l=parseFloat(l),l&&(l=parseFloat(l),c+=l,a+=l),a||c?(a*=uo,c*=uo,v=Math.cos(a)*u,T=Math.sin(a)*u,b=Math.sin(a-c)*-f,w=Math.cos(a-c)*f,c&&(l*=uo,C=Math.tan(c-l),C=Math.sqrt(1+C*C),b*=C,w*=C,l&&(C=Math.tan(l),C=Math.sqrt(1+C*C),v*=C,T*=C)),v=We(v),T=We(T),b=We(b),w=We(w)):(v=u,w=f,T=b=0),(y&&!~(s+"").indexOf("px")||x&&!~(o+"").indexOf("px"))&&(y=kr(h,"x",s,"px"),x=kr(h,"y",o,"px")),(d||m||_||g)&&(y=We(y+d-(d*v+m*b)+_),x=We(x+m-(d*T+m*w)+g)),(i||r)&&(C=h.getBBox(),y=We(y+i/100*C.width),x=We(x+r/100*C.height)),C="matrix("+v+","+T+","+b+","+w+","+y+","+x+")",h.setAttribute("transform",C),p&&(h.style[ke]=C)},m3=function(e,t,n,i,r){var s=360,o=sn(r),a=parseFloat(r)*(o&&~r.indexOf("rad")?ts:1),c=a-i,l=i+c+"deg",u,f;return o&&(u=r.split("_")[1],u==="short"&&(c%=s,c!==c%(s/2)&&(c+=c<0?s:-s)),u==="cw"&&c<0?c=(c+s*Cm)%s-~~(c/s)*s:u==="ccw"&&c>0&&(c=(c-s*Cm)%s-~~(c/s)*s)),e._pt=f=new Bn(e._pt,t,n,i,c,JR),f.e=l,f.u="deg",e._props.push(n),f},Fm=function(e,t){for(var n in t)e[n]=t[n];return e},g3=function(e,t,n){var i=Fm({},n._gsap),r="perspective,force3D,transformOrigin,svgOrigin",s=n.style,o,a,c,l,u,f,h,d;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),s[ke]=t,o=Ia(n,1),Ms(n,ke),n.setAttribute("transform",c)):(c=getComputedStyle(n)[ke],s[ke]=t,o=Ia(n,1),s[ke]=c);for(a in ur)c=i[a],l=o[a],c!==l&&r.indexOf(a)<0&&(h=Sn(c),d=Sn(l),u=h!==d?kr(n,a,c,d):parseFloat(c),f=parseFloat(l),e._pt=new Bn(e._pt,o,a,u,f-u,ah),e._pt.u=d||0,e._props.push(a));Fm(o,i)};zn("padding,margin,Width,Radius",function(e,t){var n="Top",i="Right",r="Bottom",s="Left",o=(t<3?[n,i,r,s]:[n+s,n+i,r+i,r+s]).map(function(a){return t<2?e+a:"border"+a+e});ul[t>1?"border"+e:e]=function(a,c,l,u,f){var h,d;if(arguments.length<4)return h=o.map(function(m){return Ji(a,m,l)}),d=h.join(" "),d.split(h[0]).length===5?h[0]:d;h=(u+"").split(" "),d={},o.forEach(function(m,_){return d[m]=h[_]=h[_]||h[(_-1)/2|0]}),a.init(c,d,f)}});var jv={name:"css",register:lh,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,r){var s=this._props,o=e.style,a=n.vars.startAt,c,l,u,f,h,d,m,_,g,p,y,x,v,T,b,w;od||lh(),this.styles=this.styles||Vv(e),w=this.styles.props,this.tween=n;for(m in t)if(m!=="autoRound"&&(l=t[m],!(qn[m]&&Uv(m,t,n,i,e,r)))){if(h=typeof l,d=ul[m],h==="function"&&(l=l.call(n,i,e,r),h=typeof l),h==="string"&&~l.indexOf("random(")&&(l=Ra(l)),d)d(this,e,m,l,n)&&(b=1);else if(m.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(m)+"").trim(),l+="",Lr.lastIndex=0,Lr.test(c)||(_=Sn(c),g=Sn(l)),g?_!==g&&(c=kr(e,m,c,g)+g):_&&(l+=_),this.add(o,"setProperty",c,l,i,r,0,0,m),s.push(m),w.push(m,0,o[m]);else if(h!=="undefined"){if(a&&m in a?(c=typeof a[m]=="function"?a[m].call(n,i,e,r):a[m],sn(c)&&~c.indexOf("random(")&&(c=Ra(c)),Sn(c+"")||c==="auto"||(c+=ei.units[m]||Sn(Ji(e,m))||""),(c+"").charAt(1)==="="&&(c=Ji(e,m))):c=Ji(e,m),f=parseFloat(c),p=h==="string"&&l.charAt(1)==="="&&l.substr(0,2),p&&(l=l.substr(2)),u=parseFloat(l),m in ki&&(m==="autoAlpha"&&(f===1&&Ji(e,"visibility")==="hidden"&&u&&(f=0),w.push("visibility",0,o.visibility),Ar(this,o,"visibility",f?"inherit":"hidden",u?"inherit":"hidden",!u)),m!=="scale"&&m!=="transform"&&(m=ki[m],~m.indexOf(",")&&(m=m.split(",")[0]))),y=m in ur,y){if(this.styles.save(m),h==="string"&&l.substring(0,6)==="var(--"&&(l=di(e,l.substring(4,l.indexOf(")"))),u=parseFloat(l)),x||(v=e._gsap,v.renderTransform&&!t.parseTransform||Ia(e,t.parseTransform),T=t.smoothOrigin!==!1&&v.smooth,x=this._pt=new Bn(this._pt,o,ke,0,1,v.renderTransform,v,0,-1),x.dep=1),m==="scale")this._pt=new Bn(this._pt,v,"scaleY",v.scaleY,(p?co(v.scaleY,p+u):u)-v.scaleY||0,ah),this._pt.u=0,s.push("scaleY",m),m+="X";else if(m==="transformOrigin"){w.push(Gn,0,o[Gn]),l=f3(l),v.svg?uh(e,l,0,T,0,this):(g=parseFloat(l.split(" ")[2])||0,g!==v.zOrigin&&Ar(this,v,"zOrigin",v.zOrigin,g),Ar(this,o,m,fl(c),fl(l)));continue}else if(m==="svgOrigin"){uh(e,l,1,T,0,this);continue}else if(m in Xv){m3(this,v,m,f,p?co(f,p+l):l);continue}else if(m==="smoothOrigin"){Ar(this,v,"smooth",v.smooth,l);continue}else if(m==="force3D"){v[m]=l;continue}else if(m==="transform"){g3(this,l,e);continue}}else m in o||(m=Eo(m)||m);if(y||(u||u===0)&&(f||f===0)&&!KR.test(l)&&m in o)_=(c+"").substr((f+"").length),u||(u=0),g=Sn(l)||(m in ei.units?ei.units[m]:_),_!==g&&(f=kr(e,m,c,g)),this._pt=new Bn(this._pt,y?v:o,m,f,(p?co(f,p+u):u)-f,!y&&(g==="px"||m==="zIndex")&&t.autoRound!==!1?t3:ah),this._pt.u=g||0,_!==g&&g!=="%"&&(this._pt.b=c,this._pt.r=QR);else if(m in o)u3.call(this,e,m,c,p?p+l:l);else if(m in e)this.add(e,m,c||e[m],p?p+l:l,i,r);else if(m!=="parseTransform"){qh(m,l);continue}y||(m in o?w.push(m,0,o[m]):typeof e[m]=="function"?w.push(m,2,e[m]()):w.push(m,1,c||e[m])),s.push(m)}}b&&Ov(this)},render:function(e,t){if(t.tween._time||!ad())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Ji,aliases:ki,getSetter:function(e,t,n){var i=ki[t];return i&&i.indexOf(",")<0&&(t=i),t in ur&&t!==Gn&&(e._gsap.x||Ji(e,"x"))?n&&Am===n?t==="scale"?r3:i3:(Am=n||{})&&(t==="scale"?s3:o3):e.style&&!Yh(e.style[t])?e3:~t.indexOf("-")?n3:rd(e,t)},core:{_removeProperty:Ms,_getMatrix:ld}};Vn.utils.checkPrefix=Eo;Vn.core.getStyleSaver=Vv;(function(e,t,n,i){var r=zn(e+","+t+","+n,function(s){ur[s]=1});zn(t,function(s){ei.units[s]="deg",Xv[s]=1}),ki[r[13]]=e+","+t,zn(i,function(s){var o=s.split(":");ki[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");zn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(e){ei.units[e]="px"});Vn.registerPlugin(jv);var Me=Vn.registerPlugin(jv)||Vn;Me.core.Tween;var bs=(e=>(e[e.Dynamic=0]="Dynamic",e[e.Fixed=1]="Fixed",e[e.KinematicPositionBased=2]="KinematicPositionBased",e[e.KinematicVelocityBased=3]="KinematicVelocityBased",e))(bs||{});const _3=re({gravityX:L.f32,gravityY:L.f32,gravityZ:L.f32}),Wt=re({type:L.ui8,mass:L.f32,linearDamping:L.f32,angularDamping:L.f32,gravityScale:L.f32,ccd:L.ui8,lockRotX:L.ui8,lockRotY:L.ui8,lockRotZ:L.ui8,posX:L.f32,posY:L.f32,posZ:L.f32,rotX:L.f32,rotY:L.f32,rotZ:L.f32,rotW:L.f32,eulerX:L.f32,eulerY:L.f32,eulerZ:L.f32,velX:L.f32,velY:L.f32,velZ:L.f32,rotVelX:L.f32,rotVelY:L.f32,rotVelZ:L.f32}),v3=re({shape:L.ui8,sizeX:L.f32,sizeY:L.f32,sizeZ:L.f32,radius:L.f32,height:L.f32,friction:L.f32,restitution:L.f32,density:L.f32,isSensor:L.ui8,membershipGroups:L.ui16,filterGroups:L.ui16,posOffsetX:L.f32,posOffsetY:L.f32,posOffsetZ:L.f32,rotOffsetX:L.f32,rotOffsetY:L.f32,rotOffsetZ:L.f32,rotOffsetW:L.f32}),qv=re({offset:L.f32,maxSlope:L.f32,maxSlide:L.f32,snapDist:L.f32,autoStep:L.ui8,maxStepHeight:L.f32,minStepWidth:L.f32,upX:L.f32,upY:L.f32,upZ:L.f32,moveX:L.f32,moveY:L.f32,moveZ:L.f32,grounded:L.ui8,platform:L.eid,platformVelX:L.f32,platformVelY:L.f32,platformVelZ:L.f32}),y3=re({desiredVelX:L.f32,desiredVelY:L.f32,desiredVelZ:L.f32,velocityY:L.f32,actualMoveX:L.f32,actualMoveY:L.f32,actualMoveZ:L.f32}),x3=re({prevPosX:L.f32,prevPosY:L.f32,prevPosZ:L.f32,prevRotX:L.f32,prevRotY:L.f32,prevRotZ:L.f32,prevRotW:L.f32,posX:L.f32,posY:L.f32,posZ:L.f32,rotX:L.f32,rotY:L.f32,rotZ:L.f32,rotW:L.f32});re({activeEvents:L.ui8});const S3=re({other:L.ui32,handle1:L.ui32,handle2:L.ui32}),M3=re({other:L.ui32,handle1:L.ui32,handle2:L.ui32}),Vr={x:L.f32,y:L.f32,z:L.f32},b3={x:L.f32,y:L.f32,z:L.f32,w:L.f32},E3=re(Vr),w3=re(Vr),T3=re(Vr),A3=re(Vr),fh=re(Vr),hh=re(Vr),C3=re(Vr),R3=re(b3);re(Vr);bs.Fixed;bs.Dynamic;bs.KinematicVelocityBased;ee([x3]);ee([_3]);ee([Wt]);ee([v3]);ee([qv]);ee([qv,y3,Wt,Ze]);ee([E3,Wt]);ee([w3,Wt]);ee([T3,Wt]);ee([A3,Wt]);ee([fh,Wt]);ee([hh,Wt]);ee([C3,Wt]);ee([R3,Wt]);ee([S3]);ee([M3]);const Fl={linear:"linear","sine-in":"sineIn","sine-out":"sineOut","sine-in-out":"sineInOut","quad-in":"quadIn","quad-out":"quadOut","quad-in-out":"quadInOut","cubic-in":"cubicIn","cubic-out":"cubicOut","cubic-in-out":"cubicInOut","quart-in":"quartIn","quart-out":"quartOut","quart-in-out":"quartInOut","expo-in":"expoIn","expo-out":"expoOut","expo-in-out":"expoInOut","circ-in":"circIn","circ-out":"circOut","circ-in-out":"circInOut","back-in":"backIn","back-out":"backOut","back-in-out":"backInOut","elastic-in":"elasticIn","elastic-out":"elasticOut","elastic-in-out":"elasticInOut","bounce-in":"bounceIn","bounce-out":"bounceOut","bounce-in-out":"bounceInOut"},Nm={linear:e=>e,sineIn:e=>Me.parseEase("power1.in")(e),sineOut:e=>Me.parseEase("power1.out")(e),sineInOut:e=>Me.parseEase("power1.inOut")(e),quadIn:e=>Me.parseEase("power2.in")(e),quadOut:e=>Me.parseEase("power2.out")(e),quadInOut:e=>Me.parseEase("power2.inOut")(e),cubicIn:e=>Me.parseEase("power3.in")(e),cubicOut:e=>Me.parseEase("power3.out")(e),cubicInOut:e=>Me.parseEase("power3.inOut")(e),quartIn:e=>Me.parseEase("power4.in")(e),quartOut:e=>Me.parseEase("power4.out")(e),quartInOut:e=>Me.parseEase("power4.inOut")(e),expoIn:e=>Me.parseEase("expo.in")(e),expoOut:e=>Me.parseEase("expo.out")(e),expoInOut:e=>Me.parseEase("expo.inOut")(e),circIn:e=>Me.parseEase("circ.in")(e),circOut:e=>Me.parseEase("circ.out")(e),circInOut:e=>Me.parseEase("circ.inOut")(e),backIn:e=>Me.parseEase("back.in")(e),backOut:e=>Me.parseEase("back.out")(e),backInOut:e=>Me.parseEase("back.inOut")(e),elasticIn:e=>Me.parseEase("elastic.in")(e),elasticOut:e=>Me.parseEase("elastic.out")(e),elasticInOut:e=>Me.parseEase("elastic.inOut")(e),bounceIn:e=>Me.parseEase("bounce.in")(e),bounceOut:e=>Me.parseEase("bounce.out")(e),bounceInOut:e=>Me.parseEase("bounce.inOut")(e)};function La(e,t){const n=Nm[t];return n?n(e):(console.warn(`Unknown easing key "${t}", falling back to linear`),Nm.linear(e))}function xr(e){return e*(Math.PI/180)}function Fr(e,t,n){const[i,r]=e.split(".");if(!i||!r)return null;let s=i;if(i==="shaker"){const l=n.getComponent("transform-shaker");l&&n.hasComponent(t,l)&&(s="transform-shaker")}const o=n.getComponent(s);if(!o||!n.hasComponent(t,o))return null;const a=bh(r),c=o[a];return c instanceof Float32Array?{component:o,field:a,array:c}:null}function Zs(e,t){return e===void 0?Array.isArray(t)?t:[t]:Array.isArray(e)?e:[e]}function Kv(e,t,n,i){const r=[];if(e==="rotation"){const s=Zs(t.to,[0,0,0]),o=["eulerX","eulerY","eulerZ"],a=i.hasComponent(n,Wt)?"body":"transform";for(let c=0;c<o.length;c++){const l=Fr(`${a}.${o[c]}`,n,i),u=l?l.array[n]:0,f=t.from!==void 0?Zs(t.from,[0,0,0])[c]??u:u;r.push({field:`${a}.${o[c]}`,from:f,to:s[c]||0})}}else if(e==="at"){const s=Zs(t.to,[0,0,0]),o=["posX","posY","posZ"];for(let a=0;a<o.length;a++){const c=Fr(`transform.${o[a]}`,n,i),l=c?c.array[n]:0,u=t.from!==void 0?Zs(t.from,[0,0,0])[a]??l:l;r.push({field:`transform.${o[a]}`,from:u,to:s[a]||0})}}else if(e==="scale"){const s=Zs(t.to,[1,1,1]),o=["scaleX","scaleY","scaleZ"];for(let a=0;a<o.length;a++){const c=Fr(`transform.${o[a]}`,n,i),l=c?c.array[n]:1,u=t.from!==void 0?Zs(t.from,[1,1,1])[a]??l:l;r.push({field:`transform.${o[a]}`,from:u,to:s[a]??1})}}return r}const P3=Object.values(Fl),Jv=new Map;P3.forEach((e,t)=>Jv.set(e,t));const wo=new Map,ud=new Map,Fa=new Map,ps=new Map,fd=new Map,hl=new Map,dl=new Map;function U3(e,t){e.hasComponent(t,de)&&(de.state[t]=cr.Playing)}function D3(e,t){if(!e.hasComponent(t,de))return;de.state[t]=cr.Idle;const n=Fa.get(t);if(n){for(const i of n)e.exists(i)&&e.destroyEntity(i);n.clear()}}function I3(e,t){D3(e,t),de.currentIndex[t]=0,de.pauseRemaining[t]=0}function L3(e,t){if(!e.hasComponent(t,de)||de.state[t]!==cr.Playing)return;const n=Fa.get(t);if(n){for(const r of n)N3(e,r),e.exists(r)&&e.destroyEntity(r);n.clear()}const i=ud.get(t);if(i){const r=de.currentIndex[t];for(let s=r;s<i.length;s++){const o=i[s];o.type==="tween"&&o.target!==void 0&&o.attr&&O3(e,o.target,o.attr,o.to??0)}}de.state[t]=cr.Idle,de.currentIndex[t]=0,de.pauseRemaining[t]=0}const F3=ee([Ee]);function N3(e,t){const n=[];for(const i of F3(e.world)){if(Ee.source[i]!==t)continue;const r=Ee.target[i],s=wo.get(i);s&&r<s.length&&(s[r]=Ee.to[i]),wo.delete(i),n.push(i)}for(const i of n)e.destroyEntity(i)}function O3(e,t,n,i){const r=Kv(n,{to:i},t,e);if(r.length>0)for(const s of r){const o=Fr(s.field,t,e);o&&(o.array[t]=s.to)}else{const s=Fr(n,t,e);s&&(s.array[t]=typeof i=="number"?i:i[0])}}function Qv(e,t,n,i){const r=e.createEntity();e.addComponent(r,Je),Je.duration[r]=i.duration??1,Je.elapsed[r]=0;const s=i.easing?Fl[i.easing]||i.easing:"linear";Je.easingIndex[r]=Jv.get(s)??0;const o=Kv(n,i,t,e);if(o.length>0)for(const a of o){const c=Fr(a.field,t,e);if(!c)continue;const l=e.hasComponent(t,Wt)&&Wt.type[t]===bs.KinematicVelocityBased,u=c.array===Wt.posX||c.array===Wt.posY||c.array===Wt.posZ,f=c.array===Wt.eulerX||c.array===Wt.eulerY||c.array===Wt.eulerZ;if(l&&u){const h=e.createEntity();e.addComponent(h,Ue);let d=0;c.array===Wt.posY?d=1:c.array===Wt.posZ&&(d=2);const m=c.array[t];Ue.tweenEntity[h]=r,Ue.targetEntity[h]=t,Ue.axis[h]=d,Ue.from[h]=a.from,Ue.to[h]=a.to,Ue.lastPosition[h]=m,Ue.targetPosition[h]=a.from}else if(l&&f){const h=e.createEntity();e.addComponent(h,De);let d=0;c.array===Wt.eulerY?d=1:c.array===Wt.eulerZ&&(d=2);const m=c.array[t];De.tweenEntity[h]=r,De.targetEntity[h]=t,De.axis[h]=d,De.from[h]=xr(a.from),De.to[h]=xr(a.to),De.lastRotation[h]=xr(m),De.targetRotation[h]=xr(a.from)}else{const h=e.createEntity();e.addComponent(h,Ee),Ee.source[h]=r,Ee.target[h]=t,Ee.componentId[h]=0,Ee.fieldIndex[h]=0,Ee.from[h]=a.from,Ee.to[h]=a.to,Ee.value[h]=a.from,wo.set(h,c.array)}}else{const a=Fr(n,t,e);if(!a)return null;const c=a.array[t],l=typeof i.from=="number"?i.from:i.from?.[0]??c,u=typeof i.to=="number"?i.to:i.to[0],f=e.hasComponent(t,Wt)&&Wt.type[t]===bs.KinematicVelocityBased,h=a.array===Wt.posX||a.array===Wt.posY||a.array===Wt.posZ,d=a.array===Wt.eulerX||a.array===Wt.eulerY||a.array===Wt.eulerZ;if(f&&h){const m=e.createEntity();e.addComponent(m,Ue);let _=0;a.array===Wt.posY?_=1:a.array===Wt.posZ&&(_=2),Ue.tweenEntity[m]=r,Ue.targetEntity[m]=t,Ue.axis[m]=_,Ue.from[m]=l,Ue.to[m]=u,Ue.lastPosition[m]=c,Ue.targetPosition[m]=l}else if(f&&d){const m=e.createEntity();e.addComponent(m,De);let _=0;a.array===Wt.eulerY?_=1:a.array===Wt.eulerZ&&(_=2),De.tweenEntity[m]=r,De.targetEntity[m]=t,De.axis[m]=_,De.from[m]=xr(l),De.to[m]=xr(u),De.lastRotation[m]=xr(c),De.targetRotation[m]=xr(l)}else{const m=e.createEntity();e.addComponent(m,Ee),Ee.source[m]=r,Ee.target[m]=t,Ee.componentId[m]=0,Ee.fieldIndex[m]=0,Ee.from[m]=l,Ee.to[m]=u,Ee.value[m]=l,wo.set(m,a.array)}}return r}const k3={"transform.pos-x":{type:He.Position,axes:_e.X},"transform.pos-y":{type:He.Position,axes:_e.Y},"transform.pos-z":{type:He.Position,axes:_e.Z},"transform.scale-x":{type:He.Scale,axes:_e.X},"transform.scale-y":{type:He.Scale,axes:_e.Y},"transform.scale-z":{type:He.Scale,axes:_e.Z},"transform.euler-x":{type:He.Rotation,axes:_e.X},"transform.euler-y":{type:He.Rotation,axes:_e.Y},"transform.euler-z":{type:He.Rotation,axes:_e.Z},at:{type:He.Position,axes:_e.XYZ},scale:{type:He.Scale,axes:_e.XYZ},rotation:{type:He.Rotation,axes:_e.XYZ}};function z3(e){return k3[e]??null}function B3(e,t,n,i){if(!e.hasComponent(t,Ze))return console.warn("[TransformShaker] Entity must have Transform component"),null;const r=e.createEntity();return e.addComponent(r,fe),fe.target[r]=t,fe.type[r]=n.type,fe.axes[r]=n.axes,fe.value[r]=i.value,fe.intensity[r]=i.intensity??1,fe.mode[r]=i.mode==="multiplicative"?ar.Multiplicative:ar.Additive,r}function G3(e,t,n,i){const r=z3(n);if(r)return B3(e,t,r,i);const s=Fr(n,t,e);if(!s)return console.warn(`[Shaker] Could not resolve target property: ${n}`),null;const o=e.createEntity();return e.addComponent(o,rn),rn.target[o]=t,rn.value[o]=i.value,rn.intensity[o]=i.intensity??1,rn.mode[o]=i.mode==="multiplicative"?ar.Multiplicative:ar.Additive,ps.set(o,s.array),o}const Om=Object.keys(Fl);function t0(e,t){if(e&&!Om.includes(e))throw new Error(Eh(t,"easing",e,Om))}function To(e){return typeof e=="number"?e:typeof e=="string"?parseFloat(e)||0:typeof e=="boolean"&&e?1:0}function pl(e){if(typeof e=="number")return e;if(typeof e=="object"&&e!==null){const t=e;if("x"in t||"y"in t||"z"in t)return[t.x||0,t.y||0,t.z||0]}return To(e)}const V3=({element:e,state:t,context:n})=>{if(e.tagName!=="tween")return;const i=e.attributes.target;if(!i)throw new Error(`[Tween] Missing required attribute "target".
  Tweens must specify which entity to animate using the target attribute.
  Example: <tween target="my-cube" attr="transform.pos-x" to="10"></tween>`);const r=n.getEntityByName(i);if(r===null)throw new Error(`[Tween] Could not find entity with name "${i}".
  Make sure the target entity has a name attribute that matches.
  Example: <entity name="my-cube" transform=""></entity>`);const s=e.attributes.attr;if(!s)throw new Error(`[Tween] Missing required attribute "attr".
  Tweens must specify which property to animate.
  Example: <tween target="my-cube" attr="transform.pos-x" to="10"></tween>`);const o=e.attributes.to;if(o==null)throw new Error(`[Tween] Missing required attribute "to".
  Tweens must specify the target value.
  Example: <tween target="my-cube" attr="transform.pos-x" to="10"></tween>`);const a=e.attributes.easing;t0(a,"tween");const c={from:e.attributes.from!==void 0?pl(e.attributes.from):void 0,to:pl(o),duration:To(e.attributes.duration||1),easing:a};if(!Qv(t,r,s,c))throw new Error(`[Tween] Could not resolve tween target property: ${s}`)},H3=({element:e,state:t,context:n})=>{if(e.tagName!=="sequence")return;const i=t.createEntity();t.addComponent(i,de);const r=e.attributes.name,s=e.attributes.autoplay;r&&n.setName(r,i);const o=[];for(const a of e.children)if(a.tagName==="tween"){const c=a.attributes.target;if(!c)throw new Error('[Sequence] Tween missing "target" attribute');const l=n.getEntityByName(c);if(l===null)throw new Error(`[Sequence] Target "${c}" not found`);const u=a.attributes.attr;if(!u)throw new Error('[Sequence] Tween missing "attr" attribute');const f=a.attributes.to;if(f==null)throw new Error('[Sequence] Tween missing "to" attribute');const h=a.attributes.easing;t0(h,"sequence > tween"),o.push({type:"tween",target:l,attr:u,from:a.attributes.from!==void 0?pl(a.attributes.from):void 0,to:pl(f),duration:To(a.attributes.duration||1),easing:h})}else a.tagName==="pause"&&o.push({type:"pause",duration:To(a.attributes.duration||0)});ud.set(i,o),de.state[i]=s?cr.Playing:cr.Idle,de.currentIndex[i]=0,de.itemCount[i]=o.length,de.pauseRemaining[i]=0},km=["additive","multiplicative"];function W3(e,t){if(e&&!km.includes(e))throw new Error(Eh(t,"mode",e,km))}const $3=({element:e,state:t,context:n})=>{if(e.tagName!=="shaker")return;const i=e.attributes.target;if(!i)throw new Error(`[Shaker] Missing required attribute "target".
  Example: <shaker target="my-cube" attr="transform.pos-y" value="0.5"></shaker>`);const r=n.getEntityByName(i);if(r===null)throw new Error(`[Shaker] Could not find entity with name "${i}".
  Make sure the target entity has a name attribute.`);const s=e.attributes.attr;if(!s)throw new Error(`[Shaker] Missing required attribute "attr".
  Example: <shaker target="my-cube" attr="transform.pos-y" value="0.5"></shaker>`);const o=e.attributes.value;if(o==null)throw new Error(`[Shaker] Missing required attribute "value".
  Example: <shaker target="my-cube" attr="transform.pos-y" value="0.5"></shaker>`);const a=e.attributes.mode;W3(a,"shaker");const c={value:To(o),intensity:To(e.attributes.intensity??1),mode:a},l=G3(t,r,s,c);if(!l)throw new Error(`[Shaker] Could not resolve target property: ${s}`);const u=e.attributes.name;u&&n.setName(u,l)},zm=new mi,Bm=new ni,X3=Math.PI/180,hd=Object.values(Fl),Y3=ee([Je]),Gm=ee([Ee]),Z3=ee([Ue]),j3=ee([De]),q3=ee([de]),Xc=ee([rn]),oa=ee([fe]),K3=180/Math.PI,J3={x:Wt.posX,y:Wt.posY,z:Wt.posZ},Q3={x:Wt.eulerX,y:Wt.eulerY,z:Wt.eulerZ},tP={x:Wt.velX,y:Wt.velY,z:Wt.velZ},eP={x:Wt.rotVelX,y:Wt.rotVelY,z:Wt.rotVelZ};function ml(e,t){return t===0?e.x:t===1?e.y:e.z}function e0(e,t,n,i){e.hasComponent(t,n)||(e.addComponent(t,n),n.x[t]=i.x[t],n.y[t]=i.y[t],n.z[t]=i.z[t])}function nP(e,t,n,i,r){if(!e.hasComponent(t,Je))return{position:i,velocity:0,done:!0};const s=Je.duration[t],o=Je.elapsed[t],a=o/s;if(a>=1)return{position:i,velocity:0,done:!0};const c=hd[Je.easingIndex[t]]||"linear",l=La(a,c),u=Ea(n,i,l),f=La(Math.min((o+r)/s,1),c),h=(Ea(n,i,f)-u)/r;return{position:u,velocity:h,done:!1}}function iP(e){return e>Math.PI?e-2*Math.PI:e<-Math.PI?e+2*Math.PI:e}function rP(e,t,n,i,r){if(!e.hasComponent(t,Je))return{rotation:i,angularVelocity:0,done:!0};const s=Je.duration[t],o=Je.elapsed[t],a=o/s;if(a>=1)return{rotation:i,angularVelocity:0,done:!0};const c=hd[Je.easingIndex[t]]||"linear",l=La(a,c),u=Ea(n,i,l),f=La(Math.min((o+r)/s,1),c),h=Ea(n,i,f),d=iP(h-u)/r;return{rotation:u,angularVelocity:d,done:!1}}const n0={group:"fixed",first:!0,update(e){const t=e.time.fixedDeltaTime,n=[];for(const i of Z3(e.world)){const r=Ue.targetEntity[i];if(!e.hasComponent(r,Wt)){n.push(i);continue}const s=Ue.axis[i],{position:o,velocity:a,done:c}=nP(e,Ue.tweenEntity[i],Ue.from[i],Ue.to[i],t);ml(J3,s)[r]=o,e0(e,r,fh,tP),ml(fh,s)[r]=a,Ue.lastPosition[i]=o,Ue.targetPosition[i]=o,c&&n.push(i)}for(const i of n)e.destroyEntity(i)}},sP={group:"fixed",after:[n0],update(e){const t=e.time.fixedDeltaTime,n=[];for(const i of j3(e.world)){const r=De.targetEntity[i];if(!e.hasComponent(r,Wt)){n.push(i);continue}const s=De.axis[i],{rotation:o,angularVelocity:a,done:c}=rP(e,De.tweenEntity[i],De.from[i],De.to[i],t);ml(Q3,s)[r]=o*K3,e0(e,r,hh,eP),ml(hh,s)[r]=a,De.lastRotation[i]=o,De.targetRotation[i]=o,c&&n.push(i)}for(const i of n)e.destroyEntity(i)}},i0={group:"simulation",update(e){const t=e.time.deltaTime,n=new Set;for(const i of Y3(e.world)){Je.elapsed[i]+=t;const r=Je.elapsed[i]/Je.duration[i];r>=1&&n.add(i);const s=hd[Je.easingIndex[i]]||"linear",o=La(Math.min(r,1),s);for(const a of Gm(e.world)){if(Ee.source[a]!==i)continue;const c=Ee.target[a],l=wo.get(a);if(e.hasComponent(c,Wt)&&Wt.type[c]===bs.KinematicVelocityBased&&l&&(l===Wt.posX||l===Wt.posY||l===Wt.posZ||l===Wt.eulerX||l===Wt.eulerY||l===Wt.eulerZ))continue;const u=Ea(Ee.from[a],Ee.to[a],o);Ee.value[a]=u,l&&c<l.length&&(l[c]=u)}}for(const i of Gm(e.world))n.has(Ee.source[i])&&(wo.delete(i),e.destroyEntity(i));for(const i of n)e.destroyEntity(i)}};function Bu(e,t){const n=ud.get(t);if(!n)return;let i=de.currentIndex[t];if(i>=n.length)return;let r=Fa.get(t);for(r||(r=new Set,Fa.set(t,r));i<n.length;){const s=n[i];if(s.type==="pause"){de.pauseRemaining[t]=s.duration,de.currentIndex[t]=i;return}if(s.target!==void 0&&s.attr){const o=Qv(e,s.target,s.attr,{from:s.from,to:s.to??0,duration:s.duration,easing:s.easing});o&&r.add(o)}i++}de.currentIndex[t]=i}const oP={group:"simulation",after:[i0],update(e){const t=e.time.deltaTime;for(const n of q3(e.world)){if(de.state[n]!==cr.Playing)continue;const i=de.pauseRemaining[n];if(i>0){de.pauseRemaining[n]=i-t,de.pauseRemaining[n]<=0&&(de.currentIndex[n]++,Bu(e,n));continue}const r=Fa.get(n);if(r&&r.size>0){for(const s of r)e.hasComponent(s,Je)||r.delete(s);if(r.size>0)continue;Bu(e,n);continue}if(de.currentIndex[n]>=de.itemCount[n]){de.state[n]=cr.Idle,de.currentIndex[n]=0,de.pauseRemaining[n]=0;continue}Bu(e,n)}}};function Yc(e,t){if(e===He.Position){if(t===_e.X)return Et.posX;if(t===_e.Y)return Et.posY;if(t===_e.Z)return Et.posZ}else if(e===He.Scale){if(t===_e.X)return Et.scaleX;if(t===_e.Y)return Et.scaleY;if(t===_e.Z)return Et.scaleZ}else if(e===He.Rotation){if(t===_e.X)return Et.eulerX;if(t===_e.Y)return Et.eulerY;if(t===_e.Z)return Et.eulerZ}return null}const r0={group:"draw",first:!0,update(e){const t=[_e.X,_e.Y,_e.Z];for(const n of oa(e.world)){const i=fe.target[n];if(!e.hasComponent(i,Et))continue;const r=fe.type[n],s=fe.axes[n];if(r===He.Rotation)dl.has(i)||dl.set(i,{x:Et.rotX[i],y:Et.rotY[i],z:Et.rotZ[i],w:Et.rotW[i]});else for(const o of t){if(!(s&o))continue;const a=Yc(r,o);a&&hl.set(`${n}-${o}`,a[i])}}for(const n of oa(e.world)){if(fe.mode[n]!==ar.Additive)continue;const i=fe.target[n];if(!e.hasComponent(i,Et))continue;const r=fe.type[n];if(r===He.Rotation)continue;const s=fe.axes[n],o=fe.value[n],a=fe.intensity[n];for(const c of t){if(!(s&c))continue;const l=Yc(r,c);l&&(l[i]+=o*a)}}for(const n of oa(e.world)){if(fe.mode[n]!==ar.Multiplicative)continue;const i=fe.target[n];if(!e.hasComponent(i,Et))continue;const r=fe.type[n];if(r===He.Rotation)continue;const s=fe.axes[n],o=fe.value[n],a=fe.intensity[n];for(const c of t){if(!(s&c))continue;const l=Yc(r,c);l&&(l[i]*=1+(o-1)*a)}}for(const n of oa(e.world)){if(fe.type[n]!==He.Rotation)continue;const i=fe.target[n];if(!e.hasComponent(i,Et))continue;const r=fe.axes[n],s=fe.value[n],o=fe.intensity[n],a=s*o*X3,c=r&_e.X?a:0,l=r&_e.Y?a:0,u=r&_e.Z?a:0;Bm.set(c,l,u,"YXZ"),zm.setFromEuler(Bm);const f=new mi(Et.rotX[i],Et.rotY[i],Et.rotZ[i],Et.rotW[i]);f.multiply(zm),Et.rotX[i]=f.x,Et.rotY[i]=f.y,Et.rotZ[i]=f.z,Et.rotW[i]=f.w}}},s0={group:"draw",last:!0,update(e){const t=[_e.X,_e.Y,_e.Z];for(const n of oa(e.world)){const i=fe.target[n];if(!e.hasComponent(i,Et))continue;const r=fe.type[n];if(r===He.Rotation)continue;const s=fe.axes[n];for(const o of t){if(!(s&o))continue;const a=Yc(r,o);if(!a)continue;const c=`${n}-${o}`,l=hl.get(c);l!==void 0&&(a[i]=l)}}for(const[n,i]of dl)e.hasComponent(n,Et)&&(Et.rotX[n]=i.x,Et.rotY[n]=i.y,Et.rotZ[n]=i.z,Et.rotW[n]=i.w);dl.clear()}},o0={group:"simulation",last:!0,update(e){for(const t of hl.keys()){const n=parseInt(t.split("-")[0],10);e.hasComponent(n,fe)||hl.delete(t)}}},aP={group:"draw",first:!0,before:[r0],update(e){for(const t of Xc(e.world)){const n=rn.target[t],i=ps.get(t);i&&fd.set(t,i[n])}for(const t of Xc(e.world)){if(rn.mode[t]!==ar.Additive)continue;const n=rn.target[t],i=ps.get(t);i&&(i[n]+=rn.value[t]*rn.intensity[t])}for(const t of Xc(e.world)){if(rn.mode[t]!==ar.Multiplicative)continue;const n=rn.target[t],i=ps.get(t);if(!i)continue;const r=rn.intensity[t],s=rn.value[t];i[n]*=1+(s-1)*r}}},cP={group:"draw",last:!0,before:[s0],update(e){for(const t of Xc(e.world)){const n=rn.target[t],i=ps.get(t);if(!i)continue;const r=fd.get(t);r!==void 0&&(i[n]=r)}}},lP={group:"simulation",last:!0,before:[o0],update(e){for(const t of ps.keys())e.hasComponent(t,rn)||(ps.delete(t),fd.delete(t))}},uP={systems:[n0,sP,i0,oP,aP,cP,lP,r0,s0,o0],components:{Tween:Je,TweenValue:Ee,KinematicTween:Ue,KinematicRotationTween:De,Sequence:de,Shaker:rn,TransformShaker:fe},recipes:[{name:"tween",components:[]},{name:"sequence",components:[]},{name:"shaker",components:[]}],config:{parsers:{tween:V3,sequence:H3,shaker:$3}}},ne=re({target:L.eid,inputSource:L.eid,currentYaw:L.f32,currentPitch:L.f32,currentDistance:L.f32,targetYaw:L.f32,targetPitch:L.f32,targetDistance:L.f32,minDistance:L.f32,maxDistance:L.f32,minPitch:L.f32,maxPitch:L.f32,smoothness:L.f32,offsetX:L.f32,offsetY:L.f32,offsetZ:L.f32,sensitivity:L.f32,zoomSensitivity:L.f32}),fP={name:"orbit-camera",components:["orbit-camera","transform","main-camera"]},_a=Math.PI*2;function hP(e){return(e%_a+_a)%_a}function dP(e,t){let n=t-e;for(;n>Math.PI;)n-=_a;for(;n<-Math.PI;)n+=_a;return n}function pP(e,t){return 1-Math.pow(1-e,t*60)}function mP(e,t){const n=pP(ne.smoothness[e],t),i=dP(ne.currentYaw[e],ne.targetYaw[e]);ne.currentYaw[e]+=i*n,ne.currentYaw[e]=hP(ne.currentYaw[e]),ne.currentPitch[e]+=(ne.targetPitch[e]-ne.currentPitch[e])*n,ne.currentDistance[e]+=(ne.targetDistance[e]-ne.currentDistance[e])*n}function gP(e,t){const n=ne.currentDistance[e],i=ne.currentYaw[e],r=Math.PI/2-ne.currentPitch[e],s=new FE(n,r,i);return new j().setFromSpherical(s).add(t)}function _P(e,t,n){Ze.posX[e]=t.x,Ze.posY[e]=t.y,Ze.posZ[e]=t.z;const i=new le;i.lookAt(t,n,new j(0,1,0));const r=new mi().setFromRotationMatrix(i);Ze.rotX[e]=r.x,Ze.rotY[e]=r.y,Ze.rotZ[e]=r.z,Ze.rotW[e]=r.w,Wh(Ze,e)}const a0=ee([ne,Ze]),vP=ee([ne]),yP=ee([Ie]),xP={group:"setup",update:e=>{const t=a0(e.world);for(const n of t){if(ne.target[n]===0){const i=e.createEntity();e.addComponent(i,Ze,{scaleX:1,scaleY:1,scaleZ:1}),ne.target[n]=i}if(ne.inputSource[n]===0){const i=yP(e.world);if(i.length>0)ne.inputSource[n]=i[0];else{const r=e.createEntity();e.addComponent(r,Ie),ne.inputSource[n]=r}}}}},SP={group:"simulation",update:e=>{const t=vP(e.world);for(const n of t){let i=ne.inputSource[n];if(!i&&e.hasComponent(n,Ie)&&(i=n,ne.inputSource[n]=n),!i||!e.hasComponent(i,Ie))continue;const r=ne.sensitivity[n],s=ne.zoomSensitivity[n],o=Ie.lookX[i],a=Ie.lookY[i],c=Ie.scrollDelta[i];if(Ie.rightMouse[i]===1){ne.targetYaw[n]-=o*r;const l=ne.targetPitch[n]+a*r,u=ne.minPitch[n],f=ne.maxPitch[n];ne.targetPitch[n]=Math.max(u,Math.min(f,l))}if(c!==0){const l=ne.targetDistance[n],u=ne.minDistance[n],f=ne.maxDistance[n],h=Math.max(.3,l*.08),d=c*s*h,m=l+d;ne.targetDistance[n]=Math.max(u,Math.min(f,m))}}}},MP={group:"draw",update:e=>{const t=a0(e.world);for(const n of t){const i=ne.target[n];if(!i||!e.hasComponent(i,Et))continue;mP(n,e.time.deltaTime);const r=new j(Et.posX[i]+ne.offsetX[n],Et.posY[i]+ne.offsetY[n],Et.posZ[i]+ne.offsetZ[n]),s=gP(n,r);_P(n,s,r)}}},bP={systems:[xP,SP,MP],recipes:[fP],components:{OrbitCamera:ne},config:{defaults:{"orbit-camera":{target:0,inputSource:0,currentDistance:4,targetDistance:4,currentYaw:0,targetYaw:0,currentPitch:Math.PI/6,targetPitch:Math.PI/6,minDistance:1,maxDistance:25,minPitch:0,maxPitch:Math.PI/2,smoothness:.5,offsetX:0,offsetY:1.25,offsetZ:0,sensitivity:.007,zoomSensitivity:1.5}}}},EP={systems:[QC],components:{InputState:Ie}},Cr=re({gap:L.f32,align:L.ui8,anchorX:L.ui8,anchorY:L.ui8,damping:L.f32}),ge=re({fontSize:L.f32,color:L.ui32,letterSpacing:L.f32,lineHeight:L.f32,outlineWidth:L.f32,outlineColor:L.ui32,outlineBlur:L.f32,outlineOffsetX:L.f32,outlineOffsetY:L.f32,outlineOpacity:L.f32,strokeWidth:L.f32,strokeColor:L.ui32,strokeOpacity:L.f32,fillOpacity:L.f32,curveRadius:L.f32,width:L.f32,dirty:L.ui8});var Zc=(e=>(e[e.Left=0]="Left",e[e.Center=1]="Center",e[e.Right=2]="Right",e))(Zc||{});const wP={name:"paragraph",components:["transform","paragraph"]},TP={name:"word",components:["transform","word"]};function AP(){var e=Object.create(null);function t(r,s){var o=r.id,a=r.name,c=r.dependencies;c===void 0&&(c=[]);var l=r.init;l===void 0&&(l=function(){});var u=r.getTransferables;if(u===void 0&&(u=null),!e[o])try{c=c.map(function(h){return h&&h.isWorkerModule&&(t(h,function(d){if(d instanceof Error)throw d}),h=e[h.id].value),h}),l=i("<"+a+">.init",l),u&&(u=i("<"+a+">.getTransferables",u));var f=null;typeof l=="function"?f=l.apply(void 0,c):console.error("worker module init function failed to rehydrate"),e[o]={id:o,value:f,getTransferables:u},s(f)}catch(h){h&&h.noLog||console.error(h),s(h)}}function n(r,s){var o,a=r.id,c=r.args;(!e[a]||typeof e[a].value!="function")&&s(new Error("Worker module "+a+": not found or its 'init' did not return a function"));try{var l=(o=e[a]).value.apply(o,c);l&&typeof l.then=="function"?l.then(u,function(f){return s(f instanceof Error?f:new Error(""+f))}):u(l)}catch(f){s(f)}function u(f){try{var h=e[a].getTransferables&&e[a].getTransferables(f);(!h||!Array.isArray(h)||!h.length)&&(h=void 0),s(f,h)}catch(d){console.error(d),s(d)}}}function i(r,s){var o=void 0;self.troikaDefine=function(c){return o=c};var a=URL.createObjectURL(new Blob(["/** "+r.replace(/\*/g,"")+` **/

troikaDefine(
`+s+`
)`],{type:"application/javascript"}));try{importScripts(a)}catch(c){console.error(c)}return URL.revokeObjectURL(a),delete self.troikaDefine,o}self.addEventListener("message",function(r){var s=r.data,o=s.messageId,a=s.action,c=s.data;try{a==="registerModule"&&t(c,function(l){l instanceof Error?postMessage({messageId:o,success:!1,error:l.message}):postMessage({messageId:o,success:!0,result:{isCallable:typeof l=="function"}})}),a==="callModule"&&n(c,function(l,u){l instanceof Error?postMessage({messageId:o,success:!1,error:l.message}):postMessage({messageId:o,success:!0,result:l},u||void 0)})}catch(l){postMessage({messageId:o,success:!1,error:l.stack})}})}function CP(e){var t=function(){for(var n=[],i=arguments.length;i--;)n[i]=arguments[i];return t._getInitResult().then(function(r){if(typeof r=="function")return r.apply(void 0,n);throw new Error("Worker module function was called but `init` did not return a callable function")})};return t._getInitResult=function(){var n=e.dependencies,i=e.init;n=Array.isArray(n)?n.map(function(s){return s&&(s=s.onMainThread||s,s._getInitResult&&(s=s._getInitResult())),s}):[];var r=Promise.all(n).then(function(s){return i.apply(null,s)});return t._getInitResult=function(){return r},r},t}var c0=function(){var e=!1;if(typeof window<"u"&&typeof window.document<"u")try{var t=new Worker(URL.createObjectURL(new Blob([""],{type:"application/javascript"})));t.terminate(),e=!0}catch(n){console.log("Troika createWorkerModule: web workers not allowed; falling back to main thread execution. Cause: ["+n.message+"]")}return c0=function(){return e},e},RP=0,PP=0,Gu=!1,va=Object.create(null),ya=Object.create(null),dh=Object.create(null);function Io(e){if((!e||typeof e.init!="function")&&!Gu)throw new Error("requires `options.init` function");var t=e.dependencies,n=e.init,i=e.getTransferables,r=e.workerId,s=CP(e);r==null&&(r="#default");var o="workerModule"+ ++RP,a=e.name||o,c=null;t=t&&t.map(function(u){return typeof u=="function"&&!u.workerModuleData&&(Gu=!0,u=Io({workerId:r,name:"<"+a+"> function dependency: "+u.name,init:`function(){return (
`+jc(u)+`
)}`}),Gu=!1),u&&u.workerModuleData&&(u=u.workerModuleData),u});function l(){for(var u=[],f=arguments.length;f--;)u[f]=arguments[f];if(!c0())return s.apply(void 0,u);if(!c){c=Vm(r,"registerModule",l.workerModuleData);var h=function(){c=null,ya[r].delete(h)};(ya[r]||(ya[r]=new Set)).add(h)}return c.then(function(d){var m=d.isCallable;if(m)return Vm(r,"callModule",{id:o,args:u});throw new Error("Worker module function was called but `init` did not return a callable function")})}return l.workerModuleData={isWorkerModule:!0,id:o,name:a,dependencies:t,init:jc(n),getTransferables:i&&jc(i)},l.onMainThread=s,l}function UP(e){ya[e]&&ya[e].forEach(function(t){t()}),va[e]&&(va[e].terminate(),delete va[e])}function jc(e){var t=e.toString();return!/^function/.test(t)&&/^\w+\s*\(/.test(t)&&(t="function "+t),t}function DP(e){var t=va[e];if(!t){var n=jc(AP);t=va[e]=new Worker(URL.createObjectURL(new Blob(["/** Worker Module Bootstrap: "+e.replace(/\*/g,"")+` **/

;(`+n+")()"],{type:"application/javascript"}))),t.onmessage=function(i){var r=i.data,s=r.messageId,o=dh[s];if(!o)throw new Error("WorkerModule response with empty or unknown messageId");delete dh[s],o(r)}}return t}function Vm(e,t,n){return new Promise(function(i,r){var s=++PP;dh[s]=function(o){o.success?i(o.result):r(new Error("Error in worker "+t+" call: "+o.error))},DP(e).postMessage({messageId:s,action:t,data:n})})}function l0(){var e=(function(t){function n(q,X,F,W,J,N,z,nt){var $=1-z;nt.x=$*$*q+2*$*z*F+z*z*J,nt.y=$*$*X+2*$*z*W+z*z*N}function i(q,X,F,W,J,N,z,nt,$,it){var vt=1-$;it.x=vt*vt*vt*q+3*vt*vt*$*F+3*vt*$*$*J+$*$*$*z,it.y=vt*vt*vt*X+3*vt*vt*$*W+3*vt*$*$*N+$*$*$*nt}function r(q,X){for(var F=/([MLQCZ])([^MLQCZ]*)/g,W,J,N,z,nt;W=F.exec(q);){var $=W[2].replace(/^\s*|\s*$/g,"").split(/[,\s]+/).map(function(it){return parseFloat(it)});switch(W[1]){case"M":z=J=$[0],nt=N=$[1];break;case"L":($[0]!==z||$[1]!==nt)&&X("L",z,nt,z=$[0],nt=$[1]);break;case"Q":{X("Q",z,nt,z=$[2],nt=$[3],$[0],$[1]);break}case"C":{X("C",z,nt,z=$[4],nt=$[5],$[0],$[1],$[2],$[3]);break}case"Z":(z!==J||nt!==N)&&X("L",z,nt,J,N);break}}}function s(q,X,F){F===void 0&&(F=16);var W={x:0,y:0};r(q,function(J,N,z,nt,$,it,vt,bt,St){switch(J){case"L":X(N,z,nt,$);break;case"Q":{for(var ct=N,Ot=z,k=1;k<F;k++)n(N,z,it,vt,nt,$,k/(F-1),W),X(ct,Ot,W.x,W.y),ct=W.x,Ot=W.y;break}case"C":{for(var It=N,wt=z,At=1;At<F;At++)i(N,z,it,vt,bt,St,nt,$,At/(F-1),W),X(It,wt,W.x,W.y),It=W.x,wt=W.y;break}}})}var o="precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",a="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}",c=new WeakMap,l={premultipliedAlpha:!1,preserveDrawingBuffer:!0,antialias:!1,depth:!1};function u(q,X){var F=q.getContext?q.getContext("webgl",l):q,W=c.get(F);if(!W){let vt=function(It){var wt=N[It];if(!wt&&(wt=N[It]=F.getExtension(It),!wt))throw new Error(It+" not supported");return wt},bt=function(It,wt){var At=F.createShader(wt);return F.shaderSource(At,It),F.compileShader(At),At},St=function(It,wt,At,at){if(!z[It]){var Pt={},yt={},A=F.createProgram();F.attachShader(A,bt(wt,F.VERTEX_SHADER)),F.attachShader(A,bt(At,F.FRAGMENT_SHADER)),F.linkProgram(A),z[It]={program:A,transaction:function(B){F.useProgram(A),B({setUniform:function(K,ot){for(var gt=[],lt=arguments.length-2;lt-- >0;)gt[lt]=arguments[lt+2];var dt=yt[ot]||(yt[ot]=F.getUniformLocation(A,ot));F["uniform"+K].apply(F,[dt].concat(gt))},setAttribute:function(K,ot,gt,lt,dt){var Lt=Pt[K];Lt||(Lt=Pt[K]={buf:F.createBuffer(),loc:F.getAttribLocation(A,K),data:null}),F.bindBuffer(F.ARRAY_BUFFER,Lt.buf),F.vertexAttribPointer(Lt.loc,ot,F.FLOAT,!1,0,0),F.enableVertexAttribArray(Lt.loc),J?F.vertexAttribDivisor(Lt.loc,lt):vt("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(Lt.loc,lt),dt!==Lt.data&&(F.bufferData(F.ARRAY_BUFFER,dt,gt),Lt.data=dt)}})}}}z[It].transaction(at)},ct=function(It,wt){$++;try{F.activeTexture(F.TEXTURE0+$);var At=nt[It];At||(At=nt[It]=F.createTexture(),F.bindTexture(F.TEXTURE_2D,At),F.texParameteri(F.TEXTURE_2D,F.TEXTURE_MIN_FILTER,F.NEAREST),F.texParameteri(F.TEXTURE_2D,F.TEXTURE_MAG_FILTER,F.NEAREST)),F.bindTexture(F.TEXTURE_2D,At),wt(At,$)}finally{$--}},Ot=function(It,wt,At){var at=F.createFramebuffer();it.push(at),F.bindFramebuffer(F.FRAMEBUFFER,at),F.activeTexture(F.TEXTURE0+wt),F.bindTexture(F.TEXTURE_2D,It),F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,It,0);try{At(at)}finally{F.deleteFramebuffer(at),F.bindFramebuffer(F.FRAMEBUFFER,it[--it.length-1]||null)}},k=function(){N={},z={},nt={},$=-1,it.length=0};var J=typeof WebGL2RenderingContext<"u"&&F instanceof WebGL2RenderingContext,N={},z={},nt={},$=-1,it=[];F.canvas.addEventListener("webglcontextlost",function(It){k(),It.preventDefault()},!1),c.set(F,W={gl:F,isWebGL2:J,getExtension:vt,withProgram:St,withTexture:ct,withTextureFramebuffer:Ot,handleContextLoss:k})}X(W)}function f(q,X,F,W,J,N,z,nt){z===void 0&&(z=15),nt===void 0&&(nt=null),u(q,function($){var it=$.gl,vt=$.withProgram,bt=$.withTexture;bt("copy",function(St,ct){it.texImage2D(it.TEXTURE_2D,0,it.RGBA,J,N,0,it.RGBA,it.UNSIGNED_BYTE,X),vt("copy",o,a,function(Ot){var k=Ot.setUniform,It=Ot.setAttribute;It("aUV",2,it.STATIC_DRAW,0,new Float32Array([0,0,2,0,0,2])),k("1i","image",ct),it.bindFramebuffer(it.FRAMEBUFFER,nt||null),it.disable(it.BLEND),it.colorMask(z&8,z&4,z&2,z&1),it.viewport(F,W,J,N),it.scissor(F,W,J,N),it.drawArrays(it.TRIANGLES,0,3)})})})}function h(q,X,F){var W=q.width,J=q.height;u(q,function(N){var z=N.gl,nt=new Uint8Array(W*J*4);z.readPixels(0,0,W,J,z.RGBA,z.UNSIGNED_BYTE,nt),q.width=X,q.height=F,f(z,nt,0,0,W,J)})}var d=Object.freeze({__proto__:null,withWebGLContext:u,renderImageData:f,resizeWebGLCanvasWithoutClearing:h});function m(q,X,F,W,J,N){N===void 0&&(N=1);var z=new Uint8Array(q*X),nt=W[2]-W[0],$=W[3]-W[1],it=[];s(F,function(It,wt,At,at){it.push({x1:It,y1:wt,x2:At,y2:at,minX:Math.min(It,At),minY:Math.min(wt,at),maxX:Math.max(It,At),maxY:Math.max(wt,at)})}),it.sort(function(It,wt){return It.maxX-wt.maxX});for(var vt=0;vt<q;vt++)for(var bt=0;bt<X;bt++){var St=Ot(W[0]+nt*(vt+.5)/q,W[1]+$*(bt+.5)/X),ct=Math.pow(1-Math.abs(St)/J,N)/2;St<0&&(ct=1-ct),ct=Math.max(0,Math.min(255,Math.round(ct*255))),z[bt*q+vt]=ct}return z;function Ot(It,wt){for(var At=1/0,at=1/0,Pt=it.length;Pt--;){var yt=it[Pt];if(yt.maxX+at<=It)break;if(It+at>yt.minX&&wt-at<yt.maxY&&wt+at>yt.minY){var A=p(It,wt,yt.x1,yt.y1,yt.x2,yt.y2);A<At&&(At=A,at=Math.sqrt(At))}}return k(It,wt)&&(at=-at),at}function k(It,wt){for(var At=0,at=it.length;at--;){var Pt=it[at];if(Pt.maxX<=It)break;var yt=Pt.y1>wt!=Pt.y2>wt&&It<(Pt.x2-Pt.x1)*(wt-Pt.y1)/(Pt.y2-Pt.y1)+Pt.x1;yt&&(At+=Pt.y1<Pt.y2?1:-1)}return At!==0}}function _(q,X,F,W,J,N,z,nt,$,it){N===void 0&&(N=1),nt===void 0&&(nt=0),$===void 0&&($=0),it===void 0&&(it=0),g(q,X,F,W,J,N,z,null,nt,$,it)}function g(q,X,F,W,J,N,z,nt,$,it,vt){N===void 0&&(N=1),$===void 0&&($=0),it===void 0&&(it=0),vt===void 0&&(vt=0);for(var bt=m(q,X,F,W,J,N),St=new Uint8Array(bt.length*4),ct=0;ct<bt.length;ct++)St[ct*4+vt]=bt[ct];f(z,St,$,it,q,X,1<<3-vt,nt)}function p(q,X,F,W,J,N){var z=J-F,nt=N-W,$=z*z+nt*nt,it=$?Math.max(0,Math.min(1,((q-F)*z+(X-W)*nt)/$)):0,vt=q-(F+it*z),bt=X-(W+it*nt);return vt*vt+bt*bt}var y=Object.freeze({__proto__:null,generate:m,generateIntoCanvas:_,generateIntoFramebuffer:g}),x="precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",v="precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}",T="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}",b=new Float32Array([0,0,2,0,0,2]),w=null,C=!1,M={},S=new WeakMap;function U(q){if(!C&&!V(q))throw new Error("WebGL generation not supported")}function P(q,X,F,W,J,N,z){if(N===void 0&&(N=1),z===void 0&&(z=null),!z&&(z=w,!z)){var nt=typeof OffscreenCanvas=="function"?new OffscreenCanvas(1,1):typeof document<"u"?document.createElement("canvas"):null;if(!nt)throw new Error("OffscreenCanvas or DOM canvas not supported");z=w=nt.getContext("webgl",{depth:!1})}U(z);var $=new Uint8Array(q*X*4);u(z,function(St){var ct=St.gl,Ot=St.withTexture,k=St.withTextureFramebuffer;Ot("readable",function(It,wt){ct.texImage2D(ct.TEXTURE_2D,0,ct.RGBA,q,X,0,ct.RGBA,ct.UNSIGNED_BYTE,null),k(It,wt,function(At){I(q,X,F,W,J,N,ct,At,0,0,0),ct.readPixels(0,0,q,X,ct.RGBA,ct.UNSIGNED_BYTE,$)})})});for(var it=new Uint8Array(q*X),vt=0,bt=0;vt<$.length;vt+=4)it[bt++]=$[vt];return it}function D(q,X,F,W,J,N,z,nt,$,it){N===void 0&&(N=1),nt===void 0&&(nt=0),$===void 0&&($=0),it===void 0&&(it=0),I(q,X,F,W,J,N,z,null,nt,$,it)}function I(q,X,F,W,J,N,z,nt,$,it,vt){N===void 0&&(N=1),$===void 0&&($=0),it===void 0&&(it=0),vt===void 0&&(vt=0),U(z);var bt=[];s(F,function(St,ct,Ot,k){bt.push(St,ct,Ot,k)}),bt=new Float32Array(bt),u(z,function(St){var ct=St.gl,Ot=St.isWebGL2,k=St.getExtension,It=St.withProgram,wt=St.withTexture,At=St.withTextureFramebuffer,at=St.handleContextLoss;if(wt("rawDistances",function(Pt,yt){(q!==Pt._lastWidth||X!==Pt._lastHeight)&&ct.texImage2D(ct.TEXTURE_2D,0,ct.RGBA,Pt._lastWidth=q,Pt._lastHeight=X,0,ct.RGBA,ct.UNSIGNED_BYTE,null),It("main",x,v,function(A){var E=A.setAttribute,B=A.setUniform,Q=!Ot&&k("ANGLE_instanced_arrays"),K=!Ot&&k("EXT_blend_minmax");E("aUV",2,ct.STATIC_DRAW,0,b),E("aLineSegment",4,ct.DYNAMIC_DRAW,1,bt),B.apply(void 0,["4f","uGlyphBounds"].concat(W)),B("1f","uMaxDistance",J),B("1f","uExponent",N),At(Pt,yt,function(ot){ct.enable(ct.BLEND),ct.colorMask(!0,!0,!0,!0),ct.viewport(0,0,q,X),ct.scissor(0,0,q,X),ct.blendFunc(ct.ONE,ct.ONE),ct.blendEquationSeparate(ct.FUNC_ADD,Ot?ct.MAX:K.MAX_EXT),ct.clear(ct.COLOR_BUFFER_BIT),Ot?ct.drawArraysInstanced(ct.TRIANGLES,0,3,bt.length/4):Q.drawArraysInstancedANGLE(ct.TRIANGLES,0,3,bt.length/4)})}),It("post",o,T,function(A){A.setAttribute("aUV",2,ct.STATIC_DRAW,0,b),A.setUniform("1i","tex",yt),ct.bindFramebuffer(ct.FRAMEBUFFER,nt),ct.disable(ct.BLEND),ct.colorMask(vt===0,vt===1,vt===2,vt===3),ct.viewport($,it,q,X),ct.scissor($,it,q,X),ct.drawArrays(ct.TRIANGLES,0,3)})}),ct.isContextLost())throw at(),new Error("webgl context lost")})}function V(q){var X=!q||q===w?M:q.canvas||q,F=S.get(X);if(F===void 0){C=!0;var W=null;try{var J=[97,106,97,61,99,137,118,80,80,118,137,99,61,97,106,97],N=P(4,4,"M8,8L16,8L24,24L16,24Z",[0,0,32,32],24,1,q);F=N&&J.length===N.length&&N.every(function(z,nt){return z===J[nt]}),F||(W="bad trial run results",console.info(J,N))}catch(z){F=!1,W=z.message}W&&console.warn("WebGL SDF generation not supported:",W),C=!1,S.set(X,F)}return F}var O=Object.freeze({__proto__:null,generate:P,generateIntoCanvas:D,generateIntoFramebuffer:I,isSupported:V});function tt(q,X,F,W,J,N){J===void 0&&(J=Math.max(W[2]-W[0],W[3]-W[1])/2),N===void 0&&(N=1);try{return P.apply(O,arguments)}catch(z){return console.info("WebGL SDF generation failed, falling back to JS",z),m.apply(y,arguments)}}function H(q,X,F,W,J,N,z,nt,$,it){J===void 0&&(J=Math.max(W[2]-W[0],W[3]-W[1])/2),N===void 0&&(N=1),nt===void 0&&(nt=0),$===void 0&&($=0),it===void 0&&(it=0);try{return D.apply(O,arguments)}catch(vt){return console.info("WebGL SDF generation failed, falling back to JS",vt),_.apply(y,arguments)}}return t.forEachPathCommand=r,t.generate=tt,t.generateIntoCanvas=H,t.javascript=y,t.pathToLineSegments=s,t.webgl=O,t.webglUtils=d,Object.defineProperty(t,"__esModule",{value:!0}),t})({});return e}function IP(){var e=(function(t){var n={R:"13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",EN:"1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",ES:"17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",ET:"z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",AN:"16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",CS:"18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",B:"a,3,f+2,2v,690",S:"9,2,k",WS:"c,k,4f4,1vk+a,u,1j,335",ON:"x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",BN:"0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",NSM:"lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",AL:"16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",LRO:"6ct",RLO:"6cu",LRE:"6cq",RLE:"6cr",PDF:"6cs",LRI:"6ee",RLI:"6ef",FSI:"6eg",PDI:"6eh"},i={},r={};i.L=1,r[1]="L",Object.keys(n).forEach(function(at,Pt){i[at]=1<<Pt+1,r[i[at]]=at}),Object.freeze(i);var s=i.LRI|i.RLI|i.FSI,o=i.L|i.R|i.AL,a=i.B|i.S|i.WS|i.ON|i.FSI|i.LRI|i.RLI|i.PDI,c=i.BN|i.RLE|i.LRE|i.RLO|i.LRO|i.PDF,l=i.S|i.WS|i.B|s|i.PDI|c,u=null;function f(){if(!u){u=new Map;var at=function(yt){if(n.hasOwnProperty(yt)){var A=0;n[yt].split(",").forEach(function(E){var B=E.split("+"),Q=B[0],K=B[1];Q=parseInt(Q,36),K=K?parseInt(K,36):0,u.set(A+=Q,i[yt]);for(var ot=0;ot<K;ot++)u.set(++A,i[yt])})}};for(var Pt in n)at(Pt)}}function h(at){return f(),u.get(at.codePointAt(0))||i.L}function d(at){return r[h(at)]}var m={pairs:"14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",canonical:"6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye"};function _(at,Pt){var yt=36,A=0,E=new Map,B=Pt&&new Map,Q;return at.split(",").forEach(function K(ot){if(ot.indexOf("+")!==-1)for(var gt=+ot;gt--;)K(Q);else{Q=ot;var lt=ot.split(">"),dt=lt[0],Lt=lt[1];dt=String.fromCodePoint(A+=parseInt(dt,yt)),Lt=String.fromCodePoint(A+=parseInt(Lt,yt)),E.set(dt,Lt),Pt&&B.set(Lt,dt)}}),{map:E,reverseMap:B}}var g,p,y;function x(){if(!g){var at=_(m.pairs,!0),Pt=at.map,yt=at.reverseMap;g=Pt,p=yt,y=_(m.canonical,!1).map}}function v(at){return x(),g.get(at)||null}function T(at){return x(),p.get(at)||null}function b(at){return x(),y.get(at)||null}var w=i.L,C=i.R,M=i.EN,S=i.ES,U=i.ET,P=i.AN,D=i.CS,I=i.B,V=i.S,O=i.ON,tt=i.BN,H=i.NSM,q=i.AL,X=i.LRO,F=i.RLO,W=i.LRE,J=i.RLE,N=i.PDF,z=i.LRI,nt=i.RLI,$=i.FSI,it=i.PDI;function vt(at,Pt){for(var yt=125,A=new Uint32Array(at.length),E=0;E<at.length;E++)A[E]=h(at[E]);var B=new Map;function Q(In,xi){var Ln=A[In];A[In]=xi,B.set(Ln,B.get(Ln)-1),Ln&a&&B.set(a,B.get(a)-1),B.set(xi,(B.get(xi)||0)+1),xi&a&&B.set(a,(B.get(a)||0)+1)}for(var K=new Uint8Array(at.length),ot=new Map,gt=[],lt=null,dt=0;dt<at.length;dt++)lt||gt.push(lt={start:dt,end:at.length-1,level:Pt==="rtl"?1:Pt==="ltr"?0:Td(dt,!1)}),A[dt]&I&&(lt.end=dt,lt=null);for(var Lt=J|W|F|X|s|it|N|I,_t=function(In){return In+(In&1?1:2)},Ct=function(In){return In+(In&1?2:1)},Rt=0;Rt<gt.length;Rt++){lt=gt[Rt];var Ut=[{_level:lt.level,_override:0,_isolate:0}],ht=void 0,Ht=0,Ft=0,Qt=0;B.clear();for(var G=lt.start;G<=lt.end;G++){var ft=A[G];if(ht=Ut[Ut.length-1],B.set(ft,(B.get(ft)||0)+1),ft&a&&B.set(a,(B.get(a)||0)+1),ft&Lt)if(ft&(J|W)){K[G]=ht._level;var et=(ft===J?Ct:_t)(ht._level);et<=yt&&!Ht&&!Ft?Ut.push({_level:et,_override:0,_isolate:0}):Ht||Ft++}else if(ft&(F|X)){K[G]=ht._level;var pt=(ft===F?Ct:_t)(ht._level);pt<=yt&&!Ht&&!Ft?Ut.push({_level:pt,_override:ft&F?C:w,_isolate:0}):Ht||Ft++}else if(ft&s){ft&$&&(ft=Td(G+1,!0)===1?nt:z),K[G]=ht._level,ht._override&&Q(G,ht._override);var Mt=(ft===nt?Ct:_t)(ht._level);Mt<=yt&&Ht===0&&Ft===0?(Qt++,Ut.push({_level:Mt,_override:0,_isolate:1,_isolInitIndex:G})):Ht++}else if(ft&it){if(Ht>0)Ht--;else if(Qt>0){for(Ft=0;!Ut[Ut.length-1]._isolate;)Ut.pop();var xt=Ut[Ut.length-1]._isolInitIndex;xt!=null&&(ot.set(xt,G),ot.set(G,xt)),Ut.pop(),Qt--}ht=Ut[Ut.length-1],K[G]=ht._level,ht._override&&Q(G,ht._override)}else ft&N?(Ht===0&&(Ft>0?Ft--:!ht._isolate&&Ut.length>1&&(Ut.pop(),ht=Ut[Ut.length-1])),K[G]=ht._level):ft&I&&(K[G]=lt.level);else K[G]=ht._level,ht._override&&ft!==tt&&Q(G,ht._override)}for(var kt=[],Zt=null,Vt=lt.start;Vt<=lt.end;Vt++){var Xt=A[Vt];if(!(Xt&c)){var we=K[Vt],Re=Xt&s,Be=Xt===it;Zt&&we===Zt._level?(Zt._end=Vt,Zt._endsWithIsolInit=Re):kt.push(Zt={_start:Vt,_end:Vt,_level:we,_startsWithPDI:Be,_endsWithIsolInit:Re})}}for(var Cn=[],_n=0;_n<kt.length;_n++){var Wn=kt[_n];if(!Wn._startsWithPDI||Wn._startsWithPDI&&!ot.has(Wn._start)){for(var vi=[Zt=Wn],Ri=void 0;Zt&&Zt._endsWithIsolInit&&(Ri=ot.get(Zt._end))!=null;)for(var Rn=_n+1;Rn<kt.length;Rn++)if(kt[Rn]._start===Ri){vi.push(Zt=kt[Rn]);break}for(var en=[],si=0;si<vi.length;si++)for(var Fo=vi[si],Cs=Fo._start;Cs<=Fo._end;Cs++)en.push(Cs);for(var Ol=K[en[0]],Wa=lt.level,Rs=en[0]-1;Rs>=0;Rs--)if(!(A[Rs]&c)){Wa=K[Rs];break}var R=en[en.length-1],Z=K[R],st=lt.level;if(!(A[R]&s)){for(var rt=R+1;rt<=lt.end;rt++)if(!(A[rt]&c)){st=K[rt];break}}Cn.push({_seqIndices:en,_sosType:Math.max(Wa,Ol)%2?C:w,_eosType:Math.max(st,Z)%2?C:w})}}for(var Y=0;Y<Cn.length;Y++){var Tt=Cn[Y],ut=Tt._seqIndices,Nt=Tt._sosType,Bt=Tt._eosType,Yt=K[ut[0]]&1?C:w;if(B.get(H))for(var jt=0;jt<ut.length;jt++){var zt=ut[jt];if(A[zt]&H){for(var se=Nt,me=jt-1;me>=0;me--)if(!(A[ut[me]]&c)){se=A[ut[me]];break}Q(zt,se&(s|it)?O:se)}}if(B.get(M))for(var ve=0;ve<ut.length;ve++){var an=ut[ve];if(A[an]&M)for(var ae=ve-1;ae>=-1;ae--){var Gt=ae===-1?Nt:A[ut[ae]];if(Gt&o){Gt===q&&Q(an,P);break}}}if(B.get(q))for(var $n=0;$n<ut.length;$n++){var ue=ut[$n];A[ue]&q&&Q(ue,C)}if(B.get(S)||B.get(D))for(var cn=1;cn<ut.length-1;cn++){var Pi=ut[cn];if(A[Pi]&(S|D)){for(var Xe=0,Hi=0,ye=cn-1;ye>=0&&(Xe=A[ut[ye]],!!(Xe&c));ye--);for(var Pn=cn+1;Pn<ut.length&&(Hi=A[ut[Pn]],!!(Hi&c));Pn++);Xe===Hi&&(A[Pi]===S?Xe===M:Xe&(M|P))&&Q(Pi,Xe)}}if(B.get(M))for(var vn=0;vn<ut.length;vn++){var Un=ut[vn];if(A[Un]&M){for(var Xn=vn-1;Xn>=0&&A[ut[Xn]]&(U|c);Xn--)Q(ut[Xn],M);for(vn++;vn<ut.length&&A[ut[vn]]&(U|c|M);vn++)A[ut[vn]]!==M&&Q(ut[vn],M)}}if(B.get(U)||B.get(S)||B.get(D))for(var Dn=0;Dn<ut.length;Dn++){var No=ut[Dn];if(A[No]&(U|S|D)){Q(No,O);for(var $a=Dn-1;$a>=0&&A[ut[$a]]&c;$a--)Q(ut[$a],O);for(var Xa=Dn+1;Xa<ut.length&&A[ut[Xa]]&c;Xa++)Q(ut[Xa],O)}}if(B.get(M))for(var kl=0,pd=Nt;kl<ut.length;kl++){var md=ut[kl],zl=A[md];zl&M?pd===w&&Q(md,w):zl&o&&(pd=zl)}if(B.get(a)){var Oo=C|M|P,gd=Oo|w,Ya=[];{for(var Ps=[],Us=0;Us<ut.length;Us++)if(A[ut[Us]]&a){var ko=at[ut[Us]],_d=void 0;if(v(ko)!==null)if(Ps.length<63)Ps.push({char:ko,seqIndex:Us});else break;else if((_d=T(ko))!==null)for(var zo=Ps.length-1;zo>=0;zo--){var Bl=Ps[zo].char;if(Bl===_d||Bl===T(b(ko))||v(b(Bl))===ko){Ya.push([Ps[zo].seqIndex,Us]),Ps.length=zo;break}}}Ya.sort(function(In,xi){return In[0]-xi[0]})}for(var Gl=0;Gl<Ya.length;Gl++){for(var vd=Ya[Gl],Za=vd[0],Vl=vd[1],yd=!1,yi=0,Hl=Za+1;Hl<Vl;Hl++){var xd=ut[Hl];if(A[xd]&gd){yd=!0;var Sd=A[xd]&Oo?C:w;if(Sd===Yt){yi=Sd;break}}}if(yd&&!yi){yi=Nt;for(var Wl=Za-1;Wl>=0;Wl--){var Md=ut[Wl];if(A[Md]&gd){var bd=A[Md]&Oo?C:w;bd!==Yt?yi=bd:yi=Yt;break}}}if(yi){if(A[ut[Za]]=A[ut[Vl]]=yi,yi!==Yt){for(var Bo=Za+1;Bo<ut.length;Bo++)if(!(A[ut[Bo]]&c)){h(at[ut[Bo]])&H&&(A[ut[Bo]]=yi);break}}if(yi!==Yt){for(var Go=Vl+1;Go<ut.length;Go++)if(!(A[ut[Go]]&c)){h(at[ut[Go]])&H&&(A[ut[Go]]=yi);break}}}}for(var fr=0;fr<ut.length;fr++)if(A[ut[fr]]&a){for(var Ed=fr,$l=fr,Xl=Nt,Vo=fr-1;Vo>=0;Vo--)if(A[ut[Vo]]&c)Ed=Vo;else{Xl=A[ut[Vo]]&Oo?C:w;break}for(var wd=Bt,Ho=fr+1;Ho<ut.length;Ho++)if(A[ut[Ho]]&(a|c))$l=Ho;else{wd=A[ut[Ho]]&Oo?C:w;break}for(var Yl=Ed;Yl<=$l;Yl++)A[ut[Yl]]=Xl===wd?Xl:Yt;fr=$l}}}for(var Yn=lt.start;Yn<=lt.end;Yn++){var S0=K[Yn],ja=A[Yn];if(S0&1?ja&(w|M|P)&&K[Yn]++:ja&C?K[Yn]++:ja&(P|M)&&(K[Yn]+=2),ja&c&&(K[Yn]=Yn===0?lt.level:K[Yn-1]),Yn===lt.end||h(at[Yn])&(V|I))for(var qa=Yn;qa>=0&&h(at[qa])&l;qa--)K[qa]=lt.level}}return{levels:K,paragraphs:gt};function Td(In,xi){for(var Ln=In;Ln<at.length;Ln++){var hr=A[Ln];if(hr&(C|q))return 1;if(hr&(I|w)||xi&&hr===it)return 0;if(hr&s){var Ad=M0(Ln);Ln=Ad===-1?at.length:Ad}}return 0}function M0(In){for(var xi=1,Ln=In+1;Ln<at.length;Ln++){var hr=A[Ln];if(hr&I)break;if(hr&it){if(--xi===0)return Ln}else hr&s&&xi++}return-1}}var bt="14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1",St;function ct(){if(!St){var at=_(bt,!0),Pt=at.map,yt=at.reverseMap;yt.forEach(function(A,E){Pt.set(E,A)}),St=Pt}}function Ot(at){return ct(),St.get(at)||null}function k(at,Pt,yt,A){var E=at.length;yt=Math.max(0,yt==null?0:+yt),A=Math.min(E-1,A==null?E-1:+A);for(var B=new Map,Q=yt;Q<=A;Q++)if(Pt[Q]&1){var K=Ot(at[Q]);K!==null&&B.set(Q,K)}return B}function It(at,Pt,yt,A){var E=at.length;yt=Math.max(0,yt==null?0:+yt),A=Math.min(E-1,A==null?E-1:+A);var B=[];return Pt.paragraphs.forEach(function(Q){var K=Math.max(yt,Q.start),ot=Math.min(A,Q.end);if(K<ot){for(var gt=Pt.levels.slice(K,ot+1),lt=ot;lt>=K&&h(at[lt])&l;lt--)gt[lt]=Q.level;for(var dt=Q.level,Lt=1/0,_t=0;_t<gt.length;_t++){var Ct=gt[_t];Ct>dt&&(dt=Ct),Ct<Lt&&(Lt=Ct|1)}for(var Rt=dt;Rt>=Lt;Rt--)for(var Ut=0;Ut<gt.length;Ut++)if(gt[Ut]>=Rt){for(var ht=Ut;Ut+1<gt.length&&gt[Ut+1]>=Rt;)Ut++;Ut>ht&&B.push([ht+K,Ut+K])}}}),B}function wt(at,Pt,yt,A){var E=At(at,Pt,yt,A),B=[].concat(at);return E.forEach(function(Q,K){B[K]=(Pt.levels[Q]&1?Ot(at[Q]):null)||at[Q]}),B.join("")}function At(at,Pt,yt,A){for(var E=It(at,Pt,yt,A),B=[],Q=0;Q<at.length;Q++)B[Q]=Q;return E.forEach(function(K){for(var ot=K[0],gt=K[1],lt=B.slice(ot,gt+1),dt=lt.length;dt--;)B[gt-dt]=lt[dt]}),B}return t.closingToOpeningBracket=T,t.getBidiCharType=h,t.getBidiCharTypeName=d,t.getCanonicalBracket=b,t.getEmbeddingLevels=vt,t.getMirroredCharacter=Ot,t.getMirroredCharactersMap=k,t.getReorderSegments=It,t.getReorderedIndices=At,t.getReorderedString=wt,t.openingToClosingBracket=v,Object.defineProperty(t,"__esModule",{value:!0}),t})({});return e}const u0=/\bvoid\s+main\s*\(\s*\)\s*{/g;function ph(e){const t=/^[ \t]*#include +<([\w\d./]+)>/gm;function n(i,r){let s=te[r];return s?ph(s):i}return e.replace(t,n)}const fn=[];for(let e=0;e<256;e++)fn[e]=(e<16?"0":"")+e.toString(16);function LP(){const e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(fn[e&255]+fn[e>>8&255]+fn[e>>16&255]+fn[e>>24&255]+"-"+fn[t&255]+fn[t>>8&255]+"-"+fn[t>>16&15|64]+fn[t>>24&255]+"-"+fn[n&63|128]+fn[n>>8&255]+"-"+fn[n>>16&255]+fn[n>>24&255]+fn[i&255]+fn[i>>8&255]+fn[i>>16&255]+fn[i>>24&255]).toUpperCase()}const Kr=Object.assign||function(){let e=arguments[0];for(let t=1,n=arguments.length;t<n;t++){let i=arguments[t];if(i)for(let r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e},FP=Date.now(),Hm=new WeakMap,Wm=new Map;let NP=1e10;function mh(e,t){const n=BP(t);let i=Hm.get(e);if(i||Hm.set(e,i=Object.create(null)),i[n])return new i[n];const r=`_onBeforeCompile${n}`,s=function(l,u){e.onBeforeCompile.call(this,l,u);const f=this.customProgramCacheKey()+"|"+l.vertexShader+"|"+l.fragmentShader;let h=Wm[f];if(!h){const d=OP(this,l,t,n);h=Wm[f]=d}l.vertexShader=h.vertexShader,l.fragmentShader=h.fragmentShader,Kr(l.uniforms,this.uniforms),t.timeUniform&&(l.uniforms[t.timeUniform]={get value(){return Date.now()-FP}}),this[r]&&this[r](l)},o=function(){return a(t.chained?e:e.clone())},a=function(l){const u=Object.create(l,c);return Object.defineProperty(u,"baseMaterial",{value:e}),Object.defineProperty(u,"id",{value:NP++}),u.uuid=LP(),u.uniforms=Kr({},l.uniforms,t.uniforms),u.defines=Kr({},l.defines,t.defines),u.defines[`TROIKA_DERIVED_MATERIAL_${n}`]="",u.extensions=Kr({},l.extensions,t.extensions),u._listeners=void 0,u},c={constructor:{value:o},isDerivedMaterial:{value:!0},type:{get:()=>e.type,set:l=>{e.type=l}},isDerivedFrom:{writable:!0,configurable:!0,value:function(l){const u=this.baseMaterial;return l===u||u.isDerivedMaterial&&u.isDerivedFrom(l)||!1}},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return e.customProgramCacheKey()+"|"+n}},onBeforeCompile:{get(){return s},set(l){this[r]=l}},copy:{writable:!0,configurable:!0,value:function(l){return e.copy.call(this,l),!e.isShaderMaterial&&!e.isDerivedMaterial&&(Kr(this.extensions,l.extensions),Kr(this.defines,l.defines),Kr(this.uniforms,bl.clone(l.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){const l=new e.constructor;return a(l).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let l=this._depthMaterial;return l||(l=this._depthMaterial=mh(e.isDerivedMaterial?e.getDepthMaterial():new t_({depthPacking:Fg}),t),l.defines.IS_DEPTH_MATERIAL="",l.uniforms=this.uniforms),l}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let l=this._distanceMaterial;return l||(l=this._distanceMaterial=mh(e.isDerivedMaterial?e.getDistanceMaterial():new e_,t),l.defines.IS_DISTANCE_MATERIAL="",l.uniforms=this.uniforms),l}},dispose:{writable:!0,configurable:!0,value(){const{_depthMaterial:l,_distanceMaterial:u}=this;l&&l.dispose(),u&&u.dispose(),e.dispose.call(this)}}};return i[n]=o,new o}function OP(e,{vertexShader:t,fragmentShader:n},i,r){let{vertexDefs:s,vertexMainIntro:o,vertexMainOutro:a,vertexTransform:c,fragmentDefs:l,fragmentMainIntro:u,fragmentMainOutro:f,fragmentColorTransform:h,customRewriter:d,timeUniform:m}=i;if(s=s||"",o=o||"",a=a||"",l=l||"",u=u||"",f=f||"",(c||d)&&(t=ph(t)),(h||d)&&(n=n.replace(/^[ \t]*#include <((?:tonemapping|encodings|colorspace|fog|premultiplied_alpha|dithering)_fragment)>/gm,`
//!BEGIN_POST_CHUNK $1
$&
//!END_POST_CHUNK
`),n=ph(n)),d){let _=d({vertexShader:t,fragmentShader:n});t=_.vertexShader,n=_.fragmentShader}if(h){let _=[];n=n.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,g=>(_.push(g),"")),f=`${h}
${_.join(`
`)}
${f}`}if(m){const _=`
uniform float ${m};
`;s=_+s,l=_+l}return c&&(t=`vec3 troika_position_${r};
vec3 troika_normal_${r};
vec2 troika_uv_${r};
${t}
`,s=`${s}
void troikaVertexTransform${r}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${c}
}
`,o=`
troika_position_${r} = vec3(position);
troika_normal_${r} = vec3(normal);
troika_uv_${r} = vec2(uv);
troikaVertexTransform${r}(troika_position_${r}, troika_normal_${r}, troika_uv_${r});
${o}
`,t=t.replace(/\b(position|normal|uv)\b/g,(_,g,p,y)=>/\battribute\s+vec[23]\s+$/.test(y.substr(0,p))?g:`troika_${g}_${r}`),e.map&&e.map.channel>0||(t=t.replace(/\bMAP_UV\b/g,`troika_uv_${r}`))),t=$m(t,r,s,o,a),n=$m(n,r,l,u,f),{vertexShader:t,fragmentShader:n}}function $m(e,t,n,i,r){return(i||r||n)&&(e=e.replace(u0,`
${n}
void troikaOrigMain${t}() {`),e+=`
void main() {
  ${i}
  troikaOrigMain${t}();
  ${r}
}`),e}function kP(e,t){return e==="uniforms"?void 0:typeof t=="function"?t.toString():t}let zP=0;const Xm=new Map;function BP(e){const t=JSON.stringify(e,kP);let n=Xm.get(t);return n==null&&Xm.set(t,n=++zP),n}function GP(){return typeof window>"u"&&(self.window=self),(function(e){var t={parse:function(r){var s=t._bin,o=new Uint8Array(r);if(s.readASCII(o,0,4)=="ttcf"){var a=4;s.readUshort(o,a),a+=2,s.readUshort(o,a),a+=2;var c=s.readUint(o,a);a+=4;for(var l=[],u=0;u<c;u++){var f=s.readUint(o,a);a+=4,l.push(t._readFont(o,f))}return l}return[t._readFont(o,0)]},_readFont:function(r,s){var o=t._bin,a=s;o.readFixed(r,s),s+=4;var c=o.readUshort(r,s);s+=2,o.readUshort(r,s),s+=2,o.readUshort(r,s),s+=2,o.readUshort(r,s),s+=2;for(var l=["cmap","head","hhea","maxp","hmtx","name","OS/2","post","loca","glyf","kern","CFF ","GDEF","GPOS","GSUB","SVG "],u={_data:r,_offset:a},f={},h=0;h<c;h++){var d=o.readASCII(r,s,4);s+=4,o.readUint(r,s),s+=4;var m=o.readUint(r,s);s+=4;var _=o.readUint(r,s);s+=4,f[d]={offset:m,length:_}}for(h=0;h<l.length;h++){var g=l[h];f[g]&&(u[g.trim()]=t[g.trim()].parse(r,f[g].offset,f[g].length,u))}return u},_tabOffset:function(r,s,o){for(var a=t._bin,c=a.readUshort(r,o+4),l=o+12,u=0;u<c;u++){var f=a.readASCII(r,l,4);l+=4,a.readUint(r,l),l+=4;var h=a.readUint(r,l);if(l+=4,a.readUint(r,l),l+=4,f==s)return h}return 0}};t._bin={readFixed:function(r,s){return(r[s]<<8|r[s+1])+(r[s+2]<<8|r[s+3])/65540},readF2dot14:function(r,s){return t._bin.readShort(r,s)/16384},readInt:function(r,s){return t._bin._view(r).getInt32(s)},readInt8:function(r,s){return t._bin._view(r).getInt8(s)},readShort:function(r,s){return t._bin._view(r).getInt16(s)},readUshort:function(r,s){return t._bin._view(r).getUint16(s)},readUshorts:function(r,s,o){for(var a=[],c=0;c<o;c++)a.push(t._bin.readUshort(r,s+2*c));return a},readUint:function(r,s){return t._bin._view(r).getUint32(s)},readUint64:function(r,s){return 4294967296*t._bin.readUint(r,s)+t._bin.readUint(r,s+4)},readASCII:function(r,s,o){for(var a="",c=0;c<o;c++)a+=String.fromCharCode(r[s+c]);return a},readUnicode:function(r,s,o){for(var a="",c=0;c<o;c++){var l=r[s++]<<8|r[s++];a+=String.fromCharCode(l)}return a},_tdec:typeof window<"u"&&window.TextDecoder?new window.TextDecoder:null,readUTF8:function(r,s,o){var a=t._bin._tdec;return a&&s==0&&o==r.length?a.decode(r):t._bin.readASCII(r,s,o)},readBytes:function(r,s,o){for(var a=[],c=0;c<o;c++)a.push(r[s+c]);return a},readASCIIArray:function(r,s,o){for(var a=[],c=0;c<o;c++)a.push(String.fromCharCode(r[s+c]));return a},_view:function(r){return r._dataView||(r._dataView=r.buffer?new DataView(r.buffer,r.byteOffset,r.byteLength):new DataView(new Uint8Array(r).buffer))}},t._lctf={},t._lctf.parse=function(r,s,o,a,c){var l=t._bin,u={},f=s;l.readFixed(r,s),s+=4;var h=l.readUshort(r,s);s+=2;var d=l.readUshort(r,s);s+=2;var m=l.readUshort(r,s);return s+=2,u.scriptList=t._lctf.readScriptList(r,f+h),u.featureList=t._lctf.readFeatureList(r,f+d),u.lookupList=t._lctf.readLookupList(r,f+m,c),u},t._lctf.readLookupList=function(r,s,o){var a=t._bin,c=s,l=[],u=a.readUshort(r,s);s+=2;for(var f=0;f<u;f++){var h=a.readUshort(r,s);s+=2;var d=t._lctf.readLookupTable(r,c+h,o);l.push(d)}return l},t._lctf.readLookupTable=function(r,s,o){var a=t._bin,c=s,l={tabs:[]};l.ltype=a.readUshort(r,s),s+=2,l.flag=a.readUshort(r,s),s+=2;var u=a.readUshort(r,s);s+=2;for(var f=l.ltype,h=0;h<u;h++){var d=a.readUshort(r,s);s+=2;var m=o(r,f,c+d,l);l.tabs.push(m)}return l},t._lctf.numOfOnes=function(r){for(var s=0,o=0;o<32;o++)(r>>>o&1)!=0&&s++;return s},t._lctf.readClassDef=function(r,s){var o=t._bin,a=[],c=o.readUshort(r,s);if(s+=2,c==1){var l=o.readUshort(r,s);s+=2;var u=o.readUshort(r,s);s+=2;for(var f=0;f<u;f++)a.push(l+f),a.push(l+f),a.push(o.readUshort(r,s)),s+=2}if(c==2){var h=o.readUshort(r,s);for(s+=2,f=0;f<h;f++)a.push(o.readUshort(r,s)),s+=2,a.push(o.readUshort(r,s)),s+=2,a.push(o.readUshort(r,s)),s+=2}return a},t._lctf.getInterval=function(r,s){for(var o=0;o<r.length;o+=3){var a=r[o],c=r[o+1];if(r[o+2],a<=s&&s<=c)return o}return-1},t._lctf.readCoverage=function(r,s){var o=t._bin,a={};a.fmt=o.readUshort(r,s),s+=2;var c=o.readUshort(r,s);return s+=2,a.fmt==1&&(a.tab=o.readUshorts(r,s,c)),a.fmt==2&&(a.tab=o.readUshorts(r,s,3*c)),a},t._lctf.coverageIndex=function(r,s){var o=r.tab;if(r.fmt==1)return o.indexOf(s);if(r.fmt==2){var a=t._lctf.getInterval(o,s);if(a!=-1)return o[a+2]+(s-o[a])}return-1},t._lctf.readFeatureList=function(r,s){var o=t._bin,a=s,c=[],l=o.readUshort(r,s);s+=2;for(var u=0;u<l;u++){var f=o.readASCII(r,s,4);s+=4;var h=o.readUshort(r,s);s+=2;var d=t._lctf.readFeatureTable(r,a+h);d.tag=f.trim(),c.push(d)}return c},t._lctf.readFeatureTable=function(r,s){var o=t._bin,a=s,c={},l=o.readUshort(r,s);s+=2,l>0&&(c.featureParams=a+l);var u=o.readUshort(r,s);s+=2,c.tab=[];for(var f=0;f<u;f++)c.tab.push(o.readUshort(r,s+2*f));return c},t._lctf.readScriptList=function(r,s){var o=t._bin,a=s,c={},l=o.readUshort(r,s);s+=2;for(var u=0;u<l;u++){var f=o.readASCII(r,s,4);s+=4;var h=o.readUshort(r,s);s+=2,c[f.trim()]=t._lctf.readScriptTable(r,a+h)}return c},t._lctf.readScriptTable=function(r,s){var o=t._bin,a=s,c={},l=o.readUshort(r,s);s+=2,l>0&&(c.default=t._lctf.readLangSysTable(r,a+l));var u=o.readUshort(r,s);s+=2;for(var f=0;f<u;f++){var h=o.readASCII(r,s,4);s+=4;var d=o.readUshort(r,s);s+=2,c[h.trim()]=t._lctf.readLangSysTable(r,a+d)}return c},t._lctf.readLangSysTable=function(r,s){var o=t._bin,a={};o.readUshort(r,s),s+=2,a.reqFeature=o.readUshort(r,s),s+=2;var c=o.readUshort(r,s);return s+=2,a.features=o.readUshorts(r,s,c),a},t.CFF={},t.CFF.parse=function(r,s,o){var a=t._bin;(r=new Uint8Array(r.buffer,s,o))[s=0],r[++s],r[++s],r[++s],s++;var c=[];s=t.CFF.readIndex(r,s,c);for(var l=[],u=0;u<c.length-1;u++)l.push(a.readASCII(r,s+c[u],c[u+1]-c[u]));s+=c[c.length-1];var f=[];s=t.CFF.readIndex(r,s,f);var h=[];for(u=0;u<f.length-1;u++)h.push(t.CFF.readDict(r,s+f[u],s+f[u+1]));s+=f[f.length-1];var d=h[0],m=[];s=t.CFF.readIndex(r,s,m);var _=[];for(u=0;u<m.length-1;u++)_.push(a.readASCII(r,s+m[u],m[u+1]-m[u]));if(s+=m[m.length-1],t.CFF.readSubrs(r,s,d),d.CharStrings){s=d.CharStrings,m=[],s=t.CFF.readIndex(r,s,m);var g=[];for(u=0;u<m.length-1;u++)g.push(a.readBytes(r,s+m[u],m[u+1]-m[u]));d.CharStrings=g}if(d.ROS){s=d.FDArray;var p=[];for(s=t.CFF.readIndex(r,s,p),d.FDArray=[],u=0;u<p.length-1;u++){var y=t.CFF.readDict(r,s+p[u],s+p[u+1]);t.CFF._readFDict(r,y,_),d.FDArray.push(y)}s+=p[p.length-1],s=d.FDSelect,d.FDSelect=[];var x=r[s];if(s++,x!=3)throw x;var v=a.readUshort(r,s);for(s+=2,u=0;u<v+1;u++)d.FDSelect.push(a.readUshort(r,s),r[s+2]),s+=3}return d.Encoding&&(d.Encoding=t.CFF.readEncoding(r,d.Encoding,d.CharStrings.length)),d.charset&&(d.charset=t.CFF.readCharset(r,d.charset,d.CharStrings.length)),t.CFF._readFDict(r,d,_),d},t.CFF._readFDict=function(r,s,o){var a;for(var c in s.Private&&(a=s.Private[1],s.Private=t.CFF.readDict(r,a,a+s.Private[0]),s.Private.Subrs&&t.CFF.readSubrs(r,a+s.Private.Subrs,s.Private)),s)["FamilyName","FontName","FullName","Notice","version","Copyright"].indexOf(c)!=-1&&(s[c]=o[s[c]-426+35])},t.CFF.readSubrs=function(r,s,o){var a=t._bin,c=[];s=t.CFF.readIndex(r,s,c);var l,u=c.length;l=u<1240?107:u<33900?1131:32768,o.Bias=l,o.Subrs=[];for(var f=0;f<c.length-1;f++)o.Subrs.push(a.readBytes(r,s+c[f],c[f+1]-c[f]))},t.CFF.tableSE=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],t.CFF.glyphByUnicode=function(r,s){for(var o=0;o<r.charset.length;o++)if(r.charset[o]==s)return o;return-1},t.CFF.glyphBySE=function(r,s){return s<0||s>255?-1:t.CFF.glyphByUnicode(r,t.CFF.tableSE[s])},t.CFF.readEncoding=function(r,s,o){t._bin;var a=[".notdef"],c=r[s];if(s++,c!=0)throw"error: unknown encoding format: "+c;var l=r[s];s++;for(var u=0;u<l;u++)a.push(r[s+u]);return a},t.CFF.readCharset=function(r,s,o){var a=t._bin,c=[".notdef"],l=r[s];if(s++,l==0)for(var u=0;u<o;u++){var f=a.readUshort(r,s);s+=2,c.push(f)}else{if(l!=1&&l!=2)throw"error: format: "+l;for(;c.length<o;){f=a.readUshort(r,s),s+=2;var h=0;for(l==1?(h=r[s],s++):(h=a.readUshort(r,s),s+=2),u=0;u<=h;u++)c.push(f),f++}}return c},t.CFF.readIndex=function(r,s,o){var a=t._bin,c=a.readUshort(r,s)+1,l=r[s+=2];if(s++,l==1)for(var u=0;u<c;u++)o.push(r[s+u]);else if(l==2)for(u=0;u<c;u++)o.push(a.readUshort(r,s+2*u));else if(l==3)for(u=0;u<c;u++)o.push(16777215&a.readUint(r,s+3*u-1));else if(c!=1)throw"unsupported offset size: "+l+", count: "+c;return(s+=c*l)-1},t.CFF.getCharString=function(r,s,o){var a=t._bin,c=r[s],l=r[s+1];r[s+2],r[s+3],r[s+4];var u=1,f=null,h=null;c<=20&&(f=c,u=1),c==12&&(f=100*c+l,u=2),21<=c&&c<=27&&(f=c,u=1),c==28&&(h=a.readShort(r,s+1),u=3),29<=c&&c<=31&&(f=c,u=1),32<=c&&c<=246&&(h=c-139,u=1),247<=c&&c<=250&&(h=256*(c-247)+l+108,u=2),251<=c&&c<=254&&(h=256*-(c-251)-l-108,u=2),c==255&&(h=a.readInt(r,s+1)/65535,u=5),o.val=h??"o"+f,o.size=u},t.CFF.readCharString=function(r,s,o){for(var a=s+o,c=t._bin,l=[];s<a;){var u=r[s],f=r[s+1];r[s+2],r[s+3],r[s+4];var h=1,d=null,m=null;u<=20&&(d=u,h=1),u==12&&(d=100*u+f,h=2),u!=19&&u!=20||(d=u,h=2),21<=u&&u<=27&&(d=u,h=1),u==28&&(m=c.readShort(r,s+1),h=3),29<=u&&u<=31&&(d=u,h=1),32<=u&&u<=246&&(m=u-139,h=1),247<=u&&u<=250&&(m=256*(u-247)+f+108,h=2),251<=u&&u<=254&&(m=256*-(u-251)-f-108,h=2),u==255&&(m=c.readInt(r,s+1)/65535,h=5),l.push(m??"o"+d),s+=h}return l},t.CFF.readDict=function(r,s,o){for(var a=t._bin,c={},l=[];s<o;){var u=r[s],f=r[s+1];r[s+2],r[s+3],r[s+4];var h=1,d=null,m=null;if(u==28&&(m=a.readShort(r,s+1),h=3),u==29&&(m=a.readInt(r,s+1),h=5),32<=u&&u<=246&&(m=u-139,h=1),247<=u&&u<=250&&(m=256*(u-247)+f+108,h=2),251<=u&&u<=254&&(m=256*-(u-251)-f-108,h=2),u==255)throw m=a.readInt(r,s+1)/65535,h=5,"unknown number";if(u==30){var _=[];for(h=1;;){var g=r[s+h];h++;var p=g>>4,y=15&g;if(p!=15&&_.push(p),y!=15&&_.push(y),y==15)break}for(var x="",v=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"],T=0;T<_.length;T++)x+=v[_[T]];m=parseFloat(x)}u<=21&&(d=["version","Notice","FullName","FamilyName","Weight","FontBBox","BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StdHW","StdVW","escape","UniqueID","XUID","charset","Encoding","CharStrings","Private","Subrs","defaultWidthX","nominalWidthX"][u],h=1,u==12&&(d=["Copyright","isFixedPitch","ItalicAngle","UnderlinePosition","UnderlineThickness","PaintType","CharstringType","FontMatrix","StrokeWidth","BlueScale","BlueShift","BlueFuzz","StemSnapH","StemSnapV","ForceBold",0,0,"LanguageGroup","ExpansionFactor","initialRandomSeed","SyntheticBase","PostScript","BaseFontName","BaseFontBlend",0,0,0,0,0,0,"ROS","CIDFontVersion","CIDFontRevision","CIDFontType","CIDCount","UIDBase","FDArray","FDSelect","FontName"][f],h=2)),d!=null?(c[d]=l.length==1?l[0]:l,l=[]):l.push(m),s+=h}return c},t.cmap={},t.cmap.parse=function(r,s,o){r=new Uint8Array(r.buffer,s,o),s=0;var a=t._bin,c={};a.readUshort(r,s),s+=2;var l=a.readUshort(r,s);s+=2;var u=[];c.tables=[];for(var f=0;f<l;f++){var h=a.readUshort(r,s);s+=2;var d=a.readUshort(r,s);s+=2;var m=a.readUint(r,s);s+=4;var _="p"+h+"e"+d,g=u.indexOf(m);if(g==-1){var p;g=c.tables.length,u.push(m);var y=a.readUshort(r,m);y==0?p=t.cmap.parse0(r,m):y==4?p=t.cmap.parse4(r,m):y==6?p=t.cmap.parse6(r,m):y==12?p=t.cmap.parse12(r,m):console.debug("unknown format: "+y,h,d,m),c.tables.push(p)}if(c[_]!=null)throw"multiple tables for one platform+encoding";c[_]=g}return c},t.cmap.parse0=function(r,s){var o=t._bin,a={};a.format=o.readUshort(r,s),s+=2;var c=o.readUshort(r,s);s+=2,o.readUshort(r,s),s+=2,a.map=[];for(var l=0;l<c-6;l++)a.map.push(r[s+l]);return a},t.cmap.parse4=function(r,s){var o=t._bin,a=s,c={};c.format=o.readUshort(r,s),s+=2;var l=o.readUshort(r,s);s+=2,o.readUshort(r,s),s+=2;var u=o.readUshort(r,s);s+=2;var f=u/2;c.searchRange=o.readUshort(r,s),s+=2,c.entrySelector=o.readUshort(r,s),s+=2,c.rangeShift=o.readUshort(r,s),s+=2,c.endCount=o.readUshorts(r,s,f),s+=2*f,s+=2,c.startCount=o.readUshorts(r,s,f),s+=2*f,c.idDelta=[];for(var h=0;h<f;h++)c.idDelta.push(o.readShort(r,s)),s+=2;for(c.idRangeOffset=o.readUshorts(r,s,f),s+=2*f,c.glyphIdArray=[];s<a+l;)c.glyphIdArray.push(o.readUshort(r,s)),s+=2;return c},t.cmap.parse6=function(r,s){var o=t._bin,a={};a.format=o.readUshort(r,s),s+=2,o.readUshort(r,s),s+=2,o.readUshort(r,s),s+=2,a.firstCode=o.readUshort(r,s),s+=2;var c=o.readUshort(r,s);s+=2,a.glyphIdArray=[];for(var l=0;l<c;l++)a.glyphIdArray.push(o.readUshort(r,s)),s+=2;return a},t.cmap.parse12=function(r,s){var o=t._bin,a={};a.format=o.readUshort(r,s),s+=2,s+=2,o.readUint(r,s),s+=4,o.readUint(r,s),s+=4;var c=o.readUint(r,s);s+=4,a.groups=[];for(var l=0;l<c;l++){var u=s+12*l,f=o.readUint(r,u+0),h=o.readUint(r,u+4),d=o.readUint(r,u+8);a.groups.push([f,h,d])}return a},t.glyf={},t.glyf.parse=function(r,s,o,a){for(var c=[],l=0;l<a.maxp.numGlyphs;l++)c.push(null);return c},t.glyf._parseGlyf=function(r,s){var o=t._bin,a=r._data,c=t._tabOffset(a,"glyf",r._offset)+r.loca[s];if(r.loca[s]==r.loca[s+1])return null;var l={};if(l.noc=o.readShort(a,c),c+=2,l.xMin=o.readShort(a,c),c+=2,l.yMin=o.readShort(a,c),c+=2,l.xMax=o.readShort(a,c),c+=2,l.yMax=o.readShort(a,c),c+=2,l.xMin>=l.xMax||l.yMin>=l.yMax)return null;if(l.noc>0){l.endPts=[];for(var u=0;u<l.noc;u++)l.endPts.push(o.readUshort(a,c)),c+=2;var f=o.readUshort(a,c);if(c+=2,a.length-c<f)return null;l.instructions=o.readBytes(a,c,f),c+=f;var h=l.endPts[l.noc-1]+1;for(l.flags=[],u=0;u<h;u++){var d=a[c];if(c++,l.flags.push(d),(8&d)!=0){var m=a[c];c++;for(var _=0;_<m;_++)l.flags.push(d),u++}}for(l.xs=[],u=0;u<h;u++){var g=(2&l.flags[u])!=0,p=(16&l.flags[u])!=0;g?(l.xs.push(p?a[c]:-a[c]),c++):p?l.xs.push(0):(l.xs.push(o.readShort(a,c)),c+=2)}for(l.ys=[],u=0;u<h;u++)g=(4&l.flags[u])!=0,p=(32&l.flags[u])!=0,g?(l.ys.push(p?a[c]:-a[c]),c++):p?l.ys.push(0):(l.ys.push(o.readShort(a,c)),c+=2);var y=0,x=0;for(u=0;u<h;u++)y+=l.xs[u],x+=l.ys[u],l.xs[u]=y,l.ys[u]=x}else{var v;l.parts=[];do{v=o.readUshort(a,c),c+=2;var T={m:{a:1,b:0,c:0,d:1,tx:0,ty:0},p1:-1,p2:-1};if(l.parts.push(T),T.glyphIndex=o.readUshort(a,c),c+=2,1&v){var b=o.readShort(a,c);c+=2;var w=o.readShort(a,c);c+=2}else b=o.readInt8(a,c),c++,w=o.readInt8(a,c),c++;2&v?(T.m.tx=b,T.m.ty=w):(T.p1=b,T.p2=w),8&v?(T.m.a=T.m.d=o.readF2dot14(a,c),c+=2):64&v?(T.m.a=o.readF2dot14(a,c),c+=2,T.m.d=o.readF2dot14(a,c),c+=2):128&v&&(T.m.a=o.readF2dot14(a,c),c+=2,T.m.b=o.readF2dot14(a,c),c+=2,T.m.c=o.readF2dot14(a,c),c+=2,T.m.d=o.readF2dot14(a,c),c+=2)}while(32&v);if(256&v){var C=o.readUshort(a,c);for(c+=2,l.instr=[],u=0;u<C;u++)l.instr.push(a[c]),c++}}return l},t.GDEF={},t.GDEF.parse=function(r,s,o,a){var c=s;s+=4;var l=t._bin.readUshort(r,s);return{glyphClassDef:l===0?null:t._lctf.readClassDef(r,c+l)}},t.GPOS={},t.GPOS.parse=function(r,s,o,a){return t._lctf.parse(r,s,o,a,t.GPOS.subt)},t.GPOS.subt=function(r,s,o,a){var c=t._bin,l=o,u={};if(u.fmt=c.readUshort(r,o),o+=2,s==1||s==2||s==3||s==7||s==8&&u.fmt<=2){var f=c.readUshort(r,o);o+=2,u.coverage=t._lctf.readCoverage(r,f+l)}if(s==1&&u.fmt==1){var h=c.readUshort(r,o);o+=2,h!=0&&(u.pos=t.GPOS.readValueRecord(r,o,h))}else if(s==2&&u.fmt>=1&&u.fmt<=2){h=c.readUshort(r,o),o+=2;var d=c.readUshort(r,o);o+=2;var m=t._lctf.numOfOnes(h),_=t._lctf.numOfOnes(d);if(u.fmt==1){u.pairsets=[];var g=c.readUshort(r,o);o+=2;for(var p=0;p<g;p++){var y=l+c.readUshort(r,o);o+=2;var x=c.readUshort(r,y);y+=2;for(var v=[],T=0;T<x;T++){var b=c.readUshort(r,y);y+=2,h!=0&&(P=t.GPOS.readValueRecord(r,y,h),y+=2*m),d!=0&&(D=t.GPOS.readValueRecord(r,y,d),y+=2*_),v.push({gid2:b,val1:P,val2:D})}u.pairsets.push(v)}}if(u.fmt==2){var w=c.readUshort(r,o);o+=2;var C=c.readUshort(r,o);o+=2;var M=c.readUshort(r,o);o+=2;var S=c.readUshort(r,o);for(o+=2,u.classDef1=t._lctf.readClassDef(r,l+w),u.classDef2=t._lctf.readClassDef(r,l+C),u.matrix=[],p=0;p<M;p++){var U=[];for(T=0;T<S;T++){var P=null,D=null;h!=0&&(P=t.GPOS.readValueRecord(r,o,h),o+=2*m),d!=0&&(D=t.GPOS.readValueRecord(r,o,d),o+=2*_),U.push({val1:P,val2:D})}u.matrix.push(U)}}}else if(s==4&&u.fmt==1)u.markCoverage=t._lctf.readCoverage(r,c.readUshort(r,o)+l),u.baseCoverage=t._lctf.readCoverage(r,c.readUshort(r,o+2)+l),u.markClassCount=c.readUshort(r,o+4),u.markArray=t.GPOS.readMarkArray(r,c.readUshort(r,o+6)+l),u.baseArray=t.GPOS.readBaseArray(r,c.readUshort(r,o+8)+l,u.markClassCount);else if(s==6&&u.fmt==1)u.mark1Coverage=t._lctf.readCoverage(r,c.readUshort(r,o)+l),u.mark2Coverage=t._lctf.readCoverage(r,c.readUshort(r,o+2)+l),u.markClassCount=c.readUshort(r,o+4),u.mark1Array=t.GPOS.readMarkArray(r,c.readUshort(r,o+6)+l),u.mark2Array=t.GPOS.readBaseArray(r,c.readUshort(r,o+8)+l,u.markClassCount);else{if(s==9&&u.fmt==1){var I=c.readUshort(r,o);o+=2;var V=c.readUint(r,o);if(o+=4,a.ltype==9)a.ltype=I;else if(a.ltype!=I)throw"invalid extension substitution";return t.GPOS.subt(r,a.ltype,l+V)}console.debug("unsupported GPOS table LookupType",s,"format",u.fmt)}return u},t.GPOS.readValueRecord=function(r,s,o){var a=t._bin,c=[];return c.push(1&o?a.readShort(r,s):0),s+=1&o?2:0,c.push(2&o?a.readShort(r,s):0),s+=2&o?2:0,c.push(4&o?a.readShort(r,s):0),s+=4&o?2:0,c.push(8&o?a.readShort(r,s):0),s+=8&o?2:0,c},t.GPOS.readBaseArray=function(r,s,o){var a=t._bin,c=[],l=s,u=a.readUshort(r,s);s+=2;for(var f=0;f<u;f++){for(var h=[],d=0;d<o;d++)h.push(t.GPOS.readAnchorRecord(r,l+a.readUshort(r,s))),s+=2;c.push(h)}return c},t.GPOS.readMarkArray=function(r,s){var o=t._bin,a=[],c=s,l=o.readUshort(r,s);s+=2;for(var u=0;u<l;u++){var f=t.GPOS.readAnchorRecord(r,o.readUshort(r,s+2)+c);f.markClass=o.readUshort(r,s),a.push(f),s+=4}return a},t.GPOS.readAnchorRecord=function(r,s){var o=t._bin,a={};return a.fmt=o.readUshort(r,s),a.x=o.readShort(r,s+2),a.y=o.readShort(r,s+4),a},t.GSUB={},t.GSUB.parse=function(r,s,o,a){return t._lctf.parse(r,s,o,a,t.GSUB.subt)},t.GSUB.subt=function(r,s,o,a){var c=t._bin,l=o,u={};if(u.fmt=c.readUshort(r,o),o+=2,s!=1&&s!=2&&s!=4&&s!=5&&s!=6)return null;if(s==1||s==2||s==4||s==5&&u.fmt<=2||s==6&&u.fmt<=2){var f=c.readUshort(r,o);o+=2,u.coverage=t._lctf.readCoverage(r,l+f)}if(s==1&&u.fmt>=1&&u.fmt<=2){if(u.fmt==1)u.delta=c.readShort(r,o),o+=2;else if(u.fmt==2){var h=c.readUshort(r,o);o+=2,u.newg=c.readUshorts(r,o,h),o+=2*u.newg.length}}else if(s==2&&u.fmt==1){h=c.readUshort(r,o),o+=2,u.seqs=[];for(var d=0;d<h;d++){var m=c.readUshort(r,o)+l;o+=2;var _=c.readUshort(r,m);u.seqs.push(c.readUshorts(r,m+2,_))}}else if(s==4)for(u.vals=[],h=c.readUshort(r,o),o+=2,d=0;d<h;d++){var g=c.readUshort(r,o);o+=2,u.vals.push(t.GSUB.readLigatureSet(r,l+g))}else if(s==5&&u.fmt==2){if(u.fmt==2){var p=c.readUshort(r,o);o+=2,u.cDef=t._lctf.readClassDef(r,l+p),u.scset=[];var y=c.readUshort(r,o);for(o+=2,d=0;d<y;d++){var x=c.readUshort(r,o);o+=2,u.scset.push(x==0?null:t.GSUB.readSubClassSet(r,l+x))}}}else if(s==6&&u.fmt==3){if(u.fmt==3){for(d=0;d<3;d++){h=c.readUshort(r,o),o+=2;for(var v=[],T=0;T<h;T++)v.push(t._lctf.readCoverage(r,l+c.readUshort(r,o+2*T)));o+=2*h,d==0&&(u.backCvg=v),d==1&&(u.inptCvg=v),d==2&&(u.ahedCvg=v)}h=c.readUshort(r,o),o+=2,u.lookupRec=t.GSUB.readSubstLookupRecords(r,o,h)}}else{if(s==7&&u.fmt==1){var b=c.readUshort(r,o);o+=2;var w=c.readUint(r,o);if(o+=4,a.ltype==9)a.ltype=b;else if(a.ltype!=b)throw"invalid extension substitution";return t.GSUB.subt(r,a.ltype,l+w)}console.debug("unsupported GSUB table LookupType",s,"format",u.fmt)}return u},t.GSUB.readSubClassSet=function(r,s){var o=t._bin.readUshort,a=s,c=[],l=o(r,s);s+=2;for(var u=0;u<l;u++){var f=o(r,s);s+=2,c.push(t.GSUB.readSubClassRule(r,a+f))}return c},t.GSUB.readSubClassRule=function(r,s){var o=t._bin.readUshort,a={},c=o(r,s),l=o(r,s+=2);s+=2,a.input=[];for(var u=0;u<c-1;u++)a.input.push(o(r,s)),s+=2;return a.substLookupRecords=t.GSUB.readSubstLookupRecords(r,s,l),a},t.GSUB.readSubstLookupRecords=function(r,s,o){for(var a=t._bin.readUshort,c=[],l=0;l<o;l++)c.push(a(r,s),a(r,s+2)),s+=4;return c},t.GSUB.readChainSubClassSet=function(r,s){var o=t._bin,a=s,c=[],l=o.readUshort(r,s);s+=2;for(var u=0;u<l;u++){var f=o.readUshort(r,s);s+=2,c.push(t.GSUB.readChainSubClassRule(r,a+f))}return c},t.GSUB.readChainSubClassRule=function(r,s){for(var o=t._bin,a={},c=["backtrack","input","lookahead"],l=0;l<c.length;l++){var u=o.readUshort(r,s);s+=2,l==1&&u--,a[c[l]]=o.readUshorts(r,s,u),s+=2*a[c[l]].length}return u=o.readUshort(r,s),s+=2,a.subst=o.readUshorts(r,s,2*u),s+=2*a.subst.length,a},t.GSUB.readLigatureSet=function(r,s){var o=t._bin,a=s,c=[],l=o.readUshort(r,s);s+=2;for(var u=0;u<l;u++){var f=o.readUshort(r,s);s+=2,c.push(t.GSUB.readLigature(r,a+f))}return c},t.GSUB.readLigature=function(r,s){var o=t._bin,a={chain:[]};a.nglyph=o.readUshort(r,s),s+=2;var c=o.readUshort(r,s);s+=2;for(var l=0;l<c-1;l++)a.chain.push(o.readUshort(r,s)),s+=2;return a},t.head={},t.head.parse=function(r,s,o){var a=t._bin,c={};return a.readFixed(r,s),s+=4,c.fontRevision=a.readFixed(r,s),s+=4,a.readUint(r,s),s+=4,a.readUint(r,s),s+=4,c.flags=a.readUshort(r,s),s+=2,c.unitsPerEm=a.readUshort(r,s),s+=2,c.created=a.readUint64(r,s),s+=8,c.modified=a.readUint64(r,s),s+=8,c.xMin=a.readShort(r,s),s+=2,c.yMin=a.readShort(r,s),s+=2,c.xMax=a.readShort(r,s),s+=2,c.yMax=a.readShort(r,s),s+=2,c.macStyle=a.readUshort(r,s),s+=2,c.lowestRecPPEM=a.readUshort(r,s),s+=2,c.fontDirectionHint=a.readShort(r,s),s+=2,c.indexToLocFormat=a.readShort(r,s),s+=2,c.glyphDataFormat=a.readShort(r,s),s+=2,c},t.hhea={},t.hhea.parse=function(r,s,o){var a=t._bin,c={};return a.readFixed(r,s),s+=4,c.ascender=a.readShort(r,s),s+=2,c.descender=a.readShort(r,s),s+=2,c.lineGap=a.readShort(r,s),s+=2,c.advanceWidthMax=a.readUshort(r,s),s+=2,c.minLeftSideBearing=a.readShort(r,s),s+=2,c.minRightSideBearing=a.readShort(r,s),s+=2,c.xMaxExtent=a.readShort(r,s),s+=2,c.caretSlopeRise=a.readShort(r,s),s+=2,c.caretSlopeRun=a.readShort(r,s),s+=2,c.caretOffset=a.readShort(r,s),s+=2,s+=8,c.metricDataFormat=a.readShort(r,s),s+=2,c.numberOfHMetrics=a.readUshort(r,s),s+=2,c},t.hmtx={},t.hmtx.parse=function(r,s,o,a){for(var c=t._bin,l={aWidth:[],lsBearing:[]},u=0,f=0,h=0;h<a.maxp.numGlyphs;h++)h<a.hhea.numberOfHMetrics&&(u=c.readUshort(r,s),s+=2,f=c.readShort(r,s),s+=2),l.aWidth.push(u),l.lsBearing.push(f);return l},t.kern={},t.kern.parse=function(r,s,o,a){var c=t._bin,l=c.readUshort(r,s);if(s+=2,l==1)return t.kern.parseV1(r,s-2,o,a);var u=c.readUshort(r,s);s+=2;for(var f={glyph1:[],rval:[]},h=0;h<u;h++){s+=2,o=c.readUshort(r,s),s+=2;var d=c.readUshort(r,s);s+=2;var m=d>>>8;if((m&=15)!=0)throw"unknown kern table format: "+m;s=t.kern.readFormat0(r,s,f)}return f},t.kern.parseV1=function(r,s,o,a){var c=t._bin;c.readFixed(r,s),s+=4;var l=c.readUint(r,s);s+=4;for(var u={glyph1:[],rval:[]},f=0;f<l;f++){c.readUint(r,s),s+=4;var h=c.readUshort(r,s);s+=2,c.readUshort(r,s),s+=2;var d=h>>>8;if((d&=15)!=0)throw"unknown kern table format: "+d;s=t.kern.readFormat0(r,s,u)}return u},t.kern.readFormat0=function(r,s,o){var a=t._bin,c=-1,l=a.readUshort(r,s);s+=2,a.readUshort(r,s),s+=2,a.readUshort(r,s),s+=2,a.readUshort(r,s),s+=2;for(var u=0;u<l;u++){var f=a.readUshort(r,s);s+=2;var h=a.readUshort(r,s);s+=2;var d=a.readShort(r,s);s+=2,f!=c&&(o.glyph1.push(f),o.rval.push({glyph2:[],vals:[]}));var m=o.rval[o.rval.length-1];m.glyph2.push(h),m.vals.push(d),c=f}return s},t.loca={},t.loca.parse=function(r,s,o,a){var c=t._bin,l=[],u=a.head.indexToLocFormat,f=a.maxp.numGlyphs+1;if(u==0)for(var h=0;h<f;h++)l.push(c.readUshort(r,s+(h<<1))<<1);if(u==1)for(h=0;h<f;h++)l.push(c.readUint(r,s+(h<<2)));return l},t.maxp={},t.maxp.parse=function(r,s,o){var a=t._bin,c={},l=a.readUint(r,s);return s+=4,c.numGlyphs=a.readUshort(r,s),s+=2,l==65536&&(c.maxPoints=a.readUshort(r,s),s+=2,c.maxContours=a.readUshort(r,s),s+=2,c.maxCompositePoints=a.readUshort(r,s),s+=2,c.maxCompositeContours=a.readUshort(r,s),s+=2,c.maxZones=a.readUshort(r,s),s+=2,c.maxTwilightPoints=a.readUshort(r,s),s+=2,c.maxStorage=a.readUshort(r,s),s+=2,c.maxFunctionDefs=a.readUshort(r,s),s+=2,c.maxInstructionDefs=a.readUshort(r,s),s+=2,c.maxStackElements=a.readUshort(r,s),s+=2,c.maxSizeOfInstructions=a.readUshort(r,s),s+=2,c.maxComponentElements=a.readUshort(r,s),s+=2,c.maxComponentDepth=a.readUshort(r,s),s+=2),c},t.name={},t.name.parse=function(r,s,o){var a=t._bin,c={};a.readUshort(r,s),s+=2;var l=a.readUshort(r,s);s+=2,a.readUshort(r,s);for(var u,f=["copyright","fontFamily","fontSubfamily","ID","fullName","version","postScriptName","trademark","manufacturer","designer","description","urlVendor","urlDesigner","licence","licenceURL","---","typoFamilyName","typoSubfamilyName","compatibleFull","sampleText","postScriptCID","wwsFamilyName","wwsSubfamilyName","lightPalette","darkPalette"],h=s+=2,d=0;d<l;d++){var m=a.readUshort(r,s);s+=2;var _=a.readUshort(r,s);s+=2;var g=a.readUshort(r,s);s+=2;var p=a.readUshort(r,s);s+=2;var y=a.readUshort(r,s);s+=2;var x=a.readUshort(r,s);s+=2;var v,T=f[p],b=h+12*l+x;if(m==0)v=a.readUnicode(r,b,y/2);else if(m==3&&_==0)v=a.readUnicode(r,b,y/2);else if(_==0)v=a.readASCII(r,b,y);else if(_==1)v=a.readUnicode(r,b,y/2);else if(_==3)v=a.readUnicode(r,b,y/2);else{if(m!=1)throw"unknown encoding "+_+", platformID: "+m;v=a.readASCII(r,b,y),console.debug("reading unknown MAC encoding "+_+" as ASCII")}var w="p"+m+","+g.toString(16);c[w]==null&&(c[w]={}),c[w][T!==void 0?T:p]=v,c[w]._lang=g}for(var C in c)if(c[C].postScriptName!=null&&c[C]._lang==1033)return c[C];for(var C in c)if(c[C].postScriptName!=null&&c[C]._lang==0)return c[C];for(var C in c)if(c[C].postScriptName!=null&&c[C]._lang==3084)return c[C];for(var C in c)if(c[C].postScriptName!=null)return c[C];for(var C in c){u=C;break}return console.debug("returning name table with languageID "+c[u]._lang),c[u]},t["OS/2"]={},t["OS/2"].parse=function(r,s,o){var a=t._bin.readUshort(r,s);s+=2;var c={};if(a==0)t["OS/2"].version0(r,s,c);else if(a==1)t["OS/2"].version1(r,s,c);else if(a==2||a==3||a==4)t["OS/2"].version2(r,s,c);else{if(a!=5)throw"unknown OS/2 table version: "+a;t["OS/2"].version5(r,s,c)}return c},t["OS/2"].version0=function(r,s,o){var a=t._bin;return o.xAvgCharWidth=a.readShort(r,s),s+=2,o.usWeightClass=a.readUshort(r,s),s+=2,o.usWidthClass=a.readUshort(r,s),s+=2,o.fsType=a.readUshort(r,s),s+=2,o.ySubscriptXSize=a.readShort(r,s),s+=2,o.ySubscriptYSize=a.readShort(r,s),s+=2,o.ySubscriptXOffset=a.readShort(r,s),s+=2,o.ySubscriptYOffset=a.readShort(r,s),s+=2,o.ySuperscriptXSize=a.readShort(r,s),s+=2,o.ySuperscriptYSize=a.readShort(r,s),s+=2,o.ySuperscriptXOffset=a.readShort(r,s),s+=2,o.ySuperscriptYOffset=a.readShort(r,s),s+=2,o.yStrikeoutSize=a.readShort(r,s),s+=2,o.yStrikeoutPosition=a.readShort(r,s),s+=2,o.sFamilyClass=a.readShort(r,s),s+=2,o.panose=a.readBytes(r,s,10),s+=10,o.ulUnicodeRange1=a.readUint(r,s),s+=4,o.ulUnicodeRange2=a.readUint(r,s),s+=4,o.ulUnicodeRange3=a.readUint(r,s),s+=4,o.ulUnicodeRange4=a.readUint(r,s),s+=4,o.achVendID=[a.readInt8(r,s),a.readInt8(r,s+1),a.readInt8(r,s+2),a.readInt8(r,s+3)],s+=4,o.fsSelection=a.readUshort(r,s),s+=2,o.usFirstCharIndex=a.readUshort(r,s),s+=2,o.usLastCharIndex=a.readUshort(r,s),s+=2,o.sTypoAscender=a.readShort(r,s),s+=2,o.sTypoDescender=a.readShort(r,s),s+=2,o.sTypoLineGap=a.readShort(r,s),s+=2,o.usWinAscent=a.readUshort(r,s),s+=2,o.usWinDescent=a.readUshort(r,s),s+=2},t["OS/2"].version1=function(r,s,o){var a=t._bin;return s=t["OS/2"].version0(r,s,o),o.ulCodePageRange1=a.readUint(r,s),s+=4,o.ulCodePageRange2=a.readUint(r,s),s+=4},t["OS/2"].version2=function(r,s,o){var a=t._bin;return s=t["OS/2"].version1(r,s,o),o.sxHeight=a.readShort(r,s),s+=2,o.sCapHeight=a.readShort(r,s),s+=2,o.usDefault=a.readUshort(r,s),s+=2,o.usBreak=a.readUshort(r,s),s+=2,o.usMaxContext=a.readUshort(r,s),s+=2},t["OS/2"].version5=function(r,s,o){var a=t._bin;return s=t["OS/2"].version2(r,s,o),o.usLowerOpticalPointSize=a.readUshort(r,s),s+=2,o.usUpperOpticalPointSize=a.readUshort(r,s),s+=2},t.post={},t.post.parse=function(r,s,o){var a=t._bin,c={};return c.version=a.readFixed(r,s),s+=4,c.italicAngle=a.readFixed(r,s),s+=4,c.underlinePosition=a.readShort(r,s),s+=2,c.underlineThickness=a.readShort(r,s),s+=2,c},t==null&&(t={}),t.U==null&&(t.U={}),t.U.codeToGlyph=function(r,s){var o=r.cmap,a=-1;if(o.p0e4!=null?a=o.p0e4:o.p3e1!=null?a=o.p3e1:o.p1e0!=null?a=o.p1e0:o.p0e3!=null&&(a=o.p0e3),a==-1)throw"no familiar platform and encoding!";var c=o.tables[a];if(c.format==0)return s>=c.map.length?0:c.map[s];if(c.format==4){for(var l=-1,u=0;u<c.endCount.length;u++)if(s<=c.endCount[u]){l=u;break}return l==-1||c.startCount[l]>s?0:65535&(c.idRangeOffset[l]!=0?c.glyphIdArray[s-c.startCount[l]+(c.idRangeOffset[l]>>1)-(c.idRangeOffset.length-l)]:s+c.idDelta[l])}if(c.format==12){if(s>c.groups[c.groups.length-1][1])return 0;for(u=0;u<c.groups.length;u++){var f=c.groups[u];if(f[0]<=s&&s<=f[1])return f[2]+(s-f[0])}return 0}throw"unknown cmap table format "+c.format},t.U.glyphToPath=function(r,s){var o={cmds:[],crds:[]};if(r.SVG&&r.SVG.entries[s]){var a=r.SVG.entries[s];return a==null?o:(typeof a=="string"&&(a=t.SVG.toPath(a),r.SVG.entries[s]=a),a)}if(r.CFF){var c={x:0,y:0,stack:[],nStems:0,haveWidth:!1,width:r.CFF.Private?r.CFF.Private.defaultWidthX:0,open:!1},l=r.CFF,u=r.CFF.Private;if(l.ROS){for(var f=0;l.FDSelect[f+2]<=s;)f+=2;u=l.FDArray[l.FDSelect[f+1]].Private}t.U._drawCFF(r.CFF.CharStrings[s],c,l,u,o)}else r.glyf&&t.U._drawGlyf(s,r,o);return o},t.U._drawGlyf=function(r,s,o){var a=s.glyf[r];a==null&&(a=s.glyf[r]=t.glyf._parseGlyf(s,r)),a!=null&&(a.noc>-1?t.U._simpleGlyph(a,o):t.U._compoGlyph(a,s,o))},t.U._simpleGlyph=function(r,s){for(var o=0;o<r.noc;o++){for(var a=o==0?0:r.endPts[o-1]+1,c=r.endPts[o],l=a;l<=c;l++){var u=l==a?c:l-1,f=l==c?a:l+1,h=1&r.flags[l],d=1&r.flags[u],m=1&r.flags[f],_=r.xs[l],g=r.ys[l];if(l==a)if(h){if(!d){t.U.P.moveTo(s,_,g);continue}t.U.P.moveTo(s,r.xs[u],r.ys[u])}else d?t.U.P.moveTo(s,r.xs[u],r.ys[u]):t.U.P.moveTo(s,(r.xs[u]+_)/2,(r.ys[u]+g)/2);h?d&&t.U.P.lineTo(s,_,g):m?t.U.P.qcurveTo(s,_,g,r.xs[f],r.ys[f]):t.U.P.qcurveTo(s,_,g,(_+r.xs[f])/2,(g+r.ys[f])/2)}t.U.P.closePath(s)}},t.U._compoGlyph=function(r,s,o){for(var a=0;a<r.parts.length;a++){var c={cmds:[],crds:[]},l=r.parts[a];t.U._drawGlyf(l.glyphIndex,s,c);for(var u=l.m,f=0;f<c.crds.length;f+=2){var h=c.crds[f],d=c.crds[f+1];o.crds.push(h*u.a+d*u.b+u.tx),o.crds.push(h*u.c+d*u.d+u.ty)}for(f=0;f<c.cmds.length;f++)o.cmds.push(c.cmds[f])}},t.U._getGlyphClass=function(r,s){var o=t._lctf.getInterval(s,r);return o==-1?0:s[o+2]},t.U._applySubs=function(r,s,o,a){for(var c=r.length-s-1,l=0;l<o.tabs.length;l++)if(o.tabs[l]!=null){var u,f=o.tabs[l];if(!f.coverage||(u=t._lctf.coverageIndex(f.coverage,r[s]))!=-1){if(o.ltype==1)r[s],f.fmt==1?r[s]=r[s]+f.delta:r[s]=f.newg[u];else if(o.ltype==4)for(var h=f.vals[u],d=0;d<h.length;d++){var m=h[d],_=m.chain.length;if(!(_>c)){for(var g=!0,p=0,y=0;y<_;y++){for(;r[s+p+(1+y)]==-1;)p++;m.chain[y]!=r[s+p+(1+y)]&&(g=!1)}if(g){for(r[s]=m.nglyph,y=0;y<_+p;y++)r[s+y+1]=-1;break}}}else if(o.ltype==5&&f.fmt==2)for(var x=t._lctf.getInterval(f.cDef,r[s]),v=f.cDef[x+2],T=f.scset[v],b=0;b<T.length;b++){var w=T[b],C=w.input;if(!(C.length>c)){for(g=!0,y=0;y<C.length;y++){var M=t._lctf.getInterval(f.cDef,r[s+1+y]);if(x==-1&&f.cDef[M+2]!=C[y]){g=!1;break}}if(g){var S=w.substLookupRecords;for(d=0;d<S.length;d+=2)S[d],S[d+1]}}}else if(o.ltype==6&&f.fmt==3){if(!t.U._glsCovered(r,f.backCvg,s-f.backCvg.length)||!t.U._glsCovered(r,f.inptCvg,s)||!t.U._glsCovered(r,f.ahedCvg,s+f.inptCvg.length))continue;var U=f.lookupRec;for(b=0;b<U.length;b+=2){x=U[b];var P=a[U[b+1]];t.U._applySubs(r,s+x,P,a)}}}}},t.U._glsCovered=function(r,s,o){for(var a=0;a<s.length;a++)if(t._lctf.coverageIndex(s[a],r[o+a])==-1)return!1;return!0},t.U.glyphsToPath=function(r,s,o){for(var a={cmds:[],crds:[]},c=0,l=0;l<s.length;l++){var u=s[l];if(u!=-1){for(var f=l<s.length-1&&s[l+1]!=-1?s[l+1]:0,h=t.U.glyphToPath(r,u),d=0;d<h.crds.length;d+=2)a.crds.push(h.crds[d]+c),a.crds.push(h.crds[d+1]);for(o&&a.cmds.push(o),d=0;d<h.cmds.length;d++)a.cmds.push(h.cmds[d]);o&&a.cmds.push("X"),c+=r.hmtx.aWidth[u],l<s.length-1&&(c+=t.U.getPairAdjustment(r,u,f))}}return a},t.U.P={},t.U.P.moveTo=function(r,s,o){r.cmds.push("M"),r.crds.push(s,o)},t.U.P.lineTo=function(r,s,o){r.cmds.push("L"),r.crds.push(s,o)},t.U.P.curveTo=function(r,s,o,a,c,l,u){r.cmds.push("C"),r.crds.push(s,o,a,c,l,u)},t.U.P.qcurveTo=function(r,s,o,a,c){r.cmds.push("Q"),r.crds.push(s,o,a,c)},t.U.P.closePath=function(r){r.cmds.push("Z")},t.U._drawCFF=function(r,s,o,a,c){for(var l=s.stack,u=s.nStems,f=s.haveWidth,h=s.width,d=s.open,m=0,_=s.x,g=s.y,p=0,y=0,x=0,v=0,T=0,b=0,w=0,C=0,M=0,S=0,U={val:0,size:0};m<r.length;){t.CFF.getCharString(r,m,U);var P=U.val;if(m+=U.size,P=="o1"||P=="o18")l.length%2!=0&&!f&&(h=l.shift()+a.nominalWidthX),u+=l.length>>1,l.length=0,f=!0;else if(P=="o3"||P=="o23")l.length%2!=0&&!f&&(h=l.shift()+a.nominalWidthX),u+=l.length>>1,l.length=0,f=!0;else if(P=="o4")l.length>1&&!f&&(h=l.shift()+a.nominalWidthX,f=!0),d&&t.U.P.closePath(c),g+=l.pop(),t.U.P.moveTo(c,_,g),d=!0;else if(P=="o5")for(;l.length>0;)_+=l.shift(),g+=l.shift(),t.U.P.lineTo(c,_,g);else if(P=="o6"||P=="o7")for(var D=l.length,I=P=="o6",V=0;V<D;V++){var O=l.shift();I?_+=O:g+=O,I=!I,t.U.P.lineTo(c,_,g)}else if(P=="o8"||P=="o24"){D=l.length;for(var tt=0;tt+6<=D;)p=_+l.shift(),y=g+l.shift(),x=p+l.shift(),v=y+l.shift(),_=x+l.shift(),g=v+l.shift(),t.U.P.curveTo(c,p,y,x,v,_,g),tt+=6;P=="o24"&&(_+=l.shift(),g+=l.shift(),t.U.P.lineTo(c,_,g))}else{if(P=="o11")break;if(P=="o1234"||P=="o1235"||P=="o1236"||P=="o1237")P=="o1234"&&(y=g,x=(p=_+l.shift())+l.shift(),S=v=y+l.shift(),b=v,C=g,_=(w=(T=(M=x+l.shift())+l.shift())+l.shift())+l.shift(),t.U.P.curveTo(c,p,y,x,v,M,S),t.U.P.curveTo(c,T,b,w,C,_,g)),P=="o1235"&&(p=_+l.shift(),y=g+l.shift(),x=p+l.shift(),v=y+l.shift(),M=x+l.shift(),S=v+l.shift(),T=M+l.shift(),b=S+l.shift(),w=T+l.shift(),C=b+l.shift(),_=w+l.shift(),g=C+l.shift(),l.shift(),t.U.P.curveTo(c,p,y,x,v,M,S),t.U.P.curveTo(c,T,b,w,C,_,g)),P=="o1236"&&(p=_+l.shift(),y=g+l.shift(),x=p+l.shift(),S=v=y+l.shift(),b=v,w=(T=(M=x+l.shift())+l.shift())+l.shift(),C=b+l.shift(),_=w+l.shift(),t.U.P.curveTo(c,p,y,x,v,M,S),t.U.P.curveTo(c,T,b,w,C,_,g)),P=="o1237"&&(p=_+l.shift(),y=g+l.shift(),x=p+l.shift(),v=y+l.shift(),M=x+l.shift(),S=v+l.shift(),T=M+l.shift(),b=S+l.shift(),w=T+l.shift(),C=b+l.shift(),Math.abs(w-_)>Math.abs(C-g)?_=w+l.shift():g=C+l.shift(),t.U.P.curveTo(c,p,y,x,v,M,S),t.U.P.curveTo(c,T,b,w,C,_,g));else if(P=="o14"){if(l.length>0&&!f&&(h=l.shift()+o.nominalWidthX,f=!0),l.length==4){var H=l.shift(),q=l.shift(),X=l.shift(),F=l.shift(),W=t.CFF.glyphBySE(o,X),J=t.CFF.glyphBySE(o,F);t.U._drawCFF(o.CharStrings[W],s,o,a,c),s.x=H,s.y=q,t.U._drawCFF(o.CharStrings[J],s,o,a,c)}d&&(t.U.P.closePath(c),d=!1)}else if(P=="o19"||P=="o20")l.length%2!=0&&!f&&(h=l.shift()+a.nominalWidthX),u+=l.length>>1,l.length=0,f=!0,m+=u+7>>3;else if(P=="o21")l.length>2&&!f&&(h=l.shift()+a.nominalWidthX,f=!0),g+=l.pop(),_+=l.pop(),d&&t.U.P.closePath(c),t.U.P.moveTo(c,_,g),d=!0;else if(P=="o22")l.length>1&&!f&&(h=l.shift()+a.nominalWidthX,f=!0),_+=l.pop(),d&&t.U.P.closePath(c),t.U.P.moveTo(c,_,g),d=!0;else if(P=="o25"){for(;l.length>6;)_+=l.shift(),g+=l.shift(),t.U.P.lineTo(c,_,g);p=_+l.shift(),y=g+l.shift(),x=p+l.shift(),v=y+l.shift(),_=x+l.shift(),g=v+l.shift(),t.U.P.curveTo(c,p,y,x,v,_,g)}else if(P=="o26")for(l.length%2&&(_+=l.shift());l.length>0;)p=_,y=g+l.shift(),_=x=p+l.shift(),g=(v=y+l.shift())+l.shift(),t.U.P.curveTo(c,p,y,x,v,_,g);else if(P=="o27")for(l.length%2&&(g+=l.shift());l.length>0;)y=g,x=(p=_+l.shift())+l.shift(),v=y+l.shift(),_=x+l.shift(),g=v,t.U.P.curveTo(c,p,y,x,v,_,g);else if(P=="o10"||P=="o29"){var N=P=="o10"?a:o;if(l.length==0)console.debug("error: empty stack");else{var z=l.pop(),nt=N.Subrs[z+N.Bias];s.x=_,s.y=g,s.nStems=u,s.haveWidth=f,s.width=h,s.open=d,t.U._drawCFF(nt,s,o,a,c),_=s.x,g=s.y,u=s.nStems,f=s.haveWidth,h=s.width,d=s.open}}else if(P=="o30"||P=="o31"){var $=l.length,it=(tt=0,P=="o31");for(tt+=$-(D=-3&$);tt<D;)it?(y=g,x=(p=_+l.shift())+l.shift(),g=(v=y+l.shift())+l.shift(),D-tt==5?(_=x+l.shift(),tt++):_=x,it=!1):(p=_,y=g+l.shift(),x=p+l.shift(),v=y+l.shift(),_=x+l.shift(),D-tt==5?(g=v+l.shift(),tt++):g=v,it=!0),t.U.P.curveTo(c,p,y,x,v,_,g),tt+=4}else{if((P+"").charAt(0)=="o")throw console.debug("Unknown operation: "+P,r),P;l.push(P)}}}s.x=_,s.y=g,s.nStems=u,s.haveWidth=f,s.width=h,s.open=d};var n=t,i={Typr:n};return e.Typr=n,e.default=i,Object.defineProperty(e,"__esModule",{value:!0}),e})({}).Typr}function VP(){return(function(e){var t=Uint8Array,n=Uint16Array,i=Uint32Array,r=new t([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),s=new t([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),o=new t([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),a=function(P,D){for(var I=new n(31),V=0;V<31;++V)I[V]=D+=1<<P[V-1];var O=new i(I[30]);for(V=1;V<30;++V)for(var tt=I[V];tt<I[V+1];++tt)O[tt]=tt-I[V]<<5|V;return[I,O]},c=a(r,2),l=c[0],u=c[1];l[28]=258,u[258]=28;for(var f=a(s,0)[0],h=new n(32768),d=0;d<32768;++d){var m=(43690&d)>>>1|(21845&d)<<1;m=(61680&(m=(52428&m)>>>2|(13107&m)<<2))>>>4|(3855&m)<<4,h[d]=((65280&m)>>>8|(255&m)<<8)>>>1}var _=function(P,D,I){for(var V=P.length,O=0,tt=new n(D);O<V;++O)++tt[P[O]-1];var H,q=new n(D);for(O=0;O<D;++O)q[O]=q[O-1]+tt[O-1]<<1;{H=new n(1<<D);var X=15-D;for(O=0;O<V;++O)if(P[O])for(var F=O<<4|P[O],W=D-P[O],J=q[P[O]-1]++<<W,N=J|(1<<W)-1;J<=N;++J)H[h[J]>>>X]=F}return H},g=new t(288);for(d=0;d<144;++d)g[d]=8;for(d=144;d<256;++d)g[d]=9;for(d=256;d<280;++d)g[d]=7;for(d=280;d<288;++d)g[d]=8;var p=new t(32);for(d=0;d<32;++d)p[d]=5;var y=_(g,9),x=_(p,5),v=function(P){for(var D=P[0],I=1;I<P.length;++I)P[I]>D&&(D=P[I]);return D},T=function(P,D,I){var V=D/8|0;return(P[V]|P[V+1]<<8)>>(7&D)&I},b=function(P,D){var I=D/8|0;return(P[I]|P[I+1]<<8|P[I+2]<<16)>>(7&D)},w=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],C=function(P,D,I){var V=new Error(D||w[P]);if(V.code=P,Error.captureStackTrace&&Error.captureStackTrace(V,C),!I)throw V;return V},M=function(P,D,I){var V=P.length;if(!V||I&&!I.l&&V<5)return D||new t(0);var O=!D||I,tt=!I||I.i;I||(I={}),D||(D=new t(3*V));var H,q=function(ht){var Ht=D.length;if(ht>Ht){var Ft=new t(Math.max(2*Ht,ht));Ft.set(D),D=Ft}},X=I.f||0,F=I.p||0,W=I.b||0,J=I.l,N=I.d,z=I.m,nt=I.n,$=8*V;do{if(!J){I.f=X=T(P,F,1);var it=T(P,F+1,3);if(F+=3,!it){var vt=P[(yt=((H=F)/8|0)+(7&H&&1)+4)-4]|P[yt-3]<<8,bt=yt+vt;if(bt>V){tt&&C(0);break}O&&q(W+vt),D.set(P.subarray(yt,bt),W),I.b=W+=vt,I.p=F=8*bt;continue}if(it==1)J=y,N=x,z=9,nt=5;else if(it==2){var St=T(P,F,31)+257,ct=T(P,F+10,15)+4,Ot=St+T(P,F+5,31)+1;F+=14;for(var k=new t(Ot),It=new t(19),wt=0;wt<ct;++wt)It[o[wt]]=T(P,F+3*wt,7);F+=3*ct;var At=v(It),at=(1<<At)-1,Pt=_(It,At);for(wt=0;wt<Ot;){var yt,A=Pt[T(P,F,at)];if(F+=15&A,(yt=A>>>4)<16)k[wt++]=yt;else{var E=0,B=0;for(yt==16?(B=3+T(P,F,3),F+=2,E=k[wt-1]):yt==17?(B=3+T(P,F,7),F+=3):yt==18&&(B=11+T(P,F,127),F+=7);B--;)k[wt++]=E}}var Q=k.subarray(0,St),K=k.subarray(St);z=v(Q),nt=v(K),J=_(Q,z),N=_(K,nt)}else C(1);if(F>$){tt&&C(0);break}}O&&q(W+131072);for(var ot=(1<<z)-1,gt=(1<<nt)-1,lt=F;;lt=F){var dt=(E=J[b(P,F)&ot])>>>4;if((F+=15&E)>$){tt&&C(0);break}if(E||C(2),dt<256)D[W++]=dt;else{if(dt==256){lt=F,J=null;break}var Lt=dt-254;if(dt>264){var _t=r[wt=dt-257];Lt=T(P,F,(1<<_t)-1)+l[wt],F+=_t}var Ct=N[b(P,F)&gt],Rt=Ct>>>4;if(Ct||C(3),F+=15&Ct,K=f[Rt],Rt>3&&(_t=s[Rt],K+=b(P,F)&(1<<_t)-1,F+=_t),F>$){tt&&C(0);break}O&&q(W+131072);for(var Ut=W+Lt;W<Ut;W+=4)D[W]=D[W-K],D[W+1]=D[W+1-K],D[W+2]=D[W+2-K],D[W+3]=D[W+3-K];W=Ut}}I.l=J,I.p=lt,I.b=W,J&&(X=1,I.m=z,I.d=N,I.n=nt)}while(!X);return W==D.length?D:(function(ht,Ht,Ft){(Ft==null||Ft>ht.length)&&(Ft=ht.length);var Qt=new(ht instanceof n?n:ht instanceof i?i:t)(Ft-Ht);return Qt.set(ht.subarray(Ht,Ft)),Qt})(D,0,W)},S=new t(0),U=typeof TextDecoder<"u"&&new TextDecoder;try{U.decode(S,{stream:!0})}catch{}return e.convert_streams=function(P){var D=new DataView(P),I=0;function V(){var St=D.getUint16(I);return I+=2,St}function O(){var St=D.getUint32(I);return I+=4,St}function tt(St){vt.setUint16(bt,St),bt+=2}function H(St){vt.setUint32(bt,St),bt+=4}for(var q={signature:O(),flavor:O(),length:O(),numTables:V(),reserved:V(),totalSfntSize:O(),majorVersion:V(),minorVersion:V(),metaOffset:O(),metaLength:O(),metaOrigLength:O(),privOffset:O(),privLength:O()},X=0;Math.pow(2,X)<=q.numTables;)X++;X--;for(var F=16*Math.pow(2,X),W=16*q.numTables-F,J=12,N=[],z=0;z<q.numTables;z++)N.push({tag:O(),offset:O(),compLength:O(),origLength:O(),origChecksum:O()}),J+=16;var nt,$=new Uint8Array(12+16*N.length+N.reduce((function(St,ct){return St+ct.origLength+4}),0)),it=$.buffer,vt=new DataView(it),bt=0;return H(q.flavor),tt(q.numTables),tt(F),tt(X),tt(W),N.forEach((function(St){H(St.tag),H(St.origChecksum),H(J),H(St.origLength),St.outOffset=J,(J+=St.origLength)%4!=0&&(J+=4-J%4)})),N.forEach((function(St){var ct,Ot=P.slice(St.offset,St.offset+St.compLength);if(St.compLength!=St.origLength){var k=new Uint8Array(St.origLength);ct=new Uint8Array(Ot,2),M(ct,k)}else k=new Uint8Array(Ot);$.set(k,St.outOffset);var It=0;(J=St.outOffset+St.origLength)%4!=0&&(It=4-J%4),$.set(new Uint8Array(It).buffer,St.outOffset+St.origLength),nt=J+It})),it.slice(0,nt)},Object.defineProperty(e,"__esModule",{value:!0}),e})({}).convert_streams}function HP(e,t){const n={M:2,L:2,Q:4,C:6,Z:0},i={C:"18g,ca,368,1kz",D:"17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v",R:"17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6",L:"x9u,jff,a,fd,jv",T:"4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n"},r=1,s=2,o=4,a=8,c=16,l=32;let u;function f(w){if(!u){const C={R:s,L:r,D:o,C:c,U:l,T:a};u=new Map;for(let M in i){let S=0;i[M].split(",").forEach(U=>{let[P,D]=U.split("+");P=parseInt(P,36),D=D?parseInt(D,36):0,u.set(S+=P,C[M]);for(let I=D;I--;)u.set(++S,C[M])})}}return u.get(w)||l}const h=1,d=2,m=3,_=4,g=[null,"isol","init","fina","medi"];function p(w){const C=new Uint8Array(w.length);let M=l,S=h,U=-1;for(let P=0;P<w.length;P++){const D=w.codePointAt(P);let I=f(D)|0,V=h;I&a||(M&(r|o|c)?I&(s|o|c)?(V=m,(S===h||S===m)&&C[U]++):I&(r|l)&&(S===d||S===_)&&C[U]--:M&(s|l)&&(S===d||S===_)&&C[U]--,S=C[P]=V,M=I,U=P,D>65535&&P++)}return C}function y(w,C){const M=[];for(let U=0;U<C.length;U++){const P=C.codePointAt(U);P>65535&&U++,M.push(e.U.codeToGlyph(w,P))}const S=w.GSUB;if(S){const{lookupList:U,featureList:P}=S;let D;const I=/^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws|ccmp)$/,V=[];P.forEach(O=>{if(I.test(O.tag))for(let tt=0;tt<O.tab.length;tt++){if(V[O.tab[tt]])continue;V[O.tab[tt]]=!0;const H=U[O.tab[tt]],q=/^(isol|init|fina|medi)$/.test(O.tag);q&&!D&&(D=p(C));for(let X=0;X<M.length;X++)(!D||!q||g[D[X]]===O.tag)&&e.U._applySubs(M,X,H,U)}})}return M}function x(w,C){const M=new Int16Array(C.length*3);let S=0;for(;S<C.length;S++){const I=C[S];if(I===-1)continue;M[S*3+2]=w.hmtx.aWidth[I];const V=w.GPOS;if(V){const O=V.lookupList;for(let tt=0;tt<O.length;tt++){const H=O[tt];for(let q=0;q<H.tabs.length;q++){const X=H.tabs[q];if(H.ltype===1){if(e._lctf.coverageIndex(X.coverage,I)!==-1&&X.pos){D(X.pos,S);break}}else if(H.ltype===2){let F=null,W=U();if(W!==-1){const J=e._lctf.coverageIndex(X.coverage,C[W]);if(J!==-1){if(X.fmt===1){const N=X.pairsets[J];for(let z=0;z<N.length;z++)N[z].gid2===I&&(F=N[z])}else if(X.fmt===2){const N=e.U._getGlyphClass(C[W],X.classDef1),z=e.U._getGlyphClass(I,X.classDef2);F=X.matrix[N][z]}if(F){F.val1&&D(F.val1,W),F.val2&&D(F.val2,S);break}}}}else if(H.ltype===4){const F=e._lctf.coverageIndex(X.markCoverage,I);if(F!==-1){const W=U(P),J=W===-1?-1:e._lctf.coverageIndex(X.baseCoverage,C[W]);if(J!==-1){const N=X.markArray[F],z=X.baseArray[J][N.markClass];M[S*3]=z.x-N.x+M[W*3]-M[W*3+2],M[S*3+1]=z.y-N.y+M[W*3+1];break}}}else if(H.ltype===6){const F=e._lctf.coverageIndex(X.mark1Coverage,I);if(F!==-1){const W=U();if(W!==-1){const J=C[W];if(v(w,J)===3){const N=e._lctf.coverageIndex(X.mark2Coverage,J);if(N!==-1){const z=X.mark1Array[F],nt=X.mark2Array[N][z.markClass];M[S*3]=nt.x-z.x+M[W*3]-M[W*3+2],M[S*3+1]=nt.y-z.y+M[W*3+1];break}}}}}}}}else if(w.kern&&!w.cff){const O=U();if(O!==-1){const tt=w.kern.glyph1.indexOf(C[O]);if(tt!==-1){const H=w.kern.rval[tt].glyph2.indexOf(I);H!==-1&&(M[O*3+2]+=w.kern.rval[tt].vals[H])}}}}return M;function U(I){for(let V=S-1;V>=0;V--)if(C[V]!==-1&&(!I||I(C[V])))return V;return-1}function P(I){return v(w,I)===1}function D(I,V){for(let O=0;O<3;O++)M[V*3+O]+=I[O]||0}}function v(w,C){const M=w.GDEF&&w.GDEF.glyphClassDef;return M?e.U._getGlyphClass(C,M):0}function T(...w){for(let C=0;C<w.length;C++)if(typeof w[C]=="number")return w[C]}function b(w){const C=Object.create(null),M=w["OS/2"],S=w.hhea,U=w.head.unitsPerEm,P=T(M&&M.sTypoAscender,S&&S.ascender,U),D={unitsPerEm:U,ascender:P,descender:T(M&&M.sTypoDescender,S&&S.descender,0),capHeight:T(M&&M.sCapHeight,P),xHeight:T(M&&M.sxHeight,P),lineGap:T(M&&M.sTypoLineGap,S&&S.lineGap),supportsCodePoint(I){return e.U.codeToGlyph(w,I)>0},forEachGlyph(I,V,O,tt){let H=0;const q=1/D.unitsPerEm*V,X=y(w,I);let F=0;const W=x(w,X);return X.forEach((J,N)=>{if(J!==-1){let z=C[J];if(!z){const{cmds:nt,crds:$}=e.U.glyphToPath(w,J);let it="",vt=0;for(let k=0,It=nt.length;k<It;k++){const wt=n[nt[k]];it+=nt[k];for(let At=1;At<=wt;At++)it+=(At>1?",":"")+$[vt++]}let bt,St,ct,Ot;if($.length){bt=St=1/0,ct=Ot=-1/0;for(let k=0,It=$.length;k<It;k+=2){let wt=$[k],At=$[k+1];wt<bt&&(bt=wt),At<St&&(St=At),wt>ct&&(ct=wt),At>Ot&&(Ot=At)}}else bt=ct=St=Ot=0;z=C[J]={index:J,advanceWidth:w.hmtx.aWidth[J],xMin:bt,yMin:St,xMax:ct,yMax:Ot,path:it}}tt.call(null,z,H+W[N*3]*q,W[N*3+1]*q,F),H+=W[N*3+2]*q,O&&(H+=O*V)}F+=I.codePointAt(F)>65535?2:1}),H}};return D}return function(C){const M=new Uint8Array(C,0,4),S=e._bin.readASCII(M,0,4);if(S==="wOFF")C=t(C);else if(S==="wOF2")throw new Error("woff2 fonts not supported");return b(e.parse(C)[0])}}const WP=Io({name:"Typr Font Parser",dependencies:[GP,VP,HP],init(e,t,n){const i=e(),r=t();return n(i,r)}});function $P(){return(function(e){var t=function(){this.buckets=new Map};t.prototype.add=function(x){var v=x>>5;this.buckets.set(v,(this.buckets.get(v)||0)|1<<(31&x))},t.prototype.has=function(x){var v=this.buckets.get(x>>5);return v!==void 0&&(v&1<<(31&x))!=0},t.prototype.serialize=function(){var x=[];return this.buckets.forEach((function(v,T){x.push((+T).toString(36)+":"+v.toString(36))})),x.join(",")},t.prototype.deserialize=function(x){var v=this;this.buckets.clear(),x.split(",").forEach((function(T){var b=T.split(":");v.buckets.set(parseInt(b[0],36),parseInt(b[1],36))}))};var n=Math.pow(2,8),i=n-1,r=~i;function s(x){var v=(function(b){return b&r})(x).toString(16),T=(function(b){return(b&r)+n-1})(x).toString(16);return"codepoint-index/plane"+(x>>16)+"/"+v+"-"+T+".json"}function o(x,v){var T=x&i,b=v.codePointAt(T/6|0);return((b=(b||48)-48)&1<<T%6)!=0}function a(x,v){var T;(T=x,T.replace(/U\+/gi,"").replace(/^,+|,+$/g,"").split(/,+/).map((function(b){return b.split("-").map((function(w){return parseInt(w.trim(),16)}))}))).forEach((function(b){var w=b[0],C=b[1];C===void 0&&(C=w),v(w,C)}))}function c(x,v){a(x,(function(T,b){for(var w=T;w<=b;w++)v(w)}))}var l={},u={},f=new WeakMap,h="https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data";function d(x){var v=f.get(x);return v||(v=new t,c(x.ranges,(function(T){return v.add(T)})),f.set(x,v)),v}var m,_=new Map;function g(x,v,T){return x[v]?v:x[T]?T:(function(b){for(var w in b)return w})(x)}function p(x,v){var T=v;if(!x.includes(T)){T=1/0;for(var b=0;b<x.length;b++)Math.abs(x[b]-v)<Math.abs(T-v)&&(T=x[b])}return T}function y(x){return m||(m=new Set,c("9-D,20,85,A0,1680,2000-200A,2028-202F,205F,3000",(function(v){m.add(v)}))),m.has(x)}return e.CodePointSet=t,e.clearCache=function(){l={},u={}},e.getFontsForString=function(x,v){v===void 0&&(v={});var T,b=v.lang;b===void 0&&(b=/\p{Script=Hangul}/u.test(T=x)?"ko":/\p{Script=Hiragana}|\p{Script=Katakana}/u.test(T)?"ja":"en");var w=v.category;w===void 0&&(w="sans-serif");var C=v.style;C===void 0&&(C="normal");var M=v.weight;M===void 0&&(M=400);var S=(v.dataUrl||h).replace(/\/$/g,""),U=new Map,P=new Uint8Array(x.length),D={},I={},V=new Array(x.length),O=new Map,tt=!1;function H(F){var W=_.get(F);return W||(W=fetch(S+"/"+F).then((function(J){if(!J.ok)throw new Error(J.statusText);return J.json().then((function(N){if(!Array.isArray(N)||N[0]!==1)throw new Error("Incorrect schema version; need 1, got "+N[0]);return N[1]}))})).catch((function(J){if(S!==h)return tt||(console.error('unicode-font-resolver: Failed loading from dataUrl "'+S+'", trying default CDN. '+J.message),tt=!0),S=h,_.delete(F),H(F);throw J})),_.set(F,W)),W}for(var q=function(F){var W=x.codePointAt(F),J=s(W);V[F]=J,l[J]||O.has(J)||O.set(J,H(J).then((function(N){l[J]=N}))),W>65535&&(F++,X=F)},X=0;X<x.length;X++)q(X);return Promise.all(O.values()).then((function(){O.clear();for(var F=function(J){var N=x.codePointAt(J),z=null,nt=l[V[J]],$=void 0;for(var it in nt){var vt=I[it];if(vt===void 0&&(vt=I[it]=new RegExp(it).test(b||"en")),vt){for(var bt in $=it,nt[it])if(o(N,nt[it][bt])){z=bt;break}break}}if(!z){t:for(var St in nt)if(St!==$){for(var ct in nt[St])if(o(N,nt[St][ct])){z=ct;break t}}}z||(console.debug("No font coverage for U+"+N.toString(16)),z="latin"),V[J]=z,u[z]||O.has(z)||O.set(z,H("font-meta/"+z+".json").then((function(Ot){u[z]=Ot}))),N>65535&&(J++,W=J)},W=0;W<x.length;W++)F(W);return Promise.all(O.values())})).then((function(){for(var F,W=null,J=0;J<x.length;J++){var N=x.codePointAt(J);if(W&&(y(N)||d(W).has(N)))P[J]=P[J-1];else{W=u[V[J]];var z=D[W.id];if(!z){var nt=W.typeforms,$=g(nt,w,"sans-serif"),it=g(nt[$],C,"normal"),vt=p((F=nt[$])===null||F===void 0?void 0:F[it],M);z=D[W.id]=S+"/font-files/"+W.id+"/"+$+"."+it+"."+vt+".woff"}var bt=U.get(z);bt==null&&(bt=U.size,U.set(z,bt)),P[J]=bt}N>65535&&(J++,P[J]=P[J-1])}return{fontUrls:Array.from(U.keys()),chars:P}}))},Object.defineProperty(e,"__esModule",{value:!0}),e})({})}function XP(e,t){const n=Object.create(null),i=Object.create(null);function r(o,a){const c=l=>{console.error(`Failure loading font ${o}`,l)};try{const l=new XMLHttpRequest;l.open("get",o,!0),l.responseType="arraybuffer",l.onload=function(){if(l.status>=400)c(new Error(l.statusText));else if(l.status>0)try{const u=e(l.response);u.src=o,a(u)}catch(u){c(u)}},l.onerror=c,l.send()}catch(l){c(l)}}function s(o,a){let c=n[o];c?a(c):i[o]?i[o].push(a):(i[o]=[a],r(o,l=>{l.src=o,n[o]=l,i[o].forEach(u=>u(l)),delete i[o]}))}return function(o,a,{lang:c,fonts:l=[],style:u="normal",weight:f="normal",unicodeFontsURL:h}={}){const d=new Uint8Array(o.length),m=[];o.length||y();const _=new Map,g=[];if(u!=="italic"&&(u="normal"),typeof f!="number"&&(f=f==="bold"?700:400),l&&!Array.isArray(l)&&(l=[l]),l=l.slice().filter(v=>!v.lang||v.lang.test(c)).reverse(),l.length){let w=0;(function C(M=0){for(let S=M,U=o.length;S<U;S++){const P=o.codePointAt(S);if(w===1&&m[d[S-1]].supportsCodePoint(P)||S>0&&/\s/.test(o[S]))d[S]=d[S-1],w===2&&(g[g.length-1][1]=S);else for(let D=d[S],I=l.length;D<=I;D++)if(D===I){const V=w===2?g[g.length-1]:g[g.length]=[S,S];V[1]=S,w=2}else{d[S]=D;const{src:V,unicodeRange:O}=l[D];if(!O||x(P,O)){const tt=n[V];if(!tt){s(V,()=>{C(S)});return}if(tt.supportsCodePoint(P)){let H=_.get(tt);typeof H!="number"&&(H=m.length,m.push(tt),_.set(tt,H)),d[S]=H,w=1;break}}}P>65535&&S+1<U&&(d[S+1]=d[S],S++,w===2&&(g[g.length-1][1]=S))}p()})()}else g.push([0,o.length-1]),p();function p(){if(g.length){const v=g.map(T=>o.substring(T[0],T[1]+1)).join(`
`);t.getFontsForString(v,{lang:c||void 0,style:u,weight:f,dataUrl:h}).then(({fontUrls:T,chars:b})=>{const w=m.length;let C=0;g.forEach(S=>{for(let U=0,P=S[1]-S[0];U<=P;U++)d[S[0]+U]=b[C++]+w;C++});let M=0;T.forEach((S,U)=>{s(S,P=>{m[U+w]=P,++M===T.length&&y()})})})}else y()}function y(){a({chars:d,fonts:m})}function x(v,T){for(let b=0;b<T.length;b++){const[w,C=w]=T[b];if(w<=v&&v<=C)return!0}return!1}}}const YP=Io({name:"FontResolver",dependencies:[XP,WP,$P],init(e,t,n){return e(t,n())}});function ZP(e,t){const i=/[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/,r="[^\\S\\u00A0]",s=new RegExp(`${r}|[\\-\\u007C\\u00AD\\u2010\\u2012-\\u2014\\u2027\\u2056\\u2E17\\u2E40]`);function o({text:m,lang:_,fonts:g,style:p,weight:y,preResolvedFonts:x,unicodeFontsURL:v},T){const b=({chars:w,fonts:C})=>{let M,S;const U=[];for(let P=0;P<w.length;P++)w[P]!==S?(S=w[P],U.push(M={start:P,end:P,fontObj:C[w[P]]})):M.end=P;T(U)};x?b(x):e(m,b,{lang:_,fonts:g,style:p,weight:y,unicodeFontsURL:v})}function a({text:m="",font:_,lang:g,sdfGlyphSize:p=64,fontSize:y=400,fontWeight:x=1,fontStyle:v="normal",letterSpacing:T=0,lineHeight:b="normal",maxWidth:w=1/0,direction:C,textAlign:M="left",textIndent:S=0,whiteSpace:U="normal",overflowWrap:P="normal",anchorX:D=0,anchorY:I=0,metricsOnly:V=!1,unicodeFontsURL:O,preResolvedFonts:tt=null,includeCaretPositions:H=!1,chunkedBoundsSize:q=8192,colorRanges:X=null},F){const W=f(),J={fontLoad:0,typesetting:0};m.indexOf("\r")>-1&&(console.info("Typesetter: got text with \\r chars; normalizing to \\n"),m=m.replace(/\r\n/g,`
`).replace(/\r/g,`
`)),y=+y,T=+T,w=+w,b=b||"normal",S=+S,o({text:m,lang:g,style:v,weight:x,fonts:typeof _=="string"?[{src:_}]:_,unicodeFontsURL:O,preResolvedFonts:tt},N=>{J.fontLoad=f()-W;const z=isFinite(w);let nt=null,$=null,it=null,vt=null,bt=null,St=null,ct=null,Ot=null,k=0,It=0,wt=U!=="nowrap";const At=new Map,at=f();let Pt=S,yt=0,A=new h;const E=[A];N.forEach(gt=>{const{fontObj:lt}=gt,{ascender:dt,descender:Lt,unitsPerEm:_t,lineGap:Ct,capHeight:Rt,xHeight:Ut}=lt;let ht=At.get(lt);if(!ht){const ft=y/_t,et=b==="normal"?(dt-Lt+Ct)*ft:b*y,pt=(et-(dt-Lt)*ft)/2,Mt=Math.min(et,(dt-Lt)*ft),xt=(dt+Lt)/2*ft+Mt/2;ht={index:At.size,src:lt.src,fontObj:lt,fontSizeMult:ft,unitsPerEm:_t,ascender:dt*ft,descender:Lt*ft,capHeight:Rt*ft,xHeight:Ut*ft,lineHeight:et,baseline:-pt-dt*ft,caretTop:xt,caretBottom:xt-Mt},At.set(lt,ht)}const{fontSizeMult:Ht}=ht,Ft=m.slice(gt.start,gt.end+1);let Qt,G;lt.forEachGlyph(Ft,y,T,(ft,et,pt,Mt)=>{et+=yt,Mt+=gt.start,Qt=et,G=ft;const xt=m.charAt(Mt),kt=ft.advanceWidth*Ht,Zt=A.count;let Vt;if("isEmpty"in ft||(ft.isWhitespace=!!xt&&new RegExp(r).test(xt),ft.canBreakAfter=!!xt&&s.test(xt),ft.isEmpty=ft.xMin===ft.xMax||ft.yMin===ft.yMax||i.test(xt)),!ft.isWhitespace&&!ft.isEmpty&&It++,wt&&z&&!ft.isWhitespace&&et+kt+Pt>w&&Zt){if(A.glyphAt(Zt-1).glyphObj.canBreakAfter)Vt=new h,Pt=-et;else for(let we=Zt;we--;)if(we===0&&P==="break-word"){Vt=new h,Pt=-et;break}else if(A.glyphAt(we).glyphObj.canBreakAfter){Vt=A.splitAt(we+1);const Re=Vt.glyphAt(0).x;Pt-=Re;for(let Be=Vt.count;Be--;)Vt.glyphAt(Be).x-=Re;break}Vt&&(A.isSoftWrapped=!0,A=Vt,E.push(A),k=w)}let Xt=A.glyphAt(A.count);Xt.glyphObj=ft,Xt.x=et+Pt,Xt.y=pt,Xt.width=kt,Xt.charIndex=Mt,Xt.fontData=ht,xt===`
`&&(A=new h,E.push(A),Pt=-(et+kt+T*y)+S)}),yt=Qt+G.advanceWidth*Ht+T*y});let B=0;E.forEach(gt=>{let lt=!0;for(let dt=gt.count;dt--;){const Lt=gt.glyphAt(dt);lt&&!Lt.glyphObj.isWhitespace&&(gt.width=Lt.x+Lt.width,gt.width>k&&(k=gt.width),lt=!1);let{lineHeight:_t,capHeight:Ct,xHeight:Rt,baseline:Ut}=Lt.fontData;_t>gt.lineHeight&&(gt.lineHeight=_t);const ht=Ut-gt.baseline;ht<0&&(gt.baseline+=ht,gt.cap+=ht,gt.ex+=ht),gt.cap=Math.max(gt.cap,gt.baseline+Ct),gt.ex=Math.max(gt.ex,gt.baseline+Rt)}gt.baseline-=B,gt.cap-=B,gt.ex-=B,B+=gt.lineHeight});let Q=0,K=0;if(D&&(typeof D=="number"?Q=-D:typeof D=="string"&&(Q=-k*(D==="left"?0:D==="center"?.5:D==="right"?1:l(D)))),I&&(typeof I=="number"?K=-I:typeof I=="string"&&(K=I==="top"?0:I==="top-baseline"?-E[0].baseline:I==="top-cap"?-E[0].cap:I==="top-ex"?-E[0].ex:I==="middle"?B/2:I==="bottom"?B:I==="bottom-baseline"?-E[E.length-1].baseline:l(I)*B)),!V){const gt=t.getEmbeddingLevels(m,C);nt=new Uint16Array(It),$=new Uint8Array(It),it=new Float32Array(It*2),vt={},ct=[1/0,1/0,-1/0,-1/0],Ot=[],H&&(St=new Float32Array(m.length*4)),X&&(bt=new Uint8Array(It*3));let lt=0,dt=-1,Lt=-1,_t,Ct;if(E.forEach((Rt,Ut)=>{let{count:ht,width:Ht}=Rt;if(ht>0){let Ft=0;for(let Mt=ht;Mt--&&Rt.glyphAt(Mt).glyphObj.isWhitespace;)Ft++;let Qt=0,G=0;if(M==="center")Qt=(k-Ht)/2;else if(M==="right")Qt=k-Ht;else if(M==="justify"&&Rt.isSoftWrapped){let Mt=0;for(let xt=ht-Ft;xt--;)Rt.glyphAt(xt).glyphObj.isWhitespace&&Mt++;G=(k-Ht)/Mt}if(G||Qt){let Mt=0;for(let xt=0;xt<ht;xt++){let kt=Rt.glyphAt(xt);const Zt=kt.glyphObj;kt.x+=Qt+Mt,G!==0&&Zt.isWhitespace&&xt<ht-Ft&&(Mt+=G,kt.width+=G)}}const ft=t.getReorderSegments(m,gt,Rt.glyphAt(0).charIndex,Rt.glyphAt(Rt.count-1).charIndex);for(let Mt=0;Mt<ft.length;Mt++){const[xt,kt]=ft[Mt];let Zt=1/0,Vt=-1/0;for(let Xt=0;Xt<ht;Xt++)if(Rt.glyphAt(Xt).charIndex>=xt){let we=Xt,Re=Xt;for(;Re<ht;Re++){let Be=Rt.glyphAt(Re);if(Be.charIndex>kt)break;Re<ht-Ft&&(Zt=Math.min(Zt,Be.x),Vt=Math.max(Vt,Be.x+Be.width))}for(let Be=we;Be<Re;Be++){const Cn=Rt.glyphAt(Be);Cn.x=Vt-(Cn.x+Cn.width-Zt)}break}}let et;const pt=Mt=>et=Mt;for(let Mt=0;Mt<ht;Mt++){const xt=Rt.glyphAt(Mt);et=xt.glyphObj;const kt=et.index,Zt=gt.levels[xt.charIndex]&1;if(Zt){const Vt=t.getMirroredCharacter(m[xt.charIndex]);Vt&&xt.fontData.fontObj.forEachGlyph(Vt,0,0,pt)}if(H){const{charIndex:Vt,fontData:Xt}=xt,we=xt.x+Q,Re=xt.x+xt.width+Q;St[Vt*4]=Zt?Re:we,St[Vt*4+1]=Zt?we:Re,St[Vt*4+2]=Rt.baseline+Xt.caretBottom+K,St[Vt*4+3]=Rt.baseline+Xt.caretTop+K;const Be=Vt-dt;Be>1&&u(St,dt,Be),dt=Vt}if(X){const{charIndex:Vt}=xt;for(;Vt>Lt;)Lt++,X.hasOwnProperty(Lt)&&(Ct=X[Lt])}if(!et.isWhitespace&&!et.isEmpty){const Vt=lt++,{fontSizeMult:Xt,src:we,index:Re}=xt.fontData,Be=vt[we]||(vt[we]={});Be[kt]||(Be[kt]={path:et.path,pathBounds:[et.xMin,et.yMin,et.xMax,et.yMax]});const Cn=xt.x+Q,_n=xt.y+Rt.baseline+K;it[Vt*2]=Cn,it[Vt*2+1]=_n;const Wn=Cn+et.xMin*Xt,vi=_n+et.yMin*Xt,Ri=Cn+et.xMax*Xt,Rn=_n+et.yMax*Xt;Wn<ct[0]&&(ct[0]=Wn),vi<ct[1]&&(ct[1]=vi),Ri>ct[2]&&(ct[2]=Ri),Rn>ct[3]&&(ct[3]=Rn),Vt%q===0&&(_t={start:Vt,end:Vt,rect:[1/0,1/0,-1/0,-1/0]},Ot.push(_t)),_t.end++;const en=_t.rect;if(Wn<en[0]&&(en[0]=Wn),vi<en[1]&&(en[1]=vi),Ri>en[2]&&(en[2]=Ri),Rn>en[3]&&(en[3]=Rn),nt[Vt]=kt,$[Vt]=Re,X){const si=Vt*3;bt[si]=Ct>>16&255,bt[si+1]=Ct>>8&255,bt[si+2]=Ct&255}}}}}),St){const Rt=m.length-dt;Rt>1&&u(St,dt,Rt)}}const ot=[];At.forEach(({index:gt,src:lt,unitsPerEm:dt,ascender:Lt,descender:_t,lineHeight:Ct,capHeight:Rt,xHeight:Ut})=>{ot[gt]={src:lt,unitsPerEm:dt,ascender:Lt,descender:_t,lineHeight:Ct,capHeight:Rt,xHeight:Ut}}),J.typesetting=f()-at,F({glyphIds:nt,glyphFontIndices:$,glyphPositions:it,glyphData:vt,fontData:ot,caretPositions:St,glyphColors:bt,chunkedBounds:Ot,fontSize:y,topBaseline:K+E[0].baseline,blockBounds:[Q,K-B,Q+k,K],visibleBounds:ct,timings:J})})}function c(m,_){a({...m,metricsOnly:!0},g=>{const[p,y,x,v]=g.blockBounds;_({width:x-p,height:v-y})})}function l(m){let _=m.match(/^([\d.]+)%$/),g=_?parseFloat(_[1]):NaN;return isNaN(g)?0:g/100}function u(m,_,g){const p=m[_*4],y=m[_*4+1],x=m[_*4+2],v=m[_*4+3],T=(y-p)/g;for(let b=0;b<g;b++){const w=(_+b)*4;m[w]=p+T*b,m[w+1]=p+T*(b+1),m[w+2]=x,m[w+3]=v}}function f(){return(self.performance||Date).now()}function h(){this.data=[]}const d=["glyphObj","x","y","width","charIndex","fontData"];return h.prototype={width:0,lineHeight:0,baseline:0,cap:0,ex:0,isSoftWrapped:!1,get count(){return Math.ceil(this.data.length/d.length)},glyphAt(m){let _=h.flyweight;return _.data=this.data,_.index=m,_},splitAt(m){let _=new h;return _.data=this.data.splice(m*d.length),_}},h.flyweight=d.reduce((m,_,g,p)=>(Object.defineProperty(m,_,{get(){return this.data[this.index*d.length+g]},set(y){this.data[this.index*d.length+g]=y}}),m),{data:null,index:0}),{typeset:a,measure:c}}const ms=()=>(self.performance||Date).now(),Nl=l0();let Ym;function jP(e,t,n,i,r,s,o,a,c,l,u=!0){return u?KP(e,t,n,i,r,s,o,a,c,l).then(null,f=>(Ym||(console.warn("WebGL SDF generation failed, falling back to JS",f),Ym=!0),jm(e,t,n,i,r,s,o,a,c,l))):jm(e,t,n,i,r,s,o,a,c,l)}const qc=[],qP=5;let gh=0;function f0(){const e=ms();for(;qc.length&&ms()-e<qP;)qc.shift()();gh=qc.length?setTimeout(f0,0):0}const KP=(...e)=>new Promise((t,n)=>{qc.push(()=>{const i=ms();try{Nl.webgl.generateIntoCanvas(...e),t({timing:ms()-i})}catch(r){n(r)}}),gh||(gh=setTimeout(f0,0))}),JP=4,QP=2e3,Zm={};let tU=0;function jm(e,t,n,i,r,s,o,a,c,l){const u="TroikaTextSDFGenerator_JS_"+tU++%JP;let f=Zm[u];return f||(f=Zm[u]={workerModule:Io({name:u,workerId:u,dependencies:[l0,ms],init(h,d){const m=h().javascript.generate;return function(..._){const g=d();return{textureData:m(..._),timing:d()-g}}},getTransferables(h){return[h.textureData.buffer]}}),requests:0,idleTimer:null}),f.requests++,clearTimeout(f.idleTimer),f.workerModule(e,t,n,i,r,s).then(({textureData:h,timing:d})=>{const m=ms(),_=new Uint8Array(h.length*4);for(let g=0;g<h.length;g++)_[g*4+l]=h[g];return Nl.webglUtils.renderImageData(o,_,a,c,e,t,1<<3-l),d+=ms()-m,--f.requests===0&&(f.idleTimer=setTimeout(()=>{UP(u)},QP)),{timing:d}})}function eU(e){e._warm||(Nl.webgl.isSupported(e),e._warm=!0)}const nU=Nl.webglUtils.resizeWebGLCanvasWithoutClearing,aa={unicodeFontsURL:null,sdfGlyphSize:64,sdfMargin:1/16,sdfExponent:9,textureWidth:2048},iU=new ie;function js(){return(self.performance||Date).now()}const qm=Object.create(null);function rU(e,t){e=oU({},e);const n=js(),i=[];if(e.font&&i.push({label:"user",src:aU(e.font)}),e.font=i,e.text=""+e.text,e.sdfGlyphSize=e.sdfGlyphSize||aa.sdfGlyphSize,e.unicodeFontsURL=e.unicodeFontsURL||aa.unicodeFontsURL,e.colorRanges!=null){let h={};for(let d in e.colorRanges)if(e.colorRanges.hasOwnProperty(d)){let m=e.colorRanges[d];typeof m!="number"&&(m=iU.set(m).getHex()),h[d]=m}e.colorRanges=h}Object.freeze(e);const{textureWidth:r,sdfExponent:s}=aa,{sdfGlyphSize:o}=e,a=r/o*4;let c=qm[o];if(!c){const h=document.createElement("canvas");h.width=r,h.height=o*256/a,c=qm[o]={glyphCount:0,sdfGlyphSize:o,sdfCanvas:h,sdfTexture:new Mn(h,void 0,void 0,void 0,ui,ui),contextLost:!1,glyphsByFont:new Map},c.sdfTexture.generateMipmaps=!1,sU(c)}const{sdfTexture:l,sdfCanvas:u}=c;p0(e).then(h=>{const{glyphIds:d,glyphFontIndices:m,fontData:_,glyphPositions:g,fontSize:p,timings:y}=h,x=[],v=new Float32Array(d.length*4);let T=0,b=0;const w=js(),C=_.map(D=>{let I=c.glyphsByFont.get(D.src);return I||c.glyphsByFont.set(D.src,I=new Map),I});d.forEach((D,I)=>{const V=m[I],{src:O,unitsPerEm:tt}=_[V];let H=C[V].get(D);if(!H){const{path:J,pathBounds:N}=h.glyphData[O][D],z=Math.max(N[2]-N[0],N[3]-N[1])/o*(aa.sdfMargin*o+.5),nt=c.glyphCount++,$=[N[0]-z,N[1]-z,N[2]+z,N[3]+z];C[V].set(D,H={path:J,atlasIndex:nt,sdfViewBox:$}),x.push(H)}const{sdfViewBox:q}=H,X=g[b++],F=g[b++],W=p/tt;v[T++]=X+q[0]*W,v[T++]=F+q[1]*W,v[T++]=X+q[2]*W,v[T++]=F+q[3]*W,d[I]=H.atlasIndex}),y.quads=(y.quads||0)+(js()-w);const M=js();y.sdf={};const S=u.height,U=Math.ceil(c.glyphCount/a),P=Math.pow(2,Math.ceil(Math.log2(U*o)));P>S&&(console.info(`Increasing SDF texture size ${S}->${P}`),nU(u,r,P),l.dispose()),Promise.all(x.map(D=>h0(D,c,e.gpuAccelerateSDF).then(({timing:I})=>{y.sdf[D.atlasIndex]=I}))).then(()=>{x.length&&!c.contextLost&&(d0(c),l.needsUpdate=!0),y.sdfTotal=js()-M,y.total=js()-n,t(Object.freeze({parameters:e,sdfTexture:l,sdfGlyphSize:o,sdfExponent:s,glyphBounds:v,glyphAtlasIndices:d,glyphColors:h.glyphColors,caretPositions:h.caretPositions,chunkedBounds:h.chunkedBounds,ascender:h.ascender,descender:h.descender,lineHeight:h.lineHeight,capHeight:h.capHeight,xHeight:h.xHeight,topBaseline:h.topBaseline,blockBounds:h.blockBounds,visibleBounds:h.visibleBounds,timings:h.timings}))})}),Promise.resolve().then(()=>{c.contextLost||eU(u)})}function h0({path:e,atlasIndex:t,sdfViewBox:n},{sdfGlyphSize:i,sdfCanvas:r,contextLost:s},o){if(s)return Promise.resolve({timing:-1});const{textureWidth:a,sdfExponent:c}=aa,l=Math.max(n[2]-n[0],n[3]-n[1]),u=Math.floor(t/4),f=u%(a/i)*i,h=Math.floor(u/(a/i))*i,d=t%4;return jP(i,i,e,n,l,c,r,f,h,d,o)}function sU(e){const t=e.sdfCanvas;t.addEventListener("webglcontextlost",n=>{console.log("Context Lost",n),n.preventDefault(),e.contextLost=!0}),t.addEventListener("webglcontextrestored",n=>{console.log("Context Restored",n),e.contextLost=!1;const i=[];e.glyphsByFont.forEach(r=>{r.forEach(s=>{i.push(h0(s,e,!0))})}),Promise.all(i).then(()=>{d0(e),e.sdfTexture.needsUpdate=!0})})}function oU(e,t){for(let n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}let Pc;function aU(e){return Pc||(Pc=typeof document>"u"?{}:document.createElement("a")),Pc.href=e,Pc.href}function d0(e){if(typeof createImageBitmap!="function"){console.info("Safari<15: applying SDF canvas workaround");const{sdfCanvas:t,sdfTexture:n}=e,{width:i,height:r}=t,s=e.sdfCanvas.getContext("webgl");let o=n.image.data;(!o||o.length!==i*r*4)&&(o=new Uint8Array(i*r*4),n.image={width:i,height:r,data:o},n.flipY=!1,n.isDataTexture=!0),s.readPixels(0,0,i,r,s.RGBA,s.UNSIGNED_BYTE,o)}}const cU=Io({name:"Typesetter",dependencies:[ZP,YP,IP],init(e,t,n){return e(t,n())}}),p0=Io({name:"Typesetter",dependencies:[cU],init(e){return function(t){return new Promise(n=>{e.typeset(t,n)})}},getTransferables(e){const t=[];for(let n in e)e[n]&&e[n].buffer&&t.push(e[n].buffer);return t}});p0.onMainThread;const Km={};function lU(e){let t=Km[e];return t||(t=Km[e]=new Es(1,1,e,e).translate(.5,.5,0)),t}const uU="aTroikaGlyphBounds",Jm="aTroikaGlyphIndex",fU="aTroikaGlyphColor";class hU extends s_{constructor(){super(),this.detail=1,this.curveRadius=0,this.groups=[{start:0,count:1/0,materialIndex:0},{start:0,count:1/0,materialIndex:1}],this.boundingSphere=new zr,this.boundingBox=new gi}computeBoundingSphere(){}computeBoundingBox(){}set detail(t){if(t!==this._detail){this._detail=t,(typeof t!="number"||t<1)&&(t=1);let n=lU(t);["position","normal","uv"].forEach(i=>{this.attributes[i]=n.attributes[i].clone()}),this.setIndex(n.getIndex().clone())}}get detail(){return this._detail}set curveRadius(t){t!==this._curveRadius&&(this._curveRadius=t,this._updateBounds())}get curveRadius(){return this._curveRadius}updateGlyphs(t,n,i,r,s){this.updateAttributeData(uU,t,4),this.updateAttributeData(Jm,n,1),this.updateAttributeData(fU,s,3),this._blockBounds=i,this._chunkedBounds=r,this.instanceCount=n.length,this._updateBounds()}_updateBounds(){const t=this._blockBounds;if(t){const{curveRadius:n,boundingBox:i}=this;if(n){const{PI:r,floor:s,min:o,max:a,sin:c,cos:l}=Math,u=r/2,f=r*2,h=Math.abs(n),d=t[0]/h,m=t[2]/h,_=s((d+u)/f)!==s((m+u)/f)?-h:o(c(d)*h,c(m)*h),g=s((d-u)/f)!==s((m-u)/f)?h:a(c(d)*h,c(m)*h),p=s((d+r)/f)!==s((m+r)/f)?h*2:a(h-l(d)*h,h-l(m)*h);i.min.set(_,t[1],n<0?-p:0),i.max.set(g,t[3],n<0?0:p)}else i.min.set(t[0],t[1],0),i.max.set(t[2],t[3],0);i.getBoundingSphere(this.boundingSphere)}}applyClipRect(t){let n=this.getAttribute(Jm).count,i=this._chunkedBounds;if(i)for(let r=i.length;r--;){n=i[r].end;let s=i[r].rect;if(s[1]<t.w&&s[3]>t.y&&s[0]<t.z&&s[2]>t.x)break}this.instanceCount=n}updateAttributeData(t,n,i){const r=this.getAttribute(t);n?r&&r.array.length===n.length?(r.array.set(n),r.needsUpdate=!0):(this.setAttribute(t,new Gf(n,i)),delete this._maxInstanceCount,this.dispose()):r&&this.deleteAttribute(t)}}const dU=`
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform vec4 uTroikaTotalBounds;
uniform vec4 uTroikaClipRect;
uniform mat3 uTroikaOrient;
uniform bool uTroikaUseGlyphColors;
uniform float uTroikaEdgeOffset;
uniform float uTroikaBlurRadius;
uniform vec2 uTroikaPositionOffset;
uniform float uTroikaCurveRadius;
attribute vec4 aTroikaGlyphBounds;
attribute float aTroikaGlyphIndex;
attribute vec3 aTroikaGlyphColor;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec3 vTroikaGlyphColor;
varying vec2 vTroikaGlyphDimensions;
`,pU=`
vec4 bounds = aTroikaGlyphBounds;
bounds.xz += uTroikaPositionOffset.x;
bounds.yw -= uTroikaPositionOffset.y;

vec4 outlineBounds = vec4(
  bounds.xy - uTroikaEdgeOffset - uTroikaBlurRadius,
  bounds.zw + uTroikaEdgeOffset + uTroikaBlurRadius
);
vec4 clippedBounds = vec4(
  clamp(outlineBounds.xy, uTroikaClipRect.xy, uTroikaClipRect.zw),
  clamp(outlineBounds.zw, uTroikaClipRect.xy, uTroikaClipRect.zw)
);

vec2 clippedXY = (mix(clippedBounds.xy, clippedBounds.zw, position.xy) - bounds.xy) / (bounds.zw - bounds.xy);

position.xy = mix(bounds.xy, bounds.zw, clippedXY);

uv = (position.xy - uTroikaTotalBounds.xy) / (uTroikaTotalBounds.zw - uTroikaTotalBounds.xy);

float rad = uTroikaCurveRadius;
if (rad != 0.0) {
  float angle = position.x / rad;
  position.xz = vec2(sin(angle) * rad, rad - cos(angle) * rad);
  normal.xz = vec2(sin(angle), cos(angle));
}
  
position = uTroikaOrient * position;
normal = uTroikaOrient * normal;

vTroikaGlyphUV = clippedXY.xy;
vTroikaGlyphDimensions = vec2(bounds[2] - bounds[0], bounds[3] - bounds[1]);


float txCols = uTroikaSDFTextureSize.x / uTroikaSDFGlyphSize;
vec2 txUvPerSquare = uTroikaSDFGlyphSize / uTroikaSDFTextureSize;
vec2 txStartUV = txUvPerSquare * vec2(
  mod(floor(aTroikaGlyphIndex / 4.0), txCols),
  floor(floor(aTroikaGlyphIndex / 4.0) / txCols)
);
vTroikaTextureUVBounds = vec4(txStartUV, vec2(txStartUV) + txUvPerSquare);
vTroikaTextureChannel = mod(aTroikaGlyphIndex, 4.0);
`,mU=`
uniform sampler2D uTroikaSDFTexture;
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform float uTroikaSDFExponent;
uniform float uTroikaEdgeOffset;
uniform float uTroikaFillOpacity;
uniform float uTroikaBlurRadius;
uniform vec3 uTroikaStrokeColor;
uniform float uTroikaStrokeWidth;
uniform float uTroikaStrokeOpacity;
uniform bool uTroikaSDFDebug;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec2 vTroikaGlyphDimensions;

float troikaSdfValueToSignedDistance(float alpha) {
  // Inverse of exponential encoding in webgl-sdf-generator
  
  float maxDimension = max(vTroikaGlyphDimensions.x, vTroikaGlyphDimensions.y);
  float absDist = (1.0 - pow(2.0 * (alpha > 0.5 ? 1.0 - alpha : alpha), 1.0 / uTroikaSDFExponent)) * maxDimension;
  float signedDist = absDist * (alpha > 0.5 ? -1.0 : 1.0);
  return signedDist;
}

float troikaGlyphUvToSdfValue(vec2 glyphUV) {
  vec2 textureUV = mix(vTroikaTextureUVBounds.xy, vTroikaTextureUVBounds.zw, glyphUV);
  vec4 rgba = texture2D(uTroikaSDFTexture, textureUV);
  float ch = floor(vTroikaTextureChannel + 0.5); //NOTE: can't use round() in WebGL1
  return ch == 0.0 ? rgba.r : ch == 1.0 ? rgba.g : ch == 2.0 ? rgba.b : rgba.a;
}

float troikaGlyphUvToDistance(vec2 uv) {
  return troikaSdfValueToSignedDistance(troikaGlyphUvToSdfValue(uv));
}

float troikaGetAADist() {
  
  #if defined(GL_OES_standard_derivatives) || __VERSION__ >= 300
  return length(fwidth(vTroikaGlyphUV * vTroikaGlyphDimensions)) * 0.5;
  #else
  return vTroikaGlyphDimensions.x / 64.0;
  #endif
}

float troikaGetFragDistValue() {
  vec2 clampedGlyphUV = clamp(vTroikaGlyphUV, 0.5 / uTroikaSDFGlyphSize, 1.0 - 0.5 / uTroikaSDFGlyphSize);
  float distance = troikaGlyphUvToDistance(clampedGlyphUV);
 
  // Extrapolate distance when outside bounds:
  distance += clampedGlyphUV == vTroikaGlyphUV ? 0.0 : 
    length((vTroikaGlyphUV - clampedGlyphUV) * vTroikaGlyphDimensions);

  

  return distance;
}

float troikaGetEdgeAlpha(float distance, float distanceOffset, float aaDist) {
  #if defined(IS_DEPTH_MATERIAL) || defined(IS_DISTANCE_MATERIAL)
  float alpha = step(-distanceOffset, -distance);
  #else

  float alpha = smoothstep(
    distanceOffset + aaDist,
    distanceOffset - aaDist,
    distance
  );
  #endif

  return alpha;
}
`,gU=`
float aaDist = troikaGetAADist();
float fragDistance = troikaGetFragDistValue();
float edgeAlpha = uTroikaSDFDebug ?
  troikaGlyphUvToSdfValue(vTroikaGlyphUV) :
  troikaGetEdgeAlpha(fragDistance, uTroikaEdgeOffset, max(aaDist, uTroikaBlurRadius));

#if !defined(IS_DEPTH_MATERIAL) && !defined(IS_DISTANCE_MATERIAL)
vec4 fillRGBA = gl_FragColor;
fillRGBA.a *= uTroikaFillOpacity;
vec4 strokeRGBA = uTroikaStrokeWidth == 0.0 ? fillRGBA : vec4(uTroikaStrokeColor, uTroikaStrokeOpacity);
if (fillRGBA.a == 0.0) fillRGBA.rgb = strokeRGBA.rgb;
gl_FragColor = mix(fillRGBA, strokeRGBA, smoothstep(
  -uTroikaStrokeWidth - aaDist,
  -uTroikaStrokeWidth + aaDist,
  fragDistance
));
gl_FragColor.a *= edgeAlpha;
#endif

if (edgeAlpha == 0.0) {
  discard;
}
`;function _U(e){const t=mh(e,{chained:!0,extensions:{derivatives:!0},uniforms:{uTroikaSDFTexture:{value:null},uTroikaSDFTextureSize:{value:new oe},uTroikaSDFGlyphSize:{value:0},uTroikaSDFExponent:{value:0},uTroikaTotalBounds:{value:new Se(0,0,0,0)},uTroikaClipRect:{value:new Se(0,0,0,0)},uTroikaEdgeOffset:{value:0},uTroikaFillOpacity:{value:1},uTroikaPositionOffset:{value:new oe},uTroikaCurveRadius:{value:0},uTroikaBlurRadius:{value:0},uTroikaStrokeWidth:{value:0},uTroikaStrokeColor:{value:new ie},uTroikaStrokeOpacity:{value:1},uTroikaOrient:{value:new Jt},uTroikaUseGlyphColors:{value:!0},uTroikaSDFDebug:{value:!1}},vertexDefs:dU,vertexTransform:pU,fragmentDefs:mU,fragmentColorTransform:gU,customRewriter({vertexShader:n,fragmentShader:i}){let r=/\buniform\s+vec3\s+diffuse\b/;return r.test(i)&&(i=i.replace(r,"varying vec3 vTroikaGlyphColor").replace(/\bdiffuse\b/g,"vTroikaGlyphColor"),r.test(n)||(n=n.replace(u0,`uniform vec3 diffuse;
$&
vTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;
`))),{vertexShader:n,fragmentShader:i}}});return t.transparent=!0,t.forceSinglePass=!0,Object.defineProperties(t,{isTroikaTextMaterial:{value:!0},shadowSide:{get(){return this.side},set(){}}}),t}const dd=new Ml({color:16777215,side:Li,transparent:!0}),Qm=8421504,tg=new le,Uc=new j,Vu=new j,Qo=[],vU=new j,Hu="+x+y";function eg(e){return Array.isArray(e)?e[0]:e}let m0=()=>{const e=new An(new Es(1,1),dd);return m0=()=>e,e},g0=()=>{const e=new An(new Es(1,1,32,1),dd);return g0=()=>e,e};const yU={type:"syncstart"},xU={type:"synccomplete"},_0=["font","fontSize","fontStyle","fontWeight","lang","letterSpacing","lineHeight","maxWidth","overflowWrap","text","direction","textAlign","textIndent","whiteSpace","anchorX","anchorY","colorRanges","sdfGlyphSize"],SU=_0.concat("material","color","depthOffset","clipRect","curveRadius","orientation","glyphGeometryDetail");class v0 extends An{constructor(){const t=new hU;super(t,null),this.text="",this.anchorX=0,this.anchorY=0,this.curveRadius=0,this.direction="auto",this.font=null,this.unicodeFontsURL=null,this.fontSize=.1,this.fontWeight="normal",this.fontStyle="normal",this.lang=null,this.letterSpacing=0,this.lineHeight="normal",this.maxWidth=1/0,this.overflowWrap="normal",this.textAlign="left",this.textIndent=0,this.whiteSpace="normal",this.material=null,this.color=null,this.colorRanges=null,this.outlineWidth=0,this.outlineColor=0,this.outlineOpacity=1,this.outlineBlur=0,this.outlineOffsetX=0,this.outlineOffsetY=0,this.strokeWidth=0,this.strokeColor=Qm,this.strokeOpacity=1,this.fillOpacity=1,this.depthOffset=0,this.clipRect=null,this.orientation=Hu,this.glyphGeometryDetail=1,this.sdfGlyphSize=null,this.gpuAccelerateSDF=!0,this.debugSDF=!1}sync(t){this._needsSync&&(this._needsSync=!1,this._isSyncing?(this._queuedSyncs||(this._queuedSyncs=[])).push(t):(this._isSyncing=!0,this.dispatchEvent(yU),rU({text:this.text,font:this.font,lang:this.lang,fontSize:this.fontSize||.1,fontWeight:this.fontWeight||"normal",fontStyle:this.fontStyle||"normal",letterSpacing:this.letterSpacing||0,lineHeight:this.lineHeight||"normal",maxWidth:this.maxWidth,direction:this.direction||"auto",textAlign:this.textAlign,textIndent:this.textIndent,whiteSpace:this.whiteSpace,overflowWrap:this.overflowWrap,anchorX:this.anchorX,anchorY:this.anchorY,colorRanges:this.colorRanges,includeCaretPositions:!0,sdfGlyphSize:this.sdfGlyphSize,gpuAccelerateSDF:this.gpuAccelerateSDF,unicodeFontsURL:this.unicodeFontsURL},n=>{this._isSyncing=!1,this._textRenderInfo=n,this.geometry.updateGlyphs(n.glyphBounds,n.glyphAtlasIndices,n.blockBounds,n.chunkedBounds,n.glyphColors);const i=this._queuedSyncs;i&&(this._queuedSyncs=null,this._needsSync=!0,this.sync(()=>{i.forEach(r=>r&&r())})),this.dispatchEvent(xU),t&&t()})))}onBeforeRender(t,n,i,r,s,o){this.sync(),s.isTroikaTextMaterial&&this._prepareForRender(s)}dispose(){this.geometry.dispose()}get textRenderInfo(){return this._textRenderInfo||null}createDerivedMaterial(t){return _U(t)}get material(){let t=this._derivedMaterial;const n=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=dd.clone());if((!t||!t.isDerivedFrom(n))&&(t=this._derivedMaterial=this.createDerivedMaterial(n),n.addEventListener("dispose",function i(){n.removeEventListener("dispose",i),t.dispose()})),this.hasOutline()){let i=t._outlineMtl;return i||(i=t._outlineMtl=Object.create(t,{id:{value:t.id+.1}}),i.isTextOutlineMaterial=!0,i.depthWrite=!1,i.map=null,t.addEventListener("dispose",function r(){t.removeEventListener("dispose",r),i.dispose()})),[i,t]}else return t}set material(t){t&&t.isTroikaTextMaterial?(this._derivedMaterial=t,this._baseMaterial=t.baseMaterial):this._baseMaterial=t}hasOutline(){return!!(this.outlineWidth||this.outlineBlur||this.outlineOffsetX||this.outlineOffsetY)}get glyphGeometryDetail(){return this.geometry.detail}set glyphGeometryDetail(t){this.geometry.detail=t}get curveRadius(){return this.geometry.curveRadius}set curveRadius(t){this.geometry.curveRadius=t}get customDepthMaterial(){return eg(this.material).getDepthMaterial()}set customDepthMaterial(t){}get customDistanceMaterial(){return eg(this.material).getDistanceMaterial()}set customDistanceMaterial(t){}_prepareForRender(t){const n=t.isTextOutlineMaterial,i=t.uniforms,r=this.textRenderInfo;if(r){const{sdfTexture:a,blockBounds:c}=r;i.uTroikaSDFTexture.value=a,i.uTroikaSDFTextureSize.value.set(a.image.width,a.image.height),i.uTroikaSDFGlyphSize.value=r.sdfGlyphSize,i.uTroikaSDFExponent.value=r.sdfExponent,i.uTroikaTotalBounds.value.fromArray(c),i.uTroikaUseGlyphColors.value=!n&&!!r.glyphColors;let l=0,u=0,f=0,h,d,m,_=0,g=0;if(n){let{outlineWidth:y,outlineOffsetX:x,outlineOffsetY:v,outlineBlur:T,outlineOpacity:b}=this;l=this._parsePercent(y)||0,u=Math.max(0,this._parsePercent(T)||0),h=b,_=this._parsePercent(x)||0,g=this._parsePercent(v)||0}else f=Math.max(0,this._parsePercent(this.strokeWidth)||0),f&&(m=this.strokeColor,i.uTroikaStrokeColor.value.set(m??Qm),d=this.strokeOpacity,d==null&&(d=1)),h=this.fillOpacity;i.uTroikaEdgeOffset.value=l,i.uTroikaPositionOffset.value.set(_,g),i.uTroikaBlurRadius.value=u,i.uTroikaStrokeWidth.value=f,i.uTroikaStrokeOpacity.value=d,i.uTroikaFillOpacity.value=h??1,i.uTroikaCurveRadius.value=this.curveRadius||0;let p=this.clipRect;if(p&&Array.isArray(p)&&p.length===4)i.uTroikaClipRect.value.fromArray(p);else{const y=(this.fontSize||.1)*100;i.uTroikaClipRect.value.set(c[0]-y,c[1]-y,c[2]+y,c[3]+y)}this.geometry.applyClipRect(i.uTroikaClipRect.value)}i.uTroikaSDFDebug.value=!!this.debugSDF,t.polygonOffset=!!this.depthOffset,t.polygonOffsetFactor=t.polygonOffsetUnits=this.depthOffset||0;const s=n?this.outlineColor||0:this.color;if(s==null)delete t.color;else{const a=t.hasOwnProperty("color")?t.color:t.color=new ie;(s!==a._input||typeof s=="object")&&a.set(a._input=s)}let o=this.orientation||Hu;if(o!==t._orientation){let a=i.uTroikaOrient.value;o=o.replace(/[^-+xyz]/g,"");let c=o!==Hu&&o.match(/^([-+])([xyz])([-+])([xyz])$/);if(c){let[,l,u,f,h]=c;Uc.set(0,0,0)[u]=l==="-"?1:-1,Vu.set(0,0,0)[h]=f==="-"?-1:1,tg.lookAt(vU,Uc.cross(Vu),Vu),a.setFromMatrix4(tg)}else a.identity();t._orientation=o}}_parsePercent(t){if(typeof t=="string"){let n=t.match(/^(-?[\d.]+)%$/),i=n?parseFloat(n[1]):NaN;t=(isNaN(i)?0:i/100)*this.fontSize}return t}localPositionToTextCoords(t,n=new oe){n.copy(t);const i=this.curveRadius;return i&&(n.x=Math.atan2(t.x,Math.abs(i)-Math.abs(t.z))*Math.abs(i)),n}worldPositionToTextCoords(t,n=new oe){return Uc.copy(t),this.localPositionToTextCoords(this.worldToLocal(Uc),n)}raycast(t,n){const{textRenderInfo:i,curveRadius:r}=this;if(i){const s=i.blockBounds,o=r?g0():m0(),a=o.geometry,{position:c,uv:l}=a.attributes;for(let u=0;u<l.count;u++){let f=s[0]+l.getX(u)*(s[2]-s[0]);const h=s[1]+l.getY(u)*(s[3]-s[1]);let d=0;r&&(d=r-Math.cos(f/r)*r,f=Math.sin(f/r)*r),c.setXYZ(u,f,h,d)}a.boundingSphere=this.geometry.boundingSphere,a.boundingBox=this.geometry.boundingBox,o.matrixWorld=this.matrixWorld,o.material.side=this.material.side,Qo.length=0,o.raycast(t,Qo);for(let u=0;u<Qo.length;u++)Qo[u].object=this,n.push(Qo[u])}}copy(t){const n=this.geometry;return super.copy(t),this.geometry=n,SU.forEach(i=>{this[i]=t[i]}),this}clone(){return new this.constructor().copy(this)}}_0.forEach(e=>{const t="_private_"+e;Object.defineProperty(v0.prototype,e,{get(){return this[t]},set(n){n!==this[t]&&(this[t]=n,this._needsSync=!0)}})});new gi;new ie;const ng=new WeakMap;function Lo(e){let t=ng.get(e);return t||(t={textMeshes:new Map,textContent:new Map,defaultFont:null,measureFn:null},ng.set(e,t)),t}function MU(e,t){const n=Lo(e),i=n.textContent.get(t)||"",r=ge.fontSize[t];if(n.measureFn)return n.measureFn(i,r);const s=n.textMeshes.get(t);if(s?.textRenderInfo){const[o,,a]=s.textRenderInfo.blockBounds;return a-o}return 0}function bU(e,t,n){Lo(e).textContent.set(t,n),ge.dirty[t]=1}function EU(e,t){return Lo(e).textContent.get(t)||""}function wU(e,t){const n=Lo(e);n.defaultFont=t}function aD(e,t,n){const i=Lo(e),r=i.textMeshes.get(t);if(!r){if(i.measureFn){const o=i.textContent.get(t)||"",a=ge.fontSize[t],c=i.measureFn(o,a),l=a;n({width:c,height:l,blockBounds:[0,0,c,l],visibleBounds:[0,0,c,l]})}return}const s=()=>{const o=r.textRenderInfo;if(o){const[a,c,l,u]=o.blockBounds;n({width:l-a,height:u-c,blockBounds:o.blockBounds,visibleBounds:o.visibleBounds})}};r.textRenderInfo?s():r.sync(s)}function TU(e,t,n,i){const r=e.reduce((a,c)=>a+c,0)+(e.length-1)*t;let s=0;for(let a=0;a<i;a++)s+=e[a]+t;s+=e[i]/2;let o;switch(n){case Zc.Left:o=0;break;case Zc.Right:o=-r;break;case Zc.Center:default:o=-r/2;break}return o+s}const AU=["left","center","right"],CU=["top","middle","bottom"],RU=ee([ge,Et]),PU={group:"draw",update(e){if(e.headless)return;const t=Ul(e);if(!t)return;const n=Lo(e),i=RU(e.world);for(const r of i){let s=n.textMeshes.get(r);if(s||(s=new v0,n.defaultFont&&(s.font=n.defaultFont),t.add(s),n.textMeshes.set(r,s),ge.dirty[r]=1),s.position.set(Et.posX[r],Et.posY[r],Et.posZ[r]),s.quaternion.set(Et.rotX[r],Et.rotY[r],Et.rotZ[r],Et.rotW[r]),s.scale.set(Et.scaleX[r],Et.scaleY[r],Et.scaleZ[r]),ge.dirty[r]===1){s.text=EU(e,r),s.fontSize=ge.fontSize[r],s.color=ge.color[r],s.letterSpacing=ge.letterSpacing[r],s.lineHeight=ge.lineHeight[r]||1.2;const o=e.hasComponent(r,Rr)?Rr.entity[r]:0,a=o&&e.hasComponent(o,Cr);s.anchorX=a&&AU[Cr.anchorX[o]]||"center",s.anchorY=a&&CU[Cr.anchorY[o]]||"middle",s.outlineWidth=ge.outlineWidth[r],s.outlineColor=ge.outlineColor[r],s.outlineBlur=ge.outlineBlur[r],s.outlineOffsetX=ge.outlineOffsetX[r],s.outlineOffsetY=ge.outlineOffsetY[r],s.outlineOpacity=ge.outlineOpacity[r],s.strokeWidth=ge.strokeWidth[r],s.strokeColor=ge.strokeColor[r],s.strokeOpacity=ge.strokeOpacity[r],s.fillOpacity=ge.fillOpacity[r],s.curveRadius=ge.curveRadius[r],s.sync(),ge.dirty[r]=0}}for(const[r,s]of n.textMeshes)(!e.exists(r)||!e.hasComponent(r,ge))&&(t.remove(s),s.dispose(),n.textMeshes.delete(r),n.textContent.delete(r))}},UU=ee([ge]),DU={group:"draw",update(e){const t=UU(e.world);for(const n of t){if(ge.dirty[n]===0&&ge.width[n]>0)continue;const i=MU(e,n);i>0&&(ge.width[n]=i,ge.dirty[n]=0)}}},IU=ee([ge,Rr,Ze]),LU={group:"simulation",update(e){const t=IU(e.world),n=e.time.deltaTime,i=new Map;for(const r of t){const s=Rr.entity[r];if(!e.hasComponent(s,Cr))continue;i.has(s)||i.set(s,{widths:[],entities:[]});const o=i.get(s);o.widths.push(ge.width[r]),o.entities.push(r)}for(const[r,s]of i){if(s.widths.some(u=>u===0||u===void 0))continue;const o=Cr.gap[r],a=Cr.align[r],c=Cr.damping[r],l=c<=0?1:1-Math.exp(-c*n);for(let u=0;u<s.entities.length;u++){const f=s.entities[u],h=TU(s.widths,o,a,u);Ze.posX[f]+=(h-Ze.posX[f])*l}}}},FU={recipes:[wP,TP],systems:[PU,DU,LU],components:{Paragraph:Cr,Word:ge},config:{adapters:{word:{text:(e,t,n)=>bU(n,e,t)}},defaults:{paragraph:{gap:.2,align:1,anchorX:1,anchorY:1,damping:0},word:{fontSize:1,color:16777215,letterSpacing:0,lineHeight:1.2,outlineWidth:0,outlineColor:0,outlineBlur:0,outlineOffsetX:0,outlineOffsetY:0,outlineOpacity:1,strokeWidth:0,strokeColor:0,strokeOpacity:1,fillOpacity:1,curveRadius:0,width:0,dirty:1}},enums:{paragraph:{align:{left:0,center:1,right:2},anchorX:{left:0,center:1,right:2},anchorY:{top:0,middle:1,bottom:2}}}}},hn=re({offsetX:L.f32,offsetY:L.f32,offsetZ:L.f32,color:L.ui32,thickness:L.f32,opacity:L.f32,visible:L.ui8,arrowStart:L.ui8,arrowEnd:L.ui8,arrowSize:L.f32}),ig=new gi,Dc=new j;class y0 extends s_{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],n=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new ti(t,3)),this.setAttribute("uv",new ti(n,2))}applyMatrix4(t){const n=this.attributes.instanceStart,i=this.attributes.instanceEnd;return n!==void 0&&(n.applyMatrix4(t),i.applyMatrix4(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let n;t instanceof Float32Array?n=t:Array.isArray(t)&&(n=new Float32Array(t));const i=new Vf(n,6,1);return this.setAttribute("instanceStart",new br(i,3,0)),this.setAttribute("instanceEnd",new br(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let n;t instanceof Float32Array?n=t:Array.isArray(t)&&(n=new Float32Array(t));const i=new Vf(n,6,1);return this.setAttribute("instanceColorStart",new br(i,3,0)),this.setAttribute("instanceColorEnd",new br(i,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new UE(t.geometry)),this}fromLineSegments(t){const n=t.geometry;return this.setPositions(n.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new gi);const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;t!==void 0&&n!==void 0&&(this.boundingBox.setFromBufferAttribute(t),ig.setFromBufferAttribute(n),this.boundingBox.union(ig))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zr),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;if(t!==void 0&&n!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)Dc.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(Dc)),Dc.fromBufferAttribute(n,s),r=Math.max(r,i.distanceToSquared(Dc));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}}Dt.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new oe(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Nn.line={uniforms:bl.merge([Dt.common,Dt.fog,Dt.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class x0 extends or{static get type(){return"LineMaterial"}constructor(t){super({uniforms:bl.clone(Nn.line.uniforms),vertexShader:Nn.line.vertexShader,fragmentShader:Nn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Wu=new Se,rg=new j,sg=new j,ln=new Se,un=new Se,Ui=new Se,$u=new j,Xu=new le,dn=new NE,og=new j,Ic=new gi,Lc=new zr,Di=new Se;let Ni,gs;function ag(e,t,n){return Di.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),Di.multiplyScalar(1/Di.w),Di.x=gs/n.width,Di.y=gs/n.height,Di.applyMatrix4(e.projectionMatrixInverse),Di.multiplyScalar(1/Di.w),Math.abs(Math.max(Di.x,Di.y))}function NU(e,t){const n=e.matrixWorld,i=e.geometry,r=i.attributes.instanceStart,s=i.attributes.instanceEnd,o=Math.min(i.instanceCount,r.count);for(let a=0,c=o;a<c;a++){dn.start.fromBufferAttribute(r,a),dn.end.fromBufferAttribute(s,a),dn.applyMatrix4(n);const l=new j,u=new j;Ni.distanceSqToSegment(dn.start,dn.end,u,l),u.distanceTo(l)<gs*.5&&t.push({point:u,pointOnLine:l,distance:Ni.origin.distanceTo(u),object:e,face:null,faceIndex:a,uv:null,uv1:null})}}function OU(e,t,n){const i=t.projectionMatrix,s=e.material.resolution,o=e.matrixWorld,a=e.geometry,c=a.attributes.instanceStart,l=a.attributes.instanceEnd,u=Math.min(a.instanceCount,c.count),f=-t.near;Ni.at(1,Ui),Ui.w=1,Ui.applyMatrix4(t.matrixWorldInverse),Ui.applyMatrix4(i),Ui.multiplyScalar(1/Ui.w),Ui.x*=s.x/2,Ui.y*=s.y/2,Ui.z=0,$u.copy(Ui),Xu.multiplyMatrices(t.matrixWorldInverse,o);for(let h=0,d=u;h<d;h++){if(ln.fromBufferAttribute(c,h),un.fromBufferAttribute(l,h),ln.w=1,un.w=1,ln.applyMatrix4(Xu),un.applyMatrix4(Xu),ln.z>f&&un.z>f)continue;if(ln.z>f){const x=ln.z-un.z,v=(ln.z-f)/x;ln.lerp(un,v)}else if(un.z>f){const x=un.z-ln.z,v=(un.z-f)/x;un.lerp(ln,v)}ln.applyMatrix4(i),un.applyMatrix4(i),ln.multiplyScalar(1/ln.w),un.multiplyScalar(1/un.w),ln.x*=s.x/2,ln.y*=s.y/2,un.x*=s.x/2,un.y*=s.y/2,dn.start.copy(ln),dn.start.z=0,dn.end.copy(un),dn.end.z=0;const _=dn.closestPointToPointParameter($u,!0);dn.at(_,og);const g=px.lerp(ln.z,un.z,_),p=g>=-1&&g<=1,y=$u.distanceTo(og)<gs*.5;if(p&&y){dn.start.fromBufferAttribute(c,h),dn.end.fromBufferAttribute(l,h),dn.start.applyMatrix4(o),dn.end.applyMatrix4(o);const x=new j,v=new j;Ni.distanceSqToSegment(dn.start,dn.end,v,x),n.push({point:v,pointOnLine:x,distance:Ni.origin.distanceTo(v),object:e,face:null,faceIndex:h,uv:null,uv1:null})}}}class kU extends An{constructor(t=new y0,n=new x0({color:Math.random()*16777215})){super(t,n),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,n=t.attributes.instanceStart,i=t.attributes.instanceEnd,r=new Float32Array(2*n.count);for(let o=0,a=0,c=n.count;o<c;o++,a+=2)rg.fromBufferAttribute(n,o),sg.fromBufferAttribute(i,o),r[a]=a===0?0:r[a-1],r[a+1]=r[a]+rg.distanceTo(sg);const s=new Vf(r,2,1);return t.setAttribute("instanceDistanceStart",new br(s,1,0)),t.setAttribute("instanceDistanceEnd",new br(s,1,1)),this}raycast(t,n){const i=this.material.worldUnits,r=t.camera;r===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=t.params.Line2!==void 0&&t.params.Line2.threshold||0;Ni=t.ray;const o=this.matrixWorld,a=this.geometry,c=this.material;gs=c.linewidth+s,a.boundingSphere===null&&a.computeBoundingSphere(),Lc.copy(a.boundingSphere).applyMatrix4(o);let l;if(i)l=gs*.5;else{const f=Math.max(r.near,Lc.distanceToPoint(Ni.origin));l=ag(r,f,c.resolution)}if(Lc.radius+=l,Ni.intersectsSphere(Lc)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Ic.copy(a.boundingBox).applyMatrix4(o);let u;if(i)u=gs*.5;else{const f=Math.max(r.near,Ic.distanceToPoint(Ni.origin));u=ag(r,f,c.resolution)}Ic.expandByScalar(u),Ni.intersectsBox(Ic)!==!1&&(i?NU(this,n):OU(this,r,n))}onBeforeRender(t){const n=this.material.uniforms;n&&n.resolution&&(t.getViewport(Wu),this.material.uniforms.resolution.value.set(Wu.z,Wu.w))}}const cg=new WeakMap;function zU(e){let t=cg.get(e);return t||(t={batches:new Map,resolution:new oe(1024,768)},cg.set(e,t)),t}function BU(e,t){return`${e}-${t}`}function GU(e,t,n,i,r){let s=e.batches.get(t);if(!s){const o=new y0,a=new x0({vertexColors:!0,worldUnits:!1,linewidth:n,opacity:i,transparent:i<1,resolution:e.resolution}),c=new kU(o,a);c.frustumCulled=!1,r.add(c),s={segments:c,geometry:o,material:a},e.batches.set(t,s)}return s}function VU(e,t){t.remove(e.segments),e.geometry.dispose(),e.material.dispose()}const HU=ee([hn,Et]),lg=Math.PI/6;function ug(e,t,n,i,r){const s=new j().subVectors(t,e).normalize(),o=i?e.clone():t.clone(),a=i?s:s.clone().negate(),c=new j;Math.abs(s.y)<.9?c.crossVectors(s,new j(0,1,0)).normalize():c.crossVectors(s,new j(1,0,0)).normalize();const l=r===0?lg:-lg,u=a.clone().applyAxisAngle(c,l).multiplyScalar(n),f=o.clone().add(u);return{tip:o,wingEnd:f}}function Yu(e,t,n,i,r){e.push(n.x,n.y,n.z,i.x,i.y,i.z),t.push(r.r,r.g,r.b,r.r,r.g,r.b)}function WU(e){const t=[],n=[];for(const i of e){if(!i.visible||!Number.isFinite(i.startPos.x)||!Number.isFinite(i.endPos.x))continue;const r=i.endPos.x-i.startPos.x,s=i.endPos.y-i.startPos.y,o=i.endPos.z-i.startPos.z;if(r*r+s*s+o*o>1e-10){if(Yu(t,n,i.startPos,i.endPos,i.color),i.arrowStart&&i.arrowSize>0)for(let a=0;a<2;a++){const{tip:c,wingEnd:l}=ug(i.startPos,i.endPos,i.arrowSize,!0,a);Yu(t,n,c,l,i.color)}if(i.arrowEnd&&i.arrowSize>0)for(let a=0;a<2;a++){const{tip:c,wingEnd:l}=ug(i.startPos,i.endPos,i.arrowSize,!1,a);Yu(t,n,c,l,i.color)}}}return{positions:t,colors:n}}const $U={group:"draw",update(e){const t=Ul(e);if(!t)return;const n=Dr(e),i=zU(e),r=HU(e.world);if(n?.renderer){i.resolution.set(n.renderer.domElement.width,n.renderer.domElement.height);for(const a of i.batches.values())a.material.resolution.copy(i.resolution)}const s=new Map;for(const a of r){const c=hn.thickness[a],l=hn.opacity[a],u=BU(c,l),f=new j(Et.posX[a],Et.posY[a],Et.posZ[a]),h=new j(hn.offsetX[a]*Et.scaleX[a],hn.offsetY[a]*Et.scaleY[a],hn.offsetZ[a]*Et.scaleZ[a]),d=new j(f.x+h.x,f.y+h.y,f.z+h.z),m=Math.sqrt(hn.offsetX[a]**2+hn.offsetY[a]**2+hn.offsetZ[a]**2),_=h.length(),g=m>0?_/m:1,p={entity:a,startPos:f,endPos:d,color:new ie(hn.color[a]),arrowStart:hn.arrowStart[a]===1,arrowEnd:hn.arrowEnd[a]===1,arrowSize:hn.arrowSize[a]*g,visible:hn.visible[a]===1};let y=s.get(u);y||(y=[],s.set(u,y)),y.push(p)}const o=new Set;for(const[a,c]of s){o.add(a);const l=hn.thickness[c[0].entity],u=hn.opacity[c[0].entity],f=GU(i,a,l,u,t),{positions:h,colors:d}=WU(c);h.length>0?(delete f.geometry._maxInstanceCount,f.geometry.setPositions(h),f.geometry.setColors(d),f.segments.computeLineDistances(),f.segments.visible=!0):f.segments.visible=!1}for(const[a,c]of i.batches)o.has(a)||(VU(c,t),i.batches.delete(a))}},XU={systems:[$U],components:{Line:hn},config:{defaults:{line:{offsetX:1,offsetY:0,offsetZ:0,color:16777215,thickness:2,opacity:1,visible:1,arrowStart:0,arrowEnd:0,arrowSize:.2}}}},YU={background:16777215,backgroundSecondary:16448250,backgroundRaised:16777215,foreground:2631722,textSecondary:7631988,textTertiary:11053224,textKnockout:16777215,grey000:16777215,grey100:15921906,grey200:15461355,grey300:15132390,grey400:15461355,grey500:13224393,grey600:11053224,grey700:9408399,grey800:8224125,grey900:7631988,grey1000:2631722,grey1100:855309,teal100:14614523,teal200:14548726,teal300:13433329,teal400:11663340,teal500:8580571,teal600:58308,teal700:43413,teal800:36990,teal900:32111,teal1000:16180,blue100:15857151,blue200:15791359,blue300:15068671,blue400:14082815,blue500:11716863,blue600:9086975,blue700:4288505,blue800:2184168,blue900:2579185,blue1000:729446,purple100:16445695,purple200:16380159,purple300:16181503,purple400:15915519,purple500:14657535,purple600:13203967,purple700:10486008,purple800:8716497,purple900:8192204,purple1000:3080270,pink100:16771318,pink200:16771315,pink300:16769003,pink400:16765921,pink500:16626636,pink600:16350887,pink700:15869826,pink800:14946414,pink900:12850530,pink1000:4588835,red100:16772847,red200:16771306,red300:16770020,red400:16766679,red500:16757171,red600:15692145,red700:15151679,red800:14033451,red900:12984616,red1000:4653068,yellow100:16774878,yellow200:16774351,yellow300:16773569,yellow400:16768115,yellow500:16762179,yellow600:16756480,yellow700:16756480,yellow800:16749568,yellow900:11160832,yellow1000:5642496,green100:15531500,green200:15072487,green300:13892305,green400:12187068,green500:8579981,green600:7986798,green700:2664776,green800:2593089,green900:1080626,green1000:14592,teal:32111,blue:2579185,purple:8192204,pink:12850530,red:12984616,yellow:11160832,green:1080626,muted:7631988,positive:1080626,negative:12984616},cD={background:0,backgroundSecondary:0,backgroundRaised:1513498,foreground:15592941,textSecondary:11053224,textTertiary:8026746,textKnockout:16777215,grey000:855309,grey100:1710618,grey200:2039583,grey300:2697513,grey400:3026478,grey500:4539717,grey600:8882055,grey700:9408399,grey800:8026746,grey900:11053224,grey1000:15592941,grey1100:16777215,teal100:8987,teal200:11042,teal300:15668,teal400:16437,teal500:24916,teal600:39814,teal700:43413,teal800:36990,teal900:52149,teal1000:13369333,blue100:530244,blue200:531545,blue300:1387376,blue400:1454206,blue500:2047123,blue600:5082111,blue700:4879863,blue800:2315495,blue900:8429822,blue1000:15791359,purple100:2690099,purple200:3412290,purple300:4659294,purple400:5511798,purple500:6562448,purple600:9715925,purple700:9715925,purple800:8203194,purple900:12874491,purple1000:16510207,pink100:3214622,pink200:4328485,pink300:5705778,pink400:6097972,pink500:7734847,pink600:12189782,pink700:15805314,pink800:15138925,pink900:16731533,pink1000:16771572,red100:3344913,red200:4459795,red300:6098455,red400:7278619,red500:8918303,red600:15937088,red700:15807042,red800:14816810,red900:16733791,red1000:16771565,yellow100:2758400,yellow200:3545344,yellow300:5253120,yellow400:5976064,yellow500:7355904,yellow600:15571456,yellow700:16756480,yellow800:16749568,yellow900:16749568,yellow1000:16774101,green100:9736,green200:12811,green300:14862,green400:17941,green500:26391,green600:38189,green700:44090,green800:37938,green900:51792,green1000:14221284,teal:52149,blue:8429822,purple:12874491,pink:16731533,red:16733791,yellow:16749568,green:51792,muted:11053224,positive:51792,negative:16733791},ZU=""+new URL("ABCDiatype-Regular-DxHX5rH_.otf",import.meta.url).href;async function jU(e){const{canvas:t,worldElement:n,config:i}=e;i.beforeInit?.(n);const r=new cC;r.registerPlugin(nR),r.registerPlugin(eR),r.registerPlugin(uP),r.registerPlugin(bP),r.registerPlugin(EP),r.registerPlugin(FU),r.registerPlugin(XU),wU(r,ZU);const s=i.createPlugin();Array.isArray(s)?s.forEach(u=>r.registerPlugin(u)):r.registerPlugin(s),await r.initializePlugins(),n.style.display="none";const o=r.createEntity();r.addComponent(o,ao),ao.hasCanvas[o]=1;const a=i.theme??YU;ao.clearColor[o]=a.background,TC(o,t);const c=`<world>${n.innerHTML}</world>`,l=fC.parse(c);if(l.root.tagName==="parsererror"){console.error("XML parsing failed for world:",n);return}aC(r,l.root),i.setupUI?.(r,a),r.step(xa.FIXED_TIMESTEP),t.__state__=r,e.state=r}function lD(e){const t=new Map(e.map(l=>[l.canvasId,l])),n=[],i=document.querySelectorAll("world");for(const l of i){const u=l.getAttribute("canvas");if(!u)continue;const f=document.querySelector(u);if(!f)continue;const h=u.replace("#",""),d=t.get(h);d&&n.push({canvas:f,worldElement:l,config:d,isVisible:!1})}const r=new IntersectionObserver(l=>{l.forEach(u=>{const f=n.find(h=>h.canvas===u.target);f&&(f.isVisible=u.isIntersecting,u.isIntersecting&&!f.state&&jU(f))})},{rootMargin:"100px",threshold:.01});n.forEach(l=>r.observe(l.canvas));let s=performance.now(),o=!0;const a=n[0]?.canvas;a&&(a.__stop__=()=>{o=!1});function c(l){if(!o)return;requestAnimationFrame(c);const u=(l-s)/1e3;s=l;for(const f of n)f.state&&f.isVisible&&f.state.step(u)}requestAnimationFrame(c)}const rs=re({step:L.i32,target:L.i32,max:L.i32});function qU(e){let t=0;for(const n of Object.keys(e)){const[i,r]=n.split("-").map(Number);!isNaN(i)&&!isNaN(r)&&(t=Math.max(t,i,r))}return t}function KU(e,t){for(const n of Object.values(t)){const i=e.getEntityByName(n);i!==null&&L3(e,i)}}const fg=ee([rs]);function JU(e){const t=qU(e);return[{group:"setup",update(r){for(const s of fg(r.world))rs.max[s]===0&&(rs.max[s]=t)}},{group:"simulation",update(r){for(const s of fg(r.world)){const o=rs.step[s],a=rs.target[s];if(o!==a){KU(r,e);const c=e[`${o}-${a}`],l=c?r.getEntityByName(c):null;l!==null&&(I3(r,l),U3(r,l)),rs.step[s]=a}}}}]}function uD(e){return{components:{StepController:rs},systems:JU(e),config:{defaults:{"step-controller":{step:0,target:0,max:0}}}}}export{bU as C,cD as D,YU as L,aD as M,rs as S,L as T,lD as a,re as b,uD as c,ee as d,fe as f,hn as i,li as n,Rr as o,Ze as r,Et as s,ge as u,G3 as x};
//# sourceMappingURL=plugin-DQL4gMZR.js.map
