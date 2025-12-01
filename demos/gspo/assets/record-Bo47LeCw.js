import{i as ot,c as ut,S as dt,I as lt,T as ht,a as ct,M as mt,b as ft,P as gt,N as pt}from"./stage-animation-DvalZTor.js";var Be=(e,t,n)=>{if(!t.has(e))throw TypeError("Cannot "+n)},a=(e,t,n)=>(Be(e,t,"read from private field"),n?n.call(e):t.get(e)),c=(e,t,n)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,n)},C=(e,t,n,i)=>(Be(e,t,"write to private field"),t.set(e,n),n),wt=(e,t,n,i)=>({set _(r){C(e,t,r)},get _(){return a(e,t,i)}}),f=(e,t,n)=>(Be(e,t,"access private method"),n),g=new Uint8Array(8),O=new DataView(g.buffer),b=e=>[(e%256+256)%256],p=e=>(O.setUint16(0,e,!1),[g[0],g[1]]),vt=e=>(O.setInt16(0,e,!1),[g[0],g[1]]),Ve=e=>(O.setUint32(0,e,!1),[g[1],g[2],g[3]]),o=e=>(O.setUint32(0,e,!1),[g[0],g[1],g[2],g[3]]),yt=e=>(O.setInt32(0,e,!1),[g[0],g[1],g[2],g[3]]),V=e=>(O.setUint32(0,Math.floor(e/2**32),!1),O.setUint32(4,e,!1),[g[0],g[1],g[2],g[3],g[4],g[5],g[6],g[7]]),Ae=e=>(O.setInt16(0,2**8*e,!1),[g[0],g[1]]),B=e=>(O.setInt32(0,2**16*e,!1),[g[0],g[1],g[2],g[3]]),be=e=>(O.setInt32(0,2**30*e,!1),[g[0],g[1],g[2],g[3]]),z=(e,t=!1)=>{let n=Array(e.length).fill(null).map((i,r)=>e.charCodeAt(r));return t&&n.push(0),n},me=e=>e&&e[e.length-1],Oe=e=>{let t;for(let n of e)(!t||n.presentationTimestamp>t.presentationTimestamp)&&(t=n);return t},A=(e,t,n=!0)=>{let i=e*t;return n?Math.round(i):i},je=e=>{let t=e*(Math.PI/180),n=Math.cos(t),i=Math.sin(t);return[n,i,0,-i,n,0,0,0,1]},$e=je(0),He=e=>[B(e[0]),B(e[1]),be(e[2]),B(e[3]),B(e[4]),be(e[5]),B(e[6]),B(e[7]),be(e[8])],ee=e=>!e||typeof e!="object"?e:Array.isArray(e)?e.map(ee):Object.fromEntries(Object.entries(e).map(([t,n])=>[t,ee(n)])),X=e=>e>=0&&e<2**32,y=(e,t,n)=>({type:e,contents:t&&new Uint8Array(t.flat(10)),children:n}),v=(e,t,n,i,r)=>y(e,[b(t),Ve(n),i??[]],r),bt=e=>{let t=512;return e.fragmented?y("ftyp",[z("iso5"),o(t),z("iso5"),z("iso6"),z("mp41")]):y("ftyp",[z("isom"),o(t),z("isom"),e.holdsAvc?z("avc1"):[],z("mp41")])},Ce=e=>({type:"mdat",largeSize:e}),St=e=>({type:"free",size:e}),ue=(e,t,n=!1)=>y("moov",null,[Ct(t,e),...e.map(i=>Tt(i,t)),n?en(e):null]),Ct=(e,t)=>{let n=A(Math.max(0,...t.filter(u=>u.samples.length>0).map(u=>{const d=Oe(u.samples);return d.presentationTimestamp+d.duration})),ke),i=Math.max(...t.map(u=>u.id))+1,r=!X(e)||!X(n),s=r?V:o;return v("mvhd",+r,0,[s(e),s(e),o(ke),s(n),B(1),Ae(1),Array(10).fill(0),He($e),Array(24).fill(0),o(i)])},Tt=(e,t)=>y("trak",null,[xt(e,t),kt(e,t)]),xt=(e,t)=>{let n=Oe(e.samples),i=A(n?n.presentationTimestamp+n.duration:0,ke),r=!X(t)||!X(i),s=r?V:o,u;return e.info.type==="video"?u=typeof e.info.rotation=="number"?je(e.info.rotation):e.info.rotation:u=$e,v("tkhd",+r,3,[s(t),s(t),o(e.id),o(0),s(i),Array(8).fill(0),p(0),p(0),Ae(e.info.type==="audio"?1:0),p(0),He(u),B(e.info.type==="video"?e.info.width:0),B(e.info.type==="video"?e.info.height:0)])},kt=(e,t)=>y("mdia",null,[Et(e,t),_t(e.info.type==="video"?"vide":"soun"),zt(e)]),Et=(e,t)=>{let n=Oe(e.samples),i=A(n?n.presentationTimestamp+n.duration:0,e.timescale),r=!X(t)||!X(i),s=r?V:o;return v("mdhd",+r,0,[s(t),s(t),o(e.timescale),s(i),p(21956),p(0)])},_t=e=>v("hdlr",0,0,[z("mhlr"),z(e),o(0),o(0),o(0),z("mp4-muxer-hdlr",!0)]),zt=e=>y("minf",null,[e.info.type==="video"?qt():It(),Bt(),Mt(e)]),qt=()=>v("vmhd",0,1,[p(0),p(0),p(0),p(0)]),It=()=>v("smhd",0,0,[p(0),p(0)]),Bt=()=>y("dinf",null,[At()]),At=()=>v("dref",0,0,[o(1)],[Ot()]),Ot=()=>v("url ",0,1),Mt=e=>{const t=e.compositionTimeOffsetTable.length>1||e.compositionTimeOffsetTable.some(n=>n.sampleCompositionTimeOffset!==0);return y("stbl",null,[Dt(e),Xt(e),Qt(e),Zt(e),Kt(e),Yt(e),t?Jt(e):null])},Dt=e=>v("stsd",0,0,[o(1)],[e.info.type==="video"?Ut(hn[e.info.codec],e):$t(mn[e.info.codec],e)]),Ut=(e,t)=>y(e,[Array(6).fill(0),p(1),p(0),p(0),Array(12).fill(0),p(t.info.width),p(t.info.height),o(4718592),o(4718592),o(0),p(1),Array(32).fill(0),p(24),vt(65535)],[cn[t.info.codec](t),t.info.decoderConfig.colorSpace?Wt(t):null]),Rt={bt709:1,bt470bg:5,smpte170m:6},Ft={bt709:1,smpte170m:6,"iec61966-2-1":13},Nt={rgb:0,bt709:1,bt470bg:5,smpte170m:6},Wt=e=>y("colr",[z("nclx"),p(Rt[e.info.decoderConfig.colorSpace.primaries]),p(Ft[e.info.decoderConfig.colorSpace.transfer]),p(Nt[e.info.decoderConfig.colorSpace.matrix]),b((e.info.decoderConfig.colorSpace.fullRange?1:0)<<7)]),Lt=e=>e.info.decoderConfig&&y("avcC",[...new Uint8Array(e.info.decoderConfig.description)]),Pt=e=>e.info.decoderConfig&&y("hvcC",[...new Uint8Array(e.info.decoderConfig.description)]),Vt=e=>{if(!e.info.decoderConfig)return null;let t=e.info.decoderConfig;if(!t.colorSpace)throw new Error("'colorSpace' is required in the decoder config for VP9.");let n=t.codec.split("."),i=Number(n[1]),r=Number(n[2]),d=(Number(n[3])<<4)+(0<<1)+Number(t.colorSpace.fullRange);return v("vpcC",1,0,[b(i),b(r),b(d),b(2),b(2),b(2),p(0)])},jt=()=>{let n=(1<<7)+1;return y("av1C",[n,0,0,0])},$t=(e,t)=>y(e,[Array(6).fill(0),p(1),p(0),p(0),o(0),p(t.info.numberOfChannels),p(16),p(0),p(0),B(t.info.sampleRate)],[fn[t.info.codec](t)]),Ht=e=>{let t=new Uint8Array(e.info.decoderConfig.description);return v("esds",0,0,[o(58753152),b(32+t.byteLength),p(1),b(0),o(75530368),b(18+t.byteLength),b(64),b(21),Ve(0),o(130071),o(130071),o(92307584),b(t.byteLength),...t,o(109084800),b(1),b(2)])},Gt=e=>{let t=3840,n=0;const i=e.info.decoderConfig?.description;if(i){if(i.byteLength<18)throw new TypeError("Invalid decoder description provided for Opus; must be at least 18 bytes long.");const r=ArrayBuffer.isView(i)?new DataView(i.buffer,i.byteOffset,i.byteLength):new DataView(i);t=r.getUint16(10,!0),n=r.getInt16(14,!0)}return y("dOps",[b(0),b(e.info.numberOfChannels),p(t),o(e.info.sampleRate),Ae(n),b(0)])},Xt=e=>v("stts",0,0,[o(e.timeToSampleTable.length),e.timeToSampleTable.map(t=>[o(t.sampleCount),o(t.sampleDelta)])]),Qt=e=>{if(e.samples.every(n=>n.type==="key"))return null;let t=[...e.samples.entries()].filter(([,n])=>n.type==="key");return v("stss",0,0,[o(t.length),t.map(([n])=>o(n+1))])},Zt=e=>v("stsc",0,0,[o(e.compactlyCodedChunkTable.length),e.compactlyCodedChunkTable.map(t=>[o(t.firstChunk),o(t.samplesPerChunk),o(1)])]),Kt=e=>v("stsz",0,0,[o(0),o(e.samples.length),e.samples.map(t=>o(t.size))]),Yt=e=>e.finalizedChunks.length>0&&me(e.finalizedChunks).offset>=2**32?v("co64",0,0,[o(e.finalizedChunks.length),e.finalizedChunks.map(t=>V(t.offset))]):v("stco",0,0,[o(e.finalizedChunks.length),e.finalizedChunks.map(t=>o(t.offset))]),Jt=e=>v("ctts",0,0,[o(e.compositionTimeOffsetTable.length),e.compositionTimeOffsetTable.map(t=>[o(t.sampleCount),o(t.sampleCompositionTimeOffset)])]),en=e=>y("mvex",null,e.map(tn)),tn=e=>v("trex",0,0,[o(e.id),o(1),o(0),o(0),o(0)]),Pe=(e,t)=>y("moof",null,[nn(e),...t.map(an)]),nn=e=>v("mfhd",0,0,[o(e)]),Ge=e=>{let t=0,n=0,i=0,r=0,s=e.type==="delta";return n|=+s,s?t|=1:t|=2,t<<24|n<<16|i<<8|r},an=e=>y("traf",null,[rn(e),sn(e),on(e)]),rn=e=>{let t=0;t|=8,t|=16,t|=32,t|=131072;let n=e.currentChunk.samples[1]??e.currentChunk.samples[0],i={duration:n.timescaleUnitsToNextSample,size:n.size,flags:Ge(n)};return v("tfhd",0,t,[o(e.id),o(i.duration),o(i.size),o(i.flags)])},sn=e=>v("tfdt",1,0,[V(A(e.currentChunk.startTimestamp,e.timescale))]),on=e=>{let t=e.currentChunk.samples.map(k=>k.timescaleUnitsToNextSample),n=e.currentChunk.samples.map(k=>k.size),i=e.currentChunk.samples.map(Ge),r=e.currentChunk.samples.map(k=>A(k.presentationTimestamp-k.decodeTimestamp,e.timescale)),s=new Set(t),u=new Set(n),d=new Set(i),m=new Set(r),w=d.size===2&&i[0]!==i[1],x=s.size>1,q=u.size>1,Z=!w&&d.size>1,oe=m.size>1||[...m].some(k=>k!==0),M=0;return M|=1,M|=4*+w,M|=256*+x,M|=512*+q,M|=1024*+Z,M|=2048*+oe,v("trun",1,M,[o(e.currentChunk.samples.length),o(e.currentChunk.offset-e.currentChunk.moofOffset||0),w?o(i[0]):[],e.currentChunk.samples.map((k,j)=>[x?o(t[j]):[],q?o(n[j]):[],Z?o(i[j]):[],oe?yt(r[j]):[]])])},un=e=>y("mfra",null,[...e.map(dn),ln()]),dn=(e,t)=>v("tfra",1,0,[o(e.id),o(63),o(e.finalizedChunks.length),e.finalizedChunks.map(i=>[V(A(i.startTimestamp,e.timescale)),V(i.moofOffset),o(t+1),o(1),o(1)])]),ln=()=>v("mfro",0,0,[o(0)]),hn={avc:"avc1",hevc:"hvc1",vp9:"vp09",av1:"av01"},cn={avc:Lt,hevc:Pt,vp9:Vt,av1:jt},mn={aac:"mp4a",opus:"Opus"},fn={aac:Ht,opus:Gt},ye=class{},Xe=class extends ye{constructor(){super(...arguments),this.buffer=null}},Qe=class extends ye{constructor(e){if(super(),this.options=e,typeof e!="object")throw new TypeError("StreamTarget requires an options object to be passed to its constructor.");if(e.onData){if(typeof e.onData!="function")throw new TypeError("options.onData, when provided, must be a function.");if(e.onData.length<2)throw new TypeError("options.onData, when provided, must be a function that takes in at least two arguments (data and position). Ignoring the position argument, which specifies the byte offset at which the data is to be written, can lead to broken outputs.")}if(e.chunked!==void 0&&typeof e.chunked!="boolean")throw new TypeError("options.chunked, when provided, must be a boolean.");if(e.chunkSize!==void 0&&(!Number.isInteger(e.chunkSize)||e.chunkSize<1024))throw new TypeError("options.chunkSize, when provided, must be an integer and not smaller than 1024.")}},gn=class extends ye{constructor(e,t){if(super(),this.stream=e,this.options=t,!(e instanceof FileSystemWritableFileStream))throw new TypeError("FileSystemWritableFileStreamTarget requires a FileSystemWritableFileStream instance.");if(t!==void 0&&typeof t!="object")throw new TypeError("FileSystemWritableFileStreamTarget's options, when provided, must be an object.");if(t&&t.chunkSize!==void 0&&(!Number.isInteger(t.chunkSize)||t.chunkSize<=0))throw new TypeError("options.chunkSize, when provided, must be a positive integer")}},F,$,Ze=class{constructor(){this.pos=0,c(this,F,new Uint8Array(8)),c(this,$,new DataView(a(this,F).buffer)),this.offsets=new WeakMap}seek(e){this.pos=e}writeU32(e){a(this,$).setUint32(0,e,!1),this.write(a(this,F).subarray(0,4))}writeU64(e){a(this,$).setUint32(0,Math.floor(e/2**32),!1),a(this,$).setUint32(4,e,!1),this.write(a(this,F).subarray(0,8))}writeAscii(e){for(let t=0;t<e.length;t++)a(this,$).setUint8(t%8,e.charCodeAt(t)),t%8===7&&this.write(a(this,F));e.length%8!==0&&this.write(a(this,F).subarray(0,e.length%8))}writeBox(e){if(this.offsets.set(e,this.pos),e.contents&&!e.children)this.writeBoxHeader(e,e.size??e.contents.byteLength+8),this.write(e.contents);else{let t=this.pos;if(this.writeBoxHeader(e,0),e.contents&&this.write(e.contents),e.children)for(let r of e.children)r&&this.writeBox(r);let n=this.pos,i=e.size??n-t;this.seek(t),this.writeBoxHeader(e,i),this.seek(n)}}writeBoxHeader(e,t){this.writeU32(e.largeSize?1:t),this.writeAscii(e.type),e.largeSize&&this.writeU64(t)}measureBoxHeader(e){return 8+(e.largeSize?8:0)}patchBox(e){let t=this.pos;this.seek(this.offsets.get(e)),this.writeBox(e),this.seek(t)}measureBox(e){if(e.contents&&!e.children)return this.measureBoxHeader(e)+e.contents.byteLength;{let t=this.measureBoxHeader(e);if(e.contents&&(t+=e.contents.byteLength),e.children)for(let n of e.children)n&&(t+=this.measureBox(n));return t}}};F=new WeakMap;$=new WeakMap;var de,P,re,Y,le,Te,pn=class extends Ze{constructor(e){super(),c(this,le),c(this,de,void 0),c(this,P,new ArrayBuffer(2**16)),c(this,re,new Uint8Array(a(this,P))),c(this,Y,0),C(this,de,e)}write(e){f(this,le,Te).call(this,this.pos+e.byteLength),a(this,re).set(e,this.pos),this.pos+=e.byteLength,C(this,Y,Math.max(a(this,Y),this.pos))}finalize(){f(this,le,Te).call(this,this.pos),a(this,de).buffer=a(this,P).slice(0,Math.max(a(this,Y),this.pos))}};de=new WeakMap;P=new WeakMap;re=new WeakMap;Y=new WeakMap;le=new WeakSet;Te=function(e){let t=a(this,P).byteLength;for(;t<e;)t*=2;if(t===a(this,P).byteLength)return;let n=new ArrayBuffer(t),i=new Uint8Array(n);i.set(a(this,re),0),C(this,P,n),C(this,re,i)};var wn=2**24,vn=2,te,N,J,U,_,fe,xe,Me,Ke,De,Ye,ne,ge,Ue=class extends Ze{constructor(e){super(),c(this,fe),c(this,Me),c(this,De),c(this,ne),c(this,te,void 0),c(this,N,[]),c(this,J,void 0),c(this,U,void 0),c(this,_,[]),C(this,te,e),C(this,J,e.options?.chunked??!1),C(this,U,e.options?.chunkSize??wn)}write(e){a(this,N).push({data:e.slice(),start:this.pos}),this.pos+=e.byteLength}flush(){if(a(this,N).length===0)return;let e=[],t=[...a(this,N)].sort((n,i)=>n.start-i.start);e.push({start:t[0].start,size:t[0].data.byteLength});for(let n=1;n<t.length;n++){let i=e[e.length-1],r=t[n];r.start<=i.start+i.size?i.size=Math.max(i.size,r.start+r.data.byteLength-i.start):e.push({start:r.start,size:r.data.byteLength})}for(let n of e){n.data=new Uint8Array(n.size);for(let i of a(this,N))n.start<=i.start&&i.start<n.start+n.size&&n.data.set(i.data,i.start-n.start);a(this,J)?(f(this,fe,xe).call(this,n.data,n.start),f(this,ne,ge).call(this)):a(this,te).options.onData?.(n.data,n.start)}a(this,N).length=0}finalize(){a(this,J)&&f(this,ne,ge).call(this,!0)}};te=new WeakMap;N=new WeakMap;J=new WeakMap;U=new WeakMap;_=new WeakMap;fe=new WeakSet;xe=function(e,t){let n=a(this,_).findIndex(d=>d.start<=t&&t<d.start+a(this,U));n===-1&&(n=f(this,De,Ye).call(this,t));let i=a(this,_)[n],r=t-i.start,s=e.subarray(0,Math.min(a(this,U)-r,e.byteLength));i.data.set(s,r);let u={start:r,end:r+s.byteLength};if(f(this,Me,Ke).call(this,i,u),i.written[0].start===0&&i.written[0].end===a(this,U)&&(i.shouldFlush=!0),a(this,_).length>vn){for(let d=0;d<a(this,_).length-1;d++)a(this,_)[d].shouldFlush=!0;f(this,ne,ge).call(this)}s.byteLength<e.byteLength&&f(this,fe,xe).call(this,e.subarray(s.byteLength),t+s.byteLength)};Me=new WeakSet;Ke=function(e,t){let n=0,i=e.written.length-1,r=-1;for(;n<=i;){let s=Math.floor(n+(i-n+1)/2);e.written[s].start<=t.start?(n=s+1,r=s):i=s-1}for(e.written.splice(r+1,0,t),(r===-1||e.written[r].end<t.start)&&r++;r<e.written.length-1&&e.written[r].end>=e.written[r+1].start;)e.written[r].end=Math.max(e.written[r].end,e.written[r+1].end),e.written.splice(r+1,1)};De=new WeakSet;Ye=function(e){let n={start:Math.floor(e/a(this,U))*a(this,U),data:new Uint8Array(a(this,U)),written:[],shouldFlush:!1};return a(this,_).push(n),a(this,_).sort((i,r)=>i.start-r.start),a(this,_).indexOf(n)};ne=new WeakSet;ge=function(e=!1){for(let t=0;t<a(this,_).length;t++){let n=a(this,_)[t];if(!(!n.shouldFlush&&!e)){for(let i of n.written)a(this,te).options.onData?.(n.data.subarray(i.start,i.end),n.start+i.start);a(this,_).splice(t--,1)}}};var yn=class extends Ue{constructor(e){super(new Qe({onData:(t,n)=>e.stream.write({type:"write",data:t,position:n}),chunked:!0,chunkSize:e.options?.chunkSize}))}},ke=1e3,bn=["avc","hevc","vp9","av1"],Sn=["aac","opus"],Cn=2082844800,Tn=["strict","offset","cross-track-offset"],l,h,pe,E,T,S,H,G,Re,W,L,ae,Ee,Je,_e,et,Fe,tt,ze,nt,Ne,at,he,qe,I,D,We,it,ie,we,ve,Le,Q,se,ce,Ie,xn=class{constructor(e){if(c(this,Ee),c(this,_e),c(this,Fe),c(this,ze),c(this,Ne),c(this,he),c(this,I),c(this,We),c(this,ie),c(this,ve),c(this,Q),c(this,ce),c(this,l,void 0),c(this,h,void 0),c(this,pe,void 0),c(this,E,void 0),c(this,T,null),c(this,S,null),c(this,H,Math.floor(Date.now()/1e3)+Cn),c(this,G,[]),c(this,Re,1),c(this,W,[]),c(this,L,[]),c(this,ae,!1),f(this,Ee,Je).call(this,e),e.video=ee(e.video),e.audio=ee(e.audio),e.fastStart=ee(e.fastStart),this.target=e.target,C(this,l,{firstTimestampBehavior:"strict",...e}),e.target instanceof Xe)C(this,h,new pn(e.target));else if(e.target instanceof Qe)C(this,h,new Ue(e.target));else if(e.target instanceof gn)C(this,h,new yn(e.target));else throw new Error(`Invalid target: ${e.target}`);f(this,ze,nt).call(this),f(this,_e,et).call(this)}addVideoChunk(e,t,n,i){if(!(e instanceof EncodedVideoChunk))throw new TypeError("addVideoChunk's first argument (sample) must be of type EncodedVideoChunk.");if(t&&typeof t!="object")throw new TypeError("addVideoChunk's second argument (meta), when provided, must be an object.");if(n!==void 0&&(!Number.isFinite(n)||n<0))throw new TypeError("addVideoChunk's third argument (timestamp), when provided, must be a non-negative real number.");if(i!==void 0&&!Number.isFinite(i))throw new TypeError("addVideoChunk's fourth argument (compositionTimeOffset), when provided, must be a real number.");let r=new Uint8Array(e.byteLength);e.copyTo(r),this.addVideoChunkRaw(r,e.type,n??e.timestamp,e.duration,t,i)}addVideoChunkRaw(e,t,n,i,r,s){if(!(e instanceof Uint8Array))throw new TypeError("addVideoChunkRaw's first argument (data) must be an instance of Uint8Array.");if(t!=="key"&&t!=="delta")throw new TypeError("addVideoChunkRaw's second argument (type) must be either 'key' or 'delta'.");if(!Number.isFinite(n)||n<0)throw new TypeError("addVideoChunkRaw's third argument (timestamp) must be a non-negative real number.");if(!Number.isFinite(i)||i<0)throw new TypeError("addVideoChunkRaw's fourth argument (duration) must be a non-negative real number.");if(r&&typeof r!="object")throw new TypeError("addVideoChunkRaw's fifth argument (meta), when provided, must be an object.");if(s!==void 0&&!Number.isFinite(s))throw new TypeError("addVideoChunkRaw's sixth argument (compositionTimeOffset), when provided, must be a real number.");if(f(this,ce,Ie).call(this),!a(this,l).video)throw new Error("No video track declared.");if(typeof a(this,l).fastStart=="object"&&a(this,T).samples.length===a(this,l).fastStart.expectedVideoChunks)throw new Error(`Cannot add more video chunks than specified in 'fastStart' (${a(this,l).fastStart.expectedVideoChunks}).`);let u=f(this,he,qe).call(this,a(this,T),e,t,n,i,r,s);if(a(this,l).fastStart==="fragmented"&&a(this,S)){for(;a(this,L).length>0&&a(this,L)[0].decodeTimestamp<=u.decodeTimestamp;){let d=a(this,L).shift();f(this,I,D).call(this,a(this,S),d)}u.decodeTimestamp<=a(this,S).lastDecodeTimestamp?f(this,I,D).call(this,a(this,T),u):a(this,W).push(u)}else f(this,I,D).call(this,a(this,T),u)}addAudioChunk(e,t,n){if(!(e instanceof EncodedAudioChunk))throw new TypeError("addAudioChunk's first argument (sample) must be of type EncodedAudioChunk.");if(t&&typeof t!="object")throw new TypeError("addAudioChunk's second argument (meta), when provided, must be an object.");if(n!==void 0&&(!Number.isFinite(n)||n<0))throw new TypeError("addAudioChunk's third argument (timestamp), when provided, must be a non-negative real number.");let i=new Uint8Array(e.byteLength);e.copyTo(i),this.addAudioChunkRaw(i,e.type,n??e.timestamp,e.duration,t)}addAudioChunkRaw(e,t,n,i,r){if(!(e instanceof Uint8Array))throw new TypeError("addAudioChunkRaw's first argument (data) must be an instance of Uint8Array.");if(t!=="key"&&t!=="delta")throw new TypeError("addAudioChunkRaw's second argument (type) must be either 'key' or 'delta'.");if(!Number.isFinite(n)||n<0)throw new TypeError("addAudioChunkRaw's third argument (timestamp) must be a non-negative real number.");if(!Number.isFinite(i)||i<0)throw new TypeError("addAudioChunkRaw's fourth argument (duration) must be a non-negative real number.");if(r&&typeof r!="object")throw new TypeError("addAudioChunkRaw's fifth argument (meta), when provided, must be an object.");if(f(this,ce,Ie).call(this),!a(this,l).audio)throw new Error("No audio track declared.");if(typeof a(this,l).fastStart=="object"&&a(this,S).samples.length===a(this,l).fastStart.expectedAudioChunks)throw new Error(`Cannot add more audio chunks than specified in 'fastStart' (${a(this,l).fastStart.expectedAudioChunks}).`);let s=f(this,he,qe).call(this,a(this,S),e,t,n,i,r);if(a(this,l).fastStart==="fragmented"&&a(this,T)){for(;a(this,W).length>0&&a(this,W)[0].decodeTimestamp<=s.decodeTimestamp;){let u=a(this,W).shift();f(this,I,D).call(this,a(this,T),u)}s.decodeTimestamp<=a(this,T).lastDecodeTimestamp?f(this,I,D).call(this,a(this,S),s):a(this,L).push(s)}else f(this,I,D).call(this,a(this,S),s)}finalize(){if(a(this,ae))throw new Error("Cannot finalize a muxer more than once.");if(a(this,l).fastStart==="fragmented"){for(let t of a(this,W))f(this,I,D).call(this,a(this,T),t);for(let t of a(this,L))f(this,I,D).call(this,a(this,S),t);f(this,ve,Le).call(this,!1)}else a(this,T)&&f(this,ie,we).call(this,a(this,T)),a(this,S)&&f(this,ie,we).call(this,a(this,S));let e=[a(this,T),a(this,S)].filter(Boolean);if(a(this,l).fastStart==="in-memory"){let t;for(let i=0;i<2;i++){let r=ue(e,a(this,H)),s=a(this,h).measureBox(r);t=a(this,h).measureBox(a(this,E));let u=a(this,h).pos+s+t;for(let d of a(this,G)){d.offset=u;for(let{data:m}of d.samples)u+=m.byteLength,t+=m.byteLength}if(u<2**32)break;t>=2**32&&(a(this,E).largeSize=!0)}let n=ue(e,a(this,H));a(this,h).writeBox(n),a(this,E).size=t,a(this,h).writeBox(a(this,E));for(let i of a(this,G))for(let r of i.samples)a(this,h).write(r.data),r.data=null}else if(a(this,l).fastStart==="fragmented"){let t=a(this,h).pos,n=un(e);a(this,h).writeBox(n);let i=a(this,h).pos-t;a(this,h).seek(a(this,h).pos-4),a(this,h).writeU32(i)}else{let t=a(this,h).offsets.get(a(this,E)),n=a(this,h).pos-t;a(this,E).size=n,a(this,E).largeSize=n>=2**32,a(this,h).patchBox(a(this,E));let i=ue(e,a(this,H));if(typeof a(this,l).fastStart=="object"){a(this,h).seek(a(this,pe)),a(this,h).writeBox(i);let r=t-a(this,h).pos;a(this,h).writeBox(St(r))}else a(this,h).writeBox(i)}f(this,Q,se).call(this),a(this,h).finalize(),C(this,ae,!0)}};l=new WeakMap;h=new WeakMap;pe=new WeakMap;E=new WeakMap;T=new WeakMap;S=new WeakMap;H=new WeakMap;G=new WeakMap;Re=new WeakMap;W=new WeakMap;L=new WeakMap;ae=new WeakMap;Ee=new WeakSet;Je=function(e){if(typeof e!="object")throw new TypeError("The muxer requires an options object to be passed to its constructor.");if(!(e.target instanceof ye))throw new TypeError("The target must be provided and an instance of Target.");if(e.video){if(!bn.includes(e.video.codec))throw new TypeError(`Unsupported video codec: ${e.video.codec}`);if(!Number.isInteger(e.video.width)||e.video.width<=0)throw new TypeError(`Invalid video width: ${e.video.width}. Must be a positive integer.`);if(!Number.isInteger(e.video.height)||e.video.height<=0)throw new TypeError(`Invalid video height: ${e.video.height}. Must be a positive integer.`);const t=e.video.rotation;if(typeof t=="number"&&![0,90,180,270].includes(t))throw new TypeError(`Invalid video rotation: ${t}. Has to be 0, 90, 180 or 270.`);if(Array.isArray(t)&&(t.length!==9||t.some(n=>typeof n!="number")))throw new TypeError(`Invalid video transformation matrix: ${t.join()}`);if(e.video.frameRate!==void 0&&(!Number.isInteger(e.video.frameRate)||e.video.frameRate<=0))throw new TypeError(`Invalid video frame rate: ${e.video.frameRate}. Must be a positive integer.`)}if(e.audio){if(!Sn.includes(e.audio.codec))throw new TypeError(`Unsupported audio codec: ${e.audio.codec}`);if(!Number.isInteger(e.audio.numberOfChannels)||e.audio.numberOfChannels<=0)throw new TypeError(`Invalid number of audio channels: ${e.audio.numberOfChannels}. Must be a positive integer.`);if(!Number.isInteger(e.audio.sampleRate)||e.audio.sampleRate<=0)throw new TypeError(`Invalid audio sample rate: ${e.audio.sampleRate}. Must be a positive integer.`)}if(e.firstTimestampBehavior&&!Tn.includes(e.firstTimestampBehavior))throw new TypeError(`Invalid first timestamp behavior: ${e.firstTimestampBehavior}`);if(typeof e.fastStart=="object"){if(e.video){if(e.fastStart.expectedVideoChunks===void 0)throw new TypeError("'fastStart' is an object but is missing property 'expectedVideoChunks'.");if(!Number.isInteger(e.fastStart.expectedVideoChunks)||e.fastStart.expectedVideoChunks<0)throw new TypeError("'expectedVideoChunks' must be a non-negative integer.")}if(e.audio){if(e.fastStart.expectedAudioChunks===void 0)throw new TypeError("'fastStart' is an object but is missing property 'expectedAudioChunks'.");if(!Number.isInteger(e.fastStart.expectedAudioChunks)||e.fastStart.expectedAudioChunks<0)throw new TypeError("'expectedAudioChunks' must be a non-negative integer.")}}else if(![!1,"in-memory","fragmented"].includes(e.fastStart))throw new TypeError("'fastStart' option must be false, 'in-memory', 'fragmented' or an object.");if(e.minFragmentDuration!==void 0&&(!Number.isFinite(e.minFragmentDuration)||e.minFragmentDuration<0))throw new TypeError("'minFragmentDuration' must be a non-negative number.")};_e=new WeakSet;et=function(){if(a(this,h).writeBox(bt({holdsAvc:a(this,l).video?.codec==="avc",fragmented:a(this,l).fastStart==="fragmented"})),C(this,pe,a(this,h).pos),a(this,l).fastStart==="in-memory")C(this,E,Ce(!1));else if(a(this,l).fastStart!=="fragmented"){if(typeof a(this,l).fastStart=="object"){let e=f(this,Fe,tt).call(this);a(this,h).seek(a(this,h).pos+e)}C(this,E,Ce(!0)),a(this,h).writeBox(a(this,E))}f(this,Q,se).call(this)};Fe=new WeakSet;tt=function(){if(typeof a(this,l).fastStart!="object")return;let e=0,t=[a(this,l).fastStart.expectedVideoChunks,a(this,l).fastStart.expectedAudioChunks];for(let n of t)n&&(e+=8*Math.ceil(2/3*n),e+=4*n,e+=12*Math.ceil(2/3*n),e+=4*n,e+=8*n);return e+=4096,e};ze=new WeakSet;nt=function(){if(a(this,l).video&&C(this,T,{id:1,info:{type:"video",codec:a(this,l).video.codec,width:a(this,l).video.width,height:a(this,l).video.height,rotation:a(this,l).video.rotation??0,decoderConfig:null},timescale:a(this,l).video.frameRate??57600,samples:[],finalizedChunks:[],currentChunk:null,firstDecodeTimestamp:void 0,lastDecodeTimestamp:-1,timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,compactlyCodedChunkTable:[]}),a(this,l).audio&&(C(this,S,{id:a(this,l).video?2:1,info:{type:"audio",codec:a(this,l).audio.codec,numberOfChannels:a(this,l).audio.numberOfChannels,sampleRate:a(this,l).audio.sampleRate,decoderConfig:null},timescale:a(this,l).audio.sampleRate,samples:[],finalizedChunks:[],currentChunk:null,firstDecodeTimestamp:void 0,lastDecodeTimestamp:-1,timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,compactlyCodedChunkTable:[]}),a(this,l).audio.codec==="aac")){let e=f(this,Ne,at).call(this,2,a(this,l).audio.sampleRate,a(this,l).audio.numberOfChannels);a(this,S).info.decoderConfig={codec:a(this,l).audio.codec,description:e,numberOfChannels:a(this,l).audio.numberOfChannels,sampleRate:a(this,l).audio.sampleRate}}};Ne=new WeakSet;at=function(e,t,n){let r=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350].indexOf(t),s=n,u="";u+=e.toString(2).padStart(5,"0"),u+=r.toString(2).padStart(4,"0"),r===15&&(u+=t.toString(2).padStart(24,"0")),u+=s.toString(2).padStart(4,"0");let d=Math.ceil(u.length/8)*8;u=u.padEnd(d,"0");let m=new Uint8Array(u.length/8);for(let w=0;w<u.length;w+=8)m[w/8]=parseInt(u.slice(w,w+8),2);return m};he=new WeakSet;qe=function(e,t,n,i,r,s,u){let d=i/1e6,m=(i-(u??0))/1e6,w=r/1e6,x=f(this,We,it).call(this,d,m,e);return d=x.presentationTimestamp,m=x.decodeTimestamp,s?.decoderConfig&&(e.info.decoderConfig===null?e.info.decoderConfig=s.decoderConfig:Object.assign(e.info.decoderConfig,s.decoderConfig)),{presentationTimestamp:d,decodeTimestamp:m,duration:w,data:t,size:t.byteLength,type:n,timescaleUnitsToNextSample:A(w,e.timescale)}};I=new WeakSet;D=function(e,t){a(this,l).fastStart!=="fragmented"&&e.samples.push(t);const n=A(t.presentationTimestamp-t.decodeTimestamp,e.timescale);if(e.lastTimescaleUnits!==null){let r=A(t.decodeTimestamp,e.timescale,!1),s=Math.round(r-e.lastTimescaleUnits);if(e.lastTimescaleUnits+=s,e.lastSample.timescaleUnitsToNextSample=s,a(this,l).fastStart!=="fragmented"){let u=me(e.timeToSampleTable);u.sampleCount===1?(u.sampleDelta=s,u.sampleCount++):u.sampleDelta===s?u.sampleCount++:(u.sampleCount--,e.timeToSampleTable.push({sampleCount:2,sampleDelta:s}));const d=me(e.compositionTimeOffsetTable);d.sampleCompositionTimeOffset===n?d.sampleCount++:e.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:n})}}else e.lastTimescaleUnits=0,a(this,l).fastStart!=="fragmented"&&(e.timeToSampleTable.push({sampleCount:1,sampleDelta:A(t.duration,e.timescale)}),e.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:n}));e.lastSample=t;let i=!1;if(!e.currentChunk)i=!0;else{let r=t.presentationTimestamp-e.currentChunk.startTimestamp;if(a(this,l).fastStart==="fragmented"){let s=a(this,T)??a(this,S);const u=a(this,l).minFragmentDuration??1;e===s&&t.type==="key"&&r>=u&&(i=!0,f(this,ve,Le).call(this))}else i=r>=.5}i&&(e.currentChunk&&f(this,ie,we).call(this,e),e.currentChunk={startTimestamp:t.presentationTimestamp,samples:[]}),e.currentChunk.samples.push(t)};We=new WeakSet;it=function(e,t,n){const i=a(this,l).firstTimestampBehavior==="strict",r=n.lastDecodeTimestamp===-1;if(i&&r&&t!==0)throw new Error(`The first chunk for your media track must have a timestamp of 0 (received DTS=${t}).Non-zero first timestamps are often caused by directly piping frames or audio data from a MediaStreamTrack into the encoder. Their timestamps are typically relative to the age of thedocument, which is probably what you want.

If you want to offset all timestamps of a track such that the first one is zero, set firstTimestampBehavior: 'offset' in the options.
`);if(a(this,l).firstTimestampBehavior==="offset"||a(this,l).firstTimestampBehavior==="cross-track-offset"){n.firstDecodeTimestamp===void 0&&(n.firstDecodeTimestamp=t);let u;a(this,l).firstTimestampBehavior==="offset"?u=n.firstDecodeTimestamp:u=Math.min(a(this,T)?.firstDecodeTimestamp??1/0,a(this,S)?.firstDecodeTimestamp??1/0),t-=u,e-=u}if(t<n.lastDecodeTimestamp)throw new Error(`Timestamps must be monotonically increasing (DTS went from ${n.lastDecodeTimestamp*1e6} to ${t*1e6}).`);return n.lastDecodeTimestamp=t,{presentationTimestamp:e,decodeTimestamp:t}};ie=new WeakSet;we=function(e){if(a(this,l).fastStart==="fragmented")throw new Error("Can't finalize individual chunks if 'fastStart' is set to 'fragmented'.");if(e.currentChunk){if(e.finalizedChunks.push(e.currentChunk),a(this,G).push(e.currentChunk),(e.compactlyCodedChunkTable.length===0||me(e.compactlyCodedChunkTable).samplesPerChunk!==e.currentChunk.samples.length)&&e.compactlyCodedChunkTable.push({firstChunk:e.finalizedChunks.length,samplesPerChunk:e.currentChunk.samples.length}),a(this,l).fastStart==="in-memory"){e.currentChunk.offset=0;return}e.currentChunk.offset=a(this,h).pos;for(let t of e.currentChunk.samples)a(this,h).write(t.data),t.data=null;f(this,Q,se).call(this)}};ve=new WeakSet;Le=function(e=!0){if(a(this,l).fastStart!=="fragmented")throw new Error("Can't finalize a fragment unless 'fastStart' is set to 'fragmented'.");let t=[a(this,T),a(this,S)].filter(d=>d&&d.currentChunk);if(t.length===0)return;let n=wt(this,Re)._++;if(n===1){let d=ue(t,a(this,H),!0);a(this,h).writeBox(d)}let i=a(this,h).pos,r=Pe(n,t);a(this,h).writeBox(r);{let d=Ce(!1),m=0;for(let x of t)for(let q of x.currentChunk.samples)m+=q.size;let w=a(this,h).measureBox(d)+m;w>=2**32&&(d.largeSize=!0,w=a(this,h).measureBox(d)+m),d.size=w,a(this,h).writeBox(d)}for(let d of t){d.currentChunk.offset=a(this,h).pos,d.currentChunk.moofOffset=i;for(let m of d.currentChunk.samples)a(this,h).write(m.data),m.data=null}let s=a(this,h).pos;a(this,h).seek(a(this,h).offsets.get(r));let u=Pe(n,t);a(this,h).writeBox(u),a(this,h).seek(s);for(let d of t)d.finalizedChunks.push(d.currentChunk),a(this,G).push(d.currentChunk),d.currentChunk=null;e&&f(this,Q,se).call(this)};Q=new WeakSet;se=function(){a(this,h)instanceof Ue&&a(this,h).flush()};ce=new WeakSet;Ie=function(){if(a(this,ae))throw new Error("Cannot add new video or audio chunks after the file has been finalized.")};const kn={fps:60,bitrate:5e6,width:1920,height:1080,durationSeconds:5};let K=null,R=!1;function rt(e,t="controller"){const n=e.getEntityByName(t);if(n===null)return null;const i=e.getComponent("SequenceController");return i?{eid:n,get step(){return i.step[n]},set step(r){i.step[n]=r},get targetStep(){return i.targetStep[n]},set targetStep(r){i.targetStep[n]=r},get maxStep(){return i.maxStep[n]}}:null}function En(e,t,n){const i=`${e}-${t}`,r=n[i];return r?{name:r,fromStep:e,toStep:t}:null}async function _n(e,t,n,i){const r=Math.ceil(n.durationSeconds*n.fps),s=new xn({target:new Xe,video:{codec:"avc",width:n.width,height:n.height},fastStart:"in-memory"}),u=new VideoEncoder({output:(m,w)=>s.addVideoChunk(m,w),error:m=>console.error("Encoder error:",m)});u.configure({codec:"avc1.640032",width:n.width,height:n.height,bitrate:n.bitrate,framerate:n.fps});const d=1/n.fps;for(let m=0;m<r;m++){t.step(d);const w=new VideoFrame(e,{timestamp:m*1e6/n.fps});u.encode(w),w.close(),m%30===0&&(i?.(m,r),await new Promise(x=>setTimeout(x,0)))}return await u.flush(),s.finalize(),new Blob([s.target.buffer],{type:"video/mp4"})}function zn(e,t){const n=URL.createObjectURL(e),i=document.createElement("a");i.href=n,i.download=t,i.click(),URL.revokeObjectURL(n)}async function qn(e,t,n,i,r,s){if(R)return;R=!0;const u=En(n,i,r);if(!u){console.error(`No sequence found for ${n}-${i}`),R=!1;return}const d=rt(t);if(!d){console.error("No sequence controller found"),R=!1;return}const m=e.width,w=e.height,x=e.style.cssText;document.body.classList.add("recording-mode"),e.classList.add("recording-target"),e.width=s.width,e.height=s.height,e.style.cssText=`width:${s.width}px;height:${s.height}px;display:block`,window.dispatchEvent(new Event("resize")),await new Promise(k=>requestAnimationFrame(k)),Se(`Recording ${u.name}...`),d.targetStep=i;const q=performance.now(),Z=await _n(e,t,s,(k,j)=>{Se(`Recording ${u.name}: ${k}/${j}`)}),oe=performance.now()-q,M=s.durationSeconds*1e3/oe;document.body.classList.remove("recording-mode"),e.classList.remove("recording-target"),e.width=m,e.height=w,e.style.cssText=x,window.dispatchEvent(new Event("resize")),zn(Z,`step-${n}-${i}.mp4`),Se(`Done! ${(Z.size/1024/1024).toFixed(1)} MB, ${M.toFixed(1)}x realtime`),R=!1}function Se(e){const t=document.getElementById("recording-status");t&&(t.textContent=e)}function In(e,t,n,i){if(K)return;const r=rt(t);if(!r)return;K=document.createElement("div"),K.id="recording-ui",K.innerHTML=`
    <style>
      #recording-ui {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0,0,0,0.9);
        padding: 15px;
        border-radius: 8px;
        font-family: monospace;
        font-size: 14px;
        color: #fff;
        z-index: 9999;
        min-width: 250px;
      }
      #recording-ui .step-display { margin-bottom: 10px; font-size: 16px; }
      #recording-ui button {
        padding: 8px 12px;
        margin: 4px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        background: #444;
        color: #fff;
      }
      #recording-ui button:hover { background: #666; }
      #recording-ui button:disabled { opacity: 0.5; cursor: not-allowed; }
      #recording-ui button.record { background: #c33; }
      #recording-ui button.record:hover { background: #e55; }
      #recording-ui #recording-status { margin-top: 10px; color: #aaa; font-size: 12px; }
      body.recording-mode #recording-ui { display: none; }
      body.recording-mode .blog-container { display: none; }
      body.recording-mode { margin: 0; padding: 0; overflow: hidden; background: #000; }
      body.recording-mode canvas.recording-target {
        display: block !important;
        position: fixed;
        top: 0;
        left: 0;
      }
    </style>
    <div class="step-display">Step: <span id="current-step">0</span> / <span id="max-step">0</span></div>
    <div>
      <button id="rec-prev">← Prev</button>
      <button id="rec-next">Next →</button>
    </div>
    <div>
      <button id="rec-record-next" class="record">⏺ Record Next (R)</button>
    </div>
    <div id="recording-status">Ready</div>
  `,document.body.appendChild(K);const s=()=>{const d=document.getElementById("current-step"),m=document.getElementById("max-step"),w=document.getElementById("rec-prev"),x=document.getElementById("rec-next"),q=document.getElementById("rec-record-next");d&&(d.textContent=String(r.targetStep)),m&&(m.textContent=String(r.maxStep)),w&&(w.disabled=r.targetStep<=0),x&&(x.disabled=r.targetStep>=r.maxStep),q&&(q.disabled=r.targetStep>=r.maxStep||R)};document.getElementById("rec-prev")?.addEventListener("click",()=>{r.targetStep>0&&(r.targetStep=r.targetStep-1,s())}),document.getElementById("rec-next")?.addEventListener("click",()=>{r.targetStep<r.maxStep&&(r.targetStep=r.targetStep+1,s())});const u=async()=>{if(R||r.targetStep>=r.maxStep)return;const d=r.targetStep,m=d+1;await qn(e,t,d,m,n,i),s()};document.getElementById("rec-record-next")?.addEventListener("click",u),document.addEventListener("keydown",d=>{d.key.toLowerCase()==="r"&&!R&&u()}),setInterval(s,100),s()}function Bn(e,t,n={}){const i={...kn,...n},r=setInterval(()=>{const s=document.querySelector(e);s?.__state__&&(clearInterval(r),In(s,s.__state__,t,i))},100)}const An=`<sequence name="enter-network">
  <tween
    target="stage"
    attr="stage-animation.camera-x"
    to="0"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.connections"
    to="1"
    duration="0.7"
    easing="sine-in-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0.5"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0.6"
    duration="0.7"
    easing="expo-out"
  ></tween>
</sequence>

<sequence name="exit-network">
  <tween
    target="stage"
    attr="stage-animation.camera-x"
    to="-50"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.connections"
    to="0"
    duration="0.7"
    easing="sine-in-out"
  ></tween>
</sequence>
`,On=`<sequence name="focus-output">
  <tween
    target="stage"
    attr="stage-animation.camera-x"
    to="8"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.collapse"
    to="1"
    duration="0.4"
    easing="circ-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.text-gen-t"
    to="1"
    duration="0.5"
    easing="sine-out"
  ></tween>
</sequence>

<sequence name="unfocus-output">
  <tween
    target="stage"
    attr="stage-animation.camera-x"
    to="0"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.collapse"
    to="0"
    duration="0.4"
    easing="circ-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.text-gen-t"
    to="0"
    duration="0.5"
    easing="sine-out"
  ></tween>
</sequence>
`,Mn=`<sequence name="wave-scale">
  <tween
    target="shake-driver"
    attr="scale-shaker-driver.amplitude"
    to="0.5"
    duration="0.01"
    easing="linear"
  ></tween>
  <tween
    target="camera"
    attr="main-camera.ortho-size"
    to="27"
    duration="0.5"
    easing="sine-in-out"
  ></tween>
  <tween
    target="shake-driver"
    attr="at"
    to="20 0 0"
    duration="0.5"
    easing="linear"
  ></tween>
  <pause duration="0.4"></pause>
  <tween
    target="shake-driver"
    attr="scale-shaker-driver.amplitude"
    to="0"
    duration="0.01"
    easing="linear"
  ></tween>
</sequence>

<sequence name="wave-scale-reverse">
  <tween
    target="shake-driver"
    attr="scale-shaker-driver.amplitude"
    to="0.5"
    duration="0.01"
    easing="linear"
  ></tween>
  <tween
    target="camera"
    attr="main-camera.ortho-size"
    to="20"
    duration="0.5"
    easing="sine-in-out"
  ></tween>
  <tween
    target="shake-driver"
    attr="at"
    to="-20 0 0"
    duration="0.5"
    easing="linear"
  ></tween>
  <pause duration="0.5"></pause>
  <tween
    target="shake-driver"
    attr="scale-shaker-driver.amplitude"
    to="0"
    duration="0.01"
    easing="linear"
  ></tween>
</sequence>
`,Dn=`<sequence name="center-on-model">
  <tween
    target="stage"
    attr="stage-animation.camera-x"
    to="0"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.text-gen-t"
    to="0"
    duration="0.4"
    easing="sine-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.collapse"
    to="0"
    duration="0.5"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0"
    duration="0.7"
    easing="expo-out"
  ></tween>
</sequence>

<sequence name="uncenter-on-model">
  <tween
    target="stage"
    attr="stage-animation.camera-x"
    to="0"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.text-gen-t"
    to="1"
    duration="0.5"
    easing="sine-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.collapse"
    to="1"
    duration="0.4"
    easing="circ-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0.5"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0.6"
    duration="0.7"
    easing="expo-out"
  ></tween>
</sequence>
`,Un=`<sequence name="show-input">
  <tween
    target="shake-driver"
    attr="at"
    to="-20 0 0"
    duration="0.01"
    easing="linear"
  ></tween>
  <tween
    target="shake-driver"
    attr="scale-shaker-driver.amplitude"
    to="0.1"
    duration="0.01"
    easing="linear"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.text-input-t"
    to="1"
    duration="0.8"
    easing="sine-out"
  ></tween>
  <tween
    target="shake-driver"
    attr="at"
    to="10 0 0"
    duration="0.8"
    easing="linear"
  ></tween>
  <pause duration="0.3"></pause>
  <tween
    target="shake-driver"
    attr="scale-shaker-driver.amplitude"
    to="0"
    duration="0.01"
    easing="linear"
  ></tween>
</sequence>

<sequence name="hide-input">
  <tween
    target="shake-driver"
    attr="at"
    to="10 0 0"
    duration="0.01"
    easing="linear"
  ></tween>
  <tween
    target="shake-driver"
    attr="scale-shaker-driver.amplitude"
    to="0.1"
    duration="0.01"
    easing="linear"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.text-input-t"
    to="0"
    duration="0.4"
    easing="sine-in"
  ></tween>
  <tween
    target="shake-driver"
    attr="at"
    to="-20 0 0"
    duration="0.4"
    easing="linear"
  ></tween>
  <pause duration="0.2"></pause>
  <tween
    target="shake-driver"
    attr="scale-shaker-driver.amplitude"
    to="0"
    duration="0.01"
    easing="linear"
  ></tween>
</sequence>
`,Rn=`<sequence name="show-multiple-outputs">
  <tween
    target="stage"
    attr="stage-animation.camera-x"
    to="16"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.collapse"
    to="1"
    duration="0.5"
    easing="circ-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.text-gen-t"
    to="0"
    duration="0.3"
    easing="sine-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.text-input-t"
    to="0"
    duration="0.3"
    easing="sine-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0.5"
    duration="1.2"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0.6"
    duration="1.2"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="main-camera.ortho-size"
    to="20"
    duration="1.2"
    easing="expo-out"
  ></tween>
  <pause duration="0.3"></pause>
  <tween
    target="stage"
    attr="stage-animation.multiple-outputs-t"
    to="1"
    duration="0.8"
    easing="sine-out"
  ></tween>
</sequence>

<sequence name="hide-multiple-outputs">
  <tween
    target="stage"
    attr="stage-animation.multiple-outputs-t"
    to="0"
    duration="0.3"
    easing="sine-in"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.collapse"
    to="0"
    duration="0.4"
    easing="expo-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.camera-x"
    to="0"
    duration="0.5"
    easing="expo-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.text-input-t"
    to="1"
    duration="0.4"
    easing="sine-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0"
    duration="0.5"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0"
    duration="0.5"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="main-camera.ortho-size"
    to="27"
    duration="0.5"
    easing="expo-out"
  ></tween>
</sequence>
`,Fn=`<sequence name="show-scores">
  <tween
    target="stage"
    attr="stage-animation.camera-x"
    to="21"
    duration="0.8"
    easing="expo-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.scores-t"
    to="1"
    duration="0.8"
    easing="sine-out"
  ></tween>
</sequence>

<sequence name="hide-scores">
  <tween
    target="stage"
    attr="stage-animation.camera-x"
    to="16"
    duration="0.6"
    easing="expo-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.scores-t"
    to="0"
    duration="0.4"
    easing="sine-in"
  ></tween>
</sequence>
`,Nn=`<sequence name="show-average-line">
  <tween
    target="stage"
    attr="stage-animation.average-line-t"
    to="1"
    duration="0.6"
    easing="back-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0"
    duration="0.8"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0"
    duration="0.8"
    easing="expo-out"
  ></tween>
</sequence>

<sequence name="hide-average-line">
  <tween
    target="stage"
    attr="stage-animation.average-line-t"
    to="0"
    duration="0.4"
    easing="sine-in"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0.5"
    duration="0.6"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0.6"
    duration="0.6"
    easing="expo-out"
  ></tween>
</sequence>
`,Wn=`<sequence name="sort-by-reward">
  <tween
    target="stage"
    attr="stage-animation.sort-t"
    to="1"
    duration="0.8"
    easing="back-out"
  ></tween>
</sequence>

<sequence name="unsort-by-reward">
  <tween
    target="stage"
    attr="stage-animation.sort-t"
    to="0"
    duration="0.6"
    easing="sine-out"
  ></tween>
</sequence>
`,Ln=`<sequence name="wave-scale-above-average">
  <tween
    target="shake-driver"
    attr="at"
    to="21 0 0"
    duration="0.01"
    easing="linear"
  ></tween>
  <tween
    target="shake-driver"
    attr="scale-shaker-driver.amplitude"
    to="0.05"
    duration="0.2"
    easing="sine-out"
  ></tween>
  <pause duration="0.2"></pause>
  <tween
    target="shake-driver"
    attr="scale-shaker-driver.amplitude"
    to="0"
    duration="0.2"
    easing="sine-in"
  ></tween>
</sequence>

<sequence name="wave-scale-above-average-reverse">
  <tween
    target="shake-driver"
    attr="scale-shaker-driver.amplitude"
    to="0.05"
    duration="0.2"
    easing="sine-out"
  ></tween>
  <pause duration="0.2"></pause>
  <tween
    target="shake-driver"
    attr="scale-shaker-driver.amplitude"
    to="0"
    duration="0.2"
    easing="sine-in"
  ></tween>
</sequence>
`,Pn=`<sequence name="camera-zoom-out">
  <tween
    target="stage"
    attr="stage-animation.multiple-outputs-t"
    to="0"
    duration="0.4"
    easing="sine-in"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.average-line-t"
    to="0"
    duration="0.3"
    easing="sine-in"
  ></tween>
  <tween
    target="camera"
    attr="main-camera.ortho-size"
    to="25"
    duration="0.8"
    easing="expo-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.camera-x"
    to="0"
    duration="0.8"
    easing="expo-out"
  ></tween>
</sequence>

<sequence name="camera-zoom-in">
  <tween
    target="camera"
    attr="main-camera.ortho-size"
    to="20"
    duration="0.8"
    easing="expo-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.camera-x"
    to="21"
    duration="0.8"
    easing="expo-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.average-line-t"
    to="1"
    duration="0.3"
    easing="sine-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.multiple-outputs-t"
    to="1"
    duration="0.4"
    easing="sine-out"
  ></tween>
</sequence>
`,Vn=`<sequence name="show-grpo-text">
  <tween
    target="stage"
    attr="stage-animation.text-gen-t"
    to="1"
    duration="0.6"
    easing="sine-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.camera-x"
    to="18"
    duration="0.8"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="main-camera.ortho-size"
    to="20"
    duration="0.8"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0.5"
    duration="0.8"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0.6"
    duration="0.8"
    easing="expo-out"
  ></tween>
</sequence>

<sequence name="hide-grpo-text">
  <tween
    target="camera"
    attr="main-camera.ortho-size"
    to="25"
    duration="0.8"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0"
    duration="0.8"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0"
    duration="0.8"
    easing="expo-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.camera-x"
    to="0"
    duration="0.8"
    easing="expo-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.text-gen-t"
    to="0"
    duration="0.4"
    easing="sine-in"
  ></tween>
</sequence>
`,jn=`<sequence name="show-token-weights">
  <tween
    target="stage"
    attr="stage-animation.token-scale-t"
    to="1"
    duration="0.6"
    easing="expo-out"
  ></tween>
</sequence>

<sequence name="hide-token-weights">
  <tween
    target="stage"
    attr="stage-animation.token-scale-t"
    to="0"
    duration="0.4"
    easing="sine-in"
  ></tween>
</sequence>
`,$n=`<sequence name="show-gspo-uniform">
  <tween
    target="stage"
    attr="stage-animation.token-scale-t"
    to="0"
    duration="0.6"
    easing="expo-out"
  ></tween>
</sequence>

<sequence name="hide-gspo-uniform">
  <tween
    target="stage"
    attr="stage-animation.token-scale-t"
    to="1"
    duration="0.4"
    easing="sine-in"
  ></tween>
</sequence>
`,Hn=`<sequence name="focus-whole-sequence">
  <tween
    target="camera"
    attr="main-camera.ortho-size"
    to="15"
    duration="0.3"
    easing="sine-out"
  ></tween>
</sequence>

<sequence name="unfocus-whole-sequence">
  <tween
    target="camera"
    attr="main-camera.ortho-size"
    to="20"
    duration="0.3"
    easing="sine-in"
  ></tween>
</sequence>
`,Gn=`<sequence name="show-random-flashes">
  <tween
    target="stage"
    attr="stage-animation.flash-t"
    from="0"
    to="1"
    duration="0.7"
    easing="linear"
  ></tween>
</sequence>

<sequence name="hide-random-flashes">
  <tween
    target="stage"
    attr="stage-animation.flash-t"
    to="0"
    duration="0.3"
    easing="sine-in"
  ></tween>
</sequence>
`,Xn=`<sequence name="adjust-camera">
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0"
    duration="0.5"
    easing="sine-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0"
    duration="0.5"
    easing="sine-out"
  ></tween>
</sequence>

<sequence name="unadjust-camera">
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0.5"
    duration="0.5"
    easing="sine-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0.6"
    duration="0.5"
    easing="sine-out"
  ></tween>
</sequence>
`,Qn=`<sequence name="wave-bounce-up">
  <tween
    target="bounce-driver"
    attr="position-shaker-driver.amplitude"
    to="1"
    duration="0.01"
    easing="linear"
  ></tween>
  <tween
    target="bounce-driver"
    attr="at"
    to="30 0 0"
    duration="0.6"
    easing="linear"
  ></tween>
  <pause duration="0.6"></pause>
  <tween
    target="bounce-driver"
    attr="position-shaker-driver.amplitude"
    to="0"
    duration="0.01"
    easing="linear"
  ></tween>
</sequence>

<sequence name="wave-bounce-up-reverse">
  <tween
    target="bounce-driver"
    attr="position-shaker-driver.amplitude"
    to="1"
    duration="0.01"
    easing="linear"
  ></tween>
  <tween
    target="bounce-driver"
    attr="at"
    to="0 0 0"
    duration="0.6"
    easing="linear"
  ></tween>
  <pause duration="0.6"></pause>
  <tween
    target="bounce-driver"
    attr="position-shaker-driver.amplitude"
    to="0"
    duration="0.01"
    easing="linear"
  ></tween>
</sequence>
`,Zn=`<sequence name="reset-for-loop">
  <tween
    target="stage"
    attr="stage-animation.flash-t"
    to="0"
    duration="0.3"
    easing="sine-in"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.token-scale-t"
    to="0"
    duration="0.4"
    easing="sine-in"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.text-gen-t"
    to="0"
    duration="0.4"
    easing="sine-in"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.collapse"
    to="0"
    duration="0.5"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="main-camera.ortho-size"
    to="20"
    duration="0.6"
    easing="expo-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.camera-x"
    to="50"
    duration="0.7"
    easing="expo-out"
  ></tween>
</sequence>

<sequence name="unreset-for-loop">
  <tween
    target="stage"
    attr="stage-animation.camera-x"
    to="18"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.collapse"
    to="1"
    duration="0.5"
    easing="circ-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.text-gen-t"
    to="1"
    duration="0.5"
    easing="sine-out"
  ></tween>
  <tween
    target="stage"
    attr="stage-animation.flash-t"
    to="1"
    duration="0.5"
    easing="sine-out"
  ></tween>
  <tween
    target="camera"
    attr="main-camera.ortho-size"
    to="15"
    duration="0.6"
    easing="expo-out"
  ></tween>
</sequence>
`,st={"0-1":"enter-network","1-0":"exit-network","1-2":"focus-output","2-1":"unfocus-output","2-3":"wave-scale","3-2":"wave-scale-reverse","3-4":"center-on-model","4-3":"uncenter-on-model","4-5":"show-input","5-4":"hide-input","5-6":"show-multiple-outputs","6-5":"hide-multiple-outputs","6-7":"show-scores","7-6":"hide-scores","7-8":"show-average-line","8-7":"hide-average-line","8-9":"sort-by-reward","9-8":"unsort-by-reward","9-10":"wave-scale-above-average","10-9":"wave-scale-above-average-reverse","10-11":"camera-zoom-out","11-10":"camera-zoom-in","11-12":"show-grpo-text","12-11":"hide-grpo-text","12-13":"show-token-weights","13-12":"hide-token-weights","13-14":"show-gspo-uniform","14-13":"hide-gspo-uniform","14-15":"focus-whole-sequence","15-14":"unfocus-whole-sequence","15-16":"show-random-flashes","16-15":"hide-random-flashes","16-17":"adjust-camera","17-16":"unadjust-camera","17-18":"wave-bounce-up","18-17":"wave-bounce-up-reverse","18-19":"reset-for-loop","19-18":"unreset-for-loop"};function Kn(e){const t=[An,On,Mn,Dn,Un,Rn,Fn,Nn,Wn,Ln,Pn,Vn,jn,$n,Hn,Gn,Xn,Qn,Zn];for(const n of t){const i=document.createElement("div");i.innerHTML=n.trim();for(const r of Array.from(i.children))e.appendChild(r)}}const Yn=[{canvasId:"canvas-1",createPlugin:()=>[ut(st),dt,lt,ht,ct,mt,ft,gt,pt]}];if(typeof document<"u"){const e=()=>{const t=document.querySelector('world[canvas="#canvas-1"]');t&&Kn(t),ot(Yn),Bn("#canvas-1",st)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}
//# sourceMappingURL=record-Bo47LeCw.js.map
