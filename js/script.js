const apiKey = '984c12fcc86144adab1170154221512';

//Selecão de elementos do HTML
let initialInput = document.querySelector('.input-city');
let inputDashboard = document.querySelector('.dashboard')
let searchDashboard = document.querySelector('.search-dashboard')
let searchInput = document.querySelector('.search')
let inputArea = document.querySelector('.input-area');
let weatherArea = document.querySelector('.weather-area');


let forecastDay1 = document.querySelector('.day-1')
let forecastDay2 = document.querySelector('.day-2')
let forecastDay3 = document.querySelector('.day-3')
let forecastDays = document.querySelectorAll('.forecast-days')



//Obter Datas
const dayHour = new Date();
const today = dayHour.getDate();
const week = dayHour.getDay();
const month = dayHour.getMonth();
const year = dayHour.getFullYear();
const hour = dayHour.getHours();
const minute = dayHour.getMinutes();
const second = dayHour.getSeconds();

//Pegar dia de amanhã e depois

const getTomorrow = new Date();
getTomorrow.setDate(getTomorrow.getDate() + 1)
const tomorrow = getTomorrow.getDate();

const getDayAfterTomorrow = new Date();
getDayAfterTomorrow.setDate(getDayAfterTomorrow.getDate() + 2)
const dayAfterTomorrow = getDayAfterTomorrow.getDate();


//Eventos

searchInput.addEventListener('click', () => {
    const city = initialInput.value;
    if (city === '') {
        alert('O campo não pode estar vazio')
        return
    } else {
    getWeather(city)
    showWeather(city)

    setTimeout(() => {
        inputArea.style.display = 'none';
        weatherArea.style.display = 'flex'
    },1000)}
})

initialInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
    const city = initialInput.value;
    if (city === '') {
        alert('O campo não pode estar vazio')
        return
    } else {
    getWeather(city)
    showWeather(city)

    setTimeout(() => {
        inputArea.style.display = 'none';
        weatherArea.style.display = 'flex'
    },1000)
    }}
})


searchDashboard.addEventListener('click', () => {
    const city2 = inputDashboard.value
    if (city2 === '') {
        alert('O campo não pode estar vazio')
        return
    } else {
    getWeather(city2)
    showWeather(city2)
    inputDashboard.value = '';
    }
})

inputDashboard.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city2 = inputDashboard.value

        if(city2 === ''){
            alert('O campo não pode estar vazio')
            return
        } else {
        getWeather(city2)
        showWeather(city2)
        inputDashboard.value = '';
    }}
})



//Funções

//Pegar dados do clima em JSON
const getWeather = async (city) => {
    const forecastURL =`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=yes&alerts=no&lang=pt`
    const forecastResult = await fetch(forecastURL);
    const forecastJSON = await forecastResult.json();
    return forecastJSON
}


