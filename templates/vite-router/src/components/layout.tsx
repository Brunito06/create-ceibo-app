import { Link, Outlet } from "react-router";

export function Layout() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b border-neutral-200 dark:border-neutral-800">
        <nav className="mx-auto flex h-16 max-w-3xl items-center gap-4 px-6">
          <Link to="/" className="font-semibold tracking-tight">
            __APP_TITLE__
          </Link>
          <Link
            to="/"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            About
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
