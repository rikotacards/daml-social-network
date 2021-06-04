import React from 'react'
import {
    useParty,
    useLedger,
    useStreamQueries
  } from "@daml/react";

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
    const classes = useStyles()
    const ledger = useLedger();

   
    const history = iouTransferHistory.map((history) => { 
        return (
          <Card className={classes.card} key={history.contractId}>
              <div className={classes.iouText}>
            <Typography variant='caption' className={classes.text}>From</Typography>
            <Typography variant='caption'>{history.payload.from}</Typography>
            </div>
            <div className={classes.iouText}>
            <Typography variant='caption' className={classes.text}>To</Typography>
            <Typography variant='caption'>{history.payload.to}</Typography>
            </div>
            <div className={classes.iouText}>
            <Typography variant='caption' className={classes.text}>Amount</Typography>
            <Typography variant='caption'>{history.payload.amount}</Typography>
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