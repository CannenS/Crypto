const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
const p = document.querySelector(".p");
const cryptoBox = document.querySelector(".crypto-box");
const nav = document.querySelector(".nav");
const card = document.querySelector(".crypto-card");

const fetchCrypto = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const data1 = data.slice(0, 5);
    const list = data
      .map((item) => {
        const {
          symbol,
          current_price,
          image,
          high_24h,
          low_24h,
          price_change_24h,
        } = item;
        let priceChange3 = [...price_change_24h.toString()];
        if (priceChange3.length > 7) {
          priceChange3.length = 7;
        }
        return `<div class="crypto-card">
            <div class="head-div"><h2 class="crypto-title">${symbol}</h2><img src="${image}" class="crypto-image"></div>
            <div class="crypto-info">
            <p class="crypto-price">Current Price - <span class="current-price">${current_price}</span> </p>
            <p class="crypto-price">24 Hour High - <span class=
            "price-span">${high_24h}</span></p>
            <p class="crypto-price">24 Hour Low - <span class=
            "bad-span">$${low_24h}</span></p>
            <p class="crypto-price">24 Hour Change - <span>${priceChange3.join(
              ""
            )}</span></p>
            </div>
        </div>`;
      })
      .join("");
    cryptoBox.innerHTML = list;
    if (nav.children.length > 1) {
      nav.lastElementChild.remove();
    }

    const cards = await [...document.querySelectorAll(".crypto-card")];
    const currentPrice = [...document.querySelectorAll(".current-price")];

    cards.forEach((card) => {
      let newPrice =
        card.lastElementChild.lastElementChild.firstChild.nextSibling
          .textContent;
      let currentPrice2 =
        card.lastElementChild.firstElementChild.firstElementChild;
      let currentChange =
        card.lastElementChild.lastElementChild.firstElementChild;
      let priceChange =
        card.lastElementChild.lastElementChild.firstElementChild.textContent;
      card.addEventListener("click", () => {
        card.classList.toggle("big");
      });
      let priceChange2 = [...priceChange];

      if (newPrice.includes("-")) {
        currentPrice2.classList.add("bad-span");
        currentChange.classList.add("bad-span");
      } else {
        currentPrice2.classList.add("price-span");
        currentChange.classList.add("price-span");
      }
    });
  } catch (error) {
    console.log(error);
    if (nav.children.length > 1) {
      nav.lastElementChild.remove();
      const div = document.createElement("div");
      div.classList.add("offline");
      div.innerHTML = `<h2>OFFLINE :(</h2>`;
      nav.append(div);
    } else {
      const div = document.createElement("div");
      div.classList.add("offline");
      div.innerHTML = `<h2>OFFLINE</h2>`;
      nav.append(div);
    }
  }
};

fetchCrypto();

setInterval(fetchCrypto, 10000);
