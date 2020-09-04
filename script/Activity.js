// import { generateWeather } from './main.js';
const generateWeather = (main, name, sys, weather, date) => {
    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`

    const wDiv = document.createElement("div");
    // const wDivAtt = document.createAttribute("class");
    // wDiv.value = "card border-success mb-3 col-12 col-md-4";
    wDiv.setAttribute("class", "card border-success mb-3 col-6 col-md-3 text-white bg-info mb-3 h-auto w-auto");
    // console.log(wDiv)
    const wHeader = document.createElement("div");
    wHeader.setAttribute("class", "card-header");
    wHeader.innerHTML = 
    `${name} <sup class="bg-primary">${sys.country}</sup><span class="offset-2 offset-md-3">Date Searched: ${date}</span>`;
    wDiv.appendChild(wHeader);

    const wBody = document.createElement("div");
    wBody.setAttribute("class", "card-body");
    // wDiv.innerHTML=`${Math.round(main.temp)}<sup>°C</sup></div>`
    wDiv.appendChild(wBody);


    const wImg = document.createElement("img");
    wImg.setAttribute("class", "card-img-top bg-info h-auto w-auto");
    wImg.setAttribute("style", "color:white")
    wImg.setAttribute("src", icon) //set source
    wImg.setAttribute("alt", weather[0]["description"]) //set alt
    wDiv.appendChild(wImg);

    const wTitle = document.createElement("div");
    wTitle.setAttribute("class", "card-title");
    wTitle.innerHTML = `There was ${Math.round(main.temp)}<sup>°C</sup> ${weather[0]["description"]}`
    wDiv.appendChild(wTitle);




    return wDiv;
    // console.log(wDiv)

}
const WeatherDom = document.getElementById("weatherContainer");

try {
    // console.log("heres")
    if (typeof (Storage) !== "undefined") {
        if (localStorage.WeatherSearched) {
            let storedWeather = JSON.parse(localStorage.WeatherSearched);
            console.log(storedWeather);
            storedWeather.map((weat) => {
                // console
               WeatherDom.insertBefore(generateWeather(weat.main, weat.name, weat.sys, weat.weather, weat.Date), WeatherDom.childNodes[0]) 
            })

        }
        else {
            // localStorage.WeatherSearched = JSON.stringify([{ main, name, sys, weather, Date: (new Date()).toDateString() }])
        }
    }
    else {
        
         alert("Your Search Might Not Be Saved")
    }
}
catch (error) {
    console.log(error);
    alert(error)
}