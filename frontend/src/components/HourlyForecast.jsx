import { format, parse } from 'date-fns';
import './HourlyForecast.css';

const HourlyForecast = ({ data }) => {
    return (
        <div className="hourly-container card">
            {data.map((hour, index) => {
                return (
                    <div className="hour-card" key={index}>
                        <div className="hero-time">
                            {format(parse(hour.time, 'yyyy-MM-dd HH:mm', new Date()), 'h a')}
                        </div>
                        <img src={`https:${hour.condition.icon}`} alt={hour.condition.text} />
                        <div className="hour-temp">{Math.round(hour.temp_c)}</div>
                        <div className="hour-rain">🌧️ </div>
                    </div>
                )

            })}
        </div>
    )
}

export default HourlyForecast