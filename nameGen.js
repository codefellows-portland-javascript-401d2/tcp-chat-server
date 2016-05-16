module.exports = function() {
  const suffix = Math.ceil(Math.random().toFixed(2) * 1000); // Random 1 - 1000
  return `Guest-${suffix}`;
};

// Nothing yet to prevent two sockets from generating same numbers