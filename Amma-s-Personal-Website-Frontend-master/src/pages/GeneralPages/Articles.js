import React, { useState } from 'react';
import { Box, Typography, Grid, IconButton, InputBase } from '@mui/material';
import { fetchArticleQuery, } from '../../appfeatures/articles/articleSlice';
import ArticleCard from '../../Components/GeneralPageCompnent/ArticleCard';
import { useQuery, useQueryClient } from 'react-query';
import { Search, Clear} from '@mui/icons-material';
import SkeletonCard from '../../Components/SkeletonCard';
const Articles = ({articleId}) => {

  const queryClient = useQueryClient()
  const { data: articles, isLoading, isError, error, isSuccess } = useQuery('articles', fetchArticleQuery); // Replace 'fetchStories' with your fetch function

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPoems = isSuccess
  ? articles?.article?.filter((article) =>
      article.articleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.articleGenre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.articleAuthor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.articleDetails.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];

  console.log(articles)
 
   let content;
   if(isLoading){
    content = Array.from({ length: 8 }).map((_, index) => (
      <Grid item key={index} xs={12} sm={6} md={6}>
        <SkeletonCard />
      </Grid>
    ));
   }
   else if(isSuccess){
    content =
    filteredPoems.length > 0 ? (
      filteredPoems.map((article, index) => (
        <Grid item key={`${article._id}-${index}`} xs={12} sm={6} md={6}>
          <ArticleCard articleId={articleId} article={article} />
        </Grid>
      ))
    ) : (
      <Typography sx={{marginLeft: {xs:5, sm: 14}}} variant="h3" color="textSecondary">
        No articles found.
      </Typography>
    );
    }
    else if (isError){
     content = <p>{error}</p>
    }

    queryClient.setQueryData("articleCache", articles)
    return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: {lg: -20,},
    }}>
       <Box>
       <Box sx={{
          textAlign: 'center'
        }}>
          <Typography  variant='h4' component="h1">
            ARTICLES
          </Typography>
          {/* Add search field */}
          
          <Box sx={{ display: 'flex',justifyContent: "center",  alignItems: 'center', marginTop: 4, marginBottom: 2, minWidth: "60%"}}>
            <InputBase
              placeholder="Search for articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              sx={{
                borderRadius: 1,
                backgroundColor: (theme) => theme.palette.common.main,
                pl: 2,
                pr: 1,
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
              }}
            />
            {
              searchTerm ? (
               <IconButton
                onClick={() => setSearchTerm('')}
                sx={{ padding: 0, marginLeft: -6}} // Add some styling to the clear button
                >
              <Clear />
            </IconButton>
              ) : (
                <Search sx={{ padding: 0, marginLeft: -6}}/>
              )
            }
            
          </Box>
          
          </Box>
          <Grid container spacing={3}>
            {content}
          </Grid>
        </Box>
      
      
    </Box>
    )
    ;
};

Articles.propTypes = {};

export { Articles };