import { LoremIpsum } from "lorem-ipsum";
import { uniqueNamesGenerator, starWars } from "unique-names-generator";
import { v4 as uuid } from "uuid";

import { ICardProps } from "../components";

const profileImagesPool = [
  "https://www.profine-group.com/cms16/files/1_1_Unternehmensprofil_Content-Picture-1.jpg?w=256",
  "https://i.pinimg.com/170x/7b/2b/dd/7b2bddbb3dbd417fbedc59383421a066.jpg",
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fdanielisaac632%2Fprofessional-profile-pictures%2F&psig=AOvVaw2weh6psVEThhn_rB5cUp85&ust=1647893501957000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNDV1uq_1fYCFQAAAAAdAAAAABAa",
  "https://www.bighospitality.co.uk/var/wrbm_gb_hospitality/storage/images/3/3/5/2/2533-4-eng-GB/Business-Profile.jpg"
];

const conferenceImagesPool = [
  "https://colorlib.com/wp/wp-content/uploads/sites/2/11_conference-website-design-1024x507.jpg",
  "https://wdo.org/wp-content/uploads/2019/05/IDC-1.jpg",
  "https://www.neonmoire.com/assets/uploads/16ca9574496",
  "https://as2.ftcdn.net/jpg/02/59/70/31/1000_F_259703149_w75Iy7W2hWj86IZ6TRNRUlJFd7fpMWN8.jpg"
];

const getName = () => uniqueNamesGenerator({ dictionaries: [starWars] });

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
  const end = new Date();
  end.setDate(start.getDate() + (Math.random() * 10 + 1));

  return { start, end };
};

const getFutureConfDates = (): { start: Date; end: Date } => {
  const start = getRandomFutureDate(new Date("2023-01-01"));
  const end = new Date();
  end.setDate(start.getDate() + (Math.random() * 10 + 1));

  return { start, end };
};

const getProfilePic = () =>
  profileImagesPool[Math.floor(Math.random() * profileImagesPool.length)];

const getConferencePoster = () =>
  conferenceImagesPool[Math.floor(Math.random() * conferenceImagesPool.length)];

export const getMockConference = (past = false): ICardProps => {
  const { start, end } = past ? getPastConfDates() : getFutureConfDates();
  const speakersCount = Math.random() * 10;
  const speakers = new Array(speakersCount).map((_) => ({
    fullName: getName(),
    profileImage: getProfilePic(),
    id: uuid()
  }));

  return {
    conference: {
      id: uuid(),
      title: "Creative Tech Week",
      startDate: start,
      endDate: end,
      image: getConferencePoster(),
      description: {
        short: lorem.generateSentences(2),
        long: lorem.generateParagraphs(2).split("\n")
      },
      speakers
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
): ICardProps[] => {
  const pastConfs = new Array(pastConfsCount)
    .map((_) => getMockConference(true))
    .sort(
      (a, b) =>
        b.conference.startDate.getTime() - a.conference.startDate.getTime()
    );
  const futureConfs = new Array(futureConfsCount)
    .map((_) => getMockConference())
    .sort(
      (a, b) =>
        b.conference.startDate.getTime() - a.conference.startDate.getTime()
    );

  return [...pastConfs, ...futureConfs];
};
