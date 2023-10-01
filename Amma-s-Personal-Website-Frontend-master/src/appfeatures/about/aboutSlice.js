import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";
const USER_URL = "https://backend-prose.onrender.com/user"

const initialState = {
    user: [],
    status: "idle",
    error: null,
    isAuthenticated: false
}

export const fetchUser = createAsyncThunk("user/fetchUser", async()=> {
 const userData =  await axios.get(USER_URL + "/getUserInfo")
 return userData.data
})

export const addNewUser = createAsyncThunk("user/addNewUser", async(initialUser) => {
    try {
     const response = await axios.post(USER_URL + "/register", initialUser,
     { headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json, text/plain, video/*'
    }}
     )
     
     return response.data   
   } catch (error) {
      return error.message
    }
    
 })

 export const Login = createAsyncThunk("user/loginUser", async(initialUser) => {
    try {
     const response = await api.post(USER_URL + "/login", initialUser)
     
     const token = response.data.token;
     localStorage.setItem('token', token);
     return response.data   
   } catch (error) {
      return error.message
    }
    
 })

 export const updateUser = createAsyncThunk("user/updateUser", async(initialUser) => {
    const { _id } = initialUser
    
  try {
     const response = await api.put(USER_URL + `/updateUser/${_id}`, initialUser)
     return response.data.payload
  } catch (error) {
      return error.message
  }
})

export const deleteUser = createAsyncThunk("user/deleteUser", async(initialUser) => {
  const { _id } = initialUser
  try {
   const response = await api.delete(USER_URL + `/deleteUser/${_id}`)
   if(response?.status === 200) return initialUser
   return `${response?.status} : ${response?.statusText}`
  } catch (error) {
    return error.message
  }
  })

const aboutSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userAdded: {
            reducer: (state, action) => {
                state.user.push(action.payload)
            }, 
        },
        loginUser: (state) => {
          state.isAuthenticated = true
         }
        
    },
    extraReducers(builder){
        builder
           .addCase(fetchUser.pending, (state) => {
            state.status = "loading"
           })
           .addCase(fetchUser.fulfilled, (state,action) => {
            state.status = "succeeded"
           
             const loadedUser = action.payload.users?.map(user => {
                // poem.createdAt = sub(new Date(), { minutes: min++})
                 return user
             })
             if (state.user.length === 0) {
              state.user = loadedUser;
            }
          })
          .addCase(fetchUser.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.payload
          })
          .addCase(addNewUser.fulfilled, (state,action) => {
            //action.payload.createdAt = new Date().toISOString()
            
            state.user.push(action.payload)
          })

          .addCase(updateUser.fulfilled, (state, action) => {
            const updatedUser = action.payload;
          
            if (!updatedUser?._id) {
              console.log("Update could not happen, check for errors");
              
              return;
            }
          
            const updatedUsers = state.user.map((poem) =>
              poem._id === updatedUser._id ? updatedUser : poem
            );
          
            state.poems = updatedUsers;
          })
          .addCase(deleteUser.fulfilled, (state, action) => {
            const deletedUser = action.payload;
          
            if (!deletedUser?._id) {
              console.log("Delete could not complete");
              
              return;
            }
          
            state.user = state.user.filter((oneUser) => oneUser._id !== deletedUser._id);
          })
    }
})

export const getUserInfo = (state) => {
  
    return state.user.user
}

export const getUserStatus = (state) => state.user.status
export const getUserError = (state) => state.user.error

export default aboutSlice.reducer

export const { userAdded, loginUser } = aboutSlice.actions
