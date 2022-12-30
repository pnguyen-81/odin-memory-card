import React, { useState, useEffect, useReducer} from 'react'

function Game() {
    const [cards, setCards] = useState([
      {source : "url('http://localhost:3000/001.png')", key: '001'},
      {source : "url('http://localhost:3000/002.png')", key: '002'},
      {source : "url('http://localhost:3000/003.png')", key: '003'},
      {source : "url('http://localhost:3000/782.png')", key: '782'},
      {source : "url('http://localhost:3000/783.png')", key: '783'},
      {source : "url('http://localhost:3000/784.png')", key: '784'},
      {source : "url('http://localhost:3000/856.png')", key: '856'},
      {source : "url('http://localhost:3000/857.png')", key: '857'},
      {source : "url('http://localhost:3000/858.png')", key: '858'},
      {source : "url('http://localhost:3000/885.png')", key: '885'},
      {source : "url('http://localhost:3000/886.png')", key: '886'},
      {source : "url('http://localhost:3000/887.png')", key: '887'},
    ]);

    const [noPoint, setNoPoint] = useState([])

    const [point, setPoint] = useState(0)

    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const [highscore, sethighscore] = useState(0)

    const newHigh = () =>{
      if (point > highscore){
        sethighscore(point)
      }
    }

    const check = (e) =>{
      if (noPoint.includes(e.target.id)){
        setNoPoint([]);
        newHigh()
        setPoint(0);
      } else {
        setNoPoint([...noPoint, e.target.id]);
        setPoint(point+1)
      }
    }

    useEffect(() => {
      const shuffleCards = () => {
        for (var i = cards.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = cards[i];
          cards[i] = cards[j];
          cards[j] = temp;
        }
        setCards(cards);
        forceUpdate();
    }
    document.addEventListener('click', shuffleCards)

  return () =>{
    document.addEventListener('click', shuffleCards);
    }
}, []);

  return (
    <div>
      <div style={{color : 'white', fontSize: '80px'}}>Score:{point} | Highscore:{highscore}</div>
      <br></br>
      <div style={{
        display:'grid',
        width:'45%', 
        margin: 'auto', 
        alignContent:'center',
        gap: '20px', 
        gridTemplateRows: '200px 200px 200px auto', 
        gridTemplateColumns: '200px 200px 200px 200px'}}>
        {cards.map((poke)=>
      <div className='pokemon' id={poke.key} key={(poke.key)} style={{
        width: '200px',
        height: '200px',
        backgroundImage: poke.source, 
        backgroundColor:'lightgray', 
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
        }} onClick={check}></div>)}
          </div>
    </div>
  )
}

export default Game