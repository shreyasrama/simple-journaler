# simple-journaler

A basic, browser-based journaling app designed to not store any data externally to your device and requires no login or account creation.

It uses the following tech:
- [Origin Private File System](https://web.dev/articles/origin-private-file-system)
- [SQLocal](https://github.com/DallasHoff/sqlocal)
- [Kysely](https://kysely.dev/)

OPFS is a storage endpoint private to the origin of the page and therefore only works on one browser, on one device.

SQLocal is an awesome-to-use TypeScript library that makes it easy to use SQLite with the OPFS. simple-journaler uses the
Kysely driver for SQL query building.
