// alarmSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';

interface AlarmPayload{
   name: string;
  timestamp: number; // when to take the alarm (as a timestamp)
  // If the alarm repeats daily, quantityLeft can be omitted.
  quantityLeft?: number;
  repeatDaily: boolean;
}
export interface Alarm extends AlarmPayload{
  id: string;
}
export interface AlarmState {
  alarms: Alarm[];
}

const initialAlarmState: AlarmState = {
  alarms: [],
};

export const alarmSlice = createSlice({
  name: 'alarm',
  initialState: initialAlarmState,
  reducers: {
    addAlarm: (state, action: PayloadAction<AlarmPayload>) => {
      state.alarms.push({...action.payload, id: uuidv4()});
    },
    updateAlarm: (state, action: PayloadAction<Alarm>) => {
      const index = state.alarms.findIndex(alarm => alarm.id === action.payload.id);
      if (index !== -1) {
        state.alarms[index] = action.payload;
      }
    },
    removeAlarm: (state, action: PayloadAction<string>) => {
      state.alarms = state.alarms.filter(alarm => alarm.id !== action.payload);
    },
    decrementAlarm: (state, action: PayloadAction<string>) => {
      const alarm = state.alarms.find(alarm => alarm.id === action.payload);
      if (alarm && !alarm.repeatDaily && alarm.quantityLeft && alarm.quantityLeft > 0) {
        alarm.quantityLeft -= 1;
      }
    },
  },
});

export const { addAlarm, updateAlarm, removeAlarm, decrementAlarm } = alarmSlice.actions;
export const alarmReducer = alarmSlice.reducer;
