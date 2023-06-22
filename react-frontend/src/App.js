import './App.css';
import Home from "./components/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CustomNavbar from "./components/CustomNavbar";

function App() {
return (
    <div className="App">
        <BrowserRouter>
            <CustomNavbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    </div>
);
}

export default App;
