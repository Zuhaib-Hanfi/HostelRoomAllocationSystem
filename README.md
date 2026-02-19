# Smart Hostel Room Allocation

Small hostel allocation tool built with **React**, **Vite** and **Tailwind CSS**.  
You define rooms once, enter the student group and requirements, and the app picks the **smallest room that fits**.

---

## What it does

- Lets you add rooms with:
  - `roomNo`
  - `capacity`
  - `hasAC`
  - `hasAttachedWashroom`
- Shows a live list of all rooms.
- Lets you search rooms by:
  - minimum required capacity,
  - AC required (Any / Yes / No),
  - attached washroom required (Any / Yes / No).
- Allocates the **smallest possible** room that satisfies those filters.
- If no room qualifies, it shows **“No room available”**.

Everything runs fully on the frontend; data lives in memory in React state.

---

## How allocation works

Conceptual function:

```ts
AllocateRoom(students: number, needsAC: boolean, needsWashroom: boolean)
```

Steps:
1. Filter rooms where:
   - `capacity >= students`
   - `hasAC` is true if `needsAC` is true
   - `hasAttachedWashroom` is true if `needsWashroom` is true
2. If the filtered list is empty → show “No room available”.
3. Otherwise, choose the room with the **smallest capacity** from that list and show its details in the Output panel.

This matches the assignment’s requirement exactly.

---

## Screens at a glance

- **Header** – app name + short description.
- **Add Room** – form to define rooms (with simple validation).
- **All Rooms** – list of every room with capacity and facility badges.
- **Search & Allocate** – filters + Allocate button + list of matching rooms.
- **Output panel** – shows either the chosen room or “No room available”.

Layout is responsive: stacked on mobile, two columns on larger screens.

---

## Running the project

From the project root:

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

Build and preview:

```bash
npm run build
npm run preview
```


