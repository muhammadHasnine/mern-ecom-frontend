import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  DELETE_ORDERS_FAIL,
  DELETE_ORDERS_REQUEST,
  DELETE_ORDERS_SUCCESS,
  UPDATE_ORDERS_FAIL,
  UPDATE_ORDERS_REQUEST,
  UPDATE_ORDERS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";
import axios from "axios";
import { server } from "../store";
//Create Order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials:true,
    };
    const {data} = await axios.post(`${server}/api/v1/order/new`,order,config)
    dispatch({
        type:CREATE_ORDER_SUCCESS,
        payload:data 
    })
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// My Orders
export const myOrders = () => async (dispatch) =>{
  try {
    const config = {
      withCredentials:true,
    }
    dispatch({type:MY_ORDERS_REQUEST})
    const {data} = await axios.get(`${server}/api/v1/orders/me`,config)
    dispatch({
      type:MY_ORDERS_SUCCESS,
      payload:data.orders,
    })
  } catch (error) {
    dispatch({
      type:MY_ORDERS_FAIL,
      payload:error.response.data.message,
    })
    
  }
}

// All Orders ---- Admin
export const allOrders = () => async (dispatch) =>{
  try {
    const config = {
      withCredentials:true,
    }
    dispatch({type:ALL_ORDERS_REQUEST})
    const {data} = await axios.get(`${server}/api/v1/admin/orders`,config)
    dispatch({
      type:ALL_ORDERS_SUCCESS,
      payload:data,
    })
  } catch (error) {
    dispatch({
      type:ALL_ORDERS_FAIL,
      payload:error.response.data.message,
    })
    
  }
}


//Update Order ---- admin
export const updateOrder = (id,order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDERS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials:true,
    };
    const {data} = await axios.put(`${server}/api/v1/admin/order/${id}`,order,config)
    dispatch({
        type:UPDATE_ORDERS_SUCCESS,
        payload:data.success 
    })
  } catch (error) {
    dispatch({
      type: UPDATE_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};


//Delete Order ---- admin
export const deleteOrder = (id) => async (dispatch) => {
    try {
      const config = {
        withCredentials:true,
      }
      dispatch({type:DELETE_ORDERS_REQUEST})
      const {data} = await axios.delete(`${server}/api/v1/admin/order/${id}`,config);
      dispatch({
        type:DELETE_ORDERS_SUCCESS,
        payload:data.success
      })
    } catch (error) {
        dispatch({
          type:DELETE_ORDERS_FAIL,
          payload:error.response.data.message
        })
    }
}

//Order Details
export const getOrderDetails = (id) => async (dispatch)=>{
  try {
    const config = {
      withCredentials:true,
    }
    dispatch({type:ORDER_DETAILS_REQUEST})
    const {data} = await axios.get(`${server}/api/v1/order/${id}`,config)
    dispatch({
      type:ORDER_DETAILS_SUCCESS,
      payload:data.order
    })
  } catch (error) {
    dispatch({
      type:ORDER_DETAILS_FAIL,
      payload:error.response.data.message
    })
  }
}
// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
