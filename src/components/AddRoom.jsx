import { useState } from 'react'

function AddRoom({ onAdd }) {
  const [roomNo, setRoomNo] = useState('')
  const [capacity, setCapacity] = useState('')
  const [hasAC, setHasAC] = useState(false)
  const [hasAttachedWashroom, setHasAttachedWashroom] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const parsedCapacity = parseInt(capacity, 10)

    if (!roomNo.trim() || Number.isNaN(parsedCapacity) || parsedCapacity <= 0) {
      alert('Please enter a valid room number and capacity greater than 0.')
      return
    }

    onAdd({
      roomNo: roomNo.trim(),
      capacity: parsedCapacity,
      hasAC,
      hasAttachedWashroom
    })

    setRoomNo('')
    setCapacity('')
    setHasAC(false)
    setHasAttachedWashroom(false)
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-slate-800">
            Add Room
          </h2>
          <p className="text-xs text-slate-500">
            Define room capacity and facilities before allocation.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-1">
          <label className="block text-xs font-medium text-slate-700">
            Room Number
          </label>
          <input
            type="text"
            value={roomNo}
            onChange={(e) => setRoomNo(e.target.value)}
            placeholder="e.g. A-101"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-0 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            required
          />
        </div>

        <div className="space-y-1.5 sm:col-span-1">
          <label className="block text-xs font-medium text-slate-700">
            Capacity (students)
          </label>
          <input
            type="number"
            min={1}
            step={1}
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="e.g. 3"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-0 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            required
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <p className="text-xs font-medium text-slate-700">Facilities</p>
          <div className="flex flex-wrap gap-3">
            <label className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 transition hover:border-blue-200 hover:bg-blue-50/60">
              <input
                type="checkbox"
                checked={hasAC}
                onChange={(e) => setHasAC(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-400/40"
              />
              <span>Air Conditioning (AC)</span>
            </label>

            <label className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 transition hover:border-blue-200 hover:bg-blue-50/60">
              <input
                type="checkbox"
                checked={hasAttachedWashroom}
                onChange={(e) => setHasAttachedWashroom(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-400/40"
              />
              <span>Attached washroom</span>
            </label>
          </div>
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-medium text-white shadow-md transition hover:bg-blue-700 active:translate-y-px sm:w-auto"
          >
            Add Room
          </button>
        </div>
      </form>
    </section>
  )
}

export default AddRoom

