import { useState, useEffect } from "react";
import "./NoteSection.css";
import { getGroupIcon, formatDateTime } from "../../utils/utils";
import enabled from "../../assets/enabled-send.png";
import disabled from "../../assets/diabled-send.png";

function NoteSection({ selectedGroup }) {
  const [note, setNote] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [groupNotes, setGroupNotes] = useState([]);

  useEffect(() => {
    const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];

    const filteredNotes = existingNotes.filter(
      (note) => note.group_id === selectedGroup.id
    );

    setGroupNotes(filteredNotes);
  }, [selectedGroup]);

  const handleNoteChange = (e) => {
    setNote(e.target.value);
    setIsButtonEnabled(e.target.value.trim() !== "");
  };

  const handleSaveNote = () => {
    if (!isButtonEnabled) return;

    const newNote = {
      id: Date.now().toString(),
      note: note.trim(),
      timestamp: new Date().toLocaleString(),
      group_id: selectedGroup.id,
    };

    const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];

    const updatedNotes = [...existingNotes, newNote];

    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    setNote("");
    setIsButtonEnabled(false);
    setGroupNotes(
      updatedNotes.filter((note) => note.group_id === selectedGroup.id)
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSaveNote();
    }
  };

  return (
    <div className="note-section">
      <nav>
        <div
          className="nav-icon"
          style={{ backgroundColor: `${selectedGroup?.color}` }}
        >
          {getGroupIcon(selectedGroup?.name)}
        </div>
        <div className="nav-title">{selectedGroup?.name}</div>
      </nav>

      <div className="notes-display">
        {groupNotes.map((note) => (
          <div className="note" key={note.id}>
            <p className="note-text">{note.note}</p>
            <div className="timestamp">
              <span>{formatDateTime(note.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="create-note-form">
        <div className="note-form">
          <textarea
            name="note"
            id="note"
            placeholder="Enter your text here..........."
            value={note}
            onChange={handleNoteChange}
            onKeyDown={handleKeyDown}
          ></textarea>
          <div className="submit-btn">
            <button onClick={handleSaveNote} disabled={!isButtonEnabled}>
              <img src={isButtonEnabled ? enabled : disabled} alt="btn" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteSection;
