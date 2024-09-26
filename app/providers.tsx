import { ThemeProvider } from "next-themes";

export const CustomThemeProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => (
  <ThemeProvider enableSystem defaultTheme="system" attribute="class">
    {children}
  </ThemeProvider>
);
