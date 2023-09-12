import { configureStore } from "@reduxjs/toolkit";
import poemReducer from "../appfeatures/poems/poemSlice";
import storyReducer from "../appfeatures/stories/storySlice";
import articleReducer from "../appfeatures/articles/articleSlice"
import motmsgReducer from "../appfeatures/motivationalmsg/motmsgSlice"
import videoReducer from "../appfeatures/videos/videoSlice"
import userReducer from "../appfeatures/about/aboutSlice"
const store = configureStore({
    reducer: {
     poems : poemReducer,
     stories: storyReducer,
     articles: articleReducer,
     motmessages: motmsgReducer,
     videos: videoReducer,
     user: userReducer
    }
})

export default store