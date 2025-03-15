import { Grid } from "@mui/material";
import { BarChart, PieChart } from "../../components/Charts";
import { valueFormatter, dataset as BarCharDataset } from './BarChartDataset';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { dataset as PieChartDataset } from './PieChartDataset';

const chartSetting = {
    yAxis: [
        {
            label: 'Notification Opens',
        },
    ],
    width: 500,
    height: 300,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-20px, 0)',
        },
    },
};

export const ReportScreen = () => {
    return (
        <Grid container sx={{ width: '100%' }} spacing={2}>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <h2>Medicamentos con más olvidos</h2>
                <PieChart
                    series={[{ 'data': PieChartDataset }]}
                    width={500}
                    height={300}
                    slotProps={{
                        legend: {
                            position: { vertical: 'middle', horizontal: 'right' },
                            padding: { left: 0 }
                        }
                    }}
                    margin={{ top: 10, right: 40, bottom: 10, left: -175 }}
                />
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <h2>Notificaciones abiertas por mes</h2>
                <BarChart
                    dataset={BarCharDataset}
                    xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                    series={[
                        { dataKey: 'sms', label: 'SMS', valueFormatter },
                        { dataKey: 'email', label: 'Email', valueFormatter },
                        { dataKey: 'inApp', label: 'In App Notifications', valueFormatter },
                    ]}
                    {...chartSetting}
                />
            </Grid>
        </Grid>
    );
};