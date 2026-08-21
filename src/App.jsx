import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Calendar from './Calendar'
import EventDetail from './EventDetail'
import EventAdd from './EventAdd'
import EventDelete from './EventDelete'
import './App.css'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/Calendar/detail/:date" element={<EventDetail />} />
                <Route path="/Calendar/add/:date" element={<EventAdd />} />
                <Route path="/Calendar/delete/:id/:date" element={<EventDelete />} />
            </Routes>
        </Router>
    )
}

export default App