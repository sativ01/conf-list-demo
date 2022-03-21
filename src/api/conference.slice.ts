import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICardProps } from "../components";
import { getMockConferencesDate, getMockConference } from "./mockConferenceApi";

export interface ConferenceState {
  pastConfs: ICardProps[];
  futureConfs: ICardProps[];
}

const [pastConfs, futureConfs] = getMockConferencesDate();

const initialState: ConferenceState = {
  pastConfs,
  futureConfs
};

export const confSlice = createSlice({
  name: "conferences",
  initialState,
  reducers: {
    addConf: (state, action: PayloadAction<ICardProps>) => {
      const conf = action.payload;
      if (conf.conference.startDate.getTime() < Date.now()) {
        state.pastConfs.unshift(conf);
      } else {
        state.futureConfs.unshift(conf);
      }
    },
    addRandomConf: (state) => {
      const conf = getMockConference();
      state.futureConfs.unshift(conf);
    }
  }
});

// Action creators are generated for each case reducer function
export const { addConf, addRandomConf } = confSlice.actions;

export default confSlice.reducer;
