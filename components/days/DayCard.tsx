import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "../ui/badge"
import { Target, Clock, PlayCircle, CheckCircle } from "lucide-react"
import { getStatusColor } from "@/utils/StatusUtilities"
import StatusForm from "../forms/status-form"
const DayCard = ({status, id}: {
    status: string
    id: string
}) => {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-4 h-4 text-green-500" />
            case 'in progress':
                return <PlayCircle className="w-4 h-4 text-blue-500" />
            default:
                return <Clock className="w-4 h-4 text-muted-foreground" />
        }
    }
    return (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5" />
                Today's Progress
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">Learning Status</span>
                        <Badge className={`px-3 py-1 text-xs font-medium border ${getStatusColor(status)}`}>
                            <div className="flex items-center gap-1">
                                {getStatusIcon(status)}
                                <span>{status}</span>
                            </div>
                        </Badge>
                    </div>
                    <StatusForm
                    status = {status}
                    id = {id}
                    />
                </div>
            </div>
        </CardContent>
    </Card>
    )
}

export default DayCard