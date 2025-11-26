import React from "react";

export default function ShiftBlock({ shift, onDrag, onResize }) {
  return (
    <div
      draggable
      onDragStart={e => onDrag(e, shift)}
      style={{
        background: "var(--primary)",
        color: "#fff",
        padding: "4px 8px",
        borderRadius: 4,
        fontSize: 12,
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "grab"
      }}
    >
      {shift.start}–{shift.end}
      <div
        onMouseDown={e => onResize(e, shift, "right")}
        style={{
          width: 6,
          height: "100%",
          background: "rgba(255,255,255,0.4)",
          cursor: "ew-resize"
        }}
      ></div>
    </div>
  );
}
