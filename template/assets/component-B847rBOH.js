var Ft=(e,t,n)=>Object.defineProperty(e,t,{value:n,enumerable:!1,writable:!0,configurable:!0}),Mo=(e,t)=>t&e.entityMask,So=(e,t)=>t>>>e.versionShift&(1<<e.versionBits)-1,Po=(e,t)=>{let n=So(e,t)+1&(1<<e.versionBits)-1;return t&e.entityMask|n<<e.versionShift},Eo=e=>{let t={versioning:!1,versionBits:8},n=t.versionBits??8,r=t.versioning??!1,i=32-n,s=(1<<i)-1,u=i,m=(1<<n)-1<<u;return{aliveCount:0,dense:[],sparse:[],maxId:0,versioning:r,versionBits:n,entityMask:s,versionShift:u,versionMask:m}},Ao=e=>{if(e.aliveCount<e.dense.length){let n=e.dense[e.aliveCount],r=n;return e.sparse[r]=e.aliveCount,e.aliveCount++,n}let t=++e.maxId;return e.dense.push(t),e.sparse[t]=e.aliveCount,e.aliveCount++,t},To=(e,t)=>{let n=e.sparse[t];if(n===void 0||n>=e.aliveCount)return;let r=e.aliveCount-1,i=e.dense[r];if(e.sparse[i]=n,e.dense[n]=i,e.sparse[t]=r,e.dense[r]=t,e.versioning){let s=Po(e,t);e.dense[r]=s}e.aliveCount--},sr=(e,t)=>{let n=Mo(e,t),r=e.sparse[n];return r!==void 0&&r<e.aliveCount&&e.dense[r]===t},ae=Symbol.for("bitecs_internal"),Bo=(e,t)=>Ft(e||{},ae,{entityIndex:t||Eo(),entityMasks:[[]],entityComponents:new Map,bitflag:1,componentMap:new Map,componentCount:0,queries:new Set,queriesHashMap:new Map,notQueries:new Set,dirtyQueries:new Set,entitiesWithRelations:new Set,hierarchyData:new Map,hierarchyActiveRelations:new Set,hierarchyQueryCache:new Map});function Io(...e){let t,n;return e.forEach(r=>{typeof r=="object"&&"dense"in r&&"sparse"in r&&"aliveCount"in r?t=r:typeof r=="object"&&(n=r)}),Bo(n,t)}var _o=e=>Array.from(e[ae].entityComponents.keys()),Nt=()=>{let e=[],t=[],n=r=>e[t[r]]===r;return{add:r=>{n(r)||(t[r]=e.push(r)-1)},remove:r=>{if(!n(r))return;let i=t[r],s=e.pop();s!==r&&(e[i]=s,t[s]=i)},has:n,sparse:t,dense:e,reset:()=>{e.length=0,t.length=0},sort:r=>{e.sort(r);for(let i=0;i<e.length;i++)t[e[i]]=i}}},Pr=typeof SharedArrayBuffer<"u"?SharedArrayBuffer:ArrayBuffer,ui=(e=1e3)=>{let t=[],n=0,r=new Uint32Array(new Pr(e*4)),i=s=>s<t.length&&t[s]<n&&r[t[s]]===s;return{add:s=>{if(!i(s)){if(n>=r.length){let u=new Uint32Array(new Pr(r.length*2*4));u.set(r),r=u}r[n]=s,t[s]=n,n++}},remove:s=>{if(!i(s))return;n--;let u=t[s],m=r[n];r[u]=m,t[m]=u},has:i,sparse:t,get dense(){return new Uint32Array(r.buffer,0,n)},reset:()=>{n=0,t.length=0},sort:s=>{let u=Array.from(r.subarray(0,n));u.sort(s);for(let m=0;m<u.length;m++)r[m]=u[m];for(let m=0;m<n;m++)t[r[m]]=m}}},ln=()=>{let e=new Set;return{subscribe:t=>(e.add(t),()=>{e.delete(t)}),notify:(t,...n)=>Array.from(e).reduce((r,i)=>{let s=i(t,...n);return s&&typeof s=="object"?{...r,...s}:r},{})}},Zt=Symbol.for("bitecs-relation"),Mt=Symbol.for("bitecs-pairTarget"),bn=Symbol.for("bitecs-isPairComponent"),wt=Symbol.for("bitecs-relationData"),fn=()=>{let e={pairsMap:new Map,initStore:void 0,exclusiveRelation:!1,autoRemoveSubject:!1,onTargetRemoved:void 0},t=n=>{if(n===void 0)throw Error("Relation target is undefined");let r=n==="*"?Ne:n;if(!e.pairsMap.has(r)){let i={};Ft(i,Zt,t),Ft(i,Mt,r),Ft(i,bn,!0),e.pairsMap.set(r,i)}return e.pairsMap.get(r)};return Ft(t,wt,e),t},zo=e=>t=>{let n=t[wt];return n.initStore=e,t},No=e=>{let t=e[wt];return t.exclusiveRelation=!0,e},Uo=e=>{let t=e[wt];return t.autoRemoveSubject=!0,e},Co=e=>t=>{let n=t[wt];return n.onTargetRemoved=e,t},He=(e,t)=>{if(e===void 0)throw Error("Relation is undefined");return e(t)},St=(e,t,n)=>{let r=fr(e,t),i=[];for(let s of r)s[Zt]===n&&s[Mt]!==Ne&&!Yo(s[Mt])&&i.push(s[Mt]);return i};function Oo(...e){if(e.length===1&&typeof e[0]=="object"){let{store:t,exclusive:n,autoRemoveSubject:r,onTargetRemoved:i}=e[0];return[t&&zo(t),n&&No,r&&Uo,i&&Co(i)].filter(Boolean).reduce((s,u)=>u(s),fn())}else return e.reduce((t,n)=>n(t),fn())}var Ro=Symbol.for("bitecs-wildcard");function Do(){let e=fn();return Object.defineProperty(e,Ro,{value:!0,enumerable:!1,writable:!1,configurable:!1}),e}function Go(){let e=Symbol.for("bitecs-global-wildcard");return globalThis[e]||(globalThis[e]=Do()),globalThis[e]}var Ne=Go();function Fo(){return fn()}function Lo(){let e=Symbol.for("bitecs-global-isa");return globalThis[e]||(globalThis[e]=Fo()),globalThis[e]}var dn=Lo();function Yo(e){return e?Object.getOwnPropertySymbols(e).includes(wt):!1}var Xo=64,ct=4294967295,li=1024;function fi(e,t){let{depths:n}=e;if(t<n.length)return n;let r=Math.max(t+1,n.length*2,n.length+li),i=new Uint32Array(r);return i.fill(ct),i.set(n),e.depths=i,i}function di(e,t,n,r){let{depthToEntities:i}=e;if(r!==void 0&&r!==ct){let s=i.get(r);s&&(s.remove(t),s.dense.length===0&&i.delete(r))}n!==ct&&(i.has(n)||i.set(n,ui()),i.get(n).add(t))}function ko(e,t){t>e.maxDepth&&(e.maxDepth=t)}function ar(e,t,n,r){e.depths[t]=n,di(e,t,n,r),ko(e,n)}function hi(e,t){e[ae].hierarchyQueryCache.delete(t)}function gi(e,t){let n=e[ae];return n.hierarchyActiveRelations.has(t)||(n.hierarchyActiveRelations.add(t),cr(e,t),Vo(e,t)),n.hierarchyData.get(t)}function Vo(e,t){let n=jt(e,[He(t,Ne)]);for(let i of n)Xn(e,t,i);let r=new Set;for(let i of n)for(let s of St(e,i,t))r.has(s)||(r.add(s),Xn(e,t,s))}function cr(e,t){let n=e[ae];if(!n.hierarchyData.has(t)){let r=Math.max(li,n.entityIndex.dense.length*2),i=new Uint32Array(r);i.fill(ct),n.hierarchyData.set(t,{depths:i,dirty:Nt(),depthToEntities:new Map,maxDepth:0})}}function pi(e,t,n,r=new Set){if(r.has(n))return 0;r.add(n);let i=St(e,n,t);if(i.length===0)return 0;if(i.length===1)return Yn(e,t,i[0],r)+1;let s=1/0;for(let u of i){let m=Yn(e,t,u,r);if(m<s&&(s=m,s===0))break}return s===1/0?0:s+1}function Yn(e,t,n,r){let i=e[ae];cr(e,t);let s=i.hierarchyData.get(t),{depths:u}=s;if(u=fi(s,n),u[n]===ct){let m=pi(e,t,n,r);return ar(s,n,m),m}return u[n]}function Xn(e,t,n){return Yn(e,t,n,new Set)}function yi(e,t,n,r,i=Nt()){if(i.has(n))return;i.add(n);let s=jt(e,[t(n)]);for(let u of s)r.add(u),yi(e,t,u,r,i)}function qo(e,t,n,r,i=new Set){let s=e[ae];if(!s.hierarchyActiveRelations.has(t))return;cr(e,t);let u=s.hierarchyData.get(t);if(i.has(n)){u.dirty.add(n);return}i.add(n);let{depths:m,dirty:p}=u,y=r!==void 0?Xn(e,t,r)+1:0;if(y>Xo)return;let P=m[n];ar(u,n,y,P===ct?void 0:P),P!==y&&(yi(e,t,n,p,Nt()),hi(e,t))}function Ho(e,t,n){let r=e[ae];if(!r.hierarchyActiveRelations.has(t))return;let i=r.hierarchyData.get(t),{depths:s}=i;s=fi(i,n),wi(e,t,n,s,Nt()),hi(e,t)}function wi(e,t,n,r,i){if(i.has(n))return;i.add(n);let s=e[ae].hierarchyData.get(t);if(n<r.length){let m=r[n];m!==ct&&(s.depths[n]=ct,di(s,n,ct,m))}let u=jt(e,[t(n)]);for(let m of u)wi(e,t,m,r,i)}function mi(e,t){let n=e[ae].hierarchyData.get(t);if(!n)return;let{dirty:r,depths:i}=n;if(r.dense.length!==0){for(let s of r.dense)if(i[s]===ct){let u=pi(e,t,s);ar(n,s,u)}r.reset()}}function $o(e,t,n,r={}){let i=e[ae];gi(e,t);let s=kt(e,[t,...n]),u=i.hierarchyQueryCache.get(t);if(u&&u.hash===s)return u.result;mi(e,t),xi(e,n,r);let m=i.queriesHashMap.get(kt(e,n)),p=i.hierarchyData.get(t),{depths:y}=p;m.sort((T,B)=>{let C=y[T],O=y[B];return C!==O?C-O:T-B});let P=(r.buffered,m.dense);return i.hierarchyQueryCache.set(t,{hash:s,result:P}),P}function Zo(e,t,n,r={}){let i=gi(e,t);mi(e,t);let s=i.depthToEntities.get(n);return s?(r.buffered,s.dense):r.buffered?new Uint32Array(0):[]}var gt=Symbol.for("bitecs-opType"),Ut=Symbol.for("bitecs-opTerms"),jo=e=>(...t)=>({[gt]:e,[Ut]:t}),Er=jo("Not"),kn=Symbol.for("bitecs-hierarchyType"),bi=Symbol.for("bitecs-hierarchyRel"),vi=Symbol.for("bitecs-hierarchyDepth"),Wo=(e,t)=>({[kn]:"Hierarchy",[bi]:e,[vi]:t}),Lt=Symbol.for("bitecs-modifierType"),Qo={[Lt]:"nested"},Ko=Qo,Jo=e=>(...t)=>({[gt]:e,[Ut]:t}),es=Jo("add");function ts(e,t,n){let r=e[ae],{[gt]:i,[Ut]:s}=t;if(i==="add"||i==="remove")return(r.queriesHashMap.get(kt(e,s))||Vn(e,s))[i==="add"?"addObservable":"removeObservable"].subscribe(n);if(i==="set"||i==="get"){if(s.length!==1)throw new Error("Set and Get hooks can only observe a single component");return(r.componentMap.get(s[0])||_t(e,s[0]))[i==="set"?"setObservable":"getObservable"].subscribe(n)}throw new Error(`Invalid hook type: ${i}`)}var kt=(e,t)=>{let n=e[ae],r=s=>(n.componentMap.has(s)||_t(e,s),n.componentMap.get(s).id),i=s=>gt in s?`${s[gt].toLowerCase()}(${s[Ut].map(i).sort().join(",")})`:r(s).toString();return t.map(i).sort().join("-")},Vn=(e,t,n={})=>{let r=e[ae],i=kt(e,t),s=[],u=R=>{gt in R?R[Ut].forEach(u):(r.componentMap.has(R)||_t(e,R),s.push(R))};t.forEach(u);let m=[],p=[],y=[],P=(R,W)=>{W.forEach(J=>{r.componentMap.has(J)||_t(e,J),R.push(J)})};t.forEach(R=>{if(gt in R){let{[gt]:W,[Ut]:J}=R;if(W==="Not")P(p,J);else if(W==="Or")P(y,J);else if(W==="And")P(m,J);else throw new Error(`Nested combinator ${W} not supported yet - use simple queries for best performance`)}else r.componentMap.has(R)||_t(e,R),m.push(R)});let T=s.map(R=>r.componentMap.get(R)),B=[...new Set(T.map(R=>R.generationId))],C=(R,W)=>(R[W.generationId]=(R[W.generationId]||0)|W.bitflag,R),O=m.map(R=>r.componentMap.get(R)).reduce(C,{}),F=p.map(R=>r.componentMap.get(R)).reduce(C,{}),V=y.map(R=>r.componentMap.get(R)).reduce(C,{}),$=T.reduce(C,{}),q=Object.assign(n.buffered?ui():Nt(),{allComponents:s,orComponents:y,notComponents:p,masks:O,notMasks:F,orMasks:V,hasMasks:$,generations:B,toRemove:Nt(),addObservable:ln(),removeObservable:ln(),queues:{}});r.queries.add(q),r.queriesHashMap.set(i,q),T.forEach(R=>{R.queries.add(q)}),p.length&&r.notQueries.add(q);let se=r.entityIndex;for(let R=0;R<se.aliveCount;R++){let W=se.dense[R];pt(e,W,lr)||vn(e,q,W)&&xn(q,W)}return q};function xi(e,t,n={}){let r=e[ae],i=kt(e,t),s=r.queriesHashMap.get(i);return s?n.buffered&&!("buffer"in s.dense)&&(s=Vn(e,t,{buffered:!0})):s=Vn(e,t,n),n.buffered,s.dense}function jt(e,t,...n){let r=t.find(p=>p&&typeof p=="object"&&kn in p),i=t.filter(p=>!(p&&typeof p=="object"&&kn in p)),s=!1,u=!0,m=n.some(p=>p&&typeof p=="object"&&Lt in p);for(let p of n)if(m&&p&&typeof p=="object"&&Lt in p){let y=p;y[Lt]==="buffer"&&(s=!0),y[Lt]==="nested"&&(u=!1)}else if(!m){let y=p;y.buffered!==void 0&&(s=y.buffered),y.commit!==void 0&&(u=y.commit)}if(r){let{[bi]:p,[vi]:y}=r;return y!==void 0?Zo(e,p,y,{buffered:s}):$o(e,p,i,{buffered:s})}return u&&rs(e),xi(e,i,{buffered:s})}function vn(e,t,n){let r=e[ae],{masks:i,notMasks:s,orMasks:u,generations:m}=t,p=Object.keys(u).length===0;for(let y=0;y<m.length;y++){let P=m[y],T=i[P],B=s[P],C=u[P],O=r.entityMasks[P][n];if(B&&O&B||T&&(O&T)!==T)return!1;C&&O&C&&(p=!0)}return p}var xn=(e,t)=>{if(e.toRemove.has(t)){e.toRemove.remove(t),e.addObservable.notify(t);return}e.has(t)||(e.add(t),e.addObservable.notify(t))},ns=e=>{for(let t=0;t<e.toRemove.dense.length;t++){let n=e.toRemove.dense[t];e.remove(n)}e.toRemove.reset()},rs=e=>{let t=e[ae];t.dirtyQueries.size&&(t.dirtyQueries.forEach(ns),t.dirtyQueries.clear())},ur=(e,t,n)=>{let r=e[ae];!t.has(n)||t.toRemove.has(n)||(t.toRemove.add(n),r.dirtyQueries.add(t),t.removeObservable.notify(n))},_t=(e,t)=>{if(!t)throw new Error("bitECS - Cannot register null or undefined component");let n=e[ae],r=new Set,i={id:n.componentCount++,generationId:n.entityMasks.length-1,bitflag:n.bitflag,ref:t,queries:r,setObservable:ln(),getObservable:ln()};return n.componentMap.set(t,i),n.bitflag*=2,n.bitflag>=2**31&&(n.bitflag=1,n.entityMasks.push([])),i},pt=(e,t,n)=>{let r=e[ae],i=r.componentMap.get(n);if(!i)return!1;let{generationId:s,bitflag:u}=i;return(r.entityMasks[s][t]&u)===u},Mi=(e,t,n)=>{let r=e[ae].componentMap.get(n);if(r&&pt(e,t,n))return r.getObservable.notify(t)},Si=(e,t,n,r,i=new Set)=>{if(!i.has(r)){i.add(r),Ct(t,n,dn(r));for(let s of fr(t,r))if(s!==lr&&!pt(t,n,s)){Ct(t,n,s);let u=e.componentMap.get(s);if(u?.setObservable){let m=Mi(t,r,s);u.setObservable.notify(n,m)}}for(let s of St(t,r,dn))Si(e,t,n,s,i)}},Ct=(e,t,n)=>{if(!Vt(e,t))throw new Error(`Cannot add component - entity ${t} does not exist in the world.`);let r=e[ae],i="component"in n?n.component:n,s="data"in n?n.data:void 0;r.componentMap.has(i)||_t(e,i);let u=r.componentMap.get(i);if(pt(e,t,i))return s!==void 0&&u.setObservable.notify(t,s),!1;let{generationId:m,bitflag:p,queries:y}=u;if(r.entityMasks[m][t]|=p,pt(e,t,lr)||y.forEach(P=>{vn(e,P,t)?xn(P,t):ur(e,P,t)}),r.entityComponents.get(t).add(i),s!==void 0&&u.setObservable.notify(t,s),i[bn]){let P=i[Zt],T=i[Mt];if(qn(e,t,He(P,Ne),He(Ne,T)),typeof T=="number"&&(qn(e,T,He(Ne,t),He(Ne,P)),r.entitiesWithRelations.add(T),r.entitiesWithRelations.add(t)),r.entitiesWithRelations.add(T),P[wt].exclusiveRelation===!0&&T!==Ne){let B=St(e,t,P)[0];B!=null&&B!==T&&lt(e,t,P(B))}if(P===dn){let B=St(e,t,dn);for(let C of B)Si(r,e,t,C)}qo(e,P,t,typeof T=="number"?T:void 0)}return!0};function qn(e,t,...n){(Array.isArray(n[0])?n[0]:n).forEach(r=>{Ct(e,t,r)})}var lt=(e,t,...n)=>{let r=e[ae];if(!Vt(e,t))throw new Error(`Cannot remove component - entity ${t} does not exist in the world.`);n.forEach(i=>{if(!pt(e,t,i))return;let s=r.componentMap.get(i),{generationId:u,bitflag:m,queries:p}=s;if(r.entityMasks[u][t]&=~m,p.forEach(y=>{y.toRemove.remove(t),vn(e,y,t)?xn(y,t):ur(e,y,t)}),r.entityComponents.get(t).delete(i),i[bn]){let y=i[Mt],P=i[Zt];Ho(e,P,t),lt(e,t,He(Ne,y)),typeof y=="number"&&Vt(e,y)&&(lt(e,y,He(Ne,t)),lt(e,y,He(Ne,P))),St(e,t,P).length===0&&lt(e,t,He(P,Ne))}})},is=lt,lr={};function os(e,...t){let n=e[ae],r=Ao(n.entityIndex);return n.notQueries.forEach(i=>{vn(e,i,r)&&xn(i,r)}),n.entityComponents.set(r,new Set),t.length>0&&qn(e,r,t),r}var Pi=(e,t)=>{let n=e[ae];if(!sr(n.entityIndex,t))return;let r=[t],i=new Set;for(;r.length>0;){let s=r.shift();if(i.has(s))continue;i.add(s);let u=[];if(n.entitiesWithRelations.has(s)){for(let m of jt(e,[Ne(s)],Ko))if(Vt(e,m))for(let p of n.entityComponents.get(m)){if(!p[bn])continue;let y=p[Zt][wt];u.push(()=>lt(e,m,He(Ne,s))),p[Mt]===s&&(u.push(()=>lt(e,m,p)),y.autoRemoveSubject&&r.push(m),y.onTargetRemoved&&u.push(()=>y.onTargetRemoved(e,m,s)))}n.entitiesWithRelations.delete(s)}for(let m of u)m();for(let m of r)Pi(e,m);for(let m of n.queries)ur(e,m,s);To(n.entityIndex,s),n.entityComponents.delete(s);for(let m=0;m<n.entityMasks.length;m++)n.entityMasks[m][s]=0}},fr=(e,t)=>{let n=e[ae];if(t===void 0)throw new Error("getEntityComponents: entity id is undefined.");if(!sr(n.entityIndex,t))throw new Error(`getEntityComponents: entity ${t} does not exist in the world.`);return Array.from(n.entityComponents.get(t))},Vt=(e,t)=>sr(e[ae].entityIndex,t);const ss="modulepreload",as=function(e,t){return new URL(e,t).href},Ar={},hn=function(t,n,r){let i=Promise.resolve();if(n&&n.length>0){let y=function(P){return Promise.all(P.map(T=>Promise.resolve(T).then(B=>({status:"fulfilled",value:B}),B=>({status:"rejected",reason:B}))))};const u=document.getElementsByTagName("link"),m=document.querySelector("meta[property=csp-nonce]"),p=m?.nonce||m?.getAttribute("nonce");i=y(n.map(P=>{if(P=as(P,r),P in Ar)return;Ar[P]=!0;const T=P.endsWith(".css"),B=T?'[rel="stylesheet"]':"";if(r)for(let O=u.length-1;O>=0;O--){const F=u[O];if(F.href===P&&(!T||F.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${P}"]${B}`))return;const C=document.createElement("link");if(C.rel=T?"stylesheet":ss,T||(C.as="script"),C.crossOrigin="",C.href=P,p&&C.setAttribute("nonce",p),document.head.appendChild(C),T)return new Promise((O,F)=>{C.addEventListener("load",O),C.addEventListener("error",()=>F(new Error(`Unable to preload CSS for ${P}`)))})}))}function s(u){const m=new Event("vite:preloadError",{cancelable:!0});if(m.payload=u,window.dispatchEvent(m),!m.defaultPrevented)throw u}return i.then(u=>{for(const m of u||[])m.status==="rejected"&&s(m.reason);return t().catch(s)})};class cs extends Error{constructor(t="Circular dependency detected"){super(t),this.name="CycleError"}}function an(e,t){if(e.length===0)return[];const n=new Map,r=new Map;for(const u of e)n.set(u,new Set),r.set(u,0);for(const[u,m]of t)!n.has(u)||!n.has(m)||(n.get(u).add(m),r.set(m,r.get(m)+1));us(e,n);const i=[],s=[];for(const u of e)r.get(u)===0&&i.push(u);for(;i.length>0;){const u=i.shift();s.push(u);for(const m of n.get(u)){const p=r.get(m)-1;r.set(m,p),p===0&&i.push(m)}}return s}function us(e,t){const n=new Set,r=new Set;function i(s){if(r.has(s))return!0;if(n.has(s))return!1;n.add(s),r.add(s);for(const u of t.get(s))if(i(u))return!0;return r.delete(s),!1}for(const s of e)if(i(s))throw new cs}class Ei extends Error{constructor(t){super(t),this.name="OrderingError"}}function ls(e,t){fs(e,t??e);const r=e.filter(u=>u.first),i=e.filter(u=>u.last),s=e.filter(u=>!u.first&&!u.last);return[...an(r,Tn(r)),...an(s,Tn(s)),...an(i,Tn(i))]}function Tn(e){const t=[];for(const n of e){for(const r of n.before??[])e.includes(r)&&t.push([n,r]);for(const r of n.after??[])e.includes(r)&&t.push([r,n])}return t}function fs(e,t){for(const n of e){if(n.first&&n.last)throw new Ei("System cannot have both first and last constraints");const r=n.group??"simulation";for(const i of n.before??[])Tr(i,r,t);for(const i of n.after??[])Tr(i,r,t)}}function Tr(e,t,n){if(!n.includes(e))return;const r=e.group??"simulation";if(r!==t)throw new Ei(`Cross-group constraint: ${t} references ${r}`)}const gn={FIXED_DT:1/50,DEFAULT_DT:1/60};class ds{_systems=new Set;_systemsVersion=0;_accumulator=0;_initialized=new WeakSet;_cache=new Map;_cacheVersion=-1;get systems(){return this._systems}get systemsVersion(){return this._systemsVersion}get accumulator(){return this._accumulator}register(t){this._systems.add(t),this._systemsVersion++}unregister(t){this._systems.delete(t)&&this._systemsVersion++}step(t,n=gn.DEFAULT_DT){const r=gn.FIXED_DT;for(t.setDeltaTime(n),t.addElapsed(n),this._accumulator+=n,this.runGroup(t,"setup");this._accumulator>=r;)t.setDeltaTime(r),this.runGroup(t,"fixed"),this._accumulator-=r;t.setDeltaTime(n),this.runGroup(t,"simulation"),this.runGroup(t,"draw")}runGroup(t,n){for(const r of this.getSorted(n))this._initialized.has(r)||(r.setup?.(t),this._initialized.add(r)),r.update?.(t)}getSorted(t){this._systemsVersion!==this._cacheVersion&&(this._cache.clear(),this._cacheVersion=this._systemsVersion);const n=this._cache.get(t);if(n)return n;const r=Array.from(this._systems),i=r.filter(u=>(u.group??"simulation")===t),s=ls(i,r);return this._cache.set(t,s),s}}function hs(){if(typeof __TAURI_INTERNALS__<"u")return"standalone";if(typeof Bun<"u")return"headless";if(typeof window<"u"&&typeof fetch=="function")return"web";throw new Error("Unknown runtime environment")}function Br(e){return e.startsWith("/")||e.startsWith("./")||e.startsWith("../")}function gs(){return{target:"standalone",async readFile(e){if(Br(e)){const n=await fetch(e);if(!n.ok)throw new Error(`Failed to load ${e}: ${n.status}`);return n.text()}const{readTextFile:t}=await hn(async()=>{const{readTextFile:n}=await import("./index-BrFmEk1v.js");return{readTextFile:n}},[],import.meta.url);return t(e)},async readBinary(e){if(Br(e)){const r=await fetch(e);if(!r.ok)throw new Error(`Failed to load ${e}: ${r.status}`);return r.arrayBuffer()}const{readFile:t}=await hn(async()=>{const{readFile:r}=await import("./index-BrFmEk1v.js");return{readFile:r}},[],import.meta.url);return(await t(e)).buffer},requestFrame(e){requestAnimationFrame(e)},now(){return performance.now()}}}function ps(){return{target:"web",async readFile(e){const t=await fetch(e);if(!t.ok)throw new Error(`Failed to load ${e}: ${t.status}`);return t.text()},async readBinary(e){const t=await fetch(e);if(!t.ok)throw new Error(`Failed to load ${e}: ${t.status}`);return t.arrayBuffer()},requestFrame(e){requestAnimationFrame(e)},now(){return performance.now()}}}let on;async function ys(){switch(hs()){case"headless":{const{createHeadlessRuntime:t}=await hn(async()=>{const{createHeadlessRuntime:n}=await import("./headless-AF5GYwat.js");return{createHeadlessRuntime:n}},[],import.meta.url);return t()}case"standalone":return gs();case"web":return ps()}}let Bn;async function Ai(){return on||(Bn||(Bn=ys()),on=await Bn,on)}function Pt(e){return e.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/[\s_]+/g,"-").toLowerCase()}function dr(e){return e.replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function ws(e,t){if(e.length===0)return t.length;if(t.length===0)return e.length;const n=[];for(let r=0;r<=t.length;r++)n[r]=[r];for(let r=0;r<=e.length;r++)n[0][r]=r;for(let r=1;r<=t.length;r++)for(let i=1;i<=e.length;i++){const s=e[i-1]===t[r-1]?0:1;n[r][i]=Math.min(n[r-1][i]+1,n[r][i-1]+1,n[r-1][i-1]+s)}return n[t.length][e.length]}function ms(e,t){const n=Pt(e);let r=null,i=1/0;for(const s of t){const u=Pt(s);if(n===u||n.endsWith(u)||n.endsWith("-"+u))return s;const m=ws(n,u),p=Math.max(n.length,u.length),y=Math.ceil(p*.5);m<i&&m<=y&&(i=m,r=s)}return r}const hr=new WeakMap;function Ue(e,t){hr.set(e,t)}function Ir(e){return hr.get(e)}const Ti=new Map;function bs(e,t){const n=Pt(e),r=hr.get(t);Ti.set(n,{component:t,name:n,traits:r})}function Bi(e){return Ti.get(Pt(e))}function vs(e,t,n){return{get:r=>e[r*t+n],set:(r,i)=>{e[r*t+n]=i}}}const ue=65536;function Mn(e){const t=Symbol(e),n=Object.assign(t,{from(r){return r.getResource(n)}});return n}class xs{world;scheduler=new ds;canvas;gpu;_resources=new Map;_disposed=!1;_running=!1;_runtime=null;_lastTime=0;_time={deltaTime:0,fixedDeltaTime:gn.FIXED_DT,elapsed:0};_fieldAccessors=null;get time(){return this._time}get running(){return this._running}static new(){return new Ot}constructor(t=null,n=null){this.world=Io(),this.canvas=t,this.gpu=n}setResource(t,n){this._resources.set(t,n)}getResource(t){return this._resources.get(t)}deleteResource(t){return this._resources.delete(t)}async start(t){this._running||(this._runtime=t??await Ai(),this._running=!0,this._lastTime=this._runtime.now(),this.scheduleFrame())}stop(){this._running=!1}scheduleFrame(){!this._running||!this._runtime||this._runtime.requestFrame(()=>this.tick())}tick(){if(!this._running||!this._runtime)return;const t=this._runtime.now(),n=(t-this._lastTime)/1e3;this._lastTime=t,this.step(n),this.scheduleFrame()}setDeltaTime(t){this._time.deltaTime=t}addElapsed(t){this._time.elapsed+=t}register(t){if("update"in t||"setup"in t||"dispose"in t)this.scheduler.register(t);else{const n=t;if(n.components)for(const[r,i]of Object.entries(n.components))bs(r,i);if(n.systems)for(const r of n.systems)this.scheduler.register(r)}}unregister(t){this.scheduler.unregister(t)}step(t=gn.DEFAULT_DT){this.scheduler.step(this,t)}addEntity(){const t=os(this.world);if(t>=ue)throw new Error(`Entity limit exceeded: ${t} >= ${ue}`);return t}removeEntity(t){this._fieldAccessors?.delete(t),Pi(this.world,t)}entityExists(t){return Vt(this.world,t)}getAllEntities(){return _o(this.world)}query(t){return jt(this.world,t)}getEntityComponents(t){return fr(this.world,t)}addComponent(t,n){Ct(this.world,t,n);const r=Ir(n);if(r?.defaults){const i=r.defaults(),s=n;for(const[u,m]of Object.entries(i)){const p=s[u];p!=null&&(p[t]=m)}}}addComponents(t,...n){for(const r of n)this.addComponent(t,r)}removeComponent(t,...n){lt(this.world,t,...n)}removeComponents(t,...n){is(this.world,t,...n)}hasComponent(t,n){return pt(this.world,t,n)}getComponent(t,n){return Mi(this.world,t,n)}setComponent(t,n,r){this.addComponent(t,n);const i=n;for(const[s,u]of Object.entries(r)){const m=i[s];m!=null&&(m[t]=u)}}addRelation(t,n,r){Ct(this.world,t,n.relation(r))}hasRelation(t,n,r){return pt(this.world,t,n.relation(r))}getRelationTargets(t,n){return St(this.world,t,n.relation)}ensureFieldAccessors(){return this._fieldAccessors||(this._fieldAccessors=new Map),this._fieldAccessors}resolveFieldPath(t){const n=t.lastIndexOf(".");return n===-1?null:{component:t.slice(0,n),field:t.slice(n+1)}}bindFieldAccessor(t,n,r){const i=Bi(n);if(!i)return null;const s=dr(r),u=Ir(i.component);if(u?.accessors?.[s]){const y=u.accessors[s];return this.ensureFieldAccessors().set(t,y),y}const m=i.component[s];if(m==null)return null;const p=vs(m,1,0);return this.ensureFieldAccessors().set(t,p),p}getFieldAccessor(t){return this._fieldAccessors?.get(t)}removeFieldAccessor(t){return this._fieldAccessors?.delete(t)??!1}dispose(){if(!this._disposed){this.stop(),this._fieldAccessors=null;for(const t of this.scheduler.systems)t.dispose?.(this);this._disposed=!0}}}class Ot{static defaultPlugins=[];static loading=null;_plugins=[];_systems=[];_scenes=[];_excludedPlugins=new Set;_useDefaultPlugins=!0;_canvas=null;_gpu=null;_loading=void 0;withCanvas(t){return this._canvas=t,this}withGPU(t){return this._gpu=t,this}withPlugins(...t){return this._plugins.push(...t),this}withoutPlugin(t){return this._excludedPlugins.add(t),this}withoutPlugins(...t){for(const n of t)this._excludedPlugins.add(n);return this}withoutDefaultPlugins(){return this._useDefaultPlugins=!1,this}withSystems(...t){return this._systems.push(...t),this}withScene(t){return this._scenes.push(t),this}withLoading(t){return this._loading=t,this}async build(){const t=this._loading===void 0&&this._canvas?Ot.loading?.(this._canvas)??null:this._loading,n=t?.show(),r=new xs(this._canvas,this._gpu),i=new Set;if(this._useDefaultPlugins)for(const P of Ot.defaultPlugins)this._excludedPlugins.has(P)||i.add(P);for(const P of this._plugins)i.add(P);const s=[...i];for(const P of s)r.register(P);const u=[];for(const P of s)for(const T of P.dependencies??[])s.includes(T)&&u.push([T,P]);const m=an(s,u);let p=0;const y=m.length;for(const P of m)await P.initialize?.(r),p++,t?.update(p/y);for(const P of this._systems)r.scheduler.register(P);for(const P of this._scenes){const{loadSceneFile:T}=await hn(async()=>{const{loadSceneFile:C}=await Promise.resolve().then(()=>qa);return{loadSceneFile:C}},void 0,import.meta.url),B=await T(r,P);B.errors.length>0&&console.warn(`Scene "${P}" loaded with errors:`,B.errors)}return n?.(),r}async run(){const t=await this.build();return await t.start(),t}}async function Ms(){if(!navigator.gpu)throw new Error("WebGPU not supported");const e=await navigator.gpu.requestAdapter();if(!e)throw new Error("No GPU adapter found");return e.requestDevice()}const Ii=new Map;function _i(e,t){const n=Oo({exclusive:t?.exclusive,autoRemoveSubject:t?.autoRemoveSubject}),r={name:Pt(e),relation:n,exclusive:t?.exclusive,autoRemoveSubject:t?.autoRemoveSubject};return Ii.set(r.name,r),r}function Ss(e){return Ii.get(Pt(e))}function Ps(e,t){return class extends e{constructor(...n){super(...n),t(this)}}}const Es=Ps(Array,e=>e.fill(0));let Z=1e-6;function As(e){const t=Z;return Z=e,t}function Ts(e){return e*Math.PI/180}function Bs(e){return e*180/Math.PI}function Is(e,t,n){return e+(t-e)*n}function _s(e,t,n){const r=t-e;return Math.abs(t-e)<Z?e:(n-e)/r}function zs(e,t){return(e%t+t)%t}var zt={__proto__:null,get EPSILON(){return Z},degToRad:Ts,euclideanModulo:zs,inverseLerp:_s,lerp:Is,radToDeg:Bs,setEpsilon:As};function Ns(e){function t(S=0,E=0){const A=new e(2);return S!==void 0&&(A[0]=S,E!==void 0&&(A[1]=E)),A}const n=t;function r(S,E,A){const o=A??new e(2);return o[0]=S,o[1]=E,o}function i(S,E){const A=E??new e(2);return A[0]=Math.ceil(S[0]),A[1]=Math.ceil(S[1]),A}function s(S,E){const A=E??new e(2);return A[0]=Math.floor(S[0]),A[1]=Math.floor(S[1]),A}function u(S,E){const A=E??new e(2);return A[0]=Math.round(S[0]),A[1]=Math.round(S[1]),A}function m(S,E=0,A=1,o){const w=o??new e(2);return w[0]=Math.min(A,Math.max(E,S[0])),w[1]=Math.min(A,Math.max(E,S[1])),w}function p(S,E,A){const o=A??new e(2);return o[0]=S[0]+E[0],o[1]=S[1]+E[1],o}function y(S,E,A,o){const w=o??new e(2);return w[0]=S[0]+E[0]*A,w[1]=S[1]+E[1]*A,w}function P(S,E){const A=S[0],o=S[1],w=E[0],l=E[1],d=Math.sqrt(A*A+o*o),c=Math.sqrt(w*w+l*l),h=d*c,M=h&&we(S,E)/h;return Math.acos(M)}function T(S,E,A){const o=A??new e(2);return o[0]=S[0]-E[0],o[1]=S[1]-E[1],o}const B=T;function C(S,E){return Math.abs(S[0]-E[0])<Z&&Math.abs(S[1]-E[1])<Z}function O(S,E){return S[0]===E[0]&&S[1]===E[1]}function F(S,E,A,o){const w=o??new e(2);return w[0]=S[0]+A*(E[0]-S[0]),w[1]=S[1]+A*(E[1]-S[1]),w}function V(S,E,A,o){const w=o??new e(2);return w[0]=S[0]+A[0]*(E[0]-S[0]),w[1]=S[1]+A[1]*(E[1]-S[1]),w}function $(S,E,A){const o=A??new e(2);return o[0]=Math.max(S[0],E[0]),o[1]=Math.max(S[1],E[1]),o}function q(S,E,A){const o=A??new e(2);return o[0]=Math.min(S[0],E[0]),o[1]=Math.min(S[1],E[1]),o}function se(S,E,A){const o=A??new e(2);return o[0]=S[0]*E,o[1]=S[1]*E,o}const R=se;function W(S,E,A){const o=A??new e(2);return o[0]=S[0]/E,o[1]=S[1]/E,o}function J(S,E){const A=E??new e(2);return A[0]=1/S[0],A[1]=1/S[1],A}const ce=J;function ye(S,E,A){const o=A??new e(3),w=S[0]*E[1]-S[1]*E[0];return o[0]=0,o[1]=0,o[2]=w,o}function we(S,E){return S[0]*E[0]+S[1]*E[1]}function Se(S){const E=S[0],A=S[1];return Math.sqrt(E*E+A*A)}const Je=Se;function Ce(S){const E=S[0],A=S[1];return E*E+A*A}const et=Ce;function Ee(S,E){const A=S[0]-E[0],o=S[1]-E[1];return Math.sqrt(A*A+o*o)}const ee=Ee;function te(S,E){const A=S[0]-E[0],o=S[1]-E[1];return A*A+o*o}const Q=te;function Oe(S,E){const A=E??new e(2),o=S[0],w=S[1],l=Math.sqrt(o*o+w*w);return l>1e-5?(A[0]=o/l,A[1]=w/l):(A[0]=0,A[1]=0),A}function tt(S,E){const A=E??new e(2);return A[0]=-S[0],A[1]=-S[1],A}function le(S,E){const A=E??new e(2);return A[0]=S[0],A[1]=S[1],A}const nt=le;function Ye(S,E,A){const o=A??new e(2);return o[0]=S[0]*E[0],o[1]=S[1]*E[1],o}const rt=Ye;function Xe(S,E,A){const o=A??new e(2);return o[0]=S[0]/E[0],o[1]=S[1]/E[1],o}const We=Xe;function Qe(S=1,E){const A=E??new e(2),o=Math.random()*2*Math.PI;return A[0]=Math.cos(o)*S,A[1]=Math.sin(o)*S,A}function I(S){const E=S??new e(2);return E[0]=0,E[1]=0,E}function U(S,E,A){const o=A??new e(2),w=S[0],l=S[1];return o[0]=w*E[0]+l*E[4]+E[12],o[1]=w*E[1]+l*E[5]+E[13],o}function x(S,E,A){const o=A??new e(2),w=S[0],l=S[1];return o[0]=E[0]*w+E[4]*l+E[8],o[1]=E[1]*w+E[5]*l+E[9],o}function a(S,E,A,o){const w=o??new e(2),l=S[0]-E[0],d=S[1]-E[1],c=Math.sin(A),h=Math.cos(A);return w[0]=l*h-d*c+E[0],w[1]=l*c+d*h+E[1],w}function g(S,E,A){const o=A??new e(2);return Oe(S,o),se(o,E,o)}function f(S,E,A){const o=A??new e(2);return Se(S)>E?g(S,E,o):le(S,o)}function b(S,E,A){const o=A??new e(2);return F(S,E,.5,o)}return{create:t,fromValues:n,set:r,ceil:i,floor:s,round:u,clamp:m,add:p,addScaled:y,angle:P,subtract:T,sub:B,equalsApproximately:C,equals:O,lerp:F,lerpV:V,max:$,min:q,mulScalar:se,scale:R,divScalar:W,inverse:J,invert:ce,cross:ye,dot:we,length:Se,len:Je,lengthSq:Ce,lenSq:et,distance:Ee,dist:ee,distanceSq:te,distSq:Q,normalize:Oe,negate:tt,copy:le,clone:nt,multiply:Ye,mul:rt,divide:Xe,div:We,random:Qe,zero:I,transformMat4:U,transformMat3:x,rotate:a,setLength:g,truncate:f,midpoint:b}}const _r=new Map;function zi(e){let t=_r.get(e);return t||(t=Ns(e),_r.set(e,t)),t}function Us(e){function t(c,h,M){const v=new e(3);return c!==void 0&&(v[0]=c,h!==void 0&&(v[1]=h,M!==void 0&&(v[2]=M))),v}const n=t;function r(c,h,M,v){const _=v??new e(3);return _[0]=c,_[1]=h,_[2]=M,_}function i(c,h){const M=h??new e(3);return M[0]=Math.ceil(c[0]),M[1]=Math.ceil(c[1]),M[2]=Math.ceil(c[2]),M}function s(c,h){const M=h??new e(3);return M[0]=Math.floor(c[0]),M[1]=Math.floor(c[1]),M[2]=Math.floor(c[2]),M}function u(c,h){const M=h??new e(3);return M[0]=Math.round(c[0]),M[1]=Math.round(c[1]),M[2]=Math.round(c[2]),M}function m(c,h=0,M=1,v){const _=v??new e(3);return _[0]=Math.min(M,Math.max(h,c[0])),_[1]=Math.min(M,Math.max(h,c[1])),_[2]=Math.min(M,Math.max(h,c[2])),_}function p(c,h,M){const v=M??new e(3);return v[0]=c[0]+h[0],v[1]=c[1]+h[1],v[2]=c[2]+h[2],v}function y(c,h,M,v){const _=v??new e(3);return _[0]=c[0]+h[0]*M,_[1]=c[1]+h[1]*M,_[2]=c[2]+h[2]*M,_}function P(c,h){const M=c[0],v=c[1],_=c[2],z=h[0],N=h[1],L=h[2],D=Math.sqrt(M*M+v*v+_*_),G=Math.sqrt(z*z+N*N+L*L),Y=D*G,H=Y&&we(c,h)/Y;return Math.acos(H)}function T(c,h,M){const v=M??new e(3);return v[0]=c[0]-h[0],v[1]=c[1]-h[1],v[2]=c[2]-h[2],v}const B=T;function C(c,h){return Math.abs(c[0]-h[0])<Z&&Math.abs(c[1]-h[1])<Z&&Math.abs(c[2]-h[2])<Z}function O(c,h){return c[0]===h[0]&&c[1]===h[1]&&c[2]===h[2]}function F(c,h,M,v){const _=v??new e(3);return _[0]=c[0]+M*(h[0]-c[0]),_[1]=c[1]+M*(h[1]-c[1]),_[2]=c[2]+M*(h[2]-c[2]),_}function V(c,h,M,v){const _=v??new e(3);return _[0]=c[0]+M[0]*(h[0]-c[0]),_[1]=c[1]+M[1]*(h[1]-c[1]),_[2]=c[2]+M[2]*(h[2]-c[2]),_}function $(c,h,M){const v=M??new e(3);return v[0]=Math.max(c[0],h[0]),v[1]=Math.max(c[1],h[1]),v[2]=Math.max(c[2],h[2]),v}function q(c,h,M){const v=M??new e(3);return v[0]=Math.min(c[0],h[0]),v[1]=Math.min(c[1],h[1]),v[2]=Math.min(c[2],h[2]),v}function se(c,h,M){const v=M??new e(3);return v[0]=c[0]*h,v[1]=c[1]*h,v[2]=c[2]*h,v}const R=se;function W(c,h,M){const v=M??new e(3);return v[0]=c[0]/h,v[1]=c[1]/h,v[2]=c[2]/h,v}function J(c,h){const M=h??new e(3);return M[0]=1/c[0],M[1]=1/c[1],M[2]=1/c[2],M}const ce=J;function ye(c,h,M){const v=M??new e(3),_=c[2]*h[0]-c[0]*h[2],z=c[0]*h[1]-c[1]*h[0];return v[0]=c[1]*h[2]-c[2]*h[1],v[1]=_,v[2]=z,v}function we(c,h){return c[0]*h[0]+c[1]*h[1]+c[2]*h[2]}function Se(c){const h=c[0],M=c[1],v=c[2];return Math.sqrt(h*h+M*M+v*v)}const Je=Se;function Ce(c){const h=c[0],M=c[1],v=c[2];return h*h+M*M+v*v}const et=Ce;function Ee(c,h){const M=c[0]-h[0],v=c[1]-h[1],_=c[2]-h[2];return Math.sqrt(M*M+v*v+_*_)}const ee=Ee;function te(c,h){const M=c[0]-h[0],v=c[1]-h[1],_=c[2]-h[2];return M*M+v*v+_*_}const Q=te;function Oe(c,h){const M=h??new e(3),v=c[0],_=c[1],z=c[2],N=Math.sqrt(v*v+_*_+z*z);return N>1e-5?(M[0]=v/N,M[1]=_/N,M[2]=z/N):(M[0]=0,M[1]=0,M[2]=0),M}function tt(c,h){const M=h??new e(3);return M[0]=-c[0],M[1]=-c[1],M[2]=-c[2],M}function le(c,h){const M=h??new e(3);return M[0]=c[0],M[1]=c[1],M[2]=c[2],M}const nt=le;function Ye(c,h,M){const v=M??new e(3);return v[0]=c[0]*h[0],v[1]=c[1]*h[1],v[2]=c[2]*h[2],v}const rt=Ye;function Xe(c,h,M){const v=M??new e(3);return v[0]=c[0]/h[0],v[1]=c[1]/h[1],v[2]=c[2]/h[2],v}const We=Xe;function Qe(c=1,h){const M=h??new e(3),v=Math.random()*2*Math.PI,_=Math.random()*2-1,z=Math.sqrt(1-_*_)*c;return M[0]=Math.cos(v)*z,M[1]=Math.sin(v)*z,M[2]=_*c,M}function I(c){const h=c??new e(3);return h[0]=0,h[1]=0,h[2]=0,h}function U(c,h,M){const v=M??new e(3),_=c[0],z=c[1],N=c[2],L=h[3]*_+h[7]*z+h[11]*N+h[15]||1;return v[0]=(h[0]*_+h[4]*z+h[8]*N+h[12])/L,v[1]=(h[1]*_+h[5]*z+h[9]*N+h[13])/L,v[2]=(h[2]*_+h[6]*z+h[10]*N+h[14])/L,v}function x(c,h,M){const v=M??new e(3),_=c[0],z=c[1],N=c[2];return v[0]=_*h[0]+z*h[4]+N*h[8],v[1]=_*h[1]+z*h[5]+N*h[9],v[2]=_*h[2]+z*h[6]+N*h[10],v}function a(c,h,M){const v=M??new e(3),_=c[0],z=c[1],N=c[2];return v[0]=_*h[0]+z*h[4]+N*h[8],v[1]=_*h[1]+z*h[5]+N*h[9],v[2]=_*h[2]+z*h[6]+N*h[10],v}function g(c,h,M){const v=M??new e(3),_=h[0],z=h[1],N=h[2],L=h[3]*2,D=c[0],G=c[1],Y=c[2],H=z*Y-N*G,X=N*D-_*Y,k=_*G-z*D;return v[0]=D+H*L+(z*k-N*X)*2,v[1]=G+X*L+(N*H-_*k)*2,v[2]=Y+k*L+(_*X-z*H)*2,v}function f(c,h){const M=h??new e(3);return M[0]=c[12],M[1]=c[13],M[2]=c[14],M}function b(c,h,M){const v=M??new e(3),_=h*4;return v[0]=c[_+0],v[1]=c[_+1],v[2]=c[_+2],v}function S(c,h){const M=h??new e(3),v=c[0],_=c[1],z=c[2],N=c[4],L=c[5],D=c[6],G=c[8],Y=c[9],H=c[10];return M[0]=Math.sqrt(v*v+_*_+z*z),M[1]=Math.sqrt(N*N+L*L+D*D),M[2]=Math.sqrt(G*G+Y*Y+H*H),M}function E(c,h,M,v){const _=v??new e(3),z=[],N=[];return z[0]=c[0]-h[0],z[1]=c[1]-h[1],z[2]=c[2]-h[2],N[0]=z[0],N[1]=z[1]*Math.cos(M)-z[2]*Math.sin(M),N[2]=z[1]*Math.sin(M)+z[2]*Math.cos(M),_[0]=N[0]+h[0],_[1]=N[1]+h[1],_[2]=N[2]+h[2],_}function A(c,h,M,v){const _=v??new e(3),z=[],N=[];return z[0]=c[0]-h[0],z[1]=c[1]-h[1],z[2]=c[2]-h[2],N[0]=z[2]*Math.sin(M)+z[0]*Math.cos(M),N[1]=z[1],N[2]=z[2]*Math.cos(M)-z[0]*Math.sin(M),_[0]=N[0]+h[0],_[1]=N[1]+h[1],_[2]=N[2]+h[2],_}function o(c,h,M,v){const _=v??new e(3),z=[],N=[];return z[0]=c[0]-h[0],z[1]=c[1]-h[1],z[2]=c[2]-h[2],N[0]=z[0]*Math.cos(M)-z[1]*Math.sin(M),N[1]=z[0]*Math.sin(M)+z[1]*Math.cos(M),N[2]=z[2],_[0]=N[0]+h[0],_[1]=N[1]+h[1],_[2]=N[2]+h[2],_}function w(c,h,M){const v=M??new e(3);return Oe(c,v),se(v,h,v)}function l(c,h,M){const v=M??new e(3);return Se(c)>h?w(c,h,v):le(c,v)}function d(c,h,M){const v=M??new e(3);return F(c,h,.5,v)}return{create:t,fromValues:n,set:r,ceil:i,floor:s,round:u,clamp:m,add:p,addScaled:y,angle:P,subtract:T,sub:B,equalsApproximately:C,equals:O,lerp:F,lerpV:V,max:$,min:q,mulScalar:se,scale:R,divScalar:W,inverse:J,invert:ce,cross:ye,dot:we,length:Se,len:Je,lengthSq:Ce,lenSq:et,distance:Ee,dist:ee,distanceSq:te,distSq:Q,normalize:Oe,negate:tt,copy:le,clone:nt,multiply:Ye,mul:rt,divide:Xe,div:We,random:Qe,zero:I,transformMat4:U,transformMat4Upper3x3:x,transformMat3:a,transformQuat:g,getTranslation:f,getAxis:b,getScaling:S,rotateX:E,rotateY:A,rotateZ:o,setLength:w,truncate:l,midpoint:d}}const zr=new Map;function Sn(e){let t=zr.get(e);return t||(t=Us(e),zr.set(e,t)),t}function Cs(e){const t=zi(e),n=Sn(e);function r(a,g,f,b,S,E,A,o,w){const l=new e(12);return l[3]=0,l[7]=0,l[11]=0,a!==void 0&&(l[0]=a,g!==void 0&&(l[1]=g,f!==void 0&&(l[2]=f,b!==void 0&&(l[4]=b,S!==void 0&&(l[5]=S,E!==void 0&&(l[6]=E,A!==void 0&&(l[8]=A,o!==void 0&&(l[9]=o,w!==void 0&&(l[10]=w))))))))),l}function i(a,g,f,b,S,E,A,o,w,l){const d=l??new e(12);return d[0]=a,d[1]=g,d[2]=f,d[3]=0,d[4]=b,d[5]=S,d[6]=E,d[7]=0,d[8]=A,d[9]=o,d[10]=w,d[11]=0,d}function s(a,g){const f=g??new e(12);return f[0]=a[0],f[1]=a[1],f[2]=a[2],f[3]=0,f[4]=a[4],f[5]=a[5],f[6]=a[6],f[7]=0,f[8]=a[8],f[9]=a[9],f[10]=a[10],f[11]=0,f}function u(a,g){const f=g??new e(12),b=a[0],S=a[1],E=a[2],A=a[3],o=b+b,w=S+S,l=E+E,d=b*o,c=S*o,h=S*w,M=E*o,v=E*w,_=E*l,z=A*o,N=A*w,L=A*l;return f[0]=1-h-_,f[1]=c+L,f[2]=M-N,f[3]=0,f[4]=c-L,f[5]=1-d-_,f[6]=v+z,f[7]=0,f[8]=M+N,f[9]=v-z,f[10]=1-d-h,f[11]=0,f}function m(a,g){const f=g??new e(12);return f[0]=-a[0],f[1]=-a[1],f[2]=-a[2],f[4]=-a[4],f[5]=-a[5],f[6]=-a[6],f[8]=-a[8],f[9]=-a[9],f[10]=-a[10],f}function p(a,g,f){const b=f??new e(12);return b[0]=a[0]*g,b[1]=a[1]*g,b[2]=a[2]*g,b[4]=a[4]*g,b[5]=a[5]*g,b[6]=a[6]*g,b[8]=a[8]*g,b[9]=a[9]*g,b[10]=a[10]*g,b}const y=p;function P(a,g,f){const b=f??new e(12);return b[0]=a[0]+g[0],b[1]=a[1]+g[1],b[2]=a[2]+g[2],b[4]=a[4]+g[4],b[5]=a[5]+g[5],b[6]=a[6]+g[6],b[8]=a[8]+g[8],b[9]=a[9]+g[9],b[10]=a[10]+g[10],b}function T(a,g){const f=g??new e(12);return f[0]=a[0],f[1]=a[1],f[2]=a[2],f[4]=a[4],f[5]=a[5],f[6]=a[6],f[8]=a[8],f[9]=a[9],f[10]=a[10],f}const B=T;function C(a,g){return Math.abs(a[0]-g[0])<Z&&Math.abs(a[1]-g[1])<Z&&Math.abs(a[2]-g[2])<Z&&Math.abs(a[4]-g[4])<Z&&Math.abs(a[5]-g[5])<Z&&Math.abs(a[6]-g[6])<Z&&Math.abs(a[8]-g[8])<Z&&Math.abs(a[9]-g[9])<Z&&Math.abs(a[10]-g[10])<Z}function O(a,g){return a[0]===g[0]&&a[1]===g[1]&&a[2]===g[2]&&a[4]===g[4]&&a[5]===g[5]&&a[6]===g[6]&&a[8]===g[8]&&a[9]===g[9]&&a[10]===g[10]}function F(a){const g=a??new e(12);return g[0]=1,g[1]=0,g[2]=0,g[4]=0,g[5]=1,g[6]=0,g[8]=0,g[9]=0,g[10]=1,g}function V(a,g){const f=g??new e(12);if(f===a){let h;return h=a[1],a[1]=a[4],a[4]=h,h=a[2],a[2]=a[8],a[8]=h,h=a[6],a[6]=a[9],a[9]=h,f}const b=a[0],S=a[1],E=a[2],A=a[4],o=a[5],w=a[6],l=a[8],d=a[9],c=a[10];return f[0]=b,f[1]=A,f[2]=l,f[4]=S,f[5]=o,f[6]=d,f[8]=E,f[9]=w,f[10]=c,f}function $(a,g){const f=g??new e(12),b=a[0],S=a[1],E=a[2],A=a[4],o=a[5],w=a[6],l=a[8],d=a[9],c=a[10],h=c*o-w*d,M=-c*A+w*l,v=d*A-o*l,_=1/(b*h+S*M+E*v);return f[0]=h*_,f[1]=(-c*S+E*d)*_,f[2]=(w*S-E*o)*_,f[4]=M*_,f[5]=(c*b-E*l)*_,f[6]=(-w*b+E*A)*_,f[8]=v*_,f[9]=(-d*b+S*l)*_,f[10]=(o*b-S*A)*_,f}function q(a){const g=a[0],f=a[1],b=a[2],S=a[4],E=a[5],A=a[6],o=a[8],w=a[9],l=a[10];return g*(E*l-w*A)-S*(f*l-w*b)+o*(f*A-E*b)}const se=$;function R(a,g,f){const b=f??new e(12),S=a[0],E=a[1],A=a[2],o=a[4],w=a[5],l=a[6],d=a[8],c=a[9],h=a[10],M=g[0],v=g[1],_=g[2],z=g[4],N=g[5],L=g[6],D=g[8],G=g[9],Y=g[10];return b[0]=S*M+o*v+d*_,b[1]=E*M+w*v+c*_,b[2]=A*M+l*v+h*_,b[4]=S*z+o*N+d*L,b[5]=E*z+w*N+c*L,b[6]=A*z+l*N+h*L,b[8]=S*D+o*G+d*Y,b[9]=E*D+w*G+c*Y,b[10]=A*D+l*G+h*Y,b}const W=R;function J(a,g,f){const b=f??F();return a!==b&&(b[0]=a[0],b[1]=a[1],b[2]=a[2],b[4]=a[4],b[5]=a[5],b[6]=a[6]),b[8]=g[0],b[9]=g[1],b[10]=1,b}function ce(a,g){const f=g??t.create();return f[0]=a[8],f[1]=a[9],f}function ye(a,g,f){const b=f??t.create(),S=g*4;return b[0]=a[S+0],b[1]=a[S+1],b}function we(a,g,f,b){const S=b===a?a:T(a,b),E=f*4;return S[E+0]=g[0],S[E+1]=g[1],S}function Se(a,g){const f=g??t.create(),b=a[0],S=a[1],E=a[4],A=a[5];return f[0]=Math.sqrt(b*b+S*S),f[1]=Math.sqrt(E*E+A*A),f}function Je(a,g){const f=g??n.create(),b=a[0],S=a[1],E=a[2],A=a[4],o=a[5],w=a[6],l=a[8],d=a[9],c=a[10];return f[0]=Math.sqrt(b*b+S*S+E*E),f[1]=Math.sqrt(A*A+o*o+w*w),f[2]=Math.sqrt(l*l+d*d+c*c),f}function Ce(a,g){const f=g??new e(12);return f[0]=1,f[1]=0,f[2]=0,f[4]=0,f[5]=1,f[6]=0,f[8]=a[0],f[9]=a[1],f[10]=1,f}function et(a,g,f){const b=f??new e(12),S=g[0],E=g[1],A=a[0],o=a[1],w=a[2],l=a[4],d=a[5],c=a[6],h=a[8],M=a[9],v=a[10];return a!==b&&(b[0]=A,b[1]=o,b[2]=w,b[4]=l,b[5]=d,b[6]=c),b[8]=A*S+l*E+h,b[9]=o*S+d*E+M,b[10]=w*S+c*E+v,b}function Ee(a,g){const f=g??new e(12),b=Math.cos(a),S=Math.sin(a);return f[0]=b,f[1]=S,f[2]=0,f[4]=-S,f[5]=b,f[6]=0,f[8]=0,f[9]=0,f[10]=1,f}function ee(a,g,f){const b=f??new e(12),S=a[0],E=a[1],A=a[2],o=a[4],w=a[5],l=a[6],d=Math.cos(g),c=Math.sin(g);return b[0]=d*S+c*o,b[1]=d*E+c*w,b[2]=d*A+c*l,b[4]=d*o-c*S,b[5]=d*w-c*E,b[6]=d*l-c*A,a!==b&&(b[8]=a[8],b[9]=a[9],b[10]=a[10]),b}function te(a,g){const f=g??new e(12),b=Math.cos(a),S=Math.sin(a);return f[0]=1,f[1]=0,f[2]=0,f[4]=0,f[5]=b,f[6]=S,f[8]=0,f[9]=-S,f[10]=b,f}function Q(a,g,f){const b=f??new e(12),S=a[4],E=a[5],A=a[6],o=a[8],w=a[9],l=a[10],d=Math.cos(g),c=Math.sin(g);return b[4]=d*S+c*o,b[5]=d*E+c*w,b[6]=d*A+c*l,b[8]=d*o-c*S,b[9]=d*w-c*E,b[10]=d*l-c*A,a!==b&&(b[0]=a[0],b[1]=a[1],b[2]=a[2]),b}function Oe(a,g){const f=g??new e(12),b=Math.cos(a),S=Math.sin(a);return f[0]=b,f[1]=0,f[2]=-S,f[4]=0,f[5]=1,f[6]=0,f[8]=S,f[9]=0,f[10]=b,f}function tt(a,g,f){const b=f??new e(12),S=a[0],E=a[1],A=a[2],o=a[8],w=a[9],l=a[10],d=Math.cos(g),c=Math.sin(g);return b[0]=d*S-c*o,b[1]=d*E-c*w,b[2]=d*A-c*l,b[8]=d*o+c*S,b[9]=d*w+c*E,b[10]=d*l+c*A,a!==b&&(b[4]=a[4],b[5]=a[5],b[6]=a[6]),b}const le=Ee,nt=ee;function Ye(a,g){const f=g??new e(12);return f[0]=a[0],f[1]=0,f[2]=0,f[4]=0,f[5]=a[1],f[6]=0,f[8]=0,f[9]=0,f[10]=1,f}function rt(a,g,f){const b=f??new e(12),S=g[0],E=g[1];return b[0]=S*a[0],b[1]=S*a[1],b[2]=S*a[2],b[4]=E*a[4],b[5]=E*a[5],b[6]=E*a[6],a!==b&&(b[8]=a[8],b[9]=a[9],b[10]=a[10]),b}function Xe(a,g){const f=g??new e(12);return f[0]=a[0],f[1]=0,f[2]=0,f[4]=0,f[5]=a[1],f[6]=0,f[8]=0,f[9]=0,f[10]=a[2],f}function We(a,g,f){const b=f??new e(12),S=g[0],E=g[1],A=g[2];return b[0]=S*a[0],b[1]=S*a[1],b[2]=S*a[2],b[4]=E*a[4],b[5]=E*a[5],b[6]=E*a[6],b[8]=A*a[8],b[9]=A*a[9],b[10]=A*a[10],b}function Qe(a,g){const f=g??new e(12);return f[0]=a,f[1]=0,f[2]=0,f[4]=0,f[5]=a,f[6]=0,f[8]=0,f[9]=0,f[10]=1,f}function I(a,g,f){const b=f??new e(12);return b[0]=g*a[0],b[1]=g*a[1],b[2]=g*a[2],b[4]=g*a[4],b[5]=g*a[5],b[6]=g*a[6],a!==b&&(b[8]=a[8],b[9]=a[9],b[10]=a[10]),b}function U(a,g){const f=g??new e(12);return f[0]=a,f[1]=0,f[2]=0,f[4]=0,f[5]=a,f[6]=0,f[8]=0,f[9]=0,f[10]=a,f}function x(a,g,f){const b=f??new e(12);return b[0]=g*a[0],b[1]=g*a[1],b[2]=g*a[2],b[4]=g*a[4],b[5]=g*a[5],b[6]=g*a[6],b[8]=g*a[8],b[9]=g*a[9],b[10]=g*a[10],b}return{add:P,clone:B,copy:T,create:r,determinant:q,equals:O,equalsApproximately:C,fromMat4:s,fromQuat:u,get3DScaling:Je,getAxis:ye,getScaling:Se,getTranslation:ce,identity:F,inverse:$,invert:se,mul:W,mulScalar:y,multiply:R,multiplyScalar:p,negate:m,rotate:ee,rotateX:Q,rotateY:tt,rotateZ:nt,rotation:Ee,rotationX:te,rotationY:Oe,rotationZ:le,scale:rt,scale3D:We,scaling:Ye,scaling3D:Xe,set:i,setAxis:we,setTranslation:J,translate:et,translation:Ce,transpose:V,uniformScale:I,uniformScale3D:x,uniformScaling:Qe,uniformScaling3D:U}}const Nr=new Map;function Os(e){let t=Nr.get(e);return t||(t=Cs(e),Nr.set(e,t)),t}function Rs(e){const t=Sn(e);function n(o,w,l,d,c,h,M,v,_,z,N,L,D,G,Y,H){const X=new e(16);return o!==void 0&&(X[0]=o,w!==void 0&&(X[1]=w,l!==void 0&&(X[2]=l,d!==void 0&&(X[3]=d,c!==void 0&&(X[4]=c,h!==void 0&&(X[5]=h,M!==void 0&&(X[6]=M,v!==void 0&&(X[7]=v,_!==void 0&&(X[8]=_,z!==void 0&&(X[9]=z,N!==void 0&&(X[10]=N,L!==void 0&&(X[11]=L,D!==void 0&&(X[12]=D,G!==void 0&&(X[13]=G,Y!==void 0&&(X[14]=Y,H!==void 0&&(X[15]=H)))))))))))))))),X}function r(o,w,l,d,c,h,M,v,_,z,N,L,D,G,Y,H,X){const k=X??new e(16);return k[0]=o,k[1]=w,k[2]=l,k[3]=d,k[4]=c,k[5]=h,k[6]=M,k[7]=v,k[8]=_,k[9]=z,k[10]=N,k[11]=L,k[12]=D,k[13]=G,k[14]=Y,k[15]=H,k}function i(o,w){const l=w??new e(16);return l[0]=o[0],l[1]=o[1],l[2]=o[2],l[3]=0,l[4]=o[4],l[5]=o[5],l[6]=o[6],l[7]=0,l[8]=o[8],l[9]=o[9],l[10]=o[10],l[11]=0,l[12]=0,l[13]=0,l[14]=0,l[15]=1,l}function s(o,w){const l=w??new e(16),d=o[0],c=o[1],h=o[2],M=o[3],v=d+d,_=c+c,z=h+h,N=d*v,L=c*v,D=c*_,G=h*v,Y=h*_,H=h*z,X=M*v,k=M*_,re=M*z;return l[0]=1-D-H,l[1]=L+re,l[2]=G-k,l[3]=0,l[4]=L-re,l[5]=1-N-H,l[6]=Y+X,l[7]=0,l[8]=G+k,l[9]=Y-X,l[10]=1-N-D,l[11]=0,l[12]=0,l[13]=0,l[14]=0,l[15]=1,l}function u(o,w){const l=w??new e(16);return l[0]=-o[0],l[1]=-o[1],l[2]=-o[2],l[3]=-o[3],l[4]=-o[4],l[5]=-o[5],l[6]=-o[6],l[7]=-o[7],l[8]=-o[8],l[9]=-o[9],l[10]=-o[10],l[11]=-o[11],l[12]=-o[12],l[13]=-o[13],l[14]=-o[14],l[15]=-o[15],l}function m(o,w,l){const d=l??new e(16);return d[0]=o[0]+w[0],d[1]=o[1]+w[1],d[2]=o[2]+w[2],d[3]=o[3]+w[3],d[4]=o[4]+w[4],d[5]=o[5]+w[5],d[6]=o[6]+w[6],d[7]=o[7]+w[7],d[8]=o[8]+w[8],d[9]=o[9]+w[9],d[10]=o[10]+w[10],d[11]=o[11]+w[11],d[12]=o[12]+w[12],d[13]=o[13]+w[13],d[14]=o[14]+w[14],d[15]=o[15]+w[15],d}function p(o,w,l){const d=l??new e(16);return d[0]=o[0]*w,d[1]=o[1]*w,d[2]=o[2]*w,d[3]=o[3]*w,d[4]=o[4]*w,d[5]=o[5]*w,d[6]=o[6]*w,d[7]=o[7]*w,d[8]=o[8]*w,d[9]=o[9]*w,d[10]=o[10]*w,d[11]=o[11]*w,d[12]=o[12]*w,d[13]=o[13]*w,d[14]=o[14]*w,d[15]=o[15]*w,d}const y=p;function P(o,w){const l=w??new e(16);return l[0]=o[0],l[1]=o[1],l[2]=o[2],l[3]=o[3],l[4]=o[4],l[5]=o[5],l[6]=o[6],l[7]=o[7],l[8]=o[8],l[9]=o[9],l[10]=o[10],l[11]=o[11],l[12]=o[12],l[13]=o[13],l[14]=o[14],l[15]=o[15],l}const T=P;function B(o,w){return Math.abs(o[0]-w[0])<Z&&Math.abs(o[1]-w[1])<Z&&Math.abs(o[2]-w[2])<Z&&Math.abs(o[3]-w[3])<Z&&Math.abs(o[4]-w[4])<Z&&Math.abs(o[5]-w[5])<Z&&Math.abs(o[6]-w[6])<Z&&Math.abs(o[7]-w[7])<Z&&Math.abs(o[8]-w[8])<Z&&Math.abs(o[9]-w[9])<Z&&Math.abs(o[10]-w[10])<Z&&Math.abs(o[11]-w[11])<Z&&Math.abs(o[12]-w[12])<Z&&Math.abs(o[13]-w[13])<Z&&Math.abs(o[14]-w[14])<Z&&Math.abs(o[15]-w[15])<Z}function C(o,w){return o[0]===w[0]&&o[1]===w[1]&&o[2]===w[2]&&o[3]===w[3]&&o[4]===w[4]&&o[5]===w[5]&&o[6]===w[6]&&o[7]===w[7]&&o[8]===w[8]&&o[9]===w[9]&&o[10]===w[10]&&o[11]===w[11]&&o[12]===w[12]&&o[13]===w[13]&&o[14]===w[14]&&o[15]===w[15]}function O(o){const w=o??new e(16);return w[0]=1,w[1]=0,w[2]=0,w[3]=0,w[4]=0,w[5]=1,w[6]=0,w[7]=0,w[8]=0,w[9]=0,w[10]=1,w[11]=0,w[12]=0,w[13]=0,w[14]=0,w[15]=1,w}function F(o,w){const l=w??new e(16);if(l===o){let ne;return ne=o[1],o[1]=o[4],o[4]=ne,ne=o[2],o[2]=o[8],o[8]=ne,ne=o[3],o[3]=o[12],o[12]=ne,ne=o[6],o[6]=o[9],o[9]=ne,ne=o[7],o[7]=o[13],o[13]=ne,ne=o[11],o[11]=o[14],o[14]=ne,l}const d=o[0],c=o[1],h=o[2],M=o[3],v=o[4],_=o[5],z=o[6],N=o[7],L=o[8],D=o[9],G=o[10],Y=o[11],H=o[12],X=o[13],k=o[14],re=o[15];return l[0]=d,l[1]=v,l[2]=L,l[3]=H,l[4]=c,l[5]=_,l[6]=D,l[7]=X,l[8]=h,l[9]=z,l[10]=G,l[11]=k,l[12]=M,l[13]=N,l[14]=Y,l[15]=re,l}function V(o,w){const l=w??new e(16),d=o[0],c=o[1],h=o[2],M=o[3],v=o[4],_=o[5],z=o[6],N=o[7],L=o[8],D=o[9],G=o[10],Y=o[11],H=o[12],X=o[13],k=o[14],re=o[15],ne=G*re,me=k*Y,be=z*re,ve=k*N,Pe=z*Y,Ae=G*N,Te=h*re,Be=k*M,Ie=h*Y,_e=G*M,Re=h*N,De=z*M,Ge=L*X,Fe=H*D,$e=v*X,Ze=H*_,je=v*D,Qt=L*_,Kt=d*X,Jt=H*c,en=d*D,tn=L*c,nn=d*_,rn=v*c,vr=ne*_+ve*D+Pe*X-(me*_+be*D+Ae*X),xr=me*c+Te*D+_e*X-(ne*c+Be*D+Ie*X),Mr=be*c+Be*_+Re*X-(ve*c+Te*_+De*X),Sr=Ae*c+Ie*_+De*D-(Pe*c+_e*_+Re*D),ze=1/(d*vr+v*xr+L*Mr+H*Sr);return l[0]=ze*vr,l[1]=ze*xr,l[2]=ze*Mr,l[3]=ze*Sr,l[4]=ze*(me*v+be*L+Ae*H-(ne*v+ve*L+Pe*H)),l[5]=ze*(ne*d+Be*L+Ie*H-(me*d+Te*L+_e*H)),l[6]=ze*(ve*d+Te*v+De*H-(be*d+Be*v+Re*H)),l[7]=ze*(Pe*d+_e*v+Re*L-(Ae*d+Ie*v+De*L)),l[8]=ze*(Ge*N+Ze*Y+je*re-(Fe*N+$e*Y+Qt*re)),l[9]=ze*(Fe*M+Kt*Y+tn*re-(Ge*M+Jt*Y+en*re)),l[10]=ze*($e*M+Jt*N+nn*re-(Ze*M+Kt*N+rn*re)),l[11]=ze*(Qt*M+en*N+rn*Y-(je*M+tn*N+nn*Y)),l[12]=ze*($e*G+Qt*k+Fe*z-(je*k+Ge*z+Ze*G)),l[13]=ze*(en*k+Ge*h+Jt*G-(Kt*G+tn*k+Fe*h)),l[14]=ze*(Kt*z+rn*k+Ze*h-(nn*k+$e*h+Jt*z)),l[15]=ze*(nn*G+je*h+tn*z-(en*z+rn*G+Qt*h)),l}function $(o){const w=o[0],l=o[1],d=o[2],c=o[3],h=o[4],M=o[5],v=o[6],_=o[7],z=o[8],N=o[9],L=o[10],D=o[11],G=o[12],Y=o[13],H=o[14],X=o[15],k=L*X,re=H*D,ne=v*X,me=H*_,be=v*D,ve=L*_,Pe=d*X,Ae=H*c,Te=d*D,Be=L*c,Ie=d*_,_e=v*c,Re=k*M+me*N+be*Y-(re*M+ne*N+ve*Y),De=re*l+Pe*N+Be*Y-(k*l+Ae*N+Te*Y),Ge=ne*l+Ae*M+Ie*Y-(me*l+Pe*M+_e*Y),Fe=ve*l+Te*M+_e*N-(be*l+Be*M+Ie*N);return w*Re+h*De+z*Ge+G*Fe}const q=V;function se(o,w,l){const d=l??new e(16),c=o[0],h=o[1],M=o[2],v=o[3],_=o[4],z=o[5],N=o[6],L=o[7],D=o[8],G=o[9],Y=o[10],H=o[11],X=o[12],k=o[13],re=o[14],ne=o[15],me=w[0],be=w[1],ve=w[2],Pe=w[3],Ae=w[4],Te=w[5],Be=w[6],Ie=w[7],_e=w[8],Re=w[9],De=w[10],Ge=w[11],Fe=w[12],$e=w[13],Ze=w[14],je=w[15];return d[0]=c*me+_*be+D*ve+X*Pe,d[1]=h*me+z*be+G*ve+k*Pe,d[2]=M*me+N*be+Y*ve+re*Pe,d[3]=v*me+L*be+H*ve+ne*Pe,d[4]=c*Ae+_*Te+D*Be+X*Ie,d[5]=h*Ae+z*Te+G*Be+k*Ie,d[6]=M*Ae+N*Te+Y*Be+re*Ie,d[7]=v*Ae+L*Te+H*Be+ne*Ie,d[8]=c*_e+_*Re+D*De+X*Ge,d[9]=h*_e+z*Re+G*De+k*Ge,d[10]=M*_e+N*Re+Y*De+re*Ge,d[11]=v*_e+L*Re+H*De+ne*Ge,d[12]=c*Fe+_*$e+D*Ze+X*je,d[13]=h*Fe+z*$e+G*Ze+k*je,d[14]=M*Fe+N*$e+Y*Ze+re*je,d[15]=v*Fe+L*$e+H*Ze+ne*je,d}const R=se;function W(o,w,l){const d=l??O();return o!==d&&(d[0]=o[0],d[1]=o[1],d[2]=o[2],d[3]=o[3],d[4]=o[4],d[5]=o[5],d[6]=o[6],d[7]=o[7],d[8]=o[8],d[9]=o[9],d[10]=o[10],d[11]=o[11]),d[12]=w[0],d[13]=w[1],d[14]=w[2],d[15]=1,d}function J(o,w){const l=w??t.create();return l[0]=o[12],l[1]=o[13],l[2]=o[14],l}function ce(o,w,l){const d=l??t.create(),c=w*4;return d[0]=o[c+0],d[1]=o[c+1],d[2]=o[c+2],d}function ye(o,w,l,d){const c=d===o?d:P(o,d),h=l*4;return c[h+0]=w[0],c[h+1]=w[1],c[h+2]=w[2],c}function we(o,w){const l=w??t.create(),d=o[0],c=o[1],h=o[2],M=o[4],v=o[5],_=o[6],z=o[8],N=o[9],L=o[10];return l[0]=Math.sqrt(d*d+c*c+h*h),l[1]=Math.sqrt(M*M+v*v+_*_),l[2]=Math.sqrt(z*z+N*N+L*L),l}function Se(o,w,l,d,c){const h=c??new e(16),M=Math.tan(Math.PI*.5-.5*o);if(h[0]=M/w,h[1]=0,h[2]=0,h[3]=0,h[4]=0,h[5]=M,h[6]=0,h[7]=0,h[8]=0,h[9]=0,h[11]=-1,h[12]=0,h[13]=0,h[15]=0,Number.isFinite(d)){const v=1/(l-d);h[10]=d*v,h[14]=d*l*v}else h[10]=-1,h[14]=-l;return h}function Je(o,w,l,d=1/0,c){const h=c??new e(16),M=1/Math.tan(o*.5);if(h[0]=M/w,h[1]=0,h[2]=0,h[3]=0,h[4]=0,h[5]=M,h[6]=0,h[7]=0,h[8]=0,h[9]=0,h[11]=-1,h[12]=0,h[13]=0,h[15]=0,d===1/0)h[10]=0,h[14]=l;else{const v=1/(d-l);h[10]=l*v,h[14]=d*l*v}return h}function Ce(o,w,l,d,c,h,M){const v=M??new e(16);return v[0]=2/(w-o),v[1]=0,v[2]=0,v[3]=0,v[4]=0,v[5]=2/(d-l),v[6]=0,v[7]=0,v[8]=0,v[9]=0,v[10]=1/(c-h),v[11]=0,v[12]=(w+o)/(o-w),v[13]=(d+l)/(l-d),v[14]=c/(c-h),v[15]=1,v}function et(o,w,l,d,c,h,M){const v=M??new e(16),_=w-o,z=d-l,N=c-h;return v[0]=2*c/_,v[1]=0,v[2]=0,v[3]=0,v[4]=0,v[5]=2*c/z,v[6]=0,v[7]=0,v[8]=(o+w)/_,v[9]=(d+l)/z,v[10]=h/N,v[11]=-1,v[12]=0,v[13]=0,v[14]=c*h/N,v[15]=0,v}function Ee(o,w,l,d,c,h=1/0,M){const v=M??new e(16),_=w-o,z=d-l;if(v[0]=2*c/_,v[1]=0,v[2]=0,v[3]=0,v[4]=0,v[5]=2*c/z,v[6]=0,v[7]=0,v[8]=(o+w)/_,v[9]=(d+l)/z,v[11]=-1,v[12]=0,v[13]=0,v[15]=0,h===1/0)v[10]=0,v[14]=c;else{const N=1/(h-c);v[10]=c*N,v[14]=h*c*N}return v}const ee=t.create(),te=t.create(),Q=t.create();function Oe(o,w,l,d){const c=d??new e(16);return t.normalize(t.subtract(w,o,Q),Q),t.normalize(t.cross(l,Q,ee),ee),t.normalize(t.cross(Q,ee,te),te),c[0]=ee[0],c[1]=ee[1],c[2]=ee[2],c[3]=0,c[4]=te[0],c[5]=te[1],c[6]=te[2],c[7]=0,c[8]=Q[0],c[9]=Q[1],c[10]=Q[2],c[11]=0,c[12]=o[0],c[13]=o[1],c[14]=o[2],c[15]=1,c}function tt(o,w,l,d){const c=d??new e(16);return t.normalize(t.subtract(o,w,Q),Q),t.normalize(t.cross(l,Q,ee),ee),t.normalize(t.cross(Q,ee,te),te),c[0]=ee[0],c[1]=ee[1],c[2]=ee[2],c[3]=0,c[4]=te[0],c[5]=te[1],c[6]=te[2],c[7]=0,c[8]=Q[0],c[9]=Q[1],c[10]=Q[2],c[11]=0,c[12]=o[0],c[13]=o[1],c[14]=o[2],c[15]=1,c}function le(o,w,l,d){const c=d??new e(16);return t.normalize(t.subtract(o,w,Q),Q),t.normalize(t.cross(l,Q,ee),ee),t.normalize(t.cross(Q,ee,te),te),c[0]=ee[0],c[1]=te[0],c[2]=Q[0],c[3]=0,c[4]=ee[1],c[5]=te[1],c[6]=Q[1],c[7]=0,c[8]=ee[2],c[9]=te[2],c[10]=Q[2],c[11]=0,c[12]=-(ee[0]*o[0]+ee[1]*o[1]+ee[2]*o[2]),c[13]=-(te[0]*o[0]+te[1]*o[1]+te[2]*o[2]),c[14]=-(Q[0]*o[0]+Q[1]*o[1]+Q[2]*o[2]),c[15]=1,c}function nt(o,w){const l=w??new e(16);return l[0]=1,l[1]=0,l[2]=0,l[3]=0,l[4]=0,l[5]=1,l[6]=0,l[7]=0,l[8]=0,l[9]=0,l[10]=1,l[11]=0,l[12]=o[0],l[13]=o[1],l[14]=o[2],l[15]=1,l}function Ye(o,w,l){const d=l??new e(16),c=w[0],h=w[1],M=w[2],v=o[0],_=o[1],z=o[2],N=o[3],L=o[4],D=o[5],G=o[6],Y=o[7],H=o[8],X=o[9],k=o[10],re=o[11],ne=o[12],me=o[13],be=o[14],ve=o[15];return o!==d&&(d[0]=v,d[1]=_,d[2]=z,d[3]=N,d[4]=L,d[5]=D,d[6]=G,d[7]=Y,d[8]=H,d[9]=X,d[10]=k,d[11]=re),d[12]=v*c+L*h+H*M+ne,d[13]=_*c+D*h+X*M+me,d[14]=z*c+G*h+k*M+be,d[15]=N*c+Y*h+re*M+ve,d}function rt(o,w){const l=w??new e(16),d=Math.cos(o),c=Math.sin(o);return l[0]=1,l[1]=0,l[2]=0,l[3]=0,l[4]=0,l[5]=d,l[6]=c,l[7]=0,l[8]=0,l[9]=-c,l[10]=d,l[11]=0,l[12]=0,l[13]=0,l[14]=0,l[15]=1,l}function Xe(o,w,l){const d=l??new e(16),c=o[4],h=o[5],M=o[6],v=o[7],_=o[8],z=o[9],N=o[10],L=o[11],D=Math.cos(w),G=Math.sin(w);return d[4]=D*c+G*_,d[5]=D*h+G*z,d[6]=D*M+G*N,d[7]=D*v+G*L,d[8]=D*_-G*c,d[9]=D*z-G*h,d[10]=D*N-G*M,d[11]=D*L-G*v,o!==d&&(d[0]=o[0],d[1]=o[1],d[2]=o[2],d[3]=o[3],d[12]=o[12],d[13]=o[13],d[14]=o[14],d[15]=o[15]),d}function We(o,w){const l=w??new e(16),d=Math.cos(o),c=Math.sin(o);return l[0]=d,l[1]=0,l[2]=-c,l[3]=0,l[4]=0,l[5]=1,l[6]=0,l[7]=0,l[8]=c,l[9]=0,l[10]=d,l[11]=0,l[12]=0,l[13]=0,l[14]=0,l[15]=1,l}function Qe(o,w,l){const d=l??new e(16),c=o[0],h=o[1],M=o[2],v=o[3],_=o[8],z=o[9],N=o[10],L=o[11],D=Math.cos(w),G=Math.sin(w);return d[0]=D*c-G*_,d[1]=D*h-G*z,d[2]=D*M-G*N,d[3]=D*v-G*L,d[8]=D*_+G*c,d[9]=D*z+G*h,d[10]=D*N+G*M,d[11]=D*L+G*v,o!==d&&(d[4]=o[4],d[5]=o[5],d[6]=o[6],d[7]=o[7],d[12]=o[12],d[13]=o[13],d[14]=o[14],d[15]=o[15]),d}function I(o,w){const l=w??new e(16),d=Math.cos(o),c=Math.sin(o);return l[0]=d,l[1]=c,l[2]=0,l[3]=0,l[4]=-c,l[5]=d,l[6]=0,l[7]=0,l[8]=0,l[9]=0,l[10]=1,l[11]=0,l[12]=0,l[13]=0,l[14]=0,l[15]=1,l}function U(o,w,l){const d=l??new e(16),c=o[0],h=o[1],M=o[2],v=o[3],_=o[4],z=o[5],N=o[6],L=o[7],D=Math.cos(w),G=Math.sin(w);return d[0]=D*c+G*_,d[1]=D*h+G*z,d[2]=D*M+G*N,d[3]=D*v+G*L,d[4]=D*_-G*c,d[5]=D*z-G*h,d[6]=D*N-G*M,d[7]=D*L-G*v,o!==d&&(d[8]=o[8],d[9]=o[9],d[10]=o[10],d[11]=o[11],d[12]=o[12],d[13]=o[13],d[14]=o[14],d[15]=o[15]),d}function x(o,w,l){const d=l??new e(16);let c=o[0],h=o[1],M=o[2];const v=Math.sqrt(c*c+h*h+M*M);c/=v,h/=v,M/=v;const _=c*c,z=h*h,N=M*M,L=Math.cos(w),D=Math.sin(w),G=1-L;return d[0]=_+(1-_)*L,d[1]=c*h*G+M*D,d[2]=c*M*G-h*D,d[3]=0,d[4]=c*h*G-M*D,d[5]=z+(1-z)*L,d[6]=h*M*G+c*D,d[7]=0,d[8]=c*M*G+h*D,d[9]=h*M*G-c*D,d[10]=N+(1-N)*L,d[11]=0,d[12]=0,d[13]=0,d[14]=0,d[15]=1,d}const a=x;function g(o,w,l,d){const c=d??new e(16);let h=w[0],M=w[1],v=w[2];const _=Math.sqrt(h*h+M*M+v*v);h/=_,M/=_,v/=_;const z=h*h,N=M*M,L=v*v,D=Math.cos(l),G=Math.sin(l),Y=1-D,H=z+(1-z)*D,X=h*M*Y+v*G,k=h*v*Y-M*G,re=h*M*Y-v*G,ne=N+(1-N)*D,me=M*v*Y+h*G,be=h*v*Y+M*G,ve=M*v*Y-h*G,Pe=L+(1-L)*D,Ae=o[0],Te=o[1],Be=o[2],Ie=o[3],_e=o[4],Re=o[5],De=o[6],Ge=o[7],Fe=o[8],$e=o[9],Ze=o[10],je=o[11];return c[0]=H*Ae+X*_e+k*Fe,c[1]=H*Te+X*Re+k*$e,c[2]=H*Be+X*De+k*Ze,c[3]=H*Ie+X*Ge+k*je,c[4]=re*Ae+ne*_e+me*Fe,c[5]=re*Te+ne*Re+me*$e,c[6]=re*Be+ne*De+me*Ze,c[7]=re*Ie+ne*Ge+me*je,c[8]=be*Ae+ve*_e+Pe*Fe,c[9]=be*Te+ve*Re+Pe*$e,c[10]=be*Be+ve*De+Pe*Ze,c[11]=be*Ie+ve*Ge+Pe*je,o!==c&&(c[12]=o[12],c[13]=o[13],c[14]=o[14],c[15]=o[15]),c}const f=g;function b(o,w){const l=w??new e(16);return l[0]=o[0],l[1]=0,l[2]=0,l[3]=0,l[4]=0,l[5]=o[1],l[6]=0,l[7]=0,l[8]=0,l[9]=0,l[10]=o[2],l[11]=0,l[12]=0,l[13]=0,l[14]=0,l[15]=1,l}function S(o,w,l){const d=l??new e(16),c=w[0],h=w[1],M=w[2];return d[0]=c*o[0],d[1]=c*o[1],d[2]=c*o[2],d[3]=c*o[3],d[4]=h*o[4],d[5]=h*o[5],d[6]=h*o[6],d[7]=h*o[7],d[8]=M*o[8],d[9]=M*o[9],d[10]=M*o[10],d[11]=M*o[11],o!==d&&(d[12]=o[12],d[13]=o[13],d[14]=o[14],d[15]=o[15]),d}function E(o,w){const l=w??new e(16);return l[0]=o,l[1]=0,l[2]=0,l[3]=0,l[4]=0,l[5]=o,l[6]=0,l[7]=0,l[8]=0,l[9]=0,l[10]=o,l[11]=0,l[12]=0,l[13]=0,l[14]=0,l[15]=1,l}function A(o,w,l){const d=l??new e(16);return d[0]=w*o[0],d[1]=w*o[1],d[2]=w*o[2],d[3]=w*o[3],d[4]=w*o[4],d[5]=w*o[5],d[6]=w*o[6],d[7]=w*o[7],d[8]=w*o[8],d[9]=w*o[9],d[10]=w*o[10],d[11]=w*o[11],o!==d&&(d[12]=o[12],d[13]=o[13],d[14]=o[14],d[15]=o[15]),d}return{add:m,aim:Oe,axisRotate:g,axisRotation:x,cameraAim:tt,clone:T,copy:P,create:n,determinant:$,equals:C,equalsApproximately:B,fromMat3:i,fromQuat:s,frustum:et,frustumReverseZ:Ee,getAxis:ce,getScaling:we,getTranslation:J,identity:O,inverse:V,invert:q,lookAt:le,mul:R,mulScalar:y,multiply:se,multiplyScalar:p,negate:u,ortho:Ce,perspective:Se,perspectiveReverseZ:Je,rotate:f,rotateX:Xe,rotateY:Qe,rotateZ:U,rotation:a,rotationX:rt,rotationY:We,rotationZ:I,scale:S,scaling:b,set:r,setAxis:ye,setTranslation:W,translate:Ye,translation:nt,transpose:F,uniformScale:A,uniformScaling:E}}const Ur=new Map;function Ds(e){let t=Ur.get(e);return t||(t=Rs(e),Ur.set(e,t)),t}function Gs(e){const t=Sn(e);function n(I,U,x,a){const g=new e(4);return I!==void 0&&(g[0]=I,U!==void 0&&(g[1]=U,x!==void 0&&(g[2]=x,a!==void 0&&(g[3]=a)))),g}const r=n;function i(I,U,x,a,g){const f=g??new e(4);return f[0]=I,f[1]=U,f[2]=x,f[3]=a,f}function s(I,U,x){const a=x??new e(4),g=U*.5,f=Math.sin(g);return a[0]=f*I[0],a[1]=f*I[1],a[2]=f*I[2],a[3]=Math.cos(g),a}function u(I,U){const x=U??t.create(3),a=Math.acos(I[3])*2,g=Math.sin(a*.5);return g>Z?(x[0]=I[0]/g,x[1]=I[1]/g,x[2]=I[2]/g):(x[0]=1,x[1]=0,x[2]=0),{angle:a,axis:x}}function m(I,U){const x=Se(I,U);return Math.acos(2*x*x-1)}function p(I,U,x){const a=x??new e(4),g=I[0],f=I[1],b=I[2],S=I[3],E=U[0],A=U[1],o=U[2],w=U[3];return a[0]=g*w+S*E+f*o-b*A,a[1]=f*w+S*A+b*E-g*o,a[2]=b*w+S*o+g*A-f*E,a[3]=S*w-g*E-f*A-b*o,a}const y=p;function P(I,U,x){const a=x??new e(4),g=U*.5,f=I[0],b=I[1],S=I[2],E=I[3],A=Math.sin(g),o=Math.cos(g);return a[0]=f*o+E*A,a[1]=b*o+S*A,a[2]=S*o-b*A,a[3]=E*o-f*A,a}function T(I,U,x){const a=x??new e(4),g=U*.5,f=I[0],b=I[1],S=I[2],E=I[3],A=Math.sin(g),o=Math.cos(g);return a[0]=f*o-S*A,a[1]=b*o+E*A,a[2]=S*o+f*A,a[3]=E*o-b*A,a}function B(I,U,x){const a=x??new e(4),g=U*.5,f=I[0],b=I[1],S=I[2],E=I[3],A=Math.sin(g),o=Math.cos(g);return a[0]=f*o+b*A,a[1]=b*o-f*A,a[2]=S*o+E*A,a[3]=E*o-S*A,a}function C(I,U,x,a){const g=a??new e(4),f=I[0],b=I[1],S=I[2],E=I[3];let A=U[0],o=U[1],w=U[2],l=U[3],d=f*A+b*o+S*w+E*l;d<0&&(d=-d,A=-A,o=-o,w=-w,l=-l);let c,h;if(1-d>Z){const M=Math.acos(d),v=Math.sin(M);c=Math.sin((1-x)*M)/v,h=Math.sin(x*M)/v}else c=1-x,h=x;return g[0]=c*f+h*A,g[1]=c*b+h*o,g[2]=c*S+h*w,g[3]=c*E+h*l,g}function O(I,U){const x=U??new e(4),a=I[0],g=I[1],f=I[2],b=I[3],S=a*a+g*g+f*f+b*b,E=S?1/S:0;return x[0]=-a*E,x[1]=-g*E,x[2]=-f*E,x[3]=b*E,x}function F(I,U){const x=U??new e(4);return x[0]=-I[0],x[1]=-I[1],x[2]=-I[2],x[3]=I[3],x}function V(I,U){const x=U??new e(4),a=I[0]+I[5]+I[10];if(a>0){const g=Math.sqrt(a+1);x[3]=.5*g;const f=.5/g;x[0]=(I[6]-I[9])*f,x[1]=(I[8]-I[2])*f,x[2]=(I[1]-I[4])*f}else{let g=0;I[5]>I[0]&&(g=1),I[10]>I[g*4+g]&&(g=2);const f=(g+1)%3,b=(g+2)%3,S=Math.sqrt(I[g*4+g]-I[f*4+f]-I[b*4+b]+1);x[g]=.5*S;const E=.5/S;x[3]=(I[f*4+b]-I[b*4+f])*E,x[f]=(I[f*4+g]+I[g*4+f])*E,x[b]=(I[b*4+g]+I[g*4+b])*E}return x}function $(I,U,x,a,g){const f=g??new e(4),b=I*.5,S=U*.5,E=x*.5,A=Math.sin(b),o=Math.cos(b),w=Math.sin(S),l=Math.cos(S),d=Math.sin(E),c=Math.cos(E);switch(a){case"xyz":f[0]=A*l*c+o*w*d,f[1]=o*w*c-A*l*d,f[2]=o*l*d+A*w*c,f[3]=o*l*c-A*w*d;break;case"xzy":f[0]=A*l*c-o*w*d,f[1]=o*w*c-A*l*d,f[2]=o*l*d+A*w*c,f[3]=o*l*c+A*w*d;break;case"yxz":f[0]=A*l*c+o*w*d,f[1]=o*w*c-A*l*d,f[2]=o*l*d-A*w*c,f[3]=o*l*c+A*w*d;break;case"yzx":f[0]=A*l*c+o*w*d,f[1]=o*w*c+A*l*d,f[2]=o*l*d-A*w*c,f[3]=o*l*c-A*w*d;break;case"zxy":f[0]=A*l*c-o*w*d,f[1]=o*w*c+A*l*d,f[2]=o*l*d+A*w*c,f[3]=o*l*c-A*w*d;break;case"zyx":f[0]=A*l*c-o*w*d,f[1]=o*w*c+A*l*d,f[2]=o*l*d-A*w*c,f[3]=o*l*c+A*w*d;break;default:throw new Error(`Unknown rotation order: ${a}`)}return f}function q(I,U){const x=U??new e(4);return x[0]=I[0],x[1]=I[1],x[2]=I[2],x[3]=I[3],x}const se=q;function R(I,U,x){const a=x??new e(4);return a[0]=I[0]+U[0],a[1]=I[1]+U[1],a[2]=I[2]+U[2],a[3]=I[3]+U[3],a}function W(I,U,x){const a=x??new e(4);return a[0]=I[0]-U[0],a[1]=I[1]-U[1],a[2]=I[2]-U[2],a[3]=I[3]-U[3],a}const J=W;function ce(I,U,x){const a=x??new e(4);return a[0]=I[0]*U,a[1]=I[1]*U,a[2]=I[2]*U,a[3]=I[3]*U,a}const ye=ce;function we(I,U,x){const a=x??new e(4);return a[0]=I[0]/U,a[1]=I[1]/U,a[2]=I[2]/U,a[3]=I[3]/U,a}function Se(I,U){return I[0]*U[0]+I[1]*U[1]+I[2]*U[2]+I[3]*U[3]}function Je(I,U,x,a){const g=a??new e(4);return g[0]=I[0]+x*(U[0]-I[0]),g[1]=I[1]+x*(U[1]-I[1]),g[2]=I[2]+x*(U[2]-I[2]),g[3]=I[3]+x*(U[3]-I[3]),g}function Ce(I){const U=I[0],x=I[1],a=I[2],g=I[3];return Math.sqrt(U*U+x*x+a*a+g*g)}const et=Ce;function Ee(I){const U=I[0],x=I[1],a=I[2],g=I[3];return U*U+x*x+a*a+g*g}const ee=Ee;function te(I,U){const x=U??new e(4),a=I[0],g=I[1],f=I[2],b=I[3],S=Math.sqrt(a*a+g*g+f*f+b*b);return S>1e-5?(x[0]=a/S,x[1]=g/S,x[2]=f/S,x[3]=b/S):(x[0]=0,x[1]=0,x[2]=0,x[3]=1),x}function Q(I,U){return Math.abs(I[0]-U[0])<Z&&Math.abs(I[1]-U[1])<Z&&Math.abs(I[2]-U[2])<Z&&Math.abs(I[3]-U[3])<Z}function Oe(I,U){return I[0]===U[0]&&I[1]===U[1]&&I[2]===U[2]&&I[3]===U[3]}function tt(I){const U=I??new e(4);return U[0]=0,U[1]=0,U[2]=0,U[3]=1,U}const le=t.create(),nt=t.create(),Ye=t.create();function rt(I,U,x){const a=x??new e(4),g=t.dot(I,U);return g<-.999999?(t.cross(nt,I,le),t.len(le)<1e-6&&t.cross(Ye,I,le),t.normalize(le,le),s(le,Math.PI,a),a):g>.999999?(a[0]=0,a[1]=0,a[2]=0,a[3]=1,a):(t.cross(I,U,le),a[0]=le[0],a[1]=le[1],a[2]=le[2],a[3]=1+g,te(a,a))}const Xe=new e(4),We=new e(4);function Qe(I,U,x,a,g,f){const b=f??new e(4);return C(I,a,g,Xe),C(U,x,g,We),C(Xe,We,2*g*(1-g),b),b}return{create:n,fromValues:r,set:i,fromAxisAngle:s,toAxisAngle:u,angle:m,multiply:p,mul:y,rotateX:P,rotateY:T,rotateZ:B,slerp:C,inverse:O,conjugate:F,fromMat:V,fromEuler:$,copy:q,clone:se,add:R,subtract:W,sub:J,mulScalar:ce,scale:ye,divScalar:we,dot:Se,lerp:Je,length:Ce,len:et,lengthSq:Ee,lenSq:ee,normalize:te,equalsApproximately:Q,equals:Oe,identity:tt,rotationTo:rt,sqlerp:Qe}}const Cr=new Map;function Fs(e){let t=Cr.get(e);return t||(t=Gs(e),Cr.set(e,t)),t}function Ls(e){function t(x,a,g,f){const b=new e(4);return x!==void 0&&(b[0]=x,a!==void 0&&(b[1]=a,g!==void 0&&(b[2]=g,f!==void 0&&(b[3]=f)))),b}const n=t;function r(x,a,g,f,b){const S=b??new e(4);return S[0]=x,S[1]=a,S[2]=g,S[3]=f,S}function i(x,a){const g=a??new e(4);return g[0]=Math.ceil(x[0]),g[1]=Math.ceil(x[1]),g[2]=Math.ceil(x[2]),g[3]=Math.ceil(x[3]),g}function s(x,a){const g=a??new e(4);return g[0]=Math.floor(x[0]),g[1]=Math.floor(x[1]),g[2]=Math.floor(x[2]),g[3]=Math.floor(x[3]),g}function u(x,a){const g=a??new e(4);return g[0]=Math.round(x[0]),g[1]=Math.round(x[1]),g[2]=Math.round(x[2]),g[3]=Math.round(x[3]),g}function m(x,a=0,g=1,f){const b=f??new e(4);return b[0]=Math.min(g,Math.max(a,x[0])),b[1]=Math.min(g,Math.max(a,x[1])),b[2]=Math.min(g,Math.max(a,x[2])),b[3]=Math.min(g,Math.max(a,x[3])),b}function p(x,a,g){const f=g??new e(4);return f[0]=x[0]+a[0],f[1]=x[1]+a[1],f[2]=x[2]+a[2],f[3]=x[3]+a[3],f}function y(x,a,g,f){const b=f??new e(4);return b[0]=x[0]+a[0]*g,b[1]=x[1]+a[1]*g,b[2]=x[2]+a[2]*g,b[3]=x[3]+a[3]*g,b}function P(x,a,g){const f=g??new e(4);return f[0]=x[0]-a[0],f[1]=x[1]-a[1],f[2]=x[2]-a[2],f[3]=x[3]-a[3],f}const T=P;function B(x,a){return Math.abs(x[0]-a[0])<Z&&Math.abs(x[1]-a[1])<Z&&Math.abs(x[2]-a[2])<Z&&Math.abs(x[3]-a[3])<Z}function C(x,a){return x[0]===a[0]&&x[1]===a[1]&&x[2]===a[2]&&x[3]===a[3]}function O(x,a,g,f){const b=f??new e(4);return b[0]=x[0]+g*(a[0]-x[0]),b[1]=x[1]+g*(a[1]-x[1]),b[2]=x[2]+g*(a[2]-x[2]),b[3]=x[3]+g*(a[3]-x[3]),b}function F(x,a,g,f){const b=f??new e(4);return b[0]=x[0]+g[0]*(a[0]-x[0]),b[1]=x[1]+g[1]*(a[1]-x[1]),b[2]=x[2]+g[2]*(a[2]-x[2]),b[3]=x[3]+g[3]*(a[3]-x[3]),b}function V(x,a,g){const f=g??new e(4);return f[0]=Math.max(x[0],a[0]),f[1]=Math.max(x[1],a[1]),f[2]=Math.max(x[2],a[2]),f[3]=Math.max(x[3],a[3]),f}function $(x,a,g){const f=g??new e(4);return f[0]=Math.min(x[0],a[0]),f[1]=Math.min(x[1],a[1]),f[2]=Math.min(x[2],a[2]),f[3]=Math.min(x[3],a[3]),f}function q(x,a,g){const f=g??new e(4);return f[0]=x[0]*a,f[1]=x[1]*a,f[2]=x[2]*a,f[3]=x[3]*a,f}const se=q;function R(x,a,g){const f=g??new e(4);return f[0]=x[0]/a,f[1]=x[1]/a,f[2]=x[2]/a,f[3]=x[3]/a,f}function W(x,a){const g=a??new e(4);return g[0]=1/x[0],g[1]=1/x[1],g[2]=1/x[2],g[3]=1/x[3],g}const J=W;function ce(x,a){return x[0]*a[0]+x[1]*a[1]+x[2]*a[2]+x[3]*a[3]}function ye(x){const a=x[0],g=x[1],f=x[2],b=x[3];return Math.sqrt(a*a+g*g+f*f+b*b)}const we=ye;function Se(x){const a=x[0],g=x[1],f=x[2],b=x[3];return a*a+g*g+f*f+b*b}const Je=Se;function Ce(x,a){const g=x[0]-a[0],f=x[1]-a[1],b=x[2]-a[2],S=x[3]-a[3];return Math.sqrt(g*g+f*f+b*b+S*S)}const et=Ce;function Ee(x,a){const g=x[0]-a[0],f=x[1]-a[1],b=x[2]-a[2],S=x[3]-a[3];return g*g+f*f+b*b+S*S}const ee=Ee;function te(x,a){const g=a??new e(4),f=x[0],b=x[1],S=x[2],E=x[3],A=Math.sqrt(f*f+b*b+S*S+E*E);return A>1e-5?(g[0]=f/A,g[1]=b/A,g[2]=S/A,g[3]=E/A):(g[0]=0,g[1]=0,g[2]=0,g[3]=0),g}function Q(x,a){const g=a??new e(4);return g[0]=-x[0],g[1]=-x[1],g[2]=-x[2],g[3]=-x[3],g}function Oe(x,a){const g=a??new e(4);return g[0]=x[0],g[1]=x[1],g[2]=x[2],g[3]=x[3],g}const tt=Oe;function le(x,a,g){const f=g??new e(4);return f[0]=x[0]*a[0],f[1]=x[1]*a[1],f[2]=x[2]*a[2],f[3]=x[3]*a[3],f}const nt=le;function Ye(x,a,g){const f=g??new e(4);return f[0]=x[0]/a[0],f[1]=x[1]/a[1],f[2]=x[2]/a[2],f[3]=x[3]/a[3],f}const rt=Ye;function Xe(x){const a=x??new e(4);return a[0]=0,a[1]=0,a[2]=0,a[3]=0,a}function We(x,a,g){const f=g??new e(4),b=x[0],S=x[1],E=x[2],A=x[3];return f[0]=a[0]*b+a[4]*S+a[8]*E+a[12]*A,f[1]=a[1]*b+a[5]*S+a[9]*E+a[13]*A,f[2]=a[2]*b+a[6]*S+a[10]*E+a[14]*A,f[3]=a[3]*b+a[7]*S+a[11]*E+a[15]*A,f}function Qe(x,a,g){const f=g??new e(4);return te(x,f),q(f,a,f)}function I(x,a,g){const f=g??new e(4);return ye(x)>a?Qe(x,a,f):Oe(x,f)}function U(x,a,g){const f=g??new e(4);return O(x,a,.5,f)}return{create:t,fromValues:n,set:r,ceil:i,floor:s,round:u,clamp:m,add:p,addScaled:y,subtract:P,sub:T,equalsApproximately:B,equals:C,lerp:O,lerpV:F,max:V,min:$,mulScalar:q,scale:se,divScalar:R,inverse:W,invert:J,dot:ce,length:ye,len:we,lengthSq:Se,lenSq:Je,distance:Ce,dist:et,distanceSq:Ee,distSq:ee,normalize:te,negate:Q,copy:Oe,clone:tt,multiply:le,mul:nt,divide:Ye,div:rt,zero:Xe,transformMat4:We,setLength:Qe,truncate:I,midpoint:U}}const Or=new Map;function Ys(e){let t=Or.get(e);return t||(t=Ls(e),Or.set(e,t)),t}function gr(e,t,n,r,i,s){return{mat3:Os(e),mat4:Ds(t),quat:Fs(n),vec2:zi(r),vec3:Sn(i),vec4:Ys(s)}}const{mat4:Ke,quat:dt}=gr(Float32Array,Float32Array,Float32Array,Float32Array,Float32Array,Float32Array);gr(Float64Array,Float64Array,Float64Array,Float64Array,Float64Array,Float64Array);gr(Es,Array,Array,Array,Array,Array);dt.create();dt.create();dt.create();function Xs(e,t,n){const r=dt.fromEuler(zt.degToRad(e),zt.degToRad(t),zt.degToRad(n),"xyz");return{x:r[0],y:r[1],z:r[2],w:r[3]}}function Rr(e,t,n,r){const i=e+e,s=t+t,u=n+n,m=e*i,p=e*s,y=e*u,P=t*s,T=t*u,B=n*u,C=r*i,O=r*s,F=r*u,V=1-(P+B),$=p-F,q=y+O,se=1-(m+B),R=T-C,W=T+C,J=1-(m+P),ce=Math.asin(Math.max(-1,Math.min(1,q)));let ye,we;return Math.abs(q)<.9999999?(ye=Math.atan2(-R,J),we=Math.atan2(-$,V)):(ye=Math.atan2(W,se),we=0),{x:zt.radToDeg(ye),y:zt.radToDeg(ce),z:zt.radToDeg(we)}}const Dr=Ke.create(),Rt=dt.create();function ks(e,t,n,r,i,s,u=0,m=1,p=0){return Ke.cameraAim([e,t,n],[r,i,s],[u,m,p],Dr),dt.fromMat(Dr,Rt),{x:Rt[0],y:Rt[1],z:Rt[2],w:Rt[3]}}const ht=_i("child-of",{exclusive:!0,autoRemoveSubject:!0}),Ni=":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",Vs=Ni+"\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040",qs="["+Ni+"]["+Vs+"]*",Hs=new RegExp("^"+qs+"$");function Ui(e,t){const n=[];let r=t.exec(e);for(;r;){const i=[];i.startIndex=t.lastIndex-r[0].length;const s=r.length;for(let u=0;u<s;u++)i.push(r[u]);n.push(i),r=t.exec(e)}return n}const Pn=function(e){const t=Hs.exec(e);return!(t===null||typeof t>"u")};function $s(e){return typeof e<"u"}const Zs={allowBooleanAttributes:!1,unpairedTags:[]};function js(e,t){t=Object.assign({},Zs,t);const n=[];let r=!1,i=!1;e[0]==="\uFEFF"&&(e=e.substr(1));for(let s=0;s<e.length;s++)if(e[s]==="<"&&e[s+1]==="?"){if(s+=2,s=Fr(e,s),s.err)return s}else if(e[s]==="<"){let u=s;if(s++,e[s]==="!"){s=Lr(e,s);continue}else{let m=!1;e[s]==="/"&&(m=!0,s++);let p="";for(;s<e.length&&e[s]!==">"&&e[s]!==" "&&e[s]!=="	"&&e[s]!==`
`&&e[s]!=="\r";s++)p+=e[s];if(p=p.trim(),p[p.length-1]==="/"&&(p=p.substring(0,p.length-1),s--),!ra(p)){let T;return p.trim().length===0?T="Invalid space after '<'.":T="Tag '"+p+"' is an invalid name.",he("InvalidTag",T,Le(e,s))}const y=Ks(e,s);if(y===!1)return he("InvalidAttr","Attributes for '"+p+"' have open quote.",Le(e,s));let P=y.value;if(s=y.index,P[P.length-1]==="/"){const T=s-P.length;P=P.substring(0,P.length-1);const B=Yr(P,t);if(B===!0)r=!0;else return he(B.err.code,B.err.msg,Le(e,T+B.err.line))}else if(m)if(y.tagClosed){if(P.trim().length>0)return he("InvalidTag","Closing tag '"+p+"' can't have attributes or invalid starting.",Le(e,u));if(n.length===0)return he("InvalidTag","Closing tag '"+p+"' has not been opened.",Le(e,u));{const T=n.pop();if(p!==T.tagName){let B=Le(e,T.tagStartPos);return he("InvalidTag","Expected closing tag '"+T.tagName+"' (opened in line "+B.line+", col "+B.col+") instead of closing tag '"+p+"'.",Le(e,u))}n.length==0&&(i=!0)}}else return he("InvalidTag","Closing tag '"+p+"' doesn't have proper closing.",Le(e,s));else{const T=Yr(P,t);if(T!==!0)return he(T.err.code,T.err.msg,Le(e,s-P.length+T.err.line));if(i===!0)return he("InvalidXml","Multiple possible root nodes found.",Le(e,s));t.unpairedTags.indexOf(p)!==-1||n.push({tagName:p,tagStartPos:u}),r=!0}for(s++;s<e.length;s++)if(e[s]==="<")if(e[s+1]==="!"){s++,s=Lr(e,s);continue}else if(e[s+1]==="?"){if(s=Fr(e,++s),s.err)return s}else break;else if(e[s]==="&"){const T=ta(e,s);if(T==-1)return he("InvalidChar","char '&' is not expected.",Le(e,s));s=T}else if(i===!0&&!Gr(e[s]))return he("InvalidXml","Extra text at the end",Le(e,s));e[s]==="<"&&s--}}else{if(Gr(e[s]))continue;return he("InvalidChar","char '"+e[s]+"' is not expected.",Le(e,s))}if(r){if(n.length==1)return he("InvalidTag","Unclosed tag '"+n[0].tagName+"'.",Le(e,n[0].tagStartPos));if(n.length>0)return he("InvalidXml","Invalid '"+JSON.stringify(n.map(s=>s.tagName),null,4).replace(/\r?\n/g,"")+"' found.",{line:1,col:1})}else return he("InvalidXml","Start tag expected.",1);return!0}function Gr(e){return e===" "||e==="	"||e===`
`||e==="\r"}function Fr(e,t){const n=t;for(;t<e.length;t++)if(e[t]=="?"||e[t]==" "){const r=e.substr(n,t-n);if(t>5&&r==="xml")return he("InvalidXml","XML declaration allowed only at the start of the document.",Le(e,t));if(e[t]=="?"&&e[t+1]==">"){t++;break}else continue}return t}function Lr(e,t){if(e.length>t+5&&e[t+1]==="-"&&e[t+2]==="-"){for(t+=3;t<e.length;t++)if(e[t]==="-"&&e[t+1]==="-"&&e[t+2]===">"){t+=2;break}}else if(e.length>t+8&&e[t+1]==="D"&&e[t+2]==="O"&&e[t+3]==="C"&&e[t+4]==="T"&&e[t+5]==="Y"&&e[t+6]==="P"&&e[t+7]==="E"){let n=1;for(t+=8;t<e.length;t++)if(e[t]==="<")n++;else if(e[t]===">"&&(n--,n===0))break}else if(e.length>t+9&&e[t+1]==="["&&e[t+2]==="C"&&e[t+3]==="D"&&e[t+4]==="A"&&e[t+5]==="T"&&e[t+6]==="A"&&e[t+7]==="["){for(t+=8;t<e.length;t++)if(e[t]==="]"&&e[t+1]==="]"&&e[t+2]===">"){t+=2;break}}return t}const Ws='"',Qs="'";function Ks(e,t){let n="",r="",i=!1;for(;t<e.length;t++){if(e[t]===Ws||e[t]===Qs)r===""?r=e[t]:r!==e[t]||(r="");else if(e[t]===">"&&r===""){i=!0;break}n+=e[t]}return r!==""?!1:{value:n,index:t,tagClosed:i}}const Js=new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`,"g");function Yr(e,t){const n=Ui(e,Js),r={};for(let i=0;i<n.length;i++){if(n[i][1].length===0)return he("InvalidAttr","Attribute '"+n[i][2]+"' has no space in starting.",Dt(n[i]));if(n[i][3]!==void 0&&n[i][4]===void 0)return he("InvalidAttr","Attribute '"+n[i][2]+"' is without value.",Dt(n[i]));if(n[i][3]===void 0&&!t.allowBooleanAttributes)return he("InvalidAttr","boolean attribute '"+n[i][2]+"' is not allowed.",Dt(n[i]));const s=n[i][2];if(!na(s))return he("InvalidAttr","Attribute '"+s+"' is an invalid name.",Dt(n[i]));if(!r.hasOwnProperty(s))r[s]=1;else return he("InvalidAttr","Attribute '"+s+"' is repeated.",Dt(n[i]))}return!0}function ea(e,t){let n=/\d/;for(e[t]==="x"&&(t++,n=/[\da-fA-F]/);t<e.length;t++){if(e[t]===";")return t;if(!e[t].match(n))break}return-1}function ta(e,t){if(t++,e[t]===";")return-1;if(e[t]==="#")return t++,ea(e,t);let n=0;for(;t<e.length;t++,n++)if(!(e[t].match(/\w/)&&n<20)){if(e[t]===";")break;return-1}return t}function he(e,t,n){return{err:{code:e,msg:t,line:n.line||n,col:n.col}}}function na(e){return Pn(e)}function ra(e){return Pn(e)}function Le(e,t){const n=e.substring(0,t).split(/\r?\n/);return{line:n.length,col:n[n.length-1].length+1}}function Dt(e){return e.startIndex+e[1].length}const ia={preserveOrder:!1,attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,removeNSPrefix:!1,allowBooleanAttributes:!1,parseTagValue:!0,parseAttributeValue:!1,trimValues:!0,cdataPropName:!1,numberParseOptions:{hex:!0,leadingZeros:!0,eNotation:!0},tagValueProcessor:function(e,t){return t},attributeValueProcessor:function(e,t){return t},stopNodes:[],alwaysCreateTextNode:!1,isArray:()=>!1,commentPropName:!1,unpairedTags:[],processEntities:!0,htmlEntities:!1,ignoreDeclaration:!1,ignorePiTags:!1,transformTagName:!1,transformAttributeName:!1,updateTag:function(e,t,n){return e},captureMetaData:!1},oa=function(e){return Object.assign({},ia,e)};let pn;typeof Symbol!="function"?pn="@@xmlMetadata":pn=Symbol("XML Node Metadata");class bt{constructor(t){this.tagname=t,this.child=[],this[":@"]={}}add(t,n){t==="__proto__"&&(t="#__proto__"),this.child.push({[t]:n})}addChild(t,n){t.tagname==="__proto__"&&(t.tagname="#__proto__"),t[":@"]&&Object.keys(t[":@"]).length>0?this.child.push({[t.tagname]:t.child,":@":t[":@"]}):this.child.push({[t.tagname]:t.child}),n!==void 0&&(this.child[this.child.length-1][pn]={startIndex:n})}static getMetaDataSymbol(){return pn}}class sa{constructor(t){this.suppressValidationErr=!t}readDocType(t,n){const r={};if(t[n+3]==="O"&&t[n+4]==="C"&&t[n+5]==="T"&&t[n+6]==="Y"&&t[n+7]==="P"&&t[n+8]==="E"){n=n+9;let i=1,s=!1,u=!1,m="";for(;n<t.length;n++)if(t[n]==="<"&&!u){if(s&&mt(t,"!ENTITY",n)){n+=7;let p,y;[p,y,n]=this.readEntityExp(t,n+1,this.suppressValidationErr),y.indexOf("&")===-1&&(r[p]={regx:RegExp(`&${p};`,"g"),val:y})}else if(s&&mt(t,"!ELEMENT",n)){n+=8;const{index:p}=this.readElementExp(t,n+1);n=p}else if(s&&mt(t,"!ATTLIST",n))n+=8;else if(s&&mt(t,"!NOTATION",n)){n+=9;const{index:p}=this.readNotationExp(t,n+1,this.suppressValidationErr);n=p}else if(mt(t,"!--",n))u=!0;else throw new Error("Invalid DOCTYPE");i++,m=""}else if(t[n]===">"){if(u?t[n-1]==="-"&&t[n-2]==="-"&&(u=!1,i--):i--,i===0)break}else t[n]==="["?s=!0:m+=t[n];if(i!==0)throw new Error("Unclosed DOCTYPE")}else throw new Error("Invalid Tag instead of DOCTYPE");return{entities:r,i:n}}readEntityExp(t,n){n=ke(t,n);let r="";for(;n<t.length&&!/\s/.test(t[n])&&t[n]!=='"'&&t[n]!=="'";)r+=t[n],n++;if(Gt(r),n=ke(t,n),!this.suppressValidationErr){if(t.substring(n,n+6).toUpperCase()==="SYSTEM")throw new Error("External entities are not supported");if(t[n]==="%")throw new Error("Parameter entities are not supported")}let i="";return[n,i]=this.readIdentifierVal(t,n,"entity"),n--,[r,i,n]}readNotationExp(t,n){n=ke(t,n);let r="";for(;n<t.length&&!/\s/.test(t[n]);)r+=t[n],n++;!this.suppressValidationErr&&Gt(r),n=ke(t,n);const i=t.substring(n,n+6).toUpperCase();if(!this.suppressValidationErr&&i!=="SYSTEM"&&i!=="PUBLIC")throw new Error(`Expected SYSTEM or PUBLIC, found "${i}"`);n+=i.length,n=ke(t,n);let s=null,u=null;if(i==="PUBLIC")[n,s]=this.readIdentifierVal(t,n,"publicIdentifier"),n=ke(t,n),(t[n]==='"'||t[n]==="'")&&([n,u]=this.readIdentifierVal(t,n,"systemIdentifier"));else if(i==="SYSTEM"&&([n,u]=this.readIdentifierVal(t,n,"systemIdentifier"),!this.suppressValidationErr&&!u))throw new Error("Missing mandatory system identifier for SYSTEM notation");return{notationName:r,publicIdentifier:s,systemIdentifier:u,index:--n}}readIdentifierVal(t,n,r){let i="";const s=t[n];if(s!=='"'&&s!=="'")throw new Error(`Expected quoted string, found "${s}"`);for(n++;n<t.length&&t[n]!==s;)i+=t[n],n++;if(t[n]!==s)throw new Error(`Unterminated ${r} value`);return n++,[n,i]}readElementExp(t,n){n=ke(t,n);let r="";for(;n<t.length&&!/\s/.test(t[n]);)r+=t[n],n++;if(!this.suppressValidationErr&&!Pn(r))throw new Error(`Invalid element name: "${r}"`);n=ke(t,n);let i="";if(t[n]==="E"&&mt(t,"MPTY",n))n+=4;else if(t[n]==="A"&&mt(t,"NY",n))n+=2;else if(t[n]==="("){for(n++;n<t.length&&t[n]!==")";)i+=t[n],n++;if(t[n]!==")")throw new Error("Unterminated content model")}else if(!this.suppressValidationErr)throw new Error(`Invalid Element Expression, found "${t[n]}"`);return{elementName:r,contentModel:i.trim(),index:n}}readAttlistExp(t,n){n=ke(t,n);let r="";for(;n<t.length&&!/\s/.test(t[n]);)r+=t[n],n++;Gt(r),n=ke(t,n);let i="";for(;n<t.length&&!/\s/.test(t[n]);)i+=t[n],n++;if(!Gt(i))throw new Error(`Invalid attribute name: "${i}"`);n=ke(t,n);let s="";if(t.substring(n,n+8).toUpperCase()==="NOTATION"){if(s="NOTATION",n+=8,n=ke(t,n),t[n]!=="(")throw new Error(`Expected '(', found "${t[n]}"`);n++;let m=[];for(;n<t.length&&t[n]!==")";){let p="";for(;n<t.length&&t[n]!=="|"&&t[n]!==")";)p+=t[n],n++;if(p=p.trim(),!Gt(p))throw new Error(`Invalid notation name: "${p}"`);m.push(p),t[n]==="|"&&(n++,n=ke(t,n))}if(t[n]!==")")throw new Error("Unterminated list of notations");n++,s+=" ("+m.join("|")+")"}else{for(;n<t.length&&!/\s/.test(t[n]);)s+=t[n],n++;const m=["CDATA","ID","IDREF","IDREFS","ENTITY","ENTITIES","NMTOKEN","NMTOKENS"];if(!this.suppressValidationErr&&!m.includes(s.toUpperCase()))throw new Error(`Invalid attribute type: "${s}"`)}n=ke(t,n);let u="";return t.substring(n,n+8).toUpperCase()==="#REQUIRED"?(u="#REQUIRED",n+=8):t.substring(n,n+7).toUpperCase()==="#IMPLIED"?(u="#IMPLIED",n+=7):[n,u]=this.readIdentifierVal(t,n,"ATTLIST"),{elementName:r,attributeName:i,attributeType:s,defaultValue:u,index:n}}}const ke=(e,t)=>{for(;t<e.length&&/\s/.test(e[t]);)t++;return t};function mt(e,t,n){for(let r=0;r<t.length;r++)if(t[r]!==e[n+r+1])return!1;return!0}function Gt(e){if(Pn(e))return e;throw new Error(`Invalid entity name ${e}`)}const aa=/^[-+]?0x[a-fA-F0-9]+$/,ca=/^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/,ua={hex:!0,leadingZeros:!0,decimalPoint:".",eNotation:!0};function la(e,t={}){if(t=Object.assign({},ua,t),!e||typeof e!="string")return e;let n=e.trim();if(t.skipLike!==void 0&&t.skipLike.test(n))return e;if(e==="0")return 0;if(t.hex&&aa.test(n))return ga(n,16);if(n.includes("e")||n.includes("E"))return da(e,n,t);{const r=ca.exec(n);if(r){const i=r[1]||"",s=r[2];let u=ha(r[3]);const m=i?e[s.length+1]===".":e[s.length]===".";if(!t.leadingZeros&&(s.length>1||s.length===1&&!m))return e;{const p=Number(n),y=String(p);if(p===0)return p;if(y.search(/[eE]/)!==-1)return t.eNotation?p:e;if(n.indexOf(".")!==-1)return y==="0"||y===u||y===`${i}${u}`?p:e;let P=s?u:n;return s?P===y||i+P===y?p:e:P===y||P===i+y?p:e}}else return e}}const fa=/^([-+])?(0*)(\d*(\.\d*)?[eE][-\+]?\d+)$/;function da(e,t,n){if(!n.eNotation)return e;const r=t.match(fa);if(r){let i=r[1]||"";const s=r[3].indexOf("e")===-1?"E":"e",u=r[2],m=i?e[u.length+1]===s:e[u.length]===s;return u.length>1&&m?e:u.length===1&&(r[3].startsWith(`.${s}`)||r[3][0]===s)?Number(t):n.leadingZeros&&!m?(t=(r[1]||"")+r[3],Number(t)):e}else return e}function ha(e){return e&&e.indexOf(".")!==-1&&(e=e.replace(/0+$/,""),e==="."?e="0":e[0]==="."?e="0"+e:e[e.length-1]==="."&&(e=e.substring(0,e.length-1))),e}function ga(e,t){if(parseInt)return parseInt(e,t);if(Number.parseInt)return Number.parseInt(e,t);if(window&&window.parseInt)return window.parseInt(e,t);throw new Error("parseInt, Number.parseInt, window.parseInt are not supported")}function pa(e){return typeof e=="function"?e:Array.isArray(e)?t=>{for(const n of e)if(typeof n=="string"&&t===n||n instanceof RegExp&&n.test(t))return!0}:()=>!1}class ya{constructor(t){if(this.options=t,this.currentNode=null,this.tagsNodeStack=[],this.docTypeEntities={},this.lastEntities={apos:{regex:/&(apos|#39|#x27);/g,val:"'"},gt:{regex:/&(gt|#62|#x3E);/g,val:">"},lt:{regex:/&(lt|#60|#x3C);/g,val:"<"},quot:{regex:/&(quot|#34|#x22);/g,val:'"'}},this.ampEntity={regex:/&(amp|#38|#x26);/g,val:"&"},this.htmlEntities={space:{regex:/&(nbsp|#160);/g,val:" "},cent:{regex:/&(cent|#162);/g,val:"¢"},pound:{regex:/&(pound|#163);/g,val:"£"},yen:{regex:/&(yen|#165);/g,val:"¥"},euro:{regex:/&(euro|#8364);/g,val:"€"},copyright:{regex:/&(copy|#169);/g,val:"©"},reg:{regex:/&(reg|#174);/g,val:"®"},inr:{regex:/&(inr|#8377);/g,val:"₹"},num_dec:{regex:/&#([0-9]{1,7});/g,val:(n,r)=>String.fromCodePoint(Number.parseInt(r,10))},num_hex:{regex:/&#x([0-9a-fA-F]{1,6});/g,val:(n,r)=>String.fromCodePoint(Number.parseInt(r,16))}},this.addExternalEntities=wa,this.parseXml=Ma,this.parseTextData=ma,this.resolveNameSpace=ba,this.buildAttributesMap=xa,this.isItStopNode=Aa,this.replaceEntitiesValue=Pa,this.readStopNodeData=Ba,this.saveTextToParentTag=Ea,this.addChild=Sa,this.ignoreAttributesFn=pa(this.options.ignoreAttributes),this.options.stopNodes&&this.options.stopNodes.length>0){this.stopNodesExact=new Set,this.stopNodesWildcard=new Set;for(let n=0;n<this.options.stopNodes.length;n++){const r=this.options.stopNodes[n];typeof r=="string"&&(r.startsWith("*.")?this.stopNodesWildcard.add(r.substring(2)):this.stopNodesExact.add(r))}}}}function wa(e){const t=Object.keys(e);for(let n=0;n<t.length;n++){const r=t[n];this.lastEntities[r]={regex:new RegExp("&"+r+";","g"),val:e[r]}}}function ma(e,t,n,r,i,s,u){if(e!==void 0&&(this.options.trimValues&&!r&&(e=e.trim()),e.length>0)){u||(e=this.replaceEntitiesValue(e));const m=this.options.tagValueProcessor(t,e,n,i,s);return m==null?e:typeof m!=typeof e||m!==e?m:this.options.trimValues?$n(e,this.options.parseTagValue,this.options.numberParseOptions):e.trim()===e?$n(e,this.options.parseTagValue,this.options.numberParseOptions):e}}function ba(e){if(this.options.removeNSPrefix){const t=e.split(":"),n=e.charAt(0)==="/"?"/":"";if(t[0]==="xmlns")return"";t.length===2&&(e=n+t[1])}return e}const va=new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`,"gm");function xa(e,t){if(this.options.ignoreAttributes!==!0&&typeof e=="string"){const n=Ui(e,va),r=n.length,i={};for(let s=0;s<r;s++){const u=this.resolveNameSpace(n[s][1]);if(this.ignoreAttributesFn(u,t))continue;let m=n[s][4],p=this.options.attributeNamePrefix+u;if(u.length)if(this.options.transformAttributeName&&(p=this.options.transformAttributeName(p)),p==="__proto__"&&(p="#__proto__"),m!==void 0){this.options.trimValues&&(m=m.trim()),m=this.replaceEntitiesValue(m);const y=this.options.attributeValueProcessor(u,m,t);y==null?i[p]=m:typeof y!=typeof m||y!==m?i[p]=y:i[p]=$n(m,this.options.parseAttributeValue,this.options.numberParseOptions)}else this.options.allowBooleanAttributes&&(i[p]=!0)}if(!Object.keys(i).length)return;if(this.options.attributesGroupName){const s={};return s[this.options.attributesGroupName]=i,s}return i}}const Ma=function(e){e=e.replace(/\r\n?/g,`
`);const t=new bt("!xml");let n=t,r="",i="";const s=new sa(this.options.processEntities);for(let u=0;u<e.length;u++)if(e[u]==="<")if(e[u+1]==="/"){const p=xt(e,">",u,"Closing Tag is not closed.");let y=e.substring(u+2,p).trim();if(this.options.removeNSPrefix){const B=y.indexOf(":");B!==-1&&(y=y.substr(B+1))}this.options.transformTagName&&(y=this.options.transformTagName(y)),n&&(r=this.saveTextToParentTag(r,n,i));const P=i.substring(i.lastIndexOf(".")+1);if(y&&this.options.unpairedTags.indexOf(y)!==-1)throw new Error(`Unpaired tag can not be used as closing tag: </${y}>`);let T=0;P&&this.options.unpairedTags.indexOf(P)!==-1?(T=i.lastIndexOf(".",i.lastIndexOf(".")-1),this.tagsNodeStack.pop()):T=i.lastIndexOf("."),i=i.substring(0,T),n=this.tagsNodeStack.pop(),r="",u=p}else if(e[u+1]==="?"){let p=Hn(e,u,!1,"?>");if(!p)throw new Error("Pi Tag is not closed.");if(r=this.saveTextToParentTag(r,n,i),!(this.options.ignoreDeclaration&&p.tagName==="?xml"||this.options.ignorePiTags)){const y=new bt(p.tagName);y.add(this.options.textNodeName,""),p.tagName!==p.tagExp&&p.attrExpPresent&&(y[":@"]=this.buildAttributesMap(p.tagExp,i)),this.addChild(n,y,i,u)}u=p.closeIndex+1}else if(e.substr(u+1,3)==="!--"){const p=xt(e,"-->",u+4,"Comment is not closed.");if(this.options.commentPropName){const y=e.substring(u+4,p-2);r=this.saveTextToParentTag(r,n,i),n.add(this.options.commentPropName,[{[this.options.textNodeName]:y}])}u=p}else if(e.substr(u+1,2)==="!D"){const p=s.readDocType(e,u);this.docTypeEntities=p.entities,u=p.i}else if(e.substr(u+1,2)==="!["){const p=xt(e,"]]>",u,"CDATA is not closed.")-2,y=e.substring(u+9,p);r=this.saveTextToParentTag(r,n,i);let P=this.parseTextData(y,n.tagname,i,!0,!1,!0,!0);P==null&&(P=""),this.options.cdataPropName?n.add(this.options.cdataPropName,[{[this.options.textNodeName]:y}]):n.add(this.options.textNodeName,P),u=p+2}else{let p=Hn(e,u,this.options.removeNSPrefix),y=p.tagName;const P=p.rawTagName;let T=p.tagExp,B=p.attrExpPresent,C=p.closeIndex;if(this.options.transformTagName){const V=this.options.transformTagName(y);T===y&&(T=V),y=V}n&&r&&n.tagname!=="!xml"&&(r=this.saveTextToParentTag(r,n,i,!1));const O=n;O&&this.options.unpairedTags.indexOf(O.tagname)!==-1&&(n=this.tagsNodeStack.pop(),i=i.substring(0,i.lastIndexOf("."))),y!==t.tagname&&(i+=i?"."+y:y);const F=u;if(this.isItStopNode(this.stopNodesExact,this.stopNodesWildcard,i,y)){let V="";if(T.length>0&&T.lastIndexOf("/")===T.length-1)y[y.length-1]==="/"?(y=y.substr(0,y.length-1),i=i.substr(0,i.length-1),T=y):T=T.substr(0,T.length-1),u=p.closeIndex;else if(this.options.unpairedTags.indexOf(y)!==-1)u=p.closeIndex;else{const q=this.readStopNodeData(e,P,C+1);if(!q)throw new Error(`Unexpected end of ${P}`);u=q.i,V=q.tagContent}const $=new bt(y);y!==T&&B&&($[":@"]=this.buildAttributesMap(T,i)),V&&(V=this.parseTextData(V,y,i,!0,B,!0,!0)),i=i.substr(0,i.lastIndexOf(".")),$.add(this.options.textNodeName,V),this.addChild(n,$,i,F)}else{if(T.length>0&&T.lastIndexOf("/")===T.length-1){if(y[y.length-1]==="/"?(y=y.substr(0,y.length-1),i=i.substr(0,i.length-1),T=y):T=T.substr(0,T.length-1),this.options.transformTagName){const $=this.options.transformTagName(y);T===y&&(T=$),y=$}const V=new bt(y);y!==T&&B&&(V[":@"]=this.buildAttributesMap(T,i)),this.addChild(n,V,i,F),i=i.substr(0,i.lastIndexOf("."))}else{const V=new bt(y);this.tagsNodeStack.push(n),y!==T&&B&&(V[":@"]=this.buildAttributesMap(T,i)),this.addChild(n,V,i,F),n=V}r="",u=C}}else r+=e[u];return t.child};function Sa(e,t,n,r){this.options.captureMetaData||(r=void 0);const i=this.options.updateTag(t.tagname,n,t[":@"]);i===!1||(typeof i=="string"&&(t.tagname=i),e.addChild(t,r))}const Pa=function(e){if(this.options.processEntities){for(let t in this.docTypeEntities){const n=this.docTypeEntities[t];e=e.replace(n.regx,n.val)}for(let t in this.lastEntities){const n=this.lastEntities[t];e=e.replace(n.regex,n.val)}if(this.options.htmlEntities)for(let t in this.htmlEntities){const n=this.htmlEntities[t];e=e.replace(n.regex,n.val)}e=e.replace(this.ampEntity.regex,this.ampEntity.val)}return e};function Ea(e,t,n,r){return e&&(r===void 0&&(r=t.child.length===0),e=this.parseTextData(e,t.tagname,n,!1,t[":@"]?Object.keys(t[":@"]).length!==0:!1,r),e!==void 0&&e!==""&&t.add(this.options.textNodeName,e),e=""),e}function Aa(e,t,n,r){return!!(t&&t.has(r)||e&&e.has(n))}function Ta(e,t,n=">"){let r,i="";for(let s=t;s<e.length;s++){let u=e[s];if(r)u===r&&(r="");else if(u==='"'||u==="'")r=u;else if(u===n[0])if(n[1]){if(e[s+1]===n[1])return{data:i,index:s}}else return{data:i,index:s};else u==="	"&&(u=" ");i+=u}}function xt(e,t,n,r){const i=e.indexOf(t,n);if(i===-1)throw new Error(r);return i+t.length-1}function Hn(e,t,n,r=">"){const i=Ta(e,t+1,r);if(!i)return;let s=i.data;const u=i.index,m=s.search(/\s/);let p=s,y=!0;m!==-1&&(p=s.substring(0,m),s=s.substring(m+1).trimStart());const P=p;if(n){const T=p.indexOf(":");T!==-1&&(p=p.substr(T+1),y=p!==i.data.substr(T+1))}return{tagName:p,tagExp:s,closeIndex:u,attrExpPresent:y,rawTagName:P}}function Ba(e,t,n){const r=n;let i=1;for(;n<e.length;n++)if(e[n]==="<")if(e[n+1]==="/"){const s=xt(e,">",n,`${t} is not closed`);if(e.substring(n+2,s).trim()===t&&(i--,i===0))return{tagContent:e.substring(r,n),i:s};n=s}else if(e[n+1]==="?")n=xt(e,"?>",n+1,"StopNode is not closed.");else if(e.substr(n+1,3)==="!--")n=xt(e,"-->",n+3,"StopNode is not closed.");else if(e.substr(n+1,2)==="![")n=xt(e,"]]>",n,"StopNode is not closed.")-2;else{const s=Hn(e,n,">");s&&((s&&s.tagName)===t&&s.tagExp[s.tagExp.length-1]!=="/"&&i++,n=s.closeIndex)}}function $n(e,t,n){if(t&&typeof e=="string"){const r=e.trim();return r==="true"?!0:r==="false"?!1:la(e,n)}else return $s(e)?e:""}const In=bt.getMetaDataSymbol();function Ia(e,t){return Ci(e,t)}function Ci(e,t,n){let r;const i={};for(let s=0;s<e.length;s++){const u=e[s],m=_a(u);let p="";if(n===void 0?p=m:p=n+"."+m,m===t.textNodeName)r===void 0?r=u[m]:r+=""+u[m];else{if(m===void 0)continue;if(u[m]){let y=Ci(u[m],t,p);const P=Na(y,t);u[In]!==void 0&&(y[In]=u[In]),u[":@"]?za(y,u[":@"],p,t):Object.keys(y).length===1&&y[t.textNodeName]!==void 0&&!t.alwaysCreateTextNode?y=y[t.textNodeName]:Object.keys(y).length===0&&(t.alwaysCreateTextNode?y[t.textNodeName]="":y=""),i[m]!==void 0&&i.hasOwnProperty(m)?(Array.isArray(i[m])||(i[m]=[i[m]]),i[m].push(y)):t.isArray(m,p,P)?i[m]=[y]:i[m]=y}}}return typeof r=="string"?r.length>0&&(i[t.textNodeName]=r):r!==void 0&&(i[t.textNodeName]=r),i}function _a(e){const t=Object.keys(e);for(let n=0;n<t.length;n++){const r=t[n];if(r!==":@")return r}}function za(e,t,n,r){if(t){const i=Object.keys(t),s=i.length;for(let u=0;u<s;u++){const m=i[u];r.isArray(m,n+"."+m,!0,!0)?e[m]=[t[m]]:e[m]=t[m]}}}function Na(e,t){const{textNodeName:n}=t,r=Object.keys(e).length;return!!(r===0||r===1&&(e[n]||typeof e[n]=="boolean"||e[n]===0))}class Ua{constructor(t){this.externalEntities={},this.options=oa(t)}parse(t,n){if(typeof t!="string"&&t.toString)t=t.toString();else if(typeof t!="string")throw new Error("XML data is accepted in String or Bytes[] form.");if(n){n===!0&&(n={});const s=js(t,n);if(s!==!0)throw Error(`${s.err.msg}:${s.err.line}:${s.err.col}`)}const r=new ya(this.options);r.addExternalEntities(this.externalEntities);const i=r.parseXml(t);return this.options.preserveOrder||i===void 0?i:Ia(i,this.options)}addEntity(t,n){if(n.indexOf("&")!==-1)throw new Error("Entity value can't have '&'");if(t.indexOf("&")!==-1||t.indexOf(";")!==-1)throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");if(n==="&")throw new Error("An entity with value '&' is not permitted");this.externalEntities[t]=n}static getMetaDataSymbol(){return bt.getMetaDataSymbol()}}function Ca(e){const t=[],n=[],r=new Ua({ignoreAttributes:!1,attributeNamePrefix:"",preserveOrder:!0,trimValues:!0,allowBooleanAttributes:!0});let i;try{i=r.parse(e,{allowBooleanAttributes:!0})}catch(m){return{entities:[],errors:[{message:`xml parse error: ${m.message}`}],warnings:[]}}const s=Oi(i),u=[];for(const m of s)if(m.tag==="scene")for(const p of m.children){const y=Zn(p,t,n);y&&u.push(y)}else if(m.tag==="a"){const p=Zn(m,t,n);p&&u.push(p)}else(m.tag.toLowerCase()==="scene"||m.tag.toLowerCase()==="world")&&t.push({message:`Invalid tag "${m.tag}". Use lowercase <scene>`});return{entities:u,errors:t,warnings:n}}function Oa(e){return e.startsWith("@")&&e.length>1}function Zn(e,t,n){if(e.tag!=="a")return e.tag.toLowerCase()==="a"&&t.push({message:`Invalid tag "${e.tag}". Use lowercase <a>`}),null;const r=[],i=[],s=[],u=[];let m;for(const[p,y]of Object.entries(e.attrs)){if(p==="id"){m=y;continue}if(typeof y=="string"&&Oa(y)){s.push({attrName:p,targetName:y.slice(1)});continue}const P=Bi(p);if(P){const T={};typeof y=="string"&&y!==""&&(T._value=y),r.push({def:P,attrs:T});continue}typeof y=="string"&&y!==""&&u.push({name:p,value:y})}for(const{name:p,value:y}of u){const P=dr(p);let T=!1;for(const B of r){const C=B.def.component;(P in C||`${P}X`in C)&&(T=!0,B.attrs._value||(B.attrs[p]=y))}if(!T){const B=m?` (${m})`:"";n.push(`shorthand "${p}" matches no declared component${B}`)}}for(const p of e.children)if(p.tag==="a"){const y=Zn(p,t,n);y&&i.push(y)}else p.tag.toLowerCase()==="a"?t.push({message:`Invalid tag "${p.tag}". Use lowercase <a>`}):t.push({message:`Only <a> children allowed, found <${p.tag}>`});return{id:m,components:r,children:i,entityRefs:s}}function Oi(e){if(!Array.isArray(e))return[];const t=[];for(const n of e)if(!(typeof n!="object"||n===null))for(const[r,i]of Object.entries(n)){if(r===":@")continue;const s=n[":@"]??{},u={};for(const[p,y]of Object.entries(s))typeof y=="string"?u[p]=y:(y===!0||y==="")&&(u[p]="");const m=Oi(i);t.push({tag:r,attrs:u,children:m})}return t}function Ri(e,t){return`${t}X`in e&&`${t}Y`in e}function Di(e,t){return Ri(e,t)&&`${t}Z`in e}function Ra(e,t){return Di(e,t)&&`${t}W`in e}function Da(e){if(e=e.trim(),e.startsWith("0x")||e.startsWith("0X"))return parseInt(e,16);if(e.startsWith("#"))return parseInt(e.slice(1),16);if(e==="true")return 1;if(e==="false")return 0;const t=parseFloat(e);return isNaN(t)?null:t}function Ga(e){return e.trim().split(/\s+/).map(Da)}function _n(e,t,n){const r={},i=[],s=t.split(";").map(u=>u.trim()).filter(Boolean);for(const u of s){const m=u.indexOf(":");if(m===-1){i.push(`Invalid syntax: "${u}" (expected "field: value")`);continue}const p=u.slice(0,m).trim(),y=u.slice(m+1).trim();if(!p||!y){i.push(`Invalid syntax: "${u}" (empty field or value)`);continue}const P=dr(p),T=Ga(y);if(T.some(F=>F===null)){i.push(`Invalid number in "${u}"`);continue}const B=T;if(Ra(n,P)){B.length===4?(r[`${P}X`]=B[0],r[`${P}Y`]=B[1],r[`${P}Z`]=B[2],r[`${P}W`]=B[3]):B.length===1?(r[`${P}X`]=B[0],r[`${P}Y`]=B[0],r[`${P}Z`]=B[0],r[`${P}W`]=B[0]):i.push(`${e}.${p}: expected 1 or 4 values, got ${B.length}`);continue}if(Di(n,P)){B.length===3?(r[`${P}X`]=B[0],r[`${P}Y`]=B[1],r[`${P}Z`]=B[2]):B.length===1?(r[`${P}X`]=B[0],r[`${P}Y`]=B[0],r[`${P}Z`]=B[0]):i.push(`${e}.${p}: expected 1 or 3 values, got ${B.length}`);continue}if(Ri(n,P)){B.length===2?(r[`${P}X`]=B[0],r[`${P}Y`]=B[1]):B.length===1?(r[`${P}X`]=B[0],r[`${P}Y`]=B[0]):i.push(`${e}.${p}: expected 1 or 2 values, got ${B.length}`);continue}if(P in n){B.length===1?r[P]=B[0]:i.push(`${e}.${p}: expected 1 value, got ${B.length}`);continue}const C=Object.keys(n),O=ms(p,C);O?i.push(`${e}: unknown field "${p}", did you mean "${Pt(O)}"?`):i.push(`${e}: unknown field "${p}"`)}return{values:r,errors:i}}function Xr(e){return e.includes(":")&&(e.includes(";")||/^[\w-]+\s*:/.test(e))}const Gi=[];function Fi(e){Gi.push(e)}class Fa{nameToEntity=new Map;_currentEid=0;get currentEid(){return this._currentEid}setCurrentEid(t){this._currentEid=t}getEntityByName(t){return this.nameToEntity.get(t)??null}setName(t,n){this.nameToEntity.set(t,n)}getEntityMap(){return new Map(this.nameToEntity)}}function Li(e,t){const n=Ca(t);return Ya(e,n.entities,n.errors)}async function La(e,t){const r=await(await Ai()).readFile(t);return Li(e,r)}function Ya(e,t,n){const r=new Fa,i=[...n],s=[],u=[];for(const m of t){const p=Yi(e,m,r,void 0,s);u.push(p)}for(const{def:m,eid:p,parent:y}of s){y!==void 0&&Ct(e.world,p,He(ht.relation,y));for(const P of m.entityRefs)Xa(e,p,P,r,i);for(const P of m.components)ka(e,p,P,r,i)}for(const m of Gi)m(e,r);return{entities:r.getEntityMap(),roots:u,errors:i}}function Yi(e,t,n,r,i){const s=e.addEntity();t.id&&n.setName(t.id,s),i.push({def:t,eid:s,parent:r});for(const u of t.children)Yi(e,u,n,s,i);return s}function Xa(e,t,n,r,i){const s=Ss(n.attrName);if(!s){i.push({message:`Unknown relation: "${n.attrName}"`});return}const u=r.getEntityByName(n.targetName);if(u===null){i.push({message:`Unknown entity: "@${n.targetName}"`});return}e.addRelation(t,s,u)}function ka(e,t,n,r,i){const{def:s,attrs:u}=n,{component:m,name:p,traits:y}=s;e.addComponent(t,m);const P=y?.defaults?.()??{};for(const[B,C]of Object.entries(P))kr(m,B,t,C);let T;if(r.setCurrentEid(t),y?.adapter)T=y.adapter(u,e,r);else{const B=Va(s,u);T=B.values;for(const C of B.errors)i.push({message:`<${p}> ${C}`})}for(const[B,C]of Object.entries(T))kr(m,B,t,C)}function Va(e,t){const n={},r=[];if(t._value&&Xr(t._value)){const i=_n(e.name,t._value,e.component);Object.assign(n,i.values),r.push(...i.errors)}for(const[i,s]of Object.entries(t))if(i!=="_value"&&s)if(Xr(s)){const u=_n(e.name,s,e.component);Object.assign(n,u.values),r.push(...u.errors)}else{const u=_n(e.name,`${i}: ${s}`,e.component);Object.assign(n,u.values),r.push(...u.errors)}return{values:n,errors:r}}function kr(e,t,n,r){const i=e[t];i!=null&&(ArrayBuffer.isView(i)||Array.isArray(i))&&(i[n]=r)}const qa=Object.freeze(Object.defineProperty({__proto__:null,loadScene:Li,loadSceneFile:La,registerPostLoadHook:Fi},Symbol.toStringTag,{value:"Module"}));async function Ha(){const e=await Ms(),t=navigator.gpu.getPreferredCanvasFormat();return{device:e,format:t}}const $a=Ha();async function Za(e,t){const n=t?{device:t,format:navigator.gpu.getPreferredCanvasFormat()}:await $a,r=e.getContext("webgpu");if(!r)throw new Error("Failed to get WebGPU context");return r.configure({device:n.device,format:n.format,alphaMode:"opaque"}),{...n,context:r,canvas:e}}function pr(e,t){return e.createBuffer({size:t.size,usage:t.usage,label:t.label,mappedAtCreation:t.mappedAtCreation})}function ja(e,t,n,r=0){e.queue.writeBuffer(t,r,n)}function Vr(e,t,n){return pr(e,{size:t,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,label:n})}function Wa(e,t,n){const r=pr(e,{size:t.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST,label:n});return e.queue.writeBuffer(r,0,t),r}function Qa(e,t,n){const r=pr(e,{size:t.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST,label:n});return e.queue.writeBuffer(r,0,t),r}function Ka(e,t){const r={colorAttachments:[{view:t.colorView,clearValue:t.clearColor??{r:.1,g:.1,b:.1,a:1},loadOp:"clear",storeOp:"store"}]};return t.depthView&&(r.depthStencilAttachment={view:t.depthView,depthClearValue:t.clearDepth??1,depthLoadOp:"clear",depthStoreOp:"store"}),e.beginRenderPass(r)}function Ja(){const e=new Float32Array([-.5,-.5,.5,0,0,1,.5,-.5,.5,0,0,1,.5,.5,.5,0,0,1,-.5,.5,.5,0,0,1,.5,-.5,-.5,0,0,-1,-.5,-.5,-.5,0,0,-1,-.5,.5,-.5,0,0,-1,.5,.5,-.5,0,0,-1,-.5,.5,.5,0,1,0,.5,.5,.5,0,1,0,.5,.5,-.5,0,1,0,-.5,.5,-.5,0,1,0,-.5,-.5,-.5,0,-1,0,.5,-.5,-.5,0,-1,0,.5,-.5,.5,0,-1,0,-.5,-.5,.5,0,-1,0,.5,-.5,.5,1,0,0,.5,-.5,-.5,1,0,0,.5,.5,-.5,1,0,0,.5,.5,.5,1,0,0,-.5,-.5,-.5,-1,0,0,-.5,-.5,.5,-1,0,0,-.5,.5,.5,-1,0,0,-.5,.5,-.5,-1,0,0]),t=new Uint16Array([0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23]);return{vertices:e,indices:t,vertexCount:24,indexCount:36}}function ec(e=32,t=16){const n=[],r=[];for(let m=0;m<=t;m++){const y=m/t*Math.PI;for(let P=0;P<=e;P++){const B=P/e*Math.PI*2,C=Math.sin(y)*Math.cos(B),O=Math.cos(y),F=Math.sin(y)*Math.sin(B);n.push(C*.5,O*.5,F*.5,C,O,F)}}for(let m=0;m<t;m++)for(let p=0;p<e;p++){const y=m*(e+1)+p,P=y+e+1;r.push(y,y+1,P),r.push(y+1,P+1,P)}const s=(t+1)*(e+1),u=t*e*6;return{vertices:new Float32Array(n),indices:new Uint16Array(r),vertexCount:s,indexCount:u}}function tc(){const e=new Float32Array([-.5,0,.5,0,1,0,.5,0,.5,0,1,0,.5,0,-.5,0,1,0,-.5,0,-.5,0,1,0]),t=new Uint16Array([0,1,2,0,2,3]);return{vertices:e,indices:t,vertexCount:4,indexCount:6}}let ge;function nc(e){ge.compute_transforms(e)}function rc(){return ge.get_indices_ptr()>>>0}function ic(){return ge.get_matrices_ptr()>>>0}function oc(){return ge.get_max_entities()>>>0}function sc(){return ge.get_no_parent()>>>0}function ac(){return ge.get_parents_ptr()>>>0}function cc(){return ge.get_pos_x_ptr()>>>0}function uc(){return ge.get_pos_y_ptr()>>>0}function lc(){return ge.get_pos_z_ptr()>>>0}function fc(){return ge.get_quat_w_ptr()>>>0}function dc(){return ge.get_quat_x_ptr()>>>0}function hc(){return ge.get_quat_y_ptr()>>>0}function gc(){return ge.get_quat_z_ptr()>>>0}function pc(){return ge.get_scale_x_ptr()>>>0}function yc(){return ge.get_scale_y_ptr()>>>0}function wc(){return ge.get_scale_z_ptr()>>>0}function mc(){ge.init_data()}const bc=new Set(["basic","cors","default"]);async function vc(e,t){if(typeof Response=="function"&&e instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(e,t)}catch(r){if(e.ok&&bc.has(e.type)&&e.headers.get("Content-Type")!=="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",r);else throw r}const n=await e.arrayBuffer();return await WebAssembly.instantiate(n,t)}else{const n=await WebAssembly.instantiate(e,t);return n instanceof WebAssembly.Instance?{instance:n,module:e}:n}}function xc(){const e={};return e.wbg={},e}function Mc(e,t){return ge=e.exports,Xi.__wbindgen_wasm_module=t,ge}async function Xi(e){if(ge!==void 0)return ge;typeof e<"u"&&(Object.getPrototypeOf(e)===Object.prototype?{module_or_path:e}=e:console.warn("using deprecated parameters for the initialization function; pass a single object instead")),typeof e>"u"&&(e=new URL(""+new URL("shallot_transforms_bg-CBRfNtfH.wasm",import.meta.url).href,import.meta.url));const t=xc();(typeof e=="string"||typeof Request=="function"&&e instanceof Request||typeof URL=="function"&&e instanceof URL)&&(e=fetch(e));const{instance:n,module:r}=await vc(await e,t);return Mc(n,r)}let jn,ki,Vi,qi,Hi,$i,Zi,ji,Wi,Qi,Ki,Wn,Qn,Ji;async function Sc(){if(jn)return;const e=await Xi();mc();const t=e.memory.buffer,n=oc();jn=new Float32Array(t,cc(),n),ki=new Float32Array(t,uc(),n),Vi=new Float32Array(t,lc(),n),qi=new Float32Array(t,dc(),n),Hi=new Float32Array(t,hc(),n),$i=new Float32Array(t,gc(),n),Zi=new Float32Array(t,fc(),n),ji=new Float32Array(t,pc(),n),Wi=new Float32Array(t,yc(),n),Qi=new Float32Array(t,wc(),n),Ki=new Float32Array(t,ic(),n*16),Wn=new Uint32Array(t,rc(),n),Qn=new Uint32Array(t,ac(),n),Ji=sc()}function Pc(e){nc(e)}dt.create();dt.create();dt.create();function zn(e){function t(r){return Rr(j.quatX[r],j.quatY[r],j.quatZ[r],j.quatW[r])[e]}function n(r,i){const s=Rr(j.quatX[r],j.quatY[r],j.quatZ[r],j.quatW[r]);s[e]=i;const u=Xs(s.x,s.y,s.z);j.quatX[r]=u.x,j.quatY[r]=u.y,j.quatZ[r]=u.z,j.quatW[r]=u.w}return new Proxy([],{get(r,i){if(i==="get")return t;if(i==="set")return n;const s=Number(i);if(!Number.isNaN(s))return t(s)},set(r,i,s){const u=Number(i);return Number.isNaN(u)?!1:(n(u,s),!0)}})}const j={posX:new Float32Array(ue),posY:new Float32Array(ue),posZ:new Float32Array(ue),quatX:new Float32Array(ue),quatY:new Float32Array(ue),quatZ:new Float32Array(ue),quatW:new Float32Array(ue),scaleX:new Float32Array(ue),scaleY:new Float32Array(ue),scaleZ:new Float32Array(ue),eulerX:zn("x"),eulerY:zn("y"),eulerZ:zn("z")},de={data:new Float32Array(ue*16)};Ue(j,{defaults:()=>({posX:0,posY:0,posZ:0,quatX:0,quatY:0,quatZ:0,quatW:1,scaleX:1,scaleY:1,scaleZ:1}),accessors:{eulerX:j.eulerX,eulerY:j.eulerY,eulerZ:j.eulerZ}});async function Ec(){await Sc(),j.posX=jn,j.posY=ki,j.posZ=Vi,j.quatX=qi,j.quatY=Hi,j.quatZ=$i,j.quatW=Zi,j.scaleX=ji,j.scaleY=Wi,j.scaleZ=Qi,de.data=Ki}const Ac={group:"simulation",last:!0,update(e){for(const n of e.query([j,Er(de)]))e.addComponent(n,de);let t=0;for(const n of e.query([j,Er(ht.relation(Ne))]))Wn[t]=n,Qn[t]=Ji,t++;for(const n of e.query([j,ht.relation(Ne),Wo(ht.relation)]))Wn[t]=n,Qn[t]=e.getRelationTargets(n,ht)[0],t++;Pc(t)}},Tc={systems:[Ac],components:{Transform:j,WorldTransform:de},initialize:Ec},at={Box:0,Sphere:1,Plane:2};function Nn(e){function t(r){return fe.data[r*8+e]}function n(r,i){fe.data[r*8+e]=i}return new Proxy([],{get(r,i){if(i==="get")return t;if(i==="set")return n;const s=Number(i);if(!Number.isNaN(s))return t(s)},set(r,i,s){const u=Number(i);return Number.isNaN(u)?!1:(n(u,s),!0)}})}function Bc(){function e(n){const r=n*8+4,i=Math.round(fe.data[r+0]*255),s=Math.round(fe.data[r+1]*255),u=Math.round(fe.data[r+2]*255);return(Math.round(fe.data[r+3]*255)<<24|i<<16|s<<8|u)>>>0}function t(n,r){const i=n*8+4;fe.data[i+0]=(r>>16&255)/255,fe.data[i+1]=(r>>8&255)/255,fe.data[i+2]=(r&255)/255,fe.data[i+3]=(r>>24&255)/255}return new Proxy([],{get(n,r){if(r==="get")return e;if(r==="set")return t;const i=Number(r);if(!Number.isNaN(i))return e(i)},set(n,r,i){const s=Number(r);return Number.isNaN(s)?!1:(t(s,i),!0)}})}const fe={shape:new Uint32Array(ue),visible:new Uint32Array(ue),sizeX:Nn(0),sizeY:Nn(1),sizeZ:Nn(2),color:Bc(),data:new Float32Array(ue*8)};Ue(fe,{defaults:()=>({shape:at.Box,visible:1,sizeX:1,sizeY:1,sizeZ:1,color:4294967295})});const yn=[];let qr=!1;function Ic(e){if(!qr){qr=!0;for(const t of e.query([fe,de]))yn.push(t);ts(e.world,es(fe,de),t=>{yn.push(t)})}}function _c(e,t){const n=t.count;t.entityIds[n]=e,t.count++,t.dirty=!0}function zc(e,t){e.gpu.device.queue.writeBuffer(t.entityIdBuffer,0,t.entityIds.buffer,0,t.count*4),e.gpu.device.queue.writeBuffer(t.visibleEntityIdBuffer,0,t.entityIds.buffer,0,t.count*4)}function Nc(e,t,n){const r=e.geometries.get(t);if(!r)return;const i=new Uint32Array([r.indexCount,n.count,0,0,0]);e.gpu.device.queue.writeBuffer(n.indirectBuffer,0,i)}function Uc(e,t){const n=(t+1)*8*4;e.gpu.device.queue.writeBuffer(e.meshDataBuffer,0,fe.data.buffer,fe.data.byteOffset,n)}function Cc(e,t){const n=(t+1)*64;e.gpu.device.queue.writeBuffer(e.matricesBuffer,0,de.data.buffer,de.data.byteOffset,n)}const Oc={group:"draw",first:!0,update(e){const n=yt.from(e)?.context;if(!n)return;Ic(e);let r=0;for(const i of yn){if(fe.visible[i]!==1)continue;const s=fe.shape[i],u=tu(n,s);_c(i,u),i>r&&(r=i)}yn.length=0;for(const[i,s]of n.shapes)s.dirty&&(zc(n,s),Nc(n,i,s),s.dirty=!1);for(const[,i]of n.shapes)for(let s=0;s<i.count;s++){const u=i.entityIds[s];u>r&&(r=u)}r>0&&(Uc(n,r),Cc(n,r))}},Yt={color:[],intensity:[]};Ue(Yt,{defaults:()=>({color:8947848,intensity:1})});const qe={color:[],intensity:[],directionX:[],directionY:[],directionZ:[]};Ue(qe,{defaults:()=>({color:16777215,intensity:1,directionX:-.5,directionY:-1,directionZ:-.5})});const Rc=64,ie=new Float32Array(16);function Hr(e){return[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255]}function Dc(e,t,n){const r=Math.sqrt(e*e+t*t+n*n);return r===0?[0,-1,0]:[e/r,t/r,n/r]}function Gc(e,t){if(e){const[n,r,i]=Hr(e.color);ie[0]=n,ie[1]=r,ie[2]=i,ie[3]=e.intensity}else ie[0]=.5,ie[1]=.5,ie[2]=.5,ie[3]=.3;if(ie[4]=0,ie[5]=0,ie[6]=0,ie[7]=0,t){const[n,r,i]=Dc(t.dirX,t.dirY,t.dirZ);ie[8]=n,ie[9]=r,ie[10]=i,ie[11]=0;const[s,u,m]=Hr(t.color);ie[12]=s*t.intensity,ie[13]=u*t.intensity,ie[14]=m*t.intensity,ie[15]=0}else ie[8]=0,ie[9]=-1,ie[10]=0,ie[11]=0,ie[12]=0,ie[13]=0,ie[14]=0,ie[15]=0;return ie}const Fc={group:"draw",update(e){const n=yt.from(e)?.context;if(!n)return;let r=null,i=null;for(const u of e.query([Yt])){r={color:Yt.color[u],intensity:Yt.intensity[u]};break}for(const u of e.query([qe])){i={color:qe.color[u],intensity:qe.intensity[u],dirX:qe.directionX[u],dirY:qe.directionY[u],dirZ:qe.directionZ[u]};break}const s=Gc(r,i);ja(n.gpu.device,n.lightBuffer,s)}},Lc=`
struct Uniforms {
    viewProjection: mat4x4f,
}

struct LightUniforms {
    ambientColor: vec4f,
    _padding: vec4f,
    sunDirection: vec4f,
    sunColor: vec4f,
}

struct MeshData {
    size: vec4f,
    color: vec4f,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var<uniform> lights: LightUniforms;
@group(0) @binding(2) var<storage, read> worldMatrices: array<mat4x4f>;
@group(0) @binding(3) var<storage, read> entityIds: array<u32>;
@group(0) @binding(4) var<storage, read> meshData: array<MeshData>;

struct VertexInput {
    @location(0) position: vec3f,
    @location(1) normal: vec3f,
    @builtin(instance_index) instanceIndex: u32,
}

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) worldNormal: vec3f,
    @location(1) @interpolate(flat) entityId: u32,
}

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {
    let eid = entityIds[input.instanceIndex];
    let transform = worldMatrices[eid];
    let size = meshData[eid].size.xyz;

    let scaledPos = input.position * size;
    let worldPos = transform * vec4f(scaledPos, 1.0);

    let m3 = mat3x3f(transform[0].xyz, transform[1].xyz, transform[2].xyz);
    let worldNormal = normalize(m3 * input.normal);

    var output: VertexOutput;
    output.position = uniforms.viewProjection * worldPos;
    output.worldNormal = worldNormal;
    output.entityId = eid;
    return output;
}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
    let normal = normalize(input.worldNormal);
    let color = meshData[input.entityId].color;

    let ambient = lights.ambientColor.rgb * lights.ambientColor.a;
    let NdotL = max(dot(normal, -lights.sunDirection.xyz), 0.0);
    let diffuse = lights.sunColor.rgb * NdotL;

    let finalColor = (ambient + diffuse) * color.rgb;
    return vec4f(finalColor, color.a);
}
`;async function Yc(e,t){const n=e.device.createShaderModule({label:"litShader",code:Lc}),r=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:2,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:3,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:4,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}}]}),i=e.device.createPipelineLayout({bindGroupLayouts:[r]});return{pipeline:await e.device.createRenderPipelineAsync({label:"litPipeline",layout:i,vertex:{module:n,entryPoint:"vertexMain",buffers:[{arrayStride:24,attributes:[{shaderLocation:0,offset:0,format:"float32x3"},{shaderLocation:1,offset:12,format:"float32x3"}]}]},fragment:{module:n,entryPoint:"fragmentMain",targets:[{format:t}]},primitive:{topology:"triangle-list",cullMode:"back"},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"}}),bindGroupLayout:r}}const Xc=`
struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
    var positions = array<vec2f, 3>(
        vec2f(-1.0, -1.0),
        vec2f(3.0, -1.0),
        vec2f(-1.0, 3.0)
    );

    let pos = positions[vertexIndex];

    var output: VertexOutput;
    output.position = vec4f(pos, 0.0, 1.0);
    output.uv = (pos + 1.0) * 0.5;
    output.uv.y = 1.0 - output.uv.y;
    return output;
}

@group(0) @binding(0) var inputTexture: texture_2d<f32>;
@group(0) @binding(1) var inputSampler: sampler;

struct Uniforms {
    exposure: f32,
    vignetteStrength: f32,
    vignetteInner: f32,
    vignetteOuter: f32,
    texelSizeX: f32,
    texelSizeY: f32,
    flags: u32,
    _pad: u32,
}

@group(0) @binding(2) var<uniform> uniforms: Uniforms;

const FLAG_TONEMAP: u32 = 1u;
const FLAG_FXAA: u32 = 2u;
const FLAG_VIGNETTE: u32 = 4u;

fn aces(x: vec3f) -> vec3f {
    let a = 2.51;
    let b = 0.03;
    let c = 2.43;
    let d = 0.59;
    let e = 0.14;
    return saturate((x * (a * x + b)) / (x * (c * x + d) + e));
}

fn luma(color: vec3f) -> f32 {
    return dot(color, vec3f(0.299, 0.587, 0.114));
}

const FXAA_REDUCE_MIN: f32 = 1.0 / 128.0;
const FXAA_REDUCE_MUL: f32 = 1.0 / 8.0;
const FXAA_SPAN_MAX: f32 = 8.0;

fn applyFXAA(uv: vec2f, colorM: vec3f) -> vec3f {
    let texelSize = vec2f(uniforms.texelSizeX, uniforms.texelSizeY);

    let colorNW = textureSample(inputTexture, inputSampler, uv + vec2f(-1.0, -1.0) * texelSize).rgb;
    let colorNE = textureSample(inputTexture, inputSampler, uv + vec2f(1.0, -1.0) * texelSize).rgb;
    let colorSW = textureSample(inputTexture, inputSampler, uv + vec2f(-1.0, 1.0) * texelSize).rgb;
    let colorSE = textureSample(inputTexture, inputSampler, uv + vec2f(1.0, 1.0) * texelSize).rgb;

    let lumaM = luma(colorM);
    let lumaNW = luma(colorNW);
    let lumaNE = luma(colorNE);
    let lumaSW = luma(colorSW);
    let lumaSE = luma(colorSE);

    let lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));
    let lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));

    var dir: vec2f;
    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
    dir.y = ((lumaNW + lumaSW) - (lumaNE + lumaSE));

    let dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) * 0.25 * FXAA_REDUCE_MUL, FXAA_REDUCE_MIN);
    let rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);
    dir = clamp(dir * rcpDirMin, vec2f(-FXAA_SPAN_MAX), vec2f(FXAA_SPAN_MAX)) * texelSize;

    let colorA = 0.5 * (
        textureSample(inputTexture, inputSampler, uv + dir * (1.0 / 3.0 - 0.5)).rgb +
        textureSample(inputTexture, inputSampler, uv + dir * (2.0 / 3.0 - 0.5)).rgb
    );

    let colorB = colorA * 0.5 + 0.25 * (
        textureSample(inputTexture, inputSampler, uv + dir * -0.5).rgb +
        textureSample(inputTexture, inputSampler, uv + dir * 0.5).rgb
    );

    let lumaB = luma(colorB);

    if lumaB < lumaMin || lumaB > lumaMax {
        return colorA;
    }
    return colorB;
}

fn applyVignette(color: vec3f, uv: vec2f) -> vec3f {
    let center = vec2f(0.5, 0.5);
    let dist = distance(uv, center);
    let vignette = 1.0 - smoothstep(uniforms.vignetteInner, uniforms.vignetteOuter, dist) * uniforms.vignetteStrength;
    return color * vignette;
}

@fragment
fn fragmentMain(@location(0) uv: vec2f) -> @location(0) vec4f {
    var color = textureSample(inputTexture, inputSampler, uv).rgb;

    if (uniforms.flags & FLAG_FXAA) != 0u {
        color = applyFXAA(uv, color);
    }

    if (uniforms.flags & FLAG_TONEMAP) != 0u {
        color = aces(color * uniforms.exposure);
    }

    if (uniforms.flags & FLAG_VIGNETTE) != 0u {
        color = applyVignette(color, uv);
    }

    return vec4f(color, 1.0);
}
`,wn={exposure:[]};Ue(wn,{defaults:()=>({exposure:1})});const eo={},It={strength:[],inner:[],outer:[]};Ue(It,{defaults:()=>({strength:.5,inner:.4,outer:.8})});async function kc(e){const t=e.device.createShaderModule({label:"Uber post-process shader",code:Xc}),n=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),r=e.device.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),i=e.device.createSampler({magFilter:"linear",minFilter:"linear"}),s=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]}),u=e.device.createShaderModule({label:"Blit shader",code:`
struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
    var positions = array<vec2f, 3>(
        vec2f(-1.0, -1.0),
        vec2f(3.0, -1.0),
        vec2f(-1.0, 3.0)
    );
    let pos = positions[vertexIndex];
    var output: VertexOutput;
    output.position = vec4f(pos, 0.0, 1.0);
    output.uv = (pos + 1.0) * 0.5;
    output.uv.y = 1.0 - output.uv.y;
    return output;
}

@group(0) @binding(0) var inputTexture: texture_2d<f32>;
@group(0) @binding(1) var inputSampler: sampler;

@fragment
fn fragmentMain(@location(0) uv: vec2f) -> @location(0) vec4f {
    return textureSample(inputTexture, inputSampler, uv);
}
`}),[m,p]=await Promise.all([e.device.createRenderPipelineAsync({label:"Uber post-process pipeline",layout:e.device.createPipelineLayout({bindGroupLayouts:[n]}),vertex:{module:t,entryPoint:"vertexMain"},fragment:{module:t,entryPoint:"fragmentMain",targets:[{format:e.format}]},primitive:{topology:"triangle-list"}}),e.device.createRenderPipelineAsync({label:"Blit pipeline",layout:e.device.createPipelineLayout({bindGroupLayouts:[s]}),vertex:{module:u,entryPoint:"vertexMain"},fragment:{module:u,entryPoint:"fragmentMain",targets:[{format:e.format}]},primitive:{topology:"triangle-list"}})]);return{pipeline:m,uniforms:r,layout:n,sampler:i,sceneTarget:null,blitPipeline:p,blitLayout:s}}const Kn={Raster:0,Raytracing:1},Vc={Color:0},pe={fov:[],near:[],far:[],active:[],clearColor:[],renderMode:[],debugMode:[]};Ue(pe,{defaults:()=>({fov:60,near:.1,far:1e3,active:1,clearColor:1710618,renderMode:Kn.Raster,debugMode:Vc.Color})});const qc=64,Hc={[at.Box]:{minX:-.5,minY:-.5,minZ:-.5,maxX:.5,maxY:.5,maxZ:.5},[at.Sphere]:{minX:-.5,minY:-.5,minZ:-.5,maxX:.5,maxY:.5,maxZ:.5},[at.Plane]:{minX:-.5,minY:-.01,minZ:-.5,maxX:.5,maxY:.01,maxZ:.5}},$c=`
struct CullUniforms {
    viewProjection: mat4x4f,
    planes: array<vec4f, 6>,
}

struct AABB {
    minPoint: vec3f,
    maxPoint: vec3f,
}

struct IndirectArgs {
    indexCount: u32,
    instanceCount: atomic<u32>,
    firstIndex: u32,
    baseVertex: u32,
    firstInstance: u32,
}

@group(0) @binding(0) var<uniform> uniforms: CullUniforms;
@group(0) @binding(1) var<storage, read> worldMatrices: array<mat4x4f>;
@group(0) @binding(2) var<storage, read> entityIds: array<u32>;
@group(0) @binding(3) var<storage, read_write> visibleEntityIds: array<u32>;
@group(0) @binding(4) var<storage, read_write> indirectArgs: IndirectArgs;
@group(0) @binding(5) var<uniform> shapeAABB: AABB;

fn transformCorner(m: mat4x4f, corner: vec3f) -> vec3f {
    return (m * vec4f(corner, 1.0)).xyz;
}

fn testFrustumOBB(m: mat4x4f, aabbMin: vec3f, aabbMax: vec3f) -> bool {
    var corners: array<vec3f, 8>;
    corners[0] = transformCorner(m, vec3f(aabbMin.x, aabbMin.y, aabbMin.z));
    corners[1] = transformCorner(m, vec3f(aabbMax.x, aabbMin.y, aabbMin.z));
    corners[2] = transformCorner(m, vec3f(aabbMin.x, aabbMax.y, aabbMin.z));
    corners[3] = transformCorner(m, vec3f(aabbMax.x, aabbMax.y, aabbMin.z));
    corners[4] = transformCorner(m, vec3f(aabbMin.x, aabbMin.y, aabbMax.z));
    corners[5] = transformCorner(m, vec3f(aabbMax.x, aabbMin.y, aabbMax.z));
    corners[6] = transformCorner(m, vec3f(aabbMin.x, aabbMax.y, aabbMax.z));
    corners[7] = transformCorner(m, vec3f(aabbMax.x, aabbMax.y, aabbMax.z));

    for (var p = 0u; p < 6u; p++) {
        let plane = uniforms.planes[p];
        var allOutside = true;

        for (var c = 0u; c < 8u; c++) {
            let dist = dot(plane.xyz, corners[c]) + plane.w;
            if (dist >= 0.0) {
                allOutside = false;
                break;
            }
        }

        if (allOutside) {
            return false;
        }
    }
    return true;
}

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) globalId: vec3u) {
    let idx = globalId.x;
    let entityCount = arrayLength(&entityIds);

    if (idx >= entityCount) {
        return;
    }

    let eid = entityIds[idx];
    let transform = worldMatrices[eid];

    if (testFrustumOBB(transform, shapeAABB.minPoint, shapeAABB.maxPoint)) {
        let slot = atomicAdd(&indirectArgs.instanceCount, 1u);
        visibleEntityIds[slot] = eid;
    }
}
`;function Zc(e,t){const n=e;t[0]=n[3]+n[0],t[1]=n[7]+n[4],t[2]=n[11]+n[8],t[3]=n[15]+n[12],Et(t,0),t[4]=n[3]-n[0],t[5]=n[7]-n[4],t[6]=n[11]-n[8],t[7]=n[15]-n[12],Et(t,4),t[8]=n[3]+n[1],t[9]=n[7]+n[5],t[10]=n[11]+n[9],t[11]=n[15]+n[13],Et(t,8),t[12]=n[3]-n[1],t[13]=n[7]-n[5],t[14]=n[11]-n[9],t[15]=n[15]-n[13],Et(t,12),t[16]=n[3]+n[2],t[17]=n[7]+n[6],t[18]=n[11]+n[10],t[19]=n[15]+n[14],Et(t,16),t[20]=n[3]-n[2],t[21]=n[7]-n[6],t[22]=n[11]-n[10],t[23]=n[15]-n[14],Et(t,20)}function Et(e,t){const n=e[t],r=e[t+1],i=e[t+2],s=Math.sqrt(n*n+r*r+i*i);s>0&&(e[t]/=s,e[t+1]/=s,e[t+2]/=s,e[t+3]/=s)}function jc(e,t){const n=e.createBuffer({label:"shapeAABB",size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),r=new Float32Array([t.minX,t.minY,t.minZ,0,t.maxX,t.maxY,t.maxZ,0]);return e.queue.writeBuffer(n,0,r),n}async function Wc(e){const t=e.device,n=t.createBindGroupLayout({label:"cullBindGroupLayout",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),r=t.createPipelineLayout({label:"cullPipelineLayout",bindGroupLayouts:[n]}),i=t.createShaderModule({label:"cullShader",code:$c}),s=await t.createComputePipelineAsync({label:"cullPipeline",layout:r,compute:{module:i,entryPoint:"main"}}),u=t.createBuffer({label:"cullUniforms",size:160,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),m=new Float32Array(40),p=new Map;for(const[y,P]of Object.entries(Hc))p.set(Number(y),jc(t,P));return{pipeline:s,bindGroupLayout:n,uniformBuffer:u,uniformData:m,shapeAABBBuffers:p}}const $r=Ke.create(),Zr=Ke.create(),Un=Ke.create();function Qc(e,t){const n=de.data,r=e*16,i=n[r],s=n[r+1],u=n[r+2],m=n[r+4],p=n[r+5],y=n[r+6],P=n[r+8],T=n[r+9],B=n[r+10],C=n[r+12],O=n[r+13],F=n[r+14];t[0]=i,t[1]=m,t[2]=P,t[3]=0,t[4]=s,t[5]=p,t[6]=T,t[7]=0,t[8]=u,t[9]=y,t[10]=B,t[11]=0,t[12]=-(i*C+s*O+u*F),t[13]=-(m*C+p*O+y*F),t[14]=-(P*C+T*O+B*F),t[15]=1}function Kc(e,t,n){if(n.cullBindGroup&&!n.dirty)return;const r=e.culling;n.cullBindGroup=e.gpu.device.createBindGroup({layout:r.bindGroupLayout,entries:[{binding:0,resource:{buffer:r.uniformBuffer}},{binding:1,resource:{buffer:e.matricesBuffer}},{binding:2,resource:{buffer:n.entityIdBuffer}},{binding:3,resource:{buffer:n.visibleEntityIdBuffer}},{binding:4,resource:{buffer:n.indirectBuffer}},{binding:5,resource:{buffer:r.shapeAABBBuffers.get(t)}}]}),n.dirty=!1}const Jc={group:"draw",update(e){const n=yt.from(e)?.context;if(!n||!n.culling)return;let r=null;for(const p of e.query([pe,de]))if(pe.active[p]===1){r=p;break}if(r===null)return;const i=n.gpu.canvas.width/n.gpu.canvas.height,s=pe.fov[r]*Math.PI/180;Qc(r,$r),Ke.perspective(s,i,pe.near[r],pe.far[r],Zr),Ke.multiply(Zr,$r,Un);const u=n.culling;u.uniformData.set(Un,0),Zc(Un,u.uniformData.subarray(16)),n.gpu.device.queue.writeBuffer(u.uniformBuffer,0,u.uniformData.buffer,0,160);const m=n.gpu.device.createCommandEncoder();for(const[p,y]of n.shapes){if(y.count===0)continue;const P=n.geometries.get(p);if(!P)continue;eu(n.gpu.device,y,P.indexCount),Kc(n,p,y);const T=m.beginComputePass();T.setPipeline(u.pipeline),T.setBindGroup(0,y.cullBindGroup),T.dispatchWorkgroups(Math.ceil(y.count/qc)),T.end()}n.gpu.device.queue.submit([m.finish()])}};function eu(e,t,n){const r=new Uint32Array([n,0,0,0,0]);e.queue.writeBuffer(t.indirectBuffer,0,r)}const yt=Mn("render");function Cn(e,t){return{vertexBuffer:Wa(e,t.vertices),indexBuffer:Qa(e,t.indices),indexCount:t.indexCount}}function On(e){return{count:0,entityIds:new Uint32Array(ue),entityIdBuffer:e.createBuffer({label:"entityIds",size:ue*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),visibleEntityIdBuffer:e.createBuffer({label:"visibleEntityIds",size:ue*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),indirectBuffer:e.createBuffer({label:"indirectArgs",size:20,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.INDIRECT|GPUBufferUsage.COPY_DST}),bindGroup:null,cullBindGroup:null,dirty:!0}}function tu(e,t){const n=e.shapes.get(t);if(!n)throw new Error(`Unknown shape: ${t}`);return n}async function nu(e,t){const n=await Za(e,t),r=Vr(n.device,64,"viewProjection"),i=Vr(n.device,Rc,"lights"),s=n.device.createBuffer({label:"worldMatrices",size:ue*64,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),u=n.device.createBuffer({label:"meshData",size:ue*32,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),m=new Map;m.set(at.Box,Cn(n.device,Ja())),m.set(at.Sphere,Cn(n.device,ec(16,12))),m.set(at.Plane,Cn(n.device,tc()));const p=new Map;p.set(at.Box,On(n.device)),p.set(at.Sphere,On(n.device)),p.set(at.Plane,On(n.device));const[y,P,T]=await Promise.all([Yc(n,"rgba16float"),kc(n),Wc(n)]);return{gpu:n,pipeline:y,uniformBuffer:r,lightBuffer:i,matricesBuffer:s,meshDataBuffer:u,depthTexture:null,depthTextureView:null,depthTextureWidth:0,depthTextureHeight:0,geometries:m,shapes:p,postprocess:P,culling:T}}const ru=0,iu=1,ou=2,su=3,au=4;function cu(e){switch(e){case"color":return ru;case"depth":return iu;case"normal":return ou;case"material":return su;case"hit":return au}}const uu=16,lu=8,to=lu*4,no=8,fu=no*4,ro=8,io=ro*fu,oo=8,Jn=oo*4,du=16,so=du*4,hu=16,ao=hu*4,co=32,uo=16,gu=256,pu=8,jr=gu/pu;function yu(e){return Math.ceil(e/jr)*jr}function wu(e){const t=new ArrayBuffer(to),n=new Float32Array(t),r=new Uint32Array(t);return n[0]=e.position.x,n[1]=e.position.y,n[2]=e.position.z,n[3]=e.sizeX,n[4]=e.sizeZ,n[5]=e.scale,r[6]=e.resolution,r[7]=e.material,t}function mu(e){const t=new ArrayBuffer(io),n=new Float32Array(t),r=Math.min(e.length,ro);for(let i=0;i<r;i++){const s=e[i],u=i*no;n[u+0]=s.direction.x,n[u+1]=s.direction.y,n[u+2]=s.direction.z,n[u+3]=0,n[u+4]=s.color.r,n[u+5]=s.color.g,n[u+6]=s.color.b,n[u+7]=s.intensity}return t}function bu(e,t,n,r,i){const s=new ArrayBuffer(i*Jn),u=new Float32Array(s);for(let m=0;m<i;m++){const p=m*oo;u[p+0]=e.x[m],u[p+1]=e.y[m],u[p+2]=e.z[m],u[p+3]=n[m],u[p+4]=t.r[m],u[p+5]=t.g[m],u[p+6]=t.b[m],u[p+7]=r[m]}return s}function vu(e,t){const r=(t+1)*64;return e.data.buffer.slice(e.data.byteOffset,e.data.byteOffset+r)}function xu(e){const t=new ArrayBuffer(so),n=new Float32Array(t);return n[0]=e.sunDir.x,n[1]=e.sunDir.y,n[2]=e.sunDir.z,n[3]=e.sunPower,n[4]=e.zenith.r,n[5]=e.zenith.g,n[6]=e.zenith.b,n[7]=e.sunRadius,n[8]=e.horizon.r,n[9]=e.horizon.g,n[10]=e.horizon.b,n[11]=e.fogDensity,n[12]=e.fogColor.r,n[13]=e.fogColor.g,n[14]=e.fogColor.b,n[15]=e.fogHeight,t}function Mu(){const e=Math.sqrt(.99);return{sunDir:{x:.5/e,y:.7/e,z:.5/e},sunPower:8,zenith:{r:.2,g:.4,b:.8},sunRadius:.02,horizon:{r:.8,g:.6,b:.4},fogDensity:.005,fogColor:{r:.7,g:.7,b:.8},fogHeight:.1}}function Su(e){const t=new ArrayBuffer(ao),n=new Float32Array(t);return n[0]=e.position.x,n[1]=e.position.y,n[2]=e.position.z,n[3]=0,n[4]=e.right.x,n[5]=e.right.y,n[6]=e.right.z,n[7]=0,n[8]=e.up.x,n[9]=e.up.y,n[10]=e.up.z,n[11]=0,n[12]=e.forward.x,n[13]=e.forward.y,n[14]=e.forward.z,n[15]=e.fov,t}function Pu(e){const t=new ArrayBuffer(co),n=new Uint32Array(t),r=new Float32Array(t);return n[0]=e.width,n[1]=e.height,n[2]=e.reference?1:0,n[3]=e.debug?cu(e.debug):0,r[4]=e.near??.1,r[5]=e.far??100,n[6]=yu(e.width),r[7]=0,t}function Eu(e){const t=new ArrayBuffer(uo),n=new Uint32Array(t);return n[0]=e.entityIds.length,n[1]=e.lights.length,n[2]=0,n[3]=0,t}const er=8,Wr=er*4,lo=4,Au=32,Tu=2147483648;function Xt(){return{minX:1/0,minY:1/0,minZ:1/0,maxX:-1/0,maxY:-1/0,maxZ:-1/0}}function Bu(e,t){e.minX=Math.min(e.minX,t.x),e.minY=Math.min(e.minY,t.y),e.minZ=Math.min(e.minZ,t.z),e.maxX=Math.max(e.maxX,t.x),e.maxY=Math.max(e.maxY,t.y),e.maxZ=Math.max(e.maxZ,t.z)}function cn(e,t){return{minX:Math.min(e.minX,t.minX),minY:Math.min(e.minY,t.minY),minZ:Math.min(e.minZ,t.minZ),maxX:Math.max(e.maxX,t.maxX),maxY:Math.max(e.maxY,t.maxY),maxZ:Math.max(e.maxZ,t.maxZ)}}function Iu(e){return{x:(e.minX+e.maxX)*.5,y:(e.minY+e.maxY)*.5,z:(e.minZ+e.maxZ)*.5}}function yr(e){return{x:e.maxX-e.minX,y:e.maxY-e.minY,z:e.maxZ-e.minZ}}function Rn(e){const t=e.maxX-e.minX,n=e.maxY-e.minY,r=e.maxZ-e.minZ;return 2*(t*n+n*r+r*t)}const it=12,_u=1,Dn=1;function zu(e,t,n,r,i,s){const u=yr(r),m=s===0?u.x:s===1?u.y:u.z;if(m<1e-8)return null;const p=s===0?r.minX:s===1?r.minY:r.minZ,y=Array.from({length:it},()=>({count:0,aabb:Xt()}));for(let R=0;R<e.length;R++){const W=n[R],J=s===0?W.x:s===1?W.y:W.z;let ce=Math.floor((J-p)/m*it);ce=Math.max(0,Math.min(it-1,ce)),y[ce].count++,y[ce].aabb=cn(y[ce].aabb,t(e[R]))}const P=new Array(it-1),T=new Array(it-1);let B=Xt(),C=0;for(let R=0;R<it-1;R++)C+=y[R].count,y[R].count>0&&(B=cn(B,y[R].aabb)),P[R]={...B},T[R]=C;const O=new Array(it-1),F=new Array(it-1);B=Xt(),C=0;for(let R=it-1;R>0;R--)C+=y[R].count,y[R].count>0&&(B=cn(B,y[R].aabb)),O[R-1]={...B},F[R-1]=C;const V=Rn(i);let $=1/0,q=-1;for(let R=0;R<it-1;R++){if(T[R]===0||F[R]===0)continue;const W=Rn(P[R]),J=Rn(O[R]),ce=_u+W/V*T[R]*Dn+J/V*F[R]*Dn;ce<$&&($=ce,q=R)}return q<0||e.length*Dn<=$&&e.length<=lo?null:{splitIndex:q,cost:$}}function Qr(e){const t=yr(e);return t.x>=t.y&&t.x>=t.z?0:t.y>=t.z?1:2}function sn(e,t){return t===0?e.x:t===1?e.y:e.z}function tr(e,t,n){let r=Xt();for(const y of e)r=cn(r,t(y));if(e.length<=lo||n>=Au)return{aabb:r,leftChild:null,rightChild:null,indices:e.slice()};const i=e.map(y=>Iu(t(y)));let s=Xt();for(const y of i)Bu(s,y);let u=null;for(let y=0;y<3;y++){const P=zu(e,t,i,s,r,y);P!==null&&(u===null||P.cost<u.cost)&&(u={...P,axis:y})}let m,p;if(u!==null){const y=u.axis,P=y===0?s.minX:y===1?s.minY:s.minZ,T=yr(s),B=y===0?T.x:y===1?T.y:T.z,C=P+(u.splitIndex+1)/it*B;m=[],p=[];for(let O=0;O<e.length;O++){const F=i[O];(y===0?F.x:y===1?F.y:F.z)<C?m.push(e[O]):p.push(e[O])}if(m.length===0||p.length===0){const O=Qr(s),F=e.map(($,q)=>({eid:$,centroid:i[q]})).sort(($,q)=>sn($.centroid,O)-sn(q.centroid,O)),V=Math.floor(F.length/2);m=F.slice(0,V).map($=>$.eid),p=F.slice(V).map($=>$.eid)}}else{const y=Qr(s),P=e.map((B,C)=>({eid:B,centroid:i[C]})).sort((B,C)=>sn(B.centroid,y)-sn(C.centroid,y)),T=Math.floor(P.length/2);m=P.slice(0,T).map(B=>B.eid),p=P.slice(T).map(B=>B.eid)}return m.length===0||p.length===0?{aabb:r,leftChild:null,rightChild:null,indices:e.slice()}:{aabb:r,leftChild:tr(m,t,n+1),rightChild:tr(p,t,n+1),indices:[]}}function nr(e){return e.leftChild===null?1:1+nr(e.leftChild)+nr(e.rightChild)}function rr(e){return e.leftChild===null?e.indices.length:rr(e.leftChild)+rr(e.rightChild)}function Nu(e){if(e===null)return{nodes:new Float32Array(0),primitiveIndices:new Uint32Array(0),nodeCount:0};const t=nr(e),n=rr(e),r=new Float32Array(t*er),i=new Uint32Array(r.buffer),s=new Uint32Array(n);let u=0,m=0;function p(y){const P=u++,T=P*er;if(r[T+0]=y.aabb.minX,r[T+1]=y.aabb.minY,r[T+2]=y.aabb.minZ,r[T+4]=y.aabb.maxX,r[T+5]=y.aabb.maxY,r[T+6]=y.aabb.maxZ,y.leftChild===null){const B=m;for(const C of y.indices)s[m++]=C;i[T+3]=B,i[T+7]=Tu|y.indices.length}else{const B=p(y.leftChild),C=p(y.rightChild);i[T+3]=B,i[T+7]=C}return P}return p(e),{nodes:r,primitiveIndices:s,nodeCount:t}}function Uu(e,t){if(e.length===0)return{nodes:new Float32Array(0),primitiveIndices:new Uint32Array(0),nodeCount:0};const n=tr(e,t,0);return Nu(n)}function At(e){const t=new Float32Array(1);return t[0]=e,new Uint32Array(t.buffer)[0]}function Cu(e,t){let n=e.length*2654435761;for(const r of e){const i=t(r);n^=At(i.minX)*31,n^=At(i.minY)*37,n^=At(i.minZ)*41,n^=At(i.maxX)*43,n^=At(i.maxY)*47,n^=At(i.maxZ)*53,n^=r*59,n=(n<<5)-n}return n>>>0}const fo=`
struct Config {
    width: u32,
    height: u32,
    referenceMode: u32,
    debugMode: u32,
    near: f32,
    far: f32,
    paddedWidth: u32,
    _pad1: f32,
}

