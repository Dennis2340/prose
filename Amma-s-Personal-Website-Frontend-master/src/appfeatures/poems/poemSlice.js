import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";
const POEM_URL = "http://localhost:3600/poem"

const initialState = {
    poems: [],
    status: "idle",
    error: null
}

export const fetchPoemsQuery = async() => {
  try {
    const poemData =  await axios.get(POEM_URL + `/getAllPoems`)
    if(poemData.status === 200){
      return poemData.data
    }
    else{
      return "Error Occured while fetching"
    }
  } catch (error) {
    console.log(error)
  }
}
export const fetchPoems = createAsyncThunk("poems/fetchPoems", async()=> {
 const poemData =  await axios.get(POEM_URL + "/getAllPoems")
 return poemData.data
})

export const addNewPoemQuery = async(initialPoem) => {
  try {
   const response = await api.post(POEM_URL + "/addPoem", initialPoem)
   return response.data 
 } catch (error) {
    return error.message
  }
  
}
export const addNewPoem = createAsyncThunk("poem/addNewPoem", async(initialPoem) => {
   try {
    const response = await api.post(POEM_URL + "/addPoem", initialPoem)
    return response.data   
  } catch (error) {
     return error.message
   }
   
})

export const updatePoem = createAsyncThunk("poem/updatePoem", async(initialPoem) => {
    try {
      const { _id } = initialPoem
       const response = await api.put(POEM_URL + `/updatePoem/${_id}`, initialPoem)
       return response.data
    } catch (error) {
        return error.message
    }
})

export const updatePoemQuery =  async(initialPoem) => {
  try {
    const { _id } = initialPoem
     const response = await api.put(POEM_URL + `/updatePoem/${_id}`, initialPoem)
     return response.data
  } catch (error) {
      return error.message
  }
}

export const deletePoem = createAsyncThunk("poem/deletePoem", async(initialPoem) => {
  try {
    const { _id } = initialPoem
   const response = await api.delete(POEM_URL + `/deletePoem/${_id}`)
   if(response?.status === 200) return initialPoem
   return `${response?.status} : ${response?.statusText}`
  } catch (error) {
    return error.message
  }
})

export const deletePoemQuery =  async(_id) => {
  try {

   const response = await api.delete(POEM_URL + `/deletePoem/${_id}`)
   return `${response?.status} : ${response?.statusText}`
  } catch (error) {
    return error.message
  }
}

export const getSinglePoem = createAsyncThunk("poem/fetchSinglePoem", async(initialPoem) => {
  try {
    const { _id } = initialPoem
    const response = await axios.get(POEM_URL + `/getSinglePoem/${_id}`)
     return response.data
  } catch (error) {
    
  }
})

const poemSlice = createSlice({
    name: "poems",
    initialState,
    reducers: {
        poemAdded: {
            reducer: (state, action) => {
                state.poems.push(action.payload)
            }
        }

    },
    extraReducers(builder) {
        builder
          .addCase(fetchPoems.pending, (state) => {
            state.status = "loading"
          })
          .addCase(fetchPoems.fulfilled, (state,action) => {
            state.status = "succeeded"
            
             const loadedPoems = action.payload.poems.map(poem => {
                // poem.createdAt = sub(new Date(), { minutes: min++})
                 return poem
             })
             if (state.poems.length === 0) {
              state.poems = loadedPoems;
            }
          })
          .addCase(fetchPoems.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.payload
          })
          .addCase(addNewPoem.fulfilled, (state,action) => {
            
            state.poems.push(action.payload)
          })
          
          .addCase(updatePoem.fulfilled, (state, action) => {
            const updatedPoem = action.payload;
          
            if (!updatedPoem?._id) {
              console.log("Update could not happen, check for errors");
              
              return;
            }
          
            const updatedPoems = state.poems.map((poem) => {
              return poem
            });
          
            state.poems = updatedPoems;
          })
          
          .addCase(deletePoem.fulfilled, (state, action) => {
            const deletedPoem = action.payload;
          
            if (!deletedPoem?._id) {
              console.log("Delete could not complete");
            
              return;
            }
            state.poems = state.poems.filter((poem) => poem._id !== deletedPoem._id);
          })
          
        
         
    }
})

export const getAllPoems = (state) => {
 
    return state.poems.poems
}
export const getPoemStatus = (state) => state.poems.status
export const getPoemError = (state) => state.poems.error
export const selectPoemById = ((state, poemId) => state.poems.poems.find(poem => poem._id === poemId))
export default poemSlice.reducer

export const { poemAdded } = poemSlice.actions