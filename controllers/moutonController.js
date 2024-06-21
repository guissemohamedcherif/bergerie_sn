const User = require("../models/user");
const Mouton = require("../models/mouton");

exports.createMouton = async (req, res) => {
  try {
    const mouton = new Mouton(req.body);
    mouton.avatar = req.file ? req.file.path : null
    await mouton.save();
    res.status(201).json(mouton);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllMoutons = async (req, res) => {
  try {
    const moutons = await Mouton.find().populate("category");
    res.status(200).json(moutons);
  } catch (error) {
    res.status(500).json({ error: error.message });
}
};

exports.getMouton = async (req, res) => {
  try {
    const mouton = await Mouton.findById(req.params.id).populate('category');
    if (!mouton) {
      return res.status(404).json({ error: "Mouton not found" });
    }
    res.json(mouton);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMouton = async (req, res) => {
    try {
        const { nom, age, category } = req.body;
        const item = await Mouton.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Mouton not found' });
        const updatedMouton = {
            nom: nom,
            age: age,
            category: category
        };
        if (req.file) {
            updatedMouton.avatar = req.file.path;
        }
        
        const mouton =
            await Mouton.findByIdAndUpdate(
                req.params.id,
                updatedMouton,
                { new: true }
            ).populate('category');
        if (!mouton) {
            return res.status(404)
                .json({ error: 'Mouton not found' });
        }

        res.json(mouton);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteMouton = async (req, res) => {
    try {
        const mouton = await Mouton.findByIdAndDelete(req.params.id);
        if (!mouton) {
            return res.status(404)
            .json({ error: 'Mouton not found' });
        }
        res.json({ message: 'Mouton deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMoutonsByCategory = async (req, res) => {
    try {
        const moutons = await Mouton.find({ category: req.params.category }).populate('category');
        if (moutons.length === 0) return res.status(404).json({ message: 'No Mouton found for this categoryy' });
        res.json(moutons);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
