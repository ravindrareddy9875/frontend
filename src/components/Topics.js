import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/Topics.css'
import { AiOutlineRight, AiOutlineDatabase } from "react-icons/ai";

export default function Topics({classname,subject}) {

  const [chaptersList, setchaptersList] = useState([])
  const [selectedChapter, setselectedChapter] = useState("")
  const [topicList, settopicList] = useState([])
  const [showTopics, setshowTopics] = useState(false)


  useEffect(() => {
    axios.get("http://localhost:3003/getChapters").then((res) => {
      res.data.map((e, id) => {
        if (e.classname === classname && e.subject === subject) {
          setchaptersList(e.topics)
        }
      })
    })



  }, [subject])

  function getTopics(prop) {
    axios.get("http://localhost:3003/getTopics").then((res) => {
      res.data.map((e, id) => {
        if (e.classname === classname && e.subject === subject && e.topic === prop) {
          settopicList(e.subtopics)

        }
      })
    })

  }
  return (
    <div>
      <div className='AllChapters'>
        {
          chaptersList.map((e, id) => {
            return (
              <div>
               
              <div key={id} className='IndividualChapter' onClick={() => {
                setshowTopics(!showTopics)
                setselectedChapter(e)
                getTopics(e)
              }}>
  
                <AiOutlineDatabase className='PageIcon' color='rgba(51,154,240,255)' />
                <p className='ChapterName'>{e}</p>
                <AiOutlineRight style={{
                  transform : showTopics && e === selectedChapter ? "rotate(90deg)" : "rotate(0deg)",
                  paddingLeft: showTopics && e === selectedChapter ? "20px" : "0px",
                }} className='RightIcon' />
                </div>
                {
                  (showTopics && e === selectedChapter) ?
                    <div className='AllTopics'>
                      {
                        topicList.map((e, id) => {
                          return (
                            <div>
                              <p className='IndividualTopic' onClick={()=>{
                                localStorage.setItem("topic",e)
                                console.log(e)
                                console.log(localStorage.getItem("topic"))
                                }}>{e}</p>
                            </div>

                          )
                        })
                      }
                    </div> : null
                }
               
             
              </div>
            )
          })
        }

      </div>
    </div>
  )
}
