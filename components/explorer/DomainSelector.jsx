"use client";

import { useMemo, useState } from "react";

export default function DomainSelector({ domains, rooms, completedRoomIds, onSelectRoom }) {
  const [query, setQuery] = useState("");
  const [activeDomain, setActiveDomain] = useState("all");
  const normalizedQuery = query.trim().toLowerCase();

  const visibleRooms = useMemo(
    () =>
      rooms.filter((room) => {
        const matchesDomain = activeDomain === "all" || room.domainId === activeDomain;
        const matchesQuery =
          !normalizedQuery ||
          `${room.title} ${room.category} ${room.brief}`.toLowerCase().includes(normalizedQuery);
        return matchesDomain && matchesQuery;
      }),
    [activeDomain, normalizedQuery, rooms]
  );

  return (
    <section className="explorer-content">
      <div className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" />CAREER EXPLORATION, BUILT FOR YOU</p>
          <h1>Find your next <span>room to grow.</span></h1>
          <p className="hero-description">
            Get an honest look at the work, try a small real-world challenge, and find a path that feels like yours.
          </p>
          <div className="hero-meta">
            <span>◈ &nbsp;{rooms.length} career rooms</span>
            <span className="meta-divider" />
            <span>◎ &nbsp;Bite-sized, hands-on labs</span>
            <span className="meta-divider" />
            <span>⌁ &nbsp;Progress saved to your graph</span>
          </div>
        </div>
        <div aria-hidden="true" className="hero-visual">
          <div className="orbit orbit-outer" />
          <div className="orbit orbit-inner" />
          <div className="orbit-node node-a">✧</div>
          <div className="orbit-node node-b">⌘</div>
          <div className="orbit-node node-c">§</div>
          <div className="orbit-center"><span>v.</span></div>
          <span className="orbit-label">your potential,<br />in motion</span>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <p className="eyebrow">START WITH WHAT SPARKS</p>
          <h2>Explore a domain</h2>
        </div>
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <span className="sr-only">Search career rooms</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search paths, skills, tools..."
            type="search"
            value={query}
          />
          <kbd>/</kbd>
        </label>
      </div>

      <div aria-label="Filter by domain" className="domain-tabs" role="tablist">
        <button
          aria-selected={activeDomain === "all"}
          className={`domain-tab ${activeDomain === "all" ? "selected" : ""}`}
          onClick={() => setActiveDomain("all")}
          role="tab"
          type="button"
        >
          <span>All paths</span><span className="tab-count">{rooms.length}</span>
        </button>
        {domains.map((domain) => {
          const count = rooms.filter((room) => room.domainId === domain.id).length;
          return (
            <button
              aria-selected={activeDomain === domain.id}
              className={`domain-tab ${activeDomain === domain.id ? "selected" : ""}`}
              key={domain.id}
              onClick={() => setActiveDomain(domain.id)}
              role="tab"
              type="button"
            >
              <span className={`domain-dot accent-${domain.color}`} />
              <span>{domain.shortName}</span><span className="tab-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="domain-intro">
        <span className="domain-intro-mark">✳</span>
        <span>{activeDomain === "all"
          ? "Start broad, then follow the room that makes you curious."
          : domains.find((domain) => domain.id === activeDomain)?.description}</span>
        <span className="domain-intro-count">{visibleRooms.length} {visibleRooms.length === 1 ? "room" : "rooms"}</span>
      </div>

      {visibleRooms.length ? (
        <div className="room-grid">
          {visibleRooms.map((room) => {
            const domain = domains.find((item) => item.id === room.domainId);
            const isComplete = completedRoomIds.includes(room.id);
            return (
              <button
                className={`room-card accent-card-${domain.color}`}
                key={room.id}
                onClick={() => onSelectRoom(room.id)}
                type="button"
              >
                <span className="room-card-top">
                  <span aria-hidden="true" className={`room-icon accent-${domain.color}`}>{room.icon}</span>
                  {isComplete ? <span className="completion-pill">✓ COMPLETE</span> : <span className="card-arrow">↗</span>}
                </span>
                <span className="room-category">{room.category}</span>
                <span className="room-title">{room.title}</span>
                <span className="room-brief">{room.brief}</span>
                <span className="room-card-bottom">
                  <span className="room-lab-indicator"><span className="lab-dot" />Interactive lab</span>
                  <span className="room-open-label">Explore room <span aria-hidden="true">→</span></span>
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <span>⌕</span>
          <h3>No rooms found</h3>
          <p>Try a different search or choose another domain.</p>
          <button onClick={() => { setQuery(""); setActiveDomain("all"); }} type="button">Clear filters</button>
        </div>
      )}

      <div className="explorer-note">
        <span className="note-icon">✳</span>
        <p><strong>Curiosity over credentials.</strong> Every room is a starting point, not a gate. Try things out, learn what you like, and keep exploring.</p>
      </div>
    </section>
  );
}
