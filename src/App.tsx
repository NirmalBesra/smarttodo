import { useEffect } from 'react'

import './App.css'

function App() {
 // const [count, setCount] = useState(0)

 
 const handleSubmit  = (e:React.MouseEvent<HTMLButtonElement>)=> {
  e.preventDefault();
  console.log("button was pressed");
 }

 const Submit = ()=>{};
 useEffect(()=>{
  const handleKeyPress = (e:KeyboardEvent) =>{
    if(e.key==='Enter') 
      {
      console.log("enter was pressed");
      Submit();
    }
  }
  window.addEventListener("keydown", handleKeyPress);
  return ()=> {
    window.removeEventListener("keydown", handleKeyPress);
  }
 },[])
  return (
    <form className="formBody">
          <label className="lbl" htmlFor="taskName">Task Name</label>
          <input type='text' name='taskName' placeholder='Task Name'/>
          
          <label className="lbl" htmlFor="dropDown">Type</label>
          <select className="typeDropDown" name="dropDown">
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Urgent">Urgent</option>
          </select>
          <div className="buttonDiv">
            <button className="button" onClick={handleSubmit}> 
              <div className="button-outer">
                <div className="button-inner">
                  <span>Add</span>
                </div>
              </div>
            </button>
            <button className="button" onClick={handleSubmit}> 
              <div className="button-outer">
                <div className="button-inner">
                  <span>Cancel</span>
                </div>
              </div>
            </button>
          </div>
          
    </form>
  )
}

export default App
