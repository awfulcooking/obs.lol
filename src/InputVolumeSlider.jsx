import { useEffect, useState } from "react";
import { Slider } from "@mui/material";

import useOBS from './lib/useOBS'

export default function InputVolumeSlider({ inputName }) {
  const obs = useOBS()

  const [ volume, setVolume ] = useState()
  const [ moving, setMoving ] = useState()

  async function refresh() {
    const { inputVolumeMul } = await obs.call('GetInputVolume', { inputName })
    setVolume(inputVolumeMul)
  }

  function setVolumeInOBS(mul) {
    return obs.call('SetInputVolume', { inputName, inputVolumeMul: mul })
  }

  function onOBSVolumeChange(change) {
    if (change.inputName === inputName)
      setVolume(change.inputVolumeMul)
  }

  useEffect(() => {
    refresh()
  }, [inputName])

  useEffect(() => {
    if (!moving) {
      obs.on('InputVolumeChanged', onOBSVolumeChange)
      return () => obs.off('InputVolumeChanged', onOBSVolumeChange)
    }
  })

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
