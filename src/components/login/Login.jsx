import React, { useState } from "react";

function Login() {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  return (
    <section class="w-full h-full flex items-center gap-[100px]">
      <div class="item flex-1 flex flex-col items-center gap-5">
        <h2>Welcome back,</h2>
        <form class="flex flex-col items-center justify-center gap-5">
          <input
            type="text"
            placeholder="Email"
            name="email"
            class="p-5 bg-[rgba(17,25,40,0.6)] text-white rounded-lg outline-none border-none"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            class="p-5 bg-[rgba(17,25,40,0.6)] text-white rounded-lg outline-none border-none"
          />
          <button class="w-full p-5 bg-blue-500 text-white rounded-lg cursor-pointer font-medium hover:bg-blue-600">
            Sign In
          </button>
        </form>
      </div>

      <div class="separator h-[80%] w-[2px] bg-[#dddddd35]"></div>

      <div class="item flex-1 flex flex-col items-center gap-5">
        <h2>Create an Account</h2>
        <form class="flex flex-col items-center justify-center gap-5">
          <label
            for="file"
            class="w-full flex items-center justify-between cursor-pointer underline"
          >
            <img
              src={avatar.url || "./avatar.png"}
              alt=""
              class="w-12 h-12 rounded-lg object-cover opacity-60"
            />
            Upload an image
          </label>
          <input type="file" id="file" class="hidden" onChange={handleAvatar} />
          <input
            type="text"
            placeholder="Username"
            name="username"
            class="p-5 bg-[rgba(17,25,40,0.6)] text-white rounded-lg outline-none border-none"
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            class="p-5 bg-[rgba(17,25,40,0.6)] text-white rounded-lg outline-none border-none"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            class="p-5 bg-[rgba(17,25,40,0.6)] text-white rounded-lg outline-none border-none"
          />
          <button class="w-full p-5 bg-blue-500 text-white rounded-lg cursor-pointer font-medium hover:bg-blue-600">
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
