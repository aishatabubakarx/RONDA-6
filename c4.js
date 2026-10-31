/* ===== 13 : Valentine glossy 3D hearts falling, bokeh and heartbeat glow (loop) ===== */
C[13]=()=>{newTL();const R=rng(1313),HT=[],PAL=[{hi:[255,120,150],mid:[216,20,62],lo:[120,6,34],side:[70,2,20]},{hi:[255,190,205],mid:[245,100,140],lo:[190,50,95],side:[120,25,60]}];
  const mk=(n,r0,r1,m,a,blur)=>{for(let i=0;i<n;i++)HT.push({x:R()*W,v:R(),r:r0+R()*(r1-r0),m,a,ph:R()*TAU,k:1+((R()*2)|0),ry:1+((R()*3)|0),sg:R()<.5?-1:1,sw:20+R()*70,blur,pal:R()<.72?0:1,tl:.35+R()*.3})};
  mk(34,22,40,1,.6,0);mk(20,56,92,2,.95,0);mk(7,104,140,2,1,0);mk(7,170,240,3,.55,1);HT.sort((p,q)=>p.r-q.r);
  const BK=Array.from({length:30},()=>({x:R()*W,v:R(),r:20+R()*70,c:[[255,120,170],[255,70,110],[255,190,210]][(R()*3)|0],a:.3+R()*.4,ph:R()*TAU,k:1+((R()*2)|0)}));
  const DU=Array.from({length:420},()=>({x:R()*W,v:R(),s:.8+R()*1.6,ph:R()*TAU,k:1+((R()*3)|0),m:R()<.5?1:2}));
  const soft=(()=>{const k=offscreen(24,24),x=k.getContext('2d');x.fillStyle='#fff';x.translate(12,12);const s=16;x.beginPath();x.moveTo(0,s*.3-s*.45);x.bezierCurveTo(0,-s*.1-s*.45,-s*.6,-s*.1-s*.45,-s*.6,s*.3-s*.45);x.bezierCurveTo(-s*.6,s*.65-s*.45,-s*.2,s*.85-s*.45,0,s-s*.45);x.bezierCurveTo(s*.2,s*.85-s*.45,s*.6,s*.65-s*.45,s*.6,s*.3-s*.45);x.bezierCurveTo(s*.6,-s*.1-s*.45,0,-s*.1-s*.45,0,s*.3-s*.45);x.fill();return k})();
  const tinted={};const tint=(c)=>{const k=c.join();if(tinted[k])return tinted[k];const o=offscreen(24,24),x=o.getContext('2d');x.drawImage(soft,0,0);x.globalCompositeOperation='source-in';x.fillStyle=rgba(c,1);x.fillRect(0,0,24,24);return tinted[k]=o};
  function heart3(x,y,s,a,tilt,p,al,spec){const ca=Math.max(.03,Math.abs(Math.cos(a))),sa=Math.sin(a),d=s*.6,N=9;ctx.save();ctx.translate(x,y);ctx.rotate(tilt);ctx.globalAlpha=al;
    const zs=[...Array(N).keys()].map(i=>i/(N-1)-.5);if(Math.cos(a)<0)zs.reverse();
    zs.forEach((z,idx)=>{const fr2=idx/(N-1);ctx.save();ctx.translate(sa*z*d,0);ctx.scale(ca,1);heart(0,-s*.45,s);
      if(idx<N-1){ctx.fillStyle=rgba(mixc(p.side,p.lo,fr2),1);ctx.fill()}
      else{const gg=ctx.createLinearGradient(-s*.5,-s*.5,s*.5,s*.6);gg.addColorStop(0,rgba(p.hi,1));gg.addColorStop(.5,rgba(p.mid,1));gg.addColorStop(1,rgba(p.lo,1));ctx.fillStyle=gg;ctx.fill();ctx.lineWidth=Math.max(1,s*.025);ctx.strokeStyle=rgba(mixc(p.hi,[255,255,255],.5),.55);ctx.stroke();
        ctx.fillStyle=`rgba(255,255,255,${.5*spec})`;ctx.beginPath();ctx.ellipse(-s*.24,-s*.36,s*.13,s*.07,-.7,0,TAU);ctx.fill();ctx.fillStyle=`rgba(255,255,255,${.2*spec})`;ctx.beginPath();ctx.ellipse(s*.22,-s*.3,s*.05,s*.025,.5,0,TAU);ctx.fill()}ctx.restore()});ctx.restore()}
  draw=()=>{clear();const ms=now(),th=LOOP(ms),u=ms/DUR,bp=fr(u*18),beat=Math.exp(-((bp/.07)**2))+.6*Math.exp(-(((bp-.2)/.08)**2));
    let g=ctx.createRadialGradient(W*.5,H*.45,0,W*.5,H*.5,H*1.15);g.addColorStop(0,'#5e0b30');g.addColorStop(.55,'#2c0619');g.addColorStop(1,'#0d0208');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.16+.2*beat;ctx.drawImage(spr([255,60,110],256),W/2-800,H/2-600,1600,1200);
    for(const b of BK){const y=H+b.r-((b.v+u)%1)*(H+2*b.r);ctx.globalAlpha=b.a*(.7+.3*Math.sin(th*2+b.ph));ctx.drawImage(bokehSpr(b.c),b.x+Math.sin(th*b.k+b.ph)*30-b.r,y-b.r,2*b.r,2*b.r)}
    ctx.fillStyle='#ffd6e4';for(const d of DU){const y=H-((d.v+u*d.m)%1)*H,tw=(.5+.5*Math.sin(th*d.k*2+d.ph))**2;ctx.globalAlpha=.1+.6*tw;ctx.fillRect(d.x+Math.sin(th*d.k+d.ph)*20,y,d.s,d.s)}
    ctx.globalCompositeOperation='source-over';
    for(const h of HT){const yy=(h.v+u*h.m)%1,y=-h.r*1.2+yy*(H+2.4*h.r),x=h.x+Math.sin(th*h.k+h.ph)*h.sw,a=th*h.ry*h.sg+h.ph,tilt=.4*Math.sin(th*h.k+h.ph*2),p=PAL[h.pal],spec=.5+.5*Math.sin(th*2+h.ph);
      if(h.blur){ctx.save();ctx.translate(x,y);ctx.rotate(tilt);ctx.scale(Math.max(.05,Math.abs(Math.cos(a))),1);ctx.globalAlpha=h.a;ctx.drawImage(tint(p.mid),-h.r*.75,-h.r*.7,h.r*1.5,h.r*1.5);ctx.restore()}
      else heart3(x,y,h.r,a,tilt,p,h.a,spec)}
    ctx.globalAlpha=1;bloom(.55,[2,4]);vignette(.45);grain(.03)}};

