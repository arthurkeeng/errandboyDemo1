import React, { useContext } from 'react'
import './main.css'
import logo from './../../assets/1.jpg'
import booking from './../../assets/booking.png'
import reservation from './../../assets/reservation.png'
import image from './../../assets/image.png'
import send from './../../assets/send.png'
import fashion from './../../assets/fashion.png'
import botIcon from './../../assets/botIcon.png'
import userIcon from './../../assets/userIcon.png'
import services from './../../assets/services.png'
import { Context } from '../../context/context'
const Main = () => {
    const {onSent , recentPrompt , showResult , loading , resultData , setInput , input  , setLoading , setShowResult , setResultData , 
        setRecentPrompt , setPreviousPrompt
    } = useContext(Context)

    const delayParameters = (index , nextWord) =>{
        setTimeout(function(){
            setResultData(prev => prev + nextWord)
        } , 75 * index)
    }

    const handleClick = async () =>{
        setResultData("")
        setLoading(true) , 
        setShowResult(true)
        setRecentPrompt(input)
        setPreviousPrompt(prev => [...prev , input])
        let result = await onSent()
        if(result.hasReturned){
            let responseArray = result.response.split("**")
            let newResponse = "";
            for (let i = 0 ; i < responseArray.length ; i++){
                
                if( i == 0 || i % 2 !== 1){
                    newResponse += responseArray[i]
                }else{
                    newResponse += "<b>"+responseArray[i]+"</b>"
                }
            }
            let newerResponse = newResponse.split("*").join("</br>")

            let newResponseArray = newerResponse.split(" ");

            for (let i = 0 ; i < newResponseArray.length ; i++ ){
                const nextWord = newResponseArray[i]

                delayParameters(i , nextWord+" ")
            }
            // setResultData(newerResponse)
            setLoading(false)
            setInput("")

        }
        
    }
  return (
    <div className='main'>
      <div className="nav">
        <p>ErrandBoy</p>
        <img src={logo}/>
      </div>
      <div className="main_container">

        {!showResult ? <><div className="greet">
            <p>
                <span>Hello , Arthur</span>

            </p>
            <p>What Can We Get For You Today?</p>
        </div>
        <div className="cards">
            <div className="card">
                <p>
                    I would like to make reservations to any closest restaurant to my location
                </p>
                <img src={booking} alt="" />
            </div>
            <div className="card">
                <p>
                   Could you get me a dress identical to the image I uploaded?
                </p>
                <img src={fashion} alt="" />
            </div>
            <div className="card">
                <p>
                    I would like to order pepperoni pizza with fries on the sides.  Thanks
                </p>
                <img src={reservation} alt="" />
            </div>
            <div className="card">
                <p>
                    I have plumbing issues. Could you have a handiman handy?
                </p>
                <img src={services} alt="" />
            </div>
        </div></> : <div className='result'>
            <div className="result_title">
                <img src={userIcon} alt="" />
                <p>{recentPrompt}</p>
                    </div>
                <div className="result_data">
                    <img src={botIcon} alt="" />
                    {loading ? <div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                    </div> : 
<p 
                    dangerouslySetInnerHTML={{
                        __html: resultData
                    }}
                    ></p>
                }
                    
                </div>

        </div>
        }
        
        <div className="main_bottom">
            <div className="search_box">
                <input 
                onChange={(e) =>setInput(e.target.value)}

                value={input}
                type="text" placeholder='What would you like?' />
                <div className="">
                    <img src={image} alt="" />
                    <img src={send} alt="" 
                    onClick={handleClick}
                    />
                    {/* <img src="" alt="" /> */}
                </div>
            </div>
            <p className="bottom_info">
                Kindly make sure to give adequate description of what you'd like so Errand boy doesn't make mistakes in your requests
            </p>
        </div>
      </div>
    </div>
  )
}

export default Main
