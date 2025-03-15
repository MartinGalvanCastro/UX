import { AddAlarmForm } from "../../components/AddAlarmForm";
import { Box } from "../../components/Box";

export const AddAlarmScreen = () => {

    return (
        <Box elevation={0} sx={{ 'width': '100%' }} justifyContent="center" alignItems="center">
            <AddAlarmForm />
        </Box>
    )

};