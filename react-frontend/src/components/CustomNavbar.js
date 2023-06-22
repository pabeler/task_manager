import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";
import {Nav} from "react-bootstrap";

export default function CustomNavbar() {

    return (
        <Navbar collapseOnSelect expand="lg" style={{backgroundColor: "rgb(63, 35, 20)"}}>
            <Container>
                <Navbar.Brand>
                    <Link to="/"><img src="images\logo.png" alt="logo" width="250" height="50"/></Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="border rounded border-primary" href="/new_task" style={{color: "white"}}>
                            Add new task
                        </Nav.Link>
                        <Nav.Link className="border rounded border-primary" href="#" style={{color: "white"}}>
                            Show all tasks
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
