import React from "react"
import {
  botanicalPortals,
  botanicalPrimaryBranches,
  botanicalRoots,
  botanicalSecondaryBranches,
  botanicalTwigs,
  leafClusters,
} from "../../data/treeData"
import { PortalId } from "../../types"

interface AnimatedTreeProps {
  onNavigate: (id: PortalId) => void
}

export default function AnimatedTree({ onNavigate }: AnimatedTreeProps) {
  return (
    <div className="animated-tree">
      <svg
        viewBox="0 0 720 680"
        role="img"
        aria-labelledby="animated-tree-title animated-tree-description"
        className="w-full h-auto max-h-[600px]"
      >
        <title id="animated-tree-title">The Vriksha portal tree</title>
        <desc id="animated-tree-description">
          A mature botanical tree whose six main branches open the Explorer,
          Builder, Grower, Colleges, Hiring and Company portals.
        </desc>

        <g className="botanical-roots">
          {botanicalRoots.map((root, index) => (
            <path
              key={root.d}
              d={root.d}
              pathLength="1"
              style={
                {
                  "--root-width": root.width,
                  "--grow-order": index,
                } as React.CSSProperties
              }
            />
          ))}
        </g>

        <g className="botanical-trunk">
          <path
            className="trunk-silhouette"
            d="M318 594 C327 565 335 536 333 501 C330 461 334 425 343 388 C351 355 355 331 352 303 C350 282 354 260 361 239 C363 274 374 297 376 326 C379 360 376 385 386 421 C395 454 401 488 398 522 C395 554 399 577 405 594 C390 600 382 610 371 608 C360 605 351 610 340 605 C332 601 325 597 318 594Z"
          />
          <path
            className="trunk-grain"
            d="M346 583 C338 536 353 489 348 445 C343 404 360 371 358 329 C356 303 361 282 364 261"
            pathLength="1"
          />
          <path
            className="trunk-grain trunk-grain-secondary"
            d="M378 586 C387 542 380 503 385 469 C390 432 369 399 374 360"
            pathLength="1"
          />
        </g>

        <g className="botanical-primary-branches">
          {botanicalPrimaryBranches.map((branch, index) => (
            <path
              key={branch.d}
              className={branch.route ? `portal-route-${branch.route}` : ""}
              d={branch.d}
              pathLength="1"
              style={
                {
                  "--branch-width": branch.width,
                  "--grow-order": index,
                } as React.CSSProperties
              }
            />
          ))}
        </g>

        <g className="botanical-secondary-branches">
          {botanicalSecondaryBranches.map((branch, index) => (
            <path
              key={branch}
              d={branch}
              pathLength="1"
              style={{ "--grow-order": index } as React.CSSProperties}
            />
          ))}
        </g>

        <g className="botanical-twigs">
          {botanicalTwigs.map((twig, index) => (
            <path
              key={twig}
              d={twig}
              pathLength="1"
              style={{ "--grow-order": index } as React.CSSProperties}
            />
          ))}
        </g>

        <g className="botanical-leaves">
          {leafClusters.map(([x, y, rotate], index) => (
            <g
              key={`${x}-${y}`}
              className={`leaf-cluster leaf-tone-${index % 3}`}
              transform={`translate(${x} ${y}) rotate(${rotate})`}
              style={{ "--leaf-order": index } as React.CSSProperties}
            >
              <ellipse cx="-7" cy="-3" rx="7" ry="15" transform="rotate(-38)" />
              <ellipse cx="8" cy="-4" rx="6" ry="14" transform="rotate(35)" />
              <ellipse cx="1" cy="10" rx="6" ry="13" transform="rotate(5)" />
            </g>
          ))}
        </g>

        {botanicalPortals.map((portal, index) => (
          <g
            key={portal.id}
            className={`botanical-portal botanical-portal-${portal.id}`}
            role="button"
            tabIndex={0}
            aria-label={`Open ${portal.label}`}
            onClick={() => onNavigate(portal.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                onNavigate(portal.id)
              }
            }}
            transform={`translate(${portal.x} ${portal.y}) rotate(${portal.rotate})`}
            style={{ "--portal-order": index } as React.CSSProperties}
          >
            <g className="botanical-portal-content">
              <path d="M-48 0 C-32 -22 24 -24 52 0 C25 23 -31 22 -48 0Z" />
              <path className="portal-leaf-vein" d="M-37 0 C-12 -3 15 -2 40 0" />
              <text y="1">{portal.label}</text>
            </g>
          </g>
        ))}
      </svg>
    </div>
  )
}
