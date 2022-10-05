import React from 'react'
import Container from './Container'

function Footer() {
  return (
    <footer className="pt-10 pb-12 border-t bg-slate-900 border-slate-700">
      <Container className="text-center">
        <div className="flex justify-center mb-5">
        </div>
        <p className="text-sm text-white">Made with 💜 by <a href="https://github.com/trvswgnr" className="underline hover:opacity-60">Travis Aaron Wagner</a></p>
      </Container>
    </footer>
  )
}

export default Footer
