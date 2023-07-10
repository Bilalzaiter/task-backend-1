const express = require('express')
const mongoose = require('mongoose')

const NoteSchema = mongoose.model('Note', {
    noteId: {
        type: String,
        required: true,
        unique: true
    },
    ticketNumber: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }, 
    createdDate : {
        type: Date,
        default: Date.now
    },
    updatedDate : { 
        type: Date, 
        default: Date.now 
    },
    status: { 
        type: String,
        enum: ['OPEN', 'COMPLETED'], 
        default: 'OPEN' 
    },
    assignedTo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
})

NoteSchema.pre('save', async function (next) {
    if (!this.noteId) {
      const latestNote = await this.constructor.findOne({}, {}, { sort: { noteId: -1 } });
      const latestNoteId = latestNote ? parseInt(latestNote.noteId) : 0;
      this.noteId = (latestNoteId + 1).toString();
    }
    next();
  });
module.exports = NoteSchema