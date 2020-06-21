const lib = require('./lib')

;(async () => {

  const ret = await lib.findFileRecursivelyUp('ag.code-workspace', __dirname)

  debugger
  console.log(ret)

})()
