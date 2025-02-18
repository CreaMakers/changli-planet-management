import SendSystemNotice from './SystemNotice'
import SendUserNotice from './UserNotice'
import { useMatch } from 'react-router-dom'
export default function SentNotification(){
    const whichPath = useMatch('/layout/sendNoctices/system')
    return (<>
    {
        whichPath ? <SendSystemNotice/> : <SendUserNotice/>
    }
    </>)
}