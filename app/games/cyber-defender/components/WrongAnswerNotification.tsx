import { AlertTriangle } from "lucide-react"

interface WrongAnswerNotificationProps {
  show: boolean
}

export default function WrongAnswerNotification({ show }: WrongAnswerNotificationProps) {
  if (!show) return null

  return (
    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
      <div className="bg-red-900/90 text-white px-6 py-3 rounded-lg border-2 border-red-500 shadow-lg flex items-center space-x-2">
        <AlertTriangle className="text-yellow-400 w-6 h-6" />
        <span className="font-bold">WRONG ANSWER! -1 LIFE</span>
      </div>
    </div>
  )
}
