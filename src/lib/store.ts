import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Service } from "./data";

export type Booking = {
  reference: string;
  service: Service;
  date: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

type ServiceState = {
  selectedServiceId: string | null;
};

const serviceInitialState: ServiceState = {
  selectedServiceId: null,
};

const serviceSlice = createSlice({
  name: "service",
  initialState: serviceInitialState,
  reducers: {
    selectService(state, action: PayloadAction<string>) {
      state.selectedServiceId = action.payload;
    },
    clearService(state) {
      state.selectedServiceId = null;
    },
  },
});

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: [] as Booking[],
  reducers: {
    addBooking(state, action: PayloadAction<Booking>) {
      state.push(action.payload);
    },
  },
});

export const { selectService, clearService } = serviceSlice.actions;
export const { addBooking } = bookingsSlice.actions;

export function makeStore() {
  return configureStore({
    reducer: {
      service: serviceSlice.reducer,
      bookings: bookingsSlice.reducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const selectServiceId = (state: RootState) => state.service.selectedServiceId;
export const selectBookings = (state: RootState) => state.bookings;
