import { Typography } from '@mui/material';
import React, { Fragment } from 'react';
import CheckoutSteps from '../cart/CheckoutSteps';
import MetaData from '../layout/MetaData';
import "./ConfirmOrder.css";
import { useSelector } from 'react-redux';
import {Link, useNavigate} from "react-router-dom"
const ConfirmOrder = () => {
    const { shippingInfo,cartItems } = useSelector(state=>state.cart)
    const { user } = useSelector(state=>state.user)
    const navigate = useNavigate();
    const subtotal = cartItems.reduce((acc,item)=> acc + item.quantity * item.price, 0)
    const shippingCharges = subtotal > 1000 ? 0 : 200;
    const tax = subtotal * 0.18;
    const totalPrice = subtotal + shippingCharges + tax;
    const proceedToPayment = () =>{
      const data = {
        subtotal,
        shippingCharges,
        tax,
        totalPrice
      }
      sessionStorage.setItem("orderInfo",JSON.stringify(data));
      navigate("/process/payment")
    }
  return (
    <Fragment>
      <MetaData title="Confirm Order --- Ecommerce"/>
      <CheckoutSteps activeStep={1}/>
      <div className="confirmOrderPage">
        <div>
            <div className="confirmShippingArea">
                <Typography>Shipping Info</Typography>
                <div className="confirmShippingAreaBox">
                    <div className='flex my-5'>
                        <p>Name:</p>
                        <span>{user.name}</span>
                    </div>
                    <div className='flex my-5'>
                        <p>Phone:</p>
                        <span>{shippingInfo.phoneNo}</span>
                    </div>
                    <div className='flex my-5'>
                        <p>Address:</p>
                        <span>{shippingInfo.address}</span>
                    </div>
                </div> 
            </div>
            <div className="confirmCartItems">
                <Typography>Your Cart Items:</Typography>
                <div className="confirmCartItemsContainer">
                  {
                    cartItems && cartItems.map((item)=>(
                      <div key={item.product}>
                        <img src={item.image} alt="Product" />
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>
                        <span>
                          {item.quantity} X ৳{item.price} = <b>৳{item.quantity * item.price}</b>
                        </span>
                      </div>
                    ))
                  }
                </div>
            </div>
        </div>
        {/*  */}
        <div>
            <div className="orderSummery">
                  <Typography>Order Summery</Typography>
                  <div>
                      <div>
                        <p>Subtotal:</p>
                        <span>৳{subtotal}</span>
                      </div>
                      <div>
                        <p>Shipping Charges:</p>
                        <span>৳{shippingCharges}</span>
                      </div>
                      <div>
                        <p>GST:</p>
                        <span>৳{tax}</span>
                      </div>
                  </div>
                  <div className="orderSummeryTotal">
                    <p><b>Total:</b></p>
                    <span>৳{totalPrice}</span>
                  </div>
                  <button onClick={proceedToPayment}>Proceed to payment</button>
            </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ConfirmOrder