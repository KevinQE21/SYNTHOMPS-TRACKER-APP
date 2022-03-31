import NavigationBar from '../components/NavigationBar'
import { Card, Form, Button, Alert} from 'react-bootstrap';
import { useRef, useState } from 'react';
import { useAuth } from  '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


function RegisterUserInfo() {
    const nameRef = useRef();
    const lastnameRef = useRef();
    const bloodtypeRef = useRef();
    const weightRef = useRef();
    const heightRef = useRef();
    const birthdayRef = useRef();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState('');
    const { currentUser, token } = useAuth(); 
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        try {
            const { id } = currentUser;

            const URL = 'http://localhost:5000/api/v1/user/register';

            const data = {
                email: id,
                name : nameRef.current.value,
                lastName : lastnameRef.current.value,
                bloodType : bloodtypeRef.current.value,
                birthday : birthdayRef.current.value,
                weight : weightRef.current.value,
                height : heightRef.current.value
            };

            var req = {
                url: URL,
                method: "POST",
                data: data,
                headers: {
                    Authorization: 'Bearer ' + token,
                    Accept: "application/json"
                }
            };

            console.log(data);

            await axios(req).then(resp => navigate('/home'));

        } catch (e) {
            setError(`Error: ${e.message}`);
            setLoading(false);
        }
    }

    function getBloodTypes(){
        const bloodtypes = [
            'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O-', 'O+'
        ];

        return bloodtypes.map(bloodtype => {
            return (
                <>
                    <option key={bloodtype} value={bloodtype}>
                        {bloodtype}
                    </option>
                </>
            )
        });
    }

    return (
            <>
                <NavigationBar />
                <Card className="w-75 mx-auto mt-5" >
                    <Card.Body>
                        <h1 className="display-4 text-center my-3">Tell us more about you...</h1>
                        { error && <Alert variant="danger">{ error }</Alert> }
                        <Form onSubmit={ handleSubmit }>                    
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="Text"
                                                placeholder="Name"
                                                ref={ nameRef }
                                                autoComplete="off"
                                                required>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formLastname">
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control type="Text"
                                                placeholder="Lastname"
                                                ref={ lastnameRef }
                                                required>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBloodtype">
                                <Form.Label>Bloodtype</Form.Label>
                                <Form.Select type="Text"
                                                placeholder="Bloodtype" 
                                                ref={ bloodtypeRef }
                                                required>
                                    { getBloodTypes() }
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formWeight">
                                <Form.Label>Weight</Form.Label>
                                <Form.Control type="Text"
                                                placeholder="kg" 
                                                ref={ weightRef }
                                                required>
                                </Form.Control>
                                
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formHeight">
                                <Form.Label>Height</Form.Label>
                                <Form.Control type="Text"
                                                placeholder="cm" 
                                                ref={ heightRef }
                                                required>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBirthday">
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control type="Text"
                                                placeholder="2000-01-01" 
                                                ref={ birthdayRef }
                                                required>
                                </Form.Control>
                            </Form.Group>

                            <Button className="w-100" 
                                    variant="dark"
                                    type="submit"
                                    disabled={ loading }>
                                Register
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </>                
    );
}

export default RegisterUserInfo