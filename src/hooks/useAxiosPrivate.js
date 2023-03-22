import { useEffect } from "react"
import {axiosPrivate} from "../axios"
import useRefresh from "./useRefresh"
import {AppState} from '../Store/store'


const useAxiosPrivate = () => {
    const refresh = useRefresh();

    const {auth} = AppState()
    useEffect(()=>{

        const requestIntercept = axiosPrivate.interceptors.request.use(config=>{
         
            if(!config.headers['Authorization']){
                config.headers['Authorization'] = "Bearer "+auth?.access_token;
            }
            return config
        },(error)=>{
            return Promise.reject(error)
        })


          const responseIntercept = axiosPrivate.interceptors.response.use(res=>res,async (error)=>{
           
                 const prevReq = error?.config;
                 if(error?.response?.status === 403 && !prevReq?.sent){
                    prevReq.sent = true;
                    const new_access_token = await refresh();
                    prevReq.headers.Authorization = "Bearer " + new_access_token;
                    return axiosPrivate(prevReq)
                 }
            return Promise.reject(error)

          })


          return ()=>{
            axiosPrivate.interceptors.response.eject(responseIntercept)
            axiosPrivate.interceptors.request.eject(requestIntercept)
          }
    },[auth,refresh])
  return axiosPrivate
}

export default useAxiosPrivate