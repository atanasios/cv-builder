import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AboutMeState {
    image: string | null;
    age: string | null;
    firstName: string;
    lastName: string;
    address: string | null;
    phoneNumber: string;
    bio: string | null;
    socials: string | null;
}

const initialState: AboutMeState = {
    image: null,
    age: null,
    firstName: '',
    lastName: '',
    address: null,
    phoneNumber: '',
    bio: null,
    socials: null,
}

const aboutMeSlice = createSlice({
  name: "aboutMe",
  initialState,
  reducers: {
    setAboutMeSection: (state, action: PayloadAction<AboutMeState>) => {
        return action.payload;
    }
  }
});

export const { setAboutMeSection } = aboutMeSlice.actions;

export default aboutMeSlice.reducer;