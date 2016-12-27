export class LocalStorage {
  constructor (storage, prefix) {
    if (!storage && typeof window !== 'undefined') {
      storage = window.localStorage
    }
    this.storage = storage
    this.prefix = prefix || 'cozy:oauth:'
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
    this.hash = Object.create(null)
  }

  save (key, value) {
    this.hash[key] = value
    return Promise.resolve(value)
  }

  load (key) {
    let value
    if (this.hash.hasOwnProperty(key)) {
      value = this.hash[key]
    }
    return Promise.resolve(value)
  }

  delete (key) {
    delete this.hash[key]
    return Promise.resolve()
  }

  clear () {
    this.hash = Object.create(null)
    return Promise.resolve()
  }
}
