import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          primary: { value: "#009FE3" },
          secondary: { value: "#5653FC" },
          800: { value: "#2D3648" },
        },
        app: {
          customBlack: { value: "#242424" },
          neutralSubtle: { value: "#7E919F" },
          neutralOutline: { value: "#D9E5F2" },
          neutralGrey: { value: "#4E5D69" },
          neutralLight: { value: "#F0F5FA" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
