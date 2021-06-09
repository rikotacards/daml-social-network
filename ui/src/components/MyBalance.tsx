import React from 'react'; 
import {
    useParty,
    useLedger,
    useStreamQueries
  } from "@daml/react";
  import {makeStyles, Theme, Button, Typography, Card} from '@material-ui/core';
  import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
  import { Iou } from "@daml.js/daml-social-network";
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
        margin: theme.spacing(1,1,0,1)
    },
    text: {
        marginRight: theme.spacing(1)
    },
    label: {
        marginLeft: theme.spacing(1),
        display: 'flex', 
        alignItems: 'center'
    },
    moneyIcon: {
        color: 'orange',
        marginRight: theme.spacing(1)
    },
    availableBalance: {
        fontWeight: 'bold',
        marginLeft: theme.spacing(1)
    }
  }))

export const MyBalance: React.FC = () => {
    const ledger = useLedger();
    const classes = useStyles();
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
                <MonetizationOnIcon className={classes.moneyIcon}/>
                    <Typography className={classes.availableBalance}>
                       Available balance: ${iou.payload.amount}
                    </Typography>
                </div>
            </div>
        )
    })

    return (
        <Card className={classes.card}>
        {iousDisplay.length === 0 ? <Typography variant='body2' className={classes.label}>{<MonetizationOnIcon className={classes.moneyIcon}/>} 0.00 - Upload photo to get 100 credits</Typography> : iousDisplay}

        </Card>
    )

}