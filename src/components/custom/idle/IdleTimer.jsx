import { useContext, useState } from "react"
import { useIdleTimer } from "react-idle-timer"
// import AuthContext from "../context/AuthContext";

const IdleTimer = ({ onIdle, idleTime = 1 }) => {
    const idleTimeout = 60000 * idleTime;
    const [isIdle, setIdle] = useState(false)

    const handleIdle = () => {
        setIdle(true)
    }
    const idleTimer = useIdleTimer({
        timeout: idleTimeout,
        promptTimeout: idleTimeout,
        onPrompt: onIdle,
        onIdle: handleIdle,
        debounce: 500
    })
    return {
        isIdle,
        setIdle,
        idleTimer
    }
}
export default IdleTimer;