struct Camera {
    position: vec3f,
    _pad0: f32,
    right: vec3f,
    _pad1: f32,
    up: vec3f,
    _pad2: f32,
    forward: vec3f,
    fov: f32,
}

struct DirectionalLight {
    direction: vec3f,
    _pad0: f32,
    color: vec3f,
    intensity: f32,
}

struct Atmosphere {
    sunDir: vec3f,
    sunPower: f32,
    zenith: vec3f,
    sunRadius: f32,
    horizon: vec3f,
    fogDensity: f32,
    fogColor: vec3f,
    fogHeight: f32,
}

struct Terrain {
    position: vec3f,
    sizeX: f32,
    sizeZ: f32,
    heightScale: f32,
    resolution: u32,
    materialId: u32,
}

struct Ray {
    origin: vec3f,
    tMin: f32,
    direction: vec3f,
    tMax: f32,
}

struct Hit {
    t: f32,
    normal: vec3f,
    position: vec3f,
    entity: u32,
    didHit: u32,
}

struct SceneCounts {
    entityCount: u32,
    lightCount: u32,
    _pad0: u32,
    _pad1: u32,
}

struct BVHNode {
    aabbMin: vec3f,
    leftOrPrimStart: u32,
    aabbMax: vec3f,
    rightOrPrimCount: u32,
}

