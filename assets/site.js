// 공통 동작: 고정 메뉴, 등장 애니메이션, 포트폴리오 필터, 확대 보기, 로컬 문의 미리보기(전송 없음)
(function(){
  const nav=document.querySelector('.nav');
  const onScroll=()=>nav&&nav.classList.toggle('solid',scrollY>40);
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.rv').forEach(el=>io.observe(el));

  document.querySelectorAll('.filters button').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('on'));b.classList.add('on');
    const f=b.dataset.f;document.querySelectorAll('.grid .card').forEach(c=>c.classList.toggle('hide',f!=='all'&&c.dataset.cat!==f));
  }));

  const lb=document.querySelector('.lb');
  if(lb){const li=lb.querySelector('img');
    document.querySelectorAll('.card').forEach(c=>c.addEventListener('click',()=>{li.src=c.querySelector('img').src;li.alt=c.querySelector('img').alt;lb.classList.add('on')}));
    lb.addEventListener('click',()=>lb.classList.remove('on'));
    addEventListener('keydown',e=>e.key==='Escape'&&lb.classList.remove('on'));}

  // 문의 폼: 외부 전송 없이 입력 내용 확인만 표시
  document.querySelectorAll('form[data-local]').forEach(form=>form.addEventListener('submit',e=>{
    e.preventDefault();const fd=new FormData(form);const lines=[];
    for(const [k,v] of fd.entries()){if(String(v).trim())lines.push(k+': '+v)}
    const p=form.querySelector('.preview');
    p.textContent='[로컬 미리보기 · 전송되지 않았습니다]\n'+(lines.join('\n')||'입력 내용 없음')+'\n\n※ 실제 접수 채널(이메일·카카오 채널 등)은 운영자 확인 후 연결 예정';
    p.style.display='block';
  }));
})();
