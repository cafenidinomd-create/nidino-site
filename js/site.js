
// Active nav + entrance
document.addEventListener('DOMContentLoaded', ()=>{
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a=>{ if(a.getAttribute('href')===path) a.classList.add('active'); });
  const logo = document.querySelector('.brand .logo-wrap'); if(logo) logo.classList.add('reveal-logo');
});
// Clock
document.addEventListener('DOMContentLoaded', ()=>{
  const canvas = document.getElementById('nidinoClock'); if(!canvas) return;
  const ctx = canvas.getContext('2d'); const DPR = window.devicePixelRatio || 1;
  function resize(){ const s = canvas.clientWidth; canvas.width = s*DPR; canvas.height = s*DPR; ctx.setTransform(DPR,0,0,DPR,0,0); }
  resize(); window.addEventListener('resize', resize);
  const img = new Image(); img.src = 'assets/logo-nidino.png';
  function tick(){
    const s = canvas.clientWidth, c = s/2;
    ctx.clearRect(0,0,s,s); ctx.save(); ctx.translate(c,c);
    const cs = getComputedStyle(document.documentElement);
    const card = cs.getPropertyValue('--card').trim() || '#fff';
    const line = cs.getPropertyValue('--line').trim() || '#ddd';
    ctx.beginPath(); ctx.arc(0,0,s/2-6,0,Math.PI*2); ctx.fillStyle = card; ctx.fill(); ctx.strokeStyle=line; ctx.stroke();
    for(let i=0;i<60;i++){ const len=(i%5===0)?10:4; const w=(i%5===0)?2:1;
      ctx.save(); ctx.rotate(i*Math.PI/30); ctx.beginPath(); ctx.moveTo(0,-s/2+16); ctx.lineTo(0,-s/2+16+len);
      ctx.lineWidth=w; ctx.strokeStyle = (cs.color==='rgb(250, 246, 242)')? 'rgba(255,255,255,.28)': 'rgba(0,0,0,.28)'; ctx.stroke(); ctx.restore(); }
    const now = new Date(); const sec = now.getSeconds()+now.getMilliseconds()/1000; const min = now.getMinutes()+sec/60; const hr = (now.getHours()%12)+min/60;
    function hand(angle, len, w, color){ ctx.save(); ctx.rotate(angle); ctx.beginPath(); ctx.lineWidth=w; ctx.lineCap='round'; ctx.strokeStyle=color; ctx.moveTo(0,12); ctx.lineTo(0,-len); ctx.stroke(); ctx.restore(); }
    hand(hr*Math.PI/6, s*0.22, 5, '#1F1712'); hand(min*Math.PI/30, s*0.30, 3.5, '#1F1712'); hand(sec*Math.PI/30, s*0.34, 2, '#CDAA84');
    ctx.beginPath(); ctx.arc(0,0,4,0,Math.PI*2); ctx.fillStyle='#CDAA84'; ctx.fill();
    if(img.complete){ const w = s*0.22; ctx.drawImage(img, -w/2, -w/2, w, w); }
    ctx.restore();
    const d = document.getElementById('nidinoDate'); if(d){ d.textContent = new Intl.DateTimeFormat('ru-RU',{weekday:'short',day:'numeric',month:'long',year:'numeric'}).format(now); }
    requestAnimationFrame(tick);
  }
  img.onload = ()=>requestAnimationFrame(tick);
});
