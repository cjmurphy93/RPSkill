import React from 'react';
import './result.css';

const Result = ({winner}) => {
        //if (player counter === 2) {
        //return null
        // }
        
        const message = winner === "tie" ? "It's a Tie!" : `${winner} Wins!`;
      
        return (
            <>
                <section className="section-container conf-wrap">
                    {/* <div className="conf-149"></div>
                    <div className="conf-148"></div>
                    <div className="conf-147"></div>
                    <div className="conf-146"></div>
                    <div className="conf-145"></div>
                    <div className="conf-144"></div>
                    <div className="conf-143"></div>
                    <div className="conf-142"></div>
                    <div className="conf-141"></div>
                    <div className="conf-140"></div>
                    <div className="conf-139"></div>
                    <div className="conf-138"></div>
                    <div className="conf-137"></div>
                    <div className="conf-136"></div>
                    <div className="conf-135"></div>
                    <div className="conf-134"></div>
                    <div className="conf-133"></div>
                    <div className="conf-132"></div>
                    <div className="conf-131"></div>
                    <div className="conf-130"></div>
                    <div className="conf-129"></div>
                    <div className="conf-128"></div> */}
                    {/* <div className="conf-127"></div>
                    <div className="conf-126"></div>
                    <div className="conf-125"></div>
                    <div className="conf-124"></div>
                    <div className="conf-123"></div>
                    <div className="conf-122"></div>
                    <div className="conf-121"></div>
                    <div className="conf-120"></div>
                    <div className="conf-119"></div>
                    <div className="conf-118"></div>
                    <div className="conf-117"></div>
                    <div className="conf-116"></div>
                    <div className="conf-115"></div>
                    <div className="conf-114"></div>
                    <div className="conf-113"></div>
                    <div className="conf-112"></div>
                    <div className="conf-111"></div>
                    <div className="conf-110"></div>
                    <div className="conf-109"></div>
                    <div className="conf-108"></div>
                    <div className="conf-107"></div>
                    <div className="conf-106"></div>
                    <div className="conf-105"></div>
                    <div className="conf-104"></div>
                    <div className="conf-103"></div>
                    <div className="conf-102"></div>
                    <div className="conf-101"></div> */}
                    {/* <div className="conf-100"></div>
                    <div className="conf-99"></div>
                    <div className="conf-98"></div>
                    <div className="conf-97"></div>
                    <div className="conf-96"></div>
                    <div className="conf-95"></div>
                    <div className="conf-94"></div>
                    <div className="conf-93"></div>
                    <div className="conf-92"></div>
                    <div className="conf-91"></div>
                    <div className="conf-90"></div>
                    <div className="conf-89"></div>
                    <div className="conf-88"></div>
                    <div className="conf-87"></div>
                    <div className="conf-86"></div>
                    <div className="conf-85"></div>
                    <div className="conf-84"></div>
                    <div className="conf-83"></div>
                    <div className="conf-82"></div>
                    <div className="conf-81"></div> */}
                    {/* <div className="conf-80"></div> */}
                    {/* <div className="conf-79"></div>
                    <div className="conf-78"></div>
                    <div className="conf-77"></div>
                    <div className="conf-76"></div>
                    <div className="conf-75"></div>
                    <div className="conf-74"></div>
                    <div className="conf-73"></div>
                    <div className="conf-72"></div>
                    <div className="conf-71"></div>
                    <div className="conf-70"></div>
                    <div className="conf-69"></div>
                    <div className="conf-68"></div>
                    <div className="conf-67"></div>
                    <div className="conf-66"></div>
                    <div className="conf-65"></div>
                    <div className="conf-64"></div>
                    <div className="conf-63"></div>
                    <div className="conf-62"></div>
                    <div className="conf-61"></div>
                    <div className="conf-60"></div>
                    <div className="conf-59"></div>
                    <div className="conf-58"></div>
                    <div className="conf-57"></div>
                    <div className="conf-56"></div>
                    <div className="conf-55"></div>
                    <div className="conf-54"></div>
                    <div className="conf-53"></div>
                    <div className="conf-52"></div>
                    <div className="conf-51"></div> */}
                    <div className="conf-50"></div>
                    <div className="conf-49"></div>
                    <div className="conf-48"></div>
                    <div className="conf-47"></div>
                    <div className="conf-46"></div>
                    <div className="conf-45"></div>
                    <div className="conf-44"></div>
                    <div className="conf-43"></div>
                    <div className="conf-42"></div>
                    <div className="conf-41"></div>
                    <div className="conf-40"></div>
                    <div className="conf-39"></div>
                    <div className="conf-38"></div>
                    <div className="conf-37"></div>
                    <div className="conf-36"></div>
                    <div className="conf-35"></div>
                    <div className="conf-34"></div>
                    <div className="conf-33"></div>
                    <div className="conf-32"></div>
                    <div className="conf-31"></div>
                    <div className="conf-30"></div>
                    <div className="conf-29"></div>
                    <div className="conf-28"></div>
                    <div className="conf-27"></div>
                    <div className="conf-26"></div>
                    <div className="conf-25"></div>
                    <div className="conf-24"></div>
                    <div className="conf-23"></div>
                    <div className="conf-22"></div>
                    <div className="conf-21"></div>
                    <div className="conf-20"></div>
                    <div className="conf-19"></div>
                    <div className="conf-18"></div>
                    <div className="conf-17"></div>
                    <div className="conf-16"></div>
                    <div className="conf-15"></div>
                    <div className="conf-14"></div>
                    <div className="conf-13"></div>
                    <div className="conf-12"></div>
                    <div className="conf-11"></div>
                    <div className="conf-10"></div>
                    <div className="conf-9"></div>
                    <div className="conf-8"></div>
                    <div className="conf-7"></div>
                    <div className="conf-6"></div>
                    <div className="conf-5"></div>
                    <div className="conf-4"></div>
                    <div className="conf-3"></div>
                    <div className="conf-2"></div>
                    <div className="conf-1"></div>
                    <div className="conf-0"></div>
                    <div className="inner-container">
                        <div id="center-container">
                            Game Results
                        </div>
                        <div className="result-message">{message}</div>
                        <div className="players">
                            <div className="playerOne">
                                <h2>Player 1</h2>
                                <h2>ELO Change:</h2>
                            </div>
                            <div className="playerTwo">
                                <h2>Player 2</h2>
                                <h2>ELO Change:</h2>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }


export default Result;