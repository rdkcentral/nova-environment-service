const errorResponse = require('../../helpers/errorResponse')
const dataProvider = require('../../lib/dataProvider')

module.exports = async (req, res) => {
  try {
    const data = await dataProvider.getApplicationVersion(
      req.params.versionIdentifier,
      req.params.appIdentifier,
      req.query.format,
      req.query.provider
    )

    res.json({
      data,
      status: 'success',
    })
  } catch (e) {
    errorResponse.send(res, 'versionGet failed', e)
  }
}
