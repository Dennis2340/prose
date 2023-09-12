import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import sub from "date-fns/sub";
import api from "../../api";
const MOTMSG_URL = "https://ammas-sites-api.onrender.com/motMessage"

const initialState = {
    motmessages: [],
    status: "idle",
    error: null
}

export const fetchMotMsg = createAsyncThunk("motmsg/fetchMotMsg", async() => {
    const motmsgData = await axios.get(MOTMSG_URL + "/getAllMotMessage")
    console.log(motmsgData.data)
    return motmsgData.data
  })

  export const addNewMotMsg = createAsyncThunk("motmsg/addNewMotMsg", async(initialMotMsg) => {
    try {
     const response = await api.post(MOTMSG_URL + "/addMotMessage", initialMotMsg)
     console.log(response.data)
     return response.data   
   } catch (error) {
      return error.message
    }
    
 })

 export const updateMotMsg = createAsyncThunk("motmsg/updateMotMsg", async(initialMotMsg) => {
    const { _id } = initialMotMsg
    console.log(_id)
  try {
     const response = await api.put(MOTMSG_URL + `/updateMotMessage/${_id}`, initialMotMsg)
     return response.data
  } catch (error) {
      return error.message
  }
})

export const deleteMotMsg = createAsyncThunk("motmsg/deleteMotMsg", async(initialMotMsg) => {
const { _id } = initialMotMsg
try {
 const response = await api.delete(MOTMSG_URL + `/deleteMotMessage/${_id}`)
 if(response?.status === 200) return initialMotMsg
 return `${response?.status} : ${response?.statusText}`
} catch (error) {
  return error.message
}
})

const motmsgSlice = createSlice({
    name: "motmessages",
    initialState,
    reducers: {
        motmsgAdded: {
            reducer: (state, action) => {
                state.motmessages.push(action.payload)
            }
        }

    },
    extraReducers(builder) {
        builder
          .addCase(fetchMotMsg.pending, (state) => {
            state.status = "loading"
          })
          .addCase(fetchMotMsg.fulfilled, (state,action) => {
            state.status = "succeeded"
            
            const loadedMotMessage = action.payload.motMessages?.map((motmsg) => {
              // Add any additional processing or modifications to the story object if needed
              return motmsg;
            });
            
            if(state.motmessages.length === 0){
              state.motmessages = loadedMotMessage
            }
        })
          
           
          .addCase(fetchMotMsg.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.payload
          })
          .addCase(addNewMotMsg.fulfilled, (state,action) => {
            //action.payload.createdAt = new Date().toISOString()
            console.log(action.payload)
            state.motmessages.push(action.payload)
          })
          
          .addCase(updateMotMsg.fulfilled, (state, action) => {
            const updatedMotMsg = action.payload;
          
            if (!updatedMotMsg?._id) {
              console.log("Update could not happen, check for errors");
              console.log(updatedMotMsg);
              return;
            }
          
            const updatedMessages = state.motmessages.map((motmsg) =>
              
              motmsg._id === updatedMotMsg._id ? updatedMotMsg : motmsg
            );
          
            state.motmessages = updatedMessages
          })
          
          .addCase(deleteMotMsg.fulfilled, (state, action) => {
            const deletedMotMsg = action.payload;
          
            if (!deletedMotMsg?._id) {
              console.log("Delete could not complete");
              console.log(deletedMotMsg);
              return;
            }
          
            state.motmessages = state.motmessages.filter((motmsg) => motmsg._id !== deletedMotMsg._id);
          })
          
        
         
    }
})

export const getAllMotMsg = (state) => {
    console.log(state.motmessages)
    return state.motmessages.motmessages
}
export const getMotMsgStatus = (state) => state.motmessages.status
export const getMotMsgError = (state) => state.motmessages.error
export const selectMotMsgById = ((state, motmsgId) => state.motmessages.motmessages.find(motmsg => motmsg._id === motmsgId))
export default motmsgSlice.reducer

export const { motmsgAdded } = motmsgSlice.actions
