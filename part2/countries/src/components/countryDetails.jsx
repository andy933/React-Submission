import { useState, useEffect } from 'react'
import axios from 'axios'

const countryDetails = ({ filterObject }) => {
    const [weather, setWeather] = useState([])
    const capital = filterObject.capital[0]
    const tld = filterObject.tld[0].replaceAll('.', ',')
    const api_key = import.meta.env.VITE_SOME_KEY

    //ex. https://api.openweathermap.org/data/2.5/weather?q=Kuwait%20City,kw&APPID=c0bcb3eb53158e323c17ff25e702e215
    //ex2. https://api.openweathermap.org/data/2.5/weather?q=Bern,ch&APPID=c0bcb3eb53158e323c17ff25e702e215
    
    useEffect(() => {
        console.log('captial is: ', capital)
        axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${capital}${tld}&APPID=${api_key}`
        )
        .then((response) => {
            setWeather([response.data])
            console.log([weather[0].main.temp])
            console.log([weather[0].wind.speed])
        })  
      }, [])


    return (
        <>
            <h2> {filterObject.name.common} </h2>
            <p> capital {filterObject.capital} </p>
            <p> area {filterObject.area} </p>
            <h3> languages: </h3>
            <ul>
                {
                Object.entries(filterObject.languages)
                .map(([key, value]) => 
                    <li key = {key}> {value} </li>)
                }
            </ul>
            <img src = {filterObject.flags.png} ></img>
            {weather.length > 0 && (
                <>
                    <h3> Weather in {capital} </h3>
                    <p> temperature -{weather[0].main.temp} Celcius </p>
                    <img src = {`https://openweathermap.org/img/wn/${weather[0].weather[0].icon}@2x.png`}></img>
                    <p> wind {weather[0].wind.speed} m/s</p>
                </>   
            )}
        </>
    )
}

export default countryDetails