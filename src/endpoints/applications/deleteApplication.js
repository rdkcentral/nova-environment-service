const ApplicationModel = require('../../models/Application').model
const errorResponse = require('../../helpers/errorResponse')

module.exports = async (req, res) => {
  try {
    // delete the application
    const result = await ApplicationModel.deleteOne({
      _id: req.params.id,
    })

    // return success if the application was deleted (found and deleted)
    if (result && result.deletedCount === 1) {
      return res.json({
        status: 'success',
      })
    }

    return res.status(404).json({
      status: 'error',
      message: 'Application not found',
    })
  } catch (e) {
    errorResponse.send(res, 'applicationDelete failed', e)
  }
}
