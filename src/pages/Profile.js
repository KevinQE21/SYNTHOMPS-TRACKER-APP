import { Card } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar'
import { useAuth } from  '../contexts/AuthContext'
import axios from 'axios';
import { useEffect, useState } from "react";

function Profile() {
    const { currentUser, token } = useAuth();
    const [ user, setUser ] = useState({});

    async function fetchUsers() {
        const { id } = currentUser;
        console.log(id);
        const userData = {
            'email': id,
        }
        const URL_USER_REGISTER_API = 'http://localhost:5000/api/v1/user/getRegister';

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
            setUser(resp.data.userInfo)
        });
    }

    useEffect(() => {
        fetchUsers();
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
                            Email: {user.email}
                        </Card.Text>
                        <Card.Text className="lead text-center my-3">
                            Name: {user.name}
                        </Card.Text>
                        <Card.Text className="lead text-center my-3">
                            Lastname: {user.lastname}
                        </Card.Text>
                        <Card.Text className="lead text-center my-3">
                            Birthday: { user.birthday}
                        </Card.Text>
                        <Card.Text className="lead text-center my-3">
                            Weight: {user.weight}
                        </Card.Text>
                        <Card.Text className="lead text-center my-3">
                            Height: {user.height}
                        </Card.Text>
                        <Card.Text className="lead text-center my-3">
                            Bloodtype: {user.bloodtype}
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default Profile;