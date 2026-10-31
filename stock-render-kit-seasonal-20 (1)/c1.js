/* ===== 1 : rotating glass polyhedra, 3D seamless loop ===== */
C[1]=()=>{newTL();const R=rng(101),phi=(1+Math.sqrt(5))/2,nz=v=>{const l=Math.hypot(...v);return v.map(a=>a/l)};
  const ico={v:[[-1,phi,0],[1,phi,0],[-1,-phi,0],[1,-phi,0],[0,-1,phi],[0,1,phi],[0,-1,-phi],[0,1,-phi],[phi,0,-1],[phi,0,1],[-phi,0,-1],[-phi,0,1]].map(nz),
    f:[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]]};
  const oct={v:[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],f:[[0,2,4],[2,1,4],[1,3,4],[3,0,4],[2,0,5],[1,2,5],[3,1,5],[0,3,5]]};
  const cube={v:[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]].map(nz),f:[[0,1,2,3],[4,5,6,7],[0,1,5,4],[2,3,7,6],[1,2,6,5],[0,3,7,4]]};
  const tet={v:[[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]].map(nz),f:[[0,1,2],[0,3,1],[0,2,3],[1,3,2]]};
  const SH=[ /* g, base x,y, radius, sway ax,ay, rot multipliers (integers), alpha, hero */
    [ico,1250,540,250,40,26,[1,0],[2,1],[-1,2],1,1],[oct,560,300,140,26,34,[2,.5],[1,2],[1,0],.95,0],[tet,720,800,120,34,20,[-1,1],[2,0],[1,1],.9,0],
    [cube,1680,830,105,22,30,[1,2],[-2,1],[1,0],.85,0],[oct,470,760,62,20,22,[-2,0],[1,1],[2,2],.55,0],[ico,980,150,70,26,14,[1,1],[-1,0],[2,0],.6,0],
    [tet,1520,330,58,22,22,[2,2],[1,0],[-1,1],.55,0],[cube,900,950,50,16,10,[-1,0],[2,2],[1,1],.45,0],[ico,1830,330,40,10,20,[1,0],[1,2],[-1,0],.4,0]];
  const DOT=Array.from({length:700},()=>({x:R()*W,v:R(),m:R()<.7?1:2,s:.8+R()*1.6,ph:R()*TAU,k:1+((R()*3)|0),a:.2+R()*.7}));
  const Lg=nz([-.5,-.6,.65]);
  function shape(g,cx,cy,Rr,rx,ry,rz,al,th,hero,inner){
    const a=th*rx[0]+rx[1],b=th*ry[0]+ry[1],c=th*rz[0]+rz[1],ca=Math.cos(a),sa=Math.sin(a),cb=Math.cos(b),sb=Math.sin(b),cc=Math.cos(c),sc=Math.sin(c);
    const rot=([x,y,z])=>{const y1=y*ca-z*sa,z1=y*sa+z*ca,x2=x*cb+z1*sb,z2=-x*sb+z1*cb;return[x2*cc-y1*sc,x2*sc+y1*cc,z2]};
    const P=g.v.map(rot),Q=P.map(p=>{const s=4/(4-p[2]);return[cx+p[0]*Rr*s,cy+p[1]*Rr*s]});
    const F=g.f.map(f=>{const p0=P[f[0]],p1=P[f[1]],p2=P[f[2]];let n=[(p1[1]-p0[1])*(p2[2]-p0[2])-(p1[2]-p0[2])*(p2[1]-p0[1]),(p1[2]-p0[2])*(p2[0]-p0[0])-(p1[0]-p0[0])*(p2[2]-p0[2]),(p1[0]-p0[0])*(p2[1]-p0[1])-(p1[1]-p0[1])*(p2[0]-p0[0])];
      n=nz(n);const cen=f.reduce((s,i)=>[s[0]+P[i][0],s[1]+P[i][1],s[2]+P[i][2]],[0,0,0]).map(v=>v/f.length);if(n[0]*cen[0]+n[1]*cen[1]+n[2]*cen[2]<0)n=n.map(v=>-v);
      return{f,n,z:cen[2],cen}}).sort((p,q)=>p.z-q.z);
    ctx.globalCompositeOperation='lighter';
    for(const fc of F){const fres=1-Math.abs(fc.n[2]),dif=Math.max(0,fc.n[0]*Lg[0]+fc.n[1]*Lg[1]+fc.n[2]*Lg[2]),front=fc.n[2]>0;
      ctx.beginPath();fc.f.forEach((i,j)=>j?ctx.lineTo(Q[i][0],Q[i][1]):ctx.moveTo(Q[i][0],Q[i][1]));ctx.closePath();
      const col=mixc([30,90,230],[120,225,255],clamp(fres*.7+dif*.5,0,1));
      ctx.fillStyle=rgba(col,al*(front?.04+.12*fres+.1*dif:.025+.07*fres+.03*dif)*(inner?.7:1));ctx.fill();
      ctx.lineWidth=(hero?1.8:1.3)*(inner?.7:1);ctx.strokeStyle=rgba([150,228,255],al*(front?.55:.22)*(inner?.55:1));ctx.stroke();
      if(hero&&!inner){for(const [dx,cl] of [[-2.2,[255,70,110]],[2.2,[60,170,255]]]){ctx.save();ctx.translate(dx,dx*.4);ctx.strokeStyle=rgba(cl,al*(front?.3:.1));ctx.lineWidth=1.3;ctx.stroke();ctx.restore()}}
      if(front&&dif>.72&&!inner){const q=fc.f.reduce((s,i)=>[s[0]+Q[i][0]/fc.f.length,s[1]+Q[i][1]/fc.f.length],[0,0]);ctx.globalAlpha=clamp((dif-.72)*3.2,0,1)*al*.9;ctx.drawImage(spr([190,235,255],128),q[0]-Rr*.34,q[1]-Rr*.34,Rr*.68,Rr*.68);ctx.globalAlpha=1}}
    if(!inner)shape(g,cx,cy,Rr*.6,[-rx[0],rx[1]+1],[-ry[0],ry[1]+2],[-rz[0],rz[1]],al*.7,th,0,1)}
  draw=()=>{clear();const ms=now(),th=LOOP(ms),u=ms/DUR;
    let g=ctx.createRadialGradient(W*.62,H*.5,0,W*.62,H*.5,H*1.25);g.addColorStop(0,'#0d2a5e');g.addColorStop(.5,'#06122c');g.addColorStop(1,'#01040c');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';
    for(const [c,x,y,r,a,ph,k] of [[[25,200,215],820+120*Math.sin(th+1),320+60*Math.sin(th*2),760,.11,0,1],[[255,150,60],1560+90*Math.cos(th),820+50*Math.sin(th),640,.2,0,1],[[90,80,255],420+60*Math.sin(th*2),900,600,.14,0,1]]){ctx.globalAlpha=a;ctx.drawImage(spr(c,256),x-r,y-r,2*r,2*r)}
    ctx.globalAlpha=1;
    for(const d of DOT){const y=H-((d.v+u*d.m)%1)*(H+40)+20,tw=(.5+.5*Math.sin(th*d.k*2+d.ph))**2;ctx.globalAlpha=d.a*(.15+.85*tw);ctx.fillStyle='#bfe9ff';ctx.fillRect(d.x+Math.sin(th*d.k+d.ph)*14-d.s/2,y,d.s,d.s)}
    ctx.globalAlpha=1;
    const order=SH.slice().sort((p,q)=>p[3]-q[3]);
    for(const s of order){const [g2,bx,by,Rr,ax,ay,rx,ry,rz,al,hero]=s,x=bx+ax*Math.sin(th+Rr*.01),y=by+ay*Math.sin(th*2+Rr*.02);shape(g2,x,y,Rr,rx,ry,rz,al,th,hero)}
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;bloom(.9,[2,4]);vignette(.5);grain(.03)}};

