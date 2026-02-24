import { useEffect } from 'react'
import {Routes, Route} from "react-router-dom";
import FormUI from './formUI';
import Home from './home';
import './App.css'

function App() {
 // const [count, setCount] = useState(0)

 
  return (
  <Routes>
  
    <Route path="/" element={<Home />} />
    <Route path="/Add" element={<FormUI />} />
  
</Routes>
  )
}

export default App
