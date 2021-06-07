import React from'react'; 
import { PublicLedger, useWellKnownParties } from '@daml/hub-react'
import { ledgerId } from '../config'


export const PublicProvider: React.FC = ({ children }) => {
    // This component fetches the public party ID and uses it to instantiate a PublicLedger context
    const { parties, loading } = useWellKnownParties();
  
    if (loading || !parties) {
      return <div>Loading...</div>
    }
  
    return (
      <PublicLedger
        ledgerId={ledgerId}
        publicParty={parties?.publicParty || ""}
      >
        { children }
      </PublicLedger>
    )
  }