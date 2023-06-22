import {Button, Card, Form} from "react-bootstrap";
import {useState} from "react";
import DatePicker from 'react-datepicker';
import sweetalert from "sweetalert2";
import axios from "axios";
import 'react-datepicker/dist/react-datepicker.css';

export default function AddTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedDateTime, setSelectedDateTime] = useState(null);

    const convertDateToUnixTimestamp = (date) => {
        return Math.round(date.getTime() / 1000);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedDateTime && selectedDateTime > new Date()) {
            console.log(selectedDateTime);
            console.log(convertDateToUnixTimestamp(selectedDateTime));
            axios.post("http://localhost:8080/api/add", {
                title: title,
                description: description,
                deadlineDate: convertDateToUnixTimestamp(selectedDateTime)
            }).then((response) => {
                console.log(response.data);
                sweetalert.fire('Success', 'Task added successfully!', 'success')
            }).catch((error) => {
                sweetalert.fire('Error', 'Something went wrong!', 'error')
            });
        } else {
            sweetalert.fire('Error', 'Date and time must be in the future!', 'error')
        }
    };

    return (
        <>
            <div className="container mt-5 full-screen" style={{minHeight: "70vh"}}>
                <Card>
                    <Card.Header><h1>Add new task</h1></Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formTitle">
                                <Form.Label><h2>Title</h2></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Type title here"
                                    required={true}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>

                            <br/>

                            <Form.Group controlId="formDescription">
                                <Form.Label><h2>Description</h2></Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Type description of your task here"
                                    required={true}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Group>

                            <br/>

                            <Form.Group controlId="formDateTime">
                                <Form.Label><h2>Deadline date</h2></Form.Label>
                                <br/>
                                <DatePicker
                                    minDate={new Date()}
                                    selected={selectedDateTime}
                                    onChange={(date) => setSelectedDateTime(date)}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    dateFormat="yyyy-MM-dd HH:mm"
                                    placeholderText="Wybierz datę i czas"
                                />
                            </Form.Group>
                            <br/>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}
