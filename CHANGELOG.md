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


## [v0.3.2] - 2017-05-19
### Fixed
- Not enough permissions for collections sharing


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
- `cancel()` method on service object returned by `cozy.client.intents.createService()``


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


[Unreleased]: https://github.com/cozy/cozy-client-js/compare/v0.3.2...HEAD
[v0.3.1]: https://github.com/cozy/cozy-client-js/compare/v0.3.1...v0.3.2
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
