import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/productConstants";
import {server} from '../store'
import axios from "axios";

//Get All Products
export const getProduct =
  (keyword = "", currentPage = 1, total = [0, 250000], Category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_PRODUCT_REQUEST,
      });
      let link = `${server}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${total[0]}&price[lte]=${total[1]}&ratings[gte]=${ratings}`;
      if (Category) {
        link = `${server}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${total[0]}&price[lte]=${total[1]}&category=${Category}&ratings[gte]=${ratings}`;
      }
      const { data } = await axios.get(link);
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//Get Details of Product
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`${server}/api/v1/product/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Create A new Review or Update a review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials:true,
    };
    const { data } = await axios.put(`${server}/api/v1/review`, reviewData, config);
    console.log(data);
    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get Admin Products
export const getAdminProducts = () => async (dispatch) => {
  try {
    const config = {
      withCredentials:true,
    }
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
    const { data } = await axios.get(`${server}/api/v1/admin/products`,config);
    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Create a Product ---- Admin
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });
    const config = { headers: { "Content-Type": "application/json" }, withCredentials:true, };
    const { data } = await axios.post(
      `${server}/api/v1/admin/product/new`,
      productData,
      config
    );
    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update a Product ---- Admin
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const config = { headers: { "Content-Type": "application/json" }, withCredentials:true, };
    const { data } = await axios.put(
      `${server}/api/v1/admin/product/${id}`,
      productData,
      config
    );
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Delete a Product ---- Admin
export const deleteProduct = (id) => async (dispatch) => {
  try {
    const config = {
      withCredentials:true,
    }
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const { data } = await axios.delete(`${server}/api/v1/admin/product/${id}`,config);
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get All Reviews of a product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    const config = {
      withCredentials:true,
    }
    dispatch({ type: ALL_REVIEW_REQUEST });
    const { data } = await axios.get(`${server}/api/v1/admin/reviews?productID=${id}`,config);
    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Delete Review of a Product ---- Admin
export const deleteReview = (reviewId, productId) => async (dispatch) => {
  try {
    const config = {
      withCredentials:true,
    }
    dispatch({ type: DELETE_REVIEW_REQUEST });
    const { data } = await axios.delete(`${server}/api/v1/admin/reviews?id=${reviewId}&productID=${productId}`,config);
    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
