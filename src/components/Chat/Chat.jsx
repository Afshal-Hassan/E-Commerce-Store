import React, { memo, useEffect } from "react";
import "./Chat.css";
import Messages from "../Messages/Messages";

function Chat() {




  // const history = useHistory();




  useEffect(() => {

    // if (!(localStorage.getItem("jwt") && localStorage.getItem("email"))) {

    //   history.push("/login");

    // }





  }, [])



  return (
    <div id="chat-layout">
      <Messages />
    </div>
  );
}

export default memo(Chat);