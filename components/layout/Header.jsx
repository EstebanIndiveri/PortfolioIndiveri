import React, { useState } from 'react';
import ActiveLink from '../ActiveLink';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  NavbarText
} from 'reactstrap';
import Link from 'next/link';
import auth0 from '../../services/auth0';

const Login=()=>{
  return(
    <span onClick={auth0.login} className="nav-link port-navbar-link clickable">Login</span>
  )
}

const Logout=()=>{
  return(
    <span onClick={auth0.logout} className="nav-link port-navbar-link clickable">Logout</span>
  )
}


class Header extends React.Component {

  constructor(props){
    super(props);
    this.state={
      isOpen:false,
      dropdownOpen:false
    };
    this.toggle = this.toggle.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  renderBlogMenu() {
    const { isSiteOwner } = this.props;

    if (isSiteOwner) {
      return (
        <Dropdown className="port-navbar-link port-dropdown-menu" nav isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
          <DropdownToggle className="port-dropdown-toggle" nav caret>
            Blog
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <BsNavLink className="port-dropdown-item"
                         route="/blogs"
                         title="Blogs" />
            </DropdownItem>
            <DropdownItem>
              <BsNavLink className="port-dropdown-item"
                         route="/blogs/new"
                         title="Create a Blog" />
            </DropdownItem>
            <DropdownItem>
              <BsNavLink className="port-dropdown-item"
                         route="/blogs/dashboard"
                         title="Blogs Dashboard" />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )
    }

    return (
      <NavItem className="port-navbar-item">
        <BsNavLink route="/blogs" title="Blog"/>
      </NavItem>
    )
  }

render(){


const{isAuthenticated,user,className}=this.props;
const{isOpen}=this.state;
const menuOpenClass=isOpen?'menu-open':'menu-close';
// color="transparent" dark
  return (
    <div>
      <Navbar className={`port-navbar port-nav-base absolute blog ${className} ${menuOpenClass} `} light expand="md">
        <NavbarBrand className="port-navbar-brand" ><Link href="/"><img style={{cursor:'pointer'}} height="40px" src="/static/img/logo.png"/></Link></NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="port-navbar-item blog" >
                <BsNavLink  route="/" title="Home"/>
            </NavItem>
            <NavItem className="port-navbar-item">
                <BsNavLink route="/aboutus" title="About"/>
            </NavItem>
            <NavItem className="port-navbar-item">
                <BsNavLink route="/portfolios" title="Porfolio"/>
            </NavItem>
            <NavItem className="port-navbar-item">
                {/* <BsNavLink route="/blogs" title="Blog"/> */}
                {this.renderBlogMenu()}
            </NavItem>
            <NavItem className="port-navbar-item">
                <BsNavLink route="/cv" title="Cv"/>
            </NavItem>
            <NavItem className="port-navbar-item">
                <BsNavLink id="btn-login-radius" route="/contacto" title="Contact"/>
            </NavItem>
            {!isAuthenticated&&
            <NavItem className="port-navbar-item">
                <Login/>
            </NavItem>
            }
            {isAuthenticated &&
            <NavItem className="port-navbar-item">
                <Logout/>
            </NavItem>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
}

export default Header;

function BsNavLink(props){
  const {title,route}=props;
  const className=props.className||'';
  return(
    <ActiveLink activeClassName="active" route={route}>
      <a className="nav-link port-navbar-link">{title}</a>
    </ActiveLink>
      // <Link href={route}><a className="nav-link port-navbar-link">{title}</a></Link>
  )
}
