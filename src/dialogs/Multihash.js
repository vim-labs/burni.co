import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  TextField,
  Typography,
  Box,
  Button,
  CircularProgress
} from "@material-ui/core";
import abi_burnin from "../assets/burnin_abi.json";

const useStyles = makeStyles(theme => ({
  dialog: {
    "& .MuiDialog-paper": {
      width: 320
    }
  },
  bold: {
    fontWeight: "bold"
  }
}));

export default ({ accountHolder, selected, open, onClose }) => {
  const classes = useStyles();
  const [multihash, setMultihash] = useState("");
  const [isSettingMultihash, setIsSettingMultihash] = useState(false);
  const burninAddress = "0x999BC7b1D5b2741E90296695Ed1610A37021df49";

  const handleClose = () => {
    onClose("multihash");
  };

  const handleSetMultihash = (multihash, id) => {
    const burninContract = new window.web3.eth.Contract(
      abi_burnin,
      burninAddress
    );

    setIsSettingMultihash(true);

    burninContract.methods
      .setMultihash(id, multihash)
      .send({ from: accountHolder })
      .on("confirmation", () => {
        setIsSettingMultihash(false);
        handleClose();
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{ root: classes.dialog }}
    >
      <Box padding={3}>
        <Typography variant="h4">Multihash</Typography>
        <Box display="flex">
          <Typography variant="body1">Token ID:&nbsp;</Typography>
          <Typography variant="body1" className={classes.bold}>
            {selected && selected.id}
          </Typography>
        </Box>
      </Box>
      <DialogContent>
        <TextField
          placeholder="Qmc5gCcjYypU7y28oCALwfSvxCBskLuPKWpK4qpterKC7z"
          label="Multihash"
          value={multihash}
          onChange={e => setMultihash(e.currentTarget.value)}
          fullWidth
          autoFocus
        />
      </DialogContent>
      <Box display="flex" alignItems="center" padding={3}>
        {isSettingMultihash && <CircularProgress size={16} />}
        <Box flexGrow={1}></Box>
        <Button onClick={handleClose}>Cancel</Button>
        <Box marginLeft={1}>
          <Button
            disabled={multihash.length === 0 || isSettingMultihash}
            onClick={() => {
              handleSetMultihash(multihash, selected.id);
            }}
            variant="contained"
            color="secondary"
          >
            Send
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
