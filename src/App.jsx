import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import DetailsPage from "./pages/DetailsPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/details" element={<DetailsPage />} />
      </Routes>
    </Router>
  );
}
