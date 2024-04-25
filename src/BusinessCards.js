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

import { Spinner } from "flowbite-react";

import {apiUrl} from './Config.js'


const BusinessCards = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [businessCards, setBusinessCards] = useState([]);

  const handleFileUpload = (event) => {
    // get the selected file from the input
    setLoading(true);
    const file = event.target.files[0];
    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append("file", file);
    // make a POST request to the File Upload API with the FormData object and Rapid API headers
    axios
      .post(apiUrl + `/api/bc-reader/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
		// handle the response
		setLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        // handle errors
        setLoading(false);
        console.log(error);
      });
  };

  const deleteCard = cardId => {
    fetch(apiUrl + `/api/bc-reader/${id}/cards/${cardId}`, {
      method: "DELETE",
    }).then(() => {
      window.location.reload();
    })
    .catch(error => {
        console.error(error);
     });;
  }

  useEffect(() => {
    axios.get(apiUrl + `/api/bc-reader/${id}`)
      .then(
        response => {
          setBusinessCards(response.data);
        }
      )
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="outer">
        <div class="flex h-screen justify-center items-center" style={{ display: (loading ? 'flex' : 'none') }}>
            <div class="text-center">
                <Spinner/>
            </div>
          </div>
        <div className="inner" style={{ display: (!loading ? 'inline-block' : 'none') }}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Business Card</Form.Label>
            <Form.Control type="file" onChange={handleFileUpload} />
          </Form.Group>
          {businessCards.map(item => (
            <Card style={{ width: '100%', display: "flex", flexDirection: "column", alignItems: "left" }} key={item.id}>
                <Card.Header>
                <div className="float-start" style={{alignItems: "left"}}>
                    <h4>{item.companyName}</h4>
                </div>
                <div className="float-end">
                    <Button variant="outline-danger" onClick={() => deleteCard(item.id)}>-</Button>
                </div>
                </Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item key={item.id+'_personName'}><div className="text-muted">Contact Person:</div> {item.personName}</ListGroup.Item>
                    <ListGroup.Item key={item.id+'_industry'}><div className="text-muted">Industry:</div> {item.industry}</ListGroup.Item>
                    <ListGroup.Item key={item.id+'_phone'}><div className="text-muted">Phone:</div> {item.phone}</ListGroup.Item>
                    <ListGroup.Item key={item.id+'_email'}><div className="text-muted">Email:</div> {item.email}</ListGroup.Item>
                    <ListGroup.Item key={item.id+'_address'}><div className="text-muted">Address:</div> {item.address}</ListGroup.Item>
                    <ListGroup.Item key={item.id+'_website'}><div className="text-muted">Website:</div> {item.website}</ListGroup.Item>
                    {Object.keys(item.additionalData).map((key, i) => {return (<ListGroup.Item key={item.id+'_'+key}><div className="text-muted">{key}:</div> {item.additionalData[key]}</ListGroup.Item>)})}
                    <ListGroup.Item key={item.id+'_summary'}><div className="text-muted">Summary:</div> {item.summary}</ListGroup.Item>
                </ListGroup>
                <Card.Footer className="text-muted">Created at: {item.createdAt}</Card.Footer>
            </Card>
          ))}
        </div>
      </div>
  );
};

export {BusinessCards}