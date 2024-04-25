import React, { Component } from 'react';
import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      ticketText: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    this.setState({ticketText: event.target.value});  }
  handleSubmit(event) {
        if (this.state.ticketText === "") {
            alert("Please write your request!");
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: this.state.ticketText })
            };
            fetch('http://localhost/tickets/', requestOptions).then(() => {
              window.location.reload();
            } );
        };
        event.preventDefault();
    }

  componentDidMount() {
    const url = "http://localhost/tickets/";
    fetch(url)
    .then(response => response.json())
    .then(json => this.setState({ tickets: json.items }))
  }

  render() {
    const { tickets } = this.state;

    const creatorType = new Map();
    creatorType.set(0, "Client");
    creatorType.set(1, "Service");

    const documentType = new Map();
    documentType.set(0, "Other");
    documentType.set(1, "VAT report");
    documentType.set(2, "VIES report");
    documentType.set(3, "Annual tax report");
    documentType.set(4, "PNL report");
    documentType.set(5, "Balance report");

    const ticketType = new Map();
    ticketType.set(0, "Other");
    ticketType.set(1, "Document request");

    const serviceType = new Map();
    serviceType.set(0, "Other");
    serviceType.set(1, "Accounting");
    serviceType.set(2, "Audit");
    serviceType.set(3, "Corporate");

      const deleteTicket = id => {
        fetch('http://localhost/tickets/' + id, {
          method: "DELETE",
        }).then(() => {
          window.location.reload();
        } );
      }

    return (
      <div className="container">
        <div class="jumbotron">
          <h1 class="display-4">Tickets</h1>
        </div>
       <Form onSubmit={this.handleSubmit}>
           <InputGroup>
            <Form.Control
              placeholder='Write your request here ("E.g. Send me tax report for 2023 asap!")'
              aria-label="ticket's text"
              type="text" value={this.state.value} onChange={this.handleChange}
            />
            <Button variant="outline-success" type="submit">Submit</Button>
           </InputGroup>
        </Form>
      <br />
        {tickets.map((ticket) => (
                <Card style={{ width: '30%' }}>
                    <Card.Header>
                    <div class="float-start">
                        <h4>{ticket.text}</h4>
                    </div>
                    <div class="float-end">
                        <Button variant="outline-danger" onClick={() => deleteTicket(ticket.id)}>-</Button>
                    </div>
                    </Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item><div className="text-muted">type:</div> {ticketType.get(ticket.type)}</ListGroup.Item>
                        <ListGroup.Item><div className="text-muted">Service:</div> {serviceType.get(ticket.service)}</ListGroup.Item>
                        <ListGroup.Item><div className="text-muted">Year:</div> {ticket.year}</ListGroup.Item>
                        <ListGroup.Item><div className="text-muted">Creator:</div> {creatorType.get(ticket.creator)}</ListGroup.Item>
                        <ListGroup.Item><div className="text-muted">Document type:</div> {documentType.get(ticket.documentType)}</ListGroup.Item>
                        {ticket.files.map((file) => (
                            <ListGroup.Item><a href = {file.path} target="_blank">Download</a></ListGroup.Item>
                        ))}
                        <ListGroup.Item><div className="text-muted">Notes:</div> {ticket.notes}</ListGroup.Item>
                    </ListGroup>
                    <Card.Footer className="text-muted">Created at: {ticket.createdAt}</Card.Footer>
                </Card>

        ))}
      </div>
    );
  }
}
export default App;