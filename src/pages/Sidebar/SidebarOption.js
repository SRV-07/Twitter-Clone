import React from 'react';
import "./SidebarOption.css"

const SidebarOption = ({ active, Icon, text }) => (
  <div className={`sidebarOption ${active && 'sidebarOption_active'}`}>
    <Icon />
    <p>{text}</p>
  </div>
);

export default SidebarOption;
