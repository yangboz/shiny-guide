## Supported Platforms

Electron Packager is known to run on the following **host** platforms:

* Windows (32/64 bit)
* OS X (also known as macOS)
* Linux (x86/x86_64)

It generates executables/bundles for the following **target** platforms:

* Windows (also known as `win32`, for both 32/64 bit)
* OS X (also known as `darwin`) / [Mac App Store](http://electron.atom.io/docs/v0.36.0/tutorial/mac-app-store-submission-guide/) (also known as `mas`)<sup>*</sup>
* Linux (for x86, x86_64, and armv7l architectures)

<sup>*</sup> *Note for OS X / MAS target bundles: the `.app` bundle can only be signed when building on a host OS X platform.*

## Installation

This module requires Node.js 4.0 or higher to run.

```sh
brew update && brew upgrade node && npm install -g npm
```

```sh
# for use in npm scripts
npm install electron-packager --save-dev

# for use from cli
npm install electron-packager -g
```


### Building Windows apps from non-Windows platforms

Building an Electron app for the Windows target platform requires editing the `Electron.exe` file.
Currently, Electron Packager uses [node-rcedit](https://github.com/atom/node-rcedit) to accomplish
this. A Windows executable is bundled in that Node package and needs to be run in order for this
functionality to work, so on non-Windows host platforms, [Wine](https://www.winehq.org/) 1.6 or
later needs to be installed. On OS X, it is installable via [Homebrew](http://brew.sh/).

## Usage

```sh
electron-packager . --all
```

### From the Command Line

Running electron-packager from the command line has this basic form:

```
electron-packager <sourcedir> <appname> --platform=<platform> --arch=<arch> [optional flags...]
```
