# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).


## [Unreleased]
### Changed
- none yet

### Fixed
- none yet

### Added
- none yet

### Removed
- none yet


## [0.14.2] - 2018-11-07
### Fixed
- Version


## [0.14.1] - 2018-11-07
### Fixed
- Travis configuration


## [v0.14.0] - 2018-10-31
### Added
- Expose `fetch()` method


## [v0.13.0] - 2018-09-19
### Added
- Added a function to migrate PouchDB databases from one adapter to another.


## [v0.12.1] - 2018-09-06
### Fixed
- Added missing `dist/` folder


## [v0.12.0] - 2018-07-30
### Fixed
- Fix issue for intents URLs computing with hash


## [v0.11.0] - 2018-06-22

### Added
- intents: add an redirectFn parameter to redirect method

### Removed
- none yet


## [v0.10.0] - 2018-06-22

### Changed

- Pouchdb and Pouchdb-find have been upgraded to their latest versions. Pouchdb-find has changed major version.

### Fixed

- isomorphic-fetch has been added as a direct dependency, fixing a problem on node on macOS.

## [v0.9.0] - 2018-04-27
### Added
- Intent composition
- Code is formatted using Prettier

## [v0.8.3] - 2018-04-18
### Changed
- Intent service now force document height to 100%

## [v0.8.2] - 2018-04-16
### Fixed
- Fix a polyfill issue about async/await usage and use [`babel-preset-cozy-app`](https://github.com/CPatchane/create-cozy-app/tree/master/packages/babel-preset-cozy-app)

## [v0.8.1] - 2018-04-13
### Added
- Add new intents method `REDIRECT` and `getRedirectionURL` ([PR #256](https://github.com/cozy/cozy-client-js/pull/256))

## [v0.8.0] - 2018-03-16
### Added
- Now trim file name before any creation or update.
- Added push notifications related options on OAuth client (notificationPlatform and notificationDeviceToken)

## [v0.7.2] - 2018-02-28
### Fixed
- Added a polyfill for `Object.assign`

## [v0.7.1] - 2018-02-20
### Changed
- Allow to pass a `contentLength` option to files.create. This prevent the stack from saving uncomplete upload.

## [v0.7.0] - 2018-02-12
### Changed
- **Breaking** If the token used to call the stack is expired or invalid on an app's page, the page is reloaded. The error is still thrown. [See here](https://github.com/cozy/cozy-client-js/pull/247) for more informations.

## [v0.6.2] - 2018-01-30
### Fixed
- Fixed a faulty build

## [v0.6.1] - 2018-01-30
### Fixed
- Case-insensitive detection on mime-types

## [v0.6.0] - 2018-01-29
### Added
- Added detection for `HEIC` mime-types

## [v0.5.0] - 2018-01-24
### Added
- Added an option to create a directory without using pouch #241

## [v0.4.4] - 2017-12-12
### Fixed
- Auth was broken on older browsers (notably iOS9) #237


## [v0.4.3] - 2017-11-30
### Changed
- `babel-polyfill` is not included anymore https://github.com/cozy/cozy-client-js/commit/b12fb52da002742c83bfc87632a3bc6440d1a8c0

## [v0.4.2] - 2017-11-14
### Added
- `processJSONAPI` option can now be passed to `fetchJSON`


## [v0.4.1] - 2017-11-10
### Added
- Ability to use sqlite as a pouch adapter, if provided by the host app.


## [v0.4.0] - 2017-11-07
### Added
- Added PouchDB as a direct dependency.


## [v0.3.20] - 2017-11-02
### Fixed
- Check for parentNode existing before removing intent iframe (avoid error in console)

### Added
- Add .focus() to allow keyboard navigation inside the iframe

## [v0.3.19] - 2017-09-27
### Added
- Added a function to call `/settings/synchronized`

## [v0.3.18] - 2017-09-25
### Changed
- Optimised checking for index availability right after they are created
- When clients request to regenerate their token, redirect them to a page with more explanations then the default login page.

## [v0.3.17] - 2017-09-01
### Fixed
- Returns an empty array from `data.findAll()` when documents not found (instead of 404 error)


## [v0.3.16] - 2017-08-31
### Fixed
- Return directly an array of docs for `data.findAll()`
- Do not include CouchDB indexes in `data.findAll()`


## [v0.3.15] - 2017-08-31
### Changed
- Add a retry on `data.defineIndex` to avoid stack error for index not ready yet

### Added
- Add `data.findAll(doctype)` to get all documents of a provided doctype without using index


## [v0.3.14] - 2017-08-30
### Changed
- Use sort=datetime when fetching referenced files


## [v0.3.13] - 2017-08-22
### Changed
- Add second optional parameter (`options`) to `files.destroyById` function, matching other functions from same package.


## [v0.3.12] - 2017-08-08
### Changed
- Add second optional parameter (`transitionProperty`) to `resizeClient()` function, in order to handle CSS transition


## [v0.3.11] - 2017-07-25
### Added
- Added support for the `sort` query option
- Added an option to allow bypassing the oath credentials cache

## [v0.3.10] - 2017-07-20
### Added
- Handle `exposeIntentFrameRemoval` data flag to terminate the service without removing the intent DOM node directly but by providing the removal function to the client.
- Add an `onReadyCallback` optional argument to the create method in order to allow providing a callback function to be run when the intent iframe will be loaded (iframe `onload` listener).


## [v0.3.9] - 2017-07-10
### Added
- Add a `cozy.client.data.findMany` method to fetch multiple docs at once

### Fixed
- Fix the compatibility shim for `getArchiveLink`


## [v0.3.8] - 2017-06-22
### Fixed
- Fix intent handshake in Safari 9.1


## [v0.3.7] - 2017-06-21
### Fixed
- Fix `service.resizeClient()` in intents.


## [v0.3.6] - 2017-06-15
### Added
- Add a `intentService.resizeClient()` method to force the size of the intent modal

## [v0.3.5] - 2017-06-13
### Added
- Add a `intentService.throw(error)` method to throw an error on client.
- Add a `getArchiveLinkByIds` method to create a zip with files identified by their ids.
- Add a `fetchReferencedFiles` method to fetch the files related to a doc.
- Add a `cozy.client.files.query` method to fetch files using a mango query


## [v0.3.4] - 2017-06-06
### Changed
- Create data with forced ID

### Fixed
- Documentation about trash/restore
- Documentation about sending an email


## [v0.3.3] - 2017-05-30
### Changed
- Update documentation


## [v0.3.2] - 2017-05-19
### Fixed
- Not enough permissions for collections sharing

### Added
- Add a method to count the number of jobs in a queue
- Add a method to enqueue a job in a queue


## [v0.3.1] - 2017-05-18
### Fixed
- Missing parts from intents in dist


## [v0.3.0] - 2017-05-17
### Fixed
- Intents : side effects in postMessage listeners
- Upload was cancel twice

### Changed
- Intents are better, safer, stronger

### Added
- Create a share link from an `id`


## [v0.2.5] - 2017-05-10
### Changed
- Accept an optional wholeResponse query parameter in cozy.data.query
- Files are now correctly sorted when offline


## [v0.2.4] - 2017-05-04
### Fixed
- Remove trash folder on offline request

### Added
- Add feature to remove referenced files
- `cancel()` method on service object returned by `cozy.client.intents.createService()`


## [v0.2.3] - 2017-04-28
### Changed
- Add skip and limit options to cozy.client.files.statByID

### Added
- Temporary `cozy.client.fetchJSON()`, to facilitated development process.


## [v0.2.2] - 2017-04-27
### Changed
- Accept an optional revision to be sent as `If-Match` when trashing a file/folder

### Added
- method `cozy.client.files.createDirectoryByPath()`


## [v0.2.1]
### Changed
- Check if there is a connection before starting replication
- Return client registered on offline mode
- Do not try to refresh token if retreiving a token fails

### Fixed
- Break an infinite loop of retry/failure when fetch returns a 400 but client is not revoked

### Added
- Add cozy version parameter to remove '/status/' request on offline mode


## [v0.2.0]
## Removed
- ⚠️ `pouchdb` and `pouchdb-find` required dependencies, see [offline documentation](https://github.com/cozy/cozy-client-js/blob/master/docs/offline.md)


## [v0.1.11] - 2017-04-07
### Fixed
- Missing min.js files. Oops !

### Added
- Documentation about intents API


## [v0.1.10] - 2017-04-06
### Changed
- Doc now use `cozy.tools:8080` as example and default domain. No need to edit /etc/hosts.

### Added
- Add `cozy.client.intents.create` to create an intent. Allow next to `start` into an HTML element.
- Add `cozy.client.intents.createService` to instanciate a service able to deal with a client.

### Fixed
- Documentation improvements


## [v0.1.9] - 2017-03-24
### Changed
- PouchDB replication can refresh its token if needed

### Fixed
- mime-type was badly detected when uploading within cordova app


## [v0.1.8] - 2017-03-13
### Changed
- `onComplete` & `onError` are call after replication end
- The offline database is created during a replication if it does not exist


## [v0.1.5] - 2017-03-07
### Changed
- `getClient` throws a specific error for revoked client


## [v0.1.4] - 2017-03-06
### Added
- Add `cozy.client.getFilePath` to generate path for a given file
- Handling custom code on replication complete or error

### Fixed
- Fix typo :bug: getDowloadLink -> getDownloadLink


## [v0.1.3] - 2017-03-03
### Changed
- Refactoring on offline to return Promise


[Unreleased]: https://github.com/cozy/cozy-client-js/compare/v0.14.2...HEAD
[v0.14.2]: https://github.com/cozy/cozy-client-js/compare/v0.14.1...v0.14.2
[v0.14.1]: https://github.com/cozy/cozy-client-js/compare/v0.14.0...v0.14.1
[v0.14.0]: https://github.com/cozy/cozy-client-js/compare/v0.13.0...v0.14.0
[v0.13.0]: https://github.com/cozy/cozy-client-js/compare/v0.12.1...v0.13.0
[v0.12.1]: https://github.com/cozy/cozy-client-js/compare/v0.12.0...v0.12.1
[v0.12.0]: https://github.com/cozy/cozy-client-js/compare/v0.11.0...v0.12.0
[v0.11.0]: https://github.com/cozy/cozy-client-js/compare/v0.10.0...v0.11.0
[v0.10.0]: https://github.com/cozy/cozy-client-js/compare/v0.9.0...v0.10.0
[v0.9.0]: https://github.com/cozy/cozy-client-js/compare/v0.8.3...v0.9.0
[v0.8.3]: https://github.com/cozy/cozy-client-js/compare/v0.8.2...v0.8.3
[v0.8.2]: https://github.com/cozy/cozy-client-js/compare/v0.8.1...v0.8.2
[v0.8.1]: https://github.com/cozy/cozy-client-js/compare/v0.8.0...v0.8.1
[v0.8.0]: https://github.com/cozy/cozy-client-js/compare/v0.7.2...v0.8.0
[v0.7.2]: https://github.com/cozy/cozy-client-js/compare/v0.7.1...v0.7.2
[v0.7.1]: https://github.com/cozy/cozy-client-js/compare/v0.7.0...v0.7.1
[v0.7.0]: https://github.com/cozy/cozy-client-js/compare/v0.6.2...v0.7.0
[v0.6.2]: https://github.com/cozy/cozy-client-js/compare/v0.6.1...v0.6.2
[v0.6.1]: https://github.com/cozy/cozy-client-js/compare/v0.6.0...v0.6.1
[v0.6.0]: https://github.com/cozy/cozy-client-js/compare/v0.5.0...v0.6.0
[v0.5.0]: https://github.com/cozy/cozy-client-js/compare/v0.4.4...v0.5.0
[v0.4.4]: https://github.com/cozy/cozy-client-js/compare/v0.4.3...v0.4.4
[v0.4.3]: https://github.com/cozy/cozy-client-js/compare/v0.4.2...v0.4.3
[v0.4.2]: https://github.com/cozy/cozy-client-js/compare/v0.4.1...v0.4.2
[v0.4.1]: https://github.com/cozy/cozy-client-js/compare/v0.4.0...v0.4.1
[v0.4.0]: https://github.com/cozy/cozy-client-js/compare/v0.3.20...v0.4.0
[v0.3.20]: https://github.com/cozy/cozy-client-js/compare/v0.3.19...v0.3.20
[v0.3.19]: https://github.com/cozy/cozy-client-js/compare/v0.3.18...v0.3.19
[v0.3.18]: https://github.com/cozy/cozy-client-js/compare/v0.3.17...v0.3.18
[v0.3.17]: https://github.com/cozy/cozy-client-js/compare/v0.3.16...v0.3.17
[v0.3.16]: https://github.com/cozy/cozy-client-js/compare/v0.3.15...v0.3.16
[v0.3.15]: https://github.com/cozy/cozy-client-js/compare/v0.3.14...v0.3.15
[v0.3.14]: https://github.com/cozy/cozy-client-js/compare/v0.3.13...v0.3.14
[v0.3.13]: https://github.com/cozy/cozy-client-js/compare/v0.3.12...v0.3.13
[v0.3.12]: https://github.com/cozy/cozy-client-js/compare/v0.3.11...v0.3.12
[v0.3.11]: https://github.com/cozy/cozy-client-js/compare/v0.3.10...v0.3.11
[v0.3.10]: https://github.com/cozy/cozy-client-js/compare/v0.3.9...v0.3.10
[v0.3.9]: https://github.com/cozy/cozy-client-js/compare/v0.3.8...v0.3.9
[v0.3.8]: https://github.com/cozy/cozy-client-js/compare/v0.3.7...v0.3.8
[v0.3.7]: https://github.com/cozy/cozy-client-js/compare/v0.3.6...v0.3.7
[v0.3.6]: https://github.com/cozy/cozy-client-js/compare/v0.3.5...v0.3.6
[v0.3.5]: https://github.com/cozy/cozy-client-js/compare/v0.3.4...v0.3.5
[v0.3.4]: https://github.com/cozy/cozy-client-js/compare/v0.3.3...v0.3.4
[v0.3.3]: https://github.com/cozy/cozy-client-js/compare/v0.3.2...v0.3.3
[v0.3.2]: https://github.com/cozy/cozy-client-js/compare/v0.3.1...v0.3.2
[v0.3.1]: https://github.com/cozy/cozy-client-js/compare/v0.3.0...v0.3.1
[v0.3.0]: https://github.com/cozy/cozy-client-js/compare/v0.2.5...v0.3.0
[v0.2.5]: https://github.com/cozy/cozy-client-js/compare/v0.2.4...v0.2.5
[v0.2.4]: https://github.com/cozy/cozy-client-js/compare/v0.2.3...v0.2.4
[v0.2.3]: https://github.com/cozy/cozy-client-js/compare/v0.2.2...v0.2.3
[v0.2.2]: https://github.com/cozy/cozy-client-js/compare/v0.2.1...v0.2.2
[v0.2.1]: https://github.com/cozy/cozy-client-js/compare/v0.2.0...v0.2.1
[v0.2.0]: https://github.com/cozy/cozy-client-js/compare/v0.1.9...v0.2.0
[v0.1.9]: https://github.com/cozy/cozy-client-js/compare/v0.1.8...v0.1.9
[v0.1.8]: https://github.com/cozy/cozy-client-js/compare/v0.1.7...v0.1.8
[v0.1.5]: https://github.com/cozy/cozy-client-js/compare/v0.1.4...v0.1.5
[v0.1.4]: https://github.com/cozy/cozy-client-js/compare/v0.1.3...v0.1.4
[v0.1.3]: https://github.com/cozy/cozy-client-js/compare/v0.1.2...v0.1.3
