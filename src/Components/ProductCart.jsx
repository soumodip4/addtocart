import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, deleteProd, increment } from '../Redux/ProdSlice'

const ProductCart = () => {
    const {cart,totalCartPrice} = useSelector((s)=>s.prod)
    const dispatch = useDispatch()

    const deleteitem = (id) =>{
        dispatch(deleteProd(id))
     }
     const incrementitem = (id) =>{
        dispatch(increment(id))
     }
     const decrementitem = (id) =>{
        dispatch(decrement(id))
     }
  return (
    <div>
        <>
        <p>{totalCartPrice}</p>
        {cart?.map((item)=>{
            return(
                <>
                <div>
                <img style={{height:"120px"}} src={item?.image} alt="" />
                <p>{item?.title}</p>
                <p>{item?.updatePrice}</p> <br />
                
                <p>{item?.quantity}</p>
                <button onClick={()=>deleteitem(item?.id)}>Delete</button> 
                <button onClick={()=>incrementitem(item?.id)}>+</button> 
                <button onClick={()=>decrementitem(item?.id)}>-</button> 
                </div>
                </>
            )
        })}
        </>
      
    </div>
  )
}

export default ProductCart
