import React from "react"
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import Button from "./Button";

export type NavItem = {
    title: string,
    action: () => Promise<void>
}

type PropTypes = {
    navItems: Array<NavItem>,
    activeNavItem: number
}

export default function LinkNav({navItems, activeNavItem} : PropTypes) {
    return (            
        <div className="btn-group">
            {
                navItems.map((navItem, index) => (
                        <Button 
                        onClick={() => navItem.action()}
                        className={activeNavItem === index ? "btn-dark btn-block" : "btn-outline-dark btn-block"}
                        padding={''}
                        btnType="button"
                        btnText={navItem.title}/>
                ))
            }
        </div>
    
    );
}