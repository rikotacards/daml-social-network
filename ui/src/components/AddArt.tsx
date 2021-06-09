import React from "react";
import { Theme, makeStyles, Button, InputBase, Card, LinearProgress, Typography } from "@material-ui/core";
import {
  useParty,
  useLedger,
} from "@daml/react";
import Snackbar from '@material-ui/core/Snackbar';
import clsx from 'clsx';
import { User, Iou } from "@daml.js/daml-social-network";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { deploymentMode, DeploymentMode } from '../config';

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('fa9904749cba5c53bb0f', 'fbea9988c9579fb242a4bf95fefb4417e06ef740d1f5f3ae1149105f46c60d2a');
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  cameraIcon: {
    opacity: '0.5'
  },
  nonOpac: {
    opacity: '1'
  },
  card: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  writeContainer: {
    display: "flex"
  },
  dishContainer: {
    display: "flex",
    flexDirection: "column",
    margingRight: theme.spacing(1)
  },
  textField: {
    overflowY: "auto",
    padding: 0,
    width: "auto"
  },
  button: {
    width: '100%'
  },
  uploadImageButton: {
    height: "58px",
    width: "58px",
    padding: 0,
    display: "flex",
    border: "1px solid",
    borderColor: theme.palette.divider,
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(1, 1, 1, 0),
    borderRadius: theme.shape.borderRadius,
    position: "relative"
  },
  tagDishButton: {
    display: "flex",
    margin: theme.spacing(0, 1),
    textTransform: "capitalize"
  },
  divider: {
    margin: theme.spacing(1, 0)
  },
  rateContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  rating: {
    marginRight: theme.spacing(1)
  },
  rateText: {
    margin: theme.spacing(0, 1)
  },
  addRow: {
    margin: theme.spacing(1)
  },

  input: {
    display: "none",
    position: "absolute"
  },
  downButton: {
    marginLeft: "auto"
  },
  dishName: {
    marginLeft: "auto"
  },
  image: {
    height: "58px",
    width: "58px"
  },
  hidden: {
    visibility: 'hidden',
  },
  label: {
    position: "absolute"
  },
  snackbar: {
    width: '100%',
    backgroundColor: theme.palette.success.main,
    padding: theme.spacing(1),
    height: '40px',
    borderRadius: theme.shape.borderRadius,
    display: 'flex', 
    alignItems: 'center'
  },
  displaynone: {
    display: 'none'
  },
  disclosure: {
    // padding: theme.spacing(1),
    margin: theme.spacing(1)
  },
  disclosureText: {
    fontStyle: 'italic'
  }
}));



export const AddArt: React.FC = () => {
  const ledger = useLedger();
  const username = useParty();
  const classes = useStyles();
  const formIndex = "1";

  const [text, setText] = React.useState("");
  const [isImageLoaded, setImageLoaded] = React.useState<boolean>(false);
  const [imageString, setImageString] = React.useState("");
  const [file, setFile] = React.useState<File | undefined>(undefined);
  const [isPosting, setIsPosting] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState(false);

  //@ts-ignore
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);
  };

  const onTextChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    []
  );



  const addArt = async () => {
    setIsPosting(true);
    try {
      const result = await pinata.pinJSONToIPFS({ message: imageString })
      await ledger.exerciseByKey(User.User.MintToken, username, {
        initialPrice: text,
        image: result.IpfsHash,
        // TODO: remove hardcode royalty
        royaltyRate: "0.05"
      });
      // create IOU on creation of artwork
      // TODO remove 
      await ledger.create(Iou.IouIssueRequest, {
        issuer: deploymentMode === DeploymentMode.PROD_DABL ? 'ledger-party-a20ec465-1e93-4660-a413-29b9d305cb7e' : 'digitalAsset',
        requester: username,
        observers: [username]
      })
      setImageString("")
      setText("")
      var image = document.getElementById(`${formIndex}`) as HTMLImageElement;
      image.src = "data:,"
      setIsPosting(false);
      setIsOpen(true)

    } catch (e) {
      console.log('pinFileToIPFS error', e)
      setIsOpen(false);
      setIsPosting(false);
      alert("error");
    }


  };

  const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const image = document.getElementById(`${formIndex}`) as HTMLImageElement;

    if (image && URL) {
      image.src = URL?.createObjectURL(event?.target?.files?.[0]) || "";

      const imageFile = event?.target?.files?.[0]
      setFile(imageFile)

      if (!imageFile) { return; }
      reader.readAsDataURL(imageFile);

      reader.onload = function () {
        if (file) {
          reader.readAsDataURL(file);

        }
        console.log('image', image)
        setImageString(`${reader.result}`);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };

      setImageLoaded(!isImageLoaded);
    }
  };


  return (
    <>
      <Card className={classes.card}>
        <div className={classes.writeContainer}>
          <div className={classes.uploadImageButton}>
           
           <input
              className={classes.input}
              accept="image/*"
              id={`${formIndex}contained-button-file`}
              type="file"
              onChange={loadFile}
            />


            <label
              className={classes.label}
              htmlFor={`${formIndex}contained-button-file`}
            >
              <CameraAltIcon className={imageString.length > 0 ? classes.cameraIcon : classes.nonOpac}/>
            </label>

            <img
              alt=''
              id={`${formIndex}`}
              className={clsx(classes.image, !imageString.length && classes.hidden)}
              
            />
          </div>
          <InputBase
            className={classes.textField}
            placeholder={`Set price, eg "100.0"`}
            multiline
            rows={3}
            inputProps={{ "aria-label": "naked" }}
            value={text}
            onChange={onTextChange}
            id={`${formIndex}`}
            disabled={isPosting}
          />
        </div>
        <Button disabled={isPosting || (!text.length || !imageString.length)} className={classes.button} size='small' variant="contained" onClick={addArt}>
          {isPosting ? "Posting" : "add"}
        </Button>
        {isPosting && <LinearProgress variant='indeterminate' />}
        <div className={classes.disclosure}>
          <Typography className={classes.disclosureText}variant='caption' >Disclosure: Images are uploaded to IPFS and will be permanently on the network.</Typography>
        </div>

      </Card>
      <Snackbar  message='Success!' open={isOpen} autoHideDuration={3000} onClose={handleClose} >
        <div className={classes.snackbar}>
          <Typography>Success!</Typography>
        </div>
        </Snackbar>
    </>
  );
};
