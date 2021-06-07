// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import LoginScreen from "./LoginScreen";
import { MainScreen } from "./MainScreen";
import DamlLedger from "@daml/react";
import Credentials from "../Credentials";
import { deploymentMode, DeploymentMode, httpBaseUrl } from '../config';
import {  WellKnownPartiesProvider } from '@daml/hub-react'
import { PublicProvider } from "./PublicProvider";


/**
 * React component for the entry point into the application.
 */
// APP_BEGIN

const App: React.FC = () => {
  const [credentials, setCredentials] = React.useState<
    Credentials | undefined
  >();
  return (
    <div >
      {credentials ? (
        <DamlLedger
          token={credentials.token}
          party={credentials.party}
          httpBaseUrl={httpBaseUrl}
        >
          {deploymentMode === DeploymentMode.PROD_DABL ? (
          <WellKnownPartiesProvider>
            <PublicProvider>
              <MainScreen onLogout={() => setCredentials(undefined)} />
            </PublicProvider>
          </WellKnownPartiesProvider>) : <MainScreen onLogout={() => setCredentials(undefined)} />
          }
        </DamlLedger>
      ) : (
        <LoginScreen onLogin={setCredentials} />
      )}
    </div>
  );
};
// APP_END

export default App;
