const express =require('express')
const mongoose = require('mongoose')

const Userschema = mongoose.model('User', {
    userId : {
        type: String,
        unique: true,
        required: true
    },
    username : {
        type: String,
        required: true,
        trim: true,
    },
    password : {
        type: String,
        minlength: 8,
        trim: true,
        required: true
    },
    roles : {
        type: String,
        enum: ['employee', 'manager', 'admin'],
        required: true,
        default:['employee']
    },
    isLoggedIn : {
        type: Boolean,
        required: true,
        default: false
    },
    lastLogin : {
        type: Date,
        default: Date.now,
        validate: 
        checkLastLogin
    }
})
function checkLastLogin(value) {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return value >= weekAgo;
  }
module.exports = Userschema