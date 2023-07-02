import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';



function CustomList(props) {



    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);





    const showModal = () => {
        props.setIsModalOpen(true);
    };








    const generate = (element) => {
        return [0, 1, 2].map((value) =>
            React.cloneElement(element, {
                key: value,
            }),
        );
    }





    return (
        <Grid item xs={12} md={6} style={{ marginTop: 70, paddingLeft: 30 }}>
            <Typography sx={{ mt: 4, mb: 2 }} style={{ color: "gray" }} variant="h6" component="div">
                Product & Items
            </Typography>
            <List dense={dense}>
                {generate(
                    <ListItem
                        secondaryAction={
                            <div>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon style={{ color: "red", marginRight: 5 }} />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={showModal}>
                                    <UpdateIcon style={{ color: "blue" }} />
                                </IconButton>
                            </div>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Sample Product"
                            secondary={secondary ? 'Secondary text' : null}
                        />
                        <ListItemText
                            style={{ color: "gray" }}
                            primary="12$"
                            secondary={secondary ? 'Secondary text' : null}
                        />
                    </ListItem>,
                )}
            </List>
        </Grid>
    )
}

export default CustomList