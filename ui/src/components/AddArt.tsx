import React from "react";
import { Theme, makeStyles, Button, InputBase, Card, LinearProgress } from "@material-ui/core";
import {
  useParty,
  useLedger,
} from "@daml/react";
import { User, Iou } from "@daml.js/daml-social-network";
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('fa9904749cba5c53bb0f', 'fbea9988c9579fb242a4bf95fefb4417e06ef740d1f5f3ae1149105f46c60d2a');

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column"
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
  label: {
    position: "absolute"
  }
}));



export const AddArt: React.FC = () => {
  const ledger = useLedger();
  const username = useParty();
  const classes = useStyles();

  const [text, setText] = React.useState("");
  const [isImageLoaded, setImageLoaded] = React.useState<boolean>(false);
  const [imageString, setImageString] = React.useState("");
  const [file, setFile] = React.useState<File | undefined>(undefined);
  const [isPosting, setIsPosting ] = React.useState<boolean>(false);
  
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
      await ledger.create(Iou.IouIssueRequest, {
        issuer: 'ledger-party-a20ec465-1e93-4660-a413-29b9d305cb7e',
        requester: username,
        observers: [username]
      })
      setImageString("")
      setText("")
      var image = document.getElementById(`${formIndex}`) as HTMLImageElement;
      image.src = "data:,"
      setIsPosting(false);
    } catch (e) {
      console.log('pinFileToIPFS error', e)
      alert("error");
    }


  };

  const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    const image = document.getElementById(`${formIndex}`) as HTMLImageElement;
    if (image && URL) {
      image.src = URL?.createObjectURL(event?.target?.files?.[0]);

      const imageFile = event?.target?.files?.[0]
      setFile(imageFile)
      if (!imageFile) { return; }
      reader.readAsDataURL(imageFile);

      reader.onload = function () {
        if (file) {
          reader.readAsDataURL(file);

        }
        setImageString(`${reader.result}`);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };

      // uploadPostPhoto(user.uid, fileName, event?.target.files)
      setImageLoaded(!isImageLoaded);
    }
  };


  const formIndex = "1";
  return (
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

          {
            <label
              className={classes.label}
              htmlFor={`${formIndex}contained-button-file`}
            >
              {'upload'}
            </label>
          }
          <img
            alt=''
            id={`${formIndex}`}
            className={classes.image}
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
      <Button disabled={isPosting} className={classes.button} size='small' variant="contained" onClick={addArt}>
        {isPosting ? "Posting" : "add"}
      </Button>
      {isPosting &&  <LinearProgress variant='indeterminate'/>}

    </Card>
  );
};
