import VolumeOffOutlined from '@mui/icons-material/VolumeOffOutlined'
import VolumeMuteOutlined from '@mui/icons-material/VolumeMuteOutlined'
import VolumeDownOutlined from '@mui/icons-material/VolumeDownOutlined'
import VolumeUpOutlined from '@mui/icons-material/VolumeUpOutlined'

export default function VolumeIcon({ volume, muted, ...props }) {
  let Icon = VolumeMuteOutlined 

  if (muted || volume <= -98)
    Icon = VolumeOffOutlined
  else if (volume <= -50)
    Icon = VolumeMuteOutlined
  else if (volume <= -20)
    Icon = VolumeDownOutlined
  else
    Icon = VolumeUpOutlined

  return <Icon {...props} />
}
