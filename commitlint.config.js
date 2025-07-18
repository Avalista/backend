module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^(feat|fix|docs|style|refactor|test|chore|wip): (.+)\. \(#\d+\)$/,
      headerCorrespondence: ['type', 'subject'],
    },
  },
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'wip'],
    ],
    'references-empty': [2, 'never'],
  },
};
