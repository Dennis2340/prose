import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
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
import Home from './Components/Home';
import { AddPoem } from '../appfeatures/poems/AddPoem';
import { Poem } from "./Components/Poem"
import { Articles } from "./Components/Articles"
import { Stories } from "./Components/Stories"
import { Video } from "./Components/Video"
import { About } from "./About"
import { MotivationalMsg } from "./Components/MotivationalMsg"
// Import icons for the drawer
import BookIcon from '@mui/icons-material/Book';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DescriptionIcon from '@mui/icons-material/Description';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

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

function MainLayout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [active, setActive] = React.useState('Home');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  const renderComponent = () => {
    switch (active) {
      case 'Home':
        return <Home />;
      case 'Poems':
        return <Poem />;
      case 'Stories':
        return <Stories />;
      case 'Articles':
        return <Articles />;
      case 'Motivational_Msg':
        return <MotivationalMsg />;
      case 'Videos':
        return <Video />;
      default:
        return <Home />;
    }
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
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
                onClick={() => setActive('AddPoem')}
                style={{ color: 'navy' }}
              >
                <PersonIcon/> SignUp
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
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
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
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
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
          <Button style={drawerButtonStyle} onClick={() => setActive('User')}>
            <PersonIcon sx={{ marginLeft: 0}} style={drawerIconStyle} /> Users
          </Button>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, height: `calc(100vh - ${footerHeight}px)` },
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
          <Button style={drawerButtonStyle} onClick={() => setActive('User')}>
            <PersonIcon sx={{ marginLeft: 0}} style={drawerIconStyle} /> Users
          </Button>
        </Drawer>
      </Box>
    </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          
        }}
      >
        {/* Your main content here */}
        <Box mt={10}>{renderComponent()}</Box>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Footer />
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  window: PropTypes.func,
};

export default MainLayout;
