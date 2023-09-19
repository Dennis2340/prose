import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { Group } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { Divider } from '@mui/material';
import Footer from '../Components/Footer';
import Home from './Home';
import { AddPoem } from '../appfeatures/poems/AddPoem';
import { Poem } from "./Poem"
import { Articles } from "./Articles"
import { Stories } from "./Stories"
import { Video } from "./Video"
import { About } from "./About"
import { MotivationalMsg } from "./MotivationalMsg"
// Import icons for the drawer
import BookIcon from '@mui/icons-material/Book';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DescriptionIcon from '@mui/icons-material/Description';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { AddStory } from '../appfeatures/stories/AddStory';
import { AddArticle } from '../appfeatures/articles/AddArticle';
import { AddMotMsg } from '../appfeatures/motivationalmsg/AddMotMsg';
import { AddVideo } from '../appfeatures/videos/AddVideo';
import { SinglePoem } from '../appfeatures/poems/SinglePoem';
import { EditPoem } from '../appfeatures/poems/EditPoem';

const drawerWidth = 240;
const footerHeight = 244.01;

const drawerButtonStyle = {
  display: 'flex',
  justifyContent: 'flex-even',
  alignItems: 'center',
  padding: '8px 16px',
  textTransform: 'none',
  width: '100%',
};

