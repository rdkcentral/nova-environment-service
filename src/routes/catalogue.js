const router = require('express').Router({ mergeParams: true })

router.get('/', require('../endpoints/catalogue/listApplications'))
router.get('/:id', require('../endpoints/catalogue/getApplication'))
router.get(
  '/:id/version/:version_id',
  require('../endpoints/catalogue/getVersion')
)

module.exports = router
