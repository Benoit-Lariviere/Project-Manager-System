import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;