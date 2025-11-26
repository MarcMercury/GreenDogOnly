import { useState } from "react";
import { useSkills } from "../context/SkillsContext";
import "./addSkill.css";

export default function AddSkillWizard({ open, onClose }) {
  const { skills, addSkill } = useSkills();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");

  if (!open) return null;

  const categories = [...new Set(skills.map(s => s.category))];

  const handleSubmit = e => {
    e.preventDefault();
    const finalCategory = newCategory || category;
    if (!name || !finalCategory) return;

    const id =
      finalCategory.toLowerCase().replace(/[^a-z0-9]+/g, "-") +
      "-" +
      name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    addSkill({ id, name, category: finalCategory });

    setName("");
    setCategory("");
    setNewCategory("");
    onClose();
  };

  return (
    <div className="skw-backdrop">
      <div className="skw-modal">
        <h2>Add Skill</h2>
        <p className="skw-subtitle">
          Create a new skill and assign it to a category. It will immediately
          appear as a column for all employees when that category is selected.
        </p>

        <form onSubmit={handleSubmit} className="skw-form">
          <label>
            Skill name
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Use of glucometer"
            />
          </label>

          <div className="skw-two-col">
            <label>
              Existing category
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="">– Select –</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>

            <label>
              ...or new category
              <input
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                placeholder="e.g. Inventory"
              />
            </label>
          </div>

          <div className="skw-footer">
            <button type="button" className="skw-btn-muted" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="skw-btn">
              Add Skill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
