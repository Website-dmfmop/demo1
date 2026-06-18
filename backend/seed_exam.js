require('dotenv').config();
const mongoose = require('mongoose');
const CompetitiveExam = require('./models/CompetitiveExam');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
      await CompetitiveExam.deleteMany({});
      const newExam = new CompetitiveExam({
          examName: "MPSC Combined 2027",
          overview: "The MPSC Subordinate Services (Combined) exam is conducted for recruitment to Group B and Group C posts like Assistant Section Officer, Police Sub Inspector, State Tax Inspector, etc.",
          eligibility: "Bachelor's degree from a recognized university. Age typically 19 to 38 years with relaxations for reserved categories. Proficiency in Marathi.",
          level: "State Level",
          category: "Civil Services",
          pattern: [
              { stage: "Prelims", desc: "1 Objective Paper (100 Marks)" },
              { stage: "Mains", desc: "2 Objective Papers (Language & General Studies - 400 Marks total)" },
              { stage: "Interview/Physical", desc: "For specific posts like PSI" }
          ]
      });
      await newExam.save();
      console.log('Successfully inserted MPSC Combined 2027');
      process.exit(0);
  }).catch(err => {
      console.error(err);
      process.exit(1);
  });
