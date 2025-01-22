import "../app/globals.css";
import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react";
import { mswLoader, initialize } from "msw-storybook-addon";

initialize();
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],

  // 👈 Add the MSW loader to all stories
  loaders: [mswLoader],

  tags: ["autodocs"]
};

export default preview;
