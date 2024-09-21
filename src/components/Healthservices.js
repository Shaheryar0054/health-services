import React from 'react'

function Healthservices() {
  return (
    <div>
      <h1>Health Services</h1>

      <form>
        <input
          type="text"
          placeholder="Enter Name"
        />
        <input
          type="text"
          placeholder="Enter Description"
        />
        <input
          type="number"
          placeholder="Enter Price"
        />
        <button type="submit">Add Services</button>
      </form>
    </div>
  )
}

export default Healthservices