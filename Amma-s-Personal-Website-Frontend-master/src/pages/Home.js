import React, {useEffect, useState} from 'react';
import { Box,Grid, Typography } from '@mui/material';
import ResponsiveDrawer from "../Components/AppBar";
import BasicCard from '../Components/BasicCardHome';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser,getUserError, getUserStatus,getUserInfo  } from '../appfeatures/about/aboutSlice';
const Home = () => {

  const dispatch = useDispatch()
const userStatus = useSelector(getUserStatus)
const userList = useSelector(getUserInfo)
  useEffect(() => {
    if(userStatus === "idle"){
      console.log("Fetching user...");
      dispatch(fetchUser())
      
    }else if (userStatus === "succeeded") {
      console.log("users fetched successfully!");
      
    }
   }, [userStatus,dispatch])

    const description = userList?.map(user => user.userDescription)
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [mainUrl, setMainUrl] = useState("");

useEffect(() => {
  if (userStatus === "succeeded") {
    console.log("Users fetched successfully!");
    console.log("User list:", userList);

    const url = userList?.map(user => user.pictureUrl);
    console.log(userList, url);

    const filename = Array.isArray(url) ? url[0]?.split("/") : [];
    const newMainUrl = filename?.length > 0 ? filename[filename.length - 1] : "";
    setMainUrl(newMainUrl);
  }
}, [userList, userStatus]);


  return (
    <Box>
      <ResponsiveDrawer />

      <Box
        sx={{
          marginLeft: { xs: 5, sm: 32 },
          marginTop: -3,
          width: "75%"
        }}
      >
        <Typography variant="body1" component="p" paragraph>
          <Typography variant="h4" component="span">
            Immerse yourself in a world of inspiration and knowledge
          </Typography>
          <br />
          <br />
          Welcome to our platform, where you can explore a curated collection of poems, captivating stories, motivational speeches, thought-provoking articles, and engaging videos.
          <br />
          <br />
          Whether you seek solace in the beauty of poetry, enjoy the power of storytelling, or desire to gain insights from motivational speeches, our platform is here to ignite your imagination and broaden your horizons.
          <br />
          <br />
          Discover the enchanting realm of poems where words dance on the page, evoking emotions and painting vivid imagery. Explore the captivating stories that transport you to different worlds, leaving you spellbound with every turn of the page.
          <br />
          <br />
          Let the motivational speeches uplift your spirits, instilling a sense of purpose and encouraging you to embrace your full potential. Engage with thought-provoking articles that offer valuable insights, diverse perspectives, and a deeper understanding of the world around us.
          <br />
          <br />
          And that's not all! We have carefully curated a collection of related videos that complement the themes explored in our content, providing you with a multimedia experience that stimulates both the mind and the senses.
          <br />
          <br />
          Whether you are here to find solace, gain knowledge, or simply explore the realms of creativity, we invite you to embark on this journey with us. Let the words, stories, speeches, articles, and videos inspire, motivate, and entertain you.
          <br />
          <br />
          Welcome to a world of inspiration and enlightenment. Enjoy your exploration!
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5,
          }}
        >
        </Box>

        <Grid container spacing={5} mt={4}>
        <Grid item xs={12} sm={6} md={4}>
          <BasicCard
            title="Poems"
            description="Immerse yourself in the beauty of poetry with our curated collection of poems from various genres and poets."
            imageUrl="https://images.unsplash.com/photo-1500381457785-20c97a29c78e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9lbXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
            link="/poems"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          
          <BasicCard
            title="Stories"
            description="Get lost in captivating stories that transport you to different worlds and leave you spellbound."
            imageUrl="https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3Rvcmllc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
            link="/stories"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <BasicCard
            title="Motivational Speeches"
            description="Discover powerful speeches that uplift your spirits and inspire you to embrace your full potential."
            imageUrl="https://media.istockphoto.com/id/1398562021/photo/silhouette-man-jumping-over-the-cliffs-with-i-can-do-it-word-in-sunlight-never-give-up-good.webp?b=1&s=170667a&w=0&k=20&c=6y1bf-cYpssh9T9s9_a3rKc7X8SaFIVxrUoRiS3X6Vo="
            link="/motmsg"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <BasicCard
            title="Thought-Provoking Articles"
            description="Engage with articles that offer valuable insights, diverse perspectives, and a deeper understanding of the world."
            imageUrl="https://media.istockphoto.com/id/1219980553/photo/online-news-on-a-smartphone-and-laptop-woman-reading-news-or-articles-in-a-mobile-phone.webp?b=1&s=170667a&w=0&k=20&c=vGq-apsAbnifZ-opnwbhFdWg5bHqvl7F8UBAq2R3dVg="
            link="/articles"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <BasicCard
            title="Related Videos"
            description="Explore a collection of videos that complement our content themes, providing you with a multimedia experience."
            imageUrl="https://media.istockphoto.com/id/579162654/photo/finger-pressing-play-button-on-touch-screen.webp?b=1&s=170667a&w=0&k=20&c=etOChiM1mk9krj0iCU_aEnyR0clsY-ojQTsPagwqZwI="
            link="/video"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <BasicCard
          title = {isAuthenticated ? "Manage your Personal data" : "Find out more about the owner of the site"}
          description={isAuthenticated ? "you can updata your user info here" : description[0]}
          imageUrl={`https://ammas-sites-api.onrender.com/user/userImage/${mainUrl}`}
          link='/about'
          />
        </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
