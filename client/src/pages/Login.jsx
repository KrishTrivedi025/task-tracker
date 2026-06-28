import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, Lock, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AuthLayout from "../components/AuthLayout.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const DEMO = { email: "demo@tasktracker.com", password: "Demo@1234" };

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  const validate = () => {
    const e = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const fillDemo = () => {
    setForm(DEMO);
    setDemoOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await login(form);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your account to continue.">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={onChange}
          error={errors.email}
          icon={<Mail size={16} />}
          autoComplete="email"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={onChange}
          error={errors.password}
          icon={<Lock size={16} />}
          autoComplete="current-password"
        />

        {/* Evaluator demo toggle */}
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-ink-faint">Evaluator? Use the demo account</span>
            <button
              type="button"
              onClick={() => setDemoOpen((o) => !o)}
              className="flex items-center gap-1 rounded-md bg-stone-100 px-2.5 py-1 text-xs font-semibold text-ink-soft transition hover:bg-stone-200 hover:text-ink"
            >
              Demo access
              <motion.span
                animate={{ rotate: demoOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={12} />
              </motion.span>
            </button>
          </div>

          <AnimatePresence>
            {demoOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -4 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -4 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-2 rounded-xl border border-line bg-stone-50 p-3">
                  <div className="mb-3 flex gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="mb-0.5 text-[9px] font-bold uppercase tracking-widest text-ink-faint">
                        Email
                      </p>
                      <p className="truncate font-mono text-xs text-ink-soft">
                        {DEMO.email}
                      </p>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-0.5 text-[9px] font-bold uppercase tracking-widest text-ink-faint">
                        Password
                      </p>
                      <p className="font-mono text-xs text-ink-soft">{DEMO.password}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={fillDemo}
                    className="w-full rounded-lg bg-brand-600 py-2 text-xs font-semibold text-white transition hover:bg-brand-500 active:scale-[0.98]"
                  >
                    Fill credentials automatically
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button type="submit" size="lg" loading={loading} className="w-full">
          Sign in
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-ink-muted">
        Don't have an account?{" "}
        <Link to="/signup" className="font-medium text-brand-600 hover:underline">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}
