import React, { useContext }  from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { MyContext } from '../../Layout';


const StyledCard = styled(Card)(
  ({ theme }) => ({
    width: 'auto',
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
    '& .story-title': {
      fontSize: '1.5rem',
      color: 'primary.main',
    },
    '& .story-author': {
      fontSize: '1rem',
      fontStyle: 'italic',
      color: 'text.secondary',
    },
    '& .story-details': {
      maxHeight: '200px', // Limit the max height of the poem details
      overflow: 'hidden',
      position: 'relative',
    },
    '& .story-details-expand': {
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

const StoryCard = ({story, storyId}) => {

    const [active, setActive] = useContext(MyContext)
  
    const handleClick = (id) => {
      setActive("SingleStory")
      storyId(id)
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }

    return (
        <StyledCard sx={{ marginTop: 4,}}>
          <StyledCardContent>
            <Typography variant="h5" color="textSecondary" className='story-title'>
              {story.storyTitle}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {story.storyGenre}
            </Typography>
            <Typography variant="body2" color="textSecondary" className='story-details'>
            {story.storyDetailed.substring(0, 200)} {/* Limit the story details to 200 characters */}
            {story.storyDetailed.length > 200 && (
              <span className="story-details-expand">...</span>
            )}
            </Typography>
            <Typography variant="body2" color="textSecondary" className='story-author'>
              {story.storyAuthor ? `by ${story.storyAuthor}` : 'Unknown Author'}
            </Typography>
            <StyledButton
              onClick={()=> handleClick(story._id)}
              variant="outlined"
              color="primary"
            >
              Read More
            </StyledButton>
          </StyledCardContent>
        </StyledCard>
    );

}

export default StoryCard;