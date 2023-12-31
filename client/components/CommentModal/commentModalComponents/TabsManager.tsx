import React, { FC, useEffect, useState } from "react";
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
  defaultTabIndex,
}) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      onTabChange(defaultTabIndex);
    }
  }, [defaultTabIndex, initialized, onTabChange]);

  return (
    <Box
      className="tabs-container"
      sx={{
        width: { xs: "100vw", md: "75vw" },
        maxWidth: "1200px",
      }}
    >
      <Tabs
        value={currentTabIndex}
        onChange={handleChange}
        aria-label="basic tabs example"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {labels.map((label, index) => (
          <Tab label={label} {...a11yProps(index)} key={index} />
        ))}
      </Tabs>
    </Box>
  );
};
