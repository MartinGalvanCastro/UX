import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { AppStackParamList } from './AppRoutes';
import { useNavigation as useRNNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const useNavigation = <T extends NavigationProp<ParamListBase>>() => 
    useRNNavigation<NativeStackNavigationProp<AppStackParamList>>();