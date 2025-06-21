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
      className="p-2 bg-transparent rounded dark:text-white cursor-pointer hover:bg-neutral-50 dark:hover:bg-gray-400/10"
    >
      {theme === "light" ? <IconSun stroke={1} /> : <IconMoon stroke={1} />}
    </button>
  );
};

export default ThemeToggle;
