import { ApiTwoTone } from "@mui/icons-material";
import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import sub from "date-fns/sub";
import api from "../../api";
const VIDEO_URL = "https://ammas-sites-api.onrender.com"

const initialState = {
    videos: [],
    status: "idle",
    error: null
}

export const fetchVideos = createAsyncThunk("video/fetchVideos", async() => {
  const videoData = await axios.get(VIDEO_URL + "/getAllVideos")
  console.log(videoData.data)
  return videoData.data
})

export const addNewVideo = createAsyncThunk("video/addNewVideo", async(initialVideo) => {
    try {
     const response = await api.post(VIDEO_URL + "/addVideo", initialVideo,
     { headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json, text/plain, video/*'
    }}
     )
     console.log(response.data)
     return response.data   
   } catch (error) {
      return error.message
    }
    
 })

 export const deleteVideo = createAsyncThunk("video/deleteVideo", async(initialVideo) => {
    const { _id } = initialVideo
    try {
     const response = await api.delete(VIDEO_URL + `/deleteSingleVideo/${_id}`)
     if(response?.status === 200) return initialVideo
     return `${response?.status} : ${response?.statusText}`
    } catch (error) {
      return error.message
    }
  })

  // export const fetchVideoById = createAsyncThunk("video/fetchById", async(id) => {
     
  // })


  const videoSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {
        videoAdded: {
            reducer: (state, action) => {
                state.videos.push(action.payload)
            }
        }

    },
    extraReducers( builder){
        builder
          .addCase(fetchVideos.pending, (state) => {
            state.status = "loading"
          })
          .addCase(fetchVideos.fulfilled, (state,action) => {
            state.status = "succeeded"
            
            const loadedVideo = action.payload.videos?.map((video) => {
              // Add any additional processing or modifications to the story object if needed
              return video;
            });
            
            if(state.videos.length === 0){
              state.videos = loadedVideo
            }
        })
        .addCase(fetchVideos.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.payload
          })
          .addCase(addNewVideo.fulfilled, (state,action) => {
            //action.payload.createdAt = new Date().toISOString()
            console.log(action.payload)
            state.videos.push(action.payload)
          })
          .addCase(deleteVideo.fulfilled, (state, action) => {
            const deletedVideo = action.payload;
          
            if (!deletedVideo?._id) {
              console.log("Delete could not complete");
              console.log(deletedVideo);
              return;
            }
          
            state.videos = state.videos.filter((story) => story._id !== deletedVideo._id);
          })
    }

})


export const getAllVideos = (state) => {
    console.log(state.videos)
    return state.videos.videos
}
export const getVideoStatus = (state) => state.videos.status
export const getVideoError = (state) => state.videos.error
export const selectVideoById = ((state, videoId) => state.videos.videos?.find(video => video._id === videoId))
export default videoSlice.reducer

export const { videoAdded } = videoSlice.actions