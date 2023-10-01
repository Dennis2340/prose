import React, { createContext, } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { HistoryEdu } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Home from './pages/GeneralPages/Home';
import { Poem } from "./pages/GeneralPages/Poem"
import { Articles } from "./pages/GeneralPages/Articles"
import { Stories } from "./pages/GeneralPages/Stories"
import { Video } from "./pages/GeneralPages/Video"
import { About } from "./pages/GeneralPages/About"
import { MotivationalMsg } from "./pages/GeneralPages/MotivationalMsg"
// Import icons for the drawer
import BookIcon from '@mui/icons-material/Book';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DescriptionIcon from '@mui/icons-material/Description';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HomeIcon from '@mui/icons-material/Home';

///// importing the single page /////////
import { SinglePoemGen } from './appfeatures/poems/SinglePoemGen';
import { SingleStoryGen } from './appfeatures/stories/SingleStoryGen';
import { SingleMotMsgGen } from './appfeatures/motivationalmsg/SingleMotMsgGen';
import { SingleArticleGen } from './appfeatures/articles/SingleArticleGen';
import { Registration } from './pages/Registration';
import { LoginPage } from './pages/Login';
import { SingleVideo } from './appfeatures/videos/SingleVideoGen';

const drawerWidth = 240;


const drawerButtonStyle = {
  display: 'flex',
  justifyContent: 'flex-even',
  alignItems: 'center',
  textTransform: "none",
  padding: '8px 16px',
  width: '100%',
  
};

const drawerIconStyle = {
  marginRight: '10px',
};

export const MyContext  = createContext()
export const AuthContext  = createContext()

