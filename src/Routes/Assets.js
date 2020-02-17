import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Link,
  IconButton,
  Avatar,
  Paper,
  TextField,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Zoom
} from "@material-ui/core";
import AppBar from "../AppBar";
import Footer from "../Footer";
import Dialogs from "../Dialogs";
import abi_burni from "../assets/burni_abi.json";
import abi_burnin from "../assets/burnin_abi.json";
import Web3 from "web3";
import moment from "moment";
import { FaEthereum, FaRegClock } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import { weiIntValue } from "../utils";

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: "#000",
    color: "#ffe600",
    width: 64,
    height: 64,
    marginRight: theme.spacing(2)
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
  bold: {
    fontWeight: "bold"
  },
  sans: {
    fontFamily: "Roboto",
    fontSize: "0.8rem"
  },
  uppercase: {
    textTransform: "uppercase"
  },
  mono: {
    fontFamily: "monospace, courier",
    fontSize: "16px",
    fontWeight: "bold",
    textOverflow: "ellipsis",
    overflow: "hidden"
  },
  monoSmall: {
    fontFamily: "monospace, courier",
    fontSize: "0.75rem !important",
    textOverflow: "ellipsis",
    overflow: "hidden",
    textTransform: "uppercase"
  },
  moreMenu: {
    fontFamily: "Roboto"
  }
}));

const MenuMore = React.forwardRef(
  ({ onClickWithRef, onSelected, details, ...props }, ref) => {
    // Create a new ref and connect state details to click event
    const handleClick = () => {
      onSelected(details);
      onClickWithRef(ref);
    };
    return (
      <IconButton ref={ref} onClick={handleClick} {...props}>
        <MdMoreVert />
      </IconButton>
    );
  }
);

