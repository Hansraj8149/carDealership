// db.js

const { MongoClient } = require('mongodb');
const faker = require('faker');
require('dotenv').config();

const DATABASE_URL = "mongodb+srv://hansraj:Hansraj8149@cluster0.tinlwjt.mongodb.net/carDealership";

async function createDatabase() {
  const client = new MongoClient(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db();

    const adminCollectionExists = await checkCollectionExists(database, 'admins');

    if (!adminCollectionExists) {
      await createAdminTable(database);
      await createUserTable(database);
      await createDealershipTable(database);
      await createDealTable(database);
      await createCarsTable(database);
      await createSoldVehiclesTable(database);

      await insertDummyAdmin(database);
      await insertDummyUsers(database, 10);
      await insertDummyDealerships(database, 5);
      await insertDummyDeals(database, 20);
      await insertDummyCars(database, 30);
      await insertDummySoldVehicles(database, 50);

      console.log('Database and dummy data created successfully!');
    } else {
      console.log('Database already exists. Skipping creation.');
    }

    return { client, database }; 
  } catch (error) {
    console.error('Error creating database:', error);
    
  } 
}

async function checkCollectionExists(database, collectionName) {
  const collections = await database.listCollections().toArray();
  return collections.some((collection) => collection.name === collectionName);
}

async function createAdminTable(database) {
  await database.createCollection('admins');
  await database.collection('admins').createIndex({ admin_id: 1 }, { unique: true });
}

async function createUserTable(database) {
  await database.createCollection('users');
  await database.collection('users').createIndex({ user_email: 1 }, { unique: true });
}

async function createDealershipTable(database) {
  await database.createCollection('dealerships');
  await database.collection('dealerships').createIndex({ dealership_email: 1 }, { unique: true });
}

async function createDealTable(database) {
  await database.createCollection('deals');
  await database.collection('deals').createIndex({ deal_id: 1 }, { unique: true });
}

async function createCarsTable(database) {
  await database.createCollection('cars');
  await database.collection('cars').createIndex({ car_id: 1 }, { unique: true });
}

async function createSoldVehiclesTable(database) {
  await database.createCollection('sold_vehicles');
  await database.collection('sold_vehicles').createIndex({ vehicle_id: 1 }, { unique: true });
}

async function insertDummyAdmin(database) {
  await database.collection('admins').insertOne({
    admin_id: 'hansrajsaini@gmail.com',
    password_hash: 'hansrajsaini',
  });
}

async function insertDummyUsers(database, count) {
  const dummyUsers = Array.from({ length: count }, () => ({
    user_email: faker.internet.email(),
    user_id: faker.random.uuid(),
    user_location: faker.address.city(),
    user_info: {},
    password_hash: 'hasheduserpassword',
    vehicle_info: [],
  }));

  await database.collection('users').insertMany(dummyUsers);
}

async function insertDummyDealerships(database, count) {
  const dummyDealerships = Array.from({ length: count }, () => ({
    dealership_email: faker.internet.email(),
    dealership_id: faker.random.uuid(),
    dealership_name: faker.company.companyName(),
    dealership_location: faker.address.city(),
    password_hash: 'hasheddealerpassword',
    dealership_info: {},
    cars: [],
    deals: [],
    sold_vehicles: [],
  }));

  await database.collection('dealerships').insertMany(dummyDealerships);
}

async function insertDummyDeals(database, count) {
  const existingDealership = await database.collection('dealerships').findOne({});
  const dealershipId = existingDealership.dealership_id;
  const dummyDeals = Array.from({ length: count }, () => ({
    deal_id: faker.random.uuid(),
    car_id: faker.random.uuid(),
    deal_info: {},
    dealership_id:dealershipId,
  }));

  await database.collection('deals').insertMany(dummyDeals);
}

async function insertDummyCars(database, count) {
  const existingDealership = await database.collection('dealerships').findOne({});
  const dealershipId = existingDealership.dealership_id;
  const dummyCars = Array.from({ length: count }, () => ({
    car_id: faker.random.uuid(),
    type: faker.random.arrayElement(['Sedan', 'SUV', 'Truck']),
    name: faker.vehicle.vehicle(),
    model: faker.vehicle.model(),
    car_info: {},
    dealership_id:dealershipId,
  }));

  await database.collection('cars').insertMany(dummyCars);
}

async function insertDummySoldVehicles(database, count) {
  const dummySoldVehicles = Array.from({ length: count }, () => ({
    vehicle_id: faker.random.uuid(),
    user_id: faker.random.uuid(),
    vehicle_info: {},
  }));

  await database.collection('sold_vehicles').insertMany(dummySoldVehicles);
}

module.exports = createDatabase;
