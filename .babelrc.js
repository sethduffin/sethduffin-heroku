module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        alias: {
          public: './public',
        },
      },
    ],
  ],
};