struct BVHConfig {
    nodeCount: u32,
    useBVH: u32,
    _pad0: u32,
    _pad1: u32,
}

struct EntityData {
    size: vec4f,              // x, y, z, roughness
    albedoAndMetallic: vec4f, // r, g, b, metallic
}

const MaxLights: u32 = 8u;

struct LightArray {
    lights: array<DirectionalLight, 8>,
}

const BVHLeafFlag: u32 = 0x80000000u;
const MaxBVHStack: u32 = 32u;

const ShapeBox: u32 = 0u;
const ShapeSphere: u32 = 1u;
const ShapePlane: u32 = 2u;

@group(0) @binding(0) var<uniform> config: Config;
@group(0) @binding(1) var<uniform> camera: Camera;
@group(0) @binding(2) var<uniform> counts: SceneCounts;
@group(0) @binding(3) var<storage, read> transforms: array<mat4x4f>;
@group(0) @binding(4) var<storage, read> entityIds: array<u32>;
@group(0) @binding(5) var<storage, read> shapes: array<u32>;
// Binding 6 is defined in entry-point-specific code (output)
@group(0) @binding(7) var<uniform> lightArray: LightArray;
@group(0) @binding(8) var<uniform> atmosphere: Atmosphere;
@group(0) @binding(9) var<uniform> terrain: Terrain;
@group(0) @binding(10) var<storage, read> terrainHeights: array<f32>;
@group(0) @binding(11) var<storage, read> bvhNodes: array<BVHNode>;
@group(0) @binding(12) var<storage, read> primitiveIndices: array<u32>;
@group(0) @binding(13) var<uniform> bvhConfig: BVHConfig;
@group(0) @binding(14) var<storage, read> entityData: array<EntityData>;

