const errorResponse = require('../../helpers/errorResponse')

module.exports = async (req, res) => {
  try {
    const data = {} // todo: conect to catalogue
    res.json({
      data,
      status: 'success',
    })
  } catch (e) {
    errorResponse.send(res, 'versionGet failed', e)
  }
}
