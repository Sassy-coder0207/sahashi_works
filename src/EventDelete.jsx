import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EventDelete() {
    // URLから id と date を自動的に取得
    const { id, date } = useParams();
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('isLoggedIn'); // ※ログイン状態のキー名に合わせて調整してください

    useEffect(() => {
        if (isLoggedIn !== 'true') {
            alert('ログインが必要です');
            navigate('/');
        }
    }, [navigate, isLoggedIn]);

    const handleDelete = async () => {
        try {
            // 正しくURLから取得したidをバックエンドに送る
            await axios.delete(`http://localhost:8080/events/${id}`);
            alert('予定を削除しました！');
            // 正しくURLから取得した日付の詳細画面に戻る
            navigate(`/Calendar/detail/${date}`);
        } catch (error) {
            console.error('削除に失敗しました', error);
        }
    };

    return (
        <div className="calendar-container">
            <h2>予定の削除確認</h2>
            <p style={{ fontSize: '18px', color: '#ff4444', marginBottom: '36px' }}>
                本当にこの予定を削除してもよろしいですか？
            </p>
            {/* 削除実行ボタン（既存のボタンのonClickにhandleDeleteをセットしてください） */}
            <button className="delete-btn" onClick={handleDelete}>削除する</button>
            <button className="cancel-btn" onClick={() => navigate(`/Calendar/detail/${date}`)}>キャンセルして戻る</button>
        </div>
    );
}

export default EventDelete;