import { format, parseISO } from 'date-fns'
import './WeeklyForecast.css';

const WeeklyForecast = ({ data }) => {
    return (
        <div className='day-container card'>
            {data.map((day, index) => {
                return (
                    <div className="day-card" key={index}>
                        <div className='day-label'>{format(parseISO(day.date), 'EEE')}</div>
                        <div className="day-rain">💧{day.day.daily_chance_of_rain}%</div>
                        <div className="day-condition">
                            <img src={day.day.condition.icon} alt={day.day.condition.text} className="condition-img" />
                            <span className='day-text'>{day.day.condition.text}</span>
                        </div>
                        <div className="day-temp">
                            {Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°
                        </div>
                    </div>
                )

            })}
        </div>
    )
}

export default WeeklyForecast