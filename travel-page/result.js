"use strict";

function getSendingDataFromUrl(url) {
  var tokens = url.split("?")[1].split("&");
  var result = {};
  for (var i = 0; i < tokens.length; i++) {
    result[tokens[i].split("=")[0]] = tokens[i].split("=")[1];
  }
  return result;
}

document.addEventListener("DOMContentLoaded", () => {
  var data = getSendingDataFromUrl(window.location.href);
  const name = data["name"].replace("+", " ");
  const city = data["city"];
  const transportation = data["transportation"];
  const totalPrice = calculateTotalPrice(city, transportation);
  displayConfimationInfo(name, city, transportation, totalPrice);
});

const displayConfimationInfo = (name, city, transportation, totalPrice) => {
  var outputName = $("#name");
  var outputCity = $("#city");
  var outputTransportation = $("#transportation");
  var outputTotalPrice = $("#total-price");
  if (outputName) {
    outputName.textContent = name;
  }
  if (outputCity) {
    outputCity.textContent = city;
  }
  if (outputTransportation) {
    outputTransportation.textContent = transportation;
  }
  if (outputTotalPrice) {
    outputTotalPrice.textContent = totalPrice;
  }
};
