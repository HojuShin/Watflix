function Watched() {
    let recent = localStorage.getItem('watched')
    recent = JSON.parse(recent)
    console.log(recent)

    return (
        <>
            {/* locker css 동일 */}
            <div className="lockerSection">
                <h1>최근 본 작품</h1>
                <sceion>
                    {recent.map((a, i) => {
                        return (
                            <div className='lockerList'>
                                <a href={recent[i].url}><img src={recent[i].img} className="movieImg"></img> </a>
                                <p className='lockerTitle'>{recent[i].title}</p>
                            </div>
                        )
                    })}
                </sceion>
            </div>
        </>
    )
}

export default Watched;