/* ===== 2 : Christmas and New Year gold particle backdrop, bokeh, twinkle stars (loop) ===== */
C[2]=()=>{newTL();const R=rng(202),gold=[244,200,90],red=[214,32,58],cream=[255,238,196],green=[40,170,110];
  const P=Array.from({length:9000},()=>{const t=R();return{x:R()*W,v:R(),m:R()<.8?1:2,s:t<.72?1.1+R()*1.1:t<.95?2.2+R()*2:4+R()*3,ph:R()*TAU,k:1+((R()*3)|0),a:.3+R()*.7,sw:8+R()*50,c:R()<.82?0:1}});
  const B=[];for(const [n,r0,r1,a,m] of [[24,14,34,.3,1],[12,40,82,.36,1],[5,120,200,.22,1]])for(let i=0;i<n;i++)B.push({x:R()*W,v:R(),r:r0+R()*(r1-r0),a:a*(.6+.6*R()),m,ph:R()*TAU,k:1+((R()*2)|0),c:[red,red,gold,gold,gold,cream][(R()*6)|0],sw:20+R()*70});
  B.sort((p,q)=>p.r-q.r);
  const ST=Array.from({length:20},()=>({x:80+R()*(W-160),y:60+R()*(H-120),r:16+R()*40,k:2+((R()*4)|0),ph:R()*TAU}));
  draw=()=>{clear();const ms=now(),th=LOOP(ms),u=ms/DUR;
    let g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#010d09');g.addColorStop(.6,'#04190f');g.addColorStop(1,'#07281b');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';
    ctx.globalAlpha=.07+.02*Math.sin(th*3);ctx.drawImage(spr([20,120,80],256),W/2-900,H/2-620,1800,1240);
    ctx.globalAlpha=.2;ctx.drawImage(spr([255,170,60],256),W/2-900,H-250,1800,640);ctx.globalAlpha=.16;ctx.drawImage(spr([214,32,58],256),-300,-300,1100,1100);ctx.drawImage(spr([214,32,58],256),W-800,H-800,1100,1100);
    for(const b of B){const y=H+b.r-((b.v+u*b.m)%1)*(H+2*b.r),x=b.x+Math.sin(th*b.k+b.ph)*b.sw;const isR=b.c===red;ctx.globalCompositeOperation=isR?'source-over':'lighter';ctx.globalAlpha=Math.min(1,b.a*(isR?2.2:1)*(.75+.25*Math.sin(th*2+b.ph)));ctx.drawImage(bokehSpr(b.c),x-b.r,y-b.r,2*b.r,2*b.r)}ctx.globalCompositeOperation='lighter';
    for(const grp of [0,1]){ctx.fillStyle=grp?'#fff4d6':'#f0b53a';for(const p of P){if(p.c!==grp)continue;const yy=((p.v+u*p.m)%1),y=H+20-yy*(H+40),nx=lnoise(p.x*.0035,y*.0035,th)*60,x=p.x+Math.sin(th*p.k+p.ph)*p.sw+nx;
      const env=Math.sin(Math.PI*yy)**.5,tw=(.5+.5*Math.sin(th*p.k*2+p.ph))**2,al=p.a*env*(.2+.8*tw);if(al<.02)continue;ctx.globalAlpha=al;ctx.fillRect(x-p.s/2,y-p.s/2,p.s,p.s)}}
    for(const s of ST){const a=(.5+.5*Math.sin(th*s.k+s.ph))**4;if(a<.03)continue;const x=s.x+Math.sin(th+s.ph)*8,y=s.y+Math.cos(th*2+s.ph)*6;ctx.globalAlpha=a*.9;ctx.fillStyle='#fff2c8';flare(x,y,s.r*(.5+.7*a),a*.9,'#ffe7a8');ctx.globalAlpha=a*.6;ctx.drawImage(spr(gold,128),x-s.r*1.1,y-s.r*1.1,s.r*2.2,s.r*2.2)}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.9,[2,4]);vignette(.5);grain(.03)}};

