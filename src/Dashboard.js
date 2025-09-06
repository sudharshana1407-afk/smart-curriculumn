// src/Dashboard.js
import React, { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const navigate = useNavigate();

  // fetch subjects from Firestore
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "curriculum"));
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Fetched subjects:", docs);
        setSubjects(docs);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  // add subject to Firestore
  const addSubject = async () => {
    if (newSubject.trim() === "") return;
    await addDoc(collection(db, "curriculum"), { title: newSubject });
    setNewSubject("");

    // refresh subjects list
    const querySnapshot = await getDocs(collection(db, "curriculum"));
    setSubjects(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate("/login"))
      .catch((error) => console.log(error));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>Curriculum Dashboard</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter subject name"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />
        <button onClick={addSubject} style={{ padding: "10px 20px" }}>Add Subject</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {subjects.map((subject) => (
          <li key={subject.id} style={{ margin: "8px 0", fontSize: "18px" }}>
            {subject.title}
          </li>
        ))}
      </ul>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          backgroundColor: "#1e90ff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;


