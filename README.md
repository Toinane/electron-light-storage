# electron-light-storage
> Lightweigth Electron storage package

You probably need to save data for your Electron application. But you don't want a package that's too elaborate. That's good because I needed a small package with no dependency to allow me that, this is the purpose of this package!

[![NPM](https://nodei.co/npm/electron-light-storage.png?downloads=true&downloadRank=true)](https://nodei.co/npm/electron-light-storage/)

[![npm version](https://badge.fury.io/js/electron-light-storage.svg)](https://badge.fury.io/js/electron-light-storage)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Toinane/electron-light-storage)
[![issues](https://img.shields.io/github/issues/Toinane/electron-light-storage.svg)](https://github.com/Toinane/electron-light-storage)
[![forks](https://img.shields.io/github/forks/Toinane/electron-light-storage.svg)](https://github.com/Toinane/electron-light-storage)
[![stars](https://img.shields.io/github/stars/Toinane/electron-light-storage.svg)](https://github.com/Toinane/electron-light-storage)

## Installation

`yarn add electron-light-storage`

## Usage

```javascript
const Storage = require('electron-light-storage');
const store = new Storage();

// Set storage
store.set({'say': 'hi Github!'});

// Get storage
store.get();
//=> {'say': 'hi Github!'}

// Reset storage
store.reset();
//=> true
```

## API

### storage.set(data: Object): Object
You have to pass only Object in this method.

### storage.get(): Object
It will return you the Object saved.

### storage.reset(): Boolean
It will return a boolean wich is properly reset.

## Licence
MIT @Toinane
