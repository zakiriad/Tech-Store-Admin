import axios from "axios";
import {
    ADDING_CATEGORY_ERROR,
    ADD_CATEGORY_SUCCESS,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILED
} from "../actions/types";
import {clearErrors, returnErrors}from "./errorActions";


export const Add = ({nom, description}) =>(dispatch, getState)=>{
    
    const token = getState().auth.token;
    const config = {
        headers:{
            "Content-Type":"application/json",
            "x-auth-token":token
        }
    }
    
    
    const body = JSON.stringify({nom, description});
    axios
    .post("http://localhost:5000/api/Categorie", body, config)
    .then(res =>{
        clearErrors();
        dispatch({
            type:ADD_CATEGORY_SUCCESS
        });
    })
    .catch((error)=>{
        console.log(error.message);
        if(error.response){
            dispatch(returnErrors(error.response.status, error.response.data));
        }
        
        dispatch({
            type: ADDING_CATEGORY_ERROR
        })
    }
        
    )
};

export const getListCategories = () =>(dispatch, getState)=>{
    
    const token = getState().auth.token;
    const config = {
        headers:{
            "Content-Type":"application/json",
            "x-auth-token":token
        }
    }
    
    axios
    .get("http://localhost:5000/api/Categorie", tokenConfig(getState))
    .then(res =>{
        
        clearErrors();
        dispatch({
            type:GET_CATEGORIES_SUCCESS,
            payload:res.data
        });
    })
    .catch((error)=>{
        console.log(error.message);
        if(error.response){
            dispatch(returnErrors(error.response.status, error.response.data));
        }
        
        dispatch({
            type: GET_CATEGORIES_FAILED
        })
    })
};
export const tokenConfig = getState => {
    const token =  getState().auth.token;
    const config = {
        headers:{
            'Content-type' : "application/json",
            'x-auth-token':token
        }
    };
    if(token){
        config.headers["x-auth-token"] = token;
    }
    return config;
}