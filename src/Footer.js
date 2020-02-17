import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FaGithubSquare } from "react-icons/fa";

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(4),
    display: "flex",
    alignContent: "center",
    background: "#000",
    color: "#fff"
  },
  expand: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end"
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <span>&copy;</span> <span>{new Date().getFullYear()} burni.co</span>
      <span className={classes.expand}>
        <a
          href="https://github.com/vim-labs/burni_tokens"
          style={{ color: "#ffe600" }}
        >
          <FaGithubSquare size={24} />
        </a>
      </span>
    </footer>
  );
};
