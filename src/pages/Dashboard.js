import NavigationBar from "../components/NavigationBar"
import {  useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import { Col, Container, Row, Card } from "react-bootstrap";

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
            <div className="pt-5 pb-5 bg-dark text-white" >
                <Container>
                    <Row>
                        <Col sm={12} md={6} className="fw-bolder lh-base d-flex flex-column justify-content-center">
                            <h1>An app made for your health</h1>
                            <p className="text-wrap">With a couple of clicks you can update your personal health file in one of the best apps in the world, more than 100,000 users are already taking care of their health</p>
                        </Col>
                        <Col sm={12} md={6} className="fw-bolder lh-base">
                            <img src="https://uicreative.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2019/11/23092213/Doctor_2.jpg" class="img-fluid" alt="..."/>
                        </Col>
                    </Row>  
                </Container>              
            </div>
            <div className="pt-5 pb-5">                
                <Container>
                    <Row className="container">
                        <Col sm={12} md={12} className="fw-bolder d-flex justify-content-center">
                            <h3>A better way to start tracking your health.</h3>
                        </Col>
                        <Col sm={12} md={12} className="d-sm-flex flex-sm-column align-items-sm-center d-md-flex flex-md-row justify-content-md-around">
                            <Card style={{ width: '18rem', height: '10rem' }}>
                                <Card.Body>
                                    <Card.Title>Easy access</Card.Title>
                                    <Card.Text>
                                    You only need an email and you can be part of our great network.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card style={{ width: '18rem', height: '10rem' }}>
                                <Card.Body>
                                    <Card.Title>Contact health professionals</Card.Title>
                                    <Card.Text>
                                    You can contact doctors worldwide and they can help you.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card style={{ width: '18rem', height: '10rem' }}>
                                <Card.Body>
                                    <Card.Title>Access anywhere in the world</Card.Title>
                                    <Card.Text>
                                    You can check your medical file anywhere in the world.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card style={{ width: '18rem', height: '10rem' }}>
                                <Card.Body>
                                    <Card.Title>Symptom Log</Card.Title>
                                    <Card.Text>
                                    You can keep track of your daily, weekly, monthly or yearly symptoms.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container> 
            </div>    
            <div className="pt-5 pb-5 bg-dark text-white" >
                <Container>
                    <Row>
                        <Col sm={12} md={12} className="fw-bolder lh-base d-flex flex-column justify-content-center">
                            <h3 className="text-center lh-base fst-italic">"Creating this application was a challenge for my team and myself, I am very happy with what we have achieved, I hope that people can take advantage of it, our goal has always been to be able to help for free"</h3>
                            <p className="text-center">Charles Adams / CEO</p>
                        </Col>
                    </Row>  
                </Container>              
            </div>       
        </>
    )
}

export default Dashboard