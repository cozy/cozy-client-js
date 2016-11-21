![Travis build status shield](https://img.shields.io/travis/cozy/cozy-client-js.svg)
![NPM release version shield](https://img.shields.io/npm/v/cozy-client-js.svg)
![Github Release version shield](https://img.shields.io/github/release/cozy/cozy-client-js.svg)
![NPM Licence shield](https://img.shields.io/npm/l/cozy-client-js.svg)


[Cozy][cozy] API
=======================


What's Cozy?
------------

![Cozy Logo](https://cdn.rawgit.com/cozy/cozy-guidelines/master/templates/cozy_logo_small.svg)

[Cozy][cozy] is a platform that brings all your web services in the same private space.  With it, your webapps and your devices can share data easily, providing you with a new experience. You can install Cozy on your own hardware where no one's tracking you.


What's API?
------------------

`cozy-client-js` is a javascript library made by Cozy. It enables client-side  applications to make requests to the cozy stack.

Cozy-api is compatible with both cozy architectures.

## This repository is a stub where the stack-v2 companion javascript library is being developed.

To learn more about the stack-v2, head over to [its repository](https://github.com/cozy/cozy-stack).

If you are getting started on cozy application development, you should follow this [tutorial](https://dev.cozy.io/clientsideapp.html) and use the current `cozy-browser-sdk`. Transitioning from the cozy-browser-sdk library to this one should imply minimal changes (see [transition doc](https://github.com/cozy/cozy-client-js/blob/master/docs/browser-sdk-transition.md]) )



Hack
----

### Install

You can clone the repository and install dependencies:

```sh
$ git clone https://github.com/cozy/cozy-client-js.git
$ cd cozy-client-js
$ npm install
```

:pushpin: If you use a node environment wrapper like [nvm] or [ndenv], don't forget to set your local node version before doing a `npm install`.


### Tests

Tests are run by [mocha] under the hood, and written using [should]. You can easily run the tests suite with:

```sh
$ cd cozy-client-js
$ npm run test
```

:pushpin: Don't forget to update / create new tests when you contribute to code to keep the app the consistent.


### Resources

All documentation is located in the `/docs` app directory. It provides an exhaustive documentation about workflows (installation, development, pull-requests…), architecture, code consistency, data structures, dependencies, and more.

Feel free to read it and fix / update it if needed, all comments and feedback to improve it are welcome!


### Open a Pull-Request

If you want to work on API and submit code modifications, feel free to open pull-requests! See the [contributing guide][contribute] for more information about how to properly open pull-requests.


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
