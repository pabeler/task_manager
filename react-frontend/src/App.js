import './App.css';
import Home from "./components/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CustomNavbar from "./components/CustomNavbar";
import CustomFooter from "./components/CustomFooter";

function App() {
return (
    <div className="App">
        <BrowserRouter>
            <CustomNavbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
            <CustomFooter/>
        </BrowserRouter>
    </div>
);
}

export default App;