fn getSize(eid: u32) -> vec3f {
    return entityData[eid].size.xyz;
}

fn getAlbedo(eid: u32) -> vec3f {
    return entityData[eid].albedoAndMetallic.rgb;
}

fn getRoughness(eid: u32) -> f32 {
    return entityData[eid].size.w;
}

fn getMetallic(eid: u32) -> f32 {
    return entityData[eid].albedoAndMetallic.w;
}

fn generateRay(pixelX: u32, pixelY: u32) -> Ray {
    let aspect = f32(config.width) / f32(config.height);
    let tanHalfFov = tan(camera.fov * 0.5);

    let u = (f32(pixelX) + 0.5) / f32(config.width) * 2.0 - 1.0;
    let v = 1.0 - (f32(pixelY) + 0.5) / f32(config.height) * 2.0;

    var dir = camera.forward
        + u * aspect * tanHalfFov * camera.right
        + v * tanHalfFov * camera.up;
    dir = normalize(dir);

    var ray: Ray;
    ray.origin = camera.position;
    ray.tMin = 0.001;
    ray.direction = dir;
    ray.tMax = 1e30;
    return ray;
}

fn intersectSphereTransform(ray: Ray, transform: mat4x4f, eid: u32) -> f32 {
    let center = transform[3].xyz;
    let radius = getSize(eid).x * 0.5;

    let oc = ray.origin - center;
    let a = dot(ray.direction, ray.direction);
    let halfB = dot(oc, ray.direction);
    let c = dot(oc, oc) - radius * radius;

    let discriminant = halfB * halfB - a * c;
    if (discriminant < 0.0) {
        return 1e31;
    }

    let sqrtD = sqrt(discriminant);
    var t = (-halfB - sqrtD) / a;
    if (t < ray.tMin || t > ray.tMax) {
        t = (-halfB + sqrtD) / a;
        if (t < ray.tMin || t > ray.tMax) {
            return 1e31;
        }
    }
    return t;
}

