const User = require('../models/User');

const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.addresses.push(req.body);
    await user.save();
    res.status(201).json(user.addresses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.addresses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const address = user.addresses.id(req.params.addressId);
    
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    Object.assign(address, req.body);
    await user.save();
    res.json(user.addresses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.addresses.pull(req.params.addressId);
    await user.save();
    res.json(user.addresses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addAddress, getAddresses, updateAddress, deleteAddress };
