const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Hospital = require('./models/Hospital');
const BedAvailability = require('./models/BedAvailability');

dotenv.config();

const hospitals = [
  { name: "Apollo Hyderabad", city: "hyderabad" },
  { name: "Yashoda Hospitals", city: "hyderabad" },
  { name: "KIMS Hospital", city: "hyderabad" },
  { name: "CARE Hospitals", city: "hyderabad" },
  { name: "NIMS Hyderabad", city: "hyderabad" },

  { name: "AIIMS Delhi", city: "delhi" },
  { name: "Max Super Speciality", city: "delhi" },
  { name: "Fortis Delhi", city: "delhi" },
  { name: "BLK Hospital", city: "delhi" },
  { name: "Safdarjung Hospital", city: "delhi" },

  { name: "Manipal Hospital", city: "bangalore" },
  { name: "Fortis Bangalore", city: "bangalore" },
  { name: "Narayana Health", city: "bangalore" },
  { name: "Aster CMI", city: "bangalore" },
  { name: "Columbia Asia", city: "bangalore" },

  { name: "Lilavati Hospital", city: "mumbai" },
  { name: "Kokilaben Hospital", city: "mumbai" },
  { name: "Jaslok Hospital", city: "mumbai" },
  { name: "Nanavati Hospital", city: "mumbai" },
  { name: "Hiranandani Hospital", city: "mumbai" },

  { name: "Apollo Chennai", city: "chennai" },
  { name: "MIOT Hospital", city: "chennai" },
  { name: "Global Hospital", city: "chennai" },
  { name: "SIMS Hospital", city: "chennai" },
  { name: "Kauvery Hospital", city: "chennai" },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await BedAvailability.deleteMany({});
    await Hospital.deleteMany({});

    console.log("Old data deleted");

    for (const hospitalData of hospitals) {
      const hospital = await Hospital.create({
        ...hospitalData,
        address: `${hospitalData.city} Main Road`,
        phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
        email: hospitalData.name.toLowerCase().replace(/\s+/g, '') + "@hospital.com"
      });

      const icuTotal = Math.floor(Math.random() * 40) + 20;
      const oxygenTotal = Math.floor(Math.random() * 80) + 40;
      const ventTotal = Math.floor(Math.random() * 20) + 5;

      await BedAvailability.create({
        hospitalId: hospital._id,
        icuBeds: {
          total: icuTotal,
          available: Math.floor(Math.random() * icuTotal)
        },
        oxygenBeds: {
          total: oxygenTotal,
          available: Math.floor(Math.random() * oxygenTotal)
        },
        ventilatorBeds: {
          total: ventTotal,
          available: Math.floor(Math.random() * ventTotal)
        },
        oxygenAvailable: Math.random() > 0.1
      });
    }

    console.log("Seed data inserted successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedDatabase();