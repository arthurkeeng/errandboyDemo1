import './sidebar.css'
import logo from './../../assets/menu.png'
import plus from './../../assets/plus.png'
import message from './../../assets/message.png'
import question from './../../assets/question.png'
import history from './../../assets/history.png'
import settings from './../../assets/settings.png'
import { useContext, useState } from 'react'
import { Context } from '../../context/context'
const Sidebar = () => {

    const [extended , setExtended] = useState(false)
    const {onSent , previousPrompt , setRecentPrompt } = useContext(Context)

    const loadPrompt = async(prompt) =>{
      setRecentPrompt(prompt)
      await onSent(prompt)
    }
  return (
    <div className='sidebar'>
      <div className="top">
        <img src={logo}
        className='menu'
        onClick={() =>setExtended(prev => !prev)}
        />

        <div className="new_chat">
            <img src={plus} className='plus'/>
            {extended ? <p>New Chat</p> : null}
            
        </div>
        {extended ?
        <div className="recent">
            <p className="recent_title">Recent </p>
            {previousPrompt.map((item , index) =>{
                return (

            <div 
            onClick={() => loadPrompt(item)}
            className="recent_entry" key={index}>
                <img src={message}/>
                <p>{item.slice(0 , 15)}...</p>
            </div>
                )
            })}
        </div>
        : null
        }
      </div>
      <div className="bottom">
        <div className="bottom_item recent_entry" >
            <img src={question}/>
            {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom_item recent_entry" >
            <img src={history}/>
            {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom_item recent_entry" >
            <img src={settings}/>
            {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
