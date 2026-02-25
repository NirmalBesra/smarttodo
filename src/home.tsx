

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faRefresh, faTrash  } from '@fortawesome/free-solid-svg-icons';
import { Route, useNavigate } from "react-router-dom";

import './App.css';

const  Home = () => {
type Card = {
  id: number,
  taskname:string,
  priority: string,
  desc: string,
  isCompleted: boolean
};
const [cards , setCards] = useState<Card[]>([]);


const navigate = useNavigate();
useEffect(()=>{
      refreshCards();
},[]);

const refreshCards = ()=>{
      fetch("http://localhost:8181/getlist")
      .then((res)=>res.json())//.then((data)=>{setCards(data)});
      .then((data)=> setCards(data.map((card: Card)=>({
            ...card,
            isCompleted: card.isCompleted ?? false
      })))),

      console.log("cards were refreshed");
}

const deleteCard = async (id:any) =>{
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
const handleToggle = (id:number) => {
      setCards(prev => 
            prev.map( card => 
                  card.id === id
                        ? {...card, isCompleted: !card.isCompleted}
                        :card
      ));
}

const navigateToNew = () =>{
 navigate("/Add")

};
       return <div className='homeBody'>
                   <div className='cardHeader'><span onClick={navigateToNew}><FontAwesomeIcon icon={faAdd } /></span> <h3>Smart Todo</h3><span onClick={refreshCards}><FontAwesomeIcon icon={faRefresh } /></span></div>
                    <div className='cardBody'>
                        {
                              cards.map((card)=>(<div key={card.id} className="card">
                                    <div className='taskName'><span className='taskNameSpan'>{card.taskname}</span> <div className={`toggle ${card.isCompleted ? "active" : ""}`} onClick={()=> handleToggle(card.id)}> <div className="circle"></div></div></div>
                                    <div className='priority'><span>{card.priority}</span> <span onClick={()=>deleteCard(card.id)}><FontAwesomeIcon icon={faTrash } /></span></div>
                              </div>))
                        }

                    </div>
                    
              
              </div>;
              
}
export default Home;


