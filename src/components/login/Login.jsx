import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/uploada";

function Login() {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const [loading, setLoading] = useState(false);

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);
    // making the user , it will send the data to the firebase auth section
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const imgUrl = await upload(avatar.file);

      await setDoc(doc(db, "users", response.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: response.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", response.user.uid), {
        chats: [],
      });

      toast.success("Account Created! You can login now!");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }

    // e.target.reset();
    // setAvatar({
    //   file: null,
    //   url: "",
    // });
  };

  return (
    <section className="w-full h-full flex items-center gap-[100px]">
      <div className="item flex-1 flex flex-col items-center gap-5">
        <h2>Welcome back,</h2>
        <form
          className="flex flex-col items-center justify-center gap-5"
          onSubmit={handleLogin}
        >
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="p-5 bg-[rgba(17,25,40,0.6)] text-white rounded-lg outline-none border-none"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="p-5 bg-[rgba(17,25,40,0.6)] text-white rounded-lg outline-none border-none"
          />
          <button
            disabled={loading}
            className="w-full p-3 bg-[#1f8ef1]  text-white rounded-lg cursor-pointer font-medium transition-all duration-150 hover:bg-[#166ab3] disabled:cursor-not-allowed disabled:bg-[#1f8ff19c]  "
          >
            {loading ? "loading.." : "Sign In"}
          </button>
        </form>
      </div>

      <div className="separator h-[80%] w-[2px] bg-[#dddddd35]"></div>

      <div className="item flex-1 flex flex-col items-center gap-5">
        <h2>Create an Account</h2>
        <form
          className="flex flex-col items-center justify-center gap-5"
          onSubmit={handleRegister}
        >
          <label
            htmlFor="file"
            className="w-full flex items-center justify-between cursor-pointer underline"
          >
            <img
              src={avatar.url || "./avatar.png"}
              alt=""
              className="w-12 h-12 rounded-lg object-cover opacity-60"
            />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={handleAvatar}
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="p-5 bg-[rgba(17,25,40,0.6)] text-white rounded-lg outline-none border-none"
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="p-5 bg-[rgba(17,25,40,0.6)] text-white rounded-lg outline-none border-none"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="p-5 bg-[rgba(17,25,40,0.6)] text-white rounded-lg outline-none border-none"
          />
          <button
            disabled={loading}
            className="w-full p-3 bg-[#1f8ef1] text-white rounded-lg cursor-pointer font-medium transition-all duration-150 hover:bg-[#166ab3] disabled:cursor-not-allowed disabled:bg-[#1f8ff19c] "
          >
            {loading ? "loading.." : "Sign Up"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
