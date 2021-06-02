import React from "react";
import {
  Theme,
  makeStyles,
  Card,
  Typography,
  CardMedia
} from "@material-ui/core";
import {
  useParty,
  useLedger,
  useStreamFetchByKeys,
  useStreamQueries
} from "@daml/react";
import { Button } from "semantic-ui-react";
import { TokenArt } from "@daml.js/daml-social-network";
import { Iou } from "@daml.js/daml-social-network";
import { ContractId } from "@daml/types";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
    margin: theme.spacing(1)
  },
  image: {
      width: '100%'
  }
}));

interface OfferItemProps {
  owner: string;
  issuer: string;
  image: string;
  contractId: ContractId<TokenArt.TokenOffer>;
  price: string;
}
export const OfferItem: React.FC<OfferItemProps> = ({
  contractId,
  issuer,
  image,
  owner,
  price
}) => {
  const classes = useStyles();
  const ledger = useLedger();
  const username = useParty();

  const myIous = useStreamQueries(Iou.Iou).contracts;
  const consolidatedIou = myIous?.[0]?.contractId


  const onClick = async () => {
    try {
      await ledger.exercise(TokenArt.TokenOffer.AcceptOffer, contractId, {
        acceptingOwner: username,
        iouCid: consolidatedIou
      });
    } catch (e) {
      alert("error");
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
        <Typography variant="caption">owner:</Typography>
        <Typography variant="caption">{owner}</Typography>
      </div>
      <div>
        <Typography variant="caption">price:</Typography>
        <Typography variant="caption">{price}</Typography>
      </div>
      <div>
        <Button size='small' onClick={onClick} color="green">Buy</Button>
      </div>
    </Card>
  );
};
