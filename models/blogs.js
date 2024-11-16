'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Documents, {
        foreignKey: 'reference_id', // Assuming reference_id is the foreign key in the Documents table referencing the Blogs table
        scope: {
          reference_type: 'blogs', // Assuming reference_type is the column specifying the type of reference
        },
        as: 'documents', // Alias to access documents associated with a blog
      });
      this.belongsTo(models.Categories, {
        foreignKey: "category_id",
        constraints: false,
      });
    }
  }
  Blogs.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    author: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    category_id: {
      type: DataTypes.UUID,
      references: {
        model: "Categories",
        key: "id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    meta_tag: DataTypes.ARRAY(DataTypes.STRING),
    meta_description: DataTypes.STRING,
    status: DataTypes.ENUM('published', 'draft', 'deleted')
  }, {
    sequelize,
    modelName: 'Blogs',
  });
  return Blogs;
};
