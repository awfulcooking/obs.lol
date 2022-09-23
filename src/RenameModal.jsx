import { Button, Grid, Modal, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react"

function autoFocus(el) {
  if (el)
    setTimeout(() => el.focus(), 0)
}

export default function RenameModal({ currentName, variant = "outlined", onConfirm, ...props }) {
  const [ newName, setNewName ] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    onConfirm(newName)
  }

  props.sx = {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    ...props.sx,
  }

  return <Modal {...props}>
    <Paper sx={{ padding: '3em' }} variant={variant}>
      <Typography variant="h5" sx={{ marginBottom: '0.5em' }}>
        Rename {currentName}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={8}>
            <TextField value={newName}
              onChange={e => setNewName(e.target.value)}
              inputProps={{ ref: autoFocus }}
              fullWidth={true}
              variant="standard" />
          </Grid>

          <Grid item xs>
            <Button type="submit" fullWidth={true} variant="outlined" color="warning">Confirm</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  </Modal>
}