
document.getElementById("CityName").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getData();
    }
});


async function getData() {
    let CityName = document.getElementById("CityName").value;
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${CityName}&appid=16c27c8007ada7881ba01b77717f678c&units=metric`;

    try {
        let res = await axios.get(URL);

        if (res.status === 200) {
            let temp = res.data.main["temp"];
            let icon = res.data.weather[0]["icon"];
            let des = res.data.weather[0]["description"];
            let iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            let country = res.data.sys.country
            let sunset = res.data.sys.sunset
            let sunrise = res.data.sys.sunrise
            let sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
            let sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

            let date = res.data.dt;
            let formattedDate = new Date(date * 1000).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });


            document.getElementById("ShowData").innerHTML =
                `
<div class="weather-info">
<div class="row justify-content-center">
<div class="col-lg-8 text-center m-5">

<h3>${CityName}, ${country}</h3>
       
       <p>${formattedDate}</p>
       <img src="${iconURL}">
       <h3>${temp} °C</h3>
       <p>${des}</p>    
  <h4>Sunrise: ${sunriseTime} &  Sunset: ${sunsetTime} </h4>
</div>

</div>
</div>
                     `

        }
    } catch (error) {
        if (error.response.status === 404) {
            document.getElementById("ShowData").innerHTML = `<h3>City "${CityName}" not found. Please try again.</h3>`;
        } else {
            document.getElementById("ShowData").innerHTML = `<h3>An error occurred. Please try again later.</h3>`;
        }
    }
}
