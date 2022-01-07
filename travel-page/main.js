"use strict";
// add text when press read more button, reduce text when press show less
const toggle = (evt) => {
  const btnMore = evt.currentTarget;
  const parent = btnMore.parentElement;
  const pTags = parent.getElementsByTagName("p");
  const moreText = pTags[1];

  moreText.classList.toggle("hide");
  btnMore.textContent == "Read More"
    ? (btnMore.textContent = "Show Less")
    : (btnMore.textContent = "Read More");
};

document.addEventListener("DOMContentLoaded", () => {
  const btnsMore = document.querySelectorAll(".box-text button");

  for (let btnMore of btnsMore) {
    btnMore.addEventListener("click", toggle);
  }
});

const $ = (selector) => document.querySelector(selector);

const displayErrorMsgs = (msgs) => {
  // create a new ul element
  const ul = document.createElement("ul");
  ul.classList.add("messages");

  // create a new li element for each error message, add to ul
  for (let msg of msgs) {
    const li = document.createElement("li");
    const text = document.createTextNode(msg);
    li.appendChild(text);
    ul.appendChild(li);
  }

  // if ul node isn't in document yet, add it
  const node = $(".box-search ul");
  const searchBox = $(".box-search");
  if (node == null) {
    // get the form element
    const form = $("form");
    // add ul to parent of form, before the form
    searchBox.insertBefore(ul, form);
  } else {
    // replace existing ul node
    searchBox.replaceChild(ul, node);
  }
};

const displayResult = (name, passport, creditCard, city, transportation) => {
  var outputName = $("#output-name");
  var outputPassport = $("#output-passport-number");
  var outputCreditCard = $("#output-creditcard-number");
  var outputCity = $("#output-city");
  var outputTransportation = $("#output-transportation");
  var outputTotalPrice = $("#output-total-price");
  outputName.textContent = name;
  outputPassport.textContent = passport;
  outputCreditCard.textContent = creditCard;
  outputCity.textContent = city;
  outputTransportation.textContent = transportation;
  outputTotalPrice.textContent = calculateTotalPrice(city, transportation);
};

const calculateTotalPrice = (city, transportation) => {
  if (city == "danang" && transportation == "flight") {
    return "$2500";
  } else if (city == "danang" && transportation == "cruise") {
    return "$3000";
  } else if (city == "halong" && transportation == "flight") {
    return "$4000";
  } else {
    return "$5500";
  }
};

const processEntries = () => {
  // get form controls to check for validity
  const name = $("#name");
  const passport = $("#passport");
  const creditCard = $("#credit-card");
  const city = $('input[name="city"]:checked');
  const transportation = $('input[name="transportation"]:checked');

  // create array for error messages
  const msgs = [];

  // check user entries for validity
  if (name.value == "") {
    msgs[msgs.length] = "Please enter your full name.";
  }
  if (!isValidPassportNumber(passport.value)) {
    msgs[msgs.length] = "Please enter valid passport number.";
  }
  if (!isValidCreditCard(creditCard.value)) {
    msgs[msgs.length] = "Please enter valid credit card number.";
  }
  if (!isCitySelected()) {
    msgs[msgs.length] = "Please select a city.";
  }
  if (!isTransportationSelected()) {
    msgs[msgs.length] = "Please select a transportation.";
  }

  // submit the form or notify user of errors
  if (msgs.length == 0) {
    // no error messages
    $("#book_trip").disabled = false;
    //Remove Error Node
    removeErrorNode();

    //Display result
    if (
      name != null &&
      passport != null &&
      creditCard != null &&
      city != null &&
      transportation != null
    ) {
      showResultTrigger();
      displayResult(
        name.value,
        passport.value,
        creditCard.value,
        city.value,
        transportation.value
      );
    }
  } else {
    hideResultTrigger();
    displayErrorMsgs(msgs);
  }
};

const hideResultTrigger = () => {
  let result = $(".result");
  result.classList.add("hide");
};

const showResultTrigger = () => {
  let result = $(".result");
  result.classList.remove("hide");
};

const isValidPassportNumber = (passportNumber) => {
  var regex = new RegExp("^[A-Z][0-9]{5}$");
  return regex.test(passportNumber);
};

const isValidCreditCard = (creditCard) => {
  var regex = new RegExp("^[1-9][0-9]{5}$");
  return regex.test(creditCard);
};

const isCitySelected = () => {
  let selectedValue = 0;
  const cityRadios = document.querySelectorAll('input[name="city"]');
  for (const r of cityRadios) {
    if (r.checked && r.value != "none") {
      selectedValue++;
    }
  }
  return selectedValue > 0;
};

const isTransportationSelected = () => {
  let selectedValue = 0;
  const transportationRadios = document.querySelectorAll(
    'input[name="transportation"]'
  );
  for (const r of transportationRadios) {
    if (r.checked && r.value != "none") {
      selectedValue++;
    }
  }
  return selectedValue > 0;
};

const resetForm = () => {
  $("form").reset();

  // remove error messages
  removeErrorNode();

  $("#name").focus();
};

const submitForm = () => {
  $("form").submit();
};

//Remove Error node. Make sure check if the node is present to avoid the null point error
const removeErrorNode = () => {
  var errorNode = $(".box-search ul");
  if (errorNode) {
    errorNode.remove();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  if ($("#pre_process")) {
    $("#pre_process").addEventListener("click", processEntries);
  }
  if ($("#reset_form")) {
    $("#reset_form").addEventListener("click", resetForm);
  }
  if ($("#book_trip")) {
    $("#book_trip").addEventListener("click", submitForm);
  }
  $("#name").focus();
});
