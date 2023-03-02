// Apis and the api id
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// Api id = 2dad0eefa1c203debff2091ae62915fa
// `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${api}&units=metric`)
const weatherDetails = document.querySelector('.weather-details')
const wrapper = document.getElementById('wrapper')
const laoder = document.getElementById('loader')
const userWeather = document.getElementById('user-weather');
const weatherBox = document.getElementById('weather-box')
const yourweather = document.getElementById('geo-weather');
const searchWeather = document.getElementById('search-weather')
const weatherType = document.querySelector('.weather-type');
const weatherImg = document.getElementById('weather-img');
const humidity = document.getElementById('humidity');
const windspeed = document.getElementById('windspeed');
const clouds = document.getElementById('clouds');
const cityName = document.getElementById('city');
const btn = document.getElementById('btn');
const showWeather = document.getElementById('show-weather')
const input = document.getElementById('input');
const permission = document.querySelector('.permission-div')
const failed = document.getElementById('failed');
const countryImg = document.getElementById('country');
let api = '2dad0eefa1c203debff2091ae62915fa'
let iconUrl = 'http://openweathermap.org/img/wn/10d@2x.png'

// geolocation api
permission.addEventListener('click',geolocation)
function geolocation(){
    if(navigator.geolocation){
        laoder.classList.add('display')
        navigator.geolocation.getCurrentPosition(onSuccess,onFailure);
    } else {
        body.innerHTML = 'Geo location not supported in this device'
    }
    
}
const onSuccess = (position) => {
    failed.style.opacity = 0;
    yourweather.classList.add('border')
    permission.style.display = 'none'
    weatherBox.classList.add('geo-weather');
    weatherBox.classList.remove('hidden-geo-weather');
    laoder.classList.remove('display');
    getWeather1(position)
}
const onFailure = (err)=>{
    failed.textContent = 'Unable to access the location'
    failed.style.display = 'block'
}



// function to get user's geolocation and display the weather
async function getWeather1(position){
    try{
       laoder.classList.add('display')
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${api}&units=metric`);
        let data = await response.json();
        showWeather.innerHTML = data.main.temp;
        weatherType.innerHTML = data.weather[0].main;
        cityName.innerHTML = data.name;
        windspeed.innerHTML = data.wind.speed;
        clouds.innerHTML = data.clouds.all + ' %';
        humidity.innerHTML = data.main.humidity;
        let icons = data.weather[0].icon;
        let img = data.sys.country.toLowerCase();
        weatherImg.src = `http://openweathermap.org/img/wn/${icons}@2x.png`
        countryImg.src = `https://flagcdn.com/144x108/${img}.png `;
        laoder.classList.remove('display');
        console.log(data)
    }catch(err){
        showWeather.innerHTML = 'Enter Valid city Name'
    }
}

// function to allow user to enter a city and get the weather info
async function getWeather2(city){
    try{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`);
        let data = await response.json();
        weatherDetails.style.opacity =1;
        showWeather.innerHTML = data.main.temp;
        weatherType.innerHTML = data.weather[0].main;
        cityName.innerHTML = data.name;
        windspeed.innerHTML = data.wind.speed;
        clouds.innerHTML = data.clouds.all + ' %';
        humidity.innerHTML = data.main.humidity;
        let icons = data.weather[0].icon;
        weatherImg.src = `http://openweathermap.org/img/wn/${icons}@2x.png`
        let img = data.sys.country.toLowerCase();
        countryImg.src = `https://flagcdn.com/144x108/${img}.png `;
        laoder.classList.remove('display');
        console.log(data)
    }catch(err){
        laoder.classList.remove('display')
        weatherDetails.style.opacity =0;
        showWeather.innerHTML = ''
        weatherType.innerHTML = ''
        cityName.innerHTML =''
        windspeed.innerHTML =''
        clouds.innerHTML = ''
        humidity.innerHTML =''
        let icons = ''
        weatherImg.src = ''
        
        countryImg.remove()
        showWeather.innerHTML = 'Enter Valid city Name'
    }
}

function getCity (){
    const cityName = input.value;
    weatherBox.classList.add('geo-weather');
    weatherBox.classList.remove('hidden-geo-weather');
    weatherBox.style.opacity = 1;
    laoder.classList.add('display');
    getWeather2(cityName)
}
input.addEventListener('keypress',(e)=>{
    if(e.key==='Enter'){
        getCity()
    }
   
});
btn.addEventListener('click',getCity)

searchWeather.addEventListener('click',()=>{
    searchWeather.classList.add('border')
    yourweather.classList.remove('border')
    userWeather.style.opacity = 1;
    weatherBox.style.opacity = 0;
    permission.style.display = 'none'
})
yourweather.addEventListener('click',showYourWeather)
function showYourWeather(){
    userWeather.style.opacity = 0;
    yourweather.classList.add('border')
    searchWeather.classList.remove('border')
    weatherBox.style.opacity = 1;
    geolocation();
}









