const mongoose = require('../mongo')
const mongooseUniqueValidator = require('mongoose-unique-validator')

// Application
const ApplicationSchema = new mongoose.Schema(
  {
    identifier: {
      $type: String,
      index: true,
      unique: true,
      required: true,
      immutable: true,
    },
    name: {
      $type: String,
      required: true,
    },
    info: {
      $type: String,
      default: null,
    },
    metadata: {
      $type: Object,
      default: null,
    },
    image: {
      $type: String,
      default: null,
    },
    version: {
      $type: String,
      index: true,
      required: true,
      immutable: true,
    },
    versionUrl: {
      $type: String,
      required: true,
      immutable: true,
    },
    dataProvider: {
      $type: String,
      required: true,
      immutable: true,
      index: true,
    },
  },
  { typeKey: '$type', timestamps: true }
)

ApplicationSchema.plugin(mongooseUniqueValidator)

// remove _id, dataProvider and __v from query results
ApplicationSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj._id
  delete obj.dataProvider
  delete obj.__v
  return obj
}

// remove also from toObject
ApplicationSchema.options.toObject = {
  transform: function (doc, ret) {
    delete ret._id
    delete ret.dataProvider
    delete ret.__v
  },
}

module.exports = {
  schema: ApplicationSchema,
  model: mongoose.model('Application', ApplicationSchema),
}
