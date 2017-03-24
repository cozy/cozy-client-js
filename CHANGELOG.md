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


[Unreleased]: https://github.com/cozy/cozy-client-js/compare/v0.1.9...HEAD
[v0.1.9]: https://github.com/cozy/cozy-client-js/compare/v0.1.8...v0.1.9
[v0.1.8]: https://github.com/cozy/cozy-client-js/compare/v0.1.7...v0.1.8
[v0.1.5]: https://github.com/cozy/cozy-client-js/compare/v0.1.4...v0.1.5
[v0.1.4]: https://github.com/cozy/cozy-client-js/compare/v0.1.3...v0.1.4
[v0.1.3]: https://github.com/cozy/cozy-client-js/compare/v0.1.2...v0.1.3
