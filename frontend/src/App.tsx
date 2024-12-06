import { Routes, Route, BrowserRouter } from "react-router-dom";
import Main from "./Main";
import Stats from "./components/Stats";
import NavBar from "./components/Navbar"; // Import the Navbar component

function App() {
  // Define the app name and pages for the navbar
  const appName = "גמראתון";
  const pages = [
    { path: "/", label: "ראשי" },
    { path: "/stats", label: "מעקב" },
  ];

  return (
    <BrowserRouter>
      <div className="bg-light" style={{height: "100vh"}}>
        {/* Pass appName and pages to NavBar */}
        <NavBar appName={appName} pages={pages} />

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
