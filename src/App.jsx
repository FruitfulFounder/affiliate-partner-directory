import { useEffect, useRef } from 'react'
import config from './config.mjs'
import { render } from './render.mjs'
import { renderDemo } from './demos.mjs'
import { initializeInteractions } from './interactions.mjs'
import './App.css'

// Shared renderer consumes trusted repository configuration only, never visitor HTML.
// Keep rendering separate from the host so future customer compositions can reuse it.
const demoId = new URLSearchParams(window.location.search).get('demo')
const demoMarkup = renderDemo(demoId, config)
const markup = (demoMarkup || render(config)).match(/<body[^>]*>([\s\S]*)<\/body>/)[1]
const brandStyle = {
  '--navy': config.brand.colors.navy,
  '--blue': config.brand.colors.blue,
  '--paper': config.brand.colors.paper,
  '--font': config.brand.font,
  fontFamily: config.brand.font,
  color: config.brand.colors.navy,
}
export default function App() {
  const root = useRef(null)
  useEffect(() => {
    if (demoMarkup) document.title = 'AvaraPath — Fictional Website Demonstration'
    return initializeInteractions(root.current, config)
  }, [])
  return <div ref={root} className={`layout-${config.layout} nav-${config.navigation}`} style={brandStyle} dangerouslySetInnerHTML={{ __html: markup }} />
}
