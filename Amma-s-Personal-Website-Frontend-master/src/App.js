import { Routes, Route } from "react-router-dom"
import MainLayout from "./Layout"
import {KindeProvider} from "@kinde-oss/kinde-auth-react";

const App = () => {
  
  return(
    <KindeProvider
		clientId="9abb6770b3374fc6b10da5d3ae53de24"
		domain="https://prose.kinde.com"
		redirectUri="https://prose.onrender.com"
		logoutUri="https://prose.onrender.com"
	>
    <Routes>
         <Route path="/" element={<MainLayout/>}/>
    </Routes>
    </KindeProvider>   
  )
  
}

export default App 