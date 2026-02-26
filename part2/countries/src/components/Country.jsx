export const CountryInfo = ({ country }) => {
    if(country) {
        return (
            <article>
                <h1>{country.name.common}</h1>
                <p>{`Capital: ${country.capital}`}</p>
                <p>{`Area: ${country.area}`}</p>

                <ListLanguages languages={country.languages} />              

                <img src={country.flags.png} className='imgFlag'/>
            </article>       
        )
    }
}

const ListLanguages = ({ languages }) => {
    if(languages) {
        return (
            <div>
                <h3>Languages:</h3>
                <ul>
                    {Object.entries(languages).map(([key, val]) =>
                        <li key={key}>{val}</li>
                    )}
                </ul>
            </div>
        )
    }
}

export const TenCountries = ({ countries, onShow }) => {
    return (      
        <ul>
            {countries.map(country =>
                <li key={`${country.cca3}`}>
                    {country.name.common}
                    <button onClick={() => onShow(country.cca3)}>Show</button>
                </li>
            )}
        </ul>
    )  
}