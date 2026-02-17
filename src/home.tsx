

import { useEffect, useState } from 'react';
import './App.css';
const  Home = () => {
const [cards,setCards] = useState([]);

useEffect(()=>{
      fetch("http://localhost:8181/getlist")
      .then((res)=>res.json())
      .then((data)=> setCards(data));
},[]);
       return <div className='homeBody'>
                    <h3>Smart Todo</h3>
                    <div className='cardBody'>
                        {
                              cards.map((card)=>(<div key={card.id} className="card">
                                    <div className='taskName'><span className='taskNameSpan'>{card.taskname}</span></div>
                                    <div className='priority'><span>{card.priority}</span></div>
                              </div>))
                        }

                    </div>
              </div>;
}
export default Home;