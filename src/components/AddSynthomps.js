import { useState, useRef, useEffect } from "react";
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import { useAuth } from  '../contexts/AuthContext';
import axios from 'axios';

import { FaPlus } from 'react-icons/fa';

function AddSynthomps(){
    const { currentUser, token } = useAuth(); 
    const [show, setShow] = useState(false);
    const [intensity, setintensity] = useState('');
    const [synthomps, setSynthomp] = useState([]);    
    const [ error, setError ] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const comment = useRef();
    const synthomp = useRef();

    async function handleSubmit(e){
        e.preventDefault();

        try {
            const { id } = currentUser;

            const URL = 'http://localhost:5000/api/v1/track';

            const data = {
                email: id,
                intensity : intensity,
                comments : comment.current.value,
                synthomp : synthomp.current.value,
                date : new Date().toISOString().slice(0, 10)
            };

            console.log(data);

            var req = {
                url: URL,
                method: "POST",
                data: data,
                headers: {
                    Authorization: 'Bearer ' + token,
                    Accept: "application/json"
                }
            };

            await axios(req)
              .then(resp => {
                handleClose()
              })
              .catch(
                <Alert variant="danger">
                  Error
                </Alert>
              );

        } catch (e) {
            setError(`Error: ${e.message}`);
        }
    }

    async function getSynthomps(){
        const { id } = currentUser;
        
        const URL = `http://localhost:5000/api/v1/synthomps/userSynthomps?email=${id}`;    

        var req = {
            url: URL,
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: "application/json"
            }
        };

        await axios(req).then(resp => setSynthomp(resp.data.userSynthomps));
    }

    useEffect(() => {
        getSynthomps()  
    });

    const handleChange = e => {
        e.persist();
        setintensity(e.target.value);        
    };
    

  return (
    <>
      <Button variant="dark" size="lg" onClick={handleShow} className="button-bottom">
        <FaPlus />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Report Symptom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Please, insert all the information required below</p>
            { error && <Alert variant="danger">{ error }</Alert> }
            <Form>
                <Form.Group className="mb-3" controlId="formSynthomp">
                    <Form.Label>Please select a synthomp:</Form.Label>
                    <Form.Select 
                                type="Text"
                                placeholder="Synthomp" 
                                ref={ synthomp }
                                required>
                                  {synthomps.map(synthomp => {
                                        return (
                                            <>
                                                <option key={synthomp.id} value={synthomp.id}>
                                                    {synthomp.name}
                                                </option>
                                            </>
                                        )
                                      }
                                    )
                                  }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formComment">
                    <Form.Label>Insert any descripton of the synthomp you are feeling</Form.Label>
                    <Form.Control 
                                as="textarea" 
                                ref={ comment } 
                                rows={3} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formComment">
                <Form.Label>Select a value to describe the intensity, with 5 being the highest and 1 being the lowest.</Form.Label>
                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                        inline
                        label="1"
                        value="1"
                        name="group1"
                        onChange={handleChange}
                        type={type}
                        id={`inline-${type}-1`}
                    />
                    <Form.Check
                        inline
                        label="2"
                        value="2"
                        name="group1"
                        onChange={handleChange}
                        type={type}
                        id={`inline-${type}-2`}
                    />
                    <Form.Check
                        inline
                        label="3"
                        value="3"
                        name="group1"
                        onChange={handleChange}
                        type={type}
                        id={`inline-${type}-3`}
                    />
                    <Form.Check
                        inline
                        label="4"
                        value="4"
                        name="group1"
                        onChange={handleChange}
                        type={type}
                        id={`inline-${type}-4`}
                    />
                    <Form.Check
                        inline
                        label="5"
                        value="5"
                        name="group1"
                        onChange={handleChange}
                        type={type}
                        id={`inline-${type}-5`}
                    />
                    </div>
                ))}
                </Form.Group>                
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddSynthomps