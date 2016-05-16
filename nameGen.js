module.exports = function() {
  const suffix = Math.ceil(Math.random().toFixed(2) * 100); // Random 1 - 100
  return `Guest-${suffix}`;
};

// Nothing yet to prevent two sockets from generating same numbers