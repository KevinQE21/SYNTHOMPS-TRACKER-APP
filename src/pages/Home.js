import NavigationBar from "../components/NavigationBar"
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useAuth } from  '../contexts/AuthContext'
import axios from 'axios';
import AddSynthomps from "../components/AddSynthomps";

function Home(){
    const { currentUser, token } = useAuth();
    const navigate = useNavigate();

    async function userRegisterInformation(){
        try {            
            const userData = {
                'email': currentUser.id,
            }
            
            const URL_USER_REGISTER_API = 'http://localhost:5000/api/v1/auth/user';
            
            var req = {
                url: URL_USER_REGISTER_API,
                method: "POST",
                data: userData,
                headers: {
                    Authorization: 'Bearer ' + token,
                    Accept: "application/json"
                }
            };

            await axios(req).then(resp => {
                if(resp.data.user.hasInfoRegistered){
                    navigate('/home');
                }
                else {
                    navigate('/registerUserInfo');
                }
            });

        } catch (e) {
            console.log('Error : ' + e.message)
        }
    }

    useEffect(() => {
        if (currentUser) {
            userRegisterInformation();
        }
        else{
            navigate('/');
        }        
    }, []);

    

    return (
        <>
            <NavigationBar/>
            <h1>Home</h1>
            <AddSynthomps />
        </>
    )
}

export default Home