<h1 align="center">Welcome to wifi-qr-code-generator 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/npm/v/wifi-qr-code-generator" />
  <a href="https://github.com/fantasywidgets/wifi-qr-code-generator/actions?query=workflow%3A%22Node.js+CI%22" target="_blank">
    <img alt="Build Status" src="https://img.shields.io/github/workflow/status/fantasywidgets/wifi-qr-code-generator/Node.js%20CI" />
  </a>
  <a href="https://github.com/fantasywidgets/wifi-qr-code-generator#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/fantasywidgets/wifi-qr-code-generator/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/fantasywidgets/wifi-qr-code-generator/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/fantasywidgets/wifi-qr-code-generator" />
  </a>
  <a href="https://twitter.com/anoopengineer" target="_blank">
    <img alt="Twitter: anoopengineer" src="https://img.shields.io/twitter/follow/anoopengineer.svg?style=social" />
  </a>
</p>

⭐️ Star us on GitHub — it helps!

wifi-qr-code-generator is an npm module to generate a QR Code to connect to your WiFi. Supports WiFi QR Codes in PNG, SVG, Terminal and UTF output formats. Works in both node server and browser.

<div align="center">
  <h3>
    <a href="https://github.com/fantasywidgets/wifi-qr-code-generator#readme">
      🏠 HomePage
    </a>
    <span> | </span>
    <a href="https://fantasywidgets.github.io/wifi-qr-code-generator">
      ✨ Demo
    </a>
    <span> | </span>
    <a href="https://github.com/fantasywidgets/wifi-qr-code-generator#usage">
      📃 Usage
    </a>
    <span> | </span>
    <a href="https://github.com/fantasywidgets/wifi-qr-code-generator/blob/master/CONTRIBUTING.md">
      🤝 Contributing
    </a>
  </h3>
</div>

## Install

Using NPM:

```sh
$ npm install wifi-qr-code-generator
```

Using Yarn:

```sh
$ yarn add wifi-qr-code-generator
```

## Usage

### Basic API — Generating a PNG QR Code

```javascript
const qrcode = require('wifi-qr-code-generator')
const pr = qrcode.generateWifiQRCode({
  ssid: 'Hello world',
  password: 'testpass',
  encryption: 'WPA',
  hiddenSSID: false,
  outputFormat: { type: 'image/png' }
})
pr.then((data) => console.log(data))
```

This prints the following output:

```
data:image/png;base64,iVBORw0KGgoAAA...
```

You can pass this data URL to an html `img` tag to generate the following QR code image:

<img src="data:image/png;base64,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" width="150"/>

### API Explanation

Main API call is `generateWifiQRCode` which is shown in the example above. This method takes an object of the following format:

```typescript
export interface Config {
  ssid: string
  password: string
  encryption: 'WPA' | 'WEP' | 'None'
  hiddenSSID: boolean
  outputFormat: OutputFormat
}

export interface OutputFormat {
  type: 'image/png' | 'utf8' | 'svg' | 'terminal'
}
```

1. `ssid`: string representation of your wireless SSID (Wifi name). Max length possible for WiFi SSID is 32 characters for most routers. However this library doesn't impose any limitation on the length of SSID that can be passed in.
1. `password`: string representation of your WiFi password
1. `encryption`: Possible values here are `WPA`, `WEP` and `None`. If you are using WPA2, enter `WPA`. Please note that WEP protocol has multiple security vulnerabilities and you shouldn't be configuring your WiFi router to use WEP at all.
1. `hiddenSSID`: should be `true` if your router is configured to NOT broadcast your SSID. Else `false`
1. `outputFormat`: An object that has a single `type` field

Possible values of `type` are:

1. `"image/png"`: `generateWifiQRCode` will generates a data URL representing a PNG image
1. `"svg"`: `generateWifiQRCode` will generates an SVG image in string format
1. `utf8`: `generateWifiQRCode` will generates a UTF8 representation of the QR code
1. `terminal`: `generateWifiQRCode` will generates a string that can be pretty printed as QR code in the terminal

### Generating a SVG QR Code

