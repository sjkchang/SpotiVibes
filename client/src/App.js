import "./App.css";
import Callback from "./components/Callback";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/callback" element={<Callback />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
