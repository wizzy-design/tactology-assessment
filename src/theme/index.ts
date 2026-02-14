import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          secondary: { value: "#5653FC" },
          800: { value: "#2D3648" },
        },
        app: {
          neutralSubtle: { value: "#7E919F" },
          neutralOutline: { value: "#D9E5F2" },
          neutralGray: { value: "#4E5D69" },
          neutralLight: { value: "#F0F5FA" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
