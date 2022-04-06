import { useState, useRef, useEffect } from "react";
import { Table, Badge } from 'react-bootstrap';
import { useAuth } from  '../contexts/AuthContext';
import axios from 'axios';
import moment from 'moment';

function SynthompsTable(){
    const { currentUser, token } = useAuth(); 
    const [data, setData] = useState([]);

    async function getSynthomps(){
        const { id } = currentUser;

        const URL = `http://localhost:5000/api/v1/track?email=${id}`;

        var req = {
            url: URL,
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: "application/json"
            }
        };

        await axios(req).then(resp => setData(resp.data.trackList));
    }

    useEffect(() => {
        getSynthomps()  
    }, [data]);

    return (
        <>
            {
                data.length === 0 
                ?
                <h3>
                    <Badge className="d-flex justify-content-center" bg="warning" text="dark">
                        There are no incidents to display, please enter one
                    </Badge>
                </h3>                
                :
                null
            }
            <Table className="w-75 mx-auto mt-5" striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Synthomp</th>
                    <th>Date</th>
                    <th>Comment</th>
                    <th>Intensity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(x => {
                            return (
                                <tr>
                                    <td>{x.id}</td>
                                    <td>{x.name}</td>   
                                    <td>{moment.utc(x.date).format('MM/DD/YYYY')}</td>   
                                    <td>{x.comments}</td>   
                                    <td>{x.intensity}</td>       
                                </tr>
                            )
                        })
                    }    
                </tbody>
            </Table>            
        </>
    );
}

export default SynthompsTable