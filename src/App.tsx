import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card, AddConference } from "./components";
import { getMockConferencesDate } from "./api/mockConferenceApi";

export default function App() {
  const confs = React.useMemo(() => getMockConferencesDate(), []);
  const conferenceCards = React.useMemo(
    () =>
      confs.map((conference) => (
        <Card conference={conference.conference} creator={conference.creator} />
      )),
    [confs]
  );
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" align="center" component="h1" gutterBottom>
          Awesome Conferences
        </Typography>
      </Box>
      <Box alignContent="center">{conferenceCards}</Box>
      <AddConference />
    </Container>
  );
}
