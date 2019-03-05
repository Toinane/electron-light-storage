const fs=require("fs"),path=require("path"),electron=require("electron");class ElectronLightStorage{constructor(){this.defaultPath=(electron.app||electron.remote.app).getPath("userData"),this.filePath=this.defaultPath+path.sep+"storage.json",this.defaultStore={}}set(t){if("object"!=typeof t)throw new TypeError("Excepted `store` to be of type `object`, got "+typeof t);if(Array.isArray(t))throw new TypeError("Excepted `store` to be of type `object`, got array");return fs.existsSync(this.defaultPath)||fs.mkdirSync(this.defaultPath),fs.writeFileSync(this.filePath,JSON.stringify(t),"utf8"),t}get(){return fs.existsSync(this.filePath)?JSON.parse(fs.readFileSync(this.filePath,"utf8")):this.defaultStore}reset(){return!!fs.existsSync(this.filePath)&&(fs.unlinkSync(this.filePath),!0)}}module.exports=ElectronLightStorage;