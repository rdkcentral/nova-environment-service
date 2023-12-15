const ApplicationModel = require('../../models/Application').model
const errorResponse = require('../../helpers/errorResponse')

module.exports = async (req, res) => {
  try {
    let query = {}
    if (req.query.provider) {
      query.dataProvider = req.query.provider
    }

    const data = await ApplicationModel.find(query)
    res.json({
      data,
      status: 'success',
    })
  } catch (e) {
    errorResponse.send(res, 'applicationList failed', e)
  }
}
