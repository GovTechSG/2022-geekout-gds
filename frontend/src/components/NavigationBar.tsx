import React, { useState, ReactNode } from "react";
import {
  MainNav as MainNavComposable,
  MainNavBrand,
  MainNavBurger,
  MainNavItem,
  MainNavMenu,
  MainNavMenuStart,
} from "sgds-govtech-react/dist/standard";
import { useHistory, useLocation } from 'react-router-dom';

interface LinkProps {
  to?: string;
  className?: string;
  children?: ReactNode;
};

const Link = (props: LinkProps) => {
  const pathname = useLocation().pathname;
  const history = useHistory();
  return (
    <MainNavItem
      onClick={() => { if (props.to) history.push(props.to) }}
      className={props.className} 
      isActive={!!props.to ? pathname===props.to : false}
      href='#'
    >
      {props.children}
    </MainNavItem>
  );
};

const NavigationBar = () => {
  const [showNavMenu, setShowNavMenu] = useState(false);
  return (
    <MainNavComposable>
      <MainNavBrand>
        <MainNavItem href="/">
          <img
            src="https://www.designsystem.gov.sg/assets/img/logo_sgds.png"
            alt="main logo"
          />
        </MainNavItem>
        <MainNavBurger
          onClick={() => setShowNavMenu(!showNavMenu)}
          expand={showNavMenu}
        />
      </MainNavBrand>
      <MainNavMenu expand={showNavMenu}>
        <MainNavMenuStart>
          <MainNavItem to="/" as={Link}>
            Home
          </MainNavItem>
          <MainNavItem to="/todo" as={Link}>
            Todo
          </MainNavItem>
        </MainNavMenuStart>
      </MainNavMenu>
    </MainNavComposable>
  );
};

export default NavigationBar;
