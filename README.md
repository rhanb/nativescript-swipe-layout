# Develop a NativeScript plugin now (w/ TypeScript) [![Build Status](https://travis-ci.org/NativeScript/nativescript-plugin-seed.svg?branch=master)](https://travis-ci.org/NativeScript/nativescript-plugin-seed)

## Getting started

1. `git clone https://github.com/NathanWalker/nativescript-plugin-seed.git myplugin`
2. `cd myplugin/src`
3. `npm run postclone`
4. `npm run setup`
5. Continue with development (recommended) or usage setup

### Development setup
For easier development and debugging purposes continue with the following steps:

1. Make sure your plugin is removed as dependency from the demo project
2. In command prompt/terminal navigate to `src` folder and execute `npm run development.setup` - this will add a sym link to the plugin code in the demo project allowing you to do changes and review them in the demo without adding/removing the plugin. [Read more about npm link](https://docs.npmjs.com/cli/link)
3. Open `demo/package.json` and update `dependencies` key to add a dependency to your plugin:

```
"nativescript-yourplugin-name": "*"
```  

4. Open command prompt/terminal, navigate to `src` folder and run `tsc -w`
5. Open command prompt/terminal, navigate to `demo` folder and run `tns run android --syncAllFiles` or `tns run ios --syncAllFiles`
6. Now go and make a change to your plugin. It will be automatically applied to the demo project.

You can review any of the available options from the `tns` command line:

* [Emulate your project](https://github.com/NativeScript/nativescript-cli#emulate-your-project)
* [Run your project](https://github.com/NativeScript/nativescript-cli#run-your-project)
* [Full list of commands](https://github.com/NativeScript/nativescript-cli#the-commands)


### Usage setup
In addition, there some `demo` tasks defined in plugin's package.json which you can use to explicitly add/remove/install your plugin to the demo app. This is the scenario in which the users will use your plugin.

```
cd demo

// when developing, to ensure the latest code is built into the demo, it's a guarantee to remove the plugin and add it back
tns plugin remove nativescript-yourplugin
tns plugin add ..

// manual platform adds
tns platform add ios
// and/or
tns platform add android
```

This seed expands on several things [presented here](http://developer.telerik.com/featured/creating-nativescript-plugins-in-typescript/).


## Usage

The seed is prepared to allow you to test and try out your plugin via the `demo` folder.
Additionally it provides a proper `.gitignore` to keep GitHub tidy as well as `.npmignore` to ensure everyone is happy when you publish your plugin via npm.

### Linking to CocoaPod or Android Arsenal plugins

You will want to create these folders and files in the root:

```
platforms --
  ios --
    Podfile
  android --
    include.gradle
```

Doing so will open up those native apis to your plugin :)

Take a look at these existing plugins for how that can be done very simply:

* [nativescript-cardview](https://github.com/bradmartin/nativescript-cardview/tree/master/platforms)
* [nativescript-floatingactionbutton](https://github.com/bradmartin/nativescript-floatingactionbutton/tree/master/platforms)


## Unittesting
This plugin automatically adds Jasmine-based unittest support to your plugin.
Open `demo/app/tests/tests.js` and adjust its contents.

You can read more about this topic [here](https://docs.nativescript.org/tooling/testing).

Once you're ready to test your plugin's API execute one of these commands in the plugin root:

```
npm run test.ios
npm run test.android
```

## Publish

When you have everything ready to publish:

* Bump the version number in `src/package.json`
* Go to `publish` and execute `publish.sh`

If you just want to create a package, go to `publish` and execute `pack.sh`. The package will be created in `publish/package` folder.

**NOTE**: To run bash script on Windows you can install [GIT SCM](https://git-for-windows.github.io/) and use Git Bash.

## TravisCI

The plugin structure comes with fully functional .travis.yml file that deploys the testing app on Android emulator and as a subsequent step runs the tests from [UnitTesting section](https://github.com/NativeScript/nativescript-plugin-seed#unittesting). All you have to do, after cloning the repo and implementing your plugin and tests, is to sign up at [https://travis-ci.org/](https://travis-ci.org/). Then enable your plugin's repo on "https://travis-ci.org/profile/<your github user\>" and that's it. Next time a PR is openend or change is commited to a branch TravisCI will trigger a build testing the code.

To properly show current build status you will have to edit the badge at the start of the README.md file so it matches your repo, user and branch. 
