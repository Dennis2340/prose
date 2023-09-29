import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { Group, Person, Search,Clear } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import { Divider, InputBase, alpha, InputAdornment } from '@mui/material';
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
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { AddStory } from '../appfeatures/stories/AddStory';
import { AddArticle } from '../appfeatures/articles/AddArticle';
import { AddMotMsg } from '../appfeatures/motivationalmsg/AddMotMsg';
import { AddVideo } from '../appfeatures/videos/AddVideo';
import { SinglePoem } from '../appfeatures/poems/SinglePoem';
import { EditPoem } from '../appfeatures/poems/EditPoem';
import { SingleStory } from '../appfeatures/stories/SingleStory';
import { EditStory } from '../appfeatures/stories/EditStory';
import { SingleArticle } from '../appfeatures/articles/SingleArticle';
import { EditArticle } from '../appfeatures/articles/EditArticle';
import { SingleMotMsg } from '../appfeatures/motivationalmsg/SingleMotMsg';
import { EditMotMsg } from '../appfeatures/motivationalmsg/EditMotMsg';
import { SingleVideo } from '../appfeatures/videos/SingleVideo';
import AdminLogin from './AdminLogin';
import AdminProfile from './AdminProfile';

const drawerWidth = 240;


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
  const [adminDetails, setAdminDetails] = React.useState({})
  const [idState, setIdState] = React.useState({
    poemIdState: "",
    storyIdState: "",
    motmsgIdState: "",
    articleIdState: "",
    videoIdState: "",
  })

  
    const [searchInput, setSearchInput] = useState(''); // State for search input
  
    const handleSearchChange = (event) => {
      setSearchInput(event.target.value);
      // Add your search functionality here based on the searchInput value
    };

  const handleAdminDetails = (details) => {
    setAdminDetails(details)
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
  const profileButtonClicked = () => {
    setMobileOpen(false)
    setActive("Profile")
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
        return <SinglePoem id={idState.poemIdState}/>;
      case 'AddPoem':
        return <AddPoem/>;
      case 'EditPoem':
        return <EditPoem id={idState.poemIdState}/>;
      case 'Stories':
        return <Stories storyId = {idCallback}/>;
      case 'SingleStory':
        return <SingleStory id={idState.storyIdState}/>
      case 'AddStory':
        return <AddStory/>;
      case "EditStory":
        return <EditStory id={idState.storyIdState}/>
      case 'Articles':
        return <Articles articleId={idCallback}/>;
      case 'AddArticle':
        return <AddArticle/>;
      case 'SingleArticle':
        return <SingleArticle id={idState.articleIdState}/>
      case 'EditArticle':
        return <EditArticle id={idState.articleIdState}/>;
      case 'Motivational_Msg':
        return <MotivationalMsg motmsgId = {idCallback}/>;
      case 'SingleMotMsg':
        return <SingleMotMsg id={idState.motmsgIdState}/>
      case 'AddMotMessage':
        return <AddMotMsg/>
      case 'EditMotMsg':
        return <EditMotMsg id={idState.motmsgIdState}/>
      case 'Videos':
        return <Video videoId = {idCallback}/>;
      case 'SingleVideo':
        return <SingleVideo id={idState.videoIdState}/>
      case 'AddVideo':
        return <AddVideo/>; 
      case 'Users':
        return <About/>;
      case 'Login':
        return <AdminLogin handleAdminDetails={handleAdminDetails}/> 
      case 'Profile':
        return <AdminProfile admin={adminDetails}/>
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
          <Button style={drawerButtonStyle} onClick={profileButtonClicked}>
            <Person style={drawerIconStyle} /> Profile
          </Button>
          <Button style={drawerButtonStyle} onClick={homeButtonClicked}>
            <HomeIcon style={drawerIconStyle} /> Home
          </Button>
          <Divider/>
          <Button style={drawerButtonStyle} onClick={poemButtonClicked}>
            <BookIcon style={drawerIconStyle} /> Poems
          </Button>
          <Divider/>
          <Button style={drawerButtonStyle} onClick={storyButtonClicked}>
            <LibraryBooksIcon style={drawerIconStyle} /> Stories
          </Button>
          <Divider/>
          <Button style={drawerButtonStyle} onClick={articleButtonClicked}>
            <DescriptionIcon style={drawerIconStyle} /> Articles
          </Button>
          <Divider/>
          <Button style={drawerButtonStyle} onClick={motmsgButtonClicked}>
            <BookIcon style={drawerIconStyle} sx={{ marginLeft: 8}} /> Motivational_Msg
          </Button>
          <Divider/>
          <Button style={drawerButtonStyle} onClick={videoButtonClicked}>
            <VideoLibraryIcon sx={{ marginLeft: 0}} style={drawerIconStyle} /> Videos
          </Button>
          <Divider/>
          <Button style={drawerButtonStyle} onClick={userButtonClicked}>
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
              <Button style={drawerButtonStyle} onClick={profileButtonClicked}>
                 <Person style={drawerIconStyle} /> Profile
              </Button>
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
              backgroundColor: '#2196F3', // Add a background color
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add elevation
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
                  sx={{ display: { sm: 'none' }, marginLeft: -4 }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div">
                  yoo
                </Typography>
                {/* Search Bar */}
                <div sx={{ position: 'relative', ml: 2 }}>
                
                <InputBase
                    placeholder="Search..."
                    inputProps={{ 'aria-label': 'search' }}
                    fullWidth
                    value={searchInput}
                    onChange={handleSearchChange}
                    startAdornment={ 
                      <InputAdornment position="start" sx={{marginLeft: -3}}>
                        <Search />
                      </InputAdornment>
                    }
                    endAdornment={ // Add a clear button
                      searchInput && (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setSearchInput('')} // Clear the search input
                            sx={{marginRight: 1}}
                         >
                            <Clear />
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                    sx={{
                      borderRadius: 1,
                      backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15),
                      '&:hover': {
                        backgroundColor: (theme) => alpha(theme.palette.common.white, 0.25),
                      },
                      pl: 5,
                      pr: searchInput ? 0 : 2, // Add right padding when there's no text to clear
                      '&::placeholder': {
                        color: 'gray', // Customize the placeholder text color
                        fontStyle: 'italic', // Italicize the placeholder text
                      },
                    }}
                    autoFocus // Automatically focus the input field
                  />


                </div>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {active !== 'Home' ? (
                    <Button
                      variant="outlined"
                      onClick={() => setActive(editFeatures)}
                      style={{ color: 'navy' }}
                    >
                      {navUi}
                    </Button>
                  ) : null}
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
    </MyAdminContext.Provider>
  );
}

Admin.propTypes = {
  window: PropTypes.func,
};

export default Admin;
