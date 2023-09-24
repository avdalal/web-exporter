import * as React from 'react'
import { createRoot } from 'react-dom/client';
import './popup.css'
import '../utils/page'

const App: React.FC<{}> = () => {
  type Obj = {[key: string] : string | Object}
  const page: Obj = {};

  page._TemplateName= "tem";
  page._Url= "https://aws-br.888poker.com/the-team/kara-scott/";
  page._Name= "kara-scott";
  const _ComponentLis: Obj = {};
  const TableWithBlueHeading_0_2: Obj = {};
  
  TableWithBlueHeading_0_2.heading1 = "Ano";
  _ComponentLis.TableWithBlueHeading_0_2 = TableWithBlueHeading_0_2;
  page._ComponentLis = _ComponentLis;
  
  
  console.log(page);
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
