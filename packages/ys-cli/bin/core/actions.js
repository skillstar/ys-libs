const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');
const ora = require('ora'); // 确保引入 ora
const { generateTypes, promptUser } = require('./utils');
const inquirer = require('inquirer');
const os = require('os');

// 默认路径
const homedir = os.homedir();
const desktopPath =
  process.platform === 'win32'
    ? path.join(homedir, 'Desktop')
    : path.join(homedir, 'Public', 'Desktop');
const currentPath = process.cwd();

/**
 * 生成类型定义
 */
async function tyAction(options) {
  // 检查是否安装了VSCode
  const hasVSCode = shell.which('code');

  try {
    // 只在没有提供 URL 和 name 的情况下才调用 promptUser
    const config = options.url && options.name ? options : await promptUser(); // 判断是否有 url 和 name

    const { lines } = await generateTypes(config.url, config.name);

    const spinner = ora('💾 正在保存文件...').start();

    // 使用shelljs创建目录
    if (!shell.test('-d', config.path)) {
      shell.mkdir('-p', config.path);
    }

    const fullPath = path.join(config.path, `${config.name}.ts`);
    // 使用shelljs写入文件
    shell.ShellString(lines.join('\n')).to(fullPath);

    spinner.succeed(chalk.green('🎉 文件保存成功！'));

    console.log(chalk.cyan('\n📍 文件保存在:'), fullPath);
    console.log(chalk.yellow('\n👀 类型定义预览:\n'));
    console.log(chalk.gray('✨ ----------------------------------------'));
    console.log(lines.join('\n'));
    console.log(chalk.gray('✨ ----------------------------------------\n'));

    // 如果安装了VSCode，提供打开选项
    if (hasVSCode) {
      const { openFile } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'openFile',
          message: '🔍 是否要在VSCode中打开生成的文件？',
          default: false,
        },
      ]);

      if (openFile) {
        // 使用shelljs执行命令
        const result = shell.exec(`code "${fullPath}"`, { silent: true });
        if (result.code === 0) {
          console.log(chalk.green('\n📝 已在VSCode中打开文件'));
        } else {
          console.log(chalk.yellow('\n⚠️  无法自动打开文件，请手动打开查看'));
        }
      }
    }

    console.log(chalk.green('\n👋 感谢使用，祝您开发愉快！\n'));
  } catch (error) {
    console.error(chalk.red('\n❌ 错误:'), error.message);
    process.exit(1);
  }
}

module.exports = {
  tyAction,
};
