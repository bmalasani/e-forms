import React, { useMemo } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import styles from "../../assets/jss/components/sidebarStyle.js";
import { List, ListItem, Icon, ListItemText } from "@material-ui/core";
import { NavLink, useLocation } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
  const { image, open, color, handleDrawerToggle, routes } = props;

  let location = useLocation();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return location.pathname === routeName;
  }

  const NavLinks = useMemo(
    () => (
      <List className={classes.list}>
        {routes.map((prop, key) => {
          var listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.layout + prop.path),
          });
          const whiteFontClasses = classNames({
            [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path),
          });
          return (
            <NavLink
              to={prop.layout + prop.path}
              className={classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem
                button
                className={
                  classes.itemLink + classes.itemText + listItemClasses
                }
              >
                {typeof prop.icon === "string" ? (
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClasses)}
                  >
                    {prop.icon}
                  </Icon>
                ) : (
                  <prop.icon
                    className={classNames(classes.itemIcon, whiteFontClasses)}
                  />
                )}
                {open && (
                  <ListItemText
                    primary={prop.name}
                    className={classNames(classes.itemText, whiteFontClasses)}
                    disableTypography={true}
                  />
                )}
              </ListItem>
            </NavLink>
          );
        })}
      </List>
    ),
    [routes, open, location]
  );

  return (
    <div>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.sidebarWrapper}>{NavLinks}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          open={open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div className={classes.sidebarWrapper}>{NavLinks}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  image: PropTypes.string,
  open: PropTypes.bool,
  routes: PropTypes.array,
  color: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
};
