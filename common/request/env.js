export default function gainEnv() {
	let env = {
		PHP_API_URL: '',
		JAVA_API_URL: '',
		IMG_PREFIX: ''
	}
	if (process.env.NODE_ENV !== 'development') {
		env = {
			PHP_API_URL: '',
			JAVA_API_URL: '',
			IMG_PREFIX: ''
		}
	}
	return env
}