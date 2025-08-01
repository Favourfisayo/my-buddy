
import { Clock } from "lucide-react"
export const getStatusColor = (status: string) => {
    switch (status) {
        case 'completed':
            return 'bg-green-500/10 text-green-600 border-green-500/20'
        case 'in-progress':
            return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
        default:
            return 'bg-muted/50 text-muted-foreground border-border'
    }
}