import {useEffect, useState} from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import {convertDateToUnixTimestamp, convertUnixTimeToDate, dateFormatter} from "./FunctionsToConvertingData";
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import sweetalert from "sweetalert2";
import DatePicker from "react-datepicker";
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import {Button} from "react-bootstrap";

export default function ShowTasks() {

    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get("http://localhost:8080/api/getTaskList")
            .then(response => {
                if (response.data.length === 0) {
                    sweetalert.fire('Error', 'No tasks found', 'error').then(() => {
                        window.location.href = "/";
                    });
                }
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
                sweetalert.fire('Error', 'We have a problem downloading the task list', 'error').then(() => {
                    window.location.href = "/";
                });
            });
    };

    const handleDateChange = (date, row) => {
        if (date && date > new Date()) {
            axios.put("http://localhost:8080/api/update/" + row.title, {
                id: row.id,
                title: row.title,
                description: row.description,
                deadlineDate: convertDateToUnixTimestamp(date)
            }).then(() => {
                window.location.reload();
            }).catch(() => {
                sweetalert.fire('Error', 'Something went wrong!', 'error').then(() => {
                    window.location.href = "/show_all_tasks";
                })
            });
        } else {
            sweetalert.fire('Error', 'Date and time must be in the future!', 'error').then(() => {
                window.location.href = "/show_all_tasks";
            });
        }
    };

    function handleDelete(id) {
        axios.delete("http://localhost:8080/api/delete/" + id)
            .then(() => {
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
            });
    }

    const columns = [{
        dataField: 'id',
        text: 'ID',
        sort: true,
        editable: false
    }, {
        dataField: 'title',
        text: 'Title',
        filter: textFilter(),
        sort: true,
    }, {
        dataField: 'description',
        text: 'Description',
    }, {
        dataField: 'addedDate',
        text: 'Added date',
        sort: true,
        formatter: dateFormatter,
        editable: false
    }, {
        dataField: 'deadlineDate',
        text: 'Deadline date',
        sort: true,
        formatter: dateFormatter,
        editorRenderer: (editorProps, value, row) => (
            <>
                <DatePicker
                    minDate={new Date()}
                    selected={convertUnixTimeToDate(value, new Date().getTimezoneOffset() - 3600)}
                    onChange={(date) => handleDateChange(date, row)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="yyyy-MM-dd HH:mm"
                />
            </>
        ),
    }, {
        dataField: 'delete',
        text: '',
        formatter: (cellContent, row) => (
            <Button type={"submit"} onClick={() => handleDelete(row.id)}>Delete</Button>
        )
    }];

    const expandRow = {
        renderer: row => (
            <div style={{wordBreak: 'break-all'}}>
                <p>{`${row.description}`}</p>
            </div>
        ),
        showExpandColumn: true,
        expandByColumnOnly: true
    };

    return (
        <>
            <BootstrapTable bootstrap4 keyField="id" data={data} columns={columns} pagination={paginationFactory()}
                            filter={filterFactory()} expandRow={expandRow} rowStyle={{wordBreak: 'break-all'}}
                            cellEdit={cellEditFactory({
                                mode: 'click',
                                afterSaveCell: (oldValue, newValue, row, column) => {
                                    if (column.dataField === "description") {
                                        axios.put("http://localhost:8080/api/update/" + row.title, {
                                            id: row.id,
                                            title: row.title,
                                            description: newValue,
                                            deadlineDate: row.deadlineDate
                                        }).then(() => {
                                            sweetalert.fire('Success', 'Description updated correctly',
                                                'success').then(() => {
                                                window.location.href = "/show_all_tasks";
                                            });
                                        }).catch(() => {
                                            sweetalert.fire('Error', 'Something went wrong!', 'error')
                                        });
                                    } else if (column.dataField === "title") {
                                        axios.put("http://localhost:8080/api/update/" + oldValue, {
                                            id: row.id,
                                            title: newValue,
                                            description: row.description,
                                            deadlineDate: row.deadlineDate
                                        }).then(() => {
                                            sweetalert.fire('Success', 'Title updated correctly',
                                                'success').then(() => {
                                                window.location.href = "/show_all_tasks";
                                            });
                                        }).catch((reason) => {
                                            if (reason.response.status === 400) {
                                                sweetalert.fire('Error', 'Task with this title already exists!',
                                                    'error').then(() => {
                                                    window.location.href = "/show_all_tasks";
                                                });
                                            } else {
                                                sweetalert.fire('Error', 'Something went wrong!', 'error')
                                            }
                                        });
                                    }
                                }
                            })}/>
        </>
    );
}
