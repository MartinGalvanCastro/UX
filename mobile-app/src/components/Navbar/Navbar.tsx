import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Appbar, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNewAlertFromPhoto } from '../../hooks/useNewAlertFromPhoto';
import { AppRoutes } from '../../navigation/AppRoutes';
import { useNavigation } from '../../navigation/useNavigation';

export interface NavbarProp {
    style?: StyleProp<ViewStyle>;
}

export const Navbar = ({
    style
}: NavbarProp) => {
    const { bottom } = useSafeAreaInsets();
    const theme = useTheme();
    const { generateNewAlert } = useNewAlertFromPhoto();
    const navigation = useNavigation();

    return (
        <Appbar safeAreaInsets={{ bottom }} style={[
            style,
            styles.container, {
                backgroundColor: theme.colors.background,
                borderTopColor: theme.colors.outlineVariant,
            }]}>
            <Appbar.Action
                icon="plus"
                mode='contained'
                iconColor={theme.colors.onPrimary}
                containerColor={theme.colors.primary}
                onPress={() => navigation.navigate(AppRoutes.AlarmForm, {})}
                size={30} />
            <Appbar.Action
                icon="camera"
                mode='contained'
                iconColor={theme.colors.onPrimary}
                containerColor={theme.colors.primary}
                onPress={generateNewAlert}
                size={30} />
            <Appbar.Action
                icon="cog"
                mode='contained'
                iconColor={theme.colors.onPrimary}
                containerColor={theme.colors.primary}
                onPress={() => navigation.navigate(AppRoutes.MyAccount)}
                size={30} />
        </Appbar>

    )
};

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        paddingTop: 32,
        width: '100%',
        justifyContent: 'space-around',
    }
});