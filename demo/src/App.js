import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { generateWifiQRCode } from 'wifi-qr-code-generator'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(10)
      // width: 948,
      // flexGrow: 1
    },
    mainPanel: {
      padding: theme.spacing(5)
    },
    inputSide: {
      minWidth: 450,
      padding: theme.spacing(2)
    },
    outputSide: {
      minWidth: 200,
      padding: theme.spacing(2),
      textAlign: 'center',
      height: '100%'
    },
    outputImage: {
      paddingTop: 16,
      paddingBottom: 16
    },
    encryptionRow: {
      marginTop: theme.spacing(4)
    },
    formControl: {
      // marginTop: theme.spacing(1)
      // minWidth: 120,
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
                WiFi-QR-Code-Generator Demo
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant='caption' display='block' gutterBottom>
                This is a demo of{' '}
                <a href='https://www.npmjs.com/package/wifi-qr-code-generator'>
                  wifi-qr-code-generator npm module
                </a>
                . Source code{' '}
                <a href='https://github.com/fantasywidgets/wifi-qr-code-generator/'>
                  available in GitHub
                </a>
                .
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Paper elevation={3} className={classes.mainPanel}>
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='flex-start'
              wrap='nowrap'
            >
              <Grid item xs={6} className={classes.inputSide} zeroMinWidth>
                <form noValidate autoComplete='off'>
                  <Grid
                    container
                    direction='column'
                    justify='center'
                    alignItems='flex-start'
                  >
                    <Grid item xs={12}>
                      <Grid
                        container
                        justify='flex-start'
                        alignItems='flex-start'
                      >
                        <Grid item xs={9}>
                          <TextField
                            id='ssid'
                            label='WiFi Name (SSID)'
                            value={ssid}
                            onChange={handleSSIDChange}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Tooltip title='Is this a hidden WiFi network?' arrow>
                            <FormControlLabel
                              control={
                                <Checkbox
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
                    <Grid item xs={12}>
                      <TextField
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
              </Grid>
              <Grid item xs={6} zeroMinWidth>
                <div className={classes.outputSide}>
                  {output && ssid ? (
                    <>
                      <img
                        src={output}
                        className={classes.outputImage}
                        alt='qr-code'
                        id='qr-code-image'
                        width='150'
                        height='150'
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default App
