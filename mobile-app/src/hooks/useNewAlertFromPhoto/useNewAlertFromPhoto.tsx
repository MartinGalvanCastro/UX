import { useDispatch } from "react-redux";
import { type AppDispatch, addAlarm } from "../../redux";
import { faker } from "@faker-js/faker";

export interface UseNewAlertFromPhotoHookResult {
    generateNewAlert: () => void;
}

export const useNewAlertFromPhoto = (): UseNewAlertFromPhotoHookResult => {
    const dispatch = useDispatch<AppDispatch>();

    const generateNewAlert = () => {
        const randomName = faker.lorem.word();
        const randomCadence = faker.number.int({ min: 1, max: 12 });
        const randomHour = faker.number.int({ min: 0, max: 23 });
        const randomMinute = faker.number.int({ min: 0, max: 59 });
        const firstDoseHour = `${randomHour.toString().padStart(2, "0")}:${randomMinute
            .toString()
            .padStart(2, "0")}`;
        const randomDose = `${faker.number.int({ min: 1, max: 3 })} pill(s)`;
        const isForver = faker.datatype.boolean();
        const quantityLef = faker.number.int({ min: 1, max: 10 });

        dispatch(
            addAlarm({
                id: "",
                name: randomName,
                cadence: randomCadence,
                firstDoseHour,
                dose: randomDose,
                isForver,
                quantityLef,
            })
        );
    };

    return { generateNewAlert };
};
