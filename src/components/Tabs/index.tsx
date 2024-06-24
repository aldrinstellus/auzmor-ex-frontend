import { FC, ReactNode, useEffect, useState } from 'react';
import './styles.css';
import { useLocation } from 'react-router-dom';

export interface ITab {
  tabLabel: (isActive: boolean) => string | ReactNode;
  tabContent: ReactNode;
  tabAction?: ReactNode;
  dataTestId?: string;
  disabled?: boolean;
}

export interface ITabsProps {
  tabs: ITab[];
  title?: string;
  activeTabIndex?: number;
  tabContentClassName?: string;
  className?: string;
  itemSpacing?: number;
  showUnderline?: boolean;
  tabSwitcherClassName?: string;
  disableAnimation?: boolean;
  onTabChange?: (param: any) => void;
}

const Tabs: FC<ITabsProps> = ({
  tabs,
  title,
  tabContentClassName = 'px-6',
  className = 'w-full flex justify-start border-b-1 border border-neutral-200 px-8',
  itemSpacing = 4,
  showUnderline = true,
  tabSwitcherClassName = '',
  disableAnimation = false,
  onTabChange,
}) => {
  const location = useLocation();
  const currentPathname = location.pathname;

  // Determine the active tab index based on the current pathname
  const determineActiveTabIndex = () => {
    if (currentPathname.includes('channels')) return 0;
    if (currentPathname.includes('teams')) return 1;
    if (currentPathname.includes('documents')) return 1;
    if (currentPathname.includes('members')) return 2;
    return 0; // Default to the first tab
  };

  const [activeTab, setActiveTab] = useState(determineActiveTabIndex());
  const [previousTab, setPreviousTab] = useState(activeTab);

  useEffect(() => {
    setActiveTab(determineActiveTabIndex());
  }, [currentPathname]);

  useEffect(() => {
    if (!disableAnimation) {
      const tabContent = document.getElementById(
        `tab-${activeTab}-content`,
      ) as HTMLElement;
      if (activeTab > previousTab) {
        tabContent.classList.remove('slide-in-right'); // reset animation
        tabContent.classList.remove('slide-in-left'); // reset animation
        void tabContent.offsetWidth; // trigger reflow
        tabContent.classList.add('slide-in-right'); // start animation
      } else if (activeTab < previousTab) {
        tabContent.classList.remove('slide-in-left'); // reset animation
        tabContent.classList.remove('slide-in-right'); // reset animation
        void tabContent.offsetWidth; // trigger reflow
        tabContent.classList.add('slide-in-left'); // start animation
      }
    }
  }, [activeTab, previousTab]);

  const isActive = (index: number) => activeTab === index;
  return (
    <div>
      <div className="flex">
        <div className="w-full flex items-center justify-between">
          {title && (
            <div
              className="text-2xl font-bold"
              data-testid="people-hub-page-title"
            >
              {title}
            </div>
          )}
          <div className={className}>
            {tabs.map((tab, index) => (
              <div
                className={`flex py-4 relative ${tabSwitcherClassName} ${
                  !tab.disabled
                    ? isActive(index)
                      ? 'cursor-default'
                      : 'cursor-pointer hover:!text-neutral-900'
                    : 'cursor-not-allowed'
                } ${index !== tabs.length - 1 && `mr-${itemSpacing}`}
            `}
                onClick={() => {
                  setPreviousTab(activeTab);
                  !tab?.disabled && setActiveTab(index);
                  !tab?.disabled && onTabChange?.(index);
                }}
                key={index}
                data-testid={tab.dataTestId}
              >
                {tab.tabLabel(activeTab === index)}
                {isActive(index) && showUnderline && (
                  <div className="absolute bottom-0 bg-primary-500 w-full rounded-7xl h-1"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        {tabs[activeTab].tabAction && (
          <div className="w-full flex justify-end items-center">
            {tabs[activeTab].tabAction}
          </div>
        )}
      </div>
      <div className={`${tabContentClassName}`}>
        <div key={`tab-${activeTab}`} id={`tab-${activeTab}-content`}>
          {tabs[activeTab].tabContent}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
