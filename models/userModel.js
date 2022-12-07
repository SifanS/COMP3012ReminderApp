const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "test",
  },
  {
    id: 2,
    name: "Cindy Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
  },
  {
    id: 3,
    name: "Alex Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
  },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  createUserById: (id)=>{
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }else{
      const user = {
        id: database.length+1,
        name: id,
        email: id,
        password: "test",
        };
      database.push(user);
      return database[database.length-1];
    }
  },
};

module.exports = { database, userModel };
