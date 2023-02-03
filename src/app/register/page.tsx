"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { useAccount } from "@/lib/account-context";

export default function Page() {
  const { register } = useAccount();
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const request = await register(name, email, password);
    if (!request) {
      setLoading(false);
      return;
    }

    router.push("/timeline");
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                disabled={loading}
                onChange={(event) => setName(event.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:opacity-50 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                disabled={loading}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:opacity-50 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                disabled={loading}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:opacity-50 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white disabled:opacity-50 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
