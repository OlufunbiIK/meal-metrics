"use client";
import DashboardLayout from "@/app/components/shared/DashboardLayout";
const handleTabChange = (tab: string) => {
  console.log(`Switched to: ${tab}`);
};

export default function ReportsPage() {
  return (
    <DashboardLayout activeTab="Dashboard" onTabChange={handleTabChange}>
      <div>Reports</div>
    </DashboardLayout>
  );
}
