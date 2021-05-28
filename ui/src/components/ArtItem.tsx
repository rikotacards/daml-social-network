import React from "react";
import {
  useParty,
  useLedger,
  useStreamFetchByKeys,
  useStreamQueries
} from "@daml/react";
import { TokenArt } from "@daml.js/daml-social-network";
import { Typography, Card } from "@material-ui/core";
import { Button } from "semantic-ui-react";
import { ContractId } from "@daml/types";
import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  }
}));
interface ArtItemProps {
  issuer: string;
  owner: string;
  image: string;
  issuedAt: string;
  contractId: ContractId<TokenArt.TokenArt>;
}

export const ArtItem: React.FC<ArtItemProps> = ({
  contractId,
  issuer,
  owner,
  image,
  issuedAt
}) => {
  //   const username = useParty();
  const ledger = useLedger();
  const classes = useStyles();
  const onOfferClick = async () => {
    try {
      await ledger.exercise(TokenArt.TokenArt.Offer, contractId, {
        reader: "reader",
        price: "100.0"
      });
    } catch (e) {
      alert(`error`);
    }
  };
  return (
    <Card className={classes.root}>
      <div>
        <Typography>creator:</Typography>
        <Typography variant="caption">{issuer}</Typography>
      </div>
      <div>
        <Typography>created on:</Typography>
        <Typography variant="caption">{issuedAt}</Typography>
      </div>
      <div>
        <Button onClick={onOfferClick}>offer</Button>
      </div>
    </Card>
  );
};
