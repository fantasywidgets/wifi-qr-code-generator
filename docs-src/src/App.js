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

import { generateWifiQRCode } from 'wifi-qr-code-generator'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(10),
      flexGrow: 1
    },

    inputSide: {
      marginLeft: theme.spacing(5),

      maxWidth: 500,
      minWidth: 500,
      width: 500
    },
    outputSide: {
      marginLeft: theme.spacing(5),
      maxWidth: 500,
      minWidth: 500,
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
      marginTop: theme.spacing(3),
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
    downloadButtonBar:{
      marginTop: theme.spacing(3)
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

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item className={classes.inputSide}>
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
        </Grid>
        <Grid item xs={6}>
          <>
            {output && ssid ? (
              <>
                <Paper className={classes.outputSide}>
                  <Grid
                    container
                    direction='column'
                    justify='center'
                    alignItems='center'
                  >
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
                        <img src={output} />
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

                    {downloadOptions ? (
                      <></>
                    ) : (
                      <Grid item xs={12}>
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
                              className={classes.button}
                              startIcon={<SaveIcon />}
                            >
                              Download PNG
                            </Button>

                            <Button
                              variant='contained'
                              color='primary'
                              className={classes.button}
                              startIcon={<SaveIcon />}
                            >
                              Download SVG
                            </Button>

                            <Button
                              variant='contained'
                              color='primary'
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
