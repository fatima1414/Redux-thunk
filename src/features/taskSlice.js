import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
var API_URL = "http://localhost:5000/taskList"
export const createTask = createAsyncThunk('/createTask',async(data)=>{
    return await axios.post(API_URL,data)
    .then((res)=>res.data)
})

export const viewTask = createAsyncThunk('/viewTask',async ()=>{
   return await  axios.get(API_URL)
   .then((res)=>res.data)
})

export const deleteTask = createAsyncThunk('/deleteTask',async(id)=>{
    return await axios.delete(`${API_URL}/${id}`)
     .then((res)=>res.data)
})

export const updateTask = createAsyncThunk('/updateTask',async(data)=>{
    return await axios.put(`${API_URL}/${data.id}`,data)
    .then((res)=>res.data)
})

const taskSlice = createSlice({
    name:'task',
    initialState:{
        taskList:[]
    },
    reducers:{},
    extraReducers:(res)=>{
        res.addCase(createTask.fulfilled,(state,action)=>{
            state.taskList.push(action.payload)
        })
        .addCase(viewTask.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.taskList = action.payload
        })
        .addCase(deleteTask.fulfilled,(state,action)=>{
            // console.log(action.payload)
            const {id}= action.payload
            const filterData = state.taskList.filter((task)=>task.id!==id)
            state.taskList =filterData
        })
        .addCase(updateTask.fulfilled,(state,action)=>{
            const{id}=action.payload
            const index = state.taskList.findIndex((task)=>task.id===id)
            if(index!=-1){
                state.taskList[index] = action.payload
            }else{
                alert("task not found")
            }
        })
    }
    
})

export default taskSlice.reducer