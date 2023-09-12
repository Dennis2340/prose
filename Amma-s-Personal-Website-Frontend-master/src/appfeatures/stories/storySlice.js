import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import sub from "date-fns/sub";
import api from "../../api";
const STORY_URL = "https://ammas-sites-api.onrender.com/story"

const initialState = {
    stories: [],
    status: "idle",
    error: null
}

export const fetchStories = createAsyncThunk("story/fetchStories", async() => {
  const storyData = await axios.get(STORY_URL + "/getAllStory")
  console.log(storyData.data)
  return storyData.data
})

export const addNewStory = createAsyncThunk("story/addNewStory", async(initialStory) => {
   try {
    const response = await api.post(STORY_URL + "/addStory", initialStory)
    console.log(response.data)
    return response.data   
  } catch (error) {
     return error.message
   }
   
})

export const updateStory = createAsyncThunk("story/updateStory", async(initialStory) => {
      const { _id } = initialStory
      console.log(_id)
    try {
       const response = await api.put(STORY_URL + `/updateStory/${_id}`, initialStory)
       return response.data
    } catch (error) {
        return error.message
    }
})

export const deleteStory = createAsyncThunk("story/deleteStory", async(initialStory) => {
  const { _id } = initialStory
  try {
   const response = await api.delete(STORY_URL + `/deleteStory/${_id}`)
   if(response?.status === 200) return initialStory
   return `${response?.status} : ${response?.statusText}`
  } catch (error) {
    return error.message
  }
})

export const getSinglePoem = createAsyncThunk("poem/fetchSinglePoem", async(initialPoem) => {
  const { _id } = initialPoem
  try {
    const response = await axios.get(STORY_URL + `/getSinglePoem/${_id}`)
     return response.data
  } catch (error) {
    
  }
})


const storySlice = createSlice({
    name: "stories",
    initialState,
    reducers: {
        storyAdded: {
            reducer: (state, action) => {
                state.stories.push(action.payload)
            }
        }

    },
    extraReducers(builder) {
        builder
          .addCase(fetchStories.pending, (state) => {
            state.status = "loading"
          })
          .addCase(fetchStories.fulfilled, (state,action) => {
            state.status = "succeeded"
            
            const loadedStory = action.payload.story?.map((story) => {
              // Add any additional processing or modifications to the story object if needed
              return story;
            });
            
            if (state.stories.length === 0) {
              state.stories = loadedStory;
            }
        })
          
           
          .addCase(fetchStories.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.payload
          })
          .addCase(addNewStory.fulfilled, (state,action) => {
            //action.payload.createdAt = new Date().toISOString()
            console.log(action.payload)
            state.stories.push(action.payload)
          })
          
          .addCase(updateStory.fulfilled, (state, action) => {
            const updatedStory = action.payload;
          
            if (!updatedStory?._id) {
              console.log("Update could not happen, check for errors");
              console.log(updatedStory);
              return;
            }
          
            const updatedStories = state.stories.map((story) =>
              
              story._id === updatedStory._id ? updatedStory : story
            );
          
            state.stories = updatedStories
          })
          
          .addCase(deleteStory.fulfilled, (state, action) => {
            const deletedStory = action.payload;
          
            if (!deletedStory?._id) {
              console.log("Delete could not complete");
              console.log(deletedStory);
              return;
            }
          
            state.stories = state.stories.filter((story) => story._id !== deletedStory._id);
          })
          
        
         
    }
})

export const getAllStories = (state) => {
    console.log(state.stories)
    return state.stories.stories
}
export const getStoryStatus = (state) => state.stories.status
export const getStoryError = (state) => state.stories.error
export const selectStoryById = ((state, storyId) => state.stories.stories.find(story => story._id === storyId))
export default storySlice.reducer

export const { storyAdded } = storySlice.actions