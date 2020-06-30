
/**
 * config 和params参数得是axios请求里的config和params，耦合度比较高
 */
class CancelRepeatRequest {
  constructor(requestPool = []) {
    this.requestPool = requestPool
  }
  add(flag) {
	this.requestPool.push(flag)
  }
  has(flag) {
	return this.requestPool.find(v => v === flag)
  },
  remove(flag) {
	this.requestPool  = this.requestPool.filter(v => v.flag !== flag)
  }
}

export default CancelRepeatRequest
