# The issue

When running this project in dev mode, you should see that both values are properly updated.

sveltekit: `npm run dev -- --open`
viteonly: `npm run dev -- --open`

When running this project in build mode, you should see that only the second value is properly updated.

sveltekit: `npm run build && npm run preview`
viteonly: `npm run build && npm run serve`

## Why

It looks like the spread operator is expanding the `state` variable *once* but does not keep the original `state` getter reference.

This might only happen in the build because of a compile-time optimization on the spread operator, but at this point, I can't figure out the exact details.
