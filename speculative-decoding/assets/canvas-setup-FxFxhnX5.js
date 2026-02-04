var It=(e,t,r)=>Object.defineProperty(e,t,{value:r,enumerable:!1,writable:!0,configurable:!0}),ma=(e,t)=>t&e.entityMask,pa=(e,t)=>t>>>e.versionShift&(1<<e.versionBits)-1,ga=(e,t)=>{let r=pa(e,t)+1&(1<<e.versionBits)-1;return t&e.entityMask|r<<e.versionShift},ya=e=>{let t={versioning:!1,versionBits:8},r=t.versionBits??8,n=t.versioning??!1,i=32-r,s=(1<<i)-1,o=i,a=(1<<r)-1<<o;return{aliveCount:0,dense:[],sparse:[],maxId:0,versioning:n,versionBits:r,entityMask:s,versionShift:o,versionMask:a}},ba=e=>{if(e.aliveCount<e.dense.length){let r=e.dense[e.aliveCount],n=r;return e.sparse[n]=e.aliveCount,e.aliveCount++,r}let t=++e.maxId;return e.dense.push(t),e.sparse[t]=e.aliveCount,e.aliveCount++,t},wa=(e,t)=>{let r=e.sparse[t];if(r===void 0||r>=e.aliveCount)return;let n=e.aliveCount-1,i=e.dense[n];if(e.sparse[i]=r,e.dense[r]=i,e.sparse[t]=n,e.dense[n]=t,e.versioning){let s=ga(e,t);e.dense[n]=s}e.aliveCount--},zn=(e,t)=>{let r=ma(e,t),n=e.sparse[r];return n!==void 0&&n<e.aliveCount&&e.dense[n]===t},Q=Symbol.for("bitecs_internal"),va=(e,t)=>It(e||{},Q,{entityIndex:t||ya(),entityMasks:[[]],entityComponents:new Map,bitflag:1,componentMap:new Map,componentCount:0,queries:new Set,queriesHashMap:new Map,notQueries:new Set,dirtyQueries:new Set,entitiesWithRelations:new Set,hierarchyData:new Map,hierarchyActiveRelations:new Set,hierarchyQueryCache:new Map});function xa(...e){let t,r;return e.forEach(n=>{typeof n=="object"&&"dense"in n&&"sparse"in n&&"aliveCount"in n?t=n:typeof n=="object"&&(r=n)}),va(r,t)}var _a=e=>Array.from(e[Q].entityComponents.keys()),xt=()=>{let e=[],t=[],r=n=>e[t[n]]===n;return{add:n=>{r(n)||(t[n]=e.push(n)-1)},remove:n=>{if(!r(n))return;let i=t[n],s=e.pop();s!==n&&(e[i]=s,t[s]=i)},has:r,sparse:t,dense:e,reset:()=>{e.length=0,t.length=0},sort:n=>{e.sort(n);for(let i=0;i<e.length;i++)t[e[i]]=i}}},di=typeof SharedArrayBuffer<"u"?SharedArrayBuffer:ArrayBuffer,fs=(e=1e3)=>{let t=[],r=0,n=new Uint32Array(new di(e*4)),i=s=>s<t.length&&t[s]<r&&n[t[s]]===s;return{add:s=>{if(!i(s)){if(r>=n.length){let o=new Uint32Array(new di(n.length*2*4));o.set(n),n=o}n[r]=s,t[s]=r,r++}},remove:s=>{if(!i(s))return;r--;let o=t[s],a=n[r];n[o]=a,t[a]=o},has:i,sparse:t,get dense(){return new Uint32Array(n.buffer,0,r)},reset:()=>{r=0,t.length=0},sort:s=>{let o=Array.from(n.subarray(0,r));o.sort(s);for(let a=0;a<o.length;a++)n[a]=o[a];for(let a=0;a<r;a++)t[n[a]]=a}}},vr=()=>{let e=new Set;return{subscribe:t=>(e.add(t),()=>{e.delete(t)}),notify:(t,...r)=>Array.from(e).reduce((n,i)=>{let s=i(t,...r);return s&&typeof s=="object"?{...n,...s}:n},{})}},Kt=Symbol.for("bitecs-relation"),Ke=Symbol.for("bitecs-pairTarget"),Vr=Symbol.for("bitecs-isPairComponent"),Xe=Symbol.for("bitecs-relationData"),xr=()=>{let e={pairsMap:new Map,initStore:void 0,exclusiveRelation:!1,autoRemoveSubject:!1,onTargetRemoved:void 0},t=r=>{if(r===void 0)throw Error("Relation target is undefined");let n=r==="*"?ie:r;if(!e.pairsMap.has(n)){let i={};It(i,Kt,t),It(i,Ke,n),It(i,Vr,!0),e.pairsMap.set(n,i)}return e.pairsMap.get(n)};return It(t,Xe,e),t},Ca=e=>t=>{let r=t[Xe];return r.initStore=e,t},Sa=e=>{let t=e[Xe];return t.exclusiveRelation=!0,e},Ta=e=>{let t=e[Xe];return t.autoRemoveSubject=!0,e},Ea=e=>t=>{let r=t[Xe];return r.onTargetRemoved=e,t},J=(e,t)=>{if(e===void 0)throw Error("Relation is undefined");return e(t)},$e=(e,t,r)=>{let n=Gn(e,t),i=[];for(let s of n)s[Kt]===r&&s[Ke]!==ie&&!Fa(s[Ke])&&i.push(s[Ke]);return i};function Pa(...e){if(e.length===1&&typeof e[0]=="object"){let{store:t,exclusive:r,autoRemoveSubject:n,onTargetRemoved:i}=e[0];return[t&&Ca(t),r&&Sa,n&&Ta,i&&Ea(i)].filter(Boolean).reduce((s,o)=>o(s),xr())}else return e.reduce((t,r)=>r(t),xr())}var Ba=Symbol.for("bitecs-wildcard");function Aa(){let e=xr();return Object.defineProperty(e,Ba,{value:!0,enumerable:!1,writable:!1,configurable:!1}),e}function Ia(){let e=Symbol.for("bitecs-global-wildcard");return globalThis[e]||(globalThis[e]=Aa()),globalThis[e]}var ie=Ia();function Ma(){return xr()}function ka(){let e=Symbol.for("bitecs-global-isa");return globalThis[e]||(globalThis[e]=Ma()),globalThis[e]}var _r=ka();function Fa(e){return e?Object.getOwnPropertySymbols(e).includes(Xe):!1}var Na=64,Pe=4294967295,hs=1024;function ms(e,t){let{depths:r}=e;if(t<r.length)return r;let n=Math.max(t+1,r.length*2,r.length+hs),i=new Uint32Array(n);return i.fill(Pe),i.set(r),e.depths=i,i}function ps(e,t,r,n){let{depthToEntities:i}=e;if(n!==void 0&&n!==Pe){let s=i.get(n);s&&(s.remove(t),s.dense.length===0&&i.delete(n))}r!==Pe&&(i.has(r)||i.set(r,fs()),i.get(r).add(t))}function Oa(e,t){t>e.maxDepth&&(e.maxDepth=t)}function Dn(e,t,r,n){e.depths[t]=r,ps(e,t,r,n),Oa(e,r)}function gs(e,t){e[Q].hierarchyQueryCache.delete(t)}function ys(e,t){let r=e[Q];return r.hierarchyActiveRelations.has(t)||(r.hierarchyActiveRelations.add(t),Ln(e,t),Ra(e,t)),r.hierarchyData.get(t)}function Ra(e,t){let r=Jt(e,[J(t,ie)]);for(let i of r)wn(e,t,i);let n=new Set;for(let i of r)for(let s of $e(e,i,t))n.has(s)||(n.add(s),wn(e,t,s))}function Ln(e,t){let r=e[Q];if(!r.hierarchyData.has(t)){let n=Math.max(hs,r.entityIndex.dense.length*2),i=new Uint32Array(n);i.fill(Pe),r.hierarchyData.set(t,{depths:i,dirty:xt(),depthToEntities:new Map,maxDepth:0})}}function bs(e,t,r,n=new Set){if(n.has(r))return 0;n.add(r);let i=$e(e,r,t);if(i.length===0)return 0;if(i.length===1)return bn(e,t,i[0],n)+1;let s=1/0;for(let o of i){let a=bn(e,t,o,n);if(a<s&&(s=a,s===0))break}return s===1/0?0:s+1}function bn(e,t,r,n){let i=e[Q];Ln(e,t);let s=i.hierarchyData.get(t),{depths:o}=s;if(o=ms(s,r),o[r]===Pe){let a=bs(e,t,r,n);return Dn(s,r,a),a}return o[r]}function wn(e,t,r){return bn(e,t,r,new Set)}function ws(e,t,r,n,i=xt()){if(i.has(r))return;i.add(r);let s=Jt(e,[t(r)]);for(let o of s)n.add(o),ws(e,t,o,n,i)}function za(e,t,r,n,i=new Set){let s=e[Q];if(!s.hierarchyActiveRelations.has(t))return;Ln(e,t);let o=s.hierarchyData.get(t);if(i.has(r)){o.dirty.add(r);return}i.add(r);let{depths:a,dirty:c}=o,u=n!==void 0?wn(e,t,n)+1:0;if(u>Na)return;let l=a[r];Dn(o,r,u,l===Pe?void 0:l),l!==u&&(ws(e,t,r,c,xt()),gs(e,t))}function Da(e,t,r){let n=e[Q];if(!n.hierarchyActiveRelations.has(t))return;let i=n.hierarchyData.get(t),{depths:s}=i;s=ms(i,r),vs(e,t,r,s,xt()),gs(e,t)}function vs(e,t,r,n,i){if(i.has(r))return;i.add(r);let s=e[Q].hierarchyData.get(t);if(r<n.length){let a=n[r];a!==Pe&&(s.depths[r]=Pe,ps(s,r,Pe,a))}let o=Jt(e,[t(r)]);for(let a of o)vs(e,t,a,n,i)}function xs(e,t){let r=e[Q].hierarchyData.get(t);if(!r)return;let{dirty:n,depths:i}=r;if(n.dense.length!==0){for(let s of n.dense)if(i[s]===Pe){let o=bs(e,t,s);Dn(r,s,o)}n.reset()}}function La(e,t,r,n={}){let i=e[Q];ys(e,t);let s=Sr(e,[t,...r]),o=i.hierarchyQueryCache.get(t);if(o&&o.hash===s)return o.result;xs(e,t),Ss(e,r,n);let a=i.queriesHashMap.get(Sr(e,r)),c=i.hierarchyData.get(t),{depths:u}=c;a.sort((f,h)=>{let d=u[f],m=u[h];return d!==m?d-m:f-h});let l=(n.buffered,a.dense);return i.hierarchyQueryCache.set(t,{hash:s,result:l}),l}function Ua(e,t,r,n={}){let i=ys(e,t);xs(e,t);let s=i.depthToEntities.get(r);return s?(n.buffered,s.dense):n.buffered?new Uint32Array(0):[]}var pt=Symbol.for("bitecs-opType"),Cr=Symbol.for("bitecs-opTerms"),Va=e=>(...t)=>({[pt]:e,[Cr]:t}),vn=Va("Not"),xn=Symbol.for("bitecs-hierarchyType"),_s=Symbol.for("bitecs-hierarchyRel"),Cs=Symbol.for("bitecs-hierarchyDepth"),Ga=(e,t)=>({[xn]:"Hierarchy",[_s]:e,[Cs]:t}),Mt=Symbol.for("bitecs-modifierType"),$a={[Mt]:"nested"},Wa=$a,Sr=(e,t)=>{let r=e[Q],n=s=>(r.componentMap.has(s)||Ft(e,s),r.componentMap.get(s).id),i=s=>pt in s?`${s[pt].toLowerCase()}(${s[Cr].map(i).sort().join(",")})`:n(s).toString();return t.map(i).sort().join("-")},fi=(e,t,r={})=>{let n=e[Q],i=Sr(e,t),s=[],o=x=>{pt in x?x[Cr].forEach(o):(n.componentMap.has(x)||Ft(e,x),s.push(x))};t.forEach(o);let a=[],c=[],u=[],l=(x,b)=>{b.forEach(S=>{n.componentMap.has(S)||Ft(e,S),x.push(S)})};t.forEach(x=>{if(pt in x){let{[pt]:b,[Cr]:S}=x;if(b==="Not")l(c,S);else if(b==="Or")l(u,S);else if(b==="And")l(a,S);else throw new Error(`Nested combinator ${b} not supported yet - use simple queries for best performance`)}else n.componentMap.has(x)||Ft(e,x),a.push(x)});let f=s.map(x=>n.componentMap.get(x)),h=[...new Set(f.map(x=>x.generationId))],d=(x,b)=>(x[b.generationId]=(x[b.generationId]||0)|b.bitflag,x),m=a.map(x=>n.componentMap.get(x)).reduce(d,{}),g=c.map(x=>n.componentMap.get(x)).reduce(d,{}),y=u.map(x=>n.componentMap.get(x)).reduce(d,{}),w=f.reduce(d,{}),p=Object.assign(r.buffered?fs():xt(),{allComponents:s,orComponents:u,notComponents:c,masks:m,notMasks:g,orMasks:y,hasMasks:w,generations:h,toRemove:xt(),addObservable:vr(),removeObservable:vr(),queues:{}});n.queries.add(p),n.queriesHashMap.set(i,p),f.forEach(x=>{x.queries.add(p)}),c.length&&n.notQueries.add(p);let v=n.entityIndex;for(let x=0;x<v.aliveCount;x++){let b=v.dense[x];We(e,b,Vn)||Gr(e,p,b)&&$r(p,b)}return p};function Ss(e,t,r={}){let n=e[Q],i=Sr(e,t),s=n.queriesHashMap.get(i);return s?r.buffered&&!("buffer"in s.dense)&&(s=fi(e,t,{buffered:!0})):s=fi(e,t,r),r.buffered,s.dense}function Jt(e,t,...r){let n=t.find(c=>c&&typeof c=="object"&&xn in c),i=t.filter(c=>!(c&&typeof c=="object"&&xn in c)),s=!1,o=!0,a=r.some(c=>c&&typeof c=="object"&&Mt in c);for(let c of r)if(a&&c&&typeof c=="object"&&Mt in c){let u=c;u[Mt]==="buffer"&&(s=!0),u[Mt]==="nested"&&(o=!1)}else if(!a){let u=c;u.buffered!==void 0&&(s=u.buffered),u.commit!==void 0&&(o=u.commit)}if(n){let{[_s]:c,[Cs]:u}=n;return u!==void 0?Ua(e,c,u,{buffered:s}):La(e,c,i,{buffered:s})}return o&&Ha(e),Ss(e,i,{buffered:s})}function Gr(e,t,r){let n=e[Q],{masks:i,notMasks:s,orMasks:o,generations:a}=t,c=Object.keys(o).length===0;for(let u=0;u<a.length;u++){let l=a[u],f=i[l],h=s[l],d=o[l],m=n.entityMasks[l][r];if(h&&m&h||f&&(m&f)!==f)return!1;d&&m&d&&(c=!0)}return c}var $r=(e,t)=>{if(e.toRemove.has(t)){e.toRemove.remove(t),e.addObservable.notify(t);return}e.has(t)||(e.add(t),e.addObservable.notify(t))},Qa=e=>{for(let t=0;t<e.toRemove.dense.length;t++){let r=e.toRemove.dense[t];e.remove(r)}e.toRemove.reset()},Ha=e=>{let t=e[Q];t.dirtyQueries.size&&(t.dirtyQueries.forEach(Qa),t.dirtyQueries.clear())},Un=(e,t,r)=>{let n=e[Q];!t.has(r)||t.toRemove.has(r)||(t.toRemove.add(r),n.dirtyQueries.add(t),t.removeObservable.notify(r))},Ft=(e,t)=>{if(!t)throw new Error("bitECS - Cannot register null or undefined component");let r=e[Q],n=new Set,i={id:r.componentCount++,generationId:r.entityMasks.length-1,bitflag:r.bitflag,ref:t,queries:n,setObservable:vr(),getObservable:vr()};return r.componentMap.set(t,i),r.bitflag*=2,r.bitflag>=2**31&&(r.bitflag=1,r.entityMasks.push([])),i},We=(e,t,r)=>{let n=e[Q],i=n.componentMap.get(r);if(!i)return!1;let{generationId:s,bitflag:o}=i;return(n.entityMasks[s][t]&o)===o},Ts=(e,t,r)=>{let n=e[Q].componentMap.get(r);if(n&&We(e,t,r))return n.getObservable.notify(t)},Es=(e,t,r,n,i=new Set)=>{if(!i.has(n)){i.add(n),_t(t,r,_r(n));for(let s of Gn(t,n))if(s!==Vn&&!We(t,r,s)){_t(t,r,s);let o=e.componentMap.get(s);if(o?.setObservable){let a=Ts(t,n,s);o.setObservable.notify(r,a)}}for(let s of $e(t,n,_r))Es(e,t,r,s,i)}},_t=(e,t,r)=>{if(!$t(e,t))throw new Error(`Cannot add component - entity ${t} does not exist in the world.`);let n=e[Q],i="component"in r?r.component:r,s="data"in r?r.data:void 0;n.componentMap.has(i)||Ft(e,i);let o=n.componentMap.get(i);if(We(e,t,i))return s!==void 0&&o.setObservable.notify(t,s),!1;let{generationId:a,bitflag:c,queries:u}=o;if(n.entityMasks[a][t]|=c,We(e,t,Vn)||u.forEach(l=>{Gr(e,l,t)?$r(l,t):Un(e,l,t)}),n.entityComponents.get(t).add(i),s!==void 0&&o.setObservable.notify(t,s),i[Vr]){let l=i[Kt],f=i[Ke];if(_n(e,t,J(l,ie),J(ie,f)),typeof f=="number"&&(_n(e,f,J(ie,t),J(ie,l)),n.entitiesWithRelations.add(f),n.entitiesWithRelations.add(t)),n.entitiesWithRelations.add(f),l[Xe].exclusiveRelation===!0&&f!==ie){let h=$e(e,t,l)[0];h!=null&&h!==f&&Ne(e,t,l(h))}if(l===_r){let h=$e(e,t,_r);for(let d of h)Es(n,e,t,d)}za(e,l,t,typeof f=="number"?f:void 0)}return!0};function _n(e,t,...r){(Array.isArray(r[0])?r[0]:r).forEach(n=>{_t(e,t,n)})}var Ne=(e,t,...r)=>{let n=e[Q];if(!$t(e,t))throw new Error(`Cannot remove component - entity ${t} does not exist in the world.`);r.forEach(i=>{if(!We(e,t,i))return;let s=n.componentMap.get(i),{generationId:o,bitflag:a,queries:c}=s;if(n.entityMasks[o][t]&=~a,c.forEach(u=>{u.toRemove.remove(t),Gr(e,u,t)?$r(u,t):Un(e,u,t)}),n.entityComponents.get(t).delete(i),i[Vr]){let u=i[Ke],l=i[Kt];Da(e,l,t),Ne(e,t,J(ie,u)),typeof u=="number"&&$t(e,u)&&(Ne(e,u,J(ie,t)),Ne(e,u,J(ie,l))),$e(e,t,l).length===0&&Ne(e,t,J(l,ie))}})},Xa=Ne,Vn={};function Ya(e,...t){let r=e[Q],n=ba(r.entityIndex);return r.notQueries.forEach(i=>{Gr(e,i,n)&&$r(i,n)}),r.entityComponents.set(n,new Set),t.length>0&&_n(e,n,t),n}var Ps=(e,t)=>{let r=e[Q];if(!zn(r.entityIndex,t))return;let n=[t],i=new Set;for(;n.length>0;){let s=n.shift();if(i.has(s))continue;i.add(s);let o=[];if(r.entitiesWithRelations.has(s)){for(let a of Jt(e,[ie(s)],Wa))if($t(e,a))for(let c of r.entityComponents.get(a)){if(!c[Vr])continue;let u=c[Kt][Xe];o.push(()=>Ne(e,a,J(ie,s))),c[Ke]===s&&(o.push(()=>Ne(e,a,c)),u.autoRemoveSubject&&n.push(a),u.onTargetRemoved&&o.push(()=>u.onTargetRemoved(e,a,s)))}r.entitiesWithRelations.delete(s)}for(let a of o)a();for(let a of n)Ps(e,a);for(let a of r.queries)Un(e,a,s);wa(r.entityIndex,s),r.entityComponents.delete(s);for(let a=0;a<r.entityMasks.length;a++)r.entityMasks[a][s]=0}},Gn=(e,t)=>{let r=e[Q];if(t===void 0)throw new Error("getEntityComponents: entity id is undefined.");if(!zn(r.entityIndex,t))throw new Error(`getEntityComponents: entity ${t} does not exist in the world.`);return Array.from(r.entityComponents.get(t))},$t=(e,t)=>zn(e[Q].entityIndex,t);class Bs extends Error{constructor(t="Circular dependency detected"){super(t),this.name="CycleError"}}function pr(e,t){if(e.length===0)return[];const r=new Map,n=new Map;for(const o of e)r.set(o,new Set),n.set(o,0);for(const[o,a]of t)!r.has(o)||!r.has(a)||(r.get(o).add(a),n.set(a,n.get(a)+1));qa(e,r);const i=[],s=[];for(const o of e)n.get(o)===0&&i.push(o);for(;i.length>0;){const o=i.shift();s.push(o);for(const a of r.get(o)){const c=n.get(a)-1;n.set(a,c),c===0&&i.push(a)}}return s}function qa(e,t){const r=new Set,n=new Set;function i(s){if(n.has(s))return!0;if(r.has(s))return!1;r.add(s),n.add(s);for(const o of t.get(s))if(i(o))return!0;return n.delete(s),!1}for(const s of e)if(i(s))throw new Bs}const gr={FIXED_DT:1/50,DEFAULT_DT:1/60};class As extends Error{constructor(t){super(t),this.name="OrderingError"}}class Za{constructor(){this._systems=new Set,this._systemsVersion=0,this._accumulator=0,this._initialized=new WeakSet,this._cache=new Map,this._cacheVersion=-1,this._time={deltaTime:0,fixedDeltaTime:gr.FIXED_DT,elapsed:0}}get systems(){return this._systems}get systemsVersion(){return this._systemsVersion}get accumulator(){return this._accumulator}get time(){return this._time}register(t){this._systems.add(t),this._systemsVersion++}unregister(t){this._systems.delete(t)&&this._systemsVersion++}step(t,r=gr.DEFAULT_DT){const n=gr.FIXED_DT;for(this._time.deltaTime=r,this._time.elapsed+=r,this._accumulator+=r,this.runGroup(t,"setup");this._accumulator>=n;)this._time.deltaTime=n,this.runGroup(t,"fixed"),this._accumulator-=n;this._time.deltaTime=r,this.runGroup(t,"simulation"),this.runGroup(t,"draw")}runGroup(t,r){for(const n of this.getSorted(r))this._initialized.has(n)||(n.setup?.(t),this._initialized.add(n)),n.update?.(t)}getSorted(t){this._systemsVersion!==this._cacheVersion&&(this._cache.clear(),this._cacheVersion=this._systemsVersion);const r=this._cache.get(t);if(r)return r;const n=Array.from(this._systems),i=n.filter(o=>(o.group??"simulation")===t),s=ja(i,n);return this._cache.set(t,s),s}}function ja(e,t){Ka(e,t??e);const n=e.filter(o=>o.first),i=e.filter(o=>o.last),s=e.filter(o=>!o.first&&!o.last);return[...pr(n,Zr(n)),...pr(s,Zr(s)),...pr(i,Zr(i))]}function Zr(e){const t=[];for(const r of e){for(const n of r.before??[])e.includes(n)&&t.push([r,n]);for(const n of r.after??[])e.includes(n)&&t.push([n,r])}return t}function Ka(e,t){for(const r of e){if(r.first&&r.last)throw new As("System cannot have both first and last constraints");const n=r.group??"simulation";for(const i of r.before??[])hi(i,n,t);for(const i of r.after??[])hi(i,n,t)}}function hi(e,t,r){if(!r.includes(e))return;const n=e.group??"simulation";if(n!==t)throw new As(`Cross-group constraint: ${t} references ${n}`)}function Ja(){if(typeof __TAURI_INTERNALS__<"u")return"standalone";if(typeof Bun<"u")return"headless";if(typeof window<"u"&&typeof fetch=="function")return"web";throw new Error("Unknown runtime environment")}function ec(){return{target:"web",async readFile(e){const t=await fetch(e);if(!t.ok)throw new Error(`Failed to load ${e}: ${t.status}`);return t.text()},async readBinary(e){const t=await fetch(e);if(!t.ok)throw new Error(`Failed to load ${e}: ${t.status}`);return t.arrayBuffer()},requestFrame(e){requestAnimationFrame(e)},now(){return performance.now()}}}function tc(){return{target:"headless",async readFile(e){return Bun.file(e).text()},async readBinary(e){return Bun.file(e).arrayBuffer()},requestFrame(e){setTimeout(e,0)},now(){return performance.now()}}}function mi(e){return e.startsWith("/")||e.startsWith("./")||e.startsWith("../")}const pi="@tauri-apps/plugin-fs";function rc(){return{target:"standalone",async readFile(e){if(mi(e)){const r=await fetch(e);if(!r.ok)throw new Error(`Failed to load ${e}: ${r.status}`);return r.text()}const{readTextFile:t}=await import(pi);return t(e)},async readBinary(e){if(mi(e)){const n=await fetch(e);if(!n.ok)throw new Error(`Failed to load ${e}: ${n.status}`);return n.arrayBuffer()}const{readFile:t}=await import(pi);return(await t(e)).buffer},requestFrame(e){requestAnimationFrame(e)},now(){return performance.now()}}}let ir;async function nc(){switch(Ja()){case"headless":return tc();case"standalone":return rc();case"web":return ec()}}let jr;async function Is(){return ir||(jr||(jr=nc()),ir=await jr,ir)}function Qe(e){return e.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/[\s_]+/g,"-").toLowerCase()}function Ms(e){return e.replace(/-([a-z])/g,(t,r)=>r.toUpperCase())}const $n=new WeakMap;function $(e,t){$n.set(e,t)}function ic(e){return $n.get(e)}const ks=new Map;function Fs(e,t){const r=Qe(e),n=$n.get(t);ks.set(r,{component:t,name:r,traits:n})}function Ns(e){return ks.get(Qe(e))}function K(e,t,r){function n(s){return e[s*t+r]}function i(s,o){e[s*t+r]=o}return new Proxy([],{get(s,o){if(o==="get")return n;if(o==="set")return i;const a=Number(o);if(!Number.isNaN(a))return n(a)},set(s,o,a){const c=Number(o);return Number.isNaN(c)?!1:(i(c,a),!0)}})}const I=65536;class Wt{constructor(){this.scheduler=new Za,this._resources=new Map,this._disposed=!1,this._running=!1,this._runtime=null,this._lastTime=0,this._maxEid=0,this.world=xa()}get time(){return this.scheduler.time}get running(){return this._running}get maxEid(){return this._maxEid}static{this.Builder=null}static new(){if(!Wt.Builder)throw new Error("StateBuilder not injected. Import from 'shallot' or 'shallot/core'.");return new Wt.Builder}setResource(t,r){this._resources.set(t,r)}getResource(t){return this._resources.get(t)}deleteResource(t){return this._resources.delete(t)}async start(t){this._running||(this._runtime=t??await Is(),this._running=!0,this._lastTime=this._runtime.now(),this.scheduleFrame())}stop(){this._running=!1}scheduleFrame(){!this._running||!this._runtime||this._runtime.requestFrame(()=>this.tick())}tick(){if(!this._running||!this._runtime)return;const t=this._runtime.now(),r=(t-this._lastTime)/1e3;this._lastTime=t,this.step(r),this.scheduleFrame()}register(t){if("update"in t||"setup"in t||"dispose"in t)this.scheduler.register(t);else{const r=t;if(r.components)for(const[n,i]of Object.entries(r.components))Fs(n,i);if(r.systems)for(const n of r.systems)this.scheduler.register(n)}}unregister(t){this.scheduler.unregister(t)}step(t=gr.DEFAULT_DT){this.scheduler.step(this,t)}addEntity(){const t=Ya(this.world);if(t>=I)throw new Error(`Entity limit exceeded: ${t} >= ${I}`);return t>this._maxEid&&(this._maxEid=t),t}removeEntity(t){Ps(this.world,t)}entityExists(t){return $t(this.world,t)}getAllEntities(){return _a(this.world)}query(t){return Jt(this.world,t)}getEntityComponents(t){return Gn(this.world,t)}addComponent(t,r){_t(this.world,t,r);const n=ic(r);if(n?.defaults){const i=n.defaults(),s=r;for(const[o,a]of Object.entries(i)){const c=s[o];c!=null&&(c[t]=a)}}}addComponents(t,...r){for(const n of r)this.addComponent(t,n)}removeComponent(t,...r){Ne(this.world,t,...r)}removeComponents(t,...r){Xa(this.world,t,...r)}hasComponent(t,r){return We(this.world,t,r)}getComponent(t,r){return Ts(this.world,t,r)}setComponent(t,r,n){this.addComponent(t,r);const i=r;for(const[s,o]of Object.entries(n)){const a=i[s];a!=null&&(a[t]=o)}}addRelation(t,r,n){_t(this.world,t,r.relation(n))}hasRelation(t,r,n){return We(this.world,t,r.relation(n))}getRelationTargets(t,r){return $e(this.world,t,r.relation)}getFirstRelationTarget(t,r){const n=$e(this.world,t,r.relation);return n.length>0?n[0]:-1}dispose(){if(!this._disposed){this.stop();for(const t of this.scheduler.systems)t.dispose?.(this);this._disposed=!0}}}const sc="modulepreload",oc=function(e,t){return new URL(e,t).href},gi={},ac=function(t,r,n){let i=Promise.resolve();if(r&&r.length>0){let u=function(l){return Promise.all(l.map(f=>Promise.resolve(f).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");i=u(r.map(l=>{if(l=oc(l,n),l in gi)return;gi[l]=!0;const f=l.endsWith(".css"),h=f?'[rel="stylesheet"]':"";if(n)for(let m=o.length-1;m>=0;m--){const g=o[m];if(g.href===l&&(!f||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${l}"]${h}`))return;const d=document.createElement("link");if(d.rel=f?"stylesheet":sc,f||(d.as="script"),d.crossOrigin="",d.href=l,c&&d.setAttribute("nonce",c),document.head.appendChild(d),f)return new Promise((m,g)=>{d.addEventListener("load",m),d.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return t().catch(s)})};class Oe{constructor(){this._plugins=[],this._systems=[],this._scenes=[],this._excludedPlugins=new Set,this._useDefaultPlugins=!0,this._canvas=null,this._loading=null}static{this.defaultPlugins=[]}static{this.initCanvas=null}static{this.defaultLoading=null}withCanvas(t){return this._canvas=t,this}withLoading(t){return this._loading=t,this}withPlugins(...t){return this._plugins.push(...t),this}withoutPlugin(t){return this._excludedPlugins.add(t),this}withoutPlugins(...t){for(const r of t)this._excludedPlugins.add(r);return this}withoutDefaultPlugins(){return this._useDefaultPlugins=!1,this}withSystems(...t){return this._systems.push(...t),this}withScene(t){return this._scenes.push(t),this}async build(){const t=new Wt;this._canvas&&Oe.initCanvas&&Oe.initCanvas(t,this._canvas);const r=this._loading??(this._canvas&&Oe.defaultLoading?.(this._canvas)),n=r?.show(),i=new Set;if(this._useDefaultPlugins)for(const d of Oe.defaultPlugins)this._excludedPlugins.has(d)||i.add(d);for(const d of this._plugins)i.add(d);const s=[...i];for(const d of s){if(d.components)for(const[m,g]of Object.entries(d.components))Fs(m,g);if(d.systems)for(const m of d.systems)t.scheduler.register(m)}const o=[];for(const d of s)for(const m of d.dependencies??[])s.includes(m)&&o.push([m,d]);const a=pr(s,o),c=a.length*2+this._scenes.length;for(let d=0;d<a.length;d++){const m=a[d],g=r?y=>r.update((d+y)/c):void 0;await m.initialize?.(t,g),r?.update((d+1)/c)}for(const d of this._systems)t.scheduler.register(d);if(this._scenes.length>0){const{parse:d,load:m}=await ac(async()=>{const{parse:y,load:w}=await Promise.resolve().then(()=>Ac);return{parse:y,load:w}},[],import.meta.url),g=await Is();for(let y=0;y<this._scenes.length;y++){const w=await g.readFile(this._scenes[y]),p=d(w);m(p,t),r?.update((a.length+y+1)/c)}}const u=a.filter(d=>d.warm);let l=0;const f=a.length+this._scenes.length,h=u.map(async d=>{await d.warm(t,m=>{r&&r.update((f+l+m)/c)}),l++,r?.update((f+l)/c)});return await Promise.all(h),n&&(r?.update(1),await new Promise(d=>setTimeout(d,200)),n()),t}async run(){const t=await this.build();return await t.start(),t}}Wt.Builder=Oe;function Ie(e){const t=Symbol(e),r=Object.assign(t,{from(n){return n.getResource(r)}});return r}const Os=new Map;function Rs(e,t){const r=Pa({exclusive:t?.exclusive,autoRemoveSubject:t?.autoRemoveSubject}),n={name:Qe(e),relation:r,exclusive:t?.exclusive,autoRemoveSubject:t?.autoRemoveSubject};return Os.set(n.name,n),n}function cc(e){return Os.get(Qe(e))}const le=Rs("child-of",{exclusive:!0,autoRemoveSubject:!0}),Kr=Math.PI/180,Pt=180/Math.PI;function Jr(e,t,r){return e<t?t:e>r?r:e}function uc(e,t,r){const n=e*Kr*.5,i=t*Kr*.5,s=r*Kr*.5,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),u=Math.sin(i),l=Math.cos(s),f=Math.sin(s);return{x:a*c*l+o*u*f,y:o*u*l-a*c*f,z:o*c*f+a*u*l,w:o*c*l-a*u*f}}function yi(e,t,r,n){const i=e+e,s=t+t,o=r+r,a=e*i,c=e*s,u=e*o,l=t*s,f=t*o,h=r*o,d=n*i,m=n*s,g=n*o,y=u+m,w=Math.asin(y<-1?-1:y>1?1:y);return y>-.9999999&&y<.9999999?{x:Math.atan2(d-f,1-(a+l))*Pt,y:w*Pt,z:Math.atan2(g-c,1-(l+h))*Pt}:{x:Math.atan2(f+d,1-(a+h))*Pt,y:w*Pt,z:0}}function lc(e,t,r,n){if(e<=0)throw new Error(`Invalid FOV: ${e} (must be > 0)`);if(t<=0)throw new Error(`Invalid aspect ratio: ${t} (must be > 0)`);if(r===n)throw new Error(`Invalid depth planes: near === far (${r})`);const i=1/Math.tan(e*Math.PI/360),s=1/(r-n);return new Float32Array([i/t,0,0,0,0,i,0,0,0,0,n*s,-1,0,0,n*r*s,0])}function dc(e,t,r,n){if(e<=0)throw new Error(`Invalid orthographic size: ${e} (must be > 0)`);if(t<=0)throw new Error(`Invalid aspect ratio: ${t} (must be > 0)`);if(r===n)throw new Error(`Invalid depth planes: near === far (${r})`);const i=1/(e*t),s=1/e,o=1/(r-n);return new Float32Array([i,0,0,0,0,s,0,0,0,0,o,0,0,0,r*o,1])}function fc(e,t){const r=new Float32Array(16);for(let n=0;n<4;n++)for(let i=0;i<4;i++)r[i*4+n]=e[n]*t[i*4]+e[n+4]*t[i*4+1]+e[n+8]*t[i*4+2]+e[n+12]*t[i*4+3];return r}function hc(e){const t=new Float32Array(16),r=e[0],n=e[1],i=e[2],s=e[4],o=e[5],a=e[6],c=e[8],u=e[9],l=e[10],f=e[12],h=e[13],d=e[14];return t[0]=r,t[1]=s,t[2]=c,t[3]=0,t[4]=n,t[5]=o,t[6]=u,t[7]=0,t[8]=i,t[9]=a,t[10]=l,t[11]=0,t[12]=-(r*f+n*h+i*d),t[13]=-(s*f+o*h+a*d),t[14]=-(c*f+u*h+l*d),t[15]=1,t}function mc(e){const t=new Float32Array(24),r=e;t[0]=r[3]+r[0],t[1]=r[7]+r[4],t[2]=r[11]+r[8],t[3]=r[15]+r[12],t[4]=r[3]-r[0],t[5]=r[7]-r[4],t[6]=r[11]-r[8],t[7]=r[15]-r[12],t[8]=r[3]+r[1],t[9]=r[7]+r[5],t[10]=r[11]+r[9],t[11]=r[15]+r[13],t[12]=r[3]-r[1],t[13]=r[7]-r[5],t[14]=r[11]-r[9],t[15]=r[15]-r[13],t[16]=r[2],t[17]=r[6],t[18]=r[10],t[19]=r[14],t[20]=r[3]-r[2],t[21]=r[7]-r[6],t[22]=r[11]-r[10],t[23]=r[15]-r[14];for(let n=0;n<6;n++){const i=Math.hypot(t[n*4],t[n*4+1],t[n*4+2]);i>0&&(t[n*4]/=i,t[n*4+1]/=i,t[n*4+2]/=i,t[n*4+3]/=i)}return t}function pc(e,t,r,n,i,s,o=0,a=1,c=0){if(!Number.isFinite(e)||!Number.isFinite(t)||!Number.isFinite(r)||!Number.isFinite(n)||!Number.isFinite(i)||!Number.isFinite(s))throw new Error(`lookAt received NaN: eye=[${e},${t},${r}], target=[${n},${i},${s}]`);let u=e-n,l=t-i,f=r-s,h=Math.sqrt(u*u+l*l+f*f);h===0?f=1:(h=1/h,u*=h,l*=h,f*=h);let d=a*f-c*l,m=c*u-o*f,g=o*l-a*u,y=Math.sqrt(d*d+m*m+g*g);y<1e-6&&(Math.abs(f)>Math.abs(u)?o+=1e-4:c+=1e-4,d=a*f-c*l,m=c*u-o*f,g=o*l-a*u,y=Math.sqrt(d*d+m*m+g*g)),y<1e-6?(d=1,m=0,g=0):(y=1/y,d*=y,m*=y,g*=y);const w=l*g-f*m,p=f*d-u*g,v=u*m-l*d,x=d+p+f;let b,S,_,E;if(x>0){const B=.5/Math.sqrt(x+1);b=.25/B,S=(v-l)*B,_=(u-g)*B,E=(m-w)*B}else if(d>p&&d>f){const B=2*Math.sqrt(1+d-p-f);b=(v-l)/B,S=.25*B,_=(w+m)/B,E=(u+g)/B}else if(p>f){const B=2*Math.sqrt(1+p-d-f);b=(u-g)/B,S=(w+m)/B,_=.25*B,E=(v+l)/B}else{const B=2*Math.sqrt(1+f-d-p);b=(m-w)/B,S=(u+g)/B,_=(v+l)/B,E=.25*B}return{x:S,y:_,z:E,w:b}}function gc(e,t){if(e.length===0)return t.length;if(t.length===0)return e.length;const r=[];for(let n=0;n<=t.length;n++)r[n]=[n];for(let n=0;n<=e.length;n++)r[0][n]=n;for(let n=1;n<=t.length;n++)for(let i=1;i<=e.length;i++){const s=e[i-1]===t[n-1]?0:1;r[n][i]=Math.min(r[n-1][i]+1,r[n][i-1]+1,r[n-1][i-1]+s)}return r[t.length][e.length]}function bi(e,t){const r=Qe(e);let n=null,i=1/0;for(const s of t){const o=Qe(s);if(r===o||r.endsWith(o)||r.endsWith("-"+o))return s;const a=gc(r,o),c=Math.max(r.length,o.length),u=Math.ceil(c*.5);a<i&&a<=u&&(i=a,n=s)}return n}function yc(e){const t=[],r=/<!--[\s\S]*?-->|<\/?\s*(\w+)[^>]*\/?>/g;let n=0,i;for(;(i=r.exec(e))!==null;){const s=e.slice(n,i.index);/\n\s*\n/.test(s)&&t.push({type:"blank",value:""}),n=i.index+i[0].length;const o=i[0];if(o.startsWith("<!--")){const a=o.slice(4,-3).trim();t.push({type:"comment",value:a})}else if(o.startsWith("</")){const a=o.match(/<\/\s*(\w+)/)?.[1]??"";t.push({type:"close",value:o,tagName:a})}else{const a=o.endsWith("/>"),u=o.match(/<\s*(\w+)/)?.[1]??"",l=bc(o);t.push({type:"open",value:o,selfClosing:a,tagName:u,attrs:l})}}return t}function bc(e){const t={},r=/([^\s=<>\/]+)(?:\s*=\s*"([^"]*)")?/g,n=e.replace(/^<\s*\w+/,"").replace(/\/?>$/,"");let i;for(;(i=r.exec(n))!==null;){const s=i[1],o=i[2]??"";t[s]=o}return t}function wc(e){if(e.match(/<[^>]*$/))throw new Error("xml parse error: Unclosed tag at end of document");const r=yc(e);for(const c of r)if(c.type==="open"&&c.tagName!=="scene"&&c.tagName!=="a"){const u=c.tagName??"unknown";if(u.toLowerCase()==="a"||u.toLowerCase()==="scene")continue;throw new Error(`xml parse error: Unknown tag <${u}>`)}const n=[],i=[];let s=0,o=[],a=!1;for(;s<r.length;){const c=r[s];if(c.type==="blank"){a=!0,s++;continue}if(c.type==="comment"){o.push(c.value),s++;continue}if(c.type==="open"&&c.tagName==="scene"){o=[],a=!1,s++;continue}if(c.type==="close"&&c.tagName==="scene"){s++;continue}if(c.type==="open"&&c.tagName==="a"){const u=zs(r,s,i);u.node&&(u.node.comments=o.length>0?o:void 0,u.node.blankBefore=a||void 0,n.push(u.node)),o=[],a=!1,s=u.nextIndex;continue}if(c.type==="open"&&c.tagName?.toLowerCase()==="scene")throw new Error(`Invalid tag "${c.tagName}". Use lowercase <scene>`);if(c.type==="open"&&c.tagName?.toLowerCase()==="a"&&c.tagName!=="a")throw new Error(`Invalid tag "${c.tagName}". Use lowercase <a>`);s++}if(i.length>0)throw new Error(i.map(c=>c.message).join(`
`));return n}function zs(e,t,r){const n=e[t];if(n.type!=="open"||n.tagName!=="a")return n.tagName?.toLowerCase()==="a"&&r.push({message:`Invalid tag "${n.tagName}". Use lowercase <a>`}),{node:null,nextIndex:t+1};const i=n.attrs??{},s=[];let o;for(const[u,l]of Object.entries(i))u==="id"?o=l:s.push({name:u,value:l});const a=[];let c=t+1;if(!n.selfClosing){let u=[],l=!1;for(;c<e.length;){const f=e[c];if(f.type==="blank"){l=!0,c++;continue}if(f.type==="comment"){u.push(f.value),c++;continue}if(f.type==="close"&&f.tagName==="a"){c++;break}if(f.type==="open"&&f.tagName==="a"){const h=zs(e,c,r);h.node&&(h.node.comments=u.length>0?u:void 0,h.node.blankBefore=l||void 0,a.push(h.node)),u=[],l=!1,c=h.nextIndex;continue}c++}}return{node:{id:o,attrs:s,children:a},nextIndex:c}}const Ds=[];function Wn(e){Ds.push(e)}function vc(e,t){const r=new Map,n=new Map,i=[],s=[],o=[];for(const c of e)Ls(t,c,r,n,void 0,s);for(const{node:c,eid:u,parent:l}of s){l!==void 0&&_t(t.world,u,J(le.relation,l));const{componentAttrs:f,refs:h,unknown:d}=xc(c.attrs);for(const m of d){const g=c.id?` (id="${c.id}")`:"";i.push({message:`Unknown component "${m.name}"${g}`})}for(const m of h)_c(t,u,m,r,i);for(const m of f)Cc(t,u,m,i,o)}for(const c of o){const u=r.get(c.targetName);if(u===void 0){i.push({message:`Unknown entity: "@${c.targetName}"`});continue}Cn(c.component,c.field,c.eid,u)}const a={getEntityByName:c=>r.get(c)??null};for(const c of Ds)c(t,a);if(i.length>0)throw new Error(i.map(c=>c.message).join(`
`));return n}function xc(e){const t=[],r=[],n=[];for(const i of e){if(i.value.startsWith("@")&&i.value.length>1){r.push({attr:i.name,target:i.value.slice(1)});continue}const s=Ns(i.name);if(s){t.push({name:i.name,value:i.value,def:s});continue}n.push({name:i.name,value:i.value})}return{componentAttrs:t,refs:r,unknown:n}}function Ls(e,t,r,n,i,s){const o=e.addEntity();t.id&&r.set(t.id,o),n.set(t,o),s.push({node:t,eid:o,parent:i});for(const a of t.children)Ls(e,a,r,n,o,s);return o}function _c(e,t,r,n,i){const s=cc(r.attr);if(!s){i.push({message:`Unknown relation: "${r.attr}"`});return}const o=n.get(r.target);if(o===void 0){i.push({message:`Unknown entity: "@${r.target}"`});return}e.addRelation(t,s,o)}function Cc(e,t,r,n,i){const{def:s,value:o}=r,{component:a,name:c,traits:u}=s;e.addComponent(t,a);const l=u?.defaults?.()??{};for(const[m,g]of Object.entries(l))Cn(a,m,t,g);const f={};o!==""&&(f._value=o);let h,d=[];if(u?.adapter)h=u.adapter(f,t);else{const m=Sc(s,f);h=m.values,d=m.entityRefs;for(const g of m.errors)n.push({message:`<${c}> ${g}`})}for(const[m,g]of Object.entries(h))Cn(a,m,t,g);for(const m of d)i.push({eid:t,component:a,field:m.field,targetName:m.targetName})}function Sc(e,t){const r={},n=[],i=[];if(t._value&&wi(t._value)){const s=en(e.name,t._value,e.component);Object.assign(r,s.values),n.push(...s.entityRefs),i.push(...s.errors)}for(const[s,o]of Object.entries(t))if(s!=="_value"&&o)if(wi(o)){const a=en(e.name,o,e.component);Object.assign(r,a.values),n.push(...a.entityRefs),i.push(...a.errors)}else{const a=en(e.name,`${s}: ${o}`,e.component);Object.assign(r,a.values),n.push(...a.entityRefs),i.push(...a.errors)}return{values:r,entityRefs:n,errors:i}}function Cn(e,t,r,n){const i=e[t];i!=null&&(ArrayBuffer.isView(i)||Array.isArray(i))&&(i[r]=n)}function Us(e,t){return`${t}X`in e&&`${t}Y`in e}function Vs(e,t){return Us(e,t)&&`${t}Z`in e}function Tc(e,t){return Vs(e,t)&&`${t}W`in e}function Ec(e){if(e=e.trim(),e.startsWith("0x")||e.startsWith("0X"))return parseInt(e,16);if(e.startsWith("#"))return parseInt(e.slice(1),16);if(e==="true")return 1;if(e==="false")return 0;const t=parseFloat(e);return isNaN(t)?null:t}function Pc(e){const t=[],r=e.trim();let n=0;for(let i=0;i<=r.length;i++){const s=i<r.length&&/\s/.test(r[i]),o=i===r.length;(s||o)&&(n<i&&t.push(Ec(r.slice(n,i))),n=i+1)}return t}function Bc(e){const t=[];let r=0;for(let n=0;n<=e.length;n++)if(n===e.length||e[n]===";"){const i=e.slice(r,n).trim();i&&t.push(i),r=n+1}return t}function en(e,t,r){const n={},i=[],s=[],o=Bc(t);for(const a of o){const c=a.indexOf(":");if(c===-1){s.push(`Invalid syntax: "${a}" (expected "field: value")`);continue}const u=a.slice(0,c).trim(),l=a.slice(c+1).trim();if(!u||!l){s.push(`Invalid syntax: "${a}" (empty field or value)`);continue}const f=Ms(u);if(l.startsWith("@")&&l.length>1){if(f in r)i.push({field:f,targetName:l.slice(1)});else{const y=Object.keys(r),w=bi(u,y);w?s.push(`${e}: unknown field "${u}", did you mean "${Qe(w)}"?`):s.push(`${e}: unknown field "${u}"`)}continue}const h=Pc(l);if(h.some(y=>y===null)){s.push(`Invalid number in "${a}"`);continue}const d=h;if(Tc(r,f)){d.length===4?(n[`${f}X`]=d[0],n[`${f}Y`]=d[1],n[`${f}Z`]=d[2],n[`${f}W`]=d[3]):d.length===1?(n[`${f}X`]=d[0],n[`${f}Y`]=d[0],n[`${f}Z`]=d[0],n[`${f}W`]=d[0]):s.push(`${e}.${u}: expected 1 or 4 values, got ${d.length}`);continue}if(Vs(r,f)){d.length===3?(n[`${f}X`]=d[0],n[`${f}Y`]=d[1],n[`${f}Z`]=d[2]):d.length===1?(n[`${f}X`]=d[0],n[`${f}Y`]=d[0],n[`${f}Z`]=d[0]):s.push(`${e}.${u}: expected 1 or 3 values, got ${d.length}`);continue}if(Us(r,f)){d.length===2?(n[`${f}X`]=d[0],n[`${f}Y`]=d[1]):d.length===1?(n[`${f}X`]=d[0],n[`${f}Y`]=d[0]):s.push(`${e}.${u}: expected 1 or 2 values, got ${d.length}`);continue}if(f in r){d.length===1?n[f]=d[0]:s.push(`${e}.${u}: expected 1 value, got ${d.length}`);continue}const m=Object.keys(r),g=bi(u,m);g?s.push(`${e}: unknown field "${u}", did you mean "${Qe(g)}"?`):s.push(`${e}: unknown field "${u}"`)}return{values:n,entityRefs:i,errors:s}}function wi(e){return e.includes(":")&&(e.includes(";")||/^[\w-]+\s*:/.test(e))}const Ac=Object.freeze(Object.defineProperty({__proto__:null,load:vc,parse:wc,registerPostLoadHook:Wn},Symbol.toStringTag,{value:"Module"}));function Ic(e){const t=[],r=new Map;for(const n of e)for(const i of n.outputs)r.set(i.id,n);for(const n of e)for(const i of n.inputs){const s=r.get(i.id);s&&s!==n&&t.push([s,n])}return t}function Mc(e){if(e.length===0)return[];const t=Ic(e),r=new Map,n=new Map;for(const a of e)r.set(a,[]),n.set(a,0);for(const[a,c]of t)r.get(a).push(c),n.set(c,n.get(c)+1);const i=[];for(const a of e)n.get(a)===0&&i.push(a);const s=[];let o=0;for(;o<i.length;){const a=i[o++];s.push(a);for(const c of r.get(a)){const u=n.get(c)-1;n.set(c,u),u===0&&i.push(c)}}if(s.length!==e.length)throw new Bs;return s}function kc(e){return e.length===0?{sorted:[]}:{sorted:Mc(e)}}class Fc{constructor(){this.nodes=new Map,this._plan=null}get planCached(){return this._plan!==null}add(t){if(this.nodes.has(t.id))throw new Error(`Node '${t.id}' already exists`);this.nodes.set(t.id,t),this._plan=null}set(t,r){if(r.id!==t)throw new Error(`Node id '${r.id}' must match slot id '${t}'`);this.nodes.set(t,r),this._plan=null}remove(t){const r=this.nodes.delete(t);return r&&(this._plan=null),r}compile(){return this._plan||(this._plan=kc(Array.from(this.nodes.values()))),this._plan}async prepare(t,r){const n=Array.from(this.nodes.values()).filter(a=>a.prepare),i=n.length;let s=0;const o=n.map(async a=>{await a.prepare(t),s++,r?.(s,i)});await Promise.all(o)}}const He=Ie("canvas");function Qn(e,t){return e.createBuffer({label:"entityIds",size:t*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC})}async function Nc(){if(!navigator.gpu)throw new Error("WebGPU not supported");const e=await navigator.gpu.requestAdapter();if(!e)throw new Error("No GPU adapter found");const t=e.limits.maxTextureDimension2D,r=await e.requestDevice({requiredLimits:{maxTextureDimension2D:t}});return r.lost.then(n=>{console.error(`GPU device lost: ${n.reason}`,n.message)}),r.onuncapturederror=n=>{console.error("GPU uncaptured error:",n.error)},r}const ve=Ie("compute"),vi=1;function xi(e){const t=window.devicePixelRatio||1,r=e.getBoundingClientRect(),n=Math.max(vi,Math.floor(r.width*t)),i=Math.max(vi,Math.floor(r.height*t));(e.width!==n||e.height!==i)&&(e.width=n,e.height=i)}let sr=null,ut=null;const Oc={group:"draw",setup(e){const t=He.from(e);t&&(ut=t.element,xi(ut),sr=new ResizeObserver(()=>{ut&&xi(ut)}),sr.observe(ut))},update(e){const t=ve.from(e),r=He.from(e);if(!t||!r)return;const{device:n,graph:i,resources:s}=t,{context:o,format:a}=r,c=i.compile();if(c.sorted.length===0)return;const l=o.getCurrentTexture().createView(),f={device:n,queue:n.queue,encoder:null,context:o,format:a,canvasView:l,getTexture(d){return s.textures.get(d)??null},getTextureView(d){return s.textureViews.get(d)??null},getBuffer(d){return s.buffers.get(d)??null},setTexture(d,m){s.textures.set(d,m)},setTextureView(d,m){s.textureViews.set(d,m)},setBuffer(d,m){s.buffers.set(d,m)}};let h=n.createCommandEncoder();f.encoder=h;for(const d of c.sorted)d.execute(f),d.sync&&(n.queue.submit([h.finish()]),h=n.createCommandEncoder(),f.encoder=h);n.queue.submit([h.finish()]),t.frameIndex++},dispose(){sr?.disconnect(),sr=null,ut=null}},er={systems:[Oc],async initialize(e,t){const r=He.from(e);if(!r)return;const n=await Nc(),{context:i,format:s}=r;i.configure({device:n,format:s,alphaMode:"premultiplied"});const o=new Fc,a={textures:new Map,textureViews:new Map,buffers:new Map};e.setResource(ve,{device:n,graph:o,resources:a,frameIndex:0}),t?.(1)}};function Rc(e,t){const r=t.getContext("webgpu"),n=navigator.gpu.getPreferredCanvasFormat();t.style.imageRendering="pixelated",e.setResource(He,{element:t,context:r,format:n})}const Gs=Ie("activity");function zc(e){const t=[];let r,n;const i=()=>{const s=t[t.length-1];t.length>0&&e?(r&&n!==s&&(r(),r=void 0),r||(r=e.show(s),n=s)):t.length===0&&r&&(r(),r=void 0,n=void 0)};return{get active(){return t.length>0},get message(){return t[t.length-1]},acquire(s){t.push(s),i();let o=!1;return()=>{if(o)return;o=!0;const a=t.lastIndexOf(s);a!==-1&&t.splice(a,1),i()}}}}const Dc={track:"rgba(51, 51, 51, 0.5)",accent:"#c0b8b0"};function Lc(e,t){return{show(r){const n=document.createElement("div"),i=document.createElement("div"),s=()=>{const c=e.getBoundingClientRect(),u=e.parentElement?.getBoundingClientRect();if(!u)return;const l=u.bottom-c.bottom+12,f=u.right-c.right+12;n.style.cssText=`
                    position: absolute;
                    bottom: ${l}px;
                    right: ${f}px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 8px;
                    z-index: 1000;
                    pointer-events: none;
                `,i.style.cssText=`
                    width: 20px;
                    height: 20px;
                    border: 2px solid ${t.track};
                    border-top-color: ${t.accent};
                    border-radius: 50%;
                    animation: shallot-activity-spin 0.8s linear infinite;
                `};if(s(),r){const c=document.createElement("div");c.textContent=r,c.style.cssText=`
                    font-family: system-ui, sans-serif;
                    font-size: 12px;
                    color: ${t.accent};
                    white-space: nowrap;
                    text-align: right;
                `,n.appendChild(c)}if(n.appendChild(i),!document.getElementById("shallot-activity-style")){const c=document.createElement("style");c.id="shallot-activity-style",c.textContent=`
                    @keyframes shallot-activity-spin {
                        to { transform: rotate(360deg); }
                    }
                `,document.head.appendChild(c)}const o=e.parentElement;o&&(getComputedStyle(o).position==="static"&&(o.style.position="relative"),o.appendChild(n));const a=new ResizeObserver(s);return a.observe(e),()=>{a.disconnect(),n.remove()}}}}const Uc=e=>Lc(e,Dc),Tr={spinner:null,initialize(e){const t=He.from(e),r=t&&Tr.spinner?Tr.spinner(t.element):null;e.setResource(Gs,zc(r))}},Sn=Ie("inputs"),Qt=new Set,Wr=new Set,Qr=new Set,ne={deltaX:0,deltaY:0,scroll:0,left:!1,right:!1,middle:!1},Vc={mouse:ne,isKeyDown:e=>Qt.has(e),isKeyPressed:e=>Wr.has(e),isKeyReleased:e=>Qr.has(e)};let oe=null,Ht=0,Xt=0,et=null,Nt=null;function _i(e){Qt.has(e.code)||Wr.add(e.code),Qt.add(e.code)}function Ci(e){Qt.delete(e.code),Qr.add(e.code)}function $s(e,t){e===0&&(ne.left=t),e===1&&(ne.middle=t),e===2&&(ne.right=t)}function Ws(){Nt!==null&&$s(Nt,!1),et=null,Nt=null,Ht=0,Xt=0}function Si(e){e.target===oe&&et===null&&(et=e.pointerId,Nt=e.button,Ht=e.clientX,Xt=e.clientY,$s(e.button,!0),oe.setPointerCapture(e.pointerId),e.preventDefault())}function Ti(e){e.pointerId===et&&(oe?.releasePointerCapture(e.pointerId),Ws())}function Ei(e){e.pointerId===et&&Ws()}function Pi(e){e.pointerId===et&&(e.preventDefault(),ne.deltaX+=e.clientX-Ht,ne.deltaY+=e.clientY-Xt,Ht=e.clientX,Xt=e.clientY)}function Bi(e){e.target===oe&&(ne.scroll+=e.deltaY,e.preventDefault())}function Ai(e){e.target===oe&&e.preventDefault()}function Gc(){Wr.clear(),Qr.clear(),ne.deltaX=0,ne.deltaY=0,ne.scroll=0}function $c(){Qt.clear(),Wr.clear(),Qr.clear(),ne.deltaX=0,ne.deltaY=0,ne.scroll=0,ne.left=!1,ne.right=!1,ne.middle=!1,et=null,Nt=null,Ht=0,Xt=0}const Wc={group:"simulation",setup(e){const t=He.from(e);t&&(oe=t.element,oe.style.touchAction="none",window.addEventListener("keydown",_i),window.addEventListener("keyup",Ci),oe.addEventListener("pointerdown",Si),window.addEventListener("pointerup",Ti),window.addEventListener("pointercancel",Ei),window.addEventListener("pointermove",Pi),oe.addEventListener("wheel",Bi,{passive:!1}),oe.addEventListener("contextmenu",Ai),e.setResource(Sn,Vc))},dispose(e){oe&&(window.removeEventListener("keydown",_i),window.removeEventListener("keyup",Ci),oe.removeEventListener("pointerdown",Si),window.removeEventListener("pointerup",Ti),window.removeEventListener("pointercancel",Ei),window.removeEventListener("pointermove",Pi),oe.removeEventListener("wheel",Bi),oe.removeEventListener("contextmenu",Ai),oe=null),$c(),e.deleteResource(Sn)}},Qc={group:"draw",last:!0,update(){Gc()}},Qs={systems:[Wc,Qc]},Hs=e=>e,Hc=e=>e*e,Xc=e=>e*(2-e),Yc=e=>e<.5?2*e*e:-1+(4-2*e)*e,qc=e=>e*e*e,Zc=e=>--e*e*e+1,jc=e=>e<.5?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1,Kc=e=>e*e*e*e,Jc=e=>1- --e*e*e*e,eu=e=>e<.5?8*e*e*e*e:1-8*--e*e*e*e,tu=e=>e*e*e*e*e,ru=e=>1+--e*e*e*e*e,nu=e=>e<.5?16*e*e*e*e*e:1+16*--e*e*e*e*e,iu=e=>1-Math.cos(e*Math.PI/2),su=e=>Math.sin(e*Math.PI/2),ou=e=>-(Math.cos(Math.PI*e)-1)/2,au=e=>e===0?0:Math.pow(2,10*e-10),cu=e=>e===1?1:1-Math.pow(2,-10*e),uu=e=>e===0?0:e===1?1:e<.5?Math.pow(2,20*e-10)/2:(2-Math.pow(2,-20*e+10))/2,lu=e=>1-Math.sqrt(1-e*e),du=e=>Math.sqrt(1- --e*e),fu=e=>e<.5?(1-Math.sqrt(1-4*e*e))/2:(Math.sqrt(1-(-2*e+2)*(-2*e+2))+1)/2,hu=e=>(1.70158+1)*e*e*e-1.70158*e*e,mu=e=>1+(1.70158+1)*Math.pow(e-1,3)+1.70158*Math.pow(e-1,2),pu=e=>{const t=2.5949095;return e<.5?Math.pow(2*e,2)*((t+1)*2*e-t)/2:(Math.pow(2*e-2,2)*((t+1)*(e*2-2)+t)+2)/2},gu=e=>e===0?0:e===1?1:-Math.pow(2,10*e-10)*Math.sin((e*10-10.75)*(2*Math.PI/3)),yu=e=>e===0?0:e===1?1:Math.pow(2,-10*e)*Math.sin((e*10-.75)*(2*Math.PI/3))+1,bu=e=>e===0?0:e===1?1:e<.5?-(Math.pow(2,20*e-10)*Math.sin((20*e-11.125)*(2*Math.PI/4.5)))/2:Math.pow(2,-20*e+10)*Math.sin((20*e-11.125)*(2*Math.PI/4.5))/2+1,Er=e=>e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375,wu=e=>1-Er(1-e),vu=e=>e<.5?(1-Er(1-2*e))/2:(1+Er(2*e-1))/2,xu=[Hs,Hc,Xc,Yc,qc,Zc,jc,Kc,Jc,eu,tu,ru,nu,iu,su,ou,au,cu,uu,lu,du,fu,hu,mu,pu,gu,yu,bu,wu,Er,vu],_u={linear:0,"ease-in-quad":1,"ease-out-quad":2,"ease-in-out-quad":3,"ease-in-cubic":4,"ease-out-cubic":5,"ease-in-out-cubic":6,"ease-in-quart":7,"ease-out-quart":8,"ease-in-out-quart":9,"ease-in-quint":10,"ease-out-quint":11,"ease-in-out-quint":12,"ease-in-sine":13,"ease-out-sine":14,"ease-in-out-sine":15,"ease-in-expo":16,"ease-out-expo":17,"ease-in-out-expo":18,"ease-in-circ":19,"ease-out-circ":20,"ease-in-out-circ":21,"ease-in-back":22,"ease-out-back":23,"ease-in-out-back":24,"ease-in-elastic":25,"ease-out-elastic":26,"ease-in-out-elastic":27,"ease-in-bounce":28,"ease-out-bounce":29,"ease-in-out-bounce":30};function Cu(e){return _u[e]??0}function Su(e){return xu[e]??Hs}const Tu=(e,t)=>e-t,Eu=(e,t)=>e.endTime-t.endTime,or=[],ar=[],Pr={duration:[]};$(Pr,{defaults:()=>({duration:.5})});const fe={IDLE:0,PLAYING:1,COMPLETE:2},Y={state:[],elapsed:[]};$(Y,{defaults:()=>({state:fe.IDLE,elapsed:0})});function Pu(e,t){or.length=0;for(const r of e.query([J(le.relation,t)]))or.push(r);return or.sort(Tu),or}function Xs(e,t){const r=Pu(e,t);let n=0;for(const i of r)e.hasComponent(i,Pr)?n+=Pr.duration[i]??0:e.hasComponent(i,O)&&(O.delay[i]=n)}function Bu(e,t){for(const r of e.query([Y])){if(Y.state[r]!==fe.PLAYING)continue;const n=Y.elapsed[r]??0;n===0&&Xs(e,r);const i=n+t;Y.elapsed[r]=i;for(const s of e.query([J(le.relation,r),O])){if(O.state[s]!==he.IDLE)continue;const o=O.delay[s]??0,a=i>=o,c=n>=o;a&&(zu(e,s),O.state[s]=he.PLAYING,O.elapsed[s]=c?0:i-o-t)}}}function Au(e,t){Xs(e,t),ar.length=0;for(const r of e.query([J(le.relation,t),O])){if(O.state[r]===he.COMPLETE&&O.elapsed[r]>=O.duration[r])continue;const n=O.delay[r]??0,i=O.duration[r]??0;ar.push({eid:r,endTime:n+i})}ar.sort(Eu);for(const{eid:r}of ar)O.state[r]=he.COMPLETE,qs(e,r)}function Iu(e){for(const t of e.query([Y]))Y.state[t]===fe.COMPLETE&&Au(e,t)}function Mu(e){for(const t of e.query([Y])){if(Y.state[t]!==fe.PLAYING)continue;let r=!0,n=!1;for(const i of e.query([J(le.relation,t),O]))if(n=!0,O.state[i]!==he.COMPLETE){r=!1;break}n&&r&&(Y.state[t]=fe.COMPLETE)}}const Ys=new Map;function ku(e,t,r){const n=Ns(t);if(!n)return null;const i=Ms(r),s=n.component[i];if(s==null)return null;let o;if(typeof s=="object"&&typeof s.get=="function"&&typeof s.set=="function")o=s;else if(ArrayBuffer.isView(s)||Array.isArray(s)){const a=s;o={get:c=>a[c],set:(c,u)=>{a[c]=u}}}else return null;return Ys.set(e,o),o}function Hn(e){return Ys.get(e)}function Fu(e){if(e._value){const t={};for(const r of e._value.split(";")){const n=r.indexOf(":");if(n===-1)continue;const i=r.slice(0,n).trim(),s=r.slice(n+1).trim();i&&s&&(t[i]=s)}return t}return e}const he={IDLE:0,PLAYING:1,COMPLETE:2},O={state:[],from:[],to:[],duration:[],elapsed:[],delay:[],easingIndex:[]};$(O,{defaults:()=>({state:he.IDLE,from:0,to:0,duration:1,elapsed:0,delay:0,easingIndex:0}),adapter:(e,t)=>{const r=Fu(e),n={};return r.duration&&(n.duration=parseFloat(r.duration)),r.delay&&(n.delay=parseFloat(r.delay)),r.easing&&(n.easingIndex=Cu(r.easing)),r.target&&Ou(r,t),n}});const tr=Rs("tween-target",{exclusive:!0});function Nu(e){if(!e.startsWith("@"))return null;const t=e.slice(1),r=t.indexOf(".");if(r===-1)return null;const n=t.slice(0,r),i=t.slice(r+1),s=i.lastIndexOf(".");return s===-1?null:{entity:n,component:i.slice(0,s),field:i.slice(s+1)}}let Tn=[];function Ou(e,t){Tn.push({tweenEid:t,target:e.target,to:e.to})}function Ru(e,t){for(const r of Tn){const n=Nu(r.target);if(!n)continue;const i=t.getEntityByName(n.entity);if(i===null||!ku(r.tweenEid,n.component,n.field))continue;e.addRelation(r.tweenEid,tr,i);const o=r.to.startsWith("0x")||r.to.startsWith("0X")?parseInt(r.to,16):parseFloat(r.to);if(!Number.isFinite(o))throw new Error(`Tween has invalid 'to' value: "${r.to}" (parsed as ${o})`);O.to[r.tweenEid]=o}Tn=[]}function zu(e,t){const r=e.getFirstRelationTarget(t,tr),n=Hn(t);n&&r>=0&&(O.from[t]=n.get(r)??0)}function qs(e,t){const r=O.elapsed[t],n=O.duration[t];if(n>0&&r>=n)return;const i=e.getFirstRelationTarget(t,tr),s=Hn(t);if(s&&i>=0){const o=O.to[t];if(!Number.isFinite(o))throw new Error(`Tween ${t} has invalid to value: ${o}`);O.from[t]=s.get(i)??0,s.set(i,o)}O.elapsed[t]=n}function Du(e,t){for(const r of e.query([O])){const n=O.state[r];if(n===he.COMPLETE){qs(e,r);continue}if(n!==he.PLAYING)continue;const i=e.getFirstRelationTarget(r,tr),s=Hn(r);O.elapsed[r]===0&&s&&i>=0&&(O.from[r]=s.get(i)??0),O.elapsed[r]+=t;const o=O.elapsed[r],a=O.duration[r],c=a<=0?1:Math.min(o/a,1);if(!Number.isFinite(c))throw new Error(`Tween ${r} invalid progress: elapsed=${o}, duration=${a}, dt=${t}`);const l=Su(O.easingIndex[r])(c),f=O.from[r],h=O.to[r],d=f+(h-f)*l;if(!Number.isFinite(d))throw new Error(`Tween ${r} computed NaN: from=${f}, to=${h}, eased=${l}, raw=${c}`);s&&i>=0&&s.set(i,d),c>=1&&(O.state[r]=he.COMPLETE)}}const Lu={group:"simulation",update(e){const t=e.time.deltaTime;Iu(e),Bu(e,t),Du(e,t),Mu(e)}},p0={systems:[Lu],components:{Tween:O,Sequence:Y,Pause:Pr},relations:[tr],initialize(){Wn(Ru)}};let j;function Uu(e){j.compute_transforms(e)}function Vu(){return j.get_indices_ptr()>>>0}function Gu(){return j.get_matrices_ptr()>>>0}function $u(){return j.get_max_entities()>>>0}function Wu(){return j.get_no_parent()>>>0}function Qu(){return j.get_parents_ptr()>>>0}function Hu(){return j.get_pos_x_ptr()>>>0}function Xu(){return j.get_pos_y_ptr()>>>0}function Yu(){return j.get_pos_z_ptr()>>>0}function qu(){return j.get_quat_w_ptr()>>>0}function Zu(){return j.get_quat_x_ptr()>>>0}function ju(){return j.get_quat_y_ptr()>>>0}function Ku(){return j.get_quat_z_ptr()>>>0}function Ju(){return j.get_scale_x_ptr()>>>0}function el(){return j.get_scale_y_ptr()>>>0}function tl(){return j.get_scale_z_ptr()>>>0}function rl(){j.init_data()}const nl=new Set(["basic","cors","default"]);async function il(e,t){if(typeof Response=="function"&&e instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(e,t)}catch(n){if(e.ok&&nl.has(e.type)&&e.headers.get("Content-Type")!=="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",n);else throw n}const r=await e.arrayBuffer();return await WebAssembly.instantiate(r,t)}else{const r=await WebAssembly.instantiate(e,t);return r instanceof WebAssembly.Instance?{instance:r,module:e}:r}}function sl(){const e={};return e.wbg={},e}function ol(e,t){return j=e.exports,Zs.__wbindgen_wasm_module=t,j}async function Zs(e){if(j!==void 0)return j;typeof e<"u"&&(Object.getPrototypeOf(e)===Object.prototype?{module_or_path:e}=e:console.warn("using deprecated parameters for the initialization function; pass a single object instead")),typeof e>"u"&&(e=new URL(""+new URL("shallot_transforms_bg-BwlCOcZ8.wasm",import.meta.url).href,import.meta.url));const t=sl();(typeof e=="string"||typeof Request=="function"&&e instanceof Request||typeof URL=="function"&&e instanceof URL)&&(e=fetch(e));const{instance:r,module:n}=await il(await e,t);return ol(r,n)}let En,js,Ks,Js,eo,to,ro,no,io,so,oo,Pn,Bn,ao;async function al(){if(En)return;const e=await Zs();rl();const t=e.memory.buffer,r=$u();En=new Float32Array(t,Hu(),r),js=new Float32Array(t,Xu(),r),Ks=new Float32Array(t,Yu(),r),Js=new Float32Array(t,Zu(),r),eo=new Float32Array(t,ju(),r),to=new Float32Array(t,Ku(),r),ro=new Float32Array(t,qu(),r),no=new Float32Array(t,Ju(),r),io=new Float32Array(t,el(),r),so=new Float32Array(t,tl(),r),oo=new Float32Array(t,Gu(),r*16),Pn=new Uint32Array(t,Vu(),r),Bn=new Uint32Array(t,Qu(),r),ao=Wu()}function cl(e){Uu(e)}function tn(e){function t(n){return yi(z.quatX[n],z.quatY[n],z.quatZ[n],z.quatW[n])[e]}function r(n,i){const s=yi(z.quatX[n],z.quatY[n],z.quatZ[n],z.quatW[n]);s[e]=i;const o=uc(s.x,s.y,s.z);z.quatX[n]=o.x,z.quatY[n]=o.y,z.quatZ[n]=o.z,z.quatW[n]=o.w}return new Proxy([],{get(n,i){if(i==="get")return t;if(i==="set")return r;const s=Number(i);if(!Number.isNaN(s))return t(s)},set(n,i,s){const o=Number(i);return Number.isNaN(o)?!1:(r(o,s),!0)}})}const z={posX:new Float32Array(I),posY:new Float32Array(I),posZ:new Float32Array(I),quatX:new Float32Array(I),quatY:new Float32Array(I),quatZ:new Float32Array(I),quatW:new Float32Array(I),scaleX:new Float32Array(I),scaleY:new Float32Array(I),scaleZ:new Float32Array(I),eulerX:tn("x"),eulerY:tn("y"),eulerZ:tn("z")},tt={data:new Float32Array(I*16)};$(z,{defaults:()=>({posX:0,posY:0,posZ:0,quatX:0,quatY:0,quatZ:0,quatW:1,scaleX:1,scaleY:1,scaleZ:1})});async function ul(){await al(),z.posX=En,z.posY=js,z.posZ=Ks,z.quatX=Js,z.quatY=eo,z.quatZ=to,z.quatW=ro,z.scaleX=no,z.scaleY=io,z.scaleZ=so,tt.data=oo}const ll={group:"simulation",last:!0,update(e){for(const r of e.query([z,vn(tt)]))e.addComponent(r,tt);let t=0;for(const r of e.query([z,vn(le.relation(ie))]))Pn[t]=r,Bn[t]=ao,t++;for(const r of e.query([z,le.relation(ie),Ga(le.relation)]))Pn[t]=r,Bn[t]=e.getRelationTargets(r,le)[0],t++;cl(t)}},dl={systems:[ll],components:{Transform:z,WorldTransform:tt},async initialize(e,t){await ul(),t?.(1)}},fl={Raster:0},Xn={Perspective:0,Orthographic:1},W={fov:[],near:[],far:[],active:[],clearColor:[],renderMode:[],mode:[],size:[]};$(W,{defaults:()=>({fov:60,near:.1,far:1e3,active:1,clearColor:1710618,renderMode:fl.Raster,mode:Xn.Perspective,size:5})});const Br={exposure:[]};$(Br,{defaults:()=>({exposure:1})});const co={},Ii={},dt={strength:[],inner:[],outer:[]};$(dt,{defaults:()=>({strength:.5,inner:.4,outer:.8})});const ft={intensity:[],threshold:[],radius:[]};$(ft,{defaults:()=>({intensity:.15,threshold:0,radius:.5})});const Ar={bands:[]};$(Ar,{defaults:()=>({bands:8})});const Ot={softness:[],samples:[]};$(Ot,{defaults:()=>({softness:.5,samples:1})});const Ir={depth:[]};$(Ir,{defaults:()=>({depth:1})});const Mr={depth:[]};$(Mr,{defaults:()=>({depth:2})});const Rt={density:[],color:[]};$(Rt,{defaults:()=>({density:.005,color:4225232})});const gt={zenith:[],horizon:[]};$(gt,{defaults:()=>({zenith:4225232,horizon:4233432})});const qe={phase:[],glow:[],azimuth:[],elevation:[]};$(qe,{defaults:()=>({phase:.5,glow:.3,azimuth:45,elevation:30})});const zt={intensity:[],amount:[]};$(zt,{defaults:()=>({intensity:.8,amount:.5})});const Ze={coverage:[],density:[],height:[],color:[]};$(Ze,{defaults:()=>({coverage:.7,density:.8,height:.5,color:16777215})});const ht={size:[],glow:[],color:[]};$(ht,{defaults:()=>({size:1,glow:.4,color:0})});const Dt={width:[],height:[]};$(Dt,{defaults:()=>({width:0,height:0})});function Mi(e){return{r:(e>>16&255)/255,g:(e>>8&255)/255,b:(e&255)/255}}const uo=new ArrayBuffer(512),A=new Float32Array(uo),cr=new Uint32Array(uo);function hl(e,t,r,n,i,s=0,o=1,a=0,c=0,u=0,l,f,h,d,m,g){const y=n/i,w=W.mode[r]===Xn.Orthographic?dc(W.size[r],y,W.near[r],W.far[r]):lc(W.fov[r],y,W.near[r],W.far[r]),p=tt.data.subarray(r*16,r*16+16),v=hc(p),x=fc(w,v);A.set(x,0),A.set(p,16);const b=W.clearColor[r];A[44]=(b>>16&255)/255,A[45]=(b>>8&255)/255,A[46]=(b&255)/255,A[47]=1,A[48]=W.mode[r],A[49]=W.size[r],A[50]=n,A[51]=i,A[52]=W.fov[r],A[53]=W.near[r],A[54]=W.far[r],A[55]=s,cr[56]=o,cr[57]=a,cr[58]=c,cr[59]=u,A[60]=l?.density??0,A[61]=0,A[62]=0,A[63]=0;const S=l?.color??8425648;A[64]=(S>>16&255)/255,A[65]=(S>>8&255)/255,A[66]=(S&255)/255,A[67]=1;const _=f?.zenith??0;A[68]=(_>>16&255)/255,A[69]=(_>>8&255)/255,A[70]=(_&255)/255,A[71]=f?1:0;const E=f?.horizon??0;A[72]=(E>>16&255)/255,A[73]=(E>>8&255)/255,A[74]=(E&255)/255,A[75]=1;const B=mc(x);A.set(B,76),A[100]=h?.phase??.5,A[101]=h?.glow??.3,A[102]=h?1:0,A[103]=0;const R=(h?.azimuth??45)*Math.PI/180,k=(h?.elevation??30)*Math.PI/180,q=Math.cos(k);A[104]=Math.sin(R)*q,A[105]=Math.sin(k),A[106]=Math.cos(R)*q,A[107]=0,A[108]=d?.intensity??.8,A[109]=d?.amount??.5,A[110]=d?1:0,A[111]=0,A[112]=m?.coverage??0,A[113]=m?.density??0,A[114]=m?.height??0,A[115]=m?1:0;const ee=m?.color??16777215;A[116]=(ee>>16&255)/255,A[117]=(ee>>8&255)/255,A[118]=(ee&255)/255,A[119]=0,A[120]=g?.size??1,A[121]=g?.glow??.5,A[122]=g&&g.color!==0?1:0,A[123]=0;const L=g?.color??16777215;A[124]=(L>>16&255)/255,A[125]=(L>>8&255)/255,A[126]=(L&255)/255,A[127]=0,e.queue.writeBuffer(t,0,A,0,32),e.queue.writeBuffer(t,176,A,44,84)}const Lt={color:[],intensity:[]};$(Lt,{defaults:()=>({color:8947848,intensity:1})});const De={color:[],intensity:[],directionX:[],directionY:[],directionZ:[]};$(De,{defaults:()=>({color:16777215,intensity:.8,directionX:-.6,directionY:-1,directionZ:-.8})});function ml(e,t,r){const n=Math.sqrt(e*e+t*t+r*r);return n<1e-4?[0,-1,0]:[e/n,t/n,r/n]}const ce=new Float32Array(12);function pl(e,t){const r=Mi(e.color);ce[0]=r.r,ce[1]=r.g,ce[2]=r.b,ce[3]=e.intensity;const[n,i,s]=ml(t.directionX,t.directionY,t.directionZ);ce[4]=n,ce[5]=i,ce[6]=s,ce[7]=0;const o=Mi(t.color);return ce[8]=o.r*t.intensity,ce[9]=o.g*t.intensity,ce[10]=o.b*t.intensity,ce[11]=0,ce}const An=20;function gl(e,t){return e.createBuffer({label:"indirect",size:t*An,usage:GPUBufferUsage.INDIRECT|GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC})}function ki(e,t,r,n){const i=r*An,s=new ArrayBuffer(An),o=new DataView(s);o.setUint32(0,n.indexCount,!0),o.setUint32(4,n.instanceCount,!0),o.setUint32(8,n.firstIndex,!0),o.setInt32(12,n.baseVertex,!0),o.setUint32(16,n.firstInstance,!0),e.queue.writeBuffer(t,i,s)}function yl(){const e=new Float32Array([-.5,-.5,.5,0,0,1,.5,-.5,.5,0,0,1,.5,.5,.5,0,0,1,-.5,.5,.5,0,0,1,.5,-.5,-.5,0,0,-1,-.5,-.5,-.5,0,0,-1,-.5,.5,-.5,0,0,-1,.5,.5,-.5,0,0,-1,-.5,.5,.5,0,1,0,.5,.5,.5,0,1,0,.5,.5,-.5,0,1,0,-.5,.5,-.5,0,1,0,-.5,-.5,-.5,0,-1,0,.5,-.5,-.5,0,-1,0,.5,-.5,.5,0,-1,0,-.5,-.5,.5,0,-1,0,.5,-.5,.5,1,0,0,.5,-.5,-.5,1,0,0,.5,.5,-.5,1,0,0,.5,.5,.5,1,0,0,-.5,-.5,-.5,-1,0,0,-.5,-.5,.5,-1,0,0,-.5,.5,.5,-1,0,0,-.5,.5,-.5,-1,0,0]),t=new Uint16Array([0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23]);return{vertices:e,indices:t,vertexCount:24,indexCount:36}}function bl(e=32,t=16){const r=[],n=[];for(let s=0;s<=t;s++){const a=s/t*Math.PI;for(let c=0;c<=e;c++){const l=c/e*Math.PI*2,f=Math.sin(a)*Math.cos(l),h=Math.cos(a),d=Math.sin(a)*Math.sin(l);r.push(f*.5,h*.5,d*.5,f,h,d)}}for(let s=0;s<t;s++)for(let o=0;o<e;o++){const a=s*(e+1)+o,c=a+e+1;n.push(a,a+1,c),n.push(a+1,c+1,c)}return{vertices:new Float32Array(r),indices:new Uint16Array(n),vertexCount:(t+1)*(e+1),indexCount:t*e*6}}function wl(){const e=new Float32Array([-.5,0,.5,0,1,0,.5,0,.5,0,1,0,.5,0,-.5,0,1,0,-.5,0,-.5,0,1,0]),t=new Uint16Array([0,1,2,0,2,3]);return{vertices:e,indices:t,vertexCount:4,indexCount:6}}const Fi=16;function vl(e){const t=[],r=[],n=[];let i=0,s=0,o=0;for(let d=0;d<Fi;d++){const m=kr(d);if(!m){n.push({vertexOffset:0,indexOffset:0,triCount:0,_pad:0});continue}const g=m.indexCount/3;n.push({vertexOffset:i,indexOffset:s,triCount:g,_pad:0});for(let y=0;y<m.vertices.length;y++)t.push(m.vertices[y]);for(let y=0;y<m.indices.length;y++)r.push(m.indices[y]);i+=m.vertices.length,s+=m.indices.length,o+=g}const a=new Float32Array(t),c=new Uint32Array(r),u=new Uint32Array(Fi*4);for(let d=0;d<n.length;d++)u[d*4]=n[d].vertexOffset,u[d*4+1]=n[d].indexOffset,u[d*4+2]=n[d].triCount,u[d*4+3]=0;const l=e.createBuffer({label:"unified-vertices",size:Math.max(a.byteLength,16),usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(l,0,a);const f=e.createBuffer({label:"unified-indices",size:Math.max(c.byteLength,16),usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(f,0,c);const h=e.createBuffer({label:"unified-meta",size:u.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});return e.queue.writeBuffer(h,0,u),{vertices:l,indices:f,meta:h,shapeCount:n.filter(d=>d.triCount>0).length,maxTriangles:o}}const lo=16,yt=64,xl=4294967295,Ni=new Uint32Array(I),kt=[];function _l(){kt.length===0&&(kt.push(yl()),kt.push(bl()),kt.push(wl()))}_l();const fo={Box:0,Sphere:1};function kr(e){return kt[e]}const ho={data:new Uint32Array(I).fill(xl)},Yn={data:new Float32Array(I*4)},mo={data:new Float32Array(I*4)},po={data:new Float32Array(I*4)},qn={data:new Float32Array(I*4)},go={data:new Uint8Array(I)},Cl={Solid:0};function Sl(){const e=Yn.data;function t(n){const i=n*4,s=Math.round(e[i]*255),o=Math.round(e[i+1]*255),a=Math.round(e[i+2]*255);return s<<16|o<<8|a}function r(n,i){const s=n*4;e[s]=(i>>16&255)/255,e[s+1]=(i>>8&255)/255,e[s+2]=(i&255)/255}return new Proxy([],{get(n,i){if(i==="get")return t;if(i==="set")return r;const s=Number(i);if(!Number.isNaN(s))return t(s)},set(n,i,s){const o=Number(i);return Number.isNaN(o)?!1:(r(o,s),!0)}})}function ur(e){const t=Yn.data;function r(i){return t[i*4+e]}function n(i,s){t[i*4+e]=s}return new Proxy([],{get(i,s){if(s==="get")return r;if(s==="set")return n;const o=Number(s);if(!Number.isNaN(o))return r(o)},set(i,s,o){const a=Number(s);return Number.isNaN(a)?!1:(n(a,o),!0)}})}function rn(e){const t=mo.data;function r(i){return t[i*4+e]}function n(i,s){t[i*4+e]=s}return new Proxy([],{get(i,s){if(s==="get")return r;if(s==="set")return n;const o=Number(s);if(!Number.isNaN(o))return r(o)},set(i,s,o){const a=Number(s);return Number.isNaN(a)?!1:(n(a,o),!0)}})}function nn(e,t){const r=po.data;function n(s){const o=r[s*4+e];return o===0&&e===0?t:o}function i(s,o){r[s*4+e]=o}return new Proxy([],{get(s,o){if(o==="get")return n;if(o==="set")return i;const a=Number(o);if(!Number.isNaN(a))return n(a)},set(s,o,a){const c=Number(o);return Number.isNaN(c)?!1:(i(c,a),!0)}})}function Tl(){const e=qn.data;function t(n){const i=n*4,s=Math.round(e[i]*255),o=Math.round(e[i+1]*255),a=Math.round(e[i+2]*255);return s<<16|o<<8|a}function r(n,i){const s=n*4;e[s]=(i>>16&255)/255,e[s+1]=(i>>8&255)/255,e[s+2]=(i&255)/255}return new Proxy([],{get(n,i){if(i==="get")return t;if(i==="set")return r;const s=Number(i);if(!Number.isNaN(s))return t(s)},set(n,i,s){const o=Number(i);return Number.isNaN(o)?!1:(r(o,s),!0)}})}function El(){const e=qn.data;function t(n){return e[n*4+3]}function r(n,i){e[n*4+3]=i}return new Proxy([],{get(n,i){if(i==="get")return t;if(i==="set")return r;const s=Number(i);if(!Number.isNaN(s))return t(s)},set(n,i,s){const o=Number(i);return Number.isNaN(o)?!1:(r(o,s),!0)}})}const Ct={shape:ho.data,color:Sl(),colorR:ur(0),colorG:ur(1),colorB:ur(2),opacity:ur(3),sizeX:rn(0),sizeY:rn(1),sizeZ:rn(2),roughness:nn(0,.9),metallic:nn(1,0),ior:nn(2,1),emission:Tl(),emissionIntensity:El(),volume:go.data};$(Ct,{defaults:()=>({shape:fo.Box,color:16777215,opacity:1,sizeX:1,sizeY:1,sizeZ:1,roughness:1,metallic:0,ior:1,emission:0,emissionIntensity:0,volume:Cl.Solid})});function Pl(e,t){const r=e.createBuffer({label:"vertex",size:t.vertices.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(r,0,t.vertices);const n=e.createBuffer({label:"index",size:t.indices.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});return e.queue.writeBuffer(n,0,t.indices),{vertex:r,index:n,indexCount:t.indexCount}}function Bl(e,t,r){for(let n=0;n<yt;n++)r[n]&&(r[n].length=0);for(const n of e){const i=Ct.shape[n],s=t(n),o=i*lo+s;if(o>=yt)continue;let a=r[o];a||(a=[],r[o]=a),a.push(n)}}function Al(e,t,r,n){for(let i=0;i<yt;i++){const s=t[i];if(!s||s.length===0){const a=r.batches[i];a&&(a.count=0,ki(e,n,i,{indexCount:0,instanceCount:0,firstIndex:0,baseVertex:0,firstInstance:0}));continue}let o=r.batches[i];if(!o){const a=Math.floor(i/lo);let c=r.buffers.get(a);if(!c){const u=kr(a)??kr(fo.Box);c=Pl(e,u),r.buffers.set(a,c)}o={buffers:c,entityIds:Qn(e,I),count:0},r.batches[i]=o}for(let a=0;a<s.length;a++)Ni[a]=s[a];e.queue.writeBuffer(o.entityIds,0,Ni,0,s.length),o.count=s.length,ki(e,n,i,{indexCount:o.buffers.indexCount,instanceCount:s.length,firstIndex:0,baseVertex:0,firstInstance:0})}}const yo=`
struct SurfaceData {
    baseColor: vec3<f32>,
    roughness: f32,
    metallic: f32,
    opacity: f32,
    emission: vec3<f32>,
    normal: vec3<f32>,
    worldPos: vec3<f32>,
}`,st=`
struct Scene {
    viewProj: mat4x4<f32>,
    cameraWorld: mat4x4<f32>,
    ambientColor: vec4<f32>,
    sunDirection: vec4<f32>,
    sunColor: vec4<f32>,
    clearColor: vec4<f32>,
    cameraMode: f32,
    cameraSize: f32,
    viewport: vec2<f32>,
    fov: f32,
    near: f32,
    far: f32,
    shadowSoftness: f32,
    shadowSamples: u32,
    reflectionDepth: u32,
    refractionDepth: u32,
    instanceCount: u32,
    hazeDensity: f32,
    _pad2: f32,
    _pad3: f32,
    _pad4: f32,
    hazeColor: vec4<f32>,
    skyZenith: vec4<f32>,
    skyHorizon: vec4<f32>,
    frustumPlanes: array<vec4<f32>, 6>,
    moonParams: vec4<f32>,
    moonDirection: vec4<f32>,
    starParams: vec4<f32>,
    cloudParams: vec4<f32>,
    cloudColor: vec4<f32>,
    sunParams: vec4<f32>,
    sunVisualColor: vec4<f32>,
}`,Il=`
struct Data {
    baseColor: vec4<f32>,
    pbr: vec4<f32>,
    emission: vec4<f32>,
    flags: u32,
    _pad0: u32,
    _pad1: u32,
    _pad2: u32,
}`,Ml=`
struct VertexInput {
    @location(0) position: vec3<f32>,
    @location(1) normal: vec3<f32>,
    @builtin(instance_index) instance: u32,
}

struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) color: vec4<f32>,
    @location(1) worldNormal: vec3<f32>,
    @location(2) @interpolate(flat) entityId: u32,
    @location(3) worldPos: vec3<f32>,
}

${yo}

struct FragmentOutput {
    @location(0) color: vec4<f32>,
    @location(1) entityId: u32,
}

${st}

@group(0) @binding(0) var<uniform> scene: Scene;
@group(0) @binding(1) var<storage, read> entityIds: array<u32>;
@group(0) @binding(2) var<storage, read> matrices: array<mat4x4<f32>>;
@group(0) @binding(3) var<storage, read> colors: array<vec4<f32>>;
@group(0) @binding(4) var<storage, read> sizes: array<vec4<f32>>;
@group(0) @binding(5) var<storage, read> pbr: array<vec4<f32>>;
@group(0) @binding(6) var<storage, read> emission: array<vec4<f32>>;
@group(0) @binding(7) var<storage, read> shapes: array<u32>;
`,kl=`
fn hash2(p: vec2<f32>) -> f32 {
    var p3 = fract(vec3(p.x, p.y, p.x) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

fn simplex2(p: vec2<f32>) -> f32 {
    let K1 = 0.366025404;
    let K2 = 0.211324865;

    let i = floor(p + (p.x + p.y) * K1);
    let a = p - i + (i.x + i.y) * K2;

    let o = select(vec2(0.0, 1.0), vec2(1.0, 0.0), a.x > a.y);
    let b = a - o + K2;
    let c = a - 1.0 + 2.0 * K2;

    let h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), vec3(0.0));
    let h4 = h * h * h * h;

    let n = vec3(
        dot(a, vec2(hash2(i) * 2.0 - 1.0, hash2(i + vec2(0.0, 1.0)) * 2.0 - 1.0)),
        dot(b, vec2(hash2(i + o) * 2.0 - 1.0, hash2(i + o + vec2(0.0, 1.0)) * 2.0 - 1.0)),
        dot(c, vec2(hash2(i + 1.0) * 2.0 - 1.0, hash2(i + vec2(1.0, 2.0)) * 2.0 - 1.0))
    );

    return dot(h4, n) * 70.0;
}

fn fbm2(p: vec2<f32>, octaves: i32) -> f32 {
    var value = 0.0;
    var amplitude = 0.5;
    var frequency = 1.0;
    var pos = p;

    for (var i = 0; i < octaves; i++) {
        value += amplitude * simplex2(pos * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
    }

    return value;
}
`;function bo(e){return e?`var pos = worldPos;
    ${e}
    return pos;`:"return worldPos;"}const Fl=`
fn hashStar(p: vec2<f32>) -> f32 {
    var p3 = fract(vec3(p.x, p.y, p.x) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

fn hash2Star(p: vec2<f32>) -> vec2<f32> {
    var p3 = fract(vec3(p.x, p.y, p.x) * vec3(0.1031, 0.1030, 0.0973));
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.xx + p3.yz) * p3.zy);
}

fn sampleStars(dir: vec3<f32>) -> vec3<f32> {
    if (scene.starParams.z <= 0.0 || dir.y < 0.0) {
        return vec3(0.0);
    }

    let theta = atan2(dir.z, dir.x);
    let phi = asin(clamp(dir.y, -1.0, 1.0));

    let gridSize = mix(20.0, 100.0, scene.starParams.y);
    let cell = vec2(theta * gridSize / 3.14159, phi * gridSize / 1.5708);
    let cellId = floor(cell);
    let cellFract = fract(cell);

    var starColor = vec3(0.0);

    for (var dy = -1; dy <= 1; dy++) {
        for (var dx = -1; dx <= 1; dx++) {
            let neighbor = cellId + vec2(f32(dx), f32(dy));
            let starHash = hashStar(neighbor);

            if (starHash > scene.starParams.y * 0.7) {
                continue;
            }

            let starPos = hash2Star(neighbor);
            let starCenter = neighbor + starPos;
            let dist = length(cell - starCenter);

            let brightness = hashStar(neighbor + vec2(100.0, 100.0));
            let radius = 0.02 + brightness * 0.03;

            if (dist < radius) {
                let twinkle = 0.8 + 0.2 * sin(brightness * 100.0);
                let intensity = scene.starParams.x * brightness * twinkle;
                let falloff = 1.0 - smoothstep(0.0, radius, dist);

                let temp = hashStar(neighbor + vec2(200.0, 200.0));
                let tint = mix(vec3(1.0, 0.9, 0.8), vec3(0.8, 0.9, 1.0), temp);

                starColor = max(starColor, tint * intensity * falloff);
            }
        }
    }

    return starColor;
}
`,Nl=`
fn sampleMoon(dir: vec3<f32>) -> vec3<f32> {
    if (scene.moonParams.z <= 0.0) {
        return vec3(0.0);
    }

    let moonDir = scene.moonDirection.xyz;
    let moonDot = dot(dir, moonDir);

    let moonSize = 0.9995;
    let moonColor = vec3(0.9, 0.9, 0.85);

    if (moonDot > moonSize) {
        let toCenter = dir - moonDir * moonDot;
        let diskRight = normalize(cross(moonDir, vec3(0.0, 1.0, 0.0)));
        let diskUp = cross(diskRight, moonDir);

        let diskRadius = sqrt(1.0 - moonSize * moonSize);
        let u = dot(toCenter, diskRight) / diskRadius;
        let v = dot(toCenter, diskUp) / diskRadius;

        let r2 = u * u + v * v;
        let z = sqrt(max(0.0, 1.0 - r2));

        let phase = scene.moonParams.x;
        let sunAngle = phase * 6.28318;
        let sunLocalX = sin(sunAngle);
        let sunLocalZ = -cos(sunAngle);

        let illumination = u * sunLocalX + z * sunLocalZ;
        let lit = select(0.15, 1.0, illumination > 0.0);

        return moonColor * lit;
    } else {
        let glowFalloff = max(0.0, moonDot - 0.99) / (moonSize - 0.99);
        let glow = pow(glowFalloff, 2.0) * scene.moonParams.y;
        return moonColor * glow * 0.3;
    }
}
`,Ol=`
${kl}

fn sampleClouds(dir: vec3<f32>) -> vec4<f32> {
    if (scene.cloudParams.w <= 0.0 || dir.y < 0.01) {
        return vec4(0.0);
    }

    let t = scene.cloudParams.z / max(dir.y, 0.001);
    let uv = dir.xz * t;

    var n = fbm2(uv, 5);

    let coverage = scene.cloudParams.x;
    let density = scene.cloudParams.y;
    n = smoothstep(1.0 - coverage, 1.0, n * 0.5 + 0.5) * density;

    n *= smoothstep(0.0, 0.15, dir.y);

    return vec4(scene.cloudColor.rgb, n);
}
`,Rl=Math.PI/180,wo=`
const DEG_TO_RAD: f32 = ${Rl};

fn computeSkyDir(screenX: f32, screenY: f32) -> vec3<f32> {
    let width = scene.viewport.x;
    let height = scene.viewport.y;

    let ndcX = screenX * 2.0 - 1.0;
    let ndcY = 1.0 - screenY * 2.0;

    let aspect = width / height;

    let cameraWorld = scene.cameraWorld;
    let r00 = cameraWorld[0][0]; let r10 = cameraWorld[0][1]; let r20 = cameraWorld[0][2];
    let r01 = cameraWorld[1][0]; let r11 = cameraWorld[1][1]; let r21 = cameraWorld[1][2];
    let r02 = cameraWorld[2][0]; let r12 = cameraWorld[2][1]; let r22 = cameraWorld[2][2];

    let skyFov = select(scene.fov, 60.0, scene.cameraMode > 0.5);
    let tanHalfFov = tan((skyFov * DEG_TO_RAD) / 2.0);
    let camDirX = ndcX * aspect * tanHalfFov;
    let camDirY = ndcY * tanHalfFov;
    let camDirZ = -1.0;
    var dirX = r00 * camDirX + r01 * camDirY + r02 * camDirZ;
    var dirY = r10 * camDirX + r11 * camDirY + r12 * camDirZ;
    var dirZ = r20 * camDirX + r21 * camDirY + r22 * camDirZ;
    let len = sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ);
    dirX /= len; dirY /= len; dirZ /= len;
    return vec3(dirX, dirY, dirZ);
}
`,vo=`
${Fl}
${Nl}
${Ol}

fn sampleSky(dir: vec3<f32>) -> vec3<f32> {
    if (scene.skyZenith.a <= 0.0) {
        return scene.clearColor.rgb;
    }

    let t = pow(clamp(dir.y, 0.0, 1.0), 0.25);
    var color = mix(scene.skyHorizon.rgb, scene.skyZenith.rgb, t);

    let horizonBand = 1.0 - abs(dir.y);
    let horizonBlend = pow(horizonBand, 32.0);
    color = mix(color, vec3(1.09), horizonBlend);

    color += sampleStars(dir);

    let clouds = sampleClouds(dir);
    color = mix(color, clouds.rgb, clouds.a);

    let moonContrib = sampleMoon(dir);
    color += moonContrib * (1.0 - clouds.a * 0.7);

    let sunDir = -scene.sunDirection.xyz;
    let sunDot = dot(dir, sunDir);

    let sunVisualColor = select(scene.sunColor.rgb, scene.sunVisualColor.rgb, scene.sunParams.z > 0.5);

    let baseSunSize = 0.9995;
    let sunSizeParam = scene.sunParams.x;
    let sunThreshold = 1.0 - (1.0 - baseSunSize) * sunSizeParam;

    if (sunDot > sunThreshold) {
        color = sunVisualColor;
    } else {
        let glow = max(0.0, sunDot);
        let glowParam = scene.sunParams.y;
        let glowIntensity = pow(glow, 8.0) * glowParam;
        color += sunVisualColor * glowIntensity;
    }

    if (scene.hazeDensity > 0.0) {
        let horizonFactor = 1.0 - clamp(dir.y, 0.0, 1.0);
        let hazeAmount = pow(horizonFactor, 2.0) * saturate(scene.hazeDensity * 5.0);
        color = mix(color, scene.hazeColor.rgb, hazeAmount);
    }

    return color;
}
`,zl=`
fn applyHaze(color: vec3<f32>, dist: f32) -> vec3<f32> {
    if (scene.hazeDensity <= 0.0) {
        return color;
    }
    let haze = 1.0 - exp(-scene.hazeDensity * dist);
    return mix(color, scene.hazeColor.rgb, haze);
}
`,Dl=`
const DIELECTRIC_F0: f32 = 0.04;

fn blinnPhongSpecular(N: vec3<f32>, L: vec3<f32>, V: vec3<f32>, roughness: f32) -> f32 {
    let H = normalize(L + V);
    let NdotH = max(dot(N, H), 0.0);
    let shininess = pow(2.0, (1.0 - roughness) * 10.0);
    let intensity = (1.0 - roughness) * (1.0 - roughness);
    return pow(NdotH, shininess) * intensity;
}

fn schlickFresnel(cosTheta: f32, F0: vec3<f32>) -> vec3<f32> {
    return F0 + (vec3(1.0) - F0) * pow(1.0 - cosTheta, 5.0);
}

fn computeF0Vec(baseColor: vec3<f32>, metallic: f32) -> vec3<f32> {
    return mix(vec3(DIELECTRIC_F0), baseColor, metallic);
}
`,Ll=`
fn refractRay(I: vec3<f32>, N: vec3<f32>, eta: f32) -> vec4<f32> {
    let cosI = -dot(I, N);
    let sinT2 = eta * eta * (1.0 - cosI * cosI);
    if (sinT2 > 1.0) {
        return vec4(reflect(I, N), 1.0);
    }
    let cosT = sqrt(1.0 - sinT2);
    return vec4(normalize(eta * I + (eta * cosI - cosT) * N), 0.0);
}

fn fresnelSchlickIOR(cosTheta: f32, n1: f32, n2: f32) -> f32 {
    let r0 = pow((n1 - n2) / (n1 + n2), 2.0);
    return r0 + (1.0 - r0) * pow(1.0 - cosTheta, 5.0);
}
`;function Ul(e){return`
const REFLECTION_EPSILON: f32 = 0.001;
const MIN_CONTRIBUTION: f32 = 0.02;

fn traceReflections(
    startPos: vec3<f32>,
    startNormal: vec3<f32>,
    startDir: vec3<f32>,
    diffuseColor: vec3<f32>,
    startBaseColor: vec3<f32>,
    startRoughness: f32,
    startMetallic: f32,
    maxBounces: u32
) -> vec3<f32> {
    let V = -startDir;
    let NdotV = max(dot(startNormal, V), 0.0);

    let F0 = computeF0Vec(startBaseColor, startMetallic);
    var F = schlickFresnel(NdotV, F0);

    let smoothness = 1.0 - startRoughness;
    let roughnessAtten = smoothness * smoothness;
    F *= roughnessAtten;

    let avgF = (F.x + F.y + F.z) / 3.0;
    if (avgF < MIN_CONTRIBUTION) {
        return diffuseColor;
    }

    var currentPos = startPos;
    var currentNormal = startNormal;
    var currentDir = startDir;
    var reflectionColor = vec3(0.0);
    var throughput = F;

    for (var bounce = 0u; bounce < maxBounces; bounce++) {
        let avgThroughput = (throughput.x + throughput.y + throughput.z) / 3.0;
        if (avgThroughput < MIN_CONTRIBUTION) {
            break;
        }

        let reflectDir = reflect(currentDir, currentNormal);
        var reflectRay: Ray;
        reflectRay.origin = currentPos + currentNormal * REFLECTION_EPSILON;
        reflectRay.direction = reflectDir;

        var reflectColor = vec3(0.0);
        var reflectRemaining = 1.0;
        var opaqueHit: HitResult;
        var foundOpaque = false;

        for (var t = 0u; t < 2u; t++) {
            let hit = trace(reflectRay);
            if (!hit.hit) {
                reflectColor += sampleSky(reflectDir) * reflectRemaining;
                break;
            }

            let eid = hit.entityId;
            let hitData = getData(eid);
            let hitOpacity = hitData.baseColor.a;
            let hitBaseColor = hitData.baseColor.rgb;
            let hitRoughness = hitData.pbr.x;
            let hitMetallic = hitData.pbr.y;
            let hitEmission = hitData.emission.rgb * hitData.emission.a;

            let hitV = -reflectDir;
            let hitL = -scene.sunDirection.xyz;
            let hitNdotL = max(dot(hit.normal, hitL), 0.0);
            let hitNdotV = max(dot(hit.normal, hitV), 0.0);
var hitShadow = 1.0;
        if (hitNdotL > 0.0) {
            var shadowRay: Ray;
            shadowRay.origin = hit.worldPos + hit.normal * REFLECTION_EPSILON;
            shadowRay.direction = hitL;
            if (traceAnyHit(shadowRay, 1000.0)) { hitShadow = 0.0; }
        }

            let hitF0 = computeF0Vec(hitBaseColor, hitMetallic);
            let hitF = schlickFresnel(hitNdotV, hitF0);
            let hitiffuseWeight = (1.0 - hitMetallic) * (vec3(1.0) - hitF);
            let hitAmbient = scene.ambientColor.rgb * scene.ambientColor.a;
            let hitSun = scene.sunColor.rgb * hitNdotL * hitShadow;
            let hitiffuse = hitBaseColor * (hitAmbient + hitSun) * hitiffuseWeight;
            let hitSpec = blinnPhongSpecular(hit.normal, hitL, hitV, hitRoughness);
            let hitSpecular = scene.sunColor.rgb * hitSpec * hitF * hitNdotL * hitShadow;
            let hitLit = hitiffuse + hitSpecular + hitEmission;

            reflectColor += applyHaze(hitLit, hit.t) * hitOpacity * reflectRemaining;

            if (hitOpacity >= 1.0) {
                opaqueHit = hit;
                foundOpaque = true;
                break;
            }

            reflectRemaining *= (1.0 - hitOpacity);
            if (reflectRemaining < 0.02) { break; }
            reflectRay.origin = hit.worldPos + reflectDir * REFLECTION_EPSILON;
        }

        reflectionColor += throughput * reflectColor;

        if (!foundOpaque) { break; }

        let opaqueEid = opaqueHit.entityId;
        let opaque = getData(opaqueEid);
        let hitSmoothness = 1.0 - opaque.pbr.x;
        let hitRoughnessAtten = hitSmoothness * hitSmoothness;
        let opaqueF0 = computeF0Vec(opaque.baseColor.rgb, opaque.pbr.y);
        let opaqueNdotV = max(dot(opaqueHit.normal, -reflectDir), 0.0);
        let opaqueF = schlickFresnel(opaqueNdotV, opaqueF0);
        throughput *= opaqueF * hitRoughnessAtten;
        currentPos = opaqueHit.worldPos;
        currentNormal = opaqueHit.normal;
        currentDir = reflectDir;
    }

    return diffuseColor * (vec3(1.0) - F) + reflectionColor;
}
`}const Vl=`
let NdotL = max(dot(surface.normal, -scene.sunDirection.xyz), 0.0);
let ambient = scene.ambientColor.rgb * scene.ambientColor.a;
let sunDiffuse = scene.sunColor.rgb * NdotL;
let diffuseWeight = 1.0 - surface.metallic;
let lighting = (ambient + sunDiffuse) * diffuseWeight;
`,Gl=`
const GOLDEN_ANGLE: f32 = 2.39996323;
const SHADOW_TRANSPARENCY_EPSILON: f32 = 0.001;
const MAX_SHADOW_TRANSPARENT_DEPTH: u32 = 2u;

fn buildTangentBasis(dir: vec3<f32>) -> mat3x3<f32> {
    let up = select(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 0.0), abs(dir.y) > 0.99);
    let tangent = normalize(cross(dir, up));
    let bitangent = cross(dir, tangent);
    return mat3x3(tangent, bitangent, dir);
}

fn traceShadowWithTransparency(origin: vec3<f32>, sunDir: vec3<f32>, tMax: f32) -> f32 {
    var shadowFactor = 1.0;
    var currentPos = origin;

    for (var i = 0u; i < MAX_SHADOW_TRANSPARENT_DEPTH; i++) {
        var shadowRay: Ray;
        shadowRay.origin = currentPos;
        shadowRay.direction = sunDir;

        let hit = trace(shadowRay);
        if (!hit.hit || hit.t > tMax) {
            break;
        }

        let shadow = getData(hit.entityId);
        let opacity = shadow.baseColor.a;
        shadowFactor *= (1.0 - opacity);

        if (opacity >= 1.0 || shadowFactor < 0.02) {
            break;
        }

        currentPos = hit.worldPos + sunDir * SHADOW_TRANSPARENCY_EPSILON;
    }

    return shadowFactor;
}

fn sampleSoftShadow(origin: vec3<f32>, sunDir: vec3<f32>, softness: f32, samples: u32) -> f32 {
    if (samples == 0u) {
        return 1.0;
    }
    if (samples == 1u || softness <= 0.0) {
        return traceShadowWithTransparency(origin, sunDir, 1000.0);
    }

    let basis = buildTangentBasis(sunDir);
    var totalShadow = 0.0;

    let noise = fract(sin(dot(origin.xy, vec2(12.9898, 78.233))) * 43758.5453);
    let rotationOffset = noise * 6.28318530718;

    for (var i = 0u; i < samples; i++) {
        let angle = f32(i) * GOLDEN_ANGLE + rotationOffset;
        let z = (f32(i) + 0.5) / f32(samples);
        let r = sqrt(1.0 - z * z) * softness * 0.1;

        let localOffset = vec3(cos(angle) * r, sin(angle) * r, 0.0);
        let sampleDir = normalize(sunDir + basis * localOffset);

        totalShadow += traceShadowWithTransparency(origin, sampleDir, 1000.0);
    }

    return totalShadow / f32(samples);
}
`;function $l(e,t,r){return e===!1?"return surface.baseColor;":`
    let V = -rayDir;
    let L = -scene.sunDirection.xyz;
    let NdotL = max(dot(surface.normal, L), 0.0);
    let NdotV = max(dot(surface.normal, V), 0.0);

    var shadowFactor = 1.0;
    if (NdotL > 0.0) {
        let shadowOrigin = surface.worldPos + surface.normal * 0.001;
        shadowFactor = sampleSoftShadow(shadowOrigin, L, scene.shadowSoftness, scene.shadowSamples);
    }

    let F0 = computeF0Vec(surface.baseColor, surface.metallic);
    let F = schlickFresnel(NdotV, F0);

    let ambient = scene.ambientColor.rgb * scene.ambientColor.a;
    let sunDiffuse = scene.sunColor.rgb * NdotL * shadowFactor;
    let diffuseWeight = 1.0 - surface.metallic;
    let diffuseColor = surface.baseColor * (ambient + sunDiffuse) * diffuseWeight + surface.emission;

    let specTerm = blinnPhongSpecular(surface.normal, L, V, surface.roughness);
    let specular = scene.sunColor.rgb * specTerm * F * NdotL * shadowFactor;

    var finalColor = diffuseColor * (vec3(1.0) - F) + specular;

    if (scene.reflectionDepth > 0u) {
        finalColor = traceReflections(
            surface.worldPos, surface.normal, rayDir,
            diffuseColor + specular, surface.baseColor,
            surface.roughness, surface.metallic,
            scene.reflectionDepth
        );
    }
    return finalColor;`}function Wl(){const e={surfaces:[]};return Ql(e),e}function Ql(e){e.surfaces.push({lit:!0}),e.surfaces.push({lit:!1,fragment:"(*surface).baseColor = (*surface).normal * 0.5 + 0.5;"}),e.surfaces.push({lit:!1,fragment:`
    let depth = position.z;
    let remapped = pow(1.0 - depth, 0.1);
    (*surface).baseColor = vec3(remapped);`}),e.surfaces.push({lit:!1})}const xo={Default:0};function Hl(e){return[...e.surfaces]}const Xl=Wl();function Yl(){return Hl(Xl)}const Oi={data:new Uint32Array(I)},Je={type:[]};$(Je,{defaults:()=>({type:xo.Default})});const ql=512,Hr="depth24plus",Zl="r32float",_o="r8unorm",jl="r32uint",Fr="rgba8unorm";function Kl(e){return e.createBuffer({label:"scene",size:ql,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC})}function Jl(e,t,r,n,i,s){const o=i.get("color");if(o&&o.width===r&&o.height===n)return;o?.destroy(),i.get("linear-depth")?.destroy(),i.get("eid")?.destroy(),i.get("depth")?.destroy(),i.get("mask")?.destroy(),i.get("pingA")?.destroy(),i.get("pingB")?.destroy();const a=e.createTexture({label:"color",size:{width:r,height:n},format:Fr,usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING}),c=e.createTexture({label:"linear-depth",size:{width:r,height:n},format:Zl,usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING}),u=e.createTexture({label:"eid",size:{width:r,height:n},format:jl,usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING}),l=e.createTexture({label:"depth",size:{width:r,height:n},format:Hr,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING}),f=e.createTexture({label:"mask",size:{width:r,height:n},format:_o,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING}),h=e.createTexture({label:"pingA",size:{width:r,height:n},format:t,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING}),d=e.createTexture({label:"pingB",size:{width:r,height:n},format:t,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING});i.set("color",a),s.set("color",a.createView()),i.set("linear-depth",c),s.set("linear-depth",c.createView()),i.set("eid",u),s.set("eid",u.createView()),i.set("depth",l),s.set("depth",l.createView()),i.set("mask",f),s.set("mask",f.createView()),i.set("pingA",h),s.set("pingA",h.createView()),i.set("pingB",d),s.set("pingB",d.createView())}const Nr=2147483648;function Ri(e){return(e&Nr)!==0}function zi(e){return e&~Nr}const Xr="const LEAF_FLAG: u32 = 0x80000000u;",Co=`
struct TreeNode {
    minX: f32,
    minY: f32,
    minZ: f32,
    leftChild: u32,
    maxX: f32,
    maxY: f32,
    maxZ: f32,
    rightChild: u32,
}`,So=`
struct BVHNode {
    c0_minX: f32, c0_minY: f32, c0_minZ: f32, child0: u32,
    c0_maxX: f32, c0_maxY: f32, c0_maxZ: f32, _pad0: u32,
    c1_minX: f32, c1_minY: f32, c1_minZ: f32, child1: u32,
    c1_maxX: f32, c1_maxY: f32, c1_maxZ: f32, _pad1: u32,
    c2_minX: f32, c2_minY: f32, c2_minZ: f32, child2: u32,
    c2_maxX: f32, c2_maxY: f32, c2_maxZ: f32, _pad2: u32,
    c3_minX: f32, c3_minY: f32, c3_minZ: f32, child3: u32,
    c3_maxX: f32, c3_maxY: f32, c3_maxZ: f32, _pad3: u32,
}`,ed=32,td=128,rd=`
struct BLASNode {
    minX: f32, minY: f32, minZ: f32, leftChild: u32,
    maxX: f32, maxY: f32, maxZ: f32, rightChild: u32,
}`,nd=`
struct BLASTriangle {
    v0: vec3<f32>, _pad0: u32,
    e1: vec3<f32>, _pad1: u32,
    e2: vec3<f32>, _pad2: u32,
    n0_enc: u32, n1_enc: u32, n2_enc: u32, _pad3: u32,
}`,id=`
struct Ray {
    origin: vec3<f32>,
    direction: vec3<f32>,
}`,sd=`
struct HitResult {
    hit: bool,
    t: f32,
    entityId: u32,
    u: f32,
    v: f32,
    normal: vec3<f32>,
    worldPos: vec3<f32>,
}`,od=`
fn octDecode(enc: u32) -> vec3<f32> {
    let x = f32(enc & 0xFFFFu) / 65535.0 * 2.0 - 1.0;
    let y = f32(enc >> 16u) / 65535.0 * 2.0 - 1.0;
    let z = 1.0 - abs(x) - abs(y);
    var n: vec3<f32>;
    if (z < 0.0) {
        let signX = select(-1.0, 1.0, x >= 0.0);
        let signY = select(-1.0, 1.0, y >= 0.0);
        n = vec3<f32>((1.0 - abs(y)) * signX, (1.0 - abs(x)) * signY, z);
    } else {
        n = vec3<f32>(x, y, z);
    }
    return normalize(n);
}`,ad=`
${So}

${Xr}
const INVALID_NODE: u32 = 0xFFFFFFFFu;
const MAX_STACK_DEPTH: u32 = 24u;

${od}
`,cd=`
${rd}

${nd}
`,ud=`
@group(1) @binding(0) var<storage, read> tlasNodes: array<BVHNode>;
@group(1) @binding(1) var<storage, read> tlasInstanceIds: array<u32>;
@group(1) @binding(2) var<storage, read> blasNodes: array<BLASNode>;
@group(1) @binding(3) var<storage, read> blasTriIds: array<u32>;
@group(1) @binding(4) var<storage, read> blasTriangles: array<BLASTriangle>;
@group(1) @binding(5) var<storage, read> blasMeta: array<u32>;
@group(1) @binding(6) var<storage, read> instanceInverses: array<mat4x4<f32>>;
`,ld=`
fn isLeaf(child: u32) -> bool {
    return (child & LEAF_FLAG) != 0u;
}

fn leafIndex(child: u32) -> u32 {
    return child & ~LEAF_FLAG;
}

fn safeInverse(d: f32) -> f32 {
    return select(1.0 / d, 1e30, abs(d) < 1e-10);
}

fn computeInvDir(dir: vec3<f32>) -> vec3<f32> {
    return vec3(
        safeInverse(dir.x),
        safeInverse(dir.y),
        safeInverse(dir.z)
    );
}

fn intersectAABBDist(origin: vec3<f32>, invDir: vec3<f32>, nodeMin: vec3<f32>, nodeMax: vec3<f32>) -> f32 {
    let t1 = (nodeMin - origin) * invDir;
    let t2 = (nodeMax - origin) * invDir;

    let tNear = min(t1, t2);
    let tFar = max(t1, t2);

    let tEnter = max(max(tNear.x, tNear.y), tNear.z);
    let tExit = min(min(tFar.x, tFar.y), tFar.z);

    if (tEnter <= tExit && tExit >= 0.0) {
        return max(tEnter, 0.0);
    }
    return 1e30;
}

fn intersectBLASTriangle(ray: Ray, tri: BLASTriangle) -> HitResult {
    var result: HitResult;
    result.hit = false;
    result.t = 0.0;
    result.entityId = 0u;
    result.u = 0.0;
    result.v = 0.0;
    result.normal = vec3(0.0, 1.0, 0.0);
    result.worldPos = vec3(0.0);

    let e1 = tri.e1;
    let e2 = tri.e2;

    let h = cross(ray.direction, e2);
    let a = dot(e1, h);

    if (a > -EPSILON && a < EPSILON) {
        return result;
    }

    let f = 1.0 / a;
    let s = ray.origin - tri.v0;
    let u = f * dot(s, h);

    if (u < 0.0 || u > 1.0) {
        return result;
    }

    let q = cross(s, e1);
    let v = f * dot(ray.direction, q);

    if (v < 0.0 || u + v > 1.0) {
        return result;
    }

    let t = f * dot(e2, q);

    if (t > EPSILON) {
        result.hit = true;
        result.t = t;
        result.u = u;
        result.v = v;
        let w = 1.0 - u - v;
        let n0 = octDecode(tri.n0_enc);
        let n1 = octDecode(tri.n1_enc);
        let n2 = octDecode(tri.n2_enc);
        result.normal = normalize(w * n0 + u * n1 + v * n2);
        result.worldPos = ray.origin + t * ray.direction;
    }

    return result;
}

fn traceBLAS(
    ray: Ray,
    nodeOffset: u32,
    triIdOffset: u32,
    triOffset: u32,
    triCount_: u32,
    maxT: f32
) -> HitResult {
    var closest: HitResult;
    closest.hit = false;
    closest.t = maxT;
    closest.entityId = 0u;
    closest.u = 0.0;
    closest.v = 0.0;
    closest.normal = vec3(0.0, 1.0, 0.0);
    closest.worldPos = vec3(0.0);

    if (triCount_ == 0u) {
        return closest;
    }

    if (triCount_ == 1u) {
        let triIdx = blasTriIds[triIdOffset];
        let tri = blasTriangles[triOffset + triIdx];
        let hit = intersectBLASTriangle(ray, tri);
        if (hit.hit && hit.t < maxT) {
            return hit;
        }
        return closest;
    }

    let invDir = computeInvDir(ray.direction);

    var stack: array<u32, MAX_STACK_DEPTH>;
    var stackPtr = 0u;

    stack[stackPtr] = 0u;
    stackPtr++;

    var iterations = 0u;
    let maxIterations = min(triCount_ * 3u, 10000u);

    while (stackPtr > 0u && iterations < maxIterations) {
        iterations++;
        stackPtr--;
        let localIdx = stack[stackPtr];
        let node = blasNodes[nodeOffset + localIdx];

        let leftChild = node.leftChild;
        let rightChild = node.rightChild;

        if (leftChild != INVALID_NODE) {
            if (isLeaf(leftChild)) {
                let leafIdx = leafIndex(leftChild);
                let triIdx = blasTriIds[triIdOffset + leafIdx];
                let tri = blasTriangles[triOffset + triIdx];
                let hit = intersectBLASTriangle(ray, tri);
                if (hit.hit && hit.t < closest.t) {
                    closest = hit;
                }
            } else {
                let leftNode = blasNodes[nodeOffset + leftChild];
                let leftMin = vec3(leftNode.minX, leftNode.minY, leftNode.minZ);
                let leftMax = vec3(leftNode.maxX, leftNode.maxY, leftNode.maxZ);
                let leftDist = intersectAABBDist(ray.origin, invDir, leftMin, leftMax);

                if (leftDist < closest.t && stackPtr < MAX_STACK_DEPTH) {
                    stack[stackPtr] = leftChild;
                    stackPtr++;
                }
            }
        }

        if (rightChild != INVALID_NODE) {
            if (isLeaf(rightChild)) {
                let leafIdx = leafIndex(rightChild);
                let triIdx = blasTriIds[triIdOffset + leafIdx];
                let tri = blasTriangles[triOffset + triIdx];
                let hit = intersectBLASTriangle(ray, tri);
                if (hit.hit && hit.t < closest.t) {
                    closest = hit;
                }
            } else {
                let rightNode = blasNodes[nodeOffset + rightChild];
                let rightMin = vec3(rightNode.minX, rightNode.minY, rightNode.minZ);
                let rightMax = vec3(rightNode.maxX, rightNode.maxY, rightNode.maxZ);
                let rightDist = intersectAABBDist(ray.origin, invDir, rightMin, rightMax);

                if (rightDist < closest.t && stackPtr < MAX_STACK_DEPTH) {
                    stack[stackPtr] = rightChild;
                    stackPtr++;
                }
            }
        }
    }

    return closest;
}

fn trace(ray: Ray) -> HitResult {
    var closest: HitResult;
    closest.hit = false;
    closest.t = 1e30;
    closest.entityId = 0u;
    closest.u = 0.0;
    closest.v = 0.0;
    closest.normal = vec3(0.0, 1.0, 0.0);
    closest.worldPos = vec3(0.0);

    let count = getInstanceCount();
    if (count == 0u) {
        return closest;
    }

    let invDir = computeInvDir(ray.direction);

    var stack: array<u32, MAX_STACK_DEPTH>;
    var stackPtr = 0u;
    stack[stackPtr] = 0u;
    stackPtr++;

    var iterations = 0u;
    let maxIterations = min(count * 3u, 10000u);

    while (stackPtr > 0u && iterations < maxIterations) {
        iterations++;
        stackPtr--;
        let nodeIdx = stack[stackPtr];

        let node = tlasNodes[nodeIdx];

        var children: array<u32, 4>;
        var dists: array<f32, 4>;

        children[0] = node.child0;
        children[1] = node.child1;
        children[2] = node.child2;
        children[3] = node.child3;

        dists[0] = select(
            intersectAABBDist(ray.origin, invDir,
                vec3(node.c0_minX, node.c0_minY, node.c0_minZ),
                vec3(node.c0_maxX, node.c0_maxY, node.c0_maxZ)),
            1e30,
            children[0] == INVALID_NODE
        );
        dists[1] = select(
            intersectAABBDist(ray.origin, invDir,
                vec3(node.c1_minX, node.c1_minY, node.c1_minZ),
                vec3(node.c1_maxX, node.c1_maxY, node.c1_maxZ)),
            1e30,
            children[1] == INVALID_NODE
        );
        dists[2] = select(
            intersectAABBDist(ray.origin, invDir,
                vec3(node.c2_minX, node.c2_minY, node.c2_minZ),
                vec3(node.c2_maxX, node.c2_maxY, node.c2_maxZ)),
            1e30,
            children[2] == INVALID_NODE
        );
        dists[3] = select(
            intersectAABBDist(ray.origin, invDir,
                vec3(node.c3_minX, node.c3_minY, node.c3_minZ),
                vec3(node.c3_maxX, node.c3_maxY, node.c3_maxZ)),
            1e30,
            children[3] == INVALID_NODE
        );

        for (var i = 1u; i < 4u; i++) {
            let keyDist = dists[i];
            let keyChild = children[i];
            var j = i;
            while (j > 0u && dists[j - 1u] > keyDist) {
                dists[j] = dists[j - 1u];
                children[j] = children[j - 1u];
                j--;
            }
            dists[j] = keyDist;
            children[j] = keyChild;
        }

        for (var i = 3i; i >= 0i; i--) {
            let child = children[i];
            let dist = dists[i];

            if (child == INVALID_NODE || dist >= closest.t) {
                continue;
            }

            if (isLeaf(child)) {
                let instanceIdx = leafIndex(child);
                let eid = tlasInstanceIds[instanceIdx];
                let shapeId = getShapeId(eid);

                let nodeOffset = blasMeta[shapeId * 4u];
                let triIdOffset = blasMeta[shapeId * 4u + 1u];
                let triOffset = blasMeta[shapeId * 4u + 2u];
                let triCount_ = blasMeta[shapeId * 4u + 3u];

                if (triCount_ == 0u) {
                    continue;
                }

                let invMatrix = instanceInverses[eid];
                var objRay: Ray;
                objRay.origin = (invMatrix * vec4(ray.origin, 1.0)).xyz;
                objRay.direction = (invMatrix * vec4(ray.direction, 0.0)).xyz;

                let blasHit = traceBLAS(objRay, nodeOffset, triIdOffset, triOffset, triCount_, closest.t);

                if (blasHit.hit && blasHit.t < closest.t) {
                    closest = blasHit;
                    closest.entityId = eid;
                    let normalMat = mat3x3(invMatrix[0].xyz, invMatrix[1].xyz, invMatrix[2].xyz);
                    closest.normal = normalize(transpose(normalMat) * blasHit.normal);
                    closest.worldPos = ray.origin + blasHit.t * ray.direction;
                }
            } else if (stackPtr < MAX_STACK_DEPTH) {
                stack[stackPtr] = child;
                stackPtr++;
            }
        }
    }

    return closest;
}
`,dd=`
fn traceAnyHit(ray: Ray, tMax: f32) -> bool {
    let count = getInstanceCount();
    if (count == 0u) { return false; }

    let invDir = computeInvDir(ray.direction);

    var stack: array<u32, MAX_STACK_DEPTH>;
    var stackPtr = 0u;
    stack[stackPtr] = 0u;
    stackPtr++;

    var iterations = 0u;
    let maxIterations = min(count * 3u, 10000u);

    while (stackPtr > 0u && iterations < maxIterations) {
        iterations++;
        stackPtr--;
        let nodeIdx = stack[stackPtr];

        let node = tlasNodes[nodeIdx];

        var children: array<u32, 4>;
        var dists: array<f32, 4>;

        children[0] = node.child0;
        children[1] = node.child1;
        children[2] = node.child2;
        children[3] = node.child3;

        dists[0] = select(
            intersectAABBDist(ray.origin, invDir,
                vec3(node.c0_minX, node.c0_minY, node.c0_minZ),
                vec3(node.c0_maxX, node.c0_maxY, node.c0_maxZ)),
            1e30,
            children[0] == INVALID_NODE
        );
        dists[1] = select(
            intersectAABBDist(ray.origin, invDir,
                vec3(node.c1_minX, node.c1_minY, node.c1_minZ),
                vec3(node.c1_maxX, node.c1_maxY, node.c1_maxZ)),
            1e30,
            children[1] == INVALID_NODE
        );
        dists[2] = select(
            intersectAABBDist(ray.origin, invDir,
                vec3(node.c2_minX, node.c2_minY, node.c2_minZ),
                vec3(node.c2_maxX, node.c2_maxY, node.c2_maxZ)),
            1e30,
            children[2] == INVALID_NODE
        );
        dists[3] = select(
            intersectAABBDist(ray.origin, invDir,
                vec3(node.c3_minX, node.c3_minY, node.c3_minZ),
                vec3(node.c3_maxX, node.c3_maxY, node.c3_maxZ)),
            1e30,
            children[3] == INVALID_NODE
        );

        for (var i = 0u; i < 4u; i++) {
            let child = children[i];
            let dist = dists[i];

            if (child == INVALID_NODE || dist >= tMax) {
                continue;
            }

            if (isLeaf(child)) {
                let instanceIdx = leafIndex(child);
                let eid = tlasInstanceIds[instanceIdx];
                let shapeId = getShapeId(eid);

                let nodeOffset = blasMeta[shapeId * 4u];
                let triIdOffset = blasMeta[shapeId * 4u + 1u];
                let triOffset = blasMeta[shapeId * 4u + 2u];
                let triCount_ = blasMeta[shapeId * 4u + 3u];

                if (triCount_ == 0u) {
                    continue;
                }

                let invMatrix = instanceInverses[eid];
                var objRay: Ray;
                objRay.origin = (invMatrix * vec4(ray.origin, 1.0)).xyz;
                objRay.direction = (invMatrix * vec4(ray.direction, 0.0)).xyz;

                let blasHit = traceBLAS(objRay, nodeOffset, triIdOffset, triOffset, triCount_, tMax);
                if (blasHit.hit && blasHit.t < tMax) {
                    return true;
                }
            } else if (stackPtr < MAX_STACK_DEPTH) {
                stack[stackPtr] = child;
                stackPtr++;
            }
        }
    }

    return false;
}
`,fd=1e-7,hd=`
${id}
${sd}
${yo}
${st}
${Il}
`,md=`
@group(0) @binding(0) var<uniform> scene: Scene;
@group(0) @binding(1) var<storage, read> data: array<Data>;
@group(0) @binding(2) var output_scene: texture_storage_2d<rgba8unorm, write>;
@group(0) @binding(3) var output_depth: texture_storage_2d<r32float, write>;
@group(0) @binding(4) var output_entityId: texture_storage_2d<r32uint, write>;
`,pd=`
fn getData(eid: u32) -> Data {
    return data[eid];
}

fn getSurfaceType(eid: u32) -> u32 {
    return data[eid].flags & 0xFFu;
}

fn getVolume(eid: u32) -> u32 {
    return (data[eid].flags >> 8u) & 0xFu;
}

fn getShapeId(eid: u32) -> u32 {
    return data[eid].flags >> 16u;
}

fn getInstanceCount() -> u32 {
    return scene.instanceCount;
}
`,gd=`
${wo}

struct PrimaryRay {
    origin: vec3<f32>,
    direction: vec3<f32>,
    skyDir: vec3<f32>,
}

fn generateRay(screenX: f32, screenY: f32) -> PrimaryRay {
    var result: PrimaryRay;
    result.skyDir = computeSkyDir(screenX, screenY);

    let width = scene.viewport.x;
    let height = scene.viewport.y;
    let ndcX = screenX * 2.0 - 1.0;
    let ndcY = 1.0 - screenY * 2.0;
    let aspect = width / height;

    let cameraWorld = scene.cameraWorld;
    let camPosX = cameraWorld[3][0];
    let camPosY = cameraWorld[3][1];
    let camPosZ = cameraWorld[3][2];

    if (scene.cameraMode > 0.5) {
        let r00 = cameraWorld[0][0]; let r10 = cameraWorld[0][1]; let r20 = cameraWorld[0][2];
        let r01 = cameraWorld[1][0]; let r11 = cameraWorld[1][1]; let r21 = cameraWorld[1][2];
        let r02 = cameraWorld[2][0]; let r12 = cameraWorld[2][1]; let r22 = cameraWorld[2][2];

        let halfHeight = scene.cameraSize;
        let halfWidth = halfHeight * aspect;
        let offsetX = ndcX * halfWidth;
        let offsetY = ndcY * halfHeight;
        let fwdX = -r02; let fwdY = -r12; let fwdZ = -r22;

        result.origin = vec3(
            camPosX + r00 * offsetX + r01 * offsetY + fwdX * scene.near,
            camPosY + r10 * offsetX + r11 * offsetY + fwdY * scene.near,
            camPosZ + r20 * offsetX + r21 * offsetY + fwdZ * scene.near
        );
        result.direction = vec3(fwdX, fwdY, fwdZ);
    } else {
        let dir = result.skyDir;
        result.origin = vec3(camPosX + dir.x * scene.near, camPosY + dir.y * scene.near, camPosZ + dir.z * scene.near);
        result.direction = dir;
    }

    return result;
}
`,yd=`
const EPSILON: f32 = ${fd};
`;function bd(e,t){const r=bo(t.vertex),n=t.fragment??"",i=$l(t.lit);return`
fn userVertexTransform_${e}(worldPos: vec3<f32>, normal: vec3<f32>, eid: u32) -> vec3<f32> {
    ${r}
}

fn userFragment_${e}(surface: ptr<function, SurfaceData>, position: vec4<f32>) {
    ${n}
}

fn applyLighting_${e}(surface: SurfaceData, rayDir: vec3<f32>) -> vec3<f32> {
    ${i}
}
`}function wd(e){const t=Array.from({length:e},(i,s)=>`        case ${s}u: { return userVertexTransform_${s}(worldPos, normal, eid); }`).join(`
`),r=Array.from({length:e},(i,s)=>`        case ${s}u: { userFragment_${s}(surface, position); }`).join(`
`),n=Array.from({length:e},(i,s)=>`        case ${s}u: { return applyLighting_${s}(surface, rayDir); }`).join(`
`);return`
fn dispatchVertexTransform(surfaceId: u32, worldPos: vec3<f32>, normal: vec3<f32>, eid: u32) -> vec3<f32> {
    switch surfaceId {
${t}
        default: { return userVertexTransform_0(worldPos, normal, eid); }
    }
}

fn dispatchFragment(surfaceId: u32, surface: ptr<function, SurfaceData>, position: vec4<f32>) {
    switch surfaceId {
${r}
        default: { userFragment_0(surface, position); }
    }
}

fn dispatchLighting(surfaceId: u32, surface: SurfaceData, rayDir: vec3<f32>) -> vec3<f32> {
    switch surfaceId {
${n}
        default: { return applyLighting_0(surface, rayDir); }
    }
}
`}function vd(e,t=!0,r=!0,n=!0){const i=e.map((o,a)=>bd(a,o)).join(`
`),s=wd(e.length);return`
${hd}
${ad}
${cd}
${md}
${pd}
${ud}
${gd}
${yd}
${ld}
${dd}
${Gl}
${Dl}
${Ll}
${vo}
${zl}
${Ul()}

${i}
${s}

const MAX_TRANSPARENT_DEPTH: u32 = 4u;
const TRANSPARENCY_EPSILON: f32 = 0.001;
const MAX_REFRACTION_DEPTH: u32 = 2u;
const REFRACTION_EPSILON: f32 = 0.001;

${xd(!0)}

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let width = u32(scene.viewport.x);
    let height = u32(scene.viewport.y);

    if (gid.x >= width || gid.y >= height) {
        return;
    }

    let screenX = (f32(gid.x) + 0.5) / f32(width);
    let screenY = (f32(gid.y) + 0.5) / f32(height);

    let primary = generateRay(screenX, screenY);
    var ray: Ray;
    ray.origin = primary.origin;
    ray.direction = primary.direction;

    var finalColor = vec3(0.0);
    var remainingOpacity = 1.0;
    var depth = 1e30;
    var entityId = 0u;
    var firstHit = true;

    for (var i = 0u; i < MAX_TRANSPARENT_DEPTH; i++) {
        let hit = trace(ray);

        if (!hit.hit) {
            finalColor += sampleSky(primary.skyDir) * remainingOpacity;
            break;
        }

        let eid = hit.entityId;
        let d = getData(eid);
        let opacity = d.baseColor.a;
        let surfaceId = getSurfaceType(eid);

        if (firstHit) {
            depth = hit.t;
            entityId = eid;
            firstHit = false;
        }

        let finalWorldPos = dispatchVertexTransform(surfaceId, hit.worldPos, hit.normal, eid);

        var surface: SurfaceData;
        surface.baseColor = d.baseColor.rgb;
        surface.roughness = d.pbr.x;
        surface.metallic = d.pbr.y;
        surface.opacity = opacity;
        surface.emission = d.emission.rgb * d.emission.a;
        surface.normal = hit.normal;
        surface.worldPos = finalWorldPos;

        dispatchFragment(surfaceId, &surface, vec4(f32(gid.x), f32(gid.y), hit.t, 1.0));

        ${_d()}
        let litColor = dispatchLighting(surfaceId, surface, primary.direction);
        let hazeColor = applyHaze(litColor, hit.t);

        let contribution = opacity * remainingOpacity;
        finalColor += hazeColor * contribution;

        if (opacity >= 1.0) {
            break;
        }

        remainingOpacity *= (1.0 - opacity);
        if (remainingOpacity < 0.02) {
            break;
        }

        ray.origin = hit.worldPos + ray.direction * TRANSPARENCY_EPSILON;
    }

    textureStore(output_scene, vec2<i32>(gid.xy), vec4(finalColor, 1.0));
    textureStore(output_depth, vec2<i32>(gid.xy), vec4(depth, 0.0, 0.0, 0.0));
    textureStore(output_entityId, vec2<i32>(gid.xy), vec4(entityId, 0u, 0u, 0u));
}
`}function xd(e=!0){return`
const VOLUME_SOLID: u32 = 0u;
const VOLUME_HALF_SPACE: u32 = 1u;

fn traceRefraction(
    startPos: vec3<f32>,
    startNormal: vec3<f32>,
    rayDir: vec3<f32>,
    ior: f32,
    mediumColor: vec3<f32>,
    volumeType: u32,
    maxBounces: u32
) -> vec3<f32> {
    var currentPos = startPos;
    var currentNormal = startNormal;
    var currentDir = rayDir;
    var currentIOR = ior;
    var currentMediumColor = mediumColor;
    var totalDistance = 0.0;
    var inMedium = true;
    let isHalfSpace = volumeType == VOLUME_HALF_SPACE;

    for (var bounce = 0u; bounce < maxBounces; bounce++) {
        let entering = dot(currentDir, currentNormal) < 0.0;
        let n = select(-currentNormal, currentNormal, entering);
        let n1 = select(currentIOR, 1.0, entering);
        let n2 = select(1.0, currentIOR, entering);
        let eta = n1 / n2;

        let refractResult = refractRay(currentDir, n, eta);
        let isTIR = refractResult.w > 0.5;

        var refractRay_: Ray;
        refractRay_.direction = refractResult.xyz;
        refractRay_.origin = select(
            currentPos - n * REFRACTION_EPSILON,
            currentPos + n * REFRACTION_EPSILON,
            isTIR
        );

        let refHit = trace(refractRay_);
        if (!refHit.hit) {
            if (isHalfSpace && inMedium) {
                let depthFade = exp(-totalDistance * 0.1);
                return currentMediumColor * depthFade * scene.ambientColor.rgb * scene.ambientColor.a;
            }
            var skyColor = sampleSky(refractRay_.direction);
            if (inMedium && totalDistance > 0.0) {
                let absorption = exp(-totalDistance * 0.5);
                skyColor = mix(skyColor * currentMediumColor, skyColor, absorption);
            }
            return skyColor;
        }

        if (inMedium) {
            totalDistance += refHit.t;
        }

        let refEid = refHit.entityId;
        let refracted = getData(refEid);
        let refOpacity = refracted.baseColor.a;
        let refIOR = refracted.pbr.z;

        if (refIOR <= 1.0) {
            let hitBaseColor = refracted.baseColor.rgb;
            let hitMetallic = refracted.pbr.y;
            let hitEmission = refracted.emission.rgb * refracted.emission.a;

            let hitL = -scene.sunDirection.xyz;
            let hitNdotL = max(dot(refHit.normal, hitL), 0.0);
var hitShadow = 1.0;
            if (hitNdotL > 0.0 && scene.shadowSamples > 0u) {
                var shadowRay: Ray;
                shadowRay.origin = refHit.worldPos + refHit.normal * REFRACTION_EPSILON;
                shadowRay.direction = hitL;
                if (traceAnyHit(shadowRay, 1000.0)) { hitShadow = 0.0; }
            }

            let hitAmbient = scene.ambientColor.rgb * scene.ambientColor.a;
            let hitSun = scene.sunColor.rgb * hitNdotL * hitShadow;
            var hitDiffuse = hitBaseColor * (hitAmbient + hitSun) * (1.0 - hitMetallic);

            if (totalDistance > 0.0) {
                let absorption = exp(-totalDistance * 0.5);
                hitDiffuse = mix(hitDiffuse * currentMediumColor, hitDiffuse, absorption);
            }

            var surfaceColor = applyHaze(hitDiffuse + hitEmission, refHit.t);

            if (refOpacity >= 1.0) {
                return surfaceColor;
            }

            var behindRay: Ray;
            behindRay.origin = refHit.worldPos + refractRay_.direction * REFRACTION_EPSILON;
            behindRay.direction = refractRay_.direction;
            let behindHit = trace(behindRay);
            var behindColor = sampleSky(refractRay_.direction);
            if (behindHit.hit) {
                let behind = getData(behindHit.entityId);
                let behindBaseColor = behind.baseColor.rgb;
                let behindMetallic = behind.pbr.y;
                let behindEmission = behind.emission.rgb * behind.emission.a;
                let behindNdotL = max(dot(behindHit.normal, hitL), 0.0);
                let behindAmbient = scene.ambientColor.rgb * scene.ambientColor.a;
                let behindSun = scene.sunColor.rgb * behindNdotL;
                behindColor = applyHaze(behindBaseColor * (behindAmbient + behindSun) * (1.0 - behindMetallic) + behindEmission, behindHit.t);
            }

            return surfaceColor * refOpacity + behindColor * (1.0 - refOpacity);
        }

        if (!entering) {
            inMedium = false;
        } else {
            inMedium = true;
            currentMediumColor = refracted.baseColor.rgb;
            totalDistance = 0.0;
        }

        currentPos = refHit.worldPos;
        currentNormal = refHit.normal;
        currentDir = refractRay_.direction;
        currentIOR = refIOR;
    }

    if (isHalfSpace && inMedium) {
        let depthFade = exp(-totalDistance * 0.1);
        return currentMediumColor * depthFade * scene.ambientColor.rgb * scene.ambientColor.a;
    }
    var skyColor = sampleSky(currentDir);
    if (inMedium && totalDistance > 0.0) {
        let absorption = exp(-totalDistance * 0.5);
        skyColor = mix(skyColor * currentMediumColor, skyColor, absorption);
    }
    return skyColor;
}
`}function _d(){return`
        let ior = d.pbr.z;
        if (ior > 1.0 && scene.refractionDepth > 0u) {
            let entering = dot(ray.direction, surface.normal) < 0.0;
            let n = select(-surface.normal, surface.normal, entering);
            let n1 = select(ior, 1.0, entering);
            let n2 = select(1.0, ior, entering);
            let cosI = abs(dot(ray.direction, n));
            let fresnel = fresnelSchlickIOR(cosI, n1, n2);

            let volumeType = getVolume(eid);
            let refractedColor = traceRefraction(
                surface.worldPos, surface.normal, ray.direction, ior,
                surface.baseColor, volumeType, scene.refractionDepth
            );

            let contribution = opacity * remainingOpacity;
            let refractContrib = (1.0 - fresnel) * contribution;
            finalColor += applyHaze(refractedColor, hit.t) * refractContrib;

            let litColor = dispatchLighting(surfaceId, surface, primary.direction);
            finalColor += applyHaze(litColor, hit.t) * fresnel * contribution;

            if (opacity >= 1.0) {
                break;
            }
            remainingOpacity *= (1.0 - opacity);
            if (remainingOpacity < 0.02) {
                break;
            }
            ray.origin = hit.worldPos + ray.direction * TRANSPARENCY_EPSILON;
            continue;
        }
`}function Cd(e,t){const r=bo(t.vertex),n=t.fragment??"",i=t.lit!==!1;return`
fn userVertexTransform_${e}(worldPos: vec3<f32>, normal: vec3<f32>, eid: u32) -> vec3<f32> {
    ${r}
}

fn userFragment_${e}(surface: ptr<function, SurfaceData>, position: vec4<f32>) {
    ${n}
}

fn applyLighting_${e}(surface: SurfaceData) -> vec3<f32> {
    ${i?`${Vl}
    return surface.baseColor * lighting + surface.emission;`:"return surface.baseColor;"}
}
`}function Sd(e){const t=Array.from({length:e},(i,s)=>`        case ${s}u: { return userVertexTransform_${s}(worldPos, normal, eid); }`).join(`
`),r=Array.from({length:e},(i,s)=>`        case ${s}u: { userFragment_${s}(surface, position); }`).join(`
`),n=Array.from({length:e},(i,s)=>`        case ${s}u: { return applyLighting_${s}(surface); }`).join(`
`);return`
fn dispatchVertexTransform(surfaceId: u32, worldPos: vec3<f32>, normal: vec3<f32>, eid: u32) -> vec3<f32> {
    switch surfaceId {
${t}
        default: { return userVertexTransform_0(worldPos, normal, eid); }
    }
}

fn dispatchFragment(surfaceId: u32, surface: ptr<function, SurfaceData>, position: vec4<f32>) {
    switch surfaceId {
${r}
        default: { userFragment_0(surface, position); }
    }
}

fn dispatchLighting(surfaceId: u32, surface: SurfaceData) -> vec3<f32> {
    switch surfaceId {
${n}
        default: { return applyLighting_0(surface); }
    }
}
`}function Td(e){const t=e.map((n,i)=>Cd(i,n)).join(`
`),r=Sd(e.length);return`
${Ml}

@group(0) @binding(8) var<storage, read> surfaceIds: array<u32>;

${t}
${r}

@vertex
fn vs(input: VertexInput) -> VertexOutput {
    let eid = entityIds[input.instance];
    let world = matrices[eid];
    let scaledPos = input.position * sizes[eid].xyz;
    let baseWorldPos = (world * vec4<f32>(scaledPos, 1.0)).xyz;
    let worldNormal = normalize((world * vec4<f32>(input.normal, 0.0)).xyz);
    let surfaceId = surfaceIds[eid] & 0xFFu;
    let finalWorldPos = dispatchVertexTransform(surfaceId, baseWorldPos, worldNormal, eid);
    _ = shapes[eid];

    var output: VertexOutput;
    output.position = scene.viewProj * vec4<f32>(finalWorldPos, 1.0);
    output.color = colors[eid];
    output.worldNormal = worldNormal;
    output.entityId = eid;
    output.worldPos = finalWorldPos;
    return output;
}

@fragment
fn fs(input: VertexOutput) -> FragmentOutput {
    let eid = input.entityId;
    let pbrData = pbr[eid];
    let emissionData = emission[eid];
    let surfaceId = surfaceIds[eid] & 0xFFu;

    var surface: SurfaceData;
    surface.baseColor = input.color.rgb;
    surface.roughness = pbrData.x;
    surface.metallic = pbrData.y;
    surface.emission = emissionData.rgb * emissionData.a;
    surface.normal = normalize(input.worldNormal);
    surface.worldPos = input.worldPos;

    dispatchFragment(surfaceId, &surface, input.position);

    let litColor = dispatchLighting(surfaceId, surface);

    var output: FragmentOutput;
    output.color = vec4<f32>(litColor, input.color.a);
    output.entityId = input.entityId;
    return output;
}
`}async function Ed(e,t,r){const n=Td(t),i=e.createShaderModule({code:n});return e.createRenderPipelineAsync({layout:"auto",vertex:{module:i,entryPoint:"vs",buffers:[{arrayStride:24,attributes:[{shaderLocation:0,offset:0,format:"float32x3"},{shaderLocation:1,offset:12,format:"float32x3"}]}]},fragment:{module:i,entryPoint:"fs",targets:[{format:r},{format:"r32uint"}]},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"},primitive:{topology:"triangle-list",cullMode:"back"}})}function Pd(){return`
${st}

@group(0) @binding(0) var<uniform> scene: Scene;

${wo}
${vo}

struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv: vec2<f32>,
}

@vertex
fn vs(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
    var positions = array<vec2<f32>, 3>(
        vec2(-1.0, -1.0),
        vec2(3.0, -1.0),
        vec2(-1.0, 3.0)
    );
    var output: VertexOutput;
    output.position = vec4(positions[vertexIndex], 0.0, 1.0);
    output.uv = (positions[vertexIndex] + 1.0) * 0.5;
    output.uv.y = 1.0 - output.uv.y;
    return output;
}

@fragment
fn fs(input: VertexOutput) -> @location(0) vec4<f32> {
    let dir = computeSkyDir(input.uv.x, input.uv.y);
    let color = sampleSky(dir);
    return vec4(color, 1.0);
}
`}async function Bd(e,t){const r=Pd(),n=e.createShaderModule({code:r});return e.createRenderPipelineAsync({layout:"auto",vertex:{module:n,entryPoint:"vs"},fragment:{module:n,entryPoint:"fs",targets:[{format:t}]},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"always"},primitive:{topology:"triangle-list"}})}function Ad(e){let t=null,r=null,n=!1,i=null;function s(a){const{device:c,encoder:u}=a,l=a.getTextureView("color"),f=a.getTextureView("linear-depth"),h=a.getTextureView("eid");if(!l||!f||!h||!r)return;const d=c.createBindGroup({layout:r.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.scene}},{binding:1,resource:{buffer:e.data}},{binding:2,resource:l},{binding:3,resource:f},{binding:4,resource:h}]}),m=c.createBindGroup({layout:r.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:e.tlasNodes}},{binding:1,resource:{buffer:e.tlasInstanceIds}},{binding:2,resource:{buffer:e.blasNodes}},{binding:3,resource:{buffer:e.blasTriIds}},{binding:4,resource:{buffer:e.blasTriangles}},{binding:5,resource:{buffer:e.blasMeta}},{binding:6,resource:{buffer:e.instanceInverses}}]}),g=a.getTexture("color");if(!g)return;const y=g.width,w=g.height,p=u.beginComputePass();p.setPipeline(r),p.setBindGroup(0,d),p.setBindGroup(1,m),p.dispatchWorkgroups(Math.ceil(y/8),Math.ceil(w/8)),p.end()}function o(a){const{device:c,encoder:u}=a,l=a.getTextureView("color"),f=a.getTextureView("eid"),h=a.getTextureView("depth");if(!l||!f||!h||!t)return;const d=e.batches();if(!a.getTexture("color"))return;const g=e.getClearColor(),y=e.getSky()&&i;if(y){const p=u.beginRenderPass({colorAttachments:[{view:l,clearValue:{r:g.r,g:g.g,b:g.b,a:1},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:h,depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}}),v=c.createBindGroup({layout:i.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.scene}}]});p.setPipeline(i),p.setBindGroup(0,v),p.draw(3),p.end()}const w=u.beginRenderPass({colorAttachments:[{view:l,clearValue:{r:g.r,g:g.g,b:g.b,a:1},loadOp:y?"load":"clear",storeOp:"store"},{view:f,clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:h,depthClearValue:1,depthLoadOp:y?"load":"clear",depthStoreOp:"store"}});w.setPipeline(t);for(const p of d){if(!p||p.count===0)continue;const v=c.createBindGroup({layout:t.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.scene}},{binding:1,resource:{buffer:p.entityIds}},{binding:2,resource:{buffer:e.matrices}},{binding:3,resource:{buffer:e.colors}},{binding:4,resource:{buffer:e.sizes}},{binding:5,resource:{buffer:e.pbr}},{binding:6,resource:{buffer:e.emission}},{binding:7,resource:{buffer:e.shapes}},{binding:8,resource:{buffer:e.surfaces}}]});w.setBindGroup(0,v),w.setVertexBuffer(0,p.buffers.vertex),w.setIndexBuffer(p.buffers.index,"uint16"),w.drawIndexed(p.buffers.indexCount,p.count)}w.end()}return{id:"forward",inputs:[{id:"tlas-bvh-nodes",access:"read"}],outputs:[{id:"color",access:"write"},{id:"linear-depth",access:"write"},{id:"eid",access:"write"}],async prepare(a){const c=e.getSurfaces();if(t=await Ed(a,c,Fr),i=await Bd(a,Fr),e.getRaytracing()){n=!0;const u=e.acquire?.("compiling shaders");Di(a,c).then(l=>{r=l}).finally(()=>{n=!1,u?.()})}},execute(a){const c=e.getRaytracing();if(c&&!r&&!n){n=!0;const u=e.acquire?.("compiling shaders"),l=e.getSurfaces();Di(a.device,l).then(f=>{r=f}).finally(()=>{n=!1,u?.()})}c&&r?s(a):o(a)}}}function Id(e){return vd(e)}async function Di(e,t){const r=Id(t),n=e.createShaderModule({code:r});return e.createComputePipelineAsync({layout:"auto",compute:{module:n,entryPoint:"main"}})}const Md=`
${st}

@group(0) @binding(0) var<uniform> scene: Scene;
@group(0) @binding(1) var linearDepthTex: texture_2d<f32>;

struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv: vec2<f32>,
}

@vertex
fn vs(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
    var positions = array<vec2<f32>, 3>(
        vec2(-1.0, -1.0),
        vec2(3.0, -1.0),
        vec2(-1.0, 3.0)
    );
    var output: VertexOutput;
    output.position = vec4(positions[vertexIndex], 0.0, 1.0);
    output.uv = (positions[vertexIndex] + 1.0) * 0.5;
    output.uv.y = 1.0 - output.uv.y;
    return output;
}

@fragment
fn fs(input: VertexOutput) -> @builtin(frag_depth) f32 {
    let coords = vec2<i32>(input.position.xy);
    let t = textureLoad(linearDepthTex, coords, 0).r;

    let near = scene.near;
    let far = scene.far;

    if (t > far) {
        return 1.0;
    }

    var ndcDepth: f32;
    if (scene.cameraMode > 0.5) {
        ndcDepth = (t - near) / (far - near);
    } else {
        ndcDepth = (far * (t - near)) / (t * (far - near));
    }

    return clamp(ndcDepth, 0.0, 1.0);
}
`;function kd(e){let t=null;return{id:"depth-convert",inputs:[{id:"linear-depth",access:"read"}],outputs:[{id:"depth",access:"write"}],async prepare(r){const n=r.createShaderModule({code:Md});t=await r.createRenderPipelineAsync({layout:"auto",vertex:{module:n,entryPoint:"vs"},fragment:{module:n,entryPoint:"fs",targets:[]},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"always"},primitive:{topology:"triangle-list"}})},execute(r){if(e.getRaytracing&&!e.getRaytracing())return;const{device:n,encoder:i}=r,s=r.getTextureView("linear-depth"),o=r.getTextureView("depth");if(!s||!o)return;const a=n.createBindGroup({layout:t.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.scene}},{binding:1,resource:s}]}),c=i.beginRenderPass({colorAttachments:[],depthStencilAttachment:{view:o,depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}});c.setPipeline(t),c.setBindGroup(0,a),c.draw(3),c.end()}}}var Be=(e=>(e[e.BeforeOverlay=0]="BeforeOverlay",e[e.Overlay=1]="Overlay",e[e.AfterOverlay=2]="AfterOverlay",e[e.BeforePost=3]="BeforePost",e[e.Post=4]="Post",e[e.AfterPost=5]="AfterPost",e))(Be||{});const Zn=Ie("draws");function jn(e,t){const r=Zn.from(e);r&&r.draws.set(t.id,t)}function bt(e,t){const r=Zn.from(e);return r?Array.from(r.draws.values()).filter(n=>n.pass===t).sort((n,i)=>n.order-i.order):[]}const Fd=`
struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

struct Uniforms {
    exposure: f32,
    vignetteStrength: f32,
    vignetteInner: f32,
    vignetteOuter: f32,
    texelSizeX: f32,
    texelSizeY: f32,
    flags: u32,
    bloomIntensity: f32,
    bloomThreshold: f32,
    bloomRadius: f32,
    quantizeBands: f32,
    _pad: f32,
}

@group(0) @binding(0) var inputTexture: texture_2d<f32>;
@group(0) @binding(1) var inputSampler: sampler;
@group(0) @binding(2) var<uniform> uniforms: Uniforms;
@group(0) @binding(3) var maskTexture: texture_2d<f32>;

const FLAG_TONEMAP: u32 = 1u;
const FLAG_FXAA: u32 = 2u;
const FLAG_VIGNETTE: u32 = 4u;
const FLAG_BLOOM: u32 = 8u;
const FLAG_QUANTIZE: u32 = 16u;

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

fn sampleBloom(uv: vec2f) -> vec3f {
    let texelSize = vec2f(uniforms.texelSizeX, uniforms.texelSizeY);
    // Normalize to reference height (1080p) for resolution-independent bloom
    let height = 1.0 / uniforms.texelSizeY;
    let resolutionScale = height / 1080.0;
    let spread = uniforms.bloomRadius * 4.0 * resolutionScale;
    let threshold = uniforms.bloomThreshold;
    let knee = 0.15;

    var bloom = vec3f(0.0);
    var totalWeight = 0.0;

    // 9x9 kernel with gaussian weights
    for (var y = -4; y <= 4; y++) {
        for (var x = -4; x <= 4; x++) {
            let offset = vec2f(f32(x), f32(y)) * texelSize * spread;
            let dist2 = f32(x * x + y * y);
            let weight = exp(-dist2 * 0.125);

            let sampleColor = textureSample(inputTexture, inputSampler, uv + offset).rgb;
            let brightness = max(max(sampleColor.r, sampleColor.g), sampleColor.b);
            let soft = clamp((brightness - threshold + knee) / (2.0 * knee), 0.0, 1.0);
            let contribution = soft * soft;

            bloom += sampleColor * contribution * weight;
            totalWeight += weight;
        }
    }

    return bloom / totalWeight;
}

fn applyQuantize(color: vec3f) -> vec3f {
    let bands = uniforms.quantizeBands;
    return floor(color * bands + 0.5) / bands;
}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
    var color = textureSample(inputTexture, inputSampler, input.uv).rgb;
    let maskValue = textureSample(maskTexture, inputSampler, input.uv).r;

    if (uniforms.flags & FLAG_FXAA) != 0u {
        let fxaaColor = applyFXAA(input.uv, color);
        color = select(fxaaColor, color, maskValue >= 0.5);
    }

    // Bloom applied before tonemapping
    if (uniforms.flags & FLAG_BLOOM) != 0u {
        let bloom = sampleBloom(input.uv);
        color += bloom * uniforms.bloomIntensity;
    }

    if (uniforms.flags & FLAG_QUANTIZE) != 0u {
        color = applyQuantize(color);
    }

    if (uniforms.flags & FLAG_TONEMAP) != 0u {
        color = aces(color * uniforms.exposure);
    }

    if (uniforms.flags & FLAG_VIGNETTE) != 0u {
        color = applyVignette(color, input.uv);
    }

    return vec4f(color, 1.0);
}
`,Nd=`
struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

@group(0) @binding(0) var inputTexture: texture_2d<f32>;
@group(0) @binding(1) var inputSampler: sampler;

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

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
    return textureSample(inputTexture, inputSampler, input.uv);
}
`,Od=1,Rd=2,zd=4,Dd=8,Ld=16;function Ud(e){let t=null,r=null,n=null,i=null,s=null;return{id:"postprocess",inputs:[{id:"color",access:"read"},{id:"mask",access:"read"},{id:"pingA",access:"read"},{id:"pingB",access:"read"}],outputs:[{id:"framebuffer",access:"write"}],async prepare(o){const a="bgra8unorm",[c,u]=await Promise.all([o.createShaderModule({code:Fd}),o.createShaderModule({code:Nd})]);[t,r]=await Promise.all([o.createRenderPipelineAsync({layout:"auto",vertex:{module:c,entryPoint:"vertexMain"},fragment:{module:c,entryPoint:"fragmentMain",targets:[{format:a}]},primitive:{topology:"triangle-list"}}),o.createRenderPipelineAsync({layout:"auto",vertex:{module:u,entryPoint:"vertexMain"},fragment:{module:u,entryPoint:"fragmentMain",targets:[{format:a}]},primitive:{topology:"triangle-list"}})]),n=o.createBuffer({size:48,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),i=o.createSampler({magFilter:"linear",minFilter:"linear"}),s=o.createSampler({magFilter:"nearest",minFilter:"nearest"})},execute(o){const{device:a,encoder:c,canvasView:u,format:l,context:f}=o,h=f.canvas.width,d=f.canvas.height,m=o.getTextureView("color"),g=o.getTextureView("mask"),y=o.getTextureView("depth"),w=o.getTextureView("eid"),p=o.getTextureView("pingA"),v=o.getTextureView("pingB"),x=e.getRenderSize?.(),S=x&&(x.width!==h||x.height!==d)?s:i;let _=m,E=p,B=!1;const R=bt(e.state,Be.BeforePost);for(const L of R){const D={device:a,encoder:c,format:l,width:h,height:d,sceneView:m,depthView:y,entityIdView:w,maskView:g,canvasView:u,inputView:_,outputView:E};L.execute(D),_=E,E=B?p:v,B=!B}const k=bt(e.state,Be.Post),q=e.uniforms.tonemap||e.uniforms.fxaa||e.uniforms.vignetteStrength>0||e.uniforms.bloomIntensity>0||e.uniforms.quantize>0;if(q||k.length>0){for(const L of k){const D={device:a,encoder:c,format:l,width:h,height:d,sceneView:m,depthView:y,entityIdView:w,maskView:g,canvasView:u,inputView:_,outputView:E};L.execute(D),_=E,E=B?p:v,B=!B}if(q){let L=0;e.uniforms.tonemap&&(L|=Od),e.uniforms.fxaa&&(L|=Rd),e.uniforms.vignetteStrength>0&&(L|=zd),e.uniforms.bloomIntensity>0&&(L|=Dd),e.uniforms.quantize>0&&(L|=Ld);const D=new ArrayBuffer(48),H=new Float32Array(D),me=new Uint32Array(D);H[0]=e.uniforms.exposure,H[1]=e.uniforms.vignetteStrength,H[2]=e.uniforms.vignetteInner,H[3]=e.uniforms.vignetteOuter,H[4]=1/h,H[5]=1/d,me[6]=L,H[7]=e.uniforms.bloomIntensity,H[8]=e.uniforms.bloomThreshold,H[9]=e.uniforms.bloomRadius,H[10]=e.uniforms.quantize,a.queue.writeBuffer(n,0,D);const at=a.createBindGroup({layout:t.getBindGroupLayout(0),entries:[{binding:0,resource:_},{binding:1,resource:S},{binding:2,resource:{buffer:n}},{binding:3,resource:g}]}),ct=c.beginRenderPass({colorAttachments:[{view:u,loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:1}}]});ct.setPipeline(t),ct.setBindGroup(0,at),ct.draw(3),ct.end()}else{const L=a.createBindGroup({layout:r.getBindGroupLayout(0),entries:[{binding:0,resource:_},{binding:1,resource:S}]}),D=c.beginRenderPass({colorAttachments:[{view:u,loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:1}}]});D.setPipeline(r),D.setBindGroup(0,L),D.draw(3),D.end()}}else{const L=a.createBindGroup({layout:r.getBindGroupLayout(0),entries:[{binding:0,resource:_},{binding:1,resource:S}]}),D=c.beginRenderPass({colorAttachments:[{view:u,loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:1}}]});D.setPipeline(r),D.setBindGroup(0,L),D.draw(3),D.end()}const ee=bt(e.state,Be.AfterPost);for(const L of ee){const D={device:a,encoder:c,format:l,width:h,height:d,sceneView:m,depthView:y,entityIdView:w,maskView:g,canvasView:u};L.execute(D)}}}}function Vd(e){return{id:"overlay",inputs:[{id:"depth",access:"read"}],outputs:[{id:"color",access:"write"},{id:"mask",access:"write"}],execute(t){const{device:r,encoder:n,format:i,context:s}=t,o=t.getTextureView("color")??t.canvasView,a=t.getTextureView("depth"),c=t.getTextureView("mask"),u=t.getTextureView("eid"),l={device:r,encoder:n,format:i,width:s.canvas.width,height:s.canvas.height,sceneView:o,depthView:a,entityIdView:u,maskView:c,canvasView:t.canvasView},f=bt(e.state,Be.BeforeOverlay);for(const m of f)m.execute(l);const h=bt(e.state,Be.Overlay);if(h.length>0){const m=n.beginRenderPass({colorAttachments:[{view:o,loadOp:"load",storeOp:"store"},{view:c,clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:a,depthLoadOp:"load",depthStoreOp:"store"}}),g={device:r,format:Fr,maskFormat:_o};for(const y of h)y.draw&&y.draw(m,g);m.end()}const d=bt(e.state,Be.AfterOverlay);for(const m of d)m.execute(l)}}}function ae(e,t,r){return{x:e,y:t,z:r}}function wt(e,t){return{x:Math.min(e.x,t.x),y:Math.min(e.y,t.y),z:Math.min(e.z,t.z)}}function vt(e,t){return{x:Math.max(e.x,t.x),y:Math.max(e.y,t.y),z:Math.max(e.z,t.z)}}function St(e,t){return{x:e.x+t.x,y:e.y+t.y,z:e.z+t.z}}function Li(e,t){return{x:e.x-t.x,y:e.y-t.y,z:e.z-t.z}}function Gd(e,t){return{x:e.x*t,y:e.y*t,z:e.z*t}}function sn(e){const t=Math.abs(e.x)+Math.abs(e.y)+Math.abs(e.z);let r=e.x/t,n=e.y/t;if(e.z/t<0){const a=r>=0?1:-1,c=n>=0?1:-1,u=(1-Math.abs(n))*a,l=(1-Math.abs(r))*c;r=u,n=l}const s=Math.floor(Math.max(0,Math.min(65535,(r*.5+.5)*65535)));return(Math.floor(Math.max(0,Math.min(65535,(n*.5+.5)*65535)))<<16|s)>>>0}function $d(e){const t=[],{vertices:r,indices:n,indexCount:i}=e,s=6;for(let o=0;o<i;o+=3){const a=n[o],c=n[o+1],u=n[o+2],l=ae(r[a*s],r[a*s+1],r[a*s+2]),f=ae(r[c*s],r[c*s+1],r[c*s+2]),h=ae(r[u*s],r[u*s+1],r[u*s+2]),d=ae(r[a*s+3],r[a*s+4],r[a*s+5]),m=ae(r[c*s+3],r[c*s+4],r[c*s+5]),g=ae(r[u*s+3],r[u*s+4],r[u*s+5]);t.push({v0:l,e1:Li(f,l),e2:Li(h,l),n0:d,n1:m,n2:g})}return t}function Wd(e){if(e.length===0)return{min:ae(0,0,0),max:ae(0,0,0)};let t=ae(1/0,1/0,1/0),r=ae(-1/0,-1/0,-1/0);for(const n of e){const i=n.v0,s=St(i,n.e1),o=St(i,n.e2);t=wt(t,i),t=wt(t,s),t=wt(t,o),r=vt(r,i),r=vt(r,s),r=vt(r,o)}return{min:t,max:r}}function on(e){let t=e&1023;return t=(t|t<<16)&50331903,t=(t|t<<8)&50393103,t=(t|t<<4)&51130563,t=(t|t<<2)&153391689,t>>>0}function Qd(e,t,r){return(on(e)<<2|on(t)<<1|on(r))>>>0}function Hd(e,t){const r={x:t.max.x-t.min.x,y:t.max.y-t.min.y,z:t.max.z-t.min.z},n={x:Math.max(r.x,1e-6),y:Math.max(r.y,1e-6),z:Math.max(r.z,1e-6)},i={x:(e.x-t.min.x)/n.x,y:(e.y-t.min.y)/n.y,z:(e.z-t.min.z)/n.z},s={x:Math.max(0,Math.min(1,i.x)),y:Math.max(0,Math.min(1,i.y)),z:Math.max(0,Math.min(1,i.z))},o={x:Math.floor(s.x*1023),y:Math.floor(s.y*1023),z:Math.floor(s.z*1023)};return Qd(o.x,o.y,o.z)}function Xd(e,t){return e.map((r,n)=>{const i=St(r.v0,Gd(St(r.e1,r.e2),.3333333333333333));return{code:Hd(i,t),triangleId:n}})}function Yd(e){const t=e.length;if(t===0)return[];let r=[...e],n=new Array(t);for(let i=0;i<4;i++){const s=i*8,o=new Array(256).fill(0);for(const c of r){const u=c.code>>>s&255;o[u]++}let a=0;for(let c=0;c<256;c++){const u=o[c];o[c]=a,a+=u}for(const c of r){const u=c.code>>>s&255;n[o[u]]=c,o[u]++}[r,n]=[n,r]}return r}function Or(e){return e===0?32:Math.clz32(e>>>0)}function lr(e,t,r){const n=e.length;if(r<0||r>=n)return-1;const i=e[t].code>>>0,s=e[r].code>>>0;return i===s?Or((t^r)>>>0)+32:Or((i^s)>>>0)}function qd(e,t){const r=e.length;if(t===0)return[0,r-1];const n=lr(e,t,t-1),i=lr(e,t,t+1),s=i>n?1:-1,o=Math.min(n,i);let a=2;for(;lr(e,t,t+a*s)>o;)a*=2;let c=0,u=Math.floor(a/2);for(;u>=1;)lr(e,t,t+(c+u)*s)>o&&(c+=u),u=Math.floor(u/2);const l=t+c*s,f=Math.min(t,l),h=Math.max(t,l);return[f,h]}function Zd(e,t,r){const n=e[t].code>>>0,i=e[r].code>>>0;if(n===i)return Math.floor((t+r)/2);const s=Or((n^i)>>>0);let o=t,a=r-t;do{a=Math.floor((a+1)/2);const c=o+a;if(c<r){const u=e[c].code>>>0;Or((n^u)>>>0)>s&&(o=c)}}while(a>1);return o}function jd(e){const t=e.length;if(t===0)return{nodes:[],parents:[]};if(t===1)return{nodes:[],parents:[-1]};const r=t-1,n=new Array(r),i=new Array(2*t).fill(-1);for(let s=0;s<r;s++){const[o,a]=qd(e,s),c=Zd(e,o,a),u=Math.min(o,a)===c,l=Math.max(o,a)===c+1;let f,h;u?(f=(c|Nr)>>>0,i[c]=s):(f=c,i[t+c]=s),l?(h=(c+1|Nr)>>>0,i[c+1]=s):(h=c+1,i[t+(c+1)]=s),n[s]={min:ae(1e30,1e30,1e30),max:ae(-1e30,-1e30,-1e30),leftChild:f,rightChild:h}}return{nodes:n,parents:i}}function Ui(e){const t=e.v0,r=St(t,e.e1),n=St(t,e.e2),i=wt(wt(t,r),n),s=vt(vt(t,r),n);return{min:i,max:s}}function Kd(e,t,r,n){const i=t.length;if(i<=1)return;const s=new Array(i-1).fill(0);for(let o=0;o<i;o++){t[r[o].triangleId];let a=o,c=!0;for(let u=0;u<64;u++){const l=c?n[a]:n[i+a];if(l===-1||l===void 0)break;const f=s[l];if(s[l]++,f===0)break;const h=e[l],d=h.leftChild,m=h.rightChild;let g,y;if(Ri(d)){const w=t[r[zi(d)].triangleId];g=Ui(w)}else g={min:e[d].min,max:e[d].max};if(Ri(m)){const w=t[r[zi(m)].triangleId];y=Ui(w)}else y={min:e[m].min,max:e[m].max};if(e[l].min=wt(g.min,y.min),e[l].max=vt(g.max,y.max),a=l,c=!1,l===0)break}}}function Jd(e){const t=e.length;if(t===0)return{nodes:[],sortedTriIds:[],aabbMin:ae(0,0,0),aabbMax:ae(0,0,0),triCount:0};const r=Wd(e);if(t===1)return{nodes:[],sortedTriIds:[0],aabbMin:r.min,aabbMax:r.max,triCount:1};const n=Xd(e,r),i=Yd(n),{nodes:s,parents:o}=jd(i);Kd(s,e,i,o);const a=i.map(u=>u.triangleId),c=s.length>0?{min:s[0].min,max:s[0].max}:r;return{nodes:s,sortedTriIds:a,aabbMin:c.min,aabbMax:c.max,triCount:t}}const Bt=16,Vi=64;function ef(e,t){const r=new Map,n=new Map,i=[];let s=0,o=0,a=0;for(let b=0;b<Bt;b++){const S=t(b);if(!S||S.indexCount===0){i.push({nodeOffset:0,triIdOffset:0,triOffset:0,triCount:0});continue}const _=$d(S),E=Jd(_);r.set(b,E),n.set(b,_),i.push({nodeOffset:s,triIdOffset:o,triOffset:a,triCount:E.triCount}),s+=E.nodes.length,o+=E.sortedTriIds.length,a+=_.length}const c=new Float32Array(Math.max(s*8,8)),u=new Uint32Array(Math.max(o,1)),l=new Uint32Array(Bt*4),f=new Uint32Array(Math.max(a*16,16));let h=0,d=0,m=0;for(let b=0;b<Bt;b++){const S=r.get(b),_=n.get(b);if(!(!S||!_)){for(const E of S.nodes)c[h*8+0]=E.min.x,c[h*8+1]=E.min.y,c[h*8+2]=E.min.z,c[h*8+3]=new Float32Array(new Uint32Array([E.leftChild]).buffer)[0],c[h*8+4]=E.max.x,c[h*8+5]=E.max.y,c[h*8+6]=E.max.z,c[h*8+7]=new Float32Array(new Uint32Array([E.rightChild]).buffer)[0],h++;for(const E of S.sortedTriIds)u[d++]=E;for(const E of _){const B=m*16,R=new Float32Array(f.buffer,B*4,16);R[0]=E.v0.x,R[1]=E.v0.y,R[2]=E.v0.z,f[B+3]=0,R[4]=E.e1.x,R[5]=E.e1.y,R[6]=E.e1.z,f[B+7]=0,R[8]=E.e2.x,R[9]=E.e2.y,R[10]=E.e2.z,f[B+11]=0,f[B+12]=sn(E.n0),f[B+13]=sn(E.n1),f[B+14]=sn(E.n2),f[B+15]=0,m++}}}for(let b=0;b<i.length;b++)l[b*4+0]=i[b].nodeOffset,l[b*4+1]=i[b].triIdOffset,l[b*4+2]=i[b].triOffset,l[b*4+3]=i[b].triCount;const g=e.createBuffer({label:"blas-nodes",size:Math.max(c.byteLength,32),usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(g,0,c);const y=e.createBuffer({label:"blas-triIds",size:Math.max(u.byteLength,4),usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(y,0,u);const w=e.createBuffer({label:"blas-meta",size:l.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(w,0,l);const p=e.createBuffer({label:"blas-triangles",size:Math.max(a*Vi,Vi),usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(p,0,f);const v=new Float32Array(Bt*8);for(let b=0;b<Bt;b++){const S=r.get(b),_=b*8;S&&(v[_+0]=S.aabbMin.x,v[_+1]=S.aabbMin.y,v[_+2]=S.aabbMin.z,v[_+3]=0,v[_+4]=S.aabbMax.x,v[_+5]=S.aabbMax.y,v[_+6]=S.aabbMax.z,v[_+7]=0)}const x=e.createBuffer({label:"shape-aabbs",size:v.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});return e.queue.writeBuffer(x,0,v),{blasData:r,nodesBuffer:g,triIdsBuffer:y,metaBuffer:w,trianglesBuffer:p,triangles:n,shapeAABBs:x}}const Yt=16,qt=16,Te=Yt*qt,lt=2*Te,tf=`
@group(0) @binding(0) var<storage, read> input: array<u32>;
@group(0) @binding(1) var<storage, read_write> localSums: array<u32>;
@group(0) @binding(2) var<storage, read_write> blockSums: array<u32>;

override WG_COUNT: u32;
override BIT: u32;
override COUNT: u32;

var<workgroup> wgData: array<u32, 2 * (${Te} + 1)>;

@compute @workgroup_size(${Yt}, ${qt}, 1)
fn main(
    @builtin(workgroup_id) wid: vec3<u32>,
    @builtin(num_workgroups) wdim: vec3<u32>,
    @builtin(local_invocation_index) tid: u32,
) {
    let workgroup = wid.x + wid.y * wdim.x;
    let base = workgroup * ${Te}u;
    let gid = base + tid;

    let val = select(input[gid], 0u, gid >= COUNT);
    let bits = (val >> BIT) & 0x3;

    var sums = array<u32, 4>(0, 0, 0, 0);
    var lastThread = 0xffffffffu;

    if (workgroup < WG_COUNT) {
        lastThread = min(${Te}u, COUNT - base) - 1;
    }

    let stride = ${Te}u + 1;
    var swap = 0u;
    var inOff = tid;
    var outOff = tid + stride;

    for (var b = 0u; b < 4; b++) {
        let mask = select(0u, 1u, bits == b);
        wgData[inOff + 1] = mask;
        workgroupBarrier();

        var sum = 0u;
        for (var off = 1u; off < ${Te}u; off *= 2) {
            if (tid >= off) {
                sum = wgData[inOff] + wgData[inOff - off];
            } else {
                sum = wgData[inOff];
            }
            wgData[outOff] = sum;
            outOff = inOff;
            swap = stride - swap;
            inOff = tid + swap;
            workgroupBarrier();
        }

        sums[b] = sum;

        if (tid == lastThread) {
            blockSums[b * WG_COUNT + workgroup] = sum + mask;
        }

        outOff = inOff;
        swap = stride - swap;
        inOff = tid + swap;
    }

    if (gid < COUNT) {
        localSums[gid] = sums[bits];
    }
}
`,rf=`
@group(0) @binding(0) var<storage, read> inKeys: array<u32>;
@group(0) @binding(1) var<storage, read_write> outKeys: array<u32>;
@group(0) @binding(2) var<storage, read> localSums: array<u32>;
@group(0) @binding(3) var<storage, read> blockSums: array<u32>;
@group(0) @binding(4) var<storage, read> inVals: array<u32>;
@group(0) @binding(5) var<storage, read_write> outVals: array<u32>;

override WG_COUNT: u32;
override BIT: u32;
override COUNT: u32;

@compute @workgroup_size(${Yt}, ${qt}, 1)
fn main(
    @builtin(workgroup_id) wid: vec3<u32>,
    @builtin(num_workgroups) wdim: vec3<u32>,
    @builtin(local_invocation_index) tid: u32,
) {
    let workgroup = wid.x + wid.y * wdim.x;
    let gid = workgroup * ${Te}u + tid;

    if (gid >= COUNT) { return; }

    let k = inKeys[gid];
    let v = inVals[gid];
    let bits = (k >> BIT) & 0x3;
    let dst = blockSums[bits * WG_COUNT + workgroup] + localSums[gid];

    outKeys[dst] = k;
    outVals[dst] = v;
}
`,nf=`
@group(0) @binding(0) var<storage, read_write> data: array<u32>;
@group(0) @binding(1) var<storage, read_write> blockSums: array<u32>;

override COUNT: u32;

var<workgroup> temp: array<u32, ${lt*2}>;

@compute @workgroup_size(${Yt}, ${qt}, 1)
fn scan(
    @builtin(workgroup_id) wid: vec3<u32>,
    @builtin(num_workgroups) wdim: vec3<u32>,
    @builtin(local_invocation_index) tid: u32,
) {
    let workgroup = wid.x + wid.y * wdim.x;
    let base = workgroup * ${Te}u;
    let gid = base + tid;
    let eid = gid * 2;

    temp[tid * 2] = select(data[eid], 0u, eid >= COUNT);
    temp[tid * 2 + 1] = select(data[eid + 1], 0u, eid + 1 >= COUNT);

    var offset = 1u;
    for (var d = ${lt}u >> 1; d > 0; d >>= 1) {
        workgroupBarrier();
        if (tid < d) {
            let ai = offset * (tid * 2 + 1) - 1;
            let bi = offset * (tid * 2 + 2) - 1;
            temp[bi] += temp[ai];
        }
        offset *= 2;
    }

    if (tid == 0) {
        blockSums[workgroup] = temp[${lt}u - 1];
        temp[${lt}u - 1] = 0;
    }

    for (var d = 1u; d < ${lt}u; d *= 2) {
        offset >>= 1;
        workgroupBarrier();
        if (tid < d) {
            let ai = offset * (tid * 2 + 1) - 1;
            let bi = offset * (tid * 2 + 2) - 1;
            let t = temp[ai];
            temp[ai] = temp[bi];
            temp[bi] += t;
        }
    }
    workgroupBarrier();

    if (eid < COUNT) { data[eid] = temp[tid * 2]; }
    if (eid + 1 < COUNT) { data[eid + 1] = temp[tid * 2 + 1]; }
}

@compute @workgroup_size(${Yt}, ${qt}, 1)
fn addBlocks(
    @builtin(workgroup_id) wid: vec3<u32>,
    @builtin(num_workgroups) wdim: vec3<u32>,
    @builtin(local_invocation_index) tid: u32,
) {
    let workgroup = wid.x + wid.y * wdim.x;
    let eid = (workgroup * ${Te}u + tid) * 2;

    if (eid >= COUNT) { return; }

    let sum = blockSums[workgroup];
    data[eid] += sum;
    if (eid + 1 < COUNT) { data[eid + 1] += sum; }
}
`;function To(e,t){const r=e.limits.maxComputeWorkgroupsPerDimension;if(t<=r)return[t,1];const n=Math.ceil(Math.sqrt(t));return[n,Math.ceil(t/n)]}class Ut{constructor(t){this.passes=t}static async create(t,r,n){const i=[],s=t.createShaderModule({code:nf});return await Ut.build(t,s,r,n,i),new Ut(i)}static async build(t,r,n,i,s){const o=Math.ceil(i/lt),a=To(t,o),c=t.createBuffer({size:Math.max(o*4,4),usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),u=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),l=t.createBindGroup({layout:u,entries:[{binding:0,resource:{buffer:n}},{binding:1,resource:{buffer:c}}]}),f=t.createPipelineLayout({bindGroupLayouts:[u]});s.push({pipeline:await t.createComputePipelineAsync({layout:f,compute:{module:r,entryPoint:"scan",constants:{COUNT:i}}}),bindGroup:l,dispatch:a}),o>1&&(await Ut.build(t,r,c,o,s),s.push({pipeline:await t.createComputePipelineAsync({layout:f,compute:{module:r,entryPoint:"addBlocks",constants:{COUNT:i}}}),bindGroup:l,dispatch:a}))}dispatch(t){for(const r of this.passes)t.setPipeline(r.pipeline),t.setBindGroup(0,r.bindGroup),t.dispatchWorkgroups(r.dispatch[0],r.dispatch[1],1)}}class Kn{constructor(t,r,n){this.passes=t,this.prefixSum=r,this.workgroups=n}static async create(t,r,n,i){const s=Math.ceil(i/Te),o=To(t,s),a=t.createBuffer({size:i*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),c=t.createBuffer({size:i*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),u=t.createBuffer({size:i*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),l=t.createBuffer({size:4*s*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),f=await Ut.create(t,l,4*s),h=t.createShaderModule({code:tf}),d=t.createShaderModule({code:rf}),m=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),g=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),y=[];for(let v=0;v<32;v+=2)y.push((async()=>{const[x,b]=await Promise.all([t.createComputePipelineAsync({layout:t.createPipelineLayout({bindGroupLayouts:[m]}),compute:{module:h,entryPoint:"main",constants:{WG_COUNT:s,BIT:v,COUNT:i}}}),t.createComputePipelineAsync({layout:t.createPipelineLayout({bindGroupLayouts:[g]}),compute:{module:d,entryPoint:"main",constants:{WG_COUNT:s,BIT:v,COUNT:i}}})]);return{blockSum:x,reorder:b}})());const w=await Promise.all(y),p=[];for(let v=0;v<16;v++){const b=v*2%4===0,S=b?r:a,_=b?n:c,E=b?a:r,B=b?c:n;p.push({blockSum:{pipeline:w[v].blockSum,bindGroup:t.createBindGroup({layout:m,entries:[{binding:0,resource:{buffer:S}},{binding:1,resource:{buffer:u}},{binding:2,resource:{buffer:l}}]})},reorder:{pipeline:w[v].reorder,bindGroup:t.createBindGroup({layout:g,entries:[{binding:0,resource:{buffer:S}},{binding:1,resource:{buffer:E}},{binding:2,resource:{buffer:u}},{binding:3,resource:{buffer:l}},{binding:4,resource:{buffer:_}},{binding:5,resource:{buffer:B}}]})}})}return new Kn(p,f,o)}dispatch(t){const[r,n]=this.workgroups;for(const i of this.passes)t.setPipeline(i.blockSum.pipeline),t.setBindGroup(0,i.blockSum.bindGroup),t.dispatchWorkgroups(r,n,1),this.prefixSum.dispatch(t),t.setPipeline(i.reorder.pipeline),t.setBindGroup(0,i.reorder.bindGroup),t.dispatchWorkgroups(r,n,1)}}function sf(e,t){return Kn.create(e,t.keys,t.values,t.count)}const we=256,yr=Math.ceil(Math.log2(I))+1;function of(e){return{treeNodes:e.createBuffer({label:"tlas-tree-nodes",size:2*I*ed,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),bvhNodes:e.createBuffer({label:"tlas-bvh-nodes",size:I*td,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),mortonCodes:e.createBuffer({label:"tlas-morton-codes",size:I*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),instanceIds:e.createBuffer({label:"tlas-instance-ids",size:I*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),entityIds:e.createBuffer({label:"tlas-entity-ids",size:I*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),sceneBounds:e.createBuffer({label:"tlas-scene-bounds",size:32,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC}),parentIndices:e.createBuffer({label:"tlas-parent-indices",size:2*I*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),boundsFlags:e.createBuffer({label:"tlas-bounds-flags",size:I*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC})}}const Jn=`
struct InstanceAABB {
    minX: f32,
    minY: f32,
    minZ: f32,
    _pad0: u32,
    maxX: f32,
    maxY: f32,
    maxZ: f32,
    _pad1: u32,
}`,af=`
struct SceneBounds {
    minX: atomic<i32>,
    minY: atomic<i32>,
    minZ: atomic<i32>,
    _pad0: u32,
    maxX: atomic<i32>,
    maxY: atomic<i32>,
    maxZ: atomic<i32>,
    _pad1: u32,
}`,cf=`
struct SceneBounds {
    minX: i32,
    minY: i32,
    minZ: i32,
    _pad0: u32,
    maxX: i32,
    maxY: i32,
    maxZ: i32,
    _pad1: u32,
}`,Eo=`
fn floatToSortableInt(f: f32) -> i32 {
    let bits = bitcast<i32>(f);
    let mask = (bits >> 31) & 0x7FFFFFFF;
    return bits ^ mask;
}

fn sortableIntToFloat(i: i32) -> f32 {
    let mask = (i >> 31) & 0x7FFFFFFF;
    return bitcast<f32>(i ^ mask);
}`,uf=`
fn expandBits(v: u32) -> u32 {
    var x = v & 0x3ffu;
    x = (x | (x << 16u)) & 0x030000ffu;
    x = (x | (x << 8u)) & 0x0300f00fu;
    x = (x | (x << 4u)) & 0x030c30c3u;
    x = (x | (x << 2u)) & 0x09249249u;
    return x;
}

fn mortonCode(x: u32, y: u32, z: u32) -> u32 {
    return (expandBits(x) << 2u) | (expandBits(y) << 1u) | expandBits(z);
}`,lf=`
fn clz(x: u32) -> u32 {
    if (x == 0u) { return 32u; }
    var n = 0u;
    var v = x;
    if ((v & 0xffff0000u) == 0u) { n += 16u; v <<= 16u; }
    if ((v & 0xff000000u) == 0u) { n += 8u; v <<= 8u; }
    if ((v & 0xf0000000u) == 0u) { n += 4u; v <<= 4u; }
    if ((v & 0xc0000000u) == 0u) { n += 2u; v <<= 2u; }
    if ((v & 0x80000000u) == 0u) { n += 1u; }
    return n;
}`,df=`
fn isLeaf(child: u32) -> bool {
    return (child & LEAF_FLAG) != 0u;
}

fn leafIndex(child: u32) -> u32 {
    return child & ~LEAF_FLAG;
}`,ff=`
${Jn}
${af}

@group(0) @binding(0) var<storage, read> instanceAABBs: array<InstanceAABB>;
@group(0) @binding(1) var<storage, read> instanceCount: array<u32>;
@group(0) @binding(2) var<storage, read_write> sceneBounds: SceneBounds;
@group(0) @binding(3) var<storage, read> entityIds: array<u32>;

var<workgroup> sharedMin: array<vec3<f32>, ${we}>;
var<workgroup> sharedMax: array<vec3<f32>, ${we}>;

${Eo}

@compute @workgroup_size(${we})
fn main(
    @builtin(global_invocation_id) gid: vec3<u32>,
    @builtin(local_invocation_id) lid: vec3<u32>,
) {
    let count = instanceCount[0];
    let tid = gid.x;
    let localId = lid.x;

    var localMin = vec3<f32>(1e30, 1e30, 1e30);
    var localMax = vec3<f32>(-1e30, -1e30, -1e30);

    if (tid < count) {
        let eid = entityIds[tid];
        let aabb = instanceAABBs[eid];
        localMin = vec3<f32>(aabb.minX, aabb.minY, aabb.minZ);
        localMax = vec3<f32>(aabb.maxX, aabb.maxY, aabb.maxZ);
    }

    sharedMin[localId] = localMin;
    sharedMax[localId] = localMax;
    workgroupBarrier();

    for (var stride = ${we}u / 2u; stride > 0u; stride >>= 1u) {
        if (localId < stride) {
            sharedMin[localId] = min(sharedMin[localId], sharedMin[localId + stride]);
            sharedMax[localId] = max(sharedMax[localId], sharedMax[localId + stride]);
        }
        workgroupBarrier();
    }

    if (localId == 0u) {
        let wgMin = sharedMin[0];
        let wgMax = sharedMax[0];

        atomicMin(&sceneBounds.minX, floatToSortableInt(wgMin.x));
        atomicMin(&sceneBounds.minY, floatToSortableInt(wgMin.y));
        atomicMin(&sceneBounds.minZ, floatToSortableInt(wgMin.z));
        atomicMax(&sceneBounds.maxX, floatToSortableInt(wgMax.x));
        atomicMax(&sceneBounds.maxY, floatToSortableInt(wgMax.y));
        atomicMax(&sceneBounds.maxZ, floatToSortableInt(wgMax.z));
    }
}
`,hf=`
${Jn}
${cf}

@group(0) @binding(0) var<storage, read> instanceAABBs: array<InstanceAABB>;
@group(0) @binding(1) var<storage, read> instanceCount: array<u32>;
@group(0) @binding(2) var<storage, read> sceneBounds: SceneBounds;
@group(0) @binding(3) var<storage, read_write> mortonCodes: array<u32>;
@group(0) @binding(4) var<storage, read_write> instanceIds: array<u32>;
@group(0) @binding(5) var<storage, read> entityIds: array<u32>;

${Eo}
${uf}

@compute @workgroup_size(${we})
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let tid = gid.x;
    if (tid >= ${I}u) { return; }

    let count = instanceCount[0];
    if (tid >= count) {
        mortonCodes[tid] = 0xFFFFFFFFu;
        instanceIds[tid] = 0u;
        return;
    }

    let eid = entityIds[tid];
    let aabb = instanceAABBs[eid];
    let centroid = vec3<f32>(
        (aabb.minX + aabb.maxX) * 0.5,
        (aabb.minY + aabb.maxY) * 0.5,
        (aabb.minZ + aabb.maxZ) * 0.5
    );

    let boundsMin = vec3<f32>(
        sortableIntToFloat(sceneBounds.minX),
        sortableIntToFloat(sceneBounds.minY),
        sortableIntToFloat(sceneBounds.minZ)
    );
    let boundsMax = vec3<f32>(
        sortableIntToFloat(sceneBounds.maxX),
        sortableIntToFloat(sceneBounds.maxY),
        sortableIntToFloat(sceneBounds.maxZ)
    );

    let size = boundsMax - boundsMin;
    let safeSize = max(size, vec3<f32>(1e-6, 1e-6, 1e-6));

    let normalized = (centroid - boundsMin) / safeSize;
    let clamped = clamp(normalized, vec3<f32>(0.0), vec3<f32>(1.0));

    let quantized = vec3<u32>(clamped * 1023.0);

    mortonCodes[tid] = mortonCode(quantized.x, quantized.y, quantized.z);
    instanceIds[tid] = eid;
}
`,mf=`
${Co}
${Xr}

@group(0) @binding(0) var<storage, read> mortonCodes: array<u32>;
@group(0) @binding(1) var<storage, read> instanceCount: array<u32>;
@group(0) @binding(2) var<storage, read_write> treeNodes: array<TreeNode>;
@group(0) @binding(3) var<storage, read_write> parentIndices: array<u32>;

${lf}

fn delta(i: i32, j: i32, n: i32) -> i32 {
    if (j < 0 || j >= n) {
        return -1;
    }
    let codeI = mortonCodes[i];
    let codeJ = mortonCodes[j];
    if (codeI == codeJ) {
        return i32(clz(u32(i) ^ u32(j))) + 32;
    }
    return i32(clz(codeI ^ codeJ));
}

@compute @workgroup_size(${we})
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let n = i32(instanceCount[0]);
    let i = i32(gid.x);

    if (i >= n - 1) {
        return;
    }

    var first: i32;
    var last: i32;

    if (i == 0) {
        first = 0;
        last = n - 1;
    } else {
        let d = select(-1, 1, delta(i, i + 1, n) > delta(i, i - 1, n));

        let deltaMin = delta(i, i - d, n);

        var lmax = 2;
        for (var iter = 0; iter < ${yr}; iter++) {
            if (delta(i, i + lmax * d, n) <= deltaMin) { break; }
            lmax *= 2;
        }

        var l = 0;
        var t = lmax / 2;
        for (var iter2 = 0; iter2 < ${yr}; iter2++) {
            if (t < 1) { break; }
            if (delta(i, i + (l + t) * d, n) > deltaMin) {
                l += t;
            }
            t /= 2;
        }

        let j = i + l * d;
        first = min(i, j);
        last = max(i, j);
    }

    let firstCode = mortonCodes[first];
    let lastCode = mortonCodes[last];

    var gamma: i32;
    if (firstCode == lastCode) {
        gamma = (first + last) / 2;
    } else {
        let deltaNode = i32(clz(firstCode ^ lastCode));

        var split = first;
        var stride = last - first;

        for (var iter3 = 0; iter3 < ${yr}; iter3++) {
            stride = (stride + 1) / 2;
            let middle = split + stride;

            if (middle < last) {
                let splitCode = mortonCodes[middle];
                let splitDelta = i32(clz(firstCode ^ splitCode));

                if (splitDelta > deltaNode) {
                    split = middle;
                }
            }

            if (stride <= 1) {
                break;
            }
        }

        gamma = split;
    }

    let leftIsLeaf = first == gamma;
    let rightIsLeaf = last == gamma + 1;

    var node: TreeNode;
    node.minX = 1e30;
    node.minY = 1e30;
    node.minZ = 1e30;
    node.maxX = -1e30;
    node.maxY = -1e30;
    node.maxZ = -1e30;

    if (leftIsLeaf) {
        node.leftChild = u32(gamma) | LEAF_FLAG;
        parentIndices[u32(gamma)] = u32(i);
    } else {
        node.leftChild = u32(gamma);
        parentIndices[u32(n) + u32(gamma)] = u32(i);
    }

    if (rightIsLeaf) {
        node.rightChild = u32(gamma + 1) | LEAF_FLAG;
        parentIndices[u32(gamma + 1)] = u32(i);
    } else {
        node.rightChild = u32(gamma + 1);
        parentIndices[u32(n) + u32(gamma + 1)] = u32(i);
    }

    treeNodes[i] = node;
}
`,pf=`
${Jn}
${Xr}

const BOUNDS_SENTINEL: u32 = 0x7f800000u;

@group(0) @binding(0) var<storage, read> instanceAABBs: array<InstanceAABB>;
@group(0) @binding(1) var<storage, read> instanceIds: array<u32>;
@group(0) @binding(2) var<storage, read> instanceCount: array<u32>;
@group(0) @binding(3) var<storage, read_write> bvhNodesRaw: array<atomic<u32>>;
@group(0) @binding(4) var<storage, read_write> boundsFlags: array<atomic<u32>>;
@group(0) @binding(5) var<storage, read> parentIndices: array<u32>;

${df}

fn getInstanceBounds(leafIdx: u32) -> array<vec3<f32>, 2> {
    let eid = instanceIds[leafIdx];
    let aabb = instanceAABBs[eid];
    return array<vec3<f32>, 2>(
        vec3<f32>(aabb.minX, aabb.minY, aabb.minZ),
        vec3<f32>(aabb.maxX, aabb.maxY, aabb.maxZ)
    );
}

fn getParent(nodeIdx: u32, isLeafNode: bool, n: u32) -> u32 {
    if (isLeafNode) {
        return parentIndices[nodeIdx];
    } else {
        return parentIndices[n + nodeIdx];
    }
}

fn nodeBase(idx: u32) -> u32 {
    return idx * 8u;
}

fn readChildBounds(childIdx: u32) -> array<vec3<f32>, 2> {
    let base = nodeBase(childIdx);
    let minX = bitcast<f32>(atomicLoad(&bvhNodesRaw[base + 0u]));
    let minY = bitcast<f32>(atomicLoad(&bvhNodesRaw[base + 1u]));
    let minZ = bitcast<f32>(atomicLoad(&bvhNodesRaw[base + 2u]));
    let maxX = bitcast<f32>(atomicLoad(&bvhNodesRaw[base + 4u]));
    let maxY = bitcast<f32>(atomicLoad(&bvhNodesRaw[base + 5u]));
    let maxZ = bitcast<f32>(atomicLoad(&bvhNodesRaw[base + 6u]));
    return array<vec3<f32>, 2>(vec3(minX, minY, minZ), vec3(maxX, maxY, maxZ));
}

fn writeBounds(nodeIdx: u32, minB: vec3<f32>, maxB: vec3<f32>) {
    let base = nodeBase(nodeIdx);
    atomicStore(&bvhNodesRaw[base + 0u], bitcast<u32>(minB.x));
    atomicStore(&bvhNodesRaw[base + 1u], bitcast<u32>(minB.y));
    atomicStore(&bvhNodesRaw[base + 2u], bitcast<u32>(minB.z));
    atomicStore(&bvhNodesRaw[base + 4u], bitcast<u32>(maxB.x));
    atomicStore(&bvhNodesRaw[base + 5u], bitcast<u32>(maxB.y));
    atomicStore(&bvhNodesRaw[base + 6u], bitcast<u32>(maxB.z));
}

fn readLeftChild(nodeIdx: u32) -> u32 {
    return atomicLoad(&bvhNodesRaw[nodeBase(nodeIdx) + 3u]);
}

fn readRightChild(nodeIdx: u32) -> u32 {
    return atomicLoad(&bvhNodesRaw[nodeBase(nodeIdx) + 7u]);
}

fn writeLeafBounds(leafIdx: u32, n: u32, minB: vec3<f32>, maxB: vec3<f32>) {
    let leafNodeIdx = n - 1u + leafIdx;
    let base = leafNodeIdx * 8u;
    atomicStore(&bvhNodesRaw[base + 0u], bitcast<u32>(minB.x));
    atomicStore(&bvhNodesRaw[base + 1u], bitcast<u32>(minB.y));
    atomicStore(&bvhNodesRaw[base + 2u], bitcast<u32>(minB.z));
    atomicStore(&bvhNodesRaw[base + 4u], bitcast<u32>(maxB.x));
    atomicStore(&bvhNodesRaw[base + 5u], bitcast<u32>(maxB.y));
    atomicStore(&bvhNodesRaw[base + 6u], bitcast<u32>(maxB.z));
}

@compute @workgroup_size(${we})
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let n = instanceCount[0];
    let leafIdx = gid.x;

    if (leafIdx >= n) {
        return;
    }

    let bounds = getInstanceBounds(leafIdx);
    writeLeafBounds(leafIdx, n, bounds[0], bounds[1]);

    var current = leafIdx;
    var isLeafNode = true;

    for (var iter = 0u; iter < 64u; iter++) {
        let parent = getParent(current, isLeafNode, n);

        let oldFlag = atomicAdd(&boundsFlags[parent], 1u);
        if (oldFlag == 0u) {
            return;
        }

        let left = readLeftChild(parent);
        let right = readRightChild(parent);

        var leftMin: vec3<f32>;
        var leftMax: vec3<f32>;
        var rightMin: vec3<f32>;
        var rightMax: vec3<f32>;

        if (isLeaf(left)) {
            let leftBounds = getInstanceBounds(leafIndex(left));
            leftMin = leftBounds[0];
            leftMax = leftBounds[1];
        } else {
            let leftBounds = readChildBounds(left);
            leftMin = leftBounds[0];
            leftMax = leftBounds[1];
        }

        if (isLeaf(right)) {
            let rightBounds = getInstanceBounds(leafIndex(right));
            rightMin = rightBounds[0];
            rightMax = rightBounds[1];
        } else {
            let rightBounds = readChildBounds(right);
            rightMin = rightBounds[0];
            rightMax = rightBounds[1];
        }

        let newMin = min(leftMin, rightMin);
        let newMax = max(leftMax, rightMax);

        writeBounds(parent, newMin, newMax);

        current = parent;
        isLeafNode = false;

        if (parent == 0u) {
            break;
        }
    }
}
`,gf=`
${Co}
${So}
${Xr}

const INVALID_NODE: u32 = 0xFFFFFFFFu;

@group(0) @binding(0) var<storage, read> treeNodes: array<TreeNode>;
@group(0) @binding(1) var<storage, read> instanceCount: array<u32>;
@group(0) @binding(2) var<storage, read> parentIndices: array<u32>;
@group(0) @binding(3) var<storage, read_write> bvhNodes: array<BVHNode>;

fn isLeaf(child: u32) -> bool {
    return (child & LEAF_FLAG) != 0u;
}

fn leafIndex(child: u32) -> u32 {
    return child & ~LEAF_FLAG;
}

fn getDepth(nodeIdx: u32, n: u32) -> u32 {
    var depth = 0u;
    var current = nodeIdx;
    for (var iter = 0u; iter < ${yr}u; iter++) {
        if (current == 0u) { break; }
        current = parentIndices[n + current];
        depth++;
    }
    return depth;
}

fn getChildBounds(child: u32, n: u32) -> array<vec3<f32>, 2> {
    if (isLeaf(child)) {
        let leafNodeIdx = n - 1u + leafIndex(child);
        let node = treeNodes[leafNodeIdx];
        return array<vec3<f32>, 2>(
            vec3<f32>(node.minX, node.minY, node.minZ),
            vec3<f32>(node.maxX, node.maxY, node.maxZ)
        );
    } else {
        let node = treeNodes[child];
        return array<vec3<f32>, 2>(
            vec3<f32>(node.minX, node.minY, node.minZ),
            vec3<f32>(node.maxX, node.maxY, node.maxZ)
        );
    }
}

@compute @workgroup_size(${we})
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let n = instanceCount[0];
    let nodeIdx = gid.x;

    if (n == 1u) {
        if (nodeIdx == 0u) {
            var out: BVHNode;
            out.child0 = 0u | LEAF_FLAG;
            out.child1 = INVALID_NODE;
            out.child2 = INVALID_NODE;
            out.child3 = INVALID_NODE;

            let bounds = getChildBounds(0u | LEAF_FLAG, n);
            out.c0_minX = bounds[0].x; out.c0_minY = bounds[0].y; out.c0_minZ = bounds[0].z;
            out.c0_maxX = bounds[1].x; out.c0_maxY = bounds[1].y; out.c0_maxZ = bounds[1].z;
            out.c1_minX = 1e30; out.c1_minY = 1e30; out.c1_minZ = 1e30;
            out.c1_maxX = -1e30; out.c1_maxY = -1e30; out.c1_maxZ = -1e30;
            out.c2_minX = 1e30; out.c2_minY = 1e30; out.c2_minZ = 1e30;
            out.c2_maxX = -1e30; out.c2_maxY = -1e30; out.c2_maxZ = -1e30;
            out.c3_minX = 1e30; out.c3_minY = 1e30; out.c3_minZ = 1e30;
            out.c3_maxX = -1e30; out.c3_maxY = -1e30; out.c3_maxZ = -1e30;

            bvhNodes[0] = out;
        }
        return;
    }

    if (nodeIdx >= n - 1u) {
        return;
    }

    let depth = getDepth(nodeIdx, n);
    let node = treeNodes[nodeIdx];
    let left = node.leftChild;
    let right = node.rightChild;

    var out: BVHNode;

    out.child0 = INVALID_NODE;
    out.child1 = INVALID_NODE;
    out.child2 = INVALID_NODE;
    out.child3 = INVALID_NODE;
    out.c0_minX = 1e30; out.c0_minY = 1e30; out.c0_minZ = 1e30;
    out.c0_maxX = -1e30; out.c0_maxY = -1e30; out.c0_maxZ = -1e30;
    out.c1_minX = 1e30; out.c1_minY = 1e30; out.c1_minZ = 1e30;
    out.c1_maxX = -1e30; out.c1_maxY = -1e30; out.c1_maxZ = -1e30;
    out.c2_minX = 1e30; out.c2_minY = 1e30; out.c2_minZ = 1e30;
    out.c2_maxX = -1e30; out.c2_maxY = -1e30; out.c2_maxZ = -1e30;
    out.c3_minX = 1e30; out.c3_minY = 1e30; out.c3_minZ = 1e30;
    out.c3_maxX = -1e30; out.c3_maxY = -1e30; out.c3_maxZ = -1e30;

    if ((depth & 1u) != 0u) {
        out.child0 = left;
        let bounds0 = getChildBounds(left, n);
        out.c0_minX = bounds0[0].x; out.c0_minY = bounds0[0].y; out.c0_minZ = bounds0[0].z;
        out.c0_maxX = bounds0[1].x; out.c0_maxY = bounds0[1].y; out.c0_maxZ = bounds0[1].z;

        out.child1 = right;
        let bounds1 = getChildBounds(right, n);
        out.c1_minX = bounds1[0].x; out.c1_minY = bounds1[0].y; out.c1_minZ = bounds1[0].z;
        out.c1_maxX = bounds1[1].x; out.c1_maxY = bounds1[1].y; out.c1_maxZ = bounds1[1].z;

        bvhNodes[nodeIdx] = out;
        return;
    }

    if (isLeaf(left)) {
        out.child0 = left;
        let bounds = getChildBounds(left, n);
        out.c0_minX = bounds[0].x; out.c0_minY = bounds[0].y; out.c0_minZ = bounds[0].z;
        out.c0_maxX = bounds[1].x; out.c0_maxY = bounds[1].y; out.c0_maxZ = bounds[1].z;
    } else {
        let leftNode = treeNodes[left];
        let ll = leftNode.leftChild;
        let lr = leftNode.rightChild;

        out.child0 = ll;
        let bounds0 = getChildBounds(ll, n);
        out.c0_minX = bounds0[0].x; out.c0_minY = bounds0[0].y; out.c0_minZ = bounds0[0].z;
        out.c0_maxX = bounds0[1].x; out.c0_maxY = bounds0[1].y; out.c0_maxZ = bounds0[1].z;

        out.child1 = lr;
        let bounds1 = getChildBounds(lr, n);
        out.c1_minX = bounds1[0].x; out.c1_minY = bounds1[0].y; out.c1_minZ = bounds1[0].z;
        out.c1_maxX = bounds1[1].x; out.c1_maxY = bounds1[1].y; out.c1_maxZ = bounds1[1].z;
    }

    if (isLeaf(right)) {
        out.child2 = right;
        let bounds = getChildBounds(right, n);
        out.c2_minX = bounds[0].x; out.c2_minY = bounds[0].y; out.c2_minZ = bounds[0].z;
        out.c2_maxX = bounds[1].x; out.c2_maxY = bounds[1].y; out.c2_maxZ = bounds[1].z;
    } else {
        let rightNode = treeNodes[right];
        let rl = rightNode.leftChild;
        let rr = rightNode.rightChild;

        out.child2 = rl;
        let bounds2 = getChildBounds(rl, n);
        out.c2_minX = bounds2[0].x; out.c2_minY = bounds2[0].y; out.c2_minZ = bounds2[0].z;
        out.c2_maxX = bounds2[1].x; out.c2_maxY = bounds2[1].y; out.c2_maxZ = bounds2[1].z;

        out.child3 = rr;
        let bounds3 = getChildBounds(rr, n);
        out.c3_minX = bounds3[0].x; out.c3_minY = bounds3[0].y; out.c3_minZ = bounds3[0].z;
        out.c3_maxX = bounds3[1].x; out.c3_maxY = bounds3[1].y; out.c3_maxZ = bounds3[1].z;
    }

    bvhNodes[nodeIdx] = out;
}
`;function yf(e){let t=null,r=null,n=null;return{id:"tlas",sync:!0,inputs:[{id:"instance-aabbs",access:"read"},{id:"instance-count",access:"read"}],outputs:[{id:"tlas-bvh-nodes",access:"write"},{id:"tlas-morton-codes",access:"write"},{id:"tlas-instance-ids",access:"write"}],async prepare(i){const[s,o,a,c,u]=await Promise.all([i.createShaderModule({code:ff}),i.createShaderModule({code:hf}),i.createShaderModule({code:mf}),i.createShaderModule({code:pf}),i.createShaderModule({code:gf})]),[l,f,h,d,m,g]=await Promise.all([i.createComputePipelineAsync({layout:"auto",compute:{module:s,entryPoint:"main"}}),i.createComputePipelineAsync({layout:"auto",compute:{module:o,entryPoint:"main"}}),i.createComputePipelineAsync({layout:"auto",compute:{module:a,entryPoint:"main"}}),i.createComputePipelineAsync({layout:"auto",compute:{module:c,entryPoint:"main"}}),i.createComputePipelineAsync({layout:"auto",compute:{module:u,entryPoint:"main"}}),sf(i,{keys:e.tlas.mortonCodes,values:e.tlas.instanceIds,count:I})]);t={bounds:l,morton:f,tree:h,propagate:d,collapse:m},n=g,r={bounds:i.createBindGroup({layout:t.bounds.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.instanceAABBs}},{binding:1,resource:{buffer:e.instanceCount}},{binding:2,resource:{buffer:e.tlas.sceneBounds}},{binding:3,resource:{buffer:e.tlas.entityIds}}]}),morton:i.createBindGroup({layout:t.morton.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.instanceAABBs}},{binding:1,resource:{buffer:e.instanceCount}},{binding:2,resource:{buffer:e.tlas.sceneBounds}},{binding:3,resource:{buffer:e.tlas.mortonCodes}},{binding:4,resource:{buffer:e.tlas.instanceIds}},{binding:5,resource:{buffer:e.tlas.entityIds}}]}),tree:i.createBindGroup({layout:t.tree.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.tlas.mortonCodes}},{binding:1,resource:{buffer:e.instanceCount}},{binding:2,resource:{buffer:e.tlas.treeNodes}},{binding:3,resource:{buffer:e.tlas.parentIndices}}]}),propagate:i.createBindGroup({layout:t.propagate.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.instanceAABBs}},{binding:1,resource:{buffer:e.tlas.instanceIds}},{binding:2,resource:{buffer:e.instanceCount}},{binding:3,resource:{buffer:e.tlas.treeNodes}},{binding:4,resource:{buffer:e.tlas.boundsFlags}},{binding:5,resource:{buffer:e.tlas.parentIndices}}]}),collapse:i.createBindGroup({layout:t.collapse.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.tlas.treeNodes}},{binding:1,resource:{buffer:e.instanceCount}},{binding:2,resource:{buffer:e.tlas.parentIndices}},{binding:3,resource:{buffer:e.tlas.bvhNodes}}]})}},execute(i){const{device:s,encoder:o}=i,a=Math.ceil(I/we),c=new Int32Array([2139095039,2139095039,2139095039,0,2155872256,2155872256,2155872256,0]);s.queue.writeBuffer(e.tlas.sceneBounds,0,c),o.clearBuffer(e.tlas.boundsFlags),o.clearBuffer(e.tlas.parentIndices);const u=o.beginComputePass();u.setPipeline(t.bounds),u.setBindGroup(0,r.bounds),u.dispatchWorkgroups(a),u.end();const l=o.beginComputePass();l.setPipeline(t.morton),l.setBindGroup(0,r.morton),l.dispatchWorkgroups(a),l.end();const f=o.beginComputePass();n.dispatch(f),f.end();const h=o.beginComputePass();h.setPipeline(t.tree),h.setBindGroup(0,r.tree),h.dispatchWorkgroups(Math.ceil((I-1)/we)),h.end();const d=o.beginComputePass();d.setPipeline(t.propagate),d.setBindGroup(0,r.propagate),d.dispatchWorkgroups(a),d.end();const m=o.beginComputePass();m.setPipeline(t.collapse),m.setBindGroup(0,r.collapse),m.dispatchWorkgroups(Math.ceil((I-1)/we)),m.end()}}}const Po=64,bf=`
struct ShapeAABB {
    minX: f32,
    minY: f32,
    minZ: f32,
    _pad0: u32,
    maxX: f32,
    maxY: f32,
    maxZ: f32,
    _pad1: u32,
}

struct InstanceAABB {
    minX: f32,
    minY: f32,
    minZ: f32,
    _pad0: u32,
    maxX: f32,
    maxY: f32,
    maxZ: f32,
    _pad1: u32,
}

@group(0) @binding(0) var<storage, read> matrices: array<mat4x4<f32>>;
@group(0) @binding(1) var<storage, read> sizes: array<vec4<f32>>;
@group(0) @binding(2) var<storage, read> shapes: array<u32>;
@group(0) @binding(3) var<storage, read> shapeAABBs: array<ShapeAABB>;
@group(0) @binding(4) var<storage, read> entityCount: array<u32>;
@group(0) @binding(5) var<storage, read_write> instanceAABBs: array<InstanceAABB>;
@group(0) @binding(6) var<storage, read_write> instanceInverses: array<mat4x4<f32>>;

fn scaleColumns(m: mat4x4<f32>, s: vec3<f32>) -> mat4x4<f32> {
    return mat4x4<f32>(
        m[0] * s.x,
        m[1] * s.y,
        m[2] * s.z,
        m[3]
    );
}

fn transformPoint(p: vec3<f32>, m: mat4x4<f32>) -> vec3<f32> {
    return (m * vec4<f32>(p, 1.0)).xyz;
}

fn transformAABB(aabbMin: vec3<f32>, aabbMax: vec3<f32>, m: mat4x4<f32>) -> array<vec3<f32>, 2> {
    let corners = array<vec3<f32>, 8>(
        vec3<f32>(aabbMin.x, aabbMin.y, aabbMin.z),
        vec3<f32>(aabbMin.x, aabbMin.y, aabbMax.z),
        vec3<f32>(aabbMin.x, aabbMax.y, aabbMin.z),
        vec3<f32>(aabbMin.x, aabbMax.y, aabbMax.z),
        vec3<f32>(aabbMax.x, aabbMin.y, aabbMin.z),
        vec3<f32>(aabbMax.x, aabbMin.y, aabbMax.z),
        vec3<f32>(aabbMax.x, aabbMax.y, aabbMin.z),
        vec3<f32>(aabbMax.x, aabbMax.y, aabbMax.z)
    );

    var newMin = vec3<f32>(1e30, 1e30, 1e30);
    var newMax = vec3<f32>(-1e30, -1e30, -1e30);

    for (var i = 0u; i < 8u; i++) {
        let t = transformPoint(corners[i], m);
        newMin = min(newMin, t);
        newMax = max(newMax, t);
    }

    return array<vec3<f32>, 2>(newMin, newMax);
}

fn inverse4x4(m: mat4x4<f32>) -> mat4x4<f32> {
    let m00 = m[0][0]; let m10 = m[0][1]; let m20 = m[0][2]; let m30 = m[0][3];
    let m01 = m[1][0]; let m11 = m[1][1]; let m21 = m[1][2]; let m31 = m[1][3];
    let m02 = m[2][0]; let m12 = m[2][1]; let m22 = m[2][2]; let m32 = m[2][3];
    let m03 = m[3][0]; let m13 = m[3][1]; let m23 = m[3][2]; let m33 = m[3][3];

    let c00 = m11 * (m22 * m33 - m32 * m23) - m21 * (m12 * m33 - m32 * m13) + m31 * (m12 * m23 - m22 * m13);
    let c01 = -(m01 * (m22 * m33 - m32 * m23) - m21 * (m02 * m33 - m32 * m03) + m31 * (m02 * m23 - m22 * m03));
    let c02 = m01 * (m12 * m33 - m32 * m13) - m11 * (m02 * m33 - m32 * m03) + m31 * (m02 * m13 - m12 * m03);
    let c03 = -(m01 * (m12 * m23 - m22 * m13) - m11 * (m02 * m23 - m22 * m03) + m21 * (m02 * m13 - m12 * m03));

    let c10 = -(m10 * (m22 * m33 - m32 * m23) - m20 * (m12 * m33 - m32 * m13) + m30 * (m12 * m23 - m22 * m13));
    let c11 = m00 * (m22 * m33 - m32 * m23) - m20 * (m02 * m33 - m32 * m03) + m30 * (m02 * m23 - m22 * m03);
    let c12 = -(m00 * (m12 * m33 - m32 * m13) - m10 * (m02 * m33 - m32 * m03) + m30 * (m02 * m13 - m12 * m03));
    let c13 = m00 * (m12 * m23 - m22 * m13) - m10 * (m02 * m23 - m22 * m03) + m20 * (m02 * m13 - m12 * m03);

    let c20 = m10 * (m21 * m33 - m31 * m23) - m20 * (m11 * m33 - m31 * m13) + m30 * (m11 * m23 - m21 * m13);
    let c21 = -(m00 * (m21 * m33 - m31 * m23) - m20 * (m01 * m33 - m31 * m03) + m30 * (m01 * m23 - m21 * m03));
    let c22 = m00 * (m11 * m33 - m31 * m13) - m10 * (m01 * m33 - m31 * m03) + m30 * (m01 * m13 - m11 * m03);
    let c23 = -(m00 * (m11 * m23 - m21 * m13) - m10 * (m01 * m23 - m21 * m03) + m20 * (m01 * m13 - m11 * m03));

    let c30 = -(m10 * (m21 * m32 - m31 * m22) - m20 * (m11 * m32 - m31 * m12) + m30 * (m11 * m22 - m21 * m12));
    let c31 = m00 * (m21 * m32 - m31 * m22) - m20 * (m01 * m32 - m31 * m02) + m30 * (m01 * m22 - m21 * m02);
    let c32 = -(m00 * (m11 * m32 - m31 * m12) - m10 * (m01 * m32 - m31 * m02) + m30 * (m01 * m12 - m11 * m02));
    let c33 = m00 * (m11 * m22 - m21 * m12) - m10 * (m01 * m22 - m21 * m02) + m20 * (m01 * m12 - m11 * m02);

    let det = m00 * c00 + m01 * c10 + m02 * c20 + m03 * c30;
    let invDet = select(0.0, 1.0 / det, abs(det) > 1e-10);

    return mat4x4<f32>(
        vec4<f32>(c00, c10, c20, c30) * invDet,
        vec4<f32>(c01, c11, c21, c31) * invDet,
        vec4<f32>(c02, c12, c22, c32) * invDet,
        vec4<f32>(c03, c13, c23, c33) * invDet
    );
}

@compute @workgroup_size(${Po})
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let eid = gid.x;
    let count = entityCount[0];
    if (eid >= count) { return; }

    let shapeId = shapes[eid];
    let shapeAABB = shapeAABBs[shapeId];
    let matrix = matrices[eid];
    let size = sizes[eid].xyz;

    let hasZeroScale = size.x == 0.0 || size.y == 0.0 || size.z == 0.0;

    if (hasZeroScale) {
        var zeroAABB: InstanceAABB;
        zeroAABB.minX = 0.0;
        zeroAABB.minY = 0.0;
        zeroAABB.minZ = 0.0;
        zeroAABB._pad0 = 0u;
        zeroAABB.maxX = 0.0;
        zeroAABB.maxY = 0.0;
        zeroAABB.maxZ = 0.0;
        zeroAABB._pad1 = 0u;
        instanceAABBs[eid] = zeroAABB;
        instanceInverses[eid] = mat4x4<f32>();
        return;
    }

    let scaledMatrix = scaleColumns(matrix, size);

    let aabbMin = vec3<f32>(shapeAABB.minX, shapeAABB.minY, shapeAABB.minZ);
    let aabbMax = vec3<f32>(shapeAABB.maxX, shapeAABB.maxY, shapeAABB.maxZ);
    let worldAABB = transformAABB(aabbMin, aabbMax, scaledMatrix);

    var outAABB: InstanceAABB;
    outAABB.minX = worldAABB[0].x;
    outAABB.minY = worldAABB[0].y;
    outAABB.minZ = worldAABB[0].z;
    outAABB._pad0 = 0u;
    outAABB.maxX = worldAABB[1].x;
    outAABB.maxY = worldAABB[1].y;
    outAABB.maxZ = worldAABB[1].z;
    outAABB._pad1 = 0u;
    instanceAABBs[eid] = outAABB;

    instanceInverses[eid] = inverse4x4(scaledMatrix);
}
`;function wf(e){let t=null,r=null;return{id:"instance",inputs:[],outputs:[{id:"instance-aabbs",access:"write"},{id:"instance-inverses",access:"write"}],async prepare(n){const i=await n.createShaderModule({code:bf});t=await n.createComputePipelineAsync({layout:"auto",compute:{module:i,entryPoint:"main"}}),r=n.createBindGroup({layout:t.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.matrices}},{binding:1,resource:{buffer:e.sizes}},{binding:2,resource:{buffer:e.shapes}},{binding:3,resource:{buffer:e.shapeAABBs}},{binding:4,resource:{buffer:e.entityCount}},{binding:5,resource:{buffer:e.instanceAABBs}},{binding:6,resource:{buffer:e.instanceInverses}}]})},execute(n){const i=Math.ceil(e.getEntityCount()/Po),s=n.encoder.beginComputePass();s.setPipeline(t),s.setBindGroup(0,r),s.dispatchWorkgroups(i),s.end()}}}const Bo=64,vf=`
struct Data {
    baseColor: vec4<f32>,
    pbr: vec4<f32>,
    emission: vec4<f32>,
    flags: u32,
    _pad0: u32,
    _pad1: u32,
    _pad2: u32,
}

@group(0) @binding(0) var<storage, read> colors: array<vec4<f32>>;
@group(0) @binding(1) var<storage, read> pbr: array<vec4<f32>>;
@group(0) @binding(2) var<storage, read> emission: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read> surfaces: array<u32>;
@group(0) @binding(4) var<storage, read> entityCount: array<u32>;
@group(0) @binding(5) var<storage, read_write> data: array<Data>;

@compute @workgroup_size(${Bo})
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let eid = gid.x;
    let count = entityCount[0];
    if (eid >= count) { return; }

    var d: Data;
    d.baseColor = colors[eid];
    d.pbr = pbr[eid];
    d.emission = emission[eid];
    d.flags = surfaces[eid];
    d._pad0 = 0u;
    d._pad1 = 0u;
    d._pad2 = 0u;
    data[eid] = d;
}
`;function xf(e){let t=null,r=null;return{id:"data",inputs:[],outputs:[{id:"data",access:"write"}],async prepare(n){const i=n.createShaderModule({code:vf});t=await n.createComputePipelineAsync({layout:"auto",compute:{module:i,entryPoint:"main"}}),r=n.createBindGroup({layout:t.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.colors}},{binding:1,resource:{buffer:e.pbr}},{binding:2,resource:{buffer:e.emission}},{binding:3,resource:{buffer:e.surfaces}},{binding:4,resource:{buffer:e.entityCount}},{binding:5,resource:{buffer:e.data}}]})},execute(n){if(!t||!r)return;const i=Math.ceil(e.getEntityCount()/Bo),s=n.encoder.beginComputePass();s.setPipeline(t),s.setBindGroup(0,r),s.dispatchWorkgroups(i),s.end()}}}const Gi={data:new Uint32Array(I)},dr=new Uint32Array(1),rr=Ie("render");function _f(e){return rr.from(e)}const Cf={group:"draw",first:!0,update(e){const t=_f(e),r=ve.from(e),n=He.from(e);if(!t||!r||!n)return;const{device:i}=r,{element:s,format:o}=n,{resources:a}=r,{width:c,height:u}=s;let l=c,f=u;for(const p of e.query([W]))if(W.active[p]){if(e.hasComponent(p,Dt)){const v=Dt.width[p],x=Dt.height[p];v>0&&x>0?(l=v,f=x):x>0&&u>0?(f=x,l=Math.max(1,Math.round(x*(c/u)))):v>0&&c>0&&(l=v,f=Math.max(1,Math.round(v*(u/c))))}break}t.width=l,t.height=f,Jl(i,o,l,f,a.textures,a.textureViews),t.entityCount=e.maxEid+1;const h=t.entityCount;for(const p of e.query([W]))if(W.active[p]){const v=e.hasComponent(p,Ot),x=v?Ot.softness[p]:0,b=v?Math.max(1,Ot.samples[p]):0,_=e.hasComponent(p,Ir)?Math.min(4,Math.max(1,Ir.depth[p])):0,B=e.hasComponent(p,Mr)?Math.min(4,Math.max(1,Mr.depth[p])):0,k=e.hasComponent(p,Rt)?{density:Rt.density[p],color:Rt.color[p]}:void 0,ee=e.hasComponent(p,gt)?{zenith:gt.zenith[p],horizon:gt.horizon[p]}:void 0,D=e.hasComponent(p,qe)?{phase:qe.phase[p],glow:qe.glow[p],azimuth:qe.azimuth[p],elevation:qe.elevation[p]}:void 0,me=e.hasComponent(p,zt)?{intensity:zt.intensity[p],amount:zt.amount[p]}:void 0,ct=e.hasComponent(p,Ze)?{coverage:Ze.coverage[p],density:Ze.density[p],height:Ze.height[p],color:Ze.color[p]}:void 0,ha=e.hasComponent(p,ht)?{size:ht.size[p],glow:ht.glow[p],color:ht.color[p]}:void 0;hl(i,t.scene,p,l,f,x,b,_,B,h,k,ee,D,me,ct,ha),t.postProcess.tonemap=e.hasComponent(p,Br),t.postProcess.tonemap&&(t.postProcess.exposure=Br.exposure[p]),t.postProcess.fxaa=e.hasComponent(p,co),e.hasComponent(p,dt)?(t.postProcess.vignetteStrength=dt.strength[p],t.postProcess.vignetteInner=dt.inner[p],t.postProcess.vignetteOuter=dt.outer[p]):t.postProcess.vignetteStrength=0,e.hasComponent(p,ft)?(t.postProcess.bloomIntensity=ft.intensity[p],t.postProcess.bloomThreshold=ft.threshold[p],t.postProcess.bloomRadius=ft.radius[p]):(t.postProcess.bloomIntensity=0,t.postProcess.bloomThreshold=.8,t.postProcess.bloomRadius=.5),e.hasComponent(p,Ar)?t.postProcess.quantize=Ar.bands[p]:t.postProcess.quantize=0;break}let d={color:8947848,intensity:1},m={color:16777215,intensity:1,directionX:-.5,directionY:-1,directionZ:-.5};for(const p of e.query([Lt])){d={color:Lt.color[p],intensity:Lt.intensity[p]};break}for(const p of e.query([De])){m={color:De.color[p],intensity:De.intensity[p],directionX:De.directionX[p],directionY:De.directionY[p],directionZ:De.directionZ[p]};break}const g=pl(d,m);i.queue.writeBuffer(t.scene,128,g),i.queue.writeBuffer(t.matrices,0,tt.data,0,h*16);const y=e.query([Ct,tt]);i.queue.writeBuffer(t.colors,0,Yn.data,0,h*4),i.queue.writeBuffer(t.sizes,0,mo.data,0,h*4),i.queue.writeBuffer(t.pbr,0,po.data,0,h*4),i.queue.writeBuffer(t.emission,0,qn.data,0,h*4),i.queue.writeBuffer(t.shapes,0,ho.data,0,h),dr[0]=h,i.queue.writeBuffer(t.entityCountBuffer,0,dr);let w=0;for(const p of y)Gi.data[w]=p,w++;i.queue.writeBuffer(t.tlas.entityIds,0,Gi.data,0,Math.max(w,1)),dr[0]=w,i.queue.writeBuffer(t.instanceCount,0,dr);for(const p of e.query([Je])){const v=Je.type[p]&255,x=(go.data[p]??0)&15,b=(Ct.shape[p]??0)&65535;Oi.data[p]=v|x<<8|b<<16}i.queue.writeBuffer(t.surfaces,0,Oi.data,0,h),Bl(y,p=>Je.type[p]??xo.Default,t.batchEntities),Al(i,t.batchEntities,t,t.indirect)}},Sf={group:"setup",update(e){for(const t of e.query([Ct,vn(Je)]))e.addComponent(t,Je)}},Yr={systems:[Sf,Cf],components:{Camera:W,Mesh:Ct,Surface:Je,AmbientLight:Lt,DirectionalLight:De,Tonemap:Br,FXAA:co,Raytracing:Ii,Vignette:dt,Bloom:ft,Quantize:Ar,Shadows:Ot,Reflections:Ir,Refractions:Mr,Haze:Rt,Sky:gt,Moon:qe,Stars:zt,Clouds:Ze,Sun:ht,Viewport:Dt},dependencies:[er],async initialize(e,t){const r=ve.from(e);if(!r)return;const{device:n}=r,i=(y,w)=>n.createBuffer({label:w??"property",size:y,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC}),s=vl(n),o=ef(n,kr),a={scene:Kl(n),matrices:i(I*64,"matrices"),colors:i(I*16,"colors"),sizes:i(I*16,"sizes"),pbr:i(I*16,"pbr"),emission:i(I*16,"emission"),shapes:i(I*4,"shapes"),surfaces:i(I*4,"surfaces"),data:i(I*64,"data"),indirect:gl(n,yt),batches:Array(yt).fill(null),batchEntities:Array(yt).fill(null),buffers:new Map,entityCount:1,postProcess:{tonemap:!1,exposure:1,fxaa:!0,vignetteStrength:0,vignetteInner:.4,vignetteOuter:.8,bloomIntensity:0,bloomThreshold:.8,bloomRadius:.5,quantize:0},meshVertices:s.vertices,meshIndices:s.indices,meshMeta:s.meta,blasAtlas:o,instanceAABBs:i(I*32,"instanceAABBs"),instanceInverses:i(I*64,"instanceInverses"),entityCountBuffer:n.createBuffer({label:"entityCount",size:4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC}),instanceCount:n.createBuffer({label:"instanceCount",size:4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC}),tlas:of(n),width:0,height:0};e.setResource(rr,a);const c={draws:new Map};e.setResource(Zn,c);const u=wf({matrices:a.matrices,sizes:a.sizes,shapes:a.shapes,shapeAABBs:a.blasAtlas.shapeAABBs,entityCount:a.entityCountBuffer,instanceAABBs:a.instanceAABBs,instanceInverses:a.instanceInverses,getEntityCount:()=>a.entityCount});r.graph.add(u);const l=xf({colors:a.colors,pbr:a.pbr,emission:a.emission,surfaces:a.surfaces,entityCount:a.entityCountBuffer,data:a.data,getEntityCount:()=>a.entityCount});r.graph.add(l);const f=yf({instanceAABBs:a.instanceAABBs,instanceCount:a.instanceCount,tlas:a.tlas});r.graph.add(f);const h=()=>{for(const y of e.query([W]))if(W.active[y])return e.hasComponent(y,Ii);return!1},d=()=>{for(const y of e.query([W]))if(W.active[y]){const w=W.clearColor[y];return{r:(w>>16&255)/255,g:(w>>8&255)/255,b:(w&255)/255}}return{r:0,g:0,b:0}},m=()=>{for(const y of e.query([W]))if(W.active[y])return e.hasComponent(y,gt);return!1},g=Ad({scene:a.scene,matrices:a.matrices,colors:a.colors,sizes:a.sizes,pbr:a.pbr,emission:a.emission,shapes:a.shapes,surfaces:a.surfaces,data:a.data,getSurfaces:Yl,getRaytracing:h,getClearColor:d,getSky:m,acquire:y=>Gs.from(e)?.acquire(y),batches:()=>a.batches,tlasNodes:a.tlas.bvhNodes,tlasInstanceIds:a.tlas.instanceIds,blasNodes:a.blasAtlas.nodesBuffer,blasTriIds:a.blasAtlas.triIdsBuffer,blasTriangles:a.blasAtlas.trianglesBuffer,blasMeta:a.blasAtlas.metaBuffer,instanceInverses:a.instanceInverses});r.graph.add(g),r.graph.add(kd({scene:a.scene,getRaytracing:h})),r.graph.add(Vd({state:e})),r.graph.add(Ud({state:e,uniforms:a.postProcess,getRenderSize:()=>({width:a.width,height:a.height})})),t?.(1)},async warm(e,t){const r=ve.from(e);r&&await r.graph.prepare(r.device,(n,i)=>{t?.(n/i)})}},Tf={bg:"#1a1a1a",track:"#333",bar:"#E8A86B"},Ef={bg:"#f5f5f5",track:"#ddd",bar:"#B87654"},Pf=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 285 80">
  <defs>
    <radialGradient id="baseGradient" cx="35%" cy="30%" r="70%" fx="25%" fy="20%">
      <stop offset="0%" stop-color="#F5D4B8"/>
      <stop offset="45%" stop-color="#E8A86B"/>
      <stop offset="100%" stop-color="#B87654"/>
    </radialGradient>
  </defs>
  <g id="Icon" transform="rotate(35 40 40)">
    <path id="Background" d="M40,2 C44,10 66,28 66,46 C66,60 48,70 40,78 C32,70 14,60 14,46 C14,28 36,10 40,2 Z" fill="#E8A86B"/>
    <path id="CloveLeft" d="M40,6 C37,14 22,28 20,44 C20,52 28,62 36,70 C34,58 26,46 26,38 C26,26 38,12 40,6 Z" fill="#D49560"/>
    <path id="CloveRight" d="M40,6 C43,14 58,28 60,44 C60,52 52,62 44,70 C46,58 54,46 54,38 C54,26 42,12 40,6 Z" fill="#D49560"/>
    <path id="CenterCrease" d="M40,8 C40,20 40,50 40,72" stroke="#6B4230" stroke-width="1" stroke-opacity="0.4" fill="none" stroke-linecap="round"/>
    <path id="BottomEdge" d="M40,78 C48,70 66,60 66,46 C61,58 44,70 40,73 Z" fill="#D49560"/>
    <path id="Outline" d="M40,2 C44,10 66,28 66,46 C66,60 48,70 40,78 C32,70 14,60 14,46 C14,28 36,10 40,2 Z" fill="none" stroke="#6B4230" stroke-width="2"/>
  </g>
  <g id="Text" transform="translate(80 59)">
    <path d="M13.37 0.73Q10.88 0.73 8.47 0.07Q6.06 -0.58 4.02 -1.75Q1.97 -2.93 0.52 -4.52L5.54 -9.63Q6.96 -8.09 8.87 -7.26Q10.79 -6.44 13.05 -6.44Q14.62 -6.44 15.44 -6.89Q16.27 -7.34 16.27 -8.18Q16.27 -9.22 15.27 -9.77Q14.27 -10.32 12.7 -10.74Q11.14 -11.17 9.4 -11.7Q7.66 -12.24 6.08 -13.17Q4.5 -14.09 3.51 -15.73Q2.52 -17.37 2.52 -19.95Q2.52 -22.65 3.92 -24.66Q5.31 -26.68 7.86 -27.83Q10.41 -28.97 13.86 -28.97Q17.43 -28.97 20.49 -27.74Q23.55 -26.51 25.46 -24.04L20.42 -18.94Q19.08 -20.5 17.43 -21.16Q15.78 -21.81 14.18 -21.81Q12.67 -21.81 11.93 -21.36Q11.19 -20.91 11.19 -20.13Q11.19 -19.23 12.18 -18.7Q13.17 -18.18 14.73 -17.78Q16.3 -17.37 18.02 -16.81Q19.75 -16.24 21.32 -15.24Q22.88 -14.24 23.87 -12.59Q24.85 -10.93 24.85 -8.29Q24.85 -4.15 21.75 -1.71Q18.65 0.73 13.37 0.73Z M48.31 0V-16.04Q48.31 -18.27 46.95 -19.62Q45.59 -20.97 43.48 -20.97Q42.04 -20.97 40.93 -20.36Q39.82 -19.75 39.19 -18.63Q38.57 -17.52 38.57 -16.04L35.12 -17.72Q35.12 -21.05 36.53 -23.53Q37.93 -26.01 40.42 -27.39Q42.91 -28.77 46.15 -28.77Q49.45 -28.77 51.94 -27.39Q54.43 -26.01 55.81 -23.61Q57.19 -21.2 57.19 -18.04V0ZM29.7 0V-42.11H38.57V0Z M74.65 0.58Q70.76 0.58 67.7 -1.33Q64.64 -3.25 62.89 -6.55Q61.13 -9.86 61.13 -14.07Q61.13 -18.3 62.89 -21.62Q64.64 -24.94 67.7 -26.85Q70.76 -28.77 74.65 -28.77Q77.49 -28.77 79.78 -27.67Q82.07 -26.56 83.51 -24.62Q84.94 -22.68 85.14 -20.18V-8Q84.94 -5.51 83.52 -3.57Q82.1 -1.62 79.79 -0.52Q77.49 0.58 74.65 0.58ZM76.44 -7.42Q79.29 -7.42 81.03 -9.29Q82.77 -11.17 82.77 -14.09Q82.77 -16.07 81.98 -17.56Q81.2 -19.05 79.78 -19.91Q78.36 -20.76 76.47 -20.76Q74.62 -20.76 73.2 -19.91Q71.78 -19.05 70.95 -17.55Q70.12 -16.04 70.12 -14.09Q70.12 -12.15 70.93 -10.64Q71.75 -9.13 73.18 -8.28Q74.62 -7.42 76.44 -7.42ZM82.39 0V-7.57L83.72 -14.44L82.39 -21.26V-28.19H91.12V0Z M97.38 0V-42.11H106.26V0Z M112.52 0V-42.11H121.39V0Z M141.23 0.64Q136.85 0.64 133.36 -1.31Q129.86 -3.25 127.83 -6.61Q125.8 -9.98 125.8 -14.15Q125.8 -18.33 127.82 -21.63Q129.83 -24.94 133.33 -26.88Q136.82 -28.83 141.2 -28.83Q145.61 -28.83 149.09 -26.9Q152.57 -24.97 154.6 -21.65Q156.63 -18.33 156.63 -14.15Q156.63 -9.98 154.61 -6.61Q152.6 -3.25 149.12 -1.31Q145.64 0.64 141.23 0.64ZM141.2 -7.42Q143.12 -7.42 144.56 -8.27Q146.02 -9.11 146.81 -10.63Q147.61 -12.15 147.61 -14.12Q147.61 -16.1 146.78 -17.59Q145.96 -19.08 144.54 -19.92Q143.12 -20.76 141.2 -20.76Q139.34 -20.76 137.9 -19.91Q136.45 -19.05 135.63 -17.56Q134.82 -16.07 134.82 -14.09Q134.82 -12.15 135.63 -10.63Q136.45 -9.11 137.9 -8.27Q139.34 -7.42 141.2 -7.42Z M165.07 0V-39.85H173.94V0ZM158.69 -20.65V-28.19H180.32V-20.65Z" fill="#3D2415" transform="translate(2.5 3)"/>
    <path d="M13.37 0.73Q10.88 0.73 8.47 0.07Q6.06 -0.58 4.02 -1.75Q1.97 -2.93 0.52 -4.52L5.54 -9.63Q6.96 -8.09 8.87 -7.26Q10.79 -6.44 13.05 -6.44Q14.62 -6.44 15.44 -6.89Q16.27 -7.34 16.27 -8.18Q16.27 -9.22 15.27 -9.77Q14.27 -10.32 12.7 -10.74Q11.14 -11.17 9.4 -11.7Q7.66 -12.24 6.08 -13.17Q4.5 -14.09 3.51 -15.73Q2.52 -17.37 2.52 -19.95Q2.52 -22.65 3.92 -24.66Q5.31 -26.68 7.86 -27.83Q10.41 -28.97 13.86 -28.97Q17.43 -28.97 20.49 -27.74Q23.55 -26.51 25.46 -24.04L20.42 -18.94Q19.08 -20.5 17.43 -21.16Q15.78 -21.81 14.18 -21.81Q12.67 -21.81 11.93 -21.36Q11.19 -20.91 11.19 -20.13Q11.19 -19.23 12.18 -18.7Q13.17 -18.18 14.73 -17.78Q16.3 -17.37 18.02 -16.81Q19.75 -16.24 21.32 -15.24Q22.88 -14.24 23.87 -12.59Q24.85 -10.93 24.85 -8.29Q24.85 -4.15 21.75 -1.71Q18.65 0.73 13.37 0.73Z M48.31 0V-16.04Q48.31 -18.27 46.95 -19.62Q45.59 -20.97 43.48 -20.97Q42.04 -20.97 40.93 -20.36Q39.82 -19.75 39.19 -18.63Q38.57 -17.52 38.57 -16.04L35.12 -17.72Q35.12 -21.05 36.53 -23.53Q37.93 -26.01 40.42 -27.39Q42.91 -28.77 46.15 -28.77Q49.45 -28.77 51.94 -27.39Q54.43 -26.01 55.81 -23.61Q57.19 -21.2 57.19 -18.04V0ZM29.7 0V-42.11H38.57V0Z M74.65 0.58Q70.76 0.58 67.7 -1.33Q64.64 -3.25 62.89 -6.55Q61.13 -9.86 61.13 -14.07Q61.13 -18.3 62.89 -21.62Q64.64 -24.94 67.7 -26.85Q70.76 -28.77 74.65 -28.77Q77.49 -28.77 79.78 -27.67Q82.07 -26.56 83.51 -24.62Q84.94 -22.68 85.14 -20.18V-8Q84.94 -5.51 83.52 -3.57Q82.1 -1.62 79.79 -0.52Q77.49 0.58 74.65 0.58ZM76.44 -7.42Q79.29 -7.42 81.03 -9.29Q82.77 -11.17 82.77 -14.09Q82.77 -16.07 81.98 -17.56Q81.2 -19.05 79.78 -19.91Q78.36 -20.76 76.47 -20.76Q74.62 -20.76 73.2 -19.91Q71.78 -19.05 70.95 -17.55Q70.12 -16.04 70.12 -14.09Q70.12 -12.15 70.93 -10.64Q71.75 -9.13 73.18 -8.28Q74.62 -7.42 76.44 -7.42ZM82.39 0V-7.57L83.72 -14.44L82.39 -21.26V-28.19H91.12V0Z M97.38 0V-42.11H106.26V0Z M112.52 0V-42.11H121.39V0Z M141.23 0.64Q136.85 0.64 133.36 -1.31Q129.86 -3.25 127.83 -6.61Q125.8 -9.98 125.8 -14.15Q125.8 -18.33 127.82 -21.63Q129.83 -24.94 133.33 -26.88Q136.82 -28.83 141.2 -28.83Q145.61 -28.83 149.09 -26.9Q152.57 -24.97 154.6 -21.65Q156.63 -18.33 156.63 -14.15Q156.63 -9.98 154.61 -6.61Q152.6 -3.25 149.12 -1.31Q145.64 0.64 141.23 0.64ZM141.2 -7.42Q143.12 -7.42 144.56 -8.27Q146.02 -9.11 146.81 -10.63Q147.61 -12.15 147.61 -14.12Q147.61 -16.1 146.78 -17.59Q145.96 -19.08 144.54 -19.92Q143.12 -20.76 141.2 -20.76Q139.34 -20.76 137.9 -19.91Q136.45 -19.05 135.63 -17.56Q134.82 -16.07 134.82 -14.09Q134.82 -12.15 135.63 -10.63Q136.45 -9.11 137.9 -8.27Q139.34 -7.42 141.2 -7.42Z M165.07 0V-39.85H173.94V0ZM158.69 -20.65V-28.19H180.32V-20.65Z" fill="none" stroke="#6B4230" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M13.37 0.73Q10.88 0.73 8.47 0.07Q6.06 -0.58 4.02 -1.75Q1.97 -2.93 0.52 -4.52L5.54 -9.63Q6.96 -8.09 8.87 -7.26Q10.79 -6.44 13.05 -6.44Q14.62 -6.44 15.44 -6.89Q16.27 -7.34 16.27 -8.18Q16.27 -9.22 15.27 -9.77Q14.27 -10.32 12.7 -10.74Q11.14 -11.17 9.4 -11.7Q7.66 -12.24 6.08 -13.17Q4.5 -14.09 3.51 -15.73Q2.52 -17.37 2.52 -19.95Q2.52 -22.65 3.92 -24.66Q5.31 -26.68 7.86 -27.83Q10.41 -28.97 13.86 -28.97Q17.43 -28.97 20.49 -27.74Q23.55 -26.51 25.46 -24.04L20.42 -18.94Q19.08 -20.5 17.43 -21.16Q15.78 -21.81 14.18 -21.81Q12.67 -21.81 11.93 -21.36Q11.19 -20.91 11.19 -20.13Q11.19 -19.23 12.18 -18.7Q13.17 -18.18 14.73 -17.78Q16.3 -17.37 18.02 -16.81Q19.75 -16.24 21.32 -15.24Q22.88 -14.24 23.87 -12.59Q24.85 -10.93 24.85 -8.29Q24.85 -4.15 21.75 -1.71Q18.65 0.73 13.37 0.73Z M48.31 0V-16.04Q48.31 -18.27 46.95 -19.62Q45.59 -20.97 43.48 -20.97Q42.04 -20.97 40.93 -20.36Q39.82 -19.75 39.19 -18.63Q38.57 -17.52 38.57 -16.04L35.12 -17.72Q35.12 -21.05 36.53 -23.53Q37.93 -26.01 40.42 -27.39Q42.91 -28.77 46.15 -28.77Q49.45 -28.77 51.94 -27.39Q54.43 -26.01 55.81 -23.61Q57.19 -21.2 57.19 -18.04V0ZM29.7 0V-42.11H38.57V0Z M74.65 0.58Q70.76 0.58 67.7 -1.33Q64.64 -3.25 62.89 -6.55Q61.13 -9.86 61.13 -14.07Q61.13 -18.3 62.89 -21.62Q64.64 -24.94 67.7 -26.85Q70.76 -28.77 74.65 -28.77Q77.49 -28.77 79.78 -27.67Q82.07 -26.56 83.51 -24.62Q84.94 -22.68 85.14 -20.18V-8Q84.94 -5.51 83.52 -3.57Q82.1 -1.62 79.79 -0.52Q77.49 0.58 74.65 0.58ZM76.44 -7.42Q79.29 -7.42 81.03 -9.29Q82.77 -11.17 82.77 -14.09Q82.77 -16.07 81.98 -17.56Q81.2 -19.05 79.78 -19.91Q78.36 -20.76 76.47 -20.76Q74.62 -20.76 73.2 -19.91Q71.78 -19.05 70.95 -17.55Q70.12 -16.04 70.12 -14.09Q70.12 -12.15 70.93 -10.64Q71.75 -9.13 73.18 -8.28Q74.62 -7.42 76.44 -7.42ZM82.39 0V-7.57L83.72 -14.44L82.39 -21.26V-28.19H91.12V0Z M97.38 0V-42.11H106.26V0Z M112.52 0V-42.11H121.39V0Z M141.23 0.64Q136.85 0.64 133.36 -1.31Q129.86 -3.25 127.83 -6.61Q125.8 -9.98 125.8 -14.15Q125.8 -18.33 127.82 -21.63Q129.83 -24.94 133.33 -26.88Q136.82 -28.83 141.2 -28.83Q145.61 -28.83 149.09 -26.9Q152.57 -24.97 154.6 -21.65Q156.63 -18.33 156.63 -14.15Q156.63 -9.98 154.61 -6.61Q152.6 -3.25 149.12 -1.31Q145.64 0.64 141.23 0.64ZM141.2 -7.42Q143.12 -7.42 144.56 -8.27Q146.02 -9.11 146.81 -10.63Q147.61 -12.15 147.61 -14.12Q147.61 -16.1 146.78 -17.59Q145.96 -19.08 144.54 -19.92Q143.12 -20.76 141.2 -20.76Q139.34 -20.76 137.9 -19.91Q136.45 -19.05 135.63 -17.56Q134.82 -16.07 134.82 -14.09Q134.82 -12.15 135.63 -10.63Q136.45 -9.11 137.9 -8.27Q139.34 -7.42 141.2 -7.42Z M165.07 0V-39.85H173.94V0ZM158.69 -20.65V-28.19H180.32V-20.65Z" fill="#E8A86B"/>
  </g>
</svg>`;function Ao(e,t){const r=document.createElement("div");r.style.cssText=`
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: ${t};
        z-index: 10000;
    `;const n=e.parentElement;return n&&(getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.appendChild(r)),r}function Io(e){const t=document.createElement("div");t.style.cssText=`
        width: 228px;
        height: 4px;
        background: ${e.track};
        border-radius: 2px;
        overflow: hidden;
    `;const r=document.createElement("div");return r.style.cssText=`
        width: 0%;
        height: 100%;
        background: ${e.bar};
        transition: width 0.15s ease-out;
    `,t.appendChild(r),{track:t,bar:r}}function Bf(e,t){let r=null,n=null;return{show(){r=Ao(e,t.bg);const i=document.createElement("div");i.innerHTML=Pf,i.style.cssText="width: 228px; height: 64px; margin-bottom: 24px;",r.appendChild(i);const s=Io(t);return n=s.bar,r.appendChild(s.track),()=>{r?.remove(),r=null,n=null}},update(i){n&&(n.style.width=`${i*100}%`)}}}function Af(e,t){let r=null,n=null;return{show(){r=Ao(e,t.bg);const i=Io(t);return n=i.bar,r.appendChild(i.track),()=>{r?.remove(),r=null,n=null}},update(i){n&&(n.style.width=`${i*100}%`)}}}const If=e=>Bf(e,Tf),g0=e=>Af(e,Ef),Mf=[Tr,dl,Qs,er,Yr];Oe.defaultPlugins=Mf;Oe.initCanvas=Rc;Oe.defaultLoading=If;Tr.spinner=Uc;const br=Math.PI*2,In={Left:0,Middle:1},U={target:[],yaw:[],pitch:[],distance:[],targetYaw:[],targetPitch:[],targetDistance:[],minPitch:[],maxPitch:[],minDistance:[],maxDistance:[],minSize:[],maxSize:[],targetSize:[],smoothness:[],sensitivity:[],zoomSpeed:[],button:[]};$(U,{defaults:()=>({target:0,yaw:0,pitch:Math.PI/6,distance:8,targetYaw:0,targetPitch:Math.PI/6,targetDistance:10,minPitch:-Math.PI/2+.01,maxPitch:Math.PI/2-.01,minDistance:1,maxDistance:25,minSize:.5,maxSize:50,targetSize:5,smoothness:.3,sensitivity:.005,zoomSpeed:.025,button:In.Left})});function kf(e,t){const r=Math.max(0,Math.min(1,e));return 1-Math.pow(1-r,t*60)}function Ff(e){return(e%br+br)%br}function Nf(e,t){const r=Ff(t-e);return r>Math.PI?r-br:r}function Of(e,t){return t===In.Left?e.left:t===In.Middle?e.middle:e.right}const Rf={group:"simulation",update(e){const t=Sn.from(e),r=e.time.deltaTime;for(const n of e.query([U,z])){const i=U.sensitivity[n],s=U.zoomSpeed[n],o=U.minPitch[n],a=U.maxPitch[n],c=U.smoothness[n],l=e.hasComponent(n,W)&&W.mode[n]===Xn.Orthographic;if(t&&Of(t.mouse,U.button[n])&&(U.targetYaw[n]-=t.mouse.deltaX*i,U.targetPitch[n]=Jr(U.targetPitch[n]+t.mouse.deltaY*i,o,a)),t&&t.mouse.scroll!==0)if(l){const _=U.targetSize[n],E=Math.max(.1,_*.08),B=t.mouse.scroll*s*E;U.targetSize[n]=Jr(_+B,U.minSize[n],U.maxSize[n])}else{const _=U.targetDistance[n],E=Math.max(.3,_*.08),B=t.mouse.scroll*s*E;U.targetDistance[n]=Jr(_+B,U.minDistance[n],U.maxDistance[n])}const f=kf(c,r);if(U.yaw[n]+=Nf(U.yaw[n],U.targetYaw[n])*f,U.pitch[n]+=(U.targetPitch[n]-U.pitch[n])*f,U.distance[n]+=(U.targetDistance[n]-U.distance[n])*f,l){const _=W.size[n],E=U.targetSize[n];W.size[n]=_+(E-_)*f}const h=U.yaw[n],d=U.pitch[n],m=U.distance[n];let g=0,y=0,w=0;const p=U.target[n];p&&e.hasComponent(p,z)&&(g=z.posX[p],y=z.posY[p],w=z.posZ[p]);const v=g+m*Math.cos(d)*Math.sin(h),x=y+m*Math.sin(d),b=w+m*Math.cos(d)*Math.cos(h);z.posX[n]=v,z.posY[n]=x,z.posZ[n]=b;const S=pc(v,x,b,g,y,w);z.quatX[n]=S.x,z.quatY[n]=S.y,z.quatZ[n]=S.z,z.quatW[n]=S.w}}},y0={systems:[Rf],components:{Orbit:U},dependencies:[Qs]},Mo={data:new Float32Array(I*12)};function zf(e,t,r){function n(s){const o=s*t+r,a=Math.round(e[o]*255),c=Math.round(e[o+1]*255),u=Math.round(e[o+2]*255);return a<<16|c<<8|u}function i(s,o){const a=s*t+r;e[a]=(o>>16&255)/255,e[a+1]=(o>>8&255)/255,e[a+2]=(o&255)/255,e[a+3]=1}return new Proxy([],{get(s,o){if(o==="get")return n;if(o==="set")return i;const a=Number(o);if(!Number.isNaN(a))return n(a)},set(s,o,a){const c=Number(o);return Number.isNaN(c)?!1:(i(c,a),!0)}})}const xe=Mo.data,Tt={offsetX:K(xe,12,0),offsetY:K(xe,12,1),offsetZ:K(xe,12,2),thickness:K(xe,12,3),visible:K(xe,12,4),opacity:K(xe,12,7),color:zf(xe,12,8),colorR:K(xe,12,8),colorG:K(xe,12,9),colorB:K(xe,12,10)};$(Tt,{defaults:()=>({offsetX:1,offsetY:0,offsetZ:0,thickness:2,visible:1,opacity:1,color:16777215})});const Df=`
struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) color: vec4<f32>,
    @location(1) dist: f32,
    @location(2) halfWidth: f32,
}

${st}

struct LineData {
    offset: vec3<f32>,
    thickness: f32,
    visible: f32,
    _pad1: f32,
    _pad2: f32,
    opacity: f32,
    color: vec4<f32>,
}

@group(0) @binding(0) var<uniform> scene: Scene;
@group(0) @binding(1) var<storage, read> entityIds: array<u32>;
@group(0) @binding(2) var<storage, read> lines: array<LineData>;
@group(0) @binding(3) var<storage, read> matrices: array<mat4x4<f32>>;

@vertex
fn vs(@builtin(vertex_index) vid: u32, @builtin(instance_index) iid: u32) -> VertexOutput {
    let eid = entityIds[iid];
    let line = lines[eid];
    let transform = matrices[eid];

    let start = transform[3].xyz;
    let rotation = mat3x3<f32>(transform[0].xyz, transform[1].xyz, transform[2].xyz);
    let end = start + rotation * line.offset;

    let startClip = scene.viewProj * vec4(start, 1.0);
    let endClip = scene.viewProj * vec4(end, 1.0);

    let startNDC = startClip.xy / startClip.w;
    let endNDC = endClip.xy / endClip.w;

    let dir = endNDC - startNDC;
    let len = length(dir);
    let normDir = select(vec2(1.0, 0.0), dir / len, len > 0.0001);

    let scale = scene.viewport.y / 1080.0;
    let halfWidth = line.thickness * 0.5 * scale;
    let aaPadding = 1.0;
    let totalHalf = halfWidth + aaPadding;
    let perpNDC = vec2(-normDir.y, normDir.x) * totalHalf * 2.0 / scene.viewport;

    var pos: vec2<f32>;
    var t: f32;
    var edge: f32;
    switch vid {
        case 0u: { pos = startNDC - perpNDC; t = 0.0; edge = -1.0; }
        case 1u: { pos = startNDC + perpNDC; t = 0.0; edge = 1.0; }
        case 2u: { pos = endNDC + perpNDC; t = 1.0; edge = 1.0; }
        case 3u: { pos = startNDC - perpNDC; t = 0.0; edge = -1.0; }
        case 4u: { pos = endNDC + perpNDC; t = 1.0; edge = 1.0; }
        case 5u: { pos = endNDC - perpNDC; t = 1.0; edge = -1.0; }
        default: { pos = startNDC; t = 0.0; edge = 0.0; }
    }

    let depth = mix(startClip.z / startClip.w, endClip.z / endClip.w, t);

    let pixelDist = edge * totalHalf;

    var out: VertexOutput;
    out.position = vec4(pos, depth, 1.0);
    out.color = vec4(line.color.rgb, line.color.a * line.opacity);
    out.dist = pixelDist;
    out.halfWidth = halfWidth;
    return out;
}

struct FragmentOutput {
    @location(0) color: vec4<f32>,
    @location(1) mask: f32,
}

@fragment
fn fs(input: VertexOutput) -> FragmentOutput {
    let dist = abs(input.dist);
    let aaWidth = fwidth(input.dist);
    let aa = 1.0 - smoothstep(input.halfWidth - aaWidth, input.halfWidth + aaWidth, dist);
    var out: FragmentOutput;
    out.color = vec4(input.color.rgb, input.color.a * aa);
    out.mask = select(0.0, 1.0, aa > 0.01);
    return out;
}
`;function Lf(e,t,r){const n=e.createShaderModule({code:Df});return e.createRenderPipeline({layout:"auto",vertex:{module:n,entryPoint:"vs"},fragment:{module:n,entryPoint:"fs",targets:[{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}},{format:r,writeMask:GPUColorWrite.RED}]},primitive:{topology:"triangle-list"},depthStencil:{format:Hr,depthCompare:"less",depthWriteEnabled:!1}})}function Uf(e){let t=null,r=null;return{id:"lines",pass:Be.Overlay,order:0,execute(){},draw(n,i){const s=e.getCount();s!==0&&(t||(t=Lf(i.device,i.format,i.maskFormat)),r||(r=i.device.createBindGroup({layout:t.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.scene}},{binding:1,resource:{buffer:e.entityIds}},{binding:2,resource:{buffer:e.lines}},{binding:3,resource:{buffer:e.matrices}}]})),n.setPipeline(t),n.setBindGroup(0,r),n.draw(6,s))}}}const qr=Ie("lines"),$i=new Uint32Array(I),Vf={group:"draw",update(e){const t=ve.from(e),r=qr.from(e);if(!t||!r)return;const{device:n}=t;let i=0;for(const o of e.query([Tt,z]))Tt.visible[o]&&($i[i++]=o);const s=e.maxEid+1;n.queue.writeBuffer(r.buffer,0,Mo.data,0,s*12),n.queue.writeBuffer(r.entityIds,0,$i,0,i),r.count=i}},Gf={systems:[Vf],components:{Line:Tt},dependencies:[er,Yr],initialize(e){const t=ve.from(e),r=rr.from(e);if(!t||!r)return;const{device:n}=t,i={buffer:n.createBuffer({label:"lines",size:I*12*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),entityIds:Qn(n,I),count:0};e.setResource(qr,i),jn(e,Uf({scene:r.scene,lines:i.buffer,entityIds:i.entityIds,matrices:r.matrices,getCount:()=>i.count}))}},ko={data:new Float32Array(I*4)},an=ko.data,Vt={start:K(an,4,0),end:K(an,4,1),size:K(an,4,2)};$(Vt,{defaults:()=>({start:0,end:1,size:1})});const $f=2147483648,Wf=`
struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) color: vec4<f32>,
}

${st}

struct ArrowData {
    start: f32,
    end: f32,
    size: f32,
    _pad: f32,
}

struct LineData {
    offset: vec3<f32>,
    thickness: f32,
    visible: f32,
    _pad1: f32,
    _pad2: f32,
    opacity: f32,
    color: vec4<f32>,
}

const END_FLAG: u32 = 0x80000000u;

@group(0) @binding(0) var<uniform> scene: Scene;
@group(0) @binding(1) var<storage, read> entityIds: array<u32>;
@group(0) @binding(2) var<storage, read> arrows: array<ArrowData>;
@group(0) @binding(3) var<storage, read> lines: array<LineData>;
@group(0) @binding(4) var<storage, read> matrices: array<mat4x4<f32>>;

@vertex
fn vs(@builtin(vertex_index) vid: u32, @builtin(instance_index) iid: u32) -> VertexOutput {
    let packed = entityIds[iid];
    let isEnd = (packed & END_FLAG) != 0u;
    let eid = packed & ~END_FLAG;

    let arrow = arrows[eid];
    let line = lines[eid];
    let transform = matrices[eid];

    let scale = length(transform[0].xyz);

    let start = transform[3].xyz;
    let rotation = mat3x3<f32>(transform[0].xyz, transform[1].xyz, transform[2].xyz);
    let end = start + rotation * line.offset;

    let startClip = scene.viewProj * vec4(start, 1.0);
    let endClip = scene.viewProj * vec4(end, 1.0);

    let startScreen = (startClip.xy / startClip.w) * scene.viewport * 0.5;
    let endScreen = (endClip.xy / endClip.w) * scene.viewport * 0.5;

    let anchorScreen = select(startScreen, endScreen, isEnd);
    let anchorDepth = select(startClip.z / startClip.w, endClip.z / endClip.w, isEnd);

    let dir = endScreen - startScreen;
    let len = length(dir);
    let normDir = select(vec2(1.0, 0.0), dir / len, len > 0.0001);
    let perp = vec2(-normDir.y, normDir.x);

    let arrowDir = select(-normDir, normDir, isEnd);

    let viewportScale = scene.viewport.y / 1080.0;
    let arrowLengthPx = arrow.size * line.thickness * 4.0 * scale * viewportScale;
    let arrowWidthPx = arrow.size * line.thickness * 2.0 * scale * viewportScale;

    var posScreen: vec2<f32>;
    switch vid {
        case 0u: { posScreen = anchorScreen; }
        case 1u: { posScreen = anchorScreen - arrowDir * arrowLengthPx + perp * arrowWidthPx; }
        case 2u: { posScreen = anchorScreen - arrowDir * arrowLengthPx - perp * arrowWidthPx; }
        default: { posScreen = anchorScreen; }
    }

    let pos = posScreen / (scene.viewport * 0.5);

    var out: VertexOutput;
    out.position = vec4(pos, anchorDepth, 1.0);
    out.color = vec4(line.color.rgb, line.color.a * line.opacity);
    return out;
}

struct FragmentOutput {
    @location(0) color: vec4<f32>,
    @location(1) mask: f32,
}

@fragment
fn fs(input: VertexOutput) -> FragmentOutput {
    var out: FragmentOutput;
    out.color = input.color;
    out.mask = 1.0;
    return out;
}
`;function Qf(e,t,r){const n=e.createShaderModule({code:Wf});return e.createRenderPipeline({layout:"auto",vertex:{module:n,entryPoint:"vs"},fragment:{module:n,entryPoint:"fs",targets:[{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}},{format:r,writeMask:GPUColorWrite.RED}]},primitive:{topology:"triangle-list"},depthStencil:{format:Hr,depthCompare:"less",depthWriteEnabled:!1}})}function Hf(e){let t=null,r=null;return{id:"arrows",pass:Be.Overlay,order:1,execute(){},draw(n,i){const s=e.getCount();s!==0&&(t||(t=Qf(i.device,i.format,i.maskFormat)),r||(r=i.device.createBindGroup({layout:t.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.scene}},{binding:1,resource:{buffer:e.entityIds}},{binding:2,resource:{buffer:e.arrows}},{binding:3,resource:{buffer:e.lines}},{binding:4,resource:{buffer:e.matrices}}]})),n.setPipeline(t),n.setBindGroup(0,r),n.draw(3,s))}}}const Fo=Ie("arrows"),cn=new Uint32Array(I*2),Xf={group:"draw",update(e){const t=ve.from(e),r=Fo.from(e),n=qr.from(e);if(!t||!r||!n)return;const{device:i}=t;let s=0;for(const a of e.query([Vt,Tt,z]))Tt.visible[a]&&(Vt.start[a]&&(cn[s++]=a),Vt.end[a]&&(cn[s++]=a|$f));const o=e.maxEid+1;i.queue.writeBuffer(r.buffer,0,ko.data,0,o*4),i.queue.writeBuffer(r.entityIds,0,cn,0,s),r.count=s}},b0={systems:[Xf],components:{Arrow:Vt},dependencies:[er,Yr,Gf],initialize(e){const t=ve.from(e),r=rr.from(e),n=qr.from(e);if(!t||!r||!n)return;const{device:i}=t,s={buffer:i.createBuffer({label:"arrows",size:I*4*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),entityIds:Qn(i,I*2),count:0};e.setResource(Fo,s),jn(e,Hf({scene:r.scene,arrows:s.buffer,lines:n.buffer,matrices:r.matrices,entityIds:s.entityIds,getCount:()=>s.count}))}};function Ue(e){return e.data.getUint8(e.offset++)}function X(e){const t=e.data.getInt16(e.offset);return e.offset+=2,t}function N(e){const t=e.data.getUint16(e.offset);return e.offset+=2,t}function ue(e){const t=e.data.getUint32(e.offset);return e.offset+=4,t}function Wi(e){return String.fromCharCode(Ue(e),Ue(e),Ue(e),Ue(e))}function se(e,t){e.offset=t}function Yf(e){const t=new Map;se(e,0);const r=Wi(e);if(r!=="\0\0\0"&&r!=="OTTO"&&r!=="true")throw new Error("Not a valid TTF/OTF font");const n=N(e);N(e),N(e),N(e);for(let i=0;i<n;i++){const s=Wi(e);ue(e);const o=ue(e),a=ue(e);t.set(s,{offset:o,length:a})}return t}function qf(e,t){se(e,t.offset+18);const r=N(e);se(e,t.offset+50);const n=X(e);return{unitsPerEm:r,indexToLocFormat:n}}function Zf(e,t){se(e,t.offset+4);const r=X(e),n=X(e),i=X(e);se(e,t.offset+34);const s=N(e);return{ascender:r,descender:n,lineGap:i,numHMetrics:s}}function jf(e,t,r,n){const i=new Uint16Array(n);se(e,t.offset);let s=0;for(let o=0;o<r;o++)s=N(e),i[o]=s,X(e);for(let o=r;o<n;o++)i[o]=s;return{advances:i}}function Kf(e,t){return se(e,t.offset+4),N(e)}function Jf(e,t,r,n){const i=new Uint32Array(r+1);if(se(e,t.offset),n===0)for(let s=0;s<=r;s++)i[s]=N(e)*2;else for(let s=0;s<=r;s++)i[s]=ue(e);return i}function eh(e,t){const r=new Map;se(e,t.offset),N(e);const n=N(e);let i=-1,s=-1;for(let o=0;o<n;o++){const a=N(e),c=N(e),u=ue(e);a===3&&c===1&&(i=t.offset+u),a===3&&c===10&&(s=t.offset+u),a===0&&c===3&&(i=t.offset+u),a===0&&c===4&&(s=t.offset+u)}if(s!==-1&&(se(e,s),N(e)===12)){N(e),ue(e),ue(e);const a=ue(e);for(let c=0;c<a;c++){const u=ue(e),l=ue(e),f=ue(e);for(let h=u;h<=l;h++)r.set(h,f+(h-u))}return r}if(i!==-1&&(se(e,i),N(e)===4)){N(e),N(e);const a=N(e)/2;N(e),N(e),N(e);const c=[];for(let d=0;d<a;d++)c.push(N(e));N(e);const u=[];for(let d=0;d<a;d++)u.push(N(e));const l=[];for(let d=0;d<a;d++)l.push(X(e));const f=e.offset,h=[];for(let d=0;d<a;d++)h.push(N(e));for(let d=0;d<a;d++){const m=u[d],g=c[d],y=l[d],w=h[d];if(g!==65535)for(let p=m;p<=g;p++){let v;if(w===0)v=p+y&65535;else{const x=f+d*2+w+(p-m)*2;se(e,x),v=N(e),v!==0&&(v=v+y&65535)}v!==0&&r.set(p,v)}}}return r}function th(e,t){const r=new Map;se(e,t.offset);const n=N(e);if(n===0){const i=N(e);for(let s=0;s<i;s++)if(N(e),N(e),N(e)>>8===0){const c=N(e);N(e),N(e),N(e);for(let u=0;u<c;u++){const l=N(e),f=N(e),h=X(e);r.set(l<<16|f,h)}}}else if(n===1){N(e);const i=ue(e);for(let s=0;s<i;s++){const o=ue(e);if((N(e)&255)===0){const u=N(e);N(e),N(e),N(e);for(let l=0;l<u;l++){const f=N(e),h=N(e),d=X(e);r.set(f<<16|h,d)}}else se(e,e.offset+o-8)}}return r}const rh=1,nh=2,ih=4,sh=8,Qi=16,Hi=32;function No(e,t,r,n){const i=r[n],s=r[n+1];if(i===s)return null;se(e,t+i);const o=X(e),a=X(e),c=X(e),u=X(e),l=X(e);if(o<0)return oh(e,t,r);const f=[];for(let b=0;b<o;b++)f.push(N(e));const h=f.length>0?f[f.length-1]+1:0,d=N(e);se(e,e.offset+d);const m=[];for(;m.length<h;){const b=Ue(e);if(m.push(b),b&sh){const S=Ue(e);for(let _=0;_<S;_++)m.push(b)}}const g=[];let y=0;for(let b=0;b<h;b++){const S=m[b];if(S&nh){const _=Ue(e);y+=S&Qi?_:-_}else S&Qi||(y+=X(e));g.push(y)}const w=[];let p=0;for(let b=0;b<h;b++){const S=m[b];if(S&ih){const _=Ue(e);p+=S&Hi?_:-_}else S&Hi||(p+=X(e));w.push(p)}let v="",x=0;for(let b=0;b<o;b++){const S=f[b],_=[];for(let k=x;k<=S;k++)_.push({x:g[k],y:w[k],on:!!(m[k]&rh)});if(_.length===0){x=S+1;continue}let E=0;for(;E<_.length&&!_[E].on;)E++;if(E===_.length){const k={x:(_[0].x+_[1].x)/2,y:(_[0].y+_[1].y)/2,on:!0};_.unshift(k),E=0}const B=[..._.slice(E),..._.slice(0,E)];v+=`M${B[0].x},${B[0].y}`;let R=1;for(;R<B.length;){const k=B[R];if(k.on)v+=`L${k.x},${k.y}`,R++;else{const q=B[(R+1)%B.length];if(q.on)v+=`Q${k.x},${k.y},${q.x},${q.y}`,R+=2;else{const ee=(k.x+q.x)/2,L=(k.y+q.y)/2;v+=`Q${k.x},${k.y},${ee},${L}`,R++}}}if(!B[B.length-1].on){const k=B[B.length-1];v+=`Q${k.x},${k.y},${B[0].x},${B[0].y}`}v+="Z",x=S+1}return{path:v,bounds:[a,c,u,l]}}function oh(e,t,r){let n="",i=1/0,s=1/0,o=-1/0,a=-1/0,c=!0;for(;c;){const u=N(e),l=N(e);let f=0,h=0,d=1,m=0,g=0,y=1;u&1?(f=X(e),h=X(e)):(f=(e.data.getInt8(e.offset++)+e.data.getInt8(e.offset++))/2,h=0),u&8?d=y=X(e)/16384:u&64?(d=X(e)/16384,y=X(e)/16384):u&128&&(d=X(e)/16384,m=X(e)/16384,g=X(e)/16384,y=X(e)/16384);const w=e.offset,p=No(e,t,r,l);if(e.offset=w,p){const v=ah(p.path,d,m,g,y,f,h);n+=v,i=Math.min(i,p.bounds[0]*d+p.bounds[1]*m+f),s=Math.min(s,p.bounds[0]*g+p.bounds[1]*y+h),o=Math.max(o,p.bounds[2]*d+p.bounds[3]*m+f),a=Math.max(a,p.bounds[2]*g+p.bounds[3]*y+h)}c=!!(u&32)}return n===""?null:{path:n,bounds:[i,s,o,a]}}function ah(e,t,r,n,i,s,o){return e.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g,(a,c,u)=>{const l=parseFloat(c)*t+parseFloat(u)*r+s,f=parseFloat(c)*n+parseFloat(u)*i+o;return`${l},${f}`})}function ch(e){const t={data:new DataView(e),offset:0},r=Yf(t),n=r.get("head"),i=r.get("hhea"),s=r.get("hmtx"),o=r.get("maxp"),a=r.get("cmap"),c=r.get("loca"),u=r.get("glyf"),l=r.get("kern");if(!n||!i||!s||!o||!a||!c||!u)throw new Error("Missing required font tables");const f=qf(t,n),h=Zf(t,i),d=Kf(t,o),m=jf(t,s,h.numHMetrics,d),g=Jf(t,c,d,f.indexToLocFormat),y=eh(t,a),w=l?th(t,l):new Map,p=new Map,v=u.offset;function x(S){return y.get(S.codePointAt(0)??0)??0}function b(S){if(p.has(S))return p.get(S);const _=No(t,v,g,S);return p.set(S,_),_}return{unitsPerEm:f.unitsPerEm,ascender:h.ascender,descender:h.descender,lineGap:h.lineGap,glyphPath(S){return b(x(S))?.path??null},glyphBounds(S){return b(x(S))?.bounds??null},advance(S){return m.advances[x(S)]??0},kerning(S,_){const E=x(S),B=x(_);return w.get(E<<16|B)??0}}}async function uh(e){const t=await fetch(e);if(!t.ok)throw new Error(`Failed to load font: ${t.statusText}`);return ch(await t.arrayBuffer())}function lh(e,t,r,n,i,s,o){const a=1-o;return{x:a*a*e+2*a*o*r+o*o*i,y:a*a*t+2*a*o*n+o*o*s}}function dh(e,t,r,n,i,s,o,a,c){const u=1-c;return{x:u*u*u*e+3*u*u*c*r+3*u*c*c*i+c*c*c*o,y:u*u*u*t+3*u*u*c*n+3*u*c*c*s+c*c*c*a}}function fh(e,t=16){const r=[],n=/([MLQCZ])([^MLQCZ]*)/g;let i,s=0,o=0,a=0,c=0;for(;i=n.exec(e);){const u=i[2].trim().split(/[,\s]+/).filter(l=>l).map(l=>parseFloat(l));switch(i[1]){case"M":a=s=u[0],c=o=u[1];break;case"L":(u[0]!==a||u[1]!==c)&&r.push({x1:a,y1:c,x2:u[0],y2:u[1]}),a=u[0],c=u[1];break;case"Q":{let l=a,f=c;for(let h=1;h<t;h++){const d=lh(a,c,u[0],u[1],u[2],u[3],h/(t-1));r.push({x1:l,y1:f,x2:d.x,y2:d.y}),l=d.x,f=d.y}a=u[2],c=u[3];break}case"C":{let l=a,f=c;for(let h=1;h<t;h++){const d=dh(a,c,u[0],u[1],u[2],u[3],u[4],u[5],h/(t-1));r.push({x1:l,y1:f,x2:d.x,y2:d.y}),l=d.x,f=d.y}a=u[4],c=u[5];break}case"Z":(a!==s||c!==o)&&r.push({x1:a,y1:c,x2:s,y2:o}),a=s,c=o;break}}return r}const hh=`
struct Uniforms {
    glyphBounds: vec4<f32>,
    maxDistance: f32,
    exponent: f32,
    _pad: vec2<f32>,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var<storage, read> segments: array<vec4<f32>>;

struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) glyphXY: vec2<f32>,
    @location(1) @interpolate(flat) segmentIdx: u32,
}

@vertex
fn vs_distance(
    @builtin(vertex_index) vid: u32,
    @builtin(instance_index) segmentIdx: u32
) -> VertexOutput {
    let uv = vec2<f32>(
        f32((vid << 1u) & 2u),
        f32(vid & 2u)
    );

    var out: VertexOutput;
    out.position = vec4<f32>(uv * 2.0 - 1.0, 0.0, 1.0);
    out.glyphXY = mix(uniforms.glyphBounds.xy, uniforms.glyphBounds.zw, uv);
    out.segmentIdx = segmentIdx;
    return out;
}

@fragment
fn fs_distance(input: VertexOutput) -> @location(0) vec4<f32> {
    let seg = segments[input.segmentIdx];
    let p = input.glyphXY;

    let lineDir = seg.zw - seg.xy;
    let lenSq = dot(lineDir, lineDir);
    let t = select(0.0, clamp(dot(p - seg.xy, lineDir) / lenSq, 0.0, 1.0), lenSq > 0.0);
    let closest = seg.xy + t * lineDir;
    let dist = distance(p, closest);

    let val = pow(1.0 - clamp(dist / uniforms.maxDistance, 0.0, 1.0), uniforms.exponent) * 0.5;

    let crosses = (seg.y > p.y) != (seg.w > p.y);
    let crossX = (seg.z - seg.x) * (p.y - seg.y) / (seg.w - seg.y) + seg.x;
    let crossingUp = crosses && (p.x < crossX) && (seg.y < seg.w);
    let crossingDown = crosses && (p.x < crossX) && (seg.y > seg.w);

    return vec4<f32>(
        select(0.0, 1.0/255.0, crossingUp),
        select(0.0, 1.0/255.0, crossingDown),
        0.0,
        val
    );
}
`,mh=`
@group(0) @binding(0) var intermediate: texture_2d<f32>;
@group(0) @binding(1) var samp: sampler;

struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv: vec2<f32>,
}

@vertex
fn vs_finalize(@builtin(vertex_index) vid: u32) -> VertexOutput {
    let uv = vec2<f32>(
        f32((vid << 1u) & 2u),
        f32(vid & 2u)
    );

    var out: VertexOutput;
    out.position = vec4<f32>(uv * 2.0 - 1.0, 0.0, 1.0);
    out.uv = uv;
    return out;
}

@fragment
fn fs_finalize(input: VertexOutput) -> @location(0) vec4<f32> {
    let color = textureSample(intermediate, samp, input.uv);
    let inside = color.r != color.g;
    let val = select(color.a, 1.0 - color.a, inside);
    return vec4<f32>(val, val, val, val);
}
`;class ph{constructor(t){this.distancePipeline=null,this.finalizePipeline=null,this.intermediateTexture=null,this.maxSegments=4096,this.device=t.device,this.sdfSize=t.sdfSize??64,this.exponent=t.exponent??9,this.curveSubdivisions=t.curveSubdivisions??16,this.uniformBuffer=this.device.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.segmentBuffer=this.device.createBuffer({size:this.maxSegments*16,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.sampler=this.device.createSampler({magFilter:"nearest",minFilter:"nearest"})}ensurePipelines(){if(this.distancePipeline)return;const t=this.device.createShaderModule({code:hh});this.distancePipeline=this.device.createRenderPipeline({layout:"auto",vertex:{module:t,entryPoint:"vs_distance"},fragment:{module:t,entryPoint:"fs_distance",targets:[{format:"rgba8unorm",blend:{color:{srcFactor:"one",dstFactor:"one",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one",operation:"max"}}}]},primitive:{topology:"triangle-list"}});const r=this.device.createShaderModule({code:mh});this.finalizePipeline=this.device.createRenderPipeline({layout:"auto",vertex:{module:r,entryPoint:"vs_finalize"},fragment:{module:r,entryPoint:"fs_finalize",targets:[{format:"r8unorm"}]},primitive:{topology:"triangle-list"}})}ensureIntermediateTexture(){this.intermediateTexture||(this.intermediateTexture=this.device.createTexture({size:{width:this.sdfSize,height:this.sdfSize},format:"rgba8unorm",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING}))}generate(t,r,n,i,s){this.ensurePipelines(),this.ensureIntermediateTexture();const o=fh(t,this.curveSubdivisions);if(o.length===0)return;o.length>this.maxSegments&&(console.warn(`Too many segments (${o.length}), truncating to ${this.maxSegments}`),o.length=this.maxSegments);const[a,c,u,l]=r,f=Math.max(u-a,l-c)/2,h=new Float32Array([a,c,u,l,f,this.exponent,0,0]);this.device.queue.writeBuffer(this.uniformBuffer,0,h);const d=new Float32Array(o.length*4);for(let x=0;x<o.length;x++){const b=o[x];d[x*4+0]=b.x1,d[x*4+1]=b.y1,d[x*4+2]=b.x2,d[x*4+3]=b.y2}this.device.queue.writeBuffer(this.segmentBuffer,0,d);const m=this.device.createCommandEncoder(),g=this.device.createBindGroup({layout:this.distancePipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniformBuffer}},{binding:1,resource:{buffer:this.segmentBuffer}}]}),y=m.beginRenderPass({colorAttachments:[{view:this.intermediateTexture.createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]});y.setPipeline(this.distancePipeline),y.setBindGroup(0,g),y.draw(3,o.length),y.end();const w=this.device.createBindGroup({layout:this.finalizePipeline.getBindGroupLayout(0),entries:[{binding:0,resource:this.intermediateTexture.createView()},{binding:1,resource:this.sampler}]}),p=n.createView({baseMipLevel:0,mipLevelCount:1,baseArrayLayer:0,arrayLayerCount:1}),v=m.beginRenderPass({colorAttachments:[{view:p,loadOp:"load",storeOp:"store"}]});v.setViewport(i,s,this.sdfSize,this.sdfSize,0,1),v.setScissorRect(i,s,this.sdfSize,this.sdfSize),v.setPipeline(this.finalizePipeline),v.setBindGroup(0,w),v.draw(3),v.end(),this.device.queue.submit([m.finish()])}destroy(){this.uniformBuffer.destroy(),this.segmentBuffer.destroy(),this.intermediateTexture?.destroy()}}const Mn=5e4,Rr=16,ke=96,gh=9,zr=[],ei=[],yh="https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf";function bh(e){const t=zr.length;return zr.push(e),ei.push(null),t}async function wh(){await Promise.all(zr.map(async(e,t)=>{ei[t]=await uh(e)}))}const Oo={data:new Float32Array(I*12),fonts:new Uint32Array(I)},Me=Oo.data,vh=Oo.fonts;function xh(e,t,r){function n(s){const o=s*t+r,a=Math.round(e[o]*255),c=Math.round(e[o+1]*255),u=Math.round(e[o+2]*255);return a<<16|c<<8|u}function i(s,o){const a=s*t+r;e[a]=(o>>16&255)/255,e[a+1]=(o>>8&255)/255,e[a+2]=(o&255)/255,e[a+3]=1}return new Proxy([],{get(s,o){if(o==="get")return n;if(o==="set")return i;const a=Number(o);if(!Number.isNaN(a))return n(a)},set(s,o,a){const c=Number(o);return Number.isNaN(c)?!1:(i(c,a),!0)}})}const wr=new Map;function _h(){return new Proxy({},{get(e,t){const r=Number(t);if(!Number.isNaN(r))return wr.get(r)},set(e,t,r){const n=Number(t);return Number.isNaN(n)?!1:(r==null?wr.delete(n):wr.set(n,r),!0)}})}const ge={content:_h(),font:vh,fontSize:K(Me,12,0),opacity:K(Me,12,1),visible:K(Me,12,2),anchorX:K(Me,12,3),anchorY:K(Me,12,4),color:xh(Me,12,8),colorR:K(Me,12,8),colorG:K(Me,12,9),colorB:K(Me,12,10)};let kn=[];function Ch(e){if(e._value){const t={};for(const r of e._value.split(";")){const n=r.indexOf(":");if(n===-1)continue;const i=r.slice(0,n).trim(),s=r.slice(n+1).trim();i&&s&&(t[i]=s)}return t}return e}function Sh(e,t){for(const r of kn)ge.content[r.eid]=r.content;kn=[]}$(ge,{defaults:()=>({font:0,fontSize:1,opacity:1,visible:1,anchorX:0,anchorY:0,color:16777215}),adapter:(e,t)=>{const r=Ch(e),n={};if(r.content&&kn.push({eid:t,content:r.content}),r.font&&(n.font=parseInt(r.font,10)),r["font-size"]&&(n.fontSize=parseFloat(r["font-size"])),r.fontSize&&(n.fontSize=parseFloat(r.fontSize)),r.opacity&&(n.opacity=parseFloat(r.opacity)),r.visible&&(n.visible=parseFloat(r.visible)),r["anchor-x"]&&(n.anchorX=parseFloat(r["anchor-x"])),r.anchorX&&(n.anchorX=parseFloat(r.anchorX)),r["anchor-y"]&&(n.anchorY=parseFloat(r["anchor-y"])),r.anchorY&&(n.anchorY=parseFloat(r.anchorY)),r.color){const i=r.color;i.startsWith("0x")||i.startsWith("0X")?n.color=parseInt(i,16):i.startsWith("#")?n.color=parseInt(i.slice(1),16):n.color=parseInt(i,10)}return n}});function Th(e,t){const i=e.createTexture({size:{width:2048,height:2048},format:"r8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT,label:"glyphAtlas"}),s=new ph({device:e,sdfSize:ke,exponent:gh,curveSubdivisions:24});return{texture:i,textureView:i.createView(),width:2048,height:2048,glyphs:new Map,rowHeight:0,cursorX:0,cursorY:0,font:t,sdfGenerator:s}}function Eh(e,t){const r=e.glyphs.get(t);if(r)return r;const n=e.font.glyphPath(t),i=e.font.glyphBounds(t),s=e.font.advance(t);if(!n||!i)return null;const[o,a,c,u]=i,l=e.font.unitsPerEm,f=l*.1,h=[o-f,a-f,c+f,u+f],d=h[2]-h[0],m=h[3]-h[1];if(e.cursorX+ke>e.width&&(e.cursorX=0,e.cursorY+=e.rowHeight,e.rowHeight=0),e.cursorY+ke>e.height)throw new Error("Glyph atlas full");e.sdfGenerator.generate(n,h,e.texture,e.cursorX,e.cursorY);const g={width:ke,height:ke,glyphWidth:d/l,glyphHeight:m/l,glyphTop:h[3]/l,glyphLeft:h[0]/l,advance:s/l,u0:e.cursorX/e.width,v0:e.cursorY/e.height,u1:(e.cursorX+ke)/e.width,v1:(e.cursorY+ke)/e.height};return e.glyphs.set(t,g),e.cursorX+=ke,e.rowHeight=Math.max(e.rowHeight,ke),g}function Ph(e,t){for(const r of t)Eh(e,r)}function Bh(e,t,r){const n=[],i=r;let s=0,o=0,a=null;for(const c of e){const u=t.glyphs.get(c);if(!u)continue;a&&(s+=t.font.kerning(a,c)/t.font.unitsPerEm*i);const l=u.glyphWidth*i,f=u.glyphHeight*i,h=u.advance*i,d=s+u.glyphLeft*i,m=(u.glyphTop-u.glyphHeight)*i;n.push({x:d,y:m,width:l,height:f,texelWidth:u.width,texelHeight:u.height,u0:u.u0,v0:u.v0,u1:u.u1,v1:u.v1}),s+=h,o=Math.max(o,f),a=c}return{glyphs:n,width:s,height:o}}const Ah=`
${st}

struct GlyphInstance {
    posX: f32,
    posY: f32,
    posZ: f32,
    entityId: u32,
    width: f32,
    height: f32,
    texelWidth: f32,
    texelHeight: f32,
    u0: f32,
    v0: f32,
    u1: f32,
    v1: f32,
    color: vec4<f32>,
}

@group(0) @binding(0) var<uniform> scene: Scene;
@group(0) @binding(1) var<storage, read> glyphs: array<GlyphInstance>;
@group(0) @binding(2) var atlasTexture: texture_2d<f32>;
@group(0) @binding(3) var atlasSampler: sampler;
@group(0) @binding(4) var<storage, read> matrices: array<mat4x4<f32>>;

struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv: vec2<f32>,
    @location(1) color: vec4<f32>,
    @location(2) localUV: vec2<f32>,
    @location(3) glyphDimensions: vec2<f32>,
}

@vertex
fn vs(@builtin(vertex_index) vid: u32) -> VertexOutput {
    let glyphIdx = vid / 6u;
    let cornerIdx = vid % 6u;

    let glyph = glyphs[glyphIdx];

    var localPos: vec2<f32>;
    var uv: vec2<f32>;

    switch cornerIdx {
        case 0u: {
            localPos = vec2(0.0, 0.0);
            uv = vec2(glyph.u0, glyph.v0);
        }
        case 1u: {
            localPos = vec2(1.0, 0.0);
            uv = vec2(glyph.u1, glyph.v0);
        }
        case 2u: {
            localPos = vec2(1.0, 1.0);
            uv = vec2(glyph.u1, glyph.v1);
        }
        case 3u: {
            localPos = vec2(0.0, 0.0);
            uv = vec2(glyph.u0, glyph.v0);
        }
        case 4u: {
            localPos = vec2(1.0, 1.0);
            uv = vec2(glyph.u1, glyph.v1);
        }
        case 5u: {
            localPos = vec2(0.0, 1.0);
            uv = vec2(glyph.u0, glyph.v1);
        }
        default: {
            localPos = vec2(0.0);
            uv = vec2(0.0);
        }
    }

    let localPos3 = vec3(
        glyph.posX + localPos.x * glyph.width,
        glyph.posY + localPos.y * glyph.height,
        glyph.posZ
    );

    let transform = matrices[glyph.entityId];
    let worldPos = transform * vec4(localPos3, 1.0);

    var out: VertexOutput;
    out.position = scene.viewProj * worldPos;
    out.uv = uv;
    out.color = glyph.color;
    out.localUV = localPos;
    out.glyphDimensions = vec2(glyph.width, glyph.height);
    return out;
}

struct FragmentOutput {
    @location(0) color: vec4<f32>,
    @location(1) mask: f32,
}

const SDF_EXPONENT: f32 = 9.0;

fn sdfToSignedDistance(sdfValue: f32, maxDimension: f32) -> f32 {
    let alpha = select(sdfValue, 1.0 - sdfValue, sdfValue > 0.5);
    let absDist = (1.0 - pow(2.0 * alpha, 1.0 / SDF_EXPONENT)) * maxDimension;
    return absDist * select(1.0, -1.0, sdfValue > 0.5);
}

@fragment
fn fs(input: VertexOutput) -> FragmentOutput {
    let sdfValue = textureSample(atlasTexture, atlasSampler, input.uv).r;

    // Decode SDF to signed distance (negative = inside, positive = outside)
    let maxDimension = max(input.glyphDimensions.x, input.glyphDimensions.y);
    let signedDist = sdfToSignedDistance(sdfValue, maxDimension);

    // Screen-space AA distance from UV derivatives
    let aaDist = length(fwidth(input.localUV * input.glyphDimensions)) * 0.5;

    // Smoothstep with adaptive band
    let alpha = smoothstep(aaDist, -aaDist, signedDist);

    // Dilate mask by FXAA span (8 pixels) to prevent edge bleeding
    let fxaaSpan = aaDist * 8.0;
    let inMaskRegion = signedDist < fxaaSpan;

    // Only discard if outside both visible region and mask region
    if alpha < 0.01 && !inMaskRegion {
        discard;
    }

    var out: FragmentOutput;
    out.color = vec4(input.color.rgb, input.color.a * alpha);
    out.mask = select(0.0, 1.0, inMaskRegion);
    return out;
}
`;function Ih(e,t,r){const n=e.createShaderModule({code:Ah});return e.createRenderPipeline({layout:"auto",vertex:{module:n,entryPoint:"vs"},fragment:{module:n,entryPoint:"fs",targets:[{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}},{format:r,writeMask:GPUColorWrite.RED}]},primitive:{topology:"triangle-list",cullMode:"none"},depthStencil:{format:Hr,depthCompare:"less",depthWriteEnabled:!1}})}function Mh(e){let t=null,r=null;return{id:`text-${e.fontIndex}`,pass:Be.Overlay,order:2+e.fontIndex,execute(){},draw(n,i){const{start:s,count:o}=e.getRange();o!==0&&(t||(t=Ih(i.device,i.format,i.maskFormat)),r||(r=i.device.createBindGroup({layout:t.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.scene}},{binding:1,resource:{buffer:e.glyphs}},{binding:2,resource:e.atlas},{binding:3,resource:e.sampler},{binding:4,resource:{buffer:e.matrices}}]})),n.setPipeline(t),n.setBindGroup(0,r),n.draw(o*6,1,s*6,0))}}}const Ro=Ie("glyphs"),kh={group:"draw",update(e){const t=ve.from(e),r=Ro.from(e);if(!t||!r)return;const{device:n}=t,{atlases:i,staging:s,ranges:o}=r,a=new Uint32Array(s.buffer),c=i.map(()=>[]);for(const l of e.query([ge,z])){if(!ge.visible[l])continue;const f=wr.get(l);if(!f)continue;const h=ge.font[l],d=i[h]??i[0],m=i[h]?h:0;if(!d)continue;Ph(d,f);const g=ge.fontSize[l],y=Bh(f,d,g),w=ge.anchorX[l],p=ge.anchorY[l],v=-y.width*w,x=-y.height*p,b=ge.color[l],S=(b>>16&255)/255,_=(b>>8&255)/255,E=(b&255)/255,B=ge.opacity[l];for(const R of y.glyphs)c[m].push({eid:l,fontId:m,x:v+R.x,y:x+R.y,width:R.width,height:R.height,texelWidth:R.texelWidth,texelHeight:R.texelHeight,u0:R.u0,v0:R.v0,u1:R.u1,v1:R.v1,r:S,g:_,b:E,a:B})}let u=0;for(let l=0;l<i.length;l++){const f=c[l];o[l].start=u,o[l].count=f.length;for(const h of f){if(u>=Mn)break;const d=u*Rr;s[d+0]=h.x,s[d+1]=h.y,s[d+2]=0,a[d+3]=h.eid,s[d+4]=h.width,s[d+5]=h.height,s[d+6]=h.texelWidth,s[d+7]=h.texelHeight,s[d+8]=h.u0,s[d+9]=h.v0,s[d+10]=h.u1,s[d+11]=h.v1,s[d+12]=h.r,s[d+13]=h.g,s[d+14]=h.b,s[d+15]=h.a,u++}}u>0&&n.queue.writeBuffer(r.buffer,0,s.buffer,0,u*Rr*4)}},w0={systems:[kh],components:{Text:ge},dependencies:[er,Yr],async initialize(e){Wn(Sh);const t=ve.from(e),r=rr.from(e);if(!t||!r)return;zr.length===0&&bh(yh);try{await wh()}catch(c){console.warn("[TextPlugin] Failed to load fonts:",c);return}const{device:n}=t,i=[];for(const c of ei)c&&i.push(Th(n,c));if(i.length===0)return;const s=n.createSampler({magFilter:"linear",minFilter:"linear"}),o=i.map(()=>({start:0,count:0})),a={atlases:i,sampler:s,buffer:n.createBuffer({label:"glyphs",size:Mn*Rr*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),staging:new Float32Array(Mn*Rr),ranges:o};e.setResource(Ro,a);for(let c=0;c<i.length;c++){const u=c;jn(e,Mh({scene:r.scene,glyphs:a.buffer,atlas:i[c].textureView,sampler:s,matrices:r.matrices,fontIndex:u,getRange:()=>o[u]}))}}},fr={springConstant:.72,damping:.046,bounds:{min:-20,max:120}},Xi={size:75,blur:10},Fh={opacity:.4},Fn=16,Nh={data:new Float32Array(I*Fn)},Oh=new Map,Rh=new Map,zh=new Map,Dh=new Map;function de(e){const t=Nh.data;function r(i){return t[i*Fn+e]}function n(i,s){t[i*Fn+e]=s}return new Proxy([],{get(i,s){if(s==="get")return r;if(s==="set")return n;const o=Number(s);if(!Number.isNaN(o))return r(o)},set(i,s,o){const a=Number(s);return Number.isNaN(a)?!1:(n(a,o),!0)}})}function hr(e){return new Proxy({},{get(t,r){const n=Number(r);if(!Number.isNaN(n))return e.get(n)},set(t,r,n){const i=Number(r);return Number.isNaN(i)?!1:(n==null?e.delete(i):e.set(i,n),!0)}})}const Lh={seed:hr(Oh),color1:hr(Rh),color2:hr(zh),overlayColor:hr(Dh),angle:de(0),enabled:de(1),bubbleSize:de(2),bubbleBlur:de(3),textureEnabled:de(4),textureOpacity:de(5),overlayEnabled:de(6),bubbleCount:de(7),springConstant:de(8),damping:de(9),boundsMin:de(10),boundsMax:de(11)};$(Lh,{defaults:()=>({enabled:1,bubbleSize:Xi.size,bubbleBlur:Xi.blur,textureEnabled:1,textureOpacity:Fh.opacity,overlayEnabled:1,bubbleCount:4,springConstant:fr.springConstant,damping:fr.damping,boundsMin:fr.bounds.min,boundsMax:fr.bounds.max})});Ie("gradient");const ye={step:[],target:[],max:[]};$(ye,{defaults:()=>({step:0,target:0,max:0})});const Ve={from:[],to:[]};$(Ve,{defaults:()=>({from:0,to:0})});const zo={index:[],group:[]};$(zo,{defaults:()=>({index:0,group:0})});function Uh(){let e=!1;return{group:"simulation",update(t){if(!e)for(const r of t.query([ye])){const n=ye.step[r],i=ye.target[r];if(n!==i){e=!0;for(const s of t.query([Y]))Y.state[s]===fe.PLAYING&&(Y.state[s]=fe.COMPLETE);t.step(0);for(const s of t.query([Y])){Y.state[s]=fe.IDLE,Y.elapsed[s]=0;for(const o of t.query([J(le.relation,s),O]))O.state[o]=he.IDLE,O.elapsed[o]=0}for(const s of t.query([Y,Ve]))if(Ve.from[s]===n&&Ve.to[s]===i){Y.state[s]=fe.PLAYING;break}ye.step[r]=i,e=!1}}}}}function v0(){return{components:{StepController:ye,StepTransition:Ve,TokenIndex:zo},systems:[Uh()]}}function Vh(e){const t=typeof e=="string"?document.querySelector(e):e;return t?{btnPrev:t.querySelector(".btn-prev"),btnNext:t.querySelector(".btn-next"),counter:t.querySelector(".step-counter"),title:t.querySelector(".step-title"),description:t.querySelector(".step-description")}:{btnPrev:null,btnNext:null,counter:null,title:null,description:null}}function Gh(e,t){const{steps:r,getStep:n,setStep:i}=t,s=r.length-1,o=e.title?.parentElement;if(o){let h=0;for(const d of r)e.title&&(e.title.textContent=d.title),e.description&&(e.description.innerHTML=d.description),h=Math.max(h,o.offsetHeight);o.style.minHeight=`${h}px`}function a(){const h=n(),{btnPrev:d,btnNext:m,counter:g,title:y,description:w}=e,p=r[h];d&&(d.disabled=h<=0),m&&(m.disabled=h>=s),g&&(g.textContent=`Step ${h+1} of ${r.length}`),y&&(y.textContent=p?.title??""),w&&(w.innerHTML=p?.description??"")}const c=()=>i(n()-1),u=()=>i(n()+1),l=h=>{h.key==="ArrowLeft"&&i(n()-1),h.key==="ArrowRight"&&i(n()+1)};e.btnPrev?.addEventListener("click",c),e.btnNext?.addEventListener("click",u),document.addEventListener("keydown",l);const f=setInterval(a,50);return a(),()=>{clearInterval(f),e.btnPrev?.removeEventListener("click",c),e.btnNext?.removeEventListener("click",u),document.removeEventListener("keydown",l)}}function $h(e,t,r,n){const s=[...t.query([ye])][0];if(s===void 0)return()=>{};const o=r.length-1,a=()=>ye.target[s],c=h=>{const d=Math.max(0,Math.min(o,h));ye.target[s]=d,n?.(d)},u=h=>{const d=Math.max(0,Math.min(o,h));ye.step[s]=d,ye.target[s]=d,n?.(d)},l=Vh(document.body),f=Gh(l,{steps:r,getStep:a,setStep:c});return e.__controllerEid__=s,e.__getStep__=a,e.__setStep__=c,e.__setStepImmediate__=u,e.__maxStep__=o,f}function P(e){if(!e)throw new Error("Assertion failed.")}const be=e=>e&&e[e.length-1],Et=e=>e>=0&&e<2**32;class ot{constructor(t){this.bytes=t,this.pos=0}seekToByte(t){this.pos=8*t}readBit(){const t=Math.floor(this.pos/8),r=this.bytes[t]??0,n=7-(this.pos&7),i=(r&1<<n)>>n;return this.pos++,i}readBits(t){if(t===1)return this.readBit();let r=0;for(let n=0;n<t;n++)r<<=1,r|=this.readBit();return r}writeBits(t,r){const n=this.pos+t;for(let i=this.pos;i<n;i++){const s=Math.floor(i/8);let o=this.bytes[s];const a=7-(i&7);o&=~(1<<a),o|=(r&1<<n-i-1)>>n-i-1<<a,this.bytes[s]=o}this.pos=n}readAlignedByte(){if(this.pos%8!==0)throw new Error("Bitstream is not byte-aligned.");const t=this.pos/8,r=this.bytes[t]??0;return this.pos+=8,r}skipBits(t){this.pos+=t}getBitsLeft(){return this.bytes.length*8-this.pos}clone(){const t=new ot(this.bytes);return t.pos=this.pos,t}}const T=e=>{let t=0;for(;e.readBits(1)===0&&t<32;)t++;if(t>=32)throw new Error("Invalid exponential-Golomb code.");return(1<<t)-1+e.readBits(t)},Re=e=>{const t=T(e);return(t&1)===0?-(t>>1):t+1>>1},Ge=e=>e.constructor===Uint8Array?e:ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):new Uint8Array(e),Do=e=>e.constructor===DataView?e:ArrayBuffer.isView(e)?new DataView(e.buffer,e.byteOffset,e.byteLength):new DataView(e),Ee=new TextEncoder,ti={bt709:1,bt470bg:5,smpte170m:6,bt2020:9,smpte432:12},ri={bt709:1,smpte170m:6,linear:8,"iec61966-2-1":13,pq:16,hlg:18},ni={rgb:0,bt709:1,bt470bg:5,smpte170m:6,"bt2020-ncl":9},Wh=e=>!!e&&!!e.primaries&&!!e.transfer&&!!e.matrix&&e.fullRange!==void 0,ii=e=>e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer||ArrayBuffer.isView(e);class Lo{constructor(){this.currentPromise=Promise.resolve(),this.pending=0}async acquire(){let t;const r=new Promise(i=>{let s=!1;t=()=>{s||(i(),this.pending--,s=!0)}}),n=this.currentPromise;return this.currentPromise=r,this.pending++,await n,t}}const Qh=()=>{let e,t;return{promise:new Promise((n,i)=>{e=n,t=i}),resolve:e,reject:t}},si=e=>{throw new Error(`Unexpected value: ${e}`)},Hh=(e,t,r,n)=>{r=r>>>0,r=r&16777215,e.setUint8(t,r>>>16&255),e.setUint8(t+1,r>>>8&255),e.setUint8(t+2,r&255)},Xh="und",Yh=/^[a-z]{3}$/,qh=e=>Yh.test(e),mt=1e6*(1+Number.EPSILON),Zh=(e,t)=>{const r=e<0?-1:1;e=Math.abs(e);let n=0,i=1,s=1,o=0,a=e;for(;;){const c=Math.floor(a),u=c*s+n,l=c*o+i;if(l>t)return{numerator:r*s,denominator:o};if(n=s,i=o,s=u,o=l,a=1/(a-c),!isFinite(a))break}return{numerator:r*s,denominator:o}};class jh{constructor(){this.currentPromise=Promise.resolve()}call(t){return this.currentPromise=this.currentPromise.then(t)}}let un=null;const Nn=()=>un!==null?un:un=typeof navigator<"u"&&navigator.userAgent?.includes("Firefox"),Uo=function*(e){for(const t in e){const r=e[t];r!==void 0&&(yield{key:t,value:r})}},Kh=()=>{Symbol.dispose??=Symbol("Symbol.dispose")};class Vo{constructor(t,r){if(this.data=t,this.mimeType=r,!(t instanceof Uint8Array))throw new TypeError("data must be a Uint8Array.");if(typeof r!="string")throw new TypeError("mimeType must be a string.")}}class Jh{constructor(t,r,n,i){if(this.data=t,this.mimeType=r,this.name=n,this.description=i,!(t instanceof Uint8Array))throw new TypeError("data must be a Uint8Array.");if(r!==void 0&&typeof r!="string")throw new TypeError("mimeType, when provided, must be a string.");if(n!==void 0&&typeof n!="string")throw new TypeError("name, when provided, must be a string.");if(i!==void 0&&typeof i!="string")throw new TypeError("description, when provided, must be a string.")}}const em=e=>{if(!e||typeof e!="object")throw new TypeError("tags must be an object.");if(e.title!==void 0&&typeof e.title!="string")throw new TypeError("tags.title, when provided, must be a string.");if(e.description!==void 0&&typeof e.description!="string")throw new TypeError("tags.description, when provided, must be a string.");if(e.artist!==void 0&&typeof e.artist!="string")throw new TypeError("tags.artist, when provided, must be a string.");if(e.album!==void 0&&typeof e.album!="string")throw new TypeError("tags.album, when provided, must be a string.");if(e.albumArtist!==void 0&&typeof e.albumArtist!="string")throw new TypeError("tags.albumArtist, when provided, must be a string.");if(e.trackNumber!==void 0&&(!Number.isInteger(e.trackNumber)||e.trackNumber<=0))throw new TypeError("tags.trackNumber, when provided, must be a positive integer.");if(e.tracksTotal!==void 0&&(!Number.isInteger(e.tracksTotal)||e.tracksTotal<=0))throw new TypeError("tags.tracksTotal, when provided, must be a positive integer.");if(e.discNumber!==void 0&&(!Number.isInteger(e.discNumber)||e.discNumber<=0))throw new TypeError("tags.discNumber, when provided, must be a positive integer.");if(e.discsTotal!==void 0&&(!Number.isInteger(e.discsTotal)||e.discsTotal<=0))throw new TypeError("tags.discsTotal, when provided, must be a positive integer.");if(e.genre!==void 0&&typeof e.genre!="string")throw new TypeError("tags.genre, when provided, must be a string.");if(e.date!==void 0&&(!(e.date instanceof Date)||Number.isNaN(e.date.getTime())))throw new TypeError("tags.date, when provided, must be a valid Date.");if(e.lyrics!==void 0&&typeof e.lyrics!="string")throw new TypeError("tags.lyrics, when provided, must be a string.");if(e.images!==void 0){if(!Array.isArray(e.images))throw new TypeError("tags.images, when provided, must be an array.");for(const t of e.images){if(!t||typeof t!="object")throw new TypeError("Each image in tags.images must be an object.");if(!(t.data instanceof Uint8Array))throw new TypeError("Each image.data must be a Uint8Array.");if(typeof t.mimeType!="string")throw new TypeError("Each image.mimeType must be a string.");if(!["coverFront","coverBack","unknown"].includes(t.kind))throw new TypeError("Each image.kind must be 'coverFront', 'coverBack', or 'unknown'.")}}if(e.comment!==void 0&&typeof e.comment!="string")throw new TypeError("tags.comment, when provided, must be a string.");if(e.raw!==void 0){if(!e.raw||typeof e.raw!="object")throw new TypeError("tags.raw, when provided, must be an object.");for(const t of Object.values(e.raw))if(t!==null&&typeof t!="string"&&!(t instanceof Uint8Array)&&!(t instanceof Vo)&&!(t instanceof Jh))throw new TypeError("Each value in tags.raw must be a string, Uint8Array, RichImageData, AttachedFile, or null.")}},tm=e=>{if(!e||typeof e!="object")throw new TypeError("disposition must be an object.");if(e.default!==void 0&&typeof e.default!="boolean")throw new TypeError("disposition.default must be a boolean.");if(e.forced!==void 0&&typeof e.forced!="boolean")throw new TypeError("disposition.forced must be a boolean.");if(e.original!==void 0&&typeof e.original!="boolean")throw new TypeError("disposition.original must be a boolean.");if(e.commentary!==void 0&&typeof e.commentary!="boolean")throw new TypeError("disposition.commentary must be a boolean.");if(e.hearingImpaired!==void 0&&typeof e.hearingImpaired!="boolean")throw new TypeError("disposition.hearingImpaired must be a boolean.");if(e.visuallyImpaired!==void 0&&typeof e.visuallyImpaired!="boolean")throw new TypeError("disposition.visuallyImpaired must be a boolean.")};const rt=["avc","hevc","vp9","av1","vp8"],nt=["pcm-s16","pcm-s16be","pcm-s24","pcm-s24be","pcm-s32","pcm-s32be","pcm-f32","pcm-f32be","pcm-f64","pcm-f64be","pcm-u8","pcm-s8","ulaw","alaw"],Go=["aac","opus","mp3","vorbis","flac"],Dr=[...Go,...nt],Lr=["webvtt"],Ur=[{maxMacroblocks:99,maxBitrate:64e3,maxDpbMbs:396,level:10},{maxMacroblocks:396,maxBitrate:192e3,maxDpbMbs:900,level:11},{maxMacroblocks:396,maxBitrate:384e3,maxDpbMbs:2376,level:12},{maxMacroblocks:396,maxBitrate:768e3,maxDpbMbs:2376,level:13},{maxMacroblocks:396,maxBitrate:2e6,maxDpbMbs:2376,level:20},{maxMacroblocks:792,maxBitrate:4e6,maxDpbMbs:4752,level:21},{maxMacroblocks:1620,maxBitrate:4e6,maxDpbMbs:8100,level:22},{maxMacroblocks:1620,maxBitrate:1e7,maxDpbMbs:8100,level:30},{maxMacroblocks:3600,maxBitrate:14e6,maxDpbMbs:18e3,level:31},{maxMacroblocks:5120,maxBitrate:2e7,maxDpbMbs:20480,level:32},{maxMacroblocks:8192,maxBitrate:2e7,maxDpbMbs:32768,level:40},{maxMacroblocks:8192,maxBitrate:5e7,maxDpbMbs:32768,level:41},{maxMacroblocks:8704,maxBitrate:5e7,maxDpbMbs:34816,level:42},{maxMacroblocks:22080,maxBitrate:135e6,maxDpbMbs:110400,level:50},{maxMacroblocks:36864,maxBitrate:24e7,maxDpbMbs:184320,level:51},{maxMacroblocks:36864,maxBitrate:24e7,maxDpbMbs:184320,level:52},{maxMacroblocks:139264,maxBitrate:24e7,maxDpbMbs:696320,level:60},{maxMacroblocks:139264,maxBitrate:48e7,maxDpbMbs:696320,level:61},{maxMacroblocks:139264,maxBitrate:8e8,maxDpbMbs:696320,level:62}],Yi=[{maxPictureSize:36864,maxBitrate:128e3,tier:"L",level:30},{maxPictureSize:122880,maxBitrate:15e5,tier:"L",level:60},{maxPictureSize:245760,maxBitrate:3e6,tier:"L",level:63},{maxPictureSize:552960,maxBitrate:6e6,tier:"L",level:90},{maxPictureSize:983040,maxBitrate:1e7,tier:"L",level:93},{maxPictureSize:2228224,maxBitrate:12e6,tier:"L",level:120},{maxPictureSize:2228224,maxBitrate:3e7,tier:"H",level:120},{maxPictureSize:2228224,maxBitrate:2e7,tier:"L",level:123},{maxPictureSize:2228224,maxBitrate:5e7,tier:"H",level:123},{maxPictureSize:8912896,maxBitrate:25e6,tier:"L",level:150},{maxPictureSize:8912896,maxBitrate:1e8,tier:"H",level:150},{maxPictureSize:8912896,maxBitrate:4e7,tier:"L",level:153},{maxPictureSize:8912896,maxBitrate:16e7,tier:"H",level:153},{maxPictureSize:8912896,maxBitrate:6e7,tier:"L",level:156},{maxPictureSize:8912896,maxBitrate:24e7,tier:"H",level:156},{maxPictureSize:35651584,maxBitrate:6e7,tier:"L",level:180},{maxPictureSize:35651584,maxBitrate:24e7,tier:"H",level:180},{maxPictureSize:35651584,maxBitrate:12e7,tier:"L",level:183},{maxPictureSize:35651584,maxBitrate:48e7,tier:"H",level:183},{maxPictureSize:35651584,maxBitrate:24e7,tier:"L",level:186},{maxPictureSize:35651584,maxBitrate:8e8,tier:"H",level:186}],qi=[{maxPictureSize:36864,maxBitrate:2e5,level:10},{maxPictureSize:73728,maxBitrate:8e5,level:11},{maxPictureSize:122880,maxBitrate:18e5,level:20},{maxPictureSize:245760,maxBitrate:36e5,level:21},{maxPictureSize:552960,maxBitrate:72e5,level:30},{maxPictureSize:983040,maxBitrate:12e6,level:31},{maxPictureSize:2228224,maxBitrate:18e6,level:40},{maxPictureSize:2228224,maxBitrate:3e7,level:41},{maxPictureSize:8912896,maxBitrate:6e7,level:50},{maxPictureSize:8912896,maxBitrate:12e7,level:51},{maxPictureSize:8912896,maxBitrate:18e7,level:52},{maxPictureSize:35651584,maxBitrate:18e7,level:60},{maxPictureSize:35651584,maxBitrate:24e7,level:61},{maxPictureSize:35651584,maxBitrate:48e7,level:62}],Zi=[{maxPictureSize:147456,maxBitrate:15e5,tier:"M",level:0},{maxPictureSize:278784,maxBitrate:3e6,tier:"M",level:1},{maxPictureSize:665856,maxBitrate:6e6,tier:"M",level:4},{maxPictureSize:1065024,maxBitrate:1e7,tier:"M",level:5},{maxPictureSize:2359296,maxBitrate:12e6,tier:"M",level:8},{maxPictureSize:2359296,maxBitrate:3e7,tier:"H",level:8},{maxPictureSize:2359296,maxBitrate:2e7,tier:"M",level:9},{maxPictureSize:2359296,maxBitrate:5e7,tier:"H",level:9},{maxPictureSize:8912896,maxBitrate:3e7,tier:"M",level:12},{maxPictureSize:8912896,maxBitrate:1e8,tier:"H",level:12},{maxPictureSize:8912896,maxBitrate:4e7,tier:"M",level:13},{maxPictureSize:8912896,maxBitrate:16e7,tier:"H",level:13},{maxPictureSize:8912896,maxBitrate:6e7,tier:"M",level:14},{maxPictureSize:8912896,maxBitrate:24e7,tier:"H",level:14},{maxPictureSize:35651584,maxBitrate:6e7,tier:"M",level:15},{maxPictureSize:35651584,maxBitrate:24e7,tier:"H",level:15},{maxPictureSize:35651584,maxBitrate:6e7,tier:"M",level:16},{maxPictureSize:35651584,maxBitrate:24e7,tier:"H",level:16},{maxPictureSize:35651584,maxBitrate:1e8,tier:"M",level:17},{maxPictureSize:35651584,maxBitrate:48e7,tier:"H",level:17},{maxPictureSize:35651584,maxBitrate:16e7,tier:"M",level:18},{maxPictureSize:35651584,maxBitrate:8e8,tier:"H",level:18},{maxPictureSize:35651584,maxBitrate:16e7,tier:"M",level:19},{maxPictureSize:35651584,maxBitrate:8e8,tier:"H",level:19}],rm=(e,t,r,n)=>{if(e==="avc"){const s=Math.ceil(t/16)*Math.ceil(r/16),o=Ur.find(f=>s<=f.maxMacroblocks&&n<=f.maxBitrate)??be(Ur),a=o?o.level:0,c="64".padStart(2,"0"),u="00",l=a.toString(16).padStart(2,"0");return`avc1.${c}${u}${l}`}else if(e==="hevc"){const a=t*r,c=Yi.find(l=>a<=l.maxPictureSize&&n<=l.maxBitrate)??be(Yi);return`hev1.1.6.${c.tier}${c.level}.B0`}else{if(e==="vp8")return"vp8";if(e==="vp9"){const s=t*r;return`vp09.00.${(qi.find(c=>s<=c.maxPictureSize&&n<=c.maxBitrate)??be(qi)).level.toString().padStart(2,"0")}.08`}else if(e==="av1"){const s=t*r,o=Zi.find(u=>s<=u.maxPictureSize&&n<=u.maxBitrate)??be(Zi);return`av01.0.${o.level.toString().padStart(2,"0")}${o.tier}.08`}}throw new TypeError(`Unhandled codec '${e}'.`)},nm=e=>{const t=e.split("."),i=(1<<7)+1,s=Number(t[1]),o=t[2],a=Number(o.slice(0,-1)),c=(s<<5)+a,u=o.slice(-1)==="H"?1:0,f=Number(t[3])===8?0:1,h=0,d=t[4]?Number(t[4]):0,m=t[5]?Number(t[5][0]):1,g=t[5]?Number(t[5][1]):1,y=t[5]?Number(t[5][2]):0,w=(u<<7)+(f<<6)+(h<<5)+(d<<4)+(m<<3)+(g<<2)+y;return[i,c,w,0]},$o=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350],Wo=[-1,1,2,3,4,5,6,8],im=e=>{let t=$o.indexOf(e.sampleRate),r=null;t===-1&&(t=15,r=e.sampleRate);const n=Wo.indexOf(e.numberOfChannels);if(n===-1)throw new TypeError(`Unsupported number of channels: ${e.numberOfChannels}`);let i=13;e.objectType>=32&&(i+=6),t===15&&(i+=24);const s=Math.ceil(i/8),o=new Uint8Array(s),a=new ot(o);return e.objectType<32?a.writeBits(5,e.objectType):(a.writeBits(5,31),a.writeBits(6,e.objectType-32)),a.writeBits(4,t),t===15&&a.writeBits(24,r),a.writeBits(4,n),o},Qo=/^pcm-([usf])(\d+)+(be)?$/,nr=e=>{if(P(nt.includes(e)),e==="ulaw")return{dataType:"ulaw",sampleSize:1,littleEndian:!0,silentValue:255};if(e==="alaw")return{dataType:"alaw",sampleSize:1,littleEndian:!0,silentValue:213};const t=Qo.exec(e);P(t);let r;t[1]==="u"?r="unsigned":t[1]==="s"?r="signed":r="float";const n=Number(t[2])/8,i=t[3]!=="be",s=e==="pcm-u8"?2**7:0;return{dataType:r,sampleSize:n,littleEndian:i,silentValue:s}},sm=e=>e.startsWith("avc1")||e.startsWith("avc3")?"avc":e.startsWith("hev1")||e.startsWith("hvc1")?"hevc":e==="vp8"?"vp8":e.startsWith("vp09")?"vp9":e.startsWith("av01")?"av1":e.startsWith("mp4a.40")||e==="mp4a.67"?"aac":e==="mp3"||e==="mp4a.69"||e==="mp4a.6B"||e==="mp4a.6b"?"mp3":e==="opus"?"opus":e==="vorbis"?"vorbis":e==="flac"?"flac":e==="ulaw"?"ulaw":e==="alaw"?"alaw":Qo.test(e)?e:e==="webvtt"?"webvtt":null,om=e=>e==="avc"?{avc:{format:"avc"}}:e==="hevc"?{hevc:{format:"hevc"}}:{},am=["avc1","avc3","hev1","hvc1","vp8","vp09","av01"],cm=/^(avc1|avc3)\.[0-9a-fA-F]{6}$/,um=/^(hev1|hvc1)\.(?:[ABC]?\d+)\.[0-9a-fA-F]{1,8}\.[LH]\d+(?:\.[0-9a-fA-F]{1,2}){0,6}$/,lm=/^vp09(?:\.\d{2}){3}(?:(?:\.\d{2}){5})?$/,dm=/^av01\.\d\.\d{2}[MH]\.\d{2}(?:\.\d\.\d{3}\.\d{2}\.\d{2}\.\d{2}\.\d)?$/,fm=e=>{if(!e)throw new TypeError("Video chunk metadata must be provided.");if(typeof e!="object")throw new TypeError("Video chunk metadata must be an object.");if(!e.decoderConfig)throw new TypeError("Video chunk metadata must include a decoder configuration.");if(typeof e.decoderConfig!="object")throw new TypeError("Video chunk metadata decoder configuration must be an object.");if(typeof e.decoderConfig.codec!="string")throw new TypeError("Video chunk metadata decoder configuration must specify a codec string.");if(!am.some(t=>e.decoderConfig.codec.startsWith(t)))throw new TypeError("Video chunk metadata decoder configuration codec string must be a valid video codec string as specified in the WebCodecs Codec Registry.");if(!Number.isInteger(e.decoderConfig.codedWidth)||e.decoderConfig.codedWidth<=0)throw new TypeError("Video chunk metadata decoder configuration must specify a valid codedWidth (positive integer).");if(!Number.isInteger(e.decoderConfig.codedHeight)||e.decoderConfig.codedHeight<=0)throw new TypeError("Video chunk metadata decoder configuration must specify a valid codedHeight (positive integer).");if(e.decoderConfig.description!==void 0&&!ii(e.decoderConfig.description))throw new TypeError("Video chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.");if(e.decoderConfig.colorSpace!==void 0){const{colorSpace:t}=e.decoderConfig;if(typeof t!="object")throw new TypeError("Video chunk metadata decoder configuration colorSpace, when provided, must be an object.");const r=Object.keys(ti);if(t.primaries!=null&&!r.includes(t.primaries))throw new TypeError(`Video chunk metadata decoder configuration colorSpace primaries, when defined, must be one of ${r.join(", ")}.`);const n=Object.keys(ri);if(t.transfer!=null&&!n.includes(t.transfer))throw new TypeError(`Video chunk metadata decoder configuration colorSpace transfer, when defined, must be one of ${n.join(", ")}.`);const i=Object.keys(ni);if(t.matrix!=null&&!i.includes(t.matrix))throw new TypeError(`Video chunk metadata decoder configuration colorSpace matrix, when defined, must be one of ${i.join(", ")}.`);if(t.fullRange!=null&&typeof t.fullRange!="boolean")throw new TypeError("Video chunk metadata decoder configuration colorSpace fullRange, when defined, must be a boolean.")}if(e.decoderConfig.codec.startsWith("avc1")||e.decoderConfig.codec.startsWith("avc3")){if(!cm.test(e.decoderConfig.codec))throw new TypeError("Video chunk metadata decoder configuration codec string for AVC must be a valid AVC codec string as specified in Section 3.4 of RFC 6381.")}else if(e.decoderConfig.codec.startsWith("hev1")||e.decoderConfig.codec.startsWith("hvc1")){if(!um.test(e.decoderConfig.codec))throw new TypeError("Video chunk metadata decoder configuration codec string for HEVC must be a valid HEVC codec string as specified in Section E.3 of ISO 14496-15.")}else if(e.decoderConfig.codec.startsWith("vp8")){if(e.decoderConfig.codec!=="vp8")throw new TypeError('Video chunk metadata decoder configuration codec string for VP8 must be "vp8".')}else if(e.decoderConfig.codec.startsWith("vp09")){if(!lm.test(e.decoderConfig.codec))throw new TypeError('Video chunk metadata decoder configuration codec string for VP9 must be a valid VP9 codec string as specified in Section "Codecs Parameter String" of https://www.webmproject.org/vp9/mp4/.')}else if(e.decoderConfig.codec.startsWith("av01")&&!dm.test(e.decoderConfig.codec))throw new TypeError('Video chunk metadata decoder configuration codec string for AV1 must be a valid AV1 codec string as specified in Section "Codecs Parameter String" of https://aomediacodec.github.io/av1-isobmff/.')},hm=["mp4a","mp3","opus","vorbis","flac","ulaw","alaw","pcm"],mm=e=>{if(!e)throw new TypeError("Audio chunk metadata must be provided.");if(typeof e!="object")throw new TypeError("Audio chunk metadata must be an object.");if(!e.decoderConfig)throw new TypeError("Audio chunk metadata must include a decoder configuration.");if(typeof e.decoderConfig!="object")throw new TypeError("Audio chunk metadata decoder configuration must be an object.");if(typeof e.decoderConfig.codec!="string")throw new TypeError("Audio chunk metadata decoder configuration must specify a codec string.");if(!hm.some(t=>e.decoderConfig.codec.startsWith(t)))throw new TypeError("Audio chunk metadata decoder configuration codec string must be a valid audio codec string as specified in the WebCodecs Codec Registry.");if(!Number.isInteger(e.decoderConfig.sampleRate)||e.decoderConfig.sampleRate<=0)throw new TypeError("Audio chunk metadata decoder configuration must specify a valid sampleRate (positive integer).");if(!Number.isInteger(e.decoderConfig.numberOfChannels)||e.decoderConfig.numberOfChannels<=0)throw new TypeError("Audio chunk metadata decoder configuration must specify a valid numberOfChannels (positive integer).");if(e.decoderConfig.description!==void 0&&!ii(e.decoderConfig.description))throw new TypeError("Audio chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.");if(e.decoderConfig.codec.startsWith("mp4a")&&e.decoderConfig.codec!=="mp4a.69"&&e.decoderConfig.codec!=="mp4a.6B"&&e.decoderConfig.codec!=="mp4a.6b"){if(!["mp4a.40.2","mp4a.40.02","mp4a.40.5","mp4a.40.05","mp4a.40.29","mp4a.67"].includes(e.decoderConfig.codec))throw new TypeError("Audio chunk metadata decoder configuration codec string for AAC must be a valid AAC codec string as specified in https://www.w3.org/TR/webcodecs-aac-codec-registration/.")}else if(e.decoderConfig.codec.startsWith("mp3")||e.decoderConfig.codec.startsWith("mp4a")){if(e.decoderConfig.codec!=="mp3"&&e.decoderConfig.codec!=="mp4a.69"&&e.decoderConfig.codec!=="mp4a.6B"&&e.decoderConfig.codec!=="mp4a.6b")throw new TypeError('Audio chunk metadata decoder configuration codec string for MP3 must be "mp3", "mp4a.69" or "mp4a.6B".')}else if(e.decoderConfig.codec.startsWith("opus")){if(e.decoderConfig.codec!=="opus")throw new TypeError('Audio chunk metadata decoder configuration codec string for Opus must be "opus".');if(e.decoderConfig.description&&e.decoderConfig.description.byteLength<18)throw new TypeError("Audio chunk metadata decoder configuration description, when specified, is expected to be an Identification Header as specified in Section 5.1 of RFC 7845.")}else if(e.decoderConfig.codec.startsWith("vorbis")){if(e.decoderConfig.codec!=="vorbis")throw new TypeError('Audio chunk metadata decoder configuration codec string for Vorbis must be "vorbis".');if(!e.decoderConfig.description)throw new TypeError("Audio chunk metadata decoder configuration for Vorbis must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-vorbis-codec-registration/.")}else if(e.decoderConfig.codec.startsWith("flac")){if(e.decoderConfig.codec!=="flac")throw new TypeError('Audio chunk metadata decoder configuration codec string for FLAC must be "flac".');if(!e.decoderConfig.description||e.decoderConfig.description.byteLength<42)throw new TypeError("Audio chunk metadata decoder configuration for FLAC must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-flac-codec-registration/.")}else if((e.decoderConfig.codec.startsWith("pcm")||e.decoderConfig.codec.startsWith("ulaw")||e.decoderConfig.codec.startsWith("alaw"))&&!nt.includes(e.decoderConfig.codec))throw new TypeError(`Audio chunk metadata decoder configuration codec string for PCM must be one of the supported PCM codecs (${nt.join(", ")}).`)},pm=e=>{if(!e)throw new TypeError("Subtitle metadata must be provided.");if(typeof e!="object")throw new TypeError("Subtitle metadata must be an object.");if(!e.config)throw new TypeError("Subtitle metadata must include a config object.");if(typeof e.config!="object")throw new TypeError("Subtitle metadata config must be an object.");if(typeof e.config.description!="string")throw new TypeError("Subtitle metadata config description must be a string.")};var Gt;(function(e){e[e.NON_IDR_SLICE=1]="NON_IDR_SLICE",e[e.SLICE_DPA=2]="SLICE_DPA",e[e.SLICE_DPB=3]="SLICE_DPB",e[e.SLICE_DPC=4]="SLICE_DPC",e[e.IDR=5]="IDR",e[e.SEI=6]="SEI",e[e.SPS=7]="SPS",e[e.PPS=8]="PPS",e[e.AUD=9]="AUD",e[e.SPS_EXT=13]="SPS_EXT"})(Gt||(Gt={}));var Se;(function(e){e[e.RASL_N=8]="RASL_N",e[e.RASL_R=9]="RASL_R",e[e.BLA_W_LP=16]="BLA_W_LP",e[e.RSV_IRAP_VCL23=23]="RSV_IRAP_VCL23",e[e.VPS_NUT=32]="VPS_NUT",e[e.SPS_NUT=33]="SPS_NUT",e[e.PPS_NUT=34]="PPS_NUT",e[e.AUD_NUT=35]="AUD_NUT",e[e.PREFIX_SEI_NUT=39]="PREFIX_SEI_NUT",e[e.SUFFIX_SEI_NUT=40]="SUFFIX_SEI_NUT"})(Se||(Se={}));const oi=function*(e){let t=0,r=-1;for(;t<e.length-2;){const n=e.indexOf(0,t);if(n===-1||n>=e.length-2)break;t=n;let i=0;if(t+3<e.length&&e[t+1]===0&&e[t+2]===0&&e[t+3]===1?i=4:e[t+1]===0&&e[t+2]===1&&(i=3),i===0){t++;continue}r!==-1&&t>r&&(yield{offset:r,length:t-r}),r=t+i,t=r}r!==-1&&r<e.length&&(yield{offset:r,length:e.length-r})},gm=e=>e&31,ai=e=>{const t=[],r=e.length;for(let n=0;n<r;n++)n+2<r&&e[n]===0&&e[n+1]===0&&e[n+2]===3?(t.push(0,0),n+=2):t.push(e[n]);return new Uint8Array(t)},ym=(e,t)=>{const r=e.reduce((s,o)=>s+t+o.byteLength,0),n=new Uint8Array(r);let i=0;for(const s of e){const o=new DataView(n.buffer,n.byteOffset,n.byteLength);switch(t){case 1:o.setUint8(i,s.byteLength);break;case 2:o.setUint16(i,s.byteLength,!1);break;case 3:Hh(o,i,s.byteLength);break;case 4:o.setUint32(i,s.byteLength,!1);break}i+=t,n.set(s,i),i+=s.byteLength}return n},bm=e=>{try{const t=[],r=[],n=[];for(const a of oi(e)){const c=e.subarray(a.offset,a.offset+a.length),u=gm(c[0]);u===Gt.SPS?t.push(c):u===Gt.PPS?r.push(c):u===Gt.SPS_EXT&&n.push(c)}if(t.length===0||r.length===0)return null;const i=t[0],s=vm(i);P(s!==null);const o=s.profileIdc===100||s.profileIdc===110||s.profileIdc===122||s.profileIdc===144;return{configurationVersion:1,avcProfileIndication:s.profileIdc,profileCompatibility:s.constraintFlags,avcLevelIndication:s.levelIdc,lengthSizeMinusOne:3,sequenceParameterSets:t,pictureParameterSets:r,chromaFormat:o?s.chromaFormatIdc:null,bitDepthLumaMinus8:o?s.bitDepthLumaMinus8:null,bitDepthChromaMinus8:o?s.bitDepthChromaMinus8:null,sequenceParameterSetExt:o?n:null}}catch(t){return console.error("Error building AVC Decoder Configuration Record:",t),null}},wm=e=>{const t=[];t.push(e.configurationVersion),t.push(e.avcProfileIndication),t.push(e.profileCompatibility),t.push(e.avcLevelIndication),t.push(252|e.lengthSizeMinusOne&3),t.push(224|e.sequenceParameterSets.length&31);for(const r of e.sequenceParameterSets){const n=r.byteLength;t.push(n>>8),t.push(n&255);for(let i=0;i<n;i++)t.push(r[i])}t.push(e.pictureParameterSets.length);for(const r of e.pictureParameterSets){const n=r.byteLength;t.push(n>>8),t.push(n&255);for(let i=0;i<n;i++)t.push(r[i])}if(e.avcProfileIndication===100||e.avcProfileIndication===110||e.avcProfileIndication===122||e.avcProfileIndication===144){P(e.chromaFormat!==null),P(e.bitDepthLumaMinus8!==null),P(e.bitDepthChromaMinus8!==null),P(e.sequenceParameterSetExt!==null),t.push(252|e.chromaFormat&3),t.push(248|e.bitDepthLumaMinus8&7),t.push(248|e.bitDepthChromaMinus8&7),t.push(e.sequenceParameterSetExt.length);for(const r of e.sequenceParameterSetExt){const n=r.byteLength;t.push(n>>8),t.push(n&255);for(let i=0;i<n;i++)t.push(r[i])}}return new Uint8Array(t)},vm=e=>{try{const t=new ot(ai(e));if(t.skipBits(1),t.skipBits(2),t.readBits(5)!==7)return null;const n=t.readAlignedByte(),i=t.readAlignedByte(),s=t.readAlignedByte();T(t);let o=1,a=0,c=0,u=0;if((n===100||n===110||n===122||n===244||n===44||n===83||n===86||n===118||n===128)&&(o=T(t),o===3&&(u=t.readBits(1)),a=T(t),c=T(t),t.skipBits(1),t.readBits(1))){for(let k=0;k<(o!==3?8:12);k++)if(t.readBits(1)){const ee=k<6?16:64;let L=8,D=8;for(let H=0;H<ee;H++){if(D!==0){const me=Re(t);D=(L+me+256)%256}L=D===0?L:D}}}T(t);const l=T(t);if(l===0)T(t);else if(l===1){t.skipBits(1),Re(t),Re(t);const R=T(t);for(let k=0;k<R;k++)Re(t)}T(t),t.skipBits(1);const f=T(t),h=T(t),d=16*(f+1),m=16*(h+1);let g=d,y=m;const w=t.readBits(1);if(w||t.skipBits(1),t.skipBits(1),t.readBits(1)){const R=T(t),k=T(t),q=T(t),ee=T(t);let L,D;if((u===0?o:0)===0)L=1,D=2-w;else{const me=o===3?1:2,at=o===1?2:1;L=me,D=at*(2-w)}g-=L*(R+k),y-=D*(q+ee)}let v=2,x=2,b=2,S=0,_=null,E=null;if(t.readBits(1)){t.readBits(1)&&t.readBits(8)===255&&(t.skipBits(16),t.skipBits(16)),t.readBits(1)&&t.skipBits(1),t.readBits(1)&&(t.skipBits(3),S=t.readBits(1),t.readBits(1)&&(v=t.readBits(8),x=t.readBits(8),b=t.readBits(8))),t.readBits(1)&&(T(t),T(t)),t.readBits(1)&&(t.skipBits(32),t.skipBits(32),t.skipBits(1));const D=t.readBits(1);D&&ji(t);const H=t.readBits(1);H&&ji(t),(D||H)&&t.skipBits(1),t.skipBits(1),t.readBits(1)&&(t.skipBits(1),T(t),T(t),T(t),T(t),_=T(t),E=T(t))}if(_===null){P(E===null);const R=i&16;if((n===44||n===86||n===100||n===110||n===122||n===244)&&R)_=0,E=0;else{const k=f+1,q=h+1,ee=(2-w)*q,L=Ur.find(H=>H.level>=s)??be(Ur),D=Math.min(Math.floor(L.maxDpbMbs/(k*ee)),16);_=D,E=D}}return P(E!==null),{profileIdc:n,constraintFlags:i,levelIdc:s,frameMbsOnlyFlag:w,chromaFormatIdc:o,bitDepthLumaMinus8:a,bitDepthChromaMinus8:c,codedWidth:d,codedHeight:m,displayWidth:g,displayHeight:y,colourPrimaries:v,matrixCoefficients:b,transferCharacteristics:x,fullRangeFlag:S,numReorderFrames:_,maxDecFrameBuffering:E}}catch(t){return console.error("Error parsing AVC SPS:",t),null}},ji=e=>{const t=T(e);e.skipBits(4),e.skipBits(4);for(let r=0;r<=t;r++)T(e),T(e),e.skipBits(1);e.skipBits(5),e.skipBits(5),e.skipBits(5),e.skipBits(5)},Ki=e=>e>>1&63,xm=e=>{try{const t=new ot(ai(e));t.skipBits(16),t.readBits(4);const r=t.readBits(3),n=t.readBits(1),{general_profile_space:i,general_tier_flag:s,general_profile_idc:o,general_profile_compatibility_flags:a,general_constraint_indicator_flags:c,general_level_idc:u}=Cm(t,r);T(t);const l=T(t);let f=0;l===3&&(f=t.readBits(1));const h=T(t),d=T(t);let m=h,g=d;if(t.readBits(1)){const k=T(t),q=T(t),ee=T(t),L=T(t);let D=1,H=1;const me=f===0?l:0;me===1?(D=2,H=2):me===2&&(D=2,H=1),m-=(k+q)*D,g-=(ee+L)*H}const y=T(t),w=T(t);T(t);const v=t.readBits(1)?0:r;let x=0;for(let k=v;k<=r;k++)T(t),x=T(t),T(t);T(t),T(t),T(t),T(t),T(t),T(t),t.readBits(1)&&t.readBits(1)&&Sm(t),t.skipBits(1),t.skipBits(1),t.readBits(1)&&(t.skipBits(4),t.skipBits(4),T(t),T(t),t.skipBits(1));const b=T(t);if(Tm(t,b),t.readBits(1)){const k=T(t);for(let q=0;q<k;q++)T(t),t.skipBits(1)}t.skipBits(1),t.skipBits(1);let S=2,_=2,E=2,B=0,R=0;if(t.readBits(1)){const k=Pm(t,r);S=k.colourPrimaries,_=k.transferCharacteristics,E=k.matrixCoefficients,B=k.fullRangeFlag,R=k.minSpatialSegmentationIdc}return{displayWidth:m,displayHeight:g,colourPrimaries:S,transferCharacteristics:_,matrixCoefficients:E,fullRangeFlag:B,maxDecFrameBuffering:x+1,spsMaxSubLayersMinus1:r,spsTemporalIdNestingFlag:n,generalProfileSpace:i,generalTierFlag:s,generalProfileIdc:o,generalProfileCompatibilityFlags:a,generalConstraintIndicatorFlags:c,generalLevelIdc:u,chromaFormatIdc:l,bitDepthLumaMinus8:y,bitDepthChromaMinus8:w,minSpatialSegmentationIdc:R}}catch(t){return console.error("Error parsing HEVC SPS:",t),null}},_m=e=>{try{const t=[],r=[],n=[],i=[];for(const u of oi(e)){const l=e.subarray(u.offset,u.offset+u.length),f=Ki(l[0]);f===Se.VPS_NUT?t.push(l):f===Se.SPS_NUT?r.push(l):f===Se.PPS_NUT?n.push(l):(f===Se.PREFIX_SEI_NUT||f===Se.SUFFIX_SEI_NUT)&&i.push(l)}if(r.length===0||n.length===0)return null;const s=xm(r[0]);if(!s)return null;let o=0;if(n.length>0){const u=n[0],l=new ot(ai(u));l.skipBits(16),T(l),T(l),l.skipBits(1),l.skipBits(1),l.skipBits(3),l.skipBits(1),l.skipBits(1),T(l),T(l),Re(l),l.skipBits(1),l.skipBits(1),l.readBits(1)&&T(l),Re(l),Re(l),l.skipBits(1),l.skipBits(1),l.skipBits(1),l.skipBits(1);const f=l.readBits(1),h=l.readBits(1);!f&&!h?o=0:f&&!h?o=2:!f&&h?o=3:o=0}const a=[...t.length?[{arrayCompleteness:1,nalUnitType:Se.VPS_NUT,nalUnits:t}]:[],...r.length?[{arrayCompleteness:1,nalUnitType:Se.SPS_NUT,nalUnits:r}]:[],...n.length?[{arrayCompleteness:1,nalUnitType:Se.PPS_NUT,nalUnits:n}]:[],...i.length?[{arrayCompleteness:1,nalUnitType:Ki(i[0][0]),nalUnits:i}]:[]];return{configurationVersion:1,generalProfileSpace:s.generalProfileSpace,generalTierFlag:s.generalTierFlag,generalProfileIdc:s.generalProfileIdc,generalProfileCompatibilityFlags:s.generalProfileCompatibilityFlags,generalConstraintIndicatorFlags:s.generalConstraintIndicatorFlags,generalLevelIdc:s.generalLevelIdc,minSpatialSegmentationIdc:s.minSpatialSegmentationIdc,parallelismType:o,chromaFormatIdc:s.chromaFormatIdc,bitDepthLumaMinus8:s.bitDepthLumaMinus8,bitDepthChromaMinus8:s.bitDepthChromaMinus8,avgFrameRate:0,constantFrameRate:0,numTemporalLayers:s.spsMaxSubLayersMinus1+1,temporalIdNested:s.spsTemporalIdNestingFlag,lengthSizeMinusOne:3,arrays:a}}catch(t){return console.error("Error building HEVC Decoder Configuration Record:",t),null}},Cm=(e,t)=>{const r=e.readBits(2),n=e.readBits(1),i=e.readBits(5);let s=0;for(let l=0;l<32;l++)s=s<<1|e.readBits(1);const o=new Uint8Array(6);for(let l=0;l<6;l++)o[l]=e.readBits(8);const a=e.readBits(8),c=[],u=[];for(let l=0;l<t;l++)c.push(e.readBits(1)),u.push(e.readBits(1));if(t>0)for(let l=t;l<8;l++)e.skipBits(2);for(let l=0;l<t;l++)c[l]&&e.skipBits(88),u[l]&&e.skipBits(8);return{general_profile_space:r,general_tier_flag:n,general_profile_idc:i,general_profile_compatibility_flags:s,general_constraint_indicator_flags:o,general_level_idc:a}},Sm=e=>{for(let t=0;t<4;t++)for(let r=0;r<(t===3?2:6);r++)if(!e.readBits(1))T(e);else{const i=Math.min(64,1<<4+(t<<1));t>1&&Re(e);for(let s=0;s<i;s++)Re(e)}},Tm=(e,t)=>{const r=[];for(let n=0;n<t;n++)r[n]=Em(e,n,t,r)},Em=(e,t,r,n)=>{let i=0,s=0,o=0;if(t!==0&&(s=e.readBits(1)),s){if(t===r){const c=T(e);o=t-(c+1)}else o=t-1;e.readBits(1),T(e);const a=n[o]??0;for(let c=0;c<=a;c++)e.readBits(1)||e.readBits(1);i=n[o]}else{const a=T(e),c=T(e);for(let u=0;u<a;u++)T(e),e.readBits(1);for(let u=0;u<c;u++)T(e),e.readBits(1);i=a+c}return i},Pm=(e,t)=>{let r=2,n=2,i=2,s=0,o=0;return e.readBits(1)&&e.readBits(8)===255&&(e.readBits(16),e.readBits(16)),e.readBits(1)&&e.readBits(1),e.readBits(1)&&(e.readBits(3),s=e.readBits(1),e.readBits(1)&&(r=e.readBits(8),n=e.readBits(8),i=e.readBits(8))),e.readBits(1)&&(T(e),T(e)),e.readBits(1),e.readBits(1),e.readBits(1),e.readBits(1)&&(T(e),T(e),T(e),T(e)),e.readBits(1)&&(e.readBits(32),e.readBits(32),e.readBits(1)&&T(e),e.readBits(1)&&Bm(e,!0,t)),e.readBits(1)&&(e.readBits(1),e.readBits(1),e.readBits(1),o=T(e),T(e),T(e),T(e),T(e)),{colourPrimaries:r,transferCharacteristics:n,matrixCoefficients:i,fullRangeFlag:s,minSpatialSegmentationIdc:o}},Bm=(e,t,r)=>{let n=!1,i=!1,s=!1;n=e.readBits(1)===1,i=e.readBits(1)===1,(n||i)&&(s=e.readBits(1)===1,s&&(e.readBits(8),e.readBits(5),e.readBits(1),e.readBits(5)),e.readBits(4),e.readBits(4),s&&e.readBits(4),e.readBits(5),e.readBits(5),e.readBits(5));for(let o=0;o<=r;o++){const a=e.readBits(1)===1;let c=!0;a||(c=e.readBits(1)===1);let u=!1;c?T(e):u=e.readBits(1)===1;let l=1;u||(l=T(e)+1),n&&Ji(e,l,s),i&&Ji(e,l,s)}},Ji=(e,t,r)=>{for(let n=0;n<t;n++)T(e),T(e),r&&(T(e),T(e)),e.readBits(1)},Am=e=>{const t=[];t.push(e.configurationVersion),t.push((e.generalProfileSpace&3)<<6|(e.generalTierFlag&1)<<5|e.generalProfileIdc&31),t.push(e.generalProfileCompatibilityFlags>>>24&255),t.push(e.generalProfileCompatibilityFlags>>>16&255),t.push(e.generalProfileCompatibilityFlags>>>8&255),t.push(e.generalProfileCompatibilityFlags&255),t.push(...e.generalConstraintIndicatorFlags),t.push(e.generalLevelIdc&255),t.push(240|e.minSpatialSegmentationIdc>>8&15),t.push(e.minSpatialSegmentationIdc&255),t.push(252|e.parallelismType&3),t.push(252|e.chromaFormatIdc&3),t.push(248|e.bitDepthLumaMinus8&7),t.push(248|e.bitDepthChromaMinus8&7),t.push(e.avgFrameRate>>8&255),t.push(e.avgFrameRate&255),t.push((e.constantFrameRate&3)<<6|(e.numTemporalLayers&7)<<3|(e.temporalIdNested&1)<<2|e.lengthSizeMinusOne&3),t.push(e.arrays.length&255);for(const r of e.arrays){t.push((r.arrayCompleteness&1)<<7|0|r.nalUnitType&63),t.push(r.nalUnits.length>>8&255),t.push(r.nalUnits.length&255);for(const n of r.nalUnits){t.push(n.length>>8&255),t.push(n.length&255);for(let i=0;i<n.length;i++)t.push(n[i])}}return new Uint8Array(t)},Im=e=>{const t=Do(e),r=t.getUint8(9),n=t.getUint16(10,!0),i=t.getUint32(12,!0),s=t.getInt16(16,!0),o=t.getUint8(18);let a=null;return o&&(a=e.subarray(19,21+r)),{outputChannelCount:r,preSkip:n,inputSampleRate:i,outputGain:s,channelMappingFamily:o,channelMappingTable:a}};var es;(function(e){e[e.STREAMINFO=0]="STREAMINFO",e[e.VORBIS_COMMENT=4]="VORBIS_COMMENT",e[e.PICTURE=6]="PICTURE"})(es||(es={}));const Mm=[];const ts=new Uint8Array(0);class Zt{constructor(t,r,n,i,s=-1,o,a){if(this.data=t,this.type=r,this.timestamp=n,this.duration=i,this.sequenceNumber=s,t===ts&&o===void 0)throw new Error("Internal error: byteLength must be explicitly provided when constructing metadata-only packets.");if(o===void 0&&(o=t.byteLength),!(t instanceof Uint8Array))throw new TypeError("data must be a Uint8Array.");if(r!=="key"&&r!=="delta")throw new TypeError('type must be either "key" or "delta".');if(!Number.isFinite(n))throw new TypeError("timestamp must be a number.");if(!Number.isFinite(i)||i<0)throw new TypeError("duration must be a non-negative number.");if(!Number.isFinite(s))throw new TypeError("sequenceNumber must be a number.");if(!Number.isInteger(o)||o<0)throw new TypeError("byteLength must be a non-negative integer.");if(a!==void 0&&(typeof a!="object"||!a))throw new TypeError("sideData, when provided, must be an object.");if(a?.alpha!==void 0&&!(a.alpha instanceof Uint8Array))throw new TypeError("sideData.alpha, when provided, must be a Uint8Array.");if(a?.alphaByteLength!==void 0&&(!Number.isInteger(a.alphaByteLength)||a.alphaByteLength<0))throw new TypeError("sideData.alphaByteLength, when provided, must be a non-negative integer.");this.byteLength=o,this.sideData=a??{},this.sideData.alpha&&this.sideData.alphaByteLength===void 0&&(this.sideData.alphaByteLength=this.sideData.alpha.byteLength)}get isMetadataOnly(){return this.data===ts}get microsecondTimestamp(){return Math.trunc(mt*this.timestamp)}get microsecondDuration(){return Math.trunc(mt*this.duration)}toEncodedVideoChunk(){if(this.isMetadataOnly)throw new TypeError("Metadata-only packets cannot be converted to a video chunk.");if(typeof EncodedVideoChunk>"u")throw new Error("Your browser does not support EncodedVideoChunk.");return new EncodedVideoChunk({data:this.data,type:this.type,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}alphaToEncodedVideoChunk(t=this.type){if(!this.sideData.alpha)throw new TypeError("This packet does not contain alpha side data.");if(this.isMetadataOnly)throw new TypeError("Metadata-only packets cannot be converted to a video chunk.");if(typeof EncodedVideoChunk>"u")throw new Error("Your browser does not support EncodedVideoChunk.");return new EncodedVideoChunk({data:this.sideData.alpha,type:t,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}toEncodedAudioChunk(){if(this.isMetadataOnly)throw new TypeError("Metadata-only packets cannot be converted to an audio chunk.");if(typeof EncodedAudioChunk>"u")throw new Error("Your browser does not support EncodedAudioChunk.");return new EncodedAudioChunk({data:this.data,type:this.type,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}static fromEncodedChunk(t,r){if(!(t instanceof EncodedVideoChunk||t instanceof EncodedAudioChunk))throw new TypeError("chunk must be an EncodedVideoChunk or EncodedAudioChunk.");const n=new Uint8Array(t.byteLength);return t.copyTo(n),new Zt(n,t.type,t.timestamp/1e6,(t.duration??0)/1e6,void 0,void 0,r)}clone(t){if(t!==void 0&&(typeof t!="object"||t===null))throw new TypeError("options, when provided, must be an object.");if(t?.data!==void 0&&!(t.data instanceof Uint8Array))throw new TypeError("options.data, when provided, must be a Uint8Array.");if(t?.type!==void 0&&t.type!=="key"&&t.type!=="delta")throw new TypeError('options.type, when provided, must be either "key" or "delta".');if(t?.timestamp!==void 0&&!Number.isFinite(t.timestamp))throw new TypeError("options.timestamp, when provided, must be a number.");if(t?.duration!==void 0&&!Number.isFinite(t.duration))throw new TypeError("options.duration, when provided, must be a number.");if(t?.sequenceNumber!==void 0&&!Number.isFinite(t.sequenceNumber))throw new TypeError("options.sequenceNumber, when provided, must be a number.");if(t?.sideData!==void 0&&(typeof t.sideData!="object"||t.sideData===null))throw new TypeError("options.sideData, when provided, must be an object.");return new Zt(t?.data??this.data,t?.type??this.type,t?.timestamp??this.timestamp,t?.duration??this.duration,t?.sequenceNumber??this.sequenceNumber,this.byteLength,t?.sideData??this.sideData)}}Kh();let rs=-1/0,ns=-1/0,On=null;typeof FinalizationRegistry<"u"&&(On=new FinalizationRegistry(e=>{const t=Date.now();e.type==="video"?(t-rs>=1e3&&(console.error("A VideoSample was garbage collected without first being closed. For proper resource management, make sure to call close() on all your VideoSamples as soon as you're done using them."),rs=t),typeof VideoFrame<"u"&&e.data instanceof VideoFrame&&e.data.close()):(t-ns>=1e3&&(console.error("An AudioSample was garbage collected without first being closed. For proper resource management, make sure to call close() on all your AudioSamples as soon as you're done using them."),ns=t),typeof AudioData<"u"&&e.data instanceof AudioData&&e.data.close())}));const Ho=["I420","I420P10","I420P12","I420A","I420AP10","I420AP12","I422","I422P10","I422P12","I422A","I422AP10","I422AP12","I444","I444P10","I444P12","I444A","I444AP10","I444AP12","NV12","RGBA","RGBX","BGRA","BGRX"],km=new Set(Ho);class je{get displayWidth(){return this.rotation%180===0?this.codedWidth:this.codedHeight}get displayHeight(){return this.rotation%180===0?this.codedHeight:this.codedWidth}get microsecondTimestamp(){return Math.trunc(mt*this.timestamp)}get microsecondDuration(){return Math.trunc(mt*this.duration)}get hasAlpha(){return this.format&&this.format.includes("A")}constructor(t,r){if(this._closed=!1,t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer||ArrayBuffer.isView(t)){if(!r||typeof r!="object")throw new TypeError("init must be an object.");if(r.format===void 0||!km.has(r.format))throw new TypeError("init.format must be one of: "+Ho.join(", "));if(!Number.isInteger(r.codedWidth)||r.codedWidth<=0)throw new TypeError("init.codedWidth must be a positive integer.");if(!Number.isInteger(r.codedHeight)||r.codedHeight<=0)throw new TypeError("init.codedHeight must be a positive integer.");if(r.rotation!==void 0&&![0,90,180,270].includes(r.rotation))throw new TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");if(!Number.isFinite(r.timestamp))throw new TypeError("init.timestamp must be a number.");if(r.duration!==void 0&&(!Number.isFinite(r.duration)||r.duration<0))throw new TypeError("init.duration, when provided, must be a non-negative number.");this._data=Ge(t).slice(),this._layout=r.layout??Om(r.format,r.codedWidth,r.codedHeight),this.format=r.format,this.codedWidth=r.codedWidth,this.codedHeight=r.codedHeight,this.rotation=r.rotation??0,this.timestamp=r.timestamp,this.duration=r.duration??0,this.colorSpace=new ln(r.colorSpace)}else if(typeof VideoFrame<"u"&&t instanceof VideoFrame){if(r?.rotation!==void 0&&![0,90,180,270].includes(r.rotation))throw new TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");if(r?.timestamp!==void 0&&!Number.isFinite(r?.timestamp))throw new TypeError("init.timestamp, when provided, must be a number.");if(r?.duration!==void 0&&(!Number.isFinite(r.duration)||r.duration<0))throw new TypeError("init.duration, when provided, must be a non-negative number.");this._data=t,this._layout=null,this.format=t.format,this.codedWidth=t.displayWidth,this.codedHeight=t.displayHeight,this.rotation=r?.rotation??0,this.timestamp=r?.timestamp??t.timestamp/1e6,this.duration=r?.duration??(t.duration??0)/1e6,this.colorSpace=new ln(t.colorSpace)}else if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof SVGImageElement<"u"&&t instanceof SVGImageElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap||typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof OffscreenCanvas<"u"&&t instanceof OffscreenCanvas){if(!r||typeof r!="object")throw new TypeError("init must be an object.");if(r.rotation!==void 0&&![0,90,180,270].includes(r.rotation))throw new TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");if(!Number.isFinite(r.timestamp))throw new TypeError("init.timestamp must be a number.");if(r.duration!==void 0&&(!Number.isFinite(r.duration)||r.duration<0))throw new TypeError("init.duration, when provided, must be a non-negative number.");if(typeof VideoFrame<"u")return new je(new VideoFrame(t,{timestamp:Math.trunc(r.timestamp*mt),duration:Math.trunc((r.duration??0)*mt)||void 0}),r);let n=0,i=0;if("naturalWidth"in t?(n=t.naturalWidth,i=t.naturalHeight):"videoWidth"in t?(n=t.videoWidth,i=t.videoHeight):"width"in t&&(n=Number(t.width),i=Number(t.height)),!n||!i)throw new TypeError("Could not determine dimensions.");const s=new OffscreenCanvas(n,i),o=s.getContext("2d",{alpha:Nn(),willReadFrequently:!0});P(o),o.drawImage(t,0,0),this._data=s,this._layout=null,this.format="RGBX",this.codedWidth=n,this.codedHeight=i,this.rotation=r.rotation??0,this.timestamp=r.timestamp,this.duration=r.duration??0,this.colorSpace=new ln({matrix:"rgb",primaries:"bt709",transfer:"iec61966-2-1",fullRange:!0})}else throw new TypeError("Invalid data type: Must be a BufferSource or CanvasImageSource.");On?.register(this,{type:"video",data:this._data},this)}clone(){if(this._closed)throw new Error("VideoSample is closed.");return P(this._data!==null),Ye(this._data)?new je(this._data.clone(),{timestamp:this.timestamp,duration:this.duration,rotation:this.rotation}):this._data instanceof Uint8Array?(P(this._layout),new je(this._data,{format:this.format,layout:this._layout,codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.timestamp,duration:this.duration,colorSpace:this.colorSpace,rotation:this.rotation})):new je(this._data,{format:this.format,codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.timestamp,duration:this.duration,colorSpace:this.colorSpace,rotation:this.rotation})}close(){this._closed||(On?.unregister(this),Ye(this._data)?this._data.close():this._data=null,this._closed=!0)}allocationSize(t={}){if(is(t),this._closed)throw new Error("VideoSample is closed.");if(this.format===null)throw new Error("Cannot get allocation size when format is null. Sorry!");if(P(this._data!==null),!Ye(this._data)&&(t.colorSpace||t.format&&t.format!==this.format||t.layout||t.rect)){const r=this.toVideoFrame(),n=r.allocationSize(t);return r.close(),n}return Ye(this._data)?this._data.allocationSize(t):this._data instanceof Uint8Array?this._data.byteLength:this.codedWidth*this.codedHeight*4}async copyTo(t,r={}){if(!ii(t))throw new TypeError("destination must be an ArrayBuffer or an ArrayBuffer view.");if(is(r),this._closed)throw new Error("VideoSample is closed.");if(this.format===null)throw new Error("Cannot copy video sample data when format is null. Sorry!");if(P(this._data!==null),!Ye(this._data)&&(r.colorSpace||r.format&&r.format!==this.format||r.layout||r.rect)){const n=this.toVideoFrame(),i=await n.copyTo(t,r);return n.close(),i}if(Ye(this._data))return this._data.copyTo(t,r);if(this._data instanceof Uint8Array)return P(this._layout),Ge(t).set(this._data),this._layout;{const i=this._data.getContext("2d");P(i);const s=i.getImageData(0,0,this.codedWidth,this.codedHeight);return Ge(t).set(s.data),[{offset:0,stride:4*this.codedWidth}]}}toVideoFrame(){if(this._closed)throw new Error("VideoSample is closed.");return P(this._data!==null),Ye(this._data)?new VideoFrame(this._data,{timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0}):this._data instanceof Uint8Array?new VideoFrame(this._data,{format:this.format,codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0,colorSpace:this.colorSpace}):new VideoFrame(this._data,{timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0})}draw(t,r,n,i,s,o,a,c,u){let l=0,f=0,h=this.displayWidth,d=this.displayHeight,m=0,g=0,y=this.displayWidth,w=this.displayHeight;if(o!==void 0?(l=r,f=n,h=i,d=s,m=o,g=a,c!==void 0?(y=c,w=u):(y=h,w=d)):(m=r,g=n,i!==void 0&&(y=i,w=s)),!(typeof CanvasRenderingContext2D<"u"&&t instanceof CanvasRenderingContext2D||typeof OffscreenCanvasRenderingContext2D<"u"&&t instanceof OffscreenCanvasRenderingContext2D))throw new TypeError("context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.");if(!Number.isFinite(l))throw new TypeError("sx must be a number.");if(!Number.isFinite(f))throw new TypeError("sy must be a number.");if(!Number.isFinite(h)||h<0)throw new TypeError("sWidth must be a non-negative number.");if(!Number.isFinite(d)||d<0)throw new TypeError("sHeight must be a non-negative number.");if(!Number.isFinite(m))throw new TypeError("dx must be a number.");if(!Number.isFinite(g))throw new TypeError("dy must be a number.");if(!Number.isFinite(y)||y<0)throw new TypeError("dWidth must be a non-negative number.");if(!Number.isFinite(w)||w<0)throw new TypeError("dHeight must be a non-negative number.");if(this._closed)throw new Error("VideoSample is closed.");({sx:l,sy:f,sWidth:h,sHeight:d}=this._rotateSourceRegion(l,f,h,d,this.rotation));const p=this.toCanvasImageSource();t.save();const v=m+y/2,x=g+w/2;t.translate(v,x),t.rotate(this.rotation*Math.PI/180);const b=this.rotation%180===0?1:y/w;t.scale(1/b,b),t.drawImage(p,l,f,h,d,-y/2,-w/2,y,w),t.restore()}drawWithFit(t,r){if(!(typeof CanvasRenderingContext2D<"u"&&t instanceof CanvasRenderingContext2D||typeof OffscreenCanvasRenderingContext2D<"u"&&t instanceof OffscreenCanvasRenderingContext2D))throw new TypeError("context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.");if(!r||typeof r!="object")throw new TypeError("options must be an object.");if(!["fill","contain","cover"].includes(r.fit))throw new TypeError("options.fit must be 'fill', 'contain', or 'cover'.");if(r.rotation!==void 0&&![0,90,180,270].includes(r.rotation))throw new TypeError("options.rotation, when provided, must be 0, 90, 180, or 270.");r.crop!==void 0&&Nm(r.crop,"options.");const n=t.canvas.width,i=t.canvas.height,s=r.rotation??this.rotation,[o,a]=s%180===0?[this.codedWidth,this.codedHeight]:[this.codedHeight,this.codedWidth];r.crop&&Fm(r.crop,o,a);let c,u,l,f;const{sx:h,sy:d,sWidth:m,sHeight:g}=this._rotateSourceRegion(r.crop?.left??0,r.crop?.top??0,r.crop?.width??o,r.crop?.height??a,s);if(r.fit==="fill")c=0,u=0,l=n,f=i;else{const[w,p]=r.crop?[r.crop.width,r.crop.height]:[o,a],v=r.fit==="contain"?Math.min(n/w,i/p):Math.max(n/w,i/p);l=w*v,f=p*v,c=(n-l)/2,u=(i-f)/2}t.save();const y=s%180===0?1:l/f;t.translate(n/2,i/2),t.rotate(s*Math.PI/180),t.scale(1/y,y),t.translate(-n/2,-i/2),t.drawImage(this.toCanvasImageSource(),h,d,m,g,c,u,l,f),t.restore()}_rotateSourceRegion(t,r,n,i,s){return s===90?[t,r,n,i]=[r,this.codedHeight-t-n,i,n]:s===180?[t,r]=[this.codedWidth-t-n,this.codedHeight-r-i]:s===270&&([t,r,n,i]=[this.codedWidth-r-i,t,i,n]),{sx:t,sy:r,sWidth:n,sHeight:i}}toCanvasImageSource(){if(this._closed)throw new Error("VideoSample is closed.");if(P(this._data!==null),this._data instanceof Uint8Array){const t=this.toVideoFrame();return queueMicrotask(()=>t.close()),t}else return this._data}setRotation(t){if(![0,90,180,270].includes(t))throw new TypeError("newRotation must be 0, 90, 180, or 270.");this.rotation=t}setTimestamp(t){if(!Number.isFinite(t))throw new TypeError("newTimestamp must be a number.");this.timestamp=t}setDuration(t){if(!Number.isFinite(t)||t<0)throw new TypeError("newDuration must be a non-negative number.");this.duration=t}[Symbol.dispose](){this.close()}}class ln{constructor(t){this.primaries=t?.primaries??null,this.transfer=t?.transfer??null,this.matrix=t?.matrix??null,this.fullRange=t?.fullRange??null}toJSON(){return{primaries:this.primaries,transfer:this.transfer,matrix:this.matrix,fullRange:this.fullRange}}}const Ye=e=>typeof VideoFrame<"u"&&e instanceof VideoFrame,Fm=(e,t,r)=>{e.left=Math.min(e.left,t),e.top=Math.min(e.top,r),e.width=Math.min(e.width,t-e.left),e.height=Math.min(e.height,r-e.top),P(e.width>=0),P(e.height>=0)},Nm=(e,t)=>{if(!e||typeof e!="object")throw new TypeError(t+"crop, when provided, must be an object.");if(!Number.isInteger(e.left)||e.left<0)throw new TypeError(t+"crop.left must be a non-negative integer.");if(!Number.isInteger(e.top)||e.top<0)throw new TypeError(t+"crop.top must be a non-negative integer.");if(!Number.isInteger(e.width)||e.width<0)throw new TypeError(t+"crop.width must be a non-negative integer.");if(!Number.isInteger(e.height)||e.height<0)throw new TypeError(t+"crop.height must be a non-negative integer.")},is=e=>{if(!e||typeof e!="object")throw new TypeError("options must be an object.");if(e.colorSpace!==void 0&&!["display-p3","srgb"].includes(e.colorSpace))throw new TypeError("options.colorSpace, when provided, must be 'display-p3' or 'srgb'.");if(e.format!==void 0&&typeof e.format!="string")throw new TypeError("options.format, when provided, must be a string.");if(e.layout!==void 0){if(!Array.isArray(e.layout))throw new TypeError("options.layout, when provided, must be an array.");for(const t of e.layout){if(!t||typeof t!="object")throw new TypeError("Each entry in options.layout must be an object.");if(!Number.isInteger(t.offset)||t.offset<0)throw new TypeError("plane.offset must be a non-negative integer.");if(!Number.isInteger(t.stride)||t.stride<0)throw new TypeError("plane.stride must be a non-negative integer.")}}if(e.rect!==void 0){if(!e.rect||typeof e.rect!="object")throw new TypeError("options.rect, when provided, must be an object.");if(e.rect.x!==void 0&&(!Number.isInteger(e.rect.x)||e.rect.x<0))throw new TypeError("options.rect.x, when provided, must be a non-negative integer.");if(e.rect.y!==void 0&&(!Number.isInteger(e.rect.y)||e.rect.y<0))throw new TypeError("options.rect.y, when provided, must be a non-negative integer.");if(e.rect.width!==void 0&&(!Number.isInteger(e.rect.width)||e.rect.width<0))throw new TypeError("options.rect.width, when provided, must be a non-negative integer.");if(e.rect.height!==void 0&&(!Number.isInteger(e.rect.height)||e.rect.height<0))throw new TypeError("options.rect.height, when provided, must be a non-negative integer.")}},Om=(e,t,r)=>{const n=Rm(e),i=[];let s=0;for(const o of n){const a=Math.ceil(t/o.widthDivisor),c=Math.ceil(r/o.heightDivisor),u=a*o.sampleBytes,l=u*c;i.push({offset:s,stride:u}),s+=l}return i},Rm=e=>{const t=(r,n,i,s,o)=>{const a=[{sampleBytes:r,widthDivisor:1,heightDivisor:1},{sampleBytes:n,widthDivisor:i,heightDivisor:s},{sampleBytes:n,widthDivisor:i,heightDivisor:s}];return o&&a.push({sampleBytes:r,widthDivisor:1,heightDivisor:1}),a};switch(e){case"I420":return t(1,1,2,2,!1);case"I420P10":case"I420P12":return t(2,2,2,2,!1);case"I420A":return t(1,1,2,2,!0);case"I420AP10":case"I420AP12":return t(2,2,2,2,!0);case"I422":return t(1,1,2,1,!1);case"I422P10":case"I422P12":return t(2,2,2,1,!1);case"I422A":return t(1,1,2,1,!0);case"I422AP10":case"I422AP12":return t(2,2,2,1,!0);case"I444":return t(1,1,1,1,!1);case"I444P10":case"I444P12":return t(2,2,1,1,!1);case"I444A":return t(1,1,1,1,!0);case"I444AP10":case"I444AP12":return t(2,2,1,1,!0);case"NV12":return[{sampleBytes:1,widthDivisor:1,heightDivisor:1},{sampleBytes:2,widthDivisor:2,heightDivisor:2}];case"RGBA":case"RGBX":case"BGRA":case"BGRX":return[{sampleBytes:4,widthDivisor:1,heightDivisor:1}];default:si(e),P(!1)}};const zm=e=>{let r=(e.hasVideo?"video/":e.hasAudio?"audio/":"application/")+(e.isQuickTime?"quicktime":"mp4");if(e.codecStrings.length>0){const n=[...new Set(e.codecStrings)];r+=`; codecs="${n.join(", ")}"`}return r};const dn=8,ss=16;const Dm=7,Lm=9,os=e=>{const t=e.filePos,r=Vm(e,9),n=new ot(r);if(n.readBits(12)!==4095||(n.skipBits(1),n.readBits(2)!==0))return null;const o=n.readBits(1),a=n.readBits(2)+1,c=n.readBits(4);if(c===15)return null;n.skipBits(1);const u=n.readBits(3);if(u===0)throw new Error("ADTS frames with channel configuration 0 are not supported.");n.skipBits(1),n.skipBits(1),n.skipBits(1),n.skipBits(1);const l=n.readBits(13);n.skipBits(11);const f=n.readBits(2)+1;if(f!==1)throw new Error("ADTS frames with more than one AAC frame are not supported.");let h=null;return o===1?e.filePos-=2:h=n.readBits(16),{objectType:a,samplingFrequencyIndex:c,channelConfiguration:u,frameLength:l,numberOfAacFrames:f,crcCheck:h,startPos:t}};class jt{constructor(t,r,n,i,s){this.bytes=t,this.view=r,this.offset=n,this.start=i,this.end=s,this.bufferPos=i-n}static tempFromBytes(t){return new jt(t,Do(t),0,0,t.length)}get length(){return this.end-this.start}get filePos(){return this.offset+this.bufferPos}set filePos(t){this.bufferPos=t-this.offset}get remainingLength(){return Math.max(this.end-this.filePos,0)}skip(t){this.bufferPos+=t}slice(t,r=this.end-t){if(t<this.start||t+r>this.end)throw new RangeError("Slicing outside of original slice.");return new jt(this.bytes,this.view,this.offset,t,t+r)}}const Um=(e,t)=>{if(e.filePos<e.start||e.filePos+t>e.end)throw new RangeError(`Tried reading [${e.filePos}, ${e.filePos+t}), but slice is [${e.start}, ${e.end}). This is likely an internal error, please report it alongside the file that caused it.`)},Vm=(e,t)=>{Um(e,t);const r=e.bytes.subarray(e.bufferPos,e.bufferPos+t);return e.bufferPos+=t,r};class Gm{constructor(t){this.mutex=new Lo,this.firstMediaStreamTimestamp=null,this.trackTimestampInfo=new WeakMap,this.output=t}onTrackClose(t){}validateAndNormalizeTimestamp(t,r,n){r+=t.source._timestampOffset;let i=this.trackTimestampInfo.get(t);if(!i){if(!n)throw new Error("First packet must be a key packet.");i={maxTimestamp:r,maxTimestampBeforeLastKeyPacket:r},this.trackTimestampInfo.set(t,i)}if(r<0)throw new Error(`Timestamps must be non-negative (got ${r}s).`);if(n&&(i.maxTimestampBeforeLastKeyPacket=i.maxTimestamp),r<i.maxTimestampBeforeLastKeyPacket)throw new Error(`Timestamps cannot be smaller than the largest timestamp of the previous GOP (a GOP begins with a key packet and ends right before the next key packet). Got ${r}s, but largest timestamp is ${i.maxTimestampBeforeLastKeyPacket}s.`);return i.maxTimestamp=Math.max(i.maxTimestamp,r),r}}const as=/<(?:(\d{2}):)?(\d{2}):(\d{2}).(\d{3})>/g,$m=e=>{const t=Math.floor(e/36e5),r=Math.floor(e%(3600*1e3)/(60*1e3)),n=Math.floor(e%(60*1e3)/1e3),i=e%1e3;return t.toString().padStart(2,"0")+":"+r.toString().padStart(2,"0")+":"+n.toString().padStart(2,"0")+"."+i.toString().padStart(3,"0")};class cs{constructor(t){this.writer=t,this.helper=new Uint8Array(8),this.helperView=new DataView(this.helper.buffer),this.offsets=new WeakMap}writeU32(t){this.helperView.setUint32(0,t,!1),this.writer.write(this.helper.subarray(0,4))}writeU64(t){this.helperView.setUint32(0,Math.floor(t/2**32),!1),this.helperView.setUint32(4,t,!1),this.writer.write(this.helper.subarray(0,8))}writeAscii(t){for(let r=0;r<t.length;r++)this.helperView.setUint8(r%8,t.charCodeAt(r)),r%8===7&&this.writer.write(this.helper);t.length%8!==0&&this.writer.write(this.helper.subarray(0,t.length%8))}writeBox(t){if(this.offsets.set(t,this.writer.getPos()),t.contents&&!t.children)this.writeBoxHeader(t,t.size??t.contents.byteLength+8),this.writer.write(t.contents);else{const r=this.writer.getPos();if(this.writeBoxHeader(t,0),t.contents&&this.writer.write(t.contents),t.children)for(const s of t.children)s&&this.writeBox(s);const n=this.writer.getPos(),i=t.size??n-r;this.writer.seek(r),this.writeBoxHeader(t,i),this.writer.seek(n)}}writeBoxHeader(t,r){this.writeU32(t.largeSize?1:r),this.writeAscii(t.type),t.largeSize&&this.writeU64(r)}measureBoxHeader(t){return 8+(t.largeSize?8:0)}patchBox(t){const r=this.offsets.get(t);P(r!==void 0);const n=this.writer.getPos();this.writer.seek(r),this.writeBox(t),this.writer.seek(n)}measureBox(t){if(t.contents&&!t.children)return this.measureBoxHeader(t)+t.contents.byteLength;{let r=this.measureBoxHeader(t);if(t.contents&&(r+=t.contents.byteLength),t.children)for(const n of t.children)n&&(r+=this.measureBox(n));return r}}}const V=new Uint8Array(8),Ae=new DataView(V.buffer),Z=e=>[(e%256+256)%256],M=e=>(Ae.setUint16(0,e,!1),[V[0],V[1]]),Xo=e=>(Ae.setInt16(0,e,!1),[V[0],V[1]]),Yo=e=>(Ae.setUint32(0,e,!1),[V[1],V[2],V[3]]),C=e=>(Ae.setUint32(0,e,!1),[V[0],V[1],V[2],V[3]]),Le=e=>(Ae.setInt32(0,e,!1),[V[0],V[1],V[2],V[3]]),it=e=>(Ae.setUint32(0,Math.floor(e/2**32),!1),Ae.setUint32(4,e,!1),[V[0],V[1],V[2],V[3],V[4],V[5],V[6],V[7]]),qo=e=>(Ae.setInt16(0,2**8*e,!1),[V[0],V[1]]),Fe=e=>(Ae.setInt32(0,2**16*e,!1),[V[0],V[1],V[2],V[3]]),fn=e=>(Ae.setInt32(0,2**30*e,!1),[V[0],V[1],V[2],V[3]]),hn=(e,t)=>{const r=[];let n=e;do{let i=n&127;n>>=7,r.length>0&&(i|=128),r.push(i)}while(n>0||t);return r.reverse()},re=(e,t=!1)=>{const r=Array(e.length).fill(null).map((n,i)=>e.charCodeAt(i));return t&&r.push(0),r},ci=e=>{let t=null;for(const r of e)(!t||r.timestamp>t.timestamp)&&(t=r);return t},Zo=e=>{const t=e*(Math.PI/180),r=Math.round(Math.cos(t)),n=Math.round(Math.sin(t));return[r,n,0,-n,r,0,0,0,1]},jo=Zo(0),Ko=e=>[Fe(e[0]),Fe(e[1]),fn(e[2]),Fe(e[3]),Fe(e[4]),fn(e[5]),Fe(e[6]),Fe(e[7]),fn(e[8])],F=(e,t,r)=>({type:e,contents:t&&new Uint8Array(t.flat(10)),children:r}),G=(e,t,r,n,i)=>F(e,[Z(t),Yo(r),n??[]],i),Wm=e=>e.isQuickTime?F("ftyp",[re("qt  "),C(512),re("qt  ")]):e.fragmented?F("ftyp",[re("iso5"),C(512),re("iso5"),re("iso6"),re("mp41")]):F("ftyp",[re("isom"),C(512),re("isom"),e.holdsAvc?re("avc1"):[],re("mp41")]),mr=e=>({type:"mdat",largeSize:e}),Qm=e=>({type:"free",size:e}),At=e=>F("moov",void 0,[Hm(e.creationTime,e.trackDatas),...e.trackDatas.map(t=>Xm(t,e.creationTime)),e.isFragmented?Bp(e.trackDatas):null,Vp(e)]),Hm=(e,t)=>{const r=te(Math.max(0,...t.filter(o=>o.samples.length>0).map(o=>{const a=ci(o.samples);return a.timestamp+a.duration})),Rn),n=Math.max(0,...t.map(o=>o.track.id))+1,i=!Et(e)||!Et(r),s=i?it:C;return G("mvhd",+i,0,[s(e),s(e),C(Rn),s(r),Fe(1),qo(1),Array(10).fill(0),Ko(jo),Array(24).fill(0),C(n)])},Xm=(e,t)=>{const r=Kp(e);return F("trak",void 0,[Ym(e,t),qm(e,t),r.name!==void 0?F("udta",void 0,[F("name",[...Ee.encode(r.name)])]):null])},Ym=(e,t)=>{const r=ci(e.samples),n=te(r?r.timestamp+r.duration:0,Rn),i=!Et(t)||!Et(n),s=i?it:C;let o;if(e.type==="video"){const c=e.track.metadata.rotation;o=Zo(c??0)}else o=jo;let a=2;return e.track.metadata.disposition?.default!==!1&&(a|=1),G("tkhd",+i,a,[s(t),s(t),C(e.track.id),C(0),s(n),Array(8).fill(0),M(0),M(e.track.id),qo(e.type==="audio"?1:0),M(0),Ko(o),Fe(e.type==="video"?e.info.width:0),Fe(e.type==="video"?e.info.height:0)])},qm=(e,t)=>F("mdia",void 0,[Zm(e,t),ui(!0,jm[e.type],Km[e.type]),Jm(e)]),Zm=(e,t)=>{const r=ci(e.samples),n=te(r?r.timestamp+r.duration:0,e.timescale),i=!Et(t)||!Et(n),s=i?it:C;return G("mdhd",+i,0,[s(t),s(t),C(e.timescale),s(n),M(ra(e.track.metadata.languageCode??Xh)),M(0)])},jm={video:"vide",audio:"soun",subtitle:"text"},Km={video:"MediabunnyVideoHandler",audio:"MediabunnySoundHandler",subtitle:"MediabunnyTextHandler"},ui=(e,t,r,n="\0\0\0\0")=>G("hdlr",0,0,[e?re("mhlr"):C(0),re(t),re(n),C(0),C(0),re(r,!0)]),Jm=e=>F("minf",void 0,[np[e.type](),ip(),ap(e)]),ep=()=>G("vmhd",0,1,[M(0),M(0),M(0),M(0)]),tp=()=>G("smhd",0,0,[M(0),M(0)]),rp=()=>G("nmhd",0,0),np={video:ep,audio:tp,subtitle:rp},ip=()=>F("dinf",void 0,[sp()]),sp=()=>G("dref",0,0,[C(1)],[op()]),op=()=>G("url ",0,1),ap=e=>{const t=e.compositionTimeOffsetTable.length>1||e.compositionTimeOffsetTable.some(r=>r.sampleCompositionTimeOffset!==0);return F("stbl",void 0,[cp(e),xp(e),t?Ep(e):null,t?Pp(e):null,Cp(e),Sp(e),Tp(e),_p(e)])},cp=e=>{let t;if(e.type==="video")t=up(Qp(e.track.source._codec,e.info.decoderConfig.codec),e);else if(e.type==="audio"){const r=ta(e.track.source._codec,e.muxer.isQuickTime);P(r),t=mp(r,e)}else e.type==="subtitle"&&(t=wp(Yp[e.track.source._codec],e));return P(t),G("stsd",0,0,[C(1)],[t])},up=(e,t)=>F(e,[Array(6).fill(0),M(1),M(0),M(0),Array(12).fill(0),M(t.info.width),M(t.info.height),C(4718592),C(4718592),C(0),M(1),Array(32).fill(0),M(24),Xo(65535)],[Hp[t.track.source._codec](t),Wh(t.info.decoderConfig.colorSpace)?lp(t):null]),lp=e=>F("colr",[re("nclx"),M(ti[e.info.decoderConfig.colorSpace.primaries]),M(ri[e.info.decoderConfig.colorSpace.transfer]),M(ni[e.info.decoderConfig.colorSpace.matrix]),Z((e.info.decoderConfig.colorSpace.fullRange?1:0)<<7)]),dp=e=>e.info.decoderConfig&&F("avcC",[...Ge(e.info.decoderConfig.description)]),fp=e=>e.info.decoderConfig&&F("hvcC",[...Ge(e.info.decoderConfig.description)]),us=e=>{if(!e.info.decoderConfig)return null;const t=e.info.decoderConfig,r=t.codec.split("."),n=Number(r[1]),i=Number(r[2]),s=Number(r[3]),o=r[4]?Number(r[4]):1,a=r[8]?Number(r[8]):Number(t.colorSpace?.fullRange??0),c=(s<<4)+(o<<1)+a,u=r[5]?Number(r[5]):t.colorSpace?.primaries?ti[t.colorSpace.primaries]:2,l=r[6]?Number(r[6]):t.colorSpace?.transfer?ri[t.colorSpace.transfer]:2,f=r[7]?Number(r[7]):t.colorSpace?.matrix?ni[t.colorSpace.matrix]:2;return G("vpcC",1,0,[Z(n),Z(i),Z(c),Z(u),Z(l),Z(f),M(0)])},hp=e=>F("av1C",nm(e.info.decoderConfig.codec)),mp=(e,t)=>{let r=0,n,i=16;if(nt.includes(t.track.source._codec)){const s=t.track.source._codec,{sampleSize:o}=nr(s);i=8*o,i>16&&(r=1)}return r===0?n=[Array(6).fill(0),M(1),M(r),M(0),C(0),M(t.info.numberOfChannels),M(i),M(0),M(0),M(t.info.sampleRate<2**16?t.info.sampleRate:0),M(0)]:n=[Array(6).fill(0),M(1),M(r),M(0),C(0),M(t.info.numberOfChannels),M(Math.min(i,16)),M(0),M(0),M(t.info.sampleRate<2**16?t.info.sampleRate:0),M(0),C(1),C(i/8),C(t.info.numberOfChannels*i/8),C(2)],F(e,n,[Xp(t.track.source._codec,t.muxer.isQuickTime)?.(t)??null])},mn=e=>{let t;switch(e.track.source._codec){case"aac":t=64;break;case"mp3":t=107;break;case"vorbis":t=221;break;default:throw new Error(`Unhandled audio codec: ${e.track.source._codec}`)}let r=[...Z(t),...Z(21),...Yo(0),...C(0),...C(0)];if(e.info.decoderConfig.description){const n=Ge(e.info.decoderConfig.description);r=[...r,...Z(5),...hn(n.byteLength),...n]}return r=[...M(1),...Z(0),...Z(4),...hn(r.length),...r,...Z(6),...Z(1),...Z(2)],r=[...Z(3),...hn(r.length),...r],G("esds",0,0,r)},ze=e=>F("wave",void 0,[pp(e),gp(e),F("\0\0\0\0")]),pp=e=>F("frma",[re(ta(e.track.source._codec,e.muxer.isQuickTime))]),gp=e=>{const{littleEndian:t}=nr(e.track.source._codec);return F("enda",[M(+t)])},yp=e=>{let t=e.info.numberOfChannels,r=3840,n=e.info.sampleRate,i=0,s=0,o=new Uint8Array(0);const a=e.info.decoderConfig?.description;if(a){P(a.byteLength>=18);const c=Ge(a),u=Im(c);t=u.outputChannelCount,r=u.preSkip,n=u.inputSampleRate,i=u.outputGain,s=u.channelMappingFamily,u.channelMappingTable&&(o=u.channelMappingTable)}return F("dOps",[Z(0),Z(t),M(r),C(n),Xo(i),Z(s),...o])},bp=e=>{const t=e.info.decoderConfig?.description;P(t);const r=Ge(t);return G("dfLa",0,0,[...r.subarray(4)])},_e=e=>{const{littleEndian:t,sampleSize:r}=nr(e.track.source._codec),n=+t;return G("pcmC",0,0,[Z(n),Z(8*r)])},wp=(e,t)=>F(e,[Array(6).fill(0),M(1)],[qp[t.track.source._codec](t)]),vp=e=>F("vttC",[...Ee.encode(e.info.config.description)]),xp=e=>G("stts",0,0,[C(e.timeToSampleTable.length),e.timeToSampleTable.map(t=>[C(t.sampleCount),C(t.sampleDelta)])]),_p=e=>{if(e.samples.every(r=>r.type==="key"))return null;const t=[...e.samples.entries()].filter(([,r])=>r.type==="key");return G("stss",0,0,[C(t.length),t.map(([r])=>C(r+1))])},Cp=e=>G("stsc",0,0,[C(e.compactlyCodedChunkTable.length),e.compactlyCodedChunkTable.map(t=>[C(t.firstChunk),C(t.samplesPerChunk),C(1)])]),Sp=e=>{if(e.type==="audio"&&e.info.requiresPcmTransformation){const{sampleSize:t}=nr(e.track.source._codec);return G("stsz",0,0,[C(t*e.info.numberOfChannels),C(e.samples.reduce((r,n)=>r+te(n.duration,e.timescale),0))])}return G("stsz",0,0,[C(0),C(e.samples.length),e.samples.map(t=>C(t.size))])},Tp=e=>e.finalizedChunks.length>0&&be(e.finalizedChunks).offset>=2**32?G("co64",0,0,[C(e.finalizedChunks.length),e.finalizedChunks.map(t=>it(t.offset))]):G("stco",0,0,[C(e.finalizedChunks.length),e.finalizedChunks.map(t=>C(t.offset))]),Ep=e=>G("ctts",1,0,[C(e.compositionTimeOffsetTable.length),e.compositionTimeOffsetTable.map(t=>[C(t.sampleCount),Le(t.sampleCompositionTimeOffset)])]),Pp=e=>{let t=1/0,r=-1/0,n=1/0,i=-1/0;P(e.compositionTimeOffsetTable.length>0),P(e.samples.length>0);for(let o=0;o<e.compositionTimeOffsetTable.length;o++){const a=e.compositionTimeOffsetTable[o];t=Math.min(t,a.sampleCompositionTimeOffset),r=Math.max(r,a.sampleCompositionTimeOffset)}for(let o=0;o<e.samples.length;o++){const a=e.samples[o];n=Math.min(n,te(a.timestamp,e.timescale)),i=Math.max(i,te(a.timestamp+a.duration,e.timescale))}const s=Math.max(-t,0);return i>=2**31?null:G("cslg",0,0,[Le(s),Le(t),Le(r),Le(n),Le(i)])},Bp=e=>F("mvex",void 0,e.map(Ap)),Ap=e=>G("trex",0,0,[C(e.track.id),C(1),C(0),C(0),C(0)]),ls=(e,t)=>F("moof",void 0,[Ip(e),...t.map(Mp)]),Ip=e=>G("mfhd",0,0,[C(e)]),Jo=e=>{let t=0,r=0;const n=0,i=0,s=e.type==="delta";return r|=+s,s?t|=1:t|=2,t<<24|r<<16|n<<8|i},Mp=e=>F("traf",void 0,[kp(e),Fp(e),Np(e)]),kp=e=>{P(e.currentChunk);let t=0;t|=8,t|=16,t|=32,t|=131072;const r=e.currentChunk.samples[1]??e.currentChunk.samples[0],n={duration:r.timescaleUnitsToNextSample,size:r.size,flags:Jo(r)};return G("tfhd",0,t,[C(e.track.id),C(n.duration),C(n.size),C(n.flags)])},Fp=e=>(P(e.currentChunk),G("tfdt",1,0,[it(te(e.currentChunk.startTimestamp,e.timescale))])),Np=e=>{P(e.currentChunk);const t=e.currentChunk.samples.map(g=>g.timescaleUnitsToNextSample),r=e.currentChunk.samples.map(g=>g.size),n=e.currentChunk.samples.map(Jo),i=e.currentChunk.samples.map(g=>te(g.timestamp-g.decodeTimestamp,e.timescale)),s=new Set(t),o=new Set(r),a=new Set(n),c=new Set(i),u=a.size===2&&n[0]!==n[1],l=s.size>1,f=o.size>1,h=!u&&a.size>1,d=c.size>1||[...c].some(g=>g!==0);let m=0;return m|=1,m|=4*+u,m|=256*+l,m|=512*+f,m|=1024*+h,m|=2048*+d,G("trun",1,m,[C(e.currentChunk.samples.length),C(e.currentChunk.offset-e.currentChunk.moofOffset||0),u?C(n[0]):[],e.currentChunk.samples.map((g,y)=>[l?C(t[y]):[],f?C(r[y]):[],h?C(n[y]):[],d?Le(i[y]):[]])])},Op=e=>F("mfra",void 0,[...e.map(Rp),zp()]),Rp=(e,t)=>G("tfra",1,0,[C(e.track.id),C(63),C(e.finalizedChunks.length),e.finalizedChunks.map(n=>[it(te(n.samples[0].timestamp,e.timescale)),it(n.moofOffset),C(t+1),C(1),C(1)])]),zp=()=>G("mfro",0,0,[C(0)]),Dp=()=>F("vtte"),Lp=(e,t,r,n,i)=>F("vttc",void 0,[i!==null?F("vsid",[Le(i)]):null,r!==null?F("iden",[...Ee.encode(r)]):null,t!==null?F("ctim",[...Ee.encode($m(t))]):null,n!==null?F("sttg",[...Ee.encode(n)]):null,F("payl",[...Ee.encode(e)])]),Up=e=>F("vtta",[...Ee.encode(e)]),Vp=e=>{const t=[],r=e.format._options.metadataFormat??"auto",n=e.output._metadataTags;if(r==="mdir"||r==="auto"&&!e.isQuickTime){const i=$p(n);i&&t.push(i)}else if(r==="mdta"){const i=Wp(n);i&&t.push(i)}else(r==="udta"||r==="auto"&&e.isQuickTime)&&Gp(t,e.output._metadataTags);return t.length===0?null:F("udta",void 0,t)},Gp=(e,t)=>{for(const{key:r,value:n}of Uo(t))switch(r){case"title":e.push(Ce("©nam",n));break;case"description":e.push(Ce("©des",n));break;case"artist":e.push(Ce("©ART",n));break;case"album":e.push(Ce("©alb",n));break;case"albumArtist":e.push(Ce("albr",n));break;case"genre":e.push(Ce("©gen",n));break;case"date":e.push(Ce("©day",n.toISOString().slice(0,10)));break;case"comment":e.push(Ce("©cmt",n));break;case"lyrics":e.push(Ce("©lyr",n));break;case"raw":break;case"discNumber":case"discsTotal":case"trackNumber":case"tracksTotal":case"images":break;default:si(r)}if(t.raw)for(const r in t.raw){const n=t.raw[r];n==null||r.length!==4||e.some(i=>i.type===r)||(typeof n=="string"?e.push(Ce(r,n)):n instanceof Uint8Array&&e.push(F(r,Array.from(n))))}},Ce=(e,t)=>{const r=Ee.encode(t);return F(e,[M(r.length),M(ra("und")),Array.from(r)])},ds={"image/jpeg":13,"image/png":14,"image/bmp":27},ea=(e,t)=>{const r=[];for(const{key:n,value:i}of Uo(e))switch(n){case"title":r.push({key:t?"title":"©nam",value:pe(i)});break;case"description":r.push({key:t?"description":"©des",value:pe(i)});break;case"artist":r.push({key:t?"artist":"©ART",value:pe(i)});break;case"album":r.push({key:t?"album":"©alb",value:pe(i)});break;case"albumArtist":r.push({key:t?"album_artist":"aART",value:pe(i)});break;case"comment":r.push({key:t?"comment":"©cmt",value:pe(i)});break;case"genre":r.push({key:t?"genre":"©gen",value:pe(i)});break;case"lyrics":r.push({key:t?"lyrics":"©lyr",value:pe(i)});break;case"date":r.push({key:t?"date":"©day",value:pe(i.toISOString().slice(0,10))});break;case"images":for(const s of i)s.kind==="coverFront"&&r.push({key:"covr",value:F("data",[C(ds[s.mimeType]??0),C(0),Array.from(s.data)])});break;case"trackNumber":if(t){const s=e.tracksTotal!==void 0?`${i}/${e.tracksTotal}`:i.toString();r.push({key:"track",value:pe(s)})}else r.push({key:"trkn",value:F("data",[C(0),C(0),M(0),M(i),M(e.tracksTotal??0),M(0)])});break;case"discNumber":t||r.push({key:"disc",value:F("data",[C(0),C(0),M(0),M(i),M(e.discsTotal??0),M(0)])});break;case"tracksTotal":case"discsTotal":break;case"raw":break;default:si(n)}if(e.raw)for(const n in e.raw){const i=e.raw[n];i==null||!t&&n.length!==4||r.some(s=>s.key===n)||(typeof i=="string"?r.push({key:n,value:pe(i)}):i instanceof Uint8Array?r.push({key:n,value:F("data",[C(0),C(0),Array.from(i)])}):i instanceof Vo&&r.push({key:n,value:F("data",[C(ds[i.mimeType]??0),C(0),Array.from(i.data)])}))}return r},$p=e=>{const t=ea(e,!1);return t.length===0?null:G("meta",0,0,void 0,[ui(!1,"mdir","","appl"),F("ilst",void 0,t.map(r=>F(r.key,void 0,[r.value])))])},Wp=e=>{const t=ea(e,!0);return t.length===0?null:F("meta",void 0,[ui(!1,"mdta",""),G("keys",0,0,[C(t.length)],t.map(r=>F("mdta",[...Ee.encode(r.key)]))),F("ilst",void 0,t.map((r,n)=>{const i=String.fromCharCode(...C(n+1));return F(i,void 0,[r.value])}))])},pe=e=>F("data",[C(1),C(0),...Ee.encode(e)]),Qp=(e,t)=>{switch(e){case"avc":return t.startsWith("avc3")?"avc3":"avc1";case"hevc":return"hvc1";case"vp8":return"vp08";case"vp9":return"vp09";case"av1":return"av01"}},Hp={avc:dp,hevc:fp,vp8:us,vp9:us,av1:hp},ta=(e,t)=>{switch(e){case"aac":return"mp4a";case"mp3":return"mp4a";case"opus":return"Opus";case"vorbis":return"mp4a";case"flac":return"fLaC";case"ulaw":return"ulaw";case"alaw":return"alaw";case"pcm-u8":return"raw ";case"pcm-s8":return"sowt"}if(t)switch(e){case"pcm-s16":return"sowt";case"pcm-s16be":return"twos";case"pcm-s24":return"in24";case"pcm-s24be":return"in24";case"pcm-s32":return"in32";case"pcm-s32be":return"in32";case"pcm-f32":return"fl32";case"pcm-f32be":return"fl32";case"pcm-f64":return"fl64";case"pcm-f64be":return"fl64"}else switch(e){case"pcm-s16":return"ipcm";case"pcm-s16be":return"ipcm";case"pcm-s24":return"ipcm";case"pcm-s24be":return"ipcm";case"pcm-s32":return"ipcm";case"pcm-s32be":return"ipcm";case"pcm-f32":return"fpcm";case"pcm-f32be":return"fpcm";case"pcm-f64":return"fpcm";case"pcm-f64be":return"fpcm"}},Xp=(e,t)=>{switch(e){case"aac":return mn;case"mp3":return mn;case"opus":return yp;case"vorbis":return mn;case"flac":return bp}if(t)switch(e){case"pcm-s24":return ze;case"pcm-s24be":return ze;case"pcm-s32":return ze;case"pcm-s32be":return ze;case"pcm-f32":return ze;case"pcm-f32be":return ze;case"pcm-f64":return ze;case"pcm-f64be":return ze}else switch(e){case"pcm-s16":return _e;case"pcm-s16be":return _e;case"pcm-s24":return _e;case"pcm-s24be":return _e;case"pcm-s32":return _e;case"pcm-s32be":return _e;case"pcm-f32":return _e;case"pcm-f32be":return _e;case"pcm-f64":return _e;case"pcm-f64be":return _e}return null},Yp={webvtt:"wvtt"},qp={webvtt:vp},ra=e=>{P(e.length===3);let t=0;for(let r=0;r<3;r++)t<<=5,t+=e.charCodeAt(r)-96;return t};class Zp{constructor(){this.ensureMonotonicity=!1,this.trackedWrites=null,this.trackedStart=-1,this.trackedEnd=-1}start(){}maybeTrackWrites(t){if(!this.trackedWrites)return;let r=this.getPos();if(r<this.trackedStart){if(r+t.byteLength<=this.trackedStart)return;t=t.subarray(this.trackedStart-r),r=0}const n=r+t.byteLength-this.trackedStart;let i=this.trackedWrites.byteLength;for(;i<n;)i*=2;if(i!==this.trackedWrites.byteLength){const s=new Uint8Array(i);s.set(this.trackedWrites,0),this.trackedWrites=s}this.trackedWrites.set(t,r-this.trackedStart),this.trackedEnd=Math.max(this.trackedEnd,r+t.byteLength)}startTrackingWrites(){this.trackedWrites=new Uint8Array(2**10),this.trackedStart=this.getPos(),this.trackedEnd=this.trackedStart}stopTrackingWrites(){if(!this.trackedWrites)throw new Error("Internal error: Can't get tracked writes since nothing was tracked.");const r={data:this.trackedWrites.subarray(0,this.trackedEnd-this.trackedStart),start:this.trackedStart,end:this.trackedEnd};return this.trackedWrites=null,r}}const pn=2**16,gn=2**32;class na extends Zp{constructor(t){if(super(),this.pos=0,this.maxPos=0,this.target=t,this.supportsResize="resize"in new ArrayBuffer(0),this.supportsResize)try{this.buffer=new ArrayBuffer(pn,{maxByteLength:gn})}catch{this.buffer=new ArrayBuffer(pn),this.supportsResize=!1}else this.buffer=new ArrayBuffer(pn);this.bytes=new Uint8Array(this.buffer)}ensureSize(t){let r=this.buffer.byteLength;for(;r<t;)r*=2;if(r!==this.buffer.byteLength){if(r>gn)throw new Error(`ArrayBuffer exceeded maximum size of ${gn} bytes. Please consider using another target.`);if(this.supportsResize)this.buffer.resize(r);else{const n=new ArrayBuffer(r),i=new Uint8Array(n);i.set(this.bytes,0),this.buffer=n,this.bytes=i}}}write(t){this.maybeTrackWrites(t),this.ensureSize(this.pos+t.byteLength),this.bytes.set(t,this.pos),this.target.onwrite?.(this.pos,this.pos+t.byteLength),this.pos+=t.byteLength,this.maxPos=Math.max(this.maxPos,this.pos)}seek(t){this.pos=t}getPos(){return this.pos}async flush(){}async finalize(){this.ensureSize(this.pos),this.target.buffer=this.buffer.slice(0,Math.max(this.maxPos,this.pos))}async close(){}getSlice(t,r){return this.bytes.slice(t,r)}}class ia{constructor(){this._output=null,this.onwrite=null}}class sa extends ia{constructor(){super(...arguments),this.buffer=null}_createWriter(){return new na(this)}}const Rn=1e3,jp=2082844800,Kp=e=>{const t={},r=e.track;return r.metadata.name!==void 0&&(t.name=r.metadata.name),t},te=(e,t,r=!0)=>{const n=e*t;return r?Math.round(n):n};class Jp extends Gm{constructor(t,r){super(t),this.auxTarget=new sa,this.auxWriter=this.auxTarget._createWriter(),this.auxBoxWriter=new cs(this.auxWriter),this.mdat=null,this.ftypSize=null,this.trackDatas=[],this.allTracksKnown=Qh(),this.creationTime=Math.floor(Date.now()/1e3)+jp,this.finalizedChunks=[],this.nextFragmentNumber=1,this.maxWrittenTimestamp=-1/0,this.format=r,this.writer=t._writer,this.boxWriter=new cs(this.writer),this.isQuickTime=r instanceof ua;const n=this.writer instanceof na?"in-memory":!1;this.fastStart=r._options.fastStart??n,this.isFragmented=this.fastStart==="fragmented",(this.fastStart==="in-memory"||this.isFragmented)&&(this.writer.ensureMonotonicity=!0),this.minimumFragmentDuration=r._options.minimumFragmentDuration??1}async start(){const t=await this.mutex.acquire(),r=this.output._tracks.some(n=>n.type==="video"&&n.source._codec==="avc");if(this.format._options.onFtyp&&this.writer.startTrackingWrites(),this.boxWriter.writeBox(Wm({isQuickTime:this.isQuickTime,holdsAvc:r,fragmented:this.isFragmented})),this.format._options.onFtyp){const{data:n,start:i}=this.writer.stopTrackingWrites();this.format._options.onFtyp(n,i)}if(this.ftypSize=this.writer.getPos(),this.fastStart!=="in-memory")if(this.fastStart==="reserve"){for(const n of this.output._tracks)if(n.metadata.maximumPacketCount===void 0)throw new Error("All tracks must specify maximumPacketCount in their metadata when using fastStart: 'reserve'.")}else this.isFragmented||(this.format._options.onMdat&&this.writer.startTrackingWrites(),this.mdat=mr(!0),this.boxWriter.writeBox(this.mdat));await this.writer.flush(),t()}allTracksAreKnown(){for(const t of this.output._tracks)if(!t.source._closed&&!this.trackDatas.some(r=>r.track===t))return!1;return!0}async getMimeType(){await this.allTracksKnown.promise;const t=this.trackDatas.map(r=>r.type==="video"||r.type==="audio"?r.info.decoderConfig.codec:{webvtt:"wvtt"}[r.track.source._codec]);return zm({isQuickTime:this.isQuickTime,hasVideo:this.trackDatas.some(r=>r.type==="video"),hasAudio:this.trackDatas.some(r=>r.type==="audio"),codecStrings:t})}getVideoTrackData(t,r,n){const i=this.trackDatas.find(u=>u.track===t);if(i)return i;fm(n),P(n),P(n.decoderConfig);const s={...n.decoderConfig};P(s.codedWidth!==void 0),P(s.codedHeight!==void 0);let o=!1;if(t.source._codec==="avc"&&!s.description){const u=bm(r.data);if(!u)throw new Error("Couldn't extract an AVCDecoderConfigurationRecord from the AVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.264) when not providing a description, or provide a description (must be an AVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in AVCC format.");s.description=wm(u),o=!0}else if(t.source._codec==="hevc"&&!s.description){const u=_m(r.data);if(!u)throw new Error("Couldn't extract an HEVCDecoderConfigurationRecord from the HEVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.265) when not providing a description, or provide a description (must be an HEVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in HEVC format.");s.description=Am(u),o=!0}const a=Zh(1/(t.metadata.frameRate??57600),1e6).denominator,c={muxer:this,track:t,type:"video",info:{width:s.codedWidth,height:s.codedHeight,decoderConfig:s,requiresAnnexBTransformation:o},timescale:a,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[]};return this.trackDatas.push(c),this.trackDatas.sort((u,l)=>u.track.id-l.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),c}getAudioTrackData(t,r,n){const i=this.trackDatas.find(c=>c.track===t);if(i)return i;mm(n),P(n),P(n.decoderConfig);const s={...n.decoderConfig};let o=!1;if(t.source._codec==="aac"&&!s.description){const c=os(jt.tempFromBytes(r.data));if(!c)throw new Error("Couldn't parse ADTS header from the AAC packet. Make sure the packets are in ADTS format (as specified in ISO 13818-7) when not providing a description, or provide a description (must be an AudioSpecificConfig as specified in ISO 14496-3) and ensure the packets are raw AAC data.");const u=$o[c.samplingFrequencyIndex],l=Wo[c.channelConfiguration];if(u===void 0||l===void 0)throw new Error("Invalid ADTS frame header.");s.description=im({objectType:c.objectType,sampleRate:u,numberOfChannels:l}),o=!0}const a={muxer:this,track:t,type:"audio",info:{numberOfChannels:n.decoderConfig.numberOfChannels,sampleRate:n.decoderConfig.sampleRate,decoderConfig:s,requiresPcmTransformation:!this.isFragmented&&nt.includes(t.source._codec),requiresAdtsStripping:o},timescale:n.decoderConfig.sampleRate,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[]};return this.trackDatas.push(a),this.trackDatas.sort((c,u)=>c.track.id-u.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),a}getSubtitleTrackData(t,r){const n=this.trackDatas.find(s=>s.track===t);if(n)return n;pm(r),P(r),P(r.config);const i={muxer:this,track:t,type:"subtitle",info:{config:r.config},timescale:1e3,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],lastCueEndTimestamp:0,cueQueue:[],nextSourceId:0,cueToSourceId:new WeakMap};return this.trackDatas.push(i),this.trackDatas.sort((s,o)=>s.track.id-o.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),i}async addEncodedVideoPacket(t,r,n){const i=await this.mutex.acquire();try{const s=this.getVideoTrackData(t,r,n);let o=r.data;if(s.info.requiresAnnexBTransformation){const u=[...oi(o)].map(l=>o.subarray(l.offset,l.offset+l.length));if(u.length===0)throw new Error("Failed to transform packet data. Make sure all packets are provided in Annex B format, as specified in ITU-T-REC-H.264 and ITU-T-REC-H.265.");o=ym(u,4)}const a=this.validateAndNormalizeTimestamp(s.track,r.timestamp,r.type==="key"),c=this.createSampleForTrack(s,o,a,r.duration,r.type);await this.registerSample(s,c)}finally{i()}}async addEncodedAudioPacket(t,r,n){const i=await this.mutex.acquire();try{const s=this.getAudioTrackData(t,r,n);let o=r.data;if(s.info.requiresAdtsStripping){const u=os(jt.tempFromBytes(o));if(!u)throw new Error("Expected ADTS frame, didn't get one.");const l=u.crcCheck===null?Dm:Lm;o=o.subarray(l)}const a=this.validateAndNormalizeTimestamp(s.track,r.timestamp,r.type==="key"),c=this.createSampleForTrack(s,o,a,r.duration,r.type);s.info.requiresPcmTransformation&&await this.maybePadWithSilence(s,a),await this.registerSample(s,c)}finally{i()}}async maybePadWithSilence(t,r){const n=be(t.samples),i=n?n.timestamp+n.duration:0,s=r-i,o=te(s,t.timescale);if(o>0){const{sampleSize:a,silentValue:c}=nr(t.info.decoderConfig.codec),u=o*t.info.numberOfChannels,l=new Uint8Array(a*u).fill(c),f=this.createSampleForTrack(t,new Uint8Array(l.buffer),i,s,"key");await this.registerSample(t,f)}}async addSubtitleCue(t,r,n){const i=await this.mutex.acquire();try{const s=this.getSubtitleTrackData(t,n);this.validateAndNormalizeTimestamp(s.track,r.timestamp,!0),t.source._codec==="webvtt"&&(s.cueQueue.push(r),await this.processWebVTTCues(s,r.timestamp))}finally{i()}}async processWebVTTCues(t,r){for(;t.cueQueue.length>0;){const n=new Set([]);for(const u of t.cueQueue)P(u.timestamp<=r),P(t.lastCueEndTimestamp<=u.timestamp+u.duration),n.add(Math.max(u.timestamp,t.lastCueEndTimestamp)),n.add(u.timestamp+u.duration);const i=[...n].sort((u,l)=>u-l),s=i[0],o=i[1]??s;if(r<o)break;if(t.lastCueEndTimestamp<s){this.auxWriter.seek(0);const u=Dp();this.auxBoxWriter.writeBox(u);const l=this.auxWriter.getSlice(0,this.auxWriter.getPos()),f=this.createSampleForTrack(t,l,t.lastCueEndTimestamp,s-t.lastCueEndTimestamp,"key");await this.registerSample(t,f),t.lastCueEndTimestamp=s}this.auxWriter.seek(0);for(let u=0;u<t.cueQueue.length;u++){const l=t.cueQueue[u];if(l.timestamp>=o)break;as.lastIndex=0;const f=as.test(l.text),h=l.timestamp+l.duration;let d=t.cueToSourceId.get(l);if(d===void 0&&o<h&&(d=t.nextSourceId++,t.cueToSourceId.set(l,d)),l.notes){const g=Up(l.notes);this.auxBoxWriter.writeBox(g)}const m=Lp(l.text,f?s:null,l.identifier??null,l.settings??null,d??null);this.auxBoxWriter.writeBox(m),h===o&&t.cueQueue.splice(u--,1)}const a=this.auxWriter.getSlice(0,this.auxWriter.getPos()),c=this.createSampleForTrack(t,a,s,o-s,"key");await this.registerSample(t,c),t.lastCueEndTimestamp=o}}createSampleForTrack(t,r,n,i,s){return{timestamp:n,decodeTimestamp:n,duration:i,data:r,size:r.byteLength,type:s,timescaleUnitsToNextSample:te(i,t.timescale)}}processTimestamps(t,r){if(t.timestampProcessingQueue.length===0)return;if(t.type==="audio"&&t.info.requiresPcmTransformation){let i=0;for(let s=0;s<t.timestampProcessingQueue.length;s++){const o=t.timestampProcessingQueue[s],a=te(o.duration,t.timescale);i+=a}if(t.timeToSampleTable.length===0)t.timeToSampleTable.push({sampleCount:i,sampleDelta:1});else{const s=be(t.timeToSampleTable);s.sampleCount+=i}t.timestampProcessingQueue.length=0;return}const n=t.timestampProcessingQueue.map(i=>i.timestamp).sort((i,s)=>i-s);for(let i=0;i<t.timestampProcessingQueue.length;i++){const s=t.timestampProcessingQueue[i];s.decodeTimestamp=n[i],!this.isFragmented&&t.lastTimescaleUnits===null&&(s.decodeTimestamp=0);const o=te(s.timestamp-s.decodeTimestamp,t.timescale),a=te(s.duration,t.timescale);if(t.lastTimescaleUnits!==null){P(t.lastSample);const c=te(s.decodeTimestamp,t.timescale,!1),u=Math.round(c-t.lastTimescaleUnits);if(P(u>=0),t.lastTimescaleUnits+=u,t.lastSample.timescaleUnitsToNextSample=u,!this.isFragmented){let l=be(t.timeToSampleTable);if(P(l),l.sampleCount===1){l.sampleDelta=u;const h=t.timeToSampleTable[t.timeToSampleTable.length-2];h&&h.sampleDelta===u&&(h.sampleCount++,t.timeToSampleTable.pop(),l=h)}else l.sampleDelta!==u&&(l.sampleCount--,t.timeToSampleTable.push(l={sampleCount:1,sampleDelta:u}));l.sampleDelta===a?l.sampleCount++:t.timeToSampleTable.push({sampleCount:1,sampleDelta:a});const f=be(t.compositionTimeOffsetTable);P(f),f.sampleCompositionTimeOffset===o?f.sampleCount++:t.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:o})}}else t.lastTimescaleUnits=te(s.decodeTimestamp,t.timescale,!1),this.isFragmented||(t.timeToSampleTable.push({sampleCount:1,sampleDelta:a}),t.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:o}));t.lastSample=s}if(t.timestampProcessingQueue.length=0,P(t.lastSample),P(t.lastTimescaleUnits!==null),r!==void 0&&t.lastSample.timescaleUnitsToNextSample===0){P(r.type==="key");const i=te(r.timestamp,t.timescale,!1),s=Math.round(i-t.lastTimescaleUnits);t.lastSample.timescaleUnitsToNextSample=s}}async registerSample(t,r){r.type==="key"&&this.processTimestamps(t,r),t.timestampProcessingQueue.push(r),this.isFragmented?(t.sampleQueue.push(r),await this.interleaveSamples()):this.fastStart==="reserve"?await this.registerSampleFastStartReserve(t,r):await this.addSampleToTrack(t,r)}async addSampleToTrack(t,r){if(!this.isFragmented&&(t.samples.push(r),this.fastStart==="reserve")){const i=t.track.metadata.maximumPacketCount;if(P(i!==void 0),t.samples.length>i)throw new Error(`Track #${t.track.id} has already reached the maximum packet count (${i}). Either add less packets or increase the maximum packet count.`)}let n=!1;if(!t.currentChunk)n=!0;else{t.currentChunk.startTimestamp=Math.min(t.currentChunk.startTimestamp,r.timestamp);const i=r.timestamp-t.currentChunk.startTimestamp;if(this.isFragmented){const s=this.trackDatas.every(o=>{if(t===o)return r.type==="key";const a=o.sampleQueue[0];return a?a.type==="key":o.track.source._closed});i>=this.minimumFragmentDuration&&s&&r.timestamp>this.maxWrittenTimestamp&&(n=!0,await this.finalizeFragment())}else n=i>=.5}n&&(t.currentChunk&&await this.finalizeCurrentChunk(t),t.currentChunk={startTimestamp:r.timestamp,samples:[],offset:null,moofOffset:null}),P(t.currentChunk),t.currentChunk.samples.push(r),this.isFragmented&&(this.maxWrittenTimestamp=Math.max(this.maxWrittenTimestamp,r.timestamp))}async finalizeCurrentChunk(t){if(P(!this.isFragmented),!t.currentChunk)return;t.finalizedChunks.push(t.currentChunk),this.finalizedChunks.push(t.currentChunk);let r=t.currentChunk.samples.length;if(t.type==="audio"&&t.info.requiresPcmTransformation&&(r=t.currentChunk.samples.reduce((n,i)=>n+te(i.duration,t.timescale),0)),(t.compactlyCodedChunkTable.length===0||be(t.compactlyCodedChunkTable).samplesPerChunk!==r)&&t.compactlyCodedChunkTable.push({firstChunk:t.finalizedChunks.length,samplesPerChunk:r}),this.fastStart==="in-memory"){t.currentChunk.offset=0;return}t.currentChunk.offset=this.writer.getPos();for(const n of t.currentChunk.samples)P(n.data),this.writer.write(n.data),n.data=null;await this.writer.flush()}async interleaveSamples(t=!1){if(P(this.isFragmented),!(!t&&!this.allTracksAreKnown()))e:for(;;){let r=null,n=1/0;for(const s of this.trackDatas){if(!t&&s.sampleQueue.length===0&&!s.track.source._closed)break e;s.sampleQueue.length>0&&s.sampleQueue[0].timestamp<n&&(r=s,n=s.sampleQueue[0].timestamp)}if(!r)break;const i=r.sampleQueue.shift();await this.addSampleToTrack(r,i)}}async finalizeFragment(t=!0){P(this.isFragmented);const r=this.nextFragmentNumber++;if(r===1){this.format._options.onMoov&&this.writer.startTrackingWrites();const d=At(this);if(this.boxWriter.writeBox(d),this.format._options.onMoov){const{data:m,start:g}=this.writer.stopTrackingWrites();this.format._options.onMoov(m,g)}}const n=this.trackDatas.filter(d=>d.currentChunk),i=ls(r,n),s=this.writer.getPos(),o=s+this.boxWriter.measureBox(i);let a=o+dn,c=1/0;for(const d of n){d.currentChunk.offset=a,d.currentChunk.moofOffset=s;for(const m of d.currentChunk.samples)a+=m.size;c=Math.min(c,d.currentChunk.startTimestamp)}const u=a-o,l=u>=2**32;if(l)for(const d of n)d.currentChunk.offset+=ss-dn;this.format._options.onMoof&&this.writer.startTrackingWrites();const f=ls(r,n);if(this.boxWriter.writeBox(f),this.format._options.onMoof){const{data:d,start:m}=this.writer.stopTrackingWrites();this.format._options.onMoof(d,m,c)}P(this.writer.getPos()===o),this.format._options.onMdat&&this.writer.startTrackingWrites();const h=mr(l);h.size=u,this.boxWriter.writeBox(h),this.writer.seek(o+(l?ss:dn));for(const d of n)for(const m of d.currentChunk.samples)this.writer.write(m.data),m.data=null;if(this.format._options.onMdat){const{data:d,start:m}=this.writer.stopTrackingWrites();this.format._options.onMdat(d,m)}for(const d of n)d.finalizedChunks.push(d.currentChunk),this.finalizedChunks.push(d.currentChunk),d.currentChunk=null;t&&await this.writer.flush()}async registerSampleFastStartReserve(t,r){if(this.allTracksAreKnown()){if(!this.mdat){const n=At(this),s=this.boxWriter.measureBox(n)+this.computeSampleTableSizeUpperBound()+4096;P(this.ftypSize!==null),this.writer.seek(this.ftypSize+s),this.format._options.onMdat&&this.writer.startTrackingWrites(),this.mdat=mr(!0),this.boxWriter.writeBox(this.mdat);for(const o of this.trackDatas){for(const a of o.sampleQueue)await this.addSampleToTrack(o,a);o.sampleQueue.length=0}}await this.addSampleToTrack(t,r)}else t.sampleQueue.push(r)}computeSampleTableSizeUpperBound(){P(this.fastStart==="reserve");let t=0;for(const r of this.trackDatas){const n=r.track.metadata.maximumPacketCount;P(n!==void 0),t+=8*Math.ceil(2/3*n),t+=4*n,t+=8*Math.ceil(2/3*n),t+=12*Math.ceil(2/3*n),t+=4*n,t+=8*n}return t}async onTrackClose(t){const r=await this.mutex.acquire();if(t.type==="subtitle"&&t.source._codec==="webvtt"){const n=this.trackDatas.find(i=>i.track===t);n&&await this.processWebVTTCues(n,1/0)}this.allTracksAreKnown()&&this.allTracksKnown.resolve(),this.isFragmented&&await this.interleaveSamples(),r()}async finalize(){const t=await this.mutex.acquire();this.allTracksKnown.resolve();for(const r of this.trackDatas)r.type==="subtitle"&&r.track.source._codec==="webvtt"&&await this.processWebVTTCues(r,1/0);if(this.isFragmented){await this.interleaveSamples(!0);for(const r of this.trackDatas)this.processTimestamps(r);await this.finalizeFragment(!1)}else for(const r of this.trackDatas)this.processTimestamps(r),await this.finalizeCurrentChunk(r);if(this.fastStart==="in-memory"){this.mdat=mr(!1);let r;for(let i=0;i<2;i++){const s=At(this),o=this.boxWriter.measureBox(s);r=this.boxWriter.measureBox(this.mdat);let a=this.writer.getPos()+o+r;for(const c of this.finalizedChunks){c.offset=a;for(const{data:u}of c.samples)P(u),a+=u.byteLength,r+=u.byteLength}if(a<2**32)break;r>=2**32&&(this.mdat.largeSize=!0)}this.format._options.onMoov&&this.writer.startTrackingWrites();const n=At(this);if(this.boxWriter.writeBox(n),this.format._options.onMoov){const{data:i,start:s}=this.writer.stopTrackingWrites();this.format._options.onMoov(i,s)}this.format._options.onMdat&&this.writer.startTrackingWrites(),this.mdat.size=r,this.boxWriter.writeBox(this.mdat);for(const i of this.finalizedChunks)for(const s of i.samples)P(s.data),this.writer.write(s.data),s.data=null;if(this.format._options.onMdat){const{data:i,start:s}=this.writer.stopTrackingWrites();this.format._options.onMdat(i,s)}}else if(this.isFragmented){const r=this.writer.getPos(),n=Op(this.trackDatas);this.boxWriter.writeBox(n);const i=this.writer.getPos()-r;this.writer.seek(this.writer.getPos()-4),this.boxWriter.writeU32(i)}else{P(this.mdat);const r=this.boxWriter.offsets.get(this.mdat);P(r!==void 0);const n=this.writer.getPos()-r;if(this.mdat.size=n,this.mdat.largeSize=n>=2**32,this.boxWriter.patchBox(this.mdat),this.format._options.onMdat){const{data:s,start:o}=this.writer.stopTrackingWrites();this.format._options.onMdat(s,o)}const i=At(this);if(this.fastStart==="reserve"){P(this.ftypSize!==null),this.writer.seek(this.ftypSize),this.format._options.onMoov&&this.writer.startTrackingWrites(),this.boxWriter.writeBox(i);const s=this.boxWriter.offsets.get(this.mdat)-this.writer.getPos();this.boxWriter.writeBox(Qm(s))}else this.format._options.onMoov&&this.writer.startTrackingWrites(),this.boxWriter.writeBox(i);if(this.format._options.onMoov){const{data:s,start:o}=this.writer.stopTrackingWrites();this.format._options.onMoov(s,o)}}t()}}class oa{getSupportedVideoCodecs(){return this.getSupportedCodecs().filter(t=>rt.includes(t))}getSupportedAudioCodecs(){return this.getSupportedCodecs().filter(t=>Dr.includes(t))}getSupportedSubtitleCodecs(){return this.getSupportedCodecs().filter(t=>Lr.includes(t))}_codecUnsupportedHint(t){return""}}class aa extends oa{constructor(t={}){if(!t||typeof t!="object")throw new TypeError("options must be an object.");if(t.fastStart!==void 0&&![!1,"in-memory","reserve","fragmented"].includes(t.fastStart))throw new TypeError("options.fastStart, when provided, must be false, 'in-memory', 'reserve', or 'fragmented'.");if(t.minimumFragmentDuration!==void 0&&(!Number.isFinite(t.minimumFragmentDuration)||t.minimumFragmentDuration<0))throw new TypeError("options.minimumFragmentDuration, when provided, must be a non-negative number.");if(t.onFtyp!==void 0&&typeof t.onFtyp!="function")throw new TypeError("options.onFtyp, when provided, must be a function.");if(t.onMoov!==void 0&&typeof t.onMoov!="function")throw new TypeError("options.onMoov, when provided, must be a function.");if(t.onMdat!==void 0&&typeof t.onMdat!="function")throw new TypeError("options.onMdat, when provided, must be a function.");if(t.onMoof!==void 0&&typeof t.onMoof!="function")throw new TypeError("options.onMoof, when provided, must be a function.");if(t.metadataFormat!==void 0&&!["mdir","mdta","udta","auto"].includes(t.metadataFormat))throw new TypeError("options.metadataFormat, when provided, must be either 'auto', 'mdir', 'mdta', or 'udta'.");super(),this._options=t}getSupportedTrackCounts(){return{video:{min:0,max:4294967295},audio:{min:0,max:4294967295},subtitle:{min:0,max:4294967295},total:{min:1,max:4294967295}}}get supportsVideoRotationMetadata(){return!0}_createMuxer(t){return new Jp(t,this)}}class ca extends aa{constructor(t){super(t)}get _name(){return"MP4"}get fileExtension(){return".mp4"}get mimeType(){return"video/mp4"}getSupportedCodecs(){return[...rt,...Go,"pcm-s16","pcm-s16be","pcm-s24","pcm-s24be","pcm-s32","pcm-s32be","pcm-f32","pcm-f32be","pcm-f64","pcm-f64be",...Lr]}_codecUnsupportedHint(t){return new ua().getSupportedCodecs().includes(t)?" Switching to MOV will grant support for this codec.":""}}class ua extends aa{constructor(t){super(t)}get _name(){return"MOV"}get fileExtension(){return".mov"}get mimeType(){return"video/quicktime"}getSupportedCodecs(){return[...rt,...Dr]}_codecUnsupportedHint(t){return new ca().getSupportedCodecs().includes(t)?" Switching to MP4 will grant support for this codec.":""}}const e0=e=>{if(!e||typeof e!="object")throw new TypeError("Encoding config must be an object.");if(!rt.includes(e.codec))throw new TypeError(`Invalid video codec '${e.codec}'. Must be one of: ${rt.join(", ")}.`);if(!(e.bitrate instanceof la)&&(!Number.isInteger(e.bitrate)||e.bitrate<=0))throw new TypeError("config.bitrate must be a positive integer or a quality.");if(e.keyFrameInterval!==void 0&&(!Number.isFinite(e.keyFrameInterval)||e.keyFrameInterval<0))throw new TypeError("config.keyFrameInterval, when provided, must be a non-negative number.");if(e.sizeChangeBehavior!==void 0&&!["deny","passThrough","fill","contain","cover"].includes(e.sizeChangeBehavior))throw new TypeError("config.sizeChangeBehavior, when provided, must be 'deny', 'passThrough', 'fill', 'contain' or 'cover'.");if(e.onEncodedPacket!==void 0&&typeof e.onEncodedPacket!="function")throw new TypeError("config.onEncodedChunk, when provided, must be a function.");if(e.onEncoderConfig!==void 0&&typeof e.onEncoderConfig!="function")throw new TypeError("config.onEncoderConfig, when provided, must be a function.");t0(e.codec,e)},t0=(e,t)=>{if(!t||typeof t!="object")throw new TypeError("Encoding options must be an object.");if(t.alpha!==void 0&&!["discard","keep"].includes(t.alpha))throw new TypeError("options.alpha, when provided, must be 'discard' or 'keep'.");if(t.bitrateMode!==void 0&&!["constant","variable"].includes(t.bitrateMode))throw new TypeError("bitrateMode, when provided, must be 'constant' or 'variable'.");if(t.latencyMode!==void 0&&!["quality","realtime"].includes(t.latencyMode))throw new TypeError("latencyMode, when provided, must be 'quality' or 'realtime'.");if(t.fullCodecString!==void 0&&typeof t.fullCodecString!="string")throw new TypeError("fullCodecString, when provided, must be a string.");if(t.fullCodecString!==void 0&&sm(t.fullCodecString)!==e)throw new TypeError(`fullCodecString, when provided, must be a string that matches the specified codec (${e}).`);if(t.hardwareAcceleration!==void 0&&!["no-preference","prefer-hardware","prefer-software"].includes(t.hardwareAcceleration))throw new TypeError("hardwareAcceleration, when provided, must be 'no-preference', 'prefer-hardware' or 'prefer-software'.");if(t.scalabilityMode!==void 0&&typeof t.scalabilityMode!="string")throw new TypeError("scalabilityMode, when provided, must be a string.");if(t.contentHint!==void 0&&typeof t.contentHint!="string")throw new TypeError("contentHint, when provided, must be a string.")},r0=e=>{const t=e.bitrate instanceof la?e.bitrate._toVideoBitrate(e.codec,e.width,e.height):e.bitrate;return{codec:e.fullCodecString??rm(e.codec,e.width,e.height,t),width:e.width,height:e.height,bitrate:t,bitrateMode:e.bitrateMode,alpha:e.alpha??"discard",framerate:e.framerate,latencyMode:e.latencyMode,hardwareAcceleration:e.hardwareAcceleration,scalabilityMode:e.scalabilityMode,contentHint:e.contentHint,...om(e.codec)}};class la{constructor(t){this._factor=t}_toVideoBitrate(t,r,n){const i=r*n,s={avc:1,hevc:.6,vp9:.6,av1:.4,vp8:1.2},o=1920*1080,a=3e6,c=Math.pow(i/o,.95),f=a*c*s[t]*this._factor;return Math.ceil(f/1e3)*1e3}_toAudioBitrate(t){if(nt.includes(t)||t==="flac")return;const n={aac:128e3,opus:64e3,mp3:16e4,vorbis:64e3}[t];if(!n)throw new Error(`Unhandled codec: ${t}`);let i=n*this._factor;return t==="aac"?i=[96e3,128e3,16e4,192e3].reduce((o,a)=>Math.abs(a-i)<Math.abs(o-i)?a:o):t==="opus"||t==="vorbis"?i=Math.max(6e3,i):t==="mp3"&&(i=[8e3,16e3,24e3,32e3,4e4,48e3,64e3,8e4,96e3,112e3,128e3,16e4,192e3,224e3,256e3,32e4].reduce((o,a)=>Math.abs(a-i)<Math.abs(o-i)?a:o)),Math.round(i/1e3)*1e3}}class li{constructor(){this._connectedTrack=null,this._closingPromise=null,this._closed=!1,this._timestampOffset=0}_ensureValidAdd(){if(!this._connectedTrack)throw new Error("Source is not connected to an output track.");if(this._connectedTrack.output.state==="canceled")throw new Error("Output has been canceled.");if(this._connectedTrack.output.state==="finalizing"||this._connectedTrack.output.state==="finalized")throw new Error("Output has been finalized.");if(this._connectedTrack.output.state==="pending")throw new Error("Output has not started.");if(this._closed)throw new Error("Source is closed.")}async _start(){}async _flushAndClose(t){}close(){if(this._closingPromise)return;const t=this._connectedTrack;if(!t)throw new Error("Cannot call close without connecting the source to an output track.");if(t.output.state==="pending")throw new Error("Cannot call close before output has been started.");this._closingPromise=(async()=>{await this._flushAndClose(!1),this._closed=!0,!(t.output.state==="finalizing"||t.output.state==="finalized")&&t.output._muxer.onTrackClose(t)})()}async _flushOrWaitForOngoingClose(t){return this._closingPromise??=(async()=>{await this._flushAndClose(t),this._closed=!0})()}}class da extends li{constructor(t){if(super(),this._connectedTrack=null,!rt.includes(t))throw new TypeError(`Invalid video codec '${t}'. Must be one of: ${rt.join(", ")}.`);this._codec=t}}class n0{constructor(t,r){this.source=t,this.encodingConfig=r,this.ensureEncoderPromise=null,this.encoderInitialized=!1,this.encoder=null,this.muxer=null,this.lastMultipleOfKeyFrameInterval=-1,this.codedWidth=null,this.codedHeight=null,this.resizeCanvas=null,this.customEncoder=null,this.customEncoderCallSerializer=new jh,this.customEncoderQueueSize=0,this.alphaEncoder=null,this.splitter=null,this.splitterCreationFailed=!1,this.alphaFrameQueue=[],this.error=null,this.errorNeedsNewStack=!0}async add(t,r,n){try{if(this.checkForEncoderError(),this.source._ensureValidAdd(),this.codedWidth!==null&&this.codedHeight!==null){if(t.codedWidth!==this.codedWidth||t.codedHeight!==this.codedHeight){const a=this.encodingConfig.sizeChangeBehavior??"deny";if(a!=="passThrough"){if(a==="deny")throw new Error(`Video sample size must remain constant. Expected ${this.codedWidth}x${this.codedHeight}, got ${t.codedWidth}x${t.codedHeight}. To allow the sample size to change over time, set \`sizeChangeBehavior\` to a value other than 'strict' in the encoding options.`);{let c=!1;this.resizeCanvas||(typeof document<"u"?(this.resizeCanvas=document.createElement("canvas"),this.resizeCanvas.width=this.codedWidth,this.resizeCanvas.height=this.codedHeight):this.resizeCanvas=new OffscreenCanvas(this.codedWidth,this.codedHeight),c=!0);const u=this.resizeCanvas.getContext("2d",{alpha:Nn()});P(u),c||(Nn()?(u.fillStyle="black",u.fillRect(0,0,this.codedWidth,this.codedHeight)):u.clearRect(0,0,this.codedWidth,this.codedHeight)),t.drawWithFit(u,{fit:a}),r&&t.close(),t=new je(this.resizeCanvas,{timestamp:t.timestamp,duration:t.duration,rotation:t.rotation}),r=!0}}}}else this.codedWidth=t.codedWidth,this.codedHeight=t.codedHeight;this.encoderInitialized||(this.ensureEncoderPromise||this.ensureEncoder(t),this.encoderInitialized||await this.ensureEncoderPromise),P(this.encoderInitialized);const i=this.encodingConfig.keyFrameInterval??5,s=Math.floor(t.timestamp/i),o={...n,keyFrame:n?.keyFrame||i===0||s!==this.lastMultipleOfKeyFrameInterval};if(this.lastMultipleOfKeyFrameInterval=s,this.customEncoder){this.customEncoderQueueSize++;const a=t.clone(),c=this.customEncoderCallSerializer.call(()=>this.customEncoder.encode(a,o)).then(()=>this.customEncoderQueueSize--).catch(u=>this.error??=u).finally(()=>{a.close()});this.customEncoderQueueSize>=4&&await c}else{P(this.encoder);const a=t.toVideoFrame();if(!this.alphaEncoder)this.encoder.encode(a,o),a.close();else if(!!a.format&&!a.format.includes("A")||this.splitterCreationFailed)this.alphaFrameQueue.push(null),this.encoder.encode(a,o),a.close();else{const u=a.displayWidth,l=a.displayHeight;if(!this.splitter)try{this.splitter=new i0(u,l)}catch(f){console.error("Due to an error, only color data will be encoded.",f),this.splitterCreationFailed=!0,this.alphaFrameQueue.push(null),this.encoder.encode(a,o),a.close()}if(this.splitter){const f=this.splitter.extractColor(a),h=this.splitter.extractAlpha(a);this.alphaFrameQueue.push(h),this.encoder.encode(f,o),f.close(),a.close()}}r&&t.close(),this.encoder.encodeQueueSize>=4&&await new Promise(c=>this.encoder.addEventListener("dequeue",c,{once:!0}))}await this.muxer.mutex.currentPromise}finally{r&&t.close()}}ensureEncoder(t){const r=new Error;this.ensureEncoderPromise=(async()=>{const n=r0({width:t.codedWidth,height:t.codedHeight,...this.encodingConfig,framerate:this.source._connectedTrack?.metadata.frameRate});this.encodingConfig.onEncoderConfig?.(n);const i=Mm.find(s=>s.supports(this.encodingConfig.codec,n));if(i)this.customEncoder=new i,this.customEncoder.codec=this.encodingConfig.codec,this.customEncoder.config=n,this.customEncoder.onPacket=(s,o)=>{if(!(s instanceof Zt))throw new TypeError("The first argument passed to onPacket must be an EncodedPacket.");if(o!==void 0&&(!o||typeof o!="object"))throw new TypeError("The second argument passed to onPacket must be an object or undefined.");this.encodingConfig.onEncodedPacket?.(s,o),this.muxer.addEncodedVideoPacket(this.source._connectedTrack,s,o).catch(a=>{this.error??=a,this.errorNeedsNewStack=!1})},await this.customEncoder.init();else{if(typeof VideoEncoder>"u")throw new Error("VideoEncoder is not supported by this browser.");if(n.alpha="discard",this.encodingConfig.alpha==="keep"&&(n.latencyMode="quality"),(n.width%2===1||n.height%2===1)&&(this.encodingConfig.codec==="avc"||this.encodingConfig.codec==="hevc"))throw new Error(`The dimensions ${n.width}x${n.height} are not supported for codec '${this.encodingConfig.codec}'; both width and height must be even numbers. Make sure to round your dimensions to the nearest even number.`);if(!(await VideoEncoder.isConfigSupported(n)).supported)throw new Error(`This specific encoder configuration (${n.codec}, ${n.bitrate} bps, ${n.width}x${n.height}, hardware acceleration: ${n.hardwareAcceleration??"no-preference"}) is not supported by this browser. Consider using another codec or changing your video parameters.`);const a=[],c=[];let u=0,l=0;const f=(h,d,m)=>{const g={};if(d){const w=new Uint8Array(d.byteLength);d.copyTo(w),g.alpha=w}const y=Zt.fromEncodedChunk(h,g);this.encodingConfig.onEncodedPacket?.(y,m),this.muxer.addEncodedVideoPacket(this.source._connectedTrack,y,m).catch(w=>{this.error??=w,this.errorNeedsNewStack=!1})};this.encoder=new VideoEncoder({output:(h,d)=>{if(!this.alphaEncoder){f(h,null,d);return}const m=this.alphaFrameQueue.shift();P(m!==void 0),m?(this.alphaEncoder.encode(m,{keyFrame:h.type==="key"}),l++,m.close(),a.push({chunk:h,meta:d})):l===0?f(h,null,d):(c.push(u+l),a.push({chunk:h,meta:d}))},error:h=>{h.stack=r.stack,this.error??=h}}),this.encoder.configure(n),this.encodingConfig.alpha==="keep"&&(this.alphaEncoder=new VideoEncoder({output:(h,d)=>{l--;const m=a.shift();for(P(m!==void 0),f(m.chunk,h,m.meta),u++;c.length>0&&c[0]===u;){c.shift();const g=a.shift();P(g!==void 0),f(g.chunk,null,g.meta)}},error:h=>{h.stack=r.stack,this.error??=h}}),this.alphaEncoder.configure(n))}P(this.source._connectedTrack),this.muxer=this.source._connectedTrack.output._muxer,this.encoderInitialized=!0})()}async flushAndClose(t){t||this.checkForEncoderError(),this.customEncoder?(t||this.customEncoderCallSerializer.call(()=>this.customEncoder.flush()),await this.customEncoderCallSerializer.call(()=>this.customEncoder.close())):this.encoder&&(t||(await this.encoder.flush(),await this.alphaEncoder?.flush()),this.encoder.state!=="closed"&&this.encoder.close(),this.alphaEncoder&&this.alphaEncoder.state!=="closed"&&this.alphaEncoder.close(),this.alphaFrameQueue.forEach(r=>r?.close()),this.splitter?.close()),t||this.checkForEncoderError()}getQueueSize(){return this.customEncoder?this.customEncoderQueueSize:this.encoder?.encodeQueueSize??0}checkForEncoderError(){if(this.error)throw this.errorNeedsNewStack&&(this.error.stack=new Error().stack),this.error}}class i0{constructor(t,r){this.lastFrame=null,typeof OffscreenCanvas<"u"?this.canvas=new OffscreenCanvas(t,r):(this.canvas=document.createElement("canvas"),this.canvas.width=t,this.canvas.height=r);const n=this.canvas.getContext("webgl2",{alpha:!0});if(!n)throw new Error("Couldn't acquire WebGL 2 context.");this.gl=n,this.colorProgram=this.createColorProgram(),this.alphaProgram=this.createAlphaProgram(),this.vao=this.createVAO(),this.sourceTexture=this.createTexture(),this.alphaResolutionLocation=this.gl.getUniformLocation(this.alphaProgram,"u_resolution"),this.gl.useProgram(this.colorProgram),this.gl.uniform1i(this.gl.getUniformLocation(this.colorProgram,"u_sourceTexture"),0),this.gl.useProgram(this.alphaProgram),this.gl.uniform1i(this.gl.getUniformLocation(this.alphaProgram,"u_sourceTexture"),0)}createVertexShader(){return this.createShader(this.gl.VERTEX_SHADER,`#version 300 es
			in vec2 a_position;
			in vec2 a_texCoord;
			out vec2 v_texCoord;
			
			void main() {
				gl_Position = vec4(a_position, 0.0, 1.0);
				v_texCoord = a_texCoord;
			}
		`)}createColorProgram(){const t=this.createVertexShader(),r=this.createShader(this.gl.FRAGMENT_SHADER,`#version 300 es
			precision highp float;
			
			uniform sampler2D u_sourceTexture;
			in vec2 v_texCoord;
			out vec4 fragColor;
			
			void main() {
				vec4 source = texture(u_sourceTexture, v_texCoord);
				fragColor = vec4(source.rgb, 1.0);
			}
		`),n=this.gl.createProgram();return this.gl.attachShader(n,t),this.gl.attachShader(n,r),this.gl.linkProgram(n),n}createAlphaProgram(){const t=this.createVertexShader(),r=this.createShader(this.gl.FRAGMENT_SHADER,`#version 300 es
			precision highp float;
			
			uniform sampler2D u_sourceTexture;
			uniform vec2 u_resolution; // The width and height of the canvas
			in vec2 v_texCoord;
			out vec4 fragColor;

			// This function determines the value for a single byte in the YUV stream
			float getByteValue(float byteOffset) {
				float width = u_resolution.x;
				float height = u_resolution.y;

				float yPlaneSize = width * height;

				if (byteOffset < yPlaneSize) {
					// This byte is in the luma plane. Find the corresponding pixel coordinates to sample from
					float y = floor(byteOffset / width);
					float x = mod(byteOffset, width);
					
					// Add 0.5 to sample the center of the texel
					vec2 sampleCoord = (vec2(x, y) + 0.5) / u_resolution;
					
					// The luma value is the alpha from the source texture
					return texture(u_sourceTexture, sampleCoord).a;
				} else {
					// Write a fixed value for chroma and beyond
					return 128.0 / 255.0;
				}
			}
			
			void main() {
				// Each fragment writes 4 bytes (R, G, B, A)
				float pixelIndex = floor(gl_FragCoord.y) * u_resolution.x + floor(gl_FragCoord.x);
				float baseByteOffset = pixelIndex * 4.0;

				vec4 result;
				for (int i = 0; i < 4; i++) {
					float currentByteOffset = baseByteOffset + float(i);
					result[i] = getByteValue(currentByteOffset);
				}
				
				fragColor = result;
			}
		`),n=this.gl.createProgram();return this.gl.attachShader(n,t),this.gl.attachShader(n,r),this.gl.linkProgram(n),n}createShader(t,r){const n=this.gl.createShader(t);return this.gl.shaderSource(n,r),this.gl.compileShader(n),this.gl.getShaderParameter(n,this.gl.COMPILE_STATUS)||console.error("Shader compile error:",this.gl.getShaderInfoLog(n)),n}createVAO(){const t=this.gl.createVertexArray();this.gl.bindVertexArray(t);const r=new Float32Array([-1,-1,0,1,1,-1,1,1,-1,1,0,0,1,1,1,0]),n=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,n),this.gl.bufferData(this.gl.ARRAY_BUFFER,r,this.gl.STATIC_DRAW);const i=this.gl.getAttribLocation(this.colorProgram,"a_position"),s=this.gl.getAttribLocation(this.colorProgram,"a_texCoord");return this.gl.enableVertexAttribArray(i),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,16,0),this.gl.enableVertexAttribArray(s),this.gl.vertexAttribPointer(s,2,this.gl.FLOAT,!1,16,8),t}createTexture(){const t=this.gl.createTexture();return this.gl.bindTexture(this.gl.TEXTURE_2D,t),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),t}updateTexture(t){this.lastFrame!==t&&((t.displayWidth!==this.canvas.width||t.displayHeight!==this.canvas.height)&&(this.canvas.width=t.displayWidth,this.canvas.height=t.displayHeight),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,t),this.lastFrame=t)}extractColor(t){return this.updateTexture(t),this.gl.useProgram(this.colorProgram),this.gl.viewport(0,0,this.canvas.width,this.canvas.height),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.bindVertexArray(this.vao),this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),new VideoFrame(this.canvas,{timestamp:t.timestamp,duration:t.duration??void 0,alpha:"discard"})}extractAlpha(t){this.updateTexture(t),this.gl.useProgram(this.alphaProgram),this.gl.uniform2f(this.alphaResolutionLocation,this.canvas.width,this.canvas.height),this.gl.viewport(0,0,this.canvas.width,this.canvas.height),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.bindVertexArray(this.vao),this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4);const{width:r,height:n}=this.canvas,i=Math.ceil(r/2)*Math.ceil(n/2),s=r*n+i*2,o=Math.ceil(s/(r*4));let a=new Uint8Array(4*r*o);this.gl.readPixels(0,0,r,o,this.gl.RGBA,this.gl.UNSIGNED_BYTE,a),a=a.subarray(0,s),P(a[r*n]===128),P(a[a.length-1]===128);const c={format:"I420",codedWidth:r,codedHeight:n,timestamp:t.timestamp,duration:t.duration??void 0,transfer:[a.buffer]};return new VideoFrame(a,c)}close(){this.gl.getExtension("WEBGL_lose_context")?.loseContext(),this.gl=null}}class s0 extends da{constructor(t,r){if(!(typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement)&&!(typeof OffscreenCanvas<"u"&&t instanceof OffscreenCanvas))throw new TypeError("canvas must be an HTMLCanvasElement or OffscreenCanvas.");e0(r),super(r.codec),this._encoder=new n0(this,r),this._canvas=t}add(t,r=0,n){if(!Number.isFinite(t)||t<0)throw new TypeError("timestamp must be a non-negative number.");if(!Number.isFinite(r)||r<0)throw new TypeError("duration must be a non-negative number.");const i=new je(this._canvas,{timestamp:t,duration:r});return this._encoder.add(i,!0,n)}_flushAndClose(t){return this._encoder.flushAndClose(t)}}class o0 extends li{constructor(t){if(super(),this._connectedTrack=null,!Dr.includes(t))throw new TypeError(`Invalid audio codec '${t}'. Must be one of: ${Dr.join(", ")}.`);this._codec=t}}class a0 extends li{constructor(t){if(super(),this._connectedTrack=null,!Lr.includes(t))throw new TypeError(`Invalid subtitle codec '${t}'. Must be one of: ${Lr.join(", ")}.`);this._codec=t}}const c0=["video","audio","subtitle"],yn=e=>{if(!e||typeof e!="object")throw new TypeError("metadata must be an object.");if(e.languageCode!==void 0&&!qh(e.languageCode))throw new TypeError("metadata.languageCode, when provided, must be a three-letter, ISO 639-2/T language code.");if(e.name!==void 0&&typeof e.name!="string")throw new TypeError("metadata.name, when provided, must be a string.");if(e.disposition!==void 0&&tm(e.disposition),e.maximumPacketCount!==void 0&&(!Number.isInteger(e.maximumPacketCount)||e.maximumPacketCount<0))throw new TypeError("metadata.maximumPacketCount, when provided, must be a non-negative integer.")};class u0{constructor(t){if(this.state="pending",this._tracks=[],this._startPromise=null,this._cancelPromise=null,this._finalizePromise=null,this._mutex=new Lo,this._metadataTags={},!t||typeof t!="object")throw new TypeError("options must be an object.");if(!(t.format instanceof oa))throw new TypeError("options.format must be an OutputFormat.");if(!(t.target instanceof ia))throw new TypeError("options.target must be a Target.");if(t.target._output)throw new Error("Target is already used for another output.");t.target._output=this,this.format=t.format,this.target=t.target,this._writer=t.target._createWriter(),this._muxer=t.format._createMuxer(this)}addVideoTrack(t,r={}){if(!(t instanceof da))throw new TypeError("source must be a VideoSource.");if(yn(r),r.rotation!==void 0&&![0,90,180,270].includes(r.rotation))throw new TypeError(`Invalid video rotation: ${r.rotation}. Has to be 0, 90, 180 or 270.`);if(!this.format.supportsVideoRotationMetadata&&r.rotation)throw new Error(`${this.format._name} does not support video rotation metadata.`);if(r.frameRate!==void 0&&(!Number.isFinite(r.frameRate)||r.frameRate<=0))throw new TypeError(`Invalid video frame rate: ${r.frameRate}. Must be a positive number.`);this._addTrack("video",t,r)}addAudioTrack(t,r={}){if(!(t instanceof o0))throw new TypeError("source must be an AudioSource.");yn(r),this._addTrack("audio",t,r)}addSubtitleTrack(t,r={}){if(!(t instanceof a0))throw new TypeError("source must be a SubtitleSource.");yn(r),this._addTrack("subtitle",t,r)}setMetadataTags(t){if(em(t),this.state!=="pending")throw new Error("Cannot set metadata tags after output has been started or canceled.");this._metadataTags=t}_addTrack(t,r,n){if(this.state!=="pending")throw new Error("Cannot add track after output has been started or canceled.");if(r._connectedTrack)throw new Error("Source is already used for a track.");const i=this.format.getSupportedTrackCounts(),s=this._tracks.reduce((u,l)=>u+(l.type===t?1:0),0),o=i[t].max;if(s===o)throw new Error(o===0?`${this.format._name} does not support ${t} tracks.`:`${this.format._name} does not support more than ${o} ${t} track${o===1?"":"s"}.`);const a=i.total.max;if(this._tracks.length===a)throw new Error(`${this.format._name} does not support more than ${a} tracks${a===1?"":"s"} in total.`);const c={id:this._tracks.length+1,output:this,type:t,source:r,metadata:n};if(c.type==="video"){const u=this.format.getSupportedVideoCodecs();if(u.length===0)throw new Error(`${this.format._name} does not support video tracks.`+this.format._codecUnsupportedHint(c.source._codec));if(!u.includes(c.source._codec))throw new Error(`Codec '${c.source._codec}' cannot be contained within ${this.format._name}. Supported video codecs are: ${u.map(l=>`'${l}'`).join(", ")}.`+this.format._codecUnsupportedHint(c.source._codec))}else if(c.type==="audio"){const u=this.format.getSupportedAudioCodecs();if(u.length===0)throw new Error(`${this.format._name} does not support audio tracks.`+this.format._codecUnsupportedHint(c.source._codec));if(!u.includes(c.source._codec))throw new Error(`Codec '${c.source._codec}' cannot be contained within ${this.format._name}. Supported audio codecs are: ${u.map(l=>`'${l}'`).join(", ")}.`+this.format._codecUnsupportedHint(c.source._codec))}else if(c.type==="subtitle"){const u=this.format.getSupportedSubtitleCodecs();if(u.length===0)throw new Error(`${this.format._name} does not support subtitle tracks.`+this.format._codecUnsupportedHint(c.source._codec));if(!u.includes(c.source._codec))throw new Error(`Codec '${c.source._codec}' cannot be contained within ${this.format._name}. Supported subtitle codecs are: ${u.map(l=>`'${l}'`).join(", ")}.`+this.format._codecUnsupportedHint(c.source._codec))}this._tracks.push(c),r._connectedTrack=c}async start(){const t=this.format.getSupportedTrackCounts();for(const n of c0){const i=this._tracks.reduce((o,a)=>o+(a.type===n?1:0),0),s=t[n].min;if(i<s)throw new Error(s===t[n].max?`${this.format._name} requires exactly ${s} ${n} track${s===1?"":"s"}.`:`${this.format._name} requires at least ${s} ${n} track${s===1?"":"s"}.`)}const r=t.total.min;if(this._tracks.length<r)throw new Error(r===t.total.max?`${this.format._name} requires exactly ${r} track${r===1?"":"s"}.`:`${this.format._name} requires at least ${r} track${r===1?"":"s"}.`);if(this.state==="canceled")throw new Error("Output has been canceled.");return this._startPromise?(console.warn("Output has already been started."),this._startPromise):this._startPromise=(async()=>{this.state="started",this._writer.start();const n=await this._mutex.acquire();await this._muxer.start();const i=this._tracks.map(s=>s.source._start());await Promise.all(i),n()})()}getMimeType(){return this._muxer.getMimeType()}async cancel(){if(this._cancelPromise)return console.warn("Output has already been canceled."),this._cancelPromise;if(this.state==="finalizing"||this.state==="finalized"){console.warn("Output has already been finalized.");return}return this._cancelPromise=(async()=>{this.state="canceled";const t=await this._mutex.acquire(),r=this._tracks.map(n=>n.source._flushOrWaitForOngoingClose(!0));await Promise.all(r),await this._writer.close(),t()})()}async finalize(){if(this.state==="pending")throw new Error("Cannot finalize before starting.");if(this.state==="canceled")throw new Error("Cannot finalize after canceling.");return this._finalizePromise?(console.warn("Output has already been finalized."),this._finalizePromise):this._finalizePromise=(async()=>{this.state="finalizing";const t=await this._mutex.acquire(),r=this._tracks.map(n=>n.source._flushOrWaitForOngoingClose(!1));await Promise.all(r),await this._muxer.finalize(),await this._writer.flush(),await this._writer.finalize(),this.state="finalized",t()})()}}function fa(e,t,r){const n=window.devicePixelRatio||1;e.style.width=`${t/n}px`,e.style.height=`${r/n}px`,e.width=t,e.height=r}function l0(e,t,r){for(const n of e.query([Y,Ve]))if(Ve.from[n]===t&&Ve.to[n]===r)return n;return null}async function d0(e,t,r,n,i){Y.state[r]=fe.IDLE,Y.elapsed[r]=0;for(const f of t.query([J(le.relation,r),O]))O.state[f]=he.IDLE,O.elapsed[f]=0;Y.state[r]=fe.PLAYING,t.step(0);let s=0;for(const f of t.query([J(le.relation,r),O])){const h=(O.delay[f]??0)+(O.duration[f]??0);s=Math.max(s,h)}const o=s+.5,a=Math.ceil(o*n.fps),c=new u0({format:new ca({fastStart:"in-memory"}),target:new sa}),u=new s0(e,{codec:"avc",bitrate:n.bitrate});c.addVideoTrack(u,{frameRate:n.fps}),await c.start();const l=1/n.fps;for(let f=0;f<a;f++){fa(e,n.width,n.height),t.step(l);const h=f/n.fps;await u.add(h,l),f%30===0&&(i?.(f,a),await new Promise(d=>setTimeout(d,0)))}await c.finalize(),Y.state[r]=fe.COMPLETE;for(const f of t.query([J(le.relation,r),O]))O.state[f]=he.COMPLETE;return new Blob([c.target.buffer],{type:"video/mp4"})}function f0(e,t){e.__recordSequence__=async(r,n)=>{const i=l0(t,r.fromStep,r.toStep);if(i===null)return null;const s=e.width,o=e.height,a=e.style.cssText;e.__paused__=!0,fa(e,r.width,r.height),await new Promise(u=>requestAnimationFrame(u));const c=await d0(e,t,i,r,n);return e.width=s,e.height=o,e.style.cssText=a,e.__paused__=!1,c}}function x0(e){const t=e.getBoundingClientRect();e.width=t.width*window.devicePixelRatio,e.height=t.height*window.devicePixelRatio}function h0(e,t,r){const n=t??He.from(e)?.element;let i=!1,s=performance.now();function o(a){if(!i)return;const c=(a-s)/1e3;s=a,n?.__paused__||e.step(c),requestAnimationFrame(o)}new IntersectionObserver(([a])=>{a.isIntersecting?i||(i=!0,s=performance.now(),requestAnimationFrame(o)):i=!1}).observe(document.documentElement)}function _0(e){e.addEventListener("wheel",t=>{window.parent.postMessage({type:"iframe-scroll",deltaY:t.deltaY},"*")},{passive:!0})}function C0(e,t,r,n){e.__state__=t,f0(e,t);const i=r?$h(e,t,r,n):()=>{};h0(t,e);const s=()=>{window.parent.postMessage({type:"iframe-resize",height:document.body.scrollHeight},"*")};return s(),window.addEventListener("resize",s),i}export{b0 as A,le as C,Qs as I,Gf as L,Ct as M,y0 as O,Be as P,Yr as R,Wt as S,dl as T,_0 as a,w0 as b,p0 as c,v0 as d,zo as e,ge as f,C0 as g,J as h,$ as i,z as j,Tt as k,Rs as l,g0 as m,fo as n,I as o,er as p,ve as q,Ie as r,x0 as s,rr as t,Qn as u,jn as v,Vt as w};
//# sourceMappingURL=canvas-setup-FxFxhnX5.js.map
