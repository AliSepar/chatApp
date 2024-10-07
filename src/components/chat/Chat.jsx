import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

function Chat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };
  return (
    <section className="lg:max-w-[55%] w-[100%] flex flex-col border-x-[1px] border-[#dddddd35] h-[100%]">
      <div className="p-3 flex items-center justify-between border-b-[1px] border-[#dddddd35]">
        {/* top */}
        <div className="flex items-center gap-5">
          <img
            src="./avatar.png"
            alt=""
            className=" w-[60px] h-[60px] rounded-full object-cover"
          />
          <div className="flex flex-col gap-[5px]">
            <span className="text-lg font-bold">Jame Doe</span>
            <p className="text-sm font-light text-[#a5a5a5]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <img src="./phone.png" alt="" className="w-5 h-5 cursor-pointer" />
          <img src="./video.png" alt="" className="w-5 h-5 cursor-pointer" />
          <img src="./info.png" alt="" className="w-5 h-5 cursor-pointer" />
        </div>
      </div>
      <div className="flex-1 p-5 scrollbar-custom flex flex-col gap-5">
        {/* center */}
        <div className="max-w-[70%] flex gap-5">
          <img
            src="./avatar.png"
            alt=""
            className="w-[30px] h-[30px] rounded-full object-cover"
          />
          <div className="flex-1 flex flex-col gap-[5px]">
            <p className="p-5 bg-bgColor rounded-md">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi
              sed inventore nobis distinctio magnam, velit, error atque ab
              tenetur, voluptas beatae? Sunt reiciendis placeat nostrum
              obcaecati eum praesentium aliquid deserunt.
            </p>
            <span className="text-xs">1 min ago</span>
          </div>
        </div>

        <div className="max-w-[70%] flex gap-5 own">
          <div>
            <img
              className="w-[100%] h-[300px] object-cover rounded-lg"
              src="https://media.istockphoto.com/id/603164912/photo/suburb-asphalt-road-and-sun-flowers.jpg?s=612x612&w=0&k=20&c=qLoQ5QONJduHrQ0kJF3fvoofmGAFcrq6cL84HbzdLQM="
              alt=""
            />
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi
              sed inventore nobis distinctio magnam, velit, error atque ab
              tenetur, voluptas beatae? Sunt reiciendis placeat nostrum
              obcaecati eum praesentium aliquid deserunt.
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="max-w-[70%] flex gap-5">
          <img
            src="./avatar.png"
            alt=""
            className="w-[30px] h-[30px] rounded-full object-cover"
          />
          <div className="flex-1 flex flex-col gap-[5px]">
            <p className="p-5 bg-bgColor rounded-md">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi
              sed inventore nobis distinctio magnam, velit, error atque ab
              tenetur, voluptas beatae? Sunt reiciendis placeat nostrum
              obcaecati eum praesentium aliquid deserunt.
            </p>
            <span className="text-xs">1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="p-5  mt-auto flex items-center gap-5 justify-between border-t-[1px] border-[#dddddd35]">
        {/* bottom */}
        <div className="flex flex-row gap-5">
          <img src="./img.png" alt="" className="w-5 h-5" />
          <img src="./camera.png" alt="" className="w-5 h-5" />
          <img src="./mic.png" alt="" className="w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="Type a message...."
          className="flex-1 bg-bgColor border-none outline-none text-white p-3 rounded-xl text-md"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className="relative">
          <img
            src="./emoji.png"
            alt=""
            className="w-5 h-5 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
          <div className="absolute bottom-[40px] left-0">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button
          type="button"
          className="text-white py-[10px] px-[20px] border-none bg-[#5183fe] rounded-md cursor-pointer"
        >
          Send
        </button>
      </div>
    </section>
  );
}

export default Chat;
