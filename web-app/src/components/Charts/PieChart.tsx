import React from 'react';
import { PieChart as MUIPieChart, PieChartProps } from '@mui/x-charts/PieChart';

export interface MyPieChartProps extends PieChartProps {}

/**
 * PieChart component based on MUI X Charts.
 * Data is provided entirely via the required `series` prop.
 * Optional props (such as `bottomAxis` and `leftAxis`) default to null.
 */
export const PieChart: React.FC<MyPieChartProps> = ({
  bottomAxis = null,
  leftAxis = null,
  ...props
}) => {
  return (
      <MUIPieChart bottomAxis={bottomAxis} leftAxis={leftAxis} {...props} />
  );
};
