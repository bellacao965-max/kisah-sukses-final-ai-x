
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('mode');
  if(toggle){
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
    });
  }

  const send = document.getElementById('send');
  const inp = document.getElementById('msg');
  const box = document.getElementById('chatbox');

  function append(who, text){
    const d=document.createElement('div');
    d.innerHTML='<b>'+who+':</b> '+text;
    box.appendChild(d);
    box.scrollTop=box.scrollHeight;
  }

  if(send){
    send.addEventListener('click', ()=>{
      const text=inp.value.trim();
      if(!text) return;
      append('Anda', text);
      inp.value='';
      const typing=document.getElementById('typingIndicator');
      typing.style.display='block';
      setTimeout(()=>{
        typing.style.display='none';
        append('AI', 'Ini jawaban realtime untuk: '+text);
      },1500);
    });
  }

  const ginput=document.getElementById('gsearch');
  const sbox=document.getElementById('suggest-box');
  if(ginput){
    const fake=["cara sukses","cara bisnis online","peluang usaha baru","cara cepat kaya","inspirasi harian","mentor bisnis lokal"];
    ginput.addEventListener('input',()=>{
      const val=ginput.value.toLowerCase();
      if(!val){ sbox.style.display='none'; return; }
      const m=fake.filter(x=>x.includes(val));
      if(!m.length){ sbox.style.display='none'; return; }
      sbox.innerHTML=m.map(x=>`<li class='suggest-item'>${x}</li>`).join('');
      sbox.style.display='block';
      document.querySelectorAll('.suggest-item').forEach(it=>{
        it.onclick=()=>{ ginput.value=it.innerText; sbox.style.display='none'; };
      });
    });
  }
});
