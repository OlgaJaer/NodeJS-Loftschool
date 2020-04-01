const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./models/db.json");

const db = low(adapter);

const getUser = () => db.getState().user;
const getGoods = () => db.getState().goods;
const saveGoods = ({ photo, name, price }) =>
  db
    .get("goods")
    .push({
      photo,
      name,
      price 
    })
    .write();  
const saveSkills = ({ ages, cities, years }) =>
    db
      .get("skills")
      .push({
        ages,
        cities,
        years  
      })
      .write();   
const saveUser = ({ login, hash, salt }) =>
  db.set("user", { login, hash, salt }).write();

module.exports = {
  getUser,
  saveSkills,
  getGoods,
  saveGoods,
  saveUser
};
