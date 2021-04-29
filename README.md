# The issue

When running this project in dev mode, you should see that both values are properly updated.

`npm run dev -- --open`

When running this project in build mode, you should see that only the second value is properly updated.

`npm run build && npm run preview`

## Why

It looks like the spread operator is expanding the `state` variable *once* but does not keep the original `state` getter reference.

This might only happen in the build because of a compile-time optimization on the spread operator, but at this point, I can't figure out the exact details.