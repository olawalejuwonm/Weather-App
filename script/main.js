const pro = '3e20f6c766447ac616bee54e5076345a';
// let SearchedWeather = 

const closeAlert = () => {
    document.getElementById("updateAlert").style = "display:none";
}

const generateWeather = (main, name, sys, weather) => {
    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`

    const wDiv = document.createElement("div");
    // const wDivAtt = document.createAttribute("class");
    // wDiv.value = "card border-success mb-3 col-12 col-md-4";
    wDiv.setAttribute("class", "card border-success mb-3 col-12 col-md-4 text-white bg-success mb-3");
    // console.log(wDiv)
    const wHeader = document.createElement("div");
    wHeader.setAttribute("class", "card-header");
    wHeader.innerHTML = `${name} <sup class="bg-primary">${sys.country}</sup>`;
    wDiv.appendChild(wHeader);

    const wBody = document.createElement("div");
    wBody.setAttribute("class", "card-body");
    // wDiv.innerHTML=`${Math.round(main.temp)}<sup>°C</sup></div>`
    wDiv.appendChild(wBody);


    const wImg = document.createElement("img");
    wImg.setAttribute("class", "card-img-top bg-success");
    wImg.setAttribute("style", "color:white")
    wImg.setAttribute("src", icon) //set source
    wImg.setAttribute("alt", weather[0]["description"]) //set alt
    wDiv.appendChild(wImg);

    const wTitle = document.createElement("div");
    wTitle.setAttribute("class", "card-title");
    wTitle.innerHTML = `There will be ${Math.round(main.temp)}<sup>°C</sup> ${weather[0]["description"]} today`
    wDiv.appendChild(wTitle);



    return wDiv;
    // console.log(wDiv)

}
const FormOnsubmit = (event) => {
    event.preventDefault();

    const SearchDom = document.getElementById("Search");
    const SearchFeedback = document.getElementById("SearchFeedbackWrong");
    const ValidSearch = document.getElementById("SearchFeedbackRight");
    const WeatherDom = document.getElementById("weatherContainer");

    if (SearchDom.value === "") {
        SearchDom.classList.add("is-invalid");
        SearchFeedback.innerText = "Please Enter A Valid City";
        return null;
    }
    SearchDom.classList.remove("is-invalid");
    SearchDom.classList.add("is-valid");
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${SearchDom.value}&appid=${pro}&units=metric`)
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            if (res.cod === "404") {
                const error = new Error(res.message);
                throw error;
            }
            const { main, name, sys, weather } = res;
            // console.log(weather[0])
            // console.log(res)
            WeatherDom.insertBefore(generateWeather(main, name, sys, weather), WeatherDom.childNodes[0]);
            SearchDom.classList.remove("is-valid");
            try {
                // console.log(typeof(Storage))
                const date = new Date();
                const dateT = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
                if (typeof (Storage) !== "undefined") {
                    if (localStorage.WeatherSearched) {
                        if (JSON.parse(localStorage.WeatherSearched) !== false) {
                            let storedWeather = JSON.parse(localStorage.WeatherSearched);
                            console.log(storedWeather);
                            storedWeather.push({ main, name, sys, weather, Date: dateT });
                            localStorage.WeatherSearched = JSON.stringify(storedWeather);
                            console.log(JSON.parse(localStorage.WeatherSearched).length);

                        }
                        else {
                            localStorage.WeatherSearched = JSON.stringify([{ main, name, sys, weather, Date: dateT }])
                        }
                    }
                    else {
                        localStorage.WeatherSearched = JSON.stringify([{ main, name, sys, weather, Date: dateT }])
                    }
                }
                else {
                    document.getElementById("updateAlert").classList.add("alert-danger");
                    document.getElementById("updateAlert").style = "display:block";
                    document.getElementById("updateAlert").innerText = `Your Search Might Not Be Saved, Local Storage Not Found`;
                }

            }
            catch (error) {
                console.log(error);
                document.getElementById("updateAlert").classList.add("alert-danger");
                document.getElementById("updateAlert").style = "display:block";
                document.getElementById("updateAlert").innerText = `${error}`;
            }

        }).catch((error) => {
            SearchDom.classList.remove("is-valid");
            SearchDom.classList.add("is-invalid");
            SearchFeedback.innerText = error.message.toUpperCase();
            console.log(error);
            // TypeError: Failed to fetch
            if (error = "TypeError: Failed to fetch") {
                document.getElementById("updateAlert").classList.add("alert-danger");
                document.getElementById("updateAlert").style = "display:block";
                document.getElementById("updateAlert").innerText = `Your Need Internet Connection To Search For Weather Update!`;
            }
        })
    // console.log(SearchDom.value)


}
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&
// exclude={part}&appid={YOUR API KEY}



if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}