fn getSphereNormal(hitPos: vec3f, transform: mat4x4f) -> vec3f {
    let center = transform[3].xyz;
    return normalize(hitPos - center);
}

fn intersectPlaneTransform(ray: Ray, transform: mat4x4f) -> f32 {
    let normal = normalize(transform[1].xyz);
    let point = transform[3].xyz;
    let distance = dot(normal, point);

    let denom = dot(ray.direction, normal);
    if (abs(denom) < 1e-8) {
        return 1e31;
    }

    let originDot = dot(ray.origin, normal);
    let t = (distance - originDot) / denom;

    if (t < ray.tMin || t > ray.tMax) {
        return 1e31;
    }
    return t;
}

fn getPlaneNormal(transform: mat4x4f) -> vec3f {
    return normalize(transform[1].xyz);
}

fn getTerrainHeight(worldX: f32, worldZ: f32) -> f32 {
    let localX = (worldX - terrain.position.x) / terrain.sizeX + 0.5;
    let localZ = (worldZ - terrain.position.z) / terrain.sizeZ + 0.5;

    if (localX < 0.0 || localX > 1.0 || localZ < 0.0 || localZ > 1.0) {
        return -1e30;
    }

    let res = f32(terrain.resolution);
    let gridX = localX * (res - 1.0);
    let gridZ = localZ * (res - 1.0);

    let ix = u32(floor(gridX));
    let iz = u32(floor(gridZ));
    let fx = gridX - floor(gridX);
    let fz = gridZ - floor(gridZ);

    let ix1 = min(ix + 1u, terrain.resolution - 1u);
    let iz1 = min(iz + 1u, terrain.resolution - 1u);

    let h00 = terrainHeights[iz * terrain.resolution + ix];
    let h10 = terrainHeights[iz * terrain.resolution + ix1];
    let h01 = terrainHeights[iz1 * terrain.resolution + ix];
    let h11 = terrainHeights[iz1 * terrain.resolution + ix1];

    let h0 = h00 + (h10 - h00) * fx;
    let h1 = h01 + (h11 - h01) * fx;

    return terrain.position.y + (h0 + (h1 - h0) * fz) * terrain.heightScale;
}

