import { faker } from '@faker-js/faker';

const generatePieChartData = () => {
  return Array.from({ length: 5 }, (_, id) => ({
    id,
    value: faker.number.int({ min: 10, max: 100 }),
    label: faker.commerce.productName(),
  }));
};

export const dataset = generatePieChartData();