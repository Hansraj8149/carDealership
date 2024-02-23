
const commonController = {
  getAllCars: async (req, res) => {
    try {
      const { client, database } = req.app.locals.mongoClient; 
      const cars = await database.collection('cars').find({}).toArray();
      
      if (!client) {
        throw new Error('MongoDB client not available');
      }

      
      if (!database) {
        throw new Error('MongoDB database not available');
      }

      console.log(cars);
      res.json({ cars });
    } catch (error) {
      console.error('Error getting all cars:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },


  getCarsInDealership: async (req, res) => {
    try {
      const { dealership_id } = req.params;
      console.log(dealership_id)
      const { client, database } = req.app.locals.mongoClient; 
      if (!client) {
        throw new Error('MongoDB client not available');
      }

      
      if (!database) {
        throw new Error('MongoDB database not available');
      }
      const carsInDealership = await database.collection('cars').find({ dealership_id }).toArray();
      res.json({ carsInDealership });
    } catch (error) {
      console.error('Error getting cars in a dealership:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  addVehicle:async (req,res) => {
    const {user_id,vehicle_id,dealership_id}=req.body;
    console.log(req.body)
    try {
      await req.app.locals.mongoClient.database.collection('sold_vehicles').insertOne({
        vehicle_id: vehicle_id,
        user_id: user_id,
      });
  
      await req.app.locals.mongoClient.database.collection('users').updateOne(
        { user_id: user_id },
        {
          $push: {
            vehicle_info: {
              vehicle_id: vehicle_id,
              dealership_id: dealership_id,
            }
          }
        }
      );
  res.status(200).json({
    msg:'Vehicle added to sold vehicles and user data'
  })
    }  catch (error) {
      if (error.code === 11000) {
        console.error('Duplicate key error. Vehicle with the same ID already exists.');
        res.status(400).json({ error: 'Duplicate key error. Vehicle with the same ID already exists.' });
      } else {
        console.error('Error adding vehicle to sold vehicles and user data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  },
  
  
  

  getDealsInDealership: async (req, res) => {
    try {
      const { dealership_id } = req.params;
      const { client, database } = req.app.locals.mongoClient; // Destructure client and database from app.locals.mongoClient
      if (!client) {
        throw new Error('MongoDB client not available');
      }

      
      if (!database) {
        throw new Error('MongoDB database not available');
      }
      const dealsInDealership = await database.collection('deals').find({ dealership_id }).toArray();
      res.json({ dealsInDealership });
    } catch (error) {
      console.error('Error getting deals in a dealership:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports=commonController;
