const router = require('express').Router({ mergeParams: true })

router.get('/', require('../endpoints/catalogue/listApplications'))
router.get('/:appIdentifier', require('../endpoints/catalogue/getApplication'))
router.get(
  '/:appIdentifier/versions/:versionIdentifier',
  require('../endpoints/catalogue/getVersion')
)

module.exports = router
