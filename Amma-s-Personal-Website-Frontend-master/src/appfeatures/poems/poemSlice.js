import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import sub from "date-fns/sub";
import api from "../../api";
const POEM_URL = "http://localhost:3800/poem"

const initialState = {
    poems: [],
    status: "idle",
    error: null
}

export const fetchPoems = createAsyncThunk("poems/fetchPoems", async()=> {
 const poemData =  await axios.get(POEM_URL + "/getAllPoems")
 console.log(poemData.data)
 return poemData.data
})

export const addNewPoem = createAsyncThunk("poem/addNewPoem", async(initialPoem) => {
   try {
    const response = await api.post(POEM_URL + "/addPoem", initialPoem)
    console.log(response.data)
    return response.data   
  } catch (error) {
     return error.message
   }
   
})

export const updatePoem = createAsyncThunk("poem/updatePoem", async(initialPoem) => {
      const { _id } = initialPoem
      console.log(_id)
    try {
       const response = await api.put(POEM_URL + `/updatePoem/${_id}`, initialPoem)
       return response.data
    } catch (error) {
        return error.message
    }
})

export const deletePoem = createAsyncThunk("poem/deletePoem", async(initialPoem) => {
  const { _id } = initialPoem
  try {
   const response = await api.delete(POEM_URL + `/deletePoem/${_id}`)
   if(response?.status === 200) return initialPoem
   return `${response?.status} : ${response?.statusText}`
  } catch (error) {
    return error.message
  }
})

export const getSinglePoem = createAsyncThunk("poem/fetchSinglePoem", async(initialPoem) => {
  const { _id } = initialPoem
  try {
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
            let min = 1
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
            //action.payload.createdAt = new Date().toISOString()
            console.log(action.payload)
            state.poems.push(action.payload)
          })
          
          .addCase(updatePoem.fulfilled, (state, action) => {
            const updatedPoem = action.payload;
          
            if (!updatedPoem?._id) {
              console.log("Update could not happen, check for errors");
              console.log(updatedPoem);
              return;
            }
          
            const updatedPoems = state.poems.map((poem) =>
              poem._id === updatedPoem._id ? updatedPoem : poem
            );
          
            state.poems = updatedPoems;
          })
          
          .addCase(deletePoem.fulfilled, (state, action) => {
            const deletedPoem = action.payload;
          
            if (!deletedPoem?._id) {
              console.log("Delete could not complete");
              console.log(deletedPoem);
              return;
            }
          
            state.poems = state.poems.filter((poem) => poem._id !== deletedPoem._id);
          })
          
        
         
    }
})

export const getAllPoems = (state) => {
    console.log(state.poems)
    return state.poems.poems
}
export const getPoemStatus = (state) => state.poems.status
export const getPoemError = (state) => state.poems.error
export const selectPoemById = ((state, poemId) => state.poems.poems.find(poem => poem._id === poemId))
export default poemSlice.reducer

export const { poemAdded } = poemSlice.actions