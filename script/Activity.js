// import { generateWeather } from './main.js';
const closeAlert = () => {
    document.getElementById("updateAlert").style = "display:none";
}

const closeAlertClear = () => {
    document.getElementById("updateAlertClear").style = "display:none";
}


const generateWeather = (main, name, sys, weather, date) => {

    // console.log("main", main);
    // console.log("name", name);
    // console.log("sys", sys);
    // console.log("weather", weather);



    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;


    const wDiv = document.createElement("div");
    // const wDivAtt = document.createAttribute("class");
    // wDiv.value = "card border-success mb-3 col-12 col-md-4";
    wDiv.setAttribute("class", "card border-success mb-3 col-6 col-md-3 text-white bg-info mb-3 h-auto w-auto");
    // console.log(wDiv)
    const wHeader = document.createElement("div");
    wHeader.setAttribute("class", "card-header");
    wHeader.innerHTML =
        `${name} <sup class="bg-primary">${sys.country}`;
    wDiv.appendChild(wHeader);

    const wBody = document.createElement("div");
    wBody.setAttribute("class", "card-body");
    // wDiv.innerHTML=`${Math.round(main.temp)}<sup>°C</sup></div>`
    wDiv.appendChild(wBody);

    const wRow = document.createElement("div");
    wRow.setAttribute("class", "row");
    // wBody.appendChild(wRow);


    const wImg = document.createElement("img");
    wImg.setAttribute("class", "card-img-top bg-info h-auto w-auto col-12");
    // wImg.setAttribute("style");
    wImg.setAttribute("src", icon); //set source
    wImg.setAttribute("alt", weather[0]["description"]); //set alt
    wRow.appendChild(wImg);

    const wRcol = document.createElement("div");
    wRcol.setAttribute("class", "col-12 card-text");
    wRcol.innerHTML = `Temp:${main.temp_max}<sup>°C</sup><br>
    Pressure:${main.pressure}<br> <span>${date}</span>`
    wRow.appendChild(wRcol);




    const wTitle = document.createElement("div");
    wTitle.setAttribute("class", "card-text");
    wTitle.innerHTML =
        `${weather[0]["description"].toUpperCase()}`
    wBody.appendChild(wTitle);

    wTitle.appendChild(wRow)




    return wDiv;
    // console.log(wDiv)

};


const WeatherDom = document.getElementById("weatherContainer");
const NoWeatherDom = document.getElementById("no");


try {
    // console.log("heres")
    // console.log("value of", localStorage.WeatherSearched);
    // console.log("type of", typeof localStorage.WeatherSearched);
    if (typeof (Storage) !== "undefined") {
        if (localStorage.WeatherSearched) {
            if (JSON.parse(localStorage.WeatherSearched) !== false) {
                let storedWeather = JSON.parse(localStorage.WeatherSearched);
                // console.log(storedWeather);
                storedWeather.map((weat) => {
                    // console
                    WeatherDom.insertBefore(generateWeather(weat.main, weat.name, weat.sys, weat.weather, weat.Date), WeatherDom.childNodes[0])
                })

            }
            else {
                const NoWeatherMarkUp = () => {
                    const nwDiv = document.createElement('div');
                    nwDiv.innerHTML =
                        `<div class="row justify-content-center">
                        <div class="card">
                <div class="card-header">
                  Weather History
                </div>
                <div class="card-body">
                  <h5 class="card-title">No Weather History At The Moment</h5>
                  <p class="card-text">Weather Searched Will Persist Here! Start by searching one!</p>
                  <a href="./index.html" class="btn btn-primary">Search Weather</a>
                </div>
              </div>
              </div>`
                    return nwDiv
                }
                NoWeatherDom.insertBefore(NoWeatherMarkUp(), NoWeatherDom.childNodes[0])

                // localStorage.WeatherSearched = JSON.stringify([{ main, name, sys, weather, Date: (new Date()).toDateString() }])
            }
        }
        else {
            const NoWeatherMarkUp = () => {
                const nwDiv = document.createElement('div');
                nwDiv.innerHTML =
                    `<div class="row justify-content-center">
                    <div class="card">
            <div class="card-header">
              Weather History
            </div>
            <div class="card-body">
              <h5 class="card-title">No Weather History At The Moment</h5>
              <p class="card-text">Weather Searched Will Persist Here! Start by searching one!</p>
              <a href="./index.html" class="btn btn-primary">Search Weather</a>
            </div>
          </div>
          </div>`
                return nwDiv
            }
            NoWeatherDom.insertBefore(NoWeatherMarkUp(), NoWeatherDom.childNodes[0])

            // localStorage.WeatherSearched = JSON.stringify([{ main, name, sys, weather, Date: (new Date()).toDateString() }])
        }
    }
    else {
        document.getElementById("updateAlert").classList.add("alert-danger");
        document.getElementById("updateAlert").style = "display:block";
        document.getElementById("updateAlert").innerText = `Your Search Are Not Be Saved, Local Storage Not Found`;
    }
}
catch (error) {
    // console.log(error);
    document.getElementById("updateAlert").classList.add("alert-danger");
    document.getElementById("updateAlert").style = "display:block";
    document.getElementById("updateAlert").innerText = `${error.message}`;
}

const clearHistory = () => {
    try {
        window.localStorage.WeatherSearched = false;
        window.location.reload();
    }
    catch (error) {
        // console.log(error);
        document.getElementById("updateAlert").classList.add("alert-danger");
        document.getElementById("updateAlert").style = "display:block";
        document.getElementById("updateAlert").innerText = `${error.message}`;
    }
};

