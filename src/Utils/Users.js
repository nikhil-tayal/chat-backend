const users = [];

const addUser = ({ id, name, room }) => {
  console.log(id, name, room);
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  if (!name || !room) {
    return {
      error: "Please Enter the room and username",
    };
  }

  const existingUser = users.find((user, index) => {
    return user.room === room && user.name === name;
  });
  if (existingUser) {
    return {
      error: "User Already present in the room. Please use different user name",
    };
  }
  const user = { id, room, name };
  users.push(user);
  return users;
};
const removeUser = (id) => {
  if (id) {
    const index = users.findIndex((user) => {
      return user.id === id;
    });
    return users.splice(index, 0)[0];
  }
};
const getUser = (id) => {
  return users.find((user) => user.id === id);
};
const getUserInRoom = (room) => {
  const userInRoom = users.filter((user) => {
    return user.room === room;
  });
  return userInRoom;
};

module.exports = {
  addUser,
  getUser,
  getUserInRoom,
  removeUser,
};
