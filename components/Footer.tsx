import React from 'react'
import Container from './Container'
import DarkModeToggle from './DarkModeToggle'

function Footer() {
  return (
    <footer className="pt-10 pb-12 bg-slate-300 border-t border-slate-400 dark:bg-slate-900 dark:border-slate-700">
      <Container className="text-center">
        <div className="flex justify-center mb-5">
          <DarkModeToggle />
        </div>
        <p className="text-sm dark:text-white">Made with 💜 by <a href="https://github.com/trvswgnr" className="underline hover:opacity-60">Travis Aaron Wagner</a></p>
      </Container>
    </footer>
  )
}

export default Footer
