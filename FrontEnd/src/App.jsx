import React, { useState } from "react";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import EmployeeData from "./EmployeeData";
import Schedule from "./Schedule";
import EmployeeDirectory from "./components/EmployeeDirectory";
import ChangeLog from "./components/ChangeLog";
import SkillsPage from "./pages/SkillsPage";
import CSVUpload from "./CSVUpload";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import Panel from "./components/Panel";
import Button from "./components/Button";
import NewsFeed from "./components/NewsFeed";
import { EmployeeDataProvider } from "./context/EmployeeDataContext";
import { SkillsProvider } from "./context/SkillsContext";
import "./styles/design-system.css";
import './styles/crateso-global.css';
import ScheduleBuilder from "./pages/ScheduleBuilder";
import RecruitingPage from "./pages/RecruitingPage";
import CreateProspectWizard from "./pages/CreateProspectWizard";
import EmployeeProfile from "./pages/EmployeeProfile";

export default function App() {
  const [session, setSession] = useState(null);
    const [page, setPage] = useState("news");

  // Debug info
  console.log("App.jsx session:", session);
  console.log("App.jsx page:", page);

  if (!session) {
    return <LoginPage onLogin={setSession} />;
  }

  let content;
    switch (page) {
      case "news":
        content = <Panel><NewsFeed /></Panel>;
        break;
      case "dashboard":
        content = <Panel><Dashboard operator={session.operator || "Operator"} /></Panel>;
        break;
      case "employee":
        content = <Panel><EmployeeData /></Panel>;
        break;
      case "employee directory":
        content = <Panel><EmployeeDirectory /></Panel>;
        break;
      case "change log":
        content = <Panel><ChangeLog /></Panel>;
        break;
      case "schedule":
        content = <Panel><Schedule /></Panel>;
        break;
      case "skills":
        content = <Panel><SkillsPage /></Panel>;
        break;
      case "csv":
        content = <Panel><CSVUpload /></Panel>;
        break;
      case "schedule builder":
        content = <Panel><ScheduleBuilder /></Panel>;
        break;
      case "recruiting":
        content = <Panel><RecruitingPage /></Panel>;
        break;
      case "create prospect":
        content = <Panel><CreateProspectWizard /></Panel>;
        break;
      default:
        content = <Panel><NewsFeed /></Panel>;
    }

  return (
    <SkillsProvider>
      <EmployeeDataProvider>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <TopNav operator={session.operator || "Operator"} />
          <div style={{ display: "flex", flex: 1 }}>
            <Sidebar current={page} onNavigate={setPage} />
            <div style={{ flex: 1, padding: "var(--lg)", marginLeft: 180 }}>
              {content}
            </div>
          </div>
        </div>
      </EmployeeDataProvider>
    </SkillsProvider>
  );
}
