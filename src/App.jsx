import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import StaticMainSection from "./components/StaticMainSection/StaticMainSection";
import Modal from "./components/CreateGroup/Modal";
import { v4 as uuidv4 } from "uuid";
import NoteSection from "./components/NoteSection/NoteSection";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const setAppHeight = () => {
      const vh = window.innerHeight * 0.01; // Calculate 1vh in pixels
      document.documentElement.style.setProperty('--vh', `${vh}px`); // Set the CSS variable
    };

    setAppHeight(); // Initial call
    window.addEventListener('resize', setAppHeight); // Update on resize

    return () => {
      window.removeEventListener('resize', setAppHeight); // Cleanup
    };
  }, []);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    setGroups(storedGroups);
  }, []);

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };

  const handleCreateGroup = (name, color) => {
    const newGroup = {
      id: uuidv4(),
      name,
      color,
    };
    const updatedGroups = [...groups, newGroup];

    setGroups(updatedGroups);
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
    setOpenModal(false);
  };

  const handleBack = () => {
    setSelectedGroup(null);
  };

  return (
    <div className="app">
      <Sidebar
        setOpenModal={setOpenModal}
        groups={groups}
        onGroupClick={handleGroupClick}
        selectedGroup={selectedGroup}
      />

      {!selectedGroup && <StaticMainSection />}

      {selectedGroup && (
        <NoteSection
          selectedGroup={selectedGroup}
          onBack={handleBack}
        />
      )}

      {openModal && (
        <Modal setOpenModal={setOpenModal} onCreateGroup={handleCreateGroup} />
      )}
    </div>
  );
}

export default App;
