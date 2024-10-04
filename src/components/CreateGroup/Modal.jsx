import React, { useRef, useEffect, useState } from "react";
import "./Modal.css";

function Modal({ setOpenModal, onCreateGroup }) {
  const modalRef = useRef(null);
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const colors = ["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"];

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleCreate = () => {
    if (groupName && selectedColor) {
      onCreateGroup(groupName, selectedColor);
    } else {
      alert("Please provide a group name and select a color.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenModal(false); // Close the modal when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenModal]);

  return (
    <div className="create-group-modal">
      <div ref={modalRef} className="create-box">
        <p>Create New Group</p>

        <div className="create-input">
          <label htmlFor="group">Group Name</label>
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        <div className="choose-colors">
          <span>Choose colour</span>
          <div className="color-options">
          {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  backgroundColor: color,
                  boxShadow: selectedColor === color ? "rgba(0, 0, 0, 0.3) 0px 0px 5px 3px" : "none",
                   
                }}
                className="color-button"
              ></button>
            ))}
          </div>
        </div>

        <div className="create-btn-section">
          <button className="create-button" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
