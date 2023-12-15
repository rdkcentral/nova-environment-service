const ApplicationModel = require('../../models/Application').model
const errorResponse = require('../../helpers/errorResponse')

module.exports = async (req, res) => {
  try {
    const data = await ApplicationModel.findOne({
      _id: req.params.id,
    })

    if (data) {
      res.json({
        data,
        status: 'success',
      })
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'Application not found',
      })
    }
  } catch (e) {
    errorResponse.send(res, 'applicationList failed', e)
  }
}
