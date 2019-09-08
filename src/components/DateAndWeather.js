import '../styles/DateAndWeather.scss'

import React, { useState, useEffect } from 'react'
import classnames from 'classnames'

import { fullDay, fullMonth } from '../utils/dateFormat'
import { openWeatherMapKey } from '../keys'
import { isEmpty } from '../utils/isEmpty'
import { capitalize } from '../utils/capitalize'
import iconCloudy from '../assets/iconCloudy.svg'
import iconRainy from '../assets/iconRainy.svg'
import iconSunny from '../assets/iconSunny.svg'
import iconSnowy from '../assets/iconSnowy.svg'
import iconClear from '../assets/iconClear.svg'

export default function DateAndWeather(props) {
  const today = new Date()
  const [weather, setWeather] = useState()

  useEffect(() => {
    getWeatherByLocation()
  }, [])

  function getWeatherByLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchWeather)
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  const fetchWeather = position => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=${openWeatherMapKey}`
    )
      .then(function(resp) {
        return resp.json()
      })
      .then(function(data) {
        setWeather(data)
      })
      .catch(function() {})
  }

  const { main, description } = isEmpty(weather) ? '' : weather.weather[0]
  const { temp_min, temp_max } = isEmpty(weather) ? '' : weather.main
  const { name } = isEmpty(weather) ? '' : weather

  return (
    <div
      className={classnames(
        'DateAndWeather p-5',
        { sunny: main === 'Sunny' },
        { cloudy: main === 'Clouds' },
        { rainy: main === 'Rain' },
        { snowy: main === 'Snow' },
        { clear: main === 'Clear' }
      )}
      style={{ color: 'black' }}
    >
      <h3>
        {`${fullDay[today.getDay()]}, ${today.getDate()} ${
          fullMonth[today.getMonth()]
        } ${today.getFullYear()}`}
      </h3>
      <div className='d-flex'>
        {main === 'Rain' && <img src={iconRainy} alt='Rainy' />}
        {main === 'Clouds' && <img src={iconCloudy} alt='Cloudy' />}
        {main === 'Sunny' && <img src={iconSunny} alt='Sunny' />}
        {main === 'Snow' && <img src={iconSnowy} alt='Snowy' />}
        {main === 'Clear' && <img src={iconClear} alt='Snowy' />}
        <div className='ml-4'>
          <label>{capitalize(description)}</label>
          <h2>
            {`${parseInt(temp_min)}${String.fromCharCode(176)}C - ${parseInt(
              temp_max
            )}${String.fromCharCode(176)}C`}
          </h2>
          <label>{name}</label>
        </div>
      </div>
    </div>
  )
}
