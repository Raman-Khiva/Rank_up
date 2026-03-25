"use client";

import {
  ResizableTable,
} from "@/components/ui/resizable-table";

export default function ResizableTableDemo() {
  const handleEmployeeSelect = (employeeId) => {
    console.log(`Selected employee:`, employeeId);
  };
  const handleColumnResize = (columnKey, newWidth) => {
    console.log(`Column ${columnKey} resized to ${newWidth}px`);
  };

   return (
    <div className="min-h-screen w-screen py-6 overflow-x-hidden md:py-8">
      <div className="w-full grid grid-cols-[3fr_1fr] gap-8 pl-20 pr-10">
        <div className="grid-cols-1 overflow-x-auto">
          <ResizableTable />
        </div>
        <div className="grid-cols-2">
          sec 2
        </div>
      </div>
    </div>
  );
}
