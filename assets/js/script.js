
var key = "4d040515e8e63a0237847258dee4247b";
var display = document.querySelector(".main_display");
var result = document.querySelector(".result");
var container = document.querySelector(".container");
var form = document.querySelector("form");
var mainData = null;
var submit = document.querySelector("#searchBtn");
submit.addEventListener('click', getWeatherinfo);

function getWeatherinfo(e) {
  e.preventDefault();
  // debugger;
  var search = document.querySelector("#input_value").value;

  var url = "http://api.openweathermap.org/data/2.5/weather?q=" + search + "&APPID=" + key + "&units=metric";

  fetch(url).then(
    function (response) {
      console.log(response);
      return response.json();
    }
  ).then(
    function (responseFromServer) {
      mainData = responseFromServer;
      console.log(mainData);

      if (mainData.cod == "404" || mainData.cod == "400") {
        // debugger;
        alert("Enter a Correct City Name");
      }
      else if (display.value = "") {
        alert("Enter a Correct City Name");
        document.getElementsByClassName(".main_display").style.visibility = "hidden";
      }
      else {
        display.style.visibility = "visible";

      }
      displayshow();
      bgImageChange();
    }
  )
};

function bgImageChange() { //for background changes
  //debugger;
  if (mainData.weather[0].main == "Clear")
    container.style.backgroundImage = "url('assets/images/clear.jpg')";
  else if (mainData.weather[0].main == "Clouds")
    container.style.backgroundImage = "url('assets/images/cloudy.jpg')";
  else if (mainData.weather[0].main == "Rain" || mainData.weather[0].main == "Drizzle" || mainData.weather[0].main == "Mist")
    container.style.backgroundImage = "url('assets/images/rain.jpg')";
  else if (mainData.weather[0].main == "Snow")
    container.style.backgroundImage = "url('assets/images/snow.jpg')";
  else if (mainData.weather[0].main == "Thunderstrome")
    container.style.backgroundImage = "url('assets/images/strome.jpg')";
  else if (mainData.weather[0].main == "Smoke")
    container.style.backgroundImage = "url('assets/images/smoke.jpg')";
  else
    container.style.backgroundImage = "url('assets/images/default.jpg')";

}

function displayshow() {
  // debugger;
  display.innerHTML = "";
  form.reset();
  function createNode(node, place, result, source) {
    var elementNode = document.createElement(node);
    elementNode.innerHTML = result;
    place.appendChild(elementNode);
    if (elementNode.localName == 'img') {
      elementNode.setAttribute("src", source);
      elementNode.setAttribute("alt", mainData.weather[0].main);
    }
    return elementNode;
  }

  display.classList.add("active-display");

  var temperatureElement = mainData.main.temp + "&degC";
  var humidityElement = "Humidity : &nbsp" + mainData.main.humidity + "%";
  var windElement = "Wind : &nbsp" + mainData.wind.speed + "km/h";
  var heading = mainData.name + ", " + mainData.sys.country;
  var dateElement = mainData.weather[0].description + ",";
  var condition = mainData.weather[0].main;
  var weatherIcon_src = 'http://openweathermap.org/img/w/' + mainData.weather[0].icon + '.png';

  var article = createNode("article", display, " ");
  createNode("h3", article, heading);
  createNode("span", article, dateElement);

  var conditionNode = createNode("span", article, condition);
  conditionNode.setAttribute('class', "condition");

  var ulNode = createNode("ul", article, " ");
  var iconli = createNode("li", ulNode, " ");
  var iconFigNode = createNode("figure", iconli, " ");
  createNode("img", iconFigNode, " ", weatherIcon_src);

  var tempNode = createNode("li", ulNode, temperatureElement);
  tempNode.setAttribute('class', "temp");

  createNode("span", article, humidityElement);
  createNode("span", article, windElement);

}


