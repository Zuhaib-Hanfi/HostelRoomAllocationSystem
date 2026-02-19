import { useState } from 'react'
import AddRoom from './components/AddRoom.jsx'
import RoomList from './components/RoomList.jsx'
import SearchAllocate from './components/SearchAllocate.jsx'

function App() {
  const [rooms, setRooms] = useState([])
  const [output, setOutput] = useState(null)

  const addRoom = (room) => {
    setRooms((prev) => [...prev, { ...room, id: Date.now() + Math.random() }])
    setOutput({
      type: 'success',
      message: `Room ${room.roomNo} added successfully.`
    })
  }

  const allocateRoom = (students, needsAC, needsWashroom) => {
    const suitableRooms = rooms.filter((room) => {
      if (room.capacity < students) return false
      if (needsAC && !room.hasAC) return false
      if (needsWashroom && !room.hasAttachedWashroom) return false
      return true
    })

    if (suitableRooms.length === 0) {
      setOutput({
        type: 'error',
        message: 'No room available'
      })
      return
    }

    const allocated = suitableRooms.reduce((smallest, current) =>
      current.capacity < smallest.capacity ? current : smallest
    )

    setOutput({
      type: 'success',
      message: `Allocated Room ${allocated.roomNo} (capacity ${allocated.capacity}).`,
      room: allocated
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Smart Hostel Room Allocation
            </h1>
            <p className="text-xs text-slate-500 sm:text-sm">
              Manage rooms and automatically allocate based on capacity and facilities.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:px-6 lg:py-8">
        <div className="space-y-6">
          <AddRoom onAdd={addRoom} />
          <RoomList rooms={rooms} />
        </div>

        <div className="space-y-6">
          <SearchAllocate rooms={rooms} onAllocate={allocateRoom} />

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold tracking-wide text-slate-700">
              Output
            </h2>
            {output ? (
              <div
                className={`rounded-xl border p-4 text-sm ${
                  output.type === 'success'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                    : 'border-rose-200 bg-rose-50 text-rose-900'
                }`}
              >
                <p className="font-medium">{output.message}</p>
                {output.room && (
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-700">
                    <div>
                      <span className="font-semibold text-slate-900">Room No:</span>{' '}
                      {output.room.roomNo}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900">Capacity:</span>{' '}
                      {output.room.capacity}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900">AC:</span>{' '}
                      {output.room.hasAC ? 'Yes' : 'No'}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900">Attached Washroom:</span>{' '}
                      {output.room.hasAttachedWashroom ? 'Yes' : 'No'}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-xs text-slate-500">
                <span className="mb-1 text-lg">📥</span>
                No actions yet. Search or allocate a room to see details here.
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-600 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-700">Total Rooms</span>
              <span className="text-base font-semibold text-slate-900">{rooms.length}</span>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default App

