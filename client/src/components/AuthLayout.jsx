import { motion } from "framer-motion";
import Logo from "./ui/Logo.jsx";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        <div className="mb-8">
          <Logo showIcon={false} />
        </div>
        <h1 className="font-display text-2xl font-bold text-ink">{title}</h1>
        <p className="mt-1.5 text-sm text-ink-muted">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </motion.div>
    </div>
  );
}
