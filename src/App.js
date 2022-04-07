import './App.css';
import { data } from './data';
import { useState } from 'react';
import { pictures } from './pictures';

function App() {
  const [placesList, setPlacesList] = useState(data);
  const [textLength, setTextLength] = useState(false);
  const [additionalPic, setAdditionalPic] = useState(0);
  const {src, name} = pictures[additionalPic];

  const showTextClick = (item) => {
    item.showMore = !item.showMore;
    setTextLength(!textLength);
  }

  const removePlace = (id) => {
    let newList = placesList.filter(i => i.id !== id);
    setPlacesList(newList);
  }

  const deleteAllPlaces = () => {
    setPlacesList([]);
  }

  const nextPic = () => {
    setAdditionalPic(( additionalPic => {
      additionalPic ++;
      if (additionalPic > pictures.length -1) {
        additionalPic = 0;
      }
      return additionalPic;  
    }))
  }

  const prevPic = () => {
    setAdditionalPic((additionalPic => {
      additionalPic --;
      if (additionalPic <0) {
        return pictures.length -1;
      }
      return additionalPic;
    }))
  }


  return (
    <div className="container">
      <h1>Top {placesList.length} Places You Should Visit in Europe</h1>

    {placesList.map((i => {
      const {id, city, country, img, info, showMore} = i;

      return (
        <div>
            <div key={id} className="container">
              <h2>{city}, {country}</h2>
              <img src={img} alt='city' className='city_pic'/>
              <p>{showMore ? info : info.substring(0,200) + '...'}
              <button className='showMoreBtn' onClick={() =>showTextClick(i)}>{showMore ? "Show less" : "Show more"}</button>
              </p>
              <button className='deleteEach' onClick={() => removePlace(id)}>I've already been there</button>
            </div>
        </div>
      )
    }))}

    <button className='DeleteAll' onClick={deleteAllPlaces}>I don't want to go anywhere</button>


      <div className='container howToDeletr'>
        <h3>To see more pictures click the buttons below</h3>
        <img className='city_pic' alt="city" src={src}/>
        <p>{name}</p>
        <div>
          <button className='slider' onClick={prevPic}>Prev</button>
          <button className='slider' onClick={nextPic}>Next</button>
        </div>
      </div>

    </div>
  );
}

export default App;