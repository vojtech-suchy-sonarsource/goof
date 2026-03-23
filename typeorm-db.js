var typeorm = require("typeorm");
var EntitySchema = typeorm.EntitySchema;

const Users = require("./entity/Users")

try {
  await typeorm.createConnection({
    name: "mysql",
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "root",
    database: "acme",
    synchronize: true,
    "logging": true,
    entities: [
      new EntitySchema(Users)
    ]
  });

  const dbConnection = typeorm.getConnection('mysql')

  const repo = dbConnection.getRepository("Users")

  console.log('Seeding 2 users to MySQL users table: Liran (role: user), Simon (role: admin')
  const inserts = [
    repo.insert({
      name: "Liran",
      address: "IL",
      role: "user"
    }),
    repo.insert({
      name: "Simon",
      address: "UK",
      role: "admin"
    })
  ];

  await Promise.all(inserts)
} catch (err) {
  console.error('failed connecting and seeding users to the MySQL database')
  console.error(err)
}