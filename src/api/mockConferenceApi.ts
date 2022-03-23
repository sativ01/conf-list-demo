import { LoremIpsum } from "lorem-ipsum";
import {
  uniqueNamesGenerator,
  starWars,
  adjectives,
  countries,
  colors
} from "unique-names-generator";
import { byName } from "country-finder";
import { v4 as uuid } from "uuid";

import { ICardProps } from "../components";

const profileImagesPool = [
  "https://www.profine-group.com/cms16/files/1_1_Unternehmensprofil_Content-Picture-1.jpg?w=256",
  "https://i.pinimg.com/170x/7b/2b/dd/7b2bddbb3dbd417fbedc59383421a066.jpg",
  "https://www.bighospitality.co.uk/var/wrbm_gb_hospitality/storage/images/3/3/5/2/2533-4-eng-GB/Business-Profile.jpg",
  "https://shotkit.com/wp-content/uploads/2021/06/Cool-profile-picture-LinkedIn.jpg",
  "https://www.colesclassroom.com/wp-content/uploads/2017/11/Profile-1-1-of-1-800x533.jpg",
  "https://img.freepik.com/free-photo/portrait-attractive-young-businessman-suit-standing-with-arms-crossed-light-grey-background_264277-1222.jpg?size=626&ext=jpg"
];

const conferenceImagesPool = [
  "https://colorlib.com/wp/wp-content/uploads/sites/2/11_conference-website-design-1024x507.jpg",
  "https://wdo.org/wp-content/uploads/2019/05/IDC-1.jpg",
  "https://www.neonmoire.com/assets/uploads/16ca9574496",
  "https://as2.ftcdn.net/jpg/02/59/70/31/1000_F_259703149_w75Iy7W2hWj86IZ6TRNRUlJFd7fpMWN8.jpg",
  "https://i.pinimg.com/736x/54/11/aa/5411aa7a3c0f55c65cbb167c932190c1.jpg",
  "https://thumbs.dreamstime.com/z/business-conference-simple-template-invitation-geometric-magazine-conference-poster-business-meeting-design-banner-business-167522542.jpg"
];

const getName = () => uniqueNamesGenerator({ dictionaries: [starWars] });

const getConferenceTitle = (country: string) => {
  const adj = uniqueNamesGenerator({
    dictionaries: [adjectives, colors],
    separator: " "
  });

  return `${adj} ${country} conference`;
};

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

const getRandomPastDate = (start: Date, end = new Date()) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
const getRandomFutureDate = (end: Date, start = new Date()) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const getPastConfDates = (): { start: Date; end: Date } => {
  const start = getRandomPastDate(new Date("2021-01-01"));
  const end = new Date(start);
  end.setDate(start.getDate() + (Math.floor(Math.random() * 10) + 1));

  return { start, end };
};

const getFutureConfDates = (): { start: Date; end: Date } => {
  const start = getRandomFutureDate(new Date("2023-01-01"));
  const end = new Date(start);
  end.setDate(start.getDate() + (Math.floor(Math.random() * 10) + 1));

  return { start, end };
};

const getProfilePic = () =>
  profileImagesPool[Math.floor(Math.random() * profileImagesPool.length)];

const getConferencePoster = () =>
  conferenceImagesPool[Math.floor(Math.random() * conferenceImagesPool.length)];

export const getMockConference = (past = false): ICardProps => {
  const { start, end } = past ? getPastConfDates() : getFutureConfDates();
  const speakersCount = 1 + Math.floor(Math.random() * 10);
  const speakers = new Array(speakersCount).fill(1).map((_) => ({
    fullName: getName(),
    profileImage: getProfilePic(),
    id: uuid()
  }));

  const countryName = uniqueNamesGenerator({ dictionaries: [countries] });
  const countryData = byName(countryName);

  return {
    conference: {
      id: uuid(),
      title: getConferenceTitle(countryName),
      startDate: start,
      endDate: end,
      image: getConferencePoster(),
      description: {
        short: lorem.generateSentences(2),
        long: lorem.generateParagraphs(2).split("\n")
      },
      speakers,
      location: {
        countryName,
        lat: countryData?.lat ?? null,
        lon: countryData?.long ?? null
      }
    },
    creator: {
      id: uuid(),
      fullName: getName(),
      profileImage: getProfilePic()
    }
  };
};

export const getMockConferencesDate = (
  pastConfsCount = 5,
  futureConfsCount = 5
) => {
  const pastConfs = new Array(pastConfsCount)
    .fill(1)
    .map((_) => getMockConference(true))
    .sort(
      (a, b) =>
        a.conference.startDate.getTime() - b.conference.startDate.getTime()
    );
  const futureConfs = new Array(futureConfsCount)
    .fill(1)
    .map((_) => getMockConference())
    .sort(
      (a, b) =>
        a.conference.startDate.getTime() - b.conference.startDate.getTime()
    );

  return [pastConfs, futureConfs];
};
