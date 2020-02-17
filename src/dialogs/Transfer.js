import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  Typography,
  TextField,
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
  const [recipient, setRecipient] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);
  const burninAddress = "0x999BC7b1D5b2741E90296695Ed1610A37021df49";

  const handleClose = () => {
    onClose("transfer");
  };

  const handleTransfer = (recipient, id) => {
    const burninContract = new window.web3.eth.Contract(
      abi_burnin,
      burninAddress
    );

    setIsTransferring(true);

    burninContract.methods
      .transferFrom(accountHolder, recipient, id)
      .send({ from: accountHolder })
      .on("confirmation", () => {
        setIsTransferring(false);
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
        <Typography variant="h4">Transfer</Typography>
        <Box display="flex">
          <Typography variant="body1">Token ID:&nbsp;</Typography>
          <Typography variant="body1" className={classes.bold}>
            {selected && selected.id}
          </Typography>
        </Box>
      </Box>
      <DialogContent>
        <TextField
          placeholder="0x"
          label="Recipient"
          value={recipient}
          onChange={e => setRecipient(e.currentTarget.value)}
          fullWidth
          autoFocus
        />
      </DialogContent>
      <Box display="flex" alignItems="center" padding={3}>
        {isTransferring && <CircularProgress size={16} />}
        <Box flexGrow={1}></Box>
        <Button onClick={handleClose}>Cancel</Button>
        <Box marginLeft={1}>
          <Button
            disabled={recipient.length !== 42 || isTransferring}
            onClick={() => {
              handleTransfer(recipient, selected.id);
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
