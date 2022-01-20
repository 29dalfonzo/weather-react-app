import React, {useState} from 'react';
import './App.css';

const api = {
  key: '87d3e5d27e2378b08464bde97ffbab2f',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        })
        .catch(err => console.log(err));
    }
  }


  const datebuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={(typeof weather.main != "undefined")? ((weather.main.temp > 18)? 'warm':'cold'):'app'}>
      <main >
        <div className="container">
          <div className="row mb-3">
            <div className="col-12">
              <h5 className="card-title text-center">Weather Forecast</h5>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search. . ."
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
                />
              </div>
            </div>
          </div>
          {weather.main && (
            <>
          <div className="location-box">
            <h3 className="location text-center">{weather.name}, {weather.sys.country}</h3>
            <div className="date text-center">{datebuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="weather">
              {weather.weather[0].main}
            </div>
          </div>
          </>
          )}
          </div>
      </main>
    </div>
  );
}

export default App;
