import NavigationBar from '../components/NavigationBar'
import { Card, Form, Button, Alert} from 'react-bootstrap';
import { useRef, useState } from 'react';
import { useAuth } from  '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';


function Register() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState('');
    const { register } = useAuth(); 
    const history = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        if ( passwordRef.current.value !== confirmPasswordRef.current.value )
            return setError(`Password don't match`);

        try {
            setError('');
            setLoading(true);
            await register(emailRef.current.value, passwordRef.current.value);  
            history('/login');
        } catch (e) {
            setError(`Error: ${e.message}`);
            setLoading(false);
        }
    }

    return (
            <>
                <NavigationBar />
                <Card className="w-75 mx-auto mt-5" >
                    <Card.Body>
                        <h1 className="display-4 text-center my-3">Sign Up</h1>
                        { error && <Alert variant="danger">{ error }</Alert> }
                        <Form onSubmit={ handleSubmit }>                    
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email"
                                                placeholder="Enter Email"
                                                ref={ emailRef }
                                                autoComplete="off"
                                                required>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                                placeholder="Password"
                                                ref={ passwordRef }
                                                required>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="Password"
                                                placeholder="Confirm Password" 
                                                ref={ confirmPasswordRef }
                                                required>
                                </Form.Control>
                            </Form.Group>

                            <Button className="w-100" 
                                    variant="dark"
                                    type="submit"
                                    disabled={ loading }>
                                Sign Up
                            </Button>
                        </Form>
                        <Card.Text className="text-muted text-center my-3"> 
                            Got an account? <Link to="/login">Log In</Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>                
    );
}

export default Register