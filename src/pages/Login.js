import NavigationBar from '../components/NavigationBar'
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from "react";
import { useAuth } from '../contexts/AuthContext';
import { Alert, Button, Card, Form} from 'react-bootstrap';

function Login(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const { currentUser, login, token } = useAuth();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        setError('');
        setLoading(true);
        await login(emailRef.current.value, passwordRef.current.value)
            .then(response => navigate('/home'))
            .catch(e => {
                setError(e.message);
                setLoading(false);
            });
    }

    useEffect(() => {
        if (currentUser) {
            navigate('/home');
        }    
    }, []);

    return (
        <>
            <NavigationBar />
            <Card className="w-75 mx-auto mt-5">
                <Card.Body>
                    <h1 className="display-4 text-center my-3">Log In</h1>
                    { error && <Alert variant="danger">{ error }</Alert> }
                    <Form onSubmit={ handleSubmit }>
                        <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                                    ref={ emailRef } 
                                    type="email"
                                    placeholder="Enter email" 
                                    autoComplete="off" 
                                    required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                                    ref={ passwordRef } 
                                    type="password" 
                                    placeholder="Password" 
                                    autoComplete="off" 
                                    required />
                        </Form.Group>

                        <Button className="w-100" 
                                variant="dark"
                                type="submit"
                                disabled={ loading }>
                            Log In
                        </Button>
                        <Card.Text className="text-muted text-center my-3">
                            Need an account? <Link to="/register">Sign up</Link>
                        </Card.Text>
                    </Form>
                </Card.Body>
            </Card>
        </>        
    );
}

export default Login;
