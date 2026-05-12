import { useState } from 'react'
import { Form, Button } from "react-bootstrap";
import './App.css'
import superstoreimg from './superstore.png';

export const App = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  const handleCategories = () => {
    if (showCategories) {
      setShowCategories(false);
    } else {
      fetch("http://localhost:4000/categories/")
        .then((response) => response.json())
        .then((data) => {
          setCategories(data);
          setShowCategories(true);
        });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:4000/categories/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setName("");
        setDescription("");
      });
  }

  return (
    <div className="App">
      <img src={superstoreimg} alt="Super Store" className="imagen" />
      <div style={{display: "flex", gap: "40px", justifyContent: "center", alignItems: "flex-start", marginTop: "20px"}}>
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{marginTop: "10px"}}>
              Send
            </Button>
          </Form>
          <Button 
            variant={showCategories ? "danger" : "secondary"} 
            onClick={handleCategories} 
            style={{marginTop: "10px"}}>
            {showCategories ? "Ocultar Categorías" : "Ver Categorías"}
          </Button>
        </div>

        {showCategories && (
          <div>
            <h2>Categorías</h2>
            <ul style={{listStyle: "none", padding: 0}}>
              {categories.map((cat) => (
                <li key={cat.id} style={{marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px"}}>
                  <strong>{cat.name}</strong> - {cat.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
