(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const ai=document.querySelector('.ai-browser'),chat=document.querySelector('.kakao-chat');
 if(reduced.matches||!('IntersectionObserver' in window))return;
 const pending=new Set(); const later=(fn,ms)=>{const id=setTimeout(()=>{pending.delete(id);fn();},ms);pending.add(id);};
 const input=ai?.querySelector('.ai-prompt'),prompt=input?.dataset.prompt||'';
 const restore=()=>{pending.forEach(clearTimeout);pending.clear();if(ai){ai.removeAttribute('data-ai-stage');input.textContent=prompt;}if(chat){chat.removeAttribute('data-chat-ready');chat.removeAttribute('data-chat-play');}};
 if(ai){ai.dataset.aiStage='waiting';input.textContent='';}
 if(chat)chat.dataset.chatReady='';
 const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;observer.unobserve(entry.target);
  if(entry.target===chat){chat.dataset.chatPlay='';}
  if(entry.target===ai){ai.dataset.aiStage='typing';const chars=Array.from(prompt);let i=0;const type=()=>{if(reduced.matches)return;input.textContent=chars.slice(0,++i).join('');if(i<chars.length)later(type,28);else{ai.dataset.aiStage='thinking';later(()=>{ai.dataset.aiStage='done';},550);}};later(type,200);}
 }},{threshold:.16});
 if(ai)observer.observe(ai);if(chat)observer.observe(chat);
 reduced.addEventListener('change',()=>{if(reduced.matches){observer.disconnect();restore();}});
})();