import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card, { ICardProps } from "./components";
import { LoremIpsum } from "lorem-ipsum";

import profile1 from "./images/speaker/profile01.jpeg";
import profile2 from "./images/speaker/profile02.jpeg";
import profile3 from "./images/speaker/profile03.jpeg";
import conference01 from "./images/conference/conference-img01.jpeg";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

const getMockConferences = (): ICardProps[] => {
  return [
    {
      conference: {
        title: "Creative Tech Week",
        startDate: new Date("2022-10-22"),
        endDate: new Date("2022-10-25"),
        image: conference01,
        description: {
          short: lorem.generateSentences(2),
          long: lorem.generateParagraphs(2).split("\n")
        },
        speakers: [
          { fullName: "Abraham Davis", profileImage: profile2 },
          { fullName: "James Right", profileImage: profile3 },
          { fullName: "James Right", profileImage: profile3 },
          { fullName: "James Right", profileImage: profile3 }
        ]
      },
      creator: {
        fullName: "James Bond",
        profileImage: profile1
      }
    }
  ];
};

export default function App() {
  const [conf] = React.useMemo(() => getMockConferences(), []);
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" align="center" component="h1" gutterBottom>
          Awesome Conferences
        </Typography>
      </Box>
      <Box alignContent="center">
        <Card conference={conf.conference} creator={conf.creator} />
      </Box>
    </Container>
  );
}
