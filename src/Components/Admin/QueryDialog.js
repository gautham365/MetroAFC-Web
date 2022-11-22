import * as React from "react";
// import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import axios from "axios";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function QueryDialog({ open, handleClose }) {
  const [value, setValue] = React.useState("SELECT * FROM journeys;");
  const [output, setOutput] = React.useState([]);
  const [errorOutput, seterrorOutput] = React.useState("Result will be displayed here");

  const handleRunQuery = () => {
    axios
      .post(process.env.REACT_APP_HOST + "/api/runQuery", {
        query: value,
      })
      .then((response) => {
        setOutput(response.data);
        seterrorOutput(false);
      })
      .catch((error) => {
        // setOutput(error.response.data.error);
        seterrorOutput(error?.response?.data?.error);
      });
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
            >
              Query Box
            </Typography>
          </Toolbar>
        </AppBar>
        <div
          style={{
            padding: "10px",
            minWidth: "100%",
            position: "relative",
            marginTop: "5px",
          }}
        >
          <TextField
            id="filled-multiline-static"
            label="Query"
            // multiline
            rows={4}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            sx={{
              width: "100%",
            }}
          />
          <Fab
            variant="extended"
            size="small"
            color="secondary"
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              width: "90px",
            }}
            onClick={handleRunQuery}
          >
            <PlayArrowRoundedIcon sx={{ mr: 1 }} />
            Run
          </Fab>
        </div>
        <div
          // className="glass-container"
          style={{
            // paddingInline: "10px",
            margin:"1vh",
            minWidth: "98%",
            marginTop: "15px",
            overflowX: "auto",
            overflowY: "auto",
            padding: "2vw 1vw",
            backgroundColor: 'black',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'rgba(255,255,255,0.13)',
              borderRadius: '10px',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255,255,255,0.1)',
              boxShadow: '0 0 40px rgba(8,7,16,0.6)',

              minWidth: "100%",
              maxWidth: "100%",
              color: "red",
              // borderRadius: "5px",
              // border: "1px solid #3f51b5",
              minHeight: "60vh",
              padding: "2vw",
              overflowX: "auto",
              // backgroundColor: errorOutput ? "#ffffff" : "#000000",
            }}
          >
            {errorOutput ? <>{errorOutput}</>
            //   output
             : (
              <table className="table">
                <thead>
                  <tr key={'head'} className='trow thead'>
                    {Object.keys(output[0]).map((key) => {
                      return <th scope="col" key={key}>{key}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {output.map((row,index) => {
                    return (
                      <tr key={index} className='trow'>
                        {Object.keys(row).map((key) => {
                          return <td key={key}>{row[key]}</td>;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </Box>
        </div>
      </Dialog>
    </div>
  );
}