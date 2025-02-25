import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filterName, setFilterName] = useState('')
  const [official, setOfficial] = useState('')

  useEffect(() => {
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => {
      //console.log(response.data)
      setCountries(response.data)
    })
  }, [])

  const handleChange = (event) => {
    setFilterName(event.target.value)
    setOfficial('')
  }

  const showDetails = (id) => {
    console.log('details of ' + id + ' needs to be toggled')
    setOfficial(id)
  }

  return (
    <>
      find countries <input value = {filterName} onChange= {handleChange} />
      <Countries countries = {countries} filterName = {filterName} showDetails = {showDetails} official = {official} />
    </>
  )
}

export default App
