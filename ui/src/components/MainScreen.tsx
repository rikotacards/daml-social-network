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
  offset: theme.mixins.toolbar
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
          <Button variant='contained' onClick={onLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <HomePage />

      {/* <Menu icon borderless>
        <Menu.Item>
          <Image
            as='a'
            href='https://www.daml.com/'
            target='_blank'
            src='/daml.svg'
            alt='Daml Logo'
            size='mini'
          />
        </Menu.Item>
        <Menu.Menu position='right' className='test-select-main-menu'>
          <Menu.Item position='right'>
            You are logged in as {useParty()}.
          </Menu.Item>
          <Menu.Item
            position='right'
            active={false}
            className='test-select-log-out'
            onClick={onLogout}
            icon='log out'
          />
        </Menu.Menu>
      </Menu> */}
    </div>
  );
};
