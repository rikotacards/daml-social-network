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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(1)
  }
}));

export const Offers: React.FC = () => {
  const tokenOffers = useStreamQueries(TokenArt.TokenOffer).contracts;
  console.log("tokenOffers", tokenOffers);
  const offerDisplay = tokenOffers.map(offer => {
    return (
      <Grid item xs={4}>
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
      <div>
        <Typography>No offers on market</Typography>
      </div>
    );
  }
  return (
    <div>
      <Typography>Offers</Typography>
      <Grid container>{offerDisplay}</Grid>
    </div>
  );
};
