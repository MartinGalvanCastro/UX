// AppNavigation.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreenName, LoginScreen } from "../screens/LoginScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignUpScreen, SignUpScreenName } from "../screens/SignupScreen/SignupScreen";

const Stack = createNativeStackNavigator();

export const AppNavigation = () => {
    return (

        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={LoginScreenName}
                screenOptions={{ headerShown: false }} // Hide the default header if desired
            >
                <Stack.Screen name={LoginScreenName} component={LoginScreen} />
                <Stack.Screen name={SignUpScreenName} component={SignUpScreen} />
            </Stack.Navigator>
        </NavigationContainer>

    );
};
