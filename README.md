# Develop a NativeScript plugin now (w/ TypeScript) [![Build Status](https://travis-ci.org/NativeScript/nativescript-plugin-seed.svg?branch=master)](https://travis-ci.org/NativeScript/nativescript-plugin-seed)

* [What is NativeScript plugin seed?](#WhatisaNpluginseed)
* [Plugin folder structure](#PluginFolderStructure)
* [Getting started](#Gettingstarted)
	* [Development setup](#Developmentsetup)
	* [Usage setup](#Usagesetup)
* [Linking to CocoaPod or Android Arsenal plugins](#LinkingtoCocoaPodorAndroidArsenalplugins)
* [Unittesting](#Unittesting)
* [Publish to NPM](#PublishtoNPM)
* [TravisCI](#TravisCI)

##  1. <a name='WhatisaNativeScriptpluginseed'></a>What is NativeScript plugin seed?

The NativeScript plugin seed is built to be used as a starting point by NativeScript plugin developers. It expands on several things [presented here](http://developer.telerik.com/featured/creating-nativescript-plugins-in-typescript/).
What does the seed give you out of the box?
* the plugin structure with option for easy development and debugging (see [Development setup section](#Developmentsetup) below)
* a simple working plugin
* a demo project working with the plugin. It is useful during development and for running tests via Travis CI
* plugin tests
* a guideline how to structure your plugin README file that will be published to NPM
* a shell script to create your plugin package
* a proper `.gitignore` to keep GitHub tidy 
* a proper `.npmignore` to ensure everyone is happy when you publish your plugin to NPM.

![Plugin seed demo](https://github.com/NativeScript/nativescript-plugin-seed/blob/master/screenshots/demo.png?raw=true)

##  2. <a name='PluginFolderStructure'></a>Plugin folder structure 

|Folder/File name| Description
|---|---|
|demo| The plugin demo source code|
|demo/tests| The tests for your plugin|
|src| The plugin source code|
|src/ui|The plugin UI (for UI plugins). If your plugin doesn't have any UI, you can delete this folder|
|src/platform/android| Plugin Android specific configuration|
|src/platform/ios|Plugin ios specific configuration|
|src/README|Your plugin README stub explaining how other developers can use your plugin in their applications. Used when you publish your plugin to NPM. On postclone step, the README in the root is replaced with this one.|
|src/scripts|The postclone script run when you execute `npm run postclone`. Feel free to delete it after you have executed the postclone step from the [Getting started](#Gettingstarted) section|
|publish|Contains a shell script to create and publish your package. Read more on creating a package and publishing in the [Publish to NPM](#Publishtonpm) section|

##  3. <a name='Gettingstarted'></a>Getting started

1. Open command prompt/terminal and execute `git clone https://github.com/NativeScript/nativescript-plugin-seed myplugin` to clone the plugin seed repository into `myplugin` folder.
2. Go to `myplugin/src` folder using `cd myplugin/src`
3. Execute `npm run postclone` to:
    * configure your github username - it will be changed in the package.json for you
    * configure your plugin name - all files and classes in the seed will be renamed for you
    * stub your plugin README file
    * create a new repository for your plugin

Now you can continue with the development of your plugin by using the [Development setup](#Developmentsetup) described below.
If you just want to install the plugin and run the demo, continue with [Usage setup](#Usagesetup).

###  3.1. <a name='Developmentsetup'></a>Development setup
For easier development and debugging purposes continue with the following steps:

1. Make sure your plugin is not added as dependency in the demo project (check `dependencies` in `demo/package.json`)
2. In command prompt/terminal navigate to `src` folder and execute `npm run development.setup` - this will install plugin and demo dependencies and will add a sym link to the plugin code in the demo project allowing you to do changes and review them in the demo without adding/removing the plugin every time you make a change. [Read more about npm link](https://docs.npmjs.com/cli/link).
3. Open `demo/package.json` and update `dependencies` key to add a dependency to your plugin:

```
"nativescript-yourplugin": "*"
```  

4. Open command prompt/terminal, navigate to `src` folder and run `tsc -w`.
5. Open command prompt/terminal, navigate to `demo` folder and run `tns run android --syncAllFiles` or `tns run ios --syncAllFiles`.
6. Now go and make a change to your plugin. It will be automatically applied to the demo project.

###  3.2. <a name='Usagesetup'></a>Usage setup
In case you just want to install the plugin and run the demo continue with the following steps:

1. Open command prompt/terminal and navigate to `src` folder.
2. Execute `npm run setupandinstall` to install plugin and demo dependencies and to install plugin to the demo.
3. Navigate to `demo` folder and execute `tns run android` or `tns run ios` to preview the demo in emulator.

##  4. <a name='Usage'></a>Linking to CocoaPod or Android Arsenal plugins

You will want to create these folders and files in the `src` folder in order to use native APIs:

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


##  5. <a name='Unittesting'></a>Unittesting
The plugin seed automatically adds Jasmine-based unittest support to your plugin.
Open `demo/app/tests/tests.js` and adjust its contents as you wish.

You can read more about this topic [here](https://docs.nativescript.org/tooling/testing).

Once you're ready to test your plugin's API go to `src` folder and execute one of these commands:

```
npm run test.ios
npm run test.android
```

##  6. <a name='PublishtoNPM'></a>Publish to NPM

When you have everything ready to publish:

* Bump the version number in `src/package.json`
* Go to `publish` and execute `publish.sh`

If you just want to create a package, go to `publish` folder and execute `pack.sh`. The package will be created in `publish/package` folder.

**NOTE**: To run bash script on Windows you can install [GIT SCM](https://git-for-windows.github.io/) and use Git Bash.

##  7. <a name='TravisCI'></a>TravisCI

The plugin structure comes with fully functional .travis.yml file that deploys the testing app on Android emulator and as a subsequent step runs the tests from [UnitTesting section](#Unittesting). All you have to do, after cloning the repo and implementing your plugin and tests, is to sign up at [https://travis-ci.org/](https://travis-ci.org/). Then enable your plugin's repo on "https://travis-ci.org/profile/<your github user\>" and that's it. Next time a PR is openend or change is commited to a branch TravisCI will trigger a build testing the code.

To properly show current build status you will have to edit the badge at the start of the README.md file so it matches your repo, user and branch. 
