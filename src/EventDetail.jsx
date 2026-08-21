import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function EventDetail() {
    const { date } = useParams()
    const navigate = useNavigate()
    const [dayEvents, setDayEvents] = useState([])

    const fetchDayEvents = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/events')
            const filtered = response.data.filter(event => event.eventDate === date)
            setDayEvents(filtered)
        } catch (error) {
            console.error('データの取得に失敗しました', error)
        }
    }, [date])

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn')
        if (isLoggedIn !== 'true') {
            alert('ログインが必要です')
            navigate('/')
        } else {
            /* eslint-disable-next-line react-hooks/set-state-in-effect */
            fetchDayEvents().catch(console.error)
        }
    }, [navigate, fetchDayEvents])

    return (
        <div className="calendar-container">
            <h2>【{date}】 の詳細画面</h2>
            <button
                onClick={() => navigate(`/calendar/add/${date}`)}
                className="add-btn"
                style={{ marginBottom: '20px', marginRight: '10px' }}
            >
                新しい予定を登録する
            </button>
            <button
                onClick={() => navigate('/calendar')}
                className="logout-btn"
                style={{ marginBottom: '20px' }}
            >
                カレンダーに戻る
            </button>

            <div className="event-list">
                <h3>この日の予定一覧</h3>
                {dayEvents.length === 0 ? (
                    <p>この日の予定はありません</p>
                ) : (
                    <ul>
                        {dayEvents.map((event) => (
                            <li key={event.id} className="event-item">
                                <span className="event-title">{event.title}</span>
                                <button
                                    onClick={() => navigate(`/calendar/delete/${event.id}/${date}`)}
                                        className="delete-btn"
                                        >
                                        削除する
                                        </button>
                                        </li>
                                        ))}
                            </ul>
                        )}
                    </div>
                    </div>
                    )
                }

export default EventDetail