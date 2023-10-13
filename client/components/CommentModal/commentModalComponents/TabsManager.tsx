import React, { FC } from "react";
import { Box, Tab, Tabs } from "@mui/material";

interface TabsManagerProps {
  labels: string[];
  onTabChange: (newTabIndex: number) => void;
  currentTabIndex: number;
  defaultTabIndex: number; 
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

export const TabsManager: FC<TabsManagerProps> = ({
  labels,
  onTabChange,
  currentTabIndex,
}) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  return (
    <Box className="tabs-container">
      <Tabs
        value={currentTabIndex}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        {labels.map((label, index) => (
          <Tab label={label} {...a11yProps(index)} key={index} />
        ))}
      </Tabs>
    </Box>
  );
};
