import * as React from "react";

import { useDispatch } from "react-redux";
import { addConf, addRandomConf } from "../api/conference.slice";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import FormControl from "@mui/material/FormControl";

import { ICardProps } from "./Card";
import { getMockConference } from "../api/mockConferenceApi";

export const useAddNewConference = () => {
  const dispatch = useDispatch();
  const addNewConference = (conference: ICardProps) =>
    dispatch(addConf(conference));
  return addNewConference;
};

export const useAddRandomConference = () => {
  const dispatch = useDispatch();
  const addConference = () => dispatch(addRandomConf());
  return addConference;
};

export function NewConferenceForm({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const randomValues = React.useMemo(() => getMockConference(), []);

  const [values, setValues] = React.useState<ICardProps>(randomValues);

  const handleChange = (prop: keyof ICardProps) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // setValues({ ...values, [prop]: event.target.value });
  };

  // const addRandomConf = useAddRandomConference();
  const addNewConf = useAddNewConference();

  const handleSubmit = () => {
    onClose();
    // addRandomConf();
    addNewConf(values);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Conference</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill up the form with the Conference details.
        </DialogContentText>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <FormControl
            variant="standard"
            sx={{ m: 2, mt: 4, minWidth: "60ch" }}
          >
            <TextField
              label="Conference Title"
              id="standard-start-adornment"
              sx={{ m: 1, width: "90%" }}
              variant="standard"
              value={values.conference.title}
              onChange={handleChange("conference")}
            />
            <TextField
              label="Organizer Name"
              id="standard-start-adornment"
              sx={{ m: 1, width: "90%" }}
              variant="standard"
              value={values.creator.fullName}
              onChange={handleChange("creator")}
            />
            <TextField
              label="Organizer Profile Image URL"
              id="standard-start-adornment"
              sx={{ m: 1, width: "90%" }}
              variant="standard"
              value={values.creator.profileImage}
              onChange={handleChange("creator")}
            />
            <TextField
              label="Conference Short description"
              id="standard-start-adornment"
              multiline
              minRows={2}
              sx={{ m: 1, width: "90%" }}
              variant="standard"
              value={values.conference.description.short}
              onChange={handleChange("conference")}
            />
            <TextField
              label="Conference Agenda"
              id="standard-start-adornment"
              multiline
              minRows={3}
              maxRows={10}
              sx={{ m: 1, width: "90%" }}
              variant="standard"
              value={values.conference.description.long}
              onChange={handleChange("conference")}
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function AddConferenceDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box
        sx={{
          "& > :not(style)": {
            m: 3,
            position: "fixed",
            bottom: "3rem",
            right: "3rem"
          }
        }}
      >
        <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </Box>

      <NewConferenceForm open={open} onClose={handleClose} />
    </div>
  );
}
