import React from "react";
import { Theme, makeStyles, Button } from "@material-ui/core";
import {
  useParty,
  useLedger,
  useStreamFetchByKeys,
  useStreamQueries
} from "@daml/react";
import { User } from "@daml.js/daml-social-network";

export const AddArt: React.FC = () => {
  const ledger = useLedger();
  const username = useParty();

  const addArt = async () => {
    try {
      await ledger.exerciseByKey(User.User.MintToken, username, {
        initialPrice: "100.00",
        image: "imageText",
        royaltyRate: "0.05",
      });
    } catch (e) {
      alert("error");
    }
  };

  const myUserResult = useStreamFetchByKeys(User.User, () => [username], [
    username
  ]);
  const myUser = myUserResult.contracts[0]?.payload;
  return (
    <>
      <Button variant='contained' onClick={addArt}>add</Button>
    </>
  );
};
