const ora = require('ora');
const { quicktype, InputData, jsonInputForTargetLanguage } = require('quicktype-core');
const inquirer = require('inquirer');
const chalk = require('chalk');
const shell = require('shelljs');
const path = require('path');
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
async function generateTypes(url, typeName) {
  const spinner = ora('🚀 正在获取API数据...').start();

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API请求失败: ${response.statusText}`);
    }

    const jsonData = await response.json();
    spinner.text = '🔄 正在解析数据结构...';

    const sampleData = Array.isArray(jsonData) ? jsonData[0] : jsonData;

    spinner.text = '📝 正在生成类型定义...';
    const jsonInput = await jsonInputForTargetLanguage('typescript');
    await jsonInput.addSource({
      name: typeName,
      samples: [JSON.stringify(sampleData)],
    });

    const inputData = new InputData();
    inputData.addInput(jsonInput);

    spinner.text = '🎨 正在优化类型结构...';
    const { lines } = await quicktype({
      lang: 'typescript',
      inputData,
      alphabetizeProperties: true,
      rendererOptions: {
        'just-types': 'true',
        'explicit-unions': 'true',
      },
    });

    spinner.succeed(chalk.green('✨ 太棒了！类型定义生成成功！'));

    if (!lines || lines.length === 0) {
      throw new Error('⚠️ 生成的类型为空，请检查API返回数据');
    }

    return { lines };
  } catch (error) {
    spinner.fail(chalk.red('❌ 处理失败'));
    throw error;
  }
}

async function promptUser() {
  console.log(chalk.cyan('\n👋 欢迎使用类型生成工具！让我们开始吧~\n'));

  const questions = [
    {
      type: 'input',
      name: 'url',
      message: '🌐 请输入API URL地址:',
      validate: input => {
        try {
          new URL(input);
          return true;
        } catch {
          return '❌ URL格式不正确，请输入有效的URL';
        }
      },
    },
    {
      type: 'input',
      name: 'name',
      message: '📝 请输入类型名称:',
      default: 'ApiTypes',
      validate: input => {
        if (/^[A-Za-z][A-Za-z0-9]*$/.test(input)) {
          return true;
        }
        return '❌ 类型名称必须以字母开头，且只能包含字母和数字';
      },
    },
    {
      type: 'list',
      name: 'path',
      message: '📂 请选择保存位置:',
      choices: [
        { name: '💻 桌面', value: desktopPath },
        { name: '📁 当前目录', value: currentPath },
        { name: '🔍 自定义路径', value: 'custom' },
      ],
    },
  ];

  const answers = await inquirer.prompt(questions);

  if (answers.path === 'custom') {
    const { customPath } = await inquirer.prompt([
      {
        type: 'input',
        name: 'customPath',
        message: '📁 请输入保存路径:',
        default: currentPath,
        validate: input => {
          if (shell.test('-d', input)) {
            return true;
          }
          return '❌ 路径不存在，请输入有效的路径';
        },
      },
    ]);
    answers.path = customPath;
  }

  return answers;
}
module.exports = {
  generateTypes,
  promptUser,
};
