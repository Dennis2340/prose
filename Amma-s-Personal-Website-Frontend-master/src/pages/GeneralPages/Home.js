import React, {useEffect, useState, useContext} from 'react';
import { Box,Grid, Typography } from '@mui/material';
import BasicCard from '../../Components/BasicCardHome';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, getUserStatus,getUserInfo  } from '../../appfeatures/about/aboutSlice';
import { MyContext, AuthContext } from '../../Layout';
const Home = () => {

  const dispatch = useDispatch()
const userStatus = useSelector(getUserStatus)
const userList = useSelector(getUserInfo)

const [active,setActive ] = useContext(MyContext)
const {isAuthenticated} = useContext(AuthContext)
  useEffect(() => {
    if(userStatus === "idle"){
      
      dispatch(fetchUser())
      
    }
   }, [userStatus,dispatch])

    
  
  const [mainUrl, setMainUrl] = useState("");

useEffect(() => {
  if (userStatus === "succeeded") {
    
    const url = userList?.map(user => user.pictureUrl);
    

    const filename = Array.isArray(url) ? url[0]?.split("/") : [];
    const newMainUrl = filename?.length > 0 ? filename[filename.length - 1] : "";
    setMainUrl(newMainUrl[0]);
  }
}, [userList, userStatus]);


  return (
    <Box sx={{ marginLeft: {xs: 0, lg: -20}}}>
        <Typography variant="h4" component="span" sx={{ fontWeight: 'bold', fontSize: '2.5rem', color: 'primary.main' }}>
          Immerse Yourself in a World of Inspiration and Knowledge
        </Typography>
        <Box sx={{ my: 4 }} />
        <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'text.primary' }}>
          Welcome to our platform, where you embark on a journey of exploration and enlightenment. Dive into a handpicked collection of poems, captivating stories, motivational speeches, thought-provoking articles, and engaging videos.
        </Typography>
        <Box sx={{ my: 3 }} />
        <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'text.primary' }}>
          Whether you find solace in the elegance of poetry, relish the magic of storytelling, or seek wisdom from motivational speeches, our platform is your gateway to spark your imagination and expand your horizons.
        </Typography>
        <Box sx={{ my: 3 }} />
        <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'text.primary' }}>
          Journey through the enchanting world of poems, where words come alive, evoking emotions and painting vivid imagery. Explore captivating stories that transport you to distant realms, leaving you entranced with every twist and turn.
        </Typography>
        <Box sx={{ my: 3 }} />
        <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'text.primary' }}>
          Let the motivational speeches elevate your spirits, infusing a sense of purpose and inspiring you to embrace your full potential. Immerse yourself in thought-provoking articles that provide valuable insights, diverse perspectives, and a deeper understanding of the world around us.
        </Typography>
        <Box sx={{ my: 3 }} />
        <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'text.primary' }}>
          But that's not all! We've meticulously curated a collection of related videos that harmonize with our content themes, delivering a multimedia experience that engages both the intellect and the senses.
        </Typography>
        <Box sx={{ my: 3 }} />
        <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'text.primary' }}>
          Whether you're here for solace, knowledge, or simply to explore the realms of creativity, we invite you to embark on this journey with us. Let the words, stories, speeches, articles, and videos inspire, motivate, and entertain you.
        </Typography>
        <Box sx={{ my: 3 }} />
        <Typography variant="h5" sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'primary.main' }}>
          Welcome to a World of Inspiration and Enlightenment. Enjoy Your Exploration!
        </Typography>


        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', 
          }}
        >
        </Box>

        <Grid container spacing={5} mt={4}>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <BasicCard
            title="Poems"
            description="Immerse yourself in the beauty of poetry with our curated collection of poems from various genres and poets."
            imageUrl="https://images.unsplash.com/photo-1500381457785-20c97a29c78e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9lbXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
            handleClick={() => setActive("Poems")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <BasicCard
            title="Stories"
            description="Get lost in captivating stories that transport you to different worlds and leave you spellbound."
            imageUrl="https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3Rvcmllc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
            handleClick={() => setActive("Stories")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <BasicCard
            title="Motivational Speeches"
            description="Discover powerful speeches that uplift your spirits and inspire you to embrace your full potential."
            imageUrl="https://media.istockphoto.com/id/1398562021/photo/silhouette-man-jumping-over-the-cliffs-with-i-can-do-it-word-in-sunlight-never-give-up-good.webp?b=1&s=170667a&w=0&k=20&c=6y1bf-cYpssh9T9s9_a3rKc7X8SaFIVxrUoRiS3X6Vo="
            handleClick={() => setActive("Motivational_Msg")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <BasicCard
            title="Thought-Provoking Articles"
            description="Engage with articles that offer valuable insights, diverse perspectives, and a deeper understanding of the world."
            imageUrl="https://media.istockphoto.com/id/1219980553/photo/online-news-on-a-smartphone-and-laptop-woman-reading-news-or-articles-in-a-mobile-phone.webp?b=1&s=170667a&w=0&k=20&c=vGq-apsAbnifZ-opnwbhFdWg5bHqvl7F8UBAq2R3dVg="
            handleClick={() => setActive("Articles")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <BasicCard
            title="Related Videos"
            description="Explore a collection of videos that complement our content themes, providing you with a multimedia experience."
            imageUrl="https://media.istockphoto.com/id/579162654/photo/finger-pressing-play-button-on-touch-screen.webp?b=1&s=170667a&w=0&k=20&c=etOChiM1mk9krj0iCU_aEnyR0clsY-ojQTsPagwqZwI="
            handleClick={() => setActive("Videos")}
          />
        </Grid>
        </Grid>
      
    </Box>
  );
};

export default Home;
