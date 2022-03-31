import { Card } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar'
import { useAuth } from  '../contexts/AuthContext'
import axios from 'axios'
import { useEffect } from "react";

function Profile() {
    const { currentUser, token } = useAuth();
    const user = {};

    async function fetchPosts() {
        const { id } = currentUser;
        const userData = {
            'email': id,
        }
        const URL_USER_REGISTER_API = 'http://localhost:5000/api/v1/user/register';

        var req = {
            url: URL_USER_REGISTER_API,
            method: "GET",
            data: userData,
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: "application/json"
            }
        };

        await axios(req).then(resp => { console.log(resp.data)});
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <>
            <NavigationBar />
            <div className="w-75 mx-auto mt-5">
                <h1 className="display-4 text-center my-3">Hi Tracker!</h1>
                <Card className="m-2">
                    <Card.Body>
                        <h2 className="display-5 text-center my-3">Profile Information</h2>
                        <Card.Text className="lead text-center my-3">
                            Email: {currentUser.id}
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default Profile;