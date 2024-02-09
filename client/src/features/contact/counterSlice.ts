import { createSlice } from "@reduxjs/toolkit"

export interface counterState{
    data:number,
    title:string
}
const intialState:counterState={
    data:21,
    title:"This is From redux Tool kit"
}

export const counterSlice= createSlice({
    name:"counter",
    initialState:intialState,
    reducers:{
        increment:(state,action)=>{
            state.data+=1
        },
        decrement:(state,action)=>{
            state.data-=1
        }
    }
})

export const {increment,decrement}= counterSlice.actions