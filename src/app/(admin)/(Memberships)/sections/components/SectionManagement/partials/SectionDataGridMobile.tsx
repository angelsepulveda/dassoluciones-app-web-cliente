import { NoDataMessage } from '@/components/ui/DataGrid/NoDataMessage';
import { TSection } from '@/models/memberships/section';
import { JSX } from 'react';

type TSectionDataGridMobileProps = {
  sections: TSection[];
  renderActions: (section: TSection) => JSX.Element;
};

export const SectionDataGridMobile = ({
  sections,
  renderActions,
}: TSectionDataGridMobileProps) => {
  if (sections.length === 0) {
    return (
      <div className="md:hidden space-y-4">
        <NoDataMessage />
      </div>
    );
  }

  return (
    <div className="md:hidden space-y-4">
      {sections.map((section) => (
        <div
          key={section.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 transition duration-150 ease-in-out"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            {section.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-1">{section.key}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            {section.description}
          </p>
          <div className="flex justify-end">{renderActions(section)}</div>
        </div>
      ))}
    </div>
  );
};
