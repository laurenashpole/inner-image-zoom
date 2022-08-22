import { expect} from 'chai';

describe('InnerImageZoom', () => {
  let app;

  before(() => {
    app = document.createElement('div');
    app.id = 'root';
    document.body.appendChild(app);
    require('../src/vanilla');
  })

  after(() => {
    document.body.removeChild(app);
  })

  it('Displays Hello!', () => {
    expect(app.innerHTML).to.include('Hello!')
  })
});
