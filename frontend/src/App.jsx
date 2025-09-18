
import { useState, useEffect } from 'react'
import './App.css'
import { getWeatherData } from './api';
import SearchBar from './components/SearchBar';
import { parse } from 'date-fns';
import CurrentWeather from './components/CurrentWeather';

const getGradientClass = (hour) => {
  if (hour >= 6 && hour < 9) return 'bg-sunrise';
  if (hour >= 9 && hour < 17) return 'bg-day';
  if (hour >= 17 && hour < 20) return 'bg-sunset';
  return 'bg-night';
}

function App() {
  const [city, setCity] = useState("Auckland");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const hours = weatherData?.location?.localtime
    ? parse(
      weatherData.location.localtime,
      'yyyy-MM-dd HH:mm',
      new Date()
    ).getHours()
    : new Date().getHours();

  const gradientClass = getGradientClass(hours);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await getWeatherData(city)

        const { mintemp_c, maxtemp_c } = data.forecast.forecastday[0].day

        setWeatherData({
          current: { ...data.current, mintemp_c, maxtemp_c },
          hourly: data.forecast.forecastday[0].day,
          weekly: data.forecast.forecastday.slice(1),
          location: data.location
        })
      } catch (e) {
        setError('Error:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather()
  }, [city])

  return (
    <div className={`app ${gradientClass}`}>
      <div className="container">
        <SearchBar onSearch={setCity} />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weatherData && (
          <>
            <CurrentWeather data={weatherData.current} location={weatherData.location} />
            <HourlyForecast data={weatherData.hourly} />
            <WeeklyForecast data={weatherData.weekly} />
          </>
        )}
      </div>
    </div>
  )
}

export default App
