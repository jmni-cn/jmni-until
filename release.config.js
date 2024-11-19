module.exports = {
    branches: ['main'], // 或指定需要发布的分支
    plugins: [
      '@semantic-release/commit-analyzer', // 分析提交信息，确定版本更新类型（major/minor/patch）
      '@semantic-release/release-notes-generator', // 生成发布说明
      [
        '@semantic-release/changelog', // 更新 CHANGELOG.md
        {
          changelogFile: 'CHANGELOG.md',
        },
      ],
      [
        '@semantic-release/npm', // 更新 package.json 的版本号
        {
          npmPublish: true, // 如果不需要发布到 npm，设为 false
        },
      ],
      [
        '@semantic-release/git', // 提交变更
        {
          assets: ['package.json', 'CHANGELOG.md'],
          message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        },
      ],
    ],
  };
  