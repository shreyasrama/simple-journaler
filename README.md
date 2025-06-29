# Simple Journaler

A basic, browser-based journaling app designed to not store any data outside of your device and therefore requires no login or account creation.

Try it out: https://simplejournaler.app/

It uses the following tech behind the scenes:
- [Svelte](https://svelte.dev/) - a simple web framework.
- [Origin Private File System](https://web.dev/articles/origin-private-file-system) - a storage endpoint private to the origin of the page and therefore only works on one browser, on one device.
- [SQLocal](https://github.com/DallasHoff/sqlocal) - an awesome TypeScript library that makes it easy to use SQLite with the OPFS. Simple Journaler uses the [Kysely driver](https://kysely.dev/) for SQL query building.

## TODO
[] Fix datepicker