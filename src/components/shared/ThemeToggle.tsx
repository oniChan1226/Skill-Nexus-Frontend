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
      className="px-4 py-2 bg-transparent rounded dark:text-white cursor-pointer"
    >
      {theme === "light" ? <IconSun stroke={2} /> : <IconMoon stroke={2} />}
    </button>
  );
};

export default ThemeToggle;
