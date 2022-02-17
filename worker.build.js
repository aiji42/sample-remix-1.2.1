/* eslint @typescript-eslint/no-var-requires: 0 */
require("dotenv").config()
const alias = require("esbuild-plugin-alias")
const isProd = process.env.NODE_ENV === "production"

require("esbuild")
  .build({
    entryPoints: ["./build/index.js"],
    bundle: true,
    sourcemap: true,
    minify: isProd,
    outdir: "dist",
    define: {
      "process.env.NODE_ENV": `"${process.env.NODE_ENV ?? "development"}"`,
      "process.env.SUPABASE_URL": `"${process.env.SUPABASE_URL}"`,
      "process.env.SUPABASE_API_KEY": `"${process.env.SUPABASE_API_KEY}"`,
    },
    plugins: [
      alias({
        through: require.resolve("no-op"),
        "html-tokenize": require.resolve("no-op"),
        multipipe: require.resolve("no-op"),
        "@emotion/react": require.resolve("@emotion/react"),
        "@emotion/cache": require.resolve("@emotion/cache"),
      }),
    ],
  })
  .catch(() => process.exit(1))
