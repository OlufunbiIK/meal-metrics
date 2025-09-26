"use client";
import DashboardLayout from "@/app/layout/DashboardLayout";
const handleTabChange = (tab: string) => {
  console.log(`Switched to: ${tab}`);
};

export default function ReportsPage() {
  return (
    <DashboardLayout activeTab="Dashboard" onTabChange={handleTabChange}>
      <div>Food Safety</div>
    </DashboardLayout>
  );
}
