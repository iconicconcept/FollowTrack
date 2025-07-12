import { UserContext } from "@/context/UserContext"
import axiosInstance from "@/lib/axios"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const useUserAuth = ()=>{
    const {user, updateUser, clearUser} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(user) return;

        let isMounted = true;

        const fetchUserInfo = async ()=>{
            try {
                const response = await axiosInstance.get("/auth/getUser")

                if(isMounted && response.data){
                    updateUser(response.data)
                }
            } catch (error) {
                console.error("Fail to fetch user info:", error);
                if(isMounted){
                    clearUser();
                    navigate("/auth")
                }
            }
        }

        fetchUserInfo();

        return ()=>{
            isMounted = false
        };
    }, [user, updateUser, clearUser, navigate])
}