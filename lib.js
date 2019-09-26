const fs = require('fs')
const path = require('path')

const findDirectoryRecursivelyUp = async (dir, check) => {

  const root = path.parse(process.cwd()).root
  const resolved = path.resolve(dir)
  
  const found = await check(resolved)

  if (found) return resolved
  else if (resolved === root) return null
  else return findDirectoryRecursivelyUp(path.resolve(resolved, '..'), check)

}

const findFileRecursivelyUp = async name => {
  
  const dir = await findDirectoryRecursivelyUp(
    process.cwd(),
    async dir => fs.existsSync(path.resolve(dir, name))
  )
  
  if (!dir) return null

  return path.resolve(dir, name)

}

module.exports = { 
  findDirectoryRecursivelyUp,
  findFileRecursivelyUp
}

