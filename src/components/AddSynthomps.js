import { useState, useRef } from "react";
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import { useAuth } from  '../contexts/AuthContext';
import axios from 'axios';

function AddSynthomps(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { currentUser, token } = useAuth(); 
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState('');
    const synthomp = useRef();
    const comment = useRef();
    const intensity = useRef();

    async function handleSubmit(e){
        e.preventDefault();

        try {
            const { id } = currentUser;

            const URL = 'http://localhost:5000/api/v1/user/register';

            const data = {
                userinfoid: id,
                intensity : intensity.current.value,
                comments : comment.current.value,
                synid : synthomp.current.value
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

            await axios(req).then(resp => console.log(resp));

        } catch (e) {
            setError(`Error: ${e.message}`);
            setLoading(false);
        }
    }

    function getSynthomps(){
        
        // return bloodtypes.map(bloodtype => {
        //     return (
        //         <>
        //             <option key={bloodtype} value={bloodtype}>
        //                 {bloodtype}
        //             </option>
        //         </>
        //     )
        // });
    }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
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
                        { getSynthomps() }
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
                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type}
                        id={`inline-${type}-1`}
                    />
                    <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type}
                        id={`inline-${type}-2`}
                    />
                    <Form.Check
                        inline
                        disabled
                        label="3 (disabled)"
                        type={type}
                        id={`inline-${type}-3`}
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