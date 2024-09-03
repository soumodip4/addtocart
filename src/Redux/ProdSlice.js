import axios from  "axios"
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

export const allprod = createAsyncThunk("prod",
    async()=>{
        const res = await axios.get("https://fakestoreapi.com/products")
        // console.log(res);
        
        return res?.data
    }
)

export const initialState = {
    isLoading:false,
    isError:false,
    allP:[],
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    totalCartPrice:JSON.parse(localStorage.getItem("price")) || []

}

const ProdSlice = createSlice({
    name:"prod",
    initialState,
    reducers:{
        addtocart:(state,{payload})=>{
            const newProd = {
                id:payload.id,
                title:payload.title,
                price:payload.price,
                updatePrice:payload.price,
                image:payload.image,
                quantity:1
            }
            const ind = state.cart.findIndex((item)=>item.id == payload.id) //The findIndex method returns the index of the first item in the cart array that matches the id of the payload. If the product is found, ind will be the index of the product in the cart; otherwise, ind will be -1.
            console.log("items",ind);
            if(ind == -1) {
                state.cart.push(newProd)
            }
            else{state.cart=state.cart.map((item,index)=>{   //is used to create a new array where
                if(index == ind){
                    item.quantity += 1
                    item.updatePrice= item.price*item.quantity
                    return item

                } else{
                    return item
                }
            })}
            state.totalCartPrice += payload.price
            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("price",JSON.stringify(state.totalCartPrice))
            
        },
        increment:(state,{payload})=>{
            state.cart = state.cart.map((item)=>{
                if(item.id == payload){
                    item.quantity +=1
                    item.updatePrice = item.price*item.quantity
                    return item
                }else{
                    return item
                }

            })
            state.totalCartPrice=state.cart.reduce((accu,item)=>{  //This line of code recalculates the total price of all items in the cart and assigns it to state.totalCartPrice. Let's break it down step by step:
                return accu+item.updatePrice
              },0)                                                   //accu: Short for "accumulator." This variable keeps track of the running total as the reduce method iterates over each item in the cart.                                                           // item: Represents the current item in the cart that is being processed.
            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("price",JSON.stringify(state.totalCartPrice))

        },

        decrement:(state,{payload})=>{
            state.cart = state.cart.map((item)=>{
                if(item.id == payload){
                    item.quantity -=1
                    item.updatePrice = item.price*item.quantity
                    return item
                }else{
                    return item
                }

            })
            state.totalCartPrice=state.cart.reduce((accu,item)=>{
                return accu+item.updatePrice
              },0)
            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("price",JSON.stringify(state.totalCartPrice))

        },
        deleteProd:(state,{payload})=>{
            state.cart=state.cart.filter((item)=>{  //state.cart.filter(...): The filter method creates a new array that contains all items except the one with the id equal to payload.
                                                    //item.id !== payload: This comparison checks if the current item's id is different from the payload. If it's different, the item remains in the cart; otherwise, it's removed.
                return item.id !== payload
            })
            state.totalCartPrice = state.cart.reduce((accu,item)=>{
               return accu+item.updatePrice
            },0)
            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("price",JSON.stringify(state.totalCartPrice))

        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(allprod.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(allprod.fulfilled,(state,{payload})=>{
            console.log(payload);
            
            state.isLoading=false
            state.allP=payload
        })
        .addCase(allprod.rejected,(state)=>{
            state.isError=true
        })
    }
})
export const {addtocart,deleteProd,increment,decrement} = ProdSlice.actions
export default ProdSlice.reducer