

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash  } from '@fortawesome/free-solid-svg-icons'
import './App.css';
const  Home = () => {
type Card = {
  id: number,
  taskname:string,
  priority: string,
  desc: string
};
const [cards,setCards] = useState<Card[]>([]);

useEffect(()=>{
      fetch("http://localhost:8181/getlist")
      .then((res)=>res.json())
      .then((data)=> setCards(data));
},[]);

const deleteCard = async (id:string) =>{
      console.log("delete called");
      try {
            await fetch('http://localhost:8181/deletetodo', {
                  method: "DELETE",
                  headers: 
                        {
                              "Content-Type": "application/json"
                        },
                  body: JSON.stringify({
                        "id":`${id}`
                  })
                  
            });
            setCards(cards.filter(card=> card.id !==id));
      }
      catch (error) {
            console.log(error);
      }
};
       return <div className='homeBody'>
                    <h3>Smart Todo</h3>
                    <div className='cardBody'>
                        {
                              cards.map((card)=>(<div key={card.id} className="card">
                                    <div className='taskName'><span className='taskNameSpan'>{card.taskname}</span></div>
                                    <div className='priority'><span>{card.priority}</span> <span onClick={deleteCard}><FontAwesomeIcon icon={faTrash } /></span></div>
                              </div>))
                        }

                    </div>
              </div>;
}
export default Home;