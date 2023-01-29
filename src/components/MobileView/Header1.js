import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AiOutlineMenu, AiOutlineDown, AiOutlineRight, AiOutlineDatabase } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import '../../styles/MobileViewStyles/Header1.css'



import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';



export default function Header1() {

  const [chaptersList, setchaptersList] = useState([])
  const [selectedChapter, setselectedChapter] = useState("")
  const [topicList, settopicList] = useState([])
  const [selectedClass, setselectedClass] = useState("Class 1")
  const [selectedSubject, setselectedSubject] = useState("English")
  const [subjectsList, setsubjectsList] = useState([])

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [open1, setOpen1] = React.useState(false);


  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleClose = (value) => {
    setOpen1(false);
  };



  useEffect(() => {
    axios.get("http://localhost:3003/getSub").then((res) => {
      setsubjectsList(res.data)
    })
  }, [])


  useEffect(() => {
    axios.get("http://localhost:3003/getChapters").then((res) => {
      res.data.map((e, id) => {
        if (e.classname === selectedClass && e.subject === selectedSubject) {
          setchaptersList(e.topics)
        }
      })
    })


  }, [selectedSubject])

  function getTopics(prop) {
    axios.get("http://localhost:3003/getTopics").then((res) => {
      res.data.map((e, id) => {
        if (e.classname === selectedClass && e.subject === selectedSubject && e.topic === prop) {
          settopicList(e.subtopics)

        }
      })
    })
  }




  const toggleDrawer = (position, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [position]: open });
  };

  const list = (position) => (
    <Box
      sx={{ width: position === 'top' || position === 'bottom' ? 'auto' : 300 }}
      onKeyDown={toggleDrawer(position, false)}
    >
      <div style={{ display: "flex" }}>
        <img src='logo.png' alt='Vignam logo' className='LogoMV'></img>
        <p className='GoHomeMV'>Go back to home</p>
      </div>
      <List>
        {
          chaptersList.map((e, id) => (
            <div>
              <div key={id} className='IndividualChapterMV' onClick={() => {
                if (selectedChapter == e) {
                  setselectedChapter("")
                }
                else {
                  setselectedChapter(e)
                }
                getTopics(e)
              }}>

                <AiOutlineDatabase className='PageIconMV' color='rgba(51,154,240,255)' size={20} />
                <ListItemText primary={e} sx={{ pl: 3 }} />
                <AiOutlineRight style={{
                  transform: e === selectedChapter ? "rotate(90deg)" : "rotate(0deg)",
                }} className='RightIconMV1' />
              </div>
              {
                (e === selectedChapter) ?
                  <div className='AllTopics'>
                    {
                      topicList.map((e, id) => {
                        return (
                          <div>
                            <p className='IndividualTopicMV' onClick={
                              toggleDrawer(position, false)
                            }
                            >{e}</p>
                          </div>

                        )
                      })
                    }
                  </div> : null
              }
            </div>

          ))}
      </List>
    </Box>
  );



  return (
    <div>
      <div className='HeaderMV'>

        <React.Fragment key={"left"}>
          <Button onClick={toggleDrawer("left", true)}><AiOutlineMenu size={25} className="MenuIconMV" /></Button>
          <Drawer
            position={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </React.Fragment>
        <p className="ClassAndSubMV" onClick={handleClickOpen}>{selectedClass + "  " + selectedSubject}  <AiOutlineDown className='DownIcon' size={15} /></p>
        <BiSearch size={25} className="SearchIconMV" />

      </div>

      <SimpleDialog
        open1={open1}
        onClose={handleClose}
      />


    </div>
  )
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open1: PropTypes.bool.isRequired,

};



//====================================================================================================================================
//====================================================================================================================================



function SimpleDialog(props) {


  const classList = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6",
    "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"]


  const [selectedClass, setselectedClass] = useState("Class 1")
  const [selectedSubject, setselectedSubject] = useState("English")
  const [subjectsList, setsubjectsList] = useState([])
  const [subjectsList1, setsubjectsList1] = useState([])
  const [selectedClass1, setselectedClass1] = useState("")
  const [open, setOpen] = useState(true);
  const { onClose, selectedValue, open1 } = props;

  useEffect(() => {
    axios.get("http://localhost:3003/getSub").then((res) => {
      setsubjectsList(res.data)
    })
  }, [])

  const handleClose = () => {
    onClose({ selectedClass1, selectedSubject });
  };

  const handleClick = () => {
    setOpen(!open);
  };

  function AssignSubjects() {
    subjectsList.map((e, id) => {
      if (e.classname === selectedClass1) {
        setsubjectsList1(e.subjects)
      }
    })
  }


  return (
    <Dialog onClose={handleClose} open={open1}>
      <List
        component="nav"
        className='DialogBoxMV'
      >
        <h1 style={{ paddingLeft: "10px" }} className="SelectSubMV">Select Subjects</h1>
        <div className='ClassListMV'>


          {
            classList.map((e, id) => {
              return (
                <div>

                  <ListItemButton onClick={handleClick} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                      <ListItemText primary={e} onClick={() => {
                        setselectedClass1(e)
                        AssignSubjects()
                      }} className='IndividualClassMV' /><AiOutlineRight className='RightIconMV' size={15} />
                    </div>
                    <Collapse in={open && selectedClass1 === e} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton>
                          <div className='AllSubjectsMV'>

                            {
                              subjectsList1.map((e, id) => {
                                return (
                                  <div key={id}>
                                    <p onClick={() => {
                                      setselectedSubject(e)
                                    }} className="SubjectNameMV">{e}</p>
                                  </div>
                                )
                              })
                            }
                          </div>
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </ListItemButton>
                </div>
              )
            })
          }
        </div>
      </List>
    </Dialog>
  );
}



