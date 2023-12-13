const ApplicationModel = require('../../models/Application').model
const errorResponse = require('../../helpers/errorResponse')

module.exports = async (req, res) => {
  try {
    const data = await ApplicationModel.find({
      //status: 'active'
    })
    res.json({
      data,
      status: 'success',
    })
  } catch (e) {
    errorResponse.send(res, 'applicationList failed', e)
  }
}
