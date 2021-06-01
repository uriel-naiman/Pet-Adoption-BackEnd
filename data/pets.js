const { query } = require('../lib/db');
const SQL = require('@nearform/sql');

function addPet(type, name, status, height, weight, color, bio, hypo, diet, breed, email, userId) {
    return query(SQL`INSERT INTO pets (pet_type, pet_name, adoption_status, pet_height, pet_weight,
      color, bio, hypoallergenic, dietary_restrictions, breed, email, owner_id) VALUES (${type}, ${name}, 
        ${status}, ${height}, ${weight}, ${color}, ${bio}, ${hypo}, ${diet}, ${breed}, ${email}, ${userId})`);
  }
  exports.addPet = addPet;

  function getPets() {
    return query(SQL`SELECT * FROM pets`);
  }
  exports.getPets = getPets;

  async function getPetsByType(type) {
    return query(SQL`SELECT * FROM pets WHERE pet_type=${type}`);
  }
  exports.getPetsByType = getPetsByType;

  async function getPetById(petId) {
    return query(SQL`SELECT * FROM pets WHERE id=${petId}`);
  }
  exports.getPetById = getPetById;

  async function getPetByName(name, userId) {
    return query(SQL`SELECT * FROM pets WHERE owner_id=${userId} AND pet_name=${name}`);
  }
  exports.getPetByName = getPetByName;

  function getPetsByUserId(userId) {
    return query(SQL`SELECT * FROM pets WHERE owner_id=${userId}`);
  }
  exports.getPetsByUserId = getPetsByUserId;

  function getSavedPetsByUserId(userId) {
    return query(SQL`SELECT *
    FROM pets p
    INNER JOIN saved_pets s
    ON s.pet_id = p.id
    WHERE s.owner_id = ${userId}`);
  }
  exports.getSavedPetsByUserId = getSavedPetsByUserId;

  function getPetsByVarious(type) {
    return query(SQL`SELECT * FROM pets WHERE pet_type LIKE "%${type}%"`);
  }
  exports.getPetsByVarious = getPetsByVarious;

  function getSavedPet(userId, petId) {
    return query(SQL`SELECT * FROM saved_pets WHERE owner_id=${userId} AND pet_id=${petId}`);
  }
  exports.getSavedPet = getSavedPet;

  function savePet(userId, petId) {
    return query(SQL`INSERT INTO saved_pets (owner_id, pet_id) VALUES (${userId}, ${petId})`);
  }
  exports.savePet = savePet;

  function unSavePet(userId, petId) {
    return query(SQL`DELETE FROM saved_pets WHERE owner_id=${userId} AND pet_id=${petId}`);
  }
  exports.unSavePet = unSavePet;

  function returnPet(petId) {
    return query(SQL`UPDATE pets SET owner_id='', adoption_status='available', email='' WHERE id = ${petId}`);
  }
  exports.returnPet = returnPet;

  function adoptPet(userId, email, petId) {
    return query(SQL`UPDATE pets SET owner_id=${userId}, adoption_status='adopted', email=${email} WHERE id = ${petId}`);
  }
  exports.adoptPet = adoptPet;

  function fosterPet(userId, email, petId) {
    return query(SQL`UPDATE pets SET owner_id=${userId}, adoption_status='fostered', email=${email} WHERE id = ${petId}`);
  }
  exports.fosterPet = fosterPet;

  function deletePet(petId) {
    query(SQL`DELETE FROM pets WHERE id=${petId}`);
    query(SQL`DELETE FROM saved_pets WHERE pet_id=${petId}`);
    return;
  }
  exports.deletePet = deletePet;

  
  function updatePet(type, name, status, height, weight, color, bio, hypo, diet, breed, petId, email, userId) {
    const sql = SQL`UPDATE pets SET pet_type = ${type},
    pet_name = ${name},
    adoption_status = ${status},
    pet_height = ${height},
    pet_weight = ${weight},
    color = ${color},
    bio = ${bio},
    hypoallergenic = ${hypo},
    dietary_restrictions = ${diet},
    breed = ${breed},
    email=${email},
    owner_id=${userId}
    WHERE id = ${petId}`;
    return query(sql);
  }
  exports.updatePet = updatePet;

  function updatePetPicture(url, petId) {
    return query(SQL`UPDATE pets
     SET picture=${url}
     WHERE id=${petId}`);
  }
  exports.updatePetPicture = updatePetPicture;