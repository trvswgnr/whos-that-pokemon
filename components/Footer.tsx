import React from 'react'
import { Container } from '~/components'

export function Footer() {
  return (
    <footer className="py-14 border-t bg-slate-900 border-slate-700">
      <Container className="text-center">
        <p className="text-sm text-white mb-3">Made with 💜 by <a href="https://github.com/trvswgnr" className="underline hover:opacity-70">Travis Aaron Wagner</a></p>
        <p className="text-sm text-white">View project on <a href="https://github.com/trvswgnr/whos-that-pokemon" className="underline hover:opacity-70">GitHub</a></p>
      </Container>
    </footer>
  )
}
