import './CurrentWeather.css'
import { format, parse } from 'date-fns';

const getDayAndHHMM = (rawdate) => {
    const date = parse(rawdate, 'yyyy-MM-dd HH:mm', new Date());
    return format(date, 'EEEE, h:mm a')
}

const CurrentWeather = ({ data, location }) => {
    const { localtime, name } = location;
    const { temp_c, condition, feelslike_c, maxtemp_c, mintemp_c,
        wind_kph, humidity, uv,
    } = data;
    return (
        <div className="current-weather">
            <div className="card left-card">
                <div>
                    <h2>{name}</h2>
                    <h1 className='temp'>{Math.round(temp_c)}</h1>
                    <p> ↑{Math.round(maxtemp_c)}° / {Math.round(mintemp_c)}°</p>
                    <p>Feels like {feelslike_c}°</p>
                    <p>{getDayAndHHMM(localtime)}</p>
                </div>
                <div className="condition">
                    <img src={condition.icon} alt={condition.text}
                </div>
            </div>

            <div className="card right-card">

            </div>
        </div>
    )
}

export default CurrentWeather;