/* ===== 3 : autumn leaves and pumpkin border frame (loop), copy space in the middle ===== */
C[3]=()=>{newTL();const R=rng(303),cols=[['#f6b02a','#e0701b','#8e2410'],['#ffd75a','#f39a22','#a1380d'],['#e8602a','#b3260f','#6e1308'],['#e0a030','#b0661a','#6a3410']];
  const FL=[];for(let i=0;i<150;i++){const side=(R()*4)|0,t=R(),d=Math.pow(R(),1.7)*230;let x,y;if(side===0){x=t*W;y=d-30}else if(side===1){x=t*W;y=H-d+30}else if(side===2){x=d-30;y=t*H}else{x=W-d+30;y=t*H}
    FL.push({x,y,r:32+R()*58,rot:R()*TAU,k:1+((R()*2)|0),ph:R()*TAU,kind:R()<.62?0:1,col:[0,1,2,2,2,3][(R()*6)|0],z:R()})}FL.sort((a,b)=>a.z-b.z);
  const FA=Array.from({length:30},(_,i)=>{const side=R()<.5||i<18;return{x:side?(R()<.5?R()*430:W-R()*430):430+R()*1060,v:R(),m:1+(R()<.3?1:0),r:26+R()*34,rot:R()*TAU,kr:(R()<.5?-1:1)*(1+((R()*2)|0)),kf:1+((R()*3)|0),ph:R()*TAU,kind:R()<.6?0:1,col:(R()*4)|0,sw:30+R()*70,a:side?1:.55}});
  const PK=[[260,925,175,1],[1690,945,150,0],[520,1000,78,0],[1430,1010,66,0],[1880,780,70,0]];
  const MO=Array.from({length:260},()=>({x:R()*W,v:R(),s:.8+R()*1.8,ph:R()*TAU,k:1+((R()*3)|0),a:.2+R()*.6,m:R()<.5?1:2}));
  draw=()=>{clear();const ms=now(),th=LOOP(ms),u=ms/DUR;
    let g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,'#3a1a09');g.addColorStop(1,'#150803');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.2+.04*Math.sin(th);ctx.drawImage(spr([255,150,40],256),-500,-500,1800,1800);
    for(let i=0;i<3;i++){ctx.save();ctx.translate(120+i*260,-60);ctx.rotate(.5+.02*Math.sin(th+i));const gg=ctx.createLinearGradient(0,0,0,1700);gg.addColorStop(0,`rgba(255,190,90,${.09+.03*Math.sin(th*2+i)})`);gg.addColorStop(1,'rgba(255,190,90,0)');ctx.fillStyle=gg;ctx.fillRect(-70,0,140,1700);ctx.restore()}
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
    for(const l of FL){ctx.save();ctx.translate(l.x,l.y);ctx.rotate(l.rot+.1*Math.sin(th*l.k+l.ph));ctx.drawImage(leafSpr(l.kind,cols[l.col],l.r),-l.r*1.15,-l.r*1.15,l.r*2.3,l.r*2.3);ctx.restore()}
    for(const [x,y,r,face] of PK){const br=1+.006*Math.sin(th*2+x);ctx.drawImage(pumpkinSpr(r,face),x-r*1.35*br,y-r*1.46*br+r*.1,r*2.7*br,r*2.7*br);
      if(face){const fl=.75+.25*Math.sin(th*7)+.1*Math.sin(th*13+1);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.22*fl;ctx.drawImage(spr([255,150,30],256),x-r*1.1,y-r*.9,r*2.2,r*1.8);ctx.globalAlpha=.16*fl;ctx.drawImage(spr([255,200,90],128),x-r*.5,y-r*.25,r,r*.7);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1}}
    for(const l of FA){const yy=(l.v+u*l.m)%1,y=-80+yy*(H+160),x=l.x+Math.sin(th*l.kf+l.ph)*l.sw,sx=Math.cos(th*l.kf*2+l.ph);ctx.save();ctx.translate(x,y);ctx.rotate(l.rot+th*l.kr*.5+.5*Math.sin(th*l.kf+l.ph));ctx.scale(Math.abs(sx)*.85+.15,1);ctx.globalAlpha=l.a*Math.sin(Math.PI*clamp(yy,0,1))**.35;ctx.drawImage(leafSpr(l.kind,cols[l.col],l.r),-l.r*1.15,-l.r*1.15,l.r*2.3,l.r*2.3);ctx.restore()}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='lighter';ctx.fillStyle='#ffcf80';
    for(const m of MO){const y=H-((m.v+u*m.m)%1)*H,tw=(.5+.5*Math.sin(th*m.k*2+m.ph))**2;ctx.globalAlpha=m.a*(.15+.85*tw);ctx.fillRect(m.x+Math.sin(th*m.k+m.ph)*20,y,m.s,m.s)}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.5,[3,5]);vignette(.4);grain(.03)}};

