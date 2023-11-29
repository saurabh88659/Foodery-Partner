import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  userPhoneNUmber: null,
  currentStep: 2,
  adminIsAccepted: false,
  userData: null,
  selectedItem: [],
  desireFunctionKey: false,
  vendorId: null,
  searchQuerySave: '',
};

const requireDataSlice = createSlice({
  name: 'require/Data',
  initialState,
  reducers: {
    setUserPhoneNUmber: (state, action) => {
      state.userPhoneNUmber = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setAdminIsAccepted: (state, action) => {
      state.adminIsAccepted = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setDesireFunctionKey: (state, action) => {
      state.desireFunctionKey = action.payload;
    },
    setVendorId: (state, action) => {
      state.vendorId = action.payload;
    },
    setSearchQuerySave: (state, action) => {
      state.searchQuerySave = action.payload;
    },

    toggleSelection: (state, action) => {
      const item = action.payload;
      const itemId = action.payload._id;
      console.log('item id =====>', itemId);
      const index = state.selectedItem.findIndex(item => item._id === itemId);
      console.log('+++++++++++index==', index);
      if (index !== -1) {
        // Item is already selected, remove it from the array
        state.selectedItem.splice(index, 1);
      } else {
        // Item is not selected, add it to the array
        state.selectedItem.push(item);
      }
    },
    setSelectedItemnull: (state, action) => {
      state.selectedItem = action.payload;
    },
  },
});

export default requireDataSlice.reducer;
export const {
  setUserPhoneNUmber,
  setCurrentStep,
  setAdminIsAccepted,
  setUserData,
  toggleSelection,
  setDesireFunctionKey,
  setSelectedItemnull,
  setVendorId,
  setSearchQuerySave,
} = requireDataSlice.actions;
