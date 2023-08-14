const fs = require("fs");
const { crc32 } = require("crc");
module.exports = {
  input: [
    "src/**/*.{js,jsx,vue}",
    // 不需要扫描的文件加!
    "!src/locales/**",
    "!**/node_modules/**",
  ],
  output: "./", //输出目录
  options: {
    debug: true,
    func: false,
    trans: false,
    lngs: ["zh", "en"],
    defaultLng: "zh",
    resource: {
      loadPath: "./src/locales/json/{{lng}}.json", //输入路径 (手动新建目录)
      savePath: "./src/locales/json/{{lng}}.json", //输出路径 (输出会根据输入路径内容自增, 不会覆盖已有的key)
      jsonIndent: 2,
      lineEnding: "\n",
    },
    removeUnusedKeys: true,
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: "{{",
      suffix: "}}",
    },
  },
  // 这里我们要实现将中文转换成crc格式, 通过crc格式key作为索引, 最终实现语言包的切换.
  transform: function customTransform(file, enc, done) {
    //自己通过该函数来加工key或value
    "use strict";
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    parser.parseFuncFromString(
      content,
      { list: ["lang"] },
      (key, options) => {
        options.defaultValue = key;
        let hashKey = `K${crc32(key).toString(16)}`; // crc32转换格式
        parser.set(hashKey, options);
      }
    );
    done();
  },
};