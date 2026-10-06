import { createTheme, PaletteOptions } from "@mui/material";

import "@fontsource/league-spartan"; 
import "@fontsource/league-spartan/600.css"; 
import "@fontsource/league-spartan/700.css"; 

// Estendendo o módulo do MUI
declare module "@mui/material/styles" {
  interface Palette {
    highlight: Palette["primary"];
    white: string;
    black: string;
    purple: string;
    chipBackground?: string;
    transparent?: string;
  }

  interface PaletteOptions {
    highlight: PaletteOptions["primary"];
    white: string;
    black: string;
    purple: string;
    chipBackground?: string;
    transparent?: string;
  }
}

export const palette: PaletteOptions = {
  mode: "dark",
  primary: {
    light: "#4A738C",
    main: "#293C73",
    dark: "#1B2A55",
    contrastText: "#FFFFFF",
  },
  secondary: {
    light: "#FFDE59",
    main: "#F2A922",
    dark: "#D08900",
    contrastText: "#000000",
  },
  success: {
    light: "#66BB6A",
    main: "#4CAF50",
    dark: "#388E3C",
  },
  warning: {
    main: "#e87d37",
  },
  error: {
    main: "rgb(255, 72, 72)",
  },
  info: {
    main: "#76dbf4",
  },
  highlight: {
    light: "#FFF89A",
    main: "#FFDE59",
    dark: "#F2A922",
  },
  background: {
    default: "#EDF5FC",
    paper: "#FFFFFF",
  },
  text: {
    primary: "#293C73",
    secondary: "#4A738C",
  },
  white: "#FFFFFF",
  black: "#000000",
  purple: "#693382",
  transparent: "#00000000",
};

export const theme = createTheme({
  palette,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#EDF5FC",
          color: "#293C73",
          userSelect: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            backgroundColor: "#4A738C",
            color: "#FFFFFF",
            borderRadius: "5px",
            padding: "12px",
            boxShadow:
              "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
          },
          "& .MuiOutlinedInput-input": {
            color: "#FFFFFF",
            padding: "6px",
          },
          "& .MuiInputLabel-root": {
            color: "#FFFFFF",
            fontWeight: 400,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #999",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "#CCCCCC",
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            outline: "1px solid rgb(255, 72, 72)",
          },
          "&.Mui-error .MuiFormHelperText-root": {
            color: "rgb(255, 72, 72)",
            fontSize: "0.75rem",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #4CAF50",
          },
        },
      },
    },
  },
  typography: {
    fontSize: 10,
    fontFamily: "'League Spartan', sans-serif",
    h1: { fontSize: "2rem", fontWeight: 700, color: "#293C73" },
    h2: { fontSize: "1.5rem", fontWeight: 600, color: "#293C73" },
    body1: { fontSize: "1rem", color: "#293C73" },
    body2: { fontSize: "0.875rem", color: "#4A738C" },
  },
});
