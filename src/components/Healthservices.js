import React, { useState, useEffect } from 'react';

function Healthservices() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [error, setError] = useState(""); // State to handle validation errors

  // Retrieve tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("healthServices"));
    if (savedTasks && savedTasks.length > 0) {
      setMainTask(savedTasks);
    }
  }, []);

  // Update localStorage whenever the mainTask state changes
  useEffect(() => {
    localStorage.setItem("healthServices", JSON.stringify(mainTask));
  }, [mainTask]);

  // Add or Update Service
  const submitHandler = (e) => {
    e.preventDefault();

    // Form Validation: Check if all fields are filled
    if (!name || !desc || !price) {
      setError("All fields are required");
      return; // Do not proceed with submission
    }

    setError(""); // Clear any existing errors

    if (isEditing) {
      // Update the existing service
      const updatedTasks = mainTask.map((task, index) =>
        index === currentIndex ? { name, desc, price } : task
      );
      setMainTask(updatedTasks);
      setIsEditing(false);
      setCurrentIndex(null);
    } else {
      // Add a new service
      const newTask = { name, desc, price };
      setMainTask([...mainTask, newTask]);
    }

    // Reset form fields
    setName("");
    setDesc("");
    setPrice("");
  };

  // Edit handler to populate form with the service details
  const editHandler = (index) => {
    const serviceToEdit = mainTask[index];
    setName(serviceToEdit.name);
    setDesc(serviceToEdit.desc);
    setPrice(serviceToEdit.price);
    setIsEditing(true);
    setCurrentIndex(index);
  };

  const deleteHandler = (index) => {
    const updatedTasks = [...mainTask];
    updatedTasks.splice(index, 1);
    setMainTask(updatedTasks);
  };

  let renderTask = <h2>No Services Available</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((task, index) => {
      return (
        <li key={index}>
          <div>
            <p><strong>Name:</strong> {task.name}</p>
            <p><strong>Description:</strong> {task.desc}</p>
            <p><strong>Price:</strong> {task.price}</p>
          </div>
          <button className='edite-btn' onClick={() => editHandler(index)}>Edit</button>
          <button className='delete-btn' onClick={() => deleteHandler(index)}>Delete</button>
        </li>
      );
    });
  }

  return (
    <div>
      <h1>Health Services</h1>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">{isEditing ? "Update Service" : "Add Service"}</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

      <hr />

      <div>
        <ul>{renderTask}</ul>
      </div>
    </div>
  );
}

export default Healthservices;
