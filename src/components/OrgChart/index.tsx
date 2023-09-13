import Button, { Variant } from 'components/Button';
import React, { useRef, useState } from 'react';
import Toolbar from './components/Toolbar';
import Chart from './components/Chart';
import { OrgChart } from 'd3-org-chart';
import { useForm } from 'react-hook-form';
import { IGetUser, useOrgChart } from 'queries/users';
import { IAppliedFilters } from 'components/FilterModal';

export enum OrgChartMode {
  Team = 'TEAM',
  Overall = 'OVERALL',
}

export interface IForm {
  userSearch: any;
  specificPersonSearch: string;
}

interface IOrgChart {
  setShowOrgChart: (showOrgChart: boolean) => void;
}

const OrganizationChart: React.FC<IOrgChart> = ({ setShowOrgChart }) => {
  const [activeMode, setActiveMode] = useState<OrgChartMode>(
    OrgChartMode.Overall,
  );
  const chartRef = useRef<OrgChart<any> | null>(null);
  const { control, watch, resetField } = useForm<IForm>();
  const [startWithSpecificUser, setStartWithSpecificUser] =
    useState<IGetUser | null>(null);
  const [isExpandAll, setIsExpandAll] = useState<boolean>(false);
  const [appliedFilters, setAppliedFilters] = useState<IAppliedFilters>({
    location: [],
    department: [],
    status: null,
  });
  const { data, isLoading } = useOrgChart({
    root: startWithSpecificUser?.id,
    expandAll: isExpandAll,
    locations: appliedFilters.location.map((location) => location.id),
    departments: appliedFilters.department.map((department) => department.id),
    status: appliedFilters.status?.value,
  });

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between w-full">
        <div className="text-2xl font-bold">Organization Chart</div>
        <Button
          className="flex space-x-[6px] group"
          label="View Organization Chart"
          variant={Variant.Secondary}
          leftIcon="peopleOutline"
          leftIconSize={20}
          dataTestId="people-org-chart"
          iconColor="text-black"
          onClick={() => setShowOrgChart(false)}
        />
      </div>
      <Toolbar
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        chartRef={chartRef}
        control={control}
        watch={watch}
        resetField={resetField}
        startWithSpecificUser={startWithSpecificUser}
        setStartWithSpecificUser={setStartWithSpecificUser}
        isExpandAll={isExpandAll}
        setIsExpandAll={setIsExpandAll}
        appliedFilters={appliedFilters}
        setAppliedFilters={setAppliedFilters}
      />
      <Chart
        orgChartRef={chartRef}
        data={(data as any)?.result?.data.users || []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default OrganizationChart;
