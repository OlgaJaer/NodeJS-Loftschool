const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body');

const controllers = require('../controllers');
const validation = require('../libs/validation')

router.get('/', controllers.index);
router.post('/', koaBody(), validation.isValidEmail, controllers.contact);
router.get('/login', controllers.login);

//router.post('/login', koaBody(), validation.isValidAuth, controllers.auth);

module.exports = router;