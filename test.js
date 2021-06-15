const lib = require('./lib')

;(async () => {

  const ret = await lib.findFileRecursivelyUp('ag.code-workspace', __dirname)

  console.log(ret)

})()
