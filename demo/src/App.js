import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup'
import SaveIcon from '@material-ui/icons/Save'
import PrintIcon from '@material-ui/icons/Print'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

import { generateWifiQRCode } from 'wifi-qr-code-generator'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(10),
      width: '100%',
      flexGrow: 1
    },

    inputSide: {
      // background: '#ffff00',
      // marginLeft: theme.spacing(5),
      // margin: 'auto',
      // maxWidth: 500,
      minWidth: 500,
      // width: '100%',
      padding: theme.spacing(5)
    },
    outputSide: {
      // background: '#ffff00',
      // marginLeft: theme.spacing(5),
      // margin: 0,

      // margin: 'auto',
      // maxWidth: 500,
      minWidth: 500,
      // width: '100%'
      padding: theme.spacing(5)
    },
    formRoot: {
      // '& > *': {
      //   margin: theme.spacing(1),
      //   width: '25ch'
      // }
    },
    passwordRow: {},
    encryptionRow: {
      marginTop: theme.spacing(4)
    },
    formControl: {
      margin: theme.spacing(1)
      // minWidth: 120,
    },
    downloadOptions: {
      marginTop: theme.spacing(7),
      width: '100%'
    },
    downloadOptionsPane: {
      width: '100%'
    },
    downloadButtonMain: {
      marginTop: theme.spacing(3)
    },
    button: {
      margin: theme.spacing(1)
    },
    downloadButtonBar: {
      marginTop: theme.spacing(3)
    },
    pdfOutput: {
      padding: theme.spacing(3),
      textAlign: 'center',
      margin: 0,
      minWidth: 530,
      maxWidth: 530
      // width: '100%'
      // overflow: 'visible'
    }
  })
)

