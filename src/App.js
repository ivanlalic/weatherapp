import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/header';
import Form from './components/Form';
import Weather from './components/weather';
import Error from './components/error';

function App() {

  //States
  const [search, setSearch] = useState({
    city: '',
    country: ''
  });

  const [call, setCall] = useState(false);

  const [result, setResult] = useState({});

  const [error, setError] = useState(false);



  const {city, country} = search;

  useEffect( () => {
    const callAPI = async () => {

      if(call) {
        const appId = '7e8f58d26312cb40a9b7aeaa63db7a51';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

      const answer = await fetch(url);
      const answerJson = await answer.json();

      setResult(answerJson);
      setCall(false);

      // Detect if city not found
      
      if(answerJson.cod === '404') {
          setError(true);
      } else {
          setError(false);
      }
      }
      
  }

    callAPI();
    //eslint-disable-next-line
  }, [call] );


  let component;
  if (error) {
    component = <Error message="No results" />
  } else {
    component = <Weather 
                  result={result}
                />
  }


  return (
    <Fragment>
      <Header 
        title='Weather React App'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form 
                search={search}
                setSearch={setSearch}
                setCall={setCall}
              />
            </div>
            <div className="col m6 s12">
              {component}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
