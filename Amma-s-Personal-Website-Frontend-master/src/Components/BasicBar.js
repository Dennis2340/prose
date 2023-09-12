import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function DenseAppBar() {

  const navigate = useNavigate()
  const handleClick = () => {
     navigate(-1)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Button style={{marginLeft: -12}} onClick={handleClick} variant='outline' startIcon={<KeyboardReturnIcon/>}></Button>
          <Typography style={{marginLeft: -12}} variant="h6" color="inherit" component="div">
            TRUMPSON
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
