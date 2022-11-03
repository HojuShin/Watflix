import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom"
import { addLocker, deleteLocker } from '../../locker/userLocker'

// 영화 소개 페이지
function Contents(props) {
    // URL 파라미터 
    let { id } = useParams();
    let adress = window.location.href;
    console.log('현재 주소 : ' + adress)
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

    useEffect(()=>{
        // 최근 본 작품 localStorage (data의 img)저장하기 
        let recent =  localStorage.getItem('watched')
        recent = JSON.parse(recent) //object 형태로 전환
        console.log('recent' + recent)
        recent.push({id:data.id, title:data.title, img:data.img, url:adress})
        // 중복되는 객체 값 제거하기 -> Set으로 중복 제거된 recent를 다시 배열 형태로 저장 
        recent = Array.from(new Set(recent.map(JSON.stringify))).map(JSON.parse)
        // 접속한 페이지의 영화 데이터 (id, title, img, url주소) 저장
        localStorage.setItem('watched', JSON.stringify(recent))
    },[])

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