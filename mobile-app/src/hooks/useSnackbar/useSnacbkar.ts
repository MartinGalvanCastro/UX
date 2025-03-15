import { useContext } from "react";
import { SnackbarContext, SnackbarContextValue } from "../../providers/SnackbarProvider";

export const useSnackbar = (): SnackbarContextValue => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};