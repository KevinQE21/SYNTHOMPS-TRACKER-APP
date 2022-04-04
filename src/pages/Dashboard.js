import NavigationBar from "../components/NavigationBar"
import {  useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

function Dashboard(){
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            navigate('/home');
        }    
    }, []);

    return (
        <>
            <NavigationBar/>
            <h1>Dashboard</h1>
        </>
    )
}

export default Dashboard