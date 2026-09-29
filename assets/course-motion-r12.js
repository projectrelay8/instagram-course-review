(()=>{
 const ledger=document.querySelector('.income-ledger');if(!ledger)return;
 const track=ledger.querySelector('.income-scroll-track'),source=track?.querySelector('ol'),button=ledger.querySelector('.income-roll-toggle');if(!source||!button)return;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');let visible=false,paused=false;
 function sync(){ledger.classList.toggle('is-running',visible&&!reduce.matches);ledger.classList.toggle('is-paused',paused);button.setAttribute('aria-pressed',String(paused));button.textContent=paused?'▶ 재생':'Ⅱ 일시정지';}
 function setup(){if(reduce.matches){ledger.removeAttribute('data-roll-ready');button.hidden=true;}else{if(!track.querySelector('.income-scroll-copy')){const copy=source.cloneNode(true);copy.className='income-scroll-copy';copy.setAttribute('aria-hidden','true');track.appendChild(copy);}ledger.setAttribute('data-roll-ready','');button.hidden=false;}sync();}
 button.addEventListener('click',()=>{paused=!paused;sync();});reduce.addEventListener('change',setup);
 if('IntersectionObserver'in window){new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);sync();},{threshold:.1}).observe(ledger);}else visible=true;
 document.addEventListener('visibilitychange',()=>{ledger.classList.toggle('is-running',!document.hidden&&visible&&!reduce.matches);});setup();
})();