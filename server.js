const express = require('express');
//The follwing imports sequelize from the connection.js file in the config folder
const sequelize = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

//The following will synchronize the sequelize models with the database schema prior to spinning up the server.
//Note that the force object is set to false to indicate that the exsiting tables in the database
//should not be dropped and recreated if they already exist
sequelize.sync({force: false}).then(() => {
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  });
});
