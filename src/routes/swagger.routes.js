const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const SwaggerDocs = require('../../COMPASSO_LISA.json');

router.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(SwaggerDocs));

module.exports = router;