fn getTerrainNormal(worldX: f32, worldZ: f32) -> vec3f {
    let eps = terrain.sizeX / f32(terrain.resolution);

    let hL = getTerrainHeight(worldX - eps, worldZ);
    let hR = getTerrainHeight(worldX + eps, worldZ);
    let hD = getTerrainHeight(worldX, worldZ - eps);
    let hU = getTerrainHeight(worldX, worldZ + eps);

    let nx = hL - hR;
    let ny = 2.0 * eps / terrain.heightScale;
    let nz = hD - hU;

    return normalize(vec3f(nx, ny, nz));
}

fn intersectAABB(ray: Ray, aabbMin: vec3f, aabbMax: vec3f, invDir: vec3f, tMax: f32) -> bool {
    let t1 = (aabbMin - ray.origin) * invDir;
    let t2 = (aabbMax - ray.origin) * invDir;

    let tmin = max(max(min(t1.x, t2.x), min(t1.y, t2.y)), min(t1.z, t2.z));
    let tmax = min(min(max(t1.x, t2.x), max(t1.y, t2.y)), max(t1.z, t2.z));

    return tmax >= max(tmin, ray.tMin) && tmin < tMax;
}

fn intersectAABBDist(ray: Ray, aabbMin: vec3f, aabbMax: vec3f, invDir: vec3f) -> f32 {
    let t1 = (aabbMin - ray.origin) * invDir;
    let t2 = (aabbMax - ray.origin) * invDir;

    let tmin = max(max(min(t1.x, t2.x), min(t1.y, t2.y)), min(t1.z, t2.z));
    let tmax = min(min(max(t1.x, t2.x), max(t1.y, t2.y)), max(t1.z, t2.z));

    if (tmax < max(tmin, ray.tMin)) {
        return 1e31;
    }
    return max(tmin, ray.tMin);
}

