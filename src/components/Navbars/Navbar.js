import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { InputBase, Typography, Badge } from "@material-ui/core";
import { Menu, Search, Notifications, AccountCircle } from "@material-ui/icons";
import Hidden from "@material-ui/core/Hidden";

import styles from "../../assets/jss/components/headerStyle.js";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  const { color, logo, logoText } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawerToggle}
        >
          <Menu />
        </IconButton>
        <div className={classes.logo}>
          <a
            href="#admin"
            className={classNames(classes.logoLink, {
              [classes.logoLinkRTL]: props.rtlActive,
            })}
          >
            <Typography className={classes.title} variant="h6" noWrap>
              <div className={classes.logoImage}>
                <img src={logo} alt="logo" className={classes.img} />
              </div>
              {logoText}
            </Typography>
          </a>
        </div>
        <Hidden smDown implementation="css">
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Hidden>
        <Hidden smDown implementation="css">
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
  image: PropTypes.string,
  logo: PropTypes.string,
  logoText: PropTypes.string,
};
