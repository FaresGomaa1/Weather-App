// Personal API Key for OpenWeatherMap API
const apiKey = "d241f3c6387ba1120d8a880024c8e90f";
// const { domainToUnicode } = require("url");

/* Global Variables */
const button = document.querySelector("#generate");
const units = "metric";
const temp = document.querySelector("#temp");
const date = document.querySelector("#date");
const content = document.querySelector("#content");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear();
//get data from api
const getData = async (x) => {
  try {
    let info = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${x}&appid=${apiKey}&units=${units}`
    );
    const results = await info.json();
    return results.main;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
//post data from api to local server
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
const updateTemp = async () => {
  const response = await fetch("/getData");
  try {
    const allData = await response.json();

    temp.innerHTML = `<p>Temperature: ${allData.temp}</p>`;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
const updateDate = async () => {
  const response = await fetch("/content");
  try {
    const allData = await response.json();
    date.innerHTML = `<p>Today: ${allData.date}</p>`;
    content.innerHTML = `<p>${allData.content}</p>`;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
button.addEventListener("click", () => {
  const zipCode = document.querySelector("#zip").value;
  const feelings = document.querySelector("#feelings").value;
  const dateContent = {
    date: `${newDate}`,
    content: `${feelings}`,
  };
  //post date and content to server
  const postDateContent = async (url = "/date", data = dateContent) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    try {
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };
  //then chain
  if (zipCode != "") {
    getData(zipCode)
      .then((results) => postData("/all", results))
      .then(() => postDateContent())
      .then(() => updateTemp())
      .then(() => updateDate());
  } else {
    alert("Please enter a zip code");
  }
});
