export const Weather = ({ weather, capital }) => {   
    if(weather) {
        // console.log('weather', weather.weather[0].icon)

        // const imgUrl = `https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`
        const imgUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    
        return (
            <article>
                <h1>{`Weather in ${capital}`}</h1>
                <p>{`Temperature ${weather.main.temp}\u00B0C`}</p>
                <img src={imgUrl}/>
                <p>{`Wind ${weather.wind.speed}m/s`}</p>
            </article>
        )
    }
}