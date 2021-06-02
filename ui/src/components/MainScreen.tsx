// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { HomePage } from "./HomePage";
import { useParty } from "@daml/react";
import {
  Theme,
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  Button
} from "@material-ui/core";

type Props = {
  onLogout: () => void;
};

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
  button: {
    marginLeft: "auto",
    marginRight: theme.spacing(1)
  },
  text: {
    fontWeight: 'bold'
  }
}));

/**
 * React component for the main screen of the `App`.
 */
export const MainScreen: React.FC<Props> = ({ onLogout }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.offset} />
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.text}>Daml Doodle</Typography>
          <Button
            className={classes.button}
            size="small"
            variant="contained"
            onClick={onLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <HomePage />
    </div>
  );
};
