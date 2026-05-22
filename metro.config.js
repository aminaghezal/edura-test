// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Workaround for Supabase's OpenTelemetry dynamic import that Hermes can't compile.
// Supabase optionally loads `@opentelemetry/api` via a dynamic `import()` with
// magic comments (/* webpackIgnore */ etc.) — Hermes parses this as "Invalid
// expression encountered" and the release build fails.
//
// Setting `unstable_enablePackageExports = false` reverts Metro to legacy
// resolution which avoids the problematic code path.
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
