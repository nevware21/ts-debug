<h1 align="center">@nevware21 / ts-debug</h1>
<h2 align="center">Provides helper functions to support adding configurable debugging logging and support to your application or libraries.</h2>

![GitHub Workflow Status (main)](https://img.shields.io/github/actions/workflow/status/nevware21/ts-debug/ci.yml?branch=main)
[![codecov](https://codecov.io/gh/nevware21/ts-debug/branch/main/graph/badge.svg?token=KA05820FMO)](https://codecov.io/gh/nevware21/ts-debug)
[![npm version](https://badge.fury.io/js/%40nevware21%2Fts-debug.svg)](https://badge.fury.io/js/%40nevware21%2Fts-debug)
[![downloads](https://img.shields.io/npm/dt/%40nevware21/ts-debug.svg)](https://www.npmjs.com/package/%40nevware21/ts-debug)
[![downloads](https://img.shields.io/npm/dm/%40nevware21/ts-debug.svg)](https://www.npmjs.com/package/%40nevware21/ts-debug)

## Description

This package provides helper functions to support adding configurable debugging logging and support
to your application or libraries. The support is all built and tested using TypeScript with one of the
primary focuses of this package is to provide support for the creation of code that can be better minified, resulting in a smaller runtime payload which can directly assist with Page Load performance.

### Test Environments 
- Node (12, 14, 16, 18)
- Browser (Chromium - headless)
- Web Worker (Chromium - headless)

### Documentation and details

See the documentation [generated from source code](https://nevware21.github.io/ts-debug/typedoc/index.html) via typedoc for a full list and details of all of the available types, functions, interfaces with included examples.

See [Browser Support](#browser-support) for details on the supported browser environments.


| Type / Function       | Details
|-----------------------|------------------------------
| **Interfaces**
| [`IDbgProvider`](https://nevware21.github.io/ts-debug/typedoc/interfaces/IDbgProvider.html) | This package exports the `IDbgProvider` interface and provides some implementations which abstracts the implmentation from the helper functions which use it to provide minification support.

## Quickstart

Install the npm packare: `npm install @nevware21/ts-debug --save`

And then just import the helpers and use them.

### Simple Examples

TBD

## Release Notes

- [Releases](https://github.com/nevware21/ts-debug/releases)
- [Changelist Notes](./CHANGELIST.md)

## Browser Support

General support is currently set to ES5 supported runtimes higher.

![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | <center>9+ ✔</center> | Latest ✔ | Latest ✔ |

## Contributing

Read our [contributing guide](./CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.
