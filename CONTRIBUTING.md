How to contribute to cozy-client-js?
====================================

Thank you for your interest in contributing to Cozy! There are many ways to contribute, and we appreciate all of them.


Security Issues
---------------

If you discover a security issue, please bring it to our attention right away! Please **DO NOT** file a public issue, instead send your report privately to security AT cozycloud DOT cc.

Security reports are greatly appreciated and we will publicly thank you for it. We currently do not offer a paid security bounty program, but are not ruling it out in the future.


Bug Reports
-----------

While bugs are unfortunate, they're a reality in software. We can't fix what we don't know about, so please report liberally. If you're not sure if something is a bug or not, feel free to file a bug anyway.

Opening an issue is as easy as following [this link][issues] and filling out the fields. Here are some things you can write about your bug:

- A short summary
- What did you try, step by step?
- What did you expect?
- What did happen instead?
- What is the version of the cozy-client-js?


Hack
----

This section is only if you want to modify the cozy-client-js library. If you just want to make an app, head over to [the doc](./docs/README.md).

### Install

You can clone the repository and install dependencies:

```sh
$ git clone https://github.com/cozy/cozy-client-js.git
$ cd cozy-client-js
$ npm install
```

### Build

cozy-client-js is written in ES7 and built using webpack and babel, you can run a build with `npm run build`

### Lint

cozy-client-js is linted using [ESLint](https://eslint.org) and [config-eslint-cozy-app](https://www.npmjs.com/package/eslint-config-cozy-app). Lint will run when building `cozy-client-js` but you can also run it manually with `npm run lint`.

### Test

Tests are written in ES7, use [assert] and run using [webpack-mocha].

They are two types of test :

- In **test/unit**, we mock `fetch` and ensure each function calls the proper route(s) and parse the results as expected if the server is correct.
- In **test/integration**, we run a complex scenario against both **v2** and **v3** cozy and ensure compatibility.

To run integration tests, you will need one or both versions of cozy started. Have a look at the [.travis.yml](./.travis.yml) to see how it can be done.


```sh
$ cd cozy-client-js
$ npm run test:unit # unit tests only
$ npm run test:v2   # integration tests against a node.js cozy
$ npm run test:v3   # integration tests against a go cozy
$ npm run test      # all of the above
```

#### Run tests on local environment

To run unit tests, there is nothing special, just run:

```
yarn test:unit
```

To run integration tests, you need to communicate with a [cozy-stack](https://github.com/cozy/cozy-stack) and therefore you need to get a oauth token. Run the following command and adapt commands for you own needs:

```
./cozy-stack serve
./cozy-stack instances add --dev --passphrase "cozy" "cozy.tools:8080"
./cozy-stack instances client-oauth cozy.tools:8080 http://localhost test-app test-app
./cozy-stack instances token-oauth cozy.tools:8080 <the client token from previous command> 'io.cozy.files io.cozy.testobject io.cozy.testobject2 datastrings1 io.cozy.jobs io.cozy.queues'
```

It runs the cozy-stack's server, then creates a new instance with the passphrase *"cozy"* accessible on *"cozy.tools:8080"*. `client-oauth` creates a new client app and gives back an application token. Finally `token-oauth` creates an access token with permissions for all listed doctypes.

When you have an access token, you can run integration tests on your local environment with command like this:

```
COZY_STACK_TOKEN=<the access token> NODE_ENV=test NODE_TARGET=node COZY_STACK_VERSION=3 COZY_STACK_URL=http://cozy.tools:8080 mocha-webpack 'test/integration/**.js'
```


### Resources

All documentation is located in the `/docs` app directory.

Feel free to read it and fix / update it if needed, all comments and feedback to improve it are welcome!

If you add a function or change the behaviour of an existing one, doc should be updated to reflect the change.


Pull Requests
-------------

Please keep in mind that:

- Pull-Requests point to the `development` branch
- You need to cover your code and feature by tests
- You may add documentation in the `/docs` directory to explain your choices if needed
- We recommend to use [task lists][checkbox] to explain steps / features in your Pull-Request description
- you do _not_ need to build the library to submit a PR


### Workflow

Pull requests are the primary mechanism we use to change Cozy. GitHub itself has some [great documentation][pr] on using the Pull Request feature. We use the _fork and pull_ model described there.

#### Step 1: Fork

Fork the project on GitHub and [check out your copy locally][forking].

```
$ git clone github.com/cozy/cozy-client-js.git
$ cd cozy-client-js
$ git remote add fork git://github.com/yourusername/cozy-client-js.git
```

#### Step 2: Branch

Create a branch and start hacking:

```
$ git checkout -b my-branch origin/development
```

#### Step 3: Code

Well, we think you know how to do that. Just be sure to follow the coding guidelines from the community ([standard JS][stdjs], comment the code, etc).

#### Step 4: Test

Don't forget to add tests and be sure they are green:

```
$ cd cozy-client-js
$ npm run test
```

#### Step 5: Commit

Writing [good commit messages][commitmsg] is important. A commit message should describe what changed and why.

#### Step 6: Rebase

Use `git rebase` (_not_ `git merge`) to sync your work from time to time.

```
$ git fetch origin
$ git rebase origin/development my-branch
```

#### Step 7: Push

```
$ git push -u fork my-branch
```

Go to https://github.com/username/cozy-client-js and select your branch. Click the 'Pull Request' button and fill out the form. **Do not forget** to select the `development` branch as base branch.

Alternatively, you can use [hub] to open the pull request from your terminal:

```
$ git pull-request -b development -m "My PR message" -o
```

Pull requests are usually reviewed within a few days. If there are comments to address, apply your changes in a separate commit and push that to your branch. Post a comment in the pull request afterwards; GitHub doesn't send out notifications when you add commits.


Writing documentation
---------------------

Documentation improvements are very welcome. We try to keep a good documentation in the `/docs` folder. But, you know, we are developers, we can forget to document important stuff that look obvious to us. And documentation can always be improved.


Community
---------

You can help us by making our community even more vibrant. For example, you can write a blog post, take some videos, answer the questions on [the forum][forum], organize new meetups, and speak about what you like in Cozy!



[issues]: https://github.com/cozy/cozy-client-js/issues/new
[pr]: https://help.github.com/categories/collaborating-with-issues-and-pull-requests/
[forking]: http://blog.campoy.cat/2014/03/github-and-go-forking-pull-requests-and.html
[stdjs]: http://standardjs.com/
[commitmsg]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
[localization]: https://github.com/cozy/cozy-client-js/blob/master/README.md#localization
[hub]: https://hub.github.com/
[forum]: https://forum.cozy.io/
