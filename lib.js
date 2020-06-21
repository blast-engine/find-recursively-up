const fs = require('fs')
const path = require('path')

const findDirectoryRecursivelyUp = async (startingDir, check) => {
  const root = path.parse(startingDir).root
  const resolvedStartingDir = path.resolve(startingDir)
  
  const found = await check(resolvedStartingDir)

  if (found) return resolvedStartingDir
  else if (resolvedStartingDir === root) return null
  else return findDirectoryRecursivelyUp(path.resolve(resolvedStartingDir, '..'), check)
}

const findFileRecursivelyUp = async (name, startingDir) => {
  if (!name || !startingDir) throw new Error('need name and startingDir')

  const dir = await findDirectoryRecursivelyUp(
    startingDir,
    async dir => fs.existsSync(path.resolve(dir, name))
  )
  
  if (!dir) return null
  return path.resolve(dir, name)
}

module.exports = { 
  findDirectoryRecursivelyUp,
  findFileRecursivelyUp
}

