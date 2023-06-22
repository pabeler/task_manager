import './App.css';
import Home from "./components/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CustomNavbar from "./components/CustomNavbar";
import CustomFooter from "./components/CustomFooter";
import AddTask from "./components/AddTask";

function App() {
return (
    <div className="App">
        <BrowserRouter>
            <CustomNavbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path={"/new_task"} element={<AddTask/>}/>
            </Routes>
            <br/>
            <CustomFooter/>
            <br/>
        </BrowserRouter>
    </div>
);
}

export default App;
