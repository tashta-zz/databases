var router = {
  'GET'    : 'getMessages',
  'POST'   : 'postMessage',
  'OPTIONS': 'routeDefault'
};

module.exports = router;


// Jon's notes on Router
// module.exports = {
//   router: router,
//   name: Jon
// };

// module.exports.router = router;

// module.exports = {
//   'GET'    : 'getMessages',
//   'POST'   : 'postMessage',
//   'OPTIONS': 'routeDefault'
//     // default:
//     //   routeDefault(response);
//     // return;
// };