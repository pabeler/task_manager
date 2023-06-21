
# Task Manager

This is a simple task management application project implemented using Spring Boot, React, and MongoDB.

The application allows adding, displaying, editing, and deleting tasks, as well as counting the number of executed HTTP requests.

## Requirements

To run this application, you need:

- Java Development Kit (JDK) 11 or higher
- Node.js and npm (Node Package Manager)
- MongoDB database

## Getting Started

###Clone repository

```bash
  git clone https://github.com/pabeler/task_manager.git
```

###Navigate to application folder

```bash
  cd task_manager
```
###Configure the MongoDB database:

Install MongoDB on your local machine if you have not already. You can download MongoDB from the [official website](https://www.mongodb.com/docs/manual/administration/install-community/).

Start a local MongoDB instance on the default port 27017.

###Run the backend (Spring Boot):

Open the project in your favorite IDE (e.g., IntelliJ IDEA, Eclipse).

Perform a clean Maven install to download all the dependencies.

Run the Spring Boot application by executing the TaskManagerApplication class as a Java application.

The backend should start on the default port 8080.
###Run the frontend (React):

Navigate to the frontend directory:
```bash
  cd react-frontend
```
Install the dependencies:
```bash
  npm install
```
Run the React application:
```bash
  npm start
```
The frontend application should start on port 3000.

###Open a web browser and go to http://localhost:3000 to access the Task Manager application.
