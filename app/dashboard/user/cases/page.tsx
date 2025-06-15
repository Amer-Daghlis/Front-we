"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { CasesGrid } from "@/components/dashboard/cases/cases-grid";
import { getAllCases } from "@/lib/api/cases";
import type { Case } from "@/types/dashboard-item-types";
import withAuth from "@/lib/withAuth";

function UserAllCasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    async function fetchCases() {
      try {
        const data = await getAllCases(token);
        setCases(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch cases");
      }
    }

    fetchCases();
  }, []);

  return (
    <DashboardLayout userType="user">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">All Cases</h1>
        <p className="text-muted-foreground">View all public and relevant cases.</p>
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <CasesGrid userType="user" showOnlyOwn={false} data={cases} />
        )}
      </div>
    </DashboardLayout>
  );
}

export default withAuth(UserAllCasesPage);