const showWeather = async (city) => {
    const todaysWeather = await getWeather(city);
    const temperature = todaysWeather.current.temp_c

    //Inserindo dados no HTML

    const cityName = todaysWeather.location.name;
    document.querySelector('.city').innerHTML = cityName;

    document.querySelector('.temperature').innerHTML = `${temperature.toFixed(0)}°C`
    document.querySelector('.feels-like').innerHTML = `Sensação térmica: ${(todaysWeather.current.feelslike_c).toFixed(0)}°C`

    document.querySelector('.weekday').innerHTML = getWeekDay(week);
    document.querySelector('.today').innerHTML = `${today} de ${getMonth(month)} de ${year}`
    document.querySelector('.updated_at').innerHTML = `Atualizado às ${zeroFix(hour)}:${zeroFix(minute)}:${zeroFix(second)}`
    
    document.querySelector('.day-1').innerHTML = `${today}/${month+1}`
    document.querySelector('.icon-1').innerHTML = `<img src="https:${todaysWeather.forecast.forecastday[0].day.condition.icon}">`;
    document.querySelector('.cond-1').innerHTML = todaysWeather.forecast.forecastday[0].day.condition.text;
    document.querySelector('.max1').innerHTML = `${(todaysWeather.forecast.forecastday[0].day.maxtemp_c).toFixed(0)}°`
    document.querySelector('.min1').innerHTML = `${(todaysWeather.forecast.forecastday[0].day.mintemp_c).toFixed(0)}°`
    
    document.querySelector('.day-2').innerHTML = `${tomorrow}/${(month+1)}`
    document.querySelector('.icon-2').innerHTML = `<img src="https:${todaysWeather.forecast.forecastday[1].day.condition.icon}">`;
    document.querySelector('.cond-2').innerHTML = todaysWeather.forecast.forecastday[1].day.condition.text;
    document.querySelector('.max2').innerHTML = `${(todaysWeather.forecast.forecastday[1].day.maxtemp_c).toFixed(0)}°`
    document.querySelector('.min2').innerHTML = `${(todaysWeather.forecast.forecastday[1].day.mintemp_c).toFixed(0)}°`
    
    document.querySelector('.day-3').innerHTML = `${dayAfterTomorrow}/${(month+1)}`
    document.querySelector('.icon-3').innerHTML = `<img src="https:${todaysWeather.forecast.forecastday[2].day.condition.icon}">`;
    document.querySelector('.cond-3').innerHTML = todaysWeather.forecast.forecastday[2].day.condition.text;
    document.querySelector('.max3').innerHTML = `${(todaysWeather.forecast.forecastday[2].day.maxtemp_c).toFixed(0)}°`
    document.querySelector('.min3').innerHTML = `${(todaysWeather.forecast.forecastday[2].day.mintemp_c).toFixed(0)}°`
    
    document.querySelector('.clouds-pct').innerHTML = `${todaysWeather.current.cloud} %`
    document.querySelector('.clouds-description').innerHTML = `${todaysWeather.current.condition.text}`
    document.querySelector('.rain-pct').innerHTML = `${todaysWeather.forecast.forecastday[0].day.daily_chance_of_rain} %`
    
    let resultsUV = todaysWeather.forecast.forecastday[0].day.uv
    document.querySelector('.uv-results').innerHTML = `${getuvResults(resultsUV)}`
    document.querySelector('.uv').innerHTML = todaysWeather.forecast.forecastday[0].day.uv

    document.querySelector('.windspeed').innerHTML = `${(todaysWeather.current.wind_kph).toFixed(0)} <span class="km">km/h</span>`
    document.querySelector('.winddirection').innerHTML = `${(todaysWeather.current.wind_dir)}`

    let sunrise = todaysWeather.forecast.forecastday[0].astro.sunrise
    sunrise = sunrise.substring(0, sunrise.length - 2)

    let sunset = todaysWeather.forecast.forecastday[0].astro.sunset
    sunset = sunset.substring(0, sunset.length - 2);


    document.querySelector('.sunrise-time').innerHTML = sunrise
    document.querySelector('.sunset-time').innerHTML = sunset

    let humidityResults = todaysWeather.current.humidity;
    document.querySelector('.humidity-pct').innerHTML = `${todaysWeather.current.humidity} %`
    document.querySelector('.humidity-results').innerHTML = gethumidityResults(humidityResults);

    let visibility = todaysWeather.current.vis_km
    document.querySelector('.visibility').innerHTML = `${visibility} km`
    document.querySelector('.visibility-results').innerHTML = getVisibilityResults(visibility);


    let airQuality = todaysWeather.current.air_quality['us-epa-index']; //usei colchetes para acessar o us-epa-index porque da erro
    //sempre que for acessar alguma propriedade que possuir hifen usar colchetes
    document.querySelector('.air-quality').innerHTML = airQuality;
    document.querySelector('.air-quality-results').innerHTML = getAirResults(airQuality);

}


//Transformando dias da semana em texto
function getWeekDay(week) {
   switch (week) {
    case 0:
        return 'Domingo';
    break;
    case 1:
        return 'Segunda-Feira';
    break;
    case 2:
        return 'Terça-Feira';
    break;
    case 3:
        return 'Quarta-Feira'
    break;
    case 4:
        return 'Quinta-Feira'
    break;
    case 5:
        return 'Sexta-Feira'
    break;
    case 6:
        return 'Sábado'
   }
}

//Transformando Mês em Texto e corrigindo 

function getMonth(month) {
    switch (month) {
        case 0:
            return 'Janeiro';
        break;
        case 1:
            return 'Fevereiro';
        break;
        case 2:
            return 'Março';
        break;
        case 3:
            return 'Abril'
        break;
        case 4:
            return 'Maio'
        break;
        case 5:
            return 'Junho'
        break;
        case 6:
            return 'Julho'
        break;
        case 7:
            return 'Agosto'
        break;
        case 8:
            return 'Setembro'
        break;
        case 9:
            return 'Outubro'
        break;
        case 10:
            return 'Novembro'
        break;
        case 11:
            return 'Dezembro'
       }
    }

//Arrumando o Zero a esquerda

function zeroFix(num) {
    if (num < 10) {
        return `0${num}`
    } else {
        return num
    }
}

function getuvResults (uv) {
    if (uv <= 2) {
        return 'Baixo'
    } else if (uv <= 5) {
        return 'Moderado'
    } else if (uv <= 7) {
        return 'Alto'
    } else if (uv <= 10) {
        return 'Muito alto'
    } else {
        return 'Extremo'
    }
}

function gethumidityResults(hum) {
    if (hum >= 40 && hum <= 70 ) {
        return 'Normal'
    } else if (hum < 40) {
        return 'Baixa'
    } else {
        return 'Alta'
    }
}

function getVisibilityResults (vis) {
    if (vis <= 5 ) {
        return 'Ruim'
    } else if (vis < 10) {
        return 'Pouca'
    } else if (vis < 20) {
        return 'Normal'
    } else {
        return 'Boa'
    }
}

function getAirResults (air) {
    switch (air) {
        case 1:
            return 'Boa'
            break;
        case 2:
            return 'Moderada'
            break;
        case 3:
            return 'Ruim'
        case 4:
            return 'Muito Ruim'
            break;
        case 5:
            return 'Horrível'
            break
        case 6:
            return 'Tóxico'
            break;
    }   
    
    
}
