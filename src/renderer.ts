import fs from 'fs'

function render(template: string, params = {}) {
  const keys = Object.keys(params)
  const values = Object.values(params)
  return new Function(...keys, 'return `' + template + '`')(...values)
}

export default (path: string, vars: object, callback: any) => {
  fs.readFile(path, (error, content) => {
    const rendered = render(content.toString(), vars)
    return callback(null, rendered)
  })
}
