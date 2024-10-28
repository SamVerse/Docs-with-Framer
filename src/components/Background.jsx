import React from "react";

function Background() {
  return (
    <div className="fixed z-0 w-full h-screen bg-zinc-800">
      <nav className="absolute top-[5%] w-full py-10 flex justify-center text-zinc-500 text-xl font-semibold">
        Docs on the Move
      </nav>
      <h1 className="absolute text-zinc-900 text-[13vw] leading-none tracking-tighter top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] font-semibold">
        Docs
      </h1>
    </div>
  );
}

export default Background;
