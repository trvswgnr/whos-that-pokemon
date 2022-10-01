import Container from '../components/Container'
import Main from '../components/Main'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <div className="bg-white dark:bg-slate-800 min-h-screen">
        <Container className="text-center">
          <h1 className="text-4xl pt-10 pb-5 font-black dark:text-white">
            Who&lsquo;s that Pokémon?
          </h1>
          <Main />
        </Container>
      </div>
      <Footer />
    </>
  )
}







