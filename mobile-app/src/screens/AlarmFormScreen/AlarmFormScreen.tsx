import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppRoutes, AppStackParamList } from "../../navigation";
import { useDispatch, useSelector } from 'react-redux';
import { addAlarm, updateAlarm, RootState } from "../../redux";

export type AlarmFormScreenProps = NativeStackScreenProps<AppStackParamList, AppRoutes.AlarmForm>;


export const AlarmFormScreen = ({ route }: AlarmFormScreenProps) => {

    const alarmId = route.params.alarmId;

    const { alarms } = useSelector((state: RootState) => state.alarm);
    const alarm = alarms.find((alarm) => alarm.id === alarmId);

    if (!alarm) {
        console.log('Debe crear')
        return <></>
    }

    console.log('Debe Editar')
    return <></>


}