/* ===== 14 : meditation space, seven glowing chakra lights breathing in a column (loop) ===== */
C[14]=()=>{newTL();const R=rng(1414),cx=W/2,NB=160,NH=90,nb=offscreen(NB,NH),nx=nb.getContext('2d'),ni=nx.createImageData(NB,NH);
  const CK=[{c:[232,52,62],n:4,y:905},{c:[246,128,44],n:6,y:775},{c:[248,206,64],n:10,y:645},{c:[72,200,112],n:12,y:515},{c:[52,162,250],n:16,y:385},{c:[96,76,218],n:2,y:255},{c:[184,116,255],n:24,y:125}];
  const cAt=y=>{const t=clamp((905-y)/780*6,0,6),i=Math.min(5,Math.floor(t));return mixc(CK[i].c,CK[i+1].c,t-i)};
  const SP=Array.from({length:700},()=>({v:R(),m:R()<.6?1:2,k:1+((R()*3)|0),ph:R()*TAU,a:.3+R()*.7,s:1+R()*2.2,sp:10+R()*60}));
  const ST=Array.from({length:320},()=>({x:R()*W,y:R()*H,s:.8+R()*1.4,k:1+((R()*4)|0),ph:R()*TAU}));
  draw=()=>{clear();const ms=now(),th=LOOP(ms),u=ms/DUR;
    let g=ctx.createRadialGradient(cx,H*.5,0,cx,H*.5,H*1.1);g.addColorStop(0,'#10102e');g.addColorStop(.6,'#070718');g.addColorStop(1,'#020208');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    for(let j=0;j<NH;j++)for(let i=0;i<NB;i++){const x=i/NB*W,y=j/NH*H,v=Math.max(0,.5+.8*(lnoise(x*.0012,y*.0016,th)*.7+lnoise(x*.003+7,y*.003,th*2)*.3)),k=(j*NB+i)*4;ni.data[k]=90;ni.data[k+1]=70;ni.data[k+2]=200;ni.data[k+3]=Math.min(255,v*20)}
    nx.putImageData(ni,0,0);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=1;ctx.drawImage(nb,0,0,W,H);
    ctx.fillStyle='#cfd6ff';for(const s of ST){const tw=(.5+.5*Math.sin(th*s.k*2+s.ph))**2;ctx.globalAlpha=.1+.6*tw;ctx.fillRect(s.x,s.y,s.s,s.s)}
    ctx.save();ctx.translate(cx,H*.52);ctx.rotate(u*TAU/16);ctx.strokeStyle='rgba(190,170,255,.07)';ctx.lineWidth=2;for(let i=0;i<16;i++){ctx.rotate(TAU/16);ctx.beginPath();ctx.ellipse(250,0,170,48,0,0,TAU);ctx.stroke()}ctx.restore();
    ctx.globalAlpha=.12;const ax=ctx.createLinearGradient(0,60,0,960);ax.addColorStop(0,'rgba(184,116,255,1)');ax.addColorStop(.5,'rgba(72,200,112,1)');ax.addColorStop(1,'rgba(232,52,62,1)');ctx.fillStyle=ax;ctx.fillRect(cx-2,60,4,900);ctx.globalAlpha=1;
    for(let q=0;q<3;q++){const y=960-fr(u*3+q/3)*900;ctx.globalAlpha=.4;const cc=cAt(y);ctx.drawImage(spr(cc,128),cx-24,y-24,48,48)}
    for(const p of SP){const yy=(p.v+u*p.m)%1,y=930-yy*850,x=cx+Math.sin(th*p.k+p.ph)*(14+p.sp*(.4+yy)),tw=(.5+.5*Math.sin(th*p.k*2+p.ph))**2,env=Math.sin(Math.PI*yy)**.6;ctx.globalAlpha=p.a*(.2+.8*tw)*env;ctx.drawImage(spr(cAt(y),32),x-p.s*2,y-p.s*2,p.s*4,p.s*4)}
    CK.forEach((k,i)=>{const b=.5+.5*Math.sin(th*3-i*.55),y=k.y,rr=(i===5?112:i===6?122:84)*(.94+.1*b);
      ctx.globalAlpha=.1+.14*b;ctx.drawImage(spr(k.c,256),cx-170*(.85+.3*b),y-170*(.85+.3*b),340*(.85+.3*b),340*(.85+.3*b));
      const rot=u*TAU/k.n*(i%2?-1:1);ctx.save();ctx.translate(cx,y);ctx.lineWidth=1.8;ctx.strokeStyle=rgba(mixc(k.c,[255,255,255],.35),.5+.3*b);ctx.fillStyle=rgba(k.c,.08);
      for(let j=0;j<k.n;j++){ctx.save();ctx.rotate(rot+j*TAU/k.n);const pw=k.n===2?rr*.55:Math.max(rr*.1,rr*.36*Math.min(1,8/k.n+.4)),pl=k.n===2?rr*1.1:rr*.62;ctx.beginPath();ctx.ellipse(rr*.55+pl*.05,0,pl*.5,pw*(k.n===2?1:.7),0,0,TAU);ctx.fill();ctx.stroke();ctx.restore()}
      ctx.globalAlpha=.55;ctx.beginPath();ctx.arc(0,0,rr*.66,0,TAU);ctx.stroke();ctx.beginPath();ctx.arc(0,0,rr*.48,0,TAU);ctx.stroke();ctx.restore();
      const ph=fr(u*3-i*.1+1);ctx.globalAlpha=Math.pow(1-ph,2)*.4;ctx.strokeStyle=rgba(k.c,1);ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,y,40+170*ez('power2.out',ph),0,TAU);ctx.stroke();
      const or=21*(1+.1*b);ctx.globalAlpha=1;const og=ctx.createRadialGradient(cx-8,y-8,2,cx,y,or*1.8);og.addColorStop(0,'rgba(255,255,255,.95)');og.addColorStop(.18,rgba(mixc(k.c,[255,255,255],.3),.95));og.addColorStop(.55,rgba(k.c,.6));og.addColorStop(1,rgba(k.c,0));ctx.fillStyle=og;ctx.beginPath();ctx.arc(cx,y,or*1.8,0,TAU);ctx.fill()});
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.3,[2,4]);vignette(.5);grain(.03)}};

