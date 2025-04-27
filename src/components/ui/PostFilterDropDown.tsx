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
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  console.log(selectedKeys);

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const handleSelectionChange = (keys: any) => {
    setSelectedKeys(keys);
    onSelectionChange(Array.from(keys));
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
          <DropdownItem key="Development">Development</DropdownItem>
          <DropdownItem key="design">design</DropdownItem>
          <DropdownItem key="other">other</DropdownItem>
          <DropdownItem key="mobile">mobile</DropdownItem>
          <DropdownItem key="cloud">cloud</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
