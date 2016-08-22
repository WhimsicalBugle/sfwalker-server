var Sequelize = require('sequelize');

//the database "reporting" should already have been created in postgres
sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3],
      logging:  true,
      dialectOptions: {
        ssl: true
      }
    })
    //postgres://visicmtsolqsfl:-2UNJ6XVdXlJJLeIHzlkot_RDq@ec2-54-235-102-190.compute-1.amazonaws.com:5432/dfrqqjpqfcc7lp
// var sequelize = new Sequelize('postgres://localhost:5432/reporting');
// sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     dialectOptions: {
//         ssl: true
//     }
// });
//test connection
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Database connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

var Incident = sequelize.define('incident', {
  category: Sequelize.STRING,
  datetime: Sequelize.DATE,
  latitude: Sequelize.DECIMAL,
  longitude: Sequelize.DECIMAL
});

//create 'incident' table in the 'reporting' database, if it's missing
Incident.sync();

module.exports = Incident;
