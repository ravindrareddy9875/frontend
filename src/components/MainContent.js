import React, { useState, useEffect } from 'react'
import axios from 'axios';
import '../styles/MainContent.css'
import Markdown from "markdown-to-jsx";


export default function MainContent () {
 const [flag1,setflag1]=useState(true)
 const [flag2,setflag2]=useState(false)
 const [flag3,setflag3]=useState(false)
 const [flag4,setflag4]=useState(false)
 const [flag5,setflag5]=useState(false)
 const [answer,setanswer]=useState()
 const [content,setcontent]=useState("")
 const [questionList,setquestionList]=useState([])
 const [videosList,setvideosList]=useState([])
 const [filesList,setfilesList]=useState([])
 const [topic,settopic]=useState("")
  

  
useEffect(()=>{
  
  axios.get("http://localhost:3003/getfiles").then((res)=>{
    setfilesList(res.data)
    res.data.map((e,id)=>{
      if(e.topic===localStorage.getItem("topic")){
      import(`./MDfiles/${e.MdFile}`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setcontent(res))
          .catch((err) => console.log(err));
        })
      }
    })
})
})

useEffect(()=>{
 settopic(localStorage.getItem("topic"))
},[topic])

function getQuestions(){
axios.get("http://localhost:3003/getquestions").then((res)=>{
  setquestionList(res.data)
})
}

function getVideos(){
  axios.get("http://localhost:3003/getvideos").then((res)=>{
  setvideosList(res.data)
})
}



const videoLink="https://www.youtube.com/embed/"
let count=0
 


  return (
    
    <div>
      
      <div className='AllHeadings'>

        <p className='Heading' style={{backgroundColor:flag1 ? "rgb(51,154,240)" : "rgb(214, 228, 241)",
                                      color: flag1 ? "white" : "rgb(51, 154, 240)",}} onClick={()=>{
          setflag1(true)
          setflag2(false)
          setflag3(false)
   
        }}>Theory</p>

        <p className='Heading'>Simulation</p>
        <p className='Heading'>Ask Doubts</p>

        <p className='Heading' style={{backgroundColor:flag2 ? "rgb(51,154,240)" : "rgb(214, 228, 241)",
                                      color: flag2 ? "white" : "rgb(51, 154, 240)",}} onClick={()=>{
          setflag1(false)
          setflag2(true)
          setflag3(false)
          getVideos()
        }}>Video/Animation</p>

        <p className='Heading' style={{backgroundColor:flag3 ? "rgb(51,154,240)" : "rgb(214, 228, 241)",
                                      color: flag3 ? "white" : "rgb(51, 154, 240)",}} onClick={()=>{
          setflag1(false)
          setflag2(false)
          setflag3(true)
          getQuestions()
        }}>Questions</p>
      </div>

        {
          flag1 ? <div className='Files'>
          
          <Markdown>{content}</Markdown>
          </div> : null

        }
        {
          flag2 ?
          <div className='AllVideos'>
            {
              videosList.map((e,id)=>{
                count+=1
                return(
                  <div>
                    <h3>Video - {count}</h3>
                     <iframe 
                width="75%"
                height="350"
                src={videoLink+e.videoId}
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
              >
          </iframe>
                  </div>
                )
              })
            }
           
          </div>
            :null
        }
       
      {
        flag3 ?

        <div className='AllQuestions'>
            {
              questionList.map((e,id)=>{
                return(
                  <div className='QuestionAndOptions'>
                    <p className='Question'>{e.question}</p>
                    {
                      e.options.map((e1,id1)=>{
                        return(
                          <div className='BoxOption' style={{
                            backgroundColor:e1===answer && e.correctAnswer!==answer ? "rgb(246, 173, 173)" : null
                            }}>
                              <div  style={{
                            backgroundColor:e1===answer && e.correctAnswer===answer ? "rgb(188, 248, 192)" : null,
                            paddingBottom:e1===answer && e.correctAnswer===answer ? "10px" : null,
                            paddingTop:e1===answer && e.correctAnswer===answer ? "10px" : null,
                            }}>
                              <input type="radio" id={e1} value={e1} name="numbers" onClick={(event)=>setanswer(event.target.value)}></input>
                              <label  className="Options">{e1}</label>
                              </div>
                          </div>
                        )
                      })
                    }
                        
                        
                  </div>

                )
              })
            }
        </div>

        : null
      }



    </div>
  )
}





























{/* <ul>

<li>Front End Design
    <ul>
         
           {
            classList.map((e, id) => {
                return (
                        <li className='IndividualClass' onMouseOver={() => {
                            setselectedClass1(e)
                            AssignSubjects()
                        }
                        }>{e}<AiOutlineRight className='RightIcon' size={15} />

                        <ul>
                            {
                                subjectsList1.map((e, id) => {
                                    return (
                                        <div key={id}>
                                            <li onClick={() => {
                                                setselectedSubject(e)
                                                setshowclasses(!showClasses)
                                            }} className="SubjectName">{e}</li>
                                        </div>
                                    )
                                })
                            }
                        </ul>
                        </li>
                )
            })
        }
           
    </ul>
</li>

</ul> */}



{/* <div className='AllClassses'>
<div>
    {
        classList.map((e, id) => {
            return (
                <div key={id}>
                    <p className='IndividualClass' onMouseOver={() => {
                        setselectedClass1(e)
                        AssignSubjects()
                    }
                    }>{e}<AiOutlineRight className='RightIcon' size={15} /></p>
                    
                </div>

            )
        })
    }
</div>
<div className='ClassSubjects'>
    {
        subjectsList1.map((e, id) => {
            return (
                <div key={id}>
                    <p onClick={() => {
                        setselectedSubject(e)
                        setshowclasses(!showClasses)
                    }} className="SubjectName">{e}</p>
                </div>
            )
        })
    }
</div>

</div>  */}




{/* <div class="dropdown">
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
   
    <li>
    Submenu &raquo;
     
      <ul class="dropdown-menu dropdown-submenu">
        <li>
          <a class="dropdown-item" href="#">Submenu item 1</a>
        </li>
        <li>
          <a class="dropdown-item" href="#">Submenu item 2</a>
        </li>
        <li>
          <a class="dropdown-item" href="#">Submenu item 3 &raquo; </a>
          <ul class="dropdown-menu dropdown-submenu">
            <li>
              <a class="dropdown-item" href="#">Multi level 1</a>
            </li>
            <li>
              <a class="dropdown-item" href="#">Multi level 2</a>
            </li>
          </ul>
        </li>
        <li>
          <a class="dropdown-item" href="#">Submenu item 4</a>
        </li>
        <li>
          <a class="dropdown-item" href="#">Submenu item 5</a>
        </li>
      </ul>



    </li>
  </ul>
</div> */}