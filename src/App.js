import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {BusinessCards} from "./BusinessCards.js"
import {Home} from "./Home.js"

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/business-cards/:id" element={<BusinessCards />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}
