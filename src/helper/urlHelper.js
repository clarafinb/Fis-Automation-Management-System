export const handleRoleDashboard = (type) => {
    const navigate = [
        {
            type: '/usr/dashboardOpsLead',
            url: '/dashboard-ops-lead'
        },
        {
            type: '/usr/dashboardKU',
            url: '/dashboard'
        },
        {
            type: '/usr/dashboardWHTeam',
            url: '/dashboard-wh'
        }
    ]
    const { url } = navigate.find(e => e.type === type)
    return url
};