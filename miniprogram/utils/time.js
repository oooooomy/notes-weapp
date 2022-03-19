const weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function getFormatWeek() {
    return weeks[new Date().getDay()]
}

export function getFormatDateFrame() {
    let date = new Date()
    return {
        start: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
        end: (date.getFullYear() + 1) + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
}

export function getFormatTime() {
    let date = new Date()
    return date.getHours() + '-' + date.getMinutes()
}