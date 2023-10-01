import React, {useState,useContext} from 'react';
import { Box, Card, CardContent, Typography, Button, Container, Grid } from '@mui/material';
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

const SingleArticle = ({id}) => {

 
  const [idState, setIdState] = useState("")
 
  const queryClient = useQueryClient()
  const articles = queryClient.getQueryData("articles")
 
  const [active, setActive] = useContext(MyAdminContext)
  const realId = idState ? idState : id

  const article =  articles.article.find((article) => article._id === realId);
 
  const allArticles = articles.article

    const handleClick = (id) => {
      setActive("SingleArticle")
      setIdState(id)
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
    if(!article){
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
                  {article.articleTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.articleGenre}
                </Typography>
                <Typography sx={{ marginTop: 2 }} variant="body2">
                  {article.articleDetails}
                </Typography>
                <Typography sx={{ marginTop: 1, marginBottom: 2 }} variant="body2">
                  {article.articleAuthor ? `by ${article.articleAuthor}` : 'unknown author'}
                </Typography>
                <StyledButton
                  onClick={() => setActive("EditArticle")}
                  variant="outlined"
                  color="primary"
                  >
                  Edit Article
                </StyledButton>
              </StyledCardContent>
            </StyledCard>
            <Box>
            <Typography variant="h6" gutterBottom sx={{ marginTop: 10, marginBottom: 3,textAlign: "center"}}>
              Other Articles
            </Typography>
            </Box>
          <Grid container spacing={5}>
              {allArticles.map((otherArticle) => (
              <Grid key={otherArticle._id} item xs={12} md={6} sx={{ marginTop: 0, }}>
                <StyledCard 
                  variant="outlined"
                  sx={{ marginBottom: 2 ,}}
                >
                  <StyledCardContent>
                    <Typography variant="h6" color="text.secondary">
                      {otherArticle.articleTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {otherArticle.articleGenre}
                    </Typography>
                    <Typography variant="body2">
                      {otherArticle.articleDetails?.substring(0, 40) + '...'}
                    </Typography>
                    <Typography variant="body2">
                      {otherArticle.articleAuthor ? `by ${otherArticle.articleAuthor}` : 'unknown author'}
                    </Typography>
                    <StyledButton
                      onClick={() => handleClick(otherArticle._id)}
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
    )
    ;
};

SingleArticle.propTypes = {};

export { SingleArticle };