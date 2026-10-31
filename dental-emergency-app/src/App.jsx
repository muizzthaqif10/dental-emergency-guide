import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Emergencies from "./pages/Emergencies";
import EmergencyGuide from "./pages/EmergencyGuide";
import Learn from "./pages/Learn";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/emergencies" element={<Emergencies />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/emergencies/anaphylaxis/:step" element={<Navigate to="/emergencies/anaphylaxis" replace />} />
        <Route path="/emergencies/:id" element={<EmergencyGuide />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;