const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./models/db.json");

const db = low(adapter);

const getUser = () => db.getState().user;
const getSkills = () => db.get('skills').value();
const getProducts = () => db.get('products').value(); 

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
  getSkills,
  getProducts,
  saveSkills,
  saveUser
};
