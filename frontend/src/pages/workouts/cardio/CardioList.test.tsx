import { MONTHS } from '../../../utils/constants';
import { handlers } from '../../../utils/handlers';
import { mockCardio } from '../../../utils/mock';
import { cleanup, fireEvent, render, screen, within } from '../../../utils/test-utils';
import CardioList from './CardioList.component';
import { setupServer } from 'msw/node';

const server = setupServer(...handlers);

describe('CardioList', () => {
  beforeAll(() => {
    server.listen({
      onUnhandledRequest: 'warn'
    });
  });

  beforeEach(() => render(<CardioList />));
  afterEach(() => {
    server.resetHandlers();
    cleanup;
  });
  afterAll(() => server.close());

  it('should render cardio table', async () => {
    const table = await screen.findByTestId('cardio-table');
    expect(table).toBeInTheDocument();
  });

  it('should render SelectByMonth filter', async () => {
    const filter = await screen.findByTestId('select-by-month');
    expect(filter).toBeInTheDocument();
  });

  it('should render FilterByType component', async () => {
    const filter = await screen.findByTestId('filter-by-type');
    expect(filter).toBeInTheDocument();
  });

  it('should render correct month preselected in SelectByMonth filter', async () => {
    const filter = await screen.findByTestId('select-by-month');
    const currentMonth = MONTHS.find((m) => m.value === new Date().getMonth() + 1);
    const month = within(filter).getByText(currentMonth?.name ?? '');
    expect(month).toBeInTheDocument();
  });

  it('should have correct amount of workouts in table rows', async () => {
    const rows = (await screen.findAllByTestId('cardio-table-body-row')).length;
    const workoutsThisMonth = mockCardio.filter((c) => new Date(c.createdAt).getMonth() === new Date().getMonth()).length;
    expect(rows).toEqual(workoutsThisMonth);
  });

  it('should sort rows based on time', async () => {
    const button = await screen.findByTestId('cardio-table-time-button');
    fireEvent.click(button);
    const lowestTime = Math.min(...mockCardio.filter((c) => new Date(c.createdAt).getMonth() === new Date().getMonth()).map((c) => Number(c.exercise.minutes)));
    const firstRowItemTimeValue = (await screen.findAllByTestId('cardio-table-time'))[0].textContent;
    expect(Number(firstRowItemTimeValue)).toEqual(lowestTime);
    fireEvent.click(button);
    const highestTime = Math.max(
      ...mockCardio.filter((c) => new Date(c.createdAt).getMonth() === new Date().getMonth()).map((c) => Number(c.exercise.minutes))
    );
    const newFirstRowItemTimeValue = (await screen.findAllByTestId('cardio-table-time'))[0].textContent;
    expect(Number(newFirstRowItemTimeValue)).toEqual(highestTime);
  });
});
``;
