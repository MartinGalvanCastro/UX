// EditModeContext.tsx
import React, { createContext, useContext, useState } from 'react';

type EditModeContextValue = {
    isEditMode: boolean;
    setIsEditMode: (isEditMode: boolean) => void;
};

export const EditModeContext = createContext<EditModeContextValue>({
    isEditMode: false,
    setIsEditMode: () => { },
});

export function EditModeProvider({ children }: { children: React.ReactNode }) {
    const [isEditMode, setIsEditMode] = useState(false);

    return (
        <EditModeContext.Provider value={{ isEditMode, setIsEditMode }}>
            {children}
        </EditModeContext.Provider>
    );
}

export function useEditMode() {
    const context = useContext(EditModeContext);
    if (!context) {
        throw new Error('useEditMode must be used within an EditModeProvider');
    }
    return context;
}
