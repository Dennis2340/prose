import * as React from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import BookIcon from '@mui/icons-material/Book';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DescriptionIcon from '@mui/icons-material/Description';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import { NavLink, useNavigate } from 'react-router-dom';
import { getUserInfo,getUserError } from '../appfeatures/about/aboutSlice';
import { useSelector } from 'react-redux';


const HandleButtonClicked = () => {

}
  const drawer =
  (
    

 
    <div>
      <Toolbar />
      <Divider />
      <List>
        {["Home",'Poems', 'Stories', 'Articles',"Motivational_Msg", 'Videos'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
            onClick={ HandleButtonClicked(index)}
            >
              <ListItemIcon>
                {
                 index  === 0 ? <HomeIcon />: index === 1 ? <BookIcon/> : index === 2 ? <LibraryBooksIcon/> : index === 3 ? <DescriptionIcon/> : index === 4 ? <BookIcon/> : index === 5 ? <VideoLibraryIcon/> : null         
                }
              </ListItemIcon>
              {/* <ListItemText primary={text} /> */}
              {
                text === "Home" ? <NavLink className="nav" to="/"><ListItemText primary={text} /></NavLink> : text === "Poems" ? <NavLink className="nav" to="/poems"><ListItemText primary={text} /></NavLink> : text === "Stories" ? <NavLink className="nav" to="/stories"><ListItemText primary={text} /></NavLink> : text === "Articles" ? <NavLink className="nav" to="/articles"><ListItemText primary={text} /></NavLink> : text === "Motivational_Msg" ? <NavLink className="nav" to="/motmsg"><ListItemText primary={text} /></NavLink> : text === "Videos" ? <NavLink className="nav" to="/video"><ListItemText primary={text} /></NavLink> : null
              }
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['About',].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
            onClick={() => HandleButtonClicked(text)}
            >
              <ListItemIcon>
                {index  === 0 ? <InfoIcon /> : null }
              </ListItemIcon>
              {
                text === "About" ? <NavLink className="nav" to={`/about`}><ListItemText primary={text} /></NavLink> : null
              }
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );



  export default drawer