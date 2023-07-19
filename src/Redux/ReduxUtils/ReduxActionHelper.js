import axios from 'axios';
import { handleApiError } from '../../Utils/HelperFunctions';
export const asyncActionTypeCreator = actionName =>({
     pending:`${actionName}_PENDING`,
     fulfilled:`${actionName}_FULFILLED`,
     rejected:`${actionName}_REJECTED`
})

export const normalActionCreator = type =>({
    type,
})

export const payloadActionCreator = (type,payload) =>({
    type,
    payload,
})

export const asyncActionCreator =(actionType)=>{
    
    const pending =()=>(normalActionCreator(actionType.pending));
    const fulfilled =(payload)=>(payloadActionCreator(actionType.fulfilled,payload));
    const rejected =(error)=>(payloadActionCreator(actionType.rejected,error));

    const action=(axiosConfig,successCallback,errorCallback) =>((dispatch)=>{
         dispatch(pending());
         
         return axios(axiosConfig).then((response)=>{
            dispatch(fulfilled(response.data));
            if(successCallback)successCallback(response.data)
         }).catch((error)=>{
            dispatch(rejected(error));
            if(error.response){
                if(error.response.data.cod === "404"){
                    handleApiError(error.response.data.message)
                }else{
                    handleApiError(error.message)
                }
            }
            if(errorCallback)errorCallback(error)
         })
    });

    return {
        pending,
        fulfilled,
        rejected,
        action
    }
}