export const Connected = ({
  accountHolder,
  burni,
  nfts,
  onSelected,
  onDialogOpen,
  selected
}) => {
  const classes = useStyles();

  const [moreMenuRef, setMoreMenuRef] = useState(null);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const handleMoreMenuOpen = ref => {
    setMoreMenuRef(ref);
    setMoreMenuOpen(true);
  };

  const handleMoreMenuClose = () => {
    setMoreMenuOpen(false);
  };

  return (
    <Box maxWidth={960} marginX="auto" padding={5}>
      <Box display="flex" alignItems="flex-end">
        <Box display="flex">
          <Typography variant="body1">Burni:&nbsp;</Typography>
          <Typography variant="body1" className={classes.bold}>
            {burni || "-"}
          </Typography>
        </Box>
        <Box flexGrow={1}></Box>
        <Box display="flex">
          <Typography variant="body1" className={classes.bold}>
            {nfts.length}&nbsp;
          </Typography>
          <Typography variant="body1">Burnins found</Typography>
        </Box>
      </Box>
      <Typography variant="body1">
        Account holder: <span className={classes.mono}>{accountHolder}</span>
      </Typography>
      <ListItem divider />
      <List className={classes.root}>
        {nfts.map(({ id, age, genhash, multihash, valuation }) => (
          <ListItem key={id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar classes={{ root: classes.avatar }}>
                <FaEthereum />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              disableTypography
              primary={
                <Box className={classes.mono}>
                  #{id}:&nbsp;
                  {multihash ? (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://ipfs.io/ipfs/${multihash}`}
                    >
                      {multihash}
                    </a>
                  ) : (
                    <span style={{ color: "#888" }}>
                      &lt;multihash not set&gt;
                    </span>
                  )}
                </Box>
              }
              secondary={
                <Box>
                  <Box display="flex" alignItems="flex-end" marginRight={2}>
                    <Typography variant="caption" className={classes.uppercase}>
                      Genesis:&nbsp;
                    </Typography>
                    <Typography className={classes.monoSmall}>
                      {genhash}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="flex-end"
                    marginRight={2}
                    className={classes.sans}
                  >
                    <Box display="flex" alignItems="center">
                      <FaRegClock size={12} style={{ marginRight: "4px" }} />
                      {`${age} | ${valuation} BURN`}
                    </Box>
                  </Box>
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <MenuMore
                ref={React.createRef()}
                onClickWithRef={handleMoreMenuOpen}
                onSelected={onSelected}
                details={{ id, multihash }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {moreMenuRef && moreMenuRef.current && (
        <Popper
          open={moreMenuOpen}
          anchorEl={moreMenuRef.current}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleMoreMenuClose}>
                  <MenuList>
                    {selected && !selected.multihash && (
                      <MenuItem
                        classes={{ root: classes.moreMenu }}
                        onClick={() => onDialogOpen("multihash")}
                      >
                        Set Multihash
                      </MenuItem>
                    )}
                    <MenuItem
                      classes={{ root: classes.moreMenu }}
                      onClick={() => onDialogOpen("transfer")}
                    >
                      Transfer
                    </MenuItem>
                    <MenuItem
                      classes={{ root: classes.moreMenu }}
                      component={Link}
                      href={`https://opensea.io/assets/${burninAddress}/${selected &&
                        selected.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Sell
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      )}
    </Box>
  );
};

export const Connecting = () => {
  return (
    <Box maxWidth={960} marginX="auto" padding={5}>
      <Box display="flex" alignItems={"center"}>
        <Typography variant="h4">Authentication</Typography>
        <Box marginLeft={1}>
          <CircularProgress size={24} />
        </Box>
      </Box>

      <Typography variant="body1">
        Requesting permission to connect to your Ethereum wallet.
      </Typography>

      <Box marginTop={2}>
        <Typography variant="body1">
          Download <a href="http://metamask.io">MetaMask</a>.
        </Typography>
      </Box>
    </Box>
  );
};

export const Loading = () => {
  return (
    <Box maxWidth={960} marginX="auto" padding={5}>
      <Box display="flex" alignItems={"center"}>
        <Typography variant="h4">Loading Assets</Typography>
        <Box marginLeft={1}>
          <CircularProgress size={24} />
        </Box>
      </Box>

      <Typography variant="body1">
        Importing your NFTs from the Ethereum blockchain...
      </Typography>
    </Box>
  );
};

const burniAddress = "0x076a7c93343579355626F1426dE63F8827C9b9B2";
const burninAddress = "0x999BC7b1D5b2741E90296695Ed1610A37021df49";

export default () => {
  const [accountHolder, setAccountHolder] = useState("");
  const [nfts, setNFTs] = useState(null);
  const [burni, setBurni] = useState("0");
  const [isMinting, setIsMinting] = useState(0);
  const [mintAmount, setMintAmount] = useState("");
  const [selected, setSelected] = useState({});
  const dialogs = {
    transfer: useState(false),
    multihash: useState(false)
  };

  const handleDialogOpen = dialogName => dialogs[dialogName][1](true);
  const handleDialogClose = dialogName => dialogs[dialogName][1](false);
  const handleSelected = selection => setSelected(selection);

  useEffect(() => {
    // Construct contract interface
    async function loadAssets(k0) {
      // Connect to Burni Smart Contract
      const burniContract = new window.web3.eth.Contract(
        abi_burni,
        burniAddress
      );

      // Get balance
      const burniWei = await burniContract.methods
        .balanceOf(k0)
        .call({ from: k0 });

      // Convert balance wei -> eth
      const _burni = window.web3.utils.fromWei(burniWei, "ether");

      setBurni(_burni);

      // Connect to Burnin Smart Cantract
      const burninContract = new window.web3.eth.Contract(
        abi_burnin,
        burninAddress
      );

      // Check the number of Burnin assets
      const numNFTs = Number(
        await burninContract.methods.balanceOf(k0).call({ from: k0 })
      );

      // Map asset indices to { id, blockNumber, age, genhash, multihash, valuation }
      const tokenIdxList = [...Array(numNFTs).keys()];

      // Get latest block
      const latestBlockNumber = await window.web3.eth.getBlockNumber();

      const _nfts = await Promise.all(
        tokenIdxList.map(async idx => {
          const id = await burninContract.methods
            .tokenOfOwnerByIndex(k0, idx)
            .call({ from: k0 });

          const blockNumber = (
            await burninContract.getPastEvents("Transfer", {
              filter: {
                from: "0x0000000000000000000000000000000000000000",
                tokenId: id
              },
              fromBlock: 9497370,
              toBlock: "latest"
            })
          ).map(event => {
            return event["blockNumber"];
          })[0];
          const block = await window.web3.eth.getBlock(blockNumber);
          const createdAt = moment.unix(block.timestamp);
          const age = moment(createdAt).fromNow();

          // Attempt to create NFT genesis hash
          // The contract address, token id and 5 blockhashes (in utf-8) following minting
          // are concatenated and hashed (sha3) to create a semi-random value.
          // Eg. sha3("burnin0x0010x0010x0020x0030x0040x005")
          let genhash = "-";

          if (latestBlockNumber - blockNumber > 5) {
            const futureBlocks = [...Array(5).keys()].map(
              v => v + blockNumber + 1
            );
            const blockHashes = (
              await Promise.all(
                futureBlocks.map(blockNumber =>
                  window.web3.eth.getBlock(blockNumber)
                )
              )
            )
              .map(block => block.hash)
              .join("");
            genhash = window.web3.utils.sha3(burninAddress + id + blockHashes);
          }

          const multihash = await burninContract.methods
            .getMultihash(id)
            .call({ from: k0 });

          const valuationWei = await burninContract.methods
            .getValuation(id)
            .call({ from: k0 });

          // Convert valuation from wei -> eth
          const valuation = window.web3.utils.fromWei(valuationWei, "ether");
          return { id, blockNumber, age, genhash, multihash, valuation };
        })
      );

      // Update state
      setNFTs(_nfts);
    }

    async function connectToWallet() {
      // Disable MetaMask refresh
      if (window.ethereum && window.ethereum.autoRefreshOnNetworkChange) {
        window.ethereum.autoRefreshOnNetworkChange = false;
      }

      // Abort if web3 is unavailable
      if (typeof window.web3 === "undefined") {
        return;
      }

      // Request permission for MetaMask (or similar) in-browser Ethereum wallet.
      window.web3 = new Web3(window.web3.currentProvider);
      await window.web3.currentProvider.enable();

      // Use the first account as the default account.
      const [k0] = await window.web3.eth.getAccounts();
      setAccountHolder(k0);

      // Load assets
      try {
        loadAssets(k0);
      } catch (err) {
        console.error(err);
      }
    }
    connectToWallet();
  }, []);

  const classes = useStyles();

  const hasEnoughBurni =
    accountHolder &&
    burni &&
    parseInt(window.web3.utils.toWei(burni, "ether"), 10) >= 40;
  const hasEnoughToMint = weiIntValue(mintAmount) >= 40;

  const handleMinting = () => {
    // Mint a new NFT
    setIsMinting(2);

    const burniContract = new window.web3.eth.Contract(abi_burni, burniAddress);

    burniContract.methods
      .transfer(burninAddress, window.web3.utils.toWei(mintAmount, "ether"))
      .send({ from: accountHolder })
      .on("confirmation", () => {
        setIsMinting(0);
      });
  };

  return (
    <>
      <Dialogs
        onClose={handleDialogClose}
        dialogs={dialogs}
        selected={selected}
        accountHolder={accountHolder}
      />
      <AppBar
        headline="Digital Assets"
        subheading="Mint, Define, &amp; Transfer NFTs"
      >
        {isMinting === 0 && (
          <Button
            onClick={() => setIsMinting(1)}
            classes={{ root: classes.button }}
            disabled={!Boolean(accountHolder)}
          >
            Mint a Burnin
          </Button>
        )}
        {isMinting > 0 && (
          <Zoom in>
            <Box margin={1}>
              <Paper>
                <Box padding={2} width={320}>
                  <Typography variant="subtitle1" className={classes.bold}>
                    Burnin NFT
                  </Typography>
                  <TextField
                    placeholder="Total Burni"
                    variant="outlined"
                    onChange={e => setMintAmount(e.target.value)}
                    value={mintAmount}
                    fullWidth
                    autoFocus
                  />
                  <Box display="flex" alignItems="center" marginTop={2}>
                    {isMinting === 2 && <CircularProgress size={18} />}
                    <Box flexGrow={1}></Box>
                    <Button
                      disabled={
                        !accountHolder || !hasEnoughBurni || !hasEnoughToMint
                      }
                      onClick={handleMinting}
                      color="secondary"
                      variant="contained"
                    >
                      Mint
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Zoom>
        )}
      </AppBar>
      {nfts && (
        <Connected
          onSelected={handleSelected}
          onDialogOpen={handleDialogOpen}
          selected={selected}
          accountHolder={accountHolder}
          burni={burni}
          nfts={nfts}
        />
      )}
      {nfts == null && (accountHolder ? <Loading /> : <Connecting />)}
      <Footer />
    </>
  );
};
