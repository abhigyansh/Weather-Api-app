window.addEventListener("load" , () =>{
    let long;
    let lat;
    let tempratureDescription = document.querySelector(".temprature-description");
    let tempratureDegree = document.querySelector(".temprature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    // let icon = document.querySelector("#icon1")

    function mapWeatherIconToSkycons(icon) {
        // Mapping of weather icon codes to Skycons names
        const iconMappings = {
            '01d': 'CLEAR_DAY',
            '01n': 'CLEAR_NIGHT',
            '02d': 'PARTLY_CLOUDY_DAY',
            '02n': 'PARTLY_CLOUDY_NIGHT',
            '03d': 'CLOUDY',
            '03n': 'CLOUDY',
            '04d': 'CLOUDY',
            '04n': 'CLOUDY',
            '09d': 'RAIN',
            '09n': 'RAIN',
            '10d': 'SHOWERS_DAY',
            '10n': 'SHOWERS_NIGHT',
            '11d': 'THUNDER_RAIN_DAY',
            '11n': 'THUNDER_RAIN_NIGHT',
            '13d': 'SNOW',
            '13n': 'SNOW',
            '50d': 'FOG',
            '50n': 'FOG'
        };
    
        // Return the corresponding Skycons name or a default value
        return iconMappings[icon] || 'CLEAR_DAY';
    }
    
    // Example usage:
    const weatherIcon = '03d'; // Replace this with your actual weather icon
    const skyconsIcon = mapWeatherIconToSkycons(weatherIcon);
    
    // Call setIcons function with the Skycons icon and the target element
    setIcons(skyconsIcon, document.querySelector('.icon'));


    const appid = 'c2247a2bc845c63b0c6ef3b55834dabd'

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat =position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${appid}`;          
            fetch(api)
            .then(Response =>{
                return Response.json();
        })
            .then(data => {
            console.log(data);
            const {temp, summary} =data.main
            //set DOM elements from the api
            let temp1 = temp - 273.15;
            let temp2 = (temp1 * 9/5) + 32;
            const roundedNumber = temp2.toFixed(2);
            tempratureDegree.textContent = roundedNumber;

            const {description, icon} = data.weather[0];    
            tempratureDescription.textContent = description.toUpperCase(1);
            
            const locationName = data.name;
            locationTimezone.textContent = locationName;
                    //set Icon
            setIcons(icon, document.querySelector('.icon'));
            

        });
        
        });
    };

            
    function setIcons(icon, iconId){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, skycons[currentIcon]);
    }

    });