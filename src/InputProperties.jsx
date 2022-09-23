import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";
import useOBS from "./lib/useOBS";

export default function InputProperties({ inputName }) {
  const [ kind, setKind ] = useState()
  const [ properties, setProperties ] = useState(null)

  const obs = useOBS()

  useEffect(() => {
    setKind(null)
    setProperties(null)

    if (inputName)
      refresh()
  }, [ inputName ])

  async function refresh() {
    const { inputKind, inputSettings } = await obs.call('GetInputSettings', { inputName })
    const { defaultInputSettings } = await obs.call('GetInputDefaultSettings', { inputKind })

    setKind(inputKind)
    setProperties({ ...defaultInputSettings, ...inputSettings })
  }

  if (!properties)
    return

  return <Box m={1}>
    <Typography gutterBottom variant="h6">Properties ({inputName})</Typography>

    {Object.entries(properties).map(([ key, value ]) => 
      <TextField key={key} value={value} label={key} variant="standard" sx={{ m: 1 }} disabled />
    )}
  </Box>
}
