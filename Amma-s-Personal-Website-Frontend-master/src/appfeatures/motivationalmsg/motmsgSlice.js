import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";
const MOTMSG_URL = "https://backend-prose.onrender.com/motivationalmessage"

const initialState = {
    motmessages: [],
    status: "idle",
    error: null
}

export const fetchMotMsgQuery = async() => {
  try {
    const motmsgData =  await axios.get(MOTMSG_URL + "/getAllMotMessage")
    if(motmsgData.status === 200){
      return motmsgData.data
    }
    else{
      return "Error Occured while fetching"
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchMotMsg = createAsyncThunk("motmsg/fetchMotMsg", async() => {
    const motmsgData = await axios.get(MOTMSG_URL + "/getAllMotMessage")

    return motmsgData.data
  })

  export const addNewMotMsg = createAsyncThunk("motmsg/addNewMotMsg", async(initialMotMsg) => {
    try {
     const response = await api.post(MOTMSG_URL + "/addMotMessage", initialMotMsg)
    
     return response.data   
   } catch (error) {
      return error.message
    }
    
 })

 export const addNewMotMsgQuery =  async(initialMotMsg) => {
  try {
   const response = await api.post(MOTMSG_URL + "/addMotMessage", initialMotMsg)
   return response.data   
 } catch (error) {
    return error.message
  }
  
}

 export const updateMotMsg = createAsyncThunk("motmsg/updateMotMsg", async(initialMotMsg) => {
  try {
    const { _id } = initialMotMsg
     const response = await api.put(MOTMSG_URL + `/updateMotMessage/${_id}`, initialMotMsg)
     return response.data
  } catch (error) {
      return error.message
  }
})

export const updateMotMsgQuery = async(initialMotMsg) => {
  try {
    const { _id } = initialMotMsg
     const response = await api.put(MOTMSG_URL + `/updateMotMessage/${_id}`, initialMotMsg)
     return response.data
  } catch (error) {
      return error.message
  }
}

export const deleteMotMsg = createAsyncThunk("motmsg/deleteMotMsg", async(initialMotMsg) => {
try {
  const { _id } = initialMotMsg
 const response = await api.delete(MOTMSG_URL + `/deleteMotMessage/${_id}`)
 if(response?.status === 200) return initialMotMsg
 return `${response?.status} : ${response?.statusText}`
} catch (error) {
  return error.message
}
})

export const deleteMotMsgQuery = async(_id) => {
  try {
   const response = await api.delete(MOTMSG_URL + `/deleteMotMessage/${_id}`)
   return `${response?.status} : ${response?.statusText}`
  } catch (error) {
    return error.message
  }
}

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
            
            state.motmessages.push(action.payload)
          })
          
          .addCase(updateMotMsg.fulfilled, (state, action) => {
            const updatedMotMsg = action.payload;
          
            if (!updatedMotMsg?._id) {
              console.log("Update could not happen, check for errors");
              
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
              
              return;
            }
          
            state.motmessages = state.motmessages.filter((motmsg) => motmsg._id !== deletedMotMsg._id);
          })
          
        
         
    }
})

export const getAllMotMsg = (state) => {
    return state.motmessages.motmessages
}
export const getMotMsgStatus = (state) => state.motmessages.status
export const getMotMsgError = (state) => state.motmessages.error
export const selectMotMsgById = ((state, motmsgId) => state.motmessages.motmessages.find(motmsg => motmsg._id === motmsgId))
export default motmsgSlice.reducer

export const { motmsgAdded } = motmsgSlice.actions
