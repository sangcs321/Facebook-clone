import React from 'react';
import SidebarRow from './SidebarRow';
import './Sidebar.css';

import ExpandMoreOutlined from '@mui/icons-material/ExpandMoreOutlined';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import StorefrontIcon from '@mui/icons-material/Storefront';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import useSelection from 'antd/es/table/hooks/useSelection';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/Store/Store';

function Sidebar() {
  const user = useSelector((state: RootState ) => state.user);
  return (
    <div className="sidebar">
      <SidebarRow src={"https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"} title={user.name}/>
      <SidebarRow
        Icon={LocalHospitalIcon}
        title="COVID-19 Information Center"
      />
      <SidebarRow Icon={EmojiFlagsIcon} title="Pages" />
      <SidebarRow Icon={PeopleIcon} title="Friends" />
      <SidebarRow Icon={ChatIcon} title="Messanger" />
      <SidebarRow Icon={StorefrontIcon} title="Marketplace" />
      <SidebarRow Icon={VideoLibraryIcon} title="Videos" />
      <SidebarRow Icon={ExpandMoreOutlined} title="More" />
    </div>
  );
}

export default Sidebar;