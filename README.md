[![Travis build status shield](https://img.shields.io/travis/cozy/cozy-client-js.svg?branch=master)](https://travis-ci.org/cozy/cozy-client-js)
[![NPM release version shield](https://img.shields.io/npm/v/cozy-client-js.svg)](https://www.npmjs.com/package/cozy-client-js)
[![NPM Licence shield](https://img.shields.io/npm/l/cozy-client-js.svg)](https://github.com/cozy/cozy-client-js/blob/master/LICENSE)


[Cozy][cozy] Javascript Client
==============================


What's Cozy?
------------

![Cozy Logo](https://cdn.rawgit.com/cozy/cozy-guidelines/master/templates/cozy_logo_small.svg)

[Cozy][cozy] is a platform that brings all your web services in the same private space.  With it, your webapps and your devices can share data easily, providing you with a new experience. You can install Cozy on your own hardware where no one's tracking you.


What's cozy-client-js?
------------------

`cozy-client-js` is a javascript library made by Cozy. It enables client-side  applications to make requests to the cozy stack.

cozy-client-js is compatible with both cozy architectures.

## This repository is a work-in-progress where the cozy-stack companion javascript library is being developed.

To learn more about cozy-stack, head over to [its repository](https://github.com/cozy/cozy-stack).

If you are getting started on cozy application development, you should follow this [tutorial](https://dev.cozy.io/clientsideapp.html) and use the current `cozy-browser-sdk`. Transitioning from the cozy-browser-sdk library to this one should imply minimal changes (see [transition doc](https://github.com/cozy/cozy-client-js/blob/master/docs/browser-sdk-transition.md))


Use
---

You can `import`/`require` cozy-client-js using webpack
**TODO** test if `cozy-client-js` compatible with browserify, rollup, ect...

You can also copy-paste the `dist/cozy-client.js` bundle file into your application, and include it in your application with  `<script src="./cozy-client.js">`.

**polyfills** : cozy-client-js uses [fetch](https://fetch.spec.whatwg.org/) and bundle all necessary polyfills (promise, fetch, reGenerator). **TODO:** We should move the polyfills to a separate bundle and require them only if needed.

Once you have the library included in your application, head over to [the doc](./docs/README.md) to see what you can do with it!


Contribute
----------

If you want to work on cozy-client-js itself and submit code modifications, feel free to open pull-requests! See the [contributing guide][contribute] for more information about this repository structure, testing, linting and how to properly open pull-requests.


Community
---------

### Maintainer

The lead maintainer for cozy-client-js is @aenario, send him/her a :beers: to say hello!


### Get in touch

You can reach the Cozy Community by:

- Chatting with us on IRC [#cozycloud on Freenode][freenode]
- Posting on our [Forum][forum]
- Posting issues on the [Github repos][github]
- Say Hi! on [Twitter][twitter]


Licence
-------

cozy-client-js is developed by Cozy Cloud and distributed under the [MIT][MIT].



[cozy]: https://cozy.io "Cozy Cloud"
[setup]: https://dev.cozy.io/#set-up-the-development-environment "Cozy dev docs: Set up the Development Environment"
[doctypes]: https://dev.cozy.io/#main-document-types
[bill-doctype]: https://github.com/cozy-labs/konnectors/blob/master/server/models/bill.coffee
[konnector-doctype]: https://github.com/cozy-labs/konnectors/blob/master/server/models/konnector.coffee
[konnectors]: https://github.com/cozy-labs/konnectors
[MIT]: https://opensource.org/licenses/MIT
[contribute]: CONTRIBUTING.md
[freenode]: http://webchat.freenode.net/?randomnick=1&channels=%23cozycloud&uio=d4
[forum]: https://forum.cozy.io/
[github]: https://github.com/cozy/
[twitter]: https://twitter.com/mycozycloud
[mocha]: https://mochajs.org/
[should]: npmjs.com/package/should
[checkbox]: https://help.github.com/articles/basic-writing-and-formatting-syntax/#task-lists
