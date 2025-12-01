(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();var ws={ui8:"ui8",ui16:"ui16",i32:"i32",ui32:"ui32",f32:"f32",eid:"eid"},xd={i8:"Int8",ui8:"Uint8",ui8c:"Uint8Clamped",i16:"Int16",ui16:"Uint16",i32:"Int32",ui32:"Uint32",eid:"Uint32",f32:"Float32",f64:"Float64"},Fr={i8:Int8Array,ui8:Uint8Array,ui8c:Uint8ClampedArray,i16:Int16Array,ui16:Uint16Array,i32:Int32Array,ui32:Uint32Array,f32:Float32Array,f64:Float64Array,eid:Uint32Array},yd={uint8:2**8,uint16:2**16},Z_=e=>t=>Math.ceil(t/e)*e,q_=Z_(4),j_=Symbol("storeRef"),Zl=Symbol("storeSize"),K_=Symbol("storeMaps"),$r=Symbol("storeFlattened"),pa=Symbol("storeBase"),J_=Symbol("storeType"),$p=Symbol("storeArrayElementCounts"),Ka=Symbol("storeSubarrays"),Hp=Symbol("subarrayCursors"),Q_=Symbol("subarray"),ql=Symbol("parentArray"),Gp=Symbol("tagStore"),Sd=Symbol("indexType"),Md=Symbol("indexBytes"),Wp=Symbol("isEidType"),bi={},tv=(e,t)=>{if(ArrayBuffer.isView(e))e[t]=e.slice(0);else{const n=e[ql].slice(0);e[t]=e.map((i,r)=>{const{length:s}=e[r],o=s*r,a=o+s;return n.subarray(o,a)})}},Xp=(e,t)=>{e[$r]&&e[$r].forEach(n=>{ArrayBuffer.isView(n)?n[t]=0:n[t].fill(0)})},ev=(e,t)=>{const n=t*Fr[e].BYTES_PER_ELEMENT,i=new ArrayBuffer(n),r=new Fr[e](i);return r[Wp]=e===ws.eid,r},nv=(e,t,n)=>{const i=e[Zl],r=Array(i).fill(0);r[J_]=t,r[Wp]=t===ws.eid;const s=e[Hp],o=n<=yd.uint8?ws.ui8:n<=yd.uint16?ws.ui16:ws.ui32;if(!n)throw new Error("bitECS - Must define component array length");if(!Fr[t])throw new Error(`bitECS - Invalid component array property type ${t}`);if(!e[Ka][t]){const l=e[$p][t],u=new Fr[t](q_(l*i));u[Sd]=xd[o],u[Md]=Fr[o].BYTES_PER_ELEMENT,e[Ka][t]=u}const a=s[t],c=a+i*n;s[t]=c,r[ql]=e[Ka][t].subarray(a,c);for(let l=0;l<i;l++){const u=n*l,f=u+n;r[l]=r[ql].subarray(u,f),r[l][Sd]=xd[o],r[l][Md]=Fr[o].BYTES_PER_ELEMENT,r[l][Q_]=!0}return r},Ed=e=>Array.isArray(e)&&typeof e[0]=="string"&&typeof e[1]=="number",iv=(e,t)=>{const n=Symbol("store");if(!e||!Object.keys(e).length)return bi[n]={[Zl]:t,[Gp]:!0,[pa]:()=>bi[n]},bi[n];e=JSON.parse(JSON.stringify(e));const i={},r=o=>{const a=Object.keys(o);for(const c of a)Ed(o[c])?(i[o[c][0]]||(i[o[c][0]]=0),i[o[c][0]]+=o[c][1]):o[c]instanceof Object&&r(o[c])};r(e);const s={[Zl]:t,[K_]:{},[Ka]:{},[j_]:n,[Hp]:Object.keys(Fr).reduce((o,a)=>({...o,[a]:0}),{}),[$r]:[],[$p]:i};if(e instanceof Object&&Object.keys(e).length){const o=(a,c)=>{if(typeof a[c]=="string")a[c]=ev(a[c],t),a[c][pa]=()=>bi[n],s[$r].push(a[c]);else if(Ed(a[c])){const[l,u]=a[c];a[c]=nv(s,l,u),a[c][pa]=()=>bi[n],s[$r].push(a[c])}else a[c]instanceof Object&&(a[c]=Object.keys(a[c]).reduce(o,a[c]));return a};return bi[n]=Object.assign(Object.keys(e).reduce(o,e),s),bi[n][pa]=()=>bi[n],bi[n]}},So=()=>{const e=[],t=[];e.sort=function(o){const a=Array.prototype.sort.call(this,o);for(let c=0;c<e.length;c++)t[e[c]]=c;return a};const n=o=>e[t[o]]===o;return{add:o=>{n(o)||(t[o]=e.push(o)-1)},remove:o=>{if(!n(o))return;const a=t[o],c=e.pop();c!==o&&(e[a]=c,t[c]=a)},has:n,sparse:t,dense:e,reset:()=>{e.length=0,t.length=0}}},zi=Symbol("entityMasks"),ia=Symbol("entityComponents"),Bi=Symbol("entitySparseSet"),Ao=Symbol("entityArray"),rv=1e5,jl=0,Yp=rv,hf=()=>Yp,Mo=[],sv=.01,ov=sv,av=()=>jl,cv=new Map,lv=e=>{const t=e[vf]?Mo.length?Mo.shift():jl++:Mo.length>Math.round(Yp*ov)?Mo.shift():jl++;if(t>e[_f])throw new Error("bitECS - max entities reached");return e[Bi].add(t),cv.set(t,e),e[pf].forEach(n=>{Dc(e,n,t)&&Lc(n,t)}),e[ia].set(t,new Set),t},Zp=(e,t)=>{if(e[Bi].has(t)){e[Ic].forEach(n=>{mf(e,n,t)}),e[vf]||Mo.push(t),e[Bi].remove(t),e[ia].delete(t),e[jp].delete(e[Jl].get(t)),e[Jl].delete(t);for(let n=0;n<e[zi].length;n++)e[zi][n][t]=0}},uv=(e,t)=>e[Bi].has(t),fv=Symbol("$modifier"),Ic=Symbol("queries"),pf=Symbol("notQueries"),dv=Symbol("queryAny"),hv=Symbol("queryAll"),pv=Symbol("queryNone"),cc=Symbol("queryMap"),Co=Symbol("$dirtyQueries"),qp=Symbol("queryComponents"),mv=(e,t)=>{const n=[],i=[],r=[];t[qp].forEach(C=>{if(typeof C=="function"&&C[fv]){const[T,A]=C();e[mi].has(T)||Kl(e,T),A==="not"&&i.push(T),A==="changed"&&(r.push(T),n.push(T))}else e[mi].has(C)||Kl(e,C),n.push(C)});const s=C=>e[mi].get(C),o=n.concat(i).map(s),a=So(),c=[],l=[],u=So(),f=So(),d=So(),p=o.map(C=>C.generationId).reduce((C,T)=>(C.includes(T)||C.push(T),C),[]),m=(C,T)=>(C[T.generationId]||(C[T.generationId]=0),C[T.generationId]|=T.bitflag,C),_=n.map(s).reduce(m,{}),g=i.map(s).reduce(m,{}),h=o.reduce(m,{}),y=n.filter(C=>!C[Gp]).map(C=>Object.getOwnPropertySymbols(C).includes($r)?C[$r]:[C]).reduce((C,T)=>C.concat(T),[]),v=Object.assign(a,{archetypes:c,changed:l,components:n,notComponents:i,changedComponents:r,allComponents:o,masks:_,notMasks:g,hasMasks:h,generations:p,flatProps:y,toRemove:u,entered:f,exited:d,shadows:[]});e[cc].set(t,v),e[Ic].add(v),o.forEach(C=>{C.queries.add(v)}),i.length&&e[pf].add(v);for(let C=0;C<av();C++){if(!e[Bi].has(C))continue;Dc(e,v,C)&&Lc(v,C)}},gv=(e,t)=>{const n=Symbol(),i=e.flatProps[t];return tv(i,n),e.shadows[t]=i[n],i[n]},_v=(e,t)=>{t&&(e.changed=[]);const{flatProps:n,shadows:i}=e;for(let r=0;r<e.dense.length;r++){const s=e.dense[r];let o=!1;for(let a=0;a<n.length;a++){const c=n[a],l=i[a]||gv(e,a);if(ArrayBuffer.isView(c[s])){for(let u=0;u<c[s].length;u++)if(c[s][u]!==l[s][u]){o=!0;break}l[s].set(c[s])}else c[s]!==l[s]&&(o=!0,l[s]=c[s])}o&&e.changed.push(s)}return e.changed},St=(...e)=>{let t,n,i,r;if(Array.isArray(e[0])&&(t=e[0]),t===void 0||t[mi]!==void 0)return o=>o?o[Ao]:t[Ao];const s=function(o,a=!0){o[cc].has(s)||mv(o,s);const c=o[cc].get(s);return xv(o),c.changedComponents.length?_v(c,a):c.dense};return s[qp]=t,s[dv]=n,s[hv]=i,s[pv]=r,s},Dc=(e,t,n)=>{const{masks:i,notMasks:r,generations:s}=t;for(let o=0;o<s.length;o++){const a=s[o],c=i[a],l=r[a],u=e[zi][a][n];if(l&&(u&l)!==0||c&&(u&c)!==c)return!1}return!0},Lc=(e,t)=>{e.toRemove.remove(t),e.entered.add(t),e.add(t)},vv=e=>{for(let t=e.toRemove.dense.length-1;t>=0;t--){const n=e.toRemove.dense[t];e.toRemove.remove(n),e.remove(n)}},xv=e=>{e[Co].size&&(e[Co].forEach(vv),e[Co].clear())},mf=(e,t,n)=>{!t.has(n)||t.toRemove.has(n)||(t.toRemove.add(n),e[Co].add(t),t.exited.add(n))},mi=Symbol("componentMap"),At=(e,t)=>{const n=iv(e,hf());return e&&Object.keys(e).length,n},yv=e=>{e[Ro]*=2,e[Ro]>=2**31&&(e[Ro]=1,e[zi].push(new Uint32Array(e[_f])))},Kl=(e,t)=>{if(!t)throw new Error("bitECS - Cannot register null or undefined component");const n=new Set,i=new Set,r=new Set;e[Ic].forEach(s=>{s.allComponents.includes(t)&&n.add(s)}),e[mi].set(t,{generationId:e[zi].length-1,bitflag:e[Ro],store:t,queries:n,notQueries:i,changedQueries:r}),yv(e)},gf=(e,t,n)=>{const i=e[mi].get(t);if(!i)return!1;const{generationId:r,bitflag:s}=i;return(e[zi][r][n]&s)===s},Sv=(e,t,n,i=!1)=>{if(n===void 0)throw new Error("bitECS - entity is undefined.");if(!e[Bi].has(n))throw new Error("bitECS - entity does not exist in the world.");if(e[mi].has(t)||Kl(e,t),gf(e,t,n))return;const r=e[mi].get(t),{generationId:s,bitflag:o,queries:a,notQueries:c}=r;e[zi][s][n]|=o,a.forEach(l=>{l.toRemove.remove(n);const u=Dc(e,l,n);u&&(l.exited.remove(n),Lc(l,n)),u||(l.entered.remove(n),mf(e,l,n))}),e[ia].get(n).add(t),i&&Xp(t,n)},Mv=(e,t,n,i=!0)=>{if(n===void 0)throw new Error("bitECS - entity is undefined.");if(!e[Bi].has(n))throw new Error("bitECS - entity does not exist in the world.");if(!gf(e,t,n))return;const r=e[mi].get(t),{generationId:s,bitflag:o,queries:a}=r;e[zi][s][n]&=~o,a.forEach(c=>{c.toRemove.remove(n);const l=Dc(e,c,n);l&&(c.exited.remove(n),Lc(c,n)),l||(c.entered.remove(n),mf(e,c,n))}),e[ia].get(n).delete(t),i&&Xp(t,n)},_f=Symbol("size"),Ro=Symbol("bitflag"),Ev=Symbol("archetypes"),jp=Symbol("localEntities"),Jl=Symbol("localEntityLookup"),vf=Symbol("manualEntityRecycling"),bv=(...e)=>{const t=typeof e[0]=="object"?e[0]:{},n=typeof e[0]=="number"?e[0]:typeof e[1]=="number"?e[1]:hf();return Tv(t,n),t},Tv=(e,t=hf())=>(e[_f]=t,e[Ao]&&e[Ao].forEach(n=>Zp(e,n)),e[zi]=[new Uint32Array(t)],e[ia]=new Map,e[Ev]=[],e[Bi]=So(),e[Ao]=e[Bi].dense,e[Ro]=1,e[mi]=new Map,e[cc]=new Map,e[Ic]=new Set,e[pf]=new Set,e[Co]=new Set,e[jp]=new Map,e[Jl]=new Map,e[vf]=!1,e),w=ws;function Po(e){return e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").replace(/([A-Z])([A-Z][a-z])/g,"$1-$2").replace(/_/g,"-").replace(/([A-Z]+)/g,t=>t.toLowerCase()).replace(/--+/g,"-").replace(/^-+|-+$/g,"").toLowerCase()}function xf(e){return e.replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}let wv=class{parsers=new Map;componentDefaults={};componentShorthands={};componentEnums={};validations=[];register(t){if(t.parsers)for(const[n,i]of Object.entries(t.parsers))this.parsers.set(n,i);if(t.defaults)for(const[n,i]of Object.entries(t.defaults)){const r=Po(n);this.componentDefaults[r]||(this.componentDefaults[r]={}),Object.assign(this.componentDefaults[r],i)}if(t.shorthands)for(const[n,i]of Object.entries(t.shorthands)){const r=Po(n);this.componentShorthands[r]||(this.componentShorthands[r]={}),Object.assign(this.componentShorthands[r],i)}if(t.enums)for(const[n,i]of Object.entries(t.enums)){const r=Po(n);this.componentEnums[r]||(this.componentEnums[r]={}),Object.assign(this.componentEnums[r],i)}t.validations&&this.validations.push(...t.validations)}getParser(t){return this.parsers.get(t)}getDefaults(t){return this.componentDefaults[t]||{}}getShorthands(t){return this.componentShorthands[t]||{}}getAllShorthands(){return this.componentShorthands}getEnums(t){return this.componentEnums[t]||{}}getValidations(){return this.validations}};function bd(e,t,n){for(const[i,r]of Object.entries(n)){const s=e[i];s&&(s[t]=r)}}const Ge=At({entity:w.i32}),Bo={FIXED_TIMESTEP:.02,DEFAULT_DELTA:.006944444444444444};function lc(e,t){const n=new Error(t);return n.type=e,n}function Av(e){const t=[e.first&&"first",e.last&&"last",e.before?.length&&"before",e.after?.length&&"after"].filter(Boolean);if(t.length>1&&(t.includes("first")||t.includes("last")))throw lc("validation",`System cannot combine ${t.join(" and ")} constraints`)}function Cv(e,t){const n=e.group??"simulation";if(e.before)for(const i of e.before){if(!t.includes(i))continue;const r=i.group??"simulation";if(r!==n)throw lc("group-mismatch",`System with before constraint references system in different group (${n} vs ${r})`)}if(e.after)for(const i of e.after){if(!t.includes(i))continue;const r=i.group??"simulation";if(r!==n)throw lc("group-mismatch",`System with after constraint references system in different group (${n} vs ${r})`)}}function Rv(e){const t=new Map;for(const n of e){if(t.has(n)||t.set(n,new Set),n.before)for(const i of n.before)e.includes(i)&&(t.has(i)||t.set(i,new Set),t.get(n).add(i));if(n.after)for(const i of n.after)e.includes(i)&&(t.has(i)||t.set(i,new Set),t.get(i).add(n))}return t}function Pv(e){const t=new Set,n=new Set;function i(r){if(n.has(r))return!0;if(t.has(r))return!1;t.add(r),n.add(r);const s=e.get(r);return s?.size&&[...s].some(i)?!0:(n.delete(r),!1)}for(const r of e.keys())if(i(r))throw lc("circular-dependency","Circular dependency detected in system constraints")}function jc(e){if(e.length===0)return[];const t=Rv(e);Pv(t);const n=new Map;for(const s of e)n.set(s,0);for(const s of t.values())for(const o of s)n.set(o,(n.get(o)||0)+1);const i=[],r=[];for(const s of e)n.get(s)===0&&i.push(s);for(;i.length>0;){const s=i.shift();r.push(s);const o=t.get(s)||new Set;for(const a of o){const c=(n.get(a)||0)-1;n.set(a,c),c===0&&i.push(a)}}return r}function Iv(e,t,n){const i=n||e;e.forEach(s=>{Av(s),Cv(s,i)});const r=e.reduce((s,o)=>{const a=o.first?"first":o.last?"last":"normal";return s[a].push(o),s},{first:[],normal:[],last:[]});return[...jc(r.first),...jc(r.normal),...jc(r.last)]}let Dv=class{accumulator=0;setup=new WeakSet;systemGroupCache=new Map;lastSystemsSize=0;getAccumulator(){return this.accumulator}step(t,n=Bo.DEFAULT_DELTA){const i=Bo.FIXED_TIMESTEP,r=t.time;for(r.deltaTime=n,r.elapsed+=n,this.accumulator+=n,this.runSystemGroup(t,"setup");this.accumulator>=i;)r.deltaTime=i,this.runSystemGroup(t,"fixed"),this.accumulator-=i;r.deltaTime=n,this.runSystemGroup(t,"simulation"),this.runSystemGroup(t,"draw")}runSystemGroup(t,n){const i=this.getSystemsByGroup(t,n);for(const r of i)this.setup.has(r)||(r.setup?.(t),this.setup.add(r)),r.update?.(t)}getSystemsByGroup(t,n){t.systems.size!==this.lastSystemsSize&&(this.systemGroupCache.clear(),this.lastSystemsSize=t.systems.size);const i=n;if(this.systemGroupCache.has(i))return this.systemGroupCache.get(i);const r=Array.from(t.systems),s=r.filter(a=>(a.group??"simulation")===n),o=Iv(s,n,r);return this.systemGroupCache.set(i,o),o}};function Lv(e,t){const n=[];for(let i=0;i<=t.length;i++)n[i]=[i];for(let i=0;i<=e.length;i++)n[0][i]=i;for(let i=1;i<=t.length;i++)for(let r=1;r<=e.length;r++)t.charAt(i-1)===e.charAt(r-1)?n[i][r]=n[i-1][r-1]:n[i][r]=Math.min(n[i-1][r-1]+1,n[i][r-1]+1,n[i-1][r]+1);return n[t.length][e.length]}function Uc(e,t,n=3){let i=null,r=n+1;for(const s of t){const o=Lv(e.toLowerCase(),s.toLowerCase());o<r&&(r=o,i=s)}return r<=n?i:null}function ko(e,t=5){if(e.length===0)return"none";if(e.length<=t)return e.join(", ");const n=e.slice(0,t),i=e.length-t;return`${n.join(", ")} (+${i} more)`}function Ja(e,t){const n=Uc(e,t);let i=`Unknown element <${e}>`;return n&&(i+=` - did you mean <${n}>?`),t.length>0&&(i+=`
  Available recipes: ${ko(t)}`),i}function Uv(e,t,n,i){const r=Uc(e,n);let s=`[${t}] Unknown attribute "${e}"`;return r&&(s+=` - did you mean "${r}"?`),i&&i.length>0&&(s+=`
  Shorthands: ${ko(i)}`),n.length>0&&(s+=`
  Available: ${ko(n)}`),e.includes("-")&&!r&&(s+=`
  Note: Custom components must be registered before creating the Game instance`),s}function Nv(e,t,n,i){const r=i?Uc(t,i):null;let s=`[${e}.${t}] ${n}`;return r&&(s+=` - did you mean "${r}"?`),i&&i.length>0&&(s+=`
  Available: ${ko(i)}`),s}function Td(e,t,n,i){return`[${e}] Syntax error in "${t}" - ${i}
  Expected: ${n}`}function Kp(e,t,n,i){const r=Uc(n,i);let s=`[${e}.${t}] Invalid value "${n}"`;return r&&(s+=` - did you mean "${r}"?`),s+=`
  Valid options: ${ko(i)}`,s}function ma(e,t,n,i){return`[${e}.${t}] Type mismatch - expected ${n}, got ${i}`}function fo(e,t,n,i){return`[${e}.${t}] Wrong number of values - expected ${n}, got ${i}`}function Ov(e){const t=[];for(const n in e){if(typeof e[n]=="function"||n.startsWith("_"))continue;const i=n.replace(/([A-Z])/g,"-$1").toLowerCase();t.push(i)}return t}let Jp=class{constructor(t){this.state=t}setName(t,n){this.state.setEntityName(t,n)}getEntityByName(t){return this.state.getEntityByName(t)}};const yf="170",Fv=0,wd=1,zv=2,Qp=1,tm=2,Pi=3,gr=0,gn=1,Li=2,fr=0,Is=1,Ad=2,Cd=3,Rd=4,Bv=5,Nr=100,kv=101,Vv=102,$v=103,Hv=104,Gv=200,Wv=201,Xv=202,Yv=203,Ql=204,tu=205,Zv=206,qv=207,jv=208,Kv=209,Jv=210,Qv=211,t0=212,e0=213,n0=214,eu=0,nu=1,iu=2,$s=3,ru=4,su=5,ou=6,au=7,em=0,i0=1,r0=2,dr=0,s0=1,o0=2,a0=3,c0=4,l0=5,u0=6,f0=7,nm=300,Hs=301,Gs=302,cu=303,lu=304,Nc=306,uu=1e3,zr=1001,fu=1002,In=1003,d0=1004,ga=1005,di=1006,Kc=1007,Br=1008,ki=1009,im=1010,rm=1011,Vo=1012,Sf=1013,Kr=1014,hi=1015,ra=1016,Mf=1017,Ef=1018,Ws=1020,sm=35902,om=1021,am=1022,ii=1023,cm=1024,lm=1025,Ds=1026,Xs=1027,bf=1028,Tf=1029,um=1030,wf=1031,Af=1033,Qa=33776,tc=33777,ec=33778,nc=33779,du=35840,hu=35841,pu=35842,mu=35843,gu=36196,_u=37492,vu=37496,xu=37808,yu=37809,Su=37810,Mu=37811,Eu=37812,bu=37813,Tu=37814,wu=37815,Au=37816,Cu=37817,Ru=37818,Pu=37819,Iu=37820,Du=37821,ic=36492,Lu=36494,Uu=36495,fm=36283,Nu=36284,Ou=36285,Fu=36286,h0=3200,p0=3201,dm=0,m0=1,ir="",kn="srgb",io="srgb-linear",Oc="linear",ue="srgb",ls=7680,Pd=519,g0=512,_0=513,v0=514,hm=515,x0=516,y0=517,S0=518,M0=519,zu=35044,E0=35048,Id="300 es",Ui=2e3,uc=2001;class ro{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Dd=1234567;const Io=Math.PI/180,$o=180/Math.PI;function Ni(){const e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(sn[e&255]+sn[e>>8&255]+sn[e>>16&255]+sn[e>>24&255]+"-"+sn[t&255]+sn[t>>8&255]+"-"+sn[t>>16&15|64]+sn[t>>24&255]+"-"+sn[n&63|128]+sn[n>>8&255]+"-"+sn[n>>16&255]+sn[n>>24&255]+sn[i&255]+sn[i>>8&255]+sn[i>>16&255]+sn[i>>24&255]).toLowerCase()}function tn(e,t,n){return Math.max(t,Math.min(n,e))}function Cf(e,t){return(e%t+t)%t}function b0(e,t,n,i,r){return i+(e-t)*(r-i)/(n-t)}function T0(e,t,n){return e!==t?(n-e)/(t-e):0}function Do(e,t,n){return(1-n)*e+n*t}function w0(e,t,n,i){return Do(e,t,1-Math.exp(-n*i))}function A0(e,t=1){return t-Math.abs(Cf(e,t*2)-t)}function C0(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function R0(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function P0(e,t){return e+Math.floor(Math.random()*(t-e+1))}function I0(e,t){return e+Math.random()*(t-e)}function D0(e){return e*(.5-Math.random())}function L0(e){e!==void 0&&(Dd=e);let t=Dd+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function U0(e){return e*Io}function N0(e){return e*$o}function O0(e){return(e&e-1)===0&&e!==0}function F0(e){return Math.pow(2,Math.ceil(Math.log(e)/Math.LN2))}function z0(e){return Math.pow(2,Math.floor(Math.log(e)/Math.LN2))}function B0(e,t,n,i,r){const s=Math.cos,o=Math.sin,a=s(n/2),c=o(n/2),l=s((t+i)/2),u=o((t+i)/2),f=s((t-i)/2),d=o((t-i)/2),p=s((i-t)/2),m=o((i-t)/2);switch(r){case"XYX":e.set(a*u,c*f,c*d,a*l);break;case"YZY":e.set(c*d,a*u,c*f,a*l);break;case"ZXZ":e.set(c*f,c*d,a*u,a*l);break;case"XZX":e.set(a*u,c*m,c*p,a*l);break;case"YXY":e.set(c*p,a*u,c*m,a*l);break;case"ZYZ":e.set(c*m,c*p,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ei(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function ce(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}const k0={DEG2RAD:Io,RAD2DEG:$o,generateUUID:Ni,clamp:tn,euclideanModulo:Cf,mapLinear:b0,inverseLerp:T0,lerp:Do,damp:w0,pingpong:A0,smoothstep:C0,smootherstep:R0,randInt:P0,randFloat:I0,randFloatSpread:D0,seededRandom:L0,degToRad:U0,radToDeg:N0,isPowerOfTwo:O0,ceilPowerOfTwo:F0,floorPowerOfTwo:z0,setQuaternionFromProperEuler:B0,normalize:ce,denormalize:ei};class re{constructor(t=0,n=0){re.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,i=this.y,r=t.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(tn(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-t.x,o=this.y-t.y;return this.x=s*i-o*r+t.x,this.y=s*r+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Bt{constructor(t,n,i,r,s,o,a,c,l){Bt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,r,s,o,a,c,l)}set(t,n,i,r,s,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=r,u[2]=a,u[3]=n,u[4]=s,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],f=i[7],d=i[2],p=i[5],m=i[8],_=r[0],g=r[3],h=r[6],y=r[1],x=r[4],v=r[7],C=r[2],T=r[5],A=r[8];return s[0]=o*_+a*y+c*C,s[3]=o*g+a*x+c*T,s[6]=o*h+a*v+c*A,s[1]=l*_+u*y+f*C,s[4]=l*g+u*x+f*T,s[7]=l*h+u*v+f*A,s[2]=d*_+p*y+m*C,s[5]=d*g+p*x+m*T,s[8]=d*h+p*v+m*A,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return n*o*u-n*a*l-i*s*u+i*a*c+r*s*l-r*o*c}invert(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=u*o-a*l,d=a*c-u*s,p=l*s-o*c,m=n*f+i*d+r*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return t[0]=f*_,t[1]=(r*l-u*i)*_,t[2]=(a*i-r*o)*_,t[3]=d*_,t[4]=(u*n-r*c)*_,t[5]=(r*s-a*n)*_,t[6]=p*_,t[7]=(i*c-l*n)*_,t[8]=(o*n-i*s)*_,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-r*l,r*c,-r*(-l*o+c*a)+a+n,0,0,1),this}scale(t,n){return this.premultiply(Jc.makeScale(t,n)),this}rotate(t){return this.premultiply(Jc.makeRotation(-t)),this}translate(t,n){return this.premultiply(Jc.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,i=t.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Jc=new Bt;function pm(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function fc(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function V0(){const e=fc("canvas");return e.style.display="block",e}const Ld={};function Eo(e){e in Ld||(Ld[e]=!0,console.warn(e))}function $0(e,t,n){return new Promise(function(i,r){function s(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:r();break;case e.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function H0(e){const t=e.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function G0(e){const t=e.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Qt={enabled:!0,workingColorSpace:io,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===ue&&(e.r=Oi(e.r),e.g=Oi(e.g),e.b=Oi(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===ue&&(e.r=Ls(e.r),e.g=Ls(e.g),e.b=Ls(e.b))),e},fromWorkingColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},toWorkingColorSpace:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===ir?Oc:this.spaces[e].transfer},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}};function Oi(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function Ls(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}const Ud=[.64,.33,.3,.6,.15,.06],Nd=[.2126,.7152,.0722],Od=[.3127,.329],Fd=new Bt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zd=new Bt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Qt.define({[io]:{primaries:Ud,whitePoint:Od,transfer:Oc,toXYZ:Fd,fromXYZ:zd,luminanceCoefficients:Nd,workingColorSpaceConfig:{unpackColorSpace:kn},outputColorSpaceConfig:{drawingBufferColorSpace:kn}},[kn]:{primaries:Ud,whitePoint:Od,transfer:ue,toXYZ:Fd,fromXYZ:zd,luminanceCoefficients:Nd,outputColorSpaceConfig:{drawingBufferColorSpace:kn}}});let us;class W0{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{us===void 0&&(us=fc("canvas")),us.width=t.width,us.height=t.height;const i=us.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=us}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=fc("canvas");n.width=t.width,n.height=t.height;const i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Oi(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(t.data){const n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Oi(n[i]/255)*255):n[i]=Oi(n[i]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let X0=0;class mm{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:X0++}),this.uuid=Ni(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Qc(r[o].image)):s.push(Qc(r[o]))}else s=Qc(r);i.url=s}return n||(t.images[this.uuid]=i),i}}function Qc(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?W0.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Y0=0;class dn extends ro{constructor(t=dn.DEFAULT_IMAGE,n=dn.DEFAULT_MAPPING,i=zr,r=zr,s=di,o=Br,a=ii,c=ki,l=dn.DEFAULT_ANISOTROPY,u=ir){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Y0++}),this.uuid=Ni(),this.name="",this.source=new mm(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==nm)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case uu:t.x=t.x-Math.floor(t.x);break;case zr:t.x=t.x<0?0:1;break;case fu:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case uu:t.y=t.y-Math.floor(t.y);break;case zr:t.y=t.y<0?0:1;break;case fu:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}dn.DEFAULT_IMAGE=null;dn.DEFAULT_MAPPING=nm;dn.DEFAULT_ANISOTROPY=1;class pe{constructor(t=0,n=0,i=0,r=1){pe.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,r){return this.x=t,this.y=n,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,i=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,r,s;const c=t.elements,l=c[0],u=c[4],f=c[8],d=c[1],p=c[5],m=c[9],_=c[2],g=c[6],h=c[10];if(Math.abs(u-d)<.01&&Math.abs(f-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+_)<.1&&Math.abs(m+g)<.1&&Math.abs(l+p+h-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const x=(l+1)/2,v=(p+1)/2,C=(h+1)/2,T=(u+d)/4,A=(f+_)/4,P=(m+g)/4;return x>v&&x>C?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=T/i,s=A/i):v>C?v<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),i=T/r,s=P/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=A/s,r=P/s),this.set(i,r,s,n),this}let y=Math.sqrt((g-m)*(g-m)+(f-_)*(f-_)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(f-_)/y,this.z=(d-u)/y,this.w=Math.acos((l+p+h-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this.w=Math.max(t.w,Math.min(n.w,this.w)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this.w=Math.max(t,Math.min(n,this.w)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Z0 extends ro{constructor(t=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=1,this.scissor=new pe(0,0,t,n),this.scissorTest=!1,this.viewport=new pe(0,0,t,n);const r={width:t,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:di,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new dn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,r=t.textures.length;i<r;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},t.texture.image);return this.texture.source=new mm(n),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Jr extends Z0{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}}class gm extends dn{constructor(t=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:r},this.magFilter=In,this.minFilter=In,this.wrapR=zr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class q0 extends dn{constructor(t=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:r},this.magFilter=In,this.minFilter=In,this.wrapR=zr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class xi{constructor(t=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=r}static slerpFlat(t,n,i,r,s,o,a){let c=i[r+0],l=i[r+1],u=i[r+2],f=i[r+3];const d=s[o+0],p=s[o+1],m=s[o+2],_=s[o+3];if(a===0){t[n+0]=c,t[n+1]=l,t[n+2]=u,t[n+3]=f;return}if(a===1){t[n+0]=d,t[n+1]=p,t[n+2]=m,t[n+3]=_;return}if(f!==_||c!==d||l!==p||u!==m){let g=1-a;const h=c*d+l*p+u*m+f*_,y=h>=0?1:-1,x=1-h*h;if(x>Number.EPSILON){const C=Math.sqrt(x),T=Math.atan2(C,h*y);g=Math.sin(g*T)/C,a=Math.sin(a*T)/C}const v=a*y;if(c=c*g+d*v,l=l*g+p*v,u=u*g+m*v,f=f*g+_*v,g===1-a){const C=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=C,l*=C,u*=C,f*=C}}t[n]=c,t[n+1]=l,t[n+2]=u,t[n+3]=f}static multiplyQuaternionsFlat(t,n,i,r,s,o){const a=i[r],c=i[r+1],l=i[r+2],u=i[r+3],f=s[o],d=s[o+1],p=s[o+2],m=s[o+3];return t[n]=a*m+u*f+c*p-l*d,t[n+1]=c*m+u*d+l*f-a*p,t[n+2]=l*m+u*p+a*d-c*f,t[n+3]=u*m-a*f-c*d-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,r){return this._x=t,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const i=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(r/2),f=a(s/2),d=c(i/2),p=c(r/2),m=c(s/2);switch(o){case"XYZ":this._x=d*u*f+l*p*m,this._y=l*p*f-d*u*m,this._z=l*u*m+d*p*f,this._w=l*u*f-d*p*m;break;case"YXZ":this._x=d*u*f+l*p*m,this._y=l*p*f-d*u*m,this._z=l*u*m-d*p*f,this._w=l*u*f+d*p*m;break;case"ZXY":this._x=d*u*f-l*p*m,this._y=l*p*f+d*u*m,this._z=l*u*m+d*p*f,this._w=l*u*f-d*p*m;break;case"ZYX":this._x=d*u*f-l*p*m,this._y=l*p*f+d*u*m,this._z=l*u*m-d*p*f,this._w=l*u*f+d*p*m;break;case"YZX":this._x=d*u*f+l*p*m,this._y=l*p*f+d*u*m,this._z=l*u*m-d*p*f,this._w=l*u*f-d*p*m;break;case"XZY":this._x=d*u*f-l*p*m,this._y=l*p*f-d*u*m,this._z=l*u*m+d*p*f,this._w=l*u*f+d*p*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const i=n/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],c=n[9],l=n[2],u=n[6],f=n[10],d=i+a+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-c)*p,this._y=(s-l)*p,this._z=(o-r)*p}else if(i>a&&i>f){const p=2*Math.sqrt(1+i-a-f);this._w=(u-c)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+l)/p}else if(a>f){const p=2*Math.sqrt(1+a-i-f);this._w=(s-l)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+f-i-a);this._w=(o-r)/p,this._x=(s+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(tn(this.dot(t),-1,1)))}rotateTowards(t,n){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const i=t._x,r=t._y,s=t._z,o=t._w,a=n._x,c=n._y,l=n._z,u=n._w;return this._x=i*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-i*l,this._z=s*u+o*l+i*c-r*a,this._w=o*u-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+i*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),f=Math.sin((1-n)*u)/l,d=Math.sin(n*u)/l;return this._w=o*f+this._w*d,this._x=i*f+this._x*d,this._y=r*f+this._y*d,this._z=s*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(n),s*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(t=0,n=0,i=0){O.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Bd.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Bd.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,i=this.y,r=this.z,s=t.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(t){const n=this.x,i=this.y,r=this.z,s=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*r-a*i),u=2*(a*n-s*r),f=2*(s*i-o*n);return this.x=n+c*l+o*f-a*u,this.y=i+c*u+a*l-s*f,this.z=r+c*f+s*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const i=t.x,r=t.y,s=t.z,o=n.x,a=n.y,c=n.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return tl.copy(this).projectOnVector(t),this.sub(tl)}reflect(t){return this.sub(tl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(tn(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return n*n+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){const r=Math.sin(n)*t;return this.x=r*Math.sin(i),this.y=Math.cos(n)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const tl=new O,Bd=new xi;class yi{constructor(t=new O(1/0,1/0,1/0),n=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(jn.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(jn.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const i=jn.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,jn):jn.fromBufferAttribute(s,o),jn.applyMatrix4(t.matrixWorld),this.expandByPoint(jn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),_a.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),_a.copy(i.boundingBox)),_a.applyMatrix4(t.matrixWorld),this.union(_a)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,jn),jn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ho),va.subVectors(this.max,ho),fs.subVectors(t.a,ho),ds.subVectors(t.b,ho),hs.subVectors(t.c,ho),Zi.subVectors(ds,fs),qi.subVectors(hs,ds),Er.subVectors(fs,hs);let n=[0,-Zi.z,Zi.y,0,-qi.z,qi.y,0,-Er.z,Er.y,Zi.z,0,-Zi.x,qi.z,0,-qi.x,Er.z,0,-Er.x,-Zi.y,Zi.x,0,-qi.y,qi.x,0,-Er.y,Er.x,0];return!el(n,fs,ds,hs,va)||(n=[1,0,0,0,1,0,0,0,1],!el(n,fs,ds,hs,va))?!1:(xa.crossVectors(Zi,qi),n=[xa.x,xa.y,xa.z],el(n,fs,ds,hs,va))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,jn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(jn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ti),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Ti=[new O,new O,new O,new O,new O,new O,new O,new O],jn=new O,_a=new yi,fs=new O,ds=new O,hs=new O,Zi=new O,qi=new O,Er=new O,ho=new O,va=new O,xa=new O,br=new O;function el(e,t,n,i,r){for(let s=0,o=e.length-3;s<=o;s+=3){br.fromArray(e,s);const a=r.x*Math.abs(br.x)+r.y*Math.abs(br.y)+r.z*Math.abs(br.z),c=t.dot(br),l=n.dot(br),u=i.dot(br);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const j0=new yi,po=new O,nl=new O;class rs{constructor(t=new O,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const i=this.center;n!==void 0?i.copy(n):j0.setFromPoints(t).getCenter(i);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;po.subVectors(t,this.center);const n=po.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(po,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(nl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(po.copy(t.center).add(nl)),this.expandByPoint(po.copy(t.center).sub(nl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const wi=new O,il=new O,ya=new O,ji=new O,rl=new O,Sa=new O,sl=new O;class K0{constructor(t=new O,n=new O(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,wi)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=wi.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(wi.copy(this.origin).addScaledVector(this.direction,n),wi.distanceToSquared(t))}distanceSqToSegment(t,n,i,r){il.copy(t).add(n).multiplyScalar(.5),ya.copy(n).sub(t).normalize(),ji.copy(this.origin).sub(il);const s=t.distanceTo(n)*.5,o=-this.direction.dot(ya),a=ji.dot(this.direction),c=-ji.dot(ya),l=ji.lengthSq(),u=Math.abs(1-o*o);let f,d,p,m;if(u>0)if(f=o*c-a,d=o*a-c,m=s*u,f>=0)if(d>=-m)if(d<=m){const _=1/u;f*=_,d*=_,p=f*(f+o*d+2*a)+d*(o*f+d+2*c)+l}else d=s,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*c)+l;else d=-s,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*c)+l;else d<=-m?(f=Math.max(0,-(-o*s+a)),d=f>0?-s:Math.min(Math.max(-s,-c),s),p=-f*f+d*(d+2*c)+l):d<=m?(f=0,d=Math.min(Math.max(-s,-c),s),p=d*(d+2*c)+l):(f=Math.max(0,-(o*s+a)),d=f>0?s:Math.min(Math.max(-s,-c),s),p=-f*f+d*(d+2*c)+l);else d=o>0?-s:s,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(il).addScaledVector(ya,d),p}intersectSphere(t,n){wi.subVectors(t.center,this.origin);const i=wi.dot(this.direction),r=wi.dot(wi)-i*i,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,n):this.at(a,n)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){const i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,r,s,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(i=(t.min.x-d.x)*l,r=(t.max.x-d.x)*l):(i=(t.max.x-d.x)*l,r=(t.min.x-d.x)*l),u>=0?(s=(t.min.y-d.y)*u,o=(t.max.y-d.y)*u):(s=(t.max.y-d.y)*u,o=(t.min.y-d.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(t.min.z-d.z)*f,c=(t.max.z-d.z)*f):(a=(t.max.z-d.z)*f,c=(t.min.z-d.z)*f),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(t){return this.intersectBox(t,wi)!==null}intersectTriangle(t,n,i,r,s){rl.subVectors(n,t),Sa.subVectors(i,t),sl.crossVectors(rl,Sa);let o=this.direction.dot(sl),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ji.subVectors(this.origin,t);const c=a*this.direction.dot(Sa.crossVectors(ji,Sa));if(c<0)return null;const l=a*this.direction.dot(rl.cross(ji));if(l<0||c+l>o)return null;const u=-a*ji.dot(sl);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ne{constructor(t,n,i,r,s,o,a,c,l,u,f,d,p,m,_,g){ne.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,r,s,o,a,c,l,u,f,d,p,m,_,g)}set(t,n,i,r,s,o,a,c,l,u,f,d,p,m,_,g){const h=this.elements;return h[0]=t,h[4]=n,h[8]=i,h[12]=r,h[1]=s,h[5]=o,h[9]=a,h[13]=c,h[2]=l,h[6]=u,h[10]=f,h[14]=d,h[3]=p,h[7]=m,h[11]=_,h[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ne().fromArray(this.elements)}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){const n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){const n=this.elements,i=t.elements,r=1/ps.setFromMatrixColumn(t,0).length(),s=1/ps.setFromMatrixColumn(t,1).length(),o=1/ps.setFromMatrixColumn(t,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,i=t.x,r=t.y,s=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(t.order==="XYZ"){const d=o*u,p=o*f,m=a*u,_=a*f;n[0]=c*u,n[4]=-c*f,n[8]=l,n[1]=p+m*l,n[5]=d-_*l,n[9]=-a*c,n[2]=_-d*l,n[6]=m+p*l,n[10]=o*c}else if(t.order==="YXZ"){const d=c*u,p=c*f,m=l*u,_=l*f;n[0]=d+_*a,n[4]=m*a-p,n[8]=o*l,n[1]=o*f,n[5]=o*u,n[9]=-a,n[2]=p*a-m,n[6]=_+d*a,n[10]=o*c}else if(t.order==="ZXY"){const d=c*u,p=c*f,m=l*u,_=l*f;n[0]=d-_*a,n[4]=-o*f,n[8]=m+p*a,n[1]=p+m*a,n[5]=o*u,n[9]=_-d*a,n[2]=-o*l,n[6]=a,n[10]=o*c}else if(t.order==="ZYX"){const d=o*u,p=o*f,m=a*u,_=a*f;n[0]=c*u,n[4]=m*l-p,n[8]=d*l+_,n[1]=c*f,n[5]=_*l+d,n[9]=p*l-m,n[2]=-l,n[6]=a*c,n[10]=o*c}else if(t.order==="YZX"){const d=o*c,p=o*l,m=a*c,_=a*l;n[0]=c*u,n[4]=_-d*f,n[8]=m*f+p,n[1]=f,n[5]=o*u,n[9]=-a*u,n[2]=-l*u,n[6]=p*f+m,n[10]=d-_*f}else if(t.order==="XZY"){const d=o*c,p=o*l,m=a*c,_=a*l;n[0]=c*u,n[4]=-f,n[8]=l*u,n[1]=d*f+_,n[5]=o*u,n[9]=p*f-m,n[2]=m*f-p,n[6]=a*u,n[10]=_*f+d}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(J0,t,Q0)}lookAt(t,n,i){const r=this.elements;return bn.subVectors(t,n),bn.lengthSq()===0&&(bn.z=1),bn.normalize(),Ki.crossVectors(i,bn),Ki.lengthSq()===0&&(Math.abs(i.z)===1?bn.x+=1e-4:bn.z+=1e-4,bn.normalize(),Ki.crossVectors(i,bn)),Ki.normalize(),Ma.crossVectors(bn,Ki),r[0]=Ki.x,r[4]=Ma.x,r[8]=bn.x,r[1]=Ki.y,r[5]=Ma.y,r[9]=bn.y,r[2]=Ki.z,r[6]=Ma.z,r[10]=bn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],f=i[5],d=i[9],p=i[13],m=i[2],_=i[6],g=i[10],h=i[14],y=i[3],x=i[7],v=i[11],C=i[15],T=r[0],A=r[4],P=r[8],b=r[12],M=r[1],I=r[5],V=r[9],F=r[13],H=r[2],Z=r[6],$=r[10],J=r[14],G=r[3],rt=r[7],lt=r[11],_t=r[15];return s[0]=o*T+a*M+c*H+l*G,s[4]=o*A+a*I+c*Z+l*rt,s[8]=o*P+a*V+c*$+l*lt,s[12]=o*b+a*F+c*J+l*_t,s[1]=u*T+f*M+d*H+p*G,s[5]=u*A+f*I+d*Z+p*rt,s[9]=u*P+f*V+d*$+p*lt,s[13]=u*b+f*F+d*J+p*_t,s[2]=m*T+_*M+g*H+h*G,s[6]=m*A+_*I+g*Z+h*rt,s[10]=m*P+_*V+g*$+h*lt,s[14]=m*b+_*F+g*J+h*_t,s[3]=y*T+x*M+v*H+C*G,s[7]=y*A+x*I+v*Z+C*rt,s[11]=y*P+x*V+v*$+C*lt,s[15]=y*b+x*F+v*J+C*_t,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[4],r=t[8],s=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],f=t[6],d=t[10],p=t[14],m=t[3],_=t[7],g=t[11],h=t[15];return m*(+s*c*f-r*l*f-s*a*d+i*l*d+r*a*p-i*c*p)+_*(+n*c*p-n*l*d+s*o*d-r*o*p+r*l*u-s*c*u)+g*(+n*l*f-n*a*p-s*o*f+i*o*p+s*a*u-i*l*u)+h*(-r*a*u-n*c*f+n*a*d+r*o*f-i*o*d+i*c*u)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=n,r[14]=i),this}invert(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=t[9],d=t[10],p=t[11],m=t[12],_=t[13],g=t[14],h=t[15],y=f*g*l-_*d*l+_*c*p-a*g*p-f*c*h+a*d*h,x=m*d*l-u*g*l-m*c*p+o*g*p+u*c*h-o*d*h,v=u*_*l-m*f*l+m*a*p-o*_*p-u*a*h+o*f*h,C=m*f*c-u*_*c-m*a*d+o*_*d+u*a*g-o*f*g,T=n*y+i*x+r*v+s*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return t[0]=y*A,t[1]=(_*d*s-f*g*s-_*r*p+i*g*p+f*r*h-i*d*h)*A,t[2]=(a*g*s-_*c*s+_*r*l-i*g*l-a*r*h+i*c*h)*A,t[3]=(f*c*s-a*d*s-f*r*l+i*d*l+a*r*p-i*c*p)*A,t[4]=x*A,t[5]=(u*g*s-m*d*s+m*r*p-n*g*p-u*r*h+n*d*h)*A,t[6]=(m*c*s-o*g*s-m*r*l+n*g*l+o*r*h-n*c*h)*A,t[7]=(o*d*s-u*c*s+u*r*l-n*d*l-o*r*p+n*c*p)*A,t[8]=v*A,t[9]=(m*f*s-u*_*s-m*i*p+n*_*p+u*i*h-n*f*h)*A,t[10]=(o*_*s-m*a*s+m*i*l-n*_*l-o*i*h+n*a*h)*A,t[11]=(u*a*s-o*f*s-u*i*l+n*f*l+o*i*p-n*a*p)*A,t[12]=C*A,t[13]=(u*_*r-m*f*r+m*i*d-n*_*d-u*i*g+n*f*g)*A,t[14]=(m*a*r-o*_*r-m*i*c+n*_*c+o*i*g-n*a*g)*A,t[15]=(o*f*r-u*a*r+u*i*c-n*f*c-o*i*d+n*a*d)*A,this}scale(t){const n=this.elements,i=t.x,r=t.y,s=t.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=t.x,a=t.y,c=t.z,l=s*o,u=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+i,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,r,s,o){return this.set(1,i,s,0,t,1,o,0,n,r,1,0,0,0,0,1),this}compose(t,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,c=n._w,l=s+s,u=o+o,f=a+a,d=s*l,p=s*u,m=s*f,_=o*u,g=o*f,h=a*f,y=c*l,x=c*u,v=c*f,C=i.x,T=i.y,A=i.z;return r[0]=(1-(_+h))*C,r[1]=(p+v)*C,r[2]=(m-x)*C,r[3]=0,r[4]=(p-v)*T,r[5]=(1-(d+h))*T,r[6]=(g+y)*T,r[7]=0,r[8]=(m+x)*A,r[9]=(g-y)*A,r[10]=(1-(d+_))*A,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,n,i){const r=this.elements;let s=ps.set(r[0],r[1],r[2]).length();const o=ps.set(r[4],r[5],r[6]).length(),a=ps.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Kn.copy(this);const l=1/s,u=1/o,f=1/a;return Kn.elements[0]*=l,Kn.elements[1]*=l,Kn.elements[2]*=l,Kn.elements[4]*=u,Kn.elements[5]*=u,Kn.elements[6]*=u,Kn.elements[8]*=f,Kn.elements[9]*=f,Kn.elements[10]*=f,n.setFromRotationMatrix(Kn),i.x=s,i.y=o,i.z=a,this}makePerspective(t,n,i,r,s,o,a=Ui){const c=this.elements,l=2*s/(n-t),u=2*s/(i-r),f=(n+t)/(n-t),d=(i+r)/(i-r);let p,m;if(a===Ui)p=-(o+s)/(o-s),m=-2*o*s/(o-s);else if(a===uc)p=-o/(o-s),m=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,r,s,o,a=Ui){const c=this.elements,l=1/(n-t),u=1/(i-r),f=1/(o-s),d=(n+t)*l,p=(i+r)*u;let m,_;if(a===Ui)m=(o+s)*f,_=-2*f;else if(a===uc)m=s*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const n=this.elements,i=t.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}}const ps=new O,Kn=new ne,J0=new O(0,0,0),Q0=new O(1,1,1),Ki=new O,Ma=new O,bn=new O,kd=new ne,Vd=new xi;class Xn{constructor(t=0,n=0,i=0,r=Xn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,r=this._order){return this._x=t,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],u=r[9],f=r[2],d=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(tn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-tn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(tn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-tn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(tn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-tn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return kd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(kd,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return Vd.setFromEuler(this),this.setFromQuaternion(Vd,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Xn.DEFAULT_ORDER="XYZ";class _m{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let tx=0;const $d=new O,ms=new xi,Ai=new ne,Ea=new O,mo=new O,ex=new O,nx=new xi,Hd=new O(1,0,0),Gd=new O(0,1,0),Wd=new O(0,0,1),Xd={type:"added"},ix={type:"removed"},gs={type:"childadded",child:null},ol={type:"childremoved",child:null};class en extends ro{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tx++}),this.uuid=Ni(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=en.DEFAULT_UP.clone();const t=new O,n=new Xn,i=new xi,r=new O(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ne},normalMatrix:{value:new Bt}}),this.matrix=new ne,this.matrixWorld=new ne,this.matrixAutoUpdate=en.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=en.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _m,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return ms.setFromAxisAngle(t,n),this.quaternion.multiply(ms),this}rotateOnWorldAxis(t,n){return ms.setFromAxisAngle(t,n),this.quaternion.premultiply(ms),this}rotateX(t){return this.rotateOnAxis(Hd,t)}rotateY(t){return this.rotateOnAxis(Gd,t)}rotateZ(t){return this.rotateOnAxis(Wd,t)}translateOnAxis(t,n){return $d.copy(t).applyQuaternion(this.quaternion),this.position.add($d.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(Hd,t)}translateY(t){return this.translateOnAxis(Gd,t)}translateZ(t){return this.translateOnAxis(Wd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ai.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?Ea.copy(t):Ea.set(t,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),mo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ai.lookAt(mo,Ea,this.up):Ai.lookAt(Ea,mo,this.up),this.quaternion.setFromRotationMatrix(Ai),r&&(Ai.extractRotation(r.matrixWorld),ms.setFromRotationMatrix(Ai),this.quaternion.premultiply(ms.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Xd),gs.child=t,this.dispatchEvent(gs),gs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(ix),ol.child=t,this.dispatchEvent(ol),ol.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ai.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ai.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ai),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Xd),gs.child=t,this.dispatchEvent(gs),gs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(t,n);if(o!==void 0)return o}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mo,t,ex),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mo,nx,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];s(t.shapes,f)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(t.materials,this.material[c]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(t.animations,c))}}if(n){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),f=o(t.shapes),d=o(t.skeletons),p=o(t.animations),m=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),m.length>0&&(i.nodes=m)}return i.object=r,i;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}en.DEFAULT_UP=new O(0,1,0);en.DEFAULT_MATRIX_AUTO_UPDATE=!0;en.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Jn=new O,Ci=new O,al=new O,Ri=new O,_s=new O,vs=new O,Yd=new O,cl=new O,ll=new O,ul=new O,fl=new pe,dl=new pe,hl=new pe;class ni{constructor(t=new O,n=new O,i=new O){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,r){r.subVectors(i,n),Jn.subVectors(t,n),r.cross(Jn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,n,i,r,s){Jn.subVectors(r,n),Ci.subVectors(i,n),al.subVectors(t,n);const o=Jn.dot(Jn),a=Jn.dot(Ci),c=Jn.dot(al),l=Ci.dot(Ci),u=Ci.dot(al),f=o*l-a*a;if(f===0)return s.set(0,0,0),null;const d=1/f,p=(l*c-a*u)*d,m=(o*u-a*c)*d;return s.set(1-p-m,m,p)}static containsPoint(t,n,i,r){return this.getBarycoord(t,n,i,r,Ri)===null?!1:Ri.x>=0&&Ri.y>=0&&Ri.x+Ri.y<=1}static getInterpolation(t,n,i,r,s,o,a,c){return this.getBarycoord(t,n,i,r,Ri)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Ri.x),c.addScaledVector(o,Ri.y),c.addScaledVector(a,Ri.z),c)}static getInterpolatedAttribute(t,n,i,r,s,o){return fl.setScalar(0),dl.setScalar(0),hl.setScalar(0),fl.fromBufferAttribute(t,n),dl.fromBufferAttribute(t,i),hl.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(fl,s.x),o.addScaledVector(dl,s.y),o.addScaledVector(hl,s.z),o}static isFrontFacing(t,n,i,r){return Jn.subVectors(i,n),Ci.subVectors(t,n),Jn.cross(Ci).dot(r)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,r){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,n,i,r){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Jn.subVectors(this.c,this.b),Ci.subVectors(this.a,this.b),Jn.cross(Ci).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ni.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return ni.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,r,s){return ni.getInterpolation(t,this.a,this.b,this.c,n,i,r,s)}containsPoint(t){return ni.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ni.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const i=this.a,r=this.b,s=this.c;let o,a;_s.subVectors(r,i),vs.subVectors(s,i),cl.subVectors(t,i);const c=_s.dot(cl),l=vs.dot(cl);if(c<=0&&l<=0)return n.copy(i);ll.subVectors(t,r);const u=_s.dot(ll),f=vs.dot(ll);if(u>=0&&f<=u)return n.copy(r);const d=c*f-u*l;if(d<=0&&c>=0&&u<=0)return o=c/(c-u),n.copy(i).addScaledVector(_s,o);ul.subVectors(t,s);const p=_s.dot(ul),m=vs.dot(ul);if(m>=0&&p<=m)return n.copy(s);const _=p*l-c*m;if(_<=0&&l>=0&&m<=0)return a=l/(l-m),n.copy(i).addScaledVector(vs,a);const g=u*m-p*f;if(g<=0&&f-u>=0&&p-m>=0)return Yd.subVectors(s,r),a=(f-u)/(f-u+(p-m)),n.copy(r).addScaledVector(Yd,a);const h=1/(g+_+d);return o=_*h,a=d*h,n.copy(i).addScaledVector(_s,o).addScaledVector(vs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const vm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ji={h:0,s:0,l:0},ba={h:0,s:0,l:0};function pl(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}class Xt{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=kn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.toWorkingColorSpace(this,n),this}setRGB(t,n,i,r=Qt.workingColorSpace){return this.r=t,this.g=n,this.b=i,Qt.toWorkingColorSpace(this,r),this}setHSL(t,n,i,r=Qt.workingColorSpace){if(t=Cf(t,1),n=tn(n,0,1),i=tn(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=pl(o,s,t+1/3),this.g=pl(o,s,t),this.b=pl(o,s,t-1/3)}return Qt.toWorkingColorSpace(this,r),this}setStyle(t,n=kn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=kn){const i=vm[t.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Oi(t.r),this.g=Oi(t.g),this.b=Oi(t.b),this}copyLinearToSRGB(t){return this.r=Ls(t.r),this.g=Ls(t.g),this.b=Ls(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=kn){return Qt.fromWorkingColorSpace(on.copy(this),t),Math.round(tn(on.r*255,0,255))*65536+Math.round(tn(on.g*255,0,255))*256+Math.round(tn(on.b*255,0,255))}getHexString(t=kn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Qt.workingColorSpace){Qt.fromWorkingColorSpace(on.copy(this),n);const i=on.r,r=on.g,s=on.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=u<=.5?f/(o+a):f/(2-o-a),o){case i:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-i)/f+2;break;case s:c=(i-r)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,n=Qt.workingColorSpace){return Qt.fromWorkingColorSpace(on.copy(this),n),t.r=on.r,t.g=on.g,t.b=on.b,t}getStyle(t=kn){Qt.fromWorkingColorSpace(on.copy(this),t);const n=on.r,i=on.g,r=on.b;return t!==kn?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,n,i){return this.getHSL(Ji),this.setHSL(Ji.h+t,Ji.s+n,Ji.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(Ji),t.getHSL(ba);const i=Do(Ji.h,ba.h,n),r=Do(Ji.s,ba.s,n),s=Do(Ji.l,ba.l,n);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const on=new Xt;Xt.NAMES=vm;let rx=0;class sa extends ro{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:rx++}),this.uuid=Ni(),this.name="",this.blending=Is,this.side=gr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ql,this.blendDst=tu,this.blendEquation=Nr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xt(0,0,0),this.blendAlpha=0,this.depthFunc=$s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Pd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ls,this.stencilZFail=ls,this.stencilZPass=ls,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const i=t[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Is&&(i.blending=this.blending),this.side!==gr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ql&&(i.blendSrc=this.blendSrc),this.blendDst!==tu&&(i.blendDst=this.blendDst),this.blendEquation!==Nr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==$s&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Pd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ls&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ls&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ls&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(n){const s=r(t.textures),o=r(t.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Rf extends sa{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xn,this.combine=em,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Be=new O,Ta=new re;class Wn{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=zu,this.updateRanges=[],this.gpuType=hi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=n.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Ta.fromBufferAttribute(this,n),Ta.applyMatrix3(t),this.setXY(n,Ta.x,Ta.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Be.fromBufferAttribute(this,n),Be.applyMatrix3(t),this.setXYZ(n,Be.x,Be.y,Be.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)Be.fromBufferAttribute(this,n),Be.applyMatrix4(t),this.setXYZ(n,Be.x,Be.y,Be.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)Be.fromBufferAttribute(this,n),Be.applyNormalMatrix(t),this.setXYZ(n,Be.x,Be.y,Be.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)Be.fromBufferAttribute(this,n),Be.transformDirection(t),this.setXYZ(n,Be.x,Be.y,Be.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=ei(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=ce(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=ei(n,this.array)),n}setX(t,n){return this.normalized&&(n=ce(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=ei(n,this.array)),n}setY(t,n){return this.normalized&&(n=ce(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=ei(n,this.array)),n}setZ(t,n){return this.normalized&&(n=ce(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=ei(n,this.array)),n}setW(t,n){return this.normalized&&(n=ce(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=ce(n,this.array),i=ce(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,r){return t*=this.itemSize,this.normalized&&(n=ce(n,this.array),i=ce(i,this.array),r=ce(r,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,n,i,r,s){return t*=this.itemSize,this.normalized&&(n=ce(n,this.array),i=ce(i,this.array),r=ce(r,this.array),s=ce(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==zu&&(t.usage=this.usage),t}}class xm extends Wn{constructor(t,n,i){super(new Uint16Array(t),n,i)}}class ym extends Wn{constructor(t,n,i){super(new Uint32Array(t),n,i)}}class Dn extends Wn{constructor(t,n,i){super(new Float32Array(t),n,i)}}let sx=0;const zn=new ne,ml=new en,xs=new O,Tn=new yi,go=new yi,Ze=new O;class Si extends ro{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sx++}),this.uuid=Ni(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(pm(t)?ym:xm)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Bt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return zn.makeRotationFromQuaternion(t),this.applyMatrix4(zn),this}rotateX(t){return zn.makeRotationX(t),this.applyMatrix4(zn),this}rotateY(t){return zn.makeRotationY(t),this.applyMatrix4(zn),this}rotateZ(t){return zn.makeRotationZ(t),this.applyMatrix4(zn),this}translate(t,n,i){return zn.makeTranslation(t,n,i),this.applyMatrix4(zn),this}scale(t,n,i){return zn.makeScale(t,n,i),this.applyMatrix4(zn),this}lookAt(t){return ml.lookAt(t),ml.updateMatrix(),this.applyMatrix4(ml.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xs).negate(),this.translate(xs.x,xs.y,xs.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Dn(i,3))}else{for(let i=0,r=n.count;i<r;i++){const s=t[i];n.setXYZ(i,s.x,s.y,s.z||0)}t.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yi);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Tn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ze.addVectors(this.boundingBox.min,Tn.min),this.boundingBox.expandByPoint(Ze),Ze.addVectors(this.boundingBox.max,Tn.max),this.boundingBox.expandByPoint(Ze)):(this.boundingBox.expandByPoint(Tn.min),this.boundingBox.expandByPoint(Tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new rs);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(t){const i=this.boundingSphere.center;if(Tn.setFromBufferAttribute(t),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];go.setFromBufferAttribute(a),this.morphTargetsRelative?(Ze.addVectors(Tn.min,go.min),Tn.expandByPoint(Ze),Ze.addVectors(Tn.max,go.max),Tn.expandByPoint(Ze)):(Tn.expandByPoint(go.min),Tn.expandByPoint(go.max))}Tn.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)Ze.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(Ze));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ze.fromBufferAttribute(a,l),c&&(xs.fromBufferAttribute(t,l),Ze.add(xs)),r=Math.max(r,i.distanceToSquared(Ze))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Wn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<i.count;P++)a[P]=new O,c[P]=new O;const l=new O,u=new O,f=new O,d=new re,p=new re,m=new re,_=new O,g=new O;function h(P,b,M){l.fromBufferAttribute(i,P),u.fromBufferAttribute(i,b),f.fromBufferAttribute(i,M),d.fromBufferAttribute(s,P),p.fromBufferAttribute(s,b),m.fromBufferAttribute(s,M),u.sub(l),f.sub(l),p.sub(d),m.sub(d);const I=1/(p.x*m.y-m.x*p.y);isFinite(I)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(f,-p.y).multiplyScalar(I),g.copy(f).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(I),a[P].add(_),a[b].add(_),a[M].add(_),c[P].add(g),c[b].add(g),c[M].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let P=0,b=y.length;P<b;++P){const M=y[P],I=M.start,V=M.count;for(let F=I,H=I+V;F<H;F+=3)h(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const x=new O,v=new O,C=new O,T=new O;function A(P){C.fromBufferAttribute(r,P),T.copy(C);const b=a[P];x.copy(b),x.sub(C.multiplyScalar(C.dot(b))).normalize(),v.crossVectors(T,b);const I=v.dot(c[P])<0?-1:1;o.setXYZW(P,x.x,x.y,x.z,I)}for(let P=0,b=y.length;P<b;++P){const M=y[P],I=M.start,V=M.count;for(let F=I,H=I+V;F<H;F+=3)A(t.getX(F+0)),A(t.getX(F+1)),A(t.getX(F+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Wn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new O,s=new O,o=new O,a=new O,c=new O,l=new O,u=new O,f=new O;if(t)for(let d=0,p=t.count;d<p;d+=3){const m=t.getX(d+0),_=t.getX(d+1),g=t.getX(d+2);r.fromBufferAttribute(n,m),s.fromBufferAttribute(n,_),o.fromBufferAttribute(n,g),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(i,m),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,g),a.add(u),c.add(u),l.add(u),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,p=n.count;d<p;d+=3)r.fromBufferAttribute(n,d+0),s.fromBufferAttribute(n,d+1),o.fromBufferAttribute(n,d+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)Ze.fromBufferAttribute(t,n),Ze.normalize(),t.setXYZ(n,Ze.x,Ze.y,Ze.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,f=a.normalized,d=new l.constructor(c.length*u);let p=0,m=0;for(let _=0,g=c.length;_<g;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*u;for(let h=0;h<u;h++)d[m++]=l[p++]}return new Wn(d,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Si,i=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=t(c,i);n.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let u=0,f=l.length;u<f;u++){const d=l[u],p=t(d,i);c.push(p)}n.morphAttributes[a]=c}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];n.addGroup(l.start,l.count,l.materialIndex)}return n}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,d=l.length;f<d;f++){const p=l[f];u.push(p.toJSON(t.data))}u.length>0&&(r[c]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(n));const r=t.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(n))}const s=t.morphAttributes;for(const l in s){const u=[],f=s[l];for(let d=0,p=f.length;d<p;d++)u.push(f[d].clone(n));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Zd=new ne,Tr=new K0,wa=new rs,qd=new O,Aa=new O,Ca=new O,Ra=new O,gl=new O,Pa=new O,jd=new O,Ia=new O;class Vn extends en{constructor(t=new Si,n=new Rf){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){Pa.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=a[c],f=s[c];u!==0&&(gl.fromBufferAttribute(f,t),o?Pa.addScaledVector(gl,u):Pa.addScaledVector(gl.sub(n),u))}n.add(Pa)}return n}raycast(t,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),wa.copy(i.boundingSphere),wa.applyMatrix4(s),Tr.copy(t.ray).recast(t.near),!(wa.containsPoint(Tr.origin)===!1&&(Tr.intersectSphere(wa,qd)===null||Tr.origin.distanceToSquared(qd)>(t.far-t.near)**2))&&(Zd.copy(s).invert(),Tr.copy(t.ray).applyMatrix4(Zd),!(i.boundingBox!==null&&Tr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,Tr)))}_computeIntersections(t,n,i){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){const g=d[m],h=o[g.materialIndex],y=Math.max(g.start,p.start),x=Math.min(a.count,Math.min(g.start+g.count,p.start+p.count));for(let v=y,C=x;v<C;v+=3){const T=a.getX(v),A=a.getX(v+1),P=a.getX(v+2);r=Da(this,h,t,i,l,u,f,T,A,P),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const m=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let g=m,h=_;g<h;g+=3){const y=a.getX(g),x=a.getX(g+1),v=a.getX(g+2);r=Da(this,o,t,i,l,u,f,y,x,v),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){const g=d[m],h=o[g.materialIndex],y=Math.max(g.start,p.start),x=Math.min(c.count,Math.min(g.start+g.count,p.start+p.count));for(let v=y,C=x;v<C;v+=3){const T=v,A=v+1,P=v+2;r=Da(this,h,t,i,l,u,f,T,A,P),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const m=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let g=m,h=_;g<h;g+=3){const y=g,x=g+1,v=g+2;r=Da(this,o,t,i,l,u,f,y,x,v),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function ox(e,t,n,i,r,s,o,a){let c;if(t.side===gn?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,t.side===gr,a),c===null)return null;Ia.copy(a),Ia.applyMatrix4(e.matrixWorld);const l=n.ray.origin.distanceTo(Ia);return l<n.near||l>n.far?null:{distance:l,point:Ia.clone(),object:e}}function Da(e,t,n,i,r,s,o,a,c,l){e.getVertexPosition(a,Aa),e.getVertexPosition(c,Ca),e.getVertexPosition(l,Ra);const u=ox(e,t,n,i,Aa,Ca,Ra,jd);if(u){const f=new O;ni.getBarycoord(jd,Aa,Ca,Ra,f),r&&(u.uv=ni.getInterpolatedAttribute(r,a,c,l,f,new re)),s&&(u.uv1=ni.getInterpolatedAttribute(s,a,c,l,f,new re)),o&&(u.normal=ni.getInterpolatedAttribute(o,a,c,l,f,new O),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new O,materialIndex:0};ni.getNormal(Aa,Ca,Ra,d.normal),u.face=d,u.barycoord=f}return u}class so extends Si{constructor(t=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],u=[],f=[];let d=0,p=0;m("z","y","x",-1,-1,i,n,t,o,s,0),m("z","y","x",1,-1,i,n,-t,o,s,1),m("x","z","y",1,1,t,i,n,r,o,2),m("x","z","y",1,-1,t,i,-n,r,o,3),m("x","y","z",1,-1,t,n,i,r,s,4),m("x","y","z",-1,-1,t,n,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Dn(l,3)),this.setAttribute("normal",new Dn(u,3)),this.setAttribute("uv",new Dn(f,2));function m(_,g,h,y,x,v,C,T,A,P,b){const M=v/A,I=C/P,V=v/2,F=C/2,H=T/2,Z=A+1,$=P+1;let J=0,G=0;const rt=new O;for(let lt=0;lt<$;lt++){const _t=lt*I-F;for(let kt=0;kt<Z;kt++){const Gt=kt*M-V;rt[_]=Gt*y,rt[g]=_t*x,rt[h]=H,l.push(rt.x,rt.y,rt.z),rt[_]=0,rt[g]=0,rt[h]=T>0?1:-1,u.push(rt.x,rt.y,rt.z),f.push(kt/A),f.push(1-lt/P),J+=1}}for(let lt=0;lt<P;lt++)for(let _t=0;_t<A;_t++){const kt=d+_t+Z*lt,Gt=d+_t+Z*(lt+1),X=d+(_t+1)+Z*(lt+1),nt=d+(_t+1)+Z*lt;c.push(kt,Gt,nt),c.push(Gt,X,nt),G+=6}a.addGroup(p,G,b),p+=G,d+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new so(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ys(e){const t={};for(const n in e){t[n]={};for(const i in e[n]){const r=e[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=r.clone():Array.isArray(r)?t[n][i]=r.slice():t[n][i]=r}}return t}function un(e){const t={};for(let n=0;n<e.length;n++){const i=Ys(e[n]);for(const r in i)t[r]=i[r]}return t}function ax(e){const t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Sm(e){const t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}const Pf={clone:Ys,merge:un};var cx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,lx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vi extends sa{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cx,this.fragmentShader=lx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ys(t.uniforms),this.uniformsGroups=ax(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Mm extends en{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ne,this.projectionMatrix=new ne,this.projectionMatrixInverse=new ne,this.coordinateSystem=Ui}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Qi=new O,Kd=new re,Jd=new re;class pn extends Mm{constructor(t=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=$o*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Io*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return $o*2*Math.atan(Math.tan(Io*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){Qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qi.x,Qi.y).multiplyScalar(-t/Qi.z),Qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Qi.x,Qi.y).multiplyScalar(-t/Qi.z)}getViewSize(t,n){return this.getViewBounds(t,Kd,Jd),n.subVectors(Jd,Kd)}setViewOffset(t,n,i,r,s,o){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(Io*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,n-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const ys=-90,Ss=1;class ux extends en{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new pn(ys,Ss,t,n);r.layers=this.layers,this.add(r);const s=new pn(ys,Ss,t,n);s.layers=this.layers,this.add(s);const o=new pn(ys,Ss,t,n);o.layers=this.layers,this.add(o);const a=new pn(ys,Ss,t,n);a.layers=this.layers,this.add(a);const c=new pn(ys,Ss,t,n);c.layers=this.layers,this.add(c);const l=new pn(ys,Ss,t,n);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,c]=n;for(const l of n)this.remove(l);if(t===Ui)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===uc)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of n)this.add(l),l.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,u]=this.children,f=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(n,s),t.setRenderTarget(i,1,r),t.render(n,o),t.setRenderTarget(i,2,r),t.render(n,a),t.setRenderTarget(i,3,r),t.render(n,c),t.setRenderTarget(i,4,r),t.render(n,l),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,r),t.render(n,u),t.setRenderTarget(f,d,p),t.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class Em extends dn{constructor(t,n,i,r,s,o,a,c,l,u){t=t!==void 0?t:[],n=n!==void 0?n:Hs,super(t,n,i,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class fx extends Jr{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new Em(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:di}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new so(5,5,5),s=new Vi({name:"CubemapFromEquirect",uniforms:Ys(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:gn,blending:fr});s.uniforms.tEquirect.value=n;const o=new Vn(r,s),a=n.minFilter;return n.minFilter===Br&&(n.minFilter=di),new ux(1,10,this).update(t,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,n,i,r){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(n,i,r);t.setRenderTarget(s)}}const _l=new O,dx=new O,hx=new Bt;class Dr{constructor(t=new O(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,r){return this.normal.set(t,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){const r=_l.subVectors(i,n).cross(dx.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const i=t.delta(_l),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const i=n||hx.getNormalMatrix(t),r=this.coplanarPoint(_l).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const wr=new rs,La=new O;class If{constructor(t=new Dr,n=new Dr,i=new Dr,r=new Dr,s=new Dr,o=new Dr){this.planes=[t,n,i,r,s,o]}set(t,n,i,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=Ui){const i=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],c=r[3],l=r[4],u=r[5],f=r[6],d=r[7],p=r[8],m=r[9],_=r[10],g=r[11],h=r[12],y=r[13],x=r[14],v=r[15];if(i[0].setComponents(c-s,d-l,g-p,v-h).normalize(),i[1].setComponents(c+s,d+l,g+p,v+h).normalize(),i[2].setComponents(c+o,d+u,g+m,v+y).normalize(),i[3].setComponents(c-o,d-u,g-m,v-y).normalize(),i[4].setComponents(c-a,d-f,g-_,v-x).normalize(),n===Ui)i[5].setComponents(c+a,d+f,g+_,v+x).normalize();else if(n===uc)i[5].setComponents(a,f,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),wr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),wr.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(wr)}intersectsSprite(t){return wr.center.set(0,0,0),wr.radius=.7071067811865476,wr.applyMatrix4(t.matrixWorld),this.intersectsSphere(wr)}intersectsSphere(t){const n=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(La.x=r.normal.x>0?t.max.x:t.min.x,La.y=r.normal.y>0?t.max.y:t.min.y,La.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(La)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function bm(){let e=null,t=!1,n=null,i=null;function r(s,o){n(s,o),i=e.requestAnimationFrame(r)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(r),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){n=s},setContext:function(s){e=s}}}function px(e){const t=new WeakMap;function n(a,c){const l=a.array,u=a.usage,f=l.byteLength,d=e.createBuffer();e.bindBuffer(c,d),e.bufferData(c,l,u),a.onUploadCallback();let p;if(l instanceof Float32Array)p=e.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=e.HALF_FLOAT:p=e.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=e.SHORT;else if(l instanceof Uint32Array)p=e.UNSIGNED_INT;else if(l instanceof Int32Array)p=e.INT;else if(l instanceof Int8Array)p=e.BYTE;else if(l instanceof Uint8Array)p=e.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,c,l){const u=c.array,f=c.updateRanges;if(e.bindBuffer(l,a),f.length===0)e.bufferSubData(l,0,u);else{f.sort((p,m)=>p.start-m.start);let d=0;for(let p=1;p<f.length;p++){const m=f[d],_=f[p];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,f[d]=_)}f.length=d+1;for(let p=0,m=f.length;p<m;p++){const _=f[p];e.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(e.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,n(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}class Fc extends Si{constructor(t=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:r};const s=t/2,o=n/2,a=Math.floor(i),c=Math.floor(r),l=a+1,u=c+1,f=t/a,d=n/c,p=[],m=[],_=[],g=[];for(let h=0;h<u;h++){const y=h*d-o;for(let x=0;x<l;x++){const v=x*f-s;m.push(v,-y,0),_.push(0,0,1),g.push(x/a),g.push(1-h/c)}}for(let h=0;h<c;h++)for(let y=0;y<a;y++){const x=y+l*h,v=y+l*(h+1),C=y+1+l*(h+1),T=y+1+l*h;p.push(x,v,T),p.push(v,C,T)}this.setIndex(p),this.setAttribute("position",new Dn(m,3)),this.setAttribute("normal",new Dn(_,3)),this.setAttribute("uv",new Dn(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fc(t.width,t.height,t.widthSegments,t.heightSegments)}}var mx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gx=`#ifdef USE_ALPHAHASH
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
#endif`,_x=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,vx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,yx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Sx=`#ifdef USE_AOMAP
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
#endif`,Mx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ex=`#ifdef USE_BATCHING
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
#endif`,bx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Tx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ax=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Cx=`#ifdef USE_IRIDESCENCE
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
#endif`,Rx=`#ifdef USE_BUMPMAP
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
#endif`,Px=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ix=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Dx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ux=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Nx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ox=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Fx=`#if defined( USE_COLOR_ALPHA )
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
#endif`,zx=`#define PI 3.141592653589793
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
} // validated`,Bx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,kx=`vec3 transformedNormal = objectNormal;
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
#endif`,Vx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$x=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Gx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Wx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Xx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Yx=`#ifdef USE_ENVMAP
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
#endif`,Zx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,qx=`#ifdef USE_ENVMAP
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
#endif`,jx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Kx=`#ifdef USE_ENVMAP
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
#endif`,Jx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Qx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ty=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ey=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ny=`#ifdef USE_GRADIENTMAP
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
}`,iy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ry=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,oy=`uniform bool receiveShadow;
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
#endif`,ay=`#ifdef USE_ENVMAP
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
#endif`,cy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ly=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,uy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,dy=`PhysicalMaterial material;
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
#endif`,hy=`struct PhysicalMaterial {
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
}`,py=`
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
#endif`,my=`#if defined( RE_IndirectDiffuse )
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
#endif`,gy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_y=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vy=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xy=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yy=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,My=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ey=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,by=`#if defined( USE_POINTS_UV )
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
#endif`,Ty=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ay=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Cy=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ry=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Py=`#ifdef USE_MORPHTARGETS
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
#endif`,Iy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ly=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Uy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ny=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Oy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Fy=`#ifdef USE_NORMALMAP
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
#endif`,zy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,By=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ky=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$y=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hy=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Gy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Wy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Xy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Yy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Zy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ky=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Qy=`float getShadowMask() {
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
}`,tS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,eS=`#ifdef USE_SKINNING
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
#endif`,nS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,iS=`#ifdef USE_SKINNING
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
#endif`,rS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,oS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,aS=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,cS=`#ifdef USE_TRANSMISSION
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
#endif`,lS=`#ifdef USE_TRANSMISSION
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
#endif`,uS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const pS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mS=`uniform sampler2D t2D;
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
}`,gS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_S=`#ifdef ENVMAP_TYPE_CUBE
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
}`,vS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yS=`#include <common>
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
}`,SS=`#if DEPTH_PACKING == 3200
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
}`,MS=`#define DISTANCE
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
}`,ES=`#define DISTANCE
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
}`,bS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,TS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wS=`uniform float scale;
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
}`,AS=`uniform vec3 diffuse;
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
}`,CS=`#include <common>
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
}`,RS=`uniform vec3 diffuse;
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
}`,PS=`#define LAMBERT
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
}`,IS=`#define LAMBERT
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
}`,DS=`#define MATCAP
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
}`,LS=`#define MATCAP
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
}`,US=`#define NORMAL
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
}`,NS=`#define NORMAL
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
}`,OS=`#define PHONG
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
}`,FS=`#define PHONG
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
}`,zS=`#define STANDARD
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
}`,BS=`#define STANDARD
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
}`,kS=`#define TOON
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
}`,VS=`#define TOON
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
}`,$S=`uniform float size;
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
}`,HS=`uniform vec3 diffuse;
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
}`,GS=`#include <common>
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
}`,WS=`uniform vec3 color;
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
}`,XS=`uniform float rotation;
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
}`,YS=`uniform vec3 diffuse;
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
}`,$t={alphahash_fragment:mx,alphahash_pars_fragment:gx,alphamap_fragment:_x,alphamap_pars_fragment:vx,alphatest_fragment:xx,alphatest_pars_fragment:yx,aomap_fragment:Sx,aomap_pars_fragment:Mx,batching_pars_vertex:Ex,batching_vertex:bx,begin_vertex:Tx,beginnormal_vertex:wx,bsdfs:Ax,iridescence_fragment:Cx,bumpmap_pars_fragment:Rx,clipping_planes_fragment:Px,clipping_planes_pars_fragment:Ix,clipping_planes_pars_vertex:Dx,clipping_planes_vertex:Lx,color_fragment:Ux,color_pars_fragment:Nx,color_pars_vertex:Ox,color_vertex:Fx,common:zx,cube_uv_reflection_fragment:Bx,defaultnormal_vertex:kx,displacementmap_pars_vertex:Vx,displacementmap_vertex:$x,emissivemap_fragment:Hx,emissivemap_pars_fragment:Gx,colorspace_fragment:Wx,colorspace_pars_fragment:Xx,envmap_fragment:Yx,envmap_common_pars_fragment:Zx,envmap_pars_fragment:qx,envmap_pars_vertex:jx,envmap_physical_pars_fragment:ay,envmap_vertex:Kx,fog_vertex:Jx,fog_pars_vertex:Qx,fog_fragment:ty,fog_pars_fragment:ey,gradientmap_pars_fragment:ny,lightmap_pars_fragment:iy,lights_lambert_fragment:ry,lights_lambert_pars_fragment:sy,lights_pars_begin:oy,lights_toon_fragment:cy,lights_toon_pars_fragment:ly,lights_phong_fragment:uy,lights_phong_pars_fragment:fy,lights_physical_fragment:dy,lights_physical_pars_fragment:hy,lights_fragment_begin:py,lights_fragment_maps:my,lights_fragment_end:gy,logdepthbuf_fragment:_y,logdepthbuf_pars_fragment:vy,logdepthbuf_pars_vertex:xy,logdepthbuf_vertex:yy,map_fragment:Sy,map_pars_fragment:My,map_particle_fragment:Ey,map_particle_pars_fragment:by,metalnessmap_fragment:Ty,metalnessmap_pars_fragment:wy,morphinstance_vertex:Ay,morphcolor_vertex:Cy,morphnormal_vertex:Ry,morphtarget_pars_vertex:Py,morphtarget_vertex:Iy,normal_fragment_begin:Dy,normal_fragment_maps:Ly,normal_pars_fragment:Uy,normal_pars_vertex:Ny,normal_vertex:Oy,normalmap_pars_fragment:Fy,clearcoat_normal_fragment_begin:zy,clearcoat_normal_fragment_maps:By,clearcoat_pars_fragment:ky,iridescence_pars_fragment:Vy,opaque_fragment:$y,packing:Hy,premultiplied_alpha_fragment:Gy,project_vertex:Wy,dithering_fragment:Xy,dithering_pars_fragment:Yy,roughnessmap_fragment:Zy,roughnessmap_pars_fragment:qy,shadowmap_pars_fragment:jy,shadowmap_pars_vertex:Ky,shadowmap_vertex:Jy,shadowmask_pars_fragment:Qy,skinbase_vertex:tS,skinning_pars_vertex:eS,skinning_vertex:nS,skinnormal_vertex:iS,specularmap_fragment:rS,specularmap_pars_fragment:sS,tonemapping_fragment:oS,tonemapping_pars_fragment:aS,transmission_fragment:cS,transmission_pars_fragment:lS,uv_pars_fragment:uS,uv_pars_vertex:fS,uv_vertex:dS,worldpos_vertex:hS,background_vert:pS,background_frag:mS,backgroundCube_vert:gS,backgroundCube_frag:_S,cube_vert:vS,cube_frag:xS,depth_vert:yS,depth_frag:SS,distanceRGBA_vert:MS,distanceRGBA_frag:ES,equirect_vert:bS,equirect_frag:TS,linedashed_vert:wS,linedashed_frag:AS,meshbasic_vert:CS,meshbasic_frag:RS,meshlambert_vert:PS,meshlambert_frag:IS,meshmatcap_vert:DS,meshmatcap_frag:LS,meshnormal_vert:US,meshnormal_frag:NS,meshphong_vert:OS,meshphong_frag:FS,meshphysical_vert:zS,meshphysical_frag:BS,meshtoon_vert:kS,meshtoon_frag:VS,points_vert:$S,points_frag:HS,shadow_vert:GS,shadow_frag:WS,sprite_vert:XS,sprite_frag:YS},it={common:{diffuse:{value:new Xt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new Xt(16777215)},opacity:{value:1},center:{value:new re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},mn={basic:{uniforms:un([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:un([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.fog,it.lights,{emissive:{value:new Xt(0)}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:un([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.fog,it.lights,{emissive:{value:new Xt(0)},specular:{value:new Xt(1118481)},shininess:{value:30}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:un([it.common,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.roughnessmap,it.metalnessmap,it.fog,it.lights,{emissive:{value:new Xt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:un([it.common,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.gradientmap,it.fog,it.lights,{emissive:{value:new Xt(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:un([it.common,it.bumpmap,it.normalmap,it.displacementmap,it.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:un([it.points,it.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:un([it.common,it.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:un([it.common,it.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:un([it.common,it.bumpmap,it.normalmap,it.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:un([it.sprite,it.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distanceRGBA:{uniforms:un([it.common,it.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distanceRGBA_vert,fragmentShader:$t.distanceRGBA_frag},shadow:{uniforms:un([it.lights,it.fog,{color:{value:new Xt(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};mn.physical={uniforms:un([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new Xt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new Xt(0)},specularColor:{value:new Xt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};const Ua={r:0,b:0,g:0},Ar=new Xn,ZS=new ne;function qS(e,t,n,i,r,s,o){const a=new Xt(0);let c=s===!0?0:1,l,u,f=null,d=0,p=null;function m(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?n:t).get(x)),x}function _(y){let x=!1;const v=m(y);v===null?h(a,c):v&&v.isColor&&(h(v,1),x=!0);const C=e.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(e.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function g(y,x){const v=m(x);v&&(v.isCubeTexture||v.mapping===Nc)?(u===void 0&&(u=new Vn(new so(1,1,1),new Vi({name:"BackgroundCubeMaterial",uniforms:Ys(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Ar.copy(x.backgroundRotation),Ar.x*=-1,Ar.y*=-1,Ar.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ar.y*=-1,Ar.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(ZS.makeRotationFromEuler(Ar)),u.material.toneMapped=Qt.getTransfer(v.colorSpace)!==ue,(f!==v||d!==v.version||p!==e.toneMapping)&&(u.material.needsUpdate=!0,f=v,d=v.version,p=e.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Vn(new Fc(2,2),new Vi({name:"BackgroundMaterial",uniforms:Ys(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:gr,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=Qt.getTransfer(v.colorSpace)!==ue,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(f!==v||d!==v.version||p!==e.toneMapping)&&(l.material.needsUpdate=!0,f=v,d=v.version,p=e.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function h(y,x){y.getRGB(Ua,Sm(e)),i.buffers.color.setClear(Ua.r,Ua.g,Ua.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(y,x=1){a.set(y),c=x,h(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,h(a,c)},render:_,addToRenderList:g}}function jS(e,t){const n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,o=!1;function a(M,I,V,F,H){let Z=!1;const $=f(F,V,I);s!==$&&(s=$,l(s.object)),Z=p(M,F,V,H),Z&&m(M,F,V,H),H!==null&&t.update(H,e.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,v(M,I,V,F),H!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function c(){return e.createVertexArray()}function l(M){return e.bindVertexArray(M)}function u(M){return e.deleteVertexArray(M)}function f(M,I,V){const F=V.wireframe===!0;let H=i[M.id];H===void 0&&(H={},i[M.id]=H);let Z=H[I.id];Z===void 0&&(Z={},H[I.id]=Z);let $=Z[F];return $===void 0&&($=d(c()),Z[F]=$),$}function d(M){const I=[],V=[],F=[];for(let H=0;H<n;H++)I[H]=0,V[H]=0,F[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:V,attributeDivisors:F,object:M,attributes:{},index:null}}function p(M,I,V,F){const H=s.attributes,Z=I.attributes;let $=0;const J=V.getAttributes();for(const G in J)if(J[G].location>=0){const lt=H[G];let _t=Z[G];if(_t===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(_t=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(_t=M.instanceColor)),lt===void 0||lt.attribute!==_t||_t&&lt.data!==_t.data)return!0;$++}return s.attributesNum!==$||s.index!==F}function m(M,I,V,F){const H={},Z=I.attributes;let $=0;const J=V.getAttributes();for(const G in J)if(J[G].location>=0){let lt=Z[G];lt===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(lt=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(lt=M.instanceColor));const _t={};_t.attribute=lt,lt&&lt.data&&(_t.data=lt.data),H[G]=_t,$++}s.attributes=H,s.attributesNum=$,s.index=F}function _(){const M=s.newAttributes;for(let I=0,V=M.length;I<V;I++)M[I]=0}function g(M){h(M,0)}function h(M,I){const V=s.newAttributes,F=s.enabledAttributes,H=s.attributeDivisors;V[M]=1,F[M]===0&&(e.enableVertexAttribArray(M),F[M]=1),H[M]!==I&&(e.vertexAttribDivisor(M,I),H[M]=I)}function y(){const M=s.newAttributes,I=s.enabledAttributes;for(let V=0,F=I.length;V<F;V++)I[V]!==M[V]&&(e.disableVertexAttribArray(V),I[V]=0)}function x(M,I,V,F,H,Z,$){$===!0?e.vertexAttribIPointer(M,I,V,H,Z):e.vertexAttribPointer(M,I,V,F,H,Z)}function v(M,I,V,F){_();const H=F.attributes,Z=V.getAttributes(),$=I.defaultAttributeValues;for(const J in Z){const G=Z[J];if(G.location>=0){let rt=H[J];if(rt===void 0&&(J==="instanceMatrix"&&M.instanceMatrix&&(rt=M.instanceMatrix),J==="instanceColor"&&M.instanceColor&&(rt=M.instanceColor)),rt!==void 0){const lt=rt.normalized,_t=rt.itemSize,kt=t.get(rt);if(kt===void 0)continue;const Gt=kt.buffer,X=kt.type,nt=kt.bytesPerElement,Mt=X===e.INT||X===e.UNSIGNED_INT||rt.gpuType===Sf;if(rt.isInterleavedBufferAttribute){const ot=rt.data,It=ot.stride,Ot=rt.offset;if(ot.isInstancedInterleavedBuffer){for(let Wt=0;Wt<G.locationSize;Wt++)h(G.location+Wt,ot.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Wt=0;Wt<G.locationSize;Wt++)g(G.location+Wt);e.bindBuffer(e.ARRAY_BUFFER,Gt);for(let Wt=0;Wt<G.locationSize;Wt++)x(G.location+Wt,_t/G.locationSize,X,lt,It*nt,(Ot+_t/G.locationSize*Wt)*nt,Mt)}else{if(rt.isInstancedBufferAttribute){for(let ot=0;ot<G.locationSize;ot++)h(G.location+ot,rt.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let ot=0;ot<G.locationSize;ot++)g(G.location+ot);e.bindBuffer(e.ARRAY_BUFFER,Gt);for(let ot=0;ot<G.locationSize;ot++)x(G.location+ot,_t/G.locationSize,X,lt,_t*nt,_t/G.locationSize*ot*nt,Mt)}}else if($!==void 0){const lt=$[J];if(lt!==void 0)switch(lt.length){case 2:e.vertexAttrib2fv(G.location,lt);break;case 3:e.vertexAttrib3fv(G.location,lt);break;case 4:e.vertexAttrib4fv(G.location,lt);break;default:e.vertexAttrib1fv(G.location,lt)}}}}y()}function C(){P();for(const M in i){const I=i[M];for(const V in I){const F=I[V];for(const H in F)u(F[H].object),delete F[H];delete I[V]}delete i[M]}}function T(M){if(i[M.id]===void 0)return;const I=i[M.id];for(const V in I){const F=I[V];for(const H in F)u(F[H].object),delete F[H];delete I[V]}delete i[M.id]}function A(M){for(const I in i){const V=i[I];if(V[M.id]===void 0)continue;const F=V[M.id];for(const H in F)u(F[H].object),delete F[H];delete V[M.id]}}function P(){b(),o=!0,s!==r&&(s=r,l(s.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:P,resetDefaultState:b,dispose:C,releaseStatesOfGeometry:T,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:g,disableUnusedAttributes:y}}function KS(e,t,n){let i;function r(l){i=l}function s(l,u){e.drawArrays(i,l,u),n.update(u,i,1)}function o(l,u,f){f!==0&&(e.drawArraysInstanced(i,l,u,f),n.update(u,i,f))}function a(l,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,f);let p=0;for(let m=0;m<f;m++)p+=u[m];n.update(p,i,1)}function c(l,u,f,d){if(f===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<l.length;m++)o(l[m],u[m],d[m]);else{p.multiDrawArraysInstancedWEBGL(i,l,0,u,0,d,0,f);let m=0;for(let _=0;_<f;_++)m+=u[_]*d[_];n.update(m,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function JS(e,t,n,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");r=e.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==ii&&i.convert(A)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const P=A===ra&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==ki&&i.convert(A)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==hi&&!P)}function c(A){if(A==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=n.precision!==void 0?n.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=n.logarithmicDepthBuffer===!0,d=n.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),h=e.getParameter(e.MAX_VERTEX_ATTRIBS),y=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),x=e.getParameter(e.MAX_VARYING_VECTORS),v=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),C=m>0,T=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:h,maxVertexUniforms:y,maxVaryings:x,maxFragmentUniforms:v,vertexTextures:C,maxSamples:T}}function QS(e){const t=this;let n=null,i=0,r=!1,s=!1;const o=new Dr,a=new Bt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||i!==0||r;return r=d,i=f.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){n=u(f,d,0)},this.setState=function(f,d,p){const m=f.clippingPlanes,_=f.clipIntersection,g=f.clipShadows,h=e.get(f);if(!r||m===null||m.length===0||s&&!g)s?u(null):l();else{const y=s?0:i,x=y*4;let v=h.clippingState||null;c.value=v,v=u(m,d,x,p);for(let C=0;C!==x;++C)v[C]=n[C];h.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,d,p,m){const _=f!==null?f.length:0;let g=null;if(_!==0){if(g=c.value,m!==!0||g===null){const h=p+_*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(g===null||g.length<h)&&(g=new Float32Array(h));for(let x=0,v=p;x!==_;++x,v+=4)o.copy(f[x]).applyMatrix4(y,a),o.normal.toArray(g,v),g[v+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function tM(e){let t=new WeakMap;function n(o,a){return a===cu?o.mapping=Hs:a===lu&&(o.mapping=Gs),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===cu||a===lu)if(t.has(o)){const c=t.get(o).texture;return n(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new fx(c.height);return l.fromEquirectangularTexture(e,o),t.set(o,l),o.addEventListener("dispose",r),n(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}class oa extends Mm{constructor(t=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,o=i+t,a=r+n,c=r-n;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const As=4,Qd=[.125,.215,.35,.446,.526,.582],Or=20,vl=new oa,th=new Xt;let xl=null,yl=0,Sl=0,Ml=!1;const Lr=(1+Math.sqrt(5))/2,Ms=1/Lr,eh=[new O(-Lr,Ms,0),new O(Lr,Ms,0),new O(-Ms,0,Lr),new O(Ms,0,Lr),new O(0,Lr,-Ms),new O(0,Lr,Ms),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)];class nh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,i=.1,r=100){xl=this._renderer.getRenderTarget(),yl=this._renderer.getActiveCubeFace(),Sl=this._renderer.getActiveMipmapLevel(),Ml=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(xl,yl,Sl),this._renderer.xr.enabled=Ml,t.scissorTest=!1,Na(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Hs||t.mapping===Gs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),xl=this._renderer.getRenderTarget(),yl=this._renderer.getActiveCubeFace(),Sl=this._renderer.getActiveMipmapLevel(),Ml=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:di,minFilter:di,generateMipmaps:!1,type:ra,format:ii,colorSpace:io,depthBuffer:!1},r=ih(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ih(t,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=eM(s)),this._blurMaterial=nM(s,t,n)}return r}_compileMaterial(t){const n=new Vn(this._lodPlanes[0],t);this._renderer.compile(n,vl)}_sceneToCubeUV(t,n,i,r){const a=new pn(90,1,n,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(th),u.toneMapping=dr,u.autoClear=!1;const p=new Rf({name:"PMREM.Background",side:gn,depthWrite:!1,depthTest:!1}),m=new Vn(new so,p);let _=!1;const g=t.background;g?g.isColor&&(p.color.copy(g),t.background=null,_=!0):(p.color.copy(th),_=!0);for(let h=0;h<6;h++){const y=h%3;y===0?(a.up.set(0,c[h],0),a.lookAt(l[h],0,0)):y===1?(a.up.set(0,0,c[h]),a.lookAt(0,l[h],0)):(a.up.set(0,c[h],0),a.lookAt(0,0,l[h]));const x=this._cubeSize;Na(r,y*x,h>2?x:0,x,x),u.setRenderTarget(r),_&&u.render(m,a),u.render(t,a)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=g}_textureToCubeUV(t,n){const i=this._renderer,r=t.mapping===Hs||t.mapping===Gs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=sh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rh());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Vn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const c=this._cubeSize;Na(n,0,0,3*c,2*c),i.setRenderTarget(n),i.render(o,vl)}_applyPMREM(t){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=eh[(r-s-1)%eh.length];this._blur(t,s-1,s,o,a)}n.autoClear=i}_blur(t,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,n,i,r,"latitudinal",s),this._halfBlur(o,t,i,i,r,"longitudinal",s)}_halfBlur(t,n,i,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new Vn(this._lodPlanes[r],l),d=l.uniforms,p=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Or-1),_=s/m,g=isFinite(s)?1+Math.floor(u*_):Or;g>Or&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Or}`);const h=[];let y=0;for(let A=0;A<Or;++A){const P=A/_,b=Math.exp(-P*P/2);h.push(b),A===0?y+=b:A<g&&(y+=2*b)}for(let A=0;A<h.length;A++)h[A]=h[A]/y;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=h,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=m,d.mipInt.value=x-i;const v=this._sizeLods[r],C=3*v*(r>x-As?r-x+As:0),T=4*(this._cubeSize-v);Na(n,C,T,3*v,2*v),c.setRenderTarget(n),c.render(f,vl)}}function eM(e){const t=[],n=[],i=[];let r=e;const s=e-As+1+Qd.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let c=1/a;o>e-As?c=Qd[o-e+As-1]:o===0&&(c=0),i.push(c);const l=1/(a-2),u=-l,f=1+l,d=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,m=6,_=3,g=2,h=1,y=new Float32Array(_*m*p),x=new Float32Array(g*m*p),v=new Float32Array(h*m*p);for(let T=0;T<p;T++){const A=T%3*2/3-1,P=T>2?0:-1,b=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];y.set(b,_*m*T),x.set(d,g*m*T);const M=[T,T,T,T,T,T];v.set(M,h*m*T)}const C=new Si;C.setAttribute("position",new Wn(y,_)),C.setAttribute("uv",new Wn(x,g)),C.setAttribute("faceIndex",new Wn(v,h)),t.push(C),r>As&&r--}return{lodPlanes:t,sizeLods:n,sigmas:i}}function ih(e,t,n){const i=new Jr(e,t,n);return i.texture.mapping=Nc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Na(e,t,n,i,r){e.viewport.set(t,n,i,r),e.scissor.set(t,n,i,r)}function nM(e,t,n){const i=new Float32Array(Or),r=new O(0,1,0);return new Vi({name:"SphericalGaussianBlur",defines:{n:Or,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Df(),fragmentShader:`

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
		`,blending:fr,depthTest:!1,depthWrite:!1})}function rh(){return new Vi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Df(),fragmentShader:`

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
		`,blending:fr,depthTest:!1,depthWrite:!1})}function sh(){return new Vi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Df(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:fr,depthTest:!1,depthWrite:!1})}function Df(){return`

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
	`}function iM(e){let t=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===cu||c===lu,u=c===Hs||c===Gs;if(l||u){let f=t.get(a);const d=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return n===null&&(n=new nh(e)),f=l?n.fromEquirectangular(a,f):n.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{const p=a.image;return l&&p&&p.height>0||u&&p&&r(p)?(n===null&&(n=new nh(e)),f=l?n.fromEquirectangular(a):n.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function r(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function rM(e){const t={};function n(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=e.getExtension(i)}return t[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&Eo("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function sM(e,t,n,i){const r={},s=new WeakMap;function o(f){const d=f.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);for(const m in d.morphAttributes){const _=d.morphAttributes[m];for(let g=0,h=_.length;g<h;g++)t.remove(_[g])}d.removeEventListener("dispose",o),delete r[d.id];const p=s.get(d);p&&(t.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,n.memory.geometries--}function a(f,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,n.memory.geometries++),d}function c(f){const d=f.attributes;for(const m in d)t.update(d[m],e.ARRAY_BUFFER);const p=f.morphAttributes;for(const m in p){const _=p[m];for(let g=0,h=_.length;g<h;g++)t.update(_[g],e.ARRAY_BUFFER)}}function l(f){const d=[],p=f.index,m=f.attributes.position;let _=0;if(p!==null){const y=p.array;_=p.version;for(let x=0,v=y.length;x<v;x+=3){const C=y[x+0],T=y[x+1],A=y[x+2];d.push(C,T,T,A,A,C)}}else if(m!==void 0){const y=m.array;_=m.version;for(let x=0,v=y.length/3-1;x<v;x+=3){const C=x+0,T=x+1,A=x+2;d.push(C,T,T,A,A,C)}}else return;const g=new(pm(d)?ym:xm)(d,1);g.version=_;const h=s.get(f);h&&t.remove(h),s.set(f,g)}function u(f){const d=s.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&l(f)}else l(f);return s.get(f)}return{get:a,update:c,getWireframeAttribute:u}}function oM(e,t,n){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function c(d,p){e.drawElements(i,p,s,d*o),n.update(p,i,1)}function l(d,p,m){m!==0&&(e.drawElementsInstanced(i,p,s,d*o,m),n.update(p,i,m))}function u(d,p,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,d,0,m);let g=0;for(let h=0;h<m;h++)g+=p[h];n.update(g,i,1)}function f(d,p,m,_){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let h=0;h<d.length;h++)l(d[h]/o,p[h],_[h]);else{g.multiDrawElementsInstancedWEBGL(i,p,0,s,d,0,_,0,m);let h=0;for(let y=0;y<m;y++)h+=p[y]*_[y];n.update(h,i,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function aM(e){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case e.TRIANGLES:n.triangles+=a*(s/3);break;case e.LINES:n.lines+=a*(s/2);break;case e.LINE_STRIP:n.lines+=a*(s-1);break;case e.LINE_LOOP:n.lines+=a*s;break;case e.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:r,update:i}}function cM(e,t,n){const i=new WeakMap,r=new pe;function s(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let d=i.get(a);if(d===void 0||d.count!==f){let b=function(){A.dispose(),i.delete(a),a.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();const p=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],h=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let x=0;p===!0&&(x=1),m===!0&&(x=2),_===!0&&(x=3);let v=a.attributes.position.count*x,C=1;v>t.maxTextureSize&&(C=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);const T=new Float32Array(v*C*4*f),A=new gm(T,v,C,f);A.type=hi,A.needsUpdate=!0;const P=x*4;for(let M=0;M<f;M++){const I=g[M],V=h[M],F=y[M],H=v*C*4*M;for(let Z=0;Z<I.count;Z++){const $=Z*P;p===!0&&(r.fromBufferAttribute(I,Z),T[H+$+0]=r.x,T[H+$+1]=r.y,T[H+$+2]=r.z,T[H+$+3]=0),m===!0&&(r.fromBufferAttribute(V,Z),T[H+$+4]=r.x,T[H+$+5]=r.y,T[H+$+6]=r.z,T[H+$+7]=0),_===!0&&(r.fromBufferAttribute(F,Z),T[H+$+8]=r.x,T[H+$+9]=r.y,T[H+$+10]=r.z,T[H+$+11]=F.itemSize===4?r.w:1)}}d={count:f,texture:A,size:new re(v,C)},i.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(e,"morphTexture",o.morphTexture,n);else{let p=0;for(let _=0;_<l.length;_++)p+=l[_];const m=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(e,"morphTargetBaseInfluence",m),c.getUniforms().setValue(e,"morphTargetInfluences",l)}c.getUniforms().setValue(e,"morphTargetsTexture",d.texture,n),c.getUniforms().setValue(e,"morphTargetsTextureSize",d.size)}return{update:s}}function lM(e,t,n,i){let r=new WeakMap;function s(c){const l=i.render.frame,u=c.geometry,f=t.get(c,u);if(r.get(f)!==l&&(t.update(f),r.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(n.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,e.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==l&&(d.update(),r.set(d,l))}return f}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),n.remove(l.instanceMatrix),l.instanceColor!==null&&n.remove(l.instanceColor)}return{update:s,dispose:o}}class Tm extends dn{constructor(t,n,i,r,s,o,a,c,l,u=Ds){if(u!==Ds&&u!==Xs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Ds&&(i=Kr),i===void 0&&u===Xs&&(i=Ws),super(null,r,s,o,a,c,u,i,l),this.isDepthTexture=!0,this.image={width:t,height:n},this.magFilter=a!==void 0?a:In,this.minFilter=c!==void 0?c:In,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const wm=new dn,oh=new Tm(1,1),Am=new gm,Cm=new q0,Rm=new Em,ah=[],ch=[],lh=new Float32Array(16),uh=new Float32Array(9),fh=new Float32Array(4);function oo(e,t,n){const i=e[0];if(i<=0||i>0)return e;const r=t*n;let s=ah[r];if(s===void 0&&(s=new Float32Array(r),ah[r]=s),t!==0){i.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=n,e[o].toArray(s,a)}return s}function Xe(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Ye(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function zc(e,t){let n=ch[t];n===void 0&&(n=new Int32Array(t),ch[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function uM(e,t){const n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function fM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Xe(n,t))return;e.uniform2fv(this.addr,t),Ye(n,t)}}function dM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Xe(n,t))return;e.uniform3fv(this.addr,t),Ye(n,t)}}function hM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Xe(n,t))return;e.uniform4fv(this.addr,t),Ye(n,t)}}function pM(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Xe(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Ye(n,t)}else{if(Xe(n,i))return;fh.set(i),e.uniformMatrix2fv(this.addr,!1,fh),Ye(n,i)}}function mM(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Xe(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Ye(n,t)}else{if(Xe(n,i))return;uh.set(i),e.uniformMatrix3fv(this.addr,!1,uh),Ye(n,i)}}function gM(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Xe(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Ye(n,t)}else{if(Xe(n,i))return;lh.set(i),e.uniformMatrix4fv(this.addr,!1,lh),Ye(n,i)}}function _M(e,t){const n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function vM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Xe(n,t))return;e.uniform2iv(this.addr,t),Ye(n,t)}}function xM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Xe(n,t))return;e.uniform3iv(this.addr,t),Ye(n,t)}}function yM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Xe(n,t))return;e.uniform4iv(this.addr,t),Ye(n,t)}}function SM(e,t){const n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function MM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Xe(n,t))return;e.uniform2uiv(this.addr,t),Ye(n,t)}}function EM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Xe(n,t))return;e.uniform3uiv(this.addr,t),Ye(n,t)}}function bM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Xe(n,t))return;e.uniform4uiv(this.addr,t),Ye(n,t)}}function TM(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r);let s;this.type===e.SAMPLER_2D_SHADOW?(oh.compareFunction=hm,s=oh):s=wm,n.setTexture2D(t||s,r)}function wM(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(t||Cm,r)}function AM(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(t||Rm,r)}function CM(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(t||Am,r)}function RM(e){switch(e){case 5126:return uM;case 35664:return fM;case 35665:return dM;case 35666:return hM;case 35674:return pM;case 35675:return mM;case 35676:return gM;case 5124:case 35670:return _M;case 35667:case 35671:return vM;case 35668:case 35672:return xM;case 35669:case 35673:return yM;case 5125:return SM;case 36294:return MM;case 36295:return EM;case 36296:return bM;case 35678:case 36198:case 36298:case 36306:case 35682:return TM;case 35679:case 36299:case 36307:return wM;case 35680:case 36300:case 36308:case 36293:return AM;case 36289:case 36303:case 36311:case 36292:return CM}}function PM(e,t){e.uniform1fv(this.addr,t)}function IM(e,t){const n=oo(t,this.size,2);e.uniform2fv(this.addr,n)}function DM(e,t){const n=oo(t,this.size,3);e.uniform3fv(this.addr,n)}function LM(e,t){const n=oo(t,this.size,4);e.uniform4fv(this.addr,n)}function UM(e,t){const n=oo(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function NM(e,t){const n=oo(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function OM(e,t){const n=oo(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function FM(e,t){e.uniform1iv(this.addr,t)}function zM(e,t){e.uniform2iv(this.addr,t)}function BM(e,t){e.uniform3iv(this.addr,t)}function kM(e,t){e.uniform4iv(this.addr,t)}function VM(e,t){e.uniform1uiv(this.addr,t)}function $M(e,t){e.uniform2uiv(this.addr,t)}function HM(e,t){e.uniform3uiv(this.addr,t)}function GM(e,t){e.uniform4uiv(this.addr,t)}function WM(e,t,n){const i=this.cache,r=t.length,s=zc(n,r);Xe(i,s)||(e.uniform1iv(this.addr,s),Ye(i,s));for(let o=0;o!==r;++o)n.setTexture2D(t[o]||wm,s[o])}function XM(e,t,n){const i=this.cache,r=t.length,s=zc(n,r);Xe(i,s)||(e.uniform1iv(this.addr,s),Ye(i,s));for(let o=0;o!==r;++o)n.setTexture3D(t[o]||Cm,s[o])}function YM(e,t,n){const i=this.cache,r=t.length,s=zc(n,r);Xe(i,s)||(e.uniform1iv(this.addr,s),Ye(i,s));for(let o=0;o!==r;++o)n.setTextureCube(t[o]||Rm,s[o])}function ZM(e,t,n){const i=this.cache,r=t.length,s=zc(n,r);Xe(i,s)||(e.uniform1iv(this.addr,s),Ye(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(t[o]||Am,s[o])}function qM(e){switch(e){case 5126:return PM;case 35664:return IM;case 35665:return DM;case 35666:return LM;case 35674:return UM;case 35675:return NM;case 35676:return OM;case 5124:case 35670:return FM;case 35667:case 35671:return zM;case 35668:case 35672:return BM;case 35669:case 35673:return kM;case 5125:return VM;case 36294:return $M;case 36295:return HM;case 36296:return GM;case 35678:case 36198:case 36298:case 36306:case 35682:return WM;case 35679:case 36299:case 36307:return XM;case 35680:case 36300:case 36308:case 36293:return YM;case 36289:case 36303:case 36311:case 36292:return ZM}}class jM{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=RM(n.type)}}class KM{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=qM(n.type)}}class JM{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,n[a.id],i)}}}const El=/(\w+)(\])?(\[|\.)?/g;function dh(e,t){e.seq.push(t),e.map[t.id]=t}function QM(e,t,n){const i=e.name,r=i.length;for(El.lastIndex=0;;){const s=El.exec(i),o=El.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){dh(n,l===void 0?new jM(a,e,t):new KM(a,e,t));break}else{let f=n.map[a];f===void 0&&(f=new JM(a),dh(n,f)),n=f}}}class rc{constructor(t,n){this.seq=[],this.map={};const i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(n,r),o=t.getUniformLocation(n,s.name);QM(s,o,this)}}setValue(t,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(t,i,r)}setOptional(t,n,i){const r=n[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,r)}}static seqWithValue(t,n){const i=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in n&&i.push(o)}return i}}function hh(e,t,n){const i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}const tE=37297;let eE=0;function nE(e,t){const n=e.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}const ph=new Bt;function iE(e){Qt._getMatrix(ph,Qt.workingColorSpace,e);const t=`mat3( ${ph.elements.map(n=>n.toFixed(4))} )`;switch(Qt.getTransfer(e)){case Oc:return[t,"LinearTransferOETF"];case ue:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function mh(e,t,n){const i=e.getShaderParameter(t,e.COMPILE_STATUS),r=e.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+nE(e.getShaderSource(t),o)}else return r}function rE(e,t){const n=iE(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function sE(e,t){let n;switch(t){case s0:n="Linear";break;case o0:n="Reinhard";break;case a0:n="Cineon";break;case c0:n="ACESFilmic";break;case u0:n="AgX";break;case f0:n="Neutral";break;case l0:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Oa=new O;function oE(){Qt.getLuminanceCoefficients(Oa);const e=Oa.x.toFixed(4),t=Oa.y.toFixed(4),n=Oa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function aE(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(bo).join(`
`)}function cE(e){const t=[];for(const n in e){const i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function lE(e,t){const n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=e.getActiveAttrib(t,r),o=s.name;let a=1;s.type===e.FLOAT_MAT2&&(a=2),s.type===e.FLOAT_MAT3&&(a=3),s.type===e.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:e.getAttribLocation(t,o),locationSize:a}}return n}function bo(e){return e!==""}function gh(e,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function _h(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const uE=/^[ \t]*#include +<([\w\d./]+)>/gm;function Bu(e){return e.replace(uE,dE)}const fE=new Map;function dE(e,t){let n=$t[t];if(n===void 0){const i=fE.get(t);if(i!==void 0)n=$t[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Bu(n)}const hE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vh(e){return e.replace(hE,pE)}function pE(e,t,n,i){let r="";for(let s=parseInt(t);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function xh(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}function mE(e){let t="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===Qp?t="SHADOWMAP_TYPE_PCF":e.shadowMapType===tm?t="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===Pi&&(t="SHADOWMAP_TYPE_VSM"),t}function gE(e){let t="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case Hs:case Gs:t="ENVMAP_TYPE_CUBE";break;case Nc:t="ENVMAP_TYPE_CUBE_UV";break}return t}function _E(e){let t="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode){case Gs:t="ENVMAP_MODE_REFRACTION";break}return t}function vE(e){let t="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case em:t="ENVMAP_BLENDING_MULTIPLY";break;case i0:t="ENVMAP_BLENDING_MIX";break;case r0:t="ENVMAP_BLENDING_ADD";break}return t}function xE(e){const t=e.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function yE(e,t,n,i){const r=e.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const c=mE(n),l=gE(n),u=_E(n),f=vE(n),d=xE(n),p=aE(n),m=cE(s),_=r.createProgram();let g,h,y=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m].filter(bo).join(`
`),g.length>0&&(g+=`
`),h=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m].filter(bo).join(`
`),h.length>0&&(h+=`
`)):(g=[xh(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(bo).join(`
`),h=[xh(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+l:"",n.envMap?"#define "+u:"",n.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==dr?"#define TONE_MAPPING":"",n.toneMapping!==dr?$t.tonemapping_pars_fragment:"",n.toneMapping!==dr?sE("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,rE("linearToOutputTexel",n.outputColorSpace),oE(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(bo).join(`
`)),o=Bu(o),o=gh(o,n),o=_h(o,n),a=Bu(a),a=gh(a,n),a=_h(a,n),o=vh(o),a=vh(a),n.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,h=["#define varying in",n.glslVersion===Id?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Id?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const x=y+g+o,v=y+h+a,C=hh(r,r.VERTEX_SHADER,x),T=hh(r,r.FRAGMENT_SHADER,v);r.attachShader(_,C),r.attachShader(_,T),n.index0AttributeName!==void 0?r.bindAttribLocation(_,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function A(I){if(e.debug.checkShaderErrors){const V=r.getProgramInfoLog(_).trim(),F=r.getShaderInfoLog(C).trim(),H=r.getShaderInfoLog(T).trim();let Z=!0,$=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(Z=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(r,_,C,T);else{const J=mh(r,C,"vertex"),G=mh(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+V+`
`+J+`
`+G)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(F===""||H==="")&&($=!1);$&&(I.diagnostics={runnable:Z,programLog:V,vertexShader:{log:F,prefix:g},fragmentShader:{log:H,prefix:h}})}r.deleteShader(C),r.deleteShader(T),P=new rc(r,_),b=lE(r,_)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let M=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(_,tE)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=eE++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=T,this}let SE=0;class ME{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){const n=this.shaderCache;let i=n.get(t);return i===void 0&&(i=new EE(t),n.set(t,i)),i}}class EE{constructor(t){this.id=SE++,this.code=t,this.usedTimes=0}}function bE(e,t,n,i,r,s,o){const a=new _m,c=new ME,l=new Set,u=[],f=r.logarithmicDepthBuffer,d=r.vertexTextures;let p=r.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function g(b,M,I,V,F){const H=V.fog,Z=F.geometry,$=b.isMeshStandardMaterial?V.environment:null,J=(b.isMeshStandardMaterial?n:t).get(b.envMap||$),G=J&&J.mapping===Nc?J.image.height:null,rt=m[b.type];b.precision!==null&&(p=r.getMaxPrecision(b.precision),p!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",p,"instead."));const lt=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,_t=lt!==void 0?lt.length:0;let kt=0;Z.morphAttributes.position!==void 0&&(kt=1),Z.morphAttributes.normal!==void 0&&(kt=2),Z.morphAttributes.color!==void 0&&(kt=3);let Gt,X,nt,Mt;if(rt){const ae=mn[rt];Gt=ae.vertexShader,X=ae.fragmentShader}else Gt=b.vertexShader,X=b.fragmentShader,c.update(b),nt=c.getVertexShaderID(b),Mt=c.getFragmentShaderID(b);const ot=e.getRenderTarget(),It=e.state.buffers.depth.getReversed(),Ot=F.isInstancedMesh===!0,Wt=F.isBatchedMesh===!0,Ce=!!b.map,Kt=!!b.matcap,Oe=!!J,N=!!b.aoMap,On=!!b.lightMap,Zt=!!b.bumpMap,qt=!!b.normalMap,Rt=!!b.displacementMap,xe=!!b.emissiveMap,Ct=!!b.metalnessMap,R=!!b.roughnessMap,S=b.anisotropy>0,z=b.clearcoat>0,j=b.dispersion>0,Q=b.iridescence>0,q=b.sheen>0,bt=b.transmission>0,at=S&&!!b.anisotropyMap,pt=z&&!!b.clearcoatMap,Jt=z&&!!b.clearcoatNormalMap,tt=z&&!!b.clearcoatRoughnessMap,mt=Q&&!!b.iridescenceMap,Pt=Q&&!!b.iridescenceThicknessMap,Dt=q&&!!b.sheenColorMap,gt=q&&!!b.sheenRoughnessMap,jt=!!b.specularMap,Vt=!!b.specularColorMap,ge=!!b.specularIntensityMap,D=bt&&!!b.transmissionMap,st=bt&&!!b.thicknessMap,W=!!b.gradientMap,K=!!b.alphaMap,dt=b.alphaTest>0,ut=!!b.alphaHash,Ft=!!b.extensions;let Le=dr;b.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(Le=e.toneMapping);const rn={shaderID:rt,shaderType:b.type,shaderName:b.name,vertexShader:Gt,fragmentShader:X,defines:b.defines,customVertexShaderID:nt,customFragmentShaderID:Mt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:p,batching:Wt,batchingColor:Wt&&F._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&F.instanceColor!==null,instancingMorph:Ot&&F.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ot===null?e.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:io,alphaToCoverage:!!b.alphaToCoverage,map:Ce,matcap:Kt,envMap:Oe,envMapMode:Oe&&J.mapping,envMapCubeUVHeight:G,aoMap:N,lightMap:On,bumpMap:Zt,normalMap:qt,displacementMap:d&&Rt,emissiveMap:xe,normalMapObjectSpace:qt&&b.normalMapType===m0,normalMapTangentSpace:qt&&b.normalMapType===dm,metalnessMap:Ct,roughnessMap:R,anisotropy:S,anisotropyMap:at,clearcoat:z,clearcoatMap:pt,clearcoatNormalMap:Jt,clearcoatRoughnessMap:tt,dispersion:j,iridescence:Q,iridescenceMap:mt,iridescenceThicknessMap:Pt,sheen:q,sheenColorMap:Dt,sheenRoughnessMap:gt,specularMap:jt,specularColorMap:Vt,specularIntensityMap:ge,transmission:bt,transmissionMap:D,thicknessMap:st,gradientMap:W,opaque:b.transparent===!1&&b.blending===Is&&b.alphaToCoverage===!1,alphaMap:K,alphaTest:dt,alphaHash:ut,combine:b.combine,mapUv:Ce&&_(b.map.channel),aoMapUv:N&&_(b.aoMap.channel),lightMapUv:On&&_(b.lightMap.channel),bumpMapUv:Zt&&_(b.bumpMap.channel),normalMapUv:qt&&_(b.normalMap.channel),displacementMapUv:Rt&&_(b.displacementMap.channel),emissiveMapUv:xe&&_(b.emissiveMap.channel),metalnessMapUv:Ct&&_(b.metalnessMap.channel),roughnessMapUv:R&&_(b.roughnessMap.channel),anisotropyMapUv:at&&_(b.anisotropyMap.channel),clearcoatMapUv:pt&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:Jt&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:tt&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:mt&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Pt&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Dt&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:gt&&_(b.sheenRoughnessMap.channel),specularMapUv:jt&&_(b.specularMap.channel),specularColorMapUv:Vt&&_(b.specularColorMap.channel),specularIntensityMapUv:ge&&_(b.specularIntensityMap.channel),transmissionMapUv:D&&_(b.transmissionMap.channel),thicknessMapUv:st&&_(b.thicknessMap.channel),alphaMapUv:K&&_(b.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(qt||S),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!Z.attributes.uv&&(Ce||K),fog:!!H,useFog:b.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:It,skinning:F.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:_t,morphTextureStride:kt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:e.shadowMap.enabled&&I.length>0,shadowMapType:e.shadowMap.type,toneMapping:Le,decodeVideoTexture:Ce&&b.map.isVideoTexture===!0&&Qt.getTransfer(b.map.colorSpace)===ue,decodeVideoTextureEmissive:xe&&b.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(b.emissiveMap.colorSpace)===ue,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Li,flipSided:b.side===gn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ft&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ft&&b.extensions.multiDraw===!0||Wt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return rn.vertexUv1s=l.has(1),rn.vertexUv2s=l.has(2),rn.vertexUv3s=l.has(3),l.clear(),rn}function h(b){const M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(const I in b.defines)M.push(I),M.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(y(M,b),x(M,b),M.push(e.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function y(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function x(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function v(b){const M=m[b.type];let I;if(M){const V=mn[M];I=Pf.clone(V.uniforms)}else I=b.uniforms;return I}function C(b,M){let I;for(let V=0,F=u.length;V<F;V++){const H=u[V];if(H.cacheKey===M){I=H,++I.usedTimes;break}}return I===void 0&&(I=new yE(e,M,b,s),u.push(I)),I}function T(b){if(--b.usedTimes===0){const M=u.indexOf(b);u[M]=u[u.length-1],u.pop(),b.destroy()}}function A(b){c.remove(b)}function P(){c.dispose()}return{getParameters:g,getProgramCacheKey:h,getUniforms:v,acquireProgram:C,releaseProgram:T,releaseShaderCache:A,programs:u,dispose:P}}function TE(){let e=new WeakMap;function t(o){return e.has(o)}function n(o){let a=e.get(o);return a===void 0&&(a={},e.set(o,a)),a}function i(o){e.delete(o)}function r(o,a,c){e.get(o)[a]=c}function s(){e=new WeakMap}return{has:t,get:n,remove:i,update:r,dispose:s}}function wE(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.z!==t.z?e.z-t.z:e.id-t.id}function yh(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function Sh(){const e=[];let t=0;const n=[],i=[],r=[];function s(){t=0,n.length=0,i.length=0,r.length=0}function o(f,d,p,m,_,g){let h=e[t];return h===void 0?(h={id:f.id,object:f,geometry:d,material:p,groupOrder:m,renderOrder:f.renderOrder,z:_,group:g},e[t]=h):(h.id=f.id,h.object=f,h.geometry=d,h.material=p,h.groupOrder=m,h.renderOrder=f.renderOrder,h.z=_,h.group=g),t++,h}function a(f,d,p,m,_,g){const h=o(f,d,p,m,_,g);p.transmission>0?i.push(h):p.transparent===!0?r.push(h):n.push(h)}function c(f,d,p,m,_,g){const h=o(f,d,p,m,_,g);p.transmission>0?i.unshift(h):p.transparent===!0?r.unshift(h):n.unshift(h)}function l(f,d){n.length>1&&n.sort(f||wE),i.length>1&&i.sort(d||yh),r.length>1&&r.sort(d||yh)}function u(){for(let f=t,d=e.length;f<d;f++){const p=e[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:c,finish:u,sort:l}}function AE(){let e=new WeakMap;function t(i,r){const s=e.get(i);let o;return s===void 0?(o=new Sh,e.set(i,[o])):r>=s.length?(o=new Sh,s.push(o)):o=s[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}function CE(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new O,color:new Xt};break;case"SpotLight":n={position:new O,direction:new O,color:new Xt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new O,color:new Xt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new O,skyColor:new Xt,groundColor:new Xt};break;case"RectAreaLight":n={color:new Xt,position:new O,halfWidth:new O,halfHeight:new O};break}return e[t.id]=n,n}}}function RE(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}let PE=0;function IE(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function DE(e){const t=new CE,n=RE(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new O);const r=new O,s=new ne,o=new ne;function a(l){let u=0,f=0,d=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let p=0,m=0,_=0,g=0,h=0,y=0,x=0,v=0,C=0,T=0,A=0;l.sort(IE);for(let b=0,M=l.length;b<M;b++){const I=l[b],V=I.color,F=I.intensity,H=I.distance,Z=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=V.r*F,f+=V.g*F,d+=V.b*F;else if(I.isLightProbe){for(let $=0;$<9;$++)i.probe[$].addScaledVector(I.sh.coefficients[$],F);A++}else if(I.isDirectionalLight){const $=t.get(I);if($.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const J=I.shadow,G=n.get(I);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,i.directionalShadow[p]=G,i.directionalShadowMap[p]=Z,i.directionalShadowMatrix[p]=I.shadow.matrix,y++}i.directional[p]=$,p++}else if(I.isSpotLight){const $=t.get(I);$.position.setFromMatrixPosition(I.matrixWorld),$.color.copy(V).multiplyScalar(F),$.distance=H,$.coneCos=Math.cos(I.angle),$.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),$.decay=I.decay,i.spot[_]=$;const J=I.shadow;if(I.map&&(i.spotLightMap[C]=I.map,C++,J.updateMatrices(I),I.castShadow&&T++),i.spotLightMatrix[_]=J.matrix,I.castShadow){const G=n.get(I);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,i.spotShadow[_]=G,i.spotShadowMap[_]=Z,v++}_++}else if(I.isRectAreaLight){const $=t.get(I);$.color.copy(V).multiplyScalar(F),$.halfWidth.set(I.width*.5,0,0),$.halfHeight.set(0,I.height*.5,0),i.rectArea[g]=$,g++}else if(I.isPointLight){const $=t.get(I);if($.color.copy(I.color).multiplyScalar(I.intensity),$.distance=I.distance,$.decay=I.decay,I.castShadow){const J=I.shadow,G=n.get(I);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,G.shadowCameraNear=J.camera.near,G.shadowCameraFar=J.camera.far,i.pointShadow[m]=G,i.pointShadowMap[m]=Z,i.pointShadowMatrix[m]=I.shadow.matrix,x++}i.point[m]=$,m++}else if(I.isHemisphereLight){const $=t.get(I);$.skyColor.copy(I.color).multiplyScalar(F),$.groundColor.copy(I.groundColor).multiplyScalar(F),i.hemi[h]=$,h++}}g>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=it.LTC_FLOAT_1,i.rectAreaLTC2=it.LTC_FLOAT_2):(i.rectAreaLTC1=it.LTC_HALF_1,i.rectAreaLTC2=it.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;const P=i.hash;(P.directionalLength!==p||P.pointLength!==m||P.spotLength!==_||P.rectAreaLength!==g||P.hemiLength!==h||P.numDirectionalShadows!==y||P.numPointShadows!==x||P.numSpotShadows!==v||P.numSpotMaps!==C||P.numLightProbes!==A)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=g,i.point.length=m,i.hemi.length=h,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=v+C-T,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=A,P.directionalLength=p,P.pointLength=m,P.spotLength=_,P.rectAreaLength=g,P.hemiLength=h,P.numDirectionalShadows=y,P.numPointShadows=x,P.numSpotShadows=v,P.numSpotMaps=C,P.numLightProbes=A,i.version=PE++)}function c(l,u){let f=0,d=0,p=0,m=0,_=0;const g=u.matrixWorldInverse;for(let h=0,y=l.length;h<y;h++){const x=l[h];if(x.isDirectionalLight){const v=i.directional[f];v.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(g),f++}else if(x.isSpotLight){const v=i.spot[p];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(g),p++}else if(x.isRectAreaLight){const v=i.rectArea[m];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(g),o.identity(),s.copy(x.matrixWorld),s.premultiply(g),o.extractRotation(s),v.halfWidth.set(x.width*.5,0,0),v.halfHeight.set(0,x.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),m++}else if(x.isPointLight){const v=i.point[d];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(g),d++}else if(x.isHemisphereLight){const v=i.hemi[_];v.direction.setFromMatrixPosition(x.matrixWorld),v.direction.transformDirection(g),_++}}}return{setup:a,setupView:c,state:i}}function Mh(e){const t=new DE(e),n=[],i=[];function r(u){l.camera=u,n.length=0,i.length=0}function s(u){n.push(u)}function o(u){i.push(u)}function a(){t.setup(n)}function c(u){t.setupView(n,u)}const l={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function LE(e){let t=new WeakMap;function n(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new Mh(e),t.set(r,[a])):s>=o.length?(a=new Mh(e),o.push(a)):a=o[s],a}function i(){t=new WeakMap}return{get:n,dispose:i}}class UE extends sa{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=h0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class NE extends sa{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const OE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,FE=`uniform sampler2D shadow_pass;
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
}`;function zE(e,t,n){let i=new If;const r=new re,s=new re,o=new pe,a=new UE({depthPacking:p0}),c=new NE,l={},u=n.maxTextureSize,f={[gr]:gn,[gn]:gr,[Li]:Li},d=new Vi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new re},radius:{value:4}},vertexShader:OE,fragmentShader:FE}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const m=new Si;m.setAttribute("position",new Wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Vn(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qp;let h=this.type;this.render=function(T,A,P){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;const b=e.getRenderTarget(),M=e.getActiveCubeFace(),I=e.getActiveMipmapLevel(),V=e.state;V.setBlending(fr),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const F=h!==Pi&&this.type===Pi,H=h===Pi&&this.type!==Pi;for(let Z=0,$=T.length;Z<$;Z++){const J=T[Z],G=J.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);const rt=G.getFrameExtents();if(r.multiply(rt),s.copy(G.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/rt.x),r.x=s.x*rt.x,G.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/rt.y),r.y=s.y*rt.y,G.mapSize.y=s.y)),G.map===null||F===!0||H===!0){const _t=this.type!==Pi?{minFilter:In,magFilter:In}:{};G.map!==null&&G.map.dispose(),G.map=new Jr(r.x,r.y,_t),G.map.texture.name=J.name+".shadowMap",G.camera.updateProjectionMatrix()}e.setRenderTarget(G.map),e.clear();const lt=G.getViewportCount();for(let _t=0;_t<lt;_t++){const kt=G.getViewport(_t);o.set(s.x*kt.x,s.y*kt.y,s.x*kt.z,s.y*kt.w),V.viewport(o),G.updateMatrices(J,_t),i=G.getFrustum(),v(A,P,G.camera,J,this.type)}G.isPointLightShadow!==!0&&this.type===Pi&&y(G,P),G.needsUpdate=!1}h=this.type,g.needsUpdate=!1,e.setRenderTarget(b,M,I)};function y(T,A){const P=t.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Jr(r.x,r.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,e.setRenderTarget(T.mapPass),e.clear(),e.renderBufferDirect(A,null,P,d,_,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,e.setRenderTarget(T.map),e.clear(),e.renderBufferDirect(A,null,P,p,_,null)}function x(T,A,P,b){let M=null;const I=P.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)M=I;else if(M=P.isPointLight===!0?c:a,e.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const V=M.uuid,F=A.uuid;let H=l[V];H===void 0&&(H={},l[V]=H);let Z=H[F];Z===void 0&&(Z=M.clone(),H[F]=Z,A.addEventListener("dispose",C)),M=Z}if(M.visible=A.visible,M.wireframe=A.wireframe,b===Pi?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:f[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const V=e.properties.get(M);V.light=P}return M}function v(T,A,P,b,M){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===Pi)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,T.matrixWorld);const F=t.update(T),H=T.material;if(Array.isArray(H)){const Z=F.groups;for(let $=0,J=Z.length;$<J;$++){const G=Z[$],rt=H[G.materialIndex];if(rt&&rt.visible){const lt=x(T,rt,b,M);T.onBeforeShadow(e,T,A,P,F,lt,G),e.renderBufferDirect(P,null,F,lt,T,G),T.onAfterShadow(e,T,A,P,F,lt,G)}}}else if(H.visible){const Z=x(T,H,b,M);T.onBeforeShadow(e,T,A,P,F,Z,null),e.renderBufferDirect(P,null,F,Z,T,null),T.onAfterShadow(e,T,A,P,F,Z,null)}}const V=T.children;for(let F=0,H=V.length;F<H;F++)v(V[F],A,P,b,M)}function C(T){T.target.removeEventListener("dispose",C);for(const P in l){const b=l[P],M=T.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}const BE={[eu]:nu,[iu]:ou,[ru]:au,[$s]:su,[nu]:eu,[ou]:iu,[au]:ru,[su]:$s};function kE(e,t){function n(){let D=!1;const st=new pe;let W=null;const K=new pe(0,0,0,0);return{setMask:function(dt){W!==dt&&!D&&(e.colorMask(dt,dt,dt,dt),W=dt)},setLocked:function(dt){D=dt},setClear:function(dt,ut,Ft,Le,rn){rn===!0&&(dt*=Le,ut*=Le,Ft*=Le),st.set(dt,ut,Ft,Le),K.equals(st)===!1&&(e.clearColor(dt,ut,Ft,Le),K.copy(st))},reset:function(){D=!1,W=null,K.set(-1,0,0,0)}}}function i(){let D=!1,st=!1,W=null,K=null,dt=null;return{setReversed:function(ut){if(st!==ut){const Ft=t.get("EXT_clip_control");st?Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.ZERO_TO_ONE_EXT):Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.NEGATIVE_ONE_TO_ONE_EXT);const Le=dt;dt=null,this.setClear(Le)}st=ut},getReversed:function(){return st},setTest:function(ut){ut?ot(e.DEPTH_TEST):It(e.DEPTH_TEST)},setMask:function(ut){W!==ut&&!D&&(e.depthMask(ut),W=ut)},setFunc:function(ut){if(st&&(ut=BE[ut]),K!==ut){switch(ut){case eu:e.depthFunc(e.NEVER);break;case nu:e.depthFunc(e.ALWAYS);break;case iu:e.depthFunc(e.LESS);break;case $s:e.depthFunc(e.LEQUAL);break;case ru:e.depthFunc(e.EQUAL);break;case su:e.depthFunc(e.GEQUAL);break;case ou:e.depthFunc(e.GREATER);break;case au:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}K=ut}},setLocked:function(ut){D=ut},setClear:function(ut){dt!==ut&&(st&&(ut=1-ut),e.clearDepth(ut),dt=ut)},reset:function(){D=!1,W=null,K=null,dt=null,st=!1}}}function r(){let D=!1,st=null,W=null,K=null,dt=null,ut=null,Ft=null,Le=null,rn=null;return{setTest:function(ae){D||(ae?ot(e.STENCIL_TEST):It(e.STENCIL_TEST))},setMask:function(ae){st!==ae&&!D&&(e.stencilMask(ae),st=ae)},setFunc:function(ae,Zn,Mi){(W!==ae||K!==Zn||dt!==Mi)&&(e.stencilFunc(ae,Zn,Mi),W=ae,K=Zn,dt=Mi)},setOp:function(ae,Zn,Mi){(ut!==ae||Ft!==Zn||Le!==Mi)&&(e.stencilOp(ae,Zn,Mi),ut=ae,Ft=Zn,Le=Mi)},setLocked:function(ae){D=ae},setClear:function(ae){rn!==ae&&(e.clearStencil(ae),rn=ae)},reset:function(){D=!1,st=null,W=null,K=null,dt=null,ut=null,Ft=null,Le=null,rn=null}}}const s=new n,o=new i,a=new r,c=new WeakMap,l=new WeakMap;let u={},f={},d=new WeakMap,p=[],m=null,_=!1,g=null,h=null,y=null,x=null,v=null,C=null,T=null,A=new Xt(0,0,0),P=0,b=!1,M=null,I=null,V=null,F=null,H=null;const Z=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,J=0;const G=e.getParameter(e.VERSION);G.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(G)[1]),$=J>=1):G.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),$=J>=2);let rt=null,lt={};const _t=e.getParameter(e.SCISSOR_BOX),kt=e.getParameter(e.VIEWPORT),Gt=new pe().fromArray(_t),X=new pe().fromArray(kt);function nt(D,st,W,K){const dt=new Uint8Array(4),ut=e.createTexture();e.bindTexture(D,ut),e.texParameteri(D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(D,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let Ft=0;Ft<W;Ft++)D===e.TEXTURE_3D||D===e.TEXTURE_2D_ARRAY?e.texImage3D(st,0,e.RGBA,1,1,K,0,e.RGBA,e.UNSIGNED_BYTE,dt):e.texImage2D(st+Ft,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,dt);return ut}const Mt={};Mt[e.TEXTURE_2D]=nt(e.TEXTURE_2D,e.TEXTURE_2D,1),Mt[e.TEXTURE_CUBE_MAP]=nt(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),Mt[e.TEXTURE_2D_ARRAY]=nt(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),Mt[e.TEXTURE_3D]=nt(e.TEXTURE_3D,e.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ot(e.DEPTH_TEST),o.setFunc($s),Zt(!1),qt(wd),ot(e.CULL_FACE),N(fr);function ot(D){u[D]!==!0&&(e.enable(D),u[D]=!0)}function It(D){u[D]!==!1&&(e.disable(D),u[D]=!1)}function Ot(D,st){return f[D]!==st?(e.bindFramebuffer(D,st),f[D]=st,D===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=st),D===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=st),!0):!1}function Wt(D,st){let W=p,K=!1;if(D){W=d.get(st),W===void 0&&(W=[],d.set(st,W));const dt=D.textures;if(W.length!==dt.length||W[0]!==e.COLOR_ATTACHMENT0){for(let ut=0,Ft=dt.length;ut<Ft;ut++)W[ut]=e.COLOR_ATTACHMENT0+ut;W.length=dt.length,K=!0}}else W[0]!==e.BACK&&(W[0]=e.BACK,K=!0);K&&e.drawBuffers(W)}function Ce(D){return m!==D?(e.useProgram(D),m=D,!0):!1}const Kt={[Nr]:e.FUNC_ADD,[kv]:e.FUNC_SUBTRACT,[Vv]:e.FUNC_REVERSE_SUBTRACT};Kt[$v]=e.MIN,Kt[Hv]=e.MAX;const Oe={[Gv]:e.ZERO,[Wv]:e.ONE,[Xv]:e.SRC_COLOR,[Ql]:e.SRC_ALPHA,[Jv]:e.SRC_ALPHA_SATURATE,[jv]:e.DST_COLOR,[Zv]:e.DST_ALPHA,[Yv]:e.ONE_MINUS_SRC_COLOR,[tu]:e.ONE_MINUS_SRC_ALPHA,[Kv]:e.ONE_MINUS_DST_COLOR,[qv]:e.ONE_MINUS_DST_ALPHA,[Qv]:e.CONSTANT_COLOR,[t0]:e.ONE_MINUS_CONSTANT_COLOR,[e0]:e.CONSTANT_ALPHA,[n0]:e.ONE_MINUS_CONSTANT_ALPHA};function N(D,st,W,K,dt,ut,Ft,Le,rn,ae){if(D===fr){_===!0&&(It(e.BLEND),_=!1);return}if(_===!1&&(ot(e.BLEND),_=!0),D!==Bv){if(D!==g||ae!==b){if((h!==Nr||v!==Nr)&&(e.blendEquation(e.FUNC_ADD),h=Nr,v=Nr),ae)switch(D){case Is:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Ad:e.blendFunc(e.ONE,e.ONE);break;case Cd:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Rd:e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Is:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Ad:e.blendFunc(e.SRC_ALPHA,e.ONE);break;case Cd:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Rd:e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}y=null,x=null,C=null,T=null,A.set(0,0,0),P=0,g=D,b=ae}return}dt=dt||st,ut=ut||W,Ft=Ft||K,(st!==h||dt!==v)&&(e.blendEquationSeparate(Kt[st],Kt[dt]),h=st,v=dt),(W!==y||K!==x||ut!==C||Ft!==T)&&(e.blendFuncSeparate(Oe[W],Oe[K],Oe[ut],Oe[Ft]),y=W,x=K,C=ut,T=Ft),(Le.equals(A)===!1||rn!==P)&&(e.blendColor(Le.r,Le.g,Le.b,rn),A.copy(Le),P=rn),g=D,b=!1}function On(D,st){D.side===Li?It(e.CULL_FACE):ot(e.CULL_FACE);let W=D.side===gn;st&&(W=!W),Zt(W),D.blending===Is&&D.transparent===!1?N(fr):N(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);const K=D.stencilWrite;a.setTest(K),K&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),xe(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ot(e.SAMPLE_ALPHA_TO_COVERAGE):It(e.SAMPLE_ALPHA_TO_COVERAGE)}function Zt(D){M!==D&&(D?e.frontFace(e.CW):e.frontFace(e.CCW),M=D)}function qt(D){D!==Fv?(ot(e.CULL_FACE),D!==I&&(D===wd?e.cullFace(e.BACK):D===zv?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):It(e.CULL_FACE),I=D}function Rt(D){D!==V&&($&&e.lineWidth(D),V=D)}function xe(D,st,W){D?(ot(e.POLYGON_OFFSET_FILL),(F!==st||H!==W)&&(e.polygonOffset(st,W),F=st,H=W)):It(e.POLYGON_OFFSET_FILL)}function Ct(D){D?ot(e.SCISSOR_TEST):It(e.SCISSOR_TEST)}function R(D){D===void 0&&(D=e.TEXTURE0+Z-1),rt!==D&&(e.activeTexture(D),rt=D)}function S(D,st,W){W===void 0&&(rt===null?W=e.TEXTURE0+Z-1:W=rt);let K=lt[W];K===void 0&&(K={type:void 0,texture:void 0},lt[W]=K),(K.type!==D||K.texture!==st)&&(rt!==W&&(e.activeTexture(W),rt=W),e.bindTexture(D,st||Mt[D]),K.type=D,K.texture=st)}function z(){const D=lt[rt];D!==void 0&&D.type!==void 0&&(e.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function j(){try{e.compressedTexImage2D.apply(e,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{e.compressedTexImage3D.apply(e,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function q(){try{e.texSubImage2D.apply(e,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function bt(){try{e.texSubImage3D.apply(e,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function at(){try{e.compressedTexSubImage2D.apply(e,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function pt(){try{e.compressedTexSubImage3D.apply(e,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Jt(){try{e.texStorage2D.apply(e,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function tt(){try{e.texStorage3D.apply(e,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function mt(){try{e.texImage2D.apply(e,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Pt(){try{e.texImage3D.apply(e,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Dt(D){Gt.equals(D)===!1&&(e.scissor(D.x,D.y,D.z,D.w),Gt.copy(D))}function gt(D){X.equals(D)===!1&&(e.viewport(D.x,D.y,D.z,D.w),X.copy(D))}function jt(D,st){let W=l.get(st);W===void 0&&(W=new WeakMap,l.set(st,W));let K=W.get(D);K===void 0&&(K=e.getUniformBlockIndex(st,D.name),W.set(D,K))}function Vt(D,st){const K=l.get(st).get(D);c.get(st)!==K&&(e.uniformBlockBinding(st,K,D.__bindingPointIndex),c.set(st,K))}function ge(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),u={},rt=null,lt={},f={},d=new WeakMap,p=[],m=null,_=!1,g=null,h=null,y=null,x=null,v=null,C=null,T=null,A=new Xt(0,0,0),P=0,b=!1,M=null,I=null,V=null,F=null,H=null,Gt.set(0,0,e.canvas.width,e.canvas.height),X.set(0,0,e.canvas.width,e.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ot,disable:It,bindFramebuffer:Ot,drawBuffers:Wt,useProgram:Ce,setBlending:N,setMaterial:On,setFlipSided:Zt,setCullFace:qt,setLineWidth:Rt,setPolygonOffset:xe,setScissorTest:Ct,activeTexture:R,bindTexture:S,unbindTexture:z,compressedTexImage2D:j,compressedTexImage3D:Q,texImage2D:mt,texImage3D:Pt,updateUBOMapping:jt,uniformBlockBinding:Vt,texStorage2D:Jt,texStorage3D:tt,texSubImage2D:q,texSubImage3D:bt,compressedTexSubImage2D:at,compressedTexSubImage3D:pt,scissor:Dt,viewport:gt,reset:ge}}function Eh(e,t,n,i){const r=VE(i);switch(n){case om:return e*t;case cm:return e*t;case lm:return e*t*2;case bf:return e*t/r.components*r.byteLength;case Tf:return e*t/r.components*r.byteLength;case um:return e*t*2/r.components*r.byteLength;case wf:return e*t*2/r.components*r.byteLength;case am:return e*t*3/r.components*r.byteLength;case ii:return e*t*4/r.components*r.byteLength;case Af:return e*t*4/r.components*r.byteLength;case Qa:case tc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ec:case nc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case hu:case mu:return Math.max(e,16)*Math.max(t,8)/4;case du:case pu:return Math.max(e,8)*Math.max(t,8)/2;case gu:case _u:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case vu:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case xu:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case yu:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Su:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Mu:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Eu:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case bu:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Tu:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case wu:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Au:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Cu:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Ru:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Pu:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Iu:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Du:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case ic:case Lu:case Uu:return Math.ceil(e/4)*Math.ceil(t/4)*16;case fm:case Nu:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Ou:case Fu:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function VE(e){switch(e){case ki:case im:return{byteLength:1,components:1};case Vo:case rm:case ra:return{byteLength:2,components:1};case Mf:case Ef:return{byteLength:2,components:4};case Kr:case Sf:case hi:return{byteLength:4,components:1};case sm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}function $E(e,t,n,i,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new re,u=new WeakMap;let f;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(R,S){return p?new OffscreenCanvas(R,S):fc("canvas")}function _(R,S,z){let j=1;const Q=Ct(R);if((Q.width>z||Q.height>z)&&(j=z/Math.max(Q.width,Q.height)),j<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const q=Math.floor(j*Q.width),bt=Math.floor(j*Q.height);f===void 0&&(f=m(q,bt));const at=S?m(q,bt):f;return at.width=q,at.height=bt,at.getContext("2d").drawImage(R,0,0,q,bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+q+"x"+bt+")."),at}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),R;return R}function g(R){return R.generateMipmaps}function h(R){e.generateMipmap(R)}function y(R){return R.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?e.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function x(R,S,z,j,Q=!1){if(R!==null){if(e[R]!==void 0)return e[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let q=S;if(S===e.RED&&(z===e.FLOAT&&(q=e.R32F),z===e.HALF_FLOAT&&(q=e.R16F),z===e.UNSIGNED_BYTE&&(q=e.R8)),S===e.RED_INTEGER&&(z===e.UNSIGNED_BYTE&&(q=e.R8UI),z===e.UNSIGNED_SHORT&&(q=e.R16UI),z===e.UNSIGNED_INT&&(q=e.R32UI),z===e.BYTE&&(q=e.R8I),z===e.SHORT&&(q=e.R16I),z===e.INT&&(q=e.R32I)),S===e.RG&&(z===e.FLOAT&&(q=e.RG32F),z===e.HALF_FLOAT&&(q=e.RG16F),z===e.UNSIGNED_BYTE&&(q=e.RG8)),S===e.RG_INTEGER&&(z===e.UNSIGNED_BYTE&&(q=e.RG8UI),z===e.UNSIGNED_SHORT&&(q=e.RG16UI),z===e.UNSIGNED_INT&&(q=e.RG32UI),z===e.BYTE&&(q=e.RG8I),z===e.SHORT&&(q=e.RG16I),z===e.INT&&(q=e.RG32I)),S===e.RGB_INTEGER&&(z===e.UNSIGNED_BYTE&&(q=e.RGB8UI),z===e.UNSIGNED_SHORT&&(q=e.RGB16UI),z===e.UNSIGNED_INT&&(q=e.RGB32UI),z===e.BYTE&&(q=e.RGB8I),z===e.SHORT&&(q=e.RGB16I),z===e.INT&&(q=e.RGB32I)),S===e.RGBA_INTEGER&&(z===e.UNSIGNED_BYTE&&(q=e.RGBA8UI),z===e.UNSIGNED_SHORT&&(q=e.RGBA16UI),z===e.UNSIGNED_INT&&(q=e.RGBA32UI),z===e.BYTE&&(q=e.RGBA8I),z===e.SHORT&&(q=e.RGBA16I),z===e.INT&&(q=e.RGBA32I)),S===e.RGB&&z===e.UNSIGNED_INT_5_9_9_9_REV&&(q=e.RGB9_E5),S===e.RGBA){const bt=Q?Oc:Qt.getTransfer(j);z===e.FLOAT&&(q=e.RGBA32F),z===e.HALF_FLOAT&&(q=e.RGBA16F),z===e.UNSIGNED_BYTE&&(q=bt===ue?e.SRGB8_ALPHA8:e.RGBA8),z===e.UNSIGNED_SHORT_4_4_4_4&&(q=e.RGBA4),z===e.UNSIGNED_SHORT_5_5_5_1&&(q=e.RGB5_A1)}return(q===e.R16F||q===e.R32F||q===e.RG16F||q===e.RG32F||q===e.RGBA16F||q===e.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function v(R,S){let z;return R?S===null||S===Kr||S===Ws?z=e.DEPTH24_STENCIL8:S===hi?z=e.DEPTH32F_STENCIL8:S===Vo&&(z=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Kr||S===Ws?z=e.DEPTH_COMPONENT24:S===hi?z=e.DEPTH_COMPONENT32F:S===Vo&&(z=e.DEPTH_COMPONENT16),z}function C(R,S){return g(R)===!0||R.isFramebufferTexture&&R.minFilter!==In&&R.minFilter!==di?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function T(R){const S=R.target;S.removeEventListener("dispose",T),P(S),S.isVideoTexture&&u.delete(S)}function A(R){const S=R.target;S.removeEventListener("dispose",A),M(S)}function P(R){const S=i.get(R);if(S.__webglInit===void 0)return;const z=R.source,j=d.get(z);if(j){const Q=j[S.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&b(R),Object.keys(j).length===0&&d.delete(z)}i.remove(R)}function b(R){const S=i.get(R);e.deleteTexture(S.__webglTexture);const z=R.source,j=d.get(z);delete j[S.__cacheKey],o.memory.textures--}function M(R){const S=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(S.__webglFramebuffer[j]))for(let Q=0;Q<S.__webglFramebuffer[j].length;Q++)e.deleteFramebuffer(S.__webglFramebuffer[j][Q]);else e.deleteFramebuffer(S.__webglFramebuffer[j]);S.__webglDepthbuffer&&e.deleteRenderbuffer(S.__webglDepthbuffer[j])}else{if(Array.isArray(S.__webglFramebuffer))for(let j=0;j<S.__webglFramebuffer.length;j++)e.deleteFramebuffer(S.__webglFramebuffer[j]);else e.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&e.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&e.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let j=0;j<S.__webglColorRenderbuffer.length;j++)S.__webglColorRenderbuffer[j]&&e.deleteRenderbuffer(S.__webglColorRenderbuffer[j]);S.__webglDepthRenderbuffer&&e.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const z=R.textures;for(let j=0,Q=z.length;j<Q;j++){const q=i.get(z[j]);q.__webglTexture&&(e.deleteTexture(q.__webglTexture),o.memory.textures--),i.remove(z[j])}i.remove(R)}let I=0;function V(){I=0}function F(){const R=I;return R>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),I+=1,R}function H(R){const S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function Z(R,S){const z=i.get(R);if(R.isVideoTexture&&Rt(R),R.isRenderTargetTexture===!1&&R.version>0&&z.__version!==R.version){const j=R.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(z,R,S);return}}n.bindTexture(e.TEXTURE_2D,z.__webglTexture,e.TEXTURE0+S)}function $(R,S){const z=i.get(R);if(R.version>0&&z.__version!==R.version){X(z,R,S);return}n.bindTexture(e.TEXTURE_2D_ARRAY,z.__webglTexture,e.TEXTURE0+S)}function J(R,S){const z=i.get(R);if(R.version>0&&z.__version!==R.version){X(z,R,S);return}n.bindTexture(e.TEXTURE_3D,z.__webglTexture,e.TEXTURE0+S)}function G(R,S){const z=i.get(R);if(R.version>0&&z.__version!==R.version){nt(z,R,S);return}n.bindTexture(e.TEXTURE_CUBE_MAP,z.__webglTexture,e.TEXTURE0+S)}const rt={[uu]:e.REPEAT,[zr]:e.CLAMP_TO_EDGE,[fu]:e.MIRRORED_REPEAT},lt={[In]:e.NEAREST,[d0]:e.NEAREST_MIPMAP_NEAREST,[ga]:e.NEAREST_MIPMAP_LINEAR,[di]:e.LINEAR,[Kc]:e.LINEAR_MIPMAP_NEAREST,[Br]:e.LINEAR_MIPMAP_LINEAR},_t={[g0]:e.NEVER,[M0]:e.ALWAYS,[_0]:e.LESS,[hm]:e.LEQUAL,[v0]:e.EQUAL,[S0]:e.GEQUAL,[x0]:e.GREATER,[y0]:e.NOTEQUAL};function kt(R,S){if(S.type===hi&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===di||S.magFilter===Kc||S.magFilter===ga||S.magFilter===Br||S.minFilter===di||S.minFilter===Kc||S.minFilter===ga||S.minFilter===Br)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(R,e.TEXTURE_WRAP_S,rt[S.wrapS]),e.texParameteri(R,e.TEXTURE_WRAP_T,rt[S.wrapT]),(R===e.TEXTURE_3D||R===e.TEXTURE_2D_ARRAY)&&e.texParameteri(R,e.TEXTURE_WRAP_R,rt[S.wrapR]),e.texParameteri(R,e.TEXTURE_MAG_FILTER,lt[S.magFilter]),e.texParameteri(R,e.TEXTURE_MIN_FILTER,lt[S.minFilter]),S.compareFunction&&(e.texParameteri(R,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(R,e.TEXTURE_COMPARE_FUNC,_t[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===In||S.minFilter!==ga&&S.minFilter!==Br||S.type===hi&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");e.texParameterf(R,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function Gt(R,S){let z=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",T));const j=S.source;let Q=d.get(j);Q===void 0&&(Q={},d.set(j,Q));const q=H(S);if(q!==R.__cacheKey){Q[q]===void 0&&(Q[q]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,z=!0),Q[q].usedTimes++;const bt=Q[R.__cacheKey];bt!==void 0&&(Q[R.__cacheKey].usedTimes--,bt.usedTimes===0&&b(S)),R.__cacheKey=q,R.__webglTexture=Q[q].texture}return z}function X(R,S,z){let j=e.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(j=e.TEXTURE_2D_ARRAY),S.isData3DTexture&&(j=e.TEXTURE_3D);const Q=Gt(R,S),q=S.source;n.bindTexture(j,R.__webglTexture,e.TEXTURE0+z);const bt=i.get(q);if(q.version!==bt.__version||Q===!0){n.activeTexture(e.TEXTURE0+z);const at=Qt.getPrimaries(Qt.workingColorSpace),pt=S.colorSpace===ir?null:Qt.getPrimaries(S.colorSpace),Jt=S.colorSpace===ir||at===pt?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,S.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Jt);let tt=_(S.image,!1,r.maxTextureSize);tt=xe(S,tt);const mt=s.convert(S.format,S.colorSpace),Pt=s.convert(S.type);let Dt=x(S.internalFormat,mt,Pt,S.colorSpace,S.isVideoTexture);kt(j,S);let gt;const jt=S.mipmaps,Vt=S.isVideoTexture!==!0,ge=bt.__version===void 0||Q===!0,D=q.dataReady,st=C(S,tt);if(S.isDepthTexture)Dt=v(S.format===Xs,S.type),ge&&(Vt?n.texStorage2D(e.TEXTURE_2D,1,Dt,tt.width,tt.height):n.texImage2D(e.TEXTURE_2D,0,Dt,tt.width,tt.height,0,mt,Pt,null));else if(S.isDataTexture)if(jt.length>0){Vt&&ge&&n.texStorage2D(e.TEXTURE_2D,st,Dt,jt[0].width,jt[0].height);for(let W=0,K=jt.length;W<K;W++)gt=jt[W],Vt?D&&n.texSubImage2D(e.TEXTURE_2D,W,0,0,gt.width,gt.height,mt,Pt,gt.data):n.texImage2D(e.TEXTURE_2D,W,Dt,gt.width,gt.height,0,mt,Pt,gt.data);S.generateMipmaps=!1}else Vt?(ge&&n.texStorage2D(e.TEXTURE_2D,st,Dt,tt.width,tt.height),D&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,tt.width,tt.height,mt,Pt,tt.data)):n.texImage2D(e.TEXTURE_2D,0,Dt,tt.width,tt.height,0,mt,Pt,tt.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Vt&&ge&&n.texStorage3D(e.TEXTURE_2D_ARRAY,st,Dt,jt[0].width,jt[0].height,tt.depth);for(let W=0,K=jt.length;W<K;W++)if(gt=jt[W],S.format!==ii)if(mt!==null)if(Vt){if(D)if(S.layerUpdates.size>0){const dt=Eh(gt.width,gt.height,S.format,S.type);for(const ut of S.layerUpdates){const Ft=gt.data.subarray(ut*dt/gt.data.BYTES_PER_ELEMENT,(ut+1)*dt/gt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,W,0,0,ut,gt.width,gt.height,1,mt,Ft)}S.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,W,0,0,0,gt.width,gt.height,tt.depth,mt,gt.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,W,Dt,gt.width,gt.height,tt.depth,0,gt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Vt?D&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,W,0,0,0,gt.width,gt.height,tt.depth,mt,Pt,gt.data):n.texImage3D(e.TEXTURE_2D_ARRAY,W,Dt,gt.width,gt.height,tt.depth,0,mt,Pt,gt.data)}else{Vt&&ge&&n.texStorage2D(e.TEXTURE_2D,st,Dt,jt[0].width,jt[0].height);for(let W=0,K=jt.length;W<K;W++)gt=jt[W],S.format!==ii?mt!==null?Vt?D&&n.compressedTexSubImage2D(e.TEXTURE_2D,W,0,0,gt.width,gt.height,mt,gt.data):n.compressedTexImage2D(e.TEXTURE_2D,W,Dt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?D&&n.texSubImage2D(e.TEXTURE_2D,W,0,0,gt.width,gt.height,mt,Pt,gt.data):n.texImage2D(e.TEXTURE_2D,W,Dt,gt.width,gt.height,0,mt,Pt,gt.data)}else if(S.isDataArrayTexture)if(Vt){if(ge&&n.texStorage3D(e.TEXTURE_2D_ARRAY,st,Dt,tt.width,tt.height,tt.depth),D)if(S.layerUpdates.size>0){const W=Eh(tt.width,tt.height,S.format,S.type);for(const K of S.layerUpdates){const dt=tt.data.subarray(K*W/tt.data.BYTES_PER_ELEMENT,(K+1)*W/tt.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,K,tt.width,tt.height,1,mt,Pt,dt)}S.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,mt,Pt,tt.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,Dt,tt.width,tt.height,tt.depth,0,mt,Pt,tt.data);else if(S.isData3DTexture)Vt?(ge&&n.texStorage3D(e.TEXTURE_3D,st,Dt,tt.width,tt.height,tt.depth),D&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,mt,Pt,tt.data)):n.texImage3D(e.TEXTURE_3D,0,Dt,tt.width,tt.height,tt.depth,0,mt,Pt,tt.data);else if(S.isFramebufferTexture){if(ge)if(Vt)n.texStorage2D(e.TEXTURE_2D,st,Dt,tt.width,tt.height);else{let W=tt.width,K=tt.height;for(let dt=0;dt<st;dt++)n.texImage2D(e.TEXTURE_2D,dt,Dt,W,K,0,mt,Pt,null),W>>=1,K>>=1}}else if(jt.length>0){if(Vt&&ge){const W=Ct(jt[0]);n.texStorage2D(e.TEXTURE_2D,st,Dt,W.width,W.height)}for(let W=0,K=jt.length;W<K;W++)gt=jt[W],Vt?D&&n.texSubImage2D(e.TEXTURE_2D,W,0,0,mt,Pt,gt):n.texImage2D(e.TEXTURE_2D,W,Dt,mt,Pt,gt);S.generateMipmaps=!1}else if(Vt){if(ge){const W=Ct(tt);n.texStorage2D(e.TEXTURE_2D,st,Dt,W.width,W.height)}D&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,mt,Pt,tt)}else n.texImage2D(e.TEXTURE_2D,0,Dt,mt,Pt,tt);g(S)&&h(j),bt.__version=q.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function nt(R,S,z){if(S.image.length!==6)return;const j=Gt(R,S),Q=S.source;n.bindTexture(e.TEXTURE_CUBE_MAP,R.__webglTexture,e.TEXTURE0+z);const q=i.get(Q);if(Q.version!==q.__version||j===!0){n.activeTexture(e.TEXTURE0+z);const bt=Qt.getPrimaries(Qt.workingColorSpace),at=S.colorSpace===ir?null:Qt.getPrimaries(S.colorSpace),pt=S.colorSpace===ir||bt===at?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,S.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt);const Jt=S.isCompressedTexture||S.image[0].isCompressedTexture,tt=S.image[0]&&S.image[0].isDataTexture,mt=[];for(let K=0;K<6;K++)!Jt&&!tt?mt[K]=_(S.image[K],!0,r.maxCubemapSize):mt[K]=tt?S.image[K].image:S.image[K],mt[K]=xe(S,mt[K]);const Pt=mt[0],Dt=s.convert(S.format,S.colorSpace),gt=s.convert(S.type),jt=x(S.internalFormat,Dt,gt,S.colorSpace),Vt=S.isVideoTexture!==!0,ge=q.__version===void 0||j===!0,D=Q.dataReady;let st=C(S,Pt);kt(e.TEXTURE_CUBE_MAP,S);let W;if(Jt){Vt&&ge&&n.texStorage2D(e.TEXTURE_CUBE_MAP,st,jt,Pt.width,Pt.height);for(let K=0;K<6;K++){W=mt[K].mipmaps;for(let dt=0;dt<W.length;dt++){const ut=W[dt];S.format!==ii?Dt!==null?Vt?D&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt,0,0,ut.width,ut.height,Dt,ut.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt,jt,ut.width,ut.height,0,ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt,0,0,ut.width,ut.height,Dt,gt,ut.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt,jt,ut.width,ut.height,0,Dt,gt,ut.data)}}}else{if(W=S.mipmaps,Vt&&ge){W.length>0&&st++;const K=Ct(mt[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,st,jt,K.width,K.height)}for(let K=0;K<6;K++)if(tt){Vt?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,mt[K].width,mt[K].height,Dt,gt,mt[K].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,jt,mt[K].width,mt[K].height,0,Dt,gt,mt[K].data);for(let dt=0;dt<W.length;dt++){const Ft=W[dt].image[K].image;Vt?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt+1,0,0,Ft.width,Ft.height,Dt,gt,Ft.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt+1,jt,Ft.width,Ft.height,0,Dt,gt,Ft.data)}}else{Vt?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Dt,gt,mt[K]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,jt,Dt,gt,mt[K]);for(let dt=0;dt<W.length;dt++){const ut=W[dt];Vt?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt+1,0,0,Dt,gt,ut.image[K]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt+1,jt,Dt,gt,ut.image[K])}}}g(S)&&h(e.TEXTURE_CUBE_MAP),q.__version=Q.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function Mt(R,S,z,j,Q,q){const bt=s.convert(z.format,z.colorSpace),at=s.convert(z.type),pt=x(z.internalFormat,bt,at,z.colorSpace),Jt=i.get(S),tt=i.get(z);if(tt.__renderTarget=S,!Jt.__hasExternalTextures){const mt=Math.max(1,S.width>>q),Pt=Math.max(1,S.height>>q);Q===e.TEXTURE_3D||Q===e.TEXTURE_2D_ARRAY?n.texImage3D(Q,q,pt,mt,Pt,S.depth,0,bt,at,null):n.texImage2D(Q,q,pt,mt,Pt,0,bt,at,null)}n.bindFramebuffer(e.FRAMEBUFFER,R),qt(S)?a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,j,Q,tt.__webglTexture,0,Zt(S)):(Q===e.TEXTURE_2D||Q>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,j,Q,tt.__webglTexture,q),n.bindFramebuffer(e.FRAMEBUFFER,null)}function ot(R,S,z){if(e.bindRenderbuffer(e.RENDERBUFFER,R),S.depthBuffer){const j=S.depthTexture,Q=j&&j.isDepthTexture?j.type:null,q=v(S.stencilBuffer,Q),bt=S.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,at=Zt(S);qt(S)?a.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,at,q,S.width,S.height):z?e.renderbufferStorageMultisample(e.RENDERBUFFER,at,q,S.width,S.height):e.renderbufferStorage(e.RENDERBUFFER,q,S.width,S.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,bt,e.RENDERBUFFER,R)}else{const j=S.textures;for(let Q=0;Q<j.length;Q++){const q=j[Q],bt=s.convert(q.format,q.colorSpace),at=s.convert(q.type),pt=x(q.internalFormat,bt,at,q.colorSpace),Jt=Zt(S);z&&qt(S)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,Jt,pt,S.width,S.height):qt(S)?a.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Jt,pt,S.width,S.height):e.renderbufferStorage(e.RENDERBUFFER,pt,S.width,S.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function It(R,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(e.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=i.get(S.depthTexture);j.__renderTarget=S,(!j.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),Z(S.depthTexture,0);const Q=j.__webglTexture,q=Zt(S);if(S.depthTexture.format===Ds)qt(S)?a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,Q,0,q):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,Q,0);else if(S.depthTexture.format===Xs)qt(S)?a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,Q,0,q):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Ot(R){const S=i.get(R),z=R.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==R.depthTexture){const j=R.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),j){const Q=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,j.removeEventListener("dispose",Q)};j.addEventListener("dispose",Q),S.__depthDisposeCallback=Q}S.__boundDepthTexture=j}if(R.depthTexture&&!S.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");It(S.__webglFramebuffer,R)}else if(z){S.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(n.bindFramebuffer(e.FRAMEBUFFER,S.__webglFramebuffer[j]),S.__webglDepthbuffer[j]===void 0)S.__webglDepthbuffer[j]=e.createRenderbuffer(),ot(S.__webglDepthbuffer[j],R,!1);else{const Q=R.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,q=S.__webglDepthbuffer[j];e.bindRenderbuffer(e.RENDERBUFFER,q),e.framebufferRenderbuffer(e.FRAMEBUFFER,Q,e.RENDERBUFFER,q)}}else if(n.bindFramebuffer(e.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=e.createRenderbuffer(),ot(S.__webglDepthbuffer,R,!1);else{const j=R.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Q=S.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,Q),e.framebufferRenderbuffer(e.FRAMEBUFFER,j,e.RENDERBUFFER,Q)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Wt(R,S,z){const j=i.get(R);S!==void 0&&Mt(j.__webglFramebuffer,R,R.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),z!==void 0&&Ot(R)}function Ce(R){const S=R.texture,z=i.get(R),j=i.get(S);R.addEventListener("dispose",A);const Q=R.textures,q=R.isWebGLCubeRenderTarget===!0,bt=Q.length>1;if(bt||(j.__webglTexture===void 0&&(j.__webglTexture=e.createTexture()),j.__version=S.version,o.memory.textures++),q){z.__webglFramebuffer=[];for(let at=0;at<6;at++)if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer[at]=[];for(let pt=0;pt<S.mipmaps.length;pt++)z.__webglFramebuffer[at][pt]=e.createFramebuffer()}else z.__webglFramebuffer[at]=e.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer=[];for(let at=0;at<S.mipmaps.length;at++)z.__webglFramebuffer[at]=e.createFramebuffer()}else z.__webglFramebuffer=e.createFramebuffer();if(bt)for(let at=0,pt=Q.length;at<pt;at++){const Jt=i.get(Q[at]);Jt.__webglTexture===void 0&&(Jt.__webglTexture=e.createTexture(),o.memory.textures++)}if(R.samples>0&&qt(R)===!1){z.__webglMultisampledFramebuffer=e.createFramebuffer(),z.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let at=0;at<Q.length;at++){const pt=Q[at];z.__webglColorRenderbuffer[at]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,z.__webglColorRenderbuffer[at]);const Jt=s.convert(pt.format,pt.colorSpace),tt=s.convert(pt.type),mt=x(pt.internalFormat,Jt,tt,pt.colorSpace,R.isXRRenderTarget===!0),Pt=Zt(R);e.renderbufferStorageMultisample(e.RENDERBUFFER,Pt,mt,R.width,R.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+at,e.RENDERBUFFER,z.__webglColorRenderbuffer[at])}e.bindRenderbuffer(e.RENDERBUFFER,null),R.depthBuffer&&(z.__webglDepthRenderbuffer=e.createRenderbuffer(),ot(z.__webglDepthRenderbuffer,R,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(q){n.bindTexture(e.TEXTURE_CUBE_MAP,j.__webglTexture),kt(e.TEXTURE_CUBE_MAP,S);for(let at=0;at<6;at++)if(S.mipmaps&&S.mipmaps.length>0)for(let pt=0;pt<S.mipmaps.length;pt++)Mt(z.__webglFramebuffer[at][pt],R,S,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+at,pt);else Mt(z.__webglFramebuffer[at],R,S,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+at,0);g(S)&&h(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(bt){for(let at=0,pt=Q.length;at<pt;at++){const Jt=Q[at],tt=i.get(Jt);n.bindTexture(e.TEXTURE_2D,tt.__webglTexture),kt(e.TEXTURE_2D,Jt),Mt(z.__webglFramebuffer,R,Jt,e.COLOR_ATTACHMENT0+at,e.TEXTURE_2D,0),g(Jt)&&h(e.TEXTURE_2D)}n.unbindTexture()}else{let at=e.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(at=R.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(at,j.__webglTexture),kt(at,S),S.mipmaps&&S.mipmaps.length>0)for(let pt=0;pt<S.mipmaps.length;pt++)Mt(z.__webglFramebuffer[pt],R,S,e.COLOR_ATTACHMENT0,at,pt);else Mt(z.__webglFramebuffer,R,S,e.COLOR_ATTACHMENT0,at,0);g(S)&&h(at),n.unbindTexture()}R.depthBuffer&&Ot(R)}function Kt(R){const S=R.textures;for(let z=0,j=S.length;z<j;z++){const Q=S[z];if(g(Q)){const q=y(R),bt=i.get(Q).__webglTexture;n.bindTexture(q,bt),h(q),n.unbindTexture()}}}const Oe=[],N=[];function On(R){if(R.samples>0){if(qt(R)===!1){const S=R.textures,z=R.width,j=R.height;let Q=e.COLOR_BUFFER_BIT;const q=R.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,bt=i.get(R),at=S.length>1;if(at)for(let pt=0;pt<S.length;pt++)n.bindFramebuffer(e.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+pt,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,bt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+pt,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let pt=0;pt<S.length;pt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Q|=e.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Q|=e.STENCIL_BUFFER_BIT)),at){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,bt.__webglColorRenderbuffer[pt]);const Jt=i.get(S[pt]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Jt,0)}e.blitFramebuffer(0,0,z,j,0,0,z,j,Q,e.NEAREST),c===!0&&(Oe.length=0,N.length=0,Oe.push(e.COLOR_ATTACHMENT0+pt),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Oe.push(q),N.push(q),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,N)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Oe))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),at)for(let pt=0;pt<S.length;pt++){n.bindFramebuffer(e.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+pt,e.RENDERBUFFER,bt.__webglColorRenderbuffer[pt]);const Jt=i.get(S[pt]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,bt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+pt,e.TEXTURE_2D,Jt,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const S=R.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[S])}}}function Zt(R){return Math.min(r.maxSamples,R.samples)}function qt(R){const S=i.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Rt(R){const S=o.render.frame;u.get(R)!==S&&(u.set(R,S),R.update())}function xe(R,S){const z=R.colorSpace,j=R.format,Q=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||z!==io&&z!==ir&&(Qt.getTransfer(z)===ue?(j!==ii||Q!==ki)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),S}function Ct(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=V,this.setTexture2D=Z,this.setTexture2DArray=$,this.setTexture3D=J,this.setTextureCube=G,this.rebindTextures=Wt,this.setupRenderTarget=Ce,this.updateRenderTargetMipmap=Kt,this.updateMultisampleRenderTarget=On,this.setupDepthRenderbuffer=Ot,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=qt}function HE(e,t){function n(i,r=ir){let s;const o=Qt.getTransfer(r);if(i===ki)return e.UNSIGNED_BYTE;if(i===Mf)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Ef)return e.UNSIGNED_SHORT_5_5_5_1;if(i===sm)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===im)return e.BYTE;if(i===rm)return e.SHORT;if(i===Vo)return e.UNSIGNED_SHORT;if(i===Sf)return e.INT;if(i===Kr)return e.UNSIGNED_INT;if(i===hi)return e.FLOAT;if(i===ra)return e.HALF_FLOAT;if(i===om)return e.ALPHA;if(i===am)return e.RGB;if(i===ii)return e.RGBA;if(i===cm)return e.LUMINANCE;if(i===lm)return e.LUMINANCE_ALPHA;if(i===Ds)return e.DEPTH_COMPONENT;if(i===Xs)return e.DEPTH_STENCIL;if(i===bf)return e.RED;if(i===Tf)return e.RED_INTEGER;if(i===um)return e.RG;if(i===wf)return e.RG_INTEGER;if(i===Af)return e.RGBA_INTEGER;if(i===Qa||i===tc||i===ec||i===nc)if(o===ue)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Qa)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===tc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ec)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===nc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Qa)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===tc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ec)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===nc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===du||i===hu||i===pu||i===mu)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===du)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===hu)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===pu)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===mu)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===gu||i===_u||i===vu)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===gu||i===_u)return o===ue?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===vu)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===xu||i===yu||i===Su||i===Mu||i===Eu||i===bu||i===Tu||i===wu||i===Au||i===Cu||i===Ru||i===Pu||i===Iu||i===Du)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===xu)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===yu)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Su)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Mu)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Eu)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===bu)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Tu)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===wu)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Au)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Cu)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ru)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Pu)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Iu)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Du)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ic||i===Lu||i===Uu)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===ic)return o===ue?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Lu)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Uu)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===fm||i===Nu||i===Ou||i===Fu)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===ic)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Nu)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ou)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Fu)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ws?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}class GE extends pn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Fa extends en{constructor(){super(),this.isGroup=!0,this.type="Group"}}const WE={type:"move"};class bl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fa,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fa,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fa,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const g=n.getJointPose(_,i),h=this._getHandJoint(l,_);g!==null&&(h.matrix.fromArray(g.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=g.radius),h.visible=g!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=u.position.distanceTo(f.position),p=.02,m=.005;l.inputState.pinching&&d>p+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=p-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=n.getPose(t.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=n.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(WE)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const i=new Fa;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}}const XE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,YE=`
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

}`;class ZE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n,i){if(this.texture===null){const r=new dn,s=t.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,i=new Vi({vertexShader:XE,fragmentShader:YE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Vn(new Fc(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class qE extends ro{constructor(t,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,f=null,d=null,p=null,m=null;const _=new ZE,g=n.getContextAttributes();let h=null,y=null;const x=[],v=[],C=new re;let T=null;const A=new pn;A.viewport=new pe;const P=new pn;P.viewport=new pe;const b=[A,P],M=new GE;let I=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let nt=x[X];return nt===void 0&&(nt=new bl,x[X]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(X){let nt=x[X];return nt===void 0&&(nt=new bl,x[X]=nt),nt.getGripSpace()},this.getHand=function(X){let nt=x[X];return nt===void 0&&(nt=new bl,x[X]=nt),nt.getHandSpace()};function F(X){const nt=v.indexOf(X.inputSource);if(nt===-1)return;const Mt=x[nt];Mt!==void 0&&(Mt.update(X.inputSource,X.frame,l||o),Mt.dispatchEvent({type:X.type,data:X.inputSource}))}function H(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",Z);for(let X=0;X<x.length;X++){const nt=v[X];nt!==null&&(v[X]=null,x[X].disconnect(nt))}I=null,V=null,_.reset(),t.setRenderTarget(h),p=null,d=null,f=null,r=null,y=null,Gt.stop(),i.isPresenting=!1,t.setPixelRatio(T),t.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(h=t.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",H),r.addEventListener("inputsourceschange",Z),g.xrCompatible!==!0&&await n.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(C),r.renderState.layers===void 0){const nt={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,nt),r.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new Jr(p.framebufferWidth,p.framebufferHeight,{format:ii,type:ki,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let nt=null,Mt=null,ot=null;g.depth&&(ot=g.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,nt=g.stencil?Xs:Ds,Mt=g.stencil?Ws:Kr);const It={colorFormat:n.RGBA8,depthFormat:ot,scaleFactor:s};f=new XRWebGLBinding(r,n),d=f.createProjectionLayer(It),r.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),y=new Jr(d.textureWidth,d.textureHeight,{format:ii,type:ki,depthTexture:new Tm(d.textureWidth,d.textureHeight,Mt,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),Gt.setContext(r),Gt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Z(X){for(let nt=0;nt<X.removed.length;nt++){const Mt=X.removed[nt],ot=v.indexOf(Mt);ot>=0&&(v[ot]=null,x[ot].disconnect(Mt))}for(let nt=0;nt<X.added.length;nt++){const Mt=X.added[nt];let ot=v.indexOf(Mt);if(ot===-1){for(let Ot=0;Ot<x.length;Ot++)if(Ot>=v.length){v.push(Mt),ot=Ot;break}else if(v[Ot]===null){v[Ot]=Mt,ot=Ot;break}if(ot===-1)break}const It=x[ot];It&&It.connect(Mt)}}const $=new O,J=new O;function G(X,nt,Mt){$.setFromMatrixPosition(nt.matrixWorld),J.setFromMatrixPosition(Mt.matrixWorld);const ot=$.distanceTo(J),It=nt.projectionMatrix.elements,Ot=Mt.projectionMatrix.elements,Wt=It[14]/(It[10]-1),Ce=It[14]/(It[10]+1),Kt=(It[9]+1)/It[5],Oe=(It[9]-1)/It[5],N=(It[8]-1)/It[0],On=(Ot[8]+1)/Ot[0],Zt=Wt*N,qt=Wt*On,Rt=ot/(-N+On),xe=Rt*-N;if(nt.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(xe),X.translateZ(Rt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),It[10]===-1)X.projectionMatrix.copy(nt.projectionMatrix),X.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const Ct=Wt+Rt,R=Ce+Rt,S=Zt-xe,z=qt+(ot-xe),j=Kt*Ce/R*Ct,Q=Oe*Ce/R*Ct;X.projectionMatrix.makePerspective(S,z,j,Q,Ct,R),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function rt(X,nt){nt===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(nt.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;let nt=X.near,Mt=X.far;_.texture!==null&&(_.depthNear>0&&(nt=_.depthNear),_.depthFar>0&&(Mt=_.depthFar)),M.near=P.near=A.near=nt,M.far=P.far=A.far=Mt,(I!==M.near||V!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),I=M.near,V=M.far),A.layers.mask=X.layers.mask|2,P.layers.mask=X.layers.mask|4,M.layers.mask=A.layers.mask|P.layers.mask;const ot=X.parent,It=M.cameras;rt(M,ot);for(let Ot=0;Ot<It.length;Ot++)rt(It[Ot],ot);It.length===2?G(M,A,P):M.projectionMatrix.copy(A.projectionMatrix),lt(X,M,ot)};function lt(X,nt,Mt){Mt===null?X.matrix.copy(nt.matrixWorld):(X.matrix.copy(Mt.matrixWorld),X.matrix.invert(),X.matrix.multiply(nt.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(nt.projectionMatrix),X.projectionMatrixInverse.copy(nt.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=$o*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(X){c=X,d!==null&&(d.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let _t=null;function kt(X,nt){if(u=nt.getViewerPose(l||o),m=nt,u!==null){const Mt=u.views;p!==null&&(t.setRenderTargetFramebuffer(y,p.framebuffer),t.setRenderTarget(y));let ot=!1;Mt.length!==M.cameras.length&&(M.cameras.length=0,ot=!0);for(let Ot=0;Ot<Mt.length;Ot++){const Wt=Mt[Ot];let Ce=null;if(p!==null)Ce=p.getViewport(Wt);else{const Oe=f.getViewSubImage(d,Wt);Ce=Oe.viewport,Ot===0&&(t.setRenderTargetTextures(y,Oe.colorTexture,d.ignoreDepthValues?void 0:Oe.depthStencilTexture),t.setRenderTarget(y))}let Kt=b[Ot];Kt===void 0&&(Kt=new pn,Kt.layers.enable(Ot),Kt.viewport=new pe,b[Ot]=Kt),Kt.matrix.fromArray(Wt.transform.matrix),Kt.matrix.decompose(Kt.position,Kt.quaternion,Kt.scale),Kt.projectionMatrix.fromArray(Wt.projectionMatrix),Kt.projectionMatrixInverse.copy(Kt.projectionMatrix).invert(),Kt.viewport.set(Ce.x,Ce.y,Ce.width,Ce.height),Ot===0&&(M.matrix.copy(Kt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ot===!0&&M.cameras.push(Kt)}const It=r.enabledFeatures;if(It&&It.includes("depth-sensing")){const Ot=f.getDepthInformation(Mt[0]);Ot&&Ot.isValid&&Ot.texture&&_.init(t,Ot,r.renderState)}}for(let Mt=0;Mt<x.length;Mt++){const ot=v[Mt],It=x[Mt];ot!==null&&It!==void 0&&It.update(ot,nt,l||o)}_t&&_t(X,nt),nt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:nt}),m=null}const Gt=new bm;Gt.setAnimationLoop(kt),this.setAnimationLoop=function(X){_t=X},this.dispose=function(){}}}const Cr=new Xn,jE=new ne;function KE(e,t){function n(g,h){g.matrixAutoUpdate===!0&&g.updateMatrix(),h.value.copy(g.matrix)}function i(g,h){h.color.getRGB(g.fogColor.value,Sm(e)),h.isFog?(g.fogNear.value=h.near,g.fogFar.value=h.far):h.isFogExp2&&(g.fogDensity.value=h.density)}function r(g,h,y,x,v){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(g,h):h.isMeshToonMaterial?(s(g,h),f(g,h)):h.isMeshPhongMaterial?(s(g,h),u(g,h)):h.isMeshStandardMaterial?(s(g,h),d(g,h),h.isMeshPhysicalMaterial&&p(g,h,v)):h.isMeshMatcapMaterial?(s(g,h),m(g,h)):h.isMeshDepthMaterial?s(g,h):h.isMeshDistanceMaterial?(s(g,h),_(g,h)):h.isMeshNormalMaterial?s(g,h):h.isLineBasicMaterial?(o(g,h),h.isLineDashedMaterial&&a(g,h)):h.isPointsMaterial?c(g,h,y,x):h.isSpriteMaterial?l(g,h):h.isShadowMaterial?(g.color.value.copy(h.color),g.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(g,h){g.opacity.value=h.opacity,h.color&&g.diffuse.value.copy(h.color),h.emissive&&g.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(g.map.value=h.map,n(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.bumpMap&&(g.bumpMap.value=h.bumpMap,n(h.bumpMap,g.bumpMapTransform),g.bumpScale.value=h.bumpScale,h.side===gn&&(g.bumpScale.value*=-1)),h.normalMap&&(g.normalMap.value=h.normalMap,n(h.normalMap,g.normalMapTransform),g.normalScale.value.copy(h.normalScale),h.side===gn&&g.normalScale.value.negate()),h.displacementMap&&(g.displacementMap.value=h.displacementMap,n(h.displacementMap,g.displacementMapTransform),g.displacementScale.value=h.displacementScale,g.displacementBias.value=h.displacementBias),h.emissiveMap&&(g.emissiveMap.value=h.emissiveMap,n(h.emissiveMap,g.emissiveMapTransform)),h.specularMap&&(g.specularMap.value=h.specularMap,n(h.specularMap,g.specularMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest);const y=t.get(h),x=y.envMap,v=y.envMapRotation;x&&(g.envMap.value=x,Cr.copy(v),Cr.x*=-1,Cr.y*=-1,Cr.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Cr.y*=-1,Cr.z*=-1),g.envMapRotation.value.setFromMatrix4(jE.makeRotationFromEuler(Cr)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=h.reflectivity,g.ior.value=h.ior,g.refractionRatio.value=h.refractionRatio),h.lightMap&&(g.lightMap.value=h.lightMap,g.lightMapIntensity.value=h.lightMapIntensity,n(h.lightMap,g.lightMapTransform)),h.aoMap&&(g.aoMap.value=h.aoMap,g.aoMapIntensity.value=h.aoMapIntensity,n(h.aoMap,g.aoMapTransform))}function o(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,h.map&&(g.map.value=h.map,n(h.map,g.mapTransform))}function a(g,h){g.dashSize.value=h.dashSize,g.totalSize.value=h.dashSize+h.gapSize,g.scale.value=h.scale}function c(g,h,y,x){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.size.value=h.size*y,g.scale.value=x*.5,h.map&&(g.map.value=h.map,n(h.map,g.uvTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function l(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.rotation.value=h.rotation,h.map&&(g.map.value=h.map,n(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function u(g,h){g.specular.value.copy(h.specular),g.shininess.value=Math.max(h.shininess,1e-4)}function f(g,h){h.gradientMap&&(g.gradientMap.value=h.gradientMap)}function d(g,h){g.metalness.value=h.metalness,h.metalnessMap&&(g.metalnessMap.value=h.metalnessMap,n(h.metalnessMap,g.metalnessMapTransform)),g.roughness.value=h.roughness,h.roughnessMap&&(g.roughnessMap.value=h.roughnessMap,n(h.roughnessMap,g.roughnessMapTransform)),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)}function p(g,h,y){g.ior.value=h.ior,h.sheen>0&&(g.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),g.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(g.sheenColorMap.value=h.sheenColorMap,n(h.sheenColorMap,g.sheenColorMapTransform)),h.sheenRoughnessMap&&(g.sheenRoughnessMap.value=h.sheenRoughnessMap,n(h.sheenRoughnessMap,g.sheenRoughnessMapTransform))),h.clearcoat>0&&(g.clearcoat.value=h.clearcoat,g.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(g.clearcoatMap.value=h.clearcoatMap,n(h.clearcoatMap,g.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,n(h.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(g.clearcoatNormalMap.value=h.clearcoatNormalMap,n(h.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===gn&&g.clearcoatNormalScale.value.negate())),h.dispersion>0&&(g.dispersion.value=h.dispersion),h.iridescence>0&&(g.iridescence.value=h.iridescence,g.iridescenceIOR.value=h.iridescenceIOR,g.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(g.iridescenceMap.value=h.iridescenceMap,n(h.iridescenceMap,g.iridescenceMapTransform)),h.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=h.iridescenceThicknessMap,n(h.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),h.transmission>0&&(g.transmission.value=h.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),h.transmissionMap&&(g.transmissionMap.value=h.transmissionMap,n(h.transmissionMap,g.transmissionMapTransform)),g.thickness.value=h.thickness,h.thicknessMap&&(g.thicknessMap.value=h.thicknessMap,n(h.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=h.attenuationDistance,g.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(g.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(g.anisotropyMap.value=h.anisotropyMap,n(h.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=h.specularIntensity,g.specularColor.value.copy(h.specularColor),h.specularColorMap&&(g.specularColorMap.value=h.specularColorMap,n(h.specularColorMap,g.specularColorMapTransform)),h.specularIntensityMap&&(g.specularIntensityMap.value=h.specularIntensityMap,n(h.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,h){h.matcap&&(g.matcap.value=h.matcap)}function _(g,h){const y=t.get(h).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function JE(e,t,n,i){let r={},s={},o=[];const a=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,x){const v=x.program;i.uniformBlockBinding(y,v)}function l(y,x){let v=r[y.id];v===void 0&&(m(y),v=u(y),r[y.id]=v,y.addEventListener("dispose",g));const C=x.program;i.updateUBOMapping(y,C);const T=t.render.frame;s[y.id]!==T&&(d(y),s[y.id]=T)}function u(y){const x=f();y.__bindingPointIndex=x;const v=e.createBuffer(),C=y.__size,T=y.usage;return e.bindBuffer(e.UNIFORM_BUFFER,v),e.bufferData(e.UNIFORM_BUFFER,C,T),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,x,v),v}function f(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const x=r[y.id],v=y.uniforms,C=y.__cache;e.bindBuffer(e.UNIFORM_BUFFER,x);for(let T=0,A=v.length;T<A;T++){const P=Array.isArray(v[T])?v[T]:[v[T]];for(let b=0,M=P.length;b<M;b++){const I=P[b];if(p(I,T,b,C)===!0){const V=I.__offset,F=Array.isArray(I.value)?I.value:[I.value];let H=0;for(let Z=0;Z<F.length;Z++){const $=F[Z],J=_($);typeof $=="number"||typeof $=="boolean"?(I.__data[0]=$,e.bufferSubData(e.UNIFORM_BUFFER,V+H,I.__data)):$.isMatrix3?(I.__data[0]=$.elements[0],I.__data[1]=$.elements[1],I.__data[2]=$.elements[2],I.__data[3]=0,I.__data[4]=$.elements[3],I.__data[5]=$.elements[4],I.__data[6]=$.elements[5],I.__data[7]=0,I.__data[8]=$.elements[6],I.__data[9]=$.elements[7],I.__data[10]=$.elements[8],I.__data[11]=0):($.toArray(I.__data,H),H+=J.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,V,I.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(y,x,v,C){const T=y.value,A=x+"_"+v;if(C[A]===void 0)return typeof T=="number"||typeof T=="boolean"?C[A]=T:C[A]=T.clone(),!0;{const P=C[A];if(typeof T=="number"||typeof T=="boolean"){if(P!==T)return C[A]=T,!0}else if(P.equals(T)===!1)return P.copy(T),!0}return!1}function m(y){const x=y.uniforms;let v=0;const C=16;for(let A=0,P=x.length;A<P;A++){const b=Array.isArray(x[A])?x[A]:[x[A]];for(let M=0,I=b.length;M<I;M++){const V=b[M],F=Array.isArray(V.value)?V.value:[V.value];for(let H=0,Z=F.length;H<Z;H++){const $=F[H],J=_($),G=v%C,rt=G%J.boundary,lt=G+rt;v+=rt,lt!==0&&C-lt<J.storage&&(v+=C-lt),V.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=v,v+=J.storage}}}const T=v%C;return T>0&&(v+=C-T),y.__size=v,y.__cache={},this}function _(y){const x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function g(y){const x=y.target;x.removeEventListener("dispose",g);const v=o.indexOf(x.__bindingPointIndex);o.splice(v,1),e.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function h(){for(const y in r)e.deleteBuffer(r[y]);o=[],r={},s={}}return{bind:c,update:l,dispose:h}}class QE{constructor(t={}){const{canvas:n=V0(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,h=null;const y=[],x=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=kn,this.toneMapping=dr,this.toneMappingExposure=1;const v=this;let C=!1,T=0,A=0,P=null,b=-1,M=null;const I=new pe,V=new pe;let F=null;const H=new Xt(0);let Z=0,$=n.width,J=n.height,G=1,rt=null,lt=null;const _t=new pe(0,0,$,J),kt=new pe(0,0,$,J);let Gt=!1;const X=new If;let nt=!1,Mt=!1;const ot=new ne,It=new ne,Ot=new O,Wt=new pe,Ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Kt=!1;function Oe(){return P===null?G:1}let N=i;function On(E,L){return n.getContext(E,L)}try{const E={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${yf}`),n.addEventListener("webglcontextlost",K,!1),n.addEventListener("webglcontextrestored",dt,!1),n.addEventListener("webglcontextcreationerror",ut,!1),N===null){const L="webgl2";if(N=On(L,E),N===null)throw On(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Zt,qt,Rt,xe,Ct,R,S,z,j,Q,q,bt,at,pt,Jt,tt,mt,Pt,Dt,gt,jt,Vt,ge,D;function st(){Zt=new rM(N),Zt.init(),Vt=new HE(N,Zt),qt=new JS(N,Zt,t,Vt),Rt=new kE(N,Zt),qt.reverseDepthBuffer&&d&&Rt.buffers.depth.setReversed(!0),xe=new aM(N),Ct=new TE,R=new $E(N,Zt,Rt,Ct,qt,Vt,xe),S=new tM(v),z=new iM(v),j=new px(N),ge=new jS(N,j),Q=new sM(N,j,xe,ge),q=new lM(N,Q,j,xe),Dt=new cM(N,qt,R),tt=new QS(Ct),bt=new bE(v,S,z,Zt,qt,ge,tt),at=new KE(v,Ct),pt=new AE,Jt=new LE(Zt),Pt=new qS(v,S,z,Rt,q,p,c),mt=new zE(v,q,qt),D=new JE(N,xe,qt,Rt),gt=new KS(N,Zt,xe),jt=new oM(N,Zt,xe),xe.programs=bt.programs,v.capabilities=qt,v.extensions=Zt,v.properties=Ct,v.renderLists=pt,v.shadowMap=mt,v.state=Rt,v.info=xe}st();const W=new qE(v,N);this.xr=W,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const E=Zt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Zt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(E){E!==void 0&&(G=E,this.setSize($,J,!1))},this.getSize=function(E){return E.set($,J)},this.setSize=function(E,L,B=!0){if(W.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=E,J=L,n.width=Math.floor(E*G),n.height=Math.floor(L*G),B===!0&&(n.style.width=E+"px",n.style.height=L+"px"),this.setViewport(0,0,E,L)},this.getDrawingBufferSize=function(E){return E.set($*G,J*G).floor()},this.setDrawingBufferSize=function(E,L,B){$=E,J=L,G=B,n.width=Math.floor(E*B),n.height=Math.floor(L*B),this.setViewport(0,0,E,L)},this.getCurrentViewport=function(E){return E.copy(I)},this.getViewport=function(E){return E.copy(_t)},this.setViewport=function(E,L,B,k){E.isVector4?_t.set(E.x,E.y,E.z,E.w):_t.set(E,L,B,k),Rt.viewport(I.copy(_t).multiplyScalar(G).round())},this.getScissor=function(E){return E.copy(kt)},this.setScissor=function(E,L,B,k){E.isVector4?kt.set(E.x,E.y,E.z,E.w):kt.set(E,L,B,k),Rt.scissor(V.copy(kt).multiplyScalar(G).round())},this.getScissorTest=function(){return Gt},this.setScissorTest=function(E){Rt.setScissorTest(Gt=E)},this.setOpaqueSort=function(E){rt=E},this.setTransparentSort=function(E){lt=E},this.getClearColor=function(E){return E.copy(Pt.getClearColor())},this.setClearColor=function(){Pt.setClearColor.apply(Pt,arguments)},this.getClearAlpha=function(){return Pt.getClearAlpha()},this.setClearAlpha=function(){Pt.setClearAlpha.apply(Pt,arguments)},this.clear=function(E=!0,L=!0,B=!0){let k=0;if(E){let U=!1;if(P!==null){const et=P.texture.format;U=et===Af||et===wf||et===Tf}if(U){const et=P.texture.type,ft=et===ki||et===Kr||et===Vo||et===Ws||et===Mf||et===Ef,vt=Pt.getClearColor(),xt=Pt.getClearAlpha(),Ut=vt.r,zt=vt.g,yt=vt.b;ft?(m[0]=Ut,m[1]=zt,m[2]=yt,m[3]=xt,N.clearBufferuiv(N.COLOR,0,m)):(_[0]=Ut,_[1]=zt,_[2]=yt,_[3]=xt,N.clearBufferiv(N.COLOR,0,_))}else k|=N.COLOR_BUFFER_BIT}L&&(k|=N.DEPTH_BUFFER_BIT),B&&(k|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",K,!1),n.removeEventListener("webglcontextrestored",dt,!1),n.removeEventListener("webglcontextcreationerror",ut,!1),pt.dispose(),Jt.dispose(),Ct.dispose(),S.dispose(),z.dispose(),q.dispose(),ge.dispose(),D.dispose(),bt.dispose(),W.dispose(),W.removeEventListener("sessionstart",fd),W.removeEventListener("sessionend",dd),Mr.stop()};function K(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const E=xe.autoReset,L=mt.enabled,B=mt.autoUpdate,k=mt.needsUpdate,U=mt.type;st(),xe.autoReset=E,mt.enabled=L,mt.autoUpdate=B,mt.needsUpdate=k,mt.type=U}function ut(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Ft(E){const L=E.target;L.removeEventListener("dispose",Ft),Le(L)}function Le(E){rn(E),Ct.remove(E)}function rn(E){const L=Ct.get(E).programs;L!==void 0&&(L.forEach(function(B){bt.releaseProgram(B)}),E.isShaderMaterial&&bt.releaseShaderCache(E))}this.renderBufferDirect=function(E,L,B,k,U,et){L===null&&(L=Ce);const ft=U.isMesh&&U.matrixWorld.determinant()<0,vt=W_(E,L,B,k,U);Rt.setMaterial(k,ft);let xt=B.index,Ut=1;if(k.wireframe===!0){if(xt=Q.getWireframeAttribute(B),xt===void 0)return;Ut=2}const zt=B.drawRange,yt=B.attributes.position;let ie=zt.start*Ut,_e=(zt.start+zt.count)*Ut;et!==null&&(ie=Math.max(ie,et.start*Ut),_e=Math.min(_e,(et.start+et.count)*Ut)),xt!==null?(ie=Math.max(ie,0),_e=Math.min(_e,xt.count)):yt!=null&&(ie=Math.max(ie,0),_e=Math.min(_e,yt.count));const ye=_e-ie;if(ye<0||ye===1/0)return;ge.setup(U,k,vt,B,xt);let hn,se=gt;if(xt!==null&&(hn=j.get(xt),se=jt,se.setIndex(hn)),U.isMesh)k.wireframe===!0?(Rt.setLineWidth(k.wireframeLinewidth*Oe()),se.setMode(N.LINES)):se.setMode(N.TRIANGLES);else if(U.isLine){let Tt=k.linewidth;Tt===void 0&&(Tt=1),Rt.setLineWidth(Tt*Oe()),U.isLineSegments?se.setMode(N.LINES):U.isLineLoop?se.setMode(N.LINE_LOOP):se.setMode(N.LINE_STRIP)}else U.isPoints?se.setMode(N.POINTS):U.isSprite&&se.setMode(N.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)se.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Zt.get("WEBGL_multi_draw"))se.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Tt=U._multiDrawStarts,Ei=U._multiDrawCounts,oe=U._multiDrawCount,qn=xt?j.get(xt).bytesPerElement:1,cs=Ct.get(k).currentProgram.getUniforms();for(let En=0;En<oe;En++)cs.setValue(N,"_gl_DrawID",En),se.render(Tt[En]/qn,Ei[En])}else if(U.isInstancedMesh)se.renderInstances(ie,ye,U.count);else if(B.isInstancedBufferGeometry){const Tt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Ei=Math.min(B.instanceCount,Tt);se.renderInstances(ie,ye,Ei)}else se.render(ie,ye)};function ae(E,L,B){E.transparent===!0&&E.side===Li&&E.forceSinglePass===!1?(E.side=gn,E.needsUpdate=!0,ha(E,L,B),E.side=gr,E.needsUpdate=!0,ha(E,L,B),E.side=Li):ha(E,L,B)}this.compile=function(E,L,B=null){B===null&&(B=E),h=Jt.get(B),h.init(L),x.push(h),B.traverseVisible(function(U){U.isLight&&U.layers.test(L.layers)&&(h.pushLight(U),U.castShadow&&h.pushShadow(U))}),E!==B&&E.traverseVisible(function(U){U.isLight&&U.layers.test(L.layers)&&(h.pushLight(U),U.castShadow&&h.pushShadow(U))}),h.setupLights();const k=new Set;return E.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const et=U.material;if(et)if(Array.isArray(et))for(let ft=0;ft<et.length;ft++){const vt=et[ft];ae(vt,B,U),k.add(vt)}else ae(et,B,U),k.add(et)}),x.pop(),h=null,k},this.compileAsync=function(E,L,B=null){const k=this.compile(E,L,B);return new Promise(U=>{function et(){if(k.forEach(function(ft){Ct.get(ft).currentProgram.isReady()&&k.delete(ft)}),k.size===0){U(E);return}setTimeout(et,10)}Zt.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let Zn=null;function Mi(E){Zn&&Zn(E)}function fd(){Mr.stop()}function dd(){Mr.start()}const Mr=new bm;Mr.setAnimationLoop(Mi),typeof self<"u"&&Mr.setContext(self),this.setAnimationLoop=function(E){Zn=E,W.setAnimationLoop(E),E===null?Mr.stop():Mr.start()},W.addEventListener("sessionstart",fd),W.addEventListener("sessionend",dd),this.render=function(E,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(W.cameraAutoUpdate===!0&&W.updateCamera(L),L=W.getCamera()),E.isScene===!0&&E.onBeforeRender(v,E,L,P),h=Jt.get(E,x.length),h.init(L),x.push(h),It.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),X.setFromProjectionMatrix(It),Mt=this.localClippingEnabled,nt=tt.init(this.clippingPlanes,Mt),g=pt.get(E,y.length),g.init(),y.push(g),W.enabled===!0&&W.isPresenting===!0){const et=v.xr.getDepthSensingMesh();et!==null&&qc(et,L,-1/0,v.sortObjects)}qc(E,L,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(rt,lt),Kt=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,Kt&&Pt.addToRenderList(g,E),this.info.render.frame++,nt===!0&&tt.beginShadows();const B=h.state.shadowsArray;mt.render(B,E,L),nt===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset();const k=g.opaque,U=g.transmissive;if(h.setupLights(),L.isArrayCamera){const et=L.cameras;if(U.length>0)for(let ft=0,vt=et.length;ft<vt;ft++){const xt=et[ft];pd(k,U,E,xt)}Kt&&Pt.render(E);for(let ft=0,vt=et.length;ft<vt;ft++){const xt=et[ft];hd(g,E,xt,xt.viewport)}}else U.length>0&&pd(k,U,E,L),Kt&&Pt.render(E),hd(g,E,L);P!==null&&(R.updateMultisampleRenderTarget(P),R.updateRenderTargetMipmap(P)),E.isScene===!0&&E.onAfterRender(v,E,L),ge.resetDefaultState(),b=-1,M=null,x.pop(),x.length>0?(h=x[x.length-1],nt===!0&&tt.setGlobalState(v.clippingPlanes,h.state.camera)):h=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function qc(E,L,B,k){if(E.visible===!1)return;if(E.layers.test(L.layers)){if(E.isGroup)B=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(L);else if(E.isLight)h.pushLight(E),E.castShadow&&h.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||X.intersectsSprite(E)){k&&Wt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(It);const ft=q.update(E),vt=E.material;vt.visible&&g.push(E,ft,vt,B,Wt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||X.intersectsObject(E))){const ft=q.update(E),vt=E.material;if(k&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Wt.copy(E.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),Wt.copy(ft.boundingSphere.center)),Wt.applyMatrix4(E.matrixWorld).applyMatrix4(It)),Array.isArray(vt)){const xt=ft.groups;for(let Ut=0,zt=xt.length;Ut<zt;Ut++){const yt=xt[Ut],ie=vt[yt.materialIndex];ie&&ie.visible&&g.push(E,ft,ie,B,Wt.z,yt)}}else vt.visible&&g.push(E,ft,vt,B,Wt.z,null)}}const et=E.children;for(let ft=0,vt=et.length;ft<vt;ft++)qc(et[ft],L,B,k)}function hd(E,L,B,k){const U=E.opaque,et=E.transmissive,ft=E.transparent;h.setupLightsView(B),nt===!0&&tt.setGlobalState(v.clippingPlanes,B),k&&Rt.viewport(I.copy(k)),U.length>0&&da(U,L,B),et.length>0&&da(et,L,B),ft.length>0&&da(ft,L,B),Rt.buffers.depth.setTest(!0),Rt.buffers.depth.setMask(!0),Rt.buffers.color.setMask(!0),Rt.setPolygonOffset(!1)}function pd(E,L,B,k){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[k.id]===void 0&&(h.state.transmissionRenderTarget[k.id]=new Jr(1,1,{generateMipmaps:!0,type:Zt.has("EXT_color_buffer_half_float")||Zt.has("EXT_color_buffer_float")?ra:ki,minFilter:Br,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qt.workingColorSpace}));const et=h.state.transmissionRenderTarget[k.id],ft=k.viewport||I;et.setSize(ft.z,ft.w);const vt=v.getRenderTarget();v.setRenderTarget(et),v.getClearColor(H),Z=v.getClearAlpha(),Z<1&&v.setClearColor(16777215,.5),v.clear(),Kt&&Pt.render(B);const xt=v.toneMapping;v.toneMapping=dr;const Ut=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),h.setupLightsView(k),nt===!0&&tt.setGlobalState(v.clippingPlanes,k),da(E,B,k),R.updateMultisampleRenderTarget(et),R.updateRenderTargetMipmap(et),Zt.has("WEBGL_multisampled_render_to_texture")===!1){let zt=!1;for(let yt=0,ie=L.length;yt<ie;yt++){const _e=L[yt],ye=_e.object,hn=_e.geometry,se=_e.material,Tt=_e.group;if(se.side===Li&&ye.layers.test(k.layers)){const Ei=se.side;se.side=gn,se.needsUpdate=!0,md(ye,B,k,hn,se,Tt),se.side=Ei,se.needsUpdate=!0,zt=!0}}zt===!0&&(R.updateMultisampleRenderTarget(et),R.updateRenderTargetMipmap(et))}v.setRenderTarget(vt),v.setClearColor(H,Z),Ut!==void 0&&(k.viewport=Ut),v.toneMapping=xt}function da(E,L,B){const k=L.isScene===!0?L.overrideMaterial:null;for(let U=0,et=E.length;U<et;U++){const ft=E[U],vt=ft.object,xt=ft.geometry,Ut=k===null?ft.material:k,zt=ft.group;vt.layers.test(B.layers)&&md(vt,L,B,xt,Ut,zt)}}function md(E,L,B,k,U,et){E.onBeforeRender(v,L,B,k,U,et),E.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),U.onBeforeRender(v,L,B,k,E,et),U.transparent===!0&&U.side===Li&&U.forceSinglePass===!1?(U.side=gn,U.needsUpdate=!0,v.renderBufferDirect(B,L,k,U,E,et),U.side=gr,U.needsUpdate=!0,v.renderBufferDirect(B,L,k,U,E,et),U.side=Li):v.renderBufferDirect(B,L,k,U,E,et),E.onAfterRender(v,L,B,k,U,et)}function ha(E,L,B){L.isScene!==!0&&(L=Ce);const k=Ct.get(E),U=h.state.lights,et=h.state.shadowsArray,ft=U.state.version,vt=bt.getParameters(E,U.state,et,L,B),xt=bt.getProgramCacheKey(vt);let Ut=k.programs;k.environment=E.isMeshStandardMaterial?L.environment:null,k.fog=L.fog,k.envMap=(E.isMeshStandardMaterial?z:S).get(E.envMap||k.environment),k.envMapRotation=k.environment!==null&&E.envMap===null?L.environmentRotation:E.envMapRotation,Ut===void 0&&(E.addEventListener("dispose",Ft),Ut=new Map,k.programs=Ut);let zt=Ut.get(xt);if(zt!==void 0){if(k.currentProgram===zt&&k.lightsStateVersion===ft)return _d(E,vt),zt}else vt.uniforms=bt.getUniforms(E),E.onBeforeCompile(vt,v),zt=bt.acquireProgram(vt,xt),Ut.set(xt,zt),k.uniforms=vt.uniforms;const yt=k.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(yt.clippingPlanes=tt.uniform),_d(E,vt),k.needsLights=Y_(E),k.lightsStateVersion=ft,k.needsLights&&(yt.ambientLightColor.value=U.state.ambient,yt.lightProbe.value=U.state.probe,yt.directionalLights.value=U.state.directional,yt.directionalLightShadows.value=U.state.directionalShadow,yt.spotLights.value=U.state.spot,yt.spotLightShadows.value=U.state.spotShadow,yt.rectAreaLights.value=U.state.rectArea,yt.ltc_1.value=U.state.rectAreaLTC1,yt.ltc_2.value=U.state.rectAreaLTC2,yt.pointLights.value=U.state.point,yt.pointLightShadows.value=U.state.pointShadow,yt.hemisphereLights.value=U.state.hemi,yt.directionalShadowMap.value=U.state.directionalShadowMap,yt.directionalShadowMatrix.value=U.state.directionalShadowMatrix,yt.spotShadowMap.value=U.state.spotShadowMap,yt.spotLightMatrix.value=U.state.spotLightMatrix,yt.spotLightMap.value=U.state.spotLightMap,yt.pointShadowMap.value=U.state.pointShadowMap,yt.pointShadowMatrix.value=U.state.pointShadowMatrix),k.currentProgram=zt,k.uniformsList=null,zt}function gd(E){if(E.uniformsList===null){const L=E.currentProgram.getUniforms();E.uniformsList=rc.seqWithValue(L.seq,E.uniforms)}return E.uniformsList}function _d(E,L){const B=Ct.get(E);B.outputColorSpace=L.outputColorSpace,B.batching=L.batching,B.batchingColor=L.batchingColor,B.instancing=L.instancing,B.instancingColor=L.instancingColor,B.instancingMorph=L.instancingMorph,B.skinning=L.skinning,B.morphTargets=L.morphTargets,B.morphNormals=L.morphNormals,B.morphColors=L.morphColors,B.morphTargetsCount=L.morphTargetsCount,B.numClippingPlanes=L.numClippingPlanes,B.numIntersection=L.numClipIntersection,B.vertexAlphas=L.vertexAlphas,B.vertexTangents=L.vertexTangents,B.toneMapping=L.toneMapping}function W_(E,L,B,k,U){L.isScene!==!0&&(L=Ce),R.resetTextureUnits();const et=L.fog,ft=k.isMeshStandardMaterial?L.environment:null,vt=P===null?v.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:io,xt=(k.isMeshStandardMaterial?z:S).get(k.envMap||ft),Ut=k.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,zt=!!B.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),yt=!!B.morphAttributes.position,ie=!!B.morphAttributes.normal,_e=!!B.morphAttributes.color;let ye=dr;k.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ye=v.toneMapping);const hn=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,se=hn!==void 0?hn.length:0,Tt=Ct.get(k),Ei=h.state.lights;if(nt===!0&&(Mt===!0||E!==M)){const Fn=E===M&&k.id===b;tt.setState(k,E,Fn)}let oe=!1;k.version===Tt.__version?(Tt.needsLights&&Tt.lightsStateVersion!==Ei.state.version||Tt.outputColorSpace!==vt||U.isBatchedMesh&&Tt.batching===!1||!U.isBatchedMesh&&Tt.batching===!0||U.isBatchedMesh&&Tt.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Tt.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Tt.instancing===!1||!U.isInstancedMesh&&Tt.instancing===!0||U.isSkinnedMesh&&Tt.skinning===!1||!U.isSkinnedMesh&&Tt.skinning===!0||U.isInstancedMesh&&Tt.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Tt.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Tt.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Tt.instancingMorph===!1&&U.morphTexture!==null||Tt.envMap!==xt||k.fog===!0&&Tt.fog!==et||Tt.numClippingPlanes!==void 0&&(Tt.numClippingPlanes!==tt.numPlanes||Tt.numIntersection!==tt.numIntersection)||Tt.vertexAlphas!==Ut||Tt.vertexTangents!==zt||Tt.morphTargets!==yt||Tt.morphNormals!==ie||Tt.morphColors!==_e||Tt.toneMapping!==ye||Tt.morphTargetsCount!==se)&&(oe=!0):(oe=!0,Tt.__version=k.version);let qn=Tt.currentProgram;oe===!0&&(qn=ha(k,L,U));let cs=!1,En=!1,lo=!1;const Se=qn.getUniforms(),si=Tt.uniforms;if(Rt.useProgram(qn.program)&&(cs=!0,En=!0,lo=!0),k.id!==b&&(b=k.id,En=!0),cs||M!==E){Rt.buffers.depth.getReversed()?(ot.copy(E.projectionMatrix),H0(ot),G0(ot),Se.setValue(N,"projectionMatrix",ot)):Se.setValue(N,"projectionMatrix",E.projectionMatrix),Se.setValue(N,"viewMatrix",E.matrixWorldInverse);const Xi=Se.map.cameraPosition;Xi!==void 0&&Xi.setValue(N,Ot.setFromMatrixPosition(E.matrixWorld)),qt.logarithmicDepthBuffer&&Se.setValue(N,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&Se.setValue(N,"isOrthographic",E.isOrthographicCamera===!0),M!==E&&(M=E,En=!0,lo=!0)}if(U.isSkinnedMesh){Se.setOptional(N,U,"bindMatrix"),Se.setOptional(N,U,"bindMatrixInverse");const Fn=U.skeleton;Fn&&(Fn.boneTexture===null&&Fn.computeBoneTexture(),Se.setValue(N,"boneTexture",Fn.boneTexture,R))}U.isBatchedMesh&&(Se.setOptional(N,U,"batchingTexture"),Se.setValue(N,"batchingTexture",U._matricesTexture,R),Se.setOptional(N,U,"batchingIdTexture"),Se.setValue(N,"batchingIdTexture",U._indirectTexture,R),Se.setOptional(N,U,"batchingColorTexture"),U._colorsTexture!==null&&Se.setValue(N,"batchingColorTexture",U._colorsTexture,R));const uo=B.morphAttributes;if((uo.position!==void 0||uo.normal!==void 0||uo.color!==void 0)&&Dt.update(U,B,qn),(En||Tt.receiveShadow!==U.receiveShadow)&&(Tt.receiveShadow=U.receiveShadow,Se.setValue(N,"receiveShadow",U.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(si.envMap.value=xt,si.flipEnvMap.value=xt.isCubeTexture&&xt.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&L.environment!==null&&(si.envMapIntensity.value=L.environmentIntensity),En&&(Se.setValue(N,"toneMappingExposure",v.toneMappingExposure),Tt.needsLights&&X_(si,lo),et&&k.fog===!0&&at.refreshFogUniforms(si,et),at.refreshMaterialUniforms(si,k,G,J,h.state.transmissionRenderTarget[E.id]),rc.upload(N,gd(Tt),si,R)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(rc.upload(N,gd(Tt),si,R),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&Se.setValue(N,"center",U.center),Se.setValue(N,"modelViewMatrix",U.modelViewMatrix),Se.setValue(N,"normalMatrix",U.normalMatrix),Se.setValue(N,"modelMatrix",U.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const Fn=k.uniformsGroups;for(let Xi=0,Yi=Fn.length;Xi<Yi;Xi++){const vd=Fn[Xi];D.update(vd,qn),D.bind(vd,qn)}}return qn}function X_(E,L){E.ambientLightColor.needsUpdate=L,E.lightProbe.needsUpdate=L,E.directionalLights.needsUpdate=L,E.directionalLightShadows.needsUpdate=L,E.pointLights.needsUpdate=L,E.pointLightShadows.needsUpdate=L,E.spotLights.needsUpdate=L,E.spotLightShadows.needsUpdate=L,E.rectAreaLights.needsUpdate=L,E.hemisphereLights.needsUpdate=L}function Y_(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(E,L,B){Ct.get(E.texture).__webglTexture=L,Ct.get(E.depthTexture).__webglTexture=B;const k=Ct.get(E);k.__hasExternalTextures=!0,k.__autoAllocateDepthBuffer=B===void 0,k.__autoAllocateDepthBuffer||Zt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,L){const B=Ct.get(E);B.__webglFramebuffer=L,B.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(E,L=0,B=0){P=E,T=L,A=B;let k=!0,U=null,et=!1,ft=!1;if(E){const xt=Ct.get(E);if(xt.__useDefaultFramebuffer!==void 0)Rt.bindFramebuffer(N.FRAMEBUFFER,null),k=!1;else if(xt.__webglFramebuffer===void 0)R.setupRenderTarget(E);else if(xt.__hasExternalTextures)R.rebindTextures(E,Ct.get(E.texture).__webglTexture,Ct.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const yt=E.depthTexture;if(xt.__boundDepthTexture!==yt){if(yt!==null&&Ct.has(yt)&&(E.width!==yt.image.width||E.height!==yt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(E)}}const Ut=E.texture;(Ut.isData3DTexture||Ut.isDataArrayTexture||Ut.isCompressedArrayTexture)&&(ft=!0);const zt=Ct.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(zt[L])?U=zt[L][B]:U=zt[L],et=!0):E.samples>0&&R.useMultisampledRTT(E)===!1?U=Ct.get(E).__webglMultisampledFramebuffer:Array.isArray(zt)?U=zt[B]:U=zt,I.copy(E.viewport),V.copy(E.scissor),F=E.scissorTest}else I.copy(_t).multiplyScalar(G).floor(),V.copy(kt).multiplyScalar(G).floor(),F=Gt;if(Rt.bindFramebuffer(N.FRAMEBUFFER,U)&&k&&Rt.drawBuffers(E,U),Rt.viewport(I),Rt.scissor(V),Rt.setScissorTest(F),et){const xt=Ct.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+L,xt.__webglTexture,B)}else if(ft){const xt=Ct.get(E.texture),Ut=L||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,xt.__webglTexture,B||0,Ut)}b=-1},this.readRenderTargetPixels=function(E,L,B,k,U,et,ft){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=Ct.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ft!==void 0&&(vt=vt[ft]),vt){Rt.bindFramebuffer(N.FRAMEBUFFER,vt);try{const xt=E.texture,Ut=xt.format,zt=xt.type;if(!qt.textureFormatReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!qt.textureTypeReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=E.width-k&&B>=0&&B<=E.height-U&&N.readPixels(L,B,k,U,Vt.convert(Ut),Vt.convert(zt),et)}finally{const xt=P!==null?Ct.get(P).__webglFramebuffer:null;Rt.bindFramebuffer(N.FRAMEBUFFER,xt)}}},this.readRenderTargetPixelsAsync=async function(E,L,B,k,U,et,ft){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=Ct.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ft!==void 0&&(vt=vt[ft]),vt){const xt=E.texture,Ut=xt.format,zt=xt.type;if(!qt.textureFormatReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!qt.textureTypeReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(L>=0&&L<=E.width-k&&B>=0&&B<=E.height-U){Rt.bindFramebuffer(N.FRAMEBUFFER,vt);const yt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,yt),N.bufferData(N.PIXEL_PACK_BUFFER,et.byteLength,N.STREAM_READ),N.readPixels(L,B,k,U,Vt.convert(Ut),Vt.convert(zt),0);const ie=P!==null?Ct.get(P).__webglFramebuffer:null;Rt.bindFramebuffer(N.FRAMEBUFFER,ie);const _e=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await $0(N,_e,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,yt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,et),N.deleteBuffer(yt),N.deleteSync(_e),et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,L=null,B=0){E.isTexture!==!0&&(Eo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),L=arguments[0]||null,E=arguments[1]);const k=Math.pow(2,-B),U=Math.floor(E.image.width*k),et=Math.floor(E.image.height*k),ft=L!==null?L.x:0,vt=L!==null?L.y:0;R.setTexture2D(E,0),N.copyTexSubImage2D(N.TEXTURE_2D,B,0,0,ft,vt,U,et),Rt.unbindTexture()},this.copyTextureToTexture=function(E,L,B=null,k=null,U=0){E.isTexture!==!0&&(Eo("WebGLRenderer: copyTextureToTexture function signature has changed."),k=arguments[0]||null,E=arguments[1],L=arguments[2],U=arguments[3]||0,B=null);let et,ft,vt,xt,Ut,zt,yt,ie,_e;const ye=E.isCompressedTexture?E.mipmaps[U]:E.image;B!==null?(et=B.max.x-B.min.x,ft=B.max.y-B.min.y,vt=B.isBox3?B.max.z-B.min.z:1,xt=B.min.x,Ut=B.min.y,zt=B.isBox3?B.min.z:0):(et=ye.width,ft=ye.height,vt=ye.depth||1,xt=0,Ut=0,zt=0),k!==null?(yt=k.x,ie=k.y,_e=k.z):(yt=0,ie=0,_e=0);const hn=Vt.convert(L.format),se=Vt.convert(L.type);let Tt;L.isData3DTexture?(R.setTexture3D(L,0),Tt=N.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(R.setTexture2DArray(L,0),Tt=N.TEXTURE_2D_ARRAY):(R.setTexture2D(L,0),Tt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,L.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,L.unpackAlignment);const Ei=N.getParameter(N.UNPACK_ROW_LENGTH),oe=N.getParameter(N.UNPACK_IMAGE_HEIGHT),qn=N.getParameter(N.UNPACK_SKIP_PIXELS),cs=N.getParameter(N.UNPACK_SKIP_ROWS),En=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,ye.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ye.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,xt),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ut),N.pixelStorei(N.UNPACK_SKIP_IMAGES,zt);const lo=E.isDataArrayTexture||E.isData3DTexture,Se=L.isDataArrayTexture||L.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const si=Ct.get(E),uo=Ct.get(L),Fn=Ct.get(si.__renderTarget),Xi=Ct.get(uo.__renderTarget);Rt.bindFramebuffer(N.READ_FRAMEBUFFER,Fn.__webglFramebuffer),Rt.bindFramebuffer(N.DRAW_FRAMEBUFFER,Xi.__webglFramebuffer);for(let Yi=0;Yi<vt;Yi++)lo&&N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ct.get(E).__webglTexture,U,zt+Yi),E.isDepthTexture?(Se&&N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ct.get(L).__webglTexture,U,_e+Yi),N.blitFramebuffer(xt,Ut,et,ft,yt,ie,et,ft,N.DEPTH_BUFFER_BIT,N.NEAREST)):Se?N.copyTexSubImage3D(Tt,U,yt,ie,_e+Yi,xt,Ut,et,ft):N.copyTexSubImage2D(Tt,U,yt,ie,_e+Yi,xt,Ut,et,ft);Rt.bindFramebuffer(N.READ_FRAMEBUFFER,null),Rt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else Se?E.isDataTexture||E.isData3DTexture?N.texSubImage3D(Tt,U,yt,ie,_e,et,ft,vt,hn,se,ye.data):L.isCompressedArrayTexture?N.compressedTexSubImage3D(Tt,U,yt,ie,_e,et,ft,vt,hn,ye.data):N.texSubImage3D(Tt,U,yt,ie,_e,et,ft,vt,hn,se,ye):E.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,U,yt,ie,et,ft,hn,se,ye.data):E.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,U,yt,ie,ye.width,ye.height,hn,ye.data):N.texSubImage2D(N.TEXTURE_2D,U,yt,ie,et,ft,hn,se,ye);N.pixelStorei(N.UNPACK_ROW_LENGTH,Ei),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,oe),N.pixelStorei(N.UNPACK_SKIP_PIXELS,qn),N.pixelStorei(N.UNPACK_SKIP_ROWS,cs),N.pixelStorei(N.UNPACK_SKIP_IMAGES,En),U===0&&L.generateMipmaps&&N.generateMipmap(Tt),Rt.unbindTexture()},this.copyTextureToTexture3D=function(E,L,B=null,k=null,U=0){return E.isTexture!==!0&&(Eo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,k=arguments[1]||null,E=arguments[2],L=arguments[3],U=arguments[4]||0),Eo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,L,B,k,U)},this.initRenderTarget=function(E){Ct.get(E).__webglFramebuffer===void 0&&R.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?R.setTextureCube(E,0):E.isData3DTexture?R.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?R.setTexture2DArray(E,0):R.setTexture2D(E,0),Rt.unbindTexture()},this.resetState=function(){T=0,A=0,P=null,Rt.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ui}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorspace=Qt._getDrawingBufferColorSpace(t),n.unpackColorSpace=Qt._getUnpackColorSpace()}}class tb extends en{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xn,this.environmentIntensity=1,this.environmentRotation=new Xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class eb{constructor(t,n){this.isInterleavedBuffer=!0,this.array=t,this.stride=n,this.count=t!==void 0?t.length/n:0,this.usage=zu,this.updateRanges=[],this.version=0,this.uuid=Ni()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,n,i){t*=this.stride,i*=n.stride;for(let r=0,s=this.stride;r<s;r++)this.array[t+r]=n.array[i+r];return this}set(t,n=0){return this.array.set(t,n),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ni()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const n=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ni()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const ln=new O;class or{constructor(t,n,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=n,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let n=0,i=this.data.count;n<i;n++)ln.fromBufferAttribute(this,n),ln.applyMatrix4(t),this.setXYZ(n,ln.x,ln.y,ln.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)ln.fromBufferAttribute(this,n),ln.applyNormalMatrix(t),this.setXYZ(n,ln.x,ln.y,ln.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)ln.fromBufferAttribute(this,n),ln.transformDirection(t),this.setXYZ(n,ln.x,ln.y,ln.z);return this}getComponent(t,n){let i=this.array[t*this.data.stride+this.offset+n];return this.normalized&&(i=ei(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=ce(i,this.array)),this.data.array[t*this.data.stride+this.offset+n]=i,this}setX(t,n){return this.normalized&&(n=ce(n,this.array)),this.data.array[t*this.data.stride+this.offset]=n,this}setY(t,n){return this.normalized&&(n=ce(n,this.array)),this.data.array[t*this.data.stride+this.offset+1]=n,this}setZ(t,n){return this.normalized&&(n=ce(n,this.array)),this.data.array[t*this.data.stride+this.offset+2]=n,this}setW(t,n){return this.normalized&&(n=ce(n,this.array)),this.data.array[t*this.data.stride+this.offset+3]=n,this}getX(t){let n=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(n=ei(n,this.array)),n}getY(t){let n=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(n=ei(n,this.array)),n}getZ(t){let n=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(n=ei(n,this.array)),n}getW(t){let n=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(n=ei(n,this.array)),n}setXY(t,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(n=ce(n,this.array),i=ce(i,this.array)),this.data.array[t+0]=n,this.data.array[t+1]=i,this}setXYZ(t,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(n=ce(n,this.array),i=ce(i,this.array),r=ce(r,this.array)),this.data.array[t+0]=n,this.data.array[t+1]=i,this.data.array[t+2]=r,this}setXYZW(t,n,i,r,s){return t=t*this.data.stride+this.offset,this.normalized&&(n=ce(n,this.array),i=ce(i,this.array),r=ce(r,this.array),s=ce(s,this.array)),this.data.array[t+0]=n,this.data.array[t+1]=i,this.data.array[t+2]=r,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return new Wn(new this.array.constructor(n),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new or(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:n,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class nb extends dn{constructor(t=null,n=1,i=1,r,s,o,a,c,l=In,u=In,f,d){super(null,o,a,c,l,u,r,s,f,d),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class bh extends Wn{constructor(t,n,i,r=1){super(t,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Es=new ne,Th=new ne,za=[],wh=new yi,ib=new ne,_o=new Vn,vo=new rs;class rb extends Vn{constructor(t,n,i){super(t,n),this.isInstancedMesh=!0,this.instanceMatrix=new bh(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,ib)}computeBoundingBox(){const t=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new yi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Es),wh.copy(t.boundingBox).applyMatrix4(Es),this.boundingBox.union(wh)}computeBoundingSphere(){const t=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new rs),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Es),vo.copy(t.boundingSphere).applyMatrix4(Es),this.boundingSphere.union(vo)}copy(t,n){return super.copy(t,n),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,n){n.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,n){n.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,n){const i=n.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,o=t*s+1;for(let a=0;a<i.length;a++)i[a]=r[o+a]}raycast(t,n){const i=this.matrixWorld,r=this.count;if(_o.geometry=this.geometry,_o.material=this.material,_o.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),vo.copy(this.boundingSphere),vo.applyMatrix4(i),t.ray.intersectsSphere(vo)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Es),Th.multiplyMatrices(i,Es),_o.matrixWorld=Th,_o.raycast(t,za);for(let o=0,a=za.length;o<a;o++){const c=za[o];c.instanceId=s,c.object=this,n.push(c)}za.length=0}}setColorAt(t,n){this.instanceColor===null&&(this.instanceColor=new bh(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,n){n.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,n){const i=n.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new nb(new Float32Array(r*this.count),r,this.count,bf,hi));const s=this.morphTexture.source.data.data;let o=0;for(let l=0;l<i.length;l++)o+=i[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=r*t;s[c]=a,s.set(i,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Lf extends Si{constructor(t=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const u=[],f=new O,d=new O,p=[],m=[],_=[],g=[];for(let h=0;h<=i;h++){const y=[],x=h/i;let v=0;h===0&&o===0?v=.5/n:h===i&&c===Math.PI&&(v=-.5/n);for(let C=0;C<=n;C++){const T=C/n;f.x=-t*Math.cos(r+T*s)*Math.sin(o+x*a),f.y=t*Math.cos(o+x*a),f.z=t*Math.sin(r+T*s)*Math.sin(o+x*a),m.push(f.x,f.y,f.z),d.copy(f).normalize(),_.push(d.x,d.y,d.z),g.push(T+v,1-x),y.push(l++)}u.push(y)}for(let h=0;h<i;h++)for(let y=0;y<n;y++){const x=u[h][y+1],v=u[h][y],C=u[h+1][y],T=u[h+1][y+1];(h!==0||o>0)&&p.push(x,v,T),(h!==i-1||c<Math.PI)&&p.push(v,C,T)}this.setIndex(p),this.setAttribute("position",new Dn(m,3)),this.setAttribute("normal",new Dn(_,3)),this.setAttribute("uv",new Dn(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Lf(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class sb extends Si{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const n=[],i=new Set,r=new O,s=new O;if(t.index!==null){const o=t.attributes.position,a=t.index;let c=t.groups;c.length===0&&(c=[{start:0,count:a.count,materialIndex:0}]);for(let l=0,u=c.length;l<u;++l){const f=c[l],d=f.start,p=f.count;for(let m=d,_=d+p;m<_;m+=3)for(let g=0;g<3;g++){const h=a.getX(m+g),y=a.getX(m+(g+1)%3);r.fromBufferAttribute(o,h),s.fromBufferAttribute(o,y),Ah(r,s,i)===!0&&(n.push(r.x,r.y,r.z),n.push(s.x,s.y,s.z))}}}else{const o=t.attributes.position;for(let a=0,c=o.count/3;a<c;a++)for(let l=0;l<3;l++){const u=3*a+l,f=3*a+(l+1)%3;r.fromBufferAttribute(o,u),s.fromBufferAttribute(o,f),Ah(r,s,i)===!0&&(n.push(r.x,r.y,r.z),n.push(s.x,s.y,s.z))}}this.setAttribute("position",new Dn(n,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function Ah(e,t,n){const i=`${e.x},${e.y},${e.z}-${t.x},${t.y},${t.z}`,r=`${t.x},${t.y},${t.z}-${e.x},${e.y},${e.z}`;return n.has(i)===!0||n.has(r)===!0?!1:(n.add(i),n.add(r),!0)}class ob extends sa{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Xt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dm,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Pm extends en{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Xt(t),this.intensity=n}dispose(){}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}class Im extends Pm{constructor(t,n,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(en.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Xt(n)}copy(t,n){return super.copy(t,n),this.groundColor.copy(t.groundColor),this}}const Tl=new ne,Ch=new O,Rh=new O;class ab{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new re(512,512),this.map=null,this.mapPass=null,this.matrix=new ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new If,this._frameExtents=new re(1,1),this._viewportCount=1,this._viewports=[new pe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const n=this.camera,i=this.matrix;Ch.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ch),Rh.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(Rh),n.updateMatrixWorld(),Tl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Tl),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Tl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class cb extends ab{constructor(){super(new oa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Dm extends Pm{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(en.DEFAULT_UP),this.updateMatrix(),this.target=new en,this.shadow=new cb}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class lb extends Si{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class ku extends eb{constructor(t,n,i=1){super(t,n),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const n=super.clone(t);return n.meshPerAttribute=this.meshPerAttribute,n}toJSON(t){const n=super.toJSON(t);return n.isInstancedInterleavedBuffer=!0,n.meshPerAttribute=this.meshPerAttribute,n}}class ub{constructor(t=1,n=0,i=0){return this.radius=t,this.phi=n,this.theta=i,this}set(t,n,i){return this.radius=t,this.phi=n,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,n,i){return this.radius=Math.sqrt(t*t+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(tn(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Ph=new O,Ba=new O;class fb{constructor(t=new O,n=new O){this.start=t,this.end=n}set(t,n){return this.start.copy(t),this.end.copy(n),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,n){return this.delta(n).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,n){Ph.subVectors(t,this.start),Ba.subVectors(this.end,this.start);const i=Ba.dot(Ba);let s=Ba.dot(Ph)/i;return n&&(s=tn(s,0,1)),s}closestPointToPoint(t,n,i){const r=this.closestPointToPointParameter(t,n);return this.delta(i).multiplyScalar(r).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:yf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=yf);function Ho(e,t,n){return e+(t-e)*n}function Vu(e,t,n){const i=e*(Math.PI/180),r=t*(Math.PI/180),s=n*(Math.PI/180),o=new Xn(i,r,s,"XYZ"),a=new xi().setFromEuler(o);return{x:a.x,y:a.y,z:a.z,w:a.w}}function Lm(e,t,n,i){const r=new xi(e,t,n,i),s=new Xn().setFromQuaternion(r,"XYZ");return{x:s.x*(180/Math.PI),y:s.y*(180/Math.PI),z:s.z*(180/Math.PI)}}function Ih(e){return e.replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function db(e){if(e=e.trim(),e.startsWith("0x"))return parseInt(e,16);if(e.startsWith("#"))return parseInt(e.slice(1),16);if(e==="true")return 1;if(e==="false")return 0;const t=parseFloat(e);return isNaN(t)?e:t}function xo(e){return e.trim().split(/\s+/).map(db)}function hb(e,t){const n=`${t}X`,i=`${t}Y`,r=`${t}Z`;return n in e&&i in e&&r in e}function pb(e,t){const n=`${t}X`,i=`${t}Y`,r=`${t}Z`,s=`${t}W`;return n in e&&i in e&&r in e&&s in e}function Dh(e,t,n,i){const r=i.config.getEnums(e);if(r&&r[t]){const s=r[t],o=n.toLowerCase();if(o in s)return s[o];const a=Object.keys(s),c=Kp(e,t,n,a);throw new Error(c)}return null}function mb(e,t,n,i,r){const s={},o=t.split(";").map(a=>a.trim()).filter(a=>a.length>0);for(const a of o){const c=a.indexOf(":");if(c===-1){const _=Td(e,a,'"property: value"',"missing colon after property name");throw new Error(_)}const l=a.slice(0,c).trim(),u=a.slice(c+1).trim();if(!l||!u){const _=Td(e,a,'"property: value"',l?"value is empty":"property name is empty");throw new Error(_)}const f=Ih(l);if((f==="euler"||f==="rotation")&&"eulerX"in n){const _=xo(u);if(_.length===1){const h=Number(_[0])||0;s.eulerX=h,s.eulerY=h,s.eulerZ=h}else if(_.length===3)s.eulerX=Number(_[0])||0,s.eulerY=Number(_[1])||0,s.eulerZ=Number(_[2])||0;else{const h=fo(e,l,"1 (broadcast) or 3 (x, y, z degrees)",_.length);throw new Error(h)}const g=Vu(s.eulerX||0,s.eulerY||0,s.eulerZ||0);s.rotX=g.x,s.rotY=g.y,s.rotZ=g.z,s.rotW=g.w;continue}if(f==="rot"&&pb(n,"rot")){console.warn(`[${e}.rot] Direct quaternion values are deprecated. Use 'euler' or 'rotation' for Euler angles in degrees instead.`);const _=xo(u);if(_.length===3){const g=Vu(Number(_[0])||0,Number(_[1])||0,Number(_[2])||0);s.rotX=g.x,s.rotY=g.y,s.rotZ=g.z,s.rotW=g.w,s.eulerX=Number(_[0])||0,s.eulerY=Number(_[1])||0,s.eulerZ=Number(_[2])||0}else if(_.length===4){s.rotX=Number(_[0])||0,s.rotY=Number(_[1])||0,s.rotZ=Number(_[2])||0,s.rotW=Number(_[3])||1;const g=Lm(s.rotX,s.rotY,s.rotZ,s.rotW);s.eulerX=g.x,s.eulerY=g.y,s.eulerZ=g.z}else{const g=fo(e,l,"3 (Euler angles) or 4 (quaternion)",_.length);throw new Error(g)}continue}if(hb(n,f)){const _=xo(u);if(_.length===1){const g=Number(_[0])||0;s[`${f}X`]=g,s[`${f}Y`]=g,s[`${f}Z`]=g}else if(_.length===3)s[`${f}X`]=Number(_[0])||0,s[`${f}Y`]=Number(_[1])||0,s[`${f}Z`]=Number(_[2])||0;else{const g=fo(e,l,"1 (broadcast) or 3 (x, y, z)",_.length);throw new Error(g)}continue}if(f in n){const _=xo(u);if(_.length!==1){const h=fo(e,l,"1",_.length);throw new Error(h)}const g=_[0];if(typeof g=="string"){const h=Dh(e,f,g,i);if(h!==null)s[f]=h;else if(r){const y=r.getEntityByName(g);if(y!==null)s[f]=y;else{const x=ma(e,l,"number or entity name",`string "${g}"`);throw new Error(x)}}else{const y=ma(e,l,"number",`string "${g}"`);throw new Error(y)}}else s[f]=g;continue}const d=Ih(l);if(d in n){const _=xo(u);if(_.length!==1){const h=fo(e,l,"1",_.length);throw new Error(h)}const g=_[0];if(typeof g=="string"){const h=Dh(e,d,g,i);if(h!==null)s[d]=h;else if(r){const y=r.getEntityByName(g);if(y!==null)s[d]=y;else{const x=ma(e,l,"number or entity name",`string "${g}"`);throw new Error(x)}}else{const y=ma(e,l,"number",`string "${g}"`);throw new Error(y)}}else s[d]=g;continue}const p=Ov(n),m=Nv(e,l,"Property not found",p);throw new Error(m)}return s}function gb(e,t,n){const i={},r={},s=new Set;if(t.components)for(const o of t.components)s.add(o);for(const o of Object.keys(e))n.getComponent(o)&&s.add(o);for(const[o,a]of Object.entries(e)){const c=_b(a);let l=!1;for(const u of s){const f=n.getComponent(u);if(!f)continue;const d=n.config.getShorthands(u);if(d[o]){const p=d[o];typeof p=="string"&&Lh(u,p,c,f,r)&&(l=!0)}else Lh(u,o,c,f,r)&&(l=!0)}l||(i[o]=a)}for(const[o,a]of Object.entries(r)){const c=Object.entries(a).map(([l,u])=>`${l}: ${u}`).join("; ");if(o in i){const l=i[o];typeof l=="string"&&l.trim()?i[o]=`${c}; ${l}`:i[o]=c}else i[o]=c}return i}function _b(e){if(typeof e=="string")return e;if(typeof e=="object"&&e!==null&&"x"in e){const t=e;return"w"in t?`${t.x} ${t.y} ${t.z} ${t.w}`:"z"in t?`${t.x} ${t.y} ${t.z}`:`${t.x} ${t.y}`}else return String(e)}function Lh(e,t,n,i,r){const s=t.replace(/-([a-z])/g,(u,f)=>f.toUpperCase()),o=`${s}X`in i,a=`${s}Y`in i,c=`${s}Z`in i,l=`${s}W`in i;if(o&&a&&c){r[e]||(r[e]={});const u=n.trim().split(/\s+/);if(l&&u.length===4)return r[e][`${t}-x`]=u[0],r[e][`${t}-y`]=u[1],r[e][`${t}-z`]=u[2],r[e][`${t}-w`]=u[3],!0;if(u.length===3||u.length===1){const f=vb(n);return r[e][`${t}-x`]=String(f[0]),r[e][`${t}-y`]=String(f[1]),r[e][`${t}-z`]=String(f[2]),!0}}else if(s in i)return r[e]||(r[e]={}),r[e][t]=n,!0;return!1}function vb(e){const t=e.trim().split(/\s+/).map(n=>parseFloat(n)||0);if(t.length===1)return[t[0],t[0],t[0]];if(t.length===3)return t;throw new Error(`Invalid vector3 value: "${e}". Expected 1 or 3 numbers.`)}function Y(e,t,n){function i(a,c){var l;Object.defineProperty(a,"_zod",{value:a._zod??{},enumerable:!1}),(l=a._zod).traits??(l.traits=new Set),a._zod.traits.add(e),t(a,c);for(const u in o.prototype)u in a||Object.defineProperty(a,u,{value:o.prototype[u].bind(a)});a._zod.constr=o,a._zod.def=c}const r=n?.Parent??Object;class s extends r{}Object.defineProperty(s,"name",{value:e});function o(a){var c;const l=n?.Parent?new s:this;i(l,a),(c=l._zod).deferred??(c.deferred=[]);for(const u of l._zod.deferred)u();return l}return Object.defineProperty(o,"init",{value:i}),Object.defineProperty(o,Symbol.hasInstance,{value:a=>n?.Parent&&a instanceof n.Parent?!0:a?._zod?.traits?.has(e)}),Object.defineProperty(o,"name",{value:e}),o}let Us=class extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}},Um=class extends Error{constructor(t){super(`Encountered unidirectional transform during encode: ${t}`),this.name="ZodEncodeError"}};const Nm={};function Qr(e){return Nm}function xb(e){const t=Object.values(e).filter(n=>typeof n=="number");return Object.entries(e).filter(([n,i])=>t.indexOf(+n)===-1).map(([n,i])=>i)}function $u(e,t){return typeof t=="bigint"?t.toString():t}function Uf(e){return{get value(){{const t=e();return Object.defineProperty(this,"value",{value:t}),t}}}}function Nf(e){return e==null}function Of(e){const t=e.startsWith("^")?1:0,n=e.endsWith("$")?e.length-1:e.length;return e.slice(t,n)}function yb(e,t){const n=(e.toString().split(".")[1]||"").length,i=t.toString();let r=(i.split(".")[1]||"").length;if(r===0&&/\d?e-\d?/.test(i)){const c=i.match(/\d?e-(\d?)/);c?.[1]&&(r=Number.parseInt(c[1]))}const s=n>r?n:r,o=Number.parseInt(e.toFixed(s).replace(".","")),a=Number.parseInt(t.toFixed(s).replace(".",""));return o%a/10**s}const Uh=Symbol("evaluating");function ve(e,t,n){let i;Object.defineProperty(e,t,{get(){if(i!==Uh)return i===void 0&&(i=Uh,i=n()),i},set(r){Object.defineProperty(e,t,{value:r})},configurable:!0})}function ss(e,t,n){Object.defineProperty(e,t,{value:n,writable:!0,enumerable:!0,configurable:!0})}function os(...e){const t={};for(const n of e){const i=Object.getOwnPropertyDescriptors(n);Object.assign(t,i)}return Object.defineProperties({},t)}function Nh(e){return JSON.stringify(e)}const Om="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function dc(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}const Sb=Uf(()=>{if(typeof navigator<"u"&&navigator?.userAgent?.includes("Cloudflare"))return!1;try{const e=Function;return new e(""),!0}catch{return!1}});function Go(e){if(dc(e)===!1)return!1;const t=e.constructor;if(t===void 0)return!0;const n=t.prototype;return!(dc(n)===!1||Object.prototype.hasOwnProperty.call(n,"isPrototypeOf")===!1)}function Fm(e){return Go(e)?{...e}:Array.isArray(e)?[...e]:e}const Mb=new Set(["string","number","symbol"]);function Zs(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function xr(e,t,n){const i=new e._zod.constr(t??e._zod.def);return(!t||n?.parent)&&(i._zod.parent=e),i}function wt(e){const t=e;if(!t)return{};if(typeof t=="string")return{error:()=>t};if(t?.message!==void 0){if(t?.error!==void 0)throw new Error("Cannot specify both `message` and `error` params");t.error=t.message}return delete t.message,typeof t.error=="string"?{...t,error:()=>t.error}:t}function Eb(e){return Object.keys(e).filter(t=>e[t]._zod.optin==="optional"&&e[t]._zod.optout==="optional")}const bb={safeint:[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-34028234663852886e22,34028234663852886e22],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]};function Tb(e,t){const n=e._zod.def,i=os(e._zod.def,{get shape(){const r={};for(const s in t){if(!(s in n.shape))throw new Error(`Unrecognized key: "${s}"`);t[s]&&(r[s]=n.shape[s])}return ss(this,"shape",r),r},checks:[]});return xr(e,i)}function wb(e,t){const n=e._zod.def,i=os(e._zod.def,{get shape(){const r={...e._zod.def.shape};for(const s in t){if(!(s in n.shape))throw new Error(`Unrecognized key: "${s}"`);t[s]&&delete r[s]}return ss(this,"shape",r),r},checks:[]});return xr(e,i)}function Ab(e,t){if(!Go(t))throw new Error("Invalid input to extend: expected a plain object");const n=e._zod.def.checks;if(n&&n.length>0)throw new Error("Object schemas containing refinements cannot be extended. Use `.safeExtend()` instead.");const i=os(e._zod.def,{get shape(){const r={...e._zod.def.shape,...t};return ss(this,"shape",r),r},checks:[]});return xr(e,i)}function Cb(e,t){if(!Go(t))throw new Error("Invalid input to safeExtend: expected a plain object");const n={...e._zod.def,get shape(){const i={...e._zod.def.shape,...t};return ss(this,"shape",i),i},checks:e._zod.def.checks};return xr(e,n)}function Rb(e,t){const n=os(e._zod.def,{get shape(){const i={...e._zod.def.shape,...t._zod.def.shape};return ss(this,"shape",i),i},get catchall(){return t._zod.def.catchall},checks:[]});return xr(e,n)}function Pb(e,t,n){const i=os(t._zod.def,{get shape(){const r=t._zod.def.shape,s={...r};if(n)for(const o in n){if(!(o in r))throw new Error(`Unrecognized key: "${o}"`);n[o]&&(s[o]=e?new e({type:"optional",innerType:r[o]}):r[o])}else for(const o in r)s[o]=e?new e({type:"optional",innerType:r[o]}):r[o];return ss(this,"shape",s),s},checks:[]});return xr(t,i)}function Ib(e,t,n){const i=os(t._zod.def,{get shape(){const r=t._zod.def.shape,s={...r};if(n)for(const o in n){if(!(o in s))throw new Error(`Unrecognized key: "${o}"`);n[o]&&(s[o]=new e({type:"nonoptional",innerType:r[o]}))}else for(const o in r)s[o]=new e({type:"nonoptional",innerType:r[o]});return ss(this,"shape",s),s},checks:[]});return xr(t,i)}function Cs(e,t=0){if(e.aborted===!0)return!0;for(let n=t;n<e.issues.length;n++)if(e.issues[n]?.continue!==!0)return!0;return!1}function zm(e,t){return t.map(n=>{var i;return(i=n).path??(i.path=[]),n.path.unshift(e),n})}function ka(e){return typeof e=="string"?e:e?.message}function ts(e,t,n){const i={...e,path:e.path??[]};if(!e.message){const r=ka(e.inst?._zod.def?.error?.(e))??ka(t?.error?.(e))??ka(n.customError?.(e))??ka(n.localeError?.(e))??"Invalid input";i.message=r}return delete i.inst,delete i.continue,t?.reportInput||delete i.input,i}function Ff(e){return Array.isArray(e)?"array":typeof e=="string"?"string":"unknown"}function Wo(...e){const[t,n,i]=e;return typeof t=="string"?{message:t,code:"custom",input:n,inst:i}:{...t}}const Db=/^[cC][^\s-]{8,}$/,Lb=/^[0-9a-z]+$/,Ub=/^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,Nb=/^[0-9a-vA-V]{20}$/,Ob=/^[A-Za-z0-9]{27}$/,Fb=/^[a-zA-Z0-9_-]{21}$/,zb=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,Bb=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,Oh=e=>e?new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`):/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,kb=/^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,Vb="^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";function $b(){return new RegExp(Vb,"u")}const Hb=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,Gb=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,Wb=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,Xb=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,Yb=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,Bm=/^[A-Za-z0-9_-]*$/,Zb=/^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/,qb=/^\+(?:[0-9]){6,14}[0-9]$/,km="(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",jb=new RegExp(`^${km}$`);function Vm(e){const t="(?:[01]\\d|2[0-3]):[0-5]\\d";return typeof e.precision=="number"?e.precision===-1?`${t}`:e.precision===0?`${t}:[0-5]\\d`:`${t}:[0-5]\\d\\.\\d{${e.precision}}`:`${t}(?::[0-5]\\d(?:\\.\\d+)?)?`}function Kb(e){return new RegExp(`^${Vm(e)}$`)}function Jb(e){const t=Vm({precision:e.precision}),n=["Z"];e.local&&n.push(""),e.offset&&n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");const i=`${t}(?:${n.join("|")})`;return new RegExp(`^${km}T(?:${i})$`)}const Qb=e=>{const t=e?`[\\s\\S]{${e?.minimum??0},${e?.maximum??""}}`:"[\\s\\S]*";return new RegExp(`^${t}$`)},tT=/^-?\d+$/,eT=/^-?\d+(?:\.\d+)?/,nT=/^(?:true|false)$/i,iT=/^[^A-Z]*$/,rT=/^[^a-z]*$/,Mn=Y("$ZodCheck",(e,t)=>{var n;e._zod??(e._zod={}),e._zod.def=t,(n=e._zod).onattach??(n.onattach=[])}),$m={number:"number",bigint:"bigint",object:"date"},Hm=Y("$ZodCheckLessThan",(e,t)=>{Mn.init(e,t);const n=$m[typeof t.value];e._zod.onattach.push(i=>{const r=i._zod.bag,s=(t.inclusive?r.maximum:r.exclusiveMaximum)??Number.POSITIVE_INFINITY;t.value<s&&(t.inclusive?r.maximum=t.value:r.exclusiveMaximum=t.value)}),e._zod.check=i=>{(t.inclusive?i.value<=t.value:i.value<t.value)||i.issues.push({origin:n,code:"too_big",maximum:t.value,input:i.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),Gm=Y("$ZodCheckGreaterThan",(e,t)=>{Mn.init(e,t);const n=$m[typeof t.value];e._zod.onattach.push(i=>{const r=i._zod.bag,s=(t.inclusive?r.minimum:r.exclusiveMinimum)??Number.NEGATIVE_INFINITY;t.value>s&&(t.inclusive?r.minimum=t.value:r.exclusiveMinimum=t.value)}),e._zod.check=i=>{(t.inclusive?i.value>=t.value:i.value>t.value)||i.issues.push({origin:n,code:"too_small",minimum:t.value,input:i.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),sT=Y("$ZodCheckMultipleOf",(e,t)=>{Mn.init(e,t),e._zod.onattach.push(n=>{var i;(i=n._zod.bag).multipleOf??(i.multipleOf=t.value)}),e._zod.check=n=>{if(typeof n.value!=typeof t.value)throw new Error("Cannot mix number and bigint in multiple_of check.");(typeof n.value=="bigint"?n.value%t.value===BigInt(0):yb(n.value,t.value)===0)||n.issues.push({origin:typeof n.value,code:"not_multiple_of",divisor:t.value,input:n.value,inst:e,continue:!t.abort})}}),oT=Y("$ZodCheckNumberFormat",(e,t)=>{Mn.init(e,t),t.format=t.format||"float64";const n=t.format?.includes("int"),i=n?"int":"number",[r,s]=bb[t.format];e._zod.onattach.push(o=>{const a=o._zod.bag;a.format=t.format,a.minimum=r,a.maximum=s,n&&(a.pattern=tT)}),e._zod.check=o=>{const a=o.value;if(n){if(!Number.isInteger(a)){o.issues.push({expected:i,format:t.format,code:"invalid_type",continue:!1,input:a,inst:e});return}if(!Number.isSafeInteger(a)){a>0?o.issues.push({input:a,code:"too_big",maximum:Number.MAX_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:i,continue:!t.abort}):o.issues.push({input:a,code:"too_small",minimum:Number.MIN_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:i,continue:!t.abort});return}}a<r&&o.issues.push({origin:"number",input:a,code:"too_small",minimum:r,inclusive:!0,inst:e,continue:!t.abort}),a>s&&o.issues.push({origin:"number",input:a,code:"too_big",maximum:s,inst:e})}}),aT=Y("$ZodCheckMaxLength",(e,t)=>{var n;Mn.init(e,t),(n=e._zod.def).when??(n.when=i=>{const r=i.value;return!Nf(r)&&r.length!==void 0}),e._zod.onattach.push(i=>{const r=i._zod.bag.maximum??Number.POSITIVE_INFINITY;t.maximum<r&&(i._zod.bag.maximum=t.maximum)}),e._zod.check=i=>{const r=i.value;if(r.length<=t.maximum)return;const s=Ff(r);i.issues.push({origin:s,code:"too_big",maximum:t.maximum,inclusive:!0,input:r,inst:e,continue:!t.abort})}}),cT=Y("$ZodCheckMinLength",(e,t)=>{var n;Mn.init(e,t),(n=e._zod.def).when??(n.when=i=>{const r=i.value;return!Nf(r)&&r.length!==void 0}),e._zod.onattach.push(i=>{const r=i._zod.bag.minimum??Number.NEGATIVE_INFINITY;t.minimum>r&&(i._zod.bag.minimum=t.minimum)}),e._zod.check=i=>{const r=i.value;if(r.length>=t.minimum)return;const s=Ff(r);i.issues.push({origin:s,code:"too_small",minimum:t.minimum,inclusive:!0,input:r,inst:e,continue:!t.abort})}}),lT=Y("$ZodCheckLengthEquals",(e,t)=>{var n;Mn.init(e,t),(n=e._zod.def).when??(n.when=i=>{const r=i.value;return!Nf(r)&&r.length!==void 0}),e._zod.onattach.push(i=>{const r=i._zod.bag;r.minimum=t.length,r.maximum=t.length,r.length=t.length}),e._zod.check=i=>{const r=i.value,s=r.length;if(s===t.length)return;const o=Ff(r),a=s>t.length;i.issues.push({origin:o,...a?{code:"too_big",maximum:t.length}:{code:"too_small",minimum:t.length},inclusive:!0,exact:!0,input:i.value,inst:e,continue:!t.abort})}}),Bc=Y("$ZodCheckStringFormat",(e,t)=>{var n,i;Mn.init(e,t),e._zod.onattach.push(r=>{const s=r._zod.bag;s.format=t.format,t.pattern&&(s.patterns??(s.patterns=new Set),s.patterns.add(t.pattern))}),t.pattern?(n=e._zod).check??(n.check=r=>{t.pattern.lastIndex=0,!t.pattern.test(r.value)&&r.issues.push({origin:"string",code:"invalid_format",format:t.format,input:r.value,...t.pattern?{pattern:t.pattern.toString()}:{},inst:e,continue:!t.abort})}):(i=e._zod).check??(i.check=()=>{})}),uT=Y("$ZodCheckRegex",(e,t)=>{Bc.init(e,t),e._zod.check=n=>{t.pattern.lastIndex=0,!t.pattern.test(n.value)&&n.issues.push({origin:"string",code:"invalid_format",format:"regex",input:n.value,pattern:t.pattern.toString(),inst:e,continue:!t.abort})}}),fT=Y("$ZodCheckLowerCase",(e,t)=>{t.pattern??(t.pattern=iT),Bc.init(e,t)}),dT=Y("$ZodCheckUpperCase",(e,t)=>{t.pattern??(t.pattern=rT),Bc.init(e,t)}),hT=Y("$ZodCheckIncludes",(e,t)=>{Mn.init(e,t);const n=Zs(t.includes),i=new RegExp(typeof t.position=="number"?`^.{${t.position}}${n}`:n);t.pattern=i,e._zod.onattach.push(r=>{const s=r._zod.bag;s.patterns??(s.patterns=new Set),s.patterns.add(i)}),e._zod.check=r=>{r.value.includes(t.includes,t.position)||r.issues.push({origin:"string",code:"invalid_format",format:"includes",includes:t.includes,input:r.value,inst:e,continue:!t.abort})}}),pT=Y("$ZodCheckStartsWith",(e,t)=>{Mn.init(e,t);const n=new RegExp(`^${Zs(t.prefix)}.*`);t.pattern??(t.pattern=n),e._zod.onattach.push(i=>{const r=i._zod.bag;r.patterns??(r.patterns=new Set),r.patterns.add(n)}),e._zod.check=i=>{i.value.startsWith(t.prefix)||i.issues.push({origin:"string",code:"invalid_format",format:"starts_with",prefix:t.prefix,input:i.value,inst:e,continue:!t.abort})}}),mT=Y("$ZodCheckEndsWith",(e,t)=>{Mn.init(e,t);const n=new RegExp(`.*${Zs(t.suffix)}$`);t.pattern??(t.pattern=n),e._zod.onattach.push(i=>{const r=i._zod.bag;r.patterns??(r.patterns=new Set),r.patterns.add(n)}),e._zod.check=i=>{i.value.endsWith(t.suffix)||i.issues.push({origin:"string",code:"invalid_format",format:"ends_with",suffix:t.suffix,input:i.value,inst:e,continue:!t.abort})}}),gT=Y("$ZodCheckOverwrite",(e,t)=>{Mn.init(e,t),e._zod.check=n=>{n.value=t.tx(n.value)}});let _T=class{constructor(t=[]){this.content=[],this.indent=0,this&&(this.args=t)}indented(t){this.indent+=1,t(this),this.indent-=1}write(t){if(typeof t=="function"){t(this,{execution:"sync"}),t(this,{execution:"async"});return}const n=t.split(`
`).filter(s=>s),i=Math.min(...n.map(s=>s.length-s.trimStart().length)),r=n.map(s=>s.slice(i)).map(s=>" ".repeat(this.indent*2)+s);for(const s of r)this.content.push(s)}compile(){const t=Function,n=this?.args,i=[...(this?.content??[""]).map(r=>`  ${r}`)];return new t(...n,i.join(`
`))}};const Wm=(e,t)=>{e.name="$ZodError",Object.defineProperty(e,"_zod",{value:e._zod,enumerable:!1}),Object.defineProperty(e,"issues",{value:t,enumerable:!1}),e.message=JSON.stringify(t,$u,2),Object.defineProperty(e,"toString",{value:()=>e.message,enumerable:!1})},Xm=Y("$ZodError",Wm),Ym=Y("$ZodError",Wm,{Parent:Error});function vT(e,t=n=>n.message){const n={},i=[];for(const r of e.issues)r.path.length>0?(n[r.path[0]]=n[r.path[0]]||[],n[r.path[0]].push(t(r))):i.push(t(r));return{formErrors:i,fieldErrors:n}}function xT(e,t=n=>n.message){const n={_errors:[]},i=r=>{for(const s of r.issues)if(s.code==="invalid_union"&&s.errors.length)s.errors.map(o=>i({issues:o}));else if(s.code==="invalid_key")i({issues:s.issues});else if(s.code==="invalid_element")i({issues:s.issues});else if(s.path.length===0)n._errors.push(t(s));else{let o=n,a=0;for(;a<s.path.length;){const c=s.path[a];a===s.path.length-1?(o[c]=o[c]||{_errors:[]},o[c]._errors.push(t(s))):o[c]=o[c]||{_errors:[]},o=o[c],a++}}};return i(e),n}const zf=e=>(t,n,i,r)=>{const s=i?Object.assign(i,{async:!1}):{async:!1},o=t._zod.run({value:n,issues:[]},s);if(o instanceof Promise)throw new Us;if(o.issues.length){const a=new(r?.Err??e)(o.issues.map(c=>ts(c,s,Qr())));throw Om(a,r?.callee),a}return o.value},Bf=e=>async(t,n,i,r)=>{const s=i?Object.assign(i,{async:!0}):{async:!0};let o=t._zod.run({value:n,issues:[]},s);if(o instanceof Promise&&(o=await o),o.issues.length){const a=new(r?.Err??e)(o.issues.map(c=>ts(c,s,Qr())));throw Om(a,r?.callee),a}return o.value},kc=e=>(t,n,i)=>{const r=i?{...i,async:!1}:{async:!1},s=t._zod.run({value:n,issues:[]},r);if(s instanceof Promise)throw new Us;return s.issues.length?{success:!1,error:new(e??Xm)(s.issues.map(o=>ts(o,r,Qr())))}:{success:!0,data:s.value}},yT=kc(Ym),Vc=e=>async(t,n,i)=>{const r=i?Object.assign(i,{async:!0}):{async:!0};let s=t._zod.run({value:n,issues:[]},r);return s instanceof Promise&&(s=await s),s.issues.length?{success:!1,error:new e(s.issues.map(o=>ts(o,r,Qr())))}:{success:!0,data:s.value}},ST=Vc(Ym),MT=e=>(t,n,i)=>{const r=i?Object.assign(i,{direction:"backward"}):{direction:"backward"};return zf(e)(t,n,r)},ET=e=>(t,n,i)=>zf(e)(t,n,i),bT=e=>async(t,n,i)=>{const r=i?Object.assign(i,{direction:"backward"}):{direction:"backward"};return Bf(e)(t,n,r)},TT=e=>async(t,n,i)=>Bf(e)(t,n,i),wT=e=>(t,n,i)=>{const r=i?Object.assign(i,{direction:"backward"}):{direction:"backward"};return kc(e)(t,n,r)},AT=e=>(t,n,i)=>kc(e)(t,n,i),CT=e=>async(t,n,i)=>{const r=i?Object.assign(i,{direction:"backward"}):{direction:"backward"};return Vc(e)(t,n,r)},RT=e=>async(t,n,i)=>Vc(e)(t,n,i),PT={major:4,minor:1,patch:12},Ne=Y("$ZodType",(e,t)=>{var n;e??(e={}),e._zod.def=t,e._zod.bag=e._zod.bag||{},e._zod.version=PT;const i=[...e._zod.def.checks??[]];e._zod.traits.has("$ZodCheck")&&i.unshift(e);for(const r of i)for(const s of r._zod.onattach)s(e);if(i.length===0)(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{const r=(o,a,c)=>{let l=Cs(o),u;for(const f of a){if(f._zod.def.when){if(!f._zod.def.when(o))continue}else if(l)continue;const d=o.issues.length,p=f._zod.check(o);if(p instanceof Promise&&c?.async===!1)throw new Us;if(u||p instanceof Promise)u=(u??Promise.resolve()).then(async()=>{await p,o.issues.length!==d&&(l||(l=Cs(o,d)))});else{if(o.issues.length===d)continue;l||(l=Cs(o,d))}}return u?u.then(()=>o):o},s=(o,a,c)=>{if(Cs(o))return o.aborted=!0,o;const l=r(a,i,c);if(l instanceof Promise){if(c.async===!1)throw new Us;return l.then(u=>e._zod.parse(u,c))}return e._zod.parse(l,c)};e._zod.run=(o,a)=>{if(a.skipChecks)return e._zod.parse(o,a);if(a.direction==="backward"){const l=e._zod.parse({value:o.value,issues:[]},{...a,skipChecks:!0});return l instanceof Promise?l.then(u=>s(u,o,a)):s(l,o,a)}const c=e._zod.parse(o,a);if(c instanceof Promise){if(a.async===!1)throw new Us;return c.then(l=>r(l,i,a))}return r(c,i,a)}}e["~standard"]={validate:r=>{try{const s=yT(e,r);return s.success?{value:s.data}:{issues:s.error?.issues}}catch{return ST(e,r).then(s=>s.success?{value:s.data}:{issues:s.error?.issues})}},vendor:"zod",version:1}}),kf=Y("$ZodString",(e,t)=>{Ne.init(e,t),e._zod.pattern=[...e?._zod.bag?.patterns??[]].pop()??Qb(e._zod.bag),e._zod.parse=(n,i)=>{if(t.coerce)try{n.value=String(n.value)}catch{}return typeof n.value=="string"||n.issues.push({expected:"string",code:"invalid_type",input:n.value,inst:e}),n}}),Ae=Y("$ZodStringFormat",(e,t)=>{Bc.init(e,t),kf.init(e,t)}),IT=Y("$ZodGUID",(e,t)=>{t.pattern??(t.pattern=Bb),Ae.init(e,t)}),DT=Y("$ZodUUID",(e,t)=>{if(t.version){const n={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[t.version];if(n===void 0)throw new Error(`Invalid UUID version: "${t.version}"`);t.pattern??(t.pattern=Oh(n))}else t.pattern??(t.pattern=Oh());Ae.init(e,t)}),LT=Y("$ZodEmail",(e,t)=>{t.pattern??(t.pattern=kb),Ae.init(e,t)}),UT=Y("$ZodURL",(e,t)=>{Ae.init(e,t),e._zod.check=n=>{try{const i=n.value.trim(),r=new URL(i);t.hostname&&(t.hostname.lastIndex=0,t.hostname.test(r.hostname)||n.issues.push({code:"invalid_format",format:"url",note:"Invalid hostname",pattern:Zb.source,input:n.value,inst:e,continue:!t.abort})),t.protocol&&(t.protocol.lastIndex=0,t.protocol.test(r.protocol.endsWith(":")?r.protocol.slice(0,-1):r.protocol)||n.issues.push({code:"invalid_format",format:"url",note:"Invalid protocol",pattern:t.protocol.source,input:n.value,inst:e,continue:!t.abort})),t.normalize?n.value=r.href:n.value=i;return}catch{n.issues.push({code:"invalid_format",format:"url",input:n.value,inst:e,continue:!t.abort})}}}),NT=Y("$ZodEmoji",(e,t)=>{t.pattern??(t.pattern=$b()),Ae.init(e,t)}),OT=Y("$ZodNanoID",(e,t)=>{t.pattern??(t.pattern=Fb),Ae.init(e,t)}),FT=Y("$ZodCUID",(e,t)=>{t.pattern??(t.pattern=Db),Ae.init(e,t)}),zT=Y("$ZodCUID2",(e,t)=>{t.pattern??(t.pattern=Lb),Ae.init(e,t)}),BT=Y("$ZodULID",(e,t)=>{t.pattern??(t.pattern=Ub),Ae.init(e,t)}),kT=Y("$ZodXID",(e,t)=>{t.pattern??(t.pattern=Nb),Ae.init(e,t)}),VT=Y("$ZodKSUID",(e,t)=>{t.pattern??(t.pattern=Ob),Ae.init(e,t)}),$T=Y("$ZodISODateTime",(e,t)=>{t.pattern??(t.pattern=Jb(t)),Ae.init(e,t)}),HT=Y("$ZodISODate",(e,t)=>{t.pattern??(t.pattern=jb),Ae.init(e,t)}),GT=Y("$ZodISOTime",(e,t)=>{t.pattern??(t.pattern=Kb(t)),Ae.init(e,t)}),WT=Y("$ZodISODuration",(e,t)=>{t.pattern??(t.pattern=zb),Ae.init(e,t)}),XT=Y("$ZodIPv4",(e,t)=>{t.pattern??(t.pattern=Hb),Ae.init(e,t),e._zod.onattach.push(n=>{const i=n._zod.bag;i.format="ipv4"})}),YT=Y("$ZodIPv6",(e,t)=>{t.pattern??(t.pattern=Gb),Ae.init(e,t),e._zod.onattach.push(n=>{const i=n._zod.bag;i.format="ipv6"}),e._zod.check=n=>{try{new URL(`http://[${n.value}]`)}catch{n.issues.push({code:"invalid_format",format:"ipv6",input:n.value,inst:e,continue:!t.abort})}}}),ZT=Y("$ZodCIDRv4",(e,t)=>{t.pattern??(t.pattern=Wb),Ae.init(e,t)}),qT=Y("$ZodCIDRv6",(e,t)=>{t.pattern??(t.pattern=Xb),Ae.init(e,t),e._zod.check=n=>{const i=n.value.split("/");try{if(i.length!==2)throw new Error;const[r,s]=i;if(!s)throw new Error;const o=Number(s);if(`${o}`!==s)throw new Error;if(o<0||o>128)throw new Error;new URL(`http://[${r}]`)}catch{n.issues.push({code:"invalid_format",format:"cidrv6",input:n.value,inst:e,continue:!t.abort})}}});function Zm(e){if(e==="")return!0;if(e.length%4!==0)return!1;try{return atob(e),!0}catch{return!1}}const jT=Y("$ZodBase64",(e,t)=>{t.pattern??(t.pattern=Yb),Ae.init(e,t),e._zod.onattach.push(n=>{n._zod.bag.contentEncoding="base64"}),e._zod.check=n=>{Zm(n.value)||n.issues.push({code:"invalid_format",format:"base64",input:n.value,inst:e,continue:!t.abort})}});function KT(e){if(!Bm.test(e))return!1;const t=e.replace(/[-_]/g,i=>i==="-"?"+":"/"),n=t.padEnd(Math.ceil(t.length/4)*4,"=");return Zm(n)}const JT=Y("$ZodBase64URL",(e,t)=>{t.pattern??(t.pattern=Bm),Ae.init(e,t),e._zod.onattach.push(n=>{n._zod.bag.contentEncoding="base64url"}),e._zod.check=n=>{KT(n.value)||n.issues.push({code:"invalid_format",format:"base64url",input:n.value,inst:e,continue:!t.abort})}}),QT=Y("$ZodE164",(e,t)=>{t.pattern??(t.pattern=qb),Ae.init(e,t)});function tw(e,t=null){try{const n=e.split(".");if(n.length!==3)return!1;const[i]=n;if(!i)return!1;const r=JSON.parse(atob(i));return!("typ"in r&&r?.typ!=="JWT"||!r.alg||t&&(!("alg"in r)||r.alg!==t))}catch{return!1}}const ew=Y("$ZodJWT",(e,t)=>{Ae.init(e,t),e._zod.check=n=>{tw(n.value,t.alg)||n.issues.push({code:"invalid_format",format:"jwt",input:n.value,inst:e,continue:!t.abort})}}),qm=Y("$ZodNumber",(e,t)=>{Ne.init(e,t),e._zod.pattern=e._zod.bag.pattern??eT,e._zod.parse=(n,i)=>{if(t.coerce)try{n.value=Number(n.value)}catch{}const r=n.value;if(typeof r=="number"&&!Number.isNaN(r)&&Number.isFinite(r))return n;const s=typeof r=="number"?Number.isNaN(r)?"NaN":Number.isFinite(r)?void 0:"Infinity":void 0;return n.issues.push({expected:"number",code:"invalid_type",input:r,inst:e,...s?{received:s}:{}}),n}}),nw=Y("$ZodNumber",(e,t)=>{oT.init(e,t),qm.init(e,t)}),iw=Y("$ZodBoolean",(e,t)=>{Ne.init(e,t),e._zod.pattern=nT,e._zod.parse=(n,i)=>{if(t.coerce)try{n.value=!!n.value}catch{}const r=n.value;return typeof r=="boolean"||n.issues.push({expected:"boolean",code:"invalid_type",input:r,inst:e}),n}}),rw=Y("$ZodUnknown",(e,t)=>{Ne.init(e,t),e._zod.parse=n=>n}),sw=Y("$ZodNever",(e,t)=>{Ne.init(e,t),e._zod.parse=(n,i)=>(n.issues.push({expected:"never",code:"invalid_type",input:n.value,inst:e}),n)});function Fh(e,t,n){e.issues.length&&t.issues.push(...zm(n,e.issues)),t.value[n]=e.value}const ow=Y("$ZodArray",(e,t)=>{Ne.init(e,t),e._zod.parse=(n,i)=>{const r=n.value;if(!Array.isArray(r))return n.issues.push({expected:"array",code:"invalid_type",input:r,inst:e}),n;n.value=Array(r.length);const s=[];for(let o=0;o<r.length;o++){const a=r[o],c=t.element._zod.run({value:a,issues:[]},i);c instanceof Promise?s.push(c.then(l=>Fh(l,n,o))):Fh(c,n,o)}return s.length?Promise.all(s).then(()=>n):n}});function hc(e,t,n,i){e.issues.length&&t.issues.push(...zm(n,e.issues)),e.value===void 0?n in i&&(t.value[n]=void 0):t.value[n]=e.value}function jm(e){const t=Object.keys(e.shape);for(const i of t)if(!e.shape?.[i]?._zod?.traits?.has("$ZodType"))throw new Error(`Invalid element at key "${i}": expected a Zod schema`);const n=Eb(e.shape);return{...e,keys:t,keySet:new Set(t),numKeys:t.length,optionalKeys:new Set(n)}}function Km(e,t,n,i,r,s){const o=[],a=r.keySet,c=r.catchall._zod,l=c.def.type;for(const u of Object.keys(t)){if(a.has(u))continue;if(l==="never"){o.push(u);continue}const f=c.run({value:t[u],issues:[]},i);f instanceof Promise?e.push(f.then(d=>hc(d,n,u,t))):hc(f,n,u,t)}return o.length&&n.issues.push({code:"unrecognized_keys",keys:o,input:t,inst:s}),e.length?Promise.all(e).then(()=>n):n}const aw=Y("$ZodObject",(e,t)=>{if(Ne.init(e,t),!Object.getOwnPropertyDescriptor(t,"shape")?.get){const o=t.shape;Object.defineProperty(t,"shape",{get:()=>{const a={...o};return Object.defineProperty(t,"shape",{value:a}),a}})}const n=Uf(()=>jm(t));ve(e._zod,"propValues",()=>{const o=t.shape,a={};for(const c in o){const l=o[c]._zod;if(l.values){a[c]??(a[c]=new Set);for(const u of l.values)a[c].add(u)}}return a});const i=dc,r=t.catchall;let s;e._zod.parse=(o,a)=>{s??(s=n.value);const c=o.value;if(!i(c))return o.issues.push({expected:"object",code:"invalid_type",input:c,inst:e}),o;o.value={};const l=[],u=s.shape;for(const f of s.keys){const d=u[f]._zod.run({value:c[f],issues:[]},a);d instanceof Promise?l.push(d.then(p=>hc(p,o,f,c))):hc(d,o,f,c)}return r?Km(l,c,o,a,n.value,e):l.length?Promise.all(l).then(()=>o):o}}),cw=Y("$ZodObjectJIT",(e,t)=>{aw.init(e,t);const n=e._zod.parse,i=Uf(()=>jm(t)),r=f=>{const d=new _T(["shape","payload","ctx"]),p=i.value,m=y=>{const x=Nh(y);return`shape[${x}]._zod.run({ value: input[${x}], issues: [] }, ctx)`};d.write("const input = payload.value;");const _=Object.create(null);let g=0;for(const y of p.keys)_[y]=`key_${g++}`;d.write("const newResult = {};");for(const y of p.keys){const x=_[y],v=Nh(y);d.write(`const ${x} = ${m(y)};`),d.write(`
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
        
      `)}d.write("payload.value = newResult;"),d.write("return payload;");const h=d.compile();return(y,x)=>h(f,y,x)};let s;const o=dc,a=!Nm.jitless,c=a&&Sb.value,l=t.catchall;let u;e._zod.parse=(f,d)=>{u??(u=i.value);const p=f.value;return o(p)?a&&c&&d?.async===!1&&d.jitless!==!0?(s||(s=r(t.shape)),f=s(f,d),l?Km([],p,f,d,u,e):f):n(f,d):(f.issues.push({expected:"object",code:"invalid_type",input:p,inst:e}),f)}});function zh(e,t,n,i){for(const s of e)if(s.issues.length===0)return t.value=s.value,t;const r=e.filter(s=>!Cs(s));return r.length===1?(t.value=r[0].value,r[0]):(t.issues.push({code:"invalid_union",input:t.value,inst:n,errors:e.map(s=>s.issues.map(o=>ts(o,i,Qr())))}),t)}const lw=Y("$ZodUnion",(e,t)=>{Ne.init(e,t),ve(e._zod,"optin",()=>t.options.some(r=>r._zod.optin==="optional")?"optional":void 0),ve(e._zod,"optout",()=>t.options.some(r=>r._zod.optout==="optional")?"optional":void 0),ve(e._zod,"values",()=>{if(t.options.every(r=>r._zod.values))return new Set(t.options.flatMap(r=>Array.from(r._zod.values)))}),ve(e._zod,"pattern",()=>{if(t.options.every(r=>r._zod.pattern)){const r=t.options.map(s=>s._zod.pattern);return new RegExp(`^(${r.map(s=>Of(s.source)).join("|")})$`)}});const n=t.options.length===1,i=t.options[0]._zod.run;e._zod.parse=(r,s)=>{if(n)return i(r,s);let o=!1;const a=[];for(const c of t.options){const l=c._zod.run({value:r.value,issues:[]},s);if(l instanceof Promise)a.push(l),o=!0;else{if(l.issues.length===0)return l;a.push(l)}}return o?Promise.all(a).then(c=>zh(c,r,e,s)):zh(a,r,e,s)}}),uw=Y("$ZodIntersection",(e,t)=>{Ne.init(e,t),e._zod.parse=(n,i)=>{const r=n.value,s=t.left._zod.run({value:r,issues:[]},i),o=t.right._zod.run({value:r,issues:[]},i);return s instanceof Promise||o instanceof Promise?Promise.all([s,o]).then(([a,c])=>Bh(n,a,c)):Bh(n,s,o)}});function Hu(e,t){if(e===t)return{valid:!0,data:e};if(e instanceof Date&&t instanceof Date&&+e==+t)return{valid:!0,data:e};if(Go(e)&&Go(t)){const n=Object.keys(t),i=Object.keys(e).filter(s=>n.indexOf(s)!==-1),r={...e,...t};for(const s of i){const o=Hu(e[s],t[s]);if(!o.valid)return{valid:!1,mergeErrorPath:[s,...o.mergeErrorPath]};r[s]=o.data}return{valid:!0,data:r}}if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return{valid:!1,mergeErrorPath:[]};const n=[];for(let i=0;i<e.length;i++){const r=e[i],s=t[i],o=Hu(r,s);if(!o.valid)return{valid:!1,mergeErrorPath:[i,...o.mergeErrorPath]};n.push(o.data)}return{valid:!0,data:n}}return{valid:!1,mergeErrorPath:[]}}function Bh(e,t,n){if(t.issues.length&&e.issues.push(...t.issues),n.issues.length&&e.issues.push(...n.issues),Cs(e))return e;const i=Hu(t.value,n.value);if(!i.valid)throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(i.mergeErrorPath)}`);return e.value=i.data,e}const fw=Y("$ZodEnum",(e,t)=>{Ne.init(e,t);const n=xb(t.entries),i=new Set(n);e._zod.values=i,e._zod.pattern=new RegExp(`^(${n.filter(r=>Mb.has(typeof r)).map(r=>typeof r=="string"?Zs(r):r.toString()).join("|")})$`),e._zod.parse=(r,s)=>{const o=r.value;return i.has(o)||r.issues.push({code:"invalid_value",values:n,input:o,inst:e}),r}}),dw=Y("$ZodLiteral",(e,t)=>{if(Ne.init(e,t),t.values.length===0)throw new Error("Cannot create literal schema with no valid values");e._zod.values=new Set(t.values),e._zod.pattern=new RegExp(`^(${t.values.map(n=>typeof n=="string"?Zs(n):n?Zs(n.toString()):String(n)).join("|")})$`),e._zod.parse=(n,i)=>{const r=n.value;return e._zod.values.has(r)||n.issues.push({code:"invalid_value",values:t.values,input:r,inst:e}),n}}),hw=Y("$ZodTransform",(e,t)=>{Ne.init(e,t),e._zod.parse=(n,i)=>{if(i.direction==="backward")throw new Um(e.constructor.name);const r=t.transform(n.value,n);if(i.async)return(r instanceof Promise?r:Promise.resolve(r)).then(s=>(n.value=s,n));if(r instanceof Promise)throw new Us;return n.value=r,n}});function kh(e,t){return e.issues.length&&t===void 0?{issues:[],value:void 0}:e}const pw=Y("$ZodOptional",(e,t)=>{Ne.init(e,t),e._zod.optin="optional",e._zod.optout="optional",ve(e._zod,"values",()=>t.innerType._zod.values?new Set([...t.innerType._zod.values,void 0]):void 0),ve(e._zod,"pattern",()=>{const n=t.innerType._zod.pattern;return n?new RegExp(`^(${Of(n.source)})?$`):void 0}),e._zod.parse=(n,i)=>{if(t.innerType._zod.optin==="optional"){const r=t.innerType._zod.run(n,i);return r instanceof Promise?r.then(s=>kh(s,n.value)):kh(r,n.value)}return n.value===void 0?n:t.innerType._zod.run(n,i)}}),mw=Y("$ZodNullable",(e,t)=>{Ne.init(e,t),ve(e._zod,"optin",()=>t.innerType._zod.optin),ve(e._zod,"optout",()=>t.innerType._zod.optout),ve(e._zod,"pattern",()=>{const n=t.innerType._zod.pattern;return n?new RegExp(`^(${Of(n.source)}|null)$`):void 0}),ve(e._zod,"values",()=>t.innerType._zod.values?new Set([...t.innerType._zod.values,null]):void 0),e._zod.parse=(n,i)=>n.value===null?n:t.innerType._zod.run(n,i)}),gw=Y("$ZodDefault",(e,t)=>{Ne.init(e,t),e._zod.optin="optional",ve(e._zod,"values",()=>t.innerType._zod.values),e._zod.parse=(n,i)=>{if(i.direction==="backward")return t.innerType._zod.run(n,i);if(n.value===void 0)return n.value=t.defaultValue,n;const r=t.innerType._zod.run(n,i);return r instanceof Promise?r.then(s=>Vh(s,t)):Vh(r,t)}});function Vh(e,t){return e.value===void 0&&(e.value=t.defaultValue),e}const _w=Y("$ZodPrefault",(e,t)=>{Ne.init(e,t),e._zod.optin="optional",ve(e._zod,"values",()=>t.innerType._zod.values),e._zod.parse=(n,i)=>(i.direction==="backward"||n.value===void 0&&(n.value=t.defaultValue),t.innerType._zod.run(n,i))}),vw=Y("$ZodNonOptional",(e,t)=>{Ne.init(e,t),ve(e._zod,"values",()=>{const n=t.innerType._zod.values;return n?new Set([...n].filter(i=>i!==void 0)):void 0}),e._zod.parse=(n,i)=>{const r=t.innerType._zod.run(n,i);return r instanceof Promise?r.then(s=>$h(s,e)):$h(r,e)}});function $h(e,t){return!e.issues.length&&e.value===void 0&&e.issues.push({code:"invalid_type",expected:"nonoptional",input:e.value,inst:t}),e}const xw=Y("$ZodCatch",(e,t)=>{Ne.init(e,t),ve(e._zod,"optin",()=>t.innerType._zod.optin),ve(e._zod,"optout",()=>t.innerType._zod.optout),ve(e._zod,"values",()=>t.innerType._zod.values),e._zod.parse=(n,i)=>{if(i.direction==="backward")return t.innerType._zod.run(n,i);const r=t.innerType._zod.run(n,i);return r instanceof Promise?r.then(s=>(n.value=s.value,s.issues.length&&(n.value=t.catchValue({...n,error:{issues:s.issues.map(o=>ts(o,i,Qr()))},input:n.value}),n.issues=[]),n)):(n.value=r.value,r.issues.length&&(n.value=t.catchValue({...n,error:{issues:r.issues.map(s=>ts(s,i,Qr()))},input:n.value}),n.issues=[]),n)}}),yw=Y("$ZodPipe",(e,t)=>{Ne.init(e,t),ve(e._zod,"values",()=>t.in._zod.values),ve(e._zod,"optin",()=>t.in._zod.optin),ve(e._zod,"optout",()=>t.out._zod.optout),ve(e._zod,"propValues",()=>t.in._zod.propValues),e._zod.parse=(n,i)=>{if(i.direction==="backward"){const s=t.out._zod.run(n,i);return s instanceof Promise?s.then(o=>Va(o,t.in,i)):Va(s,t.in,i)}const r=t.in._zod.run(n,i);return r instanceof Promise?r.then(s=>Va(s,t.out,i)):Va(r,t.out,i)}});function Va(e,t,n){return e.issues.length?(e.aborted=!0,e):t._zod.run({value:e.value,issues:e.issues},n)}const Sw=Y("$ZodReadonly",(e,t)=>{Ne.init(e,t),ve(e._zod,"propValues",()=>t.innerType._zod.propValues),ve(e._zod,"values",()=>t.innerType._zod.values),ve(e._zod,"optin",()=>t.innerType._zod.optin),ve(e._zod,"optout",()=>t.innerType._zod.optout),e._zod.parse=(n,i)=>{if(i.direction==="backward")return t.innerType._zod.run(n,i);const r=t.innerType._zod.run(n,i);return r instanceof Promise?r.then(Hh):Hh(r)}});function Hh(e){return e.value=Object.freeze(e.value),e}const Mw=Y("$ZodCustom",(e,t)=>{Mn.init(e,t),Ne.init(e,t),e._zod.parse=(n,i)=>n,e._zod.check=n=>{const i=n.value,r=t.fn(i);if(r instanceof Promise)return r.then(s=>Gh(s,n,i,e));Gh(r,n,i,e)}});function Gh(e,t,n,i){if(!e){const r={code:"custom",input:n,inst:i,path:[...i._zod.def.path??[]],continue:!i._zod.def.abort};i._zod.def.params&&(r.params=i._zod.def.params),t.issues.push(Wo(r))}}let Ew=class{constructor(){this._map=new WeakMap,this._idmap=new Map}add(t,...n){const i=n[0];if(this._map.set(t,i),i&&typeof i=="object"&&"id"in i){if(this._idmap.has(i.id))throw new Error(`ID ${i.id} already exists in the registry`);this._idmap.set(i.id,t)}return this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(t){const n=this._map.get(t);return n&&typeof n=="object"&&"id"in n&&this._idmap.delete(n.id),this._map.delete(t),this}get(t){const n=t._zod.parent;if(n){const i={...this.get(n)??{}};delete i.id;const r={...i,...this._map.get(t)};return Object.keys(r).length?r:void 0}return this._map.get(t)}has(t){return this._map.has(t)}};function bw(){return new Ew}const $a=bw();function Tw(e,t){return new e({type:"string",...wt(t)})}function ww(e,t){return new e({type:"string",format:"email",check:"string_format",abort:!1,...wt(t)})}function Wh(e,t){return new e({type:"string",format:"guid",check:"string_format",abort:!1,...wt(t)})}function Aw(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,...wt(t)})}function Cw(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v4",...wt(t)})}function Rw(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v6",...wt(t)})}function Pw(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v7",...wt(t)})}function Iw(e,t){return new e({type:"string",format:"url",check:"string_format",abort:!1,...wt(t)})}function Dw(e,t){return new e({type:"string",format:"emoji",check:"string_format",abort:!1,...wt(t)})}function Lw(e,t){return new e({type:"string",format:"nanoid",check:"string_format",abort:!1,...wt(t)})}function Uw(e,t){return new e({type:"string",format:"cuid",check:"string_format",abort:!1,...wt(t)})}function Nw(e,t){return new e({type:"string",format:"cuid2",check:"string_format",abort:!1,...wt(t)})}function Ow(e,t){return new e({type:"string",format:"ulid",check:"string_format",abort:!1,...wt(t)})}function Fw(e,t){return new e({type:"string",format:"xid",check:"string_format",abort:!1,...wt(t)})}function zw(e,t){return new e({type:"string",format:"ksuid",check:"string_format",abort:!1,...wt(t)})}function Bw(e,t){return new e({type:"string",format:"ipv4",check:"string_format",abort:!1,...wt(t)})}function kw(e,t){return new e({type:"string",format:"ipv6",check:"string_format",abort:!1,...wt(t)})}function Vw(e,t){return new e({type:"string",format:"cidrv4",check:"string_format",abort:!1,...wt(t)})}function $w(e,t){return new e({type:"string",format:"cidrv6",check:"string_format",abort:!1,...wt(t)})}function Hw(e,t){return new e({type:"string",format:"base64",check:"string_format",abort:!1,...wt(t)})}function Gw(e,t){return new e({type:"string",format:"base64url",check:"string_format",abort:!1,...wt(t)})}function Ww(e,t){return new e({type:"string",format:"e164",check:"string_format",abort:!1,...wt(t)})}function Xw(e,t){return new e({type:"string",format:"jwt",check:"string_format",abort:!1,...wt(t)})}function Yw(e,t){return new e({type:"string",format:"datetime",check:"string_format",offset:!1,local:!1,precision:null,...wt(t)})}function Zw(e,t){return new e({type:"string",format:"date",check:"string_format",...wt(t)})}function qw(e,t){return new e({type:"string",format:"time",check:"string_format",precision:null,...wt(t)})}function jw(e,t){return new e({type:"string",format:"duration",check:"string_format",...wt(t)})}function Kw(e,t){return new e({type:"number",checks:[],...wt(t)})}function Jw(e,t){return new e({type:"number",check:"number_format",abort:!1,format:"safeint",...wt(t)})}function Qw(e,t){return new e({type:"boolean",...wt(t)})}function t1(e){return new e({type:"unknown"})}function e1(e,t){return new e({type:"never",...wt(t)})}function Xh(e,t){return new Hm({check:"less_than",...wt(t),value:e,inclusive:!1})}function wl(e,t){return new Hm({check:"less_than",...wt(t),value:e,inclusive:!0})}function Yh(e,t){return new Gm({check:"greater_than",...wt(t),value:e,inclusive:!1})}function Al(e,t){return new Gm({check:"greater_than",...wt(t),value:e,inclusive:!0})}function Zh(e,t){return new sT({check:"multiple_of",...wt(t),value:e})}function Jm(e,t){return new aT({check:"max_length",...wt(t),maximum:e})}function pc(e,t){return new cT({check:"min_length",...wt(t),minimum:e})}function Qm(e,t){return new lT({check:"length_equals",...wt(t),length:e})}function n1(e,t){return new uT({check:"string_format",format:"regex",...wt(t),pattern:e})}function i1(e){return new fT({check:"string_format",format:"lowercase",...wt(e)})}function r1(e){return new dT({check:"string_format",format:"uppercase",...wt(e)})}function s1(e,t){return new hT({check:"string_format",format:"includes",...wt(t),includes:e})}function o1(e,t){return new pT({check:"string_format",format:"starts_with",...wt(t),prefix:e})}function a1(e,t){return new mT({check:"string_format",format:"ends_with",...wt(t),suffix:e})}function aa(e){return new gT({check:"overwrite",tx:e})}function c1(e){return aa(t=>t.normalize(e))}function l1(){return aa(e=>e.trim())}function u1(){return aa(e=>e.toLowerCase())}function f1(){return aa(e=>e.toUpperCase())}function d1(e,t,n){return new e({type:"array",element:t,...wt(n)})}function h1(e,t,n){return new e({type:"custom",check:"custom",fn:t,...wt(n)})}function p1(e){const t=m1(n=>(n.addIssue=i=>{if(typeof i=="string")n.issues.push(Wo(i,n.value,t._zod.def));else{const r=i;r.fatal&&(r.continue=!1),r.code??(r.code="custom"),r.input??(r.input=n.value),r.inst??(r.inst=t),r.continue??(r.continue=!t._zod.def.abort),n.issues.push(Wo(r))}},e(n.value,n)));return t}function m1(e,t){const n=new Mn({check:"custom",...wt(t)});return n._zod.check=e,n}const g1=Y("ZodISODateTime",(e,t)=>{$T.init(e,t),De.init(e,t)});function _1(e){return Yw(g1,e)}const v1=Y("ZodISODate",(e,t)=>{HT.init(e,t),De.init(e,t)});function x1(e){return Zw(v1,e)}const y1=Y("ZodISOTime",(e,t)=>{GT.init(e,t),De.init(e,t)});function S1(e){return qw(y1,e)}const M1=Y("ZodISODuration",(e,t)=>{WT.init(e,t),De.init(e,t)});function E1(e){return jw(M1,e)}const b1=(e,t)=>{Xm.init(e,t),e.name="ZodError",Object.defineProperties(e,{format:{value:n=>xT(e,n)},flatten:{value:n=>vT(e,n)},addIssue:{value:n=>{e.issues.push(n),e.message=JSON.stringify(e.issues,$u,2)}},addIssues:{value:n=>{e.issues.push(...n),e.message=JSON.stringify(e.issues,$u,2)}},isEmpty:{get(){return e.issues.length===0}}})},Yn=Y("ZodError",b1,{Parent:Error}),T1=zf(Yn),w1=Bf(Yn),A1=kc(Yn),C1=Vc(Yn),R1=MT(Yn),P1=ET(Yn),I1=bT(Yn),D1=TT(Yn),L1=wT(Yn),U1=AT(Yn),N1=CT(Yn),O1=RT(Yn),ze=Y("ZodType",(e,t)=>(Ne.init(e,t),e.def=t,e.type=t.type,Object.defineProperty(e,"_def",{value:t}),e.check=(...n)=>e.clone(os(t,{checks:[...t.checks??[],...n.map(i=>typeof i=="function"?{_zod:{check:i,def:{check:"custom"},onattach:[]}}:i)]})),e.clone=(n,i)=>xr(e,n,i),e.brand=()=>e,e.register=(n,i)=>(n.add(e,i),e),e.parse=(n,i)=>T1(e,n,i,{callee:e.parse}),e.safeParse=(n,i)=>A1(e,n,i),e.parseAsync=async(n,i)=>w1(e,n,i,{callee:e.parseAsync}),e.safeParseAsync=async(n,i)=>C1(e,n,i),e.spa=e.safeParseAsync,e.encode=(n,i)=>R1(e,n,i),e.decode=(n,i)=>P1(e,n,i),e.encodeAsync=async(n,i)=>I1(e,n,i),e.decodeAsync=async(n,i)=>D1(e,n,i),e.safeEncode=(n,i)=>L1(e,n,i),e.safeDecode=(n,i)=>U1(e,n,i),e.safeEncodeAsync=async(n,i)=>N1(e,n,i),e.safeDecodeAsync=async(n,i)=>O1(e,n,i),e.refine=(n,i)=>e.check(AA(n,i)),e.superRefine=n=>e.check(CA(n)),e.overwrite=n=>e.check(aa(n)),e.optional=()=>Jh(e),e.nullable=()=>Qh(e),e.nullish=()=>Jh(Qh(e)),e.nonoptional=n=>yA(e,n),e.array=()=>aA(e),e.or=n=>ee([e,n]),e.and=n=>fA(e,n),e.transform=n=>tp(e,pA(n)),e.default=n=>_A(e,n),e.prefault=n=>xA(e,n),e.catch=n=>MA(e,n),e.pipe=n=>tp(e,n),e.readonly=()=>TA(e),e.describe=n=>{const i=e.clone();return $a.add(i,{description:n}),i},Object.defineProperty(e,"description",{get(){return $a.get(e)?.description},configurable:!0}),e.meta=(...n)=>{if(n.length===0)return $a.get(e);const i=e.clone();return $a.add(i,n[0]),i},e.isOptional=()=>e.safeParse(void 0).success,e.isNullable=()=>e.safeParse(null).success,e)),tg=Y("_ZodString",(e,t)=>{kf.init(e,t),ze.init(e,t);const n=e._zod.bag;e.format=n.format??null,e.minLength=n.minimum??null,e.maxLength=n.maximum??null,e.regex=(...i)=>e.check(n1(...i)),e.includes=(...i)=>e.check(s1(...i)),e.startsWith=(...i)=>e.check(o1(...i)),e.endsWith=(...i)=>e.check(a1(...i)),e.min=(...i)=>e.check(pc(...i)),e.max=(...i)=>e.check(Jm(...i)),e.length=(...i)=>e.check(Qm(...i)),e.nonempty=(...i)=>e.check(pc(1,...i)),e.lowercase=i=>e.check(i1(i)),e.uppercase=i=>e.check(r1(i)),e.trim=()=>e.check(l1()),e.normalize=(...i)=>e.check(c1(...i)),e.toLowerCase=()=>e.check(u1()),e.toUpperCase=()=>e.check(f1())}),F1=Y("ZodString",(e,t)=>{kf.init(e,t),tg.init(e,t),e.email=n=>e.check(ww(z1,n)),e.url=n=>e.check(Iw(B1,n)),e.jwt=n=>e.check(Xw(tA,n)),e.emoji=n=>e.check(Dw(k1,n)),e.guid=n=>e.check(Wh(qh,n)),e.uuid=n=>e.check(Aw(Ha,n)),e.uuidv4=n=>e.check(Cw(Ha,n)),e.uuidv6=n=>e.check(Rw(Ha,n)),e.uuidv7=n=>e.check(Pw(Ha,n)),e.nanoid=n=>e.check(Lw(V1,n)),e.guid=n=>e.check(Wh(qh,n)),e.cuid=n=>e.check(Uw($1,n)),e.cuid2=n=>e.check(Nw(H1,n)),e.ulid=n=>e.check(Ow(G1,n)),e.base64=n=>e.check(Hw(K1,n)),e.base64url=n=>e.check(Gw(J1,n)),e.xid=n=>e.check(Fw(W1,n)),e.ksuid=n=>e.check(zw(X1,n)),e.ipv4=n=>e.check(Bw(Y1,n)),e.ipv6=n=>e.check(kw(Z1,n)),e.cidrv4=n=>e.check(Vw(q1,n)),e.cidrv6=n=>e.check($w(j1,n)),e.e164=n=>e.check(Ww(Q1,n)),e.datetime=n=>e.check(_1(n)),e.date=n=>e.check(x1(n)),e.time=n=>e.check(S1(n)),e.duration=n=>e.check(E1(n))});function Lt(e){return Tw(F1,e)}const De=Y("ZodStringFormat",(e,t)=>{Ae.init(e,t),tg.init(e,t)}),z1=Y("ZodEmail",(e,t)=>{LT.init(e,t),De.init(e,t)}),qh=Y("ZodGUID",(e,t)=>{IT.init(e,t),De.init(e,t)}),Ha=Y("ZodUUID",(e,t)=>{DT.init(e,t),De.init(e,t)}),B1=Y("ZodURL",(e,t)=>{UT.init(e,t),De.init(e,t)}),k1=Y("ZodEmoji",(e,t)=>{NT.init(e,t),De.init(e,t)}),V1=Y("ZodNanoID",(e,t)=>{OT.init(e,t),De.init(e,t)}),$1=Y("ZodCUID",(e,t)=>{FT.init(e,t),De.init(e,t)}),H1=Y("ZodCUID2",(e,t)=>{zT.init(e,t),De.init(e,t)}),G1=Y("ZodULID",(e,t)=>{BT.init(e,t),De.init(e,t)}),W1=Y("ZodXID",(e,t)=>{kT.init(e,t),De.init(e,t)}),X1=Y("ZodKSUID",(e,t)=>{VT.init(e,t),De.init(e,t)}),Y1=Y("ZodIPv4",(e,t)=>{XT.init(e,t),De.init(e,t)}),Z1=Y("ZodIPv6",(e,t)=>{YT.init(e,t),De.init(e,t)}),q1=Y("ZodCIDRv4",(e,t)=>{ZT.init(e,t),De.init(e,t)}),j1=Y("ZodCIDRv6",(e,t)=>{qT.init(e,t),De.init(e,t)}),K1=Y("ZodBase64",(e,t)=>{jT.init(e,t),De.init(e,t)}),J1=Y("ZodBase64URL",(e,t)=>{JT.init(e,t),De.init(e,t)}),Q1=Y("ZodE164",(e,t)=>{QT.init(e,t),De.init(e,t)}),tA=Y("ZodJWT",(e,t)=>{ew.init(e,t),De.init(e,t)}),eg=Y("ZodNumber",(e,t)=>{qm.init(e,t),ze.init(e,t),e.gt=(i,r)=>e.check(Yh(i,r)),e.gte=(i,r)=>e.check(Al(i,r)),e.min=(i,r)=>e.check(Al(i,r)),e.lt=(i,r)=>e.check(Xh(i,r)),e.lte=(i,r)=>e.check(wl(i,r)),e.max=(i,r)=>e.check(wl(i,r)),e.int=i=>e.check(jh(i)),e.safe=i=>e.check(jh(i)),e.positive=i=>e.check(Yh(0,i)),e.nonnegative=i=>e.check(Al(0,i)),e.negative=i=>e.check(Xh(0,i)),e.nonpositive=i=>e.check(wl(0,i)),e.multipleOf=(i,r)=>e.check(Zh(i,r)),e.step=(i,r)=>e.check(Zh(i,r)),e.finite=()=>e;const n=e._zod.bag;e.minValue=Math.max(n.minimum??Number.NEGATIVE_INFINITY,n.exclusiveMinimum??Number.NEGATIVE_INFINITY)??null,e.maxValue=Math.min(n.maximum??Number.POSITIVE_INFINITY,n.exclusiveMaximum??Number.POSITIVE_INFINITY)??null,e.isInt=(n.format??"").includes("int")||Number.isSafeInteger(n.multipleOf??.5),e.isFinite=!0,e.format=n.format??null});function Ns(e){return Kw(eg,e)}const eA=Y("ZodNumberFormat",(e,t)=>{nw.init(e,t),eg.init(e,t)});function jh(e){return Jw(eA,e)}const nA=Y("ZodBoolean",(e,t)=>{iw.init(e,t),ze.init(e,t)});function iA(e){return Qw(nA,e)}const rA=Y("ZodUnknown",(e,t)=>{rw.init(e,t),ze.init(e,t)});function Kh(){return t1(rA)}const sA=Y("ZodNever",(e,t)=>{sw.init(e,t),ze.init(e,t)});function ng(e){return e1(sA,e)}const oA=Y("ZodArray",(e,t)=>{ow.init(e,t),ze.init(e,t),e.element=t.element,e.min=(n,i)=>e.check(pc(n,i)),e.nonempty=n=>e.check(pc(1,n)),e.max=(n,i)=>e.check(Jm(n,i)),e.length=(n,i)=>e.check(Qm(n,i)),e.unwrap=()=>e.element});function aA(e,t){return d1(oA,e,t)}const cA=Y("ZodObject",(e,t)=>{cw.init(e,t),ze.init(e,t),ve(e,"shape",()=>t.shape),e.keyof=()=>ca(Object.keys(e._zod.def.shape)),e.catchall=n=>e.clone({...e._zod.def,catchall:n}),e.passthrough=()=>e.clone({...e._zod.def,catchall:Kh()}),e.loose=()=>e.clone({...e._zod.def,catchall:Kh()}),e.strict=()=>e.clone({...e._zod.def,catchall:ng()}),e.strip=()=>e.clone({...e._zod.def,catchall:void 0}),e.extend=n=>Ab(e,n),e.safeExtend=n=>Cb(e,n),e.merge=n=>Rb(e,n),e.pick=n=>Tb(e,n),e.omit=n=>wb(e,n),e.partial=(...n)=>Pb(ig,e,n[0]),e.required=(...n)=>Ib(rg,e,n[0])});function je(e,t){const n={type:"object",shape:e??{},...wt(t)};return new cA(n)}const lA=Y("ZodUnion",(e,t)=>{lw.init(e,t),ze.init(e,t),e.options=t.options});function ee(e,t){return new lA({type:"union",options:e,...wt(t)})}const uA=Y("ZodIntersection",(e,t)=>{uw.init(e,t),ze.init(e,t)});function fA(e,t){return new uA({type:"intersection",left:e,right:t})}const Gu=Y("ZodEnum",(e,t)=>{fw.init(e,t),ze.init(e,t),e.enum=t.entries,e.options=Object.values(t.entries);const n=new Set(Object.keys(t.entries));e.extract=(i,r)=>{const s={};for(const o of i)if(n.has(o))s[o]=t.entries[o];else throw new Error(`Key ${o} not found in enum`);return new Gu({...t,checks:[],...wt(r),entries:s})},e.exclude=(i,r)=>{const s={...t.entries};for(const o of i)if(n.has(o))delete s[o];else throw new Error(`Key ${o} not found in enum`);return new Gu({...t,checks:[],...wt(r),entries:s})}});function ca(e,t){const n=Array.isArray(e)?Object.fromEntries(e.map(i=>[i,i])):e;return new Gu({type:"enum",entries:n,...wt(t)})}const dA=Y("ZodLiteral",(e,t)=>{dw.init(e,t),ze.init(e,t),e.values=new Set(t.values),Object.defineProperty(e,"value",{get(){if(t.values.length>1)throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");return t.values[0]}})});function Ga(e,t){return new dA({type:"literal",values:Array.isArray(e)?e:[e],...wt(t)})}const hA=Y("ZodTransform",(e,t)=>{hw.init(e,t),ze.init(e,t),e._zod.parse=(n,i)=>{if(i.direction==="backward")throw new Um(e.constructor.name);n.addIssue=s=>{if(typeof s=="string")n.issues.push(Wo(s,n.value,t));else{const o=s;o.fatal&&(o.continue=!1),o.code??(o.code="custom"),o.input??(o.input=n.value),o.inst??(o.inst=e),n.issues.push(Wo(o))}};const r=t.transform(n.value,n);return r instanceof Promise?r.then(s=>(n.value=s,n)):(n.value=r,n)}});function pA(e){return new hA({type:"transform",transform:e})}const ig=Y("ZodOptional",(e,t)=>{pw.init(e,t),ze.init(e,t),e.unwrap=()=>e._zod.def.innerType});function Jh(e){return new ig({type:"optional",innerType:e})}const mA=Y("ZodNullable",(e,t)=>{mw.init(e,t),ze.init(e,t),e.unwrap=()=>e._zod.def.innerType});function Qh(e){return new mA({type:"nullable",innerType:e})}const gA=Y("ZodDefault",(e,t)=>{gw.init(e,t),ze.init(e,t),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});function _A(e,t){return new gA({type:"default",innerType:e,get defaultValue(){return typeof t=="function"?t():Fm(t)}})}const vA=Y("ZodPrefault",(e,t)=>{_w.init(e,t),ze.init(e,t),e.unwrap=()=>e._zod.def.innerType});function xA(e,t){return new vA({type:"prefault",innerType:e,get defaultValue(){return typeof t=="function"?t():Fm(t)}})}const rg=Y("ZodNonOptional",(e,t)=>{vw.init(e,t),ze.init(e,t),e.unwrap=()=>e._zod.def.innerType});function yA(e,t){return new rg({type:"nonoptional",innerType:e,...wt(t)})}const SA=Y("ZodCatch",(e,t)=>{xw.init(e,t),ze.init(e,t),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});function MA(e,t){return new SA({type:"catch",innerType:e,catchValue:typeof t=="function"?t:()=>t})}const EA=Y("ZodPipe",(e,t)=>{yw.init(e,t),ze.init(e,t),e.in=t.in,e.out=t.out});function tp(e,t){return new EA({type:"pipe",in:e,out:t})}const bA=Y("ZodReadonly",(e,t)=>{Sw.init(e,t),ze.init(e,t),e.unwrap=()=>e._zod.def.innerType});function TA(e){return new bA({type:"readonly",innerType:e})}const wA=Y("ZodCustom",(e,t)=>{Mw.init(e,t),ze.init(e,t)});function AA(e,t={}){return h1(wA,e,t)}function CA(e){return p1(e)}const Nt=Ns(),ar=Lt().regex(/^-?\d+(\.\d+)?$/).transform(e=>parseFloat(e)),Os=ee([iA(),Ga("true").transform(()=>!0),Ga("false").transform(()=>!1),Ga(1).transform(()=>!0),Ga(0).transform(()=>!1)]),me=ee([je({x:Ns(),y:Ns(),z:Ns()}),Nt.transform(e=>({x:e,y:e,z:e})),ar.transform(e=>({x:e,y:e,z:e})),Lt().regex(/^-?\d+(\.\d+)?\s+-?\d+(\.\d+)?\s+-?\d+(\.\d+)?$/).transform(e=>{const[t,n,i]=e.split(/\s+/).map(Number);return{x:t,y:n,z:i}})]);ee([je({x:Ns(),y:Ns()}),Nt.transform(e=>({x:e,y:e})),ar.transform(e=>({x:e,y:e})),Lt().regex(/^-?\d+(\.\d+)?\s+-?\d+(\.\d+)?$/).transform(e=>{const[t,n]=e.split(/\s+/).map(Number);return{x:t,y:n}})]);const es=ee([Lt().regex(/^#[0-9a-fA-F]{6}$/).transform(e=>parseInt(e.slice(1),16)),Lt().regex(/^0x[0-9a-fA-F]{6}$/).transform(e=>parseInt(e.slice(2),16)),Nt,ar]),ao=ca(["box","sphere"]),RA=ca(["static","dynamic","kinematic"]),co=je({pos:me.optional(),scale:me.optional(),euler:me.optional(),rot:ng().optional()}).strict(),$c=je({type:RA.optional(),pos:me.optional(),euler:me.optional(),mass:Nt.optional(),"linear-damping":Nt.optional(),"angular-damping":Nt.optional(),"gravity-scale":Nt.optional()}).strict(),la=je({shape:ao.optional(),size:me.optional(),restitution:Nt.optional(),friction:Nt.optional(),density:Nt.optional(),sensor:Os.optional()}).strict(),Hc=je({shape:ao.optional(),size:me.optional(),color:es.optional(),"cast-shadow":Os.optional(),"receive-shadow":Os.optional(),visible:Os.optional()}).strict(),sg=je({distance:Nt.optional(),"min-distance":Nt.optional(),"max-distance":Nt.optional(),"min-pitch":Nt.optional(),"max-pitch":Nt.optional(),"target-pitch":Nt.optional(),"target-yaw":Nt.optional(),sensitivity:Nt.optional(),smoothing:Nt.optional(),enabled:Os.optional()}).strict(),og=je({speed:Nt.optional(),"jump-height":Nt.optional(),acceleration:Nt.optional(),"air-control":Nt.optional(),enabled:Os.optional()}).strict();je({transform:ee([Lt(),co]).optional(),body:ee([Lt(),$c]).optional(),collider:ee([Lt(),la]).optional(),renderer:ee([Lt(),Hc]).optional(),"orbit-camera":ee([Lt(),sg]).optional(),player:ee([Lt(),og]).optional(),pos:me.optional(),scale:me.optional(),euler:me.optional(),color:es.optional(),size:me.optional(),shape:ao.optional(),id:Lt().optional()}).passthrough();je({pos:me,shape:ao,size:me,color:es,transform:ee([Lt(),co]).optional(),collider:ee([Lt(),la]).optional(),renderer:ee([Lt(),Hc]).optional(),scale:me.optional(),euler:me.optional(),restitution:Nt.optional(),friction:Nt.optional(),id:Lt().optional(),name:Lt().optional()}).strict();je({pos:me,shape:ao,size:me,color:es,transform:ee([Lt(),co]).optional(),body:ee([Lt(),$c]).optional(),collider:ee([Lt(),la]).optional(),renderer:ee([Lt(),Hc]).optional(),scale:me.optional(),euler:me.optional(),mass:Nt.optional(),restitution:Nt.optional(),friction:Nt.optional(),id:Lt().optional(),name:Lt().optional()}).strict();je({pos:me,shape:ao,size:me,color:es,transform:ee([Lt(),co]).optional(),body:ee([Lt(),$c]).optional(),collider:ee([Lt(),la]).optional(),renderer:ee([Lt(),Hc]).optional(),scale:me.optional(),euler:me.optional(),id:Lt().optional(),name:Lt().optional()}).strict();je({pos:me.optional(),speed:Nt.optional(),"jump-height":Nt.optional(),acceleration:Nt.optional(),"air-control":Nt.optional(),transform:ee([Lt(),co]).optional(),body:ee([Lt(),$c]).optional(),collider:ee([Lt(),la]).optional(),player:ee([Lt(),og]).optional(),id:Lt().optional()}).strict();je({distance:Nt.optional(),"min-distance":Nt.optional(),"max-distance":Nt.optional(),"target-pitch":Nt.optional(),"target-yaw":Nt.optional(),transform:ee([Lt(),co]).optional(),"orbit-camera":ee([Lt(),sg]).optional(),id:Lt().optional()}).strict();je({canvas:Lt().optional(),sky:es.optional(),fog:es.optional(),"fog-near":Nt.optional(),"fog-far":Nt.optional(),gravity:me.optional(),id:Lt().optional()}).strict();const PA=ca(["linear","ease","ease-in","ease-out","ease-in-out","sine-in","sine-out","sine-in-out","quad-in","quad-out","quad-in-out","cubic-in","cubic-out","cubic-in-out","quart-in","quart-out","quart-in-out","expo-in","expo-out","expo-in-out","circ-in","circ-out","circ-in-out","back-in","back-out","back-in-out","elastic-in","elastic-out","elastic-in-out","bounce-in","bounce-out","bounce-in-out"]);ca(["once","loop","ping-pong"]);je({target:Lt(),attr:Lt(),from:ee([Nt,ar,me]).optional(),to:ee([Nt,ar,me]),duration:ee([Nt,ar]).default(1),delay:ee([Nt,ar]).optional(),easing:PA.optional(),id:Lt().optional(),name:Lt().optional()}).strict();je({duration:ee([Nt,ar]).default(0)}).strict();je({id:Lt().optional(),name:Lt().optional()}).strict();function IA(e){return typeof e=="number"?e:typeof e=="string"?parseFloat(e)||0:typeof e=="boolean"&&e?1:0}function ag(e,t,n,i){const r=e.getRecipe(t);if(!r){const o=Array.from(e.getRecipeNames()),a=Ja(t,o);throw new Error(a)}const s=e.createEntity();if(r.components)for(const o of r.components){const a=e.getComponent(o);a&&e.addComponent(s,a)}if(r.components)for(const o of r.components){const a=e.getComponent(o);if(a){const c=e.config.getDefaults(o);for(const[l,u]of Object.entries(c))l in a&&(a[l][s]=u)}}if(r.overrides)for(const[o,a]of Object.entries(r.overrides)){const[c,l]=o.split("."),u=e.getComponent(c);if(u){e.hasComponent(s,u)||e.addComponent(s,u);const f=xf(l);f in u&&(u[f][s]=a)}}return NA(s,r,n,e,i),s}function DA(e,t,n={}){const i=new Jp(e);return ag(e,t,n,i)}function ep(e,t,n,i){const r=xf(n);return r in t?(t[r][e]=IA(i),!0):!1}function LA(e,t,n,i,r){if(n.includes(".")){const[s,o]=n.split("."),a=r.getComponent(s);return a?ep(e,a,o,i):!1}if(t.components)for(const s of t.components){const o=r.getComponent(s);if(o&&ep(e,o,n,i))return!0}return!1}function UA(e,t){const n=new Set;if(e.components)for(const i of e.components){const r=t.config.getShorthands(i);for(const s of Object.keys(r))n.add(s)}for(const i of t.getComponentNames())n.add(i);if(e.components)for(const i of e.components){const r=t.getComponent(i);if(r){n.add(i);for(const s in r)if(typeof r[s]!="function"&&!s.startsWith("_")){const o=s.replace(/([A-Z])/g,"-$1").toLowerCase();n.add(`${i}.${o}`),n.add(o)}}}return n.add("id"),n.add("name"),Array.from(n).sort()}function NA(e,t,n,i,r){const s=gb(n,t,i);for(const a of i.config.getValidations())a.condition(t.name,s)&&console.warn(`[${t.name}] Warning: ${a.warning}`);const o=!!i.getParser(t.name);for(const[a,c]of Object.entries(s)){if(a==="id")continue;if(a==="name"){typeof c=="string"&&r.setName(c,e);continue}const l=i.getComponent(a);if(l&&typeof c=="string"){if(!i.hasComponent(e,l)){i.addComponent(e,l);const f=i.config.getDefaults(a);for(const[d,p]of Object.entries(f))d in l&&(l[d][e]=p)}const u=mb(a,c,l,i,r);for(const[f,d]of Object.entries(u))f in l&&(l[f][e]=d)}else if(!LA(e,t,a,c,i)&&!o){const u=UA(t,i),f=[];if(t.components)for(const p of t.components){const m=i.config.getShorthands(p);f.push(...Object.keys(m))}for(const[p]of Object.entries(s))if(i.getComponent(p)){const m=i.config.getShorthands(p);for(const _ of Object.keys(m))f.includes(_)||f.push(_)}const d=Uv(a,t.name,u,f);console.warn(d)}}}function OA(e,t){const n=[],i=new Jp(e);function r(s){if(e.hasRecipe(s.tagName)){const o=ag(e,s.tagName,s.attributes,i),a=e.getParser(s.tagName);if(a)return a({entity:o,element:s,state:e,context:i}),{entity:o,tagName:s.tagName,children:[]};const c=[];for(const l of s.children){const u=e.getParser(l.tagName);if(u)u({entity:o,element:l,state:e,context:i});else if(e.hasRecipe(l.tagName)){const f=r(l);if(f){c.push(f);const d=f.entity,p=e.getComponent("parent"),m=e.getComponent("transform");if(p&&m){if(!e.hasComponent(o,m)){console.warn(`[${s.tagName}] Parent entity is missing Transform component. Adding automatically.
  Consider adding transform="pos: 0 0 0" to the parent element.`),e.addComponent(o,m);const g=e.config.getDefaults("transform");for(const[h,y]of Object.entries(g))h in m&&(m[h][o]=y)}if(!e.hasComponent(d,m)){console.warn(`[${l.tagName}] Child entity is missing Transform component. Adding automatically.
  Consider adding transform="pos: 0 0 0" to the child element.`),e.addComponent(d,m);const g=e.config.getDefaults("transform");for(const[h,y]of Object.entries(g))h in m&&(m[h][d]=y)}e.addComponent(d,p),p.entity[d]=o;const _=e.getComponent("body");_&&e.hasComponent(o,_)&&e.hasComponent(d,_)&&console.warn(`[Physics Warning] "${l.tagName}" has a Body component and is nested inside "${s.tagName}" which also has a Body component.
This configuration is not supported - a physics body should not be a child of another physics body.
Consider one of these solutions:
  1. Remove the Body component from the child (keep only Collider if needed)
  2. Make "${l.tagName}" a sibling of "${s.tagName}" instead of a child
  3. Use physics constraints or joints to connect separate bodies`)}}}else{const f=Array.from(e.getRecipeNames()),d=Ja(l.tagName,f);throw new Error(d+`
  Note: Components must be specified as attributes, not child elements.
  Example: <entity transform="pos: 0 5 0" renderer="shape: box"></entity>`)}}return{entity:o,tagName:s.tagName,children:c}}return null}if(t.children.length>0)for(const s of t.children){const o=r(s);if(o)n.push(o);else{const a=Array.from(e.getRecipeNames()),c=Ja(s.tagName,a);throw new Error(c)}}else{if(t.tagName==="world")return n;const s=r(t);if(s)n.push(s);else{const o=Array.from(e.getRecipeNames()),a=Ja(t.tagName,o);throw new Error(a)}}return n}let FA=class{world;time;scheduler=new Dv;systems=new Set;config=new wv;recipes=new Map;components=new Map;plugins=[];entityNames=new Map;isDisposed=!1;constructor(){this.world=bv(),this.time={deltaTime:0,fixedDeltaTime:Bo.FIXED_TIMESTEP,elapsed:0},this.registerComponent("parent",Ge),this.registerRecipe({name:"entity",components:[]})}registerPlugin(t){if(this.plugins.push(t),t.components)for(const[n,i]of Object.entries(t.components))this.registerComponent(n,i);if(t.systems)for(const n of t.systems)this.registerSystem(n);if(t.recipes)for(const n of t.recipes)this.registerRecipe(n);t.config&&this.registerConfig(t.config)}async initializePlugins(){for(const t of this.plugins)t.initialize&&await t.initialize(this)}registerSystem(t){this.systems.has(t)||this.systems.add(t)}registerRecipe(t){this.recipes.set(t.name,t)}registerComponent(t,n){const i=Po(t);this.components.set(i,n)}registerConfig(t){this.config.register(t)}getParser(t){return this.config.getParser(t)}getRecipe(t){return this.recipes.get(t)}getComponent(t){return this.components.get(Po(t))}hasRecipe(t){return this.recipes.has(t)}getRecipeNames(){return new Set(this.recipes.keys())}getComponentNames(){return Array.from(this.components.keys())}setEntityName(t,n){this.entityNames.set(t,n)}getEntityByName(t){return this.entityNames.get(t)??null}getComponentName(t){for(const[n,i]of this.components.entries())if(i===t)return n}step(t=Bo.DEFAULT_DELTA){this.checkDisposed(),this.scheduler.step(this,t)}createEntity(){return this.checkDisposed(),lv(this.world)}destroyEntity(t){this.checkDisposed(),Zp(this.world,t)}exists(t){return uv(this.world,t)}addComponent(t,n,i){Sv(this.world,n,t);const r=this.getComponentName(n);if(r){const s=this.config.getDefaults(r);bd(n,t,s)}i&&bd(n,t,i)}removeComponent(t,n){Mv(this.world,n,t)}hasComponent(t,n){return gf(this.world,n,t)}createFromRecipe(t,n={}){return DA(this,t,n)}dispose(){if(this.isDisposed)throw new Error("[VibeGame] State already disposed");for(const t of this.systems)t.dispose?.(this);this.systems.clear(),this.isDisposed=!0}checkDisposed(){if(this.isDisposed)throw new Error("[VibeGame] Cannot use disposed State")}};const np={red:16711680,green:65280,blue:255,yellow:16776960,purple:16711935,cyan:65535,white:16777215,black:0,gray:8421504,orange:16753920,pink:16761035,lime:65280,gold:16766720},zA=/^-?\d+(\.\d+)?(\s+-?\d+(\.\d+)?)+$/,cg={parse(e){return this.isVector(e)?this.parseVector(e):this.isHexColor(e)?this.parseHexColor(e):this.isNamedColor(e)?this.parseNamedColor(e):this.isBoolean(e)?this.parseBoolean(e):this.isNumber(e)?this.parseNumber(e):e},isVector(e){return zA.test(e)},parseVector(e){const t=e.split(/\s+/).map(Number);return t.length===2?{x:t[0],y:t[1]}:t.length===3?{x:t[0],y:t[1],z:t[2]}:t.length===4?{x:t[0],y:t[1],z:t[2],w:t[3]}:t},isHexColor(e){return e.startsWith("0x")?/^0x[0-9a-fA-F]+$/.test(e):e.startsWith("#")?/^#[0-9a-fA-F]+$/.test(e):!1},parseHexColor(e){return e.startsWith("0x")?parseInt(e,16):parseInt(e.slice(1),16)},isNamedColor(e){return Object.prototype.hasOwnProperty.call(np,e.toLowerCase())},parseNamedColor(e){return np[e.toLowerCase()]},isBoolean(e){return e==="true"||e==="false"},parseBoolean(e){return e==="true"},isNumber(e){return!isNaN(parseFloat(e))},parseNumber(e){return parseFloat(e)}},BA={parse(e){const t=new DOMParser().parseFromString(e,"text/xml");if(t.documentElement.tagName==="parsererror")throw new Error("Invalid XML syntax");return{root:lg(t.documentElement)}}};function lg(e){const t={};for(let i=0;i<e.attributes.length;i++){const r=e.attributes[i];t[r.name]=cg.parse(r.value)}const n=[];for(let i=0;i<e.children.length;i++)n.push(lg(e.children[i]));return{tagName:e.tagName.toLowerCase(),attributes:t,children:n}}const Pe=At({shape:w.ui8,sizeX:w.f32,sizeY:w.f32,sizeZ:w.f32,color:w.ui32,visible:w.ui8,unlit:w.ui8}),Fs=At({clearColor:w.ui32,hasCanvas:w.ui8}),Fi=At({projection:w.ui8,fov:w.f32,orthoSize:w.f32}),Lo=At({skyColor:w.ui32,groundColor:w.ui32,intensity:w.f32}),ti=At({color:w.ui32,intensity:w.f32,castShadow:w.ui8,shadowMapSize:w.ui32,directionX:w.f32,directionY:w.f32,directionZ:w.f32,distance:w.f32}),ct=At({posX:w.f32,posY:w.f32,posZ:w.f32,rotX:w.f32,rotY:w.f32,rotZ:w.f32,rotW:w.f32,eulerX:w.f32,eulerY:w.f32,eulerZ:w.f32,scaleX:w.f32,scaleY:w.f32,scaleZ:w.f32}),ht=At({posX:w.f32,posY:w.f32,posZ:w.f32,rotX:w.f32,rotY:w.f32,rotZ:w.f32,rotW:w.f32,eulerX:w.f32,eulerY:w.f32,eulerZ:w.f32,scaleX:w.f32,scaleY:w.f32,scaleZ:w.f32});function Vf(e,t){const n=Lm(e.rotX[t],e.rotY[t],e.rotZ[t],e.rotW[t]);e.eulerX[t]=n.x,e.eulerY[t]=n.y,e.eulerZ[t]=n.z}function kA(e,t){const n=Vu(e.eulerX[t],e.eulerY[t],e.eulerZ[t]);e.rotX[t]=n.x,e.rotY[t]=n.y,e.rotZ[t]=n.z,e.rotW[t]=n.w}function VA(e,t,n){t.posX[n]=e.posX[n],t.posY[n]=e.posY[n],t.posZ[n]=e.posZ[n],t.rotX[n]=e.rotX[n],t.rotY[n]=e.rotY[n],t.rotZ[n]=e.rotZ[n],t.rotW[n]=e.rotW[n],t.eulerX[n]=e.eulerX[n],t.eulerY[n]=e.eulerY[n],t.eulerZ[n]=e.eulerZ[n],t.scaleX[n]=e.scaleX[n],t.scaleY[n]=e.scaleY[n],t.scaleZ[n]=e.scaleZ[n]}function ip(e,t,n,i,r,s){i.set(e.posX[t],e.posY[t],e.posZ[t]),r.set(e.rotX[t],e.rotY[t],e.rotZ[t],e.rotW[t]),s.set(e.scaleX[t],e.scaleY[t],e.scaleZ[t]),n.compose(i,r,s)}function $A(e,t,n,i,r,s){e.decompose(i,r,s),t.posX[n]=i.x,t.posY[n]=i.y,t.posZ[n]=i.z,t.rotX[n]=r.x,t.rotY[n]=r.y,t.rotZ[n]=r.z,t.rotW[n]=r.w,Vf(t,n),t.scaleX[n]=s.x,t.scaleY[n]=s.y,t.scaleZ[n]=s.z}const rp=new ne,Cl=new ne,Rl=new O,Pl=new xi,Il=new O,HA=St([ct]),GA={group:"simulation",last:!0,update:e=>{const t=HA(e.world);for(const n of t)kA(ct,n);for(const n of t)if(e.hasComponent(n,ht)||(e.addComponent(n,ht),ht.rotX[n]=0,ht.rotY[n]=0,ht.rotZ[n]=0,ht.rotW[n]=1,ht.scaleX[n]=1,ht.scaleY[n]=1,ht.scaleZ[n]=1),!e.hasComponent(n,Ge))VA(ct,ht,n);else{const i=Ge.entity[n];if(!e.hasComponent(i,ht))continue;ip(ht,i,Cl,Rl,Pl,Il),ip(ct,n,rp,Rl,Pl,Il),Cl.multiply(rp),$A(Cl,ht,n,Rl,Pl,Il)}for(const n of t)e.hasComponent(n,Ge)&&e.hasComponent(n,ht)&&Vf(ht,n)}},WA=1e3,sp=5e4,XA=1e4,YA=16777215,Wu={BOX:0,SPHERE:1},ZA={ORTHOGRAPHIC:1},Gc=new Map,$f=new Map;function ug(e){const t=mc.get(e)?.canvas;let n=16,i=9;return t&&t.clientWidth&&t.clientHeight?(n=t.clientWidth,i=t.clientHeight):typeof window<"u"&&(n=window.innerWidth,i=window.innerHeight),{width:n,height:i,aspect:n/i}}function qA(e,t,n,i,r){const{aspect:s}=ug(t);let o;if(n===ZA.ORTHOGRAPHIC){const a=r/2,c=a*s;o=new oa(-c,c,a,-a,.1,1e3)}else o=new pn(i,s,.1,1e3);return Gc.set(e,o),o}function jA(e,t,n){const{aspect:i}=ug(n);if(e instanceof oa){const r=Fi.orthoSize[t]/2,s=r*i;(e.top!==r||e.right!==s)&&(e.left=-s,e.right=s,e.top=r,e.bottom=-r,e.updateProjectionMatrix())}else if(e instanceof pn){const r=Fi.fov[t];e.fov!==r&&(e.fov=r,e.updateProjectionMatrix())}}function op(e,t){const n=e.count;for(let i=0;i<n;i++)if(e.getMatrixAt(i,t),t.elements[0]===0&&t.elements[5]===0&&t.elements[10]===0)return i;return null}function fg(e,t,n=WA){const i=new rb(e,t,n);i.instanceMatrix.setUsage(E0),i.castShadow=!0,i.receiveShadow=!0,i.frustumCulled=!1;const r=new ne;r.makeScale(0,0,0);const s=new Xt(YA);for(let o=0;o<n;o++)i.setMatrixAt(o,r),i.setColorAt(o,s);return i.instanceMatrix.needsUpdate=!0,i.instanceColor&&(i.instanceColor.needsUpdate=!0),i}function KA(e,t,n,i){const r=e.count,s=r*2,o=fg(t,n,s),a=new ne,c=new Xt;for(let l=0;l<r;l++)e.getMatrixAt(l,a),o.setMatrixAt(l,a),e.instanceColor&&(e.getColorAt(l,c),o.setColorAt(l,c));return o.instanceMatrix.needsUpdate=!0,o.instanceColor&&(o.instanceColor.needsUpdate=!0),i.remove(e),e.dispose(),i.add(o),o}const mc=new WeakMap;function JA(){const e=new Map;return e.set(Wu.BOX,new so),e.set(Wu.SPHERE,new Lf(1)),e}function QA(){const e=new tb,t=new Im(11657727,12155424,1.5);e.add(t);const n=new Dm(16777215,2.5);return n.castShadow=!0,n.shadow.mapSize.width=4096,n.shadow.mapSize.height=4096,e.add(n),e.add(n.target),{scene:e,meshPools:new Map,unlitMeshPools:new Map,geometries:JA(),material:new ob({metalness:0,roughness:1}),unlitMaterial:new Rf,entityInstances:new Map,lights:{ambient:t,directional:n},totalInstanceCount:0,hasShownPerformanceWarning:!1}}function Hr(e){let t=mc.get(e);return t||(t=QA(),mc.set(e,t)),t}function Hf(e){return mc.get(e)?.scene||null}function tC(e,t){$f.set(e,t)}function eC(e){return $f.get(e)}function nC(e){$f.delete(e)}function iC(e,t){const n=new QE({canvas:e,antialias:!0}),i=e.clientWidth||window.innerWidth,r=e.clientHeight||window.innerHeight;return n.setSize(i,r,!1),n.setPixelRatio(window.devicePixelRatio),n.shadowMap.enabled=!0,n.shadowMap.type=tm,t!==0&&n.setClearColor(t),n}function rC(e,t){const n=Hr(e).canvas,i=n?.clientWidth||window.innerWidth,r=n?.clientHeight||window.innerHeight,s=i/r;t.setSize(i,r,!1);for(const[,o]of Gc)if(o instanceof pn)o.aspect=s,o.updateProjectionMatrix();else if(o instanceof oa){const a=(o.top-o.bottom)/2*s;o.left=-a,o.right=a,o.updateProjectionMatrix()}}const rr={LIGHT_DIRECTION:new O(5,10,2).normalize(),LIGHT_DISTANCE:25,CAMERA_RADIUS:50,NEAR_PLANE:1,FAR_PLANE:200},Wa=new ne,ap=new O,cp=new xi,tr=new O,sC=St([Fi,ht]);function oC(e,t,n=!1){const i=n?e.unlitMeshPools:e.meshPools,r=n?e.unlitMaterial:e.material;let s=i.get(t);if(!s){const o=e.geometries.get(t);if(!o)return null;s=fg(o,r),i.set(t,s),e.scene.add(s)}return s}function aC(e,t,n,i,r=!1){let s=n.entityInstances.get(t);if(!s){let o=op(e,Wa);if(o===null){if(n.totalInstanceCount>=sp)throw new Error(`Maximum total instances (${sp}) exceeded. Cannot render entity ${t}. Consider reducing the number of rendered objects.`);const a=Pe.shape[t],c=n.geometries.get(a);if(!c)return e;const l=r?n.unlitMeshPools:n.meshPools,u=r?n.unlitMaterial:n.material;if(e=KA(e,c,u,n.scene),l.set(a,e),o=op(e,Wa),o===null)return e}s={poolId:Pe.shape[t],instanceId:o,unlit:r},n.entityInstances.set(t,s),n.totalInstanceCount++,!n.hasShownPerformanceWarning&&n.totalInstanceCount>=XA&&(console.warn(`Performance warning: ${n.totalInstanceCount} rendered instances. Consider optimizing your scene or reducing object count for better performance.`),n.hasShownPerformanceWarning=!0)}if(i.hasComponent(t,ht)){if(ap.set(ht.posX[t],ht.posY[t],ht.posZ[t]),cp.set(ht.rotX[t],ht.rotY[t],ht.rotZ[t],ht.rotW[t]),tr.set(ht.scaleX[t],ht.scaleY[t],ht.scaleZ[t]),s.poolId===Wu.SPHERE){const a=Pe.sizeX[t]/2;tr.x*=a,tr.y*=a,tr.z*=a}else tr.x*=Pe.sizeX[t],tr.y*=Pe.sizeY[t],tr.z*=Pe.sizeZ[t];Wa.compose(ap,cp,tr),e.setMatrixAt(s.instanceId,Wa),e.instanceMatrix.needsUpdate=!0;const o=new Xt(Pe.color[t]);e.setColorAt(s.instanceId,o),e.instanceColor&&(e.instanceColor.needsUpdate=!0)}return e}function lp(e,t,n){const i=n.entityInstances.get(t);if(i){const r=new ne;r.makeScale(0,0,0),e.setMatrixAt(i.instanceId,r),e.instanceMatrix.needsUpdate=!0}}function cC(e,t){const n=sC(t.world);let i=null;for(const l of n){i=l;break}if(i===null)return;const r=e.lights.directional;if(!r)return;const s=new O(ht.posX[i],ht.posY[i],ht.posZ[i]),o=r.shadow.camera,a=s.clone().add(rr.LIGHT_DIRECTION.clone().multiplyScalar(rr.LIGHT_DISTANCE));r.position.copy(a),r.target.position.copy(s),r.target.updateMatrixWorld();const c=rr.CAMERA_RADIUS;o.left=-c,o.right=c,o.top=c,o.bottom=-c,o.near=rr.NEAR_PLANE,o.far=rr.FAR_PLANE,o.position.copy(a),o.lookAt(s),o.updateProjectionMatrix(),o.updateMatrixWorld()}const lC=St([Pe]),uC=St([Lo]),fC=St([ti]),dg=St([Fi,ht]),dC=St([Fi]),up=St([Fs]),hC={group:"draw",update(e){const t=Hr(e);for(const[i,r]of t.entityInstances)if(!e.exists(i)){const s=(r.unlit?t.unlitMeshPools:t.meshPools).get(r.poolId);s&&lp(s,i,t),t.entityInstances.delete(i),t.totalInstanceCount--}const n=lC(e.world);for(const i of n){const r=Pe.unlit[i]===1;let s=oC(t,Pe.shape[i],r);if(s){if(Pe.visible[i]!==1){lp(s,i,t);continue}s=aC(s,i,t,e,r)}}cC(t,e)}},pC={group:"draw",update(e){const t=Hr(e),n=Hf(e);if(!n)return;const i=uC(e.world);for(const s of i){let o=t.lights.ambient;o||(o=new Im,n.add(o),t.lights.ambient=o),o.color.setHex(Lo.skyColor[s]),o.groundColor.setHex(Lo.groundColor[s]),o.intensity=Lo.intensity[s]}const r=fC(e.world);for(const s of r){let o=t.lights.directional;o||(o=new Dm,o.castShadow=!0,n.add(o),n.add(o.target),t.lights.directional=o),o.color.setHex(ti.color[s]),o.intensity=ti.intensity[s],ti.castShadow[s]===1?(o.castShadow=!0,o.shadow.mapSize.width=ti.shadowMapSize[s],o.shadow.mapSize.height=ti.shadowMapSize[s]):o.castShadow=!1;const a=dg(e.world);let c=null;for(const l of a){c=l;break}if(c!==null){const l=new O(ht.posX[c],ht.posY[c],ht.posZ[c]),u=new O(ti.directionX[s],ti.directionY[s],ti.directionZ[s]).normalize(),f=l.clone().add(u.multiplyScalar(ti.distance[s]));o.position.copy(f),o.target.position.copy(l),o.target.updateMatrixWorld();const d=o.shadow.camera,p=rr.CAMERA_RADIUS;d.left=-p,d.right=p,d.top=p,d.bottom=-p,d.near=rr.NEAR_PLANE,d.far=rr.FAR_PLANE,d.position.copy(f),d.lookAt(l),d.updateProjectionMatrix(),d.updateMatrixWorld()}}}},mC={group:"draw",update(e){const t=dg(e.world);for(const n of t){let i=Gc.get(n);i||(i=qA(n,e,Fi.projection[n],Fi.fov[n],Fi.orthoSize[n])),i.position.set(ht.posX[n],ht.posY[n],ht.posZ[n]),i.quaternion.set(ht.rotX[n],ht.rotY[n],ht.rotZ[n],ht.rotW[n]),jA(i,n,e)}}},gC={group:"draw",last:!0,setup(e){const t=up(e.world);if(t.length===0)return;const n=t[0],i=eC(n);if(!i)return;const r=Fs.clearColor[n],s=iC(i,r),o=Hr(e);o.renderer=s,o.canvas=i,window.addEventListener("resize",()=>rC(e,s))},update(e){const t=Hr(e);if(!t.renderer)return;const n=Hf(e);if(!n)return;const i=dC(e.world);if(i.length===0)return;const r=i[0],s=Gc.get(r);s&&t.renderer.render(n,s)},dispose(e){const t=Hr(e);t.renderer&&(t.renderer.dispose(),t.renderer=void 0,t.canvas=void 0);const n=up(e.world);for(const i of n)nC(i)}},be=At({moveX:w.f32,moveY:w.f32,moveZ:w.f32,lookX:w.f32,lookY:w.f32,scrollDelta:w.f32,jump:w.ui8,primaryAction:w.ui8,secondaryAction:w.ui8,leftMouse:w.ui8,rightMouse:w.ui8,middleMouse:w.ui8,jumpBufferTime:w.f32,primaryBufferTime:w.f32,secondaryBufferTime:w.f32}),Qn={mappings:{moveForward:["KeyW","ArrowUp"],moveBackward:["KeyS","ArrowDown"],moveLeft:["KeyA","ArrowLeft"],moveRight:["KeyD","ArrowRight"],moveUp:["KeyE"],moveDown:["KeyQ"]},bufferWindow:100,mouseSensitivity:{look:.5,scroll:.01}},He={keys:new Set,mouseButtons:new Set,mouseDeltaX:0,mouseDeltaY:0,scrollDelta:0},Te={jump:{lastPressTime:0,lastReleaseTime:0,lastConsumeTime:0,isPressed:!1},primary:{lastPressTime:0,lastReleaseTime:0,lastConsumeTime:0,isPressed:!1},secondary:{lastPressTime:0,lastReleaseTime:0,lastConsumeTime:0,isPressed:!1}};let Xu=null,_i=null;function hg(e){return e instanceof HTMLCanvasElement?Xu===null||e===Xu:!1}function pg(e){return e instanceof HTMLCanvasElement&&e===_i}function mg(e){_i&&(He.keys.add(e.code),e.code==="Space"&&(e.preventDefault(),Te.jump.isPressed||(Te.jump.lastPressTime=performance.now(),Te.jump.isPressed=!0)))}function gg(e){_i&&(He.keys.delete(e.code),e.code==="Space"&&(Te.jump.lastReleaseTime=performance.now(),Te.jump.isPressed=!1))}function _C(e){He.mouseButtons.add(e.button),e.button===0&&!Te.primary.isPressed?(Te.primary.lastPressTime=performance.now(),Te.primary.isPressed=!0):e.button===2&&(e.preventDefault(),Te.secondary.isPressed||(Te.secondary.lastPressTime=performance.now(),Te.secondary.isPressed=!0))}function vC(e){He.mouseButtons.delete(e.button),e.button===0?(Te.primary.lastReleaseTime=performance.now(),Te.primary.isPressed=!1):e.button===2&&(Te.secondary.lastReleaseTime=performance.now(),Te.secondary.isPressed=!1)}function xC(e){He.mouseDeltaX+=e.movementX,He.mouseDeltaY+=e.movementY}function yC(e){He.scrollDelta+=e.deltaY*Qn.mouseSensitivity.scroll,e.preventDefault()}function SC(e){e.preventDefault()}function _g(e){hg(e.target)&&(_i=e.target)}function vg(e){e.target===_i&&(_i=null,Yu())}function xg(e){hg(e.target)&&(e.target.tabIndex=e.target.tabIndex===-1?0:e.target.tabIndex,e.target.focus(),_C(e))}function yg(e){_i&&vC(e)}function Sg(e){pg(e.target)&&xC(e)}function Mg(e){pg(e.target)&&yC(e)}function Eg(e){_i&&SC(e)}function MC(){typeof window>"u"||(document.addEventListener("mousedown",xg,!0),document.addEventListener("mouseup",yg,!0),document.addEventListener("mousemove",Sg,!0),document.addEventListener("wheel",Mg,{passive:!1,capture:!0}),document.addEventListener("contextmenu",Eg,!0),document.addEventListener("focusin",_g,!0),document.addEventListener("focusout",vg,!0),window.addEventListener("keydown",mg),window.addEventListener("keyup",gg))}function EC(){typeof window>"u"||(document.removeEventListener("mousedown",xg,!0),document.removeEventListener("mouseup",yg,!0),document.removeEventListener("mousemove",Sg,!0),document.removeEventListener("wheel",Mg,!0),document.removeEventListener("contextmenu",Eg,!0),document.removeEventListener("focusin",_g,!0),document.removeEventListener("focusout",vg,!0),window.removeEventListener("keydown",mg),window.removeEventListener("keyup",gg),Xu=null,_i=null)}function Dl(e,t){let n=0;for(const i of e)He.keys.has(i)&&(n+=1);for(const i of t)He.keys.has(i)&&(n-=1);return n}function Ll(e,t){const n=performance.now();return e.lastPressTime<=e.lastConsumeTime?!1:n-e.lastPressTime<=t}function bC(e){const t=Qn.mouseSensitivity;be.moveX[e]=Dl(Qn.mappings.moveRight,Qn.mappings.moveLeft),be.moveY[e]=Dl(Qn.mappings.moveForward,Qn.mappings.moveBackward),be.moveZ[e]=Dl(Qn.mappings.moveUp,Qn.mappings.moveDown),be.lookX[e]=He.mouseDeltaX*t.look,be.lookY[e]=He.mouseDeltaY*t.look,be.scrollDelta[e]=He.scrollDelta,be.jump[e]=Ll(Te.jump,Qn.bufferWindow)?1:0,be.primaryAction[e]=Ll(Te.primary,Qn.bufferWindow)?1:0,be.secondaryAction[e]=Ll(Te.secondary,Qn.bufferWindow)?1:0,be.leftMouse[e]=He.mouseButtons.has(0)?1:0,be.rightMouse[e]=He.mouseButtons.has(2)?1:0,be.middleMouse[e]=He.mouseButtons.has(1)?1:0,be.jumpBufferTime[e]=Te.jump.lastPressTime,be.primaryBufferTime[e]=Te.primary.lastPressTime,be.secondaryBufferTime[e]=Te.secondary.lastPressTime}function bg(){He.mouseDeltaX=0,He.mouseDeltaY=0,He.scrollDelta=0}function Yu(){He.keys.clear(),He.mouseButtons.clear(),bg();const e=performance.now();Te.jump={lastPressTime:0,lastReleaseTime:e,lastConsumeTime:e,isPressed:!1},Te.primary={lastPressTime:0,lastReleaseTime:e,lastConsumeTime:e,isPressed:!1},Te.secondary={lastPressTime:0,lastReleaseTime:e,lastConsumeTime:e,isPressed:!1}}function TC(){return _i}const wC=St([be]),AC={group:"simulation",setup:()=>{MC(),Yu()},update:e=>{const t=TC(),n=Hr(e);if(!t||!n.canvas||n.canvas!==t)return;const i=wC(e.world);for(const r of i)bC(r);bg()},dispose:()=>{EC(),Yu()}},CC={systems:[hC,pC,mC,gC],components:{Renderer:Pe,RenderContext:Fs,MainCamera:Fi,AmbientLight:Lo,DirectionalLight:ti},config:{defaults:{ambientLight:{skyColor:8900331,groundColor:4868682,intensity:.6},directionalLight:{color:16777215,intensity:1,castShadow:1,shadowMapSize:4096,directionX:-1,directionY:2,directionZ:-1,distance:30},renderer:{visible:1,sizeX:1,sizeY:1,sizeZ:1,color:16777215,unlit:0},mainCamera:{projection:0,fov:75,orthoSize:10}},enums:{renderer:{shape:{box:0,sphere:1}},mainCamera:{projection:{perspective:0,orthographic:1}}}}},RC={systems:[GA],components:{Transform:ct,WorldTransform:ht},config:{defaults:{transform:{rotW:1,scaleX:1,scaleY:1,scaleZ:1},"world-transform":{rotW:1,scaleX:1,scaleY:1,scaleZ:1}},validations:[{condition:(e,t)=>"world-transform"in t,warning:`"world-transform" is read-only.
  Use "transform" for local transforms, or "body" for physics objects`}]}},We=At({duration:w.f32,elapsed:w.f32,easingIndex:w.ui8}),fe=At({source:w.ui32,target:w.ui32,componentId:w.ui32,fieldIndex:w.ui32,from:w.f32,to:w.f32,value:w.f32}),Me=At({tweenEntity:w.ui32,targetEntity:w.ui32,axis:w.ui8,from:w.f32,to:w.f32,lastPosition:w.f32,targetPosition:w.f32}),Ee=At({tweenEntity:w.ui32,targetEntity:w.ui32,axis:w.ui8,from:w.f32,to:w.f32,lastRotation:w.f32,targetRotation:w.f32});var $i=(e=>(e[e.Idle=0]="Idle",e[e.Playing=1]="Playing",e))($i||{});const te=At({state:w.ui8,currentIndex:w.ui32,itemCount:w.ui32,pauseRemaining:w.f32});function Ii(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Tg(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var Ln={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},qs={duration:.5,overwrite:!1,delay:0},Gf,nn,we,$n=1e8,he=1/$n,Zu=Math.PI*2,PC=Zu/4,IC=0,wg=Math.sqrt,DC=Math.cos,LC=Math.sin,qe=function(e){return typeof e=="string"},Ue=function(e){return typeof e=="function"},Hi=function(e){return typeof e=="number"},Wf=function(e){return typeof e>"u"},vi=function(e){return typeof e=="object"},_n=function(e){return e!==!1},Xf=function(){return typeof window<"u"},Xa=function(e){return Ue(e)||qe(e)},Ag=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},cn=Array.isArray,qu=/(?:-?\.?\d|\.)+/gi,Cg=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Rs=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Ul=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Rg=/[+-]=-?[.\d]+/,Pg=/[^,'"\[\]\s]+/gi,UC=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Re,ci,ju,Yf,Un={},gc={},Ig,Dg=function(e){return(gc=js(e,Un))&&Sn},Zf=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Xo=function(e,t){return!t&&console.warn(e)},Lg=function(e,t){return e&&(Un[e]=t)&&gc&&(gc[e]=t)||Un},Yo=function(){return 0},NC={suppressEvents:!0,isStart:!0,kill:!1},sc={suppressEvents:!0,kill:!1},OC={suppressEvents:!0},qf={},hr=[],Ku={},Ug,An={},Nl={},fp=30,oc=[],jf="",Kf=function(e){var t=e[0],n,i;if(vi(t)||Ue(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=oc.length;i--&&!oc[i].targetTest(t););n=oc[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new r_(e[i],n)))||e.splice(i,1);return e},Gr=function(e){return e._gsap||Kf(Hn(e))[0]._gsap},Ng=function(e,t,n){return(n=e[t])&&Ue(n)?e[t]():Wf(n)&&e.getAttribute&&e.getAttribute(t)||n},vn=function(e,t){return(e=e.split(",")).forEach(t)||e},Fe=function(e){return Math.round(e*1e5)/1e5||0},Ve=function(e){return Math.round(e*1e7)/1e7||0},zs=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},FC=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},_c=function(){var e=hr.length,t=hr.slice(0),n,i;for(Ku={},hr.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Jf=function(e){return!!(e._initted||e._startAt||e.add)},Og=function(e,t,n,i){hr.length&&!nn&&_c(),e.render(t,n,!!(nn&&t<0&&Jf(e))),hr.length&&!nn&&_c()},Fg=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Pg).length<2?t:qe(e)?e.trim():e},zg=function(e){return e},Nn=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},zC=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},js=function(e,t){for(var n in t)e[n]=t[n];return e},dp=function e(t,n){for(var i in n)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(t[i]=vi(n[i])?e(t[i]||(t[i]={}),n[i]):n[i]);return t},vc=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},Uo=function(e){var t=e.parent||Re,n=e.keyframes?zC(cn(e.keyframes)):Nn;if(_n(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},BC=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},Bg=function(e,t,n,i,r){var s=e[i],o;if(r)for(o=t[r];s&&s[r]>o;)s=s._prev;return s?(t._next=s._next,s._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=s,t.parent=t._dp=e,t},Wc=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var r=t._prev,s=t._next;r?r._next=s:e[n]===t&&(e[n]=s),s?s._prev=r:e[i]===t&&(e[i]=r),t._next=t._prev=t.parent=null},_r=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Wr=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},kC=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Ju=function(e,t,n,i){return e._startAt&&(nn?e._startAt.revert(sc):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},VC=function e(t){return!t||t._ts&&e(t.parent)},hp=function(e){return e._repeat?Ks(e._tTime,e=e.duration()+e._rDelay)*e:0},Ks=function(e,t){var n=Math.floor(e=Ve(e/t));return e&&n===e?n-1:n},xc=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Xc=function(e){return e._end=Ve(e._start+(e._tDur/Math.abs(e._ts||e._rts||he)||0))},Yc=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=Ve(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Xc(e),n._dirty||Wr(n,e)),e},kg=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=xc(e.rawTime(),t),(!t._dur||ua(0,t.totalDuration(),n)-t._tTime>he)&&t.render(n,!0)),Wr(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-he}},ui=function(e,t,n,i){return t.parent&&_r(t),t._start=Ve((Hi(n)?n:n||e!==Re?Bn(e,n,t):e._time)+t._delay),t._end=Ve(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Bg(e,t,"_first","_last",e._sort?"_start":0),Qu(t)||(e._recent=t),i||kg(e,t),e._ts<0&&Yc(e,e._tTime),e},Vg=function(e,t){return(Un.ScrollTrigger||Zf("scrollTrigger",t))&&Un.ScrollTrigger.create(t,e)},$g=function(e,t,n,i,r){if(td(e,t,r),!e._initted)return 1;if(!n&&e._pt&&!nn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Ug!==Rn.frame)return hr.push(e),e._lazy=[r,i],1},$C=function e(t){var n=t.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||e(n))},Qu=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},HC=function(e,t,n,i){var r=e.ratio,s=t<0||!t&&(!e._start&&$C(e)&&!(!e._initted&&Qu(e))||(e._ts<0||e._dp._ts<0)&&!Qu(e))?0:1,o=e._rDelay,a=0,c,l,u;if(o&&e._repeat&&(a=ua(0,e._tDur,t),l=Ks(a,o),e._yoyo&&l&1&&(s=1-s),l!==Ks(e._tTime,o)&&(r=1-s,e.vars.repeatRefresh&&e._initted&&e.invalidate())),s!==r||nn||i||e._zTime===he||!t&&e._zTime){if(!e._initted&&$g(e,t,i,n,a))return;for(u=e._zTime,e._zTime=t||(n?he:0),n||(n=t&&!u),e.ratio=s,e._from&&(s=1-s),e._time=0,e._tTime=a,c=e._pt;c;)c.r(s,c.d),c=c._next;t<0&&Ju(e,t,n,!0),e._onUpdate&&!n&&Pn(e,"onUpdate"),a&&e._repeat&&!n&&e.parent&&Pn(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===s&&(s&&_r(e,1),!n&&!nn&&(Pn(e,s?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},GC=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},Js=function(e,t,n,i){var r=e._repeat,s=Ve(t)||0,o=e._tTime/e._tDur;return o&&!i&&(e._time*=s/e._dur),e._dur=s,e._tDur=r?r<0?1e10:Ve(s*(r+1)+e._rDelay*r):s,o>0&&!i&&Yc(e,e._tTime=e._tDur*o),e.parent&&Xc(e),n||Wr(e.parent,e),e},pp=function(e){return e instanceof fn?Wr(e):Js(e,e._dur)},WC={_start:0,endTime:Yo,totalDuration:Yo},Bn=function e(t,n,i){var r=t.labels,s=t._recent||WC,o=t.duration()>=$n?s.endTime(!1):t._dur,a,c,l;return qe(n)&&(isNaN(n)||n in r)?(c=n.charAt(0),l=n.substr(-1)==="%",a=n.indexOf("="),c==="<"||c===">"?(a>=0&&(n=n.replace(/=/,"")),(c==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(n.substr(1))||0)*(l?(a<0?s:i).totalDuration()/100:1)):a<0?(n in r||(r[n]=o),r[n]):(c=parseFloat(n.charAt(a-1)+n.substr(a+1)),l&&i&&(c=c/100*(cn(i)?i[0]:i).totalDuration()),a>1?e(t,n.substr(0,a-1),i)+c:o+c)):n==null?o:+n},No=function(e,t,n){var i=Hi(t[1]),r=(i?2:1)+(e<2?0:1),s=t[r],o,a;if(i&&(s.duration=t[1]),s.parent=n,e){for(o=s,a=n;a&&!("immediateRender"in o);)o=a.vars.defaults||{},a=_n(a.vars.inherit)&&a.parent;s.immediateRender=_n(o.immediateRender),e<2?s.runBackwards=1:s.startAt=t[r-1]}return new ke(t[0],s,t[r+1])},yr=function(e,t){return e||e===0?t(e):t},ua=function(e,t,n){return n<e?e:n>t?t:n},an=function(e,t){return!qe(e)||!(t=UC.exec(e))?"":t[1]},XC=function(e,t,n){return yr(n,function(i){return ua(e,t,i)})},tf=[].slice,Hg=function(e,t){return e&&vi(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&vi(e[0]))&&!e.nodeType&&e!==ci},YC=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var r;return qe(i)&&!t||Hg(i,1)?(r=n).push.apply(r,Hn(i)):n.push(i)})||n},Hn=function(e,t,n){return we&&!t&&we.selector?we.selector(e):qe(e)&&!n&&(ju||!Qs())?tf.call((t||Yf).querySelectorAll(e),0):cn(e)?YC(e,n):Hg(e)?tf.call(e,0):e?[e]:[]},ef=function(e){return e=Hn(e)[0]||Xo("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return Hn(t,n.querySelectorAll?n:n===e?Xo("Invalid scope")||Yf.createElement("div"):e)}},Gg=function(e){return e.sort(function(){return .5-Math.random()})},Wg=function(e){if(Ue(e))return e;var t=vi(e)?e:{each:e},n=Xr(t.ease),i=t.from||0,r=parseFloat(t.base)||0,s={},o=i>0&&i<1,a=isNaN(i)||o,c=t.axis,l=i,u=i;return qe(i)?l=u={center:.5,edges:.5,end:1}[i]||0:!o&&a&&(l=i[0],u=i[1]),function(f,d,p){var m=(p||t).length,_=s[m],g,h,y,x,v,C,T,A,P;if(!_){if(P=t.grid==="auto"?0:(t.grid||[1,$n])[1],!P){for(T=-$n;T<(T=p[P++].getBoundingClientRect().left)&&P<m;);P<m&&P--}for(_=s[m]=[],g=a?Math.min(P,m)*l-.5:i%P,h=P===$n?0:a?m*u/P-.5:i/P|0,T=0,A=$n,C=0;C<m;C++)y=C%P-g,x=h-(C/P|0),_[C]=v=c?Math.abs(c==="y"?x:y):wg(y*y+x*x),v>T&&(T=v),v<A&&(A=v);i==="random"&&Gg(_),_.max=T-A,_.min=A,_.v=m=(parseFloat(t.amount)||parseFloat(t.each)*(P>m?m-1:c?c==="y"?m/P:P:Math.max(P,m/P))||0)*(i==="edges"?-1:1),_.b=m<0?r-m:r,_.u=an(t.amount||t.each)||0,n=n&&m<0?e_(n):n}return m=(_[f]-_.min)/_.max||0,Ve(_.b+(n?n(m):m)*_.v)+_.u}},nf=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=Ve(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(Hi(n)?0:an(n))}},Xg=function(e,t){var n=cn(e),i,r;return!n&&vi(e)&&(i=n=e.radius||$n,e.values?(e=Hn(e.values),(r=!Hi(e[0]))&&(i*=i)):e=nf(e.increment)),yr(t,n?Ue(e)?function(s){return r=e(s),Math.abs(r-s)<=i?r:s}:function(s){for(var o=parseFloat(r?s.x:s),a=parseFloat(r?s.y:0),c=$n,l=0,u=e.length,f,d;u--;)r?(f=e[u].x-o,d=e[u].y-a,f=f*f+d*d):f=Math.abs(e[u]-o),f<c&&(c=f,l=u);return l=!i||c<=i?e[l]:s,r||l===s||Hi(s)?l:l+an(s)}:nf(e))},Yg=function(e,t,n,i){return yr(cn(e)?!t:n===!0?!!(n=0):!i,function(){return cn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},ZC=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(r,s){return s(r)},i)}},qC=function(e,t){return function(n){return e(parseFloat(n))+(t||an(n))}},jC=function(e,t,n){return qg(e,t,0,1,n)},Zg=function(e,t,n){return yr(n,function(i){return e[~~t(i)]})},KC=function e(t,n,i){var r=n-t;return cn(t)?Zg(t,e(0,t.length),n):yr(i,function(s){return(r+(s-t)%r)%r+t})},JC=function e(t,n,i){var r=n-t,s=r*2;return cn(t)?Zg(t,e(0,t.length-1),n):yr(i,function(o){return o=(s+(o-t)%s)%s||0,t+(o>r?s-o:o)})},Zo=function(e){for(var t=0,n="",i,r,s,o;~(i=e.indexOf("random(",t));)s=e.indexOf(")",i),o=e.charAt(i+7)==="[",r=e.substr(i+7,s-i-7).match(o?Pg:qu),n+=e.substr(t,i-t)+Yg(o?r:+r[0],o?0:+r[1],+r[2]||1e-5),t=s+1;return n+e.substr(t,e.length-t)},qg=function(e,t,n,i,r){var s=t-e,o=i-n;return yr(r,function(a){return n+((a-e)/s*o||0)})},QC=function e(t,n,i,r){var s=isNaN(t+n)?0:function(p){return(1-p)*t+p*n};if(!s){var o=qe(t),a={},c,l,u,f,d;if(i===!0&&(r=1)&&(i=null),o)t={p:t},n={p:n};else if(cn(t)&&!cn(n)){for(u=[],f=t.length,d=f-2,l=1;l<f;l++)u.push(e(t[l-1],t[l]));f--,s=function(p){p*=f;var m=Math.min(d,~~p);return u[m](p-m)},i=n}else r||(t=js(cn(t)?[]:{},t));if(!u){for(c in n)Qf.call(a,t,c,"get",n[c]);s=function(p){return id(p,a)||(o?t.p:t)}}}return yr(i,s)},mp=function(e,t,n){var i=e.labels,r=$n,s,o,a;for(s in i)o=i[s]-t,o<0==!!n&&o&&r>(o=Math.abs(o))&&(a=s,r=o);return a},Pn=function(e,t,n){var i=e.vars,r=i[t],s=we,o=e._ctx,a,c,l;if(r)return a=i[t+"Params"],c=i.callbackScope||e,n&&hr.length&&_c(),o&&(we=o),l=a?r.apply(c,a):r.call(c),we=s,l},To=function(e){return _r(e),e.scrollTrigger&&e.scrollTrigger.kill(!!nn),e.progress()<1&&Pn(e,"onInterrupt"),e},Ps,jg=[],Kg=function(e){if(e)if(e=!e.name&&e.default||e,Xf()||e.headless){var t=e.name,n=Ue(e),i=t&&!n&&e.init?function(){this._props=[]}:e,r={init:Yo,render:id,add:Qf,kill:mR,modifier:pR,rawVars:0},s={targetTest:0,get:0,getSetter:nd,aliases:{},register:0};if(Qs(),e!==i){if(An[t])return;Nn(i,Nn(vc(e,r),s)),js(i.prototype,js(r,vc(e,s))),An[i.prop=t]=i,e.targetTest&&(oc.push(i),qf[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}Lg(t,i),e.register&&e.register(Sn,i,xn)}else jg.push(e)},de=255,wo={aqua:[0,de,de],lime:[0,de,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,de],navy:[0,0,128],white:[de,de,de],olive:[128,128,0],yellow:[de,de,0],orange:[de,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[de,0,0],pink:[de,192,203],cyan:[0,de,de],transparent:[de,de,de,0]},Ol=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*de+.5|0},Jg=function(e,t,n){var i=e?Hi(e)?[e>>16,e>>8&de,e&de]:0:wo.black,r,s,o,a,c,l,u,f,d,p;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),wo[e])i=wo[e];else if(e.charAt(0)==="#"){if(e.length<6&&(r=e.charAt(1),s=e.charAt(2),o=e.charAt(3),e="#"+r+r+s+s+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&de,i&de,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&de,e&de]}else if(e.substr(0,3)==="hsl"){if(i=p=e.match(qu),!t)a=+i[0]%360/360,c=+i[1]/100,l=+i[2]/100,s=l<=.5?l*(c+1):l+c-l*c,r=l*2-s,i.length>3&&(i[3]*=1),i[0]=Ol(a+1/3,r,s),i[1]=Ol(a,r,s),i[2]=Ol(a-1/3,r,s);else if(~e.indexOf("="))return i=e.match(Cg),n&&i.length<4&&(i[3]=1),i}else i=e.match(qu)||wo.transparent;i=i.map(Number)}return t&&!p&&(r=i[0]/de,s=i[1]/de,o=i[2]/de,u=Math.max(r,s,o),f=Math.min(r,s,o),l=(u+f)/2,u===f?a=c=0:(d=u-f,c=l>.5?d/(2-u-f):d/(u+f),a=u===r?(s-o)/d+(s<o?6:0):u===s?(o-r)/d+2:(r-s)/d+4,a*=60),i[0]=~~(a+.5),i[1]=~~(c*100+.5),i[2]=~~(l*100+.5)),n&&i.length<4&&(i[3]=1),i},Qg=function(e){var t=[],n=[],i=-1;return e.split(pr).forEach(function(r){var s=r.match(Rs)||[];t.push.apply(t,s),n.push(i+=s.length+1)}),t.c=n,t},gp=function(e,t,n){var i="",r=(e+i).match(pr),s=t?"hsla(":"rgba(",o=0,a,c,l,u;if(!r)return e;if(r=r.map(function(f){return(f=Jg(f,t,1))&&s+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(l=Qg(e),a=n.c,a.join(i)!==l.c.join(i)))for(c=e.replace(pr,"1").split(Rs),u=c.length-1;o<u;o++)i+=c[o]+(~a.indexOf(o)?r.shift()||s+"0,0,0,0)":(l.length?l:r.length?r:n).shift());if(!c)for(c=e.split(pr),u=c.length-1;o<u;o++)i+=c[o]+r[o];return i+c[u]},pr=(function(){var e="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in wo)e+="|"+t+"\\b";return new RegExp(e+")","gi")})(),tR=/hsl[a]?\(/,t_=function(e){var t=e.join(" "),n;if(pr.lastIndex=0,pr.test(t))return n=tR.test(t),e[1]=gp(e[1],n),e[0]=gp(e[0],n,Qg(e[1])),!0},qo,Rn=(function(){var e=Date.now,t=500,n=33,i=e(),r=i,s=1e3/240,o=s,a=[],c,l,u,f,d,p,m=function _(g){var h=e()-r,y=g===!0,x,v,C,T;if((h>t||h<0)&&(i+=h-n),r+=h,C=r-i,x=C-o,(x>0||y)&&(T=++f.frame,d=C-f.time*1e3,f.time=C=C/1e3,o+=x+(x>=s?4:s-x),v=1),y||(c=l(_)),v)for(p=0;p<a.length;p++)a[p](C,d,T,g)};return f={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(_){return d/(1e3/(_||60))},wake:function(){Ig&&(!ju&&Xf()&&(ci=ju=window,Yf=ci.document||{},Un.gsap=Sn,(ci.gsapVersions||(ci.gsapVersions=[])).push(Sn.version),Dg(gc||ci.GreenSockGlobals||!ci.gsap&&ci||{}),jg.forEach(Kg)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,c&&f.sleep(),l=u||function(_){return setTimeout(_,o-f.time*1e3+1|0)},qo=1,m(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),qo=0,l=Yo},lagSmoothing:function(_,g){t=_||1/0,n=Math.min(g||33,t)},fps:function(_){s=1e3/(_||240),o=f.time*1e3+s},add:function(_,g,h){var y=g?function(x,v,C,T){_(x,v,C,T),f.remove(y)}:_;return f.remove(_),a[h?"unshift":"push"](y),Qs(),y},remove:function(_,g){~(g=a.indexOf(_))&&a.splice(g,1)&&p>=g&&p--},_listeners:a},f})(),Qs=function(){return!qo&&Rn.wake()},Yt={},eR=/^[\d.\-M][\d.\-,\s]/,nR=/["']/g,iR=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],r=1,s=n.length,o,a,c;r<s;r++)a=n[r],o=r!==s-1?a.lastIndexOf(","):a.length,c=a.substr(0,o),t[i]=isNaN(c)?c.replace(nR,"").trim():+c,i=a.substr(o+1).trim();return t},rR=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},sR=function(e){var t=(e+"").split("("),n=Yt[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[iR(t[1])]:rR(e).split(",").map(Fg)):Yt._CE&&eR.test(e)?Yt._CE("",e):n},e_=function(e){return function(t){return 1-e(1-t)}},n_=function e(t,n){for(var i=t._first,r;i;)i instanceof fn?e(i,n):i.vars.yoyoEase&&(!i._yoyo||!i._repeat)&&i._yoyo!==n&&(i.timeline?e(i.timeline,n):(r=i._ease,i._ease=i._yEase,i._yEase=r,i._yoyo=n)),i=i._next},Xr=function(e,t){return e&&(Ue(e)?e:Yt[e]||sR(e))||t},as=function(e,t,n,i){n===void 0&&(n=function(o){return 1-t(1-o)}),i===void 0&&(i=function(o){return o<.5?t(o*2)/2:1-t((1-o)*2)/2});var r={easeIn:t,easeOut:n,easeInOut:i},s;return vn(e,function(o){Yt[o]=Un[o]=r,Yt[s=o.toLowerCase()]=n;for(var a in r)Yt[s+(a==="easeIn"?".in":a==="easeOut"?".out":".inOut")]=Yt[o+"."+a]=r[a]}),r},i_=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Fl=function e(t,n,i){var r=n>=1?n:1,s=(i||(t?.3:.45))/(n<1?n:1),o=s/Zu*(Math.asin(1/r)||0),a=function(l){return l===1?1:r*Math.pow(2,-10*l)*LC((l-o)*s)+1},c=t==="out"?a:t==="in"?function(l){return 1-a(1-l)}:i_(a);return s=Zu/s,c.config=function(l,u){return e(t,l,u)},c},zl=function e(t,n){n===void 0&&(n=1.70158);var i=function(s){return s?--s*s*((n+1)*s+n)+1:0},r=t==="out"?i:t==="in"?function(s){return 1-i(1-s)}:i_(i);return r.config=function(s){return e(t,s)},r};vn("Linear,Quad,Cubic,Quart,Quint,Strong",function(e,t){var n=t<5?t+1:t;as(e+",Power"+(n-1),t?function(i){return Math.pow(i,n)}:function(i){return i},function(i){return 1-Math.pow(1-i,n)},function(i){return i<.5?Math.pow(i*2,n)/2:1-Math.pow((1-i)*2,n)/2})});Yt.Linear.easeNone=Yt.none=Yt.Linear.easeIn;as("Elastic",Fl("in"),Fl("out"),Fl());(function(e,t){var n=1/t,i=2*n,r=2.5*n,s=function(o){return o<n?e*o*o:o<i?e*Math.pow(o-1.5/t,2)+.75:o<r?e*(o-=2.25/t)*o+.9375:e*Math.pow(o-2.625/t,2)+.984375};as("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);as("Expo",function(e){return Math.pow(2,10*(e-1))*e+e*e*e*e*e*e*(1-e)});as("Circ",function(e){return-(wg(1-e*e)-1)});as("Sine",function(e){return e===1?1:-DC(e*PC)+1});as("Back",zl("in"),zl("out"),zl());Yt.SteppedEase=Yt.steps=Un.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),r=t?1:0,s=1-he;return function(o){return((i*ua(0,s,o)|0)+r)*n}}};qs.ease=Yt["quad.out"];vn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(e){return jf+=e+","+e+"Params,"});var r_=function(e,t){this.id=IC++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Ng,this.set=t?t.getSetter:nd},jo=(function(){function e(n){this.vars=n,this._delay=+n.delay||0,(this._repeat=n.repeat===1/0?-2:n.repeat||0)&&(this._rDelay=n.repeatDelay||0,this._yoyo=!!n.yoyo||!!n.yoyoEase),this._ts=1,Js(this,+n.duration,1,1),this.data=n.data,we&&(this._ctx=we,we.data.push(this)),qo||Rn.wake()}var t=e.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,Js(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(Qs(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(Yc(this,n),!r._dp||r.parent||kg(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&ui(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===he||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Og(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+hp(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+hp(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*r,i):this._repeat?Ks(this._tTime,r)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-he?0:this._rts;if(this._rts===n)return this;var r=this.parent&&this._ts?xc(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-he?0:this._rts,this.totalTime(ua(-Math.abs(this._delay),this.totalDuration(),r),i!==!1),Xc(this),kC(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Qs(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==he&&(this._tTime-=he)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&ui(i,this,n-this._delay),this}return this._start},t.endTime=function(n){return this._start+(_n(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?xc(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=OC);var i=nn;return nn=n,Jf(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),nn=i,this},t.globalTime=function(n){for(var i=this,r=arguments.length?n:i.rawTime();i;)r=i._start+r/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):r},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,pp(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,pp(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(Bn(this,n),_n(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,_n(i)),this._dur||(this._zTime=-he),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-he:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-he,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,r;return!!(!n||this._ts&&this._initted&&n.isActive()&&(r=n.rawTime(!0))>=i&&r<this.endTime(!0)-he)},t.eventCallback=function(n,i,r){var s=this.vars;return arguments.length>1?(i?(s[n]=i,r&&(s[n+"Params"]=r),n==="onUpdate"&&(this._onUpdate=i)):delete s[n],this):s[n]},t.then=function(n){var i=this;return new Promise(function(r){var s=Ue(n)?n:zg,o=function(){var a=i.then;i.then=null,Ue(s)&&(s=s(i))&&(s.then||s===i)&&(i.then=a),r(s),i.then=a};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?o():i._prom=o})},t.kill=function(){To(this)},e})();Nn(jo.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-he,_prom:0,_ps:!1,_rts:1});var fn=(function(e){Tg(t,e);function t(i,r){var s;return i===void 0&&(i={}),s=e.call(this,i)||this,s.labels={},s.smoothChildTiming=!!i.smoothChildTiming,s.autoRemoveChildren=!!i.autoRemoveChildren,s._sort=_n(i.sortChildren),Re&&ui(i.parent||Re,Ii(s),r),i.reversed&&s.reverse(),i.paused&&s.paused(!0),i.scrollTrigger&&Vg(Ii(s),i.scrollTrigger),s}var n=t.prototype;return n.to=function(i,r,s){return No(0,arguments,this),this},n.from=function(i,r,s){return No(1,arguments,this),this},n.fromTo=function(i,r,s,o){return No(2,arguments,this),this},n.set=function(i,r,s){return r.duration=0,r.parent=this,Uo(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new ke(i,r,Bn(this,s),1),this},n.call=function(i,r,s){return ui(this,ke.delayedCall(0,i,r),s)},n.staggerTo=function(i,r,s,o,a,c,l){return s.duration=r,s.stagger=s.stagger||o,s.onComplete=c,s.onCompleteParams=l,s.parent=this,new ke(i,s,Bn(this,a)),this},n.staggerFrom=function(i,r,s,o,a,c,l){return s.runBackwards=1,Uo(s).immediateRender=_n(s.immediateRender),this.staggerTo(i,r,s,o,a,c,l)},n.staggerFromTo=function(i,r,s,o,a,c,l,u){return o.startAt=s,Uo(o).immediateRender=_n(o.immediateRender),this.staggerTo(i,r,o,a,c,l,u)},n.render=function(i,r,s){var o=this._time,a=this._dirty?this.totalDuration():this._tDur,c=this._dur,l=i<=0?0:Ve(i),u=this._zTime<0!=i<0&&(this._initted||!c),f,d,p,m,_,g,h,y,x,v,C,T;if(this!==Re&&l>a&&i>=0&&(l=a),l!==this._tTime||s||u){if(o!==this._time&&c&&(l+=this._time-o,i+=this._time-o),f=l,x=this._start,y=this._ts,g=!y,u&&(c||(o=this._zTime),(i||!r)&&(this._zTime=i)),this._repeat){if(C=this._yoyo,_=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(_*100+i,r,s);if(f=Ve(l%_),l===a?(m=this._repeat,f=c):(v=Ve(l/_),m=~~v,m&&m===v&&(f=c,m--),f>c&&(f=c)),v=Ks(this._tTime,_),!o&&this._tTime&&v!==m&&this._tTime-v*_-this._dur<=0&&(v=m),C&&m&1&&(f=c-f,T=1),m!==v&&!this._lock){var A=C&&v&1,P=A===(C&&m&1);if(m<v&&(A=!A),o=A?0:l%c?c:l,this._lock=1,this.render(o||(T?0:Ve(m*_)),r,!c)._lock=0,this._tTime=l,!r&&this.parent&&Pn(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1),o&&o!==this._time||g!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,a=this._tDur,P&&(this._lock=2,o=A?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!g)return this;n_(this,T)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(h=GC(this,Ve(o),Ve(f)),h&&(l-=f-(f=h._start))),this._tTime=l,this._time=f,this._act=!y,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&l&&!r&&!v&&(Pn(this,"onStart"),this._tTime!==l))return this;if(f>=o&&i>=0)for(d=this._first;d;){if(p=d._next,(d._act||f>=d._start)&&d._ts&&h!==d){if(d.parent!==this)return this.render(i,r,s);if(d.render(d._ts>0?(f-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(f-d._start)*d._ts,r,s),f!==this._time||!this._ts&&!g){h=0,p&&(l+=this._zTime=-he);break}}d=p}else{d=this._last;for(var b=i<0?i:f;d;){if(p=d._prev,(d._act||b<=d._end)&&d._ts&&h!==d){if(d.parent!==this)return this.render(i,r,s);if(d.render(d._ts>0?(b-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(b-d._start)*d._ts,r,s||nn&&Jf(d)),f!==this._time||!this._ts&&!g){h=0,p&&(l+=this._zTime=b?-he:he);break}}d=p}}if(h&&!r&&(this.pause(),h.render(f>=o?0:-he)._zTime=f>=o?1:-1,this._ts))return this._start=x,Xc(this),this.render(i,r,s);this._onUpdate&&!r&&Pn(this,"onUpdate",!0),(l===a&&this._tTime>=this.totalDuration()||!l&&o)&&(x===this._start||Math.abs(y)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(l===a&&this._ts>0||!l&&this._ts<0)&&_r(this,1),!r&&!(i<0&&!o)&&(l||o||!a)&&(Pn(this,l===a&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(l<a&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(i,r){var s=this;if(Hi(r)||(r=Bn(this,r,i)),!(i instanceof jo)){if(cn(i))return i.forEach(function(o){return s.add(o,r)}),this;if(qe(i))return this.addLabel(i,r);if(Ue(i))i=ke.delayedCall(0,i);else return this}return this!==i?ui(this,i,r):this},n.getChildren=function(i,r,s,o){i===void 0&&(i=!0),r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=-$n);for(var a=[],c=this._first;c;)c._start>=o&&(c instanceof ke?r&&a.push(c):(s&&a.push(c),i&&a.push.apply(a,c.getChildren(!0,r,s)))),c=c._next;return a},n.getById=function(i){for(var r=this.getChildren(1,1,1),s=r.length;s--;)if(r[s].vars.id===i)return r[s]},n.remove=function(i){return qe(i)?this.removeLabel(i):Ue(i)?this.killTweensOf(i):(i.parent===this&&Wc(this,i),i===this._recent&&(this._recent=this._last),Wr(this))},n.totalTime=function(i,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Ve(Rn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),e.prototype.totalTime.call(this,i,r),this._forcing=0,this):this._tTime},n.addLabel=function(i,r){return this.labels[i]=Bn(this,r),this},n.removeLabel=function(i){return delete this.labels[i],this},n.addPause=function(i,r,s){var o=ke.delayedCall(0,r||Yo,s);return o.data="isPause",this._hasPause=1,ui(this,o,Bn(this,i))},n.removePause=function(i){var r=this._first;for(i=Bn(this,i);r;)r._start===i&&r.data==="isPause"&&_r(r),r=r._next},n.killTweensOf=function(i,r,s){for(var o=this.getTweensOf(i,s),a=o.length;a--;)cr!==o[a]&&o[a].kill(i,r);return this},n.getTweensOf=function(i,r){for(var s=[],o=Hn(i),a=this._first,c=Hi(r),l;a;)a instanceof ke?FC(a._targets,o)&&(c?(!cr||a._initted&&a._ts)&&a.globalTime(0)<=r&&a.globalTime(a.totalDuration())>r:!r||a.isActive())&&s.push(a):(l=a.getTweensOf(o,r)).length&&s.push.apply(s,l),a=a._next;return s},n.tweenTo=function(i,r){r=r||{};var s=this,o=Bn(s,i),a=r,c=a.startAt,l=a.onStart,u=a.onStartParams,f=a.immediateRender,d,p=ke.to(s,Nn({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:r.duration||Math.abs((o-(c&&"time"in c?c.time:s._time))/s.timeScale())||he,onStart:function(){if(s.pause(),!d){var m=r.duration||Math.abs((o-(c&&"time"in c?c.time:s._time))/s.timeScale());p._dur!==m&&Js(p,m,0,1).render(p._time,!0,!0),d=1}l&&l.apply(p,u||[])}},r));return f?p.render(0):p},n.tweenFromTo=function(i,r,s){return this.tweenTo(r,Nn({startAt:{time:Bn(this,i)}},s))},n.recent=function(){return this._recent},n.nextLabel=function(i){return i===void 0&&(i=this._time),mp(this,Bn(this,i))},n.previousLabel=function(i){return i===void 0&&(i=this._time),mp(this,Bn(this,i),1)},n.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+he)},n.shiftChildren=function(i,r,s){s===void 0&&(s=0);for(var o=this._first,a=this.labels,c;o;)o._start>=s&&(o._start+=i,o._end+=i),o=o._next;if(r)for(c in a)a[c]>=s&&(a[c]+=i);return Wr(this)},n.invalidate=function(i){var r=this._first;for(this._lock=0;r;)r.invalidate(i),r=r._next;return e.prototype.invalidate.call(this,i)},n.clear=function(i){i===void 0&&(i=!0);for(var r=this._first,s;r;)s=r._next,this.remove(r),r=s;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Wr(this)},n.totalDuration=function(i){var r=0,s=this,o=s._last,a=$n,c,l,u;if(arguments.length)return s.timeScale((s._repeat<0?s.duration():s.totalDuration())/(s.reversed()?-i:i));if(s._dirty){for(u=s.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),l=o._start,l>a&&s._sort&&o._ts&&!s._lock?(s._lock=1,ui(s,o,l-o._delay,1)._lock=0):a=l,l<0&&o._ts&&(r-=l,(!u&&!s._dp||u&&u.smoothChildTiming)&&(s._start+=l/s._ts,s._time-=l,s._tTime-=l),s.shiftChildren(-l,!1,-1/0),a=0),o._end>r&&o._ts&&(r=o._end),o=c;Js(s,s===Re&&s._time>r?s._time:r,1,1),s._dirty=0}return s._tDur},t.updateRoot=function(i){if(Re._ts&&(Og(Re,xc(i,Re)),Ug=Rn.frame),Rn.frame>=fp){fp+=Ln.autoSleep||120;var r=Re._first;if((!r||!r._ts)&&Ln.autoSleep&&Rn._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||Rn.sleep()}}},t})(jo);Nn(fn.prototype,{_lock:0,_hasPause:0,_forcing:0});var oR=function(e,t,n,i,r,s,o){var a=new xn(this._pt,e,t,0,1,u_,null,r),c=0,l=0,u,f,d,p,m,_,g,h;for(a.b=n,a.e=i,n+="",i+="",(g=~i.indexOf("random("))&&(i=Zo(i)),s&&(h=[n,i],s(h,e,t),n=h[0],i=h[1]),f=n.match(Ul)||[];u=Ul.exec(i);)p=u[0],m=i.substring(c,u.index),d?d=(d+1)%5:m.substr(-5)==="rgba("&&(d=1),p!==f[l++]&&(_=parseFloat(f[l-1])||0,a._pt={_next:a._pt,p:m||l===1?m:",",s:_,c:p.charAt(1)==="="?zs(_,p)-_:parseFloat(p)-_,m:d&&d<4?Math.round:0},c=Ul.lastIndex);return a.c=c<i.length?i.substring(c,i.length):"",a.fp=o,(Rg.test(i)||g)&&(a.e=0),this._pt=a,a},Qf=function(e,t,n,i,r,s,o,a,c,l){Ue(i)&&(i=i(r||0,e,s));var u=e[t],f=n!=="get"?n:Ue(u)?c?e[t.indexOf("set")||!Ue(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():u,d=Ue(u)?c?fR:c_:ed,p;if(qe(i)&&(~i.indexOf("random(")&&(i=Zo(i)),i.charAt(1)==="="&&(p=zs(f,i)+(an(f)||0),(p||p===0)&&(i=p))),!l||f!==i||rf)return!isNaN(f*i)&&i!==""?(p=new xn(this._pt,e,t,+f||0,i-(f||0),typeof u=="boolean"?hR:l_,0,d),c&&(p.fp=c),o&&p.modifier(o,this,e),this._pt=p):(!u&&!(t in e)&&Zf(t,i),oR.call(this,e,t,f,i,d,a||Ln.stringFilter,c))},aR=function(e,t,n,i,r){if(Ue(e)&&(e=Oo(e,r,t,n,i)),!vi(e)||e.style&&e.nodeType||cn(e)||Ag(e))return qe(e)?Oo(e,r,t,n,i):e;var s={},o;for(o in e)s[o]=Oo(e[o],r,t,n,i);return s},s_=function(e,t,n,i,r,s){var o,a,c,l;if(An[e]&&(o=new An[e]).init(r,o.rawVars?t[e]:aR(t[e],i,r,s,n),n,i,s)!==!1&&(n._pt=a=new xn(n._pt,r,e,0,1,o.render,o,0,o.priority),n!==Ps))for(c=n._ptLookup[n._targets.indexOf(r)],l=o._props.length;l--;)c[o._props[l]]=a;return o},cr,rf,td=function e(t,n,i){var r=t.vars,s=r.ease,o=r.startAt,a=r.immediateRender,c=r.lazy,l=r.onUpdate,u=r.runBackwards,f=r.yoyoEase,d=r.keyframes,p=r.autoRevert,m=t._dur,_=t._startAt,g=t._targets,h=t.parent,y=h&&h.data==="nested"?h.vars.targets:g,x=t._overwrite==="auto"&&!Gf,v=t.timeline,C,T,A,P,b,M,I,V,F,H,Z,$,J;if(v&&(!d||!s)&&(s="none"),t._ease=Xr(s,qs.ease),t._yEase=f?e_(Xr(f===!0?s:f,qs.ease)):0,f&&t._yoyo&&!t._repeat&&(f=t._yEase,t._yEase=t._ease,t._ease=f),t._from=!v&&!!r.runBackwards,!v||d&&!r.stagger){if(V=g[0]?Gr(g[0]).harness:0,$=V&&r[V.prop],C=vc(r,qf),_&&(_._zTime<0&&_.progress(1),n<0&&u&&a&&!p?_.render(-1,!0):_.revert(u&&m?sc:NC),_._lazy=0),o){if(_r(t._startAt=ke.set(g,Nn({data:"isStart",overwrite:!1,parent:h,immediateRender:!0,lazy:!_&&_n(c),startAt:null,delay:0,onUpdate:l&&function(){return Pn(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,n<0&&(nn||!a&&!p)&&t._startAt.revert(sc),a&&m&&n<=0&&i<=0){n&&(t._zTime=n);return}}else if(u&&m&&!_){if(n&&(a=!1),A=Nn({overwrite:!1,data:"isFromStart",lazy:a&&!_&&_n(c),immediateRender:a,stagger:0,parent:h},C),$&&(A[V.prop]=$),_r(t._startAt=ke.set(g,A)),t._startAt._dp=0,t._startAt._sat=t,n<0&&(nn?t._startAt.revert(sc):t._startAt.render(-1,!0)),t._zTime=n,!a)e(t._startAt,he,he);else if(!n)return}for(t._pt=t._ptCache=0,c=m&&_n(c)||c&&!m,T=0;T<g.length;T++){if(b=g[T],I=b._gsap||Kf(g)[T]._gsap,t._ptLookup[T]=H={},Ku[I.id]&&hr.length&&_c(),Z=y===g?T:y.indexOf(b),V&&(F=new V).init(b,$||C,t,Z,y)!==!1&&(t._pt=P=new xn(t._pt,b,F.name,0,1,F.render,F,0,F.priority),F._props.forEach(function(G){H[G]=P}),F.priority&&(M=1)),!V||$)for(A in C)An[A]&&(F=s_(A,C,t,Z,b,y))?F.priority&&(M=1):H[A]=P=Qf.call(t,b,A,"get",C[A],Z,y,0,r.stringFilter);t._op&&t._op[T]&&t.kill(b,t._op[T]),x&&t._pt&&(cr=t,Re.killTweensOf(b,H,t.globalTime(n)),J=!t.parent,cr=0),t._pt&&c&&(Ku[I.id]=1)}M&&f_(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!J,d&&n<=0&&v.render($n,!0,!0)},cR=function(e,t,n,i,r,s,o,a){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],l,u,f,d;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,d=e._targets.length;d--;){if(l=f[d][t],l&&l.d&&l.d._pt)for(l=l.d._pt;l&&l.p!==t&&l.fp!==t;)l=l._next;if(!l)return rf=1,e.vars[t]="+=0",td(e,o),rf=0,a?Xo(t+" not eligible for reset"):1;c.push(l)}for(d=c.length;d--;)u=c[d],l=u._pt||u,l.s=(i||i===0)&&!r?i:l.s+(i||0)+s*l.c,l.c=n-l.s,u.e&&(u.e=Fe(n)+an(u.e)),u.b&&(u.b=l.s+an(u.b))},lR=function(e,t){var n=e[0]?Gr(e[0]).harness:0,i=n&&n.aliases,r,s,o,a;if(!i)return t;r=js({},t);for(s in i)if(s in r)for(a=i[s].split(","),o=a.length;o--;)r[a[o]]=r[s];return r},uR=function(e,t,n,i){var r=t.ease||i||"power1.inOut",s,o;if(cn(t))o=n[e]||(n[e]=[]),t.forEach(function(a,c){return o.push({t:c/(t.length-1)*100,v:a,e:r})});else for(s in t)o=n[s]||(n[s]=[]),s==="ease"||o.push({t:parseFloat(e),v:t[s],e:r})},Oo=function(e,t,n,i,r){return Ue(e)?e.call(t,n,i,r):qe(e)&&~e.indexOf("random(")?Zo(e):e},o_=jf+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",a_={};vn(o_+",id,stagger,delay,duration,paused,scrollTrigger",function(e){return a_[e]=1});var ke=(function(e){Tg(t,e);function t(i,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=e.call(this,o?r:Uo(r))||this;var c=a.vars,l=c.duration,u=c.delay,f=c.immediateRender,d=c.stagger,p=c.overwrite,m=c.keyframes,_=c.defaults,g=c.scrollTrigger,h=c.yoyoEase,y=r.parent||Re,x=(cn(i)||Ag(i)?Hi(i[0]):"length"in r)?[i]:Hn(i),v,C,T,A,P,b,M,I;if(a._targets=x.length?Kf(x):Xo("GSAP target "+i+" not found. https://gsap.com",!Ln.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=p,m||d||Xa(l)||Xa(u)){if(r=a.vars,v=a.timeline=new fn({data:"nested",defaults:_||{},targets:y&&y.data==="nested"?y.vars.targets:x}),v.kill(),v.parent=v._dp=Ii(a),v._start=0,d||Xa(l)||Xa(u)){if(A=x.length,M=d&&Wg(d),vi(d))for(P in d)~o_.indexOf(P)&&(I||(I={}),I[P]=d[P]);for(C=0;C<A;C++)T=vc(r,a_),T.stagger=0,h&&(T.yoyoEase=h),I&&js(T,I),b=x[C],T.duration=+Oo(l,Ii(a),C,b,x),T.delay=(+Oo(u,Ii(a),C,b,x)||0)-a._delay,!d&&A===1&&T.delay&&(a._delay=u=T.delay,a._start+=u,T.delay=0),v.to(b,T,M?M(C,b,x):0),v._ease=Yt.none;v.duration()?l=u=0:a.timeline=0}else if(m){Uo(Nn(v.vars.defaults,{ease:"none"})),v._ease=Xr(m.ease||r.ease||"none");var V=0,F,H,Z;if(cn(m))m.forEach(function($){return v.to(x,$,">")}),v.duration();else{T={};for(P in m)P==="ease"||P==="easeEach"||uR(P,m[P],T,m.easeEach);for(P in T)for(F=T[P].sort(function($,J){return $.t-J.t}),V=0,C=0;C<F.length;C++)H=F[C],Z={ease:H.e,duration:(H.t-(C?F[C-1].t:0))/100*l},Z[P]=H.v,v.to(x,Z,V),V+=Z.duration;v.duration()<l&&v.to({},{duration:l-v.duration()})}}l||a.duration(l=v.duration())}else a.timeline=0;return p===!0&&!Gf&&(cr=Ii(a),Re.killTweensOf(x),cr=0),ui(y,Ii(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(f||!l&&!m&&a._start===Ve(y._time)&&_n(f)&&VC(Ii(a))&&y.data!=="nested")&&(a._tTime=-he,a.render(Math.max(0,-u)||0)),g&&Vg(Ii(a),g),a}var n=t.prototype;return n.render=function(i,r,s){var o=this._time,a=this._tDur,c=this._dur,l=i<0,u=i>a-he&&!l?a:i<he?0:i,f,d,p,m,_,g,h,y,x;if(!c)HC(this,i,r,s);else if(u!==this._tTime||!i||s||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==l||this._lazy){if(f=u,y=this.timeline,this._repeat){if(m=c+this._rDelay,this._repeat<-1&&l)return this.totalTime(m*100+i,r,s);if(f=Ve(u%m),u===a?(p=this._repeat,f=c):(_=Ve(u/m),p=~~_,p&&p===_?(f=c,p--):f>c&&(f=c)),g=this._yoyo&&p&1,g&&(x=this._yEase,f=c-f),_=Ks(this._tTime,m),f===o&&!s&&this._initted&&p===_)return this._tTime=u,this;p!==_&&(y&&this._yEase&&n_(y,g),this.vars.repeatRefresh&&!g&&!this._lock&&f!==m&&this._initted&&(this._lock=s=1,this.render(Ve(m*p),!0).invalidate()._lock=0))}if(!this._initted){if($g(this,l?i:f,s,r,u))return this._tTime=0,this;if(o!==this._time&&!(s&&this.vars.repeatRefresh&&p!==_))return this;if(c!==this._dur)return this.render(i,r,s)}if(this._tTime=u,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=h=(x||this._ease)(f/c),this._from&&(this.ratio=h=1-h),!o&&u&&!r&&!_&&(Pn(this,"onStart"),this._tTime!==u))return this;for(d=this._pt;d;)d.r(h,d.d),d=d._next;y&&y.render(i<0?i:y._dur*y._ease(f/this._dur),r,s)||this._startAt&&(this._zTime=i),this._onUpdate&&!r&&(l&&Ju(this,i,r,s),Pn(this,"onUpdate")),this._repeat&&p!==_&&this.vars.onRepeat&&!r&&this.parent&&Pn(this,"onRepeat"),(u===this._tDur||!u)&&this._tTime===u&&(l&&!this._onUpdate&&Ju(this,i,!0,!0),(i||!c)&&(u===this._tDur&&this._ts>0||!u&&this._ts<0)&&_r(this,1),!r&&!(l&&!o)&&(u||o||g)&&(Pn(this,u===a?"onComplete":"onReverseComplete",!0),this._prom&&!(u<a&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),e.prototype.invalidate.call(this,i)},n.resetTo=function(i,r,s,o,a){qo||Rn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),l;return this._initted||td(this,c),l=this._ease(c/this._dur),cR(this,i,r,s,o,l,c,a)?this.resetTo(i,r,s,o,1):(Yc(this,0),this.parent||Bg(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},n.kill=function(i,r){if(r===void 0&&(r="all"),!i&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?To(this):this.scrollTrigger&&this.scrollTrigger.kill(!!nn),this;if(this.timeline){var s=this.timeline.totalDuration();return this.timeline.killTweensOf(i,r,cr&&cr.vars.overwrite!==!0)._first||To(this),this.parent&&s!==this.timeline.totalDuration()&&Js(this,this._dur*this.timeline._tDur/s,0,1),this}var o=this._targets,a=i?Hn(i):o,c=this._ptLookup,l=this._pt,u,f,d,p,m,_,g;if((!r||r==="all")&&BC(o,a))return r==="all"&&(this._pt=0),To(this);for(u=this._op=this._op||[],r!=="all"&&(qe(r)&&(m={},vn(r,function(h){return m[h]=1}),r=m),r=lR(o,r)),g=o.length;g--;)if(~a.indexOf(o[g])){f=c[g],r==="all"?(u[g]=r,p=f,d={}):(d=u[g]=u[g]||{},p=r);for(m in p)_=f&&f[m],_&&((!("kill"in _.d)||_.d.kill(m)===!0)&&Wc(this,_,"_pt"),delete f[m]),d!=="all"&&(d[m]=1)}return this._initted&&!this._pt&&l&&To(this),this},t.to=function(i,r){return new t(i,r,arguments[2])},t.from=function(i,r){return No(1,arguments)},t.delayedCall=function(i,r,s,o){return new t(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:r,onReverseComplete:r,onCompleteParams:s,onReverseCompleteParams:s,callbackScope:o})},t.fromTo=function(i,r,s){return No(2,arguments)},t.set=function(i,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new t(i,r)},t.killTweensOf=function(i,r,s){return Re.killTweensOf(i,r,s)},t})(jo);Nn(ke.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});vn("staggerTo,staggerFrom,staggerFromTo",function(e){ke[e]=function(){var t=new fn,n=tf.call(arguments,0);return n.splice(e==="staggerFromTo"?5:4,0,0),t[e].apply(t,n)}});var ed=function(e,t,n){return e[t]=n},c_=function(e,t,n){return e[t](n)},fR=function(e,t,n,i){return e[t](i.fp,n)},dR=function(e,t,n){return e.setAttribute(t,n)},nd=function(e,t){return Ue(e[t])?c_:Wf(e[t])&&e.setAttribute?dR:ed},l_=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},hR=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},u_=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},id=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},pR=function(e,t,n,i){for(var r=this._pt,s;r;)s=r._next,r.p===i&&r.modifier(e,t,n),r=s},mR=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?Wc(this,t,"_pt"):t.dep||(n=1),t=i;return!n},gR=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},f_=function(e){for(var t=e._pt,n,i,r,s;t;){for(n=t._next,i=r;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:s)?t._prev._next=t:r=t,(t._next=i)?i._prev=t:s=t,t=n}e._pt=r},xn=(function(){function e(n,i,r,s,o,a,c,l,u){this.t=i,this.s=s,this.c=o,this.p=r,this.r=a||l_,this.d=c||this,this.set=l||ed,this.pr=u||0,this._next=n,n&&(n._prev=this)}var t=e.prototype;return t.modifier=function(n,i,r){this.mSet=this.mSet||this.set,this.set=gR,this.m=n,this.mt=r,this.tween=i},e})();vn(jf+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(e){return qf[e]=1});Un.TweenMax=Un.TweenLite=ke;Un.TimelineLite=Un.TimelineMax=fn;Re=new fn({sortChildren:!1,defaults:qs,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Ln.stringFilter=t_;var Yr=[],ac={},_R=[],_p=0,vR=0,Bl=function(e){return(ac[e]||_R).map(function(t){return t()})},sf=function(){var e=Date.now(),t=[];e-_p>2&&(Bl("matchMediaInit"),Yr.forEach(function(n){var i=n.queries,r=n.conditions,s,o,a,c;for(o in i)s=ci.matchMedia(i[o]).matches,s&&(a=1),s!==r[o]&&(r[o]=s,c=1);c&&(n.revert(),a&&t.push(n))}),Bl("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),_p=e,Bl("matchMedia"))},d_=(function(){function e(n,i){this.selector=i&&ef(i),this.data=[],this._r=[],this.isReverted=!1,this.id=vR++,n&&this.add(n)}var t=e.prototype;return t.add=function(n,i,r){Ue(n)&&(r=i,i=n,n=Ue);var s=this,o=function(){var a=we,c=s.selector,l;return a&&a!==s&&a.data.push(s),r&&(s.selector=ef(r)),we=s,l=i.apply(s,arguments),Ue(l)&&s._r.push(l),we=a,s.selector=c,s.isReverted=!1,l};return s.last=o,n===Ue?o(s,function(a){return s.add(null,a)}):n?s[n]=o:o},t.ignore=function(n){var i=we;we=null,n(this),we=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof e?n.push.apply(n,i.getTweens()):i instanceof ke&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var r=this;if(n?(function(){for(var o=r.getTweens(),a=r.data.length,c;a--;)c=r.data[a],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(l){return o.splice(o.indexOf(l),1)}));for(o.map(function(l){return{g:l._dur||l._delay||l._sat&&!l._sat.vars.immediateRender?l.globalTime(0):-1/0,t:l}}).sort(function(l,u){return u.g-l.g||-1/0}).forEach(function(l){return l.t.revert(n)}),a=r.data.length;a--;)c=r.data[a],c instanceof fn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof ke)&&c.revert&&c.revert(n);r._r.forEach(function(l){return l(n,r)}),r.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i)for(var s=Yr.length;s--;)Yr[s].id===this.id&&Yr.splice(s,1)},t.revert=function(n){this.kill(n||{})},e})(),xR=(function(){function e(n){this.contexts=[],this.scope=n,we&&we.data.push(this)}var t=e.prototype;return t.add=function(n,i,r){vi(n)||(n={matches:n});var s=new d_(0,r||this.scope),o=s.conditions={},a,c,l;we&&!s.selector&&(s.selector=we.selector),this.contexts.push(s),i=s.add("onMatch",i),s.queries=n;for(c in n)c==="all"?l=1:(a=ci.matchMedia(n[c]),a&&(Yr.indexOf(s)<0&&Yr.push(s),(o[c]=a.matches)&&(l=1),a.addListener?a.addListener(sf):a.addEventListener("change",sf)));return l&&i(s,function(u){return s.add(null,u)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},e})(),yc={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return Kg(i)})},timeline:function(e){return new fn(e)},getTweensOf:function(e,t){return Re.getTweensOf(e,t)},getProperty:function(e,t,n,i){qe(e)&&(e=Hn(e)[0]);var r=Gr(e||{}).get,s=n?zg:Fg;return n==="native"&&(n=""),e&&(t?s((An[t]&&An[t].get||r)(e,t,n,i)):function(o,a,c){return s((An[o]&&An[o].get||r)(e,o,a,c))})},quickSetter:function(e,t,n){if(e=Hn(e),e.length>1){var i=e.map(function(l){return Sn.quickSetter(l,t,n)}),r=i.length;return function(l){for(var u=r;u--;)i[u](l)}}e=e[0]||{};var s=An[t],o=Gr(e),a=o.harness&&(o.harness.aliases||{})[t]||t,c=s?function(l){var u=new s;Ps._pt=0,u.init(e,n?l+n:l,Ps,0,[e]),u.render(1,u),Ps._pt&&id(1,Ps)}:o.set(e,a);return s?c:function(l){return c(e,a,n?l+n:l,o,1)}},quickTo:function(e,t,n){var i,r=Sn.to(e,Nn((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),s=function(o,a,c){return r.resetTo(t,o,a,c)};return s.tween=r,s},isTweening:function(e){return Re.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Xr(e.ease,qs.ease)),dp(qs,e||{})},config:function(e){return dp(Ln,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,r=e.defaults,s=e.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!An[o]&&!Un[o]&&Xo(t+" effect requires "+o+" plugin.")}),Nl[t]=function(o,a,c){return n(Hn(o),Nn(a||{},r),c)},s&&(fn.prototype[t]=function(o,a,c){return this.add(Nl[t](o,vi(a)?a:(c=a)&&{},this),c)})},registerEase:function(e,t){Yt[e]=Xr(t)},parseEase:function(e,t){return arguments.length?Xr(e,t):Yt},getById:function(e){return Re.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new fn(e),i,r;for(n.smoothChildTiming=_n(e.smoothChildTiming),Re.remove(n),n._dp=0,n._time=n._tTime=Re._time,i=Re._first;i;)r=i._next,(t||!(!i._dur&&i instanceof ke&&i.vars.onComplete===i._targets[0]))&&ui(n,i,i._start-i._delay),i=r;return ui(Re,n,0),n},context:function(e,t){return e?new d_(e,t):we},matchMedia:function(e){return new xR(e)},matchMediaRefresh:function(){return Yr.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||sf()},addEventListener:function(e,t){var n=ac[e]||(ac[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=ac[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:KC,wrapYoyo:JC,distribute:Wg,random:Yg,snap:Xg,normalize:jC,getUnit:an,clamp:XC,splitColor:Jg,toArray:Hn,selector:ef,mapRange:qg,pipe:ZC,unitize:qC,interpolate:QC,shuffle:Gg},install:Dg,effects:Nl,ticker:Rn,updateRoot:fn.updateRoot,plugins:An,globalTimeline:Re,core:{PropTween:xn,globals:Lg,Tween:ke,Timeline:fn,Animation:jo,getCache:Gr,_removeLinkedListItem:Wc,reverting:function(){return nn},context:function(e){return e&&we&&(we.data.push(e),e._ctx=we),we},suppressOverwrites:function(e){return Gf=e}}};vn("to,from,fromTo,delayedCall,set,killTweensOf",function(e){return yc[e]=ke[e]});Rn.add(fn.updateRoot);Ps=yc.to({},{duration:0});var yR=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},SR=function(e,t){var n=e._targets,i,r,s;for(i in t)for(r=n.length;r--;)s=e._ptLookup[r][i],s&&(s=s.d)&&(s._pt&&(s=yR(s,i)),s&&s.modifier&&s.modifier(t[i],e,n[r],i))},kl=function(e,t){return{name:e,headless:1,rawVars:1,init:function(n,i,r){r._onInit=function(s){var o,a;if(qe(i)&&(o={},vn(i,function(c){return o[c]=1}),i=o),t){o={};for(a in i)o[a]=t(i[a]);i=o}SR(s,i)}}}},Sn=yc.registerPlugin({name:"attr",init:function(e,t,n,i,r){var s,o,a;this.tween=n;for(s in t)a=e.getAttribute(s)||"",o=this.add(e,"setAttribute",(a||0)+"",t[s],i,r,0,0,s),o.op=s,o.b=a,this._props.push(s)},render:function(e,t){for(var n=t._pt;n;)nn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},kl("roundProps",nf),kl("modifiers"),kl("snap",Xg))||yc;ke.version=fn.version=Sn.version="3.13.0";Ig=1;Xf()&&Qs();Yt.Power0;Yt.Power1;Yt.Power2;Yt.Power3;Yt.Power4;Yt.Linear;Yt.Quad;Yt.Cubic;Yt.Quart;Yt.Quint;Yt.Strong;Yt.Elastic;Yt.Back;Yt.SteppedEase;Yt.Bounce;Yt.Sine;Yt.Expo;Yt.Circ;var vp,lr,Bs,rd,kr,xp,sd,MR=function(){return typeof window<"u"},Gi={},Ur=180/Math.PI,ks=Math.PI/180,bs=Math.atan2,yp=1e8,od=/([A-Z])/g,ER=/(left|right|width|margin|padding|x)/i,bR=/[\s,\(]\S/,pi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},of=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},TR=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},wR=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},AR=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},h_=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},p_=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},CR=function(e,t,n){return e.style[t]=n},RR=function(e,t,n){return e.style.setProperty(t,n)},PR=function(e,t,n){return e._gsap[t]=n},IR=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},DR=function(e,t,n,i,r){var s=e._gsap;s.scaleX=s.scaleY=n,s.renderTransform(r,s)},LR=function(e,t,n,i,r){var s=e._gsap;s[t]=n,s.renderTransform(r,s)},Ie="transform",yn=Ie+"Origin",UR=function e(t,n){var i=this,r=this.target,s=r.style,o=r._gsap;if(t in Gi&&s){if(this.tfm=this.tfm||{},t!=="transform")t=pi[t]||t,~t.indexOf(",")?t.split(",").forEach(function(a){return i.tfm[a]=Di(r,a)}):this.tfm[t]=o.x?o[t]:Di(r,t),t===yn&&(this.tfm.zOrigin=o.zOrigin);else return pi.transform.split(",").forEach(function(a){return e.call(i,a,n)});if(this.props.indexOf(Ie)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(yn,n,"")),t=Ie}(s||n)&&this.props.push(t,n,s[t])},m_=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},NR=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,r,s;for(r=0;r<e.length;r+=3)e[r+1]?e[r+1]===2?t[e[r]](e[r+2]):t[e[r]]=e[r+2]:e[r+2]?n[e[r]]=e[r+2]:n.removeProperty(e[r].substr(0,2)==="--"?e[r]:e[r].replace(od,"-$1").toLowerCase());if(this.tfm){for(s in this.tfm)i[s]=this.tfm[s];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),r=sd(),(!r||!r.isStart)&&!n[Ie]&&(m_(n),i.zOrigin&&n[yn]&&(n[yn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},g_=function(e,t){var n={target:e,props:[],revert:NR,save:UR};return e._gsap||Sn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},__,af=function(e,t){var n=lr.createElementNS?lr.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):lr.createElement(e);return n&&n.style?n:lr.createElement(e)},Gn=function e(t,n,i){var r=getComputedStyle(t);return r[n]||r.getPropertyValue(n.replace(od,"-$1").toLowerCase())||r.getPropertyValue(n)||!i&&e(t,to(n)||n,1)||""},Sp="O,Moz,ms,Ms,Webkit".split(","),to=function(e,t,n){var i=t||kr,r=i.style,s=5;if(e in r&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);s--&&!(Sp[s]+e in r););return s<0?null:(s===3?"ms":s>=0?Sp[s]:"")+e},cf=function(){MR()&&window.document&&(vp=window,lr=vp.document,Bs=lr.documentElement,kr=af("div")||{style:{}},af("div"),Ie=to(Ie),yn=Ie+"Origin",kr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",__=!!to("perspective"),sd=Sn.core.reverting,rd=1)},Mp=function(e){var t=e.ownerSVGElement,n=af("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),r;i.style.display="block",n.appendChild(i),Bs.appendChild(n);try{r=i.getBBox()}catch{}return n.removeChild(i),Bs.removeChild(n),r},Ep=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},v_=function(e){var t,n;try{t=e.getBBox()}catch{t=Mp(e),n=1}return t&&(t.width||t.height)||n||(t=Mp(e)),t&&!t.width&&!t.x&&!t.y?{x:+Ep(e,["x","cx","x1"])||0,y:+Ep(e,["y","cy","y1"])||0,width:0,height:0}:t},x_=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&v_(e))},ns=function(e,t){if(t){var n=e.style,i;t in Gi&&t!==yn&&(t=Ie),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(od,"-$1").toLowerCase())):n.removeAttribute(t)}},ur=function(e,t,n,i,r,s){var o=new xn(e._pt,t,n,0,1,s?p_:h_);return e._pt=o,o.b=i,o.e=r,e._props.push(n),o},bp={deg:1,rad:1,turn:1},OR={grid:1,flex:1},vr=function e(t,n,i,r){var s=parseFloat(i)||0,o=(i+"").trim().substr((s+"").length)||"px",a=kr.style,c=ER.test(n),l=t.tagName.toLowerCase()==="svg",u=(l?"client":"offset")+(c?"Width":"Height"),f=100,d=r==="px",p=r==="%",m,_,g,h;if(r===o||!s||bp[r]||bp[o])return s;if(o!=="px"&&!d&&(s=e(t,n,i,"px")),h=t.getCTM&&x_(t),(p||o==="%")&&(Gi[n]||~n.indexOf("adius")))return m=h?t.getBBox()[c?"width":"height"]:t[u],Fe(p?s/m*f:s/100*m);if(a[c?"width":"height"]=f+(d?o:r),_=r!=="rem"&&~n.indexOf("adius")||r==="em"&&t.appendChild&&!l?t:t.parentNode,h&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===lr||!_.appendChild)&&(_=lr.body),g=_._gsap,g&&p&&g.width&&c&&g.time===Rn.time&&!g.uncache)return Fe(s/g.width*f);if(p&&(n==="height"||n==="width")){var y=t.style[n];t.style[n]=f+r,m=t[u],y?t.style[n]=y:ns(t,n)}else(p||o==="%")&&!OR[Gn(_,"display")]&&(a.position=Gn(t,"position")),_===t&&(a.position="static"),_.appendChild(kr),m=kr[u],_.removeChild(kr),a.position="absolute";return c&&p&&(g=Gr(_),g.time=Rn.time,g.width=_[u]),Fe(d?m*s/f:m&&s?f/m*s:0)},Di=function(e,t,n,i){var r;return rd||cf(),t in pi&&t!=="transform"&&(t=pi[t],~t.indexOf(",")&&(t=t.split(",")[0])),Gi[t]&&t!=="transform"?(r=Jo(e,i),r=t!=="transformOrigin"?r[t]:r.svg?r.origin:Mc(Gn(e,yn))+" "+r.zOrigin+"px"):(r=e.style[t],(!r||r==="auto"||i||~(r+"").indexOf("calc("))&&(r=Sc[t]&&Sc[t](e,t,n)||Gn(e,t)||Ng(e,t)||(t==="opacity"?1:0))),n&&!~(r+"").trim().indexOf(" ")?vr(e,t,r,n)+n:r},FR=function(e,t,n,i){if(!n||n==="none"){var r=to(t,e,1),s=r&&Gn(e,r,1);s&&s!==n?(t=r,n=s):t==="borderColor"&&(n=Gn(e,"borderTopColor"))}var o=new xn(this._pt,e.style,t,0,1,u_),a=0,c=0,l,u,f,d,p,m,_,g,h,y,x,v;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=Gn(e,i.substring(4,i.indexOf(")")))),i==="auto"&&(m=e.style[t],e.style[t]=i,i=Gn(e,t)||i,m?e.style[t]=m:ns(e,t)),l=[n,i],t_(l),n=l[0],i=l[1],f=n.match(Rs)||[],v=i.match(Rs)||[],v.length){for(;u=Rs.exec(i);)_=u[0],h=i.substring(a,u.index),p?p=(p+1)%5:(h.substr(-5)==="rgba("||h.substr(-5)==="hsla(")&&(p=1),_!==(m=f[c++]||"")&&(d=parseFloat(m)||0,x=m.substr((d+"").length),_.charAt(1)==="="&&(_=zs(d,_)+x),g=parseFloat(_),y=_.substr((g+"").length),a=Rs.lastIndex-y.length,y||(y=y||Ln.units[t]||x,a===i.length&&(i+=y,o.e+=y)),x!==y&&(d=vr(e,t,m,y)||0),o._pt={_next:o._pt,p:h||c===1?h:",",s:d,c:g-d,m:p&&p<4||t==="zIndex"?Math.round:0});o.c=a<i.length?i.substring(a,i.length):""}else o.r=t==="display"&&i==="none"?p_:h_;return Rg.test(i)&&(o.e=0),this._pt=o,o},Tp={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},zR=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=Tp[n]||n,t[1]=Tp[i]||i,t.join(" ")},BR=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,r=t.u,s=n._gsap,o,a,c;if(r==="all"||r===!0)i.cssText="",a=1;else for(r=r.split(","),c=r.length;--c>-1;)o=r[c],Gi[o]&&(a=1,o=o==="transformOrigin"?yn:Ie),ns(n,o);a&&(ns(n,Ie),s&&(s.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",Jo(n,1),s.uncache=1,m_(i)))}},Sc={clearProps:function(e,t,n,i,r){if(r.data!=="isFromStart"){var s=e._pt=new xn(e._pt,t,n,0,0,BR);return s.u=i,s.pr=-10,s.tween=r,e._props.push(n),1}}},Ko=[1,0,0,1,0,0],y_={},S_=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},wp=function(e){var t=Gn(e,Ie);return S_(t)?Ko:t.substr(7).match(Cg).map(Fe)},ad=function(e,t){var n=e._gsap||Gr(e),i=e.style,r=wp(e),s,o,a,c;return n.svg&&e.getAttribute("transform")?(a=e.transform.baseVal.consolidate().matrix,r=[a.a,a.b,a.c,a.d,a.e,a.f],r.join(",")==="1,0,0,1,0,0"?Ko:r):(r===Ko&&!e.offsetParent&&e!==Bs&&!n.svg&&(a=i.display,i.display="block",s=e.parentNode,(!s||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,Bs.appendChild(e)),r=wp(e),a?i.display=a:ns(e,"display"),c&&(o?s.insertBefore(e,o):s?s.appendChild(e):Bs.removeChild(e))),t&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},lf=function(e,t,n,i,r,s){var o=e._gsap,a=r||ad(e,!0),c=o.xOrigin||0,l=o.yOrigin||0,u=o.xOffset||0,f=o.yOffset||0,d=a[0],p=a[1],m=a[2],_=a[3],g=a[4],h=a[5],y=t.split(" "),x=parseFloat(y[0])||0,v=parseFloat(y[1])||0,C,T,A,P;n?a!==Ko&&(T=d*_-p*m)&&(A=x*(_/T)+v*(-m/T)+(m*h-_*g)/T,P=x*(-p/T)+v*(d/T)-(d*h-p*g)/T,x=A,v=P):(C=v_(e),x=C.x+(~y[0].indexOf("%")?x/100*C.width:x),v=C.y+(~(y[1]||y[0]).indexOf("%")?v/100*C.height:v)),i||i!==!1&&o.smooth?(g=x-c,h=v-l,o.xOffset=u+(g*d+h*m)-g,o.yOffset=f+(g*p+h*_)-h):o.xOffset=o.yOffset=0,o.xOrigin=x,o.yOrigin=v,o.smooth=!!i,o.origin=t,o.originIsAbsolute=!!n,e.style[yn]="0px 0px",s&&(ur(s,o,"xOrigin",c,x),ur(s,o,"yOrigin",l,v),ur(s,o,"xOffset",u,o.xOffset),ur(s,o,"yOffset",f,o.yOffset)),e.setAttribute("data-svg-origin",x+" "+v)},Jo=function(e,t){var n=e._gsap||new r_(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,r=n.scaleX<0,s="px",o="deg",a=getComputedStyle(e),c=Gn(e,yn)||"0",l,u,f,d,p,m,_,g,h,y,x,v,C,T,A,P,b,M,I,V,F,H,Z,$,J,G,rt,lt,_t,kt,Gt,X;return l=u=f=m=_=g=h=y=x=0,d=p=1,n.svg=!!(e.getCTM&&x_(e)),a.translate&&((a.translate!=="none"||a.scale!=="none"||a.rotate!=="none")&&(i[Ie]=(a.translate!=="none"?"translate3d("+(a.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(a.rotate!=="none"?"rotate("+a.rotate+") ":"")+(a.scale!=="none"?"scale("+a.scale.split(" ").join(",")+") ":"")+(a[Ie]!=="none"?a[Ie]:"")),i.scale=i.rotate=i.translate="none"),T=ad(e,n.svg),n.svg&&(n.uncache?(J=e.getBBox(),c=n.xOrigin-J.x+"px "+(n.yOrigin-J.y)+"px",$=""):$=!t&&e.getAttribute("data-svg-origin"),lf(e,$||c,!!$||n.originIsAbsolute,n.smooth!==!1,T)),v=n.xOrigin||0,C=n.yOrigin||0,T!==Ko&&(M=T[0],I=T[1],V=T[2],F=T[3],l=H=T[4],u=Z=T[5],T.length===6?(d=Math.sqrt(M*M+I*I),p=Math.sqrt(F*F+V*V),m=M||I?bs(I,M)*Ur:0,h=V||F?bs(V,F)*Ur+m:0,h&&(p*=Math.abs(Math.cos(h*ks))),n.svg&&(l-=v-(v*M+C*V),u-=C-(v*I+C*F))):(X=T[6],kt=T[7],rt=T[8],lt=T[9],_t=T[10],Gt=T[11],l=T[12],u=T[13],f=T[14],A=bs(X,_t),_=A*Ur,A&&(P=Math.cos(-A),b=Math.sin(-A),$=H*P+rt*b,J=Z*P+lt*b,G=X*P+_t*b,rt=H*-b+rt*P,lt=Z*-b+lt*P,_t=X*-b+_t*P,Gt=kt*-b+Gt*P,H=$,Z=J,X=G),A=bs(-V,_t),g=A*Ur,A&&(P=Math.cos(-A),b=Math.sin(-A),$=M*P-rt*b,J=I*P-lt*b,G=V*P-_t*b,Gt=F*b+Gt*P,M=$,I=J,V=G),A=bs(I,M),m=A*Ur,A&&(P=Math.cos(A),b=Math.sin(A),$=M*P+I*b,J=H*P+Z*b,I=I*P-M*b,Z=Z*P-H*b,M=$,H=J),_&&Math.abs(_)+Math.abs(m)>359.9&&(_=m=0,g=180-g),d=Fe(Math.sqrt(M*M+I*I+V*V)),p=Fe(Math.sqrt(Z*Z+X*X)),A=bs(H,Z),h=Math.abs(A)>2e-4?A*Ur:0,x=Gt?1/(Gt<0?-Gt:Gt):0),n.svg&&($=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!S_(Gn(e,Ie)),$&&e.setAttribute("transform",$))),Math.abs(h)>90&&Math.abs(h)<270&&(r?(d*=-1,h+=m<=0?180:-180,m+=m<=0?180:-180):(p*=-1,h+=h<=0?180:-180)),t=t||n.uncache,n.x=l-((n.xPercent=l&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-l)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+s,n.y=u-((n.yPercent=u&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-u)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+s,n.z=f+s,n.scaleX=Fe(d),n.scaleY=Fe(p),n.rotation=Fe(m)+o,n.rotationX=Fe(_)+o,n.rotationY=Fe(g)+o,n.skewX=h+o,n.skewY=y+o,n.transformPerspective=x+s,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[yn]=Mc(c)),n.xOffset=n.yOffset=0,n.force3D=Ln.force3D,n.renderTransform=n.svg?VR:__?M_:kR,n.uncache=0,n},Mc=function(e){return(e=e.split(" "))[0]+" "+e[1]},Vl=function(e,t,n){var i=an(t);return Fe(parseFloat(t)+parseFloat(vr(e,"x",n+"px",i)))+i},kR=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,M_(e,t)},Rr="0deg",yo="0px",Pr=") ",M_=function(e,t){var n=t||this,i=n.xPercent,r=n.yPercent,s=n.x,o=n.y,a=n.z,c=n.rotation,l=n.rotationY,u=n.rotationX,f=n.skewX,d=n.skewY,p=n.scaleX,m=n.scaleY,_=n.transformPerspective,g=n.force3D,h=n.target,y=n.zOrigin,x="",v=g==="auto"&&e&&e!==1||g===!0;if(y&&(u!==Rr||l!==Rr)){var C=parseFloat(l)*ks,T=Math.sin(C),A=Math.cos(C),P;C=parseFloat(u)*ks,P=Math.cos(C),s=Vl(h,s,T*P*-y),o=Vl(h,o,-Math.sin(C)*-y),a=Vl(h,a,A*P*-y+y)}_!==yo&&(x+="perspective("+_+Pr),(i||r)&&(x+="translate("+i+"%, "+r+"%) "),(v||s!==yo||o!==yo||a!==yo)&&(x+=a!==yo||v?"translate3d("+s+", "+o+", "+a+") ":"translate("+s+", "+o+Pr),c!==Rr&&(x+="rotate("+c+Pr),l!==Rr&&(x+="rotateY("+l+Pr),u!==Rr&&(x+="rotateX("+u+Pr),(f!==Rr||d!==Rr)&&(x+="skew("+f+", "+d+Pr),(p!==1||m!==1)&&(x+="scale("+p+", "+m+Pr),h.style[Ie]=x||"translate(0, 0)"},VR=function(e,t){var n=t||this,i=n.xPercent,r=n.yPercent,s=n.x,o=n.y,a=n.rotation,c=n.skewX,l=n.skewY,u=n.scaleX,f=n.scaleY,d=n.target,p=n.xOrigin,m=n.yOrigin,_=n.xOffset,g=n.yOffset,h=n.forceCSS,y=parseFloat(s),x=parseFloat(o),v,C,T,A,P;a=parseFloat(a),c=parseFloat(c),l=parseFloat(l),l&&(l=parseFloat(l),c+=l,a+=l),a||c?(a*=ks,c*=ks,v=Math.cos(a)*u,C=Math.sin(a)*u,T=Math.sin(a-c)*-f,A=Math.cos(a-c)*f,c&&(l*=ks,P=Math.tan(c-l),P=Math.sqrt(1+P*P),T*=P,A*=P,l&&(P=Math.tan(l),P=Math.sqrt(1+P*P),v*=P,C*=P)),v=Fe(v),C=Fe(C),T=Fe(T),A=Fe(A)):(v=u,A=f,C=T=0),(y&&!~(s+"").indexOf("px")||x&&!~(o+"").indexOf("px"))&&(y=vr(d,"x",s,"px"),x=vr(d,"y",o,"px")),(p||m||_||g)&&(y=Fe(y+p-(p*v+m*T)+_),x=Fe(x+m-(p*C+m*A)+g)),(i||r)&&(P=d.getBBox(),y=Fe(y+i/100*P.width),x=Fe(x+r/100*P.height)),P="matrix("+v+","+C+","+T+","+A+","+y+","+x+")",d.setAttribute("transform",P),h&&(d.style[Ie]=P)},$R=function(e,t,n,i,r){var s=360,o=qe(r),a=parseFloat(r)*(o&&~r.indexOf("rad")?Ur:1),c=a-i,l=i+c+"deg",u,f;return o&&(u=r.split("_")[1],u==="short"&&(c%=s,c!==c%(s/2)&&(c+=c<0?s:-s)),u==="cw"&&c<0?c=(c+s*yp)%s-~~(c/s)*s:u==="ccw"&&c>0&&(c=(c-s*yp)%s-~~(c/s)*s)),e._pt=f=new xn(e._pt,t,n,i,c,TR),f.e=l,f.u="deg",e._props.push(n),f},Ap=function(e,t){for(var n in t)e[n]=t[n];return e},HR=function(e,t,n){var i=Ap({},n._gsap),r="perspective,force3D,transformOrigin,svgOrigin",s=n.style,o,a,c,l,u,f,d,p;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),s[Ie]=t,o=Jo(n,1),ns(n,Ie),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Ie],s[Ie]=t,o=Jo(n,1),s[Ie]=c);for(a in Gi)c=i[a],l=o[a],c!==l&&r.indexOf(a)<0&&(d=an(c),p=an(l),u=d!==p?vr(n,a,c,p):parseFloat(c),f=parseFloat(l),e._pt=new xn(e._pt,o,a,u,f-u,of),e._pt.u=p||0,e._props.push(a));Ap(o,i)};vn("padding,margin,Width,Radius",function(e,t){var n="Top",i="Right",r="Bottom",s="Left",o=(t<3?[n,i,r,s]:[n+s,n+i,r+i,r+s]).map(function(a){return t<2?e+a:"border"+a+e});Sc[t>1?"border"+e:e]=function(a,c,l,u,f){var d,p;if(arguments.length<4)return d=o.map(function(m){return Di(a,m,l)}),p=d.join(" "),p.split(d[0]).length===5?d[0]:p;d=(u+"").split(" "),p={},o.forEach(function(m,_){return p[m]=d[_]=d[_]||d[(_-1)/2|0]}),a.init(c,p,f)}});var E_={name:"css",register:cf,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,r){var s=this._props,o=e.style,a=n.vars.startAt,c,l,u,f,d,p,m,_,g,h,y,x,v,C,T,A;rd||cf(),this.styles=this.styles||g_(e),A=this.styles.props,this.tween=n;for(m in t)if(m!=="autoRound"&&(l=t[m],!(An[m]&&s_(m,t,n,i,e,r)))){if(d=typeof l,p=Sc[m],d==="function"&&(l=l.call(n,i,e,r),d=typeof l),d==="string"&&~l.indexOf("random(")&&(l=Zo(l)),p)p(this,e,m,l,n)&&(T=1);else if(m.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(m)+"").trim(),l+="",pr.lastIndex=0,pr.test(c)||(_=an(c),g=an(l)),g?_!==g&&(c=vr(e,m,c,g)+g):_&&(l+=_),this.add(o,"setProperty",c,l,i,r,0,0,m),s.push(m),A.push(m,0,o[m]);else if(d!=="undefined"){if(a&&m in a?(c=typeof a[m]=="function"?a[m].call(n,i,e,r):a[m],qe(c)&&~c.indexOf("random(")&&(c=Zo(c)),an(c+"")||c==="auto"||(c+=Ln.units[m]||an(Di(e,m))||""),(c+"").charAt(1)==="="&&(c=Di(e,m))):c=Di(e,m),f=parseFloat(c),h=d==="string"&&l.charAt(1)==="="&&l.substr(0,2),h&&(l=l.substr(2)),u=parseFloat(l),m in pi&&(m==="autoAlpha"&&(f===1&&Di(e,"visibility")==="hidden"&&u&&(f=0),A.push("visibility",0,o.visibility),ur(this,o,"visibility",f?"inherit":"hidden",u?"inherit":"hidden",!u)),m!=="scale"&&m!=="transform"&&(m=pi[m],~m.indexOf(",")&&(m=m.split(",")[0]))),y=m in Gi,y){if(this.styles.save(m),d==="string"&&l.substring(0,6)==="var(--"&&(l=Gn(e,l.substring(4,l.indexOf(")"))),u=parseFloat(l)),x||(v=e._gsap,v.renderTransform&&!t.parseTransform||Jo(e,t.parseTransform),C=t.smoothOrigin!==!1&&v.smooth,x=this._pt=new xn(this._pt,o,Ie,0,1,v.renderTransform,v,0,-1),x.dep=1),m==="scale")this._pt=new xn(this._pt,v,"scaleY",v.scaleY,(h?zs(v.scaleY,h+u):u)-v.scaleY||0,of),this._pt.u=0,s.push("scaleY",m),m+="X";else if(m==="transformOrigin"){A.push(yn,0,o[yn]),l=zR(l),v.svg?lf(e,l,0,C,0,this):(g=parseFloat(l.split(" ")[2])||0,g!==v.zOrigin&&ur(this,v,"zOrigin",v.zOrigin,g),ur(this,o,m,Mc(c),Mc(l)));continue}else if(m==="svgOrigin"){lf(e,l,1,C,0,this);continue}else if(m in y_){$R(this,v,m,f,h?zs(f,h+l):l);continue}else if(m==="smoothOrigin"){ur(this,v,"smooth",v.smooth,l);continue}else if(m==="force3D"){v[m]=l;continue}else if(m==="transform"){HR(this,l,e);continue}}else m in o||(m=to(m)||m);if(y||(u||u===0)&&(f||f===0)&&!bR.test(l)&&m in o)_=(c+"").substr((f+"").length),u||(u=0),g=an(l)||(m in Ln.units?Ln.units[m]:_),_!==g&&(f=vr(e,m,c,g)),this._pt=new xn(this._pt,y?v:o,m,f,(h?zs(f,h+u):u)-f,!y&&(g==="px"||m==="zIndex")&&t.autoRound!==!1?AR:of),this._pt.u=g||0,_!==g&&g!=="%"&&(this._pt.b=c,this._pt.r=wR);else if(m in o)FR.call(this,e,m,c,h?h+l:l);else if(m in e)this.add(e,m,c||e[m],h?h+l:l,i,r);else if(m!=="parseTransform"){Zf(m,l);continue}y||(m in o?A.push(m,0,o[m]):typeof e[m]=="function"?A.push(m,2,e[m]()):A.push(m,1,c||e[m])),s.push(m)}}T&&f_(this)},render:function(e,t){if(t.tween._time||!sd())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Di,aliases:pi,getSetter:function(e,t,n){var i=pi[t];return i&&i.indexOf(",")<0&&(t=i),t in Gi&&t!==yn&&(e._gsap.x||Di(e,"x"))?n&&xp===n?t==="scale"?IR:PR:(xp=n||{})&&(t==="scale"?DR:LR):e.style&&!Wf(e.style[t])?CR:~t.indexOf("-")?RR:nd(e,t)},core:{_removeProperty:ns,_getMatrix:ad}};Sn.utils.checkPrefix=to;Sn.core.getStyleSaver=g_;(function(e,t,n,i){var r=vn(e+","+t+","+n,function(s){Gi[s]=1});vn(t,function(s){Ln.units[s]="deg",y_[s]=1}),pi[r[13]]=e+","+t,vn(i,function(s){var o=s.split(":");pi[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");vn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(e){Ln.units[e]="px"});Sn.registerPlugin(E_);var le=Sn.registerPlugin(E_)||Sn;le.core.Tween;var is=(e=>(e[e.Dynamic=0]="Dynamic",e[e.Fixed=1]="Fixed",e[e.KinematicPositionBased=2]="KinematicPositionBased",e[e.KinematicVelocityBased=3]="KinematicVelocityBased",e))(is||{});const GR=At({gravityX:w.f32,gravityY:w.f32,gravityZ:w.f32}),Et=At({type:w.ui8,mass:w.f32,linearDamping:w.f32,angularDamping:w.f32,gravityScale:w.f32,ccd:w.ui8,lockRotX:w.ui8,lockRotY:w.ui8,lockRotZ:w.ui8,posX:w.f32,posY:w.f32,posZ:w.f32,rotX:w.f32,rotY:w.f32,rotZ:w.f32,rotW:w.f32,eulerX:w.f32,eulerY:w.f32,eulerZ:w.f32,velX:w.f32,velY:w.f32,velZ:w.f32,rotVelX:w.f32,rotVelY:w.f32,rotVelZ:w.f32}),WR=At({shape:w.ui8,sizeX:w.f32,sizeY:w.f32,sizeZ:w.f32,radius:w.f32,height:w.f32,friction:w.f32,restitution:w.f32,density:w.f32,isSensor:w.ui8,membershipGroups:w.ui16,filterGroups:w.ui16,posOffsetX:w.f32,posOffsetY:w.f32,posOffsetZ:w.f32,rotOffsetX:w.f32,rotOffsetY:w.f32,rotOffsetZ:w.f32,rotOffsetW:w.f32}),b_=At({offset:w.f32,maxSlope:w.f32,maxSlide:w.f32,snapDist:w.f32,autoStep:w.ui8,maxStepHeight:w.f32,minStepWidth:w.f32,upX:w.f32,upY:w.f32,upZ:w.f32,moveX:w.f32,moveY:w.f32,moveZ:w.f32,grounded:w.ui8,platform:w.eid,platformVelX:w.f32,platformVelY:w.f32,platformVelZ:w.f32}),XR=At({desiredVelX:w.f32,desiredVelY:w.f32,desiredVelZ:w.f32,velocityY:w.f32,actualMoveX:w.f32,actualMoveY:w.f32,actualMoveZ:w.f32}),YR=At({prevPosX:w.f32,prevPosY:w.f32,prevPosZ:w.f32,prevRotX:w.f32,prevRotY:w.f32,prevRotZ:w.f32,prevRotW:w.f32,posX:w.f32,posY:w.f32,posZ:w.f32,rotX:w.f32,rotY:w.f32,rotZ:w.f32,rotW:w.f32});At({activeEvents:w.ui8});const ZR=At({other:w.ui32,handle1:w.ui32,handle2:w.ui32}),qR=At({other:w.ui32,handle1:w.ui32,handle2:w.ui32}),Sr={x:w.f32,y:w.f32,z:w.f32},jR={x:w.f32,y:w.f32,z:w.f32,w:w.f32},KR=At(Sr),JR=At(Sr),QR=At(Sr),t2=At(Sr),uf=At(Sr),ff=At(Sr),e2=At(Sr),n2=At(jR);At(Sr);is.Fixed;is.Dynamic;is.KinematicVelocityBased;St([YR]);St([GR]);St([Et]);St([WR]);St([b_]);St([b_,XR,Et,ct]);St([KR,Et]);St([JR,Et]);St([QR,Et]);St([t2,Et]);St([uf,Et]);St([ff,Et]);St([e2,Et]);St([n2,Et]);St([ZR]);St([qR]);const Zc={linear:"linear","sine-in":"sineIn","sine-out":"sineOut","sine-in-out":"sineInOut","quad-in":"quadIn","quad-out":"quadOut","quad-in-out":"quadInOut","cubic-in":"cubicIn","cubic-out":"cubicOut","cubic-in-out":"cubicInOut","quart-in":"quartIn","quart-out":"quartOut","quart-in-out":"quartInOut","expo-in":"expoIn","expo-out":"expoOut","expo-in-out":"expoInOut","circ-in":"circIn","circ-out":"circOut","circ-in-out":"circInOut","back-in":"backIn","back-out":"backOut","back-in-out":"backInOut","elastic-in":"elasticIn","elastic-out":"elasticOut","elastic-in-out":"elasticInOut","bounce-in":"bounceIn","bounce-out":"bounceOut","bounce-in-out":"bounceInOut"},Cp={linear:e=>e,sineIn:e=>le.parseEase("power1.in")(e),sineOut:e=>le.parseEase("power1.out")(e),sineInOut:e=>le.parseEase("power1.inOut")(e),quadIn:e=>le.parseEase("power2.in")(e),quadOut:e=>le.parseEase("power2.out")(e),quadInOut:e=>le.parseEase("power2.inOut")(e),cubicIn:e=>le.parseEase("power3.in")(e),cubicOut:e=>le.parseEase("power3.out")(e),cubicInOut:e=>le.parseEase("power3.inOut")(e),quartIn:e=>le.parseEase("power4.in")(e),quartOut:e=>le.parseEase("power4.out")(e),quartInOut:e=>le.parseEase("power4.inOut")(e),expoIn:e=>le.parseEase("expo.in")(e),expoOut:e=>le.parseEase("expo.out")(e),expoInOut:e=>le.parseEase("expo.inOut")(e),circIn:e=>le.parseEase("circ.in")(e),circOut:e=>le.parseEase("circ.out")(e),circInOut:e=>le.parseEase("circ.inOut")(e),backIn:e=>le.parseEase("back.in")(e),backOut:e=>le.parseEase("back.out")(e),backInOut:e=>le.parseEase("back.inOut")(e),elasticIn:e=>le.parseEase("elastic.in")(e),elasticOut:e=>le.parseEase("elastic.out")(e),elasticInOut:e=>le.parseEase("elastic.inOut")(e),bounceIn:e=>le.parseEase("bounce.in")(e),bounceOut:e=>le.parseEase("bounce.out")(e),bounceInOut:e=>le.parseEase("bounce.inOut")(e)};function Qo(e,t){const n=Cp[t];return n?n(e):(console.warn(`Unknown easing key "${t}", falling back to linear`),Cp.linear(e))}function er(e){return e*(Math.PI/180)}function Zr(e,t,n){const[i,r]=e.split(".");if(!i||!r)return null;const s=n.getComponent(i);if(!s||!n.hasComponent(t,s))return null;const o=xf(r),a=s[o];return a instanceof Float32Array?{component:s,field:o,array:a}:null}function Ts(e,t){return e===void 0?Array.isArray(t)?t:[t]:Array.isArray(e)?e:[e]}function T_(e,t,n,i){const r=[];if(e==="rotation"){const s=Ts(t.to,[0,0,0]),o=["eulerX","eulerY","eulerZ"],a=i.hasComponent(n,Et)?"body":"transform";for(let c=0;c<o.length;c++){const l=Zr(`${a}.${o[c]}`,n,i),u=l?l.array[n]:0,f=t.from!==void 0?Ts(t.from,[0,0,0])[c]??u:u;r.push({field:`${a}.${o[c]}`,from:f,to:s[c]||0})}}else if(e==="at"){const s=Ts(t.to,[0,0,0]),o=["posX","posY","posZ"];for(let a=0;a<o.length;a++){const c=Zr(`transform.${o[a]}`,n,i),l=c?c.array[n]:0,u=t.from!==void 0?Ts(t.from,[0,0,0])[a]??l:l;r.push({field:`transform.${o[a]}`,from:u,to:s[a]||0})}}else if(e==="scale"){const s=Ts(t.to,[1,1,1]),o=["scaleX","scaleY","scaleZ"];for(let a=0;a<o.length;a++){const c=Zr(`transform.${o[a]}`,n,i),l=c?c.array[n]:1,u=t.from!==void 0?Ts(t.from,[1,1,1])[a]??l:l;r.push({field:`transform.${o[a]}`,from:u,to:s[a]??1})}}return r}const i2=Object.values(Zc),w_=new Map;i2.forEach((e,t)=>w_.set(e,t));const eo=new Map,cd=new Map,ta=new Map;function r2(e,t){e.hasComponent(t,te)&&(te.state[t]=$i.Playing)}function s2(e,t){if(!e.hasComponent(t,te))return;te.state[t]=$i.Idle;const n=ta.get(t);if(n){for(const i of n)e.exists(i)&&e.destroyEntity(i);n.clear()}}function o2(e,t){s2(e,t),te.currentIndex[t]=0,te.pauseRemaining[t]=0}function a2(e,t){if(!e.hasComponent(t,te)||te.state[t]!==$i.Playing)return;const n=ta.get(t);if(n){for(const r of n)l2(e,r),e.exists(r)&&e.destroyEntity(r);n.clear()}const i=cd.get(t);if(i){const r=te.currentIndex[t];for(let s=r;s<i.length;s++){const o=i[s];o.type==="tween"&&o.target!==void 0&&o.attr&&u2(e,o.target,o.attr,o.to??0)}}te.state[t]=$i.Idle,te.currentIndex[t]=0,te.pauseRemaining[t]=0}const c2=St([fe]);function l2(e,t){const n=[];for(const i of c2(e.world)){if(fe.source[i]!==t)continue;const r=fe.target[i],s=eo.get(i);s&&r<s.length&&(s[r]=fe.to[i]),eo.delete(i),n.push(i)}for(const i of n)e.destroyEntity(i)}function u2(e,t,n,i){const r=T_(n,{to:i},t,e);if(r.length>0)for(const s of r){const o=Zr(s.field,t,e);o&&(o.array[t]=s.to)}else{const s=Zr(n,t,e);s&&(s.array[t]=typeof i=="number"?i:i[0])}}function A_(e,t,n,i){const r=e.createEntity();e.addComponent(r,We),We.duration[r]=i.duration??1,We.elapsed[r]=0;const s=i.easing?Zc[i.easing]||i.easing:"linear";We.easingIndex[r]=w_.get(s)??0;const o=T_(n,i,t,e);if(o.length>0)for(const a of o){const c=Zr(a.field,t,e);if(!c)continue;const l=e.hasComponent(t,Et)&&Et.type[t]===is.KinematicVelocityBased,u=c.array===Et.posX||c.array===Et.posY||c.array===Et.posZ,f=c.array===Et.eulerX||c.array===Et.eulerY||c.array===Et.eulerZ;if(l&&u){const d=e.createEntity();e.addComponent(d,Me);let p=0;c.array===Et.posY?p=1:c.array===Et.posZ&&(p=2);const m=c.array[t];Me.tweenEntity[d]=r,Me.targetEntity[d]=t,Me.axis[d]=p,Me.from[d]=a.from,Me.to[d]=a.to,Me.lastPosition[d]=m,Me.targetPosition[d]=a.from}else if(l&&f){const d=e.createEntity();e.addComponent(d,Ee);let p=0;c.array===Et.eulerY?p=1:c.array===Et.eulerZ&&(p=2);const m=c.array[t];Ee.tweenEntity[d]=r,Ee.targetEntity[d]=t,Ee.axis[d]=p,Ee.from[d]=er(a.from),Ee.to[d]=er(a.to),Ee.lastRotation[d]=er(m),Ee.targetRotation[d]=er(a.from)}else{const d=e.createEntity();e.addComponent(d,fe),fe.source[d]=r,fe.target[d]=t,fe.componentId[d]=0,fe.fieldIndex[d]=0,fe.from[d]=a.from,fe.to[d]=a.to,fe.value[d]=a.from,eo.set(d,c.array)}}else{const a=Zr(n,t,e);if(!a)return null;const c=a.array[t],l=typeof i.from=="number"?i.from:i.from?.[0]??c,u=typeof i.to=="number"?i.to:i.to[0],f=e.hasComponent(t,Et)&&Et.type[t]===is.KinematicVelocityBased,d=a.array===Et.posX||a.array===Et.posY||a.array===Et.posZ,p=a.array===Et.eulerX||a.array===Et.eulerY||a.array===Et.eulerZ;if(f&&d){const m=e.createEntity();e.addComponent(m,Me);let _=0;a.array===Et.posY?_=1:a.array===Et.posZ&&(_=2),Me.tweenEntity[m]=r,Me.targetEntity[m]=t,Me.axis[m]=_,Me.from[m]=l,Me.to[m]=u,Me.lastPosition[m]=c,Me.targetPosition[m]=l}else if(f&&p){const m=e.createEntity();e.addComponent(m,Ee);let _=0;a.array===Et.eulerY?_=1:a.array===Et.eulerZ&&(_=2),Ee.tweenEntity[m]=r,Ee.targetEntity[m]=t,Ee.axis[m]=_,Ee.from[m]=er(l),Ee.to[m]=er(u),Ee.lastRotation[m]=er(c),Ee.targetRotation[m]=er(l)}else{const m=e.createEntity();e.addComponent(m,fe),fe.source[m]=r,fe.target[m]=t,fe.componentId[m]=0,fe.fieldIndex[m]=0,fe.from[m]=l,fe.to[m]=u,fe.value[m]=l,eo.set(m,a.array)}}return r}const Rp=Object.keys(Zc);function C_(e,t){if(e&&!Rp.includes(e))throw new Error(Kp(t,"easing",e,Rp))}function Ec(e){return typeof e=="number"?e:typeof e=="string"?parseFloat(e)||0:typeof e=="boolean"&&e?1:0}function bc(e){if(typeof e=="number")return e;if(typeof e=="object"&&e!==null){const t=e;if("x"in t||"y"in t||"z"in t)return[t.x||0,t.y||0,t.z||0]}return Ec(e)}const f2=({element:e,state:t,context:n})=>{if(e.tagName!=="tween")return;const i=e.attributes.target;if(!i)throw new Error(`[Tween] Missing required attribute "target".
  Tweens must specify which entity to animate using the target attribute.
  Example: <tween target="my-cube" attr="transform.pos-x" to="10"></tween>`);const r=n.getEntityByName(i);if(r===null)throw new Error(`[Tween] Could not find entity with name "${i}".
  Make sure the target entity has a name attribute that matches.
  Example: <entity name="my-cube" transform=""></entity>`);const s=e.attributes.attr;if(!s)throw new Error(`[Tween] Missing required attribute "attr".
  Tweens must specify which property to animate.
  Example: <tween target="my-cube" attr="transform.pos-x" to="10"></tween>`);const o=e.attributes.to;if(o==null)throw new Error(`[Tween] Missing required attribute "to".
  Tweens must specify the target value.
  Example: <tween target="my-cube" attr="transform.pos-x" to="10"></tween>`);const a=e.attributes.easing;C_(a,"tween");const c={from:e.attributes.from!==void 0?bc(e.attributes.from):void 0,to:bc(o),duration:Ec(e.attributes.duration||1),easing:a};if(!A_(t,r,s,c))throw new Error(`[Tween] Could not resolve tween target property: ${s}`)},d2=({element:e,state:t,context:n})=>{if(e.tagName!=="sequence")return;const i=t.createEntity();t.addComponent(i,te);const r=e.attributes.name,s=e.attributes.autoplay;r&&n.setName(r,i);const o=[];for(const a of e.children)if(a.tagName==="tween"){const c=a.attributes.target;if(!c)throw new Error('[Sequence] Tween missing "target" attribute');const l=n.getEntityByName(c);if(l===null)throw new Error(`[Sequence] Target "${c}" not found`);const u=a.attributes.attr;if(!u)throw new Error('[Sequence] Tween missing "attr" attribute');const f=a.attributes.to;if(f==null)throw new Error('[Sequence] Tween missing "to" attribute');const d=a.attributes.easing;C_(d,"sequence > tween"),o.push({type:"tween",target:l,attr:u,from:a.attributes.from!==void 0?bc(a.attributes.from):void 0,to:bc(f),duration:Ec(a.attributes.duration||1),easing:d})}else a.tagName==="pause"&&o.push({type:"pause",duration:Ec(a.attributes.duration||0)});cd.set(i,o),te.state[i]=s?$i.Playing:$i.Idle,te.currentIndex[i]=0,te.itemCount[i]=o.length,te.pauseRemaining[i]=0},ld=Object.values(Zc),h2=St([We]),Pp=St([fe]),p2=St([Me]),m2=St([Ee]),g2=St([te]),_2=180/Math.PI,v2={x:Et.posX,y:Et.posY,z:Et.posZ},x2={x:Et.eulerX,y:Et.eulerY,z:Et.eulerZ},y2={x:Et.velX,y:Et.velY,z:Et.velZ},S2={x:Et.rotVelX,y:Et.rotVelY,z:Et.rotVelZ};function Tc(e,t){return t===0?e.x:t===1?e.y:e.z}function R_(e,t,n,i){e.hasComponent(t,n)||(e.addComponent(t,n),n.x[t]=i.x[t],n.y[t]=i.y[t],n.z[t]=i.z[t])}function M2(e,t,n,i,r){if(!e.hasComponent(t,We))return{position:i,velocity:0,done:!0};const s=We.duration[t],o=We.elapsed[t],a=o/s;if(a>=1)return{position:i,velocity:0,done:!0};const c=ld[We.easingIndex[t]]||"linear",l=Qo(a,c),u=Ho(n,i,l),f=Qo(Math.min((o+r)/s,1),c),d=(Ho(n,i,f)-u)/r;return{position:u,velocity:d,done:!1}}function E2(e){return e>Math.PI?e-2*Math.PI:e<-Math.PI?e+2*Math.PI:e}function b2(e,t,n,i,r){if(!e.hasComponent(t,We))return{rotation:i,angularVelocity:0,done:!0};const s=We.duration[t],o=We.elapsed[t],a=o/s;if(a>=1)return{rotation:i,angularVelocity:0,done:!0};const c=ld[We.easingIndex[t]]||"linear",l=Qo(a,c),u=Ho(n,i,l),f=Qo(Math.min((o+r)/s,1),c),d=Ho(n,i,f),p=E2(d-u)/r;return{rotation:u,angularVelocity:p,done:!1}}const P_={group:"fixed",first:!0,update(e){const t=e.time.fixedDeltaTime,n=[];for(const i of p2(e.world)){const r=Me.targetEntity[i];if(!e.hasComponent(r,Et)){n.push(i);continue}const s=Me.axis[i],{position:o,velocity:a,done:c}=M2(e,Me.tweenEntity[i],Me.from[i],Me.to[i],t);Tc(v2,s)[r]=o,R_(e,r,uf,y2),Tc(uf,s)[r]=a,Me.lastPosition[i]=o,Me.targetPosition[i]=o,c&&n.push(i)}for(const i of n)e.destroyEntity(i)}},T2={group:"fixed",after:[P_],update(e){const t=e.time.fixedDeltaTime,n=[];for(const i of m2(e.world)){const r=Ee.targetEntity[i];if(!e.hasComponent(r,Et)){n.push(i);continue}const s=Ee.axis[i],{rotation:o,angularVelocity:a,done:c}=b2(e,Ee.tweenEntity[i],Ee.from[i],Ee.to[i],t);Tc(x2,s)[r]=o*_2,R_(e,r,ff,S2),Tc(ff,s)[r]=a,Ee.lastRotation[i]=o,Ee.targetRotation[i]=o,c&&n.push(i)}for(const i of n)e.destroyEntity(i)}},I_={group:"simulation",update(e){const t=e.time.deltaTime,n=new Set;for(const i of h2(e.world)){We.elapsed[i]+=t;const r=We.elapsed[i]/We.duration[i];r>=1&&n.add(i);const s=ld[We.easingIndex[i]]||"linear",o=Qo(Math.min(r,1),s);for(const a of Pp(e.world)){if(fe.source[a]!==i)continue;const c=fe.target[a],l=eo.get(a);if(e.hasComponent(c,Et)&&Et.type[c]===is.KinematicVelocityBased&&l&&(l===Et.posX||l===Et.posY||l===Et.posZ||l===Et.eulerX||l===Et.eulerY||l===Et.eulerZ))continue;const u=Ho(fe.from[a],fe.to[a],o);fe.value[a]=u,l&&c<l.length&&(l[c]=u)}}for(const i of Pp(e.world))n.has(fe.source[i])&&(eo.delete(i),e.destroyEntity(i));for(const i of n)e.destroyEntity(i)}};function $l(e,t){const n=cd.get(t);if(!n)return;let i=te.currentIndex[t];if(i>=n.length)return;let r=ta.get(t);for(r||(r=new Set,ta.set(t,r));i<n.length;){const s=n[i];if(s.type==="pause"){te.pauseRemaining[t]=s.duration,te.currentIndex[t]=i;return}if(s.target!==void 0&&s.attr){const o=A_(e,s.target,s.attr,{from:s.from,to:s.to??0,duration:s.duration,easing:s.easing});o&&r.add(o)}i++}te.currentIndex[t]=i}const w2={group:"simulation",after:[I_],update(e){const t=e.time.deltaTime;for(const n of g2(e.world)){if(te.state[n]!==$i.Playing)continue;const i=te.pauseRemaining[n];if(i>0){te.pauseRemaining[n]=i-t,te.pauseRemaining[n]<=0&&(te.currentIndex[n]++,$l(e,n));continue}const r=ta.get(n);if(r&&r.size>0){for(const s of r)e.hasComponent(s,We)||r.delete(s);if(r.size>0)continue;$l(e,n);continue}if(te.currentIndex[n]>=te.itemCount[n]){te.state[n]=$i.Idle,te.currentIndex[n]=0,te.pauseRemaining[n]=0;continue}$l(e,n)}}},A2={systems:[P_,T2,I_,w2],components:{Tween:We,TweenValue:fe,KinematicTween:Me,KinematicRotationTween:Ee,Sequence:te},recipes:[{name:"tween",components:[]},{name:"sequence",components:[]}],config:{parsers:{tween:f2,sequence:d2}}},Ht=At({target:w.eid,inputSource:w.eid,currentYaw:w.f32,currentPitch:w.f32,currentDistance:w.f32,targetYaw:w.f32,targetPitch:w.f32,targetDistance:w.f32,minDistance:w.f32,maxDistance:w.f32,minPitch:w.f32,maxPitch:w.f32,smoothness:w.f32,offsetX:w.f32,offsetY:w.f32,offsetZ:w.f32,sensitivity:w.f32,zoomSensitivity:w.f32}),C2={name:"orbit-camera",components:["orbit-camera","transform","main-camera"]},Fo=Math.PI*2;function R2(e){return(e%Fo+Fo)%Fo}function P2(e,t){let n=t-e;for(;n>Math.PI;)n-=Fo;for(;n<-Math.PI;)n+=Fo;return n}function I2(e,t){return 1-Math.pow(1-e,t*60)}function D2(e,t){const n=I2(Ht.smoothness[e],t),i=P2(Ht.currentYaw[e],Ht.targetYaw[e]);Ht.currentYaw[e]+=i*n,Ht.currentYaw[e]=R2(Ht.currentYaw[e]),Ht.currentPitch[e]+=(Ht.targetPitch[e]-Ht.currentPitch[e])*n,Ht.currentDistance[e]+=(Ht.targetDistance[e]-Ht.currentDistance[e])*n}function L2(e,t){const n=Ht.currentDistance[e],i=Ht.currentYaw[e],r=Math.PI/2-Ht.currentPitch[e],s=new ub(n,r,i);return new O().setFromSpherical(s).add(t)}function U2(e,t,n){ct.posX[e]=t.x,ct.posY[e]=t.y,ct.posZ[e]=t.z;const i=new ne;i.lookAt(t,n,new O(0,1,0));const r=new xi().setFromRotationMatrix(i);ct.rotX[e]=r.x,ct.rotY[e]=r.y,ct.rotZ[e]=r.z,ct.rotW[e]=r.w,Vf(ct,e)}const D_=St([Ht,ct]),N2=St([Ht]),O2=St([be]),F2={group:"setup",update:e=>{const t=D_(e.world);for(const n of t){if(Ht.target[n]===0){const i=e.createEntity();e.addComponent(i,ct,{scaleX:1,scaleY:1,scaleZ:1}),Ht.target[n]=i}if(Ht.inputSource[n]===0){const i=O2(e.world);if(i.length>0)Ht.inputSource[n]=i[0];else{const r=e.createEntity();e.addComponent(r,be),Ht.inputSource[n]=r}}}}},z2={group:"simulation",update:e=>{const t=N2(e.world);for(const n of t){let i=Ht.inputSource[n];if(!i&&e.hasComponent(n,be)&&(i=n,Ht.inputSource[n]=n),!i||!e.hasComponent(i,be))continue;const r=Ht.sensitivity[n],s=Ht.zoomSensitivity[n],o=be.lookX[i],a=be.lookY[i],c=be.scrollDelta[i];if(be.rightMouse[i]===1){Ht.targetYaw[n]-=o*r;const l=Ht.targetPitch[n]+a*r,u=Ht.minPitch[n],f=Ht.maxPitch[n];Ht.targetPitch[n]=Math.max(u,Math.min(f,l))}if(c!==0){const l=Ht.targetDistance[n],u=Ht.minDistance[n],f=Ht.maxDistance[n],d=Math.max(.3,l*.08),p=c*s*d,m=l+p;Ht.targetDistance[n]=Math.max(u,Math.min(f,m))}}}},B2={group:"draw",update:e=>{const t=D_(e.world);for(const n of t){const i=Ht.target[n];if(!i||!e.hasComponent(i,ht))continue;D2(n,e.time.deltaTime);const r=new O(ht.posX[i]+Ht.offsetX[n],ht.posY[i]+Ht.offsetY[n],ht.posZ[i]+Ht.offsetZ[n]),s=L2(n,r);U2(n,s,r)}}},k2={systems:[F2,z2,B2],recipes:[C2],components:{OrbitCamera:Ht},config:{defaults:{"orbit-camera":{target:0,inputSource:0,currentDistance:4,targetDistance:4,currentYaw:0,targetYaw:0,currentPitch:Math.PI/6,targetPitch:Math.PI/6,minDistance:1,maxDistance:25,minPitch:0,maxPitch:Math.PI/2,smoothness:.5,offsetX:0,offsetY:1.25,offsetZ:0,sensitivity:.007,zoomSensitivity:1.5}}}},V2={systems:[AC],components:{InputState:be}},Ip=new yi,Ya=new O;class L_ extends lb{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],n=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new Dn(t,3)),this.setAttribute("uv",new Dn(n,2))}applyMatrix4(t){const n=this.attributes.instanceStart,i=this.attributes.instanceEnd;return n!==void 0&&(n.applyMatrix4(t),i.applyMatrix4(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let n;t instanceof Float32Array?n=t:Array.isArray(t)&&(n=new Float32Array(t));const i=new ku(n,6,1);return this.setAttribute("instanceStart",new or(i,3,0)),this.setAttribute("instanceEnd",new or(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let n;t instanceof Float32Array?n=t:Array.isArray(t)&&(n=new Float32Array(t));const i=new ku(n,6,1);return this.setAttribute("instanceColorStart",new or(i,3,0)),this.setAttribute("instanceColorEnd",new or(i,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new sb(t.geometry)),this}fromLineSegments(t){const n=t.geometry;return this.setPositions(n.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yi);const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;t!==void 0&&n!==void 0&&(this.boundingBox.setFromBufferAttribute(t),Ip.setFromBufferAttribute(n),this.boundingBox.union(Ip))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new rs),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;if(t!==void 0&&n!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)Ya.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(Ya)),Ya.fromBufferAttribute(n,s),r=Math.max(r,i.distanceToSquared(Ya));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}}it.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new re(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};mn.line={uniforms:Pf.merge([it.common,it.fog,it.line]),vertexShader:`
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
		`};class U_ extends Vi{static get type(){return"LineMaterial"}constructor(t){super({uniforms:Pf.clone(mn.line.uniforms),vertexShader:mn.line.vertexShader,fragmentShader:mn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Hl=new pe,Dp=new O,Lp=new O,Ke=new pe,Je=new pe,oi=new pe,Gl=new O,Wl=new ne,Qe=new fb,Up=new O,Za=new yi,qa=new rs,ai=new pe;let fi,qr;function Np(e,t,n){return ai.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),ai.multiplyScalar(1/ai.w),ai.x=qr/n.width,ai.y=qr/n.height,ai.applyMatrix4(e.projectionMatrixInverse),ai.multiplyScalar(1/ai.w),Math.abs(Math.max(ai.x,ai.y))}function $2(e,t){const n=e.matrixWorld,i=e.geometry,r=i.attributes.instanceStart,s=i.attributes.instanceEnd,o=Math.min(i.instanceCount,r.count);for(let a=0,c=o;a<c;a++){Qe.start.fromBufferAttribute(r,a),Qe.end.fromBufferAttribute(s,a),Qe.applyMatrix4(n);const l=new O,u=new O;fi.distanceSqToSegment(Qe.start,Qe.end,u,l),u.distanceTo(l)<qr*.5&&t.push({point:u,pointOnLine:l,distance:fi.origin.distanceTo(u),object:e,face:null,faceIndex:a,uv:null,uv1:null})}}function H2(e,t,n){const i=t.projectionMatrix,s=e.material.resolution,o=e.matrixWorld,a=e.geometry,c=a.attributes.instanceStart,l=a.attributes.instanceEnd,u=Math.min(a.instanceCount,c.count),f=-t.near;fi.at(1,oi),oi.w=1,oi.applyMatrix4(t.matrixWorldInverse),oi.applyMatrix4(i),oi.multiplyScalar(1/oi.w),oi.x*=s.x/2,oi.y*=s.y/2,oi.z=0,Gl.copy(oi),Wl.multiplyMatrices(t.matrixWorldInverse,o);for(let d=0,p=u;d<p;d++){if(Ke.fromBufferAttribute(c,d),Je.fromBufferAttribute(l,d),Ke.w=1,Je.w=1,Ke.applyMatrix4(Wl),Je.applyMatrix4(Wl),Ke.z>f&&Je.z>f)continue;if(Ke.z>f){const x=Ke.z-Je.z,v=(Ke.z-f)/x;Ke.lerp(Je,v)}else if(Je.z>f){const x=Je.z-Ke.z,v=(Je.z-f)/x;Je.lerp(Ke,v)}Ke.applyMatrix4(i),Je.applyMatrix4(i),Ke.multiplyScalar(1/Ke.w),Je.multiplyScalar(1/Je.w),Ke.x*=s.x/2,Ke.y*=s.y/2,Je.x*=s.x/2,Je.y*=s.y/2,Qe.start.copy(Ke),Qe.start.z=0,Qe.end.copy(Je),Qe.end.z=0;const _=Qe.closestPointToPointParameter(Gl,!0);Qe.at(_,Up);const g=k0.lerp(Ke.z,Je.z,_),h=g>=-1&&g<=1,y=Gl.distanceTo(Up)<qr*.5;if(h&&y){Qe.start.fromBufferAttribute(c,d),Qe.end.fromBufferAttribute(l,d),Qe.start.applyMatrix4(o),Qe.end.applyMatrix4(o);const x=new O,v=new O;fi.distanceSqToSegment(Qe.start,Qe.end,v,x),n.push({point:v,pointOnLine:x,distance:fi.origin.distanceTo(v),object:e,face:null,faceIndex:d,uv:null,uv1:null})}}}class G2 extends Vn{constructor(t=new L_,n=new U_({color:Math.random()*16777215})){super(t,n),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,n=t.attributes.instanceStart,i=t.attributes.instanceEnd,r=new Float32Array(2*n.count);for(let o=0,a=0,c=n.count;o<c;o++,a+=2)Dp.fromBufferAttribute(n,o),Lp.fromBufferAttribute(i,o),r[a]=a===0?0:r[a-1],r[a+1]=r[a]+Dp.distanceTo(Lp);const s=new ku(r,2,1);return t.setAttribute("instanceDistanceStart",new or(s,1,0)),t.setAttribute("instanceDistanceEnd",new or(s,1,1)),this}raycast(t,n){const i=this.material.worldUnits,r=t.camera;r===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=t.params.Line2!==void 0&&t.params.Line2.threshold||0;fi=t.ray;const o=this.matrixWorld,a=this.geometry,c=this.material;qr=c.linewidth+s,a.boundingSphere===null&&a.computeBoundingSphere(),qa.copy(a.boundingSphere).applyMatrix4(o);let l;if(i)l=qr*.5;else{const f=Math.max(r.near,qa.distanceToPoint(fi.origin));l=Np(r,f,c.resolution)}if(qa.radius+=l,fi.intersectsSphere(qa)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Za.copy(a.boundingBox).applyMatrix4(o);let u;if(i)u=qr*.5;else{const f=Math.max(r.near,Za.distanceToPoint(fi.origin));u=Np(r,f,c.resolution)}Za.expandByScalar(u),fi.intersectsBox(Za)!==!1&&(i?$2(this,n):H2(this,r,n))}onBeforeRender(t){const n=this.material.uniforms;n&&n.resolution&&(t.getViewport(Hl),this.material.uniforms.resolution.value.set(Hl.z,Hl.w))}}function Xl(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}const Cn=At({endX:w.f32,endY:w.f32,endZ:w.f32,color:w.ui32,visible:w.ui8}),W2=St([Cn,ht]),wc=new WeakMap;function X2(e){let t=wc.get(e);return t||(t={batchedLines:null,batchedGeometry:null,batchedMaterial:null,lastResolution:{width:0,height:0},positionsArray:null,colorsArray:null},wc.set(e,t)),t}const Y2={group:"draw",update(e){const t=Hf(e);if(!t)return;const n=X2(e),i=W2(e.world),r=i.filter(d=>Cn.visible[d]===1).length;if(r===0){n.batchedLines&&(n.batchedLines.visible=!1);return}n.batchedLines||(n.batchedGeometry=new L_,n.batchedMaterial=new U_({vertexColors:!0,worldUnits:!1,linewidth:1.5}),n.batchedLines=new G2(n.batchedGeometry,n.batchedMaterial),n.batchedLines.frustumCulled=!1,t.add(n.batchedLines)),n.batchedLines.visible=!0;const s=window.innerWidth,o=window.innerHeight;(s!==n.lastResolution.width||o!==n.lastResolution.height)&&(n.batchedMaterial.resolution.set(s,o),n.lastResolution={width:s,height:o});const a=r*6,c=r*6;(!n.positionsArray||n.positionsArray.length<a)&&(n.positionsArray=new Float32Array(a)),(!n.colorsArray||n.colorsArray.length<c)&&(n.colorsArray=new Float32Array(c));let l=0;for(const d of i){if(Cn.visible[d]!==1)continue;const p=ht.posX[d],m=ht.posY[d],_=ht.posZ[d],g=Cn.endX[d],h=Cn.endY[d],y=Cn.endZ[d],x=Cn.color[d],v=Xl((x>>16&255)/255),C=Xl((x>>8&255)/255),T=Xl((x&255)/255),A=l*6;n.positionsArray[A]=p,n.positionsArray[A+1]=m,n.positionsArray[A+2]=_,n.positionsArray[A+3]=g,n.positionsArray[A+4]=h,n.positionsArray[A+5]=y,n.colorsArray[A]=v,n.colorsArray[A+1]=C,n.colorsArray[A+2]=T,n.colorsArray[A+3]=v,n.colorsArray[A+4]=C,n.colorsArray[A+5]=T,l++}const u=n.positionsArray.subarray(0,r*6),f=n.colorsArray.subarray(0,r*6);n.batchedGeometry.setPositions(u),n.batchedGeometry.setColors(f)},dispose(e){const t=wc.get(e);t&&(t.batchedGeometry&&t.batchedGeometry.dispose(),t.batchedMaterial&&t.batchedMaterial.dispose(),wc.delete(e))}},Z2={components:{LineRenderer:Cn},systems:[Y2],config:{defaults:{"line-renderer":{endX:0,endY:0,endZ:0,color:0,visible:1}}}},mr=At({parent:w.eid,initialized:w.ui8}),zo=At({radius:w.f32,amplitude:w.f32,global:w.ui8}),N_=St([mr,ct]),q2=St([zo,ct]),j2={group:"setup",update(e){for(const t of N_(e.world)){if(mr.initialized[t])continue;mr.initialized[t]=1;const n=e.hasComponent(t,Ge)?Ge.entity[t]:0,i=e.createEntity();e.addComponent(i,ct,{posX:0,posY:0,posZ:0,scaleX:1,scaleY:1,scaleZ:1}),n&&e.addComponent(i,Ge,{entity:n}),mr.parent[t]=i,Ge.entity[t]=i}}},K2={group:"simulation",update(e){const t=Array.from(q2(e.world));for(const n of N_(e.world)){const i=mr.parent[n];if(!i)continue;const r=ct.posX[n],s=ct.posY[n],o=ct.posZ[n],a=ht.posX[n],c=ht.posY[n],l=ht.posZ[n];let u=0;for(const d of t){const p=zo.global[d],m=zo.amplitude[d];if(p)u+=m;else{const _=ht.posX[d],g=ht.posY[d],h=ht.posZ[d],y=zo.radius[d],x=a-_,v=c-g,C=l-h,T=Math.sqrt(x*x+v*v+C*C),A=y>0?Math.max(0,1-T/y):0;u+=m*A}}const f=1+u;ct.scaleX[i]=f,ct.scaleY[i]=f,ct.scaleZ[i]=f,ct.posX[i]=r*(1-f),ct.posY[i]=s*(1-f),ct.posZ[i]=o*(1-f)}}},$P={components:{ScaleShaker:mr,ScaleShakerDriver:zo},systems:[j2,K2],config:{defaults:{"scale-shaker":{parent:0,initialized:0},"scale-shaker-driver":{radius:2,amplitude:0,global:0}}}},li=At({layerSpacing:w.f32,nodeSpacing:w.f32,depthRows:w.ui8,nodeSize:w.f32,connections:w.f32,initialized:w.ui8}),fa=At({network:w.eid,index:w.ui8,nodeCount:w.ui8,collapse:w.f32}),Vs=At({layer:w.eid,index:w.ui8,originX:w.f32,originY:w.f32,originZ:w.f32}),Vr=At({network:w.eid,layerIndex:w.ui8,startNode:w.eid,endNode:w.eid}),df=[3,5,5,2],J2=St([li,ct]),Q2={group:"setup",update(e){for(const t of J2(e.world)){if(li.initialized[t])continue;li.initialized[t]=1;const n=li.layerSpacing[t]||4,i=li.nodeSpacing[t]||2,r=li.depthRows[t]||1,s=li.nodeSize[t]||.6,o=df.length,c=-((o-1)*n)/2,l=[];for(let u=0;u<o;u++){const f=df[u],p=u>0&&u<o-1?r:1,m=f*p,_=c+u*n,g=e.createEntity();e.addComponent(g,ct,{posX:_}),e.addComponent(g,fa,{network:t,index:u,nodeCount:m,collapse:0}),e.addComponent(g,Ge,{entity:t});const h=(f-1)*i,y=(p-1)*i,x=-h/2,v=-y/2;l[u]=[];for(let C=0;C<p;C++)for(let T=0;T<f;T++){const A=x+T*i,P=v+C*i,b=e.createEntity();e.addComponent(b,ct,{posX:0,posY:A,posZ:P,scaleX:1,scaleY:1,scaleZ:1});const M=u===0,I=u===o-1,V=M?4500104:I?11158664:4491519;e.addComponent(b,Pe,{shape:1,sizeX:s,sizeY:s,sizeZ:s,color:V,visible:1}),e.addComponent(b,Vs,{layer:g,index:C*f+T,originX:0,originY:A,originZ:P}),e.addComponent(b,Ge,{entity:g}),e.addComponent(b,mr),l[u].push(b)}}for(let u=0;u<o-1;u++){const f=l[u],d=l[u+1];for(const p of f)for(const m of d){const _=e.createEntity();e.addComponent(_,ct,{}),e.addComponent(_,Cn,{endX:0,endY:0,endZ:0,color:2236962,visible:1}),e.addComponent(_,Vr,{network:t,layerIndex:u,startNode:p,endNode:m}),e.addComponent(_,Ge,{entity:t})}}}}},tP=St([Vs,ct]),O_={group:"simulation",update(e){for(const t of tP(e.world)){const n=Vs.layer[t],i=fa.collapse[n],r=Vs.originY[t],s=Vs.originZ[t];ct.posY[t]=r*(1-i),ct.posZ[t]=s*(1-i)}}},eP=St([Vr,Cn]),nP={group:"simulation",after:[O_],update(e){const t=df.length-1;for(const n of eP(e.world)){const i=Vr.network[n],r=Vr.layerIndex[n],s=Vr.startNode[n],o=Vr.endNode[n],a=ht.posX[s],c=ht.posY[s],l=ht.posZ[s],u=ht.posX[o],f=ht.posY[o],d=ht.posZ[o],p=li.connections[i],m=r/t,_=(r+1)/t,g=Math.max(0,Math.min(1,(p-m)/(_-m)));ct.posX[n]=a,ct.posY[n]=c,ct.posZ[n]=l,Cn.endX[n]=a+(u-a)*g,Cn.endY[n]=c+(f-c)*g,Cn.endZ[n]=l+(d-l)*g}}},iP={name:"neural-network",components:["neural-network","transform"]},HP={components:{NeuralNetwork:li,NeuralNetworkLayer:fa,NeuralNetworkNode:Vs,NeuralNetworkConnection:Vr},systems:[Q2,O_,nP],recipes:[iP],config:{defaults:{"neural-network":{layerSpacing:6,nodeSpacing:3,depthRows:3,nodeSize:.9,connections:1,initialized:0},"neural-network-layer":{collapse:0}}}},jr=At({parent:w.eid,initialized:w.ui8}),nr=At({radius:w.f32,amplitude:w.f32,offsetX:w.f32,offsetY:w.f32,offsetZ:w.f32,global:w.ui8}),F_=St([jr,ct]),rP=St([nr,ct]),sP={group:"setup",update(e){for(const t of F_(e.world)){if(jr.initialized[t])continue;jr.initialized[t]=1;const n=e.hasComponent(t,Ge)?Ge.entity[t]:0,i=e.createEntity();e.addComponent(i,ct,{posX:0,posY:0,posZ:0,scaleX:1,scaleY:1,scaleZ:1}),n&&e.addComponent(i,Ge,{entity:n}),jr.parent[t]=i,Ge.entity[t]=i}}},oP={group:"simulation",update(e){const t=Array.from(rP(e.world));for(const n of F_(e.world)){const i=jr.parent[n];if(!i)continue;const r=ht.posX[n],s=ht.posY[n],o=ht.posZ[n];let a=0,c=0,l=0;for(const u of t){const f=nr.global[u],d=nr.amplitude[u],p=nr.offsetX[u],m=nr.offsetY[u],_=nr.offsetZ[u];let g=0;if(f)g=d;else{const h=ht.posX[u],y=ht.posY[u],x=ht.posZ[u],v=nr.radius[u],C=r-h,T=s-y,A=o-x,P=Math.sqrt(C*C+T*T+A*A);g=v>0?Math.max(0,1-P/v)*d:0}a+=p*g,c+=m*g,l+=_*g}ct.posX[i]=a,ct.posY[i]=c,ct.posZ[i]=l}}},GP={components:{PositionShaker:jr,PositionShakerDriver:nr},systems:[sP,oP],config:{defaults:{"position-shaker":{parent:0,initialized:0},"position-shaker-driver":{radius:2,amplitude:0,offsetX:0,offsetY:1,offsetZ:0,global:0}}}},Ir=At({step:w.i32,targetStep:w.i32,maxStep:w.i32});function aP(e){let t=0;for(const n of Object.keys(e)){const i=n.split("-");if(i.length===2){const r=parseInt(i[0],10),s=parseInt(i[1],10);!isNaN(r)&&!isNaN(s)&&(t=Math.max(t,r,s))}}return t}function WP(e){const t=aP(e);function n(o){for(const a of Object.values(e)){const c=o.getEntityByName(a);c!==null&&a2(o,c)}}const i=St([Ir]);return{components:{SequenceController:Ir},systems:[{group:"setup",update(o){for(const a of i(o.world))Ir.maxStep[a]===0&&(Ir.maxStep[a]=t)}},{group:"simulation",update(o){for(const a of i(o.world)){const c=Ir.targetStep[a],l=Ir.step[a];if(l!==c){n(o);const u=e[`${l}-${c}`],f=u?o.getEntityByName(u):null;f!==null&&(o2(o,f),r2(o,f)),Ir.step[a]=c}}}}],config:{defaults:{"sequence-controller":{step:0,targetStep:0,maxStep:0}}}}}async function cP(e){const{canvas:t,worldElement:n,config:i}=e,r=new FA;r.registerPlugin(RC),r.registerPlugin(CC),r.registerPlugin(Z2),r.registerPlugin(A2),r.registerPlugin(k2),r.registerPlugin(V2);const s=i.createPlugin();Array.isArray(s)?s.forEach(u=>r.registerPlugin(u)):r.registerPlugin(s),await r.initializePlugins(),n.style.display="none";const o=r.createEntity();r.addComponent(o,Fs),Fs.hasCanvas[o]=1;const a=n.getAttribute("sky");if(a){const u=cg.parse(a);typeof u=="number"&&(Fs.clearColor[o]=u)}tC(o,t);const c=`<world>${n.innerHTML}</world>`,l=BA.parse(c);if(l.root.tagName==="parsererror"){console.error("XML parsing failed for world:",n);return}OA(r,l.root),r.step(Bo.FIXED_TIMESTEP),t.__state__=r,e.state=r,i.setupUI?.(r)}function XP(e){const t=new Map(e.map(l=>[l.canvasId,l])),n=[],i=document.querySelectorAll("world");for(const l of i){const u=l.getAttribute("canvas");if(!u)continue;const f=document.querySelector(u);if(!f)continue;const d=u.replace("#",""),p=t.get(d);p&&n.push({canvas:f,worldElement:l,config:p,isVisible:!1})}const r=new IntersectionObserver(l=>{l.forEach(u=>{const f=n.find(d=>d.canvas===u.target);f&&(f.isVisible=u.isIntersecting,u.isIntersecting&&!f.state&&cP(f))})},{rootMargin:"100px",threshold:.01});n.forEach(l=>r.observe(l.canvas));let s=performance.now(),o=!0;const a=n[0]?.canvas;a&&(a.__stop__=()=>{o=!1});function c(l){if(!o)return;requestAnimationFrame(c);const u=(l-s)/1e3;s=l;for(const f of n)f.state&&f.isVisible&&f.state.step(u)}requestAnimationFrame(c)}const Wi=At({t:w.f32,pulsePhase:w.f32}),lP=St([Wi]),uP={group:"simulation",update(e){for(const t of lP(e.world))Wi.t[t]>0&&(Wi.pulsePhase[t]+=e.time.deltaTime*3)}},YP={components:{TextGeneration:Wi},systems:[uP],config:{defaults:{"text-generation":{t:0,pulsePhase:0}}}},ea=At({index:w.ui8,targetY:w.f32}),gi=At({initialized:w.ui8,t:w.f32,startX:w.f32,endX:w.f32}),fP=6,Op=[-3,0,3],z_=St([gi,ct]),dP=St([ea,ct,Pe]),hP={group:"setup",update(e){for(const t of z_(e.world)){if(gi.initialized[t])continue;gi.initialized[t]=1;const n=gi.startX[t]||-20;for(let i=0;i<fP;i++){const r=e.createEntity(),s=Op[i%Op.length];e.addComponent(r,ct,{posX:n-i*1.5,posY:s+(Math.random()-.5)*2,posZ:0,scaleX:0,scaleY:0,scaleZ:0}),e.addComponent(r,Pe,{shape:1,sizeX:.5,sizeY:.5,sizeZ:.5,color:4500104,visible:1}),e.addComponent(r,ea,{index:i,targetY:s}),e.addComponent(r,Ge,{entity:t})}}}},pP={group:"simulation",update(e){for(const t of z_(e.world)){const n=gi.t[t],i=gi.startX[t]||-20,r=gi.endX[t]||-9;for(const s of dP(e.world)){const o=ea.index[s],a=ea.targetY[s],c=o*.1,l=Math.max(0,Math.min(1,(n-c)/.5)),u=l*l*(3-2*l),f=Math.min(1,l*3);ct.scaleX[s]=f,ct.scaleY[s]=f,ct.scaleZ[s]=f;const d=i-o*1.5;ct.posX[s]=d+(r-d)*u;const p=a+(o%2===0?2:-2);ct.posY[s]=p+(a-p)*u}}}},ZP={components:{TextInputParticle:ea,TextInputManager:gi},systems:[hP,pP],config:{defaults:{"text-input-manager":{initialized:0,t:0,startX:-20,endX:-9}}}},sr=At({index:w.ui8,baseX:w.f32,baseY:w.f32,baseZ:w.f32,randomScale:w.f32,randomOffsetY:w.f32}),ri=At({initialized:w.ui8,particleCount:w.ui8,spacing:w.f32,startX:w.f32,tokenScaleT:w.f32,flashT:w.f32}),Ac=8,Fp=[0],zp=[.7,1.3,.5,1.1,.8,1.4,.6,1],Bp=[1.8,-2.2,2.5,-1.5,2.2,-2.8,1.5,-2],mP=[.1,.35,.55,.2,.7,.45,.8,.15],gP=11158664,B_=St([ri]),_P=St([sr,ct,Pe]),vP=St([Wi]),xP={group:"setup",update(e){for(const t of B_(e.world)){if(ri.initialized[t])continue;ri.initialized[t]=1;const n=ri.spacing[t]||1.5,i=ri.startX[t]||11;for(let r=0;r<Fp.length;r++)for(let s=0;s<Ac;s++){const o=e.createEntity(),a=i+s*n,c=Fp[r];e.addComponent(o,ct,{posX:a,posY:c,posZ:0,scaleX:0,scaleY:0,scaleZ:0}),e.addComponent(o,Pe,{shape:1,sizeX:1,sizeY:1,sizeZ:1,color:11158664,visible:1}),e.addComponent(o,sr,{index:r*Ac+s,baseX:a,baseY:c,baseZ:0,randomScale:zp[s%zp.length],randomOffsetY:Bp[s%Bp.length]}),e.addComponent(o,Ge,{entity:t}),e.addComponent(o,jr)}}}},yP={group:"simulation",update(e){let t=0,n=0,i=0,r=0;for(const s of vP(e.world))t=Wi.t[s],n=Wi.pulsePhase[s];for(const s of B_(e.world))i=ri.tokenScaleT[s],r=ri.flashT[s];for(const s of _P(e.world)){const a=sr.index[s]%Ac,c=a*.08,l=Math.max(0,Math.min(1,(t-c)/.3)),u=l*l*(3-2*l),d=1+(sr.randomScale[s]-1)*i,p=u*d;ct.scaleX[s]=p,ct.scaleY[s]=p,ct.scaleZ[s]=p;const _=sr.randomOffsetY[s]*i;if(t>.5){const x=n+a*.5,v=.1+i*.4;ct.posY[s]=sr.baseY[s]+Math.sin(x)*v+_}else ct.posY[s]=sr.baseY[s]+_;const g=mP[a],y=Math.abs(r-g)<.08;Pe.color[s]=y?16777215:gP}}},qP={components:{TextOutputParticle:sr,TextOutputManager:ri},systems:[xP,yP],config:{defaults:{"text-output-manager":{initialized:0,particleCount:Ac,spacing:2.5,startX:11,tokenScaleT:0,flashT:0}}}},na=At({index:w.ui8,baseX:w.f32,baseY:w.f32}),ud=At({}),$e=At({initialized:w.ui8,t:w.f32,scoresT:w.f32,averageLineT:w.f32,sortT:w.f32,waveScaleT:w.f32,rowCount:w.ui8,startX:w.f32,blockWidth:w.f32,blockHeight:w.f32,spacing:w.f32}),Cc=4,k_=18,V_=.8,$_=12,Rc=2,H_=St([$e]),SP=St([na,ct,Pe]),MP=St([ud,ct,Pe]),Pc=[11158664,4491434,8956484,11176004],EP=16777215,bP={group:"setup",update(e){for(const t of H_(e.world)){if($e.initialized[t])continue;$e.initialized[t]=1;const n=$e.rowCount[t]||Cc,i=$e.startX[t]||$_,r=$e.blockWidth[t]||k_,s=$e.blockHeight[t]||V_,o=$e.spacing[t]||Rc,c=(n-1)*o/2;for(let f=0;f<n;f++){const d=e.createEntity(),p=i+r/2,m=c-f*o;e.addComponent(d,ct,{posX:p,posY:m,posZ:0,scaleX:0,scaleY:0,scaleZ:0}),e.addComponent(d,Pe,{shape:0,sizeX:r,sizeY:s,sizeZ:s,color:Pc[f%Pc.length],visible:1}),e.addComponent(d,na,{index:f,baseX:p,baseY:m}),e.addComponent(d,Ge,{entity:t}),AP.has(f)&&e.addComponent(d,mr,{})}const l=e.createEntity(),u=i+r/2;e.addComponent(l,ct,{posX:u,posY:0,posZ:-.5,scaleX:0,scaleY:0,scaleZ:0}),e.addComponent(l,Pe,{shape:0,sizeX:r+2,sizeY:.15,sizeZ:.15,color:EP,visible:1}),e.addComponent(l,ud,{}),e.addComponent(l,Ge,{entity:t})}}};function Yl(e){return 1+2.70158*Math.pow(e-1,3)+1.70158*Math.pow(e-1,2)}function TP(e,t,n){const i=(1-Math.abs(2*n-1))*t,r=i*(1-Math.abs(e/60%2-1)),s=n-i/2;let o=0,a=0,c=0;e<60?(o=i,a=r):e<120?(o=r,a=i):e<180?(a=i,c=r):e<240?(a=r,c=i):e<300?(o=r,c=i):(o=i,c=r);const l=Math.round((o+s)*255),u=Math.round((a+s)*255),f=Math.round((c+s)*255);return l<<16|u<<8|f}const no=[.2,.85,.6,.3],wP=no.reduce((e,t)=>e+t,0)/no.length,AP=new Set(no.map((e,t)=>e>wP?t:-1).filter(e=>e>=0)),kp=no.map((e,t)=>({score:e,i:t})).sort((e,t)=>t.score-e.score).map(e=>e.i),G_=[];for(let e=0;e<kp.length;e++){const t=kp[e];G_[t]=e}const CP={group:"simulation",update(e){let t=0,n=0,i=0,r=0,s=Rc,o=Cc;for(const l of H_(e.world))t=$e.t[l],n=$e.scoresT[l],i=$e.averageLineT[l],r=$e.sortT[l],s=$e.spacing[l]||Rc,o=$e.rowCount[l]||Cc;const c=(o-1)*s/2;for(const l of SP(e.world)){const u=na.index[l],f=na.baseY[l],d=u*.12,p=Math.max(0,Math.min(1,(t-d)/.4)),m=Yl(p);ct.scaleX[l]=m,ct.scaleY[l]=m,ct.scaleZ[l]=m;const _=G_[u],g=c-_*s,h=Yl(r);ct.posY[l]=f+(g-f)*h;const y=Pc[u%Pc.length],v=no[u%no.length]*120,C=TP(v,.8,.5),T=y>>16&255,A=y>>8&255,P=y&255,b=C>>16&255,M=C>>8&255,I=C&255,V=Math.round(T+(b-T)*n),F=Math.round(A+(M-A)*n),H=Math.round(P+(I-P)*n);Pe.color[l]=V<<16|F<<8|H}for(const l of MP(e.world)){const u=Yl(i);ct.scaleX[l]=u,ct.scaleY[l]=u,ct.scaleZ[l]=u}}},jP={components:{MultipleOutputsBlock:na,MultipleOutputsManager:$e,AverageLine:ud},systems:[bP,CP],config:{defaults:{"multiple-outputs-manager":{initialized:0,t:0,scoresT:0,averageLineT:0,sortT:0,rowCount:Cc,startX:$_,blockWidth:k_,blockHeight:V_,spacing:Rc}}}},wn=At({cameraX:w.f32,connections:w.f32,collapse:w.f32,textGenT:w.f32,textInputT:w.f32,multipleOutputsT:w.f32,scoresT:w.f32,averageLineT:w.f32,sortT:w.f32,tokenScaleT:w.f32,flashT:w.f32}),RP=St([wn]),PP=St([fa]),IP=St([Wi]),DP=St([gi]),Vp=St([ri]),ja=St([$e]),LP={group:"simulation",update(e){for(const t of RP(e.world)){const n=wn.cameraX[t],i=wn.connections[t],r=wn.collapse[t],s=wn.textGenT[t],o=e.getEntityByName("camera-target");o!==null&&(ct.posX[o]=n);const a=e.getEntityByName("llm");a!==null&&(li.connections[a]=i);for(const _ of PP(e.world))fa.collapse[_]=r;for(const _ of IP(e.world))Wi.t[_]=s;const c=wn.textInputT[t];for(const _ of DP(e.world))gi.t[_]=c;const l=wn.multipleOutputsT[t];for(const _ of ja(e.world))$e.t[_]=l;const u=wn.scoresT[t];for(const _ of ja(e.world))$e.scoresT[_]=u;const f=wn.averageLineT[t];for(const _ of ja(e.world))$e.averageLineT[_]=f;const d=wn.sortT[t];for(const _ of ja(e.world))$e.sortT[_]=d;const p=wn.tokenScaleT[t];for(const _ of Vp(e.world))ri.tokenScaleT[_]=p;const m=wn.flashT[t];for(const _ of Vp(e.world))ri.flashT[_]=m}}},KP={components:{StageAnimation:wn},systems:[LP],config:{defaults:{"stage-animation":{cameraX:-50,connections:0,collapse:0,textGenT:0,textInputT:0,multipleOutputsT:0,scoresT:0,averageLineT:0,sortT:0,tokenScaleT:0,flashT:0}}}};export{YP as I,jP as M,HP as N,GP as P,KP as S,qP as T,ZP as a,$P as b,WP as c,Ir as d,XP as i};
//# sourceMappingURL=stage-animation-DvalZTor.js.map
