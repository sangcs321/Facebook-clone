const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@Components': path.resolve(__dirname, 'src/Components'),
      '@Redux': path.resolve(__dirname, 'src/Redux'),
      '@Store': path.resolve(__dirname, 'src/Redux/Store/Store'),
      '@Pages': path.resolve(__dirname, 'src/Pages'),
      '@Layouts': path.resolve(__dirname, 'src/Layouts'),
      '@RTKQuery': path.resolve(__dirname, 'src/Redux/RTKQuery'),
      '@Constants': path.resolve(__dirname, 'src/Constants'),
      '@Slice': path.resolve(__dirname, 'src/Redux/Slice'),
    },
  },
};