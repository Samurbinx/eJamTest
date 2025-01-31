import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [superheroes, setSuperheroes] = useState([]); // State to store the list of superheroes
  const [newSuperhero, setNewSuperhero] = useState({ // State for new superhero form
    name: '',
    superpower: '',
    humilityScore: 0,
  });

  // Fetch all superheroes
  const getAllSuperheroes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/superheroes'); // Get data from backend
      setSuperheroes(response.data); // Update superheroes list
    } catch (error) {
      console.error("Error fetching superheroes:", error);
    }
  };

  // Add a new superhero
  const addSuperhero = async (e) => {
    e.preventDefault(); // Prevent form default behavior
    try {
      await axios.post('http://localhost:3001/superheroes', newSuperhero); // Send new superhero to backend
      getAllSuperheroes(); // Refresh superheroes list after adding
      setNewSuperhero({ name: '', superpower: '', humilityScore: 0 }); // Clear form
    } catch (error) {
      console.error("Error adding superhero:", error);
    }
  };

  // Fetch superheroes when component is mounted
  useEffect(() => {
    getAllSuperheroes();
  }, []);

  return (
    <div className="App">
      <h1>eJam Superheroes Ranking</h1>

      <form onSubmit={addSuperhero}>
        <div className="properties">
          <label htmlFor="name">Name</label>
          <input type="text" id="name"
            value={newSuperhero.name}
            onChange={(e) => setNewSuperhero({ ...newSuperhero, name: e.target.value })}
            required
          />
        </div>

        <div className="properties">
          <label htmlFor="superpower">Superpower</label>
          <input type="text" id="superpower"
            value={newSuperhero.superpower}
            onChange={(e) => setNewSuperhero({ ...newSuperhero, superpower: e.target.value })}
            required
          />
        </div>

        <div className="properties">
          <label htmlFor="humilityScore">Humility</label>
          <input type="range" id="humilityScore"
            min="0" max="10"
            value={newSuperhero.humilityScore}
            onChange={(e) => setNewSuperhero({ ...newSuperhero, humilityScore: e.target.value })}
            required
          />
          <span>{newSuperhero.humilityScore}</span> {/* Display selected humility score */}
        </div>

        <button type="submit">Add superhero</button>
      </form>

      {/* Display superheroes ranking */}
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Superpower</th>
            <th>Humility</th>
          </tr>
        </thead>
        <tbody>
          {superheroes.map((superhero, index) => (
            <tr key={index}>
              <td>{index + 1}</td>{/* Show position number */}
              <td>{superhero.name}</td>
              <td>{superhero.superpower}</td>
              <td>{superhero.humilityScore}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;
