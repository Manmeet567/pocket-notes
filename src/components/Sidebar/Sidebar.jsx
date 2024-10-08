import "./Sidebar.css";
import {getGroupIcon} from '../../utils/utils';

function Sidebar({ setOpenModal, groups, onGroupClick, selectedGroup }) {


  return (
    <div className="sidebar">
      <div className="title">
        <p>Pocket Notes</p>
      </div>

      <div className="notes-group-list">
        <div className="group-list">
          {groups.map((group) => (
            <div
              className={`group ${selectedGroup?.id === group.id ? "active-group" : ""}`}
              key={group.id}
              onClick={() => onGroupClick(group)}
            >
              <div
                className="group-icon"
                style={{ backgroundColor: `${group.color}` }}
              >
                {getGroupIcon(group.name)}
              </div>
              <div className="group-title">{group?.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div onClick={() => setOpenModal(true)} className="add-icon">
        +
      </div>
    </div>
  );
}

export default Sidebar;
