const fs = require('fs');
const path = require('path');

const electron = require('electron');

function deepMergeObject(...objects) {
    const isObject = obj => obj && typeof obj === 'object';

    return objects.reduce((prev, obj) => {
        Object.keys(obj).forEach(key => {
            const pVal = prev[key];
            const oVal = obj[key];

            if (Array.isArray(pVal) && Array.isArray(oVal))
                prev[key] = pVal.concat(...oVal);
            else if (isObject(pVal) && isObject(oVal)) {
                prev[key] = deepMergeObject(pVal, oVal);
            } else prev[key] = oVal;
        });

        return prev;
    }, {});
}

class ElectronLightStorage {
    constructor() {
        this.defaultPath = (electron.app || electron.remote.app).getPath(
            'userData'
        );
        this.filePath = this.defaultPath + path.sep + 'storage.json';
        this.defaultStore = {};
        this.store = {};

        if (!fs.existsSync(this.defaultPath)) fs.mkdirSync(this.defaultPath);
        if (!fs.existsSync(this.filePath)) this.set(this.defaultStore);
        else this.get();
    }

    set(updatingStore) {
        if (typeof updatingStore !== 'object') {
            throw new TypeError(
                'Excepted `store` to be of type `object`, got ' +
                    typeof updatingStore
            );
        }

        if (Array.isArray(updatingStore)) {
            throw new TypeError(
                'Excepted `store` to be of type `object`, got array'
            );
        }

        this.store = deepMergeObject(this.store, updatingStore);
        fs.writeFileSync(this.filePath, JSON.stringify(this.store), 'utf8');

        return this.store;
    }

    get(name = undefined) {
        if (!this.store.length) {
            if (!fs.existsSync(this.filePath)) this.store = this.defaultStore;
            else
                this.store = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
        }

        if (name) {
            return this.store[name] || this.defaultStore;
        }

        return this.store;
    }

    reset() {
        this.store = this.defaultStore;
        if (fs.existsSync(this.filePath)) fs.unlinkSync(this.filePath);

        return this.store;
    }
}

module.exports = ElectronLightStorage;
