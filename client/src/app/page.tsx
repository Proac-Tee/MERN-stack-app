import Hero from "./components/Landingpage/Hero";

export default function Home() {
  return (
    <main className="max-w-[1600px] mx-auto">
      <div className=" bg-white overflow-hidden py-[4rem] md:py-[3rem] xl:py-[2rem] md:pl-[2rem] xl:pl-[5rem]">
        <Hero />
      </div>
    </main>
  );
}
