import * as React from 'react'
import { createRoot } from 'react-dom/client';
import './popup.css'

chrome.runtime.sendMessage("from options", (response) => {
 console.log(response);
})

const App: React.FC<{}> = () => {
  return (
    <div>
      <img src="icon.png" />
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)

const reactRoot = createRoot(root)
reactRoot.render(<App />)
