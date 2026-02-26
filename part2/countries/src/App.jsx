import { useState, useEffect } from 'react'
import { getAll } from './services/countries'
import { getWeather } from './services/weather'
import { CountryInfo, TenCountries } from './components/Country'
import { Weather } from './components/Weather'
import { Error } from './components/Error'
import './index.css'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchWord, setSearchWord] = useState('')
  const [countryInfo, setCountryInfo] = useState(null)
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    getAll()
      .then(initialCountries => {
        setError(null)
        setCountries(initialCountries)
      })
      .catch(error => {
        console.log(error)
        setError('Failed to get countries data. Try again later.')
        setCountries([])
      })
  }, [])

  useEffect(() => {    
    if(countryInfo) {      
      getWeather(countryInfo.latlng[0], countryInfo.latlng[1])
        .then(weatherInfo => {
          setError(null)
          setWeather(weatherInfo)
        })
        .catch(error => {
          console.log(error)
          setError('Failed to get weather data. Try again later.')
          setWeather(null)
        })
    } else {
      setWeather(null)
    }
  }, [countryInfo])

  //  countries being listed depend on this
  const searchResults = searchWord 
    ? countries.filter(c => c.name.common.toLowerCase().includes(searchWord.toLowerCase().trimStart())) 
    : []

  useEffect(() => {    
    if(searchResults.length === 1) {
      setCountryInfo(searchResults[0])
    } else if(searchResults.length > 10) {
      setCountryInfo(null)
    }    
  }, [searchResults])  

  //  display the search results if there are more than 1 country
  const ListCountries = ({ countries }) => {
      if(countries.length === 1) return null      
      
      if(countries.length > 10) return <p>{`Found ${countries.length} matches. Please be more specific.`}</p>

      return <TenCountries countries={countries} onShow={handleShow} />
  }  

  const handleShow = id => id ? setCountryInfo(countries.find(c => c.cca3 === id)) : null

  const handleSearch = event => {
    setSearchWord(event.target.value)
    setCountryInfo(null)
  }


  return (
    <div>
      <label className="findLabel">Find Countries 
        <input value={searchWord} onChange={(e) => handleSearch(e)} />
      </label>

      <Error message={error} />

      <ListCountries countries={searchResults} />

      <CountryInfo country={countryInfo} />

      <Weather weather={weather} capital={countryInfo ? countryInfo.capital : null} />
      
    </div>
  )
}
export default App