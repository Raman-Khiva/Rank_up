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
    <div className="min-h-screen bg-background py-6 md:py-12">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="mb-8 md:mb-12">
          <ResizableTable 
            title="Employee" 
            onEmployeeSelect={handleEmployeeSelect}
            onColumnResize={handleColumnResize}
          />
        </div>
      </div>
    </div>
  );
}
