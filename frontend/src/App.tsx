import {Routes, Route, BrowserRouter } from "react-router-dom";
import Main from "./Main";
import Stats from "./Stats/Stats";

function App() {
    return (
        <BrowserRouter>
          <div>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/stats" element={<Stats />} />
            </Routes>
          </div>
        </BrowserRouter>
    );
}

export default App;