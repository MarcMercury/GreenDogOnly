import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EmployeeProfile() {
  const { employeeId } = useParams();
  const [profile, setProfile] = useState(null);
  const [notes, setNotes] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    // TODO: Replace with real API calls
    fetch(`/api/employees/${employeeId}`)
      .then(res => res.json())
      .then(setProfile);
    fetch(`/api/employees/${employeeId}/notes`)
      .then(res => res.json())
      .then(setNotes);
    fetch(`/api/employees/${employeeId}/documents`)
      .then(res => res.json())
      .then(setDocuments);
  }, [employeeId]);

  function handleNoteSave(e) {
    e.preventDefault();
    // TODO: Replace with real API call
    fetch(`/api/employees/${employeeId}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: noteText })
    })
      .then(res => res.json())
      .then(newNote => setNotes([newNote, ...notes]));
    setNoteText("");
  }

  function handleDocumentUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    // TODO: Replace with real API call
    const formData = new FormData();
    formData.append("file", file);
    fetch(`/api/employees/${employeeId}/documents`, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(newDoc => setDocuments([newDoc, ...documents]));
  }

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Baseball card header */}
      <div className="flex items-center gap-6 bg-slate-900/80 rounded-2xl p-6 mb-6 shadow ring-1 ring-slate-800">
        <img src={profile.avatarUrl || "/avatar-placeholder.png"} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-50">{profile.firstName} {profile.lastName}</h2>
          <div className="text-sm text-slate-400">{profile.preferredName && `Preferred: ${profile.preferredName}`}</div>
          <div className="mt-2 flex gap-3">
            <span className="rounded-full bg-amber-100/10 px-2 py-0.5 text-xs font-medium text-amber-300">{profile.employmentStatus}</span>
            <span className="rounded-full bg-blue-100/10 px-2 py-0.5 text-xs font-medium text-blue-300">{profile.role}</span>
            <span className="rounded-full bg-green-100/10 px-2 py-0.5 text-xs font-medium text-green-300">{profile.department}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm text-slate-200">
          <div>Email: {profile.email}</div>
          <div>Phone: {profile.phone}</div>
          <div>Start Date: {profile.startDate}</div>
        </div>
      </div>
      {/* Documents section */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-slate-50 mb-2">Documents</h3>
        <input type="file" onChange={handleDocumentUpload} className="mb-2" />
        <ul className="space-y-2">
          {documents.map(doc => (
            <li key={doc.documentId} className="flex items-center gap-3 bg-slate-800/60 rounded-lg px-3 py-2">
              <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{doc.fileName}</a>
              <span className="text-xs text-slate-400">{doc.fileType}</span>
              <span className="text-xs text-slate-400">Uploaded: {doc.uploadedAt}</span>
              <span className="text-xs text-slate-400">By: {doc.uploadedBy}</span>
            </li>
          ))}
        </ul>
      </section>
      {/* Notes section */}
      <section>
        <h3 className="text-lg font-semibold text-slate-50 mb-2">Notes</h3>
        <form onSubmit={handleNoteSave} className="mb-4">
          <textarea value={noteText} onChange={e => setNoteText(e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 mb-2" placeholder="Add a note..." />
          <button type="submit" className="rounded-xl bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600">Save Note</button>
        </form>
        <ul className="space-y-2">
          {notes.map(note => (
            <li key={note.noteId} className="bg-slate-800/60 rounded-lg px-3 py-2">
              <div className="text-xs text-slate-400 mb-1">{note.createdAt} {note.author && `by ${note.author}`}</div>
              <div className="text-sm text-slate-50">{note.text}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
