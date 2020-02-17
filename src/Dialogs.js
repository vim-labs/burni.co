import React from "react";
import Transfer from "./dialogs/Transfer";
import Multihash from "./dialogs/Multihash";

export default ({ onClose, dialogs, selected, accountHolder }) => {
  return (
    <>
      <Transfer
        open={dialogs["transfer"][0]}
        onClose={onClose}
        selected={selected}
        accountHolder={accountHolder}
      />
      <Multihash
        open={dialogs["multihash"][0]}
        onClose={onClose}
        selected={selected}
        accountHolder={accountHolder}
      />
    </>
  );
};
