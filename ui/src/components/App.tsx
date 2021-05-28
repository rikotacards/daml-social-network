// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import LoginScreen from "./LoginScreen";
import { MainScreen } from "./MainScreen";
import DamlLedger from "@daml/react";
import Credentials from "../Credentials";
import { httpBaseUrl } from "../config";
import { makeStyles } from "@material-ui/core";

/**
 * React component for the entry point into the application.
 */
// APP_BEGIN
const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar
}));

const App: React.FC = () => {
  const [credentials, setCredentials] = React.useState<
    Credentials | undefined
  >();
  const classes = useStyles();
  return (
    <div >
      {credentials ? (
        <DamlLedger
          token={credentials.token}
          party={credentials.party}
          httpBaseUrl={httpBaseUrl}
        >
          <MainScreen onLogout={() => setCredentials(undefined)} />
        </DamlLedger>
      ) : (
        <LoginScreen onLogin={setCredentials} />
      )}
    </div>
  );
};
// APP_END

export default App;
