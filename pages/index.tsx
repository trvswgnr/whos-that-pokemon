import { Container, Main, Footer, Burst, StreakCount } from '~/components'

export default function Home() {
  return (
    <>
      <div className="bg-poke-red min-h-[950px] relative">
        <StreakCount />
        <div className="absolute overflow-hidden h-full w-full flex justify-center items-center">
          <div className="w-full h-auto max-w-3xl absolute md:-top-8 scale-125">
            <Burst />
          </div>
        </div>
        <Container className="text-center relative">
          <h1 className="text-display text-7xl uppercase pb-10 pt-20">
            <span className="">Who&lsquo;s that Pokémon</span>&nbsp;?
          </h1>
          <Main />
        </Container>
      </div>
      <Footer />
    </>
  )
}
