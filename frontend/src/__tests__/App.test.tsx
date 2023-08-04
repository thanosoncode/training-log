import Navbar from '../../src/components/navbar/Navbar.component';
import { render } from '../utils/test-utils';

test('Renders main page correctly', () => {
  render(<Navbar />);
  expect(true).toBeTruthy();
});
