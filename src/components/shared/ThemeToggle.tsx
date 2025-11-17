import { useSelector, useDispatch } from "react-redux";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { toggleTheme } from "../../features/ui/themeSlice";
import type { RootState } from "../../app/store";

const ThemeToggle = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 bg-transparent rounded-lg dark:text-white cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900"
    >
      {theme === "light" ? <IconSun stroke={1} size={22}/> : <IconMoon stroke={1} size={22}/>}
    </button>
  );
};

export default ThemeToggle;
