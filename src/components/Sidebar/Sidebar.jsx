import "./Sidebar.css";

function Sidebar({setOpenModal}) {
  return (
    <div className="sidebar">
      <div className="title">
        <p>Pocket Notes</p>
      </div>

      <div className="notes-group-list">
        <div className="group-list"></div>
      </div>

      <div onClick={() => setOpenModal(true)} className="add-icon">+</div>
    </div>
  );
}

export default Sidebar;
