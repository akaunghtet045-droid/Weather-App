import './Weatherapp.css'
import searchicon from './search.png'
import clearicon from './clear.png'
import cloudicon from './cloud.png'
import drizzleicon from './drizzle.png'
import humidityicon from './humidity.png'
import rainicon from './rain.png'
import snowicon from './snow.png'
import windicon from './wind.png'
import { useEffect, useRef, useState } from 'react'

function Weatherapp() {

  const inputref = useRef()

  const[weatherdata,setweatherdata] = useState(false)

  const allicons = {
    '01d' : clearicon,
    '01n' : clearicon,
    '02d' : cloudicon,
    '02n' : cloudicon,
    '03d' : cloudicon,
    '03n' : cloudicon,
    '04d' : drizzleicon,
    '04n' : drizzleicon,
    '09d' : rainicon,
    '09n' : rainicon,
    '010d' : rainicon,
    '010n' : rainicon,
    '013d' : snowicon,
    '013n' : snowicon,
  }

  const search = async (city) => {

    if (city === "") {
      alert("Enter City Name")
      return
    }

    try {

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

      const res = await fetch(url)
      const data = await res.json()
      console.log(data)
      const icon = allicons[data.weather[0].icon] || clearicon
      setweatherdata({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
        
      })
      inputref.current.value = ""
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    search()
  },[])

  return (
    <div className='weather-card'>
      <div className='weather-searchbar'>
        <input ref={inputref} type="text" placeholder='Search'/>
        <img src={searchicon} onClick={() => search(inputref.current.value) } alt=""/>
      </div>
      <img src={weatherdata.icon} alt="" className='weathericon'/>
      <p className='temperature'>{weatherdata.temperature}°c</p>
      <p className='location'>{weatherdata.location}</p>
      <div className='weather-data'>
        <div className='col'>
          <img src={humidityicon} alt="" />
          <div>
            <p>{weatherdata.humidity} %</p>
            <span>humidity</span>
          </div>
        </div>
        <div>
          <img src={windicon} alt="" />
          <div>
            <p>{weatherdata.windspeed} Km/h</p>
            <span>Wind speed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weatherapp