import { useContext, useEffect, useState } from "react";
import { Slider } from "@mui/material";

import OBSContext from "./lib/obsContext";

export default function InputVolumeSlider({ inputName }) {
  const obs = useContext(OBSContext)

  const [ volume, setVolume ] = useState()
  const [ moving, setMoving ] = useState()

  async function refresh() {
    const { inputVolumeMul } = await obs.call('GetInputVolume', { inputName })
    setVolume(inputVolumeMul)
  }

  function onOBSVolumeChange(change) {
    if (change.inputName === inputName && !moving)
      setVolume(change.inputVolumeMul)
  }

  function setVolumeInOBS(mul) {
    return obs.call('SetInputVolume', { inputName, inputVolumeMul: mul })
  }

  useEffect(() => {
    refresh()

    obs.on('InputVolumeChanged', onOBSVolumeChange)
    return () => {
      obs.off('InputVolumeChanged', onOBSVolumeChange)
    }
  }, [inputName])

  async function onMove(v) {
    setMoving(true)
    setVolume(v)
    setVolumeInOBS(v)
  }

  function onMoveFinished(v) {
    setMoving(false)
    setVolume(v)
    setVolumeInOBS(v)
  }

  const quad = v => v**4
  const mulToDb = v => 20 * Math.log10(v)

  if (volume === undefined)
    return

  return <Slider
      value={Math.pow(volume, 1/4)}
      onChange={(_, v) => onMove(quad(v))}
      onChangeCommitted={(_, v) => onMoveFinished(quad(v))}
      min={0}
      max={1}
      step={0.02}
      track="normal"
      valueLabelDisplay="auto"
      valueLabelFormat={v => `${mulToDb(quad(v)).toFixed(1)} dB`}
    />
}