/* ===== 15 : Happy New Year, golden type with fireworks (15 s, no year number) ===== */
C[15]=()=>{const D=DUR/1000,g={fade:0,line:0,cam:0};newTL();const R=rng(1515);
  const s1=mkL('HAPPY','Montserrat',800,104,W/2,40),s2=mkL('NEW YEAR','Playfair Display',800,236,W/2,10);
  s1.L.forEach((l,i)=>A(l,{a:0,y:40,sc:.8},{a:1,y:0,sc:1},2.2+i*.08,.8,'power3.out'));s2.L.forEach((l,i)=>A(l,{a:0,y:90,sc:1.4},{a:1,y:0,sc:1},3.0+i*.1,1.0,'expo.out'));
  A(g,{fade:0},{fade:1},0,.6,'power1.out');A(g,{line:0},{line:1},4.4,1.2,'expo.out');A(g,{cam:0},{cam:1},0,D,'none');A(g,{fade:1},{fade:0},D-1,1,'power1.in');
  const PA=[[[255,214,110],[255,246,210]],[[255,160,176],[255,232,238]],[[160,210,255],[240,248,255]],[[255,190,92],[255,236,172]]];
  const BU=[[1.2,360,300,0],[2.5,1560,260,1],[3.6,820,200,2],[4.9,1240,340,3],[6.1,300,480,2],[7.3,1640,420,0],[8.5,980,170,1],[9.8,520,260,3],[11.0,1400,230,0],[12.0,860,330,2],[13.0,1220,190,1]];
  const SPK=BU.map(([t0,x,y,pi],bi)=>({t0,x,y,pi,s:Array.from({length:150},(_,i)=>{const a=R()*TAU,sp=Math.pow(R(),.5)*620+60;return{vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:1.8+R()*1.5,w:R()<.5?0:1,cr:R()<.14}})}));
  const BB=Array.from({length:60},()=>({x:R()*W,v:R(),r:2+R()*5,m:1+((R()*2)|0),ph:R()*TAU}));
  const ST=Array.from({length:220},()=>({x:R()*W,y:R()*H*.9,s:.8+R()*1.4,ph:R()*TAU,k:1+((R()*4)|0)}));
  const T=offscreen(W*S,H*S),tx=T.getContext('2d');
  const gold=l=>{const gg=ctx.createLinearGradient(0,-100,0,100);gg.addColorStop(0,'#ffe08a');gg.addColorStop(.45,'#eab335');gg.addColorStop(.55,'#c8861c');gg.addColorStop(1,'#f3c35a');return gg};
  const gold1=l=>{const gg=ctx.createLinearGradient(0,-50,0,50);gg.addColorStop(0,'#ffe08a');gg.addColorStop(.5,'#eab335');gg.addColorStop(1,'#c8861c');return gg};
  draw=()=>{clear();const ms=now(),t=ms/1000;ctx.save();const cs=1+.03*g.cam;ctx.translate(W/2,H/2);ctx.scale(cs,cs);ctx.translate(-W/2,-H/2);
    let gr=ctx.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#02030a');gr.addColorStop(1,'#0b1233');ctx.fillStyle=gr;ctx.fillRect(-60,-60,W+120,H+120);
    ctx.globalCompositeOperation='lighter';ctx.fillStyle='#dfe6ff';for(const s of ST){ctx.globalAlpha=(.1+.5*(.5+.5*Math.sin(t*s.k*.9+s.ph))**2)*g.fade;ctx.fillRect(s.x,s.y,s.s,s.s)}
    ctx.strokeStyle='#ffe7b0';ctx.lineWidth=1;for(const b of BB){const y=H+20-((b.v+t/(14/b.m))%1)*(H+40);ctx.globalAlpha=.16*g.fade;ctx.beginPath();ctx.arc(b.x+Math.sin(t+b.ph)*14,y,b.r,0,TAU);ctx.stroke()}
    for(const b of SPK){const pa=PA[b.pi],rt=t-b.t0;
      if(rt>-.75&&rt<0){const p=(rt+.75)/.75,hx=lerp(b.x+(b.x<W/2?-60:60),b.x,ez('power2.out',p)),hy=lerp(H+10,b.y,ez('power2.out',p));ctx.globalAlpha=.8*g.fade;ctx.drawImage(spr(pa[1],32),hx-12,hy-12,24,24);ctx.strokeStyle=rgba(pa[0],.5);ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(hx-(b.x<W/2?-1:1)*8*(1-p),hy+60*(1-p)+30);ctx.lineTo(hx,hy);ctx.stroke()}
      if(rt>=0&&rt<3){if(rt<.25){ctx.globalAlpha=(1-rt/.25)*.22*g.fade;ctx.drawImage(spr(pa[0],128),b.x-380,b.y-380,760,760)}
        for(const k of b.s){const a=rt;if(a>k.life)continue;const kd=1.7,d=(1-Math.exp(-kd*a))/kd,d2=(1-Math.exp(-kd*Math.max(0,a-.07)))/kd,x1=b.x+k.vx*d,y1=b.y+k.vy*d+.5*150*a*a,x0=b.x+k.vx*d2,y0=b.y+k.vy*d2+.5*150*Math.max(0,a-.07)**2,l=1-a/k.life;
          if(k.cr&&l<.35){ctx.globalAlpha=(.5+.5*Math.sin(a*60))*l*3*g.fade;ctx.fillStyle='#fff';ctx.fillRect(x1-1.5,y1-1.5,3,3);continue}
          ctx.globalAlpha=Math.pow(l,1.3)*.95*g.fade;ctx.strokeStyle=rgba(k.w?pa[1]:pa[0],1);ctx.lineWidth=3.2;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x1,y1);ctx.stroke();if(l>.5){ctx.globalAlpha=(l-.5)*.7*g.fade;ctx.drawImage(spr(pa[0],32),x1-10,y1-10,20,20)}}}}
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=g.fade;
    drawL(s1,380,{fill:gold1,glow:[['rgba(255,180,60,.22)',12]]});drawL(s2,540,{fill:gold,glow:[['rgba(255,170,50,.2)',18]]});
    ctx.save();ctx.globalAlpha=g.fade*g.line;const lw=420*g.line;for(const sg of [-1,1]){const gl=ctx.createLinearGradient(W/2,0,W/2+sg*lw,0);gl.addColorStop(0,'rgba(244,200,90,.95)');gl.addColorStop(1,'rgba(244,200,90,0)');ctx.fillStyle=gl;ctx.fillRect(Math.min(W/2+sg*60,W/2+sg*lw),700,Math.abs(lw-60),3)}starPath(ctx,W/2,701,16,6,4,0);ctx.fillStyle='#ffe39a';ctx.fill();ctx.restore();
    const ph=((t-5.6)%3.4)/1.1;if(t>5.6&&ph>=0&&ph<=1){const main=ctx;ctx=tx;tx.setTransform(1,0,0,1,0,0);tx.globalCompositeOperation='source-over';tx.globalAlpha=1;tx.clearRect(0,0,T.width,T.height);tx.setTransform(S,0,0,S,0,0);drawL(s1,380,{fill:'#fff'});drawL(s2,540,{fill:'#fff'});
      tx.globalCompositeOperation='source-atop';const bx=-300+ez('power2.inOut',ph)*(W+600),gg=tx.createLinearGradient(bx-170,0,bx+170,0);gg.addColorStop(0,'rgba(255,255,255,0)');gg.addColorStop(.5,'rgba(255,255,255,.9)');gg.addColorStop(1,'rgba(255,255,255,0)');tx.fillStyle=gg;tx.fillRect(0,0,W,H);ctx=main;
      ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.75*g.fade;ctx.drawImage(T,0,0);ctx.restore()}
    ctx.restore();ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.35,[2,4]);vignette(.5);grain(.03)}};

