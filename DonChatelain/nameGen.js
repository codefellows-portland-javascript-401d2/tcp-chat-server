const animals = [  //18 total
  'gerenuk',
  'blobfish',
  'dugong',
  'babirusa',
  'lamprey',
  'fossa',
  'yeticrab',
  'spidercrab',
  'batfish',
  'goblinshark',
  'panda-ant',
  'tenrec',
  'hawkmoth',
  'mantis-shrimp',
  'isopod',
  'parrotfish',
  'narwhal',
  'seapig'
];

module.exports = function() {
  const prefix = animals[Math.floor(Math.random() * animals.length)];
  const suffix = Math.ceil(Math.random().toFixed(2) * 1000); // Random 1 - 1000
  return `${prefix}-${suffix}`;
};

