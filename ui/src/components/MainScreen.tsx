// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { HomePage } from "./HomePage";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  Button,
  IconButton
} from "@material-ui/core";

type Props = {
  onLogout: () => void;
};

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
  button: {
    marginLeft: "auto",
    marginRight: theme.spacing(1),
    color: 'white'
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
          <Typography className={classes.text}>Daml NFT Market</Typography>
          <IconButton
            className={classes.button}
            size="small"
            onClick={onLogout}
          >
            <ExitToAppIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <HomePage />
    </div>
  );
};
