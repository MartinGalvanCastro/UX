import { faker } from '@faker-js/faker';

const generateNotificationData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    sms: faker.number.int({ min: 20, max: 100 }),
    email: faker.number.int({ min: 20, max: 100 }),
    inApp: faker.number.int({ min: 20, max: 100 }),
    month,
  }));
};

export const dataset = generateNotificationData();

export function valueFormatter(value: number | null) {
  return `${value} opens`;
}