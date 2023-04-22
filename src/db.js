/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
require('dotenv').config();
const {Sequelize, Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const StoreErrorMSGs = require('./models/utils/Store-ErrorMSGs');
const { DB_LOCAL,  DB_DEPLOY } = process.env;

const sequelize = new Sequelize(
    DB_LOCAL || DB_DEPLOY ,
    {
      logging: false,
      native: false,
    },
);




const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
    .filter(
        (file) =>
          file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
    )
    .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
const entries = Object.entries(sequelize.models);
const capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);


// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  Ingredient, Recipe, IngredientsRecipes, IngredientsMenuItems, MenuItem,
  Role, User, Password, Tag, TagsMenuItems, Order, OrdersMenu, Store,
  Review, Token
} = sequelize.models;

//! Relationships


/*

Role.belongsToMany( User, { through: UsersRoles });
User.hasOne( Role, { through: UsersRoles } );

*/

//? Store.hasMany(Tag, { foreignKey: 'store_id' })     //Podría ir
Tag.belongsTo(Store, { foreignKey: 'store_id' });
User.belongsTo(Role, { foreignKey: 'roleId' });
User.hasOne(Store, { foreignKey: 'ownerId' });
Store.belongsTo(User, { foreignKey: 'ownerId' });
Ingredient.belongsTo(Store, { foreignKey: 'store_id' });
MenuItem.belongsTo(Store, { foreignKey: 'store_id' });
Order.belongsTo(Store, { foreignKey: 'store_id' });
Recipe.belongsTo(Store, { foreignKey: 'store_id' });
Password.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

Order.belongsToMany( MenuItem, { through: OrdersMenu })
MenuItem.belongsToMany( Order, { through: OrdersMenu })

//! Comentar para poder usar Seeder CreateReviews
Review.belongsTo(OrdersMenu);
OrdersMenu.hasMany(Review);
//!

MenuItem.hasMany(Review);
Review.belongsTo(MenuItem);

Recipe.belongsToMany( Ingredient, { through: IngredientsRecipes });
Ingredient.belongsToMany( Recipe, { through: IngredientsRecipes });

MenuItem.belongsToMany( Ingredient, { through: IngredientsMenuItems}); //, foreignKey: 'menuItem_id'
Ingredient.belongsToMany( MenuItem, { through: IngredientsMenuItems}); //, foreignKey: 'ingredient_id' 

Tag.belongsToMany( MenuItem, { through: TagsMenuItems, onDelete: 'CASCADE' } )
MenuItem.belongsToMany( Tag, { through: TagsMenuItems } )

module.exports = {
  ...sequelize.models,
  Op, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
