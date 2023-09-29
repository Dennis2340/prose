import React, { useContext }  from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { MyAdminContext } from '../pages/Admin';

const StyledCard = styled(Card)(
  ({ theme }) => ({
    width: '100%',
    height: '100%',
    textAlign: 'center',
    minWidth: "auto",
    margin: 'auto',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    transition: '0.3s',
    '&:hover': {
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    },
  })
);

const StyledCardContent = styled(CardContent)(
  ({ theme }) => ({
    padding: theme.spacing(2),
  })
);

const StyledButton = styled(Button)(
  ({ theme }) => ({
    marginTop: theme.spacing(3),
  })
);

const MotMsgCard = ({motmsg, motmsgId}) => {

  const [active, setActive] = useContext(MyAdminContext)

  const handleClick = (id) => {
    setActive("SingleMotMsg")
    motmsgId(id)
    window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
  }
  return (
    <StyledCard sx={{ marginTop: 4,}}>
      <StyledCardContent>
        <Typography variant="h5" color="textSecondary">
          {motmsg.motMessageTitle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {motmsg.motMessageGenre}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {motmsg.motMessageDetails?.substring(0, 40) + '...'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {motmsg.motMessageAuthor ? `by ${motmsg.motMessageAuthor}` : 'Unknown Author'}
        </Typography>
        <StyledButton
          onClick={() => handleClick(motmsg._id)}
          variant="outlined"
          color="primary"
        >
          View
        </StyledButton>
      </StyledCardContent>
    </StyledCard>
  );
  
};

export default MotMsgCard;
