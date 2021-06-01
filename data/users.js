const { query } = require('../lib/db');
const SQL = require('@nearform/sql');

function addUser(email, hash, firstName, lastName, phoneNumber) {
  return query(SQL`INSERT INTO users (email, password_hash, first_name, last_name, phone_number) VALUES (${email}, ${hash}, ${firstName}, ${lastName}, ${phoneNumber})`);
}
exports.addUser = addUser;

function updateUser(email, firstName, lastName, phoneNumber, userId) {
  const sql = SQL`UPDATE users SET email=${email},
  first_name=${firstName},
  last_name=${lastName},
  phone_number=${phoneNumber}
  WHERE id=${userId}`;
  return query(sql);
}
exports.updateUser = updateUser;

function updatePassword(hash, userId) {
  return query(SQL`UPDATE users SET password_hash = ${hash} WHERE id = ${userId}`);
}
exports.updatePassword = updatePassword;


function getUsers() {
  return query(SQL`SELECT * FROM users`);
}
exports.getUsers = getUsers;

async function getUserByEmail(email) {
  const rows = await query(SQL`SELECT * FROM users WHERE email=${email}`);
  return rows[0];
}
exports.getUserByEmail = getUserByEmail;

async function getUserById(userId) {
  const sql = SQL`SELECT * FROM users WHERE id = ${userId}`;
  const rows = await query(sql);
  return rows[0];
}
exports.getUserById = getUserById;