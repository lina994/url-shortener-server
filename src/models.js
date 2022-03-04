import sequelize from './db.js'; 
import { DataTypes } from 'sequelize';

/* Model Definitions */

export const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  // email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, defaultValue: "", allowNull: false }
});

export const CustomShortLink = sequelize.define('custom_short_link', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  clicks: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false }
});

export const ShortLink = sequelize.define('short_link', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false }
});

/* Associations */

User.hasMany(CustomShortLink);
CustomShortLink.belongsTo(User);


export default { User, CustomShortLink, ShortLink };

