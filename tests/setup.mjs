// Test-only module hooks. Next.js provides "server-only" internally at build
// time; under plain Node it resolves to an empty module so the server form
// code can be imported and tested directly.
import { registerHooks } from "node:module";

registerHooks({
  resolve(specifier, context, next) {
    if (specifier === "server-only") return { url: "data:text/javascript,", shortCircuit: true };
    return next(specifier, context);
  },
});