```javascript
const qrcode = require('wifi-qr-code-generator')
const pr = qrcode.generateWifiQRCode({
  ssid: 'Hello world',
  password: 'testpass',
  encryption: 'WPA',
  hiddenSSID: false,
  outputFormat: { type: 'svg' }
})
pr.then((data) => console.log(data))
```

This prints the following output:

```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41" shape-rendering="crispEdges">...
```

You can use the generated SVG directly in your HTML page to display the QR code.

<div style="width:150px;height:auto">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41" shape-rendering="crispEdges"><path fill="#ffffff" d="M0 0h41v41H0z"/><path stroke="#000000" d="M4 4.5h7m1 0h3m1 0h1m1 0h1m1 0h1m3 0h1m3 0h1m1 0h7M4 5.5h1m5 0h1m1 0h1m1 0h1m1 0h1m2 0h3m1 0h5m2 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m1 0h1m3 0h1m2 0h1m1 0h2m3 0h3m1 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m2 0h3m3 0h1m3 0h1m3 0h2m1 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h2m1 0h1m2 0h2m1 0h2m1 0h2m1 0h2m1 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m2 0h1m4 0h1m3 0h1m1 0h2m1 0h2m1 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M13 11.5h3m1 0h2m2 0h6m1 0h1M4 12.5h1m2 0h7m2 0h2m1 0h1m1 0h4m1 0h1m2 0h1m2 0h1m1 0h3M4 13.5h1m2 0h1m1 0h1m1 0h2m1 0h1m5 0h1m2 0h2m2 0h3m2 0h4M4 14.5h1m1 0h3m1 0h2m3 0h2m1 0h1m1 0h3m2 0h1m1 0h3m1 0h2m1 0h1M5 15.5h2m4 0h2m1 0h3m1 0h1m1 0h2m2 0h1m2 0h3m2 0h1m1 0h1M7 16.5h1m1 0h3m2 0h5m1 0h3m1 0h7m1 0h2m1 0h2M4 17.5h1m1 0h3m2 0h2m1 0h1m1 0h2m2 0h2m1 0h1m1 0h2m1 0h2m3 0h3M5 18.5h2m1 0h5m2 0h1m1 0h1m2 0h1m1 0h1m2 0h3m1 0h1m1 0h1m3 0h1M5 19.5h3m5 0h2m1 0h1m2 0h1m1 0h1m1 0h1m10 0h2M6 20.5h1m1 0h1m1 0h1m6 0h2m1 0h1m1 0h2M4 21.5h1m1 0h2m1 0h1m2 0h2m1 0h1m1 0h4m4 0h1m1 0h4m1 0h2m1 0h2M4 22.5h4m1 0h2m2 0h1m1 0h1m1 0h1m5 0h2m4 0h1m1 0h1m3 0h2M5 23.5h1m1 0h3m2 0h3m2 0h2m2 0h5m1 0h1m4 0h2M6 24.5h1m1 0h1m1 0h1m6 0h2m5 0h2m3 0h3m1 0h1m1 0h1M4 25.5h1m6 0h4m3 0h1m1 0h3m1 0h1m1 0h1m1 0h1m6 0h2M4 26.5h1m1 0h5m2 0h3m1 0h4m1 0h1m3 0h1m1 0h3m3 0h3M4 27.5h1m2 0h3m2 0h6m2 0h3m3 0h3m1 0h2m1 0h1M4 28.5h2m4 0h1m2 0h1m3 0h3m2 0h3m1 0h7m3 0h1M12 29.5h1m1 0h6m4 0h1m1 0h3m3 0h3M4 30.5h7m1 0h1m1 0h1m2 0h1m2 0h1m1 0h1m1 0h5m1 0h1m1 0h1m2 0h1M4 31.5h1m5 0h1m1 0h3m3 0h1m1 0h1m7 0h1m3 0h1m1 0h3M4 32.5h1m1 0h3m1 0h1m1 0h1m1 0h3m1 0h2m1 0h5m1 0h6m2 0h1M4 33.5h1m1 0h3m1 0h1m1 0h4m2 0h1m5 0h1m2 0h1m5 0h2M4 34.5h1m1 0h3m1 0h1m3 0h2m1 0h1m2 0h3m1 0h1m1 0h1m1 0h1m3 0h2m1 0h2M4 35.5h1m5 0h1m4 0h1m1 0h4m1 0h1m6 0h1m2 0h1m2 0h1M4 36.5h7m1 0h1m2 0h2m4 0h2m1 0h3m1 0h2m3 0h3"/></svg>
</div>

