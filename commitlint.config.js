module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 放宽对 `chore(release):` 提交类型的限制
    'scope-enum': [2, 'always', ['release']],
    'scope-case': [0], // 允许 `scope` 小写
    'subject-case': [0], // 允许 `subject` 中的大小写
  },
  ignores: [
    (commit) => commit.includes('[skip ci]'),
  ],
};
