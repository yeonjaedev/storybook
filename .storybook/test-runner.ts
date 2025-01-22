import type { TestRunnerConfig } from "@storybook/test-runner";

const config: TestRunnerConfig = {
  tags: {
    // include: ["test-only", "pages"],
    exclude: ["no-tests", "tokens"],
    skip: ["skip-test", "layout"],
  },
};

export default config;
