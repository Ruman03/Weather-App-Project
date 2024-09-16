const weatherForm = document.getElementById('submitBtn')
const cityInput = document.getElementById("cityInput");
const weatherCard = document.querySelector('.card');
const weatherApi = '2c827eb9fa543ff36d940b3c435a8446';

weatherForm.addEventListener('click', (event) =>{
    event.preventDefault();
    weatherCard.innerHTML = '';
    getWeatherData(cityInput.value);
} )

async function getWeatherData(city){
    
    if(city){
        try{
            const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}`);
            
            if(!weatherData.ok){
                errorDisplay("City not found");
            }
            const data =  await weatherData.json();
            displayWeatherInfo(data);
        }
        catch(error){
            throw new Error(error);
        }
    }
    else{
        errorDisplay("Enter a City");
    }

}

function displayWeatherInfo(data){
    const {name:city, main:{temp, humidity}, weather: [{id, description}] } = data;

    const cityDisplay = document.createElement('h1');
    cityDisplay.textContent = city;
    cityDisplay.classList.add('cityDisplay');

    const tempDisplay = document.createElement('p');
    tempDisplay.textContent = `Temperature: ${(temp-273.15).toFixed(1)}°C`;
    tempDisplay.classList.add('tempDisplay');

    const humidityDisplay = document.createElement('p');
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add('humidityDisplay');

    const descDisplay = document.createElement('p');
    descDisplay.textContent = description;
    descDisplay.classList.add('descDisplay');

    const emojiDisplay = document.createElement('p');
    emojiDisplay.textContent = getWeatherEmoji(id);
    emojiDisplay.classList.add('emojiDisplay');


    weatherCard.appendChild(cityDisplay);
    weatherCard.appendChild(tempDisplay);
    weatherCard.appendChild(humidityDisplay);
    weatherCard.appendChild(descDisplay);
    weatherCard.appendChild(emojiDisplay);

    console.log(data);
}

function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return '⛈️';
        case (weatherId >= 300 && weatherId < 400):
            return '🌧️';
        case (weatherId >= 500 && weatherId < 600):
            return '🌧️';
        case (weatherId >= 600 && weatherId < 700):
            return '❄️';
        case (weatherId >= 700 && weatherId < 800):
            return '🌫️';
        case (weatherId === 800):
            return '☀️';
        case (weatherId > 800):
            return '☁️';
    }

}

function errorDisplay(message){
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorMessage.classList.add('errorDisplay');
    weatherCard.appendChild(errorMessage);
}