fn traceRayBVH(ray: Ray) -> Hit {
    var hit: Hit;
    hit.t = 1e31;
    hit.didHit = 0u;

    if (bvhConfig.nodeCount == 0u) {
        return hit;
    }

    let invDir = 1.0 / ray.direction;

    var stack: array<u32, 32>;
    var stackPtr = 0u;
    stack[0] = 0u;
    stackPtr = 1u;

    while (stackPtr > 0u) {
        stackPtr = stackPtr - 1u;
        let nodeIdx = stack[stackPtr];

        let node = bvhNodes[nodeIdx];

        if (!intersectAABB(ray, node.aabbMin, node.aabbMax, invDir, hit.t)) {
            continue;
        }

        let isLeaf = (node.rightOrPrimCount & BVHLeafFlag) != 0u;

        if (isLeaf) {
            let primStart = node.leftOrPrimStart;
            let primCount = node.rightOrPrimCount & 0x7FFFFFFFu;

            for (var i = 0u; i < primCount; i++) {
                let eid = primitiveIndices[primStart + i];
                let transform = transforms[eid];
                let shape = shapes[eid];

                if (shape == ShapeSphere) {
                    let t = intersectSphereTransform(ray, transform, eid);
                    if (t < hit.t) {
                        hit.t = t;
                        hit.position = ray.origin + t * ray.direction;
                        hit.normal = getSphereNormal(hit.position, transform);
                        hit.entity = eid;
                        hit.didHit = 1u;
                    }
                }
            }
        } else {
            let leftIdx = node.leftOrPrimStart;
            let rightIdx = node.rightOrPrimCount;

            let leftNode = bvhNodes[leftIdx];
            let rightNode = bvhNodes[rightIdx];

            let leftDist = intersectAABBDist(ray, leftNode.aabbMin, leftNode.aabbMax, invDir);
            let rightDist = intersectAABBDist(ray, rightNode.aabbMin, rightNode.aabbMax, invDir);

            if (leftDist < rightDist) {
                if (rightDist < hit.t && stackPtr < MaxBVHStack) {
                    stack[stackPtr] = rightIdx;
                    stackPtr = stackPtr + 1u;
                }
                if (leftDist < hit.t && stackPtr < MaxBVHStack) {
                    stack[stackPtr] = leftIdx;
                    stackPtr = stackPtr + 1u;
                }
            } else {
                if (leftDist < hit.t && stackPtr < MaxBVHStack) {
                    stack[stackPtr] = leftIdx;
                    stackPtr = stackPtr + 1u;
                }
                if (rightDist < hit.t && stackPtr < MaxBVHStack) {
                    stack[stackPtr] = rightIdx;
                    stackPtr = stackPtr + 1u;
                }
            }
        }
    }

    return hit;
}

fn intersectTerrain(ray: Ray) -> Hit {
    var hit: Hit;
    hit.t = 1e31;
    hit.didHit = 0u;

    if (terrain.resolution == 0u) {
        return hit;
    }

    let halfX = terrain.sizeX * 0.5;
    let halfZ = terrain.sizeZ * 0.5;
    let minX = terrain.position.x - halfX;
    let maxX = terrain.position.x + halfX;
    let minZ = terrain.position.z - halfZ;
    let maxZ = terrain.position.z + halfZ;
    let minY = terrain.position.y;
    let maxY = terrain.position.y + terrain.heightScale;

    var tMin = ray.tMin;
    var tMax = ray.tMax;

    if (abs(ray.direction.x) > 1e-8) {
        let t1 = (minX - ray.origin.x) / ray.direction.x;
        let t2 = (maxX - ray.origin.x) / ray.direction.x;
        tMin = max(tMin, min(t1, t2));
        tMax = min(tMax, max(t1, t2));
    } else if (ray.origin.x < minX || ray.origin.x > maxX) {
        return hit;
    }

    if (abs(ray.direction.z) > 1e-8) {
        let t1 = (minZ - ray.origin.z) / ray.direction.z;
        let t2 = (maxZ - ray.origin.z) / ray.direction.z;
        tMin = max(tMin, min(t1, t2));
        tMax = min(tMax, max(t1, t2));
    } else if (ray.origin.z < minZ || ray.origin.z > maxZ) {
        return hit;
    }

    if (abs(ray.direction.y) > 1e-8) {
        let t1 = (minY - ray.origin.y) / ray.direction.y;
        let t2 = (maxY - ray.origin.y) / ray.direction.y;
        tMin = max(tMin, min(t1, t2));
        tMax = min(tMax, max(t1, t2));
    } else if (ray.origin.y < minY || ray.origin.y > maxY) {
        return hit;
    }

    if (tMin > tMax) {
        return hit;
    }

    let cellSize = terrain.sizeX / f32(terrain.resolution);
    let aabbSpan = tMax - tMin;
    let stepSize = min(cellSize * 0.5, aabbSpan / 16.0);
    let maxSteps = 1024;

    var t = max(tMin, ray.tMin);
    var lastAbove = true;
    var prevT = t;

    for (var i = 0; i < maxSteps; i++) {
        if (t > tMax) {
            break;
        }

        let x = ray.origin.x + t * ray.direction.x;
        let y = ray.origin.y + t * ray.direction.y;
        let z = ray.origin.z + t * ray.direction.z;

        let terrainY = getTerrainHeight(x, z);
        if (terrainY < -1e20) {
            prevT = t;
            t += stepSize;
            lastAbove = true;
            continue;
        }

        let above = y > terrainY;

        if (lastAbove && !above) {
            var lo = prevT;
            var hi = t;

            for (var j = 0; j < 8; j++) {
                let mid = (lo + hi) * 0.5;
                let mx = ray.origin.x + mid * ray.direction.x;
                let my = ray.origin.y + mid * ray.direction.y;
                let mz = ray.origin.z + mid * ray.direction.z;
                let mTerrain = getTerrainHeight(mx, mz);

                if (my > mTerrain) {
                    lo = mid;
                } else {
                    hi = mid;
                }
            }

            if (hi >= ray.tMin && hi <= ray.tMax) {
                hit.t = hi;
                hit.position = ray.origin + hi * ray.direction;
                hit.normal = getTerrainNormal(hit.position.x, hit.position.z);
                hit.entity = terrain.materialId;
                hit.didHit = 1u;
                return hit;
            }
        }

        lastAbove = above;
        prevT = t;
        t += stepSize;
    }

    if (lastAbove) {
        let x = ray.origin.x + tMax * ray.direction.x;
        let y = ray.origin.y + tMax * ray.direction.y;
        let z = ray.origin.z + tMax * ray.direction.z;
        let terrainY = getTerrainHeight(x, z);

        if (terrainY > -1e20 && y <= terrainY) {
            var lo = prevT;
            var hi = tMax;

            for (var j = 0; j < 8; j++) {
                let mid = (lo + hi) * 0.5;
                let mx = ray.origin.x + mid * ray.direction.x;
                let my = ray.origin.y + mid * ray.direction.y;
                let mz = ray.origin.z + mid * ray.direction.z;
                let mTerrain = getTerrainHeight(mx, mz);

                if (my > mTerrain) {
                    lo = mid;
                } else {
                    hi = mid;
                }
            }

            if (hi >= ray.tMin && hi <= ray.tMax) {
                hit.t = hi;
                hit.position = ray.origin + hi * ray.direction;
                hit.normal = getTerrainNormal(hit.position.x, hit.position.z);
                hit.entity = terrain.materialId;
                hit.didHit = 1u;
                return hit;
            }
        }
    }

    return hit;
}

fn traceRay(ray: Ray) -> Hit {
    var hit: Hit;
    hit.t = 1e31;
    hit.didHit = 0u;

    if (bvhConfig.useBVH == 1u && bvhConfig.nodeCount > 0u) {
        hit = traceRayBVH(ray);
    }

    // Linear scan for all entities (brute force or planes)
    for (var i = 0u; i < counts.entityCount; i++) {
        let eid = entityIds[i];
        let transform = transforms[eid];
        let shape = shapes[eid];

        if (shape == ShapeSphere) {
            // Skip if using BVH (already tested)
            if (bvhConfig.useBVH == 1u && bvhConfig.nodeCount > 0u) {
                continue;
            }
            let t = intersectSphereTransform(ray, transform, eid);
            if (t < hit.t) {
                hit.t = t;
                hit.position = ray.origin + t * ray.direction;
                hit.normal = getSphereNormal(hit.position, transform);
                hit.entity = eid;
                hit.didHit = 1u;
            }
        } else if (shape == ShapePlane) {
            let t = intersectPlaneTransform(ray, transform);
            if (t < hit.t) {
                hit.t = t;
                hit.position = ray.origin + t * ray.direction;
                hit.normal = getPlaneNormal(transform);
                hit.entity = eid;
                hit.didHit = 1u;
            }
        }
    }

    let terrainHit = intersectTerrain(ray);
    if (terrainHit.didHit == 1u && terrainHit.t < hit.t) {
        hit = terrainHit;
    }

    return hit;
}

const ShadowBias: f32 = 0.001;
const Ambient: f32 = 0.1;

fn getSkyColor(rayDir: vec3f) -> vec3f {
    let t = clamp(rayDir.y * 0.5 + 0.5, 0.0, 1.0);
    let sky = mix(atmosphere.horizon, atmosphere.zenith, t);

    let sunDot = dot(rayDir, atmosphere.sunDir);
    let inner = cos(atmosphere.sunRadius);
    let outer = cos(atmosphere.sunRadius * 2.0);
    let sun = vec3f(1.0, 0.95, 0.8) * smoothstep(outer, inner, sunDot) * atmosphere.sunPower;

    return sky + sun;
}

fn applyFog(color: vec3f, dist: f32, rayDir: vec3f, hitY: f32) -> vec3f {
    let base = 1.0 - exp(-dist * atmosphere.fogDensity);
    let height = exp(-max(hitY, 0.0) * atmosphere.fogHeight);
    let amount = clamp(base * height, 0.0, 1.0);
    let fog = mix(atmosphere.fogColor, getSkyColor(rayDir), 0.3);
    return mix(color, fog, amount);
}

fn isInShadow(origin: vec3f, dir: vec3f, maxT: f32) -> bool {
    var ray: Ray;
    ray.origin = origin;
    ray.direction = dir;
    ray.tMin = ShadowBias;
    ray.tMax = maxT;

    let hit = traceRay(ray);
    return hit.didHit == 1u;
}

fn reflectDir(incident: vec3f, normal: vec3f) -> vec3f {
    return incident - 2.0 * dot(normal, incident) * normal;
}

fn fresnelSchlick(cosTheta: f32, F0: f32) -> f32 {
    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
}

fn computeDirectLighting(hit: Hit) -> vec3f {
    let albedo = getAlbedo(hit.entity);
    var totalLight = Ambient;
    var lightColor = vec3f(1.0, 1.0, 1.0);

    for (var i = 0u; i < min(counts.lightCount, MaxLights); i++) {
        let light = lightArray.lights[i];
        let nDotL = dot(hit.normal, light.direction);

        if (nDotL > 0.0) {
            let shadowOrigin = hit.position + hit.normal * ShadowBias;

            if (!isInShadow(shadowOrigin, light.direction, 1e30)) {
                totalLight += nDotL * light.intensity;
                lightColor = light.color;
            }
        }
    }

    return albedo * totalLight * lightColor;
}

fn shadeColor(hit: Hit, ray: Ray) -> vec3f {
    if (hit.didHit == 0u) {
        return getSkyColor(ray.direction);
    }

    let albedo = getAlbedo(hit.entity);
    let metal = getMetallic(hit.entity);

    var litColor: vec3f;
    if (counts.lightCount == 0u) {
        litColor = albedo;
    } else {
        litColor = computeDirectLighting(hit);
    }

    if (metal > 0.01) {
        let viewDir = -ray.direction;
        let cosTheta = max(0.0, dot(viewDir, hit.normal));

        var F0: f32;
        if (metal > 0.5) {
            F0 = albedo.r;
        } else {
            F0 = 0.04;
        }
        let fresnel = fresnelSchlick(cosTheta, F0);
        let reflectAmount = fresnel * metal;

        let reflectDirection = reflectDir(ray.direction, hit.normal);
        let bias = 0.001;
        var reflectRay: Ray;
        reflectRay.origin = hit.position + hit.normal * bias;
        reflectRay.direction = reflectDirection;
        reflectRay.tMin = 0.001;
        reflectRay.tMax = 1e30;

        let reflectHit = traceRay(reflectRay);
        var reflectColor: vec3f;

        if (reflectHit.didHit == 1u) {
            let reflectAlbedo = getAlbedo(reflectHit.entity);
            if (counts.lightCount == 0u) {
                reflectColor = reflectAlbedo;
            } else {
                reflectColor = computeDirectLighting(reflectHit);
            }
            reflectColor = applyFog(reflectColor, reflectHit.t, reflectDirection, reflectHit.position.y);
        } else {
            reflectColor = getSkyColor(reflectDirection);
        }

        let diffuseWeight = 1.0 - reflectAmount;
        litColor = litColor * diffuseWeight + reflectColor * reflectAmount;
    }

    return applyFog(litColor, hit.t, ray.direction, hit.position.y);
}

fn shadeDepth(hit: Hit) -> vec3f {
    if (hit.didHit == 0u) {
        return vec3f(0.0, 0.0, 0.0);
    }
    let normalized = clamp((hit.t - config.near) / (config.far - config.near), 0.0, 1.0);
    let inverted = 1.0 - normalized;
    return vec3f(inverted, inverted, inverted);
}

fn shadeNormal(hit: Hit) -> vec3f {
    if (hit.didHit == 0u) {
        return vec3f(0.0, 0.0, 0.0);
    }
    return (hit.normal + 1.0) * 0.5;
}

fn hslToRgb(h: f32, s: f32, l: f32) -> vec3f {
    let c = (1.0 - abs(2.0 * l - 1.0)) * s;
    let hue6 = h * 6.0;
    let hue6mod2 = hue6 - floor(hue6 * 0.5) * 2.0;
    let x = c * (1.0 - abs(hue6mod2 - 1.0));
    let m = l - c * 0.5;
    var rgb: vec3f;
    if (hue6 < 1.0) {
        rgb = vec3f(c, x, 0.0);
    } else if (hue6 < 2.0) {
        rgb = vec3f(x, c, 0.0);
    } else if (hue6 < 3.0) {
        rgb = vec3f(0.0, c, x);
    } else if (hue6 < 4.0) {
        rgb = vec3f(0.0, x, c);
    } else if (hue6 < 5.0) {
        rgb = vec3f(x, 0.0, c);
    } else {
        rgb = vec3f(c, 0.0, x);
    }
    return rgb + m;
}

fn shadeMaterial(hit: Hit) -> vec3f {
    if (hit.didHit == 0u) {
        return vec3f(0.0, 0.0, 0.0);
    }
    let hue = fract(f32(hit.entity) * 137.5 / 360.0);
    return hslToRgb(hue, 0.7, 0.5);
}

fn shadeHit(hit: Hit) -> vec3f {
    if (hit.didHit == 0u) {
        return vec3f(0.0, 0.0, 0.0);
    }
    return vec3f(1.0, 1.0, 1.0);
}

fn shade(hit: Hit, ray: Ray) -> vec3f {
    switch (config.debugMode) {
        case 0u: { return shadeColor(hit, ray); }
        case 1u: { return shadeDepth(hit); }
        case 2u: { return shadeNormal(hit); }
        case 3u: { return shadeMaterial(hit); }
        case 4u: { return shadeHit(hit); }
        default: { return shadeColor(hit, ray); }
    }
}
`,Ou=`
@group(0) @binding(6) var<storage, read_write> output: array<u32>;

