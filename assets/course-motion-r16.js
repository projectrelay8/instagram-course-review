(()=>{
 const ledger=document.querySelector('.income-ledger'),track=ledger?.querySelector('.income-scroll-track'),source=track?.querySelector('ol');if(!source)return;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 function setup(){if(reduce.matches){ledger.removeAttribute('data-roll-ready');return;}if(!track.querySelector('.income-scroll-copy')){const copy=source.cloneNode(true);copy.className='income-scroll-copy';copy.setAttribute('aria-hidden','true');track.appendChild(copy);}ledger.setAttribute('data-roll-ready','');ledger.classList.add('is-running');}
 reduce.addEventListener('change',setup);setup();
})();