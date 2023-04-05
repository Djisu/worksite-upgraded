const alert = require('../alert');

// @ponicode
describe('alert.setAlert', () => {
  test('1', () => {
    alert.setAlert('Test failed', 'danger', 5000);
  });
});
