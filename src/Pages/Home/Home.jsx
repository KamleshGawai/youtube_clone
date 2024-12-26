import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import './Home.css'

const Home = ({sidebar}) => {

  const [category,setCategory] = useState(0);
  
  return (
    <>
      <Sidebar setCategory={setCategory} sidebar={sidebar} category={category} />
      <div className={`container ${sidebar ? "" : " large-container"}`}>
       
      </div>
    </>
  );
};

export default Home;
