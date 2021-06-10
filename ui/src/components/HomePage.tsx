// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from "react";

import { Tabs, Tab } from "@material-ui/core";
import { AddArt } from "./AddArt";
import { OwnArt } from "./OwnArt";
import { Offers } from "./Offers";
import {makeStyles, Theme, } from '@material-ui/core';
import { Transactions } from "./Transactions";
import { DeploymentMode, deploymentMode} from '../config';
import { PublicOffers } from "./PublicOffers";
import { MyBalance } from "./MyBalance";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  tabs: {
    display: 'flex', 
    width: '33%'
    
  }
}))

// USERS_BEGIN
export const HomePage: React.FC = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0);


  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <MyBalance/>
      <AddArt/>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab className={classes.tabs} label="My Art" />
        <Tab className={classes.tabs} label="Market" />
        <Tab className={classes.tabs}label="Transactions" />


       </Tabs>
        {value === 0 && (<OwnArt/>)}
        {value === 1 &&   (deploymentMode === DeploymentMode.PROD_DABL ? <PublicOffers/> :<Offers/>)}
        {value === 2 &&  (<Transactions/>)}

    </div>
  );
};


