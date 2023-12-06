import { cn } from "@/lib/utils";
import React from "react";

interface AdminStatisticsProps {
  className?: string;
}

const AdminStatistics: React.FC<AdminStatisticsProps> = ({ className }) => {
  return (
    <div className={cn("p-2", className)}>
      <h1 className="mx-auto text-2xl">Currrent month</h1>
      <div className="rounded-sm flex justify-between">
        <p className="text-lg">Total Orders Completed</p>
        <p>56$</p>
      </div>
      <div className="rounded-sm flex justify-between">
        <p className="text-lg">Total Orders Canceled</p>
        <p>56$</p>
      </div>
      <div className="satisfaction-rate">
        <p>Precentage%</p>
      </div>
      <div className="pagination">
        <span className="page-indicator w-1 h-1 rounded-full bg-black"></span>
        <span className="page-indicator w-1 h-1 rounded-full bg-black"></span>
        <span className="page-indicator w-1 h-1 rounded-full bg-black"></span>
        <span className="page-indicator w-1 h-1 rounded-full bg-black"></span>
      </div>
    </div>
  );
};

export default AdminStatistics;
