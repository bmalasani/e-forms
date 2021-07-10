import React from "react";
import classNames from "classnames";
import { Switch, Route, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/Navbars/Navbar.js";
import Footer from "../components/Footer/Footer.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
// import Parallax from "../components/Parallax/Parallax.js";
import { CssBaseline } from "@material-ui/core";
import routes from "../routes";

import styles from "../assets/jss/components/adminStyle";

import bgImage from "../assets/img/sidebar-2.jpg";
// import pbg from "../assets/img/bg.jpg";
import logo from "../assets/img/reactlogo.png";

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  const classes = useStyles();

  const mainPanel = React.createRef();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  return (
    <div className={classes.wrapper}>
      <CssBaseline />
      <Navbar
        logo={logo}
        logoText="E-Forms"
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        {...rest}
      />
      <Sidebar
        image={bgImage}
        color="orange"
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        routes={routes}
      />
      <div
        className={classNames(classes.mainPanel, {
          [classes.mainPanelShift]: !mobileOpen,
        })}
        ref={mainPanel}
      >
        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
