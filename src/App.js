import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [endPoint, setEndPoints] = useState('');

  const [container, setContainer] = useState([]);

  const [finalPoint,setFinalPoint] = useState('');

  useEffect(() => { // we use this useEffect function to re-render the component
    fetchMe()
  }, [finalPoint]);

  const fetchMe = () => {
    fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=+${endPoint}`, {
      "method": 'GET',
      "headers": {
        'X-RapidAPI-Key': '4def764680msh7122065e7430142p1075b8jsn09c179ebd39b',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setContainer(data.d);
      })
      .catch(err => {
        console.error(err);
      });
  }
  const onChangeHandle = (e) => {
    setEndPoints(e.target.value);
  }
  const submitHandler = e => {
    e.preventDefault();
    setFinalPoint(endPoint);
  }
  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <input type="text" value={endPoint} onChange={onChangeHandle} />
        <button tyep="submit">Submit</button>
      </form>
      <div className="element">
        {container.map((item,index)=>{
          return(
            <div key={index} className='element-div'>
              <img src={item.i.imageUrl} alt=""/>
              <p className='title'>{item.l}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
