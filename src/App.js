import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {BusinessCards} from "./BusinessCards.js"
import {Login} from "./Login.js"
import {Logout} from "./Logout.js"

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/:id" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<BusinessCards />} />
        </Routes>
      </Router>
    </div>
  );
}
