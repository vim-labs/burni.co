import React from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  ThemeProvider
} from "@material-ui/core";
import { FaGithubSquare } from "react-icons/fa";

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundImage:
      "radial-gradient(farthest-corner at 0px 0px, #202022 0%, #08080a 100%)",
    height: 480
  },
  button: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    background: "#f0f0f2",
    fontWeight: "bold",
    "&:hover": {
      background: "white"
    }
  },
  logo: {
    flexGrow: 1
  },
  bold: {
    fontWeight: "bold"
  },
  navButton: {
    fontFamily: "Roboto"
  },
  shadow: {
    textShadow: "1px 1px #000"
  },
  details: {
    background: "#ffe600"
  },
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
  },
  copyLeft: {
    display: "inline-block",
    transform: "rotate(180deg)",
    height: "25px"
  }
}));

export default () => {
  const classes = useStyles();
  const theme = createMuiTheme({
    typography: {
      fontFamily: "Playfair Display"
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" classes={{ root: classes.appBar }}>
        <Toolbar>
          <div className={classes.logo}>
            <img src="./logo_white.svg" height="92" alt="Burni Logo" />
          </div>
          <Button
            href="#get-started"
            color="inherit"
            classes={{ root: classes.navButton }}
          >
            Get Started
          </Button>
        </Toolbar>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          style={{ marginTop: "-64px" }}
        >
          <Box paddingX={4}>
            <Typography variant="h2" className={classes.shadow}>
              Poof. Gone.
            </Typography>
          </Box>
          <Box paddingX={4}>
            <Typography variant="h6" className={classes.shadow}>
              A new class of exchangable cryptocurrency assets
            </Typography>
          </Box>
          <Box>
            <Button
              href="https://uniswap.exchange/"
              classes={{ root: classes.button }}
            >
              Available on Uniswap
            </Button>
          </Box>
        </Box>
      </AppBar>
      <Box maxWidth={960} marginX="auto" padding={5}>
        <Typography variant="h3">How it works</Typography>
        <Typography variant="body1">
          Ethereum ERC20 (<span className={classes.bold}>Burni</span>) coins are
          used to mint non-fungible ERC721 (
          <span className={classes.bold}>Burnin</span>) tokens through a
          decentralized blockchain Smart Contract. In the process,{" "}
          <span className={classes.bold}>
            97.5% of the original cryptocurrency is destroyed
          </span>
          , leaving just <span className={classes.bold}>2.5%</span> spared as
          the Burni is transmuted into a new NFT digital asset.
        </Typography>
        <Box marginTop={2}>
          <Typography variant="body1">
            This makes Burni a deflationary cryptocurrency with unique
            cryptoeconomic properties, while providing non-fungible Burnin
            tokens an inherent value.
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        marginX="auto"
        style={{
          backgroundImage: "url(./proof-of-burn.svg)",
          height: 440,
          maxWidth: 960,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center"
        }}
      ></Box>
      <Box className={classes.details}>
        <Box maxWidth={960} marginX="auto" padding={5}>
          <Typography variant="h4" className={classes.bold}>
            Unique properties
          </Typography>
          <Typography variant="body1">
            The total Burni sent to the Burnin smart contract is used to forge a
            single token. Since multiple coins cannot be forged simultaneously,
            Ether is infused into the cost of production.
          </Typography>
          <Box marginTop={2}>
            <Typography variant="body1">
              An <span className={classes.bold}>immutable multihash</span> can
              be set a <span className={classes.bold}>single time</span> for a
              token as an identifier for the underlying asset, collectable, or
              artwork.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box maxWidth={960} marginX="auto" padding={5}>
          <Typography
            variant="h4"
            className={classes.bold}
            style={{ textAlign: "center" }}
            id="get-started"
          >
            Ready to get started?
          </Typography>
          <Box marginTop={2}>
            <Typography
              variant="body1"
              className={classes.serif}
              style={{ textAlign: "center" }}
            >
              Burni (ERC-20) Address:
            </Typography>
            <Typography
              variant="body1"
              className={classes.bold}
              style={{ textAlign: "center" }}
            >
              0x076a7c93343579355626F1426dE63F8827C9b9B2
            </Typography>
          </Box>
          <Box marginTop={2}>
            <Typography
              variant="body1"
              className={classes.serif}
              style={{ textAlign: "center" }}
            >
              Burnin (ERC-721) Address:
            </Typography>
            <Typography
              variant="body1"
              className={classes.bold}
              style={{ textAlign: "center" }}
            >
              0x999BC7b1D5b2741E90296695Ed1610A37021df49
            </Typography>
          </Box>
        </Box>
      </Box>
      <footer className={classes.footer}>
        <span className={classes.copyLeft}>&copy;</span>{" "}
        <span>{new Date().getFullYear()} burni.co</span>
        <span className={classes.expand}>
          <a
            href="https://github.com/vim-labs/burni_tokens"
            style={{ color: "#ffe600" }}
          >
            <FaGithubSquare size={24} />
          </a>
        </span>
      </footer>
    </ThemeProvider>
  );
};
