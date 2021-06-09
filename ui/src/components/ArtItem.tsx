import React from "react";
import {
  useLedger,
} from "@daml/react";
import { TokenArt } from "@daml.js/daml-social-network";
import { Typography, Card, TextField, LinearProgress, CircularProgress } from "@material-ui/core";
import { ContractId } from "@daml/types";
import { makeStyles, Button, Theme } from "@material-ui/core";
import { getPinataImageString } from "../pinataUtils";
import { deploymentMode, DeploymentMode } from '../config';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  image: {
    width: '100%'
  },
  text: {
    marginRight: theme.spacing(1)
  },
  textBold: {
    marginRight: theme.spacing(1),
    fontWeight: 'bold'
  },
  buttonText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(0.5)
  },
  input: {
    maxWidth: '100px'
  },
  offerButton: {
    textTransform: 'capitalize'
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
  image,
  issuedAt,
  price
}) => {
  const ledger = useLedger();
  const classes = useStyles();
  const [newPrice, setPrice] = React.useState(price);
  const [base64String, setBase64String] = React.useState("")
  const [isMakingOffer, setMakingOffer] = React.useState(false);

  if (image) {
    getPinataImageString(image).then((data) => setBase64String(data.message))

  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrice(e.target.value);
  }

  const onOfferClick = async () => {
    try {
      setMakingOffer(true);
      await ledger.exercise(TokenArt.TokenArt.Offer, contractId, {
        // TODO: Remove hardcoded. This is for Daml Hub.
        reader: deploymentMode === DeploymentMode.PROD_DABL ? "public-wtcqmdkd3wt3ohp8" : "reader",
        price: newPrice,
        contract: contractId
      });
      setMakingOffer(false);
    } catch (e) {
      console.log(e)
      setMakingOffer(false)
      alert(`error`);
    }
  };
  return (
    <Card className={classes.root}>
      {base64String.length > 0 ? <img className={classes.image} alt='img' src={base64String} /> : <LinearProgress variant='indeterminate' />}
      <div>
        <Typography className={classes.textBold} variant="caption">Creator:</Typography>
        <Typography className={classes.text} variant="caption">{issuer}</Typography>
      </div>
      <div>
        <Typography className={classes.textBold} variant="caption">Created on:</Typography>
        <Typography className={classes.text} variant="caption">{issuedAt}</Typography>
      </div>
      <div>
        <Typography className={classes.textBold} variant="caption">Price:</Typography>
        <Typography className={classes.text} variant="caption">${price}</Typography>
      </div>
      <div className={classes.buttonText}>
        <Button className={classes.buttonText} style={{ marginRight: '4px' }} variant='contained' onClick={onOfferClick}>Make Offer{isMakingOffer && <CircularProgress variant='indeterminate' size='small' />}</Button>
        <Typography style={{ marginRight: '4px' }}>@</Typography>
        <TextField className={classes.input} size='small' variant='outlined' onChange={onChange} value={newPrice} />
      </div>
    </Card>
  );
};


