import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card } from "./components";
import { getMockConferencesDate } from "./api/mockConferenceApi";

export default function App() {
  const confs = React.useMemo(() => getMockConferencesDate(), []);
  const conferenceCards = React.useMemo(() => {
    if (confs) {
      return confs.map((conference) => (
        <Card
          key={conference.id}
          conference={conference.conference}
          creator={conference.creator}
        />
      ));
    }
    return [];
  }, [confs]);
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" align="center" component="h1" gutterBottom>
          Awesome Conferences
        </Typography>
      </Box>
      <Box alignContent="center">{conferenceCards}</Box>
    </Container>
  );
}
