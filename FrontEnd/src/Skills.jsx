import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import "./skills.css";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    fetch("/api/skills")
      .then(res => res.json())
      .then(data => setSkills(data));
  }, []);

  function handleEdit(skill) {
    // TODO: Open Skill Editor
    alert(`Edit skill: ${skill.name}`);
  }
  function handleDelete(skill) {
    // TODO: Delete skill via API
    alert(`Delete skill: ${skill.name}`);
  }

  return (
    <div className="skills-root">
      <div className="page-title-bar">
        <h1>Skills</h1>
        <div className="actions">
          <Button>Add Skill</Button>
          <Button>Skill Groups ▼</Button>
          <Button>Edit Skills</Button>
        </div>
      </div>
      <div className="skills-list">
        {skills.map((skill, i) => (
          <div className="skill-row" key={i}>
            <span>{skill.name}</span>
            <Button onClick={() => handleEdit(skill)}>Edit</Button>
            <Button onClick={() => handleDelete(skill)}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