fn packRGBA8(color: vec3f) -> u32 {
    let r = u32(clamp(color.x * 255.0 + 0.5, 0.0, 255.0));
    let g = u32(clamp(color.y * 255.0 + 0.5, 0.0, 255.0));
    let b = u32(clamp(color.z * 255.0 + 0.5, 0.0, 255.0));
    let a = 255u;
    return r | (g << 8u) | (b << 16u) | (a << 24u);
}

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) gid: vec3u) {
    let pixelIndex = gid.x;
    let pixelCount = config.width * config.height;
    if (pixelIndex >= pixelCount) {
        return;
    }

    let pixelX = pixelIndex % config.width;
    let pixelY = pixelIndex / config.width;

    let ray = generateRay(pixelX, pixelY);
    let hit = traceRay(ray);
    let color = shade(hit, ray);

    let outputIndex = pixelY * config.paddedWidth + pixelX;
    output[outputIndex] = packRGBA8(color);
}
`,Ru=`
@group(0) @binding(6) var outputTexture: texture_storage_2d<rgba16float, write>;

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid: vec3u) {
    let pixelX = gid.x;
    let pixelY = gid.y;

    if (pixelX >= config.width || pixelY >= config.height) {
        return;
    }

    let ray = generateRay(pixelX, pixelY);
    let hit = traceRay(ray);
    let color = shade(hit, ray);

    textureStore(outputTexture, vec2i(i32(pixelX), i32(pixelY)), vec4f(color, 1.0));
}
`,Du=fo+Ou,Gu=fo+Ru;function Fu(e){const t=e.createBindGroupLayout({label:"rtBindGroupLayout",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:6,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:7,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:8,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:9,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:10,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:11,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:12,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:13,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:14,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}}]}),n=e.createPipelineLayout({label:"rtPipelineLayout",bindGroupLayouts:[t]}),r=e.createShaderModule({label:"rtShader",code:Du}),i=e.createComputePipeline({label:"rtPipeline",layout:n,compute:{module:r,entryPoint:"main"}});return{device:e,pipeline:i,bindGroupLayout:t,buffers:null,bvhCache:null}}function Lu(){return{resources:new Map,nodes:[],sorted:[],nextResourceId:0,nextNodeId:0}}function Gn(e,t,n,r,i,s){const u=e.nextResourceId++,m=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC|GPUTextureUsage.COPY_DST;return e.resources.set(u,{id:u,name:t,desc:{type:"texture",format:n,width:r,height:i,usage:s??m},handle:null,view:null}),u}function Tt(e,t){const n=e.nextNodeId++;return e.nodes.push({...t,id:n}),n}function Yu(e){const t=e.nodes.filter(p=>p.enabled);if(t.length===0)return[];const n=new Map;for(const p of t)for(const y of p.outputs)n.set(y.id,p.id);const r=new Map,i=new Map;for(const p of t)r.set(p.id,[]),i.set(p.id,0);for(const p of t)for(const y of p.inputs){const P=n.get(y.id);P!==void 0&&P!==p.id&&(r.get(P).push(p.id),i.set(p.id,(i.get(p.id)??0)+1))}const s=[];for(const p of t)(i.get(p.id)??0)===0&&s.push(p.id);const u=[],m=new Map(t.map(p=>[p.id,p]));for(;s.length>0;){const p=s.shift();u.push(m.get(p));for(const y of r.get(p)??[]){const P=(i.get(y)??1)-1;i.set(y,P),P===0&&s.push(y)}}if(u.length!==t.length)throw new Error("Render graph has a cycle");return u}function Xu(e,t){for(const n of e.resources.values())if(!n.handle)if(n.desc.type==="texture"){const r=t.createTexture({label:n.name,size:{width:n.desc.width,height:n.desc.height},format:n.desc.format,usage:n.desc.usage});n.handle=r,n.view=r.createView()}else n.handle=t.createBuffer({label:n.name,size:n.desc.size,usage:n.desc.usage})}function ku(e){for(const t of e.resources.values())t.handle&&(t.handle.destroy(),t.handle=null,t.view=null)}function Vu(e,t,n,r,i,s,u){Xu(e,t);const m={device:t,queue:n,canvasWidth:r,canvasHeight:i,canvasFormat:s,canvasView:u,getTexture(y){const P=e.resources.get(y);if(!P||P.desc.type!=="texture"||!P.handle)throw new Error(`Texture resource ${y} not found`);return P.handle},getTextureView(y){const P=e.resources.get(y);if(!P||P.desc.type!=="texture"||!P.view)throw new Error(`Texture view for resource ${y} not found`);return P.view},getBuffer(y){const P=e.resources.get(y);if(!P||P.desc.type!=="buffer"||!P.handle)throw new Error(`Buffer resource ${y} not found`);return P.handle}},p=t.createCommandEncoder();for(const y of e.sorted)y.execute(m,p);n.submit([p.finish()])}function qu(e){return{r:(e>>16&255)/255,g:(e>>8&255)/255,b:(e&255)/255,a:1}}function Hu(e,t){t.bindGroup&&!t.dirty||(t.bindGroup=e.gpu.device.createBindGroup({layout:e.pipeline.bindGroupLayout,entries:[{binding:0,resource:{buffer:e.uniformBuffer}},{binding:1,resource:{buffer:e.lightBuffer}},{binding:2,resource:{buffer:e.matricesBuffer}},{binding:3,resource:{buffer:t.visibleEntityIdBuffer}},{binding:4,resource:{buffer:e.meshDataBuffer}}]}))}function $u(e){const{renderContext:t,cameraData:n,sceneColorId:r,sceneDepthId:i}=e;return{id:0,name:"raster",enabled:!0,inputs:[],outputs:[{id:r,access:"write"},{id:i,access:"write"}],execute(s,u){s.queue.writeBuffer(t.uniformBuffer,0,n.viewProjMatrix.buffer);for(const[,P]of t.shapes)P.count!==0&&Hu(t,P);const m=s.getTextureView(r),p=s.getTextureView(i),y=Ka(u,{colorView:m,clearColor:qu(n.clearColor),depthView:p,clearDepth:1});y.setPipeline(t.pipeline.pipeline);for(const[P,T]of t.shapes){if(T.count===0)continue;const B=t.geometries.get(P);B&&(y.setBindGroup(0,T.bindGroup),y.setVertexBuffer(0,B.vertexBuffer),y.setIndexBuffer(B.indexBuffer,"uint16"),y.drawIndexedIndirect(T.indirectBuffer,0))}y.end()}}}const Zu=8,ju=8,Wu=1;function Qu(e){return t=>{const n=t*16,r=e.transforms.data[n+12],i=e.transforms.data[n+13],s=e.transforms.data[n+14],u=e.sizes.x[t]*.5;return{minX:r-u,minY:i-u,minZ:s-u,maxX:r+u,maxY:i+u,maxZ:s+u}}}function wr(e){let t=0;for(const n of e)n>t&&(t=n);return t}function Ku(e,t,n,r){const i=Math.max(1,r.entityIds.length),s=wr(r.entityIds),u=Math.max(1,s+1);return{config:e.createBuffer({label:"rtConfig",size:co,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),camera:e.createBuffer({label:"rtCamera",size:ao,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),counts:e.createBuffer({label:"rtCounts",size:uo,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),transforms:e.createBuffer({label:"rtTransforms",size:Math.max(64,u*64),usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),entityIds:e.createBuffer({label:"rtEntityIds",size:Math.max(4,i*4),usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),shapes:e.createBuffer({label:"rtShapes",size:Math.max(4,u*4),usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),lights:e.createBuffer({label:"rtLights",size:io,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),atmosphere:e.createBuffer({label:"rtAtmosphere",size:so,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),terrain:e.createBuffer({label:"rtTerrain",size:to,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),terrainHeights:e.createBuffer({label:"rtTerrainHeights",size:r.terrain&&r.heights?r.heights.length*4:4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),bvhNodes:e.createBuffer({label:"rtBVHNodes",size:Math.max(Wr,i*2*Wr),usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),bvhPrimIndices:e.createBuffer({label:"rtBVHPrimIndices",size:Math.max(4,i*4),usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),bvhConfig:e.createBuffer({label:"rtBVHConfig",size:uu,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),entityData:e.createBuffer({label:"rtEntityData",size:Math.max(Jn,u*Jn),usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),width:t,height:n,maxEntityId:s}}function Ju(e,t,n,r,i){const s=n.buffers,u=r.entityIds.length,m=wr(r.entityIds),p=m+1;if(t.writeBuffer(s.config,0,Pu(i)),t.writeBuffer(s.camera,0,Su(r.camera)),t.writeBuffer(s.counts,0,Eu(r)),u>0){t.writeBuffer(s.transforms,0,vu(r.transforms,m)),t.writeBuffer(s.entityIds,0,new Uint32Array(r.entityIds)),t.writeBuffer(s.shapes,0,new Uint32Array(r.shapes.subarray(0,p)));const F=bu(r.sizes,r.albedo,r.roughness,r.metallic,p);t.writeBuffer(s.entityData,0,F)}t.writeBuffer(s.lights,0,mu(r.lights)),t.writeBuffer(s.atmosphere,0,xu(r.atmosphere)),r.terrain&&r.heights?(t.writeBuffer(s.terrain,0,wu(r.terrain)),t.writeBuffer(s.terrainHeights,0,r.heights)):(t.writeBuffer(s.terrain,0,new Uint32Array(8)),t.writeBuffer(s.terrainHeights,0,new Float32Array(1)));const y=r.entityIds.filter(F=>r.shapes[F]===Wu),P=i.useBVH!==!1&&y.length>0,T=Qu(r);let B=n.bvhCache?.bvh??null,C=!1;if(P){const F=Cu(y,T);n.bvhCache&&n.bvhCache.hash===F?(C=!0,B=n.bvhCache.bvh):(B=Uu(y,T),n.bvhCache={hash:F,bvh:B},B.nodeCount>0&&(t.writeBuffer(s.bvhNodes,0,B.nodes),t.writeBuffer(s.bvhPrimIndices,0,B.primitiveIndices)))}!C&&(!B||B.nodeCount===0)&&(t.writeBuffer(s.bvhNodes,0,new Float32Array(8)),t.writeBuffer(s.bvhPrimIndices,0,new Uint32Array(1)));const O=new Uint32Array([B?B.nodeCount:0,P?1:0,0,0]);t.writeBuffer(s.bvhConfig,0,O)}function ho(e){e.config.destroy(),e.camera.destroy(),e.counts.destroy(),e.transforms.destroy(),e.entityIds.destroy(),e.shapes.destroy(),e.lights.destroy(),e.atmosphere.destroy(),e.terrain.destroy(),e.terrainHeights.destroy(),e.bvhNodes.destroy(),e.bvhPrimIndices.destroy(),e.bvhConfig.destroy(),e.entityData.destroy()}function el(e,t,n){return e.width!==t.width||e.height!==t.height||wr(n.entityIds)>e.maxEntityId}function tl(e){const{harness:t,scene:n,config:r,outputId:i}=e,s=t;let u=null,m=null;return{id:0,name:"raycast",enabled:!0,inputs:[],outputs:[{id:i,access:"write"}],execute(p,y){const{width:P,height:T}=r;if(!s.raycastPipeline){const q=p.device.createBindGroupLayout({label:"raycastBindGroupLayout",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:6,visibility:GPUShaderStage.COMPUTE,storageTexture:{access:"write-only",format:"rgba16float"}},{binding:7,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:8,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:9,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:10,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:11,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:12,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:13,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:14,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}}]}),se=p.device.createPipelineLayout({label:"raycastPipelineLayout",bindGroupLayouts:[q]}),R=p.device.createShaderModule({label:"raycastShader",code:Gu}),W=p.device.createComputePipeline({label:"raycastPipeline",layout:se,compute:{module:R,entryPoint:"main"}});s.raycastPipeline=W,s.raycastBindGroupLayout=q}const B=s.raycastPipeline,C=s.raycastBindGroupLayout;let O=t.buffers;(!O||el(O,r,n))&&(O&&ho(O),O=Ku(p.device,P,T,n),t.buffers=O,t.bvhCache=null,u=null),Ju(p.device,p.queue,t,n,r);const V=p.getTexture(i).createView();(!u||m!==V)&&(u=p.device.createBindGroup({layout:C,entries:[{binding:0,resource:{buffer:O.config}},{binding:1,resource:{buffer:O.camera}},{binding:2,resource:{buffer:O.counts}},{binding:3,resource:{buffer:O.transforms}},{binding:4,resource:{buffer:O.entityIds}},{binding:5,resource:{buffer:O.shapes}},{binding:6,resource:V},{binding:7,resource:{buffer:O.lights}},{binding:8,resource:{buffer:O.atmosphere}},{binding:9,resource:{buffer:O.terrain}},{binding:10,resource:{buffer:O.terrainHeights}},{binding:11,resource:{buffer:O.bvhNodes}},{binding:12,resource:{buffer:O.bvhPrimIndices}},{binding:13,resource:{buffer:O.bvhConfig}},{binding:14,resource:{buffer:O.entityData}}]}),m=V);const $=y.beginComputePass();$.setPipeline(B),$.setBindGroup(0,u),$.dispatchWorkgroups(Math.ceil(P/Zu),Math.ceil(T/ju)),$.end()}}}const mr=Mn("lines"),st=new Float32Array(24);function nl(e,t,n,r,i){const s=mr.from(e);s&&(s.lineCount===0&&s.arrowCount===0||(st.set(r,0),st[16]=t.gpu.canvas.width,st[17]=t.gpu.canvas.height,st[18]=0,st[19]=0,st[20]=i[0],st[21]=i[1],st[22]=i[2],st[23]=0,t.gpu.device.queue.writeBuffer(s.lineUniformBuffer,0,st),s.lineCount>0&&(s.lineBindGroup||(s.lineBindGroup=t.gpu.device.createBindGroup({layout:s.lineBindGroupLayout,entries:[{binding:0,resource:{buffer:s.lineUniformBuffer}},{binding:1,resource:{buffer:s.lineBuffer}}]})),n.setPipeline(s.linePipeline),n.setBindGroup(0,s.lineBindGroup),n.draw(s.lineCount*6)),s.arrowCount>0&&(s.arrowBindGroup||(s.arrowBindGroup=t.gpu.device.createBindGroup({layout:s.lineBindGroupLayout,entries:[{binding:0,resource:{buffer:s.lineUniformBuffer}},{binding:1,resource:{buffer:s.arrowBuffer}}]})),n.setPipeline(s.arrowPipeline),n.setBindGroup(0,s.arrowBindGroup),n.draw(s.arrowCount*3))))}const br=Mn("text"),Bt=new Float32Array(20);function rl(e,t,n,r){const i=br.from(e);i&&i.glyphCount!==0&&(Bt.set(r,0),Bt[16]=.1,Bt[17]=0,Bt[18]=0,Bt[19]=0,t.gpu.device.queue.writeBuffer(i.textUniformBuffer,0,Bt),i.textBindGroup||(i.textBindGroup=t.gpu.device.createBindGroup({layout:i.textBindGroupLayout,entries:[{binding:0,resource:{buffer:i.textUniformBuffer}},{binding:1,resource:{buffer:i.glyphBuffer}},{binding:2,resource:i.atlas.textureView},{binding:3,resource:i.atlasSampler}]})),n.setPipeline(i.textPipeline),n.setBindGroup(0,i.textBindGroup),n.draw(i.glyphCount*6))}function il(e){const{state:t,renderContext:n,cameraData:r,inputColorId:i,outputColorId:s}=e;return{id:0,name:"overlay",enabled:!0,inputs:[{id:i,access:"read"}],outputs:[{id:s,access:"write"}],execute(u,m){const p=u.getTextureView(s),y=m.beginRenderPass({colorAttachments:[{view:p,loadOp:"load",storeOp:"store"}]});mr.from(t)&&nl(t,n,y,r.viewProjMatrix,r.cameraPosition);const T=br.from(t);T&&T.glyphCount>0&&rl(t,n,y,r.viewProjMatrix),y.end()}}}const ol=1,sl=2,al=4;function cl(e){const{pipeline:t,config:n,inputId:r,outputId:i}=e;return{id:0,name:"postprocess",enabled:!0,inputs:[{id:r,access:"read"}],outputs:[{id:i,access:"write"}],execute(s,u){const m=n.tonemap||n.fxaa||n.vignette;let p=0;n.tonemap&&(p|=ol),n.fxaa&&(p|=sl),n.vignette&&(p|=al);const y=new ArrayBuffer(32),P=new Float32Array(y),T=new Uint32Array(y);P[0]=n.exposure,P[1]=n.vignetteStrength,P[2]=n.vignetteInner,P[3]=n.vignetteOuter,P[4]=1/s.canvasWidth,P[5]=1/s.canvasHeight,T[6]=p,T[7]=0,s.queue.writeBuffer(t.uniforms,0,y);const B=s.getTextureView(r),C=s.getTextureView(i);if(m){const O=s.device.createBindGroup({layout:t.layout,entries:[{binding:0,resource:B},{binding:1,resource:t.sampler},{binding:2,resource:{buffer:t.uniforms}}]}),F=u.beginRenderPass({colorAttachments:[{view:C,loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:1}}]});F.setPipeline(t.pipeline),F.setBindGroup(0,O),F.draw(3),F.end()}else{const O=s.device.createBindGroup({layout:t.blitLayout,entries:[{binding:0,resource:B},{binding:1,resource:t.sampler}]}),F=u.beginRenderPass({colorAttachments:[{view:C,loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:1}}]});F.setPipeline(t.blitPipeline),F.setBindGroup(0,O),F.draw(3),F.end()}}}}function Kr(e){const{pipeline:t,inputId:n}=e;return{id:0,name:"blit",enabled:!0,inputs:[{id:n,access:"read"}],outputs:[],execute(r,i){const s=r.getTextureView(n),u=r.device.createBindGroup({layout:t.blitLayout,entries:[{binding:0,resource:s},{binding:1,resource:t.sampler}]}),m=i.beginRenderPass({colorAttachments:[{view:r.canvasView,loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:1}}]});m.setPipeline(t.blitPipeline),m.setBindGroup(0,u),m.draw(3),m.end()}}}const Fn=Ke.create(),Ln=Ke.create(),Jr=Ke.create();function ul(e,t){const n=de.data,r=e*16,i=n[r],s=n[r+1],u=n[r+2],m=n[r+4],p=n[r+5],y=n[r+6],P=n[r+8],T=n[r+9],B=n[r+10],C=n[r+12],O=n[r+13],F=n[r+14];t[0]=i,t[1]=m,t[2]=P,t[3]=0,t[4]=s,t[5]=p,t[6]=T,t[7]=0,t[8]=u,t[9]=y,t[10]=B,t[11]=0,t[12]=-(i*C+s*O+u*F),t[13]=-(m*C+p*O+y*F),t[14]=-(P*C+T*O+B*F),t[15]=1}function ll(e,t,n){const r=t/n,i=pe.fov[e]*Math.PI/180;ul(e,Fn),Ke.perspective(i,r,pe.near[e],pe.far[e],Ln),Ke.multiply(Ln,Fn,Jr);const s=e*16,u=new Float32Array([de.data[s+12],de.data[s+13],de.data[s+14]]);return{viewMatrix:new Float32Array(Fn),projMatrix:new Float32Array(Ln),viewProjMatrix:new Float32Array(Jr),cameraPosition:u,canvasWidth:t,canvasHeight:n,clearColor:pe.clearColor[e]}}const qt={Raster:0,Raytracing:1};function fl(e){for(const t of e.query([pe,de]))if(pe.active[t]===1)return t;return null}function dl(e,t){const n=e.hasComponent(t,wn),r=e.hasComponent(t,eo),i=e.hasComponent(t,It);return{tonemap:n,exposure:n?wn.exposure[t]:1,fxaa:r,vignette:i,vignetteStrength:i?It.strength[t]:.5,vignetteInner:i?It.inner[t]:.4,vignetteOuter:i?It.outer[t]:.8}}function hl(e){const{state:t,renderContext:n,renderMode:r=qt.Raster}=e,i=fl(t);if(i===null)return null;const s=n.gpu.canvas.width,u=n.gpu.canvas.height,m=dl(t,i),p=ll(i,s,u),y={width:s,height:u,renderMode:r,effects:m,cameraData:p,renderContext:n};if(r===qt.Raytracing){if(!e.rtHarness||!e.rtScene||!e.rtConfig)return null;y.raytracing={harness:e.rtHarness,scene:e.rtScene,config:e.rtConfig}}return y}function gl(e,t){const{width:n,height:r,renderMode:i,effects:s,cameraData:u,renderContext:m}=e,p=mr.from(t)!==void 0||br.from(t)!==void 0,y=Lu(),P="rgba16float",T=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC|GPUTextureUsage.COPY_DST|GPUTextureUsage.STORAGE_BINDING,B=Gn(y,"sceneColor",P,n,r,T),C=Gn(y,"sceneDepth","depth24plus",n,r,GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING);if(i===qt.Raytracing&&e.raytracing?Tt(y,tl({harness:e.raytracing.harness,scene:e.raytracing.scene,config:e.raytracing.config,outputId:B})):Tt(y,$u({renderContext:m,cameraData:u,sceneColorId:B,sceneDepthId:C})),p&&Tt(y,il({state:t,renderContext:m,cameraData:u,inputColorId:B,outputColorId:B})),s.tonemap||s.fxaa||s.vignette){const F=Gn(y,"postProcessed",m.gpu.format,n,r);Tt(y,cl({gpu:m.gpu,pipeline:m.postprocess,config:s,inputId:B,outputId:F})),Tt(y,Kr({pipeline:m.postprocess,inputId:F}))}else Tt(y,Kr({pipeline:m.postprocess,inputId:B}));return y.sorted=Yu(y),y}function ei(e){const t=hl(e);return t?gl(t,e.state):null}const ut={albedoR:new Float32Array(ue),albedoG:new Float32Array(ue),albedoB:new Float32Array(ue),roughness:new Float32Array(ue),metallic:new Float32Array(ue)};Ue(ut,{defaults:()=>({albedoR:.8,albedoG:.8,albedoB:.8,roughness:.5,metallic:0})});const xe={sunDirX:[],sunDirY:[],sunDirZ:[],sunPower:[],zenithR:[],zenithG:[],zenithB:[],horizonR:[],horizonG:[],horizonB:[],sunRadius:[],fogDensity:[],fogColorR:[],fogColorG:[],fogColorB:[],fogHeight:[]};Ue(xe,{defaults:()=>({sunDirX:.5,sunDirY:.7,sunDirZ:.5,sunPower:8,zenithR:.2,zenithG:.4,zenithB:.8,horizonR:.8,horizonG:.6,horizonB:.4,sunRadius:.02,fogDensity:.005,fogColorR:.5,fogColorG:.6,fogColorB:.7,fogHeight:.1})});const vt={sizeX:[],sizeZ:[],heightScale:[],resolution:[]};Ue(vt,{defaults:()=>({sizeX:10,sizeZ:10,heightScale:2,resolution:16})});const pl=new Map;function yl(e){return pl.get(e)}function go(e,t,n){const r=Math.sqrt(e*e+t*t+n*n);return r===0?{x:0,y:1,z:0}:{x:e/r,y:t/r,z:n/r}}function wl(e){const t=de.data,n=e*16;return{position:{x:t[n+12],y:t[n+13],z:t[n+14]},right:{x:t[n],y:t[n+1],z:t[n+2]},up:{x:t[n+4],y:t[n+5],z:t[n+6]},forward:{x:-t[n+8],y:-t[n+9],z:-t[n+10]},fov:pe.fov[e]*Math.PI/180}}function ml(e){const t=[];for(const n of e.query([fe,de,ut]))fe.visible[n]===1&&t.push(n);return t}function bl(e){const t=[];for(const n of e.query([qe])){const r=go(qe.directionX[n],qe.directionY[n],qe.directionZ[n]),i=qe.color[n];t.push({direction:r,color:{r:(i>>16&255)/255,g:(i>>8&255)/255,b:(i&255)/255},intensity:qe.intensity[n]})}return t}function vl(e){for(const t of e.query([xe]))return{sunDir:go(xe.sunDirX[t],xe.sunDirY[t],xe.sunDirZ[t]),sunPower:xe.sunPower[t],zenith:{r:xe.zenithR[t],g:xe.zenithG[t],b:xe.zenithB[t]},horizon:{r:xe.horizonR[t],g:xe.horizonG[t],b:xe.horizonB[t]},sunRadius:xe.sunRadius[t],fogDensity:xe.fogDensity[t],fogColor:{r:xe.fogColorR[t],g:xe.fogColorG[t],b:xe.fogColorB[t]},fogHeight:xe.fogHeight[t]};return Mu()}function xl(e){for(const t of e.query([vt,de,ut])){const n=yl(t);if(!n)continue;const r=t*16;return{terrain:{position:{x:de.data[r+12],y:de.data[r+13],z:de.data[r+14]},sizeX:vt.sizeX[t],sizeZ:vt.sizeZ[t],scale:vt.heightScale[t],resolution:vt.resolution[t],material:t},heights:n}}return{}}function Ml(e,t){const n=wl(t),r=ml(e),{terrain:i,heights:s}=xl(e),u=bl(e),m=vl(e);return{camera:n,entityIds:r,transforms:de,shapes:fe.shape,sizes:{x:fe.sizeX,y:fe.sizeY,z:fe.sizeZ},albedo:{r:ut.albedoR,g:ut.albedoG,b:ut.albedoB},roughness:ut.roughness,metallic:ut.metallic,terrain:i,heights:s,lights:u,atmosphere:m}}const Sl=["color","depth","normal","material","hit"];function Pl(e,t,n,r){const i=Sl[pe.debugMode[t]];return{width:n,height:r,reference:!1,debug:i,near:pe.near[t],far:pe.far[t]}}function El(e){for(const t of e.query([pe,de]))if(pe.active[t]===1)return t;return null}const Al={group:"draw",last:!0,update(e){const n=yt.from(e)?.context;if(!n)return;const r=El(e);if(r===null)return;const i=n.gpu.canvas.width,s=n.gpu.canvas.height,u=pe.renderMode[r]??Kn.Raster;let m;if(u===Kn.Raytracing){n.rtHarness||(n.rtHarness=Fu(n.gpu.device));const p=Ml(e,r),y=Pl(e,r,i,s);m=ei({state:e,renderContext:n,rtHarness:n.rtHarness,rtScene:p,rtConfig:y,renderMode:qt.Raytracing})}else m=ei({state:e,renderContext:n,renderMode:qt.Raster});m&&(Vu(m,n.gpu.device,n.gpu.device.queue,i,s,n.gpu.format,n.gpu.context.getCurrentTexture().createView()),ku(m))},dispose(e){const t=yt.from(e),n=t?.context;if(n){n.rtHarness?.buffers&&(ho(n.rtHarness.buffers),n.rtHarness.buffers=null,n.rtHarness.bvhCache=null),n.uniformBuffer.destroy(),n.lightBuffer.destroy(),n.depthTexture?.destroy();for(const[,r]of n.geometries)r.vertexBuffer.destroy(),r.indexBuffer.destroy();n.geometries.clear();for(const[,r]of n.shapes)r.entityIdBuffer.destroy(),r.visibleEntityIdBuffer.destroy(),r.indirectBuffer.destroy();n.shapes.clear(),n.matricesBuffer.destroy(),n.culling.uniformBuffer.destroy();for(const r of n.culling.shapeAABBBuffers.values())r.destroy();n.culling.shapeAABBBuffers.clear(),n.postprocess.uniforms.destroy(),n.postprocess.sceneTarget?.texture.destroy(),t&&(t.context=null)}}},po={systems:[Fc,Oc,Jc,Al],components:{Mesh:fe,Camera:pe,Material:ut,Atmosphere:xe,Terrain:vt,AmbientLight:Yt,DirectionalLight:qe,Tonemap:wn,FXAA:eo,Vignette:It},async initialize(e){if(!e.canvas)throw new Error("RenderPlugin requires a canvas. Use State.new().withCanvas(canvas)");const t=await nu(e.canvas,e.gpu??void 0);e.setResource(yt,{canvas:e.canvas,context:t})}},ir=Mn("input"),Ht=new Set,En=new Set,An=new Set,Me={deltaX:0,deltaY:0,scrollDelta:0,left:!1,right:!1,middle:!1},Tl={mouse:Me,isKeyDown:e=>Ht.has(e),isKeyPressed:e=>En.has(e),isKeyReleased:e=>An.has(e)};let Ve=null;function ti(e){Ht.has(e.code)||En.add(e.code),Ht.add(e.code)}function ni(e){Ht.delete(e.code),An.add(e.code)}function ri(e){e.target===Ve&&(e.button===0&&(Me.left=!0),e.button===1&&(Me.middle=!0),e.button===2&&(Me.right=!0))}function ii(e){e.button===0&&(Me.left=!1),e.button===1&&(Me.middle=!1),e.button===2&&(Me.right=!1)}function oi(e){Me.deltaX+=e.movementX,Me.deltaY+=e.movementY}function si(e){e.target===Ve&&(Me.scrollDelta+=e.deltaY,e.preventDefault())}function ai(e){e.target===Ve&&e.preventDefault()}function Bl(){En.clear(),An.clear(),Me.deltaX=0,Me.deltaY=0,Me.scrollDelta=0}function Il(){Ht.clear(),En.clear(),An.clear(),Me.deltaX=0,Me.deltaY=0,Me.scrollDelta=0,Me.left=!1,Me.right=!1,Me.middle=!1}const _l={group:"simulation",setup(e){const t=yt.from(e);t?.canvas&&(Ve=t.canvas,window.addEventListener("keydown",ti),window.addEventListener("keyup",ni),Ve.addEventListener("mousedown",ri),window.addEventListener("mouseup",ii),Ve.addEventListener("mousemove",oi),Ve.addEventListener("wheel",si,{passive:!1}),Ve.addEventListener("contextmenu",ai),e.setResource(ir,Tl))},dispose(e){Ve&&(window.removeEventListener("keydown",ti),window.removeEventListener("keyup",ni),Ve.removeEventListener("mousedown",ri),window.removeEventListener("mouseup",ii),Ve.removeEventListener("mousemove",oi),Ve.removeEventListener("wheel",si),Ve.removeEventListener("contextmenu",ai),Ve=null),Il(),e.deleteResource(ir)}},zl={group:"draw",last:!0,update(){Bl()}},yo={systems:[_l,zl],dependencies:[po],initialize(e){if(!yt.from(e)?.canvas)throw new Error("InputPlugin requires RenderPlugin to be initialized first")}},wo=e=>e,Nl=e=>e*e,Ul=e=>e*(2-e),Cl=e=>e<.5?2*e*e:-1+(4-2*e)*e,Ol=e=>e*e*e,Rl=e=>--e*e*e+1,Dl=e=>e<.5?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1,Gl=e=>e*e*e*e,Fl=e=>1- --e*e*e*e,Ll=e=>e<.5?8*e*e*e*e:1-8*--e*e*e*e,Yl=e=>e*e*e*e*e,Xl=e=>1+--e*e*e*e*e,kl=e=>e<.5?16*e*e*e*e*e:1+16*--e*e*e*e*e,Vl=e=>1-Math.cos(e*Math.PI/2),ql=e=>Math.sin(e*Math.PI/2),Hl=e=>-(Math.cos(Math.PI*e)-1)/2,$l=e=>e===0?0:Math.pow(2,10*e-10),Zl=e=>e===1?1:1-Math.pow(2,-10*e),jl=e=>e===0?0:e===1?1:e<.5?Math.pow(2,20*e-10)/2:(2-Math.pow(2,-20*e+10))/2,Wl=e=>1-Math.sqrt(1-e*e),Ql=e=>Math.sqrt(1- --e*e),Kl=e=>e<.5?(1-Math.sqrt(1-4*e*e))/2:(Math.sqrt(1-(-2*e+2)*(-2*e+2))+1)/2,Jl=e=>(1.70158+1)*e*e*e-1.70158*e*e,ef=e=>1+(1.70158+1)*Math.pow(e-1,3)+1.70158*Math.pow(e-1,2),tf=e=>{const t=2.5949095;return e<.5?Math.pow(2*e,2)*((t+1)*2*e-t)/2:(Math.pow(2*e-2,2)*((t+1)*(e*2-2)+t)+2)/2},nf=e=>e===0?0:e===1?1:-Math.pow(2,10*e-10)*Math.sin((e*10-10.75)*(2*Math.PI/3)),rf=e=>e===0?0:e===1?1:Math.pow(2,-10*e)*Math.sin((e*10-.75)*(2*Math.PI/3))+1,of=e=>e===0?0:e===1?1:e<.5?-(Math.pow(2,20*e-10)*Math.sin((20*e-11.125)*(2*Math.PI/4.5)))/2:Math.pow(2,-20*e+10)*Math.sin((20*e-11.125)*(2*Math.PI/4.5))/2+1,mn=e=>e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375,sf=e=>1-mn(1-e),af=e=>e<.5?(1-mn(1-2*e))/2:(1+mn(2*e-1))/2,cf=[wo,Nl,Ul,Cl,Ol,Rl,Dl,Gl,Fl,Ll,Yl,Xl,kl,Vl,ql,Hl,$l,Zl,jl,Wl,Ql,Kl,Jl,ef,tf,nf,rf,of,sf,mn,af],uf={linear:0,"ease-in-quad":1,"ease-out-quad":2,"ease-in-out-quad":3,"ease-in-cubic":4,"ease-out-cubic":5,"ease-in-out-cubic":6,"ease-in-quart":7,"ease-out-quart":8,"ease-in-out-quart":9,"ease-in-quint":10,"ease-out-quint":11,"ease-in-out-quint":12,"ease-in-sine":13,"ease-out-sine":14,"ease-in-out-sine":15,"ease-in-expo":16,"ease-out-expo":17,"ease-in-out-expo":18,"ease-in-circ":19,"ease-out-circ":20,"ease-in-out-circ":21,"ease-in-back":22,"ease-out-back":23,"ease-in-out-back":24,"ease-in-elastic":25,"ease-out-elastic":26,"ease-in-out-elastic":27,"ease-in-bounce":28,"ease-out-bounce":29,"ease-in-out-bounce":30};function lf(e){return uf[e]??0}function ff(e){return cf[e]??wo}const mo={duration:[]};Ue(mo,{defaults:()=>({duration:.5})});const $t={IDLE:0,PLAYING:1,COMPLETE:2},ot={state:[],elapsed:[]};Ue(ot,{defaults:()=>({state:$t.IDLE,elapsed:0})});function df(e,t){for(const n of e.query([ot])){if(ot.state[n]!==$t.PLAYING)continue;const r=ot.elapsed[n]??0,i=r+t;ot.elapsed[n]=i;for(const s of e.query([He(ht.relation,n),K])){if(K.state[s]!==ft.IDLE)continue;const u=K.delay[s]??0,m=i>=u,p=r>=u;m&&(xf(e,s),K.state[s]=ft.PLAYING,K.elapsed[s]=p?0:i-u-t)}}}function hf(e,t){const n=[];for(const r of e.query([He(ht.relation,t),K])){if(K.state[r]===ft.COMPLETE&&K.elapsed[r]>=K.duration[r])continue;const i=K.delay[r]??0,s=K.duration[r]??0;n.push({eid:r,endTime:i+s})}n.sort((r,i)=>r.endTime-i.endTime);for(const{eid:r}of n)K.state[r]=ft.COMPLETE,bo(e,r)}function gf(e){for(const t of e.query([ot]))ot.state[t]===$t.COMPLETE&&hf(e,t)}function pf(e){for(const t of e.query([ot])){if(ot.state[t]!==$t.PLAYING)continue;let n=!0,r=!1;for(const i of e.query([He(ht.relation,t),K]))if(r=!0,K.state[i]!==ft.COMPLETE){n=!1;break}r&&n&&(ot.state[t]=$t.COMPLETE)}}function yf(e,t){df(e,t)}function wf(e){if(e._value){const t={};for(const n of e._value.split(";")){const r=n.indexOf(":");if(r===-1)continue;const i=n.slice(0,r).trim(),s=n.slice(r+1).trim();i&&s&&(t[i]=s)}return t}return e}const ft={IDLE:0,PLAYING:1,COMPLETE:2},K={state:[],from:[],to:[],duration:[],elapsed:[],delay:[],easingIndex:[]};Ue(K,{defaults:()=>({state:ft.IDLE,from:0,to:0,duration:1,elapsed:0,delay:0,easingIndex:0}),adapter:(e,t,n)=>{const r=wf(e),i={};return r.duration&&(i.duration=parseFloat(r.duration)),r.delay&&(i.delay=parseFloat(r.delay)),r.easing&&(i.easingIndex=lf(r.easing)),r.target&&bf(t,n,r,n.currentEid),i}});const Wt=_i("tween-target",{exclusive:!0});function mf(e){if(!e.startsWith("@"))return null;const t=e.slice(1),n=t.indexOf(".");if(n===-1)return null;const r=t.slice(0,n),i=t.slice(n+1),s=i.lastIndexOf(".");return s===-1?null:{entity:r,component:i.slice(0,s),field:i.slice(s+1)}}let or=[];function bf(e,t,n,r){or.push({tweenEid:r,target:n.target,to:n.to})}function vf(e,t){for(const n of or){const r=mf(n.target);if(!r)continue;const i=t.getEntityByName(r.entity);i===null||!e.bindFieldAccessor(n.tweenEid,r.component,r.field)||(e.addRelation(n.tweenEid,Wt,i),K.to[n.tweenEid]=parseFloat(n.to))}or=[]}function xf(e,t){const n=e.getRelationTargets(t,Wt),r=n.length>0?n[0]:-1,i=e.getFieldAccessor(t);i&&r>=0&&(K.from[t]=i.get(r)??0)}function bo(e,t){const n=K.elapsed[t],r=K.duration[t];if(n>=r)return;const i=e.getRelationTargets(t,Wt),s=i.length>0?i[0]:-1,u=e.getFieldAccessor(t);u&&s>=0&&(K.from[t]=u.get(s)??0,u.set(s,K.to[t])),K.elapsed[t]=r}function Mf(e,t){for(const n of e.query([K])){const r=K.state[n];if(r===ft.COMPLETE){bo(e,n);continue}if(r!==ft.PLAYING)continue;const i=e.getRelationTargets(n,Wt),s=i.length>0?i[0]:-1,u=e.getFieldAccessor(n);K.elapsed[n]===0&&u&&s>=0&&(K.from[n]=u.get(s)??0),K.elapsed[n]+=t;const m=K.elapsed[n],p=K.duration[n],y=Math.min(m/p,1),T=ff(K.easingIndex[n])(y),B=K.from[n],C=K.to[n],O=B+(C-B)*T;u&&s>=0&&u.set(s,O),y>=1&&(K.state[n]=ft.COMPLETE)}}const Sf={group:"simulation",update(e){const t=e.time.deltaTime;gf(e),yf(e,t),Mf(e,t),pf(e)}},Df={systems:[Sf],components:{Tween:K,Sequence:ot,Pause:mo},relations:[Wt],initialize(){Fi(vf)}},Pf={bg:"#1a1a1a",track:"#333",bar:"#E8A86B"},Ef={bg:"#f5f5f5",track:"#ddd",bar:"#B87654"},Af=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
  <defs>
    <radialGradient id="baseGradient" cx="35%" cy="30%" r="70%" fx="25%" fy="20%">
      <stop offset="0%" stop-color="#F5D4B8"/>
      <stop offset="45%" stop-color="#E8A86B"/>
      <stop offset="100%" stop-color="#B87654"/>
    </radialGradient>
  </defs>
  <g transform="rotate(35 40.0 40.0)">
    <path d="M40.0,2 C44.0,10 66.0,28 66.0,46 C66.0,60 48.0,70 40.0,78 C32.0,70 14.0,60 14.0,46 C14.0,28 36.0,10 40.0,2 Z" fill="url(#baseGradient)"/>
    <path d="M40.0,6 C37.0,14 22.0,28 20.0,44 C20.0,52 28.0,62 36.0,70 C34.0,58 26.0,46 26.0,38 C26.0,26 38.0,12 40.0,6 Z" fill="#B87654" opacity="0.45"/>
    <path d="M40.0,6 C43.0,14 58.0,28 60.0,44 C60.0,52 52.0,62 44.0,70 C46.0,58 54.0,46 54.0,38 C54.0,26 42.0,12 40.0,6 Z" fill="#B87654" opacity="0.35"/>
    <path d="M40.0,8 C40.0,20 40.0,50 40.0,72" stroke="#B87654" stroke-width="1" stroke-opacity="0.4" fill="none" stroke-linecap="round"/>
    <path d="M40.0,78 C48.0,70 66.0,60 66.0,46 C61.0,58 44.0,70 40.0,73 Z" fill="#B87654"/>
    <path d="M40.0,2 C36.0,10 14.0,28 14.0,46 C19.0,30 41.0,8 40.0,7 Z" fill="#F5D4B8" opacity="0.7"/>
    <path d="M40.0,2 C44.0,10 66.0,28 66.0,46 C66.0,60 48.0,70 40.0,78 C32.0,70 14.0,60 14.0,46 C14.0,28 36.0,10 40.0,2 Z" fill="none" stroke="#6B4230" stroke-width="2"/>
  </g>
</svg>`;function vo(e,t){const n=document.createElement("div");n.style.cssText=`
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: ${t};
        z-index: 1000;
    `;const r=e.parentElement;return r&&(getComputedStyle(r).position==="static"&&(r.style.position="relative"),r.appendChild(n)),n}function xo(e){const t=document.createElement("div");t.style.cssText=`
        width: 200px;
        height: 4px;
        background: ${e.track};
        border-radius: 2px;
        overflow: hidden;
    `;const n=document.createElement("div");return n.style.cssText=`
        width: 0%;
        height: 100%;
        background: ${e.bar};
        transition: width 0.15s ease-out;
    `,t.appendChild(n),{track:t,bar:n}}function Tf(e,t){let n=null,r=null;return{show(){n=vo(e,t.bg);const i=document.createElement("div");i.innerHTML=Af,i.style.cssText="width: 64px; height: 64px; margin-bottom: 24px;",n.appendChild(i);const s=xo(t);return r=s.bar,n.appendChild(s.track),()=>{n?.remove(),n=null,r=null}},update(i){r&&(r.style.width=`${i*100}%`)}}}function Bf(e,t){let n=null,r=null;return{show(){n=vo(e,t.bg);const i=xo(t);return r=i.bar,n.appendChild(i.track),()=>{n?.remove(),n=null,r=null}},update(i){r&&(r.style.width=`${i*100}%`)}}}const If=e=>Tf(e,Pf),Gf=e=>Bf(e,Ef),_f=[Tc,po,yo];Ot.defaultPlugins=_f;Ot.loading=If;const un=Math.PI*2,oe={target:[],yaw:[],pitch:[],distance:[],targetYaw:[],targetPitch:[],targetDistance:[],minPitch:[],maxPitch:[],minDistance:[],maxDistance:[],smoothness:[],sensitivity:[],zoomSpeed:[]};Ue(oe,{defaults:()=>({target:0,yaw:0,pitch:Math.PI/6,distance:8,targetYaw:0,targetPitch:Math.PI/6,targetDistance:10,minPitch:-Math.PI/2+.01,maxPitch:Math.PI/2-.01,minDistance:1,maxDistance:25,smoothness:.3,sensitivity:.005,zoomSpeed:.025})});function ci(e,t,n){return Math.max(t,Math.min(n,e))}function zf(e,t){return 1-Math.pow(1-e,t*60)}function Nf(e){return(e%un+un)%un}function Uf(e,t){const n=Nf(t-e);return n>Math.PI?n-un:n}const Cf={group:"simulation",update(e){const t=ir.from(e),n=e.time.deltaTime;for(const r of e.query([oe,j])){const i=oe.sensitivity[r],s=oe.zoomSpeed[r],u=oe.minPitch[r],m=oe.maxPitch[r],p=oe.minDistance[r],y=oe.maxDistance[r],P=oe.smoothness[r];if(t?.mouse.right&&(oe.targetYaw[r]-=t.mouse.deltaX*i,oe.targetPitch[r]=ci(oe.targetPitch[r]+t.mouse.deltaY*i,u,m)),t&&t.mouse.scrollDelta!==0){const ce=oe.targetDistance[r],ye=Math.max(.3,ce*.08),we=t.mouse.scrollDelta*s*ye;oe.targetDistance[r]=ci(ce+we,p,y)}const T=zf(P,n);oe.yaw[r]+=Uf(oe.yaw[r],oe.targetYaw[r])*T,oe.pitch[r]+=(oe.targetPitch[r]-oe.pitch[r])*T,oe.distance[r]+=(oe.targetDistance[r]-oe.distance[r])*T;const B=oe.yaw[r],C=oe.pitch[r],O=oe.distance[r];let F=0,V=0,$=0;const q=oe.target[r];q&&e.hasComponent(q,j)&&(F=j.posX[q],V=j.posY[q],$=j.posZ[q]);const se=F+O*Math.cos(C)*Math.sin(B),R=V+O*Math.sin(C),W=$+O*Math.cos(C)*Math.cos(B);j.posX[r]=se,j.posY[r]=R,j.posZ[r]=W;const J=ks(se,R,W,F,V,$);j.quatX[r]=J.x,j.quatY[r]=J.y,j.quatZ[r]=J.z,j.quatW[r]=J.w}}},Ff={systems:[Cf],components:{Orbit:oe},dependencies:[yo]},Of={offsetX:[],offsetY:[],offsetZ:[],color:[],thickness:[],opacity:[],visible:[],arrowStart:[],arrowEnd:[],arrowSize:[]};Ue(Of,{defaults:()=>({offsetX:1,offsetY:0,offsetZ:0,color:16777215,thickness:2,opacity:1,visible:1,arrowStart:0,arrowEnd:0,arrowSize:12})});const Rf={fontSize:[],color:[],opacity:[],visible:[],dirty:[]};Ue(Rf,{defaults:()=>({fontSize:1,color:16777215,opacity:1,visible:1,dirty:1})});export{ht as C,fe as M,Ff as O,po as R,$t as S,K as T,ot as a,ft as b,xs as c,Tc as d,Df as e,j as f,Gf as m,Fi as r,Ue as s};
//# sourceMappingURL=component-B847rBOH.js.map
