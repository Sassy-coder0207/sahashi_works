import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function EventAdd() {
    const { date } = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState('')

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn')
        if (isLoggedIn !== 'true') {
            alert('ログインが必要です')
            navigate('/')
        }
    }, [navigate])

    const handleAddEvent = async (e) => {
        e.preventDefault()
        if (!title) return alert('予定の名前を入力してください')

        try {
            await axios.post('http://localhost:8080/events', {
                eventDate: date,
                title: title
            })
            alert('予定を登録しました！')
            navigate(`/Calendar/detail/${date}`)
        } catch (error) {
            console.error('登録に失敗しました', error)
        }
    }

    return (
        <div className="calendar-container">
            <h2>【{date}】 予定の登録</h2>

            <form onSubmit={handleAddEvent} className="event-form">
                <input
                    type="text"
                    placeholder="予定の名前（例：旅行）"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ padding: '10px', marginRight: '10px' }}
                />
                <button type="submit" className="add-btn">登録する</button>
            </form>

            <button
                onClick={() => navigate(`/Calendar/detail/${date}`)}
                className="logout-btn"
                style={{ marginTop: '20px' }}
            >
                キャンセルして戻る
            </button>
        </div>
    )
}

export default EventAdd
