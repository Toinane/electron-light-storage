const assert = require('assert')
const ElectronLightStorage = require('./index')

const storage = new ElectronLightStorage()
const payload = {'assert': 'should be good.'}
const secondPayload = {'reset': 'old payload'}

// reset any previous storage
storage.reset()

describe('Set Storage', () => {
  it('Should throw error when the value is not correct', () => {
    assert.throws(() => storage.set(1), 'TypeError: Excepted `store` to be of type `object`, got number')
    assert.throws(() => storage.set('hello'), 'TypeError: Excepted `store` to be of type `object`, got string')
    assert.throws(() => storage.set(new Array()), 'TypeError: Excepted `store` to be of type `object`, got array')
    assert.throws(() => storage.set([]), 'TypeError: Excepted `store` to be of type `object`, got array')
    assert.throws(() => storage.set(() => 'Hi'), 'TypeError: Excepted `store` to be of type `object`, got function')
  })

  it('Should set object', () => {
    assert.deepEqual(storage.set(payload), payload)
  })

  it('Should get object', () => {
    assert.deepEqual(storage.get(), payload)
  })

  it('Should reset object', () => {
    assert.deepEqual(storage.get(), payload)
    storage.set(secondPayload);
    assert.deepEqual(storage.get(), secondPayload)
    storage.reset()
    it('Should get object', () => {
      assert.deepEqual(storage.get(), {});
    })
  })

})