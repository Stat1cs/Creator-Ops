"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { LeadIntake, LeadType } from "@/lib/leads";

const AUDIENCE_OPTIONS = [
  "Under 10K",
  "10K – 25K",
  "25K – 50K",
  "50K – 100K",
  "100K+",
] as const;

type LeadFormProps = {
  type?: LeadType;
  intake?: LeadIntake;
  compact?: boolean;
  onSuccess?: () => void;
};

export default function LeadForm({
  type = "founding",
  intake = "full",
  compact = false,
  onSuccess,
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const emailOnly = intake === "email";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          emailOnly
            ? {
                email: data.get("email"),
                type,
                intake: "email",
              }
            : {
                name: data.get("name"),
                email: data.get("email"),
                audienceSize: data.get("audienceSize"),
                message: data.get("message"),
                type,
                intake: "full",
              }
        ),
      });

      const json = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(json.error ?? "Submission failed.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
      onSuccess?.();
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6 text-center">
        <p className="text-ink font-semibold mb-2">
          {emailOnly ? "You're on the list." : "Application received."}
        </p>
        <p className="text-mut text-sm">
          {emailOnly
            ? "We'll reach out with founding program updates."
            : "We'll review your details and respond within 24 hours."}
        </p>
        {emailOnly && (
          <Link
            href="/apply"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-display font-medium text-accent hover:underline"
          >
            Ready to apply? Complete the full application →
          </Link>
        )}
      </div>
    );
  }

  if (emailOnly) {
    return (
      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <div className="flex flex-col sm:flex-row gap-3">
          <label className="block flex-1">
            <span className="sr-only">Email</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="form-input"
            />
          </label>
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Sending…" : "Register interest"}
          </button>
        </div>

        {(status === "error" || error) && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? "space-y-3" : "space-y-4"}
      noValidate
    >
      <div className={compact ? "grid gap-3 sm:grid-cols-2" : "grid gap-4 sm:grid-cols-2"}>
        <label className="block">
          <span className="sr-only">Name</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className="form-input"
          />
        </label>
        <label className="block">
          <span className="sr-only">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="form-input"
          />
        </label>
      </div>

      <label className="block">
        <span className="sr-only">Audience size</span>
        <select name="audienceSize" required defaultValue="" className="form-input">
          <option value="" disabled>
            Audience size
          </option>
          {AUDIENCE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="sr-only">Message</span>
        <textarea
          name="message"
          required
          rows={compact ? 3 : 4}
          placeholder={
            type === "founding"
              ? "What would you build? Tell us about your content and audience."
              : "What are you looking to build?"
          }
          className="form-input resize-y min-h-[96px]"
        />
      </label>

      {(status === "error" || error) && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading"
          ? "Sending…"
          : type === "founding"
            ? "Submit application"
            : "Get started"}
      </button>
    </form>
  );
}
