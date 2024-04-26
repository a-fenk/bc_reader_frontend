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
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Spinner } from "flowbite-react";

import {apiUrl} from './Config.js'
import { ClientJS } from 'clientjs';


const BusinessCards = () => {
  const [loading, setLoading] = useState(true);
  const [businessCards, setBusinessCards] = useState([]);
  const client = new ClientJS();
  const fingerprint = client.getFingerprint();

  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      axios.get(apiUrl + `/api/bc-reader/devices/${fingerprint}`)
      .then((response) => {
        localStorage.setItem("id", response.data)
      })
      .catch(error => {
        console.error(error);
      });
    }
    if (localStorage.getItem("id") !== null) {
      axios.get(apiUrl + `/api/bc-reader/${localStorage.getItem("id")}`)
      .then(
        response => {
          setBusinessCards(response.data);
        }
      )
      .then((response) => {
        setLoading(false)
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
    }
  }, []);

  if (localStorage.getItem("id") === null) {
    return (
      <div class="flex h-screen justify-center items-center" style={{ display: "flex" }}>
        <div class="text-center">
          <Card style={{ width: '100%', display: "flex", flexDirection: "column", alignItems: "left" }}>
            <Card.Header>
              <div className="float-start" style={{alignItems: "left"}}>
                <h4>
                  Login Failed. Use the link provided by our Team.
                </h4>
              </div>
            </Card.Header>
          </Card>
        </div>
      </div>
    )
  }

  const handleFileUpload = (event) => {
    // get the selected file from the input
    setLoading(true);
    const file = event.target.files[0];
    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append("file", file);

    // make a POST request to the File Upload API with the FormData object and Rapid API headers
    axios
      .post(apiUrl + `/api/bc-reader/${localStorage.getItem("id")}`, formData, {
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
    fetch(apiUrl + `/api/bc-reader/${localStorage.getItem("id")}/cards/${cardId}`, {
      method: "DELETE",
    }).then(() => {
      window.location.reload();
    })
    .catch(error => {
        console.error(error);
     });;
  }

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
                    <ListGroup.Item key={item.id+'_contactPerson'}><Row>
                    <Col><div className="text-muted">Name:</div> <b>{item.name}</b></Col>
                    <Col><div className="text-muted">Surname:</div> <b>{item.surname}</b></Col>
                    </Row></ListGroup.Item>
                    <ListGroup.Item key={item.id+'_industry'}><div className="text-muted">Industry:</div> {item.industry}</ListGroup.Item>
                    <ListGroup.Item key={item.id+'_phone'}><div className="text-muted">Phone:</div>
                        <a href={`tel:`+ item.phone}> {item.phone} </a>
                    </ListGroup.Item>
                    <ListGroup.Item key={item.id+'_email'}><div className="text-muted">Email:</div>
                        <a href= {`mailto: ` + item.email}> {item.email} </a>
                    </ListGroup.Item>
                    <ListGroup.Item key={item.id+'_address'}><div className="text-muted">Address:</div> {item.address}</ListGroup.Item>
                    <ListGroup.Item key={item.id+'_website'}><div className="text-muted">Website:</div>
                        <a href={item.website}> {item.website}</a>
                    </ListGroup.Item>
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