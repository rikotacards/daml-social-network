import React from 'react'
import {
  useStreamQueries
} from "@daml/react";

import { Iou } from "@daml.js/daml-social-network";
import { makeStyles, Theme, Typography, Card } from '@material-ui/core';
import { MyPendingIous } from './MyPendingIous';
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
    // marginRight: theme.spacing(1),
    width: '80px'
  },
  label: {
    marginLeft: theme.spacing(1),
    fontWeight: 'bold'
  },
  marginLeft: {
    marginLeft: theme.spacing(1)
  },
  amount: {
    color: 'green'
  }
}))

export const Transactions: React.FC = () => {
  const iouTransferHistory = useStreamQueries(Iou.IouTransferHistory).contracts
  const classes = useStyles()


  const history = iouTransferHistory.map((history) => {
    return (
      <Card className={classes.card} key={history.contractId}>
        <div className={classes.iouText}>
          <Typography variant='body1' className={classes.text}>From:</Typography>
          <Typography variant='body1'>{history.payload.from}</Typography>
        </div>
        {/* <div className={classes.iouText}>
          <Typography variant='body1' className={classes.text}>To:</Typography>
          <Typography variant='body1'>{history.payload.to}</Typography>
        </div> */}
        <div className={classes.iouText}>
          <Typography variant='body1' className={classes.text}>Amount:</Typography>
          <Typography variant='body1' className={classes.amount}>${history.payload.amount}</Typography>
        </div>

      </Card>
    )
  })
  return (
    <div>
      <MyPendingIous />
    <Typography className={classes.label}>History</Typography>
      {history.length === 0 ? <Typography className={classes.marginLeft}>No transaction history</Typography> : history}
    </div>
  )
}