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
    function setAppHeight() {
      const app = document.querySelector(".app");
      app.style.height = `${window.innerHeight}px`;
    }

    // Set the initial height on mount
    setAppHeight();

    // Update height on resize and orientation change
    window.addEventListener("resize", setAppHeight);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", setAppHeight);
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
