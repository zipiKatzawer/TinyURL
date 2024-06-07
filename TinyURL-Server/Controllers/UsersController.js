import UsersModel from "../Models/UsersModel.js";

const UsersController = {
  getList: async (req, res) => {
    try {
      const users = await UsersModel.find();//ללא סינון
      res.json(users);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getById: async (req, res) => {
    try {
        // await UsersModel.find({_id:req.params.id})
      const user = await UsersModel.findById(req.params.id).populate('links');//שליפה לפי מזהה
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  add: async (req, res) => {
    const { name, email, password  } = req.body;
    try {
      const newUser = await UsersModel.create({ name, email, password });//הוספת חדש
      res.json(newUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }

  },

  update: async (req, res) => {
    const { id } = req.params;
    const { name, email, password  } = req.body;
    try {
      const updateUser = await UsersModel.findByIdAndUpdate(id, { name, email, password },{ new: true });//עדכון לפי מזהה
      res.json(updateUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await UsersModel.findByIdAndDelete(id);//מחיקה לפי מזהה
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
};

export default UsersController;
