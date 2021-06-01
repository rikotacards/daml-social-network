import React from 'react'; 
import { ContractId, Party } from "@daml/types";
import {makeStyles, Theme, Button, Typography, Card} from '@material-ui/core';

import { Iou, User } from "@daml.js/daml-social-network";
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
    }
  }))

export const MyPendingIous: React.FC = () => {
    const username = useParty();
    const classes = useStyles()
    const ledger = useLedger();
    const allUsers = useStreamQueries(User.User).contracts;
    const pendingIousTransfers = useStreamQueries(Iou.IouTransfer).contracts;
    const ious = useStreamQueries(Iou.Iou).contracts

    if(ious.length > 1){
        ledger.exercise(Iou.Iou.Iou_Merge, ious[0].contractId, {
            otherCid: ious[1].contractId
        })
    }

    const iousDisplay = ious.map((iou) => {
        return (
            <Card className={classes.card}>
                <div className={classes.iouText}>
                <Typography className={classes.text}>
                        issuer
                    </Typography>
                    <Typography className={classes.text}>
                        {iou.payload.issuer}
                    </Typography>
                    <Typography className={classes.text}>
                        amount
                    </Typography>
                    <Typography className={classes.text}>
                        {iou.payload.amount}
                    </Typography>
                </div>
            </Card>
        )
    })
    const onAcceptPaymentClick = async (iouTransferCid: ContractId<Iou.IouTransfer>) => {
      try {
        await ledger.exercise(Iou.IouTransfer.IouTransfer_Accept, iouTransferCid, {
          newOwner: username
        })
      } catch (e) {
        console.log(e)
      }
    }

    const onGrantIssue = async (contractId: ContractId<Iou.IouIssueRequest>) => {
        try {
            await ledger.exercise(Iou.IouIssueRequest.Issue, contractId, {})
        } catch (e) {
            console.log('hi', e)
        }
    }

    const pendingIssueRequests = useStreamQueries(Iou.IouIssueRequest).contracts;
    console.log('pdngin', pendingIssueRequests)
    const pendingIssueDisplay = pendingIssueRequests.map((issue) => {
        return (
            <div>
                {issue.contractId}
                <Button onClick={() => onGrantIssue(issue.contractId)}>
                    grant
                </Button>
            </div>
        )
    })

  
    const pendingTransfersDisplay = pendingIousTransfers.map((transfers) => { 
      return (
        <div>
          {transfers.key}
          <div>
            <Button onClick={() => onAcceptPaymentClick(transfers.contractId)}>Accept payment</Button>
          </div>
        </div>
      )
    })

  
    return (
        <div>
            {iousDisplay}
            {pendingTransfersDisplay}
            {username === 'digitalAsset' && pendingIssueDisplay}
        </div>
    )
}