const express = require('express');
const { validate } = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');
const { PetValidationSchema } = require('./petsSchemas');
const { addPet, getPets, getPetsByUserId, getPetsByType, 
  getPetById, updatePet, getPetByName, updatePetPicture, 
  savePet, unSavePet, getSavedPet, returnPet, getSavedPetsByUserId, 
  deletePet, adoptPet, fosterPet } = require('../data/pets');
const { getUserByEmail, getUserById } = require('../data/users');
const { upload } = require('../middlewares/multipart');
const { uploadToCloudinary } = require('../lib/cloudinary');
const fs = require('fs');


const router = express.Router();

//get all pets
router.get('/', auth, async (req, res) => {
    const userId = req.user.id;
    const user = await getUserById(userId);
    if (user.role !== 'admin') {
      res.status(403).send({ message: 'Only admin can get all products' });
      return;
    }
    try{
    const pets = await getPets();
    res.send({ pets });
    }catch(err){
      res.send(err);
    }
  });

// post new pet, for admin only, 
router.post('/',
  auth,
  validate(PetValidationSchema),
  async (req, res, next) => {
    const { type, name, status, height, weight, color, bio, hypo, diet, breed, email} = req.body.data;
    let userId = '';
        if(email) {
            const user = await getUserByEmail(email);
            userId = user.id;
        }
        await addPet(type, name, status, height, weight, color, bio, hypo, diet, breed, email, userId);
        const pet = await getPetByName(name, userId);
        res.send({ pet });
});

router.put('/picture_url/:petId',
    upload.single('image'),
    auth,
    async (req, res, next) => {
        const result = await uploadToCloudinary(req.file.path);
        await updatePetPicture(result.secure_url, req.params.petId);
        fs.unlinkSync(req.file.path)
        res.status(200).send({ pictureUrl: result.secure_url })
    });

// get pets via user id
router.get('/user/:userId', auth, async (req, res, next) =>{
  const {userId} = req.params;
  try {
    const pets = await getPetsByUserId(userId);
    res.send({pets});
  } catch (err){
    res.send(err);
  }
});

// get saved pets via user id
router.get('/user/:userId/saved', auth, async (req, res, next) =>{
  const {userId} = req.params;
  try {
    const pets = await getSavedPetsByUserId(userId);
    res.send({pets});
  } catch (err){
    res.send(err);
  }
});

router.post('/basic', async (req, res, next) =>{
  const { type } = req.body.data;
  try{
    const pets = await getPetsByType(type);
    res.send({ pets });
    }catch(err){
      next(err);
    }
});

//get pet 
router.get('/:petId', (req, res, next) =>{

});

// admin only
router.put('/:petId', 
auth, 
validate(PetValidationSchema),
async (req, res, next) =>{
  let { userId } = req.body;
    const user = await getUserById(userId);
    if (user.role !== 'admin') {
      res.status(403).send({ message: 'Only admin can get all products' });
      return;
    }
    const { type, name, status, height, weight, color, bio, hypo, diet, breed, email} = req.body.data;
        if(email && email !== 'undefined') {
            const user = await getUserByEmail(email);
            if (!user) {
                res.status(404).send('User not found with this email');
                return;
              }
            userId = user.id;
        }
      const { petId } = req.params;
      await updatePet(type, name, status, height, weight, color, bio, hypo, diet, breed, petId, email, userId); 
      res.send({ name });
    });

    // get pets via user id
router.get('/:petId/user/:userId', auth, async (req, res, next) =>{
  const {userId, petId } = req.params;
  try {
    const pet = await getSavedPet(userId, petId);
    res.send({pet});
  } catch (err){
    res.send(err);
  }
});


// save pet 
router.post('/:petId/user/:userId', auth, async (req, res, next) =>{
  const {userId, petId } = req.params;
  try {
    await savePet(userId, petId);
    res.send({message: "Pet Saved successfully"});
  } catch (err){
    res.send(err);
  }
});

router.delete('/:petId/user/:userId', auth, async (req, res, next) =>{
  const {userId, petId } = req.params;
  try {
    await unSavePet(userId, petId);
    res.send("pet unsaved successfully");
  } catch (err){
    res.send(err);
  }
});

router.put('/:petId/user/:userId/return', auth, async (req, res, next) =>{
  const {petId } = req.params;
  try {
    const pet = await getPetById(petId);
    // if(pet.owner_id != userId){
    //   res.status(401).send("Not your pet to return")
    // }
    await returnPet(petId);
    res.status(200).send("success!");
  } catch (err){
    res.send(next);
  }
});

router.put('/:petId/user/:userId/foster', auth, async (req, res, next) =>{
  const {userId, petId } = req.params;
  try {
    const pet = await getPetById(petId);
    // if(pet.owner_id !== ''){
    //   res.status(401).send("The pet is already adopted or fostered")
    // }
    const user = await getUserById(userId);
    await fosterPet(userId, user.email, petId);
    res.send("pet fostered successfully");
  } catch (err){
    res.send(next);
  }
});

router.put('/:petId/user/:userId/adopt', auth, async (req, res, next) =>{
  const {userId, petId } = req.params;
  try {
    const pet = await getPetById(petId);
    // if(pet.owner_id !== '' && pet.owner_id !== userId){
    //   res.status(401).send("The pet is already adopted or fostered");
    // }
    const user = await getUserById(userId);
    await adoptPet(userId, user.email, petId);
    console.log('hey');
    res.send("pet adopted successfully");
  } catch (err){
    res.send(err);
  }
});

router.delete('/:petId/user/:userId/delete', auth, async (req, res, next) =>{
  const {userId, petId } = req.params;
  const user = await getUserById(userId);
    if (user.role !== 'admin') {
      res.status(403).send({ message: 'Only admin can get all products' });
      return;
    }
  try {
    await deletePet(petId);
    res.send("deleted successfully");
  } catch (err){
    res.send(err);
  }
});

module.exports = router;