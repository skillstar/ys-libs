#!/usr/bin/env node
const { program } = require('commander');
const tyOptions = require('./core/tyOptions');
const packageJson = require('../package.json');
//执行type的options
tyOptions(packageJson);

program.parse(process.argv);
