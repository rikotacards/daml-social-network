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
  },
  image: {
    width: '100%'
}
}));
interface ArtItemProps {
  issuer: string;
  owner: string;
  image: string;
  issuedAt: string;
  price: string;
  contractId: ContractId<TokenArt.TokenArt>;
}

export const ArtItem: React.FC<ArtItemProps> = ({
  contractId,
  issuer,
  owner,
  image,
  issuedAt,
  price
}) => {
  //   const username = useParty();
  const ledger = useLedger();
  const classes = useStyles();

  const onCancelClick = async() => {
    try {
      await ledger.exerciseByKey(TokenArt.TokenOffer.ArchiveOffer, {
        _1: issuer, 
        _2: owner, 
        _3: image
      }, {
      })
    } catch (e){
      alert('error')
    }
  }

  const onOfferClick = async () => {
    try {
      await ledger.exercise(TokenArt.TokenArt.Offer, contractId, {
        reader: "reader",
        price: price,
        contract: contractId
      });
    } catch (e) {
      alert(`error`);
    }
  };
  return (
    <Card className={classes.root}>
        <img className={classes.image} src={image}/>
      <div>

        <Typography variant="caption">creator:</Typography>
        <Typography variant="caption">{issuer}</Typography>
      </div>
      <div>
        <Typography variant="caption">created on:</Typography>
        <Typography variant="caption">{issuedAt}</Typography>
      </div>
      <div>
        <Typography variant="caption">price:</Typography>
        <Typography variant="caption">{price}</Typography>
      </div>
      <div>
        <Button onClick={onOfferClick}>offer</Button>
        <Button onClick={onCancelClick}>cancel offer</Button>
      </div>
    </Card>
  );
};
