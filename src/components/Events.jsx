import { useState, useEffect } from "react";

export default function Events() {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("familyEvents");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const addEvent = () => {
    if (!title || !date) return;

    const newEvent = { title, date };
    const updated = [...events, newEvent];
    setEvents(updated);
    localStorage.setItem("familyEvents", JSON.stringify(updated));
    setTitle("");
    setDate("");
  };

  const handleDelete = (indexToRemove) => {
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;

    const updated = events.filter((_, i) => i !== indexToRemove);
    setEvents(updated);
    localStorage.setItem("familyEvents", JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col gap-2 font-pixel text-xs h-full">
      <h2 className="text-[12px] text-[#234487] scale-y-[1.2] pt-[40px]">
        📅 Upcoming Events
      </h2>
      
      {/* Scrollable events box */}
      <div className="h-[200px] overflow-y-auto">
        <ul className="
            text-left list-disc list-outside text-[#234487]
            pr-[11px] pl-[11px] space-y-1"
        >
            {events.length === 0 ? (
            <li className="text-[#aaa] text-center text-[10px] italic">
                No events yet
            </li>
            ) : (
            events
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((event, i) => (
                <li key={i}
                    className="
                        flex justify-between items-start gap-2 pr-1 
                        border-b border-[#a9c1d9] pb-[4px] mb-[4px]"
                >
                    {/* event title */}
                    <div className="flex flex-col max-w-[92%] break-words">
                        <span className="
                            text-[#234487] text-[10px] font-semibold 
                            whitespace-pre-wrap"
                        >
                            {event.title}
                        </span>

                    {/* date */}
                        <span className="text-[9px] text-[#a24d61] mt-[2px]">
                            {new Date(event.date).toLocaleDateString()}
                         </span>
                    </div>
                    
                    {/* delete events button */}
                    <button
                        onClick={() => handleDelete(i)}
                        className="delete-button"
                        title="Delete"
                    >
                    ✖    
                    </button>
                </li>
                ))
            )}
        </ul>
      </div>

      {/* Event Form */}
      <div className="flex flex-col gap-1 mt-[5px]">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="
            bg-[#fff0f7] w-[93%] text-[10px] mx-auto mb-[3px] 
            border-2 border-[#a24d61] rounded-[6px] px-1 py-[1px] 
            text-[#a24d61] font-pixel scale-y-[1.1]"
        />
        <textarea
          type="text"
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={70}
          rows={1}
          className="
            bg-[#fff0f7] w-[93%] text-[10px] mx-auto resize-none 
            mb-[2px] border-2 border-[#a24d61] rounded-[6px]
            text-[#a24d61] font-pixel scale-y-[1.1] placeholder-[#d8bac1]"
        />
        <button
          onClick={addEvent}
          className="
            bg-[#ffd7f7] w-[95%] mb-[145px] mx-auto hover:bg-[#ffc6f2] 
            text-[#a24d61] border-2 border-[#a24d61] rounded-[6px] px-2 
            py-[2px] font-pixel scale-y-[1]"
        >
          ➕ Add Event
        </button>
      </div>
    </div>
  );
}