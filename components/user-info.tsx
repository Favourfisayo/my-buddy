import { Session } from "next-auth"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
export const UserInfo = ({session}: {
    session: Session
}) => {
    return (
        <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={session.user?.image ?? undefined}/>
        <AvatarFallback className="rounded-lg">{session.user?.email?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
    )
}