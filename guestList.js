var guestList = {};

guestList.guests = [];

guestList.writeAll = function(sender, message) {
  guestList.guests.forEach(guest => {
    if (guest === sender) {
      guest.write(`\r\n(You)${message}`); // prints (You) with message for sender
    } else {
      guest.write(`\r\n${message}`);
    }
  });
};

module.exports = guestList;