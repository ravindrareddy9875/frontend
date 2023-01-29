
import './App.css'
import axios from 'axios'
import React from "react";
import Header from './components/Header';



function App() {
const classname="Class 1"
const subject="English"
const topic="On Stories"
const videoIDs=["wnqkfpCpK1g","k2P_pHQDlp0","aircAruvnKk"]
const topicContent="Cauchy's Mean Value Theorem genralizes Lagrange's Mean Value Theorem. This theorem is also called the Extended  or Second Mean Value Theorem. It establishes the relationship between the derivatives of two functions and changes 4in these functions on a finite interval."
const chapterID="GapD_234shhq11"


  // used for posting data to mongodb
  function add(){
    axios.post("http://localhost:3003/addfinal",{classname,subject,topic,videoIDs,topicContent,chapterID}).then((res)=>{
      console.log(res.data)
    })
  }
 
  return (
    <div>
        <div>
          {/* <button onClick={add}>button1</button> */}
          <Header/>
         
        </div>

    </div>
  );
}

export default App;
