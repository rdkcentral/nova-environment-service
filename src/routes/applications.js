const router = require('express').Router({ mergeParams: true })
const { validateId } = require('../middlewares/validate')

router.get('/', require('../endpoints/applications/listApplications'))
router.post('/', require('../endpoints/applications/createApplication'))
router.put(
  '/:id',
  validateId,
  require('../endpoints/applications/updateApplication')
)
router.delete(
  '/:id',
  validateId,
  require('../endpoints/applications/deleteApplication')
)

module.exports = router
