import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/authActions";


const Nav = styled.div`
background: #15171c;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const NavIcon = styled(Link)`
margin-left: 2rem;
font-size: 2rem;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const SidebarNav = styled.nav`
background: #15171c;
width: 250px;
height: 100vh;
display: flex;
justify-content: center;
position: fixed;
top: 0;
left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
transition: 350ms;
z-index: 10;
`;

const SidebarWrap = styled.div`
width: 100%;
`;
const dispatch = useDispatch();
const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated);
const Lougout = dispatch(logout);

const Sidebar = () => {
const [sidebar, setSidebar] = useState(false);

const showSidebar = () => setSidebar(!sidebar);

return (
	<div>
	<IconContext.Provider value={{ color: "#fff" }}>
		<Nav>
		<NavIcon to="#">
			<FaIcons.FaBars onClick={showSidebar} />
		</NavIcon>
		<div className="box2">
			<img src="Logop.png"  alt=""/> 
		</div>
		
		
		<div className="box3">
			<input type="text" placeholder="search" className="search"></input>  
			<button className="search">search</button>
		</div>
		
		
		<div className="box4">
			<IoIcons.IoMdNotifications className="icon-nav"/>
		</div>
		
		
		<div className="box5">
			<Link to="/Profile" >
				<FaIcons.FaUserCircle className="icon-nav"/>
			</Link>
		</div>
		

		<div className="box7">
			<Button className="Logout" onClick={Logout}>
				Logout
			</Button> 
		</div>
		</Nav>
		<SidebarNav sidebar={sidebar}>
		<SidebarWrap>
			<NavIcon to="#">
			<AiIcons.AiOutlineClose onClick={showSidebar} />
			</NavIcon>
			{SidebarData.map((item, index) => {
			return <SubMenu item={item} key={index} />;
			})}
		</SidebarWrap>
		</SidebarNav>
	</IconContext.Provider>
	</div>
);
};

export default Sidebar;