import sequelize from './db.js'; 
import { DataTypes } from 'sequelize';

/* Model Definitions */

export const ShortLink = sequelize.define('short_link', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false }
});

export default { ShortLink };

