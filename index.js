const fs = require('fs');
const path = require('path');

const electron = require('electron');

class ElectronLightStorage {
  constructor() {
    this.defaultPath = (electron.app || electron.remote.app).getPath('userData');
    this.filePath = this.defaultPath + path.sep + 'storage.json';
    this.defaultStore = {};
  }

  set(store) {
    if(typeof store !== 'object') {
      throw new TypeError('Excepted `store` to be of type `object`, got ' + (typeof store));
    }

    if(Array.isArray(store)) {
      throw new TypeError('Excepted `store` to be of type `object`, got array');
    }

    if(!fs.existsSync(this.defaultPath)) {
      fs.mkdirSync(this.defaultPath);
    }
    
    fs.writeFileSync(this.filePath, JSON.stringify(store), 'utf8');

    return store;
  }

  get() {
    if(!fs.existsSync(this.filePath)) {
      return this.defaultStore;
    }

    return JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
  }

  reset() {
    if(!fs.existsSync(this.filePath)) {

      return false;
    }

    fs.unlinkSync(this.filePath);

    return true;
  }
}

module.exports = ElectronLightStorage;