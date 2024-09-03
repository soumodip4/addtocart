import React, { useEffect } from 'react'
import {useDispatch,useSelector }from "react-redux"
import { addtocart, allprod } from '../Redux/ProdSlice'
import {Link} from "react-router-dom"

const Allprod = () => {
  const dispatch = useDispatch()
  const {allP} = useSelector((s)=>s.prod)
  useEffect(()=>{
    dispatch(allprod())
  },[])
  // console.log(allP);

  const addItem = (prod) =>{
     dispatch(addtocart(prod))
  }
  
  return (
    <>
    <Link  to={"/cart"}>
    <button>Cart item</button>
    </Link>
    <div>

      {allP?.map((item)=>{
        return(
          <>
          <img style={{height:"120px"}} src={item?.image} alt="" /> <br />
          <p>{item?.title}</p> 
          <p>{item?.price}</p> 
          <button onClick={()=>addItem(item)}>add to cart</button> <br />
          </>
        )
      })}
    </div>
    </>
  )
}

export default Allprod
