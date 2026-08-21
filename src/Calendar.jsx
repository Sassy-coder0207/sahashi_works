import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Calendar() {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])

    // 現在表示している「年」と「月」を管理する状態（初期値は2026年8月）
    const [currentYear, setCurrentYear] = useState(2026)
    const [currentMonth, setCurrentMonth] = useState(8)

    // データベースからすべての予定を取得する
    const fetchEvents = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/events')
            setEvents(response.data)
        } catch (error) {
            console.error('データの取得に失敗しました', error)
        }
    }, [])

    // ログインチェックとデータ読み込み
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn')
        if (isLoggedIn !== 'true') {
            alert('ログインが必要です')
            navigate('/')
        } else {
            /* eslint-disable-next-line react-hooks/set-state-in-effect */
            fetchEvents().catch(console.error)
        }
    }, [navigate, fetchEvents])

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn')
        navigate('/')
    }
// 日付マスをクリックしたときに詳細画面へジャンプする関数
    const handleDateClick = (year, month, day) => {
        const monthStr = String(month).padStart(2, '0')
        const dayStr = String(day).padStart(2, '0')
        navigate(`/Calendar/detail/${year}-${monthStr}-${dayStr}`)
    }

    // 【強力進化】前の月へ移動する関数（1月より前は前の年の12月へ）
    const handlePrevMonth = () => {
        if (currentMonth === 1) {
            setCurrentMonth(12)
            setCurrentYear(currentYear - 1)
        } else {
            setCurrentMonth(currentMonth - 1)
        }
    }

    // 【強力進化】次の月へ移動する関数（12月の次は次の年の1月へ）
    const handleNextMonth = () => {
        if (currentMonth === 12) {
            setCurrentMonth(1)
            setCurrentYear(currentYear + 1)
        } else {
            setCurrentMonth(currentMonth + 1)
        }
    }

    // --- JavaScriptの標準機能で曜日と日数を自動計算 ---
    // 指定された月の「1日の曜日」を取得 (0: 日曜日, 1: 月曜日... 6: 土曜日)
    const firstDayOfWeek = new Date(currentYear, currentMonth - 1, 1).getDay()

    // 指定された月が「何日まであるか」を取得
    const daysInMonthCount = new Date(currentYear, currentMonth, 0).getDate()
    // カレンダーグリッドの作成
    const blanks = Array(firstDayOfWeek).fill(null)
    const daysInMonth = Array.from({ length: daysInMonthCount }, (_, i) => i + 1)
    const calendarGrid = [...blanks, ...daysInMonth]

    return (
        <div className="calendar-container" style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '20px', boxSizing: 'border-box' }}>

            {/* ヘッダー部分 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ margin: 0 }}>時間共有管理アプリ</h1>
        <button onClick={handleLogout} className="logout-btn" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          ログアウト
        </button>
      </div>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start', width: '100%' }}>

        {/* 左側：ミニカレンダーのボックス */}
            <div style={{ border: '2px solid white', width: '220px', minWidth: '220px', padding: '10px', textAlign: 'center', background: '#111', boxSizing: 'border-box' }}>
                {/* 月切り替えヘッダー (年表示も追加) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid white', paddingBottom: '10px', marginBottom: '15px' }}>
            <button onClick={handlePrevMonth} style={{ background: 'none', color: 'white', border: 'none', cursor: 'pointer', fontSize: '20px', fontWeight: 'bold' }}>⇐</button>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '12px', color: '#aaa' }}>{currentYear}年</span>
              <h2 style={{ margin: 0, fontSize: '22px' }}>{currentMonth}月</h2>
            </div>
            <button onClick={handleNextMonth} style={{ background: 'none', color: 'white', border: 'none', cursor: 'pointer', fontSize: '20px', fontWeight: 'bold' }}>⇒</button>
          </div>

          {/* ミニカレンダー曜日 */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', fontSize: '10px', fontWeight: 'bold', marginBottom: '5px', color: '#888' }}>
                    <div>日</div><div>月</div><div>火</div><div>水</div><div>木</div><div>金</div><div>土</div>
                </div>
            {/* ミニカレンダー日付 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', fontSize: '12px' }}>
            {calendarGrid.map((day, index) => {
              if (day === null) {
                return <div key={`mini-blank-${index}`} style={{ height: '22px' }}></div>
              }
              return (
                <div key={`mini-day-${day}`} style={{ height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                  {day}
                </div>
              )
            })}
          </div>
        </div>

        {/* 右側：メインのカレンダーグリッド */}
                <div style={{ flexGrow: 1, width: '100%' }}>
                    {/* 曜日のヘッダー */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontWeight: 'bold', marginBottom: '10px', borderBottom: '2px solid white', paddingBottom: '5px' }}>
                        <div>日</div><div>月</div><div>火</div><div>水</div><div>木</div><div>金</div><div>土</div>
                    </div>
                    {/* 日付のマス目（7列の格子状、横幅100%を維持） */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', width: '100%' }}>
                        {calendarGrid.map((day, index) => {
                            if (day === null) {
                                return <div key={`blank-${index}`} style={{ height: '70px', background: 'rgba(255,255,255,0.02)', border: '1px solid #222' }}></div>
                            }

                            const monthStr = String(currentMonth).padStart(2, '0')
                            const dayStr = String(day).padStart(2, '0')
                            const dateStr = `${currentYear}-${monthStr}-${dayStr}`
                            const dayHasEvent = events.some(event => event.eventDate === dateStr)

                            return (
                                <button
                                    key={`day-${day}`}
                                    onClick={() => handleDateClick(currentYear, currentMonth, day)}
                                    style={{
                                        height: '70px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-end',
                                        padding: '6px',
                                        background: '#222',
                                        color: 'white',
                                        border: '1px solid #444',
                                        cursor: 'pointer',
                                        textAlign: 'right',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    <span style={{ fontWeight: 'bold' }}>{day}</span>
                                    {dayHasEvent && (
                                        <span style={{ fontSize: '10px', background: '#ff4444', color: 'white', padding: '2px 4px', borderRadius: '3px', alignSelf: 'flex-start' }}>
                      予定あり
                    </span>
                                    )}
                                </button>
                            )
                        })}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Calendar
