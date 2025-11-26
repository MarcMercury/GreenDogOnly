import express from "express";
import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database("./ops_console.db");

// Create tables if not exist
const setupSQL = `
CREATE TABLE IF NOT EXISTS admin_user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  operator_name TEXT NOT NULL,
  mode TEXT DEFAULT 'admin',
  login_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_address TEXT,
  user_agent TEXT
);
CREATE TABLE IF NOT EXISTS employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  grid_name TEXT,
  first_name TEXT,
  last_name TEXT,
  dob DATE,
  zip_code TEXT,
  in_house_or_remote TEXT,
  offer_letter_title TEXT,
  adp_job_title TEXT,
  hire_date DATE,
  employment_type TEXT,
  status TEXT,
  days_per_week INTEGER,
  latest_wage_change_date DATE,
  current_wage REAL,
  previous_wage REAL,
  bi_weekly_wage REAL,
  annual_wages REAL,
  pto_allotment_2025 INTEGER,
  pto_policy_allotment_2025 INTEGER,
  pto_used_2025 INTEGER,
  pto_available_2025 INTEGER,
  pto_request_notes_2025 TEXT,
  benefits_completed INTEGER,
  benefits_tracker TEXT,
  ce_budget REAL,
  ce_used REAL,
  ce_remaining REAL,
  offer_letter_completed INTEGER,
  hr_docs_signed INTEGER,
  onboarding_completed INTEGER,
  harassment_training_date DATE,
  harassment_pay REAL,
  safety_training_date DATE,
  background_check_processed INTEGER,
  emergency_contact_2025 INTEGER,
  contract_sent INTEGER,
  contract_signed INTEGER,
  approved_or_denied TEXT,
  ce_contract_sent INTEGER,
  ce_contract_signed INTEGER,
  immigration_agreement_sent INTEGER,
  immigration_agreement_signed INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS skills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  category TEXT
);
CREATE TABLE IF NOT EXISTS employee_skills (
  employee_id INTEGER,
  skill_id INTEGER,
  proficiency INTEGER DEFAULT 1,
  PRIMARY KEY(employee_id, skill_id)
);
CREATE TABLE IF NOT EXISTS licenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  employee_id INTEGER,
  license_name TEXT,
  expiration_date DATE
);
CREATE TABLE IF NOT EXISTS schedule (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  employee_id INTEGER,
  date DATE,
  start_time TEXT,
  end_time TEXT,
  shift_type TEXT
);
`;
db.exec(setupSQL);

// Add default admin password if not exists
const DEFAULT_PASSWORD = "YourAdminPasswordHere";
bcrypt.hash(DEFAULT_PASSWORD, 10, (err, hash) => {
  if (!err) {
    db.get("SELECT * FROM admin_user LIMIT 1", (err, row) => {
      if (!row) {
        db.run("INSERT INTO admin_user (password_hash) VALUES (?)", [hash]);
      }
    });
  }
});

// LOGIN
app.post("/api/login", (req, res) => {
  const { operator, password, mode } = req.body;
  db.get("SELECT * FROM admin_user LIMIT 1", async (err, admin) => {
    if (err || !admin) return res.status(500).json({ error: "Admin not set up" });
    const valid = await bcrypt.compare(password, admin.password_hash);
    if (!valid) return res.status(401).json({ error: "Invalid password" });
    db.run(
      "INSERT INTO sessions (operator_name, mode, ip_address, user_agent) VALUES (?, ?, ?, ?)",
      [operator, mode, req.ip, req.headers["user-agent"]],
      function (err) {
        if (err) return res.status(500).json({ error: "Session error" });
        return res.json({ success: true });
      }
    );
  });
});

// EMPLOYEES
app.get("/api/employees", (req, res) => {
  db.all("SELECT * FROM employees", (err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(rows);
  });
});
app.post("/api/employees", (req, res) => {
  const body = req.body;
  // TODO: Validate and insert employee
  res.json({ success: true });
});
app.patch("/api/employees/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  // TODO: Update employee
  res.json({ success: true });
});

// SKILLS
app.get("/api/skills", (req, res) => {
  db.all("SELECT * FROM skills", (err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(rows);
  });
});
app.post("/api/skills", (req, res) => {
  const body = req.body;
  // TODO: Validate and insert skill
  res.json({ success: true });
});
app.delete("/api/skills/:id", (req, res) => {
  const id = req.params.id;
  // TODO: Delete skill
  res.json({ success: true });
});

// SCHEDULE
app.get("/api/schedule/:week", (req, res) => {
  const week = req.params.week;
  // TODO: Query schedule for week
  res.json([]);
});
app.post("/api/schedule", (req, res) => {
  const shifts = req.body;
  // TODO: Batch insert/update shifts
  res.json({ success: true });
});

// CSV UPLOAD
app.post("/api/csv-upload", (req, res) => {
  // TODO: Parse CSV and upsert employees
  res.json({ success: true });
});

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
