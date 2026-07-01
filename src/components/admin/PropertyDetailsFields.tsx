import { useState, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ROOM_COUNTS = ["1", "1,5", "2", "2,5", "3", "3,5", "4", "4,5", "5", "6+", "Ganze Wohnung", "Ganzes Haus"];
const FLOORS = ["EG", "1. OG", "2. OG", "3. OG", "4. OG", "5. OG+"];
const EXTRA_ROOMS = ["Kammer", "Keller", "Dachboden", "Garage", "Abstellraum", "Balkon/Terrasse", "Garten"];

interface Props {
  initialNote?: string;
  onNoteChange: (note: string) => void;
}

function parseNote(note: string) {
  let rooms = "2";
  let floor = "EG";
  let hasElevator = false;
  const extraRooms: string[] = [];

  // Parse rooms: "Ganze Wohnung", "Ganzes Haus", or "2,5-Zimmer-Wohnung"
  if (note.includes("Ganzes Haus")) {
    rooms = "Ganzes Haus";
  } else if (note.includes("Ganze Wohnung")) {
    rooms = "Ganze Wohnung";
  } else {
    const roomMatch = note.match(/(\d+(?:,5)?)-Zimmer/i);
    if (roomMatch) {
      const val = roomMatch[1];
      if (ROOM_COUNTS.includes(val)) rooms = val;
    }
  }

  // Parse floor
  for (const f of FLOORS) {
    if (note.includes(f)) { floor = f; break; }
  }

  // Parse elevator
  if (note.includes("mit Aufzug")) hasElevator = true;

  // Parse extra rooms
  for (const room of EXTRA_ROOMS) {
    if (note.includes(room)) extraRooms.push(room);
  }

  return { rooms, floor, hasElevator, extraRooms };
}

export default function PropertyDetailsFields({ initialNote, onNoteChange }: Props) {
  const parsed = useRef(false);
  const initial = initialNote && !parsed.current ? parseNote(initialNote) : null;
  if (initial) parsed.current = true;

  const [rooms, setRooms] = useState(initial?.rooms ?? "2");
  const [floor, setFloor] = useState(initial?.floor ?? "EG");
  const [hasElevator, setHasElevator] = useState(initial?.hasElevator ?? false);
  const [extraRooms, setExtraRooms] = useState<string[]>(initial?.extraRooms ?? []);
  const isFirstRender = useRef(true);
  const onNoteChangeRef = useRef(onNoteChange);
  onNoteChangeRef.current = onNoteChange;

  useEffect(() => {
    // Skip first render if we have an initialNote to avoid overwriting with regenerated text
    if (isFirstRender.current && initialNote) {
      isFirstRender.current = false;
      return;
    }
    isFirstRender.current = false;

    const parts: string[] = [];
    if (rooms === "Ganze Wohnung" || rooms === "Ganzes Haus") {
      parts.push(rooms);
    } else {
      parts.push(`${rooms}-Zimmer-Wohnung`);
    }
    if (extraRooms.length > 0) parts.push(`mit ${extraRooms.join(", ")}`);
    parts.push(`${floor}${hasElevator ? " mit Aufzug" : " ohne Aufzug"}`);
    const note = `${parts.join(", ")}. Besichtigung vor Ort erfolgt. Festpreis bezieht sich auf den bei der Besichtigung festgestellten Umfang.`;
    onNoteChangeRef.current(note);
  }, [rooms, floor, hasElevator, extraRooms]);

  const toggleExtra = (room: string) => {
    setExtraRooms((prev) =>
      prev.includes(room) ? prev.filter((r) => r !== room) : [...prev, room]
    );
  };

  return (
    <div className="space-y-3 rounded-md border border-dashed border-primary/30 bg-primary/5 p-3">
      <p className="text-xs font-semibold text-primary">Objektdetails</p>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs">Zimmeranzahl</Label>
          <Select value={rooms} onValueChange={setRooms}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {ROOM_COUNTS.map((r) => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">Stockwerk</Label>
          <Select value={floor} onValueChange={setFloor}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {FLOORS.map((f) => (
                <SelectItem key={f} value={f}>{f}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-xs">Aufzug vorhanden</Label>
        <Switch checked={hasElevator} onCheckedChange={setHasElevator} />
      </div>
      <div>
        <Label className="text-xs">Zusätzliche Räume</Label>
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1.5">
          {EXTRA_ROOMS.map((room) => (
            <label key={room} className="flex items-center gap-1.5 text-xs cursor-pointer">
              <Checkbox
                checked={extraRooms.includes(room)}
                onCheckedChange={() => toggleExtra(room)}
              />
              {room}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
