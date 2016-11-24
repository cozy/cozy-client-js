export default function mockTokenRetrieve () {
  if (typeof global.window === 'undefined') global.window = {}
  let listener = null
  global.window.addEventListener = (n, l) => { listener = l }
  global.window.removeEventListener = () => null
  global.window.parent = {}
  global.window.location = {origin: 'fakecozy.local'}
  global.window.parent.postMessage = function (payload, origin) {
    if (payload.action === 'getToken' && origin === 'fakecozy.local') {
      listener({
        data: {
          appName: process.env.NAME,
          token: process.env.TOKEN
        }
      })
    }
  }
}
