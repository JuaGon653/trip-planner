const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {};

Comment.init({
    commentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    plan_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'planner',
            key: 'plan_id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
});

module.exports = Comment;