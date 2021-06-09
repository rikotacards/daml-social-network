import React from 'react'; 
import { ContractId } from "@daml/types";
import {makeStyles, Theme, Button, Typography, Card} from '@material-ui/core';

import { Iou } from "@daml.js/daml-social-network";
import {
  useParty,
  useLedger,
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
    },
    label: {
        marginLeft: theme.spacing(1)
    }
  }))

export const MyPendingIous: React.FC = () => {
    const username = useParty();
    const classes = useStyles()
    const ledger = useLedger();
    const pendingIousTransfers = useStreamQueries(Iou.IouTransfer).contracts;
    const ious = useStreamQueries(Iou.Iou).contracts

    if(ious.length > 1){
        ledger.exercise(Iou.Iou.Iou_Merge, ious[0].contractId, {
            otherCid: ious[1].contractId
        })
    }

    const iousDisplay = ious.map((iou) => {
        return (
            <div key={iou.contractId}>
                <div className={classes.iouText}>
                   
                    <Typography className={classes.text}>
                        $ {iou.payload.amount}
                    </Typography>
                </div>
            </div>
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
            console.log(e)
        }
    }

    const pendingIssueRequests = useStreamQueries(Iou.IouIssueRequest).contracts;
    console.log('pdngin', pendingIssueRequests)
    const pendingIssueDisplay = pendingIssueRequests.map((issue) => {
        return (
            <div key={issue.contractId}>
                <div className={classes.iouText}>
                <Typography className={classes.text}>{'issuer'}</Typography>
                <Typography>{issue.payload.issuer}</Typography>
                {username === 'ledger-party-a20ec465-1e93-4660-a413-29b9d305cb7e' && <div>{issue.payload.requester}</div>}
                {username === 'ledger-party-a20ec465-1e93-4660-a413-29b9d305cb7e' && <Button variant='contained' onClick={() => onGrantIssue(issue.contractId)}>
                    grant
                </Button>}
                </div>
            </div>
        )
    })

  
    const pendingTransfersDisplay = pendingIousTransfers.map((transfers) => { 
        if(transfers.payload.iou.owner === username){
            return;
        }
      return (
        <div>
          {transfers.key}
          from
          {transfers.payload.iou.owner}
          <div>
            <Button variant ='contained' onClick={() => onAcceptPaymentClick(transfers.contractId)}>Accept payment</Button>
          </div>
        </div>
      )
    })

  
    return (
        <Card className={classes.card}>
            <Typography className={classes.label} >My Balance</Typography>
            
           
            {iousDisplay.length === 0 ? <Typography className={classes.label}>Currently 0, Upload photo to get 100 credits</Typography> : iousDisplay}
            {pendingTransfersDisplay}
           {pendingIssueDisplay.length > 0 &&  <Typography className={classes.label} >Pending payments</Typography>}
            {pendingIssueDisplay}
        </Card>
    )
}