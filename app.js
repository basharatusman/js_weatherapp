window.addEventListener('load', () => {
    let long;
    let lat;
    let tempratureDescription = document.querySelector(".temprature-description");
    let tempratureDegree = document.querySelector(".temprature-degree");
    let tempratureTimezone = document.querySelector(".location-timezone");
    let tempratureIcon = document.querySelector(".icon");
    const tempratureSection = document.querySelector('.temprature-section');
    const tempratureSpan = document.querySelector('.temprature-section span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api_key = 'ecdf18fed27c69465e9337c64a3f88be';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { weather, main } = data;
                    //set Dom elements from the API
                    tempratureDegree.textContent = ((main.feels_like) - 273.15).toFixed(2);
                    tempratureDescription.textContent = (weather[0].description).toUpperCase();
                    tempratureTimezone.textContent = data.name;
                    let icon = `http://openweathermap.org/img/wn/${weather[1].icon}@2x.png`;
                    tempratureIcon.src = icon

                    //change temp to F from C
                    tempratureSection.addEventListener('click', () => {
                        if (tempratureSpan.textContent === 'C') {
                            tempratureSpan.textContent = 'F';
                            tempratureDegree.textContent = (((main.feels_like - 273.15)*9/5)+32).toFixed(2);
                        } else {
                            tempratureSpan.textContent = 'C';
                            tempratureDegree.textContent = ((main.feels_like) - 273.15).toFixed(2);
                        }
                    })
                })
        });

    } else {
        h1.textContent = "Error, sorry try again"
    }
});
