export class LocalStorage {
  constructor (prefix = 'cozy:oauth:', getLocalStorage = () => window.localStorage) {
    // We try to deref the localstorage, and if it fails (because the user has
    // deactivated its localstorage for instance) we fallback on a memory
    // storage.
    let storage
    try {
      storage = getLocalStorage()
    } catch (e) {
      storage = memStorage
    }
    this.storage = storage
    this.prefix = prefix
  }

  save (key, value) {
    return new Promise(resolve => resolve(
      this.storage.setItem(this.prefix + key, JSON.stringify(value))))
  }

  load (key) {
    return new Promise(resolve => {
      const item = this.storage.getItem(this.prefix + key)
      if (!item) {
        resolve()
      } else {
        resolve(JSON.parse(item))
      }
    })
  }

  delete (key) {
    return new Promise(resolve => resolve(
      this.storage.removeItem(this.prefix + key)))
  }

  clear () {
    return new Promise(resolve => {
      const storage = this.storage
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i)
        if (key.indexOf(this.prefix) === 0) {
          storage.removeItem(key)
        }
      }
      resolve()
    })
  }
}

export class MemoryStorage {
  constructor () {
    this.hash = {}
  }

  save (key, value) {
    return Promise.resolve(this.hash[key] = value)
  }

  load (key) {
    return Promise.resolve(this.hash[key])
  }

  delete (key) {
    return Promise.resolve(delete this.hash[key])
  }

  clear () {
    return Promise.resolve(this.hash = {})
  }
}

const memStorage = {
  _h: {},
  _k: [],
  length: 0,
  setItem (key, value) {
    if (!this._h.hasOwnProperty(key)) {
      this._k.push(key)
      this.length++
    }
    this._h[key] = value
  },
  getItem (key) {
    return this._h[key]
  },
  removeItem (key) {
    if (delete this._h[key]) {
      this._k.splice(this._k.indexOf(key), 1)
      this.length--
      return true
    }
    return false
  },
  key (index) {
    return this._k[index]
  }
}