function App() {
  const classes = useStyles()

  const [ssid, setSSID] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [encryption, setEncryption] = React.useState('WPA')
  const [hiddenSSID, setHiddenSSID] = React.useState(false)

  const [output, setOutput] = React.useState('')

  const [downloadOptions, setDownloadOptions] = React.useState(false)

  const [displaySSID, setDisplaySSID] = React.useState(true)
  const [displayPassword, setDisplayPassword] = React.useState(true)
  const [displayHeader, setDisplayHeader] = React.useState(true)

  const [headerText, setHeaderText] = React.useState(
    'Scan to connect to our WiFi'
  )

  const handleSSIDChange = (event) => {
    setSSID(event.target.value)
    updateOutput()
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    updateOutput()
  }

  const handleEncryptionChange = (event) => {
    setEncryption(event.target.value)
    updateOutput()
  }
  const handleHiddenSSIDChange = (event) => {
    setHiddenSSID(event.target.checked)
    updateOutput()
  }

  const updateOutput = async () => {
    if (ssid.trim() === '') {
      return
    }
    try {
      let out = await generateWifiQRCode({
        ssid: ssid,
        password: password,
        encryption: encryption,
        hiddenSSID: hiddenSSID,
        outputFormat: { type: 'image/png' }
      })
      setOutput(out)
    } catch (error) {
      console.log('error', error)
    }
  }

  const savePDF = async () => {
    try {
      const input = document.getElementById('pdf-output')
      const canvas = await html2canvas(input, {
        scrollY: -window.scrollY
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      // const pdfHeight = pdf.internal.pageSize.getHeight()
      // debugger
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`qr-code-${ssid}.pdf`)
    } catch (error) {
      console.log('error', error)
    }
  }

  const savePNG = async () => {
    const input = document.getElementById('pdf-output')
    const canvas = await html2canvas(input, {
      scrollY: -window.scrollY
    })
    const imgData = canvas.toDataURL('image/png')
    saveAs(imgData, `qr-code-${ssid}.png`)
    // html2canvas(document.getElementById('pdf-output'), ).then(function (canvas) {
    //   document.body.appendChild(canvas)
    // })
  }

  const print = () => {
    var printContents = document.getElementById('pdf-output').innerHTML
    var originalContents = document.body.innerHTML
    document.body.innerHTML = printContents
    window.print()
    document.body.innerHTML = originalContents
  }

  function saveAs(uri, filename) {
    var link = document.createElement('a')
    if (typeof link.download === 'string') {
      link.href = uri
      link.download = filename

      //Firefox requires the link to be in the body
      document.body.appendChild(link)

      //simulate click
      link.click()

      //remove the link when done
      document.body.removeChild(link)
    } else {
      window.open(uri)
    }
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        direction='column'
        justify='flex-start'
        alignItems='center'
        spacing={3}
      >
        <Grid item xs>
          <Grid
            container
            direction='column'
            justify='flex-start'
            alignItems='center'
            spacing={0}
          >
            <Grid item xs>
              <Typography variant='h3' gutterBottom>
                WiFi QR Code Login Generator
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant='caption' display='block' gutterBottom>
                A free utility to help you print a WiFi login card. Point your
                phone's camera at the QR Code to connect automatically.
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant='caption' display='block' gutterBottom>
                Your WiFi information is never sent to the server.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Paper elevation={1} className={classes.inputSide}>
            <form className={classes.formRoot} noValidate autoComplete='off'>
              <Grid
                container
                direction='column'
                justify='center'
                alignItems='flex-start'
              >
                <Grid item xs={12}>
                  <Grid container justify='center' alignItems='flex-start'>
                    <Grid item xs={9}>
                      <TextField
                        className={classes.formControl}
                        id='ssid'
                        label='WiFi Name (SSID)'
                        value={ssid}
                        onChange={handleSSIDChange}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Tooltip title='Is this a hidden WiFi network?' arrow>
                        <FormControlLabel
                          className={classes.formControl}
                          control={
                            <Checkbox
                              className={classes.formControl}
                              checked={hiddenSSID}
                              onChange={handleHiddenSSIDChange}
                              name='hidden'
                              color='primary'
                            />
                          }
                          label='Hidden?'
                        />
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.passwordRow}>
                  <TextField
                    // className={classes.formControl}
                    id='password'
                    label='Password'
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </Grid>

                <Grid item xs={12} className={classes.encryptionRow}>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Encryption</FormLabel>
                    <RadioGroup
                      row
                      aria-label='encryption'
                      name='encryption'
                      value={encryption}
                      onChange={handleEncryptionChange}
                    >
                      <FormControlLabel
                        value='WPA'
                        control={<Radio />}
                        label='WPA / WPA2'
                      />
                      <FormControlLabel
                        value='WEP'
                        control={<Radio />}
                        label='WEP'
                      />
                      <FormControlLabel
                        value='None'
                        control={<Radio />}
                        label='None'
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid item xs>
          <>
            {output && ssid ? (
              <>
                <Paper elevation={0} className={classes.outputSide}>
                  <Grid
                    container
                    direction='column'
                    justify='center'
                    alignItems='center'
                  >
                    <Grid item>
                      <Grid
                        container
                        direction='column'
                        justify='center'
                        alignItems='center'
                      >
                        <Paper elevation={3} className={classes.pdfOutput}>
                          <div id='pdf-output'>
                            {displayHeader ? (
                              <>
                                <Grid item xs={12}>
                                  <Typography variant='h6' gutterBottom>
                                    {headerText}
                                  </Typography>
                                </Grid>
                              </>
                            ) : (
                              <></>
                            )}

                            <Grid item xs={12}>
                              <div>
                                <img
                                  src={output}
                                  alt='qr-code-image'
                                  id='qr-code-image'
                                />
                              </div>
                            </Grid>
                            {displaySSID ? (
                              <>
                                <Grid item xs={12}>
                                  <Typography variant='subtitle1'>
                                    WiFi: <strong>{ssid}</strong>
                                  </Typography>
                                </Grid>
                              </>
                            ) : (
                              <></>
                            )}

                            {displayPassword ? (
                              <>
                                <Grid item xs={12}>
                                  <Typography variant='subtitle1' gutterBottom>
                                    Password: <strong>{password}</strong>
                                  </Typography>
                                </Grid>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </Paper>
                      </Grid>
                    </Grid>

                    {downloadOptions ? (
                      <></>
                    ) : (
                      <Grid item>
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={() => setDownloadOptions(true)}
                          className={classes.downloadButtonMain}
                        >
                          Download/Print
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                  {downloadOptions ? (
                    <>
                      <Grid
                        container
                        direction='column'
                        justify='center'
                        alignItems='flex-start'
                        className={classes.downloadOptions}
                      >
                        <Grid item xs={12}>
                          <Typography variant='h6' gutterBottom>
                            Download Options
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <FormGroup>
                            <Grid container>
                              <Grid item xs>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={displayHeader}
                                      onChange={(event) =>
                                        setDisplayHeader(event.target.checked)
                                      }
                                      name='displayHeader'
                                    />
                                  }
                                  label='Show Header'
                                />
                              </Grid>
                              <Grid item xs>
                                <TextField
                                  id='customHeader'
                                  label=''
                                  disabled={!displayHeader}
                                  value={headerText}
                                  // className={classes.downloadOptionsPane}
                                  onChange={(event) =>
                                    setHeaderText(event.target.value)
                                  }
                                />
                              </Grid>
                            </Grid>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={displaySSID}
                                  onChange={(event) =>
                                    setDisplaySSID(event.target.checked)
                                  }
                                  name='displaySSID'
                                />
                              }
                              label='Show WiFi Name'
                            />
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={displayPassword}
                                  onChange={(event) =>
                                    setDisplayPassword(event.target.checked)
                                  }
                                  name='displayPassword'
                                />
                              }
                              label='Show Password'
                            />
                          </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                          <div className={classes.downloadButtonBar}>
                            <Button
                              variant='contained'
                              color='primary'
                              onClick={savePNG}
                              className={classes.button}
                              startIcon={<SaveIcon />}
                            >
                              Download PNG
                            </Button>

                            <Button
                              variant='contained'
                              color='primary'
                              onClick={savePDF}
                              className={classes.button}
                              startIcon={<PictureAsPdfIcon />}
                            >
                              Download PDF
                            </Button>

                            <Button
                              variant='contained'
                              color='primary'
                              onClick={print}
                              className={classes.button}
                              startIcon={<PrintIcon />}
                            >
                              Print
                            </Button>
                          </div>
                        </Grid>
                      </Grid>
                    </>
                  ) : (
                    <> </>
                  )}
                </Paper>
              </>
            ) : (
              <> </>
            )}
          </>
        </Grid>
      </Grid>
    </div>
  )
}

export default App
