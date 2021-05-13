const Sequelize = require('sequelize');
const env = require('dotenv');
env.config();

const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASS}`, {
    host: `${process.env.DB_HOST}`,
    dialect: 'postgres'
  });

// Connect all models/tables in the database to a db object to have an access for everything via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
db.users = require('./models/user')(sequelize,Sequelize);
db.products = require('./models/products')(sequelize,Sequelize);
db.orders = require('./models/order')(sequelize,Sequelize);
db.orderItems = require('./models/orderItem')(sequelize,Sequelize);
db.categories = require('./models/category')(sequelize,Sequelize);
db.manufactures = require('./models/manufacture')(sequelize,Sequelize);
db.units = require('./models/unit')(sequelize,Sequelize);

// Relations
db.categories.hasMany(db.products, {foreignKey:'category_id'});
db.products.belongsTo(db.categories, {foreignKey:'category_id'});
db.manufactures.hasMany(db.products, {foreignKey:'manufacture_id'});
db.products.belongsTo(db.manufactures, {foreignKey:'manufacture_id'});
db.units.hasMany(db.products,{foreignKey:'unit_id'});
db.products.belongsTo(db.units,{foreignKey:'unit_id'});

module.exports = db;