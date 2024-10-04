import "./Sidebar.css";

function Sidebar({setOpenModal, groups}) {

  const getGroupIcon = (name) => {
    const words = name.split(" ");
    const firstLetter = words[0][0].toUpperCase();
    const lastLetter = words[words.length - 1][0].toUpperCase();
    return firstLetter + lastLetter;
  };

  return (
    <div className="sidebar">
      <div className="title">
        <p>Pocket Notes</p>
      </div>

      <div className="notes-group-list">
        <div className="group-list">
          { groups.map((group) => (
            <div className="group" key={group.id}>
              <div className="group-icon" style={{backgroundColor:`${group.color}`}}>{getGroupIcon(group.name)}</div>
              <div className="group-title">{group?.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div onClick={() => setOpenModal(true)} className="add-icon">+</div>
    </div>
  );
}

export default Sidebar;
