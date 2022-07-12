const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('Pic', 'root', '123456', {
  host: 'localhost',
  port: '20013',
  dialect: "mysql",
  timezone: "+08:00"
});

// try {
//   sequelize.authenticate().then(()=>{
//     console.log('success');
//   });
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

module.exports = sequelize