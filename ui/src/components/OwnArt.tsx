import React from "react";
import { TokenArt } from "@daml.js/daml-social-network";

import {
  useParty,
  useLedger,
  useStreamFetchByKeys,
  useStreamQueries
} from "@daml/react";
import { Typography } from "@material-ui/core";
import { ArtItem } from "./ArtItem";

export const OwnArt: React.FC = () => {
  const username = useParty();
  // const myArt = useStreamFetchByKeys(TokenArt.TokenOffer, () => [], [
  //     username
  //   ]);

  // Gets all TokenArt contracts
  const myArt = useStreamQueries(TokenArt.TokenArt).contracts;
    console.log(myArt)
  if (!myArt?.length) {
    return (
      <div>
        <Typography>
          You have no art uploaded. Click Add art to add new art.
        </Typography>
      </div>
    );
  }

  const artDisplay = myArt.map(art => (
      <ArtItem
        issuer={art.payload.issuer}
        owner={art.payload.owner}
        image={art.payload.image}
        issuedAt={art.payload.issuedAt}
        contractId={art.contractId}
      />
  ));
  console.log("mydArt", myArt);
  return (
    <div>
      <div>
        <Typography>My Art</Typography>
      </div>
      <div>{artDisplay}</div>
    </div>
  );
};