function Layout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [active, setActive] = React.useState('Home');

  const [auth, setAuth] = React.useState(false)
  const [loginDetails, setLoginDetails] = React.useState({})
  const [idState, setIdState] = React.useState({
    poemIdState: "",
    storyIdState: "",
    motmsgIdState: "",
    articleIdState: "",
    videoIdState: "",
  })

  const handleUserDetails = (details) => {
    console.log(details);
    if(details?.token){
      setAuth(true)
    }
    setLoginDetails(details.user)

  }
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const homeButtonClicked = () => {
    setMobileOpen(false)
    setActive("Home")
  }

  const poemButtonClicked = () => {
    setMobileOpen(false)
    setActive("Poems")
  }
  const storyButtonClicked = () => {
    setMobileOpen(false)
    setActive("Stories")
  }
  const articleButtonClicked = () => {
    setMobileOpen(false)
    setActive("Articles")
  }
  const motmsgButtonClicked = () => {
    setMobileOpen(false)
    setActive("Motivational_Msg")
  }
  const videoButtonClicked = () => {
    setMobileOpen(false)
    setActive("Videos")
  }
  const userButtonClicked = () => {
    setMobileOpen(false)
    setActive("Users")
  }

  const idCallback = (id) => {
    switch(active){
      case "Poems":
        return setIdState({...idState, poemIdState: id})
      case "Stories":
        return setIdState({...idState, storyIdState: id})
      case "Articles":
        return setIdState({...idState, articleIdState: id})
      case "Motivational_Msg":
        return setIdState({...idState, motmsgIdState: id})
      case "Videos":
        return setIdState({...idState, videoIdState: id})
      default:
        return idState;
    }
  }

  const container = window !== undefined ? () => window().document.body : undefined;

  const renderComponent = () => {
    switch (active) {
      case 'Home':
        return <Home />;
      case 'Poems':
        return <Poem poemId={idCallback}/>;
      case 'SinglePoem':
        return <SinglePoemGen id={idState.poemIdState}/>
      case 'Stories':
        return <Stories storyId = {idCallback}/>;
      case 'SingleStory':
        return <SingleStoryGen id={idState.storyIdState}/>
      case 'Articles':
        return <Articles articleId={idCallback}/>;
      case 'SingleArticle':
        return <SingleArticleGen id={idState.articleIdState}/>
      case 'Motivational_Msg':
        return <MotivationalMsg motmsgId = {idCallback}/>;
      case 'SingleMotMsg':
        return <SingleMotMsgGen id={idState.motmsgIdState}/>
      case 'Videos':
        return <Video videoId={idCallback}/>; 
      case 'SingleVideo':
        return <SingleVideo id={idState.videoIdState}/>
      case 'Users':
        return <About loginDetails={loginDetails}/>; 
      case 'SignUp':
        return <Registration/>;
      case 'Login':
        return <LoginPage handleUserDetails={handleUserDetails}/>; 
      default:
        return <Home />;
    }
  };

  return (
    <MyContext.Provider value={[active, setActive]}>
      <AuthContext.Provider value={{auth}}>
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, },
          }}
        >
          <Toolbar/>
          { auth ? (
            <Button style={drawerButtonStyle} onClick={userButtonClicked}>
            <PersonIcon sx={{ marginLeft: 0}} style={drawerIconStyle} /> Profile
          </Button>
          ): null} 
          <Button style={drawerButtonStyle} onClick={homeButtonClicked}>
            <HomeIcon style={drawerIconStyle} /> Home
          </Button>
         
          <Button style={drawerButtonStyle} onClick={poemButtonClicked}>
            <BookIcon style={drawerIconStyle} /> Poems
          </Button>
         
          <Button style={drawerButtonStyle} onClick={storyButtonClicked}>
            <LibraryBooksIcon style={drawerIconStyle} /> Stories
          </Button>
          
          <Button style={drawerButtonStyle} onClick={articleButtonClicked}>
            <DescriptionIcon style={drawerIconStyle} /> Articles
          </Button>
          
          <Button style={drawerButtonStyle} onClick={motmsgButtonClicked}>
            <BookIcon style={drawerIconStyle} sx={{ marginLeft: 8}} /> Motivational_Msg
          </Button>
          
          <Button style={drawerButtonStyle} onClick={videoButtonClicked}>
            <VideoLibraryIcon sx={{ marginLeft: 0}} style={drawerIconStyle} /> Videos
          </Button>
            
        </Drawer>
        </Grid>
        <Grid item xs={0} sm={3}>
          <Box sx={{ display: 'flex', flexGrow: 1,  }}>
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
              { auth ? (
                <Button style={drawerButtonStyle} onClick={userButtonClicked}>
                <PersonIcon sx={{ marginLeft: 0}} style={drawerIconStyle} /> Profile
                </Button>
              ): null} 
              <Button style={drawerButtonStyle} onClick={() => setActive('Home')}>
                <HomeIcon style={drawerIconStyle} /> Home
              </Button>
             
              <Button style={drawerButtonStyle} onClick={() => setActive('Poems')}>
                <BookIcon style={drawerIconStyle} /> Poems
              </Button>
             
              <Button style={drawerButtonStyle} onClick={() => setActive('Stories')}>
                <LibraryBooksIcon style={drawerIconStyle} /> Stories
              </Button>
             
              <Button style={drawerButtonStyle} onClick={() => setActive('Articles')}>
                <DescriptionIcon style={drawerIconStyle} /> Articles
              </Button>
             
              <Button style={drawerButtonStyle} onClick={() => setActive('Motivational_Msg')}>
                <BookIcon style={drawerIconStyle} sx={{ marginLeft: 8}} /> Motivational_Msg
              </Button>
             
              <Button style={drawerButtonStyle}  onClick={() => setActive('Videos')}>
                <VideoLibraryIcon style={drawerIconStyle} /> Videos
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
              sx={{ display: { sm: 'none' }, marginLeft: -4 , color: 'white' }}
            >
              <MenuIcon />
            </IconButton>
            <HistoryEdu sx={{ fontSize: '2rem', marginRight: '0.5rem', color: 'navy', marginLeft: auth ? 3 :null }} />
            <Typography
            sx={{ color: 'navy', flexGrow: 1, fontWeight: 'bold', fontSize: auth? '1.5rem': '1.2rem', }}
            variant="h6"
            component="div"
            >
            Explore & Inspire
          </Typography>
            { !auth ? (
              <Box sx={{ display: 'flex' }}>
              <Button
                variant="outlined"
                onClick={() => setActive("SignUp")}
                sx={{color: "navy", marginRight: -2  }}
              >
               <PersonIcon/> SignUp
              </Button>
              <Button
                variant="outlined"
                sx={{ color: 'navy', marginRight: -4  }}
                onClick={() => setActive('Login')}
              >
                <LockIcon /> Login
              </Button>
            </Box>
            ) : null}
          </Toolbar>
        </Container>
      </AppBar>
      <Grid item xs={12} sm={-9}>
      <Box
        component="main"
      >
        {/* Your main content here */}
        <Box mt={5} sx={{
          marginLeft: {xs: 0, sm: 30, lg: 50},
          flex: 1,
          p: 3,
          flexGrow: 1,
        }}>{renderComponent()}</Box>
      </Box>
      </Grid>
      <Grid item xs={12} sm={-9} ml={{ xs: 0, sm: 30 }}>
      <Box
        sx={{
          backgroundColor: 'white',
          color: 'text.primary',
          padding: '20px',
          textAlign: 'center',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
        }}
      >
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Box>
        <Typography variant="h6" color="textPrimary">
          Quick Links
        </Typography>
        <Button color="inherit" onClick={() => setActive("Poems")}>
          Poems
        </Button>
        <Button color="inherit" onClick={() => setActive("Motivational_Msg")}>
          Motivational Speeches
        </Button>
        <Button color="inherit" onClick={() => setActive("Articles")}>
          Articles
        </Button>
        <Button color="inherit" onClick={() => setActive("Stories")}>
          Stories
        </Button>
        <Button color="inherit" onClick={() => setActive("Videos")}>
          Videos
        </Button>
      </Box>
      <Box>
        <Typography variant="h6" color="textPrimary">
          Contact Us
        </Typography>
        <Button color="inherit" onClick={() => setActive("DeveloperInfo")}>
          Contact Information
        </Button>
      </Box>
      <Box>
        <Typography variant="h6" color="textPrimary">
          About Us
        </Typography>
        <Button color="inherit" onClick={() => setActive("OurStory")}>
          Our Story
        </Button>
        <Button color="inherit" onClick={() => setActive("OurTeam")}>
          Our Team
        </Button>
      </Box>
    </Box>
      <Box
        sx={{
          backgroundColor: 'primary.main', // Change background color to your preferred color
          marginTop: 2, // Add spacing
          color: 'white',
          textAlign: 'center',
          width: "100%",
          marginLeft: 0,
          marginRight: 0,
          marginBottom: -2, //
          padding: '10px', // Add padding for spacing
          borderRadius: '0px 0px 10px 10px', // Add rounded corners at the bottom
        }}
      >
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} Your App Name. All rights reserved.
        </Typography>
      </Box>

      </Box>
      </Grid>


      
      </Grid>
     </Box>
     </AuthContext.Provider>
    </MyContext.Provider>
  );
}

Layout.propTypes = {
  window: PropTypes.func,
};

export default Layout;
