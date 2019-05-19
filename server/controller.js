const cd = require("./database/db");
const Sequelize = require("sequelize");
const {
  User,
  Schedule,
  Role,
  Permission,
  Subject,
  Rating,
  PermissionRole,
  UserRole,
  TeacherSubject
} = require("./database/model");
const Op = Sequelize.Op;
//search== its will search for the teacher that have the same location, subject and level
//that the student ask for in the search feild in the homepage
exports.search = (req, res) => {
  const query = req.body;
  console.log(query, "serach controllar");
  //   User.findAll({
  //       where: {
  //       location: `${query.location}`,
  //     },
  //     include: [{
  //       model: Subject,
  //       where: {
  //         name: `${query.name}`,
  //         level: `${query.level}`
  //       }
  //     }]
  Subject.findAll({
    where: {
      name: `${query.name}`,
      level: `${query.level}`
    },
    include: [
      {
        model: User,
        where: {
          location: `${query.location}`
        },
        include: [
          {
            model: Rating
          }
        ]
      }
    ]
  }).then(result => {
    console.log(result);
    var info = [];
    for (let i = 0; i < result.length; i++) {
      let obj = {};
      obj.subject = result[i].name;
      obj.level = result[i].level;
      obj.name = result[i].users[0].name;
      obj.phone = result[i].users[0].phone;
      obj.location = result[i].users[0].location;
      obj.img = result[i].users[0].img;
      obj.cvFile = result[i].users[0].cvFile;
      obj.summary = result[i].users[0].summary;
      obj.reatingText = result[i].users[0].ratings[0].text;
      obj.rate = result[i].users[0].ratings[0].rate;
      obj.date = result[i].users[0].ratings[0].date;
      info.push(obj);
    }
    res.send(result);
    console.log({ data: info }, "hello woerdjfakljlkj");
  });
};
exports.signup = (req, res)=>{
  console.log(req.body)
};
exports.seeSchedule = (req, res) => {};
