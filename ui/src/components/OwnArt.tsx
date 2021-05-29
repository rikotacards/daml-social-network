import React from "react";
import { TokenArt } from "@daml.js/daml-social-network";

import {
  useParty,
  useLedger,
  useStreamFetchByKeys,
  useStreamQueries
} from "@daml/react";
import { Typography, makeStyles } from "@material-ui/core";
import { ArtItem } from "./ArtItem";
import { Grid, Card } from "@material-ui/core";

export const OwnArt: React.FC = () => {
  const username = useParty();
  // const myArt = useStreamFetchByKeys(TokenArt.TokenOffer, () => [], [
  //     username
  //   ]);

  // Gets all TokenArt contracts
  const myArt = useStreamQueries(TokenArt.TokenArt).contracts;
  console.log(myArt);
  if (!myArt?.length) {
    return (
      <div>
        <Card>
          <Typography>
            You have no art uploaded. Click Add art to add new art.
          </Typography>
        </Card>
      </div>
    );
  }

  const artDisplay = myArt.map(art => (
    <Grid item xs={4}>
      <ArtItem
        issuer={art.payload.issuer}
        owner={art.payload.owner}
        image={art.payload.image}
        issuedAt={art.payload.issuedAt}
        contractId={art.contractId}
      />
    </Grid>
  ));
  console.log("mydArt", myArt);
  return (
    <div>
      <Typography variant='body2'>My Art</Typography>
      <Grid container>{artDisplay}</Grid>
    </div>
  );
};
