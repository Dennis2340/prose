import React, { useContext }  from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import  { MyContext }  from '../../Layout';

const StyledCard = styled(Card)(
  ({ theme }) => ({
    width: '100%',
    height: '100%',
    textAlign: 'center',
    maxWidth: 500,
    minWidth: "auto",
    margin: 'auto',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    transition: '0.3s',
    '&:hover': {
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    },
    background: '#f9f9f9',
    border: '1px solid #ccc',
  })
);

const StyledCardContent = styled(CardContent)(
  ({ theme }) => ({
    padding: theme.spacing(2),
    '& motmsg-title': {
      fontSize: '1.5rem',
      color: 'primary.main',
    },
    '& motmsg-author': {
      fontSize: '1rem',
      fontStyle: 'italic',
      color: 'text.secondary',
    },
    '& motmsg-details': {
      maxHeight: '200px', // Limit the max height of the poem details
      overflow: 'hidden',
      position: 'relative',
    },
    '& motmsg-details-expand': {
      position: 'absolute',
      bottom: '0',
      right: '0',
      background: 'linear-gradient(transparent, #f9f9f9)', // Create a gradient fade effect
      padding: '8px',
    },
  })
);

const StyledButton = styled(Button)(
  ({ theme }) => ({
    marginTop: theme.spacing(3),
  })
);

const MotMsgCard = ({motmsg, motmsgId}) => {

    const [active, setActive] = useContext(MyContext)

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
            <Typography variant="h5" color="textSecondary" className='motmsg-title'>
              {motmsg.motMessageTitle}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {motmsg.motMessageGenre}
            </Typography>
            <Typography variant="body2" color="textSecondary" className='motmsg-details'>
              {motmsg.motMessageDetails.substring(0, 200)} {/* Limit the motMessage details to 200 characters */}
              {motmsg.motMessageDetails.length > 200 && (
              <span className="article-details-expand">...</span>
            )}
            </Typography>
            <Typography variant="body2" color="textSecondary" className='motmsg-author'>
              {motmsg.motMessageAuthor ? `by ${motmsg.motMessageAuthor}` : 'Unknown Author'}
            </Typography>
            <StyledButton
              onClick={() => handleClick(motmsg._id)}
              variant="outlined"
              color="primary"
            >
              Read More
            </StyledButton>
          </StyledCardContent>
        </StyledCard>
      );
}

export default MotMsgCard;