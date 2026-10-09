/* MOMENTARY V3 — edit the data below to replace your media and text. */
const CONFIG={siteName:'MOMENTARY',subtitle:'Jejak Kenangan',gallery:[
 {src:'J0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3OTE0NjU5NzcsIm5iZiI6MTc5MTQ2NTY3NywicGF0aCI6Ii8zMTk0MjM1MzAvNjY4NjIyNzMyLTdhYjg5MTQzLWM3YjQtNDRiNS1hNWVmLTBhZWQ3YTU1MGFmMS5qcGc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYxMDA4JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MTAwOFQxMzIxMTdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT00ZmM3NmM1MDcwMGRmZDVlNWI1OTI2OWRmYmRlY2Q1NjQ5YjVlNzU1ZjFkMjZlZTNiYTA0NzUxNDc2ZDllYTVmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZqcGVnIn0.TJCNK_WC32WWNmKEJ12RukdVuhHFFeHtTOeOjEZswRQ/02.jpg',title:'A LITTLE MOMENT',date:'2026'},
 {src:'media/photos/03.jpg',title:'TOGETHER',date:'2026'},
 {src:'media/photos/04.jpg',title:'GOOD TIMES',date:'2026'},
 {src:'media/photos/05.jpg',title:'ONE FOR THE ARCHIVE',date:'2026'},
 {src:'media/photos/06.jpg',title:'KEEP THIS MOMENT',date:'2026'},
 {src:'media/photos/07.jpg',title:'WE WERE HERE',date:'2026'}],videos:[
 {src:'media/videos/01.mp4',title:'DOCUMENTATION / 01'},
 {src:'media/videos/02.mp4',title:'DOCUMENTATION / 02'}],timeline:[
 {year:'2026',title:'THE FIRST STEP',text:'Awal dari sebuah perjalanan.'},
 {year:'2026',title:'THE MOMENTS',text:'Tawa, kegiatan, dan cerita yang tumbuh bersama.'},
 {year:'2026',title:'THE MEMORY',text:'Hal-hal sederhana yang akhirnya berarti.'}],captions:[
 'Every little moment can become a story worth keeping.',
 'We laughed. We grew. We were here.',
 'Some memories arrive quietly.',
 'Time passes. The feeling stays.',
 'This was our story.' ]};
const $=s=>document.querySelector(s); const gate=$('#gate'),app=$('#app'),topbar=$('#topbar'); let soundOn=true;
function play(a,v=.45){if(!soundOn)return;a.currentTime=0;a.volume=v;a.play().catch(()=>{})} function toast(t){const x=$('#toast');x.textContent=t;x.classList.add('show');setTimeout(()=>x.classList.remove('show'),2200)}
function mediaImg(src,title,date){const c=document.createElement('figure');c.className='memory-card';const img=new Image();img.src=src;img.alt=title;img.loading='lazy';img.onerror=()=>c.innerHTML=`<div class="placeholder"><b>${title}</b><small>${src}</small></div>`;c.append(img);const cap=document.createElement('figcaption');cap.className='caption';cap.innerHTML=`<span>${title}</span><span>${date}</span>`;c.append(cap);return c}
function render(){const g=$('#gallery');CONFIG.gallery.forEach((x,i)=>{const c=mediaImg(x.src,x.title,x.date);if(i===3)c.classList.add('wide');g.append(c)});const v=$('#videos');CONFIG.videos.forEach(x=>{const f=document.createElement('figure');f.className='video-card';f.innerHTML=`<video controls playsinline preload="metadata" src="${x.src}"></video><figcaption>${x.title}</figcaption>`;v.append(f)});const tl=$('#timeline');CONFIG.timeline.forEach((x,i)=>{const a=document.createElement('article');a.className='timeline-item';a.innerHTML=`<span class="num">0${i+1}</span><div><small>${x.year}</small><h4>${x.title}</h4><p>${x.text}</p></div>`;tl.append(a)});const wall=$('#wall');CONFIG.gallery.slice(0,8).forEach(x=>{const d=document.createElement('div');const img=new Image();img.src=x.src;img.alt=x.title;img.loading='lazy';img.onerror=()=>d.textContent=x.title;d.append(img);wall.append(d)});}
render();
const revealObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>revealObs.observe(x));
const music=$('#music'),click=$('#click'),whoosh=$('#whoosh');
$('#enterBtn').addEventListener('click',()=>{play(click,.55);setTimeout(()=>play(whoosh,.3),100);const name=$('#guestName').value.trim();if(name) $('#closingText').innerHTML=`Untuk ${name},<br>time passes. memories stay.`;gate.classList.add('hidden');app.classList.remove('hidden');topbar.classList.remove('hidden');music.volume=.2;if(soundOn)music.play().catch(()=>{});window.scrollTo(0,0)});
$('#muteBtn').addEventListener('click',()=>{soundOn=!soundOn;$('#muteBtn').textContent=soundOn?'♫':'🔇';if(soundOn)music.play().catch(()=>{});else music.pause()});
$('#replay').addEventListener('click',()=>{play(click,.45);window.scrollTo({top:0,behavior:'smooth'})});
let capIndex=0;const capObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){$('#caption').style.opacity=0;setTimeout(()=>{$('#caption').textContent=CONFIG.captions[capIndex++%CONFIG.captions.length];$('#caption').style.opacity=1},220)}}),{threshold:.5});capObs.observe($('.soundtrack'));
// Play/pause videos according to visibility; sound remains off until visitor chooses controls.
const vidObs=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){/* intentionally not autoplaying video */}else if(!v.paused)v.pause()}),{threshold:.2});document.querySelectorAll('video').forEach(v=>vidObs.observe(v));
