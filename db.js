const Sequelize = require('sequelize')
const express=require('express')
const app=express()
const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname+'/test.db'
})
const Users = db.define('user',{
    status:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    task:{
        type: Sequelize.STRING(40),
        allowNull: false
    },
    Notes:{
        type: Sequelize.STRING(400),
        allowNull: true
    },
    Description:{
        type: Sequelize.STRING(100),
        allowNull: true
    },
    Priority:{
        type: Sequelize.STRING(40),
        allowNull: false
    },
    
    date: {
        type: Sequelize.DATE,
        allowNull: false
    }
})
module.exports = {
    db,Users,express,app
}