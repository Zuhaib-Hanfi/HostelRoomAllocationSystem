function RoomList({ rooms }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-slate-800">
            All Rooms
          </h2>
          <p className="text-xs text-slate-500">
            Overview of every configured hostel room.
          </p>
        </div>
        <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">
          {rooms.length} rooms
        </span>
      </div>

      {rooms.length === 0 ? (
        <div className="flex items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-xs text-slate-500">
          No rooms yet. Add a room to get started.
        </div>
      ) : (
        <div className="space-y-2">
          {rooms.map((room) => (
            <article
              key={room.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 text-xs text-slate-700 transition hover:border-slate-200 hover:bg-white"
            >
              <div>
                <p className="text-[13px] font-semibold text-slate-900">
                  Room {room.roomNo}
                </p>
                <p className="text-[11px] text-slate-500">
                  Capacity: {room.capacity} student{room.capacity > 1 ? 's' : ''}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span
                  className={`rounded-full px-2 py-1 text-[10px] font-medium ${
                    room.hasAC
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {room.hasAC ? 'AC' : 'No AC'}
                </span>
                <span
                  className={`rounded-full px-2 py-1 text-[10px] font-medium ${
                    room.hasAttachedWashroom
                      ? 'bg-sky-50 text-sky-700'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {room.hasAttachedWashroom ? 'Attached washroom' : 'No washroom'}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default RoomList

