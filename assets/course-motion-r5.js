(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function setMotionPreference(){document.querySelectorAll('.inbox-scroll[data-static-src]').forEach(img=>{if(!img.dataset.animatedSrc)img.dataset.animatedSrc=img.getAttribute('src');img.src=reduced.matches?img.dataset.staticSrc:img.dataset.animatedSrc;});}
 setMotionPreference();reduced.addEventListener('change',setMotionPreference);
 if(reduced.matches||!('IntersectionObserver'in window))return;
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');if(e.target.matches('.editor-result b'))e.target.classList.add('typing-active');observer.unobserve(e.target);}}),{threshold:.22});
 document.querySelectorAll('.flow-3d .flow-tile,.plan.featured .plan-ribbon').forEach((el,i)=>{el.classList.add('motion-reveal');el.style.animationDelay=(i%3)*90+'ms';observer.observe(el);});
 document.querySelectorAll('.hero-motion,.proof-scene h2,.arrows,.proof-scene .evidence,.marker-emphasis,.daily-grid,.income-ledger,.challenge-together').forEach(el=>observer.observe(el));
 document.querySelectorAll('.daily-grid>span').forEach((el,i)=>el.style.setProperty('--day-delay',i*35+'ms'));
 const output=document.querySelector('.editor-result b');
 if(output){const walker=document.createTreeWalker(output,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);let n=0;for(const node of nodes){const fragment=document.createDocumentFragment();for(const character of Array.from(node.textContent)){const span=document.createElement('span');span.className='type-char';span.style.setProperty('--type-delay',(n++*55)+'ms');span.textContent=character;fragment.appendChild(span);}node.replaceWith(fragment);}observer.observe(output);}
})();