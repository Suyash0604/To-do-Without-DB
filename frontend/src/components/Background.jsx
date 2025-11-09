import React from 'react';

const Background = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[22vw] md:text-[16vw] leading-none tracking-tighter font-black uppercase text-white/5 select-none">
          NoteApp.
        </h1>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08)_0,_rgba(15,23,42,0)_60%)]" />
    </div>
  );
};

export default Background;

