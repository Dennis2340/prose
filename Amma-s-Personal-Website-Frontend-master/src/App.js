
import  Home  from "./pages/Home"
import { Registration } from "./pages/Registration"
import { Routes, Route,Switch, BrowserRouter as Router, Navigate, BrowserRouter } from "react-router-dom"
import { Layout } from "./Components/Layout"
import { Login, LoginPage } from "./pages/Login"
import { AddArticle } from "./appfeatures/articles/AddArticle"
import { EditArticle } from "./appfeatures/articles/EditArticle"
import { SingleArticle } from "./appfeatures/articles/SingleArticle"
import { Poem } from "./pages/Poem"
import { Articles } from "./pages/Articles"
import { Stories } from "./pages/Stories"
import { Video } from "./pages/Video"
import { About } from "./pages/About"
import { MotivationalMsg } from "./pages/MotivationalMsg"
import { SingleMotMsg } from "./appfeatures/motivationalmsg/SingleMotMsg"
import { EditMotMsg } from "./appfeatures/motivationalmsg/EditMotMsg"
import { AddMotMsg } from "./appfeatures/motivationalmsg/AddMotMsg"
import { AddPoem } from "./appfeatures/poems/AddPoem"
import { EditPoem } from "./appfeatures/poems/EditPoem"
import { SinglePoem }  from "./appfeatures/poems/SinglePoem"
import { AddStory }  from "./appfeatures/stories/AddStory"
import { EditStory }  from "./appfeatures/stories/EditStory"
import { SingleStory }  from "./appfeatures/stories/SingleStory"
import { AddVideo } from "./appfeatures/videos/AddVideo"
import { SingleVideo } from "./appfeatures/videos/SingleVideo"
import { useSelector } from 'react-redux';
import { EditUser } from "./appfeatures/about/EditUser"
import Admin from "./pages/Admin"


const App = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  console.log(isAuthenticated)
  
  
  return(
  
    <Routes>
         <Route path="/" element={<Layout/>}/>
         <Route path="admin" element={<Admin/>}/>
         {/* These are the poem routes */}
         <Route path="poems" element={<Poem/>}/>
          <Route  path="addpoem"  element={isAuthenticated ? <AddPoem/> : <Home/>}/>
          <Route path="editpoem/:id" element={isAuthenticated ? <EditPoem/> : <Home/>} />
          <Route path="singlepoem/:id" element={<SinglePoem/>} />
         
         {/* These are the stories routes */}
         <Route path="stories" element={<Stories/>}/>
         <Route path="addstory" element={isAuthenticated ? <AddStory/>: <Home/>}/>
         <Route path="editstory/:id" element={isAuthenticated ? <EditStory/>: <Home/>}/>
         <Route path="singlestory/:id" element={<SingleStory/>}/>

         {/* These are the are the article routes */}
         <Route path="articles" element={<Articles/>}/>
         <Route path="addarticle" element={isAuthenticated ? <AddArticle/>: <Home/>}/>
         <Route path="editarticle/:id" element={isAuthenticated ? <EditArticle/>: <Home/>}/>
         <Route path="singlearticle/:id" element={<SingleArticle/>}/>
         {/* These are the are the article routes */}
         
         <Route path="motmsg" element={<MotivationalMsg/>}/>
         <Route path="addmotmsg" element={isAuthenticated ? <AddMotMsg/> : <Home/>}/>
         <Route path="editmotmsg/:id" element={isAuthenticated ? <EditMotMsg/> : <Home/>}/>
         <Route path="singlemotmsg/:id" element={<SingleMotMsg/>}/>

         {/* These are the are the video routes */}
         <Route path="video" element={<Video/>}/>
         <Route path="addvideo" element={isAuthenticated ? <AddVideo/> : <Home/>} />
         <Route path="singlevideo/:id" element={<SingleVideo/>}/>

         {/* These are the are the article routes */}
        <Route path="about" element={<About/>}/>
        <Route path="edituser" element={isAuthenticated ? <EditUser/>: <Home/>}/>

        {/* This the registration routes */}
        <Route path="register" element ={<Registration/>}/>
        <Route path="login" element = {<LoginPage/>}/>
    </Routes>
    
  )
  
}

export default App 