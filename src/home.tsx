

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
  isCompleted: number
};
const [cards , setCards] = useState<Card[]>([]);


const navigate = useNavigate();
useEffect(()=>{
      refreshCards();
},[]);

const refreshCards = ()=>{
      fetch("http://localhost:8181/getlist")
      .then((res)=>res.json())//.then((data)=>{setCards(data)});
      .then((data)=> {setCards(data);console.log("cards were refreshed");})//setCards(data.map((card: Card)=>({...card, isCompleted: card.isCompleted ?? 0 /*second ? allows for isCompleted field to be optional*/})))),

      
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
const  handleToggle = async (id:number) => {
      const currentCard = cards.find(card => card.id ===id);

      if (!currentCard) return;

      const updatedStatus  = currentCard.isCompleted === 0 ? 1: 0;

      setCards(prev => 
            prev.map( card => 
                  card.id === id
                        ? {...card, isCompleted: updatedStatus }//[{,Iscompleted = updatedStatus  },{},{}]
                        :card
      ));
      
      try {
            
           
            console.log(updatedStatus);
        const res = await fetch('http://localhost:8181/updateStatus',{
        method: "PUT",
        headers: {
          "Content-Type":"application/json"
        },
        body:JSON.stringify( {
            id: id,
            isCompleted: updatedStatus

        }),


      });
      if(res.ok){
        const result = await res.json();
        refreshCards();
        console.log('Success', result);

      }else{
        console.log("submition failed");
      }
      }
      catch(err){
            console.log(err);
      }
}

const navigateToNew = () =>{
 navigate("/Add")

};
       return <div className='homeBody'>
                   <div className='cardHeader'><span className="addIcon"  onClick={navigateToNew}><FontAwesomeIcon icon={faAdd } /></span> <h3>Smart Todo</h3><span className= 'refreshIcon' onClick={refreshCards}><FontAwesomeIcon icon={faRefresh } /></span></div>
                    <div className='cardBody'>
                        {
                              cards.map((card)=>(<div key={card.id} className="card">
                                    <div className='taskName'><span className='taskNameSpan'>{card.taskname}</span> <div className={`toggle ${card.isCompleted ? "active" : ""}`} onClick={()=> handleToggle(card.id)}> <div className="circle"></div></div></div>
                                    <div className='priority'><span>{card.priority}</span> <span className="trashSpan" onClick={()=>deleteCard(card.id)}><FontAwesomeIcon icon={faTrash } /></span></div>
                              </div>))
                        }

                    </div>
                    
              <div className="loading"></div>
              </div>;
              
}
export default Home;


