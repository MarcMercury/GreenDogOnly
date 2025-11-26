import React from "react";
import EmployeeListPanel from "../components/scheduler/EmployeeListPanel";
import ScheduleGrid from "../components/scheduler/ScheduleGrid";
import ShiftDetailDrawer from "../components/scheduler/ShiftDetailDrawer";
import LocationDropdown from "../components/scheduler/LocationDropdown";
import ExportButton from "../components/scheduler/ExportButton";
import PublishControl from "../components/scheduler/PublishControl";

const ScheduleBuilder = () => {
  return (
    <div className="cr-schedule-builder">
      <div className="cr-schedule-header">
        <LocationDropdown />
        <ExportButton />
        <PublishControl />
      </div>
      <div className="cr-schedule-panels">
        <EmployeeListPanel />
        <ScheduleGrid />
        <ShiftDetailDrawer />
      </div>
    </div>
  );
};

export default ScheduleBuilder;
