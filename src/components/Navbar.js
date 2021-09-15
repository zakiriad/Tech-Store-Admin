import {Button} from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import {Link} from 'react-router-dom';
import {SideBarData} from "./SidebarData";
import '../css/Navbar.css';
import {logout} from "../actions/authActions";
import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {SideBar} from './Sidebar';


class NavBar extends Component {
    state = {
      sidebar:false
    }
    showSideBar = () => {
      const currentState =this.state.sidebar;
      this.setState({sidebar:!currentState});
    }
    
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error : PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
    };
    render(){
        
        
        return(
          <div>
              <nav className='navbar'>
                    <div className="box1">
                        <Link to='#' className='menu-bars'>
                            <FaIcons.FaBars onClick={this.showSideBar} className="bar"/>
                        </Link>
                    </div>


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
                        <Button className="Logout" onClick={this.props.logout}>
                          Logout
                        </Button> 
                    </div>
              </nav>   
              
              
  
              {/* sidebar home and product and categorie icons   */}
              <nav className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
                  <ul className='nav-menu-items' onClick={this.showSideBar}>
                      
                      
                    <li className='navbar-toggle' >
                          <Link to="#" className='menu-bars'>
                              <AiIcons.AiOutlineClose className="x"/>
                          </Link>    
                    </li>   
                      
                    <SideBar/>
                      
                  </ul>    
              </nav>              
        </div>
        )

    }
    
    
}

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated,
    error : state.error
});


export default connect(
    mapStateToProps,
    {logout}
    )(NavBar);
    
    
    {/* {SidebarData.map((item,index)=>{
          return(
              <li key={index} className={item.cName} >
                  <Link to={item.path}>
                        {item.icon}
                        <span>{item.name}</span>
                  </Link>
              </li>
          )
    })} */}