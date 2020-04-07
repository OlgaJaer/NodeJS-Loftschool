const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./models/db.json");

const db = low(adapter);

const getUser = () => db.getState().user;

const saveSkills = ({ age, concerts, cities, years }) =>
  db
    .get("skills")
    .push({
      age,
      concerts,
      cities,
      years
    })
    .write();

const getArr = param => db.get(param);

const saveUser = ({ email, hash, salt }) =>
  db.set("user", { email, hash, salt }).write();

module.exports = {
  getArr,
  getUser,
  saveSkills,
  saveUser
};
