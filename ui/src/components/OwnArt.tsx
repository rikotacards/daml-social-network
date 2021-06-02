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
import { isMobile } from "../platform/platform";

export const OwnArt: React.FC = () => {
  const username = useParty();

 
  // Gets all TokenArt contracts
  const myArt = useStreamQueries(TokenArt.TokenArt).contracts;
  console.log(myArt);
  if (!myArt?.length) {
    return (
        <Card style={{padding: '8px', margin: '8px'}}>
          <Typography>
            You have no art uploaded. Click Add art to add new art.
          </Typography>
        </Card>
    );
  }

  const artDisplay = myArt.map(art => {
    if(art.payload.owner === username){
      return (
        <Grid item xs={isMobile() ? 12 :4}>
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
  }
    
  );
  return (
    <div>
      <Grid container>
      {artDisplay}
      </Grid>
    </div>
  );
};
