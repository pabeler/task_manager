import {Button, Card, Form} from "react-bootstrap";
import {useState} from "react";
import DatePicker from 'react-datepicker';
import sweetalert from "sweetalert2";
import axios from "axios";
import 'react-datepicker/dist/react-datepicker.css';
import {convertDateToUnixTimestamp} from "./FunctionsToConvertingData";

export default function AddTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedDateTime, setSelectedDateTime] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedDateTime && selectedDateTime > new Date()) {
            axios.post("http://localhost:8080/api/add", {
                title: title,
                description: description,
                deadlineDate: convertDateToUnixTimestamp(selectedDateTime)
            }).then(() => {
                sweetalert.fire('Success', 'Task added correctly', 'success').then(() => {
                    window.location.href = "/show_all_tasks";
                });
            }).catch((reason) => {
                if (reason.response.status === 400) {
                    sweetalert.fire('Error', 'Title must be unique!', 'error').then(() => {
                        window.location.href = "/new_task";
                    });
                } else {
                    sweetalert.fire('Error', 'Something went wrong!', 'error')
                }
            });
        } else {
            sweetalert.fire('Error', 'Date and time must be in the future!', 'error')
        }
    };

    return (
        <>
            <div className="container mt-5 full-screen">
                <Card>
                    <Card.Header><h3>Add new task</h3></Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formTitle">
                                <Form.Label><h4>Title</h4></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Type title here (max 50 characters)"
                                    pattern="[a-zA-Z].*"
                                    maxLength="50"
                                    required={true}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>

                            <br/>

                            <Form.Group controlId="formDescription">
                                <Form.Label><h4>Description</h4></Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Type description of your task here (max 250 characters)"
                                    pattern="[a-zA-Z].*"
                                    maxLength="250"
                                    required={true}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Group>

                            <br/>

                            <Form.Group controlId="formDateTime">
                                <Form.Label><h4>Deadline date</h4></Form.Label>
                                <br/>
                                <DatePicker
                                    minDate={new Date()}
                                    selected={selectedDateTime}
                                    onChange={(date) => setSelectedDateTime(date)}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    dateFormat="yyyy-MM-dd HH:mm"
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
