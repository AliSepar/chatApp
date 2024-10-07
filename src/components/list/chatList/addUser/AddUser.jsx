function AddUser() {
  return (
    <div className="w-max h-max p-[30px] bg-[rgb(13,19,31)] rounded-lg absolute top-0 bottom-0 left-0 right-0 m-auto">
      <form action="" className="flex gap-5">
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="p-5 rounded-[10px] bg-white text-bgColor border-none outline-none"
        />
        <button className="p-5 bg-[#1a73e8] rounded-[10px] border-none outline-none cursor-pointer">
          Search
        </button>
      </form>
      <div className="mt-[50px] flex items-center justify-between">
        <div className="flex items-center gap-5">
          <img
            src="./avatar.png"
            alt=""
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
          <span>Jane Doe</span>
        </div>
        <button className="p-2 bg-[#1a73e8] rounded-[10px] border-none outline-none cursor-pointer">
          add User
        </button>
      </div>
    </div>
  );
}

export default AddUser;
