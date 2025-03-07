import { useSelector } from "react-redux";
import { lightTheme, darkTheme } from "../../constants/theme";

export const useTheme = () => {
    const mode = useSelector((state: { theme: { mode: string } }) => state.theme.mode);
    return { mode, ...(mode === "light" ? lightTheme : darkTheme) };
};


