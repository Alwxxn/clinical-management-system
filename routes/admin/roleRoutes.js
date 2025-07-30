const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/admin/roleController');
const auth = require('../../middleware/auth');

router.post('/roles', auth('admin'), roleController.createRole);
router.put('/roles/:roleId', auth('admin'), roleController.updateRole);
router.get('/roles/:roleId', auth('admin'), roleController.getRoleById);
router.get('/roles', auth('admin'), roleController.listRoles);
router.patch('/roles/:roleId/deactivate', auth('admin'), roleController.deactivateRole);

module.exports = router;