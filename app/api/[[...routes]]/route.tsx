/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  title: 'Frog Frame',
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.image('/img2', async (c) => {

  const rowData = [{
    title: "ok",
    displayName: "some guy",
    userName: "@someguy"
  }, {
    title: "24 big time stasdffasdasfafssfduff happening",
    displayName: "some guy 2",
    userName: "@someguy2"
  }, {
    title: "rats!!!!!",
    displayName: "trash can",
    userName: "@tc4999"
  },{
    title: "ok",
    displayName: "some guy",
    userName: "@someguy"
  }]

  const rows = rowData.map((row, index) => {
    return (
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <span>{`${index}.`}</span>
          <div style={{ display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              {row.displayName && <span>{row.displayName}</span>}
              {row.userName && <span>{row.userName}</span>}
            </div>
            {row.title && <span>{row.title}</span>}
          </div>
        </div>
    )
  })

  return c.res({
    image: (      
      <div
      style={{
        alignItems: 'center',
        background: 'black',
        backgroundSize: '100% 100%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        height: '100%',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
      }}
    >
      <div
        style={{
          color: 'white',
          fontSize: 60,
          fontStyle: 'normal',
          letterSpacing: '-0.025em',
          lineHeight: 1.4,
          marginTop: 30,
          padding: '0 120px',
          whiteSpace: 'pre-wrap',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: "flex", flexDirection: "row"}}>
          header
        </div>
        <div         style={{
          color: 'white',
          fontSize: 24,

          display: 'flex',
          flexDirection: 'column',
        }}>
        {rows}
        </div>
      </div>
    </div>
    ),
    headers: {
      "cache-control": "max-age=0",
    }
  })

})

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
    image: '/img2',
    intents: [
      <TextInput placeholder="Enter custom fruit..." />,
      <Button value="apples">Apples</Button>,
      <Button value="oranges">Oranges</Button>,
      <Button value="bananas">Bananas</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)

// NOTE: That if you are using the devtools and enable Edge Runtime, you will need to copy the devtools
// static assets to the public folder. You can do this by adding a script to your package.json:
// ```json
// {
//   scripts: {
//     "copy-static": "cp -r ./node_modules/frog/_lib/ui/.frog ./public/.frog"
//   }
// }
// ```
// Next, you'll want to set up the devtools to use the correct assets path:
// ```ts
// devtools(app, { assetsPath: '/.frog' })
// ```
