const inly = require('inly')
const path = require('path')
const cwd = process.cwd()
const name = 'nativescript-yoonit-camera-1.0.0.tgz'
const to = cwd
const from = path.join(cwd, name)

const extract = inly(from, to)
