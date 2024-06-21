const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

searchButton.addEventListener('click', () => {

    const API_KEY = '6c8c488cd5b86d1f0e65a5411dacf862';
    const city = document.querySelector('.search-box input').value;

    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                error404.style.display = 'block';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.classList.add('FadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('FadeIn');

            const image = weatherBox.querySelector('img');
            const temperature = weatherBox.querySelector('.temperature');
            const description = weatherBox.querySelector('.description');
            const humidity = weatherDetails.querySelector('.humidity span');
            const wind = weatherDetails.querySelector('.wind span');

            switch (json.weather[0].main) {
                case 'Clouds':
                    image.src = './img/cloud.png';
                    break;
                case 'Rain':
                    image.src = './img/rain.png';
                    break;
                case 'Clear':
                    image.src = './img/clear.png';
                    break;
                case 'Snow':
                    image.src = './img/snow.png';
                    break;
                case 'Wind':
                    image.src = './img/mist.png';
                    break;
                default:
                    image.src = '';
                    break;
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('FadeIn');
            weatherDetails.classList.add('FadeIn');
            container.style.height = '590px';
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
        });
});