/* ===== 4 : red background, snowflakes and twinkling stars (loop) ===== */
C[4]=()=>{newTL();const R=rng(404),mk=(n,r0,r1,m,a,low)=>Array.from({length:n},()=>({x:R()*W,v:R(),r:r0+R()*(r1-r0),m,a:a*(.7+.3*R()),ph:R()*TAU,k:1+((R()*2)|0),sg:R()<.5?-1:1,vr:(R()*3)|0,sw:14+R()*50,low}));
  const L=[mk(150,6,12,1,.55),mk(70,14,26,2,.85),mk(14,60,110,3,.38,1),mk(7,30,48,2,.95)];
  const ST=Array.from({length:26},()=>({x:60+R()*(W-120),y:50+R()*(H-100),r:12+R()*34,k:2+((R()*4)|0),ph:R()*TAU,c:R()<.6?'#fff6e0':'#ffd98a'}));
  const DOT=Array.from({length:500},()=>({x:R()*W,y:R()*H,s:.8+R()*1.5,k:1+((R()*5)|0),ph:R()*TAU}));
  draw=()=>{clear();const ms=now(),th=LOOP(ms),u=ms/DUR;
    let g=ctx.createRadialGradient(W*.5,H*.42,0,W*.5,H*.5,H*1.15);g.addColorStop(0,'#b5111f');g.addColorStop(.5,'#7c0b18');g.addColorStop(1,'#2e030a');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.06+.02*Math.sin(th*2);ctx.drawImage(spr([255,200,170],256),W/2-700,-200,1400,900);
    ctx.fillStyle='#ffe9c4';for(const d of DOT){const a=(.5+.5*Math.sin(th*d.k*2+d.ph))**3;ctx.globalAlpha=.1+.5*a;ctx.fillRect(d.x,d.y,d.s,d.s)}
    for(const s of ST){const a=(.5+.5*Math.sin(th*s.k+s.ph))**4;ctx.globalAlpha=.25+.75*a;ctx.drawImage(spr([255,214,150],128),s.x-s.r*1.2,s.y-s.r*1.2,s.r*2.4,s.r*2.4);flare(s.x,s.y,s.r*(.45+.75*a),.35+.65*a,s.c)}
    ctx.globalCompositeOperation='source-over';
    const cols=['#ffffff','#ffeef0','#fff4e6'];
    for(const layer of L)for(const f of layer){const yy=(f.v+u*f.m)%1,y=-f.r+yy*(H+2*f.r),x=f.x+Math.sin(th*f.k+f.ph)*f.sw,rot=f.ph+th*f.sg*f.k;
      ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.globalAlpha=f.a;const sp=flakeSpr(f.vr,f.low?'#ffffff':cols[f.vr],f.r,f.low);ctx.drawImage(sp,-f.r,-f.r,2*f.r,2*f.r);
      if(!f.low&&f.r>20){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=f.a*.35;ctx.drawImage(spr([255,200,200],64),-f.r*1.5,-f.r*1.5,f.r*3,f.r*3);ctx.globalCompositeOperation='source-over'}ctx.restore()}
    ctx.globalAlpha=1;bloom(.35,[3,5]);vignette(.45);grain(.03)}};
