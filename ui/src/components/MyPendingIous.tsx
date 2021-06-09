import React from 'react';
import { ContractId } from "@daml/types";
import { makeStyles, Theme, Button, Typography, Card } from '@material-ui/core';

import { Iou } from "@daml.js/daml-social-network";
import {
    useParty,
    useLedger,
    useStreamQueries
} from "@daml/react";
import { adminParty } from './AddArt';

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
        marginLeft: theme.spacing(1),
        fontWeight: 'bold'
    }
}))

export const MyPendingIous: React.FC = () => {
    const username = useParty();
    const classes = useStyles()
    const ledger = useLedger();
    const pendingIousTransfers = useStreamQueries(Iou.IouTransfer).contracts;

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
    const pendingIssueDisplay = pendingIssueRequests.map((issue) => {
        return (
            <Card className={classes.card} key={issue.contractId}>
                <div className={classes.iouText}>
                    <Typography className={classes.text}>{'From:'}</Typography>
                    <Typography>{issue.payload.issuer}</Typography>

                    {(username === adminParty || username === 'digitalAsset') && <div>{issue.payload.requester}</div>}
                    {(username === adminParty || username === 'digitalAsset') && <Button variant='contained' onClick={() => onGrantIssue(issue.contractId)}>
                        grant
                </Button>}
                </div>
            </Card>
        )
    })


    const pendingTransfersDisplay = pendingIousTransfers.map((transfers) => {
        if (transfers.payload.iou.owner === username) {
            return;
        }
        return (
            <Card className={classes.card}>
                {transfers.key}
          from
                {transfers.payload.iou.owner}
                <div>
                    <Button variant='contained' onClick={() => onAcceptPaymentClick(transfers.contractId)}>Accept payment</Button>
                </div>
            </Card>
        )
    })


    return (
        <div>


            {pendingTransfersDisplay}
            {pendingIssueDisplay.length > 0 && <Typography variant='body1' className={classes.label} >Pending payments</Typography>}
            {pendingIssueDisplay}
        </div>
    )
}