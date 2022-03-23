"use strict";
//change order.......................

const orderChange = document.querySelector(".button");
orderChange.addEventListener("click", function () {
  document.getElementById("outer-div").classList.toggle("outer");
});

// function for std representation of rupess

const represent = function (x) {
  const y = x + "";
  const arr = [...y];
  arr.reverse();
  let e = "";
  arr.forEach(function (val, i) {
    if ((i + 1) % 3 == 0 && i + 1 != arr.length) {
      e += val;
      e += ",";
    } else {
      e += val;
    }
  });
  const arr1 = [...e];
  arr1.reverse();
  e = "";
  arr1.forEach(function (val, i) {
    e += val;
  });
  return e;
};

// Search ...............................
// const serchMethod = function (data) {
//   const value = document.getElementById("input").value.toLowerCase();
//   let i = 1;
//   const n = localStorage.length;
//   while (i <= n) {
//     const ke = localStorage.key(i);
//     const val = localStorage.getItem(ke);
//     if (value === " ") return;
//     if (!ke?.toLowerCase()?.includes(value)) {
//       document.getElementById(val)?.classList.add("hidden");
//     } else {
//       document.getElementById(val)?.classList.remove("hidden");
//     }
//     i++;
//   }
// };
const serchMethod = function () {
  const userInput = document.getElementById("input").value.toLocaleLowerCase();
  console.log(userInput);
  const valueDiv = document.getElementsByClassName("imageName");
  console.log(valueDiv);
  let i = 0;
  let n = valueDiv.length;
  console.log(n);
  while (i < n) {
    const val = valueDiv[i].textContent;
    const val1 = val.toLowerCase();
    console.log(val);
    // const ke = localStorage.key(i);

    // const val = localStorage.getItem(ke);

    if (userInput === " ") return;
    if (!val1.includes(userInput)) {
      document.getElementById(`${val}`).classList.add("hidden");
    } else {
      document.getElementById(`${val}`).classList.remove("hidden");
    }
    i++;
  }
};
// document.getElementsByClassName("inner-div").classList.remove("hidden");
const srch = document.getElementById("input");
srch.addEventListener("keyup", serchMethod);

//display end ...........................................................

const innerElement = document.getElementById("outer-div");
const innerTable = function (data, i) {
  const innerDiv = document.createElement("div");
  innerDiv.className = "inner-div";
  innerDiv.id = `${data.name}`;

  // div for image and name of image......................................

  const divImage = document.createElement("div");
  divImage.className = "divImage";
  const img = document.createElement("img");
  img.src = data.image;
  const imgName = document.createElement("p");
  imgName.className = "imageName";
  imgName.textContent = data.name;
  divImage.appendChild(img);

  // end of div which for image ..............................................

  divImage.appendChild(imgName);
  innerDiv.appendChild(divImage);

  // div for codeName............................................................

  const code = document.createElement("p");
  code.className = "content1";
  code.textContent = data.symbol;
  innerDiv.appendChild(code);

  // end of cod div.....................................................

  const currentPrice = document.createElement("p");
  currentPrice.className = "content2";
  currentPrice.textContent = "$" + data.current_price;
  innerDiv.appendChild(currentPrice);

  const total = document.createElement("p");
  total.className = "content3";
  total.textContent = "$" + represent(data.total_volume);
  innerDiv.appendChild(total);

  const priceChangePercentageDiv = document.createElement("div");
  priceChangePercentageDiv.className = "content4";
  const priceChangePercentageValue = document.createElement("p");
  priceChangePercentageValue.textContent =
    Math.abs(data.price_change_percentage_24h.toFixed(2)) + "%";

  // this is for color and arrow for, increament➕ and decreament ➖..................

  if (data.price_change_percentage_24h >= 0) {
    priceChangePercentageValue.style.color = "green";
    const priceChangePercentageImage = document.createElement("img");
    priceChangePercentageImage.src =
      "https://previews.123rf.com/images/imagecatalogue/imagecatalogue1610/imagecatalogue161004523/63805856-icona-di-vettore-di-sharp-arrow-up-lo-stile-immagine-%C3%A8-un-simbolo-icona-piatto-verde-su-sfondo-trasp.jpg";
    priceChangePercentageDiv.appendChild(priceChangePercentageImage);
    priceChangePercentageDiv.appendChild(priceChangePercentageValue);
  } else {
    priceChangePercentageValue.style.color = "red";
    const priceChangePercentageImage = document.createElement("img");
    priceChangePercentageImage.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8e78u9S6uea1s3Bj6_Q0wwVcx20AlEOcptg&usqp=CAU";
    priceChangePercentageDiv.appendChild(priceChangePercentageImage);
    priceChangePercentageDiv.appendChild(priceChangePercentageValue);
  }
  innerDiv.appendChild(priceChangePercentageDiv);

  // market cap value....................................................

  const mrktCap = document.createElement("p");
  mrktCap.className = "content5";
  mrktCap.textContent = "Mkt Cap: $" + represent(data.market_cap);
  innerDiv.appendChild(mrktCap);

  //this is for horizontal line............................................

  const hr = document.createElement("div");
  hr.className = "hr";
  innerDiv.appendChild(hr);

  innerElement.appendChild(innerDiv);
};

// promis by using fetch.................................................

const ourData = fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
)
  .then(function (responce) {
    return responce.json();
  })
  .then(function (data) {
    const n = data.length;
    let i = 0;
    while (i < n) {
      const newData = data[i];
      innerTable(newData, i);
      i++;
    }
    // }
  });
// .catch((err) => new Error("dirty read"));
