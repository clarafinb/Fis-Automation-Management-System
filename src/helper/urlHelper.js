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
    const nav = navigate.find(e => e.type === type)
    return nav ? nav.url : '/login'
};