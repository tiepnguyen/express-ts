import fs from 'fs'

let cache: Dictionary<string> = {}

function compile(template: string, params = {}) {
  const keys = Object.keys(params)
  const values = Object.values(params)
  return new Function(...keys, 'return `' + template + '`')(...values)
}

function render(path: string, vars = {}) {
  return new Promise((resolve, reject) => {
    if (cache[path]) {
      return resolve(compile(cache[path], vars))
    }
    fs.readFile(path, (error, blob) => {
      if (error) {
        return reject(error)
      }
      cache[path] = blob.toString()
      resolve(compile(cache[path], vars))
    })
  })
}

export default function(path: string, vars: object, callback: any) {
  render(path, vars)
    .then((result) => {
      callback(null, result)
    })
    .catch(callback)
}
