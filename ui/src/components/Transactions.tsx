import React from 'react'
import {
    useParty,
    useLedger,
    useStreamFetchByKeys,
    useStreamQueries
  } from "@daml/react";
  import { ContractId, Party } from "@daml/types";

  import { Iou, User } from "@daml.js/daml-social-network";
  import {makeStyles, Theme, Button, Typography, Card} from '@material-ui/core';
  const useStyles = makeStyles((theme: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    iouText: {
        display: 'flex', 
        flexDirection: 'row',
        marginLeft: theme.spacing(1)
    },
    card: {
        padding: theme.spacing(1), 
        margin: theme.spacing(1)
    },
    text: {
        marginRight: theme.spacing(1)
    },
    label: {
        marginLeft: theme.spacing(1)
    }
  }))

export const Transactions: React.FC = () => {
    const iouTransferHistory = useStreamQueries(Iou.IouTransferHistory).contracts
    const username = useParty();
    const classes = useStyles()
    const ledger = useLedger();

   
    const history = iouTransferHistory.map((history) => { 
        return (
          <Card className={classes.card}>
              <div className={classes.iouText}>
            <Typography className={classes.text}>From</Typography>
            <Typography>{history.payload.from}</Typography>
            </div>
            <div className={classes.iouText}>
            <Typography className={classes.text}>To</Typography>
            <Typography>{history.payload.to}</Typography>
            </div>
            <div className={classes.iouText}>
            <Typography className={classes.text}>Amount</Typography>
            <Typography>{history.payload.amount}</Typography>
            </div>
       
          </Card>
        )
      })
    return (
        <div>
            {history.length === 0 ? 'None' : history}
        </div>
    )
}