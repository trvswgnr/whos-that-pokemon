import Container from '../components/Container'
import Main from '../components/Main'
import Footer from '../components/Footer'
import Burst from '../components/Burst'

export default function Home() {
  return (
    <>
      <div className="bg-poke-red min-h-screen relative">
        <div className="absolute overflow-hidden h-full w-full flex justify-center items-center">
          <div className="w-full h-auto max-w-3xl absolute md:-top-8 scale-125">
            <Burst />
          </div>
        </div>
        <Container className="text-center relative">
          <h1 className="text-display text-7xl uppercase py-10">
            <span className="">Who&lsquo;s that Pokémon</span>&nbsp;?
          </h1>
          <Main />
        </Container>
      </div>
      <Footer />
    </>
  )
}
