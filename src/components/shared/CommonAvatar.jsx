import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const CommonAvatar = ({ className, src = "https://github.com/shadcn.png", alt = "User Avatar" }) => {
    return (
        <Avatar className={className}>
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>{alt?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
    );
};

export default CommonAvatar;