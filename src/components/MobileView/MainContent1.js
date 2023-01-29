import React,{useState,useEffect} from 'react'
import '../../styles/MobileViewStyles/MainContent1.css'
import { RiMenu5Line,RiHomeSmile2Line,RiQuestionMark } from "react-icons/ri";
import { BiCube } from "react-icons/bi";
import { TbTriangle } from "react-icons/tb";
import Markdown from "markdown-to-jsx";
// TbTriangle

export default function MainContent1() {
    const [content,setcontent]=useState("")
    useEffect(()=>{
        import('../MDfiles/About_Cauchy’s_theorem.md')
        .then((res) => {
          fetch(res.default)
            .then((res) => res.text())
            .then((res) => setcontent(res))
            .catch((err) => console.log(err));
        })
       
      
      },[])
  return (
    <div>
        
        
        <div className='NavBarMV'>
            <div className='IconAndNavItem' style={{backgroundColor:"rgba(51,154,240,255)",color:"white"}}>
                <RiMenu5Line className='IconsMV'/>
                <p className='NavBarItemMV'>Theory</p>
            </div>

            <div className='IconAndNavItem'>
                <BiCube className='IconsMV'/>
                <p className='NavBarItemMV'>Simulation</p>
            </div>

            <div className='IconAndNavItem'>
                <RiHomeSmile2Line className='IconsMV'/>   
                <p className='NavBarItemMV'>Ask</p>
            </div>

            <div className='IconAndNavItem'>
                <RiQuestionMark className='IconsMV'/>
                <p className='NavBarItemMV'>Questions</p>
            </div>

            <div className='IconAndNavItem'>
                <TbTriangle className='IconsMV' style={{transform:"rotate(90deg)"}}/>
                <p className='NavBarItemMV'>Videos</p>
        </div>
        </div>

        <div className='FilesMV'>
          <Markdown>{content}</Markdown>
        </div>
    </div>
  )
}