/* ===== 16 : Merry Christmas script, light garlands and snowfall (15 s) ===== */
C[16]=()=>{const D=DUR/1000,g={fade:0,ign:0,ul:0,sub:0,cam:0};newTL();const R=rng(1616);
  const s1=mkL('Merry Christmas','Great Vibes',400,262,W/2,2);s1.L.forEach((l,i)=>A(l,{a:0,y:30,sc:.82},{a:1,y:0,sc:1},1.4+i*.1,.9,'power3.out'));
  A(g,{fade:0},{fade:1},0,.8,'power1.out');A(g,{ign:0},{ign:1},.6,2.6,'power1.inOut');A(g,{ul:0},{ul:1},3.4,1.3,'expo.out');A(g,{sub:0},{sub:1},4.4,1.2,'power3.out');A(g,{cam:0},{cam:1},0,D,'none');A(g,{fade:1},{fade:0},D-1,1,'power1.in');
  const BC=[[255,222,150],[255,74,74],[255,194,71],[170,212,255]],arcs=[];
  for(const [y0,sag,hook] of [[60,120,520],[150,95,430]]){const n=Math.ceil((W+hook)/hook);for(let a=-1;a<n;a++){const x0=a*hook+(y0>100?hook*.4:0);for(let b=0;b<=Math.floor(hook/62);b++){const f=b/Math.floor(hook/62);arcs.push({x:x0+f*hook,y:y0+sag*Math.sin(Math.PI*f)-(y0>100?0:10),c:BC[(arcs.length*7)%4],ph:R()*TAU,k:(arcs.length)})}}}
  const SN=Array.from({length:170},()=>({x:R()*W,v:R(),r:2.5+Math.pow(R(),2)*13,m:6+R()*10,ph:R()*TAU,sw:10+R()*40,vr:(R()*3)|0}));
  const TW=Array.from({length:16},()=>({x:260+R()*(W-520),y:260+R()*500,r:10+R()*22,k:1+R()*2,ph:R()*TAU}));
  const warm=l=>{const gg=ctx.createLinearGradient(0,-120,0,120);gg.addColorStop(0,'#ffffff');gg.addColorStop(.6,'#fff1cf');gg.addColorStop(1,'#ffd98a');return gg};
  draw=()=>{clear();const ms=now(),t=ms/1000;ctx.save();const cs=1+.03*g.cam;ctx.translate(W/2,H/2);ctx.scale(cs,cs);ctx.translate(-W/2,-H/2);
    let gr=ctx.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#050f2a');gr.addColorStop(.7,'#0a2250');gr.addColorStop(1,'#12326a');ctx.fillStyle=gr;ctx.fillRect(-60,-60,W+120,H+120);
    ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.2*g.fade;ctx.drawImage(spr([255,190,110],256),W/2-900,300,1800,900);
    ctx.globalAlpha=.7*g.fade;ctx.strokeStyle='#0a1a2a';ctx.lineWidth=3;ctx.globalCompositeOperation='source-over';
    for(const [y0,sag,hook] of [[60,120,520],[150,95,430]]){ctx.beginPath();for(let x=-hook;x<=W+hook;x+=8){const o=(y0>100?hook*.4:0),f=(((x-o)%hook)+hook)%hook/hook,y=y0+sag*Math.sin(Math.PI*f)-(y0>100?0:10);x<=-hook+1?ctx.moveTo(x,y):ctx.lineTo(x,y)}ctx.stroke()}
    ctx.globalCompositeOperation='lighter';
    arcs.forEach((b,i)=>{const lit=clamp((g.ign*1.25-b.x/W*.9)*4,0,1),tw=.65+.35*Math.sin(t*2.4+b.ph);ctx.globalAlpha=lit*tw*g.fade;ctx.drawImage(spr(b.c,64),b.x-34,b.y-34,68,68);ctx.globalAlpha=lit*g.fade;ctx.fillStyle=rgba(mixc(b.c,[255,255,255],.6),1);ctx.beginPath();ctx.ellipse(b.x,b.y+5,5,8,0,0,TAU);ctx.fill()});
    ctx.fillStyle='#ffffff';for(const s of SN){const y=-20+((s.v+t/(H/s.m/ (1)*.0+ (H+40)/(s.m*5)))%1)*(H+40),x=s.x+Math.sin(t*.9+s.ph)*s.sw;ctx.globalAlpha=(.4+s.r/26)*g.fade;if(s.r>8){ctx.save();ctx.translate(x,y);ctx.rotate(t*.4*(s.ph>3?-1:1)+s.ph);ctx.globalCompositeOperation='source-over';ctx.drawImage(flakeSpr(s.vr,'#ffffff',s.r),-s.r,-s.r,2*s.r,2*s.r);ctx.restore();ctx.globalCompositeOperation='lighter'}else{ctx.beginPath();ctx.arc(x,y,s.r*.55,0,TAU);ctx.fill()}}
    for(const q of TW){const a=Math.max(0,Math.sin(t*q.k+q.ph))**6*clamp((t-3)/1.5,0,1);if(a>.03){ctx.globalAlpha=a*g.fade;flare(q.x,q.y,q.r*(.5+.7*a),a,'#fff0c0')}}
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=g.fade;drawL(s1,540,{fill:warm,glow:[['rgba(255,190,100,.55)',26]]});
    const ul=g.ul,lw=620*ul;ctx.globalAlpha=g.fade*ul;const gl=ctx.createLinearGradient(W/2-lw,0,W/2+lw,0);gl.addColorStop(0,'rgba(255,217,138,0)');gl.addColorStop(.5,'rgba(255,230,160,1)');gl.addColorStop(1,'rgba(255,217,138,0)');ctx.fillStyle=gl;ctx.fillRect(W/2-lw,712,2*lw,3);starPath(ctx,W/2,713,15,6,4,0);ctx.fillStyle='#fff3c4';ctx.fill();
    ctx.globalAlpha=g.fade*g.sub;txt('Wishing you joy, peace and love',W/2,790+14*(1-g.sub),{f:'Playfair Display',w:700,size:50,ls:5,fill:'#ffe7b8'});
    ctx.restore();ctx.globalAlpha=1;bloom(.65,[2,4]);vignette(.45);grain(.03)}};
