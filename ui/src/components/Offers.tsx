import React from "react";
import {
  useParty,
  useLedger,
  useStreamFetchByKeys,
  useStreamQueries
} from "@daml/react";
import { TokenArt } from "@daml.js/daml-social-network";
import { Card, Theme, makeStyles, Typography, Grid } from "@material-ui/core";
import { OfferItem } from "./OfferItem";
import { isMobile } from "../platform/platform";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(1)
  },
  card: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  }
}));

export const Offers: React.FC = () => {
  const classes = useStyles();
  const tokenOffers = useStreamQueries(TokenArt.TokenOffer).contracts;
  console.log("tokenOffers", tokenOffers);
  const offerDisplay = tokenOffers.map(offer => {
    return (
      <Grid item xs={ isMobile() ? 12 : 4}>
        <OfferItem
          owner={offer.payload.owner}
        issuer={offer.payload.issuer}
          image={offer.payload.image}
          contractId={offer.contractId}
          price={offer.payload.price}
        />
      </Grid>
    );
  });
  if (!tokenOffers?.length) {
    return (
      <Card className={classes.card}>
        <Typography>No offers on market</Typography>
      </Card>
    );
  }
  return (
    <div>
      <Typography>Offers</Typography>
      <Grid container>{offerDisplay}</Grid>
    </div>
  );
};
