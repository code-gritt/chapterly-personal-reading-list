import * as Icon from "./icons";

export function Banner() {
  return (
    <div className="gradient-primary bg-gradient-to-r py-3 text-center">
      <div className="container flex items-center justify-center">
        <p className="flex gap-2 font-medium">
          <span className="hidden sm:inline">
            Chapterly helps you track, organize, and enjoy your reading journey.
          </span>
          <a
            href="#"
            className="flex items-center gap-1 underline underline-offset-4"
          >
            Explore Chapterly Features
            <span>
              <Icon.ArrowRight />
            </span>
          </a>
        </p>
      </div>
    </div>
  );
}
