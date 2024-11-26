const { program } = require('commander');
/*------为了漂亮的title------*/
const figlet = require('figlet');
const versionStr = figlet.textSync('TypeDeclarator');
const Printer = require('@darkobits/lolcatjs');
/*-------为了漂亮title------*/
const { tyAction } = require('./actions');
function tyOptions(version) {
  const transformed = Printer.fromString(
    ` \n   ✨ TypeDeclarator项目脚手架 ${version} ✨ \n ${versionStr}`
  );

  program
    .version(transformed)
    .description('🚀 从API URL生成TypeScript类型定义')
    .option('-u, --url <url>', 'API URL地址')
    .option('-n, --name <name>', '生成的类型名称')
    .option('-p, --path <path>', '保存路径')
    .action(tyAction);
}

module.exports = tyOptions;
