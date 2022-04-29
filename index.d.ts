declare class ElectronLightStorage {
    constructor();
    set(updatingStore: Object): Object;
    get(name: string): Object;
    reset(): Object;
}

export = ElectronLightStorage;
