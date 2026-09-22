const prices = {
  base: 990,
  profile: 200,
  corner: 50,
  spot: 750,
  chandelier: 1200,
  niche: 1300,
  flexy: 5000,
  euro: 1600,
  shadow: 500,
  line: 4000,
  led: 350,
  power: 2000
};

const items = [
  ["corners", "Углы", "шт.", 4, 1],
  ["spots", "Светильники", "шт.", 0, 1],
  ["chandeliers", "Люстры", "шт.", 0, 1],
  ["niche", "Простая ниша из алюминиевого профиля", "м", 0, 0.1],
  ["flexy", "Встроенный карниз Flexy 2/05", "м", 0, 0.1],
  ["euro", "Теневой профиль Eurokraab", "м", 0, 0.1],
  ["shadow", "Обработка углов теневого профиля", "шт.", 0, 1],
  ["lines", "Световые линии", "м", 0, 0.1],
  ["led", "Светодиодная лента", "м", 0, 0.1],
  ["power", "Блок питания", "шт.", 0, 1]
];

const priceFor = {
  corners: prices.corner,
  spots: prices.spot,
  chandeliers: prices.chandelier,
  niche: prices.niche,
  flexy: prices.flexy,
  euro: prices.euro,
  shadow: prices.shadow,
  lines: prices.line,
  led: prices.led,
  power: prices.power
};

function getValue(id) {
  const element = document.getElementById(id);
  if (!element) return 0;

  const value = parseFloat(element.value);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function rubles(value) {
  return Math.round(value).toLocaleString("ru-RU") + " ₽";
}

function calculate() {
  const length = getValue("length");
  const width = getValue("width");
  const perimeter = getValue("perimeter");

  const area = (length * width) / 10000;

  const base = area * prices.base;
  const profile = perimeter * prices.profile;

  let extra = 0;

  items.forEach(([id]) => {
    extra += getValue(id) * priceFor[id];
  });

  document.getElementById("area").textContent =
    area.toFixed(2) + " м²";

  document.getElementById("base").textContent =
    rubles(base);

  document.getElementById("profile").textContent =
    rubles(profile);

  document.getElementById("extra").textContent =
    rubles(extra);

  document.getElementById("total").textContent =
    rubles(base + profile + extra);
}

function render() {
  const app = document.getElementById("app");

  if (!app) {
    document.body.innerHTML =
      "<h2 style='padding:20px'>Ошибка: элемент #app не найден</h2>";
    return;
  }

  app.innerHTML = `
    <section class="page">
      <div class="card">

        <h1>Натяжные потолки</h1>
        <p class="sub">Предварительный расчёт стоимости</p>

        <h2>Размер помещения</h2>

        <div class="grid">
          <label>
            Длина, см
            <input id="length" type="number" min="0" step="1" value="400">
          </label>

          <label>
            Ширина, см
            <input id="width" type="number" min="0" step="1" value="400">
          </label>
        </div>

        <label>
          Периметр, м
          <input id="perimeter" type="number" min="0" step="0.01" value="16">
        </label>

        <h2>Дополнительные работы</h2>

        ${items.map(([id, name, unit, defaultValue, step]) => `
          <div class="row">
            <div>
              <b>${name}</b>
              <small>
                ${priceFor[id].toLocaleString("ru-RU")} ₽ / ${unit}
              </small>
            </div>

            <input
              id="${id}"
              type="number"
              min="0"
              step="${step}"
              value="${defaultValue}"
            >
          </div>
        `).join("")}

        <button id="calc">
          РАССЧИТАТЬ СТОИМОСТЬ
        </button>

        <div class="result">

          <small>ИТОГО</small>

          <strong id="total">0 ₽</strong>

          <div class="r">
            <span>Площадь</span>
            <b id="area">0 м²</b>
          </div>

          <div class="r">
            <span>Полотно + монтаж</span>
            <b id="base">0 ₽</b>
          </div>

          <div class="r">
            <span>Профиль + вставка</span>
            <b id="profile">0 ₽</b>
          </div>

          <div class="r">
            <span>Дополнительно</span>
            <b id="extra">0 ₽</b>
          </div>

        </div>

        <p class="note">
          Расчёт предварительный. Окончательная стоимость
          уточняется после замера.
        </p>

      </div>
    </section>
  `;

  document
    .getElementById("calc")
    .addEventListener("click", calculate);

  calculate();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", render);
} else {
  render();
}
