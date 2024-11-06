'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Testimonials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Documents, {
        foreignKey: 'reference_id', // Assuming reference_id is the foreign key in the Documents table referencing the Blogs table
        scope: {
          reference_type: 'farmer_testimonials', // Assuming reference_type is the column specifying the type of reference
        },
        as: 'documents', // Alias to access documents associated with a blog
      });
    }
  }
  Testimonials.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Testimonials',
  });
  return Testimonials;
};