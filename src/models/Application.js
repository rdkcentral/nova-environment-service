const mongoose = require('../mongo')
const mongooseUniqueValidator = require('mongoose-unique-validator')
const softDelete = require('./plugins/softDelete')

// Application
const ApplicationSchema = new mongoose.Schema(
  {
    identifier: {
      $type: String,
      index: true,
      unique: true,
      required: true,
    },
    name: {
      $type: String,
      required: true,
    },
  },
  { typeKey: '$type', timestamps: true }
)

ApplicationSchema.plugin(mongooseUniqueValidator)
ApplicationSchema.plugin(softDelete)

module.exports = {
  schema: ApplicationSchema,
  model: mongoose.model('Application', ApplicationSchema),
}
