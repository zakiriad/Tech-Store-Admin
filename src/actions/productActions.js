import axios from "axios";
import {
    ADDING_ITEM_ERROR,
    ADDING_ITEM_SUCCESS
} from "../actions/types";
import {clearErrors, returnErrors}from "./errorActions";


export const Add = ({nom, description,quantite, prix, photoURI, Category}) =>(dispatch, getState)=>{
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body = JSON.stringify({nom, description,quantite, prix, photoURI, Category});
    axios
    .post("http://localhost:5000/api/Produit", body, tokenConfig(getState))
    .then(res =>{
        dispatch({
            type:ADDING_ITEM_SUCCESS
        })
        clearErrors();
    })
    .catch(error=>{
        console.log(error.message);
        dispatch({
            type: ADDING_ITEM_ERROR
        });
    });
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