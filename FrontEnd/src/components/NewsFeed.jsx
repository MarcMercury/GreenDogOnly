import React from "react";
import "./newsfeed.css";

const MOCK_NEWS = [
  {
    id: 1,
    clinic: "Green Dog Veterinary Clinic",
    category: "Schedule",
    categoryColor: "blue",
    title: "Schedule updated for Surgery Team",
    body: "Dr. Rivera and Sam K. swapped Thursday shifts. Coverage remains at 100% skill compliance.",
    time: "2 min ago",
    avatarInitials: "SR"
  },
  {
    id: 2,
    clinic: "Green Dog Veterinary Clinic",
    category: "Skills",
    categoryColor: "purple",
    title: "New dentistry skill unlocked",
    body: "Alex P. completed Advanced Dental Prophylaxis training. Eligible for Dental Lead shifts.",
    time: "23 min ago",
    avatarInitials: "AP"
  },
  {
    id: 3,
    clinic: "Green Dog Veterinary Clinic",
    category: "Compliance",
    categoryColor: "amber",
    title: "License expiring in 30 days",
    body: "LVT license for Morgan C. expires on 03/14/2026. Renewal link sent and tracked.",
    time: "1 hr ago",
    avatarInitials: "MC"
  },
  {
    id: 4,
    clinic: "Green Dog Veterinary Clinic",
    category: "PTO",
    categoryColor: "green",
    title: "PTO request approved",
    body: "Jamie L.'s PTO request (Feb 9–10) approved. Schedule auto-adjusted and coverage still OK.",
    time: "Yesterday",
    avatarInitials: "JL"
  }
];

export default function NewsFeed() {
  const types = [
    { key: "Schedule", color: "blue" },
    { key: "Skills", color: "purple" },
    { key: "Compliance", color: "amber" },
    { key: "PTO", color: "green" },
  ];
  const [selected, setSelected] = React.useState(types.map(t => t.key));

  function toggleType(type) {
    setSelected(selected =>
      selected.includes(type)
        ? selected.filter(t => t !== type)
        : [...selected, type]
    );
  }

  return (
    <div className="nf-root">
      <div className="nf-header">
        <div>
          <div className="nf-eyebrow">Home</div>
          <h1>News Feed</h1>
          <p>
            Live log of everything changing in your organization — schedules,
            skills, licenses, PTO, and more.
          </p>
        </div>
        <div className="nf-checkbox-filters">
          {types.map(t => (
            <label key={t.key} className={`nf-checkbox-label nf-cat-${t.color}`}>
              <input
                type="checkbox"
                checked={selected.includes(t.key)}
                onChange={() => toggleType(t.key)}
              />
              {t.key}
            </label>
          ))}
        </div>
      </div>
      <div className="nf-grid">
        {MOCK_NEWS.filter(item => selected.includes(item.category)).map(item => (
          <article key={item.id} className="nf-card">
            <div className="nf-card-left-border" />
            <div className="nf-card-main">
              <div className="nf-card-top">
                <div className="nf-avatar">
                  <span>{item.avatarInitials}</span>
                </div>
                <div className="nf-title-block">
                  <div className="nf-clinic">{item.clinic}</div>
                  <div className="nf-title">{item.title}</div>
                </div>
              </div>
              <div className="nf-body">{item.body}</div>
              <div className="nf-meta-row">
                <span className={`nf-category nf-cat-${item.categoryColor}`}>
                  {item.category}
                </span>
                <span className="nf-dot">•</span>
                <span className="nf-time">{item.time}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
