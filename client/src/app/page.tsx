import Hero from "./components/Landingpage/Hero";
import Overview from "./components/Landingpage/Overview";

export default function Home() {
  return (
    <main className="max-w-[1600px] mx-auto">
      <div className=" bg-white overflow-hidden py-[4rem] md:py-[3rem] xl:py-[2rem] md:pl-[2rem] xl:pl-[5rem]">
        <Hero />
      </div>
      <div className=" bg-white overflow-hidden px-[1rem] md:px-[2rem] xl:px-[5rem]">
        <Overview />
      </div>
    </main>
  );
}
