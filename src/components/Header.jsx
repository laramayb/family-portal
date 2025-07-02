import butterfly from "../assets/butterfly.png";

export default function Header() {
  return (
    <div 
      className="
        flex items-center gap-[6px] flex-nowrap overflow-hidden 
        bg-pink-300 px-4 py-2 w-fit mx-auto"
    >
      <div className="flex items-center gap-2">
      <img
        src={butterfly}
        alt="Butterfly icon"
        className="w-[64px] h-[64px] mr-[7px] ml-[15px] pixelated"
        style={{ width: "100px", height: "100px" }}
      />
        <h1 
          className="
            text-[#2f2f6e] font-pixel mb-[50px] tracking-[0.05em] 
            whitespace-nowrap scale-y-[1.3]"
        >
          Family Portal
        </h1>
      </div>
    </div>
  );
}