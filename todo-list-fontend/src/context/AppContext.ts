import { PropsWithChildren, useState } from "react";
 
export const ThemeProvider = ({ children }: PropsWithChildren<{}>) => {
  const [theme, setTheme] = useState("dark");
 
  return (
    <ThemeContext.Provider >
      {children}
    </ThemeContext.Provider>
  );
};