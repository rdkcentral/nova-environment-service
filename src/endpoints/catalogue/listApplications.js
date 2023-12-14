const errorResponse = require('../../helpers/errorResponse')
const dataProvider = require('../../lib/dataProvider')

module.exports = async (req, res) => {
  try {
    const applications = await dataProvider.getApplications(req.query.format)
    res.json({
      data: applications,
      status: 'success',
    })
  } catch (e) {
    console.error(e)
    errorResponse.send(res, 'applicationList failed', e)
  }
}
