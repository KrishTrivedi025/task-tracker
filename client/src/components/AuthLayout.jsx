import { motion } from "framer-motion";
import Logo from "./ui/Logo.jsx";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen bg-canvas">
      {/* Brand panel — hidden on small screens */}
      <div className="relative hidden w-1/2 overflow-hidden bg-ink lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-600 to-indigo-800" />
        {/* decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="relative flex h-full flex-col justify-between p-12">
          {/* Logo — text only, no icon box */}
          <Logo showIcon={false} className="[&_span]:text-white" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="max-w-md font-display text-4xl font-bold leading-tight text-white">
              Stay on top of everything that matters.
            </h2>
            <p className="mt-4 max-w-sm text-white/70">
              Capture tasks, set priorities, and track progress — all in one
              calm, focused workspace.
            </p>
          </motion.div>
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Task Tracker
          </p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          {/* Logo shown only on mobile (panel hidden) — text only */}
          <div className="mb-8 lg:hidden">
            <Logo showIcon={false} />
          </div>
          <h1 className="font-display text-2xl font-bold text-ink">{title}</h1>
          <p className="mt-1.5 text-sm text-ink-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}
