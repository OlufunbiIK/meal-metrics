"use client";

import DashboardLayout from "@/app/layout/DashboardLayout";
import FavoritesPage from "../../components/Favourites";

export default function Favorites() {
  return (
    <DashboardLayout>
      <FavoritesPage />;
    </DashboardLayout>
  );
}
