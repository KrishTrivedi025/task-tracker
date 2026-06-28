import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, Lock, Copy, Check } from "lucide-react";
import AuthLayout from "../components/AuthLayout.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const DEMO = { email: "demo@tasktracker.com", password: "Demo@1234" };

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-wide text-ink-muted">{label}</p>
        <p className="truncate text-sm font-mono font-medium text-ink">{value}</p>
      </div>
      <button
        type="button"
        onClick={copy}
        className="flex-shrink-0 rounded-md p-1.5 text-ink-muted transition hover:bg-line hover:text-ink"
        title={`Copy ${label}`}
      >
        {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
      </button>
    </div>
  );
}

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

  const fillDemo = () => setForm(DEMO);

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your account to continue.">
      {/* Demo credentials card */}
      <div className="mb-5 rounded-xl border border-brand-500/20 bg-brand-500/5 p-3.5">
        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-brand-600">
          Evaluator demo account
        </p>
        <div className="space-y-2">
          <CopyField label="Email" value={DEMO.email} />
          <div className="border-t border-brand-500/10" />
          <CopyField label="Password" value={DEMO.password} />
        </div>
        <button
          type="button"
          onClick={fillDemo}
          className="mt-3 w-full rounded-lg bg-brand-500/10 py-1.5 text-xs font-semibold text-brand-600 transition hover:bg-brand-500/20"
        >
          Fill credentials automatically
        </button>
      </div>

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
