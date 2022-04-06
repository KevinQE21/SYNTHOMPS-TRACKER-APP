import NavigationBar from '../components/NavigationBar'
import { Card, Form, Button, Alert, Table} from 'react-bootstrap';
import { useRef, useState, useEffect } from 'react';
import { useAuth } from  '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


function RegisterUserInfo() {
    const [synthomps, setSynthomp] = useState([]);
    const [data, setData] = useState([]);
    const synthompSelected = useRef();
    const userSynthomp = [];
    let synthompsId = [];

    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState('');
    const { currentUser, token } = useAuth(); 

    const navigate = useNavigate();

    function handleData(){
        synthompsId.forEach(id => {
            userSynthomp.push({ email: currentUser.id, name: `${id}` })
        });
    }

    async function handleSubmit(e){
        e.preventDefault();

        try {
            const URL = 'http://localhost:5000/api/v1/synthomps';

            handleData();

            const data = {
                synthomps: userSynthomp,
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

    function handleAddedSynthomp( val ){
        if(val.target.checked){
            synthompsId.push(val.target.defaultValue); 
        }
        else { 
            if (synthompsId.some(id => id === val.target.defaultValue)){
                synthompsId = synthompsId.filter(id => id !== val.target.defaultValue )
            }
        }      
        
        console.log(synthompsId);
    }

    async function getSynthomps(){
        const URL = 'http://localhost:5000/api/v1/synthomps';
        
        var req = {
            url: URL,
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: "application/json"
            }
        };

        await axios(req).then(resp => setSynthomp(resp.data.synthomps));
    }

    useEffect(() => {
        getSynthomps()  
    }, []);

    return (
            <>
                <NavigationBar />
                <Card className="w-75 mx-auto mt-5" >
                    <Card.Body>
                        <h1 className="display-4 text-center my-3">Please select any synthomp you see on the list, feel free to select as many as you want</h1>
                        { error && <Alert variant="danger">{ error }</Alert> }
                        <Form className='d-flex justify-content-center flex-wrap'>   
                            {
                                synthomps.map(synt => {
                                    return (
                                        <Form.Group className="mb-3" controlId="formBloodtype" >
                                            <Card style={{ width: '18rem' }}>
                                            <Card.Img variant="top" style={{ height: '10rem' }}  src={synt.image} />
                                            <Card.Body style={{ height: '12rem' }}>
                                                <Card.Title>{synt.name}</Card.Title>
                                                <Card.Text>
                                                {synt.description}
                                                </Card.Text>
                                                <Form.Check 
                                                    type="checkbox"
                                                    key={synt.id}
                                                    onClick={ handleAddedSynthomp }
                                                    value={synt.name}
                                                    id={synt.id}
                                                    className="d-flex justify-content-center"
                                                />
                                            </Card.Body>
                                            </Card>
                                        </Form.Group>
                                    )
                                })
                            }      
                        </Form>
                        <br />                   
                        <Button className="w-100" 
                                    variant="dark"
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={ loading }>
                                Register
                            </Button>
                    </Card.Body>
                </Card>
            </>                
    );
}

export default RegisterUserInfo