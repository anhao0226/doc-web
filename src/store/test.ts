
// 测试数据
export const data = [
    { "StartPos": 1480, "EndPos": 1780, "Title": ["添加部门"], "Header": [""], "Method": ["POST"], "Url": [" prv/department"], "Params": [[" company", " string", " 公司uuid"], [" name", " string", " 部门名称"], [" root", " string", " 根部门uuid"], [" upper", " string", " 上级部门uuid"], [" permission", " string", " 部门权限(f)"], [" reviewRole", " string", " 审核角色(0)"]], "Return": null, "Other": null },
    { "StartPos": 5257, "EndPos": 5424, "Title": ["删除部门"], "Header": [""], "Method": ["DELETE"], "Url": [" prv/department"], "Params": [[" company", " string", " 公司uuid"], [" depUid", " string", " 部门UUID, 含该部门下的子部门"]], "Return": null, "Other": null },
    { "StartPos": 1626, "EndPos": 1860, "Title": ["查询公司上报记录"], "Header": [""], "Method": ["GET"], "Url": [" business/tradeLogs"], "Params": [[" companyUid", " string", " 公司uuid"], [" reviewState", " string", " 审核状态(可选),多个('wfr','w2r')"], [" staffUid", " string", " 员工uuid(可选)"]], "Return": null, "Other": null },
    { "StartPos": 2488, "EndPos": 2655, "Title": ["查询已审核上报记录"], "Header": [""], "Method": ["GET"], "Url": [" business/auditedTradelog"], "Params": [[" company", " string", " 公司uuid"], [" staff", " string", " 员工uuid(可选)"]], "Return": null, "Other": null }
]