import React from 'react'; 
import {makeStyles,Typography, Theme, Card, Button} from '@material-ui/core';

import {
    useParty,
    useLedger,
    useStreamFetchByKeys,
    useStreamQueries
  } from "@daml/react";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    card: {
        padding: theme.spacing(1), 
        margin: theme.spacing(1),
    }
  }))
export const AboutMe: React.FC = () => {
    const classes = useStyles();
    const username = useParty();

    return (
        <Card className={classes.card}>
            <Typography>
                {username}
            </Typography>
        </Card>
    )
}