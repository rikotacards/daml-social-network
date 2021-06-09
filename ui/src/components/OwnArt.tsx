import React from "react";
import { TokenArt } from "@daml.js/daml-social-network";

import {
  useParty,
  useStreamQueries
} from "@daml/react";
import { ArtItem } from "./ArtItem";
import { CircularProgress, Grid, LinearProgress } from "@material-ui/core";
import { isMobile } from "../platform/platform";
import { OfferItem } from "./OfferItem";

export const OwnArt: React.FC = () => {
  const username = useParty();
  const tokenOffers = useStreamQueries(TokenArt.TokenOffer)

  // Gets all TokenArt contracts
  const myArt = useStreamQueries(TokenArt.TokenArt)

  console.log('myArt', myArt)

  const myTokenOffers = tokenOffers.contracts.filter((offer) => username === offer.payload.owner)

  const offerDisplay = myTokenOffers.map(offer => {
    return (
      <Grid item xs={isMobile() ? 12 : 4} key={offer.contractId}>
        <OfferItem
          owner={offer.payload.owner}
          issuer={offer.payload.issuer}
          image={offer.payload.image}
          contractId={offer.contractId}
          price={offer.payload.price}
        />
      </Grid>
    )

  });
  const myArtTokens = myArt.contracts.filter((x) => x.payload.owner === username)
  const artDisplay = myArtTokens.map(art => {

    return (
      <Grid item xs={isMobile() ? 12 : 4} key={art.contractId}>
        <ArtItem
          issuer={art.payload.issuer}
          owner={art.payload.owner}
          image={art.payload.image}
          issuedAt={art.payload.issuedAt}
          contractId={art.contractId}
          price={art.payload.lastPrice}
        />
      </Grid>
    )

  }


  );

  if (myArt.loading) {
    return (
      <LinearProgress variant='indeterminate' />
    )
  }
  return (
      <Grid container>
        {offerDisplay}
        {artDisplay}
      </Grid>
  );
};
