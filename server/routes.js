const router = require('express').Router();
const controller = require('./controllers');

router.get('/users', controller.users.get);
router.post('/users', controller.users.create);
router.patch('/users/:id/excerpts', controller.users.addExcerpt);
router.patch('/users/:id/dictionary', controller.users.addWordToDictionary);
router.post('/translations', controller.translations.translate);
router.patch('/words/:id/progress', controller.words.updateProgress);

module.exports = router;