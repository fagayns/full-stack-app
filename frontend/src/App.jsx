import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  const fetchData = async () => {
    const res = await fetch(`${API}/api/data`);
    const data = await res.json();
    setItems(data);
  };

  const addItem = async () => {
    await fetch(`${API}/api/data`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ name })
    });
    setName("");
    fetchData();
  };

  const deleteItem = async (id) => {
    await fetch(`${API}/api/data/${id}`, {
      method: "DELETE"
    });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Student: Ayana Osmonalieva | ID: 230142007</h1>

      <input value={name} onChange={(e)=>setName(e.target.value)} />
      <button onClick={addItem}>Add</button>

      <ul>
        {items.map((item) => (
          <li key={item[0]}>
            {item[1]}
            <button onClick={() => deleteItem(item[0])}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App; 
