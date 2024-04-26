import { useState } from "react";
import {
  generatePath,
  useNavigate,
} from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const Home = () => {
  const [id, setId] = useState();
  const navigate = useNavigate();

  const handleProceed = (e) => {
    id && navigate(generatePath("/business-cards/:id", { id }));
  };

  return (
    <div className="outer">
        <div className="inner">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label><h4>Enter your ID:</h4></Form.Label>
                <Form.Control className="w-full" type="text" placeholder="ID" name="Id" value={id} onChange={(e)=>setId(e.target.value)} />
            </Form.Group>
            <Button type="submit" className="w-full" onClick={handleProceed}>Proceed</Button>
          </Form>
        </div>
    </div>
  );
};

export {Home}