// components/BarChart/index.tsx
import React from 'react';
import { BarChart as MUIBarChart, BarChartProps } from '@mui/x-charts/BarChart';

export interface MyBarChartProps extends BarChartProps {}

/**
 * MyBarChart wraps the MUI X BarChart.
 * It accepts the required 'series' prop (an array of BarSeriesType objects) and other optional props.
 */
export const BarChart: React.FC<MyBarChartProps> = (props) => {
  return (
      <MUIBarChart {...props} />
  );
};
