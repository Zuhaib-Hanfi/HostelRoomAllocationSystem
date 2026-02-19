# Smart Hostel Room Allocation

Smart, minimal hostel room allocation app built with React, Vite and Tailwind CSS.  
It focuses on one thing and does it well: define rooms and automatically allocate the **smallest suitable** room to a group of students based on their requirements.

---

## 1. Problem the app solves

Most hostel allocation is done manually in spreadsheets or on paper:
- You have to track capacities.
- You need to remember which rooms have AC / attached washroom.
- You must pick a room that is not too small, but also not wastefully large.

This app turns that into a small, focused web tool:
- You define each hostel room once.
- You describe the student group and their facility requirements.
- The app picks the **best fitting room** automatically and shows you exactly why it was chosen.

This is intentionally a **V0**: small surface area, no distractions, all core logic visible and easy to reason about.

---

## 2. Tech stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS (light, clean UI)
- **State management**: React hooks only (`useState`, `useMemo`) – no external libraries
- **Build tooling**: Vite (fast dev server + production build)

There is **no backend** in this version. Everything runs in the browser and stores data in memory.

---

## 3. Data model

Each room is represented in React state as a plain object:

- `roomNo: string` – unique room identifier (e.g. `"A-101"`)
- `capacity: number` – maximum number of students the room can hold
- `hasAC: boolean` – whether the room has AC
- `hasAttachedWashroom: boolean` – whether the room has an attached washroom

This directly mirrors the specification from the assignment and keeps the model easy to extend later if needed.

---

## 4. Core features (mapped to the brief)

### Add Room

- UI: **Add Room** card.
- Fields: `roomNo`, `capacity`, `hasAC`, `hasAttachedWashroom`.
- Basic validation:
  - Room number cannot be empty.
  - Capacity must be a positive integer.
- Once submitted, the room is added into the in-memory list and immediately visible in the **All Rooms** section.

### View All Rooms

- UI: **All Rooms** card.
- Displays every configured room with:
  - Room number
  - Capacity
  - AC badge (AC / No AC)
  - Washroom badge (Attached washroom / No washroom)
- If there are no rooms yet, it shows a clear empty state to guide the user.

### Search Rooms

- UI: **Search & Allocate** card.
- Search filters:
  - **Minimum required capacity** – number of students.
  - **AC** – `Any`, `Yes`, `No`.
  - **Attached washroom** – `Any`, `Yes`, `No`.
- Below the filters, a list of **Matching rooms** is rendered in real-time based on the current filters.

### Allocate Room

Allocation is triggered by the **Allocate Room** button on the Search & Allocate card.

Function signature in the app:

```ts
AllocateRoom(students: number, needsAC: boolean, needsWashroom: boolean)
```

Algorithm:
1. Start from the list of all rooms.
2. Filter to only rooms where:
   - `room.capacity >= students`
   - If `needsAC` is true, `room.hasAC` must be true.
   - If `needsWashroom` is true, `room.hasAttachedWashroom` must be true.
3. If no rooms pass the filter:
   - Show **“No room available”** in the Output panel.
4. If one or more rooms pass:
   - Sort conceptually by `capacity` and select the room with the **smallest capacity**.
   - Display the allocation result in the Output panel (room number, capacity, AC, washroom).

This matches the requirement to allocate the smallest possible room that satisfies all conditions.

---

## 5. Screens / UX overview

The app uses a two-column layout on desktop and a single-column, stacked layout on smaller screens:

- **Header**
  - Title: “Smart Hostel Room Allocation”
  - Short subtitle explaining the purpose.

- **Left column**
  - **Add Room** – form for defining rooms.
  - **All Rooms** – live list of every room currently configured.

- **Right column**
  - **Search & Allocate** – filters + Allocate button + live list of matching rooms.
  - **Output** – clearly shows either:
    - The allocated room (with full details), or
    - A friendly “No room available” message.
  - **Total Rooms** – small summary card with the current count of rooms.

The focus is on a smooth, minimal flow:
1. Add a few rooms.
2. Enter group requirements.
3. Hit **Allocate Room** and see the result instantly.

---

## 6. How to run locally

From the project root:

```bash
npm install
npm run dev
```

Then open the URL printed in the terminal (by default: `http://localhost:5173`).

For a production build:

```bash
npm run build
npm run preview
```

---

## 7. Possible next steps (if taking this beyond V0)

If this were to evolve into a production system, natural extensions would be:

- Persist rooms and allocations in a real database.
- Track which rooms are currently occupied vs. free.
- Support de-allocation / re-assignment flows.
- Add authentication and separate roles for admin vs. student.
- Export allocation reports for administration.

For the purposes of this assignment, the current scope intentionally stays lean and keeps all core allocation logic visible and easy to review.

