const getNid = (props:Partial<{ nid: string, uitype:string, uirunmode:string }>) => {
    let {nid, uitype, uirunmode} = props
    if (uirunmode == 'design') { // 运行模式为design时必须存在nid、uitype
        if (nid || uitype) {
            return {nid, uitype}
        } else {
            console.warn('缺少nid或uitype')
            return null
        }
    } else {
        return null
    }
}
export default getNid
