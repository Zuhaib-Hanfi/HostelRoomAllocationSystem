import { useMemo, useState } from 'react'

function SearchAllocate({ rooms, onAllocate }) {
  const [students, setStudents] = useState('')
  const [acFilter, setAcFilter] = useState('any')
  const [washroomFilter, setWashroomFilter] = useState('any')

  const minStudents = parseInt(students || '0', 10)

  const filteredRooms = useMemo(
    () =>
      rooms.filter((room) => {
        if (students && room.capacity < minStudents) return false

        if (acFilter === 'yes' && !room.hasAC) return false
        if (acFilter === 'no' && room.hasAC) return false

        if (washroomFilter === 'yes' && !room.hasAttachedWashroom) return false
        if (washroomFilter === 'no' && room.hasAttachedWashroom) return false

        return true
      }),
    [rooms, students, minStudents, acFilter, washroomFilter]
  )

  const handleAllocate = () => {
    const parsed = parseInt(students, 10)
    if (Number.isNaN(parsed) || parsed <= 0) {
      alert('Please enter a number of students greater than 0 before allocating.')
      return
    }

    const needsAC = acFilter === 'yes'
    const needsWashroom = washroomFilter === 'yes'
    onAllocate(parsed, needsAC, needsWashroom)
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
      <div className="mb-4">
        <h2 className="text-sm font-semibold tracking-wide text-slate-800">
          Search &amp; Allocate
        </h2>
        <p className="text-xs text-slate-500">
          Filter rooms by requirements and allocate the smallest suitable room.
        </p>
      </div>

      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-700">
            Number of students
          </label>
          <input
            type="number"
            min={1}
            step={1}
            value={students}
            onChange={(e) => setStudents(e.target.value)}
            placeholder="Minimum required capacity"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-0 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700">
              AC required
            </label>
            <select
              value={acFilter}
              onChange={(e) => setAcFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none ring-0 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            >
              <option value="any">Any</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700">
              Attached washroom
            </label>
            <select
              value={washroomFilter}
              onChange={(e) => setWashroomFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none ring-0 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            >
              <option value="any">Any</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAllocate}
          className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-medium text-white shadow-md transition hover:bg-blue-700 active:translate-y-px"
        >
          Allocate Room
        </button>
      </div>

      <div className="mt-5 space-y-2">
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
          Matching rooms ({filteredRooms.length})
        </p>
        {filteredRooms.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-xs text-slate-500">
            No room matches the current filters.
          </div>
        ) : (
          <div className="space-y-1.5">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-[11px] text-slate-700"
              >
                <div>
                  <p className="font-semibold text-slate-900">
                    Room {room.roomNo}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Capacity: {room.capacity}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {room.hasAC && (
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                      AC
                    </span>
                  )}
                  {room.hasAttachedWashroom && (
                    <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-medium text-sky-700">
                      Washroom
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default SearchAllocate

