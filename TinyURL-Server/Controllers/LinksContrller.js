import LinksModel from "../Models/LinksModel.js";
import UsersModel from "../Models/UsersModel.js";

const LinksController = {
  getList: async (req, res) => {
    try {
      const link = await LinksModel.find();//ללא סינון
      res.json(link);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  redirectLink: async (req, res) => {
    try {
      const link = await LinksModel.findById(req.params.id);
      if (!link) {
        return res.status(404).json({ message: 'Link not found' });
      }

      let targetParamValue = '';
      const targetParamName = link.targetParamName;
      if (req.query[targetParamName]) {
        const target = link.targetValues.find(t => t.name === req.query[targetParamName]);
        if (target) {
          targetParamValue = target.value;
        }
      }

      const newClick = {
        insertedAt: Date.now(),
        ipAddress: req.ip,
        targetParamValue: targetParamValue
      };

      link.clicks.push(newClick);
      await link.save();
      res.redirect(link.originalUrl);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getClicksByTarget: async (req, res) => {
    try {
      const link = await LinksModel.findById(req.params.id);
      if (!link) {
        return res.status(404).json({ message: 'Link not found' });
      }

      const clicksByTarget = link.clicks.reduce((acc, click) => {
        const target = click.targetParamValue || 'unknown';
        if (!acc[target]) {
          acc[target] = 0;
        }
        acc[target]++;
        return acc;
      }, {});

      res.json(clicksByTarget);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  add: async (req, res) => {
    try {
      const { originalUrl, targetParamName, userId, targetValues } = req.body;

      // מצא את המשתמש לפי userId
      const user = await UsersModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // צור את הלינק החדש
      const newLink = new LinksModel({
        originalUrl,
        targetParamName,
        clicks: [],
        targetValues: targetValues || []
      });

      // שמור את הלינק במסד הנתונים
      const savedLink = await newLink.save();

      // הוסף את מזהה הלינק לרשימת הקישורים של המשתמש
      user.links.push(savedLink._id);
      await user.save();

      res.status(201).json(savedLink);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    try {
      const updateLink = await LinksModel.findByIdAndUpdate(id, req.body,{ new: true });//עדכון לפי מזהה
      res.json(updateLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await LinksModel.findByIdAndDelete(id);//מחיקה לפי מזהה
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
};

export default LinksController;
