const prices={base:990,profile:200,corner:50,spot:750,chandelier:1200,niche:1300,flexy:5000,euro:1600,shadow:500,line:4000,led:350,power:2000};
const items=[["corners","Углы","шт.",4,1],["spots","Светильники","шт.",0,1],["chandeliers","Люстры","шт.",0,1],["niche","Простая ниша из алюминиевого профиля","м",0,.1],["flexy","Встроенный карниз Flexy 2/05","м",0,.1],["euro","Теневой профиль Eurokraab","м",0,.1],["shadow","Обработка углов теневого профиля","шт.",0,1],["lines","Световые линии","м",0,.1],["led","Светодиодная лента","м",0,.1],["power","Блок питания","шт.",0,1]];
const priceFor={corners:prices.corner,spots:prices.spot,chandeliers:prices.chandelier,niche:prices.niche,flexy:prices.flexy,euro:prices.euro,shadow:prices.shadow,line:prices.line,led:prices.led,power:prices.power};
function val(id){const x=parseFloat(document.getElementById(id).value);return Number.isFinite(x)&&x>0?x:0}
function rub(x){return Math.round(x).toLocaleString("ru-RU")+" ₽"}
function calc(){
 const area=val("length")*val("width")/10000, per=val("perimeter");
 const base=area*prices.base, profile=per*prices.profile;
 let extra=0;
 items.forEach(([id])=>extra+=val(id)*priceFor[id]);
 document.getElementById("area").textContent=area.toFixed(2)+" м²";
 document.getElementById("base").textContent=rub(base);
 document.getElementById("profile").textContent=rub(profile);
 document.getElementById("extra").textContent=rub(extra);
 document.getElementById("total").textContent=rub(base+profile+extra);
}
document.getElementById("app").innerHTML=`<section class="page"><div class="card">
<h1>Натяжные потолки</h1><p class="sub">Предварительный расчёт стоимости</p>
<h2>Размер помещения</h2>
<div class="grid"><label>Длина, см<input id="length" type="number" min="0" step="1" value="400"></label><label>Ширина, см<input id="width" type="number" min="0" step="1" value="400"></label></div>
<label>Периметр, м<input id="perimeter" type="number" min="0" step="0.01" value="16"></label>
<h2>Дополнительные работы</h2>
${items.map(([id,name,unit,def,step])=>`<div class="row"><div><b>${name}</b><small>${priceFor[id].toLocaleString("ru-RU")} ₽ / ${unit}</small></div><input id="${id}" type="number" min="0" step="${step}" value="${def}"></div>`).join("")}
<button id="calc">РАССЧИТАТЬ СТОИМОСТЬ</button>
<div class="result"><small>ИТОГО</small><strong id="total">0 ₽</strong><div class="r"><span>Площадь</span><b id="area">0 м²</b></div><div class="r"><span>Полотно + монтаж</span><b id="base">0 ₽</b></div><div class="r"><span>Профиль + вставка</span><b id="profile">0 ₽</b></div><div class="r"><span>Дополнительно</span><b id="extra">0 ₽</b></div></div>
<p class="note">Расчёт предварительный. Окончательная стоимость уточняется после замера.</p>
</div></section>`;
document.getElementById("calc").addEventListener("click",calc);
calc();
if(window.vkBridge)vkBridge.send("VKWebAppInit").catch(()=>{});