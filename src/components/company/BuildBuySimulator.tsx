import { useState } from "react"
import Heading from "../common/Heading"

export default function BuildBuySimulator() {
  const [trainCount, setTrainCount] = useState(8)
  const [trainMonths, setTrainMonths] = useState(4)
  const [trainingCost, setTrainingCost] = useState(1.2)
  const [hireCount, setHireCount] = useState(3)
  const [hiringCost, setHiringCost] = useState(8.5)
  const [buyMonths, setBuyMonths] = useState(2)

  const buildTotal = Math.round(trainCount * trainingCost * 10) / 10
  const buyTotal = Math.round(hireCount * hiringCost * 10) / 10
  const buildRecommended = buildTotal <= buyTotal && trainMonths <= 6
  const breakEven = Math.max(
    1,
    Math.round((Math.abs(buyTotal - buildTotal) + trainMonths * 2) / 3)
  )

  return (
    <section
      className="company-feature-section simulator-section"
      id="build-vs-buy-simulator"
    >
      <div className="company-section-heading">
        <div>
          <div className="card-label">02 · Compare capability economics</div>
          <Heading level={2}>Build-vs-Buy Simulator</Heading>
          <p>
            Train N people over M months vs. hire now, with real cost and time.
          </p>
        </div>
        <span className="company-demo-label light">
          Illustrative assumptions only
        </span>
      </div>

      <div className="simulator-controls">
        <div className="simulator-control-group build-controls">
          <div className="simulator-control-head">
            <span>BUILD</span>
            <strong>Train existing employees</strong>
          </div>
          <label>
            <span>
              Employees to train <b>{trainCount}</b>
            </span>
            <input
              type="range"
              min="2"
              max="20"
              value={trainCount}
              onChange={(event) => setTrainCount(Number(event.target.value))}
            />
          </label>
          <label>
            <span>
              Training duration <b>{trainMonths} months</b>
            </span>
            <input
              type="range"
              min="1"
              max="12"
              value={trainMonths}
              onChange={(event) => setTrainMonths(Number(event.target.value))}
            />
          </label>
          <label>
            <span>
              Training cost / employee <b>₹{trainingCost.toFixed(1)}L</b>
            </span>
            <input
              type="range"
              min=".5"
              max="3"
              step=".1"
              value={trainingCost}
              onChange={(event) => setTrainingCost(Number(event.target.value))}
            />
          </label>
        </div>

        <div className="simulator-control-group buy-controls">
          <div className="simulator-control-head">
            <span>BUY</span>
            <strong>Hire external specialists</strong>
          </div>
          <label>
            <span>
              Specialists required <b>{hireCount}</b>
            </span>
            <input
              type="range"
              min="1"
              max="10"
              value={hireCount}
              onChange={(event) => setHireCount(Number(event.target.value))}
            />
          </label>
          <label>
            <span>
              Time to productivity <b>{buyMonths} months</b>
            </span>
            <input
              type="range"
              min="1"
              max="8"
              value={buyMonths}
              onChange={(event) => setBuyMonths(Number(event.target.value))}
            />
          </label>
          <label>
            <span>
              Estimated hiring cost / hire <b>₹{hiringCost.toFixed(1)}L</b>
            </span>
            <input
              type="range"
              min="3"
              max="18"
              step=".5"
              value={hiringCost}
              onChange={(event) => setHiringCost(Number(event.target.value))}
            />
          </label>
        </div>
      </div>

      <div className="simulator-results">
        <article className={buildRecommended ? "recommended" : ""}>
          {buildRecommended && (
            <span className="simulator-recommend">Recommended direction</span>
          )}
          <small>BUILD</small>
          <Heading level={2}>₹{buildTotal.toFixed(1)}L</Heading>
          <p>
            Train {trainCount} employees over {trainMonths} months.
          </p>
          <div>
            <span>Time to capability</span>
            <strong>{trainMonths} months</strong>
          </div>
          <div>
            <span>People affected</span>
            <strong>{trainCount}</strong>
          </div>
        </article>

        <div className="simulator-versus">vs.</div>

        <article className={!buildRecommended ? "recommended" : ""}>
          {!buildRecommended && (
            <span className="simulator-recommend">Recommended direction</span>
          )}
          <small>BUY</small>
          <Heading level={2}>₹{buyTotal.toFixed(1)}L</Heading>
          <p>
            Hire {hireCount} specialists with {buyMonths}-month productivity
            assumptions.
          </p>
          <div>
            <span>Time to capability</span>
            <strong>{buyMonths} months</strong>
          </div>
          <div>
            <span>People hired</span>
            <strong>{hireCount}</strong>
          </div>
        </article>

        <aside>
          <span>Illustrative decision</span>
          <strong>{buildRecommended ? "Build internally" : "Hire externally"}</strong>
          <p>
            Under these assumptions,{" "}
            {buildRecommended
              ? "building costs less while developing broader internal capability."
              : "external hiring reaches the required capability sooner relative to the selected training assumptions."}
          </p>
          <div>
            <small>Illustrative break-even</small>
            <b>Month {breakEven}</b>
          </div>
        </aside>
      </div>

      <p className="simulator-disclaimer">
        Demo calculator only. Costs and recommendations are not based on a
        connected company dataset and do not guarantee a business outcome.
      </p>
    </section>
  )
}
