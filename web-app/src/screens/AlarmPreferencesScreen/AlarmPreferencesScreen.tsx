import { AlarmPreferencesForm } from "../../components/AlarmPreferncesForm";
import { BackLink } from "../../components/BackLink";

export const AlarmPreferncesScreen = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100vh', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                <BackLink text="Preferncias de Notificaciones" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column', flex: 1, paddingTop: '50px' }}>
                <AlarmPreferencesForm />
            </div>
        </div>
    );
};