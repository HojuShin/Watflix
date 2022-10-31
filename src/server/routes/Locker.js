import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { deleteLocker } from '../../locker/userLocker'

function Locker(props) {
    let state = useSelector((state) => state.locker)
    let dispatch = useDispatch();

    return (
        <div className='lockerSection'>
            <h1>보관함</h1>
            <section>
                {state.map((a, i) => {
                    return (
                        <div className='lockerList'>
                            <a><img src={state[i].img} className="movieImg"></img></a>
                            <p className='lockerTitle'>{state[i].title}</p>
                            <a className='lockerDelete' onClick={() => {
                                // 보관함 해당 영화 삭제
                                console.log(a.title)
                                dispatch(deleteLocker(a))
                            }}>
                                <svg style={{ width:'20px', height:'20px'}} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                </svg>
                            </a>
                        </div>
                    )
                })}
            </section>
        </div>
    )
}

export default Locker; 