const drawerIconStyle = {
  marginRight: '10px',
};
export const MyAdminContext = createContext()
function Admin(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [active, setActive] = React.useState('Home');
  const [idState, setIdState] = React.useState("")
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const poemId = (id) => {
    setIdState(id)
  }
  const container = window !== undefined ? () => window().document.body : undefined;

  const renderComponent = () => {
    switch (active) {
      case 'Home':
        return <Home />;
      case 'Poems':
        return <Poem poemId={poemId}/>;
      case 'SinglePoem':
        return <SinglePoem id={idState}/>;
      case 'AddPoem':
        return <AddPoem/>;
      case 'EditPoem':
        return <EditPoem/>;
      case 'Stories':
        return <Stories />;
      case 'AddStory':
        return <AddStory/>;
      case 'Articles':
        return <Articles />;
      case 'AddArticle':
        return <AddArticle/>;
      case 'Motivational_Msg':
        return <MotivationalMsg />;
      case 'AddMotMessage':
        return <AddMotMsg/>
      case 'Videos':
        return <Video />;
      case 'AddVideo':
        return <AddVideo/>; 
      case 'Users':
        return <About/>; 
      default:
        return <Home />;
    }
  };
  let navUi = null
  let editFeatures = ""
  if(active === "Poems"){
    editFeatures = "AddPoem";
    navUi = <><AddRoundedIcon/> AddPoem</>  
 }
 else if(active === "Stories"){
  editFeatures = "AddStory"
   navUi = <><AddRoundedIcon/> AddStory</>
 }
 else if(active === "Articles"){
  editFeatures = "AddArticle"
   navUi = <><AddRoundedIcon/> AddArticle</>
 }
 else if(active === "Motivational_Msg"){
  editFeatures = "AddMotMessage"
   navUi = <><AddRoundedIcon/> AddMotivational_Msg</>
 }
 else if(active === "Videos"){
  editFeatures = "AddVideo"
   navUi = <><AddRoundedIcon/> AddVideo</>
 }
  return (
    <MyAdminContext.Provider value={[active, setActive]}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Grid container spacing={2} sx={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={3}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Toolbar />
          <Button style={drawerButtonStyle} onClick={() => setActive('Home')}>
            <HomeIcon style={drawerIconStyle} /> Home
          </Button>
          <Divider/>
          <Button style={drawerButtonStyle} onClick={() => setActive('Poems')}>
            <BookIcon style={drawerIconStyle} /> Poems
          </Button>
          <Divider/>
          <Button style={drawerButtonStyle} onClick={() => setActive('Stories')}>
            <LibraryBooksIcon style={drawerIconStyle} /> Stories
          </Button>
          <Divider/>
          <Button style={drawerButtonStyle} onClick={() => setActive('Articles')}>
            <DescriptionIcon style={drawerIconStyle} /> Articles
          </Button>
          <Divider/>
          <Button style={drawerButtonStyle} onClick={() => setActive('Motivational_Msg')}>
            <BookIcon style={drawerIconStyle} sx={{ marginLeft: 8}} /> Motivational_Msg
          </Button>
          <Divider/>
          <Button style={drawerButtonStyle} onClick={() => setActive('Videos')}>
            <VideoLibraryIcon sx={{ marginLeft: 0}} style={drawerIconStyle} /> Videos
          </Button>
          <Divider/>
          <Button style={drawerButtonStyle} onClick={() => setActive('Users')}>
            <Group sx={{ marginLeft: 0}} style={drawerIconStyle} /> Users
          </Button>
        </Drawer>
        </Grid>
        <Grid item xs={0} sm={3}>
          <Box sx={{ display: 'flex', flexGrow: 1,  backgroundColor: 'primary.main', color: 'white',}}>
          <Box
            component="nav"
            sx={{
              width: { sm: drawerWidth },
              flexShrink: { sm: 0 },
              overflowY: 'auto', // Add scroll to the drawer if needed
            }}
            aria-label="mailbox folders"
          > 
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box',},
              }}
              open
            >
              <Toolbar />
              <Button style={drawerButtonStyle} onClick={() => setActive('Home')}>
                <HomeIcon style={drawerIconStyle} /> Home
              </Button>
              <Divider/>
              <Button style={drawerButtonStyle} onClick={() => setActive('Poems')}>
                <BookIcon style={drawerIconStyle} /> Poems
              </Button>
              <Divider/>
              <Button style={drawerButtonStyle} onClick={() => setActive('Stories')}>
                <LibraryBooksIcon style={drawerIconStyle} /> Stories
              </Button>
              <Divider/>
              <Button style={drawerButtonStyle} onClick={() => setActive('Articles')}>
                <DescriptionIcon style={drawerIconStyle} /> Articles
              </Button>
              <Divider/>
              <Button style={drawerButtonStyle} onClick={() => setActive('Motivational_Msg')}>
                <BookIcon style={drawerIconStyle} sx={{ marginLeft: 8}} /> Motivational_Msg
              </Button>
              <Divider/>
              <Button style={drawerButtonStyle} onClick={() => setActive('Videos')}>
                <VideoLibraryIcon style={drawerIconStyle} /> Videos
              </Button>
              <Divider/>
              <Button style={drawerButtonStyle} onClick={() => setActive('Users')}>
                <Group sx={{ marginLeft: 0}} style={drawerIconStyle} /> Users
              </Button>
            </Drawer>
          </Box>
          </Box>
        </Grid>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              yoo
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Button
                variant="outlined"
                onClick={() => setActive(editFeatures)}
                style={{ color: 'navy' }}
              >
               {
                 navUi
               }
              </Button>
              <Button
                variant="outlined"
                style={{ color: 'navy' }}
                onClick={() => setActive('Login')}
              >
                <LockIcon /> Login
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Grid item xs={12} sm={-9}>
      <Box
        component="main"
      >
        {/* Your main content here */}
        <Box mt={5} sx={{
          marginLeft: {xs: 0, sm: 30, lg: 48},
          flex: 1,
          p: 3,
          flexGrow: 1,
        }}>{renderComponent()}</Box>
      </Box>
      </Grid>
      <Grid item xs={12} sm={-9} ml={{xs: 0, sm: 30}}>
       <Box sx={{ 
         backgroundColor: 'primary.main', 
         color: 'white', 
         marginTop: 6,
         marginBottom: -2,
         minHeight: "200px",
         marginX: -2,
         textAlign: {xs: "center", sm: 0},
        }}>
          <Box
          sx={{
            display: {xs: "column", sm: 'flex',},
            justifyContent: {xs: "space-evenly", sm: 'space-evenly'},
            alignItems: 'center',
            width: '100%',
            
          }}
          >
          <Box pt={3}>
              <Typography mt={3} variant="h6" color="textPrimary">
                Quick Links
              </Typography>
              <Link mt={3} color="inherit" href="/poems">
                Poems
              </Link>
              <br />
              <Link mt={3} color="inherit" href="/motmsg">
                Motivational Speeches
              </Link>
              <br />
              <Link mt={1} color="inherit" href="/articles">
                Articles
              </Link>
              <br />
              <Link mt={1} color="inherit" href="/stories">
                Stories
              </Link>
              <br />
              <Link mt={3} color="inherit" href="/videos">
                Videos
              </Link>
          </Box>
          <Box>
              <Typography variant="h6" color="textPrimary">
                Contact Us
              </Typography>
              <Link color="inherit" href="/contact">
                Contact Information
              </Link>
          </Box>
          <Box>
          <Typography variant="h6" color="textPrimary">
                About Us
              </Typography>
              <Link color="inherit" href="/about">
                Our Story
              </Link>
              <br />
              <Link color="inherit" href="/team">
                Our Team
              </Link>
          </Box>
        </Box>
          <Box  sx={{ backgroundColor: 'primary.main',marginTop: 7, color: 'white', textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            &copy; {new Date().getFullYear()} Your App Name. All rights reserved.
          </Typography>
         </Box> 
        </Box>
      </Grid>
      
      </Grid>
     </Box>
    </MyAdminContext.Provider>
  );
}

Admin.propTypes = {
  window: PropTypes.func,
};

export default Admin;
