import { Routes, Route } from "react-router-dom"
import { useSelector } from 'react-redux';
import Admin from "./pages/Admin"
import MainLayout from "./Layout"
import SkeletonCard from "./Components/SkeletonCard";

const App = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  console.log(isAuthenticated)
  
  return(
  
    <Routes>
         <Route path="/" element={<MainLayout/>}/>
         <Route path="admin" element={<Admin/>}/>
         <Route path="load" element={<SkeletonCard/>}/>
    </Routes>
    
  )
  
}

export default App 