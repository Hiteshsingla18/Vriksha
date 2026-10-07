"use client";

import { useCallback, useMemo, useState } from "react";
import CareerRoomDetail from "../components/explorer/CareerRoomDetail";
import DomainSelector from "../components/explorer/DomainSelector";
import { domains } from "../components/explorer/careerRooms";
import { getDataScienceCareerRooms } from "../components/explorer/dataScienceCareerRooms";
import { useVrikshaData } from "../components/data/VrikshaDataProvider";

export default function HomePage() {
  const { summary: datasetSummary } = useVrikshaData();
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [roomProgress, setRoomProgress] = useState({});
  const [capabilityGraph, setCapabilityGraph] = useState({});
  const [notice, setNotice] = useState("");

  const availableRooms = useMemo(
    () => getDataScienceCareerRooms(
      datasetSummary?.analyticsJobs,
      datasetSummary?.dataScienceJobs,
      datasetSummary?.juniorSkillTraits,
      datasetSummary?.seniorPersonalityTraits
    ),
    [datasetSummary]
  );

  const activeRoom = useMemo(
    () => availableRooms.find((room) => room.id === activeRoomId) ?? null,
    [activeRoomId, availableRooms]
  );

  const triggerVrikshaGraphUpdate = useCallback(({ domain, roomId, status }) => {
    setCapabilityGraph((current) => ({
      ...current,
      [roomId]: { domain, status, updatedAt: new Date().toISOString() }
    }));
    setNotice("Room completed — your capability graph has been updated.");
  }, []);

  const completedRoomIds = useMemo(
    () =>
      Object.entries(capabilityGraph)
        .filter(([, update]) => update.status === "completed")
        .map(([roomId]) => roomId),
    [capabilityGraph]
  );
  const activeRoomProgress = activeRoomId ? roomProgress[activeRoomId] : null;
  const defaultTasks = activeRoom ? activeRoom.tasks.map(() => false) : [];

  const handleToggleTask = useCallback((roomId, taskIndex) => {
    const taskCount = availableRooms.find((room) => room.id === roomId)?.tasks.length ?? 0;
    setRoomProgress((current) => {
      const tasks = current[roomId]?.tasks ?? Array(taskCount).fill(false);
      return {
        ...current,
        [roomId]: { ...current[roomId], tasks: tasks.map((done, index) => index === taskIndex ? !done : done) }
      };
    });
  }, [availableRooms]);

  const handleLabSuccess = useCallback((roomId) => {
    setRoomProgress((current) => ({
      ...current,
      [roomId]: { ...current[roomId], labSucceeded: true }
    }));
  }, []);

  return (
    <main className="app-shell">
      <header className="topbar">
        <a
          aria-label="Vriksha Career Rooms home"
          className="brand"
          href="/"
          onClick={(event) => {
            event.preventDefault();
            setActiveRoomId(null);
          }}
        >
          <span aria-hidden="true" className="brand-mark">v.</span>
          <span>vriksha<span className="brand-divider">/</span><span className="brand-section">explorer</span></span>
        </a>
        <div className="topbar-right">
          <span className="graph-indicator"><span className="live-dot" />Graph model ready</span>
          <span className="avatar" aria-label="Explorer profile">E</span>
        </div>
      </header>

      <div aria-live="polite" className="sr-only">{notice}</div>

      {activeRoom ? (
        <CareerRoomDetail
          completed={completedRoomIds.includes(activeRoom.id)}
          completedTasks={activeRoomProgress?.tasks ?? defaultTasks}
          graphUpdate={capabilityGraph[activeRoom.id]}
          labSucceeded={activeRoomProgress?.labSucceeded ?? false}
          onBack={() => {
            setActiveRoomId(null);
            setNotice("");
          }}
          onComplete={triggerVrikshaGraphUpdate}
          onLabSuccess={() => handleLabSuccess(activeRoom.id)}
          onToggleTask={handleToggleTask}
          room={activeRoom}
        />
      ) : (
        <DomainSelector
          completedRoomIds={completedRoomIds}
          domains={domains}
          onSelectRoom={setActiveRoomId}
          rooms={availableRooms}
        />
      )}

      <footer className="site-footer">
        <span>Vriksha Explorer</span>
        <span>Explore a path. Practice a skill. Grow your graph.</span>
      </footer>
    </main>
  );
}
