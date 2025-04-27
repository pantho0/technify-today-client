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

export const PostFilterDropDown = () => {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  console.log(selectedKeys);

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
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
          disallowEmptySelection
          aria-label="Multiple selection example"
          closeOnSelect={false}
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          variant="flat"
          onSelectionChange={setSelectedKeys}
        >
          <DropdownItem key="text">Text</DropdownItem>
          <DropdownItem key="number">Number</DropdownItem>
          <DropdownItem key="date">Date</DropdownItem>
          <DropdownItem key="single_date">Single Date</DropdownItem>
          <DropdownItem key="iteration">Iteration</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
