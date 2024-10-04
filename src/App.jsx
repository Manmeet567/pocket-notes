import { useState,useEffect } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import StaticMainSection from './components/StaticMainSection/StaticMainSection'
import Modal from './components/CreateGroup/Modal';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [openModal, setOpenModal] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('groups'));
    if (storedGroups) {
      setGroups(storedGroups);
    }
  }, []);

  const handleCreateGroup = (name, color) => {
    const newGroup = {
      id: uuidv4(), // Generate unique ID
      name,
      color,
    };
    const updatedGroups = [...groups, newGroup]; // Add new group to the groups array

    setGroups(updatedGroups);
    localStorage.setItem('groups', JSON.stringify(updatedGroups)); // Save updated groups to local storage
    setOpenModal(false); // Close the modal after creation
  };

  return (
    <div className='app'>
        <Sidebar setOpenModal={setOpenModal} />
        <StaticMainSection />

        {openModal && <Modal setOpenModal={setOpenModal} onCreateGroup={handleCreateGroup} />}
    </div>
  )
}

export default App
