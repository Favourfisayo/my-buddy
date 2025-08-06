import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
export const UserInfo = ({user}: {
    user: {
        image: string | undefined,
        email: string | null | undefined
    }
}) => {
    return (
        <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={user.image}/>
        <AvatarFallback className="rounded-lg">{user.email?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
    )
}