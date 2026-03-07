import { useEffect, useState } from 'react'

import './App.css'
import { useNavigate } from 'react-router-dom';

function FormUI() {
 // const [count, setCount] = useState(0)
//form states
 const [taskName, setTaskName] = useState("");
 const [priority, setPriority] = useState("");
  const [desc, setDesc] = useState("");
 const [error, setError] = useState("");
 const [showPopup, setShowPopup] = useState(false);

 const handleSubmit  = (e?:React.MouseEvent<HTMLButtonElement>)=> {
  e?.preventDefault();
  console.log("button was pressed");
  if(taskName.trim()===''){
    setError("Task name is required for submittion");

  }
  else if(priority.trim()===''){
    setError("Priority is required for submittion");

  }else if(desc.trim()===''){
    setError("description is required for submittion");

  } else {
    Submit();
  }

  

 }
const navigate = useNavigate();
 const Submit = async ()=>{
 // const [error, setError] = useState<string | null>(null);
  const data = {taskname:taskName,priority:priority,desc:desc};
    try {
      const res = await fetch('http://localhost:8181/posttodo',{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data),
         
      });
      if(res.ok){
        const result = await res.json();
        console.log('Success', result);
        setShowPopup(true);
        setTimeout(()=>{
          navigate("/")
        },2000);

      }else{
        console.log("submition failed");
      }

    }
    catch(err){
      console.log(err);
    }

 };

 const handleCancel = ()=>{
  navigate("/");
 }


 useEffect(()=>{
  const handleKeyPress = (e:KeyboardEvent) =>{
    if(e.key==='Enter') 
      {
      //console.log("enter was pressed");
      handleSubmit();
    }
  }
  window.addEventListener("keydown", handleKeyPress);
  return ()=> {
    window.removeEventListener("keydown", handleKeyPress);
  }
 },[])
  return (
  <div>
    <form className="formBody">
          <label className="lbl" htmlFor="taskName">Task Name</label>
          <input type='text' className="taskNameInput" name='taskName' placeholder='Task Name' onChange={(e)=> setTaskName(e.target.value)}/>
          
          <label className="lbl" htmlFor="dropDown">Type</label>
          <select className="typeDropDown"  name="dropDown" onChange={(e)=>{setPriority(e.target.value)}}>
            <option >Select the priority</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Urgent">Urgent</option>
          </select>

            <label className="lbl" htmlFor="desc">Description</label>
          <textarea name='description'className="descText" placeholder='description' onChange={(e)=> setDesc(e.target.value)}/>

          <div className="buttonDiv">
            <button className="button" onClick={handleSubmit}> 
              <div className="button-outer">
                <div className="button-inner">
                  <span>Add</span>
                </div>
              </div>
            </button>
            <button className="button" onClick={handleCancel}> 
              <div className="button-outer">
                <div className="button-inner">
                  <span>Cancel</span>
                </div>
              </div>
            </button>
            
          </div>
          {error && <p className="errorClass">{error}</p>}
          
    </form>
    {showPopup && (<div className="overlay">
            <div className='popup'>
                  <h4>Your task has been created</h4>
            </div>
            </div>)}
    </div>
  )
}

export default FormUI;
