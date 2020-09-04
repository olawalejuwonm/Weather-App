const pro = '3e20f6c766447ac616bee54e5076345a'

const generateWeather = (main, name, sys, weather) => {
    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`

    const wDiv = document.createElement("div");
    // const wDivAtt = document.createAttribute("class");
    // wDiv.value = "card border-success mb-3 col-12 col-md-4";
    wDiv.setAttribute("class","card border-success mb-3 col-12 col-md-4 text-white bg-info mb-3" );
    // console.log(wDiv)
    const wHeader = document.createElement("div");
    wHeader.setAttribute("class", "card-header");
    wHeader.innerHTML = `${name} <sup class="border bg-danger">${sys.country}</sup>`;
    wDiv.appendChild(wHeader);

    const wBody = document.createElement("div");
    wBody.setAttribute("class", "card-body");
    // wDiv.innerHTML=`${Math.round(main.temp)}<sup>°C</sup></div>`
    wDiv.appendChild(wBody);


    const wImg = document.createElement("img");
    wImg.setAttribute("class", "card-img-top");
    wImg.setAttribute("src", icon) //set source
    wImg.setAttribute("alt", weather[0]["description"]) //set alt
    wDiv.appendChild(wImg);

    const wTitle = document.createElement("div");
    wTitle.setAttribute("class", "card-title");
    wTitle.innerHTML =`There will be ${Math.round(main.temp)}<sup>°C</sup> ${weather[0]["description"]} today`
    wDiv.appendChild(wTitle);




    return wDiv;
    console.log(wDiv)

}
const FormOnsubmit = (event) => {
    event.preventDefault();

    const SearchDom = document.getElementById("Search");
    const WeatherDom = document.getElementById("weatherContainer");
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${SearchDom.value}&appid=${pro}&units=metric`)
    .then((res) => {
        return res.json()
    })
    .then((res) => {
        const { main, name, sys, weather } = res;
        // console.log(weather[0])
        console.log(res)
        WeatherDom.insertBefore(generateWeather(main, name, sys, weather ), WeatherDom.childNodes[0])

    })
    // console.log(SearchDom.value)


}
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&
// exclude={part}&appid={YOUR API KEY}


// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function() {
//       navigator.serviceWorker.register('/sw.js').then(function(registration) {
//         // Registration was successful
//         console.log('ServiceWorker registration successful with scope: ', registration.scope);
//       }, function(err) {
//         // registration failed :(
//         console.log('ServiceWorker registration failed: ', err);
//       });
//     });
//   }