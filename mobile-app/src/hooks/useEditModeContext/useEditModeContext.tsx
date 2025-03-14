import { useContext } from "react";
import { EditModeContext } from "../../providers/EditModeProvider";

export const useEditModeContext = () => useContext(EditModeContext);