import { Table, Column } from "../../components/Table"
import { faker } from '@faker-js/faker';

interface MedicationRecord {
    date: string;
    time: string;
    medication: string;
    confirmed: string;
}

const columns: Column<MedicationRecord>[] = [
    { field: 'date', headerName: 'Fecha' },
    { field: 'time', headerName: 'Hora' },
    { field: 'medication', headerName: 'Medicamento' },
    { field: 'confirmed', headerName: 'Confirmó toma' },
];

const generateFakeData = (numRecords: number): MedicationRecord[] => {
    return Array.from({ length: numRecords }, () => ({
        date: faker.date.recent().toLocaleDateString(),
        time: faker.date.recent().toLocaleTimeString(),
        medication: faker.commerce.productName(),
        confirmed: faker.datatype.boolean() ? 'Sí' : 'No',
    }));
};

const data = generateFakeData(50);


export const HistoryScreen = () => {
    return (
        <div
            style={{
                width: '100%',
            }}>
            <Table columns={columns} data={data} />
        </div>);
};