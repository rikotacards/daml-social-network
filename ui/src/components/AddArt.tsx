import React from "react";
import { Theme, makeStyles, Button, InputBase } from "@material-ui/core";
import {
  useParty,
  useLedger,
  useStreamFetchByKeys,
  useStreamQueries
} from "@daml/react";
import { User } from "@daml.js/daml-social-network";
const useStyles = makeStyles((theme: Theme) => ({
    root: {
      display: "flex",
      flexDirection: "column"
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
    uploadImageButton: {
      height: "58px",
      width: "58px",
      padding: 0,
      display: "flex",
      border: "1px solid",
      borderColor: theme.palette.divider,
      alignItems: "center",
      justifyContent: "center",
      margin: theme.spacing(0, 1),
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
    card: {
      padding: theme.spacing(1),
      marginBottom: theme.spacing(1)
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
  const classes=useStyles();
  const [text, setText] = React.useState("")
  const [isImageLoaded, setImageLoaded] = React.useState<boolean>(false);
  const [imageString, setImageString] = React.useState("")

  const onTextChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    []
  );


  const addArt = async () => {
    try {
        console.log('click', imageString)
      await ledger.exerciseByKey(User.User.MintToken, username, {
        initialPrice: "100.00",
        image: imageString,
        royaltyRate: "0.05",
      });
    } catch (e) {
      alert("error");
    }
  };

  const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    var reader = new FileReader();

    var image = document.getElementById(`${formIndex}`) as HTMLImageElement;
    if (image) {
      image.src = URL?.createObjectURL(event?.target?.files?.[0]);
      const imageFile = event?.target?.files?.[0];
      
      if (!imageFile) {
        return;
      }
      reader.readAsDataURL(imageFile);

      reader.onload = function () {
          setImageString(`${reader.result}`)
        console.log('re', reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };

     
      // uploadPostPhoto(user.uid, fileName, event?.target.files)
      setImageLoaded(!isImageLoaded);
    }
  };

  const myUserResult = useStreamFetchByKeys(User.User, () => [username], [
    username
  ]);
  const formIndex='1'
  const myUser = myUserResult.contracts[0]?.payload;
  return (
    <>
     <div className={classes.writeContainer}>
          <div className={classes.uploadImageButton}>
            <input
              className={classes.input}
              accept="image/*"
              id={`${formIndex}contained-button-file`}
              type="file"
              onChange={loadFile}
            />

            {!isImageLoaded && (
              <label
                className={classes.label}
                htmlFor={`${formIndex}contained-button-file`}
              >
                hi
              </label>
            )}
            <img
              //   alt={selectedValue || ""}
              id={`${formIndex}`}
              className={classes.image}
            />
          </div>
          <InputBase
            className={classes.textField}
            placeholder="Leave a review"
            multiline
            rows={3}
            inputProps={{ "aria-label": "naked" }}
            value={text}
            onChange={onTextChange}
            id={`${formIndex}`}
          />
        </div>
      <Button variant='contained' onClick={addArt}>add</Button>
    </>
  );
};
