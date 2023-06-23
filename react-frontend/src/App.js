import './App.css';
import Home from "./components/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CustomNavbar from "./components/CustomNavbar";
import AddTask from "./components/AddTask";
import ShowTasks from "./components/ShowTasks";

function App() {
return (
    <div className="App">
        <BrowserRouter>
            <CustomNavbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/new_task" element={<AddTask/>}/>
                <Route path="/show_all_tasks" element={<ShowTasks/>}/>
            </Routes>
        </BrowserRouter>
    </div>
);
}

export default App;
