import React, { useState, useMemo } from "react";
import { useEmployeeData } from "../context/EmployeeDataContext";
import { useSkills } from "../context/SkillsContext";
import AddSkillWizard from "../components/AddSkillWizard";
import "./skills.css";

const RATING_LABELS = {
  0: "Untrained",
  1: "Started training",
  2: "Perform w/ supervision",
  3: "Perform, needs review",
  4: "Perform independently",
  5: "Can train others"
};

export default function SkillsPage() {
  const { employees, updateEmployee } = useEmployeeData();
  const { skills } = useSkills();

  const categories = useMemo(
    () => [...new Set(skills.map(s => s.category))],
    [skills]
  );
  const [category, setCategory] = useState(categories[0] || "");
  const [editingId, setEditingId] = useState(null);
  const [draftRatings, setDraftRatings] = useState({});
  const [wizardOpen, setWizardOpen] = useState(false);

  const skillsForCategory = skills.filter(s => s.category === category);

  const startEdit = emp => {
    setEditingId(emp.id);
    setDraftRatings(emp.skillRatings || {});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraftRatings({});
  };

  const saveEdit = emp => {
    const updatedSkillRatings = { ...(emp.skillRatings || {}), ...draftRatings };
    updateEmployee(emp.id, { skillRatings: updatedSkillRatings });
    setEditingId(null);
    setDraftRatings({});
  };

  const setRating = (skillId, value) => {
    setDraftRatings(prev => ({ ...prev, [skillId]: Number(value) }));
  };

  return (
    <div className="sk-root">
      <div className="sk-header">
        <div>
          <h1>Skills Matrix</h1>
          <p>
            0–5 ratings for every skill, by employee. Filter by category to
            focus on one domain at a time.
          </p>
          <div className="sk-legend">
            {Object.entries(RATING_LABELS).map(([num, label]) => (
              <div key={num} className="sk-legend-item">
                <span className="sk-legend-pill">{num}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sk-header-right">
          <div className="sk-category-chips">
            {categories.map(cat => (
              <button
                key={cat}
                className={
                  "sk-cat-chip " +
                  (cat === category ? "sk-cat-chip-active" : "")
                }
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <button
            className="sk-btn-primary"
            onClick={() => setWizardOpen(true)}
          >
            + Add Skill
          </button>
        </div>
      </div>

      <div className="sk-grid-wrapper">
        <table className="sk-table">
          <thead>
            <tr>
              <th className="sk-th sk-th-sticky-left">Employee</th>
              <th className="sk-th sk-th-small">Edit</th>
              {skillsForCategory.map(skill => (
                <th key={skill.id} className="sk-th">
                  {skill.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {employees.map(emp => {
              const isEditing = editingId === emp.id;
              const currentRatings = isEditing
                ? draftRatings
                : emp.skillRatings || {};

              return (
                <tr key={emp.id}>
                  {/* employee name (sticky) */}
                  <td className="sk-td sk-td-sticky-left">
                    {emp.fullName}
                  </td>

                  {/* edit controls */}
                  <td className="sk-td sk-td-small">
                    {!isEditing ? (
                      <button
                        className="sk-edit-link"
                        type="button"
                        onClick={() => startEdit(emp)}
                      >
                        Edit
                      </button>
                    ) : (
                      <div className="sk-edit-actions">
                        <button
                          type="button"
                          className="sk-edit-save"
                          onClick={() => saveEdit(emp)}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="sk-edit-cancel"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>

                  {/* ratings cells */}
                  {skillsForCategory.map(skill => {
                    const value = currentRatings[skill.id] ?? 0;
                    return (
                      <td key={skill.id} className="sk-td">
                        {isEditing ? (
                          <select
                            className="sk-rating-select"
                            value={value}
                            onChange={e =>
                              setRating(skill.id, e.target.value)
                            }
                          >
                            {Object.keys(RATING_LABELS).map(num => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <div className={"sk-rating-display sk-rate-" + value}>
                            <span className="sk-rating-number">{value}</span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <AddSkillWizard open={wizardOpen} onClose={() => setWizardOpen(false)} />
    </div>
  );
}
