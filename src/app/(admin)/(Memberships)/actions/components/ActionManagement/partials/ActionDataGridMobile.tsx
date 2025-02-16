import { NoDataMessage } from '@/components';
import { TAction } from '@/models';
import { JSX } from 'react';

type TActionDataGridMobileProps = {
  actions: TAction[];
  renderActions: (action: TAction) => JSX.Element;
};

export const ActionDataGridMobile = ({
  actions,
  renderActions,
}: TActionDataGridMobileProps) => {
  if (actions.length === 0) {
    return (
      <div className="md:hidden space-y-4">
        <NoDataMessage />
      </div>
    );
  }

  return (
    <div className="md:hidden space-y-4">
      {actions.map((action) => (
        <div
          key={action.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 transition duration-150 ease-in-out"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            {action.name}
          </h3>
          <div className="flex justify-end">{renderActions(action)}</div>
        </div>
      ))}
    </div>
  );
};
