import { explorerRooms } from "../../data/explorerData"
import { CareerRoom } from "../../types"
import Heading from "../common/Heading"
import Icon from "../common/Icon"
import SkillChip from "../common/SkillChip"

interface CareerRoomsProps {
  onSelectRoom: (room: CareerRoom) => void
}

export default function CareerRooms({ onSelectRoom }: CareerRoomsProps) {
  return (
    <section className="explorer-feature-section" id="career-rooms">
      <div className="explorer-section-heading">
        <div>
          <div className="card-label">01 · Try the work</div>
          <Heading level={2}>Career Rooms</Heading>
          <p>Step into the work before you choose the career.</p>
        </div>
        <span className="demo-label">30–60 minute work slices · Prototype</span>
      </div>
      <div className="career-room-grid">
        {explorerRooms.map((room, index) => (
          <article className="career-room-card" key={room.title}>
            <div className="career-room-top">
              <span>0{index + 1}</span>
              <SkillChip tone={index === 0 ? "lime" : "sage"}>
                {room.time}
              </SkillChip>
            </div>
            <div className="career-domain">{room.field}</div>
            <Heading level={3}>{room.title}</Heading>
            <p>{room.description}</p>
            <button
              type="button"
              className="career-room-enter"
              onClick={() => onSelectRoom(room)}
            >
              Enter room <Icon name="arrow" size={15} />
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
