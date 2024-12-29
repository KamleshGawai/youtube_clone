import React from 'react';
import './Sidebar.css';
import home from '../../assets/home.png';
import Shorts from '../../assets/Shorts.jpeg';
import subscribe from '../../assets/subscribe.png';
import history from '../../assets/history.png';
import playlist from '../../assets/playlist.png';
import youtube from '../../assets/youtube.png';
import learning from '../../assets/learning.png';
import clock from '../../assets/clock.png';
import like from '../../assets/like.png';
import download from '../../assets/download.png';

const Sidebar = ({ sidebar, category, setCategory }) => {
  return (
    <div className={`sidebar ${sidebar ? '' : 'small-sidebar'} sidebarBox`}>
      <div className="shortcut-links">
        <div
          onClick={() => {
            setCategory(0);
          }}
          className={`side-link ${category === 0 ? 'active' : ''}`}
        >
          <img src={home} alt="" />
          {sidebar && <p>Home</p>}
        </div>
        <div className={`side-link ${category === 20 ? 'active' : ''}`}>
          <img src={Shorts} alt="" />
          {sidebar && <p>Shorts</p>}
        </div>
        <div className={`side-link ${category === 2 ? 'active' : ''}`}>
          <img src={subscribe} alt="" />
          {sidebar && <p>Subscribe</p>}
        </div>
        <hr />
        <br />
        <h3 className="you_sec">You </h3>
        <br />
        <div className={`side-link ${category === 17 ? 'active' : ''}`}>
          <img src={history} alt="" />
          {sidebar && <p>History</p>}
        </div>
        <div className={`side-link ${category === 24 ? 'active' : ''}`}>
          <img src={playlist} alt="" />
          {sidebar && <p>Playlist</p>}
        </div>
        <div className={`side-link ${category === 28 ? 'active' : ''}`}>
          <img src={youtube} alt="" />
          {sidebar && <p>Your videos</p>}
        </div>
        <div className={`side-link ${category === 10 ? 'active' : ''}`}>
          <img src={learning} alt="" />
          {sidebar && <p>Your courses</p>}
        </div>
        <div className={`side-link ${category === 22 ? 'active' : ''}`}>
          <img src={clock} alt="" />
          {sidebar && <p>Watch later</p>}
        </div>
        <div className={`side-link ${category === 25 ? 'active' : ''}`}>
          <img src={like} alt="" />
          {sidebar && <p>Liked Video</p>}
        </div>
        <div className={`side-link ${category === 25 ? 'active' : ''}`}>
          <img src={download} alt="" />
          {sidebar && <p>Downloads</p>}
        </div>
        <hr />
      </div>
      <div className="subscribed-list">
        <h3>SUBSCRIBED</h3>
        <div>
          <img src="" alt="" />
          {sidebar && <p>Code With Harry</p>}
        </div>
        <div>
          <img src="" alt="" />
          {sidebar && <p>Internshala</p>}
        </div>
        <div>
          <img src="" alt="" />
          {sidebar && <p>India TV</p>}
        </div>
        <div>
          <img src="" alt="" />
          {sidebar && <p>5-Minute Crafts</p>}
        </div>
        <div>
          <img src="" alt="" />
          {sidebar && <p>BB Ki Vines</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
