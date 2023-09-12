import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import sub from "date-fns/sub";
import api from "../../api";
const ARTICLE_URL = "http://localhost:3600/article"

const initialState = {
    articles: [],
    status: "idle",
    error: null
}

export const fetchArticles = createAsyncThunk("article/fetchArticles", async() => {
    const articleData = await axios.get(ARTICLE_URL + "/getAllArticles")
    console.log(articleData.data)
    return articleData.data
  })

  export const addNewArticle = createAsyncThunk("article/addNewArticle", async(initialArticle) => {
    try {
     const response = await api.post(ARTICLE_URL + "/addArticle", initialArticle)
     console.log(response.data)
     return response.data   
   } catch (error) {
      return error.message
    }
    
 })

 export const updateArticle = createAsyncThunk("article/updateArticle", async(initialArticle) => {
    const { _id } = initialArticle
    console.log(_id)
  try {
     const response = await api.put(ARTICLE_URL + `/updateArticle/${_id}`, initialArticle)
     return response.data
  } catch (error) {
      return error.message
  }
})

export const deleteArticle = createAsyncThunk("article/deleteArticle", async(initialArticle) => {
const { _id } = initialArticle
try {
 const response = await api.delete(ARTICLE_URL + `/deleteArticle/${_id}`)
 if(response?.status === 200) return initialArticle
 return `${response?.status} : ${response?.statusText}`
} catch (error) {
  return error.message
}
})

const articleSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        articleAdded: {
            reducer: (state, action) => {
                state.articles.push(action.payload)
            }
        }

    },
    extraReducers(builder) {
        builder
          .addCase(fetchArticles.pending, (state) => {
            state.status = "loading"
          })
          .addCase(fetchArticles.fulfilled, (state,action) => {
            state.status = "succeeded"
            
            const loadedArticle = action.payload.article?.map((article) => {
              // Add any additional processing or modifications to the story object if needed
              return article;
            });
            if(state.articles.length === 0){
              state.articles = loadedArticle
            }
        })
          
           
          .addCase(fetchArticles.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.payload
          })
          .addCase(addNewArticle.fulfilled, (state,action) => {
            //action.payload.createdAt = new Date().toISOString()
            console.log(action.payload)
            state.articles.push(action.payload)
          })
          
          .addCase(updateArticle.fulfilled, (state, action) => {
            const updatedArticle = action.payload;
          
            if (!updatedArticle?._id) {
              console.log("Update could not happen, check for errors");
              console.log(updatedArticle);
              return;
            }
          
            const updatedArticles = state.stories.map((article) =>
              
              article._id === updatedArticle._id ? updatedArticle : article
            );
          
            state.articles = updatedArticles
          })
          
          .addCase(deleteArticle.fulfilled, (state, action) => {
            const deletedArticle = action.payload;
          
            if (!deletedArticle?._id) {
              console.log("Delete could not complete");
              console.log(deletedArticle);
              return;
            }
          
            state.articles = state.articles.filter((article) => article._id !== deletedArticle._id);
          })
          
        
         
    }
})

export const getAllArticles = (state) => {
    console.log(state.articles)
    return state.articles.articles
}
export const getArticleStatus = (state) => state.articles.status
export const getArticleError = (state) => state.articles.error
export const selectArticleById = ((state, articleId) => state.articles.articles.find(article => article._id === articleId))
export default articleSlice.reducer

export const { articleAdded } = articleSlice.actions