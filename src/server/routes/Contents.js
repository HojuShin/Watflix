import { $CombinedState } from "@reduxjs/toolkit";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom"
import { addLocker, deleteLocker } from '../../locker/userLocker'

// 영화 소개 페이지
function Contents(props) {
    // URL 파라미터 
    let { id } = useParams();
    // redux
    let state = useSelector((state) => state);
    let dispatch = useDispatch();
    let data = props.data.find(function (x) {
        return x.id == id
    });
    // 버튼 스위치
    let [click, setClick] = useState(false);
    let locker = state.locker;
    // locker 보관함과 data(현재 상세페이지의 영화)의 title이 일치
    let result = locker.find(e => e.title === data.title)
    useEffect(() => {
        // 보관함에 저장되어있는 해당 영화 유무에 따른 버튼 스타일
        let $addLocker = document.getElementById('addLocker');
        if (result) {
            $addLocker.style.background = '#F82F62'
            $addLocker.value = '보관함에 저장됨'
            setClick(true)
        } else {
            $addLocker.style.background = '#000'
            $addLocker.value = '보관함에 저장하기'
            setClick(false)
        }
    }, [])

    return (
        <>
            <div className="contetnsSection">
                <div className="contetnsScreen">
                    {/* URL파라미터 02 : jsx에서 route path에 입력된 url파라미터 값과 일치하는 값 입력 
                    ex. 파라미터에 0을 입력하면 data의 id 0번의 title을 보여줌 */}
                    <div className="contetnsScreen_img">
                        <img src={process.env.PUBLIC_URL + data.img}></img>
                    </div >
                    <div className="contetnsScreen_desc">
                        <h2>{data.title}</h2>
                        <p>{data.content}</p>
                    </div>
                    <div className="contetnsScreen_btn">
                        <input id="addLocker" type="button" onClick={(e) => {
                            //보관함 저장
                            setClick(!click)
                            console.log(click)
                            if (click) {
                                dispatch(deleteLocker(data))
                                e.target.style.background = '#000'
                                e.target.value = '보관함에 저장하기'
                            } else if (!click == true) {
                                dispatch(addLocker(data));
                                e.target.style.background = '#F82F62'
                                e.target.value = '보관함에 저장됨'
                            }
                        }}>

                            {/* <svg width="18px" height="18px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2a.75.75 0 0 0-.75.75v8.5h-8.5a.75.75 0 0 0 0 1.5h8.5v8.5a.75.75 0 0 0 1.5 0v-8.5h8.5a.75.75 0 0 0 0-1.5h-8.5v-8.5A.75.75 0 0 0 12 2Z" fill="currentColor"></path></svg> */}
                        </input>
                    </div>
                </div>
                <hr style={{ margin: 0 }}></hr>
                <div className="ReviewScreen">
                    <p>왓플렉스 사용자 감상평 여기댓글갯수</p>
                    <form>
                        <input placeholder="자유롭게 감상평을 입력해주세요!" className="userReview"></input>
                        <button type="submit" className="userReview_btn">완료</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Contents;