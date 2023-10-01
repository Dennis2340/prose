import { Routes, Route } from "react-router-dom"
import MainLayout from "./Layout"

const App = () => {
  
  return(
  
    <Routes>
         <Route path="/" element={<MainLayout/>}/>
    </Routes>
       
  )
  
}

export default App 