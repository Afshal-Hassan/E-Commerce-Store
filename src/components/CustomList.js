import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import axios from "axios";

function CustomList(props) {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const [data, setData] = React.useState([]);

  const showModal = () => {
    props.setIsModalOpen(true);
  };

  // const generate = (element) => {
  //   return data?.map((index, value) =>
  //     React.cloneElement(element, {
  //       key: index,
  //       value,
  //     })
  //   );
  // };

  const getItem = () => {
    console.log("in get");
    axios
      .get("http://localhost:8000/products")
      .then((response) => {
        setData(response?.data);
        console.log(response?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <div>
      <Grid item xs={12} md={6} style={{ marginTop: 70, paddingLeft: 30 }}>
        <Typography
          sx={{ mt: 4, mb: 2 }}
          style={{ color: "gray" }}
          variant="h6"
          component="div"
        >
          Product & Items
        </Typography>
        <List dense={dense}>
          {data?.map((item) => (
            <ListItem
              secondaryAction={
                <div>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon style={{ color: "red", marginRight: 5 }} />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={showModal}
                  >
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
                primary={item?.name}
                secondary={secondary ? "Secondary text" : null}
              />
              <ListItemText
                style={{ color: "gray" }}
                primary={`${item?.prices}$`}
                secondary={secondary ? "Secondary text" : null}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </div>
  );
}

export default CustomList;
