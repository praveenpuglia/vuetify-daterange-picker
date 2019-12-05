# Development

## Setup

```sh
yarn
```

## Serve & Test

```sh
yarn serve
```

## Release to GitHub

I do releases using ZeitHQ / Release. Please install it if you don't have it by running

```sh
npm install -g release
```

Then release a tag.

```sh
release [major/minor/patch]
```

## Publishing to NPM

Login to npm via

```sh
npm login
```

Publish via

```sh
yarn publish
# Note - Use the current package.json version if you have already released a tag to GitHub.
```

Automatically takes care of building required files to be pushed. Check package.json for more details.
