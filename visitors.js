const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb://localhost:27017";

MongoClient.connect(uri, function (err, db) {
  if (err) throw err;
  let dbo = db.db("BuildingInformation");

  let buildingsObj = [
    { buldingType: "Museum" },
    { buldingType: "Library" },
    { buldingType: "Mall" },
    { buldingType: "Bussines center" },
  ];

  // Insert 5 Buidings documents.

  dbo
    .collection("Buildings")
    .insertMany(buildingsObj)
    .then((r) => {
      dbo
        .collection("Buildings")
        .find({})
        .toArray((err, result) => {
          let obj = [];
          for (let i = 0; i <= 1000; i++) {
            let randomBuilding =
              result[Math.floor(Math.random() * result.length)];
            // Генериране на произволен телефонен номер
            let randomPhone = Math.floor(Math.random() * 1000000000);

            // Създаваме запис за посетител
            obj.push({
              first_name: ` First Name ${i}`,
              last_name: `Last Name ${i}`,
              phone: `${randomPhone}`,
              location: ["11", "22", "33"],
              visitedBuilding: randomBuilding._id,
            });
          }

          // 1000 посетителя се добавят в колекция visitors
          dbo
            .collection("Visitors")
            .insertMany(obj)
            .then((r) => db.close());
        });
    });
});
