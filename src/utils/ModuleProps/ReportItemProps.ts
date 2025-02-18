export interface ReportItemProps {
    reportId: number,
    reportedUserId: number,
    reporterId: number,
    reason: string,
    reportTime: string,
    status: number,
    processDescription: string,
    isDeleted: number,
    createTime: string,
    updateTime: string,
    description: string
}

export interface HandleReportProps {
    reportId: number,
    reportedUserId: number,
    penaltyType: number,
    violationType: number,
    penaltyReason: string,
    violationTime: string,
    punishmentDuration: number,
    description: string,
    processDescription: string
}

export interface PunishUserDataProps {
    penaltyType: number,
    userId: number,
    mutedTime?: number
}