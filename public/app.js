/* THROUGH MY EYES — personal content lives in this file. */
const CONTENT = {
  name: "Muhammad",
  nickname: "monkie wonkie",
  reasons: [
    "I love how passionately you talk about the things you care about.",
    "I love that there is so much more to you than you show everyone.",
    "I love your little reactions, even the ones you probably don't notice.",
    "I love seeing you excited about something. Your whole energy changes.",
    "I love that I get to know the person behind the things everyone else sees.",
    "I admire how much you want to achieve, even when the road gets difficult.",
    "I love your silly side. Please never retire it.",
    "I love that you are your own person, with your own thoughts and dreams.",
    "I love the little moments with you that probably look ordinary to everyone else.",
    "I love you on the easy days, and I care about you on the difficult ones too.",
    "I love how you can make me smile without even trying.",
    "I love that I get to call you my person."
  ],
  mirror: [
    ["Your ambition", "I see someone with dreams worth taking seriously. I hope you never talk yourself out of what you're capable of."],
    ["Your heart", "I see the parts of you that care, even when you don't make a big announcement about them."],
    ["Your mind", "I love the way you think, the things you get curious about, and how your mind works."],
    ["Your imperfect bits", "You don't have to be polished every second. You are allowed to be human with me."],
    ["Your little habits", "Some of the smallest things you do are the things that stay with me the longest."],
    ["The whole you", "I don't need an edited version of you. I want to keep getting to know the real one."]
  ],
  observations: [
    ["Your excitement", "I notice how your energy changes when you talk about something you genuinely love."],
    ["Your focus", "I notice how invested you get when something matters to you."],
    ["Your humour", "I notice the little ways you try to make things lighter."],
    ["Your quiet moments", "I know there are things you keep to yourself. You don't have to explain every silence."],
    ["Your dreams", "I notice the future you're trying to build, even when you're still figuring out the steps."],
    ["Your ordinary days", "I don't need every moment with you to be extraordinary. I like the ordinary ones too."]
  ],
  wishes: [
    ["A little more peace", "I hope life is gentle with you, especially on the days you are hard on yourself."],
    ["Big wins", "I hope you get to experience the kind of success that makes all your effort feel worth it."],
    ["New places", "I hope we get to collect stories in places neither of us has seen before."],
    ["Uncomplicated happiness", "I hope you have days where nothing is wrong and you can simply enjoy being alive."],
    ["Confidence", "I hope you see your own potential as clearly as I wish you could."],
    ["A life you love", "More than anything, I hope you build a life that feels like yours."]
  ],
  future: [
    ["Slow mornings", "No big plan. Just a sleepy morning, something nice to eat, and nowhere urgent to be."],
    ["Your victories", "I want to celebrate the things you work so hard for, including the little wins nobody else sees."],
    ["Unplanned adventures", "A wrong turn, a new place, a ridiculous story we keep retelling."],
    ["Your favourite things", "I want to keep learning the things that make you light up, even if I ask a hundred questions."],
    ["Growing up, together", "I hope we keep becoming better versions of ourselves while making room for each other."]
  ],
  emergency: {
    hug: ["HUG REQUEST RECEIVED", "Imagine me wrapping my arms around you and holding on for a little longer. No fixing, no explaining. Just a hug. ♡"],
    day: ["TODAY DOESN'T GET TO DEFINE YOU", "You made it through today. That counts. You don't have to turn every hard day into a lesson. Rest a little, monkie wonkie."],
    miss: ["DISTANCE IS BEING RUDE", "If I could, I'd steal a little time with you right now. Until then, consider this your reminder that you're very much on my mind."],
    insecure: ["A GENTLE REMINDER", "You are not difficult to love because you have imperfect days. You don't have to earn kindness by being okay all the time."],
    laugh: ["URGENT SILLY BUSINESS", "Official report: one (1) monkie wonkie has been found being ridiculously adorable. Investigation ongoing. No further action required."],
    proud: ["I AM SO PROUD OF YOU", "I hope you pause sometimes and recognise how far you've come. I see the effort, not just the outcome."]
  },
  finalLetter: "Muhammad,\n\nI don't think I can fit everything I feel into one little app, but I wanted to try.\n\nI hope you know that I notice you. Not just the big things, not just the achievements or the moments when everything is going right. I notice the little things too: the way you get excited, the things you care about, the sides of you that come out when you're comfortable, and all the small details that make you you.\n\nI know neither of us is perfect. We have our own feelings, our own difficult days, and things we're still learning. But I don't want you to mistake a difficult moment for a lack of love. I want to keep learning how to love you better, and I want you to feel appreciated for the person you already are.\n\nI am proud of you. I believe in you. I adore your silly side. I want good things for you, even the things you haven't figured out how to ask for yet.\n\nAnd if you ever forget how special you are to me, come back here. I'll keep finding new ways to remind you.\n\nLove,\nfrom your pingu ♡"
};
const portals = [
  ["mirror","01","The Mirror Room","A little look at yourself through my eyes.","◉"],
  ["machine","02","The Love Machine","Pull the lever. Collect unreasonable affection.","✧"],
  ["garden","03","The Garden","Every little flower is something I adore.","❀"],
  ["stars","04","The Constellation Room","A few wishes I would put in the sky for you.","✦"],
  ["arcade","05","The Appreciation Arcade","A tiny arcade. Your only job is to be loved.","▣"],
  ["emergency","06","Emergency Love Department","For hugs, hard days and emergency silliness.","♡"],
  ["radio","07","Your Personal Radio","A station that exists for one listener.","♫"],
  ["observations","08","Things You Don't Notice","Little things about you that I notice.","⌕"],
  ["future","09","A Message From Our Future","A few lovely possibilities I'd like to imagine.","⌂"],
  ["universe","10","The Two-Person Universe","Two little worlds, making something of their own.","☼"],
  ["final","11","The Final Room","Everything I couldn't fit into the other rooms.","∞"]
];
const $ = s => document.querySelector(s);
const app = $("#app"), intro = $("#intro"), room = $("#room"), home = $("#home");
let discovered = JSON.parse(localStorage.getItem("tme-discovered") || "[]");
let soundOn = false, audioCtx = null, arcadeScore = 0, quizIndex = 0, quizScore = 0;
const quiz = [
  ["Which thing do I find especially adorable?",["Your excited side","Your serious meeting face","Your ability to disappear"],0],
  ["What do I want you to remember on a hard day?",["You must fix everything","You are loved even when life is messy","You should never rest"],1],
  ["What is this whole app trying to say?",["Please do my chores","I see you, appreciate you and adore you","You owe me a website"],1]
];
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2400)}
function chirp(freq=520){if(!soundOn)return;try{audioCtx=audioCtx||new(window.AudioContext||window.webkitAudioContext)();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.connect(g);g.connect(audioCtx.destination);o.frequency.value=freq;g.gain.setValueAtTime(.045,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+.16);o.start();o.stop(audioCtx.currentTime+.17)}catch(e){}}
function save(){localStorage.setItem("tme-discovered",JSON.stringify(discovered));$("#progressText").textContent=discovered.length+" / 11 DISCOVERED";document.querySelectorAll(".portal").forEach(p=>p.classList.toggle("done",discovered.includes(p.dataset.id)))}
function showHome(){room.classList.remove("active");home.classList.add("active");window.scrollTo({top:0,behavior:"smooth"})}
function enterRoom(id){if(!discovered.includes(id)){discovered.push(id);save()}home.classList.remove("active");room.classList.add("active");renderRoom(id);window.scrollTo({top:0,behavior:"smooth"});chirp(620)}
function header(kicker,title,desc){return '<div class="room-head"><p class="eyebrow">'+kicker+'</p><h2>'+title+'</h2><p>'+desc+'</p></div>'}
function panel(content){return '<div class="room-body"><div class="feature-panel">'+content+'</div></div>'}
function renderRoom(id){
 const titles={
 mirror:["A DIFFERENT REFLECTION","If you could see yourself through my eyes","Pick a little detail. I'll tell you what I see."],
 machine:["A VERY IMPORTANT MACHINE","The Love Machine","One pull. One reason. An entirely unreasonable amount of affection."],
 garden:["A GROWING COLLECTION","The Garden of Everything I Love","Tap a flower and let it bloom."],
 stars:["A SKY FULL OF WISHES","If I could give you the stars","Every star is something I hope life gives you."],
 arcade:["INSERT ONE BOYFRIEND","The Appreciation Arcade","A few tiny games. An absolutely biased scoring system."],
 emergency:["OPEN ALL HOURS","Emergency Love Department","Select the kind of support your very important self requires."],
 radio:["ON AIR: JUST FOR YOU","Your Personal Radio","Tune in. Your monkie wonkie has a few things to say."],
 observations:["THE LITTLE DETAILS","Things You Don't Notice","I notice more than you think, you know."],
 future:["NOT A PROMISE. A POSSIBILITY.","A Message From Our Future","Little scenes I hope we get to experience."],
 universe:["TWO LITTLE WORLDS","The Two-Person Universe","Move the lights. Watch what happens when two worlds meet."],
 final:["A NOTE FROM ME TO YOU","Everything I Couldn't Fit Into Words","No game, no unlock code. Just me, talking to you."]
 };
 const [k,t,d]=titles[id];let html=header(k,t,d);
 if(id==="mirror")html+=panel('<div class="mirror"><span>What do you see<br>when you look at yourself?</span></div><div class="action-row">'+CONTENT.mirror.map((x,i)=>'<button class="small-btn mirror-btn" data-i="'+i+'">'+x[0]+'</button>').join("")+'</div><div id="mirrorReveal" class="reveal-card">Choose a reflection above. ♡</div>');
 if(id==="machine")html+=panel('<div class="machine"><p class="eyebrow">MONKIE WONKIE INDUSTRIES™</p><div class="machine-screen" id="machineScreen">READY TO DISPENSE AFFECTION</div><div class="lever"><button id="pullLever" class="primary-btn">PULL FOR AFFECTION ↻</button></div><p style="font-size:10px;color:#bd9aa4">Warning: may cause smiling at your screen.</p></div><div class="action-row"><button id="machineAgain" class="small-btn secondary">One more, please</button></div>');
 if(id==="garden")html+=panel('<p style="text-align:center">A small garden, with a few things I hope you never overlook.</p><div class="flower-grid">'+CONTENT.reasons.slice(0,8).map((x,i)=>'<button class="flower" data-i="'+i+'">✿<small>Flower '+(i+1)+'</small></button>').join("")+'</div><div id="flowerReveal" class="reveal-card">Your garden is waiting for you. ♡</div><p id="flowerCount" class="score" style="text-align:center">0 / 8 BLOOMS DISCOVERED</p>');
 if(id==="stars")html+=panel('<div class="star-map" id="starMap">'+CONTENT.wishes.map((x,i)=>'<button class="star" style="left:'+([12,28,45,64,82,54][i])+'%;top:'+([18,62,25,48,17,77][i])+'%" data-i="'+i+'" aria-label="'+x[0]+'">✦</button>').join("")+'</div><div id="starReveal" class="reveal-card">Tap a star to discover a wish. ✧</div><p class="score" style="text-align:center">A SKY MADE OF GOOD THINGS FOR YOU</p>');
 if(id==="arcade")html+=panel('<div class="game-area"><p class="eyebrow">GAME 01 / CATCH THE COMPLIMENTS</p><h3 id="gamePrompt">Collect the good things, Muhammad.</h3><p id="gameHint">Tap each compliment to collect it. Your score is scientifically biased in your favour.</p><div id="gameItems">'+["ridiculously adorable","very loved","secretly impressive","my favourite human"].map(x=>'<button class="catch-item">'+x+'</button>').join("")+'</div><p class="score" id="gameScore">AFFECTION COLLECTED: 0</p></div><div class="action-row"><button id="restartGame" class="small-btn">Play again</button><button id="quizStart" class="small-btn secondary">Try the little quiz</button></div><div id="quizArea"></div>');
 if(id==="emergency")html+=panel('<div class="emergency-grid"><button class="small-btn" data-emergency="hug">♡<br>I NEED A HUG</button><button class="small-btn" data-emergency="day">☾<br>HARD DAY</button><button class="small-btn" data-emergency="miss">✉<br>I MISS YOU</button><button class="small-btn" data-emergency="insecure">✧<br>FEELING INSECURE</button><button class="small-btn" data-emergency="laugh">☻<br>MAKE ME LAUGH</button><button class="small-btn" data-emergency="proud">★<br>BE PROUD OF ME</button></div><div id="emergencyReveal" class="reveal-card">Choose what you need. This department is always open. ♡</div>');
 if(id==="radio")html+=panel('<div class="radio-dial"><span id="radioFreq">101.1</span></div><div class="action-row">'+["101.1","102.5","103.7","104.9"].map((x,i)=>'<button class="small-btn radio-btn" data-i="'+i+'">'+x+'</button>').join("")+'</div><div id="radioReveal" class="reveal-card">Your personal frequency is ready.</div><div class="action-row"><button id="voiceBtn" class="small-btn secondary">Add your voice note later ♫</button></div><p style="font-size:11px;text-align:center;color:#987d85">Voice recordings can be added in the personal content file before sharing.</p>');
 if(id==="observations")html+=panel('<div class="observation-list">'+CONTENT.observations.map((x,i)=>'<button class="observation" data-i="'+i+'"><strong>'+x[0]+'</strong><span>Open this little observation ↗</span></button>').join("")+'</div><div id="observationReveal" class="reveal-card">Pick one. I have been paying attention. ♡</div>');
 if(id==="future")html+=panel('<div class="door-grid">'+CONTENT.future.map((x,i)=>'<button class="door" data-i="'+i+'">✧<br>'+x[0]+'</button>').join("")+'</div><div id="futureReveal" class="reveal-card">A few doors to possible tomorrows. Choose one.</div>');
 if(id==="universe")html+=panel('<p style="text-align:center">Drag either glowing light around. Bring them close, move them apart. Both keep their own light.</p><div class="two-world" id="twoWorld"><div class="orb one" id="orbOne"></div><div class="orb two" id="orbTwo"></div></div><div id="universeReveal" class="reveal-card">Two different people. Two separate worlds. Something lovely in between.</div><div class="orb-controls"><button class="small-btn" id="bringTogether">Bring our worlds closer</button><button class="small-btn secondary" id="resetOrbs">Let them wander</button></div>');
 if(id==="final")html+=panel('<p class="eyebrow" style="text-align:center">TO MUHAMMAD, FROM YOUR PINGU</p><div class="final-letter">'+CONTENT.finalLetter.replace(/&/g,"&amp;").replace(/</g,"&lt;")+'</div><div class="action-row"><button id="finalHeart" class="primary-btn">Send a little love back ♡</button></div>');
 $("#roomContent").innerHTML=html;bindRoom(id);
}
function bindRoom(id){
 const on=(sel,fn)=>document.querySelectorAll(sel).forEach(el=>el.addEventListener("click",fn));
 if(id==="mirror")on(".mirror-btn",e=>{const x=CONTENT.mirror[+e.currentTarget.dataset.i];$("#mirrorReveal").textContent=x[1];chirp(570)});
 if(id==="machine"){let last=-1;const pull=()=>{let n;do{n=Math.floor(Math.random()*CONTENT.reasons.length)}while(n===last&&CONTENT.reasons.length>1);last=n;$("#machineScreen").textContent=CONTENT.reasons[n];$("#machineScreen").animate([{transform:"scale(.96)",opacity:.5},{transform:"scale(1)",opacity:1}],{duration:300});chirp(720)};$("#pullLever").onclick=pull;$("#machineAgain").onclick=pull}
 if(id==="garden"){let count=0;on(".flower",e=>{const i=+e.currentTarget.dataset.i;$("#flowerReveal").textContent=CONTENT.reasons[i];e.currentTarget.textContent="✿";e.currentTarget.style.background="#542238";e.currentTarget.disabled=true;count++;$("#flowerCount").textContent=count+" / 8 BLOOMS DISCOVERED";chirp(650)})}
 if(id==="stars")on(".star",e=>{$("#starReveal").textContent=CONTENT.wishes[+e.currentTarget.dataset.i][0]+": "+CONTENT.wishes[+e.currentTarget.dataset.i][1];e.currentTarget.style.color="#fff";chirp(800)});
 if(id==="arcade"){const start=()=>{arcadeScore=0;$("#gameScore").textContent="AFFECTION COLLECTED: 0";$("#gameItems").innerHTML=["ridiculously adorable","very loved","secretly impressive","my favourite human","certified dream-chaser","monkie wonkie energy"].sort(()=>Math.random()-.5).map(x=>'<button class="catch-item">'+x+'</button>').join("");document.querySelectorAll(".catch-item").forEach(b=>b.onclick=()=>{if(b.disabled)return;b.disabled=true;b.style.opacity=".35";arcadeScore++;$("#gameScore").textContent="AFFECTION COLLECTED: "+arcadeScore;chirp(600+arcadeScore*30);if(arcadeScore===6)$("#gameHint").textContent="Perfect score. Not that there was ever any doubt. ♡"})};$("#restartGame").onclick=start;start();$("#quizStart").onclick=()=>{quizIndex=0;quizScore=0;showQuiz()}}
 if(id==="emergency")on("[data-emergency]",e=>{const x=CONTENT.emergency[e.currentTarget.dataset.emergency];$("#emergencyReveal").innerHTML='<strong style="display:block;color:var(--rose);font:11px var(--sans);letter-spacing:1.5px;margin-bottom:12px">'+x[0]+'</strong>'+x[1];chirp(510)});
 if(id==="radio")on(".radio-btn",e=>{const i=+e.currentTarget.dataset.i;const x=[["101.1","A little reminder: I adore you. Even when you're doing absolutely nothing interesting. Especially then."],["102.5","This is your reminder that you are capable of more than you give yourself credit for. Keep going, love."],["103.7","Today's broadcast: your monkie wonkie thinks you're ridiculously cute. This report is unbiased. Obviously."],["104.9","Imagine my voice saying this: I love you, Muhammad. I hope you never feel like you have to wonder. ♡"]][i];$("#radioFreq").textContent=x[0];$("#radioReveal").textContent=x[1];chirp(430+i*100)});
 if(id==="radio")$("#voiceBtn").onclick=()=>{const input=document.createElement("input");input.type="file";input.accept="audio/*";input.onchange=()=>{const file=input.files&&input.files[0];if(!file)return;const url=URL.createObjectURL(file);$("#radioReveal").innerHTML="Your voice note is ready. Press play whenever you want to hear it. ♡<br><audio controls style='display:block;width:100%;margin-top:14px'></audio>";$("#radioReveal").querySelector("audio").src=url;$("#voiceBtn").textContent="Change voice note ♫"};input.click()};
 if(id==="observations")on(".observation",e=>{$("#observationReveal").textContent=CONTENT.observations[+e.currentTarget.dataset.i][1];chirp(550)});
 if(id==="future")on(".door",e=>{$("#futureReveal").textContent=CONTENT.future[+e.currentTarget.dataset.i][1];chirp(560)});
 if(id==="universe"){const a=$("#orbOne"),b=$("#orbTwo"),world=$("#twoWorld");[a,b].forEach(el=>{let drag=false;el.addEventListener("pointerdown",e=>{drag=true;el.setPointerCapture(e.pointerId)});el.addEventListener("pointerup",()=>drag=false);el.addEventListener("pointermove",e=>{if(!drag)return;const r=world.getBoundingClientRect();el.style.left=Math.max(0,Math.min(85,(e.clientX-r.left-30)/r.width*100))+"%";el.style.top=Math.max(0,Math.min(75,(e.clientY-r.top-30)/r.height*100))+"%";const ax=a.offsetLeft, bx=b.offsetLeft;$("#universeReveal").textContent=Math.abs(ax-bx)<90?"Look at that. Two little worlds finding their own orbit. ♡":"Still glowing. Still themselves. Still connected by choice."})});$("#bringTogether").onclick=()=>{a.style.left="37%";b.style.left="53%";a.style.top=b.style.top="40%";$("#universeReveal").textContent="Two different people. Two separate worlds. And somehow, we found something beautiful in between.";chirp(700)};$("#resetOrbs").onclick=()=>{a.style.left="23%";b.style.left="68%";a.style.top=b.style.top="40%";$("#universeReveal").textContent="Both keep their own light. ♡"}}
 if(id==="final")$("#finalHeart").onclick=()=>{toast("A little love sent back to you, Muhammad. ♡");chirp(880);$("#finalHeart").textContent="♡ love received ♡"}
}
function showQuiz(){const q=quiz[quizIndex];$("#quizArea").innerHTML='<div class="feature-panel" style="margin-top:18px"><p class="eyebrow">LITTLE QUIZ / '+(quizIndex+1)+' OF '+quiz.length+'</p><h3>'+q[0]+'</h3><div class="action-row">'+q[1].map((x,i)=>'<button class="small-btn quiz-answer" data-i="'+i+'">'+x+'</button>').join("")+'</div></div>';document.querySelectorAll(".quiz-answer").forEach(b=>b.onclick=()=>{if(+b.dataset.i===q[2])quizScore++;quizIndex++;if(quizIndex<quiz.length)showQuiz();else $("#quizArea").innerHTML='<div class="reveal-card">'+(quizScore===3?"Full marks. You know what your monkie wonkie is trying to say. ♡":"Quiz complete. Trick question: the correct answer is that you're loved.")+'</div>'})}
function buildPortals(){$("#portalGrid").innerHTML=portals.map(p=>'<button class="portal" data-id="'+p[0]+'"><span class="portal-arrow">↗</span><span class="portal-icon">'+p[4]+'</span><h3>'+p[2]+'</h3><p>'+p[3]+'</p></button>').join("");onPortals()}
function onPortals(){document.querySelectorAll(".portal").forEach(p=>p.addEventListener("click",()=>enterRoom(p.dataset.id)))}
$("#enterBtn").onclick=()=>{intro.classList.add("hidden");app.classList.remove("hidden");save();chirp(620)};
$("#homeBtn").onclick=e=>{e.preventDefault();showHome()};
document.addEventListener("click",e=>{if(e.target.matches("[data-home]"))showHome()});
$("#soundBtn").onclick=()=>{soundOn=!soundOn;$("#soundBtn").textContent=soundOn?"♫":"♪";toast(soundOn?"Tiny sounds enabled":"Sound muted");chirp(650)};
$("#resetBtn").onclick=()=>{if(confirm("Start the discovery journey again? Your progress on this device will reset.")){discovered=[];save();toast("Your little universe is ready to explore again.")}};
buildPortals();save();