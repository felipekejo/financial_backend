import { Environment } from "vitest";
export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    console.log("Setup prisma environment");

    return {
      async teardown() {
        console.log("Teardown prisma environment");
      },
    };
  },
};
