export function SiteFooter() {
  return (
    <footer className="border-border/40 border-t">
      <div className="text-muted-foreground mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-6 py-8 text-sm sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} __APP_TITLE__. All rights reserved.
        </p>
        <p>
          Built with{" "}
          <a
            href="https://github.com/ceibolabs/create-ceibo-app"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            create-ceibo-app
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
