import { fireEvent, render } from '@testing-library/react-native';

import { PlanCard } from './PlanCard';
import { PLANS } from './plans';

describe('PlanCard', () => {
  it('exposes selected state and handles selection', async () => {
    const onSelect = jest.fn();
    const view = await render(
      <PlanCard disabled={false} onSelect={onSelect} plan={PLANS[1]} selected />,
    );

    expect(view.getByRole('radio').props.accessibilityState).toEqual({
      checked: true,
      disabled: false,
    });
    expect(view.getByText('−50%')).toBeOnTheScreen();
    await fireEvent.press(view.getByRole('radio'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    await view.unmount();
  });

  it('does not handle presses while purchasing', async () => {
    const onSelect = jest.fn();
    const view = await render(
      <PlanCard disabled onSelect={onSelect} plan={PLANS[0]} selected={false} />,
    );

    await fireEvent.press(view.getByRole('radio'));
    expect(onSelect).not.toHaveBeenCalled();
    await view.unmount();
  });
});
