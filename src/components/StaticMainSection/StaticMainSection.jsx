import bg from '../../assets/bg.png';
import lock from '../../assets/lock.png';
import './StaticMainPage.css';

function StaticMainSection() {
  return (
    <div className='static-main-page'>
      <img src={bg} alt="bg" />
      <p>Pocket Notes</p>
      <p>Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
      
      <p><img src={lock} alt='lock' style={{marginRight:"10px"}} />end-to-end encrypted</p>
    </div>
  )
}

export default StaticMainSection