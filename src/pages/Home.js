import NavigationBar from "../components/NavigationBar"
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useAuth } from  '../contexts/AuthContext'
import axios from 'axios';
import AddSynthomps from "../components/AddSynthomps";
import SynthompsTable from "../components/SynthompsTable";
import { Tabs, Tab } from 'react-bootstrap';

function Home(){
    const { currentUser, token } = useAuth();
    const navigate = useNavigate();

    async function userRegisterInformation(){
        try {     
            
            const URL_USER_REGISTER_API = `http://localhost:5000/api/v1/auth/user?email=${currentUser.id}`;
            
            var req = {
                url: URL_USER_REGISTER_API,
                method: "GET",
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
            <SynthompsTable /> 
            <AddSynthomps />
        </>
    )
}

export default Home