### Generating a UTF8 QR Code

```javascript
const qrcode = require('wifi-qr-code-generator')
const pr = qrcode.generateWifiQRCode({
  ssid: 'Hello world',
  password: 'testpass',
  encryption: 'WPA',
  hiddenSSID: false,
  outputFormat: { type: 'utf8' }
})
pr.then((data) => console.log(data))
```

This prints the following output:

```

    █▀▀▀▀▀█ █▀█ █ ▀▄█▄ ▄█▄▄▄▀ █▀▀▀▀▀█
    █ ███ █ ▀▄▄▄▀  █ ▀▀▄  ▀██ █ ███ █
    █ ▀▀▀ █ ▀█ ▀  █▀ ▀█ ██ ██ █ ▀▀▀ █
    ▀▀▀▀▀▀▀ ▀▄█▄▀▄█ ▀▄█▄█▄█ █ ▀▀▀▀▀▀▀
    █  █▀█▀██▀▄ ▀▀ ▀▄▀▀██ ▀▄▄█  █▄██▀
    ▀▄█▀▀ ▀█▄ ▄██ █ ██▀ ▄▀ ███ ▀█ █
    ▄ ▄█▄▀▀█▄ █▀██▀ ██▀▄▀██▀██▀ ▀█▄█▀
     ██▄▀▀▀▀▀▄▄▀▄▀ ▄▀▄▀▄ ▀▀▀ ▀ ▀  ▄█
    ▄ █▄▀▄▀ ▄▄ ▄ ██▄█ ▀▀ ▄ ▄▄▄▄ ▄▄ ▄▄
    ▀█▀█▄█▀ ▄█▄▀ █▄  ▄▄██▄ ▄ ▀ ▀▄▄ ▀▀
    ▄ ▀ ▀ ▀▄▄▄▄  ▀█ ▄▄▄ █▀▄ ▄▀▀▀ ▀ █▄
    █ ▀███▀ ▄███▄█▀▀█▄█   █▄█▀█▄ ▄▀▀▀
    ▀▀    ▀ ▄▀▄▄▄███  ▀▀█ ███▀▀▀█▄▄ ▀
    █▀▀▀▀▀█ █▄█  ▀▄ █ ▀ ▀▀▀▀█ ▀ █ ▄█▄
    █ ███ █ █▄██▀ █▀ ▀▀▀█▀ █▀▀▀▀▀▄▄▀
    █ ▀▀▀ █   ▀█ █▄▄█▀█ ▀ ▀ ▀▄  █▀ █▀
    ▀▀▀▀▀▀▀ ▀  ▀▀    ▀▀ ▀▀▀ ▀▀   ▀▀▀
```

### Generating a Terminal QR Code

```javascript
const qrcode = require('wifi-qr-code-generator')
const pr = qrcode.generateWifiQRCode({
  ssid: 'Hello world',
  password: 'testpass',
  encryption: 'WPA',
  hiddenSSID: false,
  outputFormat: { type: 'terminal' }
})
pr.then((data) => console.log(data))
```

This generates the following QR code in your terminal:

<img src="images/terminal-screenshot.png" alt="terminal-screenshot-qr-code" width="150"/>

## Author

👤 **Anoop Kunjuraman**

- Website: https://anoop.kunjuraman.com
- Twitter: [@anoopengineer](https://twitter.com/anoopengineer)
- Github: [@anoopengineer](https://github.com/anoopengineer)
- LinkedIn: [@anoopkunjuraman](https://linkedin.com/in/anoopkunjuraman)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/fantasywidgets/wifi-qr-code-generator/issues). You can also take a look at the [contributing guide](https://github.com/fantasywidgets/wifi-qr-code-generator/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Anoop Kunjuraman](https://github.com/anoopengineer).<br />
This project is [MIT](https://github.com/fantasywidgets/wifi-qr-code-generator/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
