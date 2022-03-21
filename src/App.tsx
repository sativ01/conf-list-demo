import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card, AddConference } from "./components";
import { RootState } from "./redux-store";
import { useSelector } from "react-redux";

export default function App() {
  const { pastConfs, futureConfs } = useSelector(
    (state: RootState) => state.conference
  );

  const pastConferenceCards = React.useMemo(
    () =>
      pastConfs.map((conference) => (
        <Card conference={conference.conference} creator={conference.creator} />
      )),
    [pastConfs]
  );
  const futureConferenceCards = React.useMemo(
    () =>
      futureConfs.map((conference) => (
        <Card conference={conference.conference} creator={conference.creator} />
      )),
    [futureConfs]
  );

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" align="center" component="h1" gutterBottom>
          Awesome Conferences
        </Typography>
      </Box>
      <Box alignContent="center">
        <Typography variant="h6" align="center" component="h1" gutterBottom>
          Upcomming Conferences
        </Typography>
        {futureConferenceCards}
      </Box>
      <Box alignContent="center">
        <Typography variant="h5" align="center" component="h1" gutterBottom>
          Past Conferences
        </Typography>
        {pastConferenceCards}
      </Box>

      <AddConference />
    </Container>
  );
}
