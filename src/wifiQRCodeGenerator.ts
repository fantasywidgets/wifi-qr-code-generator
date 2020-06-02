const qrcode = require("qrcode");

export interface Config {
  ssid: string;
  password: string;
  encryption: "WPA" | "WEP" | "None";
  hiddenSSID: boolean;
  outputFormat: OutputFormat;
}

export interface OutputFormat {
  type: "image/png" | "utf8" | "svg" | "terminal";
}

export async function generateWifiQRCode(input: Config) {
  const wifiString: string = generateString(input);
  try {
    if (input.outputFormat.type === "image/png") {
      console.log("Calling toDataURL", input.outputFormat.type);
      const retVal: string = await qrcode.toDataURL(
        wifiString,
        input.outputFormat
      );
      return retVal;
    } else {
      const retVal: string = await qrcode.toString(
        wifiString,
        input.outputFormat
      );
      return retVal;
    }
  } catch (err) {
    throw err;
  }
}

function generateString(input: Config) {
  const ssid: string = mecardFormat(input.ssid);
  const password: string = mecardFormat(input.password);

  let retVal = `WIFI:S:${ssid};P:${password};H:${input.hiddenSSID};`;
  if (input.encryption !== "None") {
    retVal += `T:${input.encryption};`;
  }

  return retVal;
}

function mecardFormat(input: string): string {
  input = input.replace(/\\/g, "\\\\");
  input = input.replace(/"/g, '\\"');
  input = input.replace(/;/g, "\\;");
  input = input.replace(/,/g, "\\,");
  input = input.replace(/:/g, "\\:");
  return input;
}
