import { featuresList } from "../utils/features-list";
import { FeatureCard } from "./feature-card";

export function Features() {
  return (
    <div className="bg-black py-[72px] text-white sm:py-24">
      <div className="container">
        <h2 className="text-center text-5xl font-bold tracking-tighter sm:text-6xl">
          Reading made simple
        </h2>
        <div className="mx-auto max-w-xl">
          <p className="mt-5 text-center text-xl text-white/70">
            Chapterly gives you the tools to build your personal library, track
            your progress, and stay motivated with a simple credit system. Add
            books, mark them complete, and see your journey come to life.
          </p>
        </div>
        <div className="mt-16 flex flex-col gap-4 sm:flex-row">
          {featuresList.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
}
