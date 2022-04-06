import { Card, Button } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar'
import { useAuth } from  '../contexts/AuthContext'
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import moment from 'moment';

function Profile() {
    const { currentUser, token } = useAuth();
    const [ user, setUser ] = useState({});
    const navigate = useNavigate();

    async function fetchUsers() {
        const URL_USER_REGISTER_API = `http://localhost:5000/api/v1/user/register?email=${currentUser.id}`;

        var req = {
            url: URL_USER_REGISTER_API,
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: "application/json"
            }
        };

        await axios(req).then(resp => { 
            setUser(resp.data.userInfo)
        });
    }

    const handleBack = (e) => {
        navigate('/');
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
                            Birthday: { moment.utc(user.birthday).format('MM/DD/YYYY') }
                        </Card.Text>
                        <Card.Text className="lead text-center my-3">
                            Weight: {user.weight} kg
                        </Card.Text>
                        <Card.Text className="lead text-center my-3">
                            Height: {user.height} cm
                        </Card.Text>
                        <Card.Text className="lead text-center my-3">
                            Bloodtype: {user.bloodtype}
                        </Card.Text>
                    </Card.Body>
                    <Button variant="dark" onClick={handleBack}>
                        Back
                    </Button>
                </Card>                
            </div>
        </>
    );
}

export default Profile;