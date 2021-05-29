// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from "react";
import { Party } from "@daml/types";
import { User } from "@daml.js/daml-social-network";
import {
  useParty,
  useLedger,
  useStreamFetchByKeys,
  useStreamQueries
} from "@daml/react";
import { Typography, Tabs, Tab } from "@material-ui/core";
import { AddArt } from "./AddArt";
import { OwnArt } from "./OwnArt";
import { Offers } from "./Offers";
import {makeStyles, Theme} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
}))

// USERS_BEGIN
export const HomePage: React.FC = () => {
  const username = useParty();
  const classes = useStyles()
  const [value, setValue] = React.useState(0);

  const myUserResult = useStreamFetchByKeys(User.User, () => [username], [
    username
  ]);
  const myUser = myUserResult.contracts[0]?.payload;
  const allUsers = useStreamQueries(User.User).contracts;
  console.log("myUser", myUser);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <Typography>{myUser?.username}</Typography>
      <Typography>{myUser?.influence}</Typography>
      <AddArt/>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="My Art" />
        <Tab label="Market" />
       </Tabs>
        {value === 0 && (<OwnArt/>)}
        {value === 1 &&  (<Offers/>)}

    </div>
  );
};

// // USERS_END

//   // Sorted list of users that are following the current user
//   const followers = useMemo(() =>
//     allUsers
//     .map(user => user.payload)
//     .filter(user => user.username !== username)
//     .sort((x, y) => x.username.localeCompare(y.username)),
//     [allUsers, username]);

//   // FOLLOW_BEGIN
//   const ledger = useLedger();

//   const follow = async (userToFollow: Party): Promise<boolean> => {
//     try {
//       await ledger.exerciseByKey(User.User.Follow, username, {userToFollow});
//       return true;
//     } catch (error) {
//       alert(`Unknown error:\n${error}`);
//       return false;
//     }
//   }
//   // FOLLOW_END

//   return (
//     <Container>
//       <Grid centered columns={2}>
//         <Grid.Row stretched>
//           <Grid.Column>
//             <Header as='h1' size='huge' color='blue' textAlign='center' style={{padding: '1ex 0em 0ex 0em'}}>
//                 {myUser ? `Welcome, ${myUser.username}!` : 'Loading...'}
//             </Header>

//             <Segment>
//               <Header as='h2'>
//                 <Icon name='user' />
//                 <Header.Content>
//                   {myUser?.username ?? 'Loading...'}
//                   <Header.Subheader>Users I'm following</Header.Subheader>
//                 </Header.Content>
//               </Header>
//               <Divider />
//               <PartyListEdit
//                 parties={myUser?.following ?? []}
//                 onAddParty={follow}
//               />
//             </Segment>
//             <Segment>
//               <Header as='h2'>
//                 <Icon name='globe' />
//                 <Header.Content>
//                   The Network
//                   <Header.Subheader>My followers and users they are following</Header.Subheader>
//                 </Header.Content>
//               </Header>
//               <Divider />
//               {/* USERLIST_BEGIN */}
//               <UserList
//                 users={followers}
//                 onFollow={follow}
//               />
//               {/* USERLIST_END */}
//             </Segment>
//           </Grid.Column>
//         </Grid.Row>
//       </Grid>
// </Container>

