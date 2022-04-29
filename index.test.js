const assert = require("assert");
const ElectronLightStorage = require("./dist/index");

const storage = new ElectronLightStorage();
const payload = { get: "should be good." };
const secondPayload = { reset: "old payload" };
const replacepayload = { get: "its different now." };

// reset any previous storage
storage.reset();

describe("Set Storage", () => {
    it("Should throw error when the value is not correct", () => {
        assert.throws(
            () => storage.set(1),
            "TypeError: Excepted `store` to be of type `object`, got number"
        );
        assert.throws(
            () => storage.set("hello"),
            "TypeError: Excepted `store` to be of type `object`, got string"
        );
        assert.throws(
            () => storage.set(new Array()),
            "TypeError: Excepted `store` to be of type `object`, got array"
        );
        assert.throws(
            () => storage.set([]),
            "TypeError: Excepted `store` to be of type `object`, got array"
        );
        assert.throws(
            () => storage.set(() => "Hi"),
            "TypeError: Excepted `store` to be of type `object`, got function"
        );
    });

    it("Should set object", () => {
        assert.deepEqual(storage.set(payload), payload);
    });

    it("Should get object", () => {
        assert.deepEqual(storage.get(), payload);
    });

    it("Should get empty object from wrong name", () => {
        assert.deepEqual(storage.get("wrong"), {});
    });

    it("Should get object from name", () => {
        assert.deepEqual(storage.get("get"), payload.get);
    });

    it("Should reset object", () => {
        assert.deepEqual(storage.get(), payload);
        storage.reset();
        assert.deepEqual(storage.get(), {});
    });

    it("Should add object", () => {
        storage.set(payload);
        storage.set(secondPayload);
        assert.deepEqual(storage.get(), { ...payload, ...secondPayload });
    });

    it("Should update object", () => {
        storage.reset();
        storage.set(payload);
        assert.deepEqual(storage.get(), payload);
        storage.set(secondPayload);
        assert.deepEqual(storage.get(), { ...payload, ...secondPayload });
        storage.set(replacepayload);
        assert.deepEqual(storage.get(), {
            ...replacepayload,
            ...secondPayload,
        });
        storage.reset();
        assert.deepEqual(storage.get(), {});
    });

    it("Should update deep object", () => {
        const deepObject = {
            user: {
                surname: "Toinane",
                profile: {
                    id: 24,
                },
            },
        };

        const deepNewObject = {
            user: {
                profile: {
                    isOnline: true,
                },
                group: ["admin"],
            },
            settings: true,
        };

        const deepResultObject = {
            user: {
                surname: "Toinane",
                profile: {
                    id: 24,
                    isOnline: true,
                },
                group: ["admin"],
            },
            settings: true,
        };

        storage.set(deepObject);
        assert.deepEqual(storage.get(), deepObject);
        storage.set(deepNewObject);
        assert.deepEqual(storage.get(), deepResultObject);
    });

    it("Should retrieve save from file", () => {
        storage.reset();
        storage.set(replacepayload);

        const store = new ElectronLightStorage();
        assert.deepEqual(store.get(), replacepayload);
    });
});
