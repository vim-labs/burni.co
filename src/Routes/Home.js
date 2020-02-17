import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Typography } from "@material-ui/core";
import AppBar from "../AppBar";
import Footer from "../Footer";

const useStyles = makeStyles(theme => ({
  bold: {
    fontWeight: "bold"
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
  details: {
    background: "#ffe600"
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <>
      <AppBar
        headline="Poof. Gone."
        subheading="A new class of exchangable cryptocurrency assets"
      >
        <Button href="https://uniswap.io/" classes={{ root: classes.button }}>
          Available on Uniswap
        </Button>
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
              An{" "}
              <span className={classes.bold}>
                immutable content identifier multihash
              </span>{" "}
              can be set a <span className={classes.bold}>single time</span> for
              a token, wrapping the underlying asset, collectable, or artwork
              inside the token.
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
      <Footer />
    </>
  );
};
