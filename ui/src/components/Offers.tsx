import React from "react";
import {
  useStreamQueries
} from "@daml/react";
import { TokenArt } from "@daml.js/daml-social-network";
import { Card, Theme, makeStyles, Typography, Grid, CircularProgress, Button } from "@material-ui/core";
import { OfferItem } from "./OfferItem";
import { isMobile } from "../platform/platform";
import { MyOffers } from "./MyOffers";
import { queryAsPublic } from "../damlHubApi/queryAsPublicParty";




const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(1)
  },
  card: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  buttonContainer: {
    padding: theme.spacing(1),
    display: 'flex'
  },

}));

export const Offers: React.FC = () => {
  const classes = useStyles();
  const [pageName, setPage] = React.useState("other")
  const onPageClick = (name: string) => {
    setPage(name)
  }

  const tokenOffers = useStreamQueries(TokenArt.TokenOffer)
  console.log("tokenOffers", tokenOffers);
  

  const offerDisplay = tokenOffers.contracts.map(offer => {
    return (
      <Grid key={offer.contractId} item xs={isMobile() ? 12 : 4}>
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
  if (tokenOffers.loading) {
    return (
      <CircularProgress />
    )
  }
  if (!tokenOffers.contracts?.length) {
    return (
      <Card className={classes.card}>
        <Typography>No offers on market</Typography>
      </Card>
    );
  }
  return (
    <div>
      <div className={classes.buttonContainer}>
        <Button onClick={() => onPageClick('my')}>My Offers</Button>
        <Button onClick={() => onPageClick('other')}>Market Offers</Button>

      </div>
      {pageName === 'my' && <MyOffers />}
      {pageName === 'other' && <Grid container>{offerDisplay}</Grid>}
    </div>
  );
};
