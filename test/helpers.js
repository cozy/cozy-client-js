export function randomGenerator(seed = Math.random()) {
  let fn = function rand() {
    var x = Math.sin(seed++) * 10000
    return x - Math.floor(x)
  }
  fn.seed = seed
  return fn
}
