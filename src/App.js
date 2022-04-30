import React from "react";
import { useEffect, useState } from "react";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button, TextField, Select, MenuItem } from "@material-ui/core";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import { AppBar, Box, Toolbar, Typography, Container, FormControl } from "@material-ui/core"
import { Edit, Delete } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@material-ui/core";
import axios from "axios";

const BASE_URL = "https://eg-men-back.herokuapp.com/api/v1/users/"

const useStyles = makeStyles((theme) => ({
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

function App() {
  const styles= useStyles();
  const [data, setData] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [user, setUser] = useState({
    "name": "",
    "type": "",
    "cellphone_number": "",
    "email": "",
    "gender": ""

  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }))
    console.log(user);
  }

  const getUser = async() => {
    await axios.get(BASE_URL)
      .then(response => {
        setData(response.data.data);
      })
  }

  const postUser = async() => {
    const user_body = {
      "name": user["name"],
      "type": user["type"],
      "cellphone_number": user["cellphone_number"],
      "email": user["email"],
      "gender": user["gender"]
    }

    await axios.post(BASE_URL, user_body)
      .then(response => {
        setUser([])
        getUser();
        abrirCerrarModalInsertar();
      })
  }

  const putUser = async() => {
    const user_body = {
      "name": user["name"],
      "type": user["type"],
      "cellphone_number": user["cellphone_number"],
      "email": user["email"],
      "gender": user["gender"]
    }

    await axios.put(BASE_URL + user.id, user_body)
      .then(response => {
        getUser()
        abrirCerrarModalUpdate();
      })
  }

  const deleteUser = async() => {
    await axios.delete(BASE_URL + user.id)
      .then(response => {
        getUser()
        abrirCerrarModalDelete();
      })
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsert(!modalInsert);
  }

  const abrirCerrarModalUpdate = () => {
    setModalUpdate(!modalUpdate);
  }

  const abrirCerrarModalDelete = () => {
    setModalDelete(!modalDelete);
  }

  useEffect(() => {
    getUser();
  }, [])

  const bodyCreate = (
    <>
      <DialogTitle>
        Agregar Nuevo Usuario
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ingresa la informacion en el formulario para crear un nuevo usuario.
        </DialogContentText>
        <TextField required name="name" label="Nombre" fullWidth margin="dense" onChange={handleChange} />
        <Select
          style={{ marginTop: '22px' }}
          required name="type"
          margin="dense"
          onChange={handleChange}
          label="Tipo de Usuario"
          fullWidth
        >
          <MenuItem value="sender">Sender</MenuItem>
          <MenuItem value="recipient">Recipient</MenuItem>
        </Select>
        <TextField required name="cellphone_number" label="Numero Celular" fullWidth multiline margin="dense" onChange={handleChange} />
        <TextField required name="email" label="Correo" fullWidth multiline margin="dense" onChange={handleChange} />
        <Select
          style={{ marginTop: '22px' }}
          required name="gender"
          margin="dense"
          onChange={handleChange}
          label="Genero"
          fullWidth
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
        <DialogActions>
          <Button color="primary" onClick={() => postUser()}>Insertar</Button>
          <br />
          <Button color="primary" onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>  
        </DialogActions>
      </DialogContent>
    </>
  )

  const bodyUpdate = (
    <>
      <DialogTitle>
        Editar Usuario
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Modifica la informacion en el formulario para editar a este Usuario.
        </DialogContentText>
        <TextField required name="name" label="Nombre" fullWidth margin="dense" onChange={handleChange} value={user.name} />
        <Select
          style={{ marginTop: '22px' }}
          required name="type"
          margin="dense"
          value={user.type}
          onChange={handleChange}
          label="Tipo de Usuario"
          fullWidth
          >
          <MenuItem value="sender">Sender</MenuItem>
          <MenuItem value="recipient">Recipient</MenuItem>
        </Select>
        <TextField required name="cellphone_number" label="Numero Celular" fullWidth onChange={handleChange} value={user.email} />
        <TextField required name="email" label="Correo" fullWidth onChange={handleChange} value={user.cellphone_number} />
        <Select
          style={{ marginTop: '22px' }}
          name="gender"
          margin="dense"
          value={user.gender}
          onChange={handleChange}
          label="Genero"
          fullWidth
          >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
        <DialogActions>
          <Button color="primary" onClick={() => putUser()}>Editar</Button>
          <br />
          <Button color="primary" onClick={() => abrirCerrarModalUpdate()}>Cancelar</Button>  
        </DialogActions>
      </DialogContent>
    </>
  )

  const bodyEliminar = (
    <>
      <DialogTitle id="alert-dialog-title">
        Eliminar Usuario
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          ¿Seguro quiere eliminar este Usuario <b>[{user.id}] {user.name}</b>?
        </DialogContentText>
        <DialogActions>
          <Button color="primary" onClick={() => deleteUser()}>Eliminar</Button>
          <br />
          <Button color="primary" onClick={() => abrirCerrarModalDelete()}>Cancelar</Button>  
        </DialogActions>
      </DialogContent>
    </>
  )

  const seleccionarConsola=(user, caso)=>{
    setUser(user);
    (caso==='Editar') ? abrirCerrarModalUpdate() : abrirCerrarModalDelete()
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              Evergreen - MEN
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Container style={{ marginTop: '30px' }}>
        <Typography
          variant="h3"
          noWrap
          component="div"
          sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
        >
          Usuarios
        </Typography>
        <br/>
        <Button startIcon={<AddIcon />} variant="outlined" onClick={() => abrirCerrarModalInsertar()}>Nuevo</Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Cellphone Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Created at</TableCell>
                <TableCell>Updated at</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.cellphone_number}</TableCell>
                  <TableCell>{item.gender}</TableCell>
                  <TableCell>{item.created_at}</TableCell>
                  <TableCell>{item.updated_at}</TableCell>
                  <TableCell>
                    <Edit className={styles.iconos} onClick={() => seleccionarConsola(item, 'Editar')} />
                    &nbsp;&nbsp;&nbsp;
                    <Delete className={styles.iconos} onClick={() => seleccionarConsola(item, 'Eliminar')} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Dialog
        open={modalInsert}
        onClose={abrirCerrarModalInsertar}
      >
        {bodyCreate}
      </Dialog>

      <Dialog
        open={modalUpdate}
        onClose={abrirCerrarModalUpdate}
      >
        {bodyUpdate}
      </Dialog>

      <Dialog
        open={modalDelete}
        onClose={abrirCerrarModalDelete}
      >
        {bodyEliminar}
      </Dialog>

    </div>
  )
}

export default App;