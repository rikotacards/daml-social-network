import React from "react";
import {
  Theme,
  makeStyles,
  Card,
  Typography,
} from "@material-ui/core";
import {
  useParty,
  useLedger,
  useStreamQueries,
  
} from "@daml/react";
import { Button } from "semantic-ui-react";
import { TokenArt } from "@daml.js/daml-social-network";
import { Iou } from "@daml.js/daml-social-network";
import { ContractId } from "@daml/types";
import { getPinataImageString } from "../pinataUtils";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
    margin: theme.spacing(1)
  },
  image: {
    width: '100%'
  },
  container: {
    display: 'flex'
  },
  buyContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(0.5)
  },
  buy: {
    marginLeft: theme.spacing(1)
  },
  title: {
    marginRight: theme.spacing(1),
    fontWeight: 'bold'
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
  const [base64String, setBase64String] = React.useState("")


  getPinataImageString(image).then((data) => setBase64String(data.message))

  const onClick = async () => {

    try {
      await ledger.exercise(TokenArt.TokenOffer.AcceptOffer, contractId, {
        acceptingOwner: username,
        iouCid: consolidatedIou,
      });
    } catch (e) {
      alert("error");
    }
  };

  const onCancelClick = async () => {

    try {
      await ledger.exercise(TokenArt.TokenOffer.ArchiveOffer, contractId, {
      });
    } catch (e) {
      alert("error");
    }
  };
  return (
    <Card className={classes.root}>
      <img className={classes.image} alt='img' src={base64String} />
      <div className={classes.container}>
        <Typography className={classes.title} variant="caption">Creator: </Typography>
        <Typography variant="caption">{issuer}</Typography>
      </div>
      <div className={classes.container}>
        <Typography className={classes.title} variant="caption">Owner: </Typography>
        <Typography variant="caption">{owner}</Typography>
      </div>
      {username !== owner && <div className={classes.buyContainer}>
        <Button  size='small' onClick={onClick} color="green">Buy @ ${price} </Button>
      </div>}
      {username === owner && (<div>
        <Button size='small' onClick={onCancelClick} color="red">Remove Offer</Button>
      </div>)}
    </Card>
  );
};
