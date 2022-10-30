import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function Locker() {
    let state = useSelector((state) => state.locker)
    console.log(state)

    return (
        <div className='lockerSection'>
            <h1>보관함</h1>
                <section>
                    {state.map((a, i) => {
                        return (
                            <div className='lockerList'>
                                {/* http://localhost:3000/contents/newMovie/0 */}
                                {/* <Link to={'/contents/' + props.dataName + '/' + props.data[i].id}><a><img src={state[i].img} className="movieImg"></img></a></Link> */}
                                <a><img src={state[i].img} className="movieImg"></img></a>
                                <p>{state[i].title}</p>
                            </div>
                        )
                    })}
                </section>
        </div>
    )
}

export default Locker; 