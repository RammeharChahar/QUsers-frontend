import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  status: "idle",
  error: null,
  searchResults: [],
  selectedDomains: [],
  selectedGender: [],
  selectedAvailabilities: [],
  team: [],
};

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  try {
    const response = await axios.get("https://server-test-1-5edc.onrender.com/api/posts");
    return response.data;
  } catch (error) {
    throw Error("Failed to fetch users");
  }
});

export const fetchFilters = createAsyncThunk("fetchFilters", async (domain) => {
  try {
    const response = await axios.get(`https://server-test-1-5edc.onrender.com/api/posts/filter`, {
      params: {
        domain: domain,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching:", error);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSearchResults(state, action) {
      state.users = action.payload;
    },
    clearSearchResults(state) {
      state.searchResults = [];
    },
    addSelectedDomain(state, action) {
      const domainToAdd = action.payload;
      if (!state.selectedDomains.includes(domainToAdd)) {
        state.selectedDomains.push(domainToAdd);
      }
    },
    removeSelectedDomain(state, action) {
      const domainToRemove = action.payload;
      state.selectedDomains = state.selectedDomains.filter(
        (domain) => domain !== domainToRemove
      );
    },
    clearSelectedDomains(state) {
      state.selectedDomains = [];
    },
    addSelectedGender(state, action) {
      const genderToAdd = action.payload;
      if (!state.selectedGender.includes(genderToAdd)) {
        state.selectedGender.push(genderToAdd);
      }
    },
    removeSelectedGender(state, action) {
      const genderToRemove = action.payload;
      state.selectedGender = state.selectedGender.filter(
        (domain) => domain !== genderToRemove
      );
    },
    clearSelectedGender(state) {
      state.selectedGender = [];
    },
    addToTeam: (state, action) => {
      const newUser = action.payload;
      const existingUser = state.team.find(
        (user) => user.domain === newUser.domain
      );

      if (!existingUser) {
        state.team.push(newUser);
      }
    },
    removeFromTeam: (state, action) => {
      const userIdToRemove = action.payload;
      state.team = state.team.filter((user) => user.id !== userIdToRemove);
    },
    addSelectedAvailability(state, action) {
      state.selectedAvailabilities.push(action.payload);
    },

    removeSelectedAvailability(state, action) {
      state.selectedAvailabilities = state.selectedAvailabilities.filter(
        (availability) => availability !== action.payload
      );
    },

    clearSelectedAvailabilities(state) {
      state.selectedAvailabilities = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchFilters.pending, (state) => {
        state.status = "loading"; 
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload; 
      })
      .addCase(fetchFilters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectSearchResults = (state) => state.searchResults;
export const selectSelectedDomains = (state) => state.selectedDomains;
export const selectSelectedGender = (state) => state.selectedGender;
export const selectSelectedAvailability = (state) => state.selectedAvailabilities;

export const {
  setSearchResults,
  clearSearchResults,
  addSelectedDomain,
  removeSelectedDomain,
  clearSelectedDomains,
  addSelectedGender,
  removeSelectedGender,
  clearSelectedGender,
  addToTeam,
  removeFromTeam,
  addSelectedAvailability,
  removeSelectedAvailability,
  clearSelectedAvailabilities,
} = usersSlice.actions;

export default usersSlice.reducer;
