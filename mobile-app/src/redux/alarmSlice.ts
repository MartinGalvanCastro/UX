import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

interface AlarmPayload {
  name:string,
  cadence: number,
  firstDoseHour: string,
  dose: string,
  isForver: boolean,
  quantityLef?: number,
}

export interface Alarm extends AlarmPayload {
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
      state.alarms.push({ ...action.payload, id: uuidv4() });
    },
    updateAlarm: (state, action: PayloadAction<AlarmPayload>) => {
      const index = state.alarms.findIndex(alarm => alarm.id === action.payload.id);
      if (index !== -1) {
        state.alarms[index] = { ...state.alarms[index], ...action.payload };
      }
    },
    deleteAlarm: (state, action: PayloadAction<string>) => {
      state.alarms = state.alarms.filter(alarm => alarm.id !== action.payload);
    },
  },
});

export const { addAlarm, updateAlarm, deleteAlarm } = alarmSlice.actions;
export const alarmReducer = alarmSlice.reducer;