import { useState } from "react";
import {
  generatePath,
  useNavigate,
} from "react-router-dom";


const Home = () => {
  const [id, setId] = useState();
  const navigate = useNavigate();

  const handleProceed = (e) => {
    console.log(id);
    id && navigate(generatePath("/business-cards/:id", { id }));
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div>
        <h4>Enter your id:</h4>
      </div>
      <div>
        <input name="Id" value={id} onChange={(e)=>setId(e.target.value)}  style={{ width: "400px" }} />
      </div>
      <button onClick={handleProceed} style={{ width: "400px" }}>
        Proceed
      </button>
    </div>
  );
};

export {Home}