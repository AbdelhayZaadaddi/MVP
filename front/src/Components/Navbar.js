import React, { useState } from "react";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import '../App.css';

import {
  UilEstate,
  UilTagAlt,
  UilPackage,
  UilGift,
  UilSlidersV,
} from "@iconscout/react-unicons";


const Navbar = () => {
  const SidebarData = [
  {
    icon: UilEstate,
    heading: "Home",
  },
  {
    icon:  UilGift,
    heading: "Offers",
  },
  {
    icon: UilTagAlt,
    heading: "discount",
  },
  {
    icon: UilPackage,
    heading: 'Review',
  },
  {
  icon: UilSlidersV,
  heading: 'Settings'
  },
  {
  icon: UilSignOutAlt,
  heading: ''
  },

];

const [selected, setSelected] = useState(0);
const [expanded, setExpaned] = useState(true)
const sidebarVariants = {
    true: {
    left : '0'
},
    true:{
    left : '-60%'
}
}
console.log(window.innerWidth)

  return (
    <>
    <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
      </div>
      <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      <div className="menu">
      <h1 className="text">Compass</h1>
        {SidebarData.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => setSelected(index)}
            >
              <item.icon />
                <a href={item.heading}><span>{item.heading}</span></a>
            </div>
          );
        })}
      </div>
    </motion.div>
    </>
  );
};

export default Navbar;