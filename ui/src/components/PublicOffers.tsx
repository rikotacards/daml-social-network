import React from "react";
import { TokenArt } from "@daml.js/daml-social-network";
import { Card, Theme, makeStyles, Typography, Grid, LinearProgress } from "@material-ui/core";
import { OfferItem } from "./OfferItem";
import { isMobile } from "../platform/platform";

import { useStreamQueriesAsPublic } from '@daml/hub-react'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(1)
  },
  card: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  }
}));

export const PublicOffers: React.FC = () => {
  const classes = useStyles();
  const allPublicContracts = useStreamQueriesAsPublic(TokenArt.TokenOffer);
  console.log('all', allPublicContracts)


  const offerDisplay = allPublicContracts.contracts.map(offer => {
    return (
      <Grid item xs={isMobile() ? 12 : 4}>
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
  if (allPublicContracts.loading) {
    return (
      <LinearProgress variant='indeterminate' />
    )
  }
  if (!allPublicContracts.contracts?.length) {
    return (
      <Card className={classes.card}>
        <Typography>No offers on market</Typography>
      </Card>
    );
  }
  return (
    <div>
      <Grid container>{offerDisplay}</Grid>
    </div>
  );
};
