import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate();

  return (
    <main className=" bg-black text-white h-screen">
      
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6">
        <div className="max-w-5xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Think Better.
            <span className="block bg-gradient-to-r from-[#2A3B8F] to-[#8A2BE2] bg-clip-text text-transparent">
              Prompt Smarter.
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Noema AI optimizes prompts using structured memory, intent-aware reasoning, and intelligent refinement.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <button onClick={() => navigate('/signup')} className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#2A3B8F] to-[#8A2BE2] text-white font-medium shadow-lg hover:scale-[1.02] transition">
              Get Started
            </button>
            {/* <button className="px-8 py-4 rounded-xl border border-slate-300 font-medium hover:bg-slate-50 transition">
              View Demo
            </button> */}
          </div>
        </div>
      </section>

      </main>
  )}