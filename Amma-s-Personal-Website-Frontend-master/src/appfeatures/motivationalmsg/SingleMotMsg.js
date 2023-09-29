import React, { useContext, useState } from 'react';
import { Box, Card, CardContent, Typography, Container, Grid,Button } from '@mui/material';
import { styled } from '@mui/system';
import { MyAdminContext } from '../../pages/Admin';
import { useQueryClient } from 'react-query';

const StyledCard = styled(Card)(
  ({ theme }) => ({
    width: '100%',
    height: '100%',
    textAlign: 'center',
    maxWidth: 500,
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

const SingleMotMsg = ({id}) => {

    const queryClient = useQueryClient()
    
    const motmsgs =  queryClient.getQueryData("motmsgs")
    const [idState, setIdState] = useState("")


    const [active, setActive] = useContext(MyAdminContext)
    const allMotMsg = motmsgs.motMessages
  
    const realId = idState ? idState : id
    const motmsg = motmsgs.motMessages.find((motmsg) => motmsg._id === realId);

  
    const handleClick = (id) => {
      setActive("SingleMotMsg")
      setIdState(id)
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }

    if(!motmsg){
        return (
          <section>
            <h2>Post not found</h2>
          </section>
        )
      }

    return (
      <div>
      <Container sx={{ marginLeft: {lg: -10}}}>
            <StyledCard variant="outlined">
              <StyledCardContent>
                <Typography variant="h5" color="text.secondary">
                  {motmsg.motMessageTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {motmsg.motMessageGenre}
                </Typography>
                <Typography sx={{ marginTop: 2 }} variant="body2">
                  {motmsg.motMessageDetails}
                </Typography>
                <Typography sx={{ marginTop: 1, marginBottom: 2 }} variant="body2">
                  {motmsg.motMessageAuthor ? `by ${motmsg.motMessageAuthor}` : 'unknown author'}
                </Typography>
                <StyledButton
                  onClick={() => setActive("EditMotMsg")}
                  variant="outlined"
                  color="primary"
                  >
                  Edit Message
                </StyledButton>
              </StyledCardContent>
            </StyledCard>
            <Box>
            <Typography variant="h6" gutterBottom sx={{ marginTop: 10, marginBottom: 3,textAlign: "center"}}>
              Other Motivaional Messages
            </Typography>
            </Box>
          <Grid container spacing={5}>
              {allMotMsg.map((otherMotMsg) => (
              <Grid key={otherMotMsg._id} item xs={12} md={6} sx={{ marginTop: 0, }}>
                <StyledCard
                  variant="outlined"
                  sx={{ marginBottom: 2 ,}}
                >
                  <StyledCardContent>
                    <Typography variant="h6" color="text.secondary">
                      {otherMotMsg.motMessageTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {otherMotMsg.motMessageGenre}
                    </Typography>
                    <Typography variant="body2">
                      {otherMotMsg.motMessageDetails?.substring(0, 40) + '...'}
                    </Typography>
                    <Typography variant="body2">
                      {otherMotMsg.motMessageAuthor ? `by ${otherMotMsg.motMessageAuthor}` : 'unknown author'}
                    </Typography>
                    <StyledButton
                      onClick={() => handleClick(otherMotMsg._id)}
                      variant="outlined"
                      color="primary"
                    >
                      View
                    </StyledButton>
                  </StyledCardContent>
                </StyledCard>
              </Grid>
              ))}
            </Grid>
      </Container>
    </div>
    );
};

SingleMotMsg.propTypes = {};

export { SingleMotMsg };