"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const VrikshaDataContext = createContext(null);

export function VrikshaDataProvider({ children }) {
  const [summary, setSummary] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadSummary() {
      try {
        const response = await fetch("/api/career-data?view=summary", {
          signal: controller.signal
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error ?? `Career data request failed (${response.status}).`);
        setSummary(result);
        setStatus("ready");
        setError(null);
      } catch (loadError) {
        if (controller.signal.aborted) return;
        console.error("Career data is unavailable.", loadError);
        setError(loadError instanceof Error ? loadError.message : String(loadError));
        setStatus("error");
      }
    }

    loadSummary();
    return () => controller.abort();
  }, []);

  const getAnalyticsJobPostings = useCallback(async ({ page = 1, pageSize = 50, query = "" } = {}) => {
    const params = new URLSearchParams({
      view: "analytics-jobs",
      page: String(page),
      pageSize: String(pageSize),
      query
    });
    const response = await fetch(`/api/career-data?${params}`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.error ?? `Career data request failed (${response.status}).`);
    return result;
  }, []);

  const value = useMemo(
    () => ({ summary, status, error, getAnalyticsJobPostings }),
    [summary, status, error, getAnalyticsJobPostings]
  );

  return <VrikshaDataContext.Provider value={value}>{children}</VrikshaDataContext.Provider>;
}

export function useVrikshaData() {
  const value = useContext(VrikshaDataContext);
  if (!value) throw new Error("useVrikshaData must be used inside VrikshaDataProvider.");
  return value;
}
