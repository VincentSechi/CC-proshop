const checkRole = require('../../../middleware/auth');

app.get('/admin-dashboard', checkRole(['admin']), (req, res) => {
  res.send('Bienvenue admin !');
});