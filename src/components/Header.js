import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/Header.css'
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import Topics from './Topics';
import MainContent from './MainContent';

import Header1 from './MobileView/Header1';
import MainContent1 from './MobileView/MainContent1';


export default function Header() {
    const classList = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6",
        "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"]

    const [selectedClass, setselectedClass] = useState("Class 1")
    const [selectedClass1, setselectedClass1] = useState("")
    const [selectedSubject, setselectedSubject] = useState("English")
    const [showClasses, setshowclasses] = useState(false)
    const [subjectsList, setsubjectsList] = useState([])
    const [subjectsList1, setsubjectsList1] = useState([])


    const [screenSize, getDimension] = useState({
        dynamicWidth: window.innerWidth,
      });
    
      const setDimension = () => {
        getDimension({
          dynamicWidth: window.innerWidth,
        })
      }

    useEffect(() => {
        axios.get("http://localhost:3003/getSub").then((res) => {
            setsubjectsList(res.data)
        })
    }, [])

    useEffect(()=>{
        window.addEventListener('resize', setDimension);  
        return(() => {
            window.removeEventListener('resize', setDimension);
        })
    },[screenSize])


    function AssignSubjects() {
        subjectsList.map((e, id) => {
            if (e.classname === selectedClass1) {
                setsubjectsList1(e.subjects)
            }
        })
    }


    return (
        <div>
            {
                screenSize.dynamicWidth >=1150 ?
            
            <div>
            <div className='Header'>
                <div>
                    <img src='logo.png' alt='Vignam logo' className='Logo'></img>
                </div>
                <div>
                   
                <ul>

                    <li onMouseOver={() => setshowclasses(true)}  onClick={()=>setshowclasses(true)}
                     className="ClassAndSub">{selectedClass + "  " + selectedSubject}  <AiOutlineDown className='DownIcon' size={15} />
                    {
                        showClasses ?
                    
                        <ul className='AllClassses'>
                               {
                                classList.map((e, id) => {
                                    return (
                                            <li className='IndividualClass' onMouseOver={() => {
                                                setselectedClass1(e)
                                                AssignSubjects()
                                            }
                                            }>{e} <AiOutlineRight className='RightIcon' size={15} />

                                            <ul className='ClassSubjects'>
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
                               
                        </ul>:null
}
                    </li>

                </ul>

                        
                </div>

                <div className='Search'>
                    <BiSearch size={30} style={{ paddingTop: "1px" }} />
                    <input placeholder='Search for Topics and Chapters' style={{ "border": "none" }} className='SearchInput' />
                </div>
                <div>
                    <p className='LoginButton'>Login</p>
                </div>


            </div>

            <div className='Components'>
                <div style={{ width: "100%" }}>
                    <Topics classname={selectedClass} subject={selectedSubject} />
                </div>
                <div style={{ position: "absolute", marginLeft: "25%", width: "75%" }}>
                    <MainContent />
                </div>
            </div>
        </div>



         :
         
        <div>
            <Header1/>
            <div>
            <MainContent1/>
            </div>
        </div>

}

        </div>
    )
}

