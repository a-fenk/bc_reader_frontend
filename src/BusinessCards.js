import {
  useParams,
} from "react-router-dom";
import { useState, useEffect } from "react";

import axios from 'axios';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


const BusinessCards = () => {
  const { id } = useParams();
  const [businessCards, setBusinessCards] = useState([]);

  const handleFileUpload = (event) => {
    // get the selected file from the input
    const file = event.target.files[0];
    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append("file", file);
    // make a POST request to the File Upload API with the FormData object and Rapid API headers
    axios
      .post(`http://192.168.0.9` + `/api/bc-reader/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
		// handle the response
        window.location.reload();
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };

  const deleteCard = cardId => {
    fetch(`http://192.168.0.9` + `/api/bc-reader/${id}/cards/${cardId}`, {
      method: "DELETE",
    }).then(() => {
      window.location.reload();
    })
    .catch(error => {
        console.error(error);
     });;
  }

  useEffect(() => {
    axios.get(`http://192.168.0.9` + `/api/bc-reader/${id}`)
      .then(response => {
        setBusinessCards(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <ul>
      <input type="file" onChange={handleFileUpload} />
      {businessCards.map(item => (
        <Card style={{ width: '30%' }}>
            <Card.Header>
            <div class="float-start">
                <h4>{item.companyName}</h4>
            </div>
            <div class="float-end">
                <Button variant="outline-danger" onClick={() => deleteCard(item.id)}>-</Button>
            </div>
            </Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item><div className="text-muted">Contact Person:</div> {item.personName}</ListGroup.Item>
                <ListGroup.Item><div className="text-muted">Industry:</div> {item.industry}</ListGroup.Item>
                <ListGroup.Item><div className="text-muted">Phone:</div> {item.phone}</ListGroup.Item>
                <ListGroup.Item><div className="text-muted">Email:</div> {item.email}</ListGroup.Item>
                <ListGroup.Item><div className="text-muted">Address:</div> {item.address}</ListGroup.Item>
                <ListGroup.Item><div className="text-muted">Website:</div> {item.website}</ListGroup.Item>
                {Object.keys(item.additionalData).map((key, i) => {return (<ListGroup.Item><div className="text-muted">{key}:</div> {item.additionalData[key]}</ListGroup.Item>)})}
                <ListGroup.Item><div className="text-muted">Summary:</div> {item.summary}</ListGroup.Item>
            </ListGroup>
            <Card.Footer className="text-muted">Created at: {item.createdAt}</Card.Footer>
        </Card>
      ))}
    </ul>
  );
};

export {BusinessCards}