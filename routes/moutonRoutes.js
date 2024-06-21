const express = require('express');
const router = express.Router();
const moutonController = require('../controllers/moutonController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });


router.post('/', upload.single('avatar'), moutonController.createMouton);
router.get('/', moutonController.getAllMoutons);
router.get('/:id', moutonController.getMouton);
router.put('/:id', upload.single('avatar'), moutonController.updateMouton);
router.delete('/:id', moutonController.deleteMouton);
router.get('/category/:category', moutonController.getMoutonsByCategory);


module.exports = router;