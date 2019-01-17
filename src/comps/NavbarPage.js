import React from "react";
import { NavLink } from 'react-router-dom'

import {
    Navbar,
    NavbarBrand,
    NavbarNav,
    NavItem,
    // NavLink,
    // NavbarToggler,
    HamburgerToggler,
    Collapse,
    // FormInline,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Media,
    Fa,
} from "mdbreact";

class NavbarPage extends React.Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { isOpen: false };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    triggerAction(action) {
        this.props.action(action)
    }

    render() {

        const linkStyle = {
            color: '#fff',
            margin: '5px',
            padding: '5px',
        }
        const tabStyle = {
            margin: '5px 0px'
        }
        return (

            <Navbar dark expand="md" style={{ backgroundColor: '#3f3f3f' }}>
                <NavbarBrand>
                    <Media left >
                        <Media object src={require('../assets/img/logo.png')} alt="Cascade logo" style={{ width: 200 }} />
                    </Media>
                </NavbarBrand>

                <HamburgerToggler id="hamburger1" className="navbar-toggler" onClick={this.toggleCollapse} right />
                <Collapse
                    isOpen={this.state.isOpen}
                    navbar
                >
                    <NavbarNav left>
                        <NavItem style={tabStyle}>
                            <NavLink activeClassName="activeTab" style={linkStyle} to="/dashboard">Dashboard</NavLink>
                        </NavItem>
                        
                        <NavItem style={tabStyle}>
                            <NavLink activeClassName="activeTab" style={linkStyle} to="/prospect">Prospect</NavLink>
                        </NavItem>


                        <NavItem>
                            <Dropdown>
                                <DropdownToggle nav caret>
                                    <div className="d-md-inline">TimeLine</div>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem href="/timelines">All</DropdownItem>
                                    <DropdownItem href="timeline/Ivory">Ivory</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavItem>

                    </NavbarNav>
                    <NavbarNav right>
                       
                        <NavItem>
                            <Dropdown>
                                <DropdownToggle nav caret>
                                    <Fa icon="user" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-default" right>
                                    <DropdownItem onClick={()=>{this.triggerAction('logout')}}>LogOut</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                    </NavbarNav>
                </Collapse>
            </Navbar>
        );
    }
}

export default NavbarPage;