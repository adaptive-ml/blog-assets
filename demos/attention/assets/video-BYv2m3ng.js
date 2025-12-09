import{S as lt,b as W,T as r,d as j,r as d,o as le,u as Xe,C as Ae,M as vo,i as g,s as F,n as Tt,x as te,f as U,a as ko,c as yo,D as To}from"./plugin-DQL4gMZR.js";const bo={fps:60,bitrate:5e6,width:1920,height:1080,durationSeconds:2};var pn=(e,t,n)=>{if(!t.has(e))throw TypeError("Cannot "+n)},s=(e,t,n)=>(pn(e,t,"read from private field"),n?n.call(e):t.get(e)),Y=(e,t,n)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,n)},ne=(e,t,n,o)=>(pn(e,t,"write to private field"),t.set(e,n),n),So=(e,t,n,o)=>({set _(i){ne(e,t,i)},get _(){return s(e,t,o)}}),_=(e,t,n)=>(pn(e,t,"access private method"),n),D=new Uint8Array(8),Ce=new DataView(D.buffer),J=e=>[(e%256+256)%256],P=e=>(Ce.setUint16(0,e,!1),[D[0],D[1]]),xo=e=>(Ce.setInt16(0,e,!1),[D[0],D[1]]),Vn=e=>(Ce.setUint32(0,e,!1),[D[1],D[2],D[3]]),v=e=>(Ce.setUint32(0,e,!1),[D[0],D[1],D[2],D[3]]),Co=e=>(Ce.setInt32(0,e,!1),[D[0],D[1],D[2],D[3]]),je=e=>(Ce.setUint32(0,Math.floor(e/2**32),!1),Ce.setUint32(4,e,!1),[D[0],D[1],D[2],D[3],D[4],D[5],D[6],D[7]]),hn=e=>(Ce.setInt16(0,2**8*e,!1),[D[0],D[1]]),Te=e=>(Ce.setInt32(0,2**16*e,!1),[D[0],D[1],D[2],D[3]]),Ft=e=>(Ce.setInt32(0,2**30*e,!1),[D[0],D[1],D[2],D[3]]),ge=(e,t=!1)=>{let n=Array(e.length).fill(null).map((o,i)=>e.charCodeAt(i));return t&&n.push(0),n},At=e=>e&&e[e.length-1],mn=e=>{let t;for(let n of e)(!t||n.presentationTimestamp>t.presentationTimestamp)&&(t=n);return t},xe=(e,t,n=!0)=>{let o=e*t;return n?Math.round(o):o},Mn=e=>{let t=e*(Math.PI/180),n=Math.cos(t),o=Math.sin(t);return[n,o,0,-o,n,0,0,0,1]},Dn=Mn(0),In=e=>[Te(e[0]),Te(e[1]),Ft(e[2]),Te(e[3]),Te(e[4]),Ft(e[5]),Te(e[6]),Te(e[7]),Ft(e[8])],gt=e=>!e||typeof e!="object"?e:Array.isArray(e)?e.map(gt):Object.fromEntries(Object.entries(e).map(([t,n])=>[t,gt(n)])),at=e=>e>=0&&e<2**32,K=(e,t,n)=>({type:e,contents:t&&new Uint8Array(t.flat(10)),children:n}),G=(e,t,n,o,i)=>K(e,[J(t),Vn(n),o??[]],i),Eo=e=>{let t=512;return e.fragmented?K("ftyp",[ge("iso5"),v(t),ge("iso5"),ge("iso6"),ge("mp41")]):K("ftyp",[ge("isom"),v(t),ge("isom"),e.holdsAvc?ge("avc1"):[],ge("mp41")])},tn=e=>({type:"mdat",largeSize:e}),qo=e=>({type:"free",size:e}),Ct=(e,t,n=!1)=>K("moov",null,[zo(t,e),...e.map(o=>Xo(o,t)),n?ar(e):null]),zo=(e,t)=>{let n=xe(Math.max(0,...t.filter(c=>c.samples.length>0).map(c=>{const u=mn(c.samples);return u.presentationTimestamp+u.duration})),rn),o=Math.max(...t.map(c=>c.id))+1,i=!at(e)||!at(n),a=i?je:v;return G("mvhd",+i,0,[a(e),a(e),v(rn),a(n),Te(1),hn(1),Array(10).fill(0),In(Dn),Array(24).fill(0),v(o)])},Xo=(e,t)=>K("trak",null,[Ao(e,t),Yo(e,t)]),Ao=(e,t)=>{let n=mn(e.samples),o=xe(n?n.presentationTimestamp+n.duration:0,rn),i=!at(t)||!at(o),a=i?je:v,c;return e.info.type==="video"?c=typeof e.info.rotation=="number"?Mn(e.info.rotation):e.info.rotation:c=Dn,G("tkhd",+i,3,[a(t),a(t),v(e.id),v(0),a(o),Array(8).fill(0),P(0),P(0),hn(e.info.type==="audio"?1:0),P(0),In(c),Te(e.info.type==="video"?e.info.width:0),Te(e.info.type==="video"?e.info.height:0)])},Yo=(e,t)=>K("mdia",null,[Bo(e,t),Oo(e.info.type==="video"?"vide":"soun"),Lo(e)]),Bo=(e,t)=>{let n=mn(e.samples),o=xe(n?n.presentationTimestamp+n.duration:0,e.timescale),i=!at(t)||!at(o),a=i?je:v;return G("mdhd",+i,0,[a(t),a(t),v(e.timescale),a(o),P(21956),P(0)])},Oo=e=>G("hdlr",0,0,[ge("mhlr"),ge(e),v(0),v(0),v(0),ge("mp4-muxer-hdlr",!0)]),Lo=e=>K("minf",null,[e.info.type==="video"?_o():Vo(),Mo(),No(e)]),_o=()=>G("vmhd",0,1,[P(0),P(0),P(0),P(0)]),Vo=()=>G("smhd",0,0,[P(0),P(0)]),Mo=()=>K("dinf",null,[Do()]),Do=()=>G("dref",0,0,[v(1)],[Io()]),Io=()=>G("url ",0,1),No=e=>{const t=e.compositionTimeOffsetTable.length>1||e.compositionTimeOffsetTable.some(n=>n.sampleCompositionTimeOffset!==0);return K("stbl",null,[Po(e),er(e),tr(e),nr(e),or(e),rr(e),t?ir(e):null])},Po=e=>G("stsd",0,0,[v(1)],[e.info.type==="video"?Ro(gr[e.info.codec],e):$o(vr[e.info.codec],e)]),Ro=(e,t)=>K(e,[Array(6).fill(0),P(1),P(0),P(0),Array(12).fill(0),P(t.info.width),P(t.info.height),v(4718592),v(4718592),v(0),P(1),Array(32).fill(0),P(24),xo(65535)],[wr[t.info.codec](t),t.info.decoderConfig.colorSpace?Uo(t):null]),Zo={bt709:1,bt470bg:5,smpte170m:6},Wo={bt709:1,smpte170m:6,"iec61966-2-1":13},Fo={rgb:0,bt709:1,bt470bg:5,smpte170m:6},Uo=e=>K("colr",[ge("nclx"),P(Zo[e.info.decoderConfig.colorSpace.primaries]),P(Wo[e.info.decoderConfig.colorSpace.transfer]),P(Fo[e.info.decoderConfig.colorSpace.matrix]),J((e.info.decoderConfig.colorSpace.fullRange?1:0)<<7)]),Ho=e=>e.info.decoderConfig&&K("avcC",[...new Uint8Array(e.info.decoderConfig.description)]),Go=e=>e.info.decoderConfig&&K("hvcC",[...new Uint8Array(e.info.decoderConfig.description)]),jo=e=>{if(!e.info.decoderConfig)return null;let t=e.info.decoderConfig;if(!t.colorSpace)throw new Error("'colorSpace' is required in the decoder config for VP9.");let n=t.codec.split("."),o=Number(n[1]),i=Number(n[2]),u=(Number(n[3])<<4)+(0<<1)+Number(t.colorSpace.fullRange);return G("vpcC",1,0,[J(o),J(i),J(u),J(2),J(2),J(2),P(0)])},Qo=()=>{let n=(1<<7)+1;return K("av1C",[n,0,0,0])},$o=(e,t)=>K(e,[Array(6).fill(0),P(1),P(0),P(0),v(0),P(t.info.numberOfChannels),P(16),P(0),P(0),Te(t.info.sampleRate)],[kr[t.info.codec](t)]),Ko=e=>{let t=new Uint8Array(e.info.decoderConfig.description);return G("esds",0,0,[v(58753152),J(32+t.byteLength),P(1),J(0),v(75530368),J(18+t.byteLength),J(64),J(21),Vn(0),v(130071),v(130071),v(92307584),J(t.byteLength),...t,v(109084800),J(1),J(2)])},Jo=e=>{let t=3840,n=0;const o=e.info.decoderConfig?.description;if(o){if(o.byteLength<18)throw new TypeError("Invalid decoder description provided for Opus; must be at least 18 bytes long.");const i=ArrayBuffer.isView(o)?new DataView(o.buffer,o.byteOffset,o.byteLength):new DataView(o);t=i.getUint16(10,!0),n=i.getInt16(14,!0)}return K("dOps",[J(0),J(e.info.numberOfChannels),P(t),v(e.info.sampleRate),hn(n),J(0)])},er=e=>G("stts",0,0,[v(e.timeToSampleTable.length),e.timeToSampleTable.map(t=>[v(t.sampleCount),v(t.sampleDelta)])]),tr=e=>{if(e.samples.every(n=>n.type==="key"))return null;let t=[...e.samples.entries()].filter(([,n])=>n.type==="key");return G("stss",0,0,[v(t.length),t.map(([n])=>v(n+1))])},nr=e=>G("stsc",0,0,[v(e.compactlyCodedChunkTable.length),e.compactlyCodedChunkTable.map(t=>[v(t.firstChunk),v(t.samplesPerChunk),v(1)])]),or=e=>G("stsz",0,0,[v(0),v(e.samples.length),e.samples.map(t=>v(t.size))]),rr=e=>e.finalizedChunks.length>0&&At(e.finalizedChunks).offset>=2**32?G("co64",0,0,[v(e.finalizedChunks.length),e.finalizedChunks.map(t=>je(t.offset))]):G("stco",0,0,[v(e.finalizedChunks.length),e.finalizedChunks.map(t=>v(t.offset))]),ir=e=>G("ctts",0,0,[v(e.compositionTimeOffsetTable.length),e.compositionTimeOffsetTable.map(t=>[v(t.sampleCount),v(t.sampleCompositionTimeOffset)])]),ar=e=>K("mvex",null,e.map(sr)),sr=e=>G("trex",0,0,[v(e.id),v(1),v(0),v(0),v(0)]),Xn=(e,t)=>K("moof",null,[cr(e),...t.map(ur)]),cr=e=>G("mfhd",0,0,[v(e)]),Nn=e=>{let t=0,n=0,o=0,i=0,a=e.type==="delta";return n|=+a,a?t|=1:t|=2,t<<24|n<<16|o<<8|i},ur=e=>K("traf",null,[dr(e),lr(e),fr(e)]),dr=e=>{let t=0;t|=8,t|=16,t|=32,t|=131072;let n=e.currentChunk.samples[1]??e.currentChunk.samples[0],o={duration:n.timescaleUnitsToNextSample,size:n.size,flags:Nn(n)};return G("tfhd",0,t,[v(e.id),v(o.duration),v(o.size),v(o.flags)])},lr=e=>G("tfdt",1,0,[je(xe(e.currentChunk.startTimestamp,e.timescale))]),fr=e=>{let t=e.currentChunk.samples.map(b=>b.timescaleUnitsToNextSample),n=e.currentChunk.samples.map(b=>b.size),o=e.currentChunk.samples.map(Nn),i=e.currentChunk.samples.map(b=>xe(b.presentationTimestamp-b.decodeTimestamp,e.timescale)),a=new Set(t),c=new Set(n),u=new Set(o),l=new Set(i),p=u.size===2&&o[0]!==o[1],f=a.size>1,w=c.size>1,E=!p&&u.size>1,T=l.size>1||[...l].some(b=>b!==0),z=0;return z|=1,z|=4*+p,z|=256*+f,z|=512*+w,z|=1024*+E,z|=2048*+T,G("trun",1,z,[v(e.currentChunk.samples.length),v(e.currentChunk.offset-e.currentChunk.moofOffset||0),p?v(o[0]):[],e.currentChunk.samples.map((b,S)=>[f?v(t[S]):[],w?v(n[S]):[],E?v(o[S]):[],T?Co(i[S]):[]])])},pr=e=>K("mfra",null,[...e.map(hr),mr()]),hr=(e,t)=>G("tfra",1,0,[v(e.id),v(63),v(e.finalizedChunks.length),e.finalizedChunks.map(o=>[je(xe(o.startTimestamp,e.timescale)),je(o.moofOffset),v(t+1),v(1),v(1)])]),mr=()=>G("mfro",0,0,[v(0)]),gr={avc:"avc1",hevc:"hvc1",vp9:"vp09",av1:"av01"},wr={avc:Ho,hevc:Go,vp9:jo,av1:Qo},vr={aac:"mp4a",opus:"Opus"},kr={aac:Ko,opus:Jo},It=class{},Pn=class extends It{constructor(){super(...arguments),this.buffer=null}},Rn=class extends It{constructor(e){if(super(),this.options=e,typeof e!="object")throw new TypeError("StreamTarget requires an options object to be passed to its constructor.");if(e.onData){if(typeof e.onData!="function")throw new TypeError("options.onData, when provided, must be a function.");if(e.onData.length<2)throw new TypeError("options.onData, when provided, must be a function that takes in at least two arguments (data and position). Ignoring the position argument, which specifies the byte offset at which the data is to be written, can lead to broken outputs.")}if(e.chunked!==void 0&&typeof e.chunked!="boolean")throw new TypeError("options.chunked, when provided, must be a boolean.");if(e.chunkSize!==void 0&&(!Number.isInteger(e.chunkSize)||e.chunkSize<1024))throw new TypeError("options.chunkSize, when provided, must be an integer and not smaller than 1024.")}},yr=class extends It{constructor(e,t){if(super(),this.stream=e,this.options=t,!(e instanceof FileSystemWritableFileStream))throw new TypeError("FileSystemWritableFileStreamTarget requires a FileSystemWritableFileStream instance.");if(t!==void 0&&typeof t!="object")throw new TypeError("FileSystemWritableFileStreamTarget's options, when provided, must be an object.");if(t&&t.chunkSize!==void 0&&(!Number.isInteger(t.chunkSize)||t.chunkSize<=0))throw new TypeError("options.chunkSize, when provided, must be a positive integer")}},Pe,tt,Zn=class{constructor(){this.pos=0,Y(this,Pe,new Uint8Array(8)),Y(this,tt,new DataView(s(this,Pe).buffer)),this.offsets=new WeakMap}seek(e){this.pos=e}writeU32(e){s(this,tt).setUint32(0,e,!1),this.write(s(this,Pe).subarray(0,4))}writeU64(e){s(this,tt).setUint32(0,Math.floor(e/2**32),!1),s(this,tt).setUint32(4,e,!1),this.write(s(this,Pe).subarray(0,8))}writeAscii(e){for(let t=0;t<e.length;t++)s(this,tt).setUint8(t%8,e.charCodeAt(t)),t%8===7&&this.write(s(this,Pe));e.length%8!==0&&this.write(s(this,Pe).subarray(0,e.length%8))}writeBox(e){if(this.offsets.set(e,this.pos),e.contents&&!e.children)this.writeBoxHeader(e,e.size??e.contents.byteLength+8),this.write(e.contents);else{let t=this.pos;if(this.writeBoxHeader(e,0),e.contents&&this.write(e.contents),e.children)for(let i of e.children)i&&this.writeBox(i);let n=this.pos,o=e.size??n-t;this.seek(t),this.writeBoxHeader(e,o),this.seek(n)}}writeBoxHeader(e,t){this.writeU32(e.largeSize?1:t),this.writeAscii(e.type),e.largeSize&&this.writeU64(t)}measureBoxHeader(e){return 8+(e.largeSize?8:0)}patchBox(e){let t=this.pos;this.seek(this.offsets.get(e)),this.writeBox(e),this.seek(t)}measureBox(e){if(e.contents&&!e.children)return this.measureBoxHeader(e)+e.contents.byteLength;{let t=this.measureBoxHeader(e);if(e.contents&&(t+=e.contents.byteLength),e.children)for(let n of e.children)n&&(t+=this.measureBox(n));return t}}};Pe=new WeakMap;tt=new WeakMap;var Et,He,bt,ht,qt,nn,Tr=class extends Zn{constructor(e){super(),Y(this,qt),Y(this,Et,void 0),Y(this,He,new ArrayBuffer(2**16)),Y(this,bt,new Uint8Array(s(this,He))),Y(this,ht,0),ne(this,Et,e)}write(e){_(this,qt,nn).call(this,this.pos+e.byteLength),s(this,bt).set(e,this.pos),this.pos+=e.byteLength,ne(this,ht,Math.max(s(this,ht),this.pos))}finalize(){_(this,qt,nn).call(this,this.pos),s(this,Et).buffer=s(this,He).slice(0,Math.max(s(this,ht),this.pos))}};Et=new WeakMap;He=new WeakMap;bt=new WeakMap;ht=new WeakMap;qt=new WeakSet;nn=function(e){let t=s(this,He).byteLength;for(;t<e;)t*=2;if(t===s(this,He).byteLength)return;let n=new ArrayBuffer(t),o=new Uint8Array(n);o.set(s(this,bt),0),ne(this,He,n),ne(this,bt,o)};var br=2**24,Sr=2,wt,Re,mt,ze,he,Yt,on,gn,Wn,wn,Fn,vt,Bt,vn=class extends Zn{constructor(e){super(),Y(this,Yt),Y(this,gn),Y(this,wn),Y(this,vt),Y(this,wt,void 0),Y(this,Re,[]),Y(this,mt,void 0),Y(this,ze,void 0),Y(this,he,[]),ne(this,wt,e),ne(this,mt,e.options?.chunked??!1),ne(this,ze,e.options?.chunkSize??br)}write(e){s(this,Re).push({data:e.slice(),start:this.pos}),this.pos+=e.byteLength}flush(){if(s(this,Re).length===0)return;let e=[],t=[...s(this,Re)].sort((n,o)=>n.start-o.start);e.push({start:t[0].start,size:t[0].data.byteLength});for(let n=1;n<t.length;n++){let o=e[e.length-1],i=t[n];i.start<=o.start+o.size?o.size=Math.max(o.size,i.start+i.data.byteLength-o.start):e.push({start:i.start,size:i.data.byteLength})}for(let n of e){n.data=new Uint8Array(n.size);for(let o of s(this,Re))n.start<=o.start&&o.start<n.start+n.size&&n.data.set(o.data,o.start-n.start);s(this,mt)?(_(this,Yt,on).call(this,n.data,n.start),_(this,vt,Bt).call(this)):s(this,wt).options.onData?.(n.data,n.start)}s(this,Re).length=0}finalize(){s(this,mt)&&_(this,vt,Bt).call(this,!0)}};wt=new WeakMap;Re=new WeakMap;mt=new WeakMap;ze=new WeakMap;he=new WeakMap;Yt=new WeakSet;on=function(e,t){let n=s(this,he).findIndex(u=>u.start<=t&&t<u.start+s(this,ze));n===-1&&(n=_(this,wn,Fn).call(this,t));let o=s(this,he)[n],i=t-o.start,a=e.subarray(0,Math.min(s(this,ze)-i,e.byteLength));o.data.set(a,i);let c={start:i,end:i+a.byteLength};if(_(this,gn,Wn).call(this,o,c),o.written[0].start===0&&o.written[0].end===s(this,ze)&&(o.shouldFlush=!0),s(this,he).length>Sr){for(let u=0;u<s(this,he).length-1;u++)s(this,he)[u].shouldFlush=!0;_(this,vt,Bt).call(this)}a.byteLength<e.byteLength&&_(this,Yt,on).call(this,e.subarray(a.byteLength),t+a.byteLength)};gn=new WeakSet;Wn=function(e,t){let n=0,o=e.written.length-1,i=-1;for(;n<=o;){let a=Math.floor(n+(o-n+1)/2);e.written[a].start<=t.start?(n=a+1,i=a):o=a-1}for(e.written.splice(i+1,0,t),(i===-1||e.written[i].end<t.start)&&i++;i<e.written.length-1&&e.written[i].end>=e.written[i+1].start;)e.written[i].end=Math.max(e.written[i].end,e.written[i+1].end),e.written.splice(i+1,1)};wn=new WeakSet;Fn=function(e){let n={start:Math.floor(e/s(this,ze))*s(this,ze),data:new Uint8Array(s(this,ze)),written:[],shouldFlush:!1};return s(this,he).push(n),s(this,he).sort((o,i)=>o.start-i.start),s(this,he).indexOf(n)};vt=new WeakSet;Bt=function(e=!1){for(let t=0;t<s(this,he).length;t++){let n=s(this,he)[t];if(!(!n.shouldFlush&&!e)){for(let o of n.written)s(this,wt).options.onData?.(n.data.subarray(o.start,o.end),n.start+o.start);s(this,he).splice(t--,1)}}};var xr=class extends vn{constructor(e){super(new Rn({onData:(t,n)=>e.stream.write({type:"write",data:t,position:n}),chunked:!0,chunkSize:e.options?.chunkSize}))}},rn=1e3,Cr=["avc","hevc","vp9","av1"],Er=["aac","opus"],qr=2082844800,zr=["strict","offset","cross-track-offset"],y,C,Ot,pe,re,ee,nt,ot,kn,Ze,We,kt,an,Un,sn,Hn,yn,Gn,cn,jn,Tn,Qn,zt,un,ye,Ee,bn,$n,yt,Lt,_t,Sn,st,St,Xt,dn,Xr=class{constructor(e){if(Y(this,an),Y(this,sn),Y(this,yn),Y(this,cn),Y(this,Tn),Y(this,zt),Y(this,ye),Y(this,bn),Y(this,yt),Y(this,_t),Y(this,st),Y(this,Xt),Y(this,y,void 0),Y(this,C,void 0),Y(this,Ot,void 0),Y(this,pe,void 0),Y(this,re,null),Y(this,ee,null),Y(this,nt,Math.floor(Date.now()/1e3)+qr),Y(this,ot,[]),Y(this,kn,1),Y(this,Ze,[]),Y(this,We,[]),Y(this,kt,!1),_(this,an,Un).call(this,e),e.video=gt(e.video),e.audio=gt(e.audio),e.fastStart=gt(e.fastStart),this.target=e.target,ne(this,y,{firstTimestampBehavior:"strict",...e}),e.target instanceof Pn)ne(this,C,new Tr(e.target));else if(e.target instanceof Rn)ne(this,C,new vn(e.target));else if(e.target instanceof yr)ne(this,C,new xr(e.target));else throw new Error(`Invalid target: ${e.target}`);_(this,cn,jn).call(this),_(this,sn,Hn).call(this)}addVideoChunk(e,t,n,o){if(!(e instanceof EncodedVideoChunk))throw new TypeError("addVideoChunk's first argument (sample) must be of type EncodedVideoChunk.");if(t&&typeof t!="object")throw new TypeError("addVideoChunk's second argument (meta), when provided, must be an object.");if(n!==void 0&&(!Number.isFinite(n)||n<0))throw new TypeError("addVideoChunk's third argument (timestamp), when provided, must be a non-negative real number.");if(o!==void 0&&!Number.isFinite(o))throw new TypeError("addVideoChunk's fourth argument (compositionTimeOffset), when provided, must be a real number.");let i=new Uint8Array(e.byteLength);e.copyTo(i),this.addVideoChunkRaw(i,e.type,n??e.timestamp,e.duration,t,o)}addVideoChunkRaw(e,t,n,o,i,a){if(!(e instanceof Uint8Array))throw new TypeError("addVideoChunkRaw's first argument (data) must be an instance of Uint8Array.");if(t!=="key"&&t!=="delta")throw new TypeError("addVideoChunkRaw's second argument (type) must be either 'key' or 'delta'.");if(!Number.isFinite(n)||n<0)throw new TypeError("addVideoChunkRaw's third argument (timestamp) must be a non-negative real number.");if(!Number.isFinite(o)||o<0)throw new TypeError("addVideoChunkRaw's fourth argument (duration) must be a non-negative real number.");if(i&&typeof i!="object")throw new TypeError("addVideoChunkRaw's fifth argument (meta), when provided, must be an object.");if(a!==void 0&&!Number.isFinite(a))throw new TypeError("addVideoChunkRaw's sixth argument (compositionTimeOffset), when provided, must be a real number.");if(_(this,Xt,dn).call(this),!s(this,y).video)throw new Error("No video track declared.");if(typeof s(this,y).fastStart=="object"&&s(this,re).samples.length===s(this,y).fastStart.expectedVideoChunks)throw new Error(`Cannot add more video chunks than specified in 'fastStart' (${s(this,y).fastStart.expectedVideoChunks}).`);let c=_(this,zt,un).call(this,s(this,re),e,t,n,o,i,a);if(s(this,y).fastStart==="fragmented"&&s(this,ee)){for(;s(this,We).length>0&&s(this,We)[0].decodeTimestamp<=c.decodeTimestamp;){let u=s(this,We).shift();_(this,ye,Ee).call(this,s(this,ee),u)}c.decodeTimestamp<=s(this,ee).lastDecodeTimestamp?_(this,ye,Ee).call(this,s(this,re),c):s(this,Ze).push(c)}else _(this,ye,Ee).call(this,s(this,re),c)}addAudioChunk(e,t,n){if(!(e instanceof EncodedAudioChunk))throw new TypeError("addAudioChunk's first argument (sample) must be of type EncodedAudioChunk.");if(t&&typeof t!="object")throw new TypeError("addAudioChunk's second argument (meta), when provided, must be an object.");if(n!==void 0&&(!Number.isFinite(n)||n<0))throw new TypeError("addAudioChunk's third argument (timestamp), when provided, must be a non-negative real number.");let o=new Uint8Array(e.byteLength);e.copyTo(o),this.addAudioChunkRaw(o,e.type,n??e.timestamp,e.duration,t)}addAudioChunkRaw(e,t,n,o,i){if(!(e instanceof Uint8Array))throw new TypeError("addAudioChunkRaw's first argument (data) must be an instance of Uint8Array.");if(t!=="key"&&t!=="delta")throw new TypeError("addAudioChunkRaw's second argument (type) must be either 'key' or 'delta'.");if(!Number.isFinite(n)||n<0)throw new TypeError("addAudioChunkRaw's third argument (timestamp) must be a non-negative real number.");if(!Number.isFinite(o)||o<0)throw new TypeError("addAudioChunkRaw's fourth argument (duration) must be a non-negative real number.");if(i&&typeof i!="object")throw new TypeError("addAudioChunkRaw's fifth argument (meta), when provided, must be an object.");if(_(this,Xt,dn).call(this),!s(this,y).audio)throw new Error("No audio track declared.");if(typeof s(this,y).fastStart=="object"&&s(this,ee).samples.length===s(this,y).fastStart.expectedAudioChunks)throw new Error(`Cannot add more audio chunks than specified in 'fastStart' (${s(this,y).fastStart.expectedAudioChunks}).`);let a=_(this,zt,un).call(this,s(this,ee),e,t,n,o,i);if(s(this,y).fastStart==="fragmented"&&s(this,re)){for(;s(this,Ze).length>0&&s(this,Ze)[0].decodeTimestamp<=a.decodeTimestamp;){let c=s(this,Ze).shift();_(this,ye,Ee).call(this,s(this,re),c)}a.decodeTimestamp<=s(this,re).lastDecodeTimestamp?_(this,ye,Ee).call(this,s(this,ee),a):s(this,We).push(a)}else _(this,ye,Ee).call(this,s(this,ee),a)}finalize(){if(s(this,kt))throw new Error("Cannot finalize a muxer more than once.");if(s(this,y).fastStart==="fragmented"){for(let t of s(this,Ze))_(this,ye,Ee).call(this,s(this,re),t);for(let t of s(this,We))_(this,ye,Ee).call(this,s(this,ee),t);_(this,_t,Sn).call(this,!1)}else s(this,re)&&_(this,yt,Lt).call(this,s(this,re)),s(this,ee)&&_(this,yt,Lt).call(this,s(this,ee));let e=[s(this,re),s(this,ee)].filter(Boolean);if(s(this,y).fastStart==="in-memory"){let t;for(let o=0;o<2;o++){let i=Ct(e,s(this,nt)),a=s(this,C).measureBox(i);t=s(this,C).measureBox(s(this,pe));let c=s(this,C).pos+a+t;for(let u of s(this,ot)){u.offset=c;for(let{data:l}of u.samples)c+=l.byteLength,t+=l.byteLength}if(c<2**32)break;t>=2**32&&(s(this,pe).largeSize=!0)}let n=Ct(e,s(this,nt));s(this,C).writeBox(n),s(this,pe).size=t,s(this,C).writeBox(s(this,pe));for(let o of s(this,ot))for(let i of o.samples)s(this,C).write(i.data),i.data=null}else if(s(this,y).fastStart==="fragmented"){let t=s(this,C).pos,n=pr(e);s(this,C).writeBox(n);let o=s(this,C).pos-t;s(this,C).seek(s(this,C).pos-4),s(this,C).writeU32(o)}else{let t=s(this,C).offsets.get(s(this,pe)),n=s(this,C).pos-t;s(this,pe).size=n,s(this,pe).largeSize=n>=2**32,s(this,C).patchBox(s(this,pe));let o=Ct(e,s(this,nt));if(typeof s(this,y).fastStart=="object"){s(this,C).seek(s(this,Ot)),s(this,C).writeBox(o);let i=t-s(this,C).pos;s(this,C).writeBox(qo(i))}else s(this,C).writeBox(o)}_(this,st,St).call(this),s(this,C).finalize(),ne(this,kt,!0)}};y=new WeakMap;C=new WeakMap;Ot=new WeakMap;pe=new WeakMap;re=new WeakMap;ee=new WeakMap;nt=new WeakMap;ot=new WeakMap;kn=new WeakMap;Ze=new WeakMap;We=new WeakMap;kt=new WeakMap;an=new WeakSet;Un=function(e){if(typeof e!="object")throw new TypeError("The muxer requires an options object to be passed to its constructor.");if(!(e.target instanceof It))throw new TypeError("The target must be provided and an instance of Target.");if(e.video){if(!Cr.includes(e.video.codec))throw new TypeError(`Unsupported video codec: ${e.video.codec}`);if(!Number.isInteger(e.video.width)||e.video.width<=0)throw new TypeError(`Invalid video width: ${e.video.width}. Must be a positive integer.`);if(!Number.isInteger(e.video.height)||e.video.height<=0)throw new TypeError(`Invalid video height: ${e.video.height}. Must be a positive integer.`);const t=e.video.rotation;if(typeof t=="number"&&![0,90,180,270].includes(t))throw new TypeError(`Invalid video rotation: ${t}. Has to be 0, 90, 180 or 270.`);if(Array.isArray(t)&&(t.length!==9||t.some(n=>typeof n!="number")))throw new TypeError(`Invalid video transformation matrix: ${t.join()}`);if(e.video.frameRate!==void 0&&(!Number.isInteger(e.video.frameRate)||e.video.frameRate<=0))throw new TypeError(`Invalid video frame rate: ${e.video.frameRate}. Must be a positive integer.`)}if(e.audio){if(!Er.includes(e.audio.codec))throw new TypeError(`Unsupported audio codec: ${e.audio.codec}`);if(!Number.isInteger(e.audio.numberOfChannels)||e.audio.numberOfChannels<=0)throw new TypeError(`Invalid number of audio channels: ${e.audio.numberOfChannels}. Must be a positive integer.`);if(!Number.isInteger(e.audio.sampleRate)||e.audio.sampleRate<=0)throw new TypeError(`Invalid audio sample rate: ${e.audio.sampleRate}. Must be a positive integer.`)}if(e.firstTimestampBehavior&&!zr.includes(e.firstTimestampBehavior))throw new TypeError(`Invalid first timestamp behavior: ${e.firstTimestampBehavior}`);if(typeof e.fastStart=="object"){if(e.video){if(e.fastStart.expectedVideoChunks===void 0)throw new TypeError("'fastStart' is an object but is missing property 'expectedVideoChunks'.");if(!Number.isInteger(e.fastStart.expectedVideoChunks)||e.fastStart.expectedVideoChunks<0)throw new TypeError("'expectedVideoChunks' must be a non-negative integer.")}if(e.audio){if(e.fastStart.expectedAudioChunks===void 0)throw new TypeError("'fastStart' is an object but is missing property 'expectedAudioChunks'.");if(!Number.isInteger(e.fastStart.expectedAudioChunks)||e.fastStart.expectedAudioChunks<0)throw new TypeError("'expectedAudioChunks' must be a non-negative integer.")}}else if(![!1,"in-memory","fragmented"].includes(e.fastStart))throw new TypeError("'fastStart' option must be false, 'in-memory', 'fragmented' or an object.");if(e.minFragmentDuration!==void 0&&(!Number.isFinite(e.minFragmentDuration)||e.minFragmentDuration<0))throw new TypeError("'minFragmentDuration' must be a non-negative number.")};sn=new WeakSet;Hn=function(){if(s(this,C).writeBox(Eo({holdsAvc:s(this,y).video?.codec==="avc",fragmented:s(this,y).fastStart==="fragmented"})),ne(this,Ot,s(this,C).pos),s(this,y).fastStart==="in-memory")ne(this,pe,tn(!1));else if(s(this,y).fastStart!=="fragmented"){if(typeof s(this,y).fastStart=="object"){let e=_(this,yn,Gn).call(this);s(this,C).seek(s(this,C).pos+e)}ne(this,pe,tn(!0)),s(this,C).writeBox(s(this,pe))}_(this,st,St).call(this)};yn=new WeakSet;Gn=function(){if(typeof s(this,y).fastStart!="object")return;let e=0,t=[s(this,y).fastStart.expectedVideoChunks,s(this,y).fastStart.expectedAudioChunks];for(let n of t)n&&(e+=8*Math.ceil(2/3*n),e+=4*n,e+=12*Math.ceil(2/3*n),e+=4*n,e+=8*n);return e+=4096,e};cn=new WeakSet;jn=function(){if(s(this,y).video&&ne(this,re,{id:1,info:{type:"video",codec:s(this,y).video.codec,width:s(this,y).video.width,height:s(this,y).video.height,rotation:s(this,y).video.rotation??0,decoderConfig:null},timescale:s(this,y).video.frameRate??57600,samples:[],finalizedChunks:[],currentChunk:null,firstDecodeTimestamp:void 0,lastDecodeTimestamp:-1,timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,compactlyCodedChunkTable:[]}),s(this,y).audio&&(ne(this,ee,{id:s(this,y).video?2:1,info:{type:"audio",codec:s(this,y).audio.codec,numberOfChannels:s(this,y).audio.numberOfChannels,sampleRate:s(this,y).audio.sampleRate,decoderConfig:null},timescale:s(this,y).audio.sampleRate,samples:[],finalizedChunks:[],currentChunk:null,firstDecodeTimestamp:void 0,lastDecodeTimestamp:-1,timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,compactlyCodedChunkTable:[]}),s(this,y).audio.codec==="aac")){let e=_(this,Tn,Qn).call(this,2,s(this,y).audio.sampleRate,s(this,y).audio.numberOfChannels);s(this,ee).info.decoderConfig={codec:s(this,y).audio.codec,description:e,numberOfChannels:s(this,y).audio.numberOfChannels,sampleRate:s(this,y).audio.sampleRate}}};Tn=new WeakSet;Qn=function(e,t,n){let i=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350].indexOf(t),a=n,c="";c+=e.toString(2).padStart(5,"0"),c+=i.toString(2).padStart(4,"0"),i===15&&(c+=t.toString(2).padStart(24,"0")),c+=a.toString(2).padStart(4,"0");let u=Math.ceil(c.length/8)*8;c=c.padEnd(u,"0");let l=new Uint8Array(c.length/8);for(let p=0;p<c.length;p+=8)l[p/8]=parseInt(c.slice(p,p+8),2);return l};zt=new WeakSet;un=function(e,t,n,o,i,a,c){let u=o/1e6,l=(o-(c??0))/1e6,p=i/1e6,f=_(this,bn,$n).call(this,u,l,e);return u=f.presentationTimestamp,l=f.decodeTimestamp,a?.decoderConfig&&(e.info.decoderConfig===null?e.info.decoderConfig=a.decoderConfig:Object.assign(e.info.decoderConfig,a.decoderConfig)),{presentationTimestamp:u,decodeTimestamp:l,duration:p,data:t,size:t.byteLength,type:n,timescaleUnitsToNextSample:xe(p,e.timescale)}};ye=new WeakSet;Ee=function(e,t){s(this,y).fastStart!=="fragmented"&&e.samples.push(t);const n=xe(t.presentationTimestamp-t.decodeTimestamp,e.timescale);if(e.lastTimescaleUnits!==null){let i=xe(t.decodeTimestamp,e.timescale,!1),a=Math.round(i-e.lastTimescaleUnits);if(e.lastTimescaleUnits+=a,e.lastSample.timescaleUnitsToNextSample=a,s(this,y).fastStart!=="fragmented"){let c=At(e.timeToSampleTable);c.sampleCount===1?(c.sampleDelta=a,c.sampleCount++):c.sampleDelta===a?c.sampleCount++:(c.sampleCount--,e.timeToSampleTable.push({sampleCount:2,sampleDelta:a}));const u=At(e.compositionTimeOffsetTable);u.sampleCompositionTimeOffset===n?u.sampleCount++:e.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:n})}}else e.lastTimescaleUnits=0,s(this,y).fastStart!=="fragmented"&&(e.timeToSampleTable.push({sampleCount:1,sampleDelta:xe(t.duration,e.timescale)}),e.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:n}));e.lastSample=t;let o=!1;if(!e.currentChunk)o=!0;else{let i=t.presentationTimestamp-e.currentChunk.startTimestamp;if(s(this,y).fastStart==="fragmented"){let a=s(this,re)??s(this,ee);const c=s(this,y).minFragmentDuration??1;e===a&&t.type==="key"&&i>=c&&(o=!0,_(this,_t,Sn).call(this))}else o=i>=.5}o&&(e.currentChunk&&_(this,yt,Lt).call(this,e),e.currentChunk={startTimestamp:t.presentationTimestamp,samples:[]}),e.currentChunk.samples.push(t)};bn=new WeakSet;$n=function(e,t,n){const o=s(this,y).firstTimestampBehavior==="strict",i=n.lastDecodeTimestamp===-1;if(o&&i&&t!==0)throw new Error(`The first chunk for your media track must have a timestamp of 0 (received DTS=${t}).Non-zero first timestamps are often caused by directly piping frames or audio data from a MediaStreamTrack into the encoder. Their timestamps are typically relative to the age of thedocument, which is probably what you want.

If you want to offset all timestamps of a track such that the first one is zero, set firstTimestampBehavior: 'offset' in the options.
`);if(s(this,y).firstTimestampBehavior==="offset"||s(this,y).firstTimestampBehavior==="cross-track-offset"){n.firstDecodeTimestamp===void 0&&(n.firstDecodeTimestamp=t);let c;s(this,y).firstTimestampBehavior==="offset"?c=n.firstDecodeTimestamp:c=Math.min(s(this,re)?.firstDecodeTimestamp??1/0,s(this,ee)?.firstDecodeTimestamp??1/0),t-=c,e-=c}if(t<n.lastDecodeTimestamp)throw new Error(`Timestamps must be monotonically increasing (DTS went from ${n.lastDecodeTimestamp*1e6} to ${t*1e6}).`);return n.lastDecodeTimestamp=t,{presentationTimestamp:e,decodeTimestamp:t}};yt=new WeakSet;Lt=function(e){if(s(this,y).fastStart==="fragmented")throw new Error("Can't finalize individual chunks if 'fastStart' is set to 'fragmented'.");if(e.currentChunk){if(e.finalizedChunks.push(e.currentChunk),s(this,ot).push(e.currentChunk),(e.compactlyCodedChunkTable.length===0||At(e.compactlyCodedChunkTable).samplesPerChunk!==e.currentChunk.samples.length)&&e.compactlyCodedChunkTable.push({firstChunk:e.finalizedChunks.length,samplesPerChunk:e.currentChunk.samples.length}),s(this,y).fastStart==="in-memory"){e.currentChunk.offset=0;return}e.currentChunk.offset=s(this,C).pos;for(let t of e.currentChunk.samples)s(this,C).write(t.data),t.data=null;_(this,st,St).call(this)}};_t=new WeakSet;Sn=function(e=!0){if(s(this,y).fastStart!=="fragmented")throw new Error("Can't finalize a fragment unless 'fastStart' is set to 'fragmented'.");let t=[s(this,re),s(this,ee)].filter(u=>u&&u.currentChunk);if(t.length===0)return;let n=So(this,kn)._++;if(n===1){let u=Ct(t,s(this,nt),!0);s(this,C).writeBox(u)}let o=s(this,C).pos,i=Xn(n,t);s(this,C).writeBox(i);{let u=tn(!1),l=0;for(let f of t)for(let w of f.currentChunk.samples)l+=w.size;let p=s(this,C).measureBox(u)+l;p>=2**32&&(u.largeSize=!0,p=s(this,C).measureBox(u)+l),u.size=p,s(this,C).writeBox(u)}for(let u of t){u.currentChunk.offset=s(this,C).pos,u.currentChunk.moofOffset=o;for(let l of u.currentChunk.samples)s(this,C).write(l.data),l.data=null}let a=s(this,C).pos;s(this,C).seek(s(this,C).offsets.get(i));let c=Xn(n,t);s(this,C).writeBox(c),s(this,C).seek(a);for(let u of t)u.finalizedChunks.push(u.currentChunk),s(this,ot).push(u.currentChunk),u.currentChunk=null;e&&_(this,st,St).call(this)};st=new WeakSet;St=function(){s(this,C)instanceof vn&&s(this,C).flush()};Xt=new WeakSet;dn=function(){if(s(this,kt))throw new Error("Cannot add new video or audio chunks after the file has been finalized.")};async function Ar(e,t,n,o){const i=Math.ceil(n.durationSeconds*n.fps),a=new Xr({target:new Pn,video:{codec:"avc",width:n.width,height:n.height},fastStart:"in-memory"}),c=new VideoEncoder({output:(l,p)=>a.addVideoChunk(l,p),error:l=>console.error("Encoder error:",l)});c.configure({codec:"avc1.640032",width:n.width,height:n.height,bitrate:n.bitrate,framerate:n.fps});const u=1/n.fps;for(let l=0;l<i;l++){t.step(u);const p=new VideoFrame(e,{timestamp:l*1e6/n.fps});c.encode(p),p.close(),l%30===0&&(o?.(l,i),await new Promise(f=>setTimeout(f,0)))}return await c.flush(),a.finalize(),new Blob([a.target.buffer],{type:"video/mp4"})}function Yr(e,t){const n=URL.createObjectURL(e),o=document.createElement("a");o.href=n,o.download=t,o.click(),URL.revokeObjectURL(n)}function Kn(e,t="controller"){const n=e.getEntityByName(t);return n===null?null:{eid:n,get step(){return lt.step[n]},set step(o){lt.step[n]=o},get target(){return lt.target[n]},set target(o){lt.target[n]=o},get max(){return lt.max[n]}}}let ft=null;function Ut(e){const t=document.getElementById("recording-status");t&&(t.textContent=e)}function Br(e,t,n,o,i){if(ft)return;ft=document.createElement("div"),ft.id="recording-ui",ft.innerHTML=`
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
  `,document.body.appendChild(ft);const a=()=>{const c=document.getElementById("current-step"),u=document.getElementById("max-step"),l=document.getElementById("rec-prev"),p=document.getElementById("rec-next"),f=document.getElementById("rec-record-next");c&&(c.textContent=String(e.target)),u&&(u.textContent=String(e.max)),l&&(l.disabled=e.target<=0),p&&(p.disabled=e.target>=e.max),f&&(f.disabled=e.target>=e.max||i())};document.getElementById("rec-prev")?.addEventListener("click",()=>{t(),a()}),document.getElementById("rec-next")?.addEventListener("click",()=>{n(),a()}),document.getElementById("rec-record-next")?.addEventListener("click",async()=>{await o(),a()}),document.addEventListener("keydown",c=>{c.key.toLowerCase()==="r"&&!i()&&o().then(a),c.key==="ArrowLeft"&&e.target>0&&!i()&&(t(),a()),c.key==="ArrowRight"&&e.target<e.max&&!i()&&(n(),a())}),setInterval(a,100),a()}let Fe=!1;function Or(e,t,n){const o=`${e}-${t}`,i=n[o];return i?{name:i,fromStep:e,toStep:t}:null}async function Lr(e,t,n,o,i,a){if(Fe)return;Fe=!0;const c=Or(n,o,i);if(!c){console.error(`No sequence found for ${n}-${o}`),Fe=!1;return}const u=Kn(t);if(!u){console.error("No step controller found"),Fe=!1;return}const l=e.width,p=e.height,f=e.style.cssText;document.body.classList.add("recording-mode"),e.classList.add("recording-target"),e.width=a.width,e.height=a.height,e.style.cssText=`width:${a.width}px;height:${a.height}px;display:block`,window.dispatchEvent(new Event("resize")),await new Promise(b=>requestAnimationFrame(b)),Ut(`Recording ${c.name}...`),u.target=o;const w=performance.now(),E=await Ar(e,t,a,(b,S)=>{Ut(`Recording ${c.name}: ${b}/${S}`)}),T=performance.now()-w,z=a.durationSeconds*1e3/T;document.body.classList.remove("recording-mode"),e.classList.remove("recording-target"),e.width=l,e.height=p,e.style.cssText=f,window.dispatchEvent(new Event("resize")),Yr(E,`step-${n}-${o}.mp4`),Ut(`Done! ${(E.size/1024/1024).toFixed(1)} MB, ${z.toFixed(1)}x realtime`),Fe=!1}function _r(e,t,n={}){const o={...bo,...n},i=setInterval(()=>{const a=document.querySelector(e);if(a?.__state__){clearInterval(i);const c=a.__state__,u=Kn(c);if(!u)return;Br(u,()=>{u.target>0&&(u.target=u.target-1)},()=>{u.target<u.max&&(u.target=u.target+1)},()=>{if(Fe||u.target>=u.max)return Promise.resolve();const l=u.target,p=l+1;return Lr(a,c,l,p,t,o)},()=>Fe)}},100)}const O=W({separationT:r.f32,baseGap:r.f32,gap:r.f32,baseY:r.f32,separatedY:r.f32,fontSize:r.f32,color:r.ui32,initialized:r.ui8,measuredCount:r.ui8,tokenCount:r.ui8,layoutReady:r.ui8}),m=W({driver:r.eid,index:r.ui8,baseX:r.f32,separatedX:r.f32,width:r.f32,layoutScale:r.f32,skipArrow:r.ui8,skipVector:r.ui8}),ct=W({color:r.ui32,padding:r.f32,underlineOnly:r.ui8,offsetT:r.f32}),X=W({showTop:r.ui8,showRight:r.ui8,showBottom:r.ui8,showLeft:r.ui8,color:r.ui32,padding:r.f32,initialized:r.ui8,lineTop:r.eid,lineRight:r.eid,lineBottom:r.eid,lineLeft:r.eid}),Jn=j([O]),Ve=j([m]);j([ct]);const Vr=j([X]),An=new WeakMap,Yn=new WeakMap;function eo(e){let t=An.get(e);return t||(t=new Map,An.set(e,t)),t}function xn(e){let t=Yn.get(e);return t||(t=new Set,Yn.set(e,t)),t}function Mr(e,t,n){eo(e).set(t,n)}function Dr(e,t){return eo(e).get(t)||""}function Ir(e,t){xn(e).add(t)}function Nr(e,t){xn(e).delete(t)}function Pr(e){return xn(e)}const Rr={group:"simulation",setup(e){for(const t of Jn(e.world)){if(O.initialized[t])continue;const n=Dr(e,t);if(!n)continue;const o=n.split(" ").filter(c=>c.length>0);if(o.length===0)continue;O.tokenCount[t]=o.length,O.initialized[t]=1;const i=O.fontSize[t],a=O.color[t];for(let c=0;c<o.length;c++){const u=e.createEntity();e.addComponent(u,d,{posX:0,posY:0,posZ:0,rotW:1,scaleX:1,scaleY:1,scaleZ:1}),e.addComponent(u,le,{entity:t}),e.addComponent(u,Xe,{fontSize:i,color:a}),e.addComponent(u,m,{driver:t,index:c,baseX:0,separatedX:0,width:0,layoutScale:1}),Ae(e,u,o[c]),Ir(e,u)}}}},Zr={group:"draw",update(e){const t=Pr(e);for(const n of t)vo(e,n,o=>{m.width[n]=o.width;const i=m.driver[n];O.measuredCount[i]++,Nr(e,n)})}},Wr={group:"simulation",update(e){for(const n of Jn(e.world)){const o=O.tokenCount[n],i=O.measuredCount[n];if(o===0||i<o)continue;const a=[];for(const u of Ve(e.world))m.driver[u]===n&&a.push(u);a.sort((u,l)=>m.index[u]-m.index[l]);let c=!1;for(const u of a)if(m.layoutScale[u]<1){c=!0;break}if(!O.layoutReady[n]||c){const u=O.baseGap[n],l=O.gap[n],p=a.map(q=>m.width[q]*m.layoutScale[q]),f=p.filter(q=>q>0).length,w=p.reduce((q,H)=>q+H,0),E=Math.max(0,f-1),T=w+u*E,z=w+l*E;let b=-T/2,S=-z/2;for(let q=0;q<a.length;q++){const H=a[q],Q=p[q];Q>0&&(m.baseX[H]=b+Q/2,m.separatedX[H]=S+Q/2,b+=Q+u,S+=Q+l)}O.layoutReady[n]=1}}const t=1-Math.exp(-12*e.time.deltaTime);for(const n of Ve(e.world)){const o=m.driver[n];if(!O.layoutReady[o]||m.layoutScale[n]===0)continue;const a=O.separationT[o],c=m.baseX[n]+(m.separatedX[n]-m.baseX[n])*a,u=O.baseY[o]+(O.separatedY[o]-O.baseY[o])*a;d.posX[n]+=(c-d.posX[n])*t,d.posY[n]+=(u-d.posY[n])*t}}};function xt(e,t){const n=e.createEntity();return e.addComponent(n,d,{posX:0,posY:0,posZ:0}),e.addComponent(n,g,{offsetX:0,offsetY:0,offsetZ:0,color:t,visible:0,thickness:1.5}),n}const Fr=j([X,m,d]),Ur={group:"simulation",update(e){for(const t of Ve(e.world)){if(e.hasComponent(t,X))continue;const n=m.driver[t];if(!e.hasComponent(n,ct)||!O.layoutReady[n])continue;const o=ct,i=o.underlineOnly[n]===1;e.addComponent(t,X,{showTop:i?0:1,showRight:i?0:1,showBottom:1,showLeft:i?0:1,color:o.color[n],padding:o.padding[n]})}for(const t of Fr(e.world)){if(X.initialized[t])continue;const n=m.driver[t];if(!O.layoutReady[n])continue;const o=X.color[t]||O.color[n],i=xt(e,o),a=xt(e,o),c=xt(e,o),u=xt(e,o);X.lineTop[t]=i,X.lineRight[t]=a,X.lineBottom[t]=c,X.lineLeft[t]=u,g.visible[i]=X.showTop[t],g.visible[a]=X.showRight[t],g.visible[c]=X.showBottom[t],g.visible[u]=X.showLeft[t],X.initialized[t]=1}}},to={group:"simulation",update(e){for(const t of Vr(e.world)){if(!X.initialized[t])continue;const n=m.driver[t],o=d.posX[t],i=d.posY[t],a=d.posZ[t],c=m.width[t],u=O.fontSize[n],l=X.padding[t],p=c/2+l,f=u/2+l,w=o-p,E=o+p,T=i+f,z=i-f,b=E-w,S=T-z,q=X.lineTop[t],H=X.lineRight[t],Q=X.lineBottom[t],ie=X.lineLeft[t];g.visible[q]=X.showTop[t],g.visible[H]=X.showRight[t],g.visible[Q]=X.showBottom[t],g.visible[ie]=X.showLeft[t];const $=Math.min(1,Math.max(0,ct.offsetT[n]));d.posX[q]=w,d.posY[q]=T,d.posZ[q]=a,g.offsetX[q]=b*$,d.posX[H]=E,d.posY[H]=T,d.posZ[H]=a,g.offsetY[H]=-S*$,d.posX[Q]=w,d.posY[Q]=z,d.posZ[Q]=a,g.offsetX[Q]=b*$,d.posX[ie]=w,d.posY[ie]=z,d.posZ[ie]=a,g.offsetY[ie]=S*$}}},Hr={name:"token-driver",components:["token-driver","transform"]},Gr={components:{TokenDriver:O,Token:m,TokenBoxConfig:ct,TokenBox:X},systems:[Rr,Zr,Wr,Ur,to],recipes:[Hr],config:{defaults:{"token-driver":{separationT:0,baseGap:.4,gap:1.5,baseY:0,separatedY:0,fontSize:1.5,color:16777215,initialized:0,measuredCount:0,tokenCount:0,layoutReady:0},"token-box-config":{color:16777215,padding:.1,underlineOnly:0,offsetT:1},"token-box":{showTop:1,showRight:1,showBottom:1,showLeft:1,color:0,padding:.1,initialized:0,lineTop:0,lineRight:0,lineBottom:0,lineLeft:0}}}};function jr(e,t,n){e.addComponent(t,ct,{color:n?.color??16777215,padding:n?.padding,underlineOnly:n?.underlineOnly?1:0,offsetT:n?.offsetT})}const Ge=W({color:r.ui32,arrowHeight:r.f32,arrowSize:r.f32,thickness:r.f32,startOffset:r.f32}),Vt=W({growT:r.f32}),ce=W({driver:r.eid,lineEntity:r.eid,growT:r.f32,initialized:r.ui8}),Qr=j([ce]),Cn=j([ce,m,d]),$r={group:"simulation",update(e){for(const t of Ve(e.world)){if(e.hasComponent(t,ce)||m.skipArrow[t])continue;const n=m.driver[t];e.hasComponent(n,Ge)&&O.layoutReady[n]&&e.addComponent(t,ce,{driver:n,lineEntity:0,growT:0,initialized:0})}for(const t of Cn(e.world)){if(ce.initialized[t])continue;const n=ce.driver[t];if(!O.layoutReady[n])continue;const o=Ge,i=o.color[n],a=o.arrowSize[n],c=o.thickness[n],u=e.createEntity();e.addComponent(u,d,{posX:0,posY:0,posZ:0}),e.addComponent(u,F,{}),e.addComponent(u,g,{offsetX:0,offsetY:0,offsetZ:0,color:i,thickness:c,arrowEnd:1,arrowSize:a,visible:0}),ce.lineEntity[t]=u,ce.initialized[t]=1}}},no={group:"simulation",update(e){for(const t of Cn(e.world)){const n=ce.driver[t];e.hasComponent(n,Vt)&&(ce.growT[t]=Vt.growT[n])}}},Kr={group:"draw",update(e){for(const t of Cn(e.world)){if(!ce.initialized[t])continue;const n=ce.driver[t],o=ce.lineEntity[t],i=ce.growT[t],a=O.fontSize[n],c=Ge.arrowHeight[n],u=Ge.startOffset[n],l=Ge.arrowSize[n],p=d.posX[t],f=d.posY[t],w=d.posZ[t];d.posX[o]=p,d.posY[o]=f+a/2+u,d.posZ[o]=w,g.offsetY[o]=c*i,g.arrowSize[o]=l*i,g.visible[o]=i>.01?1:0}}},Jr={components:{TokenArrowConfig:Ge,TokenArrowDriver:Vt,TokenArrow:ce},systems:[$r,no,Kr],config:{defaults:{"token-arrow-config":{color:16777215,arrowHeight:.5,arrowSize:.15,thickness:1.5,startOffset:.15},"token-arrow-driver":{growT:0},"token-arrow":{driver:0,lineEntity:0,growT:0,initialized:0}}}};function ei(e,t,n){e.addComponent(t,Ge,{color:n?.color??16777215,arrowHeight:n?.arrowHeight,arrowSize:n?.arrowSize??.15,thickness:n?.thickness??1.5,startOffset:n?.startOffset}),e.addComponent(t,Vt,{growT:0})}const N=W({axisLength:r.f32,axisColor:r.ui32,axisThickness:r.f32,axisNegativeOpacity:r.f32,vectorX:r.f32,vectorY:r.f32,vectorZ:r.f32,vectorColor:r.ui32,vectorThickness:r.f32,vectorArrowSize:r.f32,vectorGrowT:r.f32,axisXPosEntity:r.eid,axisXNegEntity:r.eid,axisYPosEntity:r.eid,axisYNegEntity:r.eid,axisZPosEntity:r.eid,axisZNegEntity:r.eid,vectorEntity:r.eid,initialized:r.ui8}),oo=j([N,d]);function De(e,t,n,o,i,a,c){const u=e.createEntity();return e.addComponent(u,d,{posX:0,posY:0,posZ:0}),e.addComponent(u,F,{}),e.addComponent(u,le,{entity:t}),e.addComponent(u,g,{offsetX:0,offsetY:0,offsetZ:0,color:n,thickness:o,opacity:i,arrowEnd:a,arrowSize:c,visible:1}),u}const ti={group:"simulation",update(e){for(const t of oo(e.world)){if(N.initialized[t])continue;const n=N.axisColor[t],o=N.axisThickness[t],i=N.axisNegativeOpacity[t],a=N.vectorColor[t],c=N.vectorThickness[t],u=N.vectorArrowSize[t];N.axisXPosEntity[t]=De(e,t,n,o,1,0,0),N.axisXNegEntity[t]=De(e,t,n,o,i,0,0),N.axisYPosEntity[t]=De(e,t,n,o,1,0,0),N.axisYNegEntity[t]=De(e,t,n,o,i,0,0),N.axisZPosEntity[t]=De(e,t,n,o,1,0,0),N.axisZNegEntity[t]=De(e,t,n,o,i,0,0),N.vectorEntity[t]=De(e,t,a,c,1,1,u),N.initialized[t]=1}}},ni={group:"simulation",update(e){for(const t of oo(e.world)){if(!N.initialized[t])continue;const n=N.axisLength[t],o=N.vectorX[t],i=N.vectorY[t],a=N.vectorZ[t],c=N.vectorGrowT[t],u=N.axisXPosEntity[t],l=N.axisXNegEntity[t],p=N.axisYPosEntity[t],f=N.axisYNegEntity[t],w=N.axisZPosEntity[t],E=N.axisZNegEntity[t],T=N.vectorEntity[t];g.offsetX[u]=n,g.offsetX[l]=-n,g.offsetY[p]=n,g.offsetY[f]=-n,g.offsetZ[w]=n,g.offsetZ[E]=-n,g.offsetX[T]=o*c,g.offsetY[T]=i*c,g.offsetZ[T]=a*c,g.visible[T]=c>0?1:0}}},oi={components:{AxisGraph:N},systems:[ti,ni],config:{defaults:{"axis-graph":{axisLength:3,axisColor:8947848,axisThickness:1,axisNegativeOpacity:.3,vectorX:.5,vectorY:1.5,vectorZ:-1,vectorColor:16711680,vectorThickness:3,vectorArrowSize:.2,vectorGrowT:0,axisXPosEntity:0,axisXNegEntity:0,axisYPosEntity:0,axisYNegEntity:0,axisZPosEntity:0,axisZNegEntity:0,vectorEntity:0,initialized:0}}}},be=W({layerSpacing:r.f32,nodeSpacing:r.f32,depthRows:r.ui8,nodeSize:r.f32,connections:r.f32,initialized:r.ui8}),En=W({network:r.eid,index:r.ui8,nodeCount:r.ui8,collapse:r.f32}),rt=W({layer:r.eid,index:r.ui8,originX:r.f32,originY:r.f32,originZ:r.f32}),Ue=W({network:r.eid,layerIndex:r.ui8,startNode:r.eid,endNode:r.eid}),ln=[3,5,5,2],ri=j([be,d]),ii={group:"setup",update(e){for(const t of ri(e.world)){if(be.initialized[t])continue;be.initialized[t]=1;const n=be.layerSpacing[t]||4,o=be.nodeSpacing[t]||2,i=be.depthRows[t]||1,a=be.nodeSize[t]||.6,c=ln.length,l=-((c-1)*n)/2,p=[];for(let f=0;f<c;f++){const w=ln[f],T=f>0&&f<c-1?i:1,z=w*T,b=l+f*n,S=e.createEntity();e.addComponent(S,d,{posX:b}),e.addComponent(S,En,{network:t,index:f,nodeCount:z,collapse:0}),e.addComponent(S,le,{entity:t});const q=(w-1)*o,H=(T-1)*o,Q=-q/2,ie=-H/2;p[f]=[];for(let $=0;$<T;$++)for(let fe=0;fe<w;fe++){const de=Q+fe*o,Ye=ie+$*o,me=e.createEntity();e.addComponent(me,d,{posX:0,posY:de,posZ:Ye,scaleX:1,scaleY:1,scaleZ:1});const Be=f===0,Oe=f===c-1,Me=Be?4500104:Oe?11158664:4491519;e.addComponent(me,Tt,{shape:1,sizeX:a,sizeY:a,sizeZ:a,color:Me,visible:1}),e.addComponent(me,rt,{layer:S,index:$*w+fe,originX:0,originY:de,originZ:Ye}),e.addComponent(me,le,{entity:S}),p[f].push(me)}}for(let f=0;f<c-1;f++){const w=p[f],E=p[f+1];for(const T of w)for(const z of E){const b=e.createEntity();e.addComponent(b,d,{}),e.addComponent(b,g,{offsetX:0,offsetY:0,offsetZ:0,color:4473924,thickness:1,opacity:1,visible:1}),e.addComponent(b,Ue,{network:t,layerIndex:f,startNode:T,endNode:z}),e.addComponent(b,le,{entity:T})}}}}},ai=j([rt,d]),ro={group:"simulation",update(e){for(const t of ai(e.world)){const n=rt.layer[t],o=En.collapse[n],i=rt.originY[t],a=rt.originZ[t];d.posY[t]=i*(1-o),d.posZ[t]=a*(1-o)}}},si=j([Ue,g]),ci={group:"simulation",after:[ro],update(e){const t=ln.length-1;for(const n of si(e.world)){const o=Ue.network[n],i=Ue.layerIndex[n],a=Ue.startNode[n],c=Ue.endNode[n],u=be.connections[o],l=i/t,p=(i+1)/t,f=Math.max(0,Math.min(1,(u-l)/(p-l))),w=F.posX[a],E=F.posY[a],T=F.posZ[a],z=F.posX[c],b=F.posY[c],S=F.posZ[c],q=F.scaleX[a];q>0?(g.offsetX[n]=(z-w)*f/q,g.offsetY[n]=(b-E)*f/q,g.offsetZ[n]=(S-T)*f/q):(g.offsetX[n]=0,g.offsetY[n]=0,g.offsetZ[n]=0)}}},ui={name:"neural-network",components:["neural-network","transform"]},di={components:{NeuralNetwork:be,NeuralNetworkLayer:En,NeuralNetworkNode:rt,NeuralNetworkConnection:Ue},systems:[ii,ro,ci],recipes:[ui],config:{defaults:{"neural-network":{layerSpacing:6,nodeSpacing:3,depthRows:3,nodeSize:.9,connections:1,initialized:0},"neural-network-layer":{collapse:0}}}};function li(e,t,n){const o=e>>16&255,i=e>>8&255,a=e&255,c=t>>16&255,u=t>>8&255,l=t&255,p=Math.round(o+(c-o)*n),f=Math.round(i+(u-i)*n),w=Math.round(a+(l-a)*n);return p<<16|f<<8|w}const ke=W({color:r.ui32,flickerColor:r.ui32,vectorHeight:r.f32,vectorWidth:r.f32,arrowHeight:r.f32,arrowStartOffset:r.f32}),Mt=W({growT:r.f32}),V=W({driver:r.eid,boxEntity:r.eid,growT:r.f32,colorT:r.f32,shakerX:r.eid,shakerY:r.eid,shakerZ:r.eid,shakerScale:r.eid,initialized:r.ui8}),fn=j([V]),qn=j([V,m,d]),fi={group:"simulation",update(e){for(const t of Ve(e.world)){if(e.hasComponent(t,V)||m.skipVector[t])continue;const n=m.driver[t];e.hasComponent(n,ke)&&O.layoutReady[n]&&e.addComponent(t,V,{driver:n,boxEntity:0,growT:0,colorT:0,shakerX:0,shakerY:0,shakerZ:0,shakerScale:0,initialized:0})}for(const t of qn(e.world)){if(V.initialized[t])continue;const n=V.driver[t];if(!O.layoutReady[n])continue;const o=ke,i=o.color[n],a=o.vectorHeight[n],c=o.vectorWidth[n],u=e.createEntity();e.addComponent(u,d,{posX:0,posY:0,posZ:0,scaleX:0,scaleY:0,scaleZ:0}),e.addComponent(u,F,{}),e.addComponent(u,le,{entity:t}),e.addComponent(u,Tt,{shape:0,sizeX:c,sizeY:a,sizeZ:c,color:i,visible:1}),V.boxEntity[t]=u,V.shakerX[t]=te(e,u,"transform.pos-x",{value:0,intensity:0,mode:"additive"})??0,V.shakerY[t]=te(e,u,"transform.pos-y",{value:0,intensity:0,mode:"additive"})??0,V.shakerZ[t]=te(e,u,"transform.pos-z",{value:0,intensity:0,mode:"additive"})??0,V.shakerScale[t]=te(e,u,"scale",{value:1.1,intensity:0,mode:"multiplicative"})??0,V.initialized[t]=1}}},io={group:"simulation",update(e){for(const t of qn(e.world)){const n=V.driver[t];e.hasComponent(n,Mt)&&(V.growT[t]=Mt.growT[n])}}},pi={group:"draw",update(e){for(const t of qn(e.world)){if(!V.initialized[t])continue;const n=V.driver[t],o=V.boxEntity[t],i=V.growT[t],a=V.colorT[t],c=O.fontSize[n],u=ke.vectorHeight[n],l=ke.arrowHeight[n],p=ke.arrowStartOffset[n],w=c/2+p+l+.1+u/2*i;if(d.posY[o]=w,d.scaleX[o]=i,d.scaleY[o]=i,d.scaleZ[o]=i,a>0){const E=ke.color[n],T=ke.flickerColor[n];Tt.color[o]=li(E,T,a)}else Tt.color[o]=ke.color[n]}}},hi={components:{TokenVectorConfig:ke,TokenVectorDriver:Mt,TokenVector:V},systems:[fi,io,pi],config:{defaults:{"token-vector-config":{color:16777215,flickerColor:16711680,vectorHeight:3,vectorWidth:.3,arrowHeight:.5,arrowStartOffset:.15},"token-vector-driver":{growT:0},"token-vector":{driver:0,boxEntity:0,growT:0,colorT:0,shakerX:0,shakerY:0,shakerZ:0,shakerScale:0,initialized:0}}}};function mi(e,t,n){e.addComponent(t,ke,{color:n?.color??16777215,flickerColor:n?.flickerColor??16711680,vectorHeight:n?.vectorHeight??3,vectorWidth:n?.vectorWidth??.3,arrowHeight:n?.arrowHeight,arrowStartOffset:n?.arrowStartOffset}),e.addComponent(t,Mt,{growT:0})}const ut=W({vectorHeight:r.f32,vectorWidth:r.f32,vectorGap:r.f32,offsetAboveEmbedding:r.f32,qColor:r.ui32,kColor:r.ui32,vColor:r.ui32,arrowColor:r.ui32,arrowThickness:r.f32,arrowSize:r.f32,arrowPadding:r.f32}),qe=W({qGrowT:r.f32,kGrowT:r.f32,vGrowT:r.f32,qSquishT:r.f32,kSquishT:r.f32,vSquishT:r.f32}),k=W({driver:r.eid,qEntity:r.eid,kEntity:r.eid,vEntity:r.eid,qArrowEntity:r.eid,kArrowEntity:r.eid,vArrowEntity:r.eid,vShakerX:r.eid,vShakerY:r.eid,qGrowT:r.f32,kGrowT:r.f32,vGrowT:r.f32,qSquishT:r.f32,kSquishT:r.f32,vSquishT:r.f32,initialized:r.ui8}),it=j([k]),zn=j([k,m,d,V]);function Ht(e,t,n,o,i){const a=e.createEntity();return e.addComponent(a,d,{posX:0,posY:0,posZ:0,scaleX:0,scaleY:0,scaleZ:0}),e.addComponent(a,F,{}),e.addComponent(a,le,{entity:t}),e.addComponent(a,Tt,{shape:0,sizeX:n,sizeY:o,sizeZ:n,color:i,visible:1}),a}function Gt(e,t,n,o,i){const a=e.createEntity();return e.addComponent(a,d,{posX:0,posY:0,posZ:0}),e.addComponent(a,F,{}),e.addComponent(a,le,{entity:t}),e.addComponent(a,g,{offsetX:0,offsetY:0,offsetZ:0,color:n,thickness:o,arrowEnd:1,arrowSize:i,visible:0}),a}const gi={group:"simulation",update(e){for(const t of fn(e.world)){if(e.hasComponent(t,k)||m.skipVector[t])continue;const n=m.driver[t];e.hasComponent(n,ut)&&O.layoutReady[n]&&e.addComponent(t,k,{driver:n,qEntity:0,kEntity:0,vEntity:0,qArrowEntity:0,kArrowEntity:0,vArrowEntity:0,vShakerX:0,vShakerY:0,qGrowT:0,kGrowT:0,vGrowT:0,initialized:0})}for(const t of zn(e.world)){if(k.initialized[t]||!V.initialized[t])continue;const n=k.driver[t];if(!O.layoutReady[n])continue;const o=ut,i=o.vectorWidth[n],a=o.vectorHeight[n],c=o.qColor[n],u=o.kColor[n],l=o.vColor[n],p=o.arrowColor[n],f=o.arrowThickness[n],w=o.arrowSize[n],E=Ht(e,t,i,a,c),T=Ht(e,t,i,a,u),z=Ht(e,t,i,a,l),b=Gt(e,t,p,f,w),S=Gt(e,t,p,f,w),q=Gt(e,t,p,f,w);k.qEntity[t]=E,k.kEntity[t]=T,k.vEntity[t]=z,k.qArrowEntity[t]=b,k.kArrowEntity[t]=S,k.vArrowEntity[t]=q,k.vShakerX[t]=te(e,z,"transform.pos-x",{value:0,intensity:0,mode:"additive"})??0,k.vShakerY[t]=te(e,z,"transform.pos-y",{value:0,intensity:0,mode:"additive"})??0,k.initialized[t]=1}}},ao={group:"simulation",update(e){for(const t of zn(e.world)){const n=k.driver[t];e.hasComponent(n,qe)&&(k.qGrowT[t]=qe.qGrowT[n],k.kGrowT[t]=qe.kGrowT[n],k.vGrowT[t]=qe.vGrowT[n],k.qSquishT[t]=qe.qSquishT[n],k.kSquishT[t]=qe.kSquishT[n],k.vSquishT[t]=qe.vSquishT[n])}}},wi={group:"draw",update(e){for(const t of zn(e.world)){if(!k.initialized[t])continue;const n=k.driver[t],o=ut,i=o.vectorWidth[n],a=o.vectorHeight[n],c=o.vectorGap[n],u=o.offsetAboveEmbedding[n],l=o.arrowSize[n],p=o.arrowPadding[n],f=V.boxEntity[t],w=ke.vectorHeight[n],E=d.posY[f],T=V.growT[t],z=E+w/2*T,b=k.qEntity[t],S=k.kEntity[t],q=k.vEntity[t],H=k.qArrowEntity[t],Q=k.kArrowEntity[t],ie=k.vArrowEntity[t],$=k.qGrowT[t],fe=k.kGrowT[t],de=k.vGrowT[t],Ye=k.qSquishT[t],me=k.kSquishT[t],Be=k.vSquishT[t],Oe=i+c,Me=a*.25,Nt=z+u+a/2*$-Ye*Me,Pt=z+u+a/2*fe-me*Me,Rt=z+u+a/2*de-Be*Me,Zt=$*(1-Ye*.5);d.posX[b]=-Oe,d.posY[b]=Nt,d.scaleX[b]=$,d.scaleY[b]=Zt,d.scaleZ[b]=$;const dt=fe*(1-me*.5);d.posX[S]=0,d.posY[S]=Pt,d.scaleX[S]=fe,d.scaleY[S]=dt,d.scaleZ[S]=fe;const Wt=de*(1-Be*.5);d.posX[q]=Oe,d.posY[q]=Rt,d.scaleX[q]=de,d.scaleY[q]=Wt,d.scaleZ[q]=de;const Qe=z+p,h=u-p*2;d.posX[H]=0,d.posY[H]=Qe,g.offsetX[H]=-Oe*$,g.offsetY[H]=h*$,g.arrowSize[H]=l*$,g.visible[H]=$>.01?1:0,d.posX[Q]=0,d.posY[Q]=Qe,g.offsetX[Q]=0,g.offsetY[Q]=h*fe,g.arrowSize[Q]=l*fe,g.visible[Q]=fe>.01?1:0,d.posX[ie]=0,d.posY[ie]=Qe,g.offsetX[ie]=Oe*de,g.offsetY[ie]=h*de,g.arrowSize[ie]=l*de,g.visible[ie]=de>.01?1:0}}},vi={components:{ProjectionVectorConfig:ut,ProjectionVectorDriver:qe,ProjectionVector:k},systems:[gi,ao,wi],config:{defaults:{"projection-vector-config":{vectorHeight:.8,vectorWidth:.2,vectorGap:.15,offsetAboveEmbedding:.7,qColor:3900150,kColor:2278750,vColor:11032055,arrowColor:7566195,arrowThickness:1.5,arrowSize:.1,arrowPadding:.08},"projection-vector-driver":{qGrowT:0,kGrowT:0,vGrowT:0,qSquishT:0,kSquishT:0,vSquishT:0},"projection-vector":{driver:0,qEntity:0,kEntity:0,vEntity:0,qArrowEntity:0,kArrowEntity:0,vArrowEntity:0,vShakerX:0,vShakerY:0,qGrowT:0,kGrowT:0,vGrowT:0,qSquishT:0,kSquishT:0,vSquishT:0,initialized:0}}}};function ki(e,t,n){e.addComponent(t,ut,{vectorHeight:n?.vectorHeight,vectorWidth:n?.vectorWidth,vectorGap:n?.vectorGap,offsetAboveEmbedding:n?.offsetAboveEmbedding??.8,qColor:n?.qColor??3900150,kColor:n?.kColor??2278750,vColor:n?.vColor??11032055,arrowColor:n?.arrowColor??7566195,arrowThickness:n?.arrowThickness??1.5,arrowSize:n?.arrowSize??.1,arrowPadding:n?.arrowPadding??.08}),e.addComponent(t,qe,{qGrowT:0,kGrowT:0,vGrowT:0,qSquishT:0,kSquishT:0,vSquishT:0})}const Dt=8;function Bn(e,t,n){const o=e>>16&255,i=e>>8&255,a=e&255,c=t>>16&255,u=t>>8&255,l=t&255,p=Math.round(o+(c-o)*n),f=Math.round(i+(u-i)*n),w=Math.round(a+(l-a)*n);return p<<16|f<<8|w}const we=W({fontSize:r.f32,color:r.ui32,colorLow:r.ui32,colorHigh:r.ui32,offsetAboveK:r.f32,scores:[r.f32,Dt],scoresSet:r.ui8}),Z=W({driver:r.eid,textEntity:r.eid,rawScore:r.f32,softmaxScore:r.f32,growT:r.f32,colorT:r.f32,showSoftmax:r.ui8,initialized:r.ui8}),so=j([Z]),co=j([Z,m,d,k]);function yi(e,t,n,o){const i=e.createEntity();return e.addComponent(i,d,{posX:0,posY:0,posZ:0,scaleX:0,scaleY:0,scaleZ:0}),e.addComponent(i,F,{}),e.addComponent(i,le,{entity:t}),e.addComponent(i,Xe,{fontSize:o,color:n,dirty:1}),Ae(e,i,"0"),i}const Ti={group:"simulation",update(e){for(const t of it(e.world)){if(e.hasComponent(t,Z)||!e.hasComponent(t,m)||m.skipVector[t])continue;const n=m.driver[t];e.hasComponent(n,we)&&O.layoutReady[n]&&e.addComponent(t,Z,{driver:n,textEntity:0,rawScore:0,softmaxScore:0,growT:0,colorT:0,showSoftmax:0,initialized:0})}for(const t of co(e.world)){if(Z.initialized[t]||!k.initialized[t])continue;const n=Z.driver[t],o=we,i=o.fontSize[n],a=o.color[n],c=yi(e,t,a,i);if(Z.textEntity[t]=c,o.scoresSet[n]){const u=m.index[t];if(u<Dt){const l=o.scores[n],p=l[u];Z.rawScore[t]=p;let f=0;for(let w=0;w<Dt;w++)f+=l[w];Z.softmaxScore[t]=f>0?p/f:0}}Z.initialized[t]=1}}},bi={group:"draw",update(e){for(const t of co(e.world)){if(!Z.initialized[t])continue;const n=Z.driver[t],o=we.offsetAboveK[n],i=k.kEntity[t],a=k.kGrowT[t],c=F.posY[i],u=d.scaleY[i],l=Z.textEntity[t],p=Z.growT[t],f=Z.colorT[t];d.posX[l]=0,d.posY[l]=c+u+o,d.scaleX[l]=p*a,d.scaleY[l]=p*a,d.scaleZ[l]=p*a;const w=Z.showSoftmax[t],E=Z.rawScore[t],T=Z.softmaxScore[t],z=w?T.toFixed(2):String(Math.round(E));if(Ae(e,l,z),f>0){const b=we.colorLow[n],S=we.colorHigh[n],q=Bn(b,S,T),H=we.color[n];Xe.color[l]=Bn(H,q,f)}}}},Si={components:{AttentionScoreConfig:we,AttentionScore:Z},systems:[Ti,bi],config:{defaults:{"attention-score-config":{fontSize:.5,color:16777215,colorLow:6710886,colorHigh:16729156,offsetAboveK:.3},"attention-score":{driver:0,textEntity:0,rawScore:0,softmaxScore:0,growT:0,colorT:0,showSoftmax:0,initialized:0}}}};function xi(e,t,n){e.addComponent(t,we,{fontSize:n?.fontSize,color:n?.color??16777215,colorLow:n?.colorLow??6710886,colorHigh:n?.colorHigh??16729156,offsetAboveK:n?.offsetAboveK})}function Ci(e,t,n){if(!e.hasComponent(t,we))return;const o=n.reduce((a,c)=>a+c,0),i=we.scores[t];for(let a=0;a<Math.min(n.length,Dt);a++)i[a]=n[a];we.scoresSet[t]=1;for(const a of Ve(e.world)){if(m.driver[a]!==t||!e.hasComponent(a,Z))continue;const c=m.index[a];c<n.length&&(Z.rawScore[a]=n[c],Z.softmaxScore[a]=o>0?n[c]/o:0)}}const ue=W({fontSize:r.f32,color:r.ui32,plusOffsetX:r.f32,equalsOffsetX:r.f32,sumT:r.f32,vSumT:r.f32,vSumOffsetX:r.f32,vEqualsOffsetX:r.f32,initialized:r.ui8}),se=W({driver:r.eid,textEntity:r.eid,textShaker:r.eid,tokenIndex:r.ui8,isPlus:r.ui8,isEquals:r.ui8,isVEquals:r.ui8,initialized:r.ui8}),Ei=j([se]),qi=j([ue,O]);function jt(e,t,n,o){const i=e.createEntity();return e.addComponent(i,d,{posX:0,posY:0,posZ:0,scaleX:1,scaleY:1,scaleZ:1}),e.addComponent(i,F,{}),e.addComponent(i,Xe,{fontSize:n,color:t,dirty:1}),Ae(e,i,o),i}const ve=[0,1,2,3],zi={group:"simulation",update(e){for(const t of qi(e.world)){if(ue.initialized[t]||!O.layoutReady[t])continue;const n=ue.fontSize[t],o=ue.color[t];for(let c=0;c<ve.length-1;c++){const u=jt(e,o,n,"+");e.addComponent(u,se,{driver:t,textEntity:u,textShaker:te(e,u,"scale",{value:0,intensity:1,mode:"multiplicative"}),tokenIndex:c,isPlus:1,isEquals:0,initialized:1})}const i=jt(e,o,n,"= 1");e.addComponent(i,se,{driver:t,textEntity:i,textShaker:te(e,i,"scale",{value:0,intensity:1,mode:"multiplicative"}),tokenIndex:ve.length-1,isPlus:0,isEquals:1,isVEquals:0,initialized:1});const a=jt(e,o,n,"=");e.addComponent(a,se,{driver:t,textEntity:a,textShaker:te(e,a,"scale",{value:0,intensity:1,mode:"multiplicative"}),tokenIndex:ve.length-1,isPlus:0,isEquals:0,isVEquals:1,initialized:1}),ue.initialized[t]=1}}},On=.2,Ln=[0,.2,.4,.6];function _n(e,t,n){return Math.max(t,Math.min(n,e))}function Qt(e,t,n){for(const o of Ve(e.world)){if(m.driver[o]!==t||m.index[o]!==n||!e.hasComponent(o,Z))continue;const i=Z.textEntity[o];return F.posX[i]}return null}function Xi(e,t){for(const n of so(e.world)){if(!e.hasComponent(n,m)||m.driver[n]!==t)continue;const o=Z.textEntity[n];return F.posY[o]}return null}function $t(e,t,n){for(const o of it(e.world)){if(!e.hasComponent(o,m)||m.driver[o]!==t||m.index[o]!==n)continue;const i=k.vEntity[o];return F.posX[i]}return null}function Ai(e,t){for(const n of it(e.world)){if(!e.hasComponent(n,m)||m.driver[n]!==t)continue;const o=k.vEntity[n];return F.posY[o]}return null}const Yi={group:"draw",update(e){for(const t of Ei(e.world)){if(!se.initialized[t])continue;const n=se.driver[t],o=ue.sumT[n],i=ue.vSumT[n],a=ue.equalsOffsetX[n],c=ue.vSumOffsetX[n],u=ue.vEqualsOffsetX[n],l=se.tokenIndex[t],p=se.isPlus[t],f=se.isEquals[t],w=se.isVEquals[t],E=se.textEntity[t];if(i>o){const T=Ai(e,n);if(T===null)continue;if(p||w){const z=Ln[l]??0,b=_n((i-z)/On,0,1);if(U.intensity[se.textShaker[t]]=1-b,p){const S=$t(e,n,ve[l]),q=$t(e,n,ve[l+1]);S!==null&&q!==null&&(d.posX[E]=(S+q)/2+c,d.posY[E]=T)}else if(w){const S=$t(e,n,ve[ve.length-1]);S!==null&&(d.posX[E]=S+u,d.posY[E]=T)}}else f&&(U.intensity[se.textShaker[t]]=1)}else if(p||f){const T=Ln[l]??0,z=_n((o-T)/On,0,1);U.intensity[se.textShaker[t]]=1-z;const b=Xi(e,n);if(b===null)continue;if(p){const S=Qt(e,n,ve[l]),q=Qt(e,n,ve[l+1]),H=ue.plusOffsetX[n];S!==null&&q!==null&&(d.posX[E]=(S+q)/2+H,d.posY[E]=b)}else if(f){const S=Qt(e,n,ve[ve.length-1]);S!==null&&(d.posX[E]=S+a,d.posY[E]=b)}}else w&&(U.intensity[se.textShaker[t]]=1)}}},Bi={components:{AttentionSumConfig:ue,AttentionSum:se},systems:[zi,Yi],config:{defaults:{"attention-sum-config":{fontSize:.5,color:16777215,plusOffsetX:0,equalsOffsetX:.7,sumT:0,vSumT:0,vSumOffsetX:0,vEqualsOffsetX:.7,initialized:0},"attention-sum":{driver:0,textEntity:0,textShaker:0,tokenIndex:0,isPlus:0,isEquals:0,isVEquals:0,initialized:0}}}};function Oi(e,t,n){e.addComponent(t,ue,{fontSize:n?.fontSize,color:n?.color??16777215,plusOffsetX:n?.plusOffsetX,equalsOffsetX:n?.equalsOffsetX,sumT:0,vSumT:0,vSumOffsetX:n?.vSumOffsetX,vEqualsOffsetX:n?.vEqualsOffsetX,initialized:0})}const x=W({emergenceT:r.f32,joinT:r.f32,hotLayoutT:r.f32,hotT:r.f32,networkX:r.f32,networkY:r.f32,borderColor:r.ui32,barkingToken:r.eid,hotToken:r.eid,dogToken:r.eid,baseVectorT:r.f32,dogVectorT:r.f32,hotVectorT:r.f32,combineT:r.f32,dogQT:r.f32,dogKT:r.f32,dogVT:r.f32,hotQT:r.f32,hotKT:r.f32,hotVT:r.f32,baseQT:r.f32,qStaggerT:r.f32,baseKT:r.f32,baseVT:r.f32,qSquishT:r.f32,kSquishT:r.f32,vSquishT:r.f32,hotScoreT:r.f32,allScoresT:r.f32,softmaxT:r.f32,sumT:r.f32,vSumT:r.f32,scoreColorT:r.f32,vOffsetT:r.f32,vectorStaggerT:r.f32,vectorFlickerT:r.f32,initialized:r.ui8,borderColorApplied:r.ui8}),Li=j([x]),_i={group:"simulation",after:[to,no,io,ao],update(e){for(const t of Li(e.world)){if(!x.initialized[t]){for(const h of Ve(e.world)){if(m.driver[h]!==t)continue;const B=m.index[h];B===4?(x.barkingToken[t]=h,m.layoutScale[h]=0,m.skipArrow[h]=1,m.skipVector[h]=1,d.scaleX[h]=0,d.scaleY[h]=0,d.scaleZ[h]=0,d.posX[h]=x.networkX[t],d.posY[h]=x.networkY[t]):B===1?(x.hotToken[t]=h,m.layoutScale[h]=0,d.scaleX[h]=0,d.scaleY[h]=0,d.scaleZ[h]=0):B===2&&(x.dogToken[t]=h)}x.initialized[t]=1}const n=x.barkingToken[t];if(n===0)continue;const o=x.emergenceT[t],i=x.borderColor[t];if(e.hasComponent(n,X)&&X.initialized[n]){const h=o>0?1:0;X.showTop[n]=h,X.showRight[n]=h,X.showBottom[n]=h,X.showLeft[n]=h,i!==0&&!x.borderColorApplied[t]&&(g.color[X.lineTop[n]]=i,g.color[X.lineRight[n]]=i,g.color[X.lineBottom[n]]=i,g.color[X.lineLeft[n]]=i,x.borderColorApplied[t]=1)}const a=x.joinT[t],c=x.networkX[t],u=x.networkY[t],l=m.separatedX[n],p=O.separatedY[t];d.scaleX[n]=o,d.scaleY[n]=o,d.scaleZ[n]=o,m.layoutScale[n]=a>0?1:0,a<1&&(d.posX[n]=c+(l-c)*a,d.posY[n]=u+(p-u)*a);const f=x.hotToken[t];if(f!==0){const h=x.hotLayoutT[t],B=x.hotT[t];if(d.scaleX[f]=B,d.scaleY[f]=B,d.scaleZ[f]=B,m.layoutScale[f]=h>0?1:0,d.posX[f]=m.separatedX[f],d.posY[f]=O.separatedY[t],e.hasComponent(f,X)&&X.initialized[f]){const I=B>0?1:0;X.showTop[f]=I,X.showRight[f]=I,X.showBottom[f]=I,X.showLeft[f]=I}}const w=x.dogToken[t],E=x.hotT[t],T=x.baseVectorT[t],z=x.dogVectorT[t],b=x.hotVectorT[t];for(const h of fn(e.world)){if(m.driver[h]!==t)continue;let B;h===w?B=Math.max(T,z):h===f?B=Math.max(T,b)*E:B=T,V.growT[h]=B}for(const h of Qr(e.world)){if(m.driver[h]!==t)continue;let B;h===w?B=Math.max(T,z):h===f?B=Math.max(T,b)*E:B=T,ce.growT[h]=B}const S=x.combineT[t];if(S>0&&w!==0&&f!==0){const h=V.shakerX[w],B=V.shakerX[f],I=V.boxEntity[w],ae=V.boxEntity[f];if(h&&B&&I&&ae){const oe=F.posX[I],Le=F.posX[ae],_e=(oe+Le)/2;U.value[h]=_e-oe,U.intensity[h]=S,U.value[B]=_e-Le,U.intensity[B]=S}}else if(w!==0&&f!==0){const h=V.shakerX[w],B=V.shakerX[f];h&&B&&(U.intensity[h]=0,U.intensity[B]=0)}const q=x.dogQT[t],H=x.dogKT[t],Q=x.dogVT[t],ie=x.hotQT[t],$=x.hotKT[t],fe=x.hotVT[t],de=x.baseQT[t],Ye=x.qStaggerT[t],me=x.baseKT[t],Be=x.baseVT[t];for(const h of it(e.world)){if(!e.hasComponent(h,m)||m.driver[h]!==t)continue;const B=m.index[h];let I,ae,oe;if(h===w?(I=Math.max(de,q),ae=Math.max(me,H),oe=Math.max(Be,Q)):h===f?(I=Math.max(de,ie)*E,ae=Math.max(me,$)*E,oe=Math.max(Be,fe)*E):(I=de,ae=me,oe=Be),Ye>0){const Le=B*.1,_e=Math.max(0,Math.min(1,(Ye-Le)/.6));I=Math.max(I,_e)}k.qGrowT[h]=I,k.kGrowT[h]=ae,k.vGrowT[h]=oe,k.qSquishT[h]=x.qSquishT[t],k.kSquishT[h]=x.kSquishT[t],k.vSquishT[h]=x.vSquishT[t]}const Oe=x.hotScoreT[t],Me=x.allScoresT[t],Nt=x.softmaxT[t],Pt=x.scoreColorT[t];for(const h of so(e.world)){if(!e.hasComponent(h,m)||m.driver[h]!==t)continue;const B=m.index[h];let I;h===f?I=Oe:B===0||B===2||B===3?I=Me:I=0,Z.growT[h]=I,Z.showSoftmax[h]=Nt>.5?1:0,Z.colorT[h]=Pt}const Rt=x.sumT[t],Zt=x.vSumT[t];e.hasComponent(t,ue)&&(ue.sumT[t]=Rt,ue.vSumT[t]=Zt);const dt=x.vOffsetT[t];if(dt>0){const h=ut.vectorHeight[t],B=we.offsetAboveK[t];for(const I of it(e.world)){if(!e.hasComponent(I,m)||m.driver[I]!==t||!k.initialized[I])continue;const ae=k.vShakerX[I],oe=k.vShakerY[I];if(!ae||!oe)continue;const _e=k.kGrowT[I]*(1-k.kSquishT[I]*.5),go=h/2*_e+B,wo=.3;U.value[ae]=wo,U.intensity[ae]=dt,U.value[oe]=go,U.intensity[oe]=dt}}else for(const h of it(e.world)){if(!e.hasComponent(h,m)||m.driver[h]!==t||!k.initialized[h])continue;const B=k.vShakerX[h],I=k.vShakerY[h];B&&(U.intensity[B]=0),I&&(U.intensity[I]=0)}const Wt=x.vectorStaggerT[t],Qe=x.vectorFlickerT[t];for(const h of fn(e.world)){if(m.driver[h]!==t||!V.initialized[h])continue;const B=V.shakerScale[h];if(B){const ae=m.index[h]*.15,oe=Math.max(0,Math.min(1,(Wt-ae)/.3)),Le=oe<.5?oe*2:(1-oe)*2;U.intensity[B]=Le}if(Qe>0){const I=m.index[h],ae=[7,11,13,17,19,23,29,31],oe=ae[I%ae.length],_e=Qe*oe*3%1<.3;V.colorT[h]=_e?1:0}else V.colorT[h]=0}}}},Vi={components:{TokenSwapDriver:x},systems:[_i],config:{defaults:{"token-swap-driver":{emergenceT:0,joinT:0,hotLayoutT:0,hotT:0,networkX:7,networkY:-15,borderColor:0,barkingToken:0,hotToken:0,dogToken:0,baseVectorT:0,dogVectorT:0,hotVectorT:0,combineT:0,dogQT:0,dogKT:0,dogVT:0,hotQT:0,hotKT:0,hotVT:0,baseQT:0,qStaggerT:0,baseKT:0,baseVT:0,qSquishT:0,kSquishT:0,vSquishT:0,hotScoreT:0,allScoresT:0,softmaxT:0,sumT:0,vSumT:0,scoreColorT:0,vOffsetT:0,vectorStaggerT:0,vectorFlickerT:0,initialized:0,borderColorApplied:0}}}},M=W({value1:r.f32,value2:r.f32,value3:r.f32,color:r.ui32,bracketHeight:r.f32,bracketWidth:r.f32,fontSize:r.f32,growT:r.f32,leftTopLine:r.eid,leftBottomLine:r.eid,leftVerticalLine:r.eid,rightTopLine:r.eid,rightBottomLine:r.eid,rightVerticalLine:r.eid,text1Entity:r.eid,text2Entity:r.eid,text3Entity:r.eid,initialized:r.ui8}),uo=j([M,d]);function $e(e,t,n,o){const i=e.createEntity();return e.addComponent(i,d,{posX:0,posY:0,posZ:0}),e.addComponent(i,F,{}),e.addComponent(i,le,{entity:t}),e.addComponent(i,g,{offsetX:0,offsetY:0,offsetZ:0,color:n,thickness:o,opacity:1,arrowEnd:0,arrowStart:0,arrowSize:0,visible:1}),i}function Kt(e,t,n,o,i){const a=e.createEntity();return e.addComponent(a,d,{posX:0,posY:0,posZ:0}),e.addComponent(a,F,{}),e.addComponent(a,le,{entity:t}),e.addComponent(a,Xe,{fontSize:o,color:n,dirty:1}),Ae(e,a,i),a}const Mi={group:"simulation",update(e){for(const t of uo(e.world)){if(M.initialized[t])continue;const n=M.color[t],o=M.fontSize[t],i=2;M.leftTopLine[t]=$e(e,t,n,i),M.leftBottomLine[t]=$e(e,t,n,i),M.leftVerticalLine[t]=$e(e,t,n,i),M.rightTopLine[t]=$e(e,t,n,i),M.rightBottomLine[t]=$e(e,t,n,i),M.rightVerticalLine[t]=$e(e,t,n,i);const a=M.value1[t],c=M.value2[t],u=M.value3[t];M.text1Entity[t]=Kt(e,t,n,o,String(a)),M.text2Entity[t]=Kt(e,t,n,o,String(c)),M.text3Entity[t]=Kt(e,t,n,o,String(u)),M.initialized[t]=1}}},Di={group:"simulation",update(e){for(const t of uo(e.world)){if(!M.initialized[t])continue;const n=M.bracketHeight[t],o=M.bracketWidth[t],i=M.growT[t],a=n/2*i,c=o*.15,u=i>0?1:0,l=M.leftTopLine[t],p=M.leftBottomLine[t],f=M.leftVerticalLine[t],w=M.rightTopLine[t],E=M.rightBottomLine[t],T=M.rightVerticalLine[t],z=M.text1Entity[t],b=M.text2Entity[t];d.posX[l]=-o/2,d.posY[l]=a,g.offsetX[l]=c*i,g.offsetY[l]=0,g.visible[l]=u,d.posX[p]=-o/2,d.posY[p]=-a,g.offsetX[p]=c*i,g.offsetY[p]=0,g.visible[p]=u,d.posX[f]=-o/2,d.posY[f]=-a,g.offsetX[f]=0,g.offsetY[f]=n*i,g.visible[f]=u,d.posX[w]=o/2,d.posY[w]=a,g.offsetX[w]=-c*i,g.offsetY[w]=0,g.visible[w]=u,d.posX[E]=o/2,d.posY[E]=-a,g.offsetX[E]=-c*i,g.offsetY[E]=0,g.visible[E]=u,d.posX[T]=o/2,d.posY[T]=-a,g.offsetX[T]=0,g.offsetY[T]=n*i,g.visible[T]=u;const S=M.text3Entity[t],q=n/3*i;d.posY[z]=q,d.posY[b]=0,d.posY[S]=-q,d.scaleX[z]=i,d.scaleY[z]=i,d.scaleX[b]=i,d.scaleY[b]=i,d.scaleX[S]=i,d.scaleY[S]=i}}},Ii={components:{BracketVector:M},systems:[Mi,Di],config:{defaults:{"bracket-vector":{value1:0,value2:0,value3:0,color:16777215,bracketHeight:2,bracketWidth:1,fontSize:.5,growT:0,leftTopLine:0,leftBottomLine:0,leftVerticalLine:0,rightTopLine:0,rightBottomLine:0,rightVerticalLine:0,text1Entity:0,text2Entity:0,text3Entity:0,initialized:0}}}},A=W({transitionT:r.f32,sumT:r.f32,sumBounceT:r.f32,mult1:r.eid,mult2:r.eid,mult3:r.eid,mult1Shaker:r.eid,mult2Shaker:r.eid,mult3Shaker:r.eid,eq1:r.eid,eq2:r.eid,eq3:r.eid,eq1Shaker:r.eid,eq2Shaker:r.eid,eq3Shaker:r.eid,sum:r.eid,sumShaker:r.eid,color:r.ui32,fontSize:r.f32,rowHeight:r.f32,initialized:r.ui8}),lo=j([A,d]);function Ie(e,t,n,o,i,a,c){const u=e.createEntity();return e.addComponent(u,d,{posX:a,posY:c,posZ:0,scaleX:1,scaleY:1,scaleZ:1}),e.addComponent(u,F,{}),e.addComponent(u,le,{entity:t}),e.addComponent(u,Xe,{fontSize:o,color:n,dirty:1}),Ae(e,u,i),u}const Jt=1.5,en=4.5,Ke={mult1:0,eq1:.08,mult2:.16,eq2:.24,mult3:.32,eq3:.4},Je=.15;function et(e,t,n){return Math.max(t,Math.min(n,e))}const Ni={group:"simulation",update(e){for(const t of lo(e.world)){if(A.initialized[t])continue;const n=A.color[t],o=A.fontSize[t],i=A.rowHeight[t],a=[i,0,-i];A.mult1[t]=Ie(e,t,n,o,"×",Jt,a[0]),A.mult2[t]=Ie(e,t,n,o,"×",Jt,a[1]),A.mult3[t]=Ie(e,t,n,o,"×",Jt,a[2]),A.eq1[t]=Ie(e,t,n,o,"=",en,a[0]),A.eq2[t]=Ie(e,t,n,o,"=",en,a[1]),A.eq3[t]=Ie(e,t,n,o,"=",en,a[2]),A.mult1Shaker[t]=te(e,A.mult1[t],"scale",{value:0,intensity:1,mode:"multiplicative"}),A.mult2Shaker[t]=te(e,A.mult2[t],"scale",{value:0,intensity:1,mode:"multiplicative"}),A.mult3Shaker[t]=te(e,A.mult3[t],"scale",{value:0,intensity:1,mode:"multiplicative"}),A.eq1Shaker[t]=te(e,A.eq1[t],"scale",{value:0,intensity:1,mode:"multiplicative"}),A.eq2Shaker[t]=te(e,A.eq2[t],"scale",{value:0,intensity:1,mode:"multiplicative"}),A.eq3Shaker[t]=te(e,A.eq3[t],"scale",{value:0,intensity:1,mode:"multiplicative"});const c=6;A.sum[t]=Ie(e,t,n,o,"32",c,0),A.sumShaker[t]=te(e,A.sum[t],"scale",{value:0,intensity:1,mode:"multiplicative"}),A.initialized[t]=1}}},Pi={group:"simulation",update(e){for(const t of lo(e.world)){if(!A.initialized[t])continue;const n=A.transitionT[t];U.intensity[A.mult1Shaker[t]]=1-et((n-Ke.mult1)/Je,0,1),U.intensity[A.eq1Shaker[t]]=1-et((n-Ke.eq1)/Je,0,1),U.intensity[A.mult2Shaker[t]]=1-et((n-Ke.mult2)/Je,0,1),U.intensity[A.eq2Shaker[t]]=1-et((n-Ke.eq2)/Je,0,1),U.intensity[A.mult3Shaker[t]]=1-et((n-Ke.mult3)/Je,0,1),U.intensity[A.eq3Shaker[t]]=1-et((n-Ke.eq3)/Je,0,1);const o=A.sumT[t],i=A.sumBounceT[t],a=A.sum[t];U.intensity[A.sumShaker[t]]=1-o;const c=1+i*.1;d.scaleX[a]=c,d.scaleY[a]=c,d.scaleZ[a]=c}}},Ri={components:{DotProduct:A},systems:[Ni,Pi],config:{defaults:{"dot-product":{transitionT:0,sumT:0,sumBounceT:0,mult1:0,mult2:0,mult3:0,mult1Shaker:0,mult2Shaker:0,mult3Shaker:0,eq1:0,eq2:0,eq3:0,eq1Shaker:0,eq2Shaker:0,eq3Shaker:0,sum:0,sumShaker:0,color:16777215,fontSize:.5,rowHeight:.6,initialized:0}}}},L=W({qEntity:r.eid,dotEntity:r.eid,kEntity:r.eid,equalsEntity:r.eid,resultEntity:r.eid,qShaker:r.eid,kShaker:r.eid,qT:r.f32,dotT:r.f32,kT:r.f32,equalsT:r.f32,resultT:r.f32,resultValue:r.f32,qBounceT:r.f32,kBounceT:r.f32,qColor:r.ui32,dotColor:r.ui32,kColor:r.ui32,resultColor:r.ui32,fontSize:r.f32,spacing:r.f32,initialized:r.ui8}),fo=j([L,d]);function pt(e,t,n,o,i,a){const c=e.createEntity();return e.addComponent(c,d,{posX:a,posY:0,posZ:0,scaleX:0,scaleY:0,scaleZ:0}),e.addComponent(c,F,{}),e.addComponent(c,le,{entity:t}),e.addComponent(c,Xe,{fontSize:o,color:n,dirty:1}),Ae(e,c,i),c}const Zi={group:"simulation",update(e){for(const t of fo(e.world)){if(L.initialized[t])continue;const n=L.qColor[t],o=L.dotColor[t],i=L.kColor[t],a=L.fontSize[t],c=L.spacing[t],u=L.resultColor[t]||o;L.qEntity[t]=pt(e,t,n,a,"Q",-c),L.dotEntity[t]=pt(e,t,o,a,"·",0),L.kEntity[t]=pt(e,t,i,a,"K",c),L.equalsEntity[t]=pt(e,t,o,a,"=",c*2),L.resultEntity[t]=pt(e,t,u,a,"7",c*3),L.qShaker[t]=te(e,L.qEntity[t],"scale",{value:1.15,intensity:0,mode:"multiplicative"}),L.kShaker[t]=te(e,L.kEntity[t],"scale",{value:1.15,intensity:0,mode:"multiplicative"}),L.initialized[t]=1}}},Wi={group:"simulation",update(e){for(const t of fo(e.world)){if(!L.initialized[t])continue;const n=L.qT[t],o=L.dotT[t],i=L.kT[t],a=L.equalsT[t],c=L.resultT[t],u=L.qEntity[t],l=L.dotEntity[t],p=L.kEntity[t],f=L.equalsEntity[t],w=L.resultEntity[t];d.scaleX[u]=n,d.scaleY[u]=n,d.scaleZ[u]=n,d.scaleX[l]=o,d.scaleY[l]=o,d.scaleZ[l]=o,d.scaleX[p]=i,d.scaleY[p]=i,d.scaleZ[p]=i,d.scaleX[f]=a,d.scaleY[f]=a,d.scaleZ[f]=a,d.scaleX[w]=c,d.scaleY[w]=c,d.scaleZ[w]=c,U.intensity[L.qShaker[t]]=L.qBounceT[t],U.intensity[L.kShaker[t]]=L.kBounceT[t]}}},Fi={components:{DotProductLabel:L},systems:[Zi,Wi],config:{defaults:{"dot-product-label":{qEntity:0,dotEntity:0,kEntity:0,equalsEntity:0,resultEntity:0,qShaker:0,kShaker:0,qT:0,dotT:0,kT:0,equalsT:0,resultT:0,resultValue:7,qBounceT:0,kBounceT:0,qColor:16777215,dotColor:16777215,kColor:16777215,resultColor:16777215,fontSize:1,spacing:.8,initialized:0}}}},Se=W({textEntity:r.eid,color:r.ui32,fontSize:r.f32,growT:r.f32,initialized:r.ui8}),po=j([Se,d]),Ui={group:"simulation",update(e){for(const t of po(e.world)){if(Se.initialized[t])continue;const n=Se.color[t],o=Se.fontSize[t],i=e.createEntity();e.addComponent(i,d,{posX:0,posY:0,posZ:0,scaleX:0,scaleY:0,scaleZ:0}),e.addComponent(i,F,{}),e.addComponent(i,le,{entity:t}),e.addComponent(i,Xe,{fontSize:o,color:n,dirty:1}),Ae(e,i,"V"),Se.textEntity[t]=i,Se.initialized[t]=1}}},Hi={group:"simulation",update(e){for(const t of po(e.world)){if(!Se.initialized[t])continue;const n=Se.growT[t],o=Se.textEntity[t];d.scaleX[o]=n,d.scaleY[o]=n,d.scaleZ[o]=n}}},Gi={components:{VLabel:Se},systems:[Ui,Hi],config:{defaults:{"v-label":{textEntity:0,color:5938096,fontSize:.65,growT:0,initialized:0}}}},R=W({lparenEntity:r.eid,qEntity:r.eid,dotEntity:r.eid,kEntity:r.eid,rparenEntity:r.eid,timesEntity:r.eid,vEntity:r.eid,qColor:r.ui32,kColor:r.ui32,vColor:r.ui32,parenColor:r.ui32,fontSize:r.f32,spacing:r.f32,growT:r.f32,initialized:r.ui8}),ho=j([R,d]);function Ne(e,t,n,o,i,a){const c=e.createEntity();return e.addComponent(c,d,{posX:a,posY:0,posZ:0,scaleX:0,scaleY:0,scaleZ:0}),e.addComponent(c,F,{}),e.addComponent(c,le,{entity:t}),e.addComponent(c,Xe,{fontSize:o,color:n,dirty:1}),Ae(e,c,i),c}const ji={group:"simulation",update(e){for(const t of ho(e.world)){if(R.initialized[t])continue;const n=R.qColor[t],o=R.kColor[t],i=R.vColor[t],a=R.parenColor[t],c=R.fontSize[t],u=R.spacing[t],l=u*3;R.lparenEntity[t]=Ne(e,t,a,c,"(",-l),R.qEntity[t]=Ne(e,t,n,c,"Q",-l+u),R.dotEntity[t]=Ne(e,t,a,c,"·",-l+u*2),R.kEntity[t]=Ne(e,t,o,c,"K",-l+u*3),R.rparenEntity[t]=Ne(e,t,a,c,")",-l+u*4),R.timesEntity[t]=Ne(e,t,a,c,"×",-l+u*5),R.vEntity[t]=Ne(e,t,i,c,"V",-l+u*6),R.initialized[t]=1}}},Qi={group:"simulation",update(e){for(const t of ho(e.world)){if(!R.initialized[t])continue;const n=R.growT[t],o=[R.lparenEntity[t],R.qEntity[t],R.dotEntity[t],R.kEntity[t],R.rparenEntity[t],R.timesEntity[t],R.vEntity[t]];for(const i of o)d.scaleX[i]=n,d.scaleY[i]=n,d.scaleZ[i]=n}}},$i={components:{VFormulaLabel:R},systems:[ji,Qi],config:{defaults:{"v-formula-label":{lparenEntity:0,qEntity:0,dotEntity:0,kEntity:0,rparenEntity:0,timesEntity:0,vEntity:0,qColor:16777215,kColor:16777215,vColor:5938096,parenColor:16777215,fontSize:.65,spacing:.55,growT:0,initialized:0}}}},Ki=`<sequence name="enter-scene">
  <tween
    target="tokens"
    attr="token-driver.separation-t"
    to="1"
    duration="0.3"
    easing="back-out"
  ></tween>
  <pause duration="0.1"></pause>
  <tween
    target="tokens"
    attr="token-box-config.offset-t"
    to="1"
    duration="0.2"
    easing="sine-out"
  ></tween>
</sequence>

<sequence name="exit-scene">
  <tween
    target="tokens"
    attr="token-box-config.offset-t"
    to="0"
    duration="0.1"
  ></tween>
  <tween
    target="tokens"
    attr="token-driver.separation-t"
    to="0"
    duration="0.1"
  ></tween>
</sequence>
`,Ji=`<sequence name="enter-vectors">
  <tween
    target="camera-target"
    attr="transform.pos-y"
    to="2"
    duration="0.5"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0.3"
    duration="0.5"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0.5"
    duration="0.5"
    easing="expo-out"
  ></tween>
  <pause duration="0.1"></pause>
  <tween
    target="tokens"
    attr="token-arrow-driver.grow-t"
    to="1"
    duration="0.3"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-vector-driver.grow-t"
    to="1"
    duration="0.4"
    easing="back-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.base-vector-t"
    to="1"
    duration="0.4"
    easing="back-out"
  ></tween>
</sequence>

<sequence name="exit-vectors">
  <tween
    target="tokens"
    attr="token-vector-driver.grow-t"
    to="0"
    duration="0.4"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.base-vector-t"
    to="0"
    duration="0.4"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-arrow-driver.grow-t"
    to="0"
    duration="0.3"
    easing="expo-out"
  ></tween>
  <tween
    target="camera-target"
    attr="transform.pos-y"
    to="0"
    duration="0.5"
    easing="expo-out"
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
</sequence>
`,ea=`<sequence name="pan-to-graph">
  <tween
    target="camera-target"
    attr="transform.pos-y"
    to="15"
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
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0.4"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <pause duration="0.2"></pause>
  <tween
    target="vector-graph"
    attr="axis-graph.vector-grow-t"
    to="1"
    duration="0.5"
    easing="back-out"
  ></tween>
</sequence>

<sequence name="pan-from-graph">
  <tween
    target="vector-graph"
    attr="axis-graph.vector-grow-t"
    to="0"
    duration="0.3"
    easing="sine-in"
  ></tween>
  <pause duration="0.1"></pause>
  <tween
    target="camera-target"
    attr="transform.pos-y"
    to="2"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0.5"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0.3"
    duration="0.7"
    easing="expo-out"
  ></tween>
</sequence>
`,ta=`<sequence name="pan-to-vectors">
  <tween
    target="vector-graph"
    attr="axis-graph.vector-grow-t"
    to="0"
    duration="0.3"
    easing="sine-in"
  ></tween>
  <pause duration="0.1"></pause>
  <tween
    target="camera-target"
    attr="transform.pos-y"
    to="2"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0.5"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0.3"
    duration="0.7"
    easing="expo-out"
  ></tween>
</sequence>

<sequence name="pan-from-vectors">
  <tween
    target="camera-target"
    attr="transform.pos-y"
    to="15"
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
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0.4"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <pause duration="0.2"></pause>
  <tween
    target="vector-graph"
    attr="axis-graph.vector-grow-t"
    to="1"
    duration="0.5"
    easing="back-out"
  ></tween>
</sequence>
`,na=`<sequence name="pan-to-network">
  <tween
    target="camera-target"
    attr="transform.pos-x"
    to="3.5"
    duration="0.8"
    easing="expo-out"
  ></tween>
  <tween
    target="camera-target"
    attr="transform.pos-y"
    to="-15"
    duration="0.8"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="main-camera.ortho-size"
    to="14"
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
    to="0.3"
    duration="0.8"
    easing="expo-out"
  ></tween>
  <pause duration="0.3"></pause>

  <tween
    target="neural-network"
    attr="neural-network.connections"
    to="1"
    duration="0.5"
    easing="expo-out"
  ></tween>
  <pause duration="0.2"></pause>

  <tween
    target="tokens"
    attr="token-swap-driver.emergence-t"
    to="1"
    duration="0.5"
    easing="back-out"
  ></tween>
  <pause duration="0.3"></pause>

  <tween
    target="camera-target"
    attr="transform.pos-x"
    to="0"
    duration="1.0"
    easing="expo-out"
  ></tween>
  <tween
    target="camera-target"
    attr="transform.pos-y"
    to="2"
    duration="1.0"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="main-camera.ortho-size"
    to="10"
    duration="1.0"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.join-t"
    to="1"
    duration="1.0"
    easing="expo-out"
  ></tween>
  <pause duration="0.2"></pause>

  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0.3"
    duration="0.5"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0.5"
    duration="0.5"
    easing="expo-out"
  ></tween>
</sequence>

<sequence name="pan-from-network">
  <tween
    target="tokens"
    attr="token-swap-driver.join-t"
    to="0"
    duration="0.4"
    easing="sine-in"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.emergence-t"
    to="0"
    duration="0.4"
    easing="sine-in"
  ></tween>
  <tween
    target="camera-target"
    attr="transform.pos-x"
    to="0"
    duration="0.4"
    easing="sine-in"
  ></tween>
  <pause duration="0.2"></pause>

  <tween
    target="neural-network"
    attr="neural-network.connections"
    to="0"
    duration="0.5"
    easing="sine-in"
  ></tween>
</sequence>
`,oa=`<sequence name="zoom-out">
  <tween
    target="camera"
    attr="main-camera.ortho-size"
    to="12"
    duration="0.5"
    easing="expo-out"
  ></tween>
</sequence>

<sequence name="zoom-in">
  <tween
    target="camera"
    attr="main-camera.ortho-size"
    to="10"
    duration="0.5"
    easing="expo-out"
  ></tween>
</sequence>
`,ra=`<sequence name="swap-to-hot">
  <tween
    target="tokens"
    attr="token-swap-driver.emergence-t"
    to="0"
    duration="0.2"
    easing="sine-in-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.join-t"
    to="0"
    duration="0.2"
    easing="sine-in-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.hot-layout-t"
    to="1"
    duration="0.2"
    easing="sine-in-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.base-vector-t"
    to="0"
    duration="0.3"
    easing="sine-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0"
    duration="0.3"
    easing="sine-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0"
    duration="0.3"
    easing="sine-out"
  ></tween>
  <tween
    target="camera"
    attr="main-camera.ortho-size"
    to="10"
    duration="0.3"
    easing="sine-out"
  ></tween>
  <pause duration="0.3"></pause>
  <tween
    target="tokens"
    attr="token-swap-driver.hot-t"
    to="1"
    duration="0.3"
    easing="sine-out"
  ></tween>
</sequence>

<sequence name="swap-to-barking">
  <tween
    target="tokens"
    attr="token-swap-driver.hot-t"
    to="0"
    duration="0.3"
    easing="sine-in"
  ></tween>
  <pause duration="0.1"></pause>
  <tween
    target="tokens"
    attr="token-swap-driver.hot-layout-t"
    to="0"
    duration="0.2"
    easing="sine-in-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.emergence-t"
    to="1"
    duration="0.2"
    easing="sine-in-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.join-t"
    to="1"
    duration="0.2"
    easing="sine-in-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0.3"
    duration="0.3"
    easing="sine-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0.5"
    duration="0.3"
    easing="sine-out"
  ></tween>
  <tween
    target="camera"
    attr="main-camera.ortho-size"
    to="12"
    duration="0.3"
    easing="sine-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.base-vector-t"
    to="1"
    duration="0.4"
    easing="back-out"
  ></tween>
</sequence>
`,ia=`<sequence name="show-dog-vector">
  <tween
    target="tokens"
    attr="token-swap-driver.dog-vector-t"
    to="1"
    duration="0.4"
    easing="back-out"
  ></tween>
</sequence>

<sequence name="hide-dog-vector">
  <tween
    target="tokens"
    attr="token-swap-driver.dog-vector-t"
    to="0"
    duration="0.3"
    easing="expo-out"
  ></tween>
</sequence>
`,aa=`<sequence name="show-hot-vector">
  <tween
    target="tokens"
    attr="token-swap-driver.hot-vector-t"
    to="1"
    duration="0.4"
    easing="back-out"
  ></tween>
</sequence>

<sequence name="hide-hot-vector">
  <tween
    target="tokens"
    attr="token-swap-driver.hot-vector-t"
    to="0"
    duration="0.3"
    easing="expo-out"
  ></tween>
</sequence>
`,sa=`<sequence name="combine-vectors">
  <tween
    target="tokens"
    attr="token-swap-driver.combine-t"
    to="1"
    duration="0.5"
    easing="expo-out"
  ></tween>
</sequence>

<sequence name="separate-vectors">
  <tween
    target="tokens"
    attr="token-swap-driver.combine-t"
    to="0"
    duration="0.4"
    easing="expo-out"
  ></tween>
</sequence>
`,ca=`<sequence name="pan-to-dot-product">
  <tween
    target="camera-target"
    attr="transform.pos-x"
    to="15"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <tween
    target="camera-target"
    attr="transform.pos-y"
    to="0"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <pause duration="0.3"></pause>

  <tween
    target="tokens"
    attr="token-swap-driver.dog-vector-t"
    to="0"
    duration="0.3"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.hot-vector-t"
    to="0"
    duration="0.3"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.combine-t"
    to="0"
    duration="0.4"
    easing="expo-out"
  ></tween>
  <pause duration="0.1"></pause>

  <tween target="vector-a" attr="bracket-vector.grow-t" to="1" duration="0.4" easing="back-out"></tween>
  <tween target="vector-b" attr="bracket-vector.grow-t" to="1" duration="0.4" easing="back-out"></tween>
</sequence>

<sequence name="pan-from-dot-product">
  <tween target="vector-a" attr="bracket-vector.grow-t" to="0" duration="0.3" easing="expo-out"></tween>
  <tween target="vector-b" attr="bracket-vector.grow-t" to="0" duration="0.3" easing="expo-out"></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.combine-t"
    to="1"
    duration="0.4"
    easing="expo-out"
  ></tween>
  <tween
    target="camera-target"
    attr="transform.pos-x"
    to="0"
    duration="0.6"
    easing="expo-out"
  ></tween>
  <tween
    target="camera-target"
    attr="transform.pos-y"
    to="2"
    duration="0.6"
    easing="expo-out"
  ></tween>
  <pause duration="0.2"></pause>

  <tween
    target="tokens"
    attr="token-swap-driver.dog-vector-t"
    to="1"
    duration="0.3"
    easing="back-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.hot-vector-t"
    to="1"
    duration="0.3"
    easing="back-out"
  ></tween>
</sequence>
`,ua=`<sequence name="show-multiplication">
  <tween
    target="camera-target"
    attr="transform.pos-x"
    to="16"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <tween target="dot-product" attr="dot-product.transition-t" to="1" duration="1.2" easing="expo-out"></tween>
  <pause duration="0.1"></pause>
  <tween target="result-vector" attr="bracket-vector.grow-t" to="1" duration="0.4" easing="expo-out"></tween>
</sequence>

<sequence name="hide-multiplication">
  <tween
    target="camera-target"
    attr="transform.pos-x"
    to="15"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <tween target="result-vector" attr="bracket-vector.grow-t" to="0" duration="0.3" easing="expo-out"></tween>
  <tween target="dot-product" attr="dot-product.transition-t" to="0" duration="0.6" easing="expo-out"></tween>
</sequence>
`,da=`<sequence name="show-sum">
  <tween target="result-vector" attr="bracket-vector.grow-t" to="0" duration="0.2" easing="expo-out"></tween>
  <pause duration="0.1"></pause>
  <tween target="dot-product" attr="dot-product.sum-t" to="1" duration="0.3" easing="expo-out"></tween>
</sequence>

<sequence name="hide-sum">
  <tween target="dot-product" attr="dot-product.sum-t" to="0" duration="0.2" easing="expo-out"></tween>
  <pause duration="0.1"></pause>
  <tween target="result-vector" attr="bracket-vector.grow-t" to="1" duration="0.3" easing="expo-out"></tween>
</sequence>
`,la=`<sequence name="scale-vectors-ab">
  <tween target="vector-a" attr="scale" to="1.05 1.05 1.05" duration="0.15" easing="sine-in-out"></tween>
  <tween target="vector-b" attr="scale" to="1.05 1.05 1.05" duration="0.15" easing="sine-in-out"></tween>
  <pause duration="0.15"></pause>
  <tween target="vector-a" attr="scale" to="1 1 1" duration="0.15" easing="sine-in-out"></tween>
  <tween target="vector-b" attr="scale" to="1 1 1" duration="0.15" easing="sine-in-out"></tween>
</sequence>

<sequence name="unscale-vectors-ab">
  <tween target="vector-a" attr="scale" to="1.05 1.05 1.05" duration="0.15" easing="sine-in-out"></tween>
  <tween target="vector-b" attr="scale" to="1.05 1.05 1.05" duration="0.15" easing="sine-in-out"></tween>
  <pause duration="0.15"></pause>
  <tween target="vector-a" attr="scale" to="1 1 1" duration="0.15" easing="sine-in-out"></tween>
  <tween target="vector-b" attr="scale" to="1 1 1" duration="0.15" easing="sine-in-out"></tween>
</sequence>
`,fa=`<sequence name="scale-sum">
  <tween target="dot-product" attr="dot-product.sum-bounce-t" to="1" duration="0.15" easing="sine-in-out"></tween>
  <pause duration="0.15"></pause>
  <tween target="dot-product" attr="dot-product.sum-bounce-t" to="0" duration="0.15" easing="sine-in-out"></tween>
</sequence>

<sequence name="unscale-sum">
  <tween target="dot-product" attr="dot-product.sum-bounce-t" to="1" duration="0.15" easing="sine-in-out"></tween>
  <pause duration="0.15"></pause>
  <tween target="dot-product" attr="dot-product.sum-bounce-t" to="0" duration="0.15" easing="sine-in-out"></tween>
</sequence>
`,pa=`<sequence name="zoom-out-dot-product">
  <tween target="camera" attr="main-camera.ortho-size" to="12" duration="0.5" easing="expo-out"></tween>
</sequence>

<sequence name="zoom-in-dot-product">
  <tween target="camera" attr="main-camera.ortho-size" to="10" duration="0.5" easing="expo-out"></tween>
</sequence>
`,ha=`<sequence name="pan-to-tokens">
  <tween target="camera" attr="main-camera.ortho-size" to="10" duration="0.5" easing="expo-out"></tween>
  <tween
    target="camera-target"
    attr="transform.pos-x"
    to="0"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <tween
    target="camera-target"
    attr="transform.pos-y"
    to="2"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0.3"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0.5"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <pause duration="0.1"></pause>
  <tween
    target="tokens"
    attr="token-arrow-driver.grow-t"
    to="1"
    duration="0.3"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-vector-driver.grow-t"
    to="1"
    duration="0.4"
    easing="back-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.base-vector-t"
    to="1"
    duration="0.4"
    easing="back-out"
  ></tween>
</sequence>

<sequence name="pan-from-tokens">
  <tween target="camera" attr="main-camera.ortho-size" to="12" duration="0.5" easing="expo-out"></tween>
  <tween
    target="tokens"
    attr="token-vector-driver.grow-t"
    to="0"
    duration="0.4"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.base-vector-t"
    to="0"
    duration="0.4"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-arrow-driver.grow-t"
    to="0"
    duration="0.3"
    easing="expo-out"
  ></tween>
  <tween
    target="camera-target"
    attr="transform.pos-x"
    to="16"
    duration="0.7"
    easing="expo-out"
  ></tween>
  <tween
    target="camera-target"
    attr="transform.pos-y"
    to="0"
    duration="0.7"
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
`,ma=`<sequence name="show-dog-q">
  <tween
    target="tokens"
    attr="token-swap-driver.dog-q-t"
    to="1"
    duration="0.4"
    easing="back-out"
  ></tween>
  <tween
    target="camera-target"
    attr="transform.pos-y"
    to="3"
    duration="0.5"
    easing="expo-out"
  ></tween>
</sequence>

<sequence name="hide-dog-q">
  <tween
    target="tokens"
    attr="token-swap-driver.dog-q-t"
    to="0"
    duration="0.3"
    easing="expo-out"
  ></tween>
  <tween
    target="camera-target"
    attr="transform.pos-y"
    to="2"
    duration="0.5"
    easing="expo-out"
  ></tween>
</sequence>
`,ga=`<sequence name="zoom-in-q">
  <tween
    target="camera"
    attr="main-camera.ortho-size"
    to="9"
    duration="0.5"
    easing="expo-out"
  ></tween>
</sequence>

<sequence name="zoom-out-q">
  <tween
    target="camera"
    attr="main-camera.ortho-size"
    to="10"
    duration="0.5"
    easing="expo-out"
  ></tween>
</sequence>
`,wa=`<sequence name="show-hot-k">
  <tween
    target="tokens"
    attr="token-swap-driver.hot-k-t"
    to="1"
    duration="0.4"
    easing="back-out"
  ></tween>
</sequence>

<sequence name="hide-hot-k">
  <tween
    target="tokens"
    attr="token-swap-driver.hot-k-t"
    to="0"
    duration="0.3"
    easing="expo-out"
  ></tween>
</sequence>
`,va=`<sequence name="zoom-out-k">
  <tween
    target="camera"
    attr="main-camera.ortho-size"
    to="11"
    duration="0.5"
    easing="expo-out"
  ></tween>
</sequence>

<sequence name="zoom-in-k">
  <tween
    target="camera"
    attr="main-camera.ortho-size"
    to="9"
    duration="0.5"
    easing="expo-out"
  ></tween>
</sequence>
`,ka=`<sequence name="show-qk-label">
  <tween
    target="camera-target"
    attr="transform.pos-y"
    to="4"
    duration="0.5"
    easing="expo-out"
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
    target="qk-label"
    attr="dot-product-label.q-t"
    to="1"
    duration="0.3"
    easing="back-out"
  ></tween>
  <tween
    target="qk-label"
    attr="dot-product-label.dot-t"
    to="1"
    duration="0.3"
    easing="back-out"
    delay="0.1"
  ></tween>
  <tween
    target="qk-label"
    attr="dot-product-label.k-t"
    to="1"
    duration="0.3"
    easing="back-out"
    delay="0.2"
  ></tween>
  <tween
    target="qk-label"
    attr="dot-product-label.equals-t"
    to="1"
    duration="0.3"
    easing="back-out"
    delay="0.3"
  ></tween>
  <tween
    target="qk-label"
    attr="dot-product-label.result-t"
    to="1"
    duration="0.3"
    easing="back-out"
    delay="0.4"
  ></tween>
</sequence>

<sequence name="hide-qk-label">
  <tween
    target="camera-target"
    attr="transform.pos-y"
    to="3"
    duration="0.5"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0.3"
    duration="0.5"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0.5"
    duration="0.5"
    easing="expo-out"
  ></tween>
  <tween
    target="qk-label"
    attr="dot-product-label.result-t"
    to="0"
    duration="0.2"
    easing="expo-out"
  ></tween>
  <tween
    target="qk-label"
    attr="dot-product-label.equals-t"
    to="0"
    duration="0.2"
    easing="expo-out"
    delay="0.05"
  ></tween>
  <tween
    target="qk-label"
    attr="dot-product-label.k-t"
    to="0"
    duration="0.2"
    easing="expo-out"
    delay="0.1"
  ></tween>
  <tween
    target="qk-label"
    attr="dot-product-label.dot-t"
    to="0"
    duration="0.2"
    easing="expo-out"
    delay="0.15"
  ></tween>
  <tween
    target="qk-label"
    attr="dot-product-label.q-t"
    to="0"
    duration="0.2"
    easing="expo-out"
    delay="0.2"
  ></tween>
</sequence>
`,ya=`<sequence name="scale-qk">
  <tween target="qk-label" attr="dot-product-label.q-t" to="0" duration="0.3" easing="expo-out"></tween>
  <tween target="qk-label" attr="dot-product-label.dot-t" to="0" duration="0.3" easing="expo-out"></tween>
  <tween target="qk-label" attr="dot-product-label.k-t" to="0" duration="0.3" easing="expo-out"></tween>
  <tween target="qk-label" attr="dot-product-label.equals-t" to="0" duration="0.3" easing="expo-out"></tween>
  <tween target="qk-label" attr="dot-product-label.result-t" to="0" duration="0.3" easing="expo-out"></tween>
  <pause duration="0.2"></pause>
  <tween
    target="tokens"
    attr="token-swap-driver.hot-score-t"
    to="1"
    duration="0.3"
    easing="back-out"
  ></tween>
</sequence>

<sequence name="unscale-qk">
  <tween
    target="tokens"
    attr="token-swap-driver.hot-score-t"
    to="0"
    duration="0.2"
    easing="expo-out"
  ></tween>
  <pause duration="0.1"></pause>
  <tween target="qk-label" attr="dot-product-label.q-t" to="1" duration="0.3" easing="expo-out"></tween>
  <tween target="qk-label" attr="dot-product-label.dot-t" to="1" duration="0.3" easing="expo-out"></tween>
  <tween target="qk-label" attr="dot-product-label.k-t" to="1" duration="0.3" easing="expo-out"></tween>
  <tween target="qk-label" attr="dot-product-label.equals-t" to="1" duration="0.3" easing="expo-out"></tween>
  <tween target="qk-label" attr="dot-product-label.result-t" to="1" duration="0.3" easing="expo-out"></tween>
</sequence>
`,Ta=`<sequence name="show-all-k">
  <tween
    target="tokens"
    attr="token-swap-driver.base-k-t"
    to="1"
    duration="0.4"
    easing="back-out"
  ></tween>
  <pause duration="0.2"></pause>
  <tween
    target="tokens"
    attr="token-swap-driver.all-scores-t"
    to="1"
    duration="0.3"
    easing="back-out"
  ></tween>
</sequence>

<sequence name="hide-all-k">
  <tween
    target="tokens"
    attr="token-swap-driver.all-scores-t"
    to="0"
    duration="0.2"
    easing="expo-out"
  ></tween>
  <pause duration="0.1"></pause>
  <tween
    target="tokens"
    attr="token-swap-driver.base-k-t"
    to="0"
    duration="0.3"
    easing="expo-out"
  ></tween>
</sequence>
`,ba=`<sequence name="squish-qk">
  <tween
    target="tokens"
    attr="token-swap-driver.q-squish-t"
    to="1"
    duration="0.4"
    easing="back-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.k-squish-t"
    to="1"
    duration="0.4"
    easing="back-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.softmax-t"
    to="1"
    duration="0.3"
    easing="back-out"
  ></tween>
</sequence>

<sequence name="unsquish-qk">
  <tween
    target="tokens"
    attr="token-swap-driver.softmax-t"
    to="0"
    duration="0.2"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.q-squish-t"
    to="0"
    duration="0.4"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.k-squish-t"
    to="0"
    duration="0.4"
    easing="expo-out"
  ></tween>
</sequence>
`,Sa=`<sequence name="show-sum-equals">
  <tween
    target="tokens"
    attr="token-swap-driver.sum-t"
    to="1"
    duration="0.6"
    easing="expo-out"
  ></tween>
</sequence>

<sequence name="hide-sum-equals">
  <tween
    target="tokens"
    attr="token-swap-driver.sum-t"
    to="0"
    duration="0.3"
    easing="expo-out"
  ></tween>
</sequence>
`,xa=`<sequence name="show-score-colors">
  <tween
    target="tokens"
    attr="token-swap-driver.score-color-t"
    to="1"
    duration="0.6"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.sum-t"
    to="0"
    duration="0.3"
    easing="expo-out"
  ></tween>
</sequence>

<sequence name="hide-score-colors">
  <tween
    target="tokens"
    attr="token-swap-driver.score-color-t"
    to="0"
    duration="0.3"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.sum-t"
    to="1"
    duration="0.6"
    easing="expo-out"
  ></tween>
</sequence>
`,Ca=`<sequence name="show-all-v">
  <tween
    target="tokens"
    attr="token-swap-driver.v-squish-t"
    to="1"
    duration="0.1"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.base-v-t"
    to="1"
    duration="0.5"
    easing="expo-out"
  ></tween>
</sequence>

<sequence name="hide-all-v">
  <tween
    target="tokens"
    attr="token-swap-driver.base-v-t"
    to="0"
    duration="0.5"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.v-squish-t"
    to="0"
    duration="0.1"
  ></tween>
</sequence>
`,Ea=`<sequence name="show-v-label">
  <tween
    target="v-label"
    attr="v-label.grow-t"
    to="1"
    duration="0.4"
    easing="expo-out"
  ></tween>
</sequence>

<sequence name="hide-v-label">
  <tween
    target="v-label"
    attr="v-label.grow-t"
    to="0"
    duration="0.3"
    easing="expo-out"
  ></tween>
</sequence>
`,qa=`<sequence name="tilt-camera">
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0.6"
    duration="0.5"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0.4"
    duration="0.5"
    easing="expo-out"
  ></tween>
</sequence>

<sequence name="untilt-camera">
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0"
    duration="0.5"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0"
    duration="0.5"
    easing="expo-out"
  ></tween>
</sequence>
`,za=`<sequence name="offset-v-vectors">
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0"
    duration="0.5"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0"
    duration="0"
    easing="expo-out"
  ></tween>
  <pause duration="0.1"></pause>
  <tween
    target="tokens"
    attr="token-swap-driver.v-offset-t"
    to="1"
    duration="0.5"
    easing="expo-out"
  ></tween>
  <tween
    target="v-label"
    attr="v-label.grow-t"
    to="0"
    duration="0.3"
    easing="expo-out"
  ></tween>
  <tween
    target="v-formula-label"
    attr="v-formula-label.grow-t"
    to="1"
    duration="0.3"
    easing="expo-out"
  ></tween>
</sequence>

<sequence name="unoffset-v-vectors">
  <tween
    target="v-formula-label"
    attr="v-formula-label.grow-t"
    to="0"
    duration="0.3"
    easing="expo-out"
  ></tween>
  <tween
    target="v-label"
    attr="v-label.grow-t"
    to="1"
    duration="0.3"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.v-offset-t"
    to="0"
    duration="0.5"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0.6"
    duration="0.5"
    easing="expo-out"
  ></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-pitch"
    to="0.4"
    duration="0.5"
    easing="expo-out"
  ></tween>
</sequence>
`,Xa=`<sequence name="show-v-sum">
  <tween
    target="tokens"
    attr="token-swap-driver.v-sum-t"
    to="1"
    duration="0.6"
    easing="expo-out"
  ></tween>
</sequence>

<sequence name="hide-v-sum">
  <tween
    target="tokens"
    attr="token-swap-driver.v-sum-t"
    to="0"
    duration="0.3"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.sum-t"
    to="0"
    duration="0.3"
    easing="expo-out"
  ></tween>
</sequence>
`,Aa=`<sequence name="reset-for-all-tokens">
  <tween
    target="tokens"
    attr="token-swap-driver.all-scores-t"
    to="0"
    duration="0.15"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.hot-score-t"
    to="0"
    duration="0.15"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.v-offset-t"
    to="0"
    duration="0.2"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.sum-t"
    to="0"
    duration="0.15"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.v-sum-t"
    to="0"
    duration="0.15"
    easing="expo-out"
  ></tween>
  <pause duration="0.1"></pause>
  <tween
    target="tokens"
    attr="token-swap-driver.q-stagger-t"
    to="1"
    duration="0.4"
    easing="linear"
  ></tween>
</sequence>

<sequence name="undo-reset-for-all-tokens">
  <tween
    target="tokens"
    attr="token-swap-driver.q-stagger-t"
    to="0"
    duration="0.2"
    easing="expo-out"
  ></tween>
  <pause duration="0.1"></pause>
  <tween
    target="tokens"
    attr="token-swap-driver.v-sum-t"
    to="1"
    duration="0.2"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.sum-t"
    to="1"
    duration="0.2"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.v-offset-t"
    to="1"
    duration="0.2"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.hot-score-t"
    to="1"
    duration="0.15"
    easing="expo-out"
  ></tween>
  <tween
    target="tokens"
    attr="token-swap-driver.all-scores-t"
    to="1"
    duration="0.15"
    easing="expo-out"
  ></tween>
</sequence>
`,Ya=`<sequence name="pulse-token-vectors">
  <tween
    target="tokens"
    attr="token-swap-driver.vector-stagger-t"
    to="1"
    duration="0.8"
    easing="linear"
  ></tween>
</sequence>

<sequence name="undo-pulse-token-vectors">
  <tween
    target="tokens"
    attr="token-swap-driver.vector-stagger-t"
    to="0"
    duration="0.01"
    easing="linear"
  ></tween>
</sequence>
`,Ba=`<sequence name="flicker-token-vectors">
  <tween
    target="tokens"
    attr="token-swap-driver.vector-flicker-t"
    to="1"
    duration="0.5"
    easing="linear"
  ></tween>
  <pause duration="0.5"></pause>
  <tween
    target="tokens"
    attr="token-swap-driver.vector-flicker-t"
    to="0"
    duration="0.01"
    easing="linear"
  ></tween>
</sequence>

<sequence name="undo-flicker-token-vectors">
  <tween
    target="tokens"
    attr="token-swap-driver.vector-flicker-t"
    to="0"
    duration="0.01"
    easing="linear"
  ></tween>
</sequence>
`,Oa=`<sequence name="rotate-camera">
  <tween target="dot-product" attr="dot-product.transition-t" to="0" duration="0.1" easing="expo-out"></tween>
  <tween target="dot-product" attr="dot-product.sum-t" to="0" duration="0.1" easing="expo-out"></tween>
  <tween target="vector-a" attr="bracket-vector.grow-t" to="0" duration="0.1" easing="expo-out"></tween>
  <tween target="vector-b" attr="bracket-vector.grow-t" to="0" duration="0.1" easing="expo-out"></tween>
  <tween target="result-vector" attr="bracket-vector.grow-t" to="0" duration="0.1" easing="expo-out"></tween>
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="6.283185"
    duration="1"
    easing="sine-in-out"
  ></tween>
</sequence>

<sequence name="undo-rotate-camera">
  <tween
    target="camera"
    attr="orbit-camera.target-yaw"
    to="0"
    duration="0.5"
    easing="linear"
  ></tween>
  <pause duration="0.5"></pause>
  <tween target="dot-product" attr="dot-product.transition-t" to="1" duration="0.1" easing="expo-out"></tween>
  <tween target="dot-product" attr="dot-product.sum-t" to="1" duration="0.1" easing="expo-out"></tween>
  <tween target="vector-a" attr="bracket-vector.grow-t" to="1" duration="0.1" easing="expo-out"></tween>
  <tween target="vector-b" attr="bracket-vector.grow-t" to="1" duration="0.1" easing="expo-out"></tween>
  <tween target="result-vector" attr="bracket-vector.grow-t" to="1" duration="0.1" easing="expo-out"></tween>
</sequence>
`,mo={"0-1":"enter-scene","1-0":"exit-scene","1-2":"enter-vectors","2-1":"exit-vectors","2-3":"pan-to-graph","3-2":"pan-from-graph","3-4":"pan-to-vectors","4-3":"pan-from-vectors","4-5":"pan-to-network","5-4":"pan-from-network","5-6":"zoom-out","6-5":"zoom-in","6-7":"swap-to-hot","7-6":"swap-to-barking","7-8":"show-dog-vector","8-7":"hide-dog-vector","8-9":"show-hot-vector","9-8":"hide-hot-vector","9-10":"combine-vectors","10-9":"separate-vectors","10-11":"pan-to-dot-product","11-10":"pan-from-dot-product","11-12":"show-multiplication","12-11":"hide-multiplication","12-13":"show-sum","13-12":"hide-sum","13-14":"scale-vectors-ab","14-13":"unscale-vectors-ab","14-15":"scale-sum","15-14":"unscale-sum","15-16":"zoom-out-dot-product","16-15":"zoom-in-dot-product","16-17":"pan-to-tokens","17-16":"pan-from-tokens","17-18":"show-dog-q","18-17":"hide-dog-q","18-19":"zoom-in-q","19-18":"zoom-out-q","19-20":"show-hot-k","20-19":"hide-hot-k","20-21":"zoom-out-k","21-20":"zoom-in-k","21-22":"show-qk-label","22-21":"hide-qk-label","22-23":"scale-qk","23-22":"unscale-qk","23-24":"show-all-k","24-23":"hide-all-k","24-25":"squish-qk","25-24":"unsquish-qk","25-26":"show-sum-equals","26-25":"hide-sum-equals","26-27":"show-score-colors","27-26":"hide-score-colors","27-28":"show-all-v","28-27":"hide-all-v","28-29":"show-v-label","29-28":"hide-v-label","29-30":"tilt-camera","30-29":"untilt-camera","30-31":"offset-v-vectors","31-30":"unoffset-v-vectors","31-32":"show-v-sum","32-31":"hide-v-sum","32-33":"reset-for-all-tokens","33-32":"undo-reset-for-all-tokens","33-34":"pulse-token-vectors","34-33":"undo-pulse-token-vectors","34-35":"flicker-token-vectors","35-34":"undo-flicker-token-vectors","35-36":"rotate-camera","36-35":"undo-rotate-camera"};function La(e){const t=[Ki,Ji,ea,ta,na,oa,ra,ia,aa,sa,ca,ua,da,la,fa,pa,ha,ma,ga,wa,va,ka,ya,Ta,ba,Sa,xa,Ca,Ea,qa,za,Xa,Aa,Ya,Ba,Oa];for(const n of t){const o=document.createElement("div");o.innerHTML=n.trim();for(const i of Array.from(o.children))e.appendChild(i)}}const _a=[{canvasId:"canvas-1",theme:To,createPlugin:()=>[yo(mo),Gr,hi,Jr,oi,di,Vi,vi,Ii,Ri,Fi,Si,Bi,Gi,$i],setupUI:(e,t)=>{const n=e.getEntityByName("tokens");n!==null&&(O.color[n]=t.foreground,O.baseY[n]=-.3,O.separatedY[n]=0,Mr(e,n,"the hot dog was barking"),jr(e,n,{color:t.teal,padding:.05,offsetT:0}),ei(e,n,{color:t.muted,arrowHeight:.6,startOffset:.2}),mi(e,n,{color:t.teal,flickerColor:t.negative,arrowHeight:.6,arrowStartOffset:.2}),e.addComponent(n,x,{networkX:7,networkY:-15,borderColor:t.yellow}),ki(e,n,{vectorHeight:2,vectorWidth:.25,vectorGap:.25,qColor:t.green,kColor:t.blue,vColor:t.teal}),xi(e,n,{fontSize:.6,color:t.teal,offsetAboveK:.5}),Ci(e,n,[2,7,10,1]),Oi(e,n,{fontSize:.5,color:t.foreground,plusOffsetX:-.1,equalsOffsetX:.8,vSumOffsetX:-.8,vEqualsOffsetX:.2}));const o=e.getEntityByName("neural-network");o!==null&&(be.connections[o]=0);const i=e.getEntityByName("vector-graph");i!==null&&(N.axisColor[i]=t.foreground,N.vectorColor[i]=t.foreground);const a=e.getEntityByName("vector-a");a!==null&&(M.color[a]=t.foreground);const c=e.getEntityByName("vector-b");c!==null&&(M.color[c]=t.foreground);const u=e.getEntityByName("result-vector");u!==null&&(M.color[u]=t.foreground);const l=e.getEntityByName("dot-product");l!==null&&(A.color[l]=t.foreground);const p=e.getEntityByName("qk-label");p!==null&&(L.qColor[p]=t.positive,L.dotColor[p]=t.foreground,L.kColor[p]=t.blue,L.resultColor[p]=t.teal);const f=e.getEntityByName("v-formula-label");f!==null&&(R.qColor[f]=t.positive,R.kColor[f]=t.blue,R.vColor[f]=t.teal,R.parenColor[f]=t.foreground)}}];function Va(e){const t=document.createElement("entity");t.setAttribute("name","neural-network"),t.setAttribute("transform","pos: 0 -15 0; scale: 0.5"),t.setAttribute("neural-network","connections: 0"),e.appendChild(t);const n=document.createElement("entity");n.setAttribute("name","qk-label"),n.setAttribute("transform","pos: 0 8 0"),n.setAttribute("dot-product-label","font-size: 0.65; spacing: 0.55"),e.appendChild(n);const o=document.createElement("entity");o.setAttribute("name","v-label"),o.setAttribute("transform","pos: 0 8 0"),o.setAttribute("v-label","font-size: 0.65; color: 0x5a9bb0"),e.appendChild(o);const i=document.createElement("entity");i.setAttribute("name","v-formula-label"),i.setAttribute("transform","pos: 0 8 0"),i.setAttribute("v-formula-label","font-size: 0.65; spacing: 0.5"),e.appendChild(i)}if(typeof document<"u"){const e=()=>{const t=document.querySelector('world[canvas="#canvas-1"]');t&&(Va(t),La(t)),ko(_a),_r("#canvas-1",mo)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}
//# sourceMappingURL=video-BYv2m3ng.js.map
