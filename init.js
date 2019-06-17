'use strict'

const path = require('path')
const R = require('ramda');
const chalk = require('chalk');

const check = R.curry((obj, key) => {
    if (typeof obj[key] === 'undefined') {
        return false
    }
    return true
})

const notInGlobal = key => !check(global)(key)
// const notInGlobal = !check(global)  // 不等于
// const notInGlobal = R.not(check(global))
// const notInGlobal = R.compose(R.not, check(global))
// const notInGlobal = R.pipe(check(global), R.not)

function globalBaseInitial(baseDir) {
    const _use = dir => require(path.resolve(baseDir, dir))

    if (notInGlobal('check')) {
        global.check = check
    }

    if (notInGlobal('Controller')) {
        global.C = global.Controller = _use('app/controller/base')
    }
    /**
     **带有行号的log
     */
    if (notInGlobal('l')) {
        global.l = (...args) => {
            try {
                throw new Error();
            } catch (error) {
                var optionString = error.stack.split("\n")[2];
                let regexMatch = optionString.match(/\((.*)\)/ig);
                console.log.apply(console, [chalk.green(regexMatch[0]), "\n"].concat(args));
            }
        }
    }

    if (notInGlobal('Service')) {
        global.S = global.Service = require('egg').Service
    }

    if (notInGlobal('use')) {
        global.use = dir => {
            dir = dir.replace(/\./g, path.sep)
            return _use(dir)
        }
    }

    /* 环境变量判断 */
    if (notInGlobal('DEV')) {
        global.DEV = process.env.NODE_ENV !== 'production'
    }

}

module.exports = {
    globalBaseInitial
}