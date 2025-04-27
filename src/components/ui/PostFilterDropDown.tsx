"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Tooltip } from "@heroui/tooltip";
import { SlidersHorizontalIcon } from "lucide-react";
import React from "react";

export const PostFilterDropDown = ({
  onSelectionChange,
}: {
  onSelectionChange: (keys: string[]) => void;
}) => {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set<string>());

  console.log(selectedKeys);

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const handleSelectionChange = (keys: any) => {
    const selected = keys ? Array.from(keys) : [];
    setSelectedKeys(new Set(selected) as Set<string>);
    onSelectionChange(selected as string[]);
  };

  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <div>
            <Tooltip content="Filter Post">
              <SlidersHorizontalIcon className="text-primary-400" />
            </Tooltip>
          </div>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          closeOnSelect={false}
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          variant="flat"
          onSelectionChange={handleSelectionChange}
        >
          <DropdownItem key="software">Software</DropdownItem>
          <DropdownItem key="networking">Networking</DropdownItem>
          <DropdownItem key="hardware">Hardware</DropdownItem>
          <DropdownItem key="security">Security</DropdownItem>
          <DropdownItem key="web">Web</DropdownItem>
          <DropdownItem key="cloud">Cloud</DropdownItem>
          <DropdownItem key="mobile">Mobile</DropdownItem>
          <DropdownItem key="design">Design</DropdownItem>
          <DropdownItem key="database">Database</DropdownItem>
          <DropdownItem key="other">Other</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
