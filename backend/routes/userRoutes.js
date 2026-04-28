const express = require('express');
const { addAddress, getAddresses, updateAddress, deleteAddress } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/addresses')
  .get(protect, getAddresses)
  .post(protect, addAddress);

router.route('/addresses/:addressId')
  .put(protect, updateAddress)
  .delete(protect, deleteAddress);

module.exports = router;
