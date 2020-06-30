import dayjs from 'dayjs'

export function dateFormat(date, format = 'YYYY/MM/DD HH:mm:ss') {
	if (!dayjs(date).isValid()) {
		return date
	}
	return dayjs(new Date(date)).format(format)
}