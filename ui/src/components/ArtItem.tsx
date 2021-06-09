import React from "react";
import {
  useLedger,
} from "@daml/react";
import { TokenArt } from "@daml.js/daml-social-network";
import { Typography, Card, TextField } from "@material-ui/core";
import { ContractId } from "@daml/types";
import { makeStyles, Button, Theme } from "@material-ui/core";
import { getPinataImageString } from "../pinataUtils";


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
  owner,
  image,
  issuedAt,
  price
}) => {
  const ledger = useLedger();
  const classes = useStyles();
  const [newPrice, setPrice] = React.useState(price);
  const [base64String, setBase64String] = React.useState("")
 
  if (image) {
    getPinataImageString(image).then((data) => setBase64String(data.message))

  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrice(e.target.value);
  }

  const onOfferClick = async () => {
    try {
      await ledger.exercise(TokenArt.TokenArt.Offer, contractId, {
        // TODO: Remove hardcoded. This is for Daml Hub.
        reader: "public-wtcqmdkd3wt3ohp8",
        price: newPrice,
        contract: contractId
      });
    } catch (e) {
      console.log(e)
      alert(`error`);
    }
  };
  return (
    <Card className={classes.root}>
      <img className={classes.image} alt='img' src={base64String} />
      <div>

        <Typography className={classes.text} variant="caption">creator:</Typography>
        <Typography className={classes.text} variant="caption">{issuer}</Typography>
      </div>
      <div>
        <Typography className={classes.text} variant="caption">created on:</Typography>
        <Typography className={classes.text} variant="caption">{issuedAt}</Typography>
      </div>
      <div>
        <Typography className={classes.text} variant="caption">price:</Typography>
        <Typography className={classes.text} variant="caption">{price}</Typography>
      </div>
      <div className={classes.buttonText}>
        <Button className={classes.buttonText}  color='secondary' style={{ marginRight: '4px' }} variant='contained' onClick={onOfferClick}>Make Offer</Button>
        <Typography style={{ marginRight: '4px' }}>@</Typography>
        <TextField className={classes.input} size='small' variant='outlined' onChange={onChange} value={newPrice} />
      </div>
    </Card>
  );
};


