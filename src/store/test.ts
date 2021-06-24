export const data = [{
	"StartPos": 1480,
	"EndPos": 1780,
	"Title": [" 添加部门"],
	"Header": [""],
	"Method": [" post"],
	"Url": [" prv/department"],
	"Params": [
		[" company", " string", " 公司uuid"],
		[" name", " string", " 部门名称"],
		[" root", " string", " 根部门uuid"],
		[" upper", " string", " 上级部门uuid"],
		[" permission", " string", " 部门权限(f)"],
		[" reviewRole", " string", " 审核角色(0)"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 5257,
	"EndPos": 5424,
	"Title": [" 删除部门"],
	"Header": [""],
	"Method": [" delete"],
	"Url": [" prv/department"],
	"Params": [
		[" company", " string", " 公司uuid"],
		[" depUid", " string", " 部门UUID, 含该部门下的子部门"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 1626,
	"EndPos": 1860,
	"Title": [" 查询公司上报记录"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" business/tradeLogs"],
	"Params": [
		[" companyUid", " string", " 公司uuid"],
		[" reviewState", " string", " 审核状态(可选),多个('wfr','w2r')"],
		[" staffUid", " string", " 员工uuid(可选)"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 2359,
	"EndPos": 2526,
	"Title": [" 查询已审核上报记录"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" business/auditedTradelog"],
	"Params": [
		[" company", " string", " 公司uuid"],
		[" staff", " string", " 员工uuid(可选)"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 3181,
	"EndPos": 3363,
	"Title": [" 查询待审核上报记录"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" business/tradelog"],
	"Params": [
		[" company", " string", " 公司uuid"],
		[" staff", " string", " 员工uuid"],
		[" state", " string", " 状态"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 6949,
	"EndPos": 7348,
	"Title": [" 审核贸易记录"],
	"Header": [""],
	"Method": [" put"],
	"Url": [" business/Tradelogreview"],
	"Params": [
		[" reviewState", "string", "审核类型", " 审核(wfr,w2r,w3r) 驳回(r1d, r2d, r3d, r4d) 发放(a1p, a2p, a3p, a4p)"],
		[" reviewer", "string", "审核人uuid"],
		[" UUID", "string", "审核贸易记录UUID"],
		[" reason", "string", "驳回理由", "当reviewState为　r1d, r2d, r3d, r4d填写"],
		[" pointType", "string", "发放积分类型"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 1692,
	"EndPos": 1937,
	"Title": [" 搜索公告"],
	"Header": [" multipart/form-data"],
	"Method": [" get"],
	"Url": [" admin/announcements/search"],
	"Params": [
		[" sender", " string", " 发送人uuid"],
		[" type", " string", " 公告类型(1/重要公告, 2/业务销售公告, 3/行政管理公告, 4/其他公告)"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 2270,
	"EndPos": 2592,
	"Title": [" 查询公告"],
	"Header": [" multipart/form-data"],
	"Method": [" get"],
	"Url": [" admin/Announcements"],
	"Params": [
		[" sender", " string", " 公司uuid"],
		[" staff", " string", " 员工uuid"],
		[" department", " string", " 部门uuid(查询部门)"],
		[" type", " string", " 公告类型(1/重要公告, 2/业务销售公告, 3/行政管理公告, 4/其他公告)"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 4499,
	"EndPos": 5100,
	"Title": [" 发布系统公告"],
	"Header": [" multipart/form-data"],
	"Method": [" post"],
	"Url": [" admin/Announcements"],
	"Params": [
		[" title", "string", "公告标题"],
		[" content", "string", "公告内容"],
		[" other", "string", "其他内容"],
		[" sender", " string", " 发布对象"],
		[" recipient", " string", " 接受对象(recipient_type=2时填写)"],
		[" recipient_type", " string", " 接受对象类型(0/系统公告, 1/全部员工, 2/指定部门)"],
		[" type", " string", " 公告类型(1/重要公告, 2/业务销售公告, 3/行政管理公告, 4/其他公告)"],
		[" expired", " string", " 发布时间"],
		[" top", " string", " 置顶 (1/置顶, 0/默认)"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 6750,
	"EndPos": 6888,
	"Title": [" 删除系统公告"],
	"Header": [" multipart/form-data"],
	"Method": [" DELETE"],
	"Url": [" admin/Announcements"],
	"Params": [
		[" uuid", "string", "公告对应的uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 7492,
	"EndPos": 7731,
	"Title": [" 修改系统公告"],
	"Header": [" multipart/form-data"],
	"Method": [" put"],
	"Url": [" admin/Announcements"],
	"Params": [
		[" uuid", "string", "公告对应的uuid"],
		[" title", "string", "公告标题"],
		[" content", "string", "公告内容"],
		[" other", "string", "其他内容"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 7209,
	"EndPos": 7371,
	"Title": [" 判断是否为公司管理员"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" auth/isCompanyManager"],
	"Params": [
		[" companyUid", "string", "公司uuid"],
		[" staffUid", "string", " 员工uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 7965,
	"EndPos": 8133,
	"Title": [" 移除公司管理员"],
	"Header": [""],
	"Method": [" delete"],
	"Url": [" auth/companyManager"],
	"Params": [
		[" companyUid", "string", "公司uuid"],
		[" manager", "string", " 删除公司管理员uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 8940,
	"EndPos": 9055,
	"Title": [" 查询公司管理员"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" auth/companyManager"],
	"Params": [
		[" companyUid", "string", "公司uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 9897,
	"EndPos": 10053,
	"Title": [" 添加公司管理员"],
	"Header": [""],
	"Method": [" post"],
	"Url": [" auth/companyManager"],
	"Params": [
		[" companyUid", "string", "公司uuid"],
		[" manager", "string", " 公司管理员"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 11150,
	"EndPos": 11262,
	"Title": [" 创建二维码"],
	"Header": [""],
	"Method": [" POST"],
	"Url": [" auth/CreateQrCode"],
	"Params": [
		[" uid", "string", "二维码唯一标识"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 11583,
	"EndPos": 11721,
	"Title": [" 确认登录"],
	"Header": null,
	"Method": [" PUT"],
	"Url": [" auth/ConfirmQrLogin"],
	"Params": [
		[" user", "string", "用户uuid"],
		[" uid", "string", "扫码获得的唯一标识"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 12345,
	"EndPos": 12511,
	"Title": [" 添加用户地址"],
	"Header": [""],
	"Method": [" POST"],
	"Url": [" auth/UserAddress"],
	"Params": [
		[" user", "string", "用户uuid"],
		[" address", "string", "用户地址"],
		[" tag", "string", "标签"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 12802,
	"EndPos": 12905,
	"Title": [" 获取用户地址"],
	"Header": [""],
	"Method": [" GET"],
	"Url": [" auth/UserAddress"],
	"Params": [
		[" user", "string", "用户uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 13696,
	"EndPos": 13870,
	"Title": [" 修改用户地址"],
	"Header": [""],
	"Method": [" PUT"],
	"Url": [" auth/UserAddress"],
	"Params": [
		[" UUID", "string", "删除地址的UUID"],
		[" address", "string", "用户地址"],
		[" tag", "string", "标签"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 15042,
	"EndPos": 15145,
	"Title": [" 获取登录信息"],
	"Header": null,
	"Method": [" GET"],
	"Url": [" auth/QrLoginMsg"],
	"Params": [
		[" uid", "string", "二维码唯一标识"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 15337,
	"EndPos": 15514,
	"Title": [" 添加订单反馈信息"],
	"Header": null,
	"Method": [" POST"],
	"Url": [" auth/AddOrderFeedback"],
	"Params": [
		[" order", "string", "订单uuid"],
		[" user", "string", "反馈人uuid"],
		[" content", "string", "反馈内容"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 15824,
	"EndPos": 15927,
	"Title": [" 获取订单反馈信息"],
	"Header": null,
	"Method": [" GET"],
	"Url": [" auth/OrderFeedback"],
	"Params": [
		[" order", "string", "订单uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 17089,
	"EndPos": 17242,
	"Title": [" 获取模板"],
	"Header": null,
	"Method": [" GET"],
	"Url": [" auth/AllTemplate"],
	"Params": [
		[" cond", "string", "查询条件"],
		[" tplType", "string", "模板类型", "prediction,business,client"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 17472,
	"EndPos": 17626,
	"Title": [" 获取模板"],
	"Header": null,
	"Method": [" GET"],
	"Url": [" auth/TemplateData"],
	"Params": [
		[" cond", "string", "查询条件"],
		[" tplType", "string", "模板类型", "prediction,business,client"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 17852,
	"EndPos": 18256,
	"Title": [" 创建预测模板"],
	"Header": null,
	"Method": [" POST"],
	"Url": [" auth/CreateTemplate"],
	"Params": [
		[" company", "string", "公司uuid"],
		[" template", "string", "模板uuid"],
		[" position", "string", "模板对应的列编号"],
		[" posName", "string", "模板显示名称"],
		[" type", "string", "数据类型"],
		[" details", "string", "模板额外信息 (枚举内容或精度或日期格式)"],
		[" tplType", "string", "模板类型", "prediction,business,client"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 18731,
	"EndPos": 19041,
	"Title": [" 预测模板数据"],
	"Header": null,
	"Method": [" POST"],
	"Url": [" auth/AddTemplateData"],
	"Params": [
		[" company", "string", "公司uuid"],
		[" template", "string", "模板uuid"],
		[" row", "string", "数据对应行号"],
		[" mobile", "string", "手机号"],
		[" colData", "string", "数据", "以逗号拼接"],
		[" tplType", "string", "向对应类型模板添加数据"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 19772,
	"EndPos": 19998,
	"Title": [" 修改预测模板数据"],
	"Header": null,
	"Method": [" PUT"],
	"Url": [" auth/ModifyTemplateData"],
	"Params": [
		[" template", "string", "对应数据的uuid"],
		[" col", "string", "对应列名"],
		[" data", "string", "对应列修改值"],
		[" tplType", "修改模板类型"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 20363,
	"EndPos": 20497,
	"Title": [" 移除模板"],
	"Header": null,
	"Method": [" DELETE"],
	"Url": [" auth/RemoveTemplate"],
	"Params": [
		[" template", "string", "公司uuid"],
		[" tplType", "string", "模板类型"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 21337,
	"EndPos": 21532,
	"Title": [" 通过excel模板发放积分"],
	"Header": null,
	"Method": [" POST"],
	"Url": [" auth/Sendpointbyexcel"],
	"Params": [
		[" company", "string", "公司uuid"],
		[" data", "string", "客户端传递uuid,发放对象手机号,发放积分额度"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 32774,
	"EndPos": 32961,
	"Title": [" 修改公司状态"],
	"Header": [""],
	"Method": [" put"],
	"Url": [" auth/Altercompanystate"],
	"Params": [
		[" company", "string", "公司uuid"],
		[" mobile", "string", " 员工uuid"],
		[" companyname", "string", " 公司名称"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 37814,
	"EndPos": 38159,
	"Title": [" 修改公司信息"],
	"Header": [""],
	"Method": [" put"],
	"Url": [" auth/Altercompany"],
	"Params": [
		[" UUID", " string"],
		[" mobile", " string"],
		[" password", " string"],
		[" email", "string"],
		[" nickname", " string"],
		[" representative", " string"],
		[" companyrole", " string"],
		[" address", " string"],
		[" verified", " string"],
		[" logo", " string"],
		[" companyCode", " string"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 39422,
	"EndPos": 39551,
	"Title": [" 公司注册手机号查重"],
	"Header": [""],
	"Method": [" post"],
	"Url": [" auth/Checkrepeatedcompany"],
	"Params": [
		[" mobile", "string", "注册手机号"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 39955,
	"EndPos": 40092,
	"Title": [" 公司注册名称号查重"],
	"Header": [""],
	"Method": [" post"],
	"Url": [" auth/Checkrepeatedcompany"],
	"Params": [
		[" companyName", "string", "注册公司名称"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 40521,
	"EndPos": 40623,
	"Title": [" 用户查重"],
	"Header": [""],
	"Method": [" post"],
	"Url": [" auth/Checkrepeated"],
	"Params": [
		[" mobile", "string", " 手机号"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 43088,
	"EndPos": 43231,
	"Title": [" 用户注册"],
	"Header": [""],
	"Method": [" post"],
	"Url": [" auth/Registeruser"],
	"Params": [
		[" mobile", "string", "注册手机号"],
		[" password", "string", "注册密码"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 44878,
	"EndPos": 45384,
	"Title": [" 公司注册"],
	"Header": [""],
	"Method": [" post"],
	"Url": [" auth/Registercompany"],
	"Params": [
		[" mobile", "string", "手机号"],
		[" password", "string", "注册密码"],
		[" representative", " string", " 公司法人"],
		[" companyName", " string", " 公司名称"],
		[" companyRole", " string", " 公司角色(默认fff)"],
		[" companyCode", " string", " 公司营业执照(图片链接)"],
		[" address", " string", " 公司地址"],
		[" industry", " string", " 所属行业"],
		[" taxNumber", " string", " 公司纳税人识别号"],
		[" logo", " string", " 公司图标"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 55991,
	"EndPos": 56123,
	"Title": [" 移动端登录"],
	"Header": [""],
	"Method": [" post"],
	"Url": [" auth/login"],
	"Params": [
		[" mobile", "string", "员工uuid"],
		[" password", "string", "公司uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 56306,
	"EndPos": 56448,
	"Title": [" 用户登录"],
	"Header": [""],
	"Method": [" post"],
	"Url": [" auth/login"],
	"Params": [
		[" mobile", "string", "用户注册手机号"],
		[" password", "string", "注册密码"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 59406,
	"EndPos": 59515,
	"Title": [" 查询公司信息"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" auth/companyInfo"],
	"Params": [
		[" companyUid", "string", "公司uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 59705,
	"EndPos": 59931,
	"Title": [" 用户登陆"],
	"Header": [""],
	"Method": [" post"],
	"Url": [" auth/Login"],
	"Params": [
		[" mobile", "string", "公司uuid"],
		[" password", "string", "公司uuid"],
		[" type", "string", "公司uuid"],
		[" remember", "string", "公司uuid"],
		[" role", "string", "公司uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 63185,
	"EndPos": 63283,
	"Title": [" 发送验证码"],
	"Header": [""],
	"Method": [" post"],
	"Url": [" auth/Sendsms"],
	"Params": [
		[" mobile", "string", "手机号"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 63581,
	"EndPos": 63711,
	"Title": [" 核实验证码"],
	"Header": [""],
	"Method": [" post"],
	"Url": [" auth/Verifysms"],
	"Params": [
		[" mobile", "string", "手机号"],
		[" code", "string", "验证码"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 8876,
	"EndPos": 9084,
	"Title": [" 查询待审和积分赠送记录"],
	"Header": [" application/x-www-form-urlencode"],
	"Method": [" get"],
	"Url": [" franchisee/peddinGiftPoint"],
	"Params": [
		[" companyUid", " string", " 记录的uuid"],
		[" staffUid", "string", " 员工uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 9771,
	"EndPos": 9979,
	"Title": [" 设置公司积分审核人"],
	"Header": [" application/x-www-form-urlencode"],
	"Method": [" post"],
	"Url": [" franchisee/setPointGiftReviewer"],
	"Params": [
		[" companyUid", " string", " 记录的uuid"],
		[" staffUid", "string", " 员工uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 10247,
	"EndPos": 10410,
	"Title": [" 查询积分经销商余额"],
	"Header": [" application/x-www-form-urlencode"],
	"Method": [" get"],
	"Url": [" franchisee/pointBalance"],
	"Params": [
		[" companyUid", " string", " 记录的uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 10876,
	"EndPos": 11086,
	"Title": [" 同意业务员关联申请"],
	"Header": [" application/x-www-form-urlencode"],
	"Method": [" get"],
	"Url": [" franchisee/agreeStaffAssociated"],
	"Params": [
		[" logUid", " string", " 记录的uuid"],
		[" action", " string", "  0/拒绝,1/同意"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 11529,
	"EndPos": 11724,
	"Title": [" 查询客户相关业务员"],
	"Header": [" application/x-www-form-urlencode"],
	"Method": [" get"],
	"Url": [" franchisee/associatedStaff"],
	"Params": [
		[" clientUid", " string", " 客户的uuid"],
		[" state", " string", " 状态"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 13369,
	"EndPos": 13650,
	"Title": [" 批量修改员工信息"],
	"Header": [" application/x-www-form-urlencode"],
	"Method": [" put"],
	"Url": [" franchisee/batchModifyStaffInfo"],
	"Params": [
		[" company", " string", " 积分赠送申请记录uuid"],
		[" staffs", " string", " 修改员工uuid, 多个以逗号拼接"],
		[" depUid", " string", " 目标部门"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 14186,
	"EndPos": 14423,
	"Title": [" 批量删除员工"],
	"Header": [" application/x-www-form-urlencode"],
	"Method": [" delete"],
	"Url": [" franchisee/batchRemoveStaff"],
	"Params": [
		[" company", " string", " 积分赠送申请记录uuid"],
		[" staffs", " string", " 修改员工uuid, 多个以逗号拼接"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 14926,
	"EndPos": 15228,
	"Title": [" 审核积分赠送申请"],
	"Header": [" application/x-www-form-urlencode"],
	"Method": [" put"],
	"Url": [" franchisee/reviewGiftPointsApply"],
	"Params": [
		[" applyUid", " string", " 积分赠送申请记录uuid"],
		[" state", " string", " 修改状态", " hbd 驳回, phs 通过"],
		[" reason", " string", " 驳回原因 ", "当state=hbd时填写"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 21144,
	"EndPos": 21346,
	"Title": [" 查询积分赠送记录"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" franchisee/pointsGiftLog"],
	"Params": [
		[" company", "string", "公司uuid"],
		[" staff", "string", "员工uuid", "可选"],
		[" pointUid", "string", "赠送日志信息"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 22499,
	"EndPos": 22740,
	"Title": [" 提交积分赠送申请"],
	"Header": [""],
	"Method": [" post"],
	"Url": [" franchisee/sendPoints"],
	"Params": [
		[" company", "string", "公司uuid"],
		[" type", "string", "赠送对象类型"],
		[" ptype", "string", "赠送积分类型"],
		[" staff", "string", "员工uuid"],
		[" sendInfo", "string", "赠送信息", " 格式 => 赠送额度|赠送对象 多个以_拼接"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 23253,
	"EndPos": 23462,
	"Title": [" 查询员工信息\n  "],
	"Header": ["\n  "],
	"Method": [" get\n  "],
	"Url": [" franchisee/staffInfo\n  "],
	"Params": [
		[" company", " string", " 公司uuid\n  "],
		[" user", " string", " 用户uuid", " 多个以逗号拼接('user','user\t','user')"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 24396,
	"EndPos": 24631,
	"Title": [" 批量修改客户分组\n  "],
	"Header": [" application/x-www-form-urlencode\n  "],
	"Method": [" put\n  "],
	"Url": [" franchisee/batchModifyClientGroup\n  "],
	"Params": [
		[" client", " string", " 客户uuid('uuid','uuid')\n  "],
		[" groupUid ", "string", " 客户组uid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 25046,
	"EndPos": 25331,
	"Title": [" 查询员工贸易总和\n  "],
	"Header": [" application/x-www-form-urlencode\n  "],
	"Method": [" get\n  "],
	"Url": [" franchisee/staffTradeTotal\n  "],
	"Params": [
		[" staff", "string", "员工uuid\n  "],
		[" company", "string", "公司uuid\n  "],
		[" client", "string", "交易客户uuid", "查询多个以,拼接('uuid','uuid')"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 26081,
	"EndPos": 26241,
	"Title": [" 查询客户分组\n  "],
	"Header": ["\n  "],
	"Method": [" get\n  "],
	"Url": [" franchisee/ClientGroup\n  "],
	"Params": [
		[" staff", "string", "员工uuid\n"],
		[" company", "string", "公司uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 26580,
	"EndPos": 26825,
	"Title": [" 添加客户分组\n  "],
	"Header": ["\n  "],
	"Method": [" POST\n  "],
	"Url": [" franchisee/ClientGroup\n  "],
	"Params": [
		[" name", "string", "分组名称\n  "],
		[" staff", "string", "员工uuid\n  "],
		[" company", "string", "公司uuid\n  "],
		[" tagColor", "string", "分组标签颜色"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 27180,
	"EndPos": 27311,
	"Title": [" 删除客户分组\n  "],
	"Header": ["\n  "],
	"Method": [" DELETE\n  "],
	"Url": [" franchisee/ClientGroup\n  "],
	"Params": [
		[" groupUid", "string", "分组uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 27516,
	"EndPos": 27729,
	"Title": [" 修改客户分组名称\n  "],
	"Header": ["\n  "],
	"Method": [" PUT\n  "],
	"Url": [" franchisee/ClientGroup\n  "],
	"Params": [
		[" groupUid", "string", "分组uuid\n  "],
		[" name", "string", "修改的名称\n  "],
		[" tagColor", "string", "标签颜色"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 28047,
	"EndPos": 28805,
	"Title": [" 查询客户"],
	"Header": [" application/x-www-form-urlencode"],
	"Method": [" get"],
	"Url": [" franchisee/Clients"],
	"Params": [
		[" company", "string", " 公司uuid", " 查询公司客户"],
		[" staff", "string", " 员工uuid(可选)", " 查询与员工绑定的客户"],
		[" group", "string", " 客户分组uuid(可选)", " 用于获取分组下的客户"],
		[" client", "string", " 客户uuid(可选)", " 同于查询客户信息,多个以逗号拼接 'uuid','uuid'"],
		[" registered", " string", " 是否注册(f/t)"],
		[" verified", " string", " 是否验证(f/t)"],
		[" content", " string", " 查询内容(客户名称/客户单位)"],
		[" amount", " string", " 分页条件"],
		[" department", "string", "部门"],
		[" startDate", " string", " 起始日期"],
		[" endDate", " string", " 结束日期"],
		[" active", " string", " 激活状态(0/1d)"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 35120,
	"EndPos": 35453,
	"Title": [" 查询客户数量"],
	"Header": [" application/x-www-form-urlencode"],
	"Method": [" get"],
	"Url": [" franchisee/clientTotal"],
	"Params": [
		[" company", "string", " 分组uuid", " 查询公司客户"],
		[" staff", "string", " 员工uuid(可选)", " 查询与员工绑定的客户"],
		[" verified", "string", " 是否验证(f/t)"],
		[" registered", "string", " 员工是否注册(f/t)"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 36466,
	"EndPos": 37173,
	"Title": [" 修改客户信息"],
	"Header": [" application/x-www-form-urlencode"],
	"Method": [" PUT"],
	"Url": [" franchisee/ClientInfo"],
	"Params": [
		[" UUID", "string", "记录uuid"],
		[" franchisee", "string", "公司uuid(可选)"],
		[" staff", "string", "员工uuid(可选)"],
		[" clientName", "string", "客户名称(可选)"],
		[" clientJob", "string", "客户职位(可选)"],
		[" companyName", "string", "客户所属公司名称(可选)"],
		[" industry", "string", "客户所属行业(可选)"],
		[" group", "string", "客户分组(可选)"],
		[" gender", " int", " 性别", " 0/未知, 1/男, 2/女(可选)"],
		[" email", "string", "邮箱(可选)"],
		[" attention", "int", "关心(可选)", " 1/表示关��"],
		[""],
		[" remark ", "string ", "备注(可选)"],
		[" attribute", " string", " 客户属性"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 37937,
	"EndPos": 38555,
	"Title": [" 添加客户"],
	"Header": [" application/x-www-form-urlencode"],
	"Method": [" POST"],
	"Url": [" franchisee/Client"],
	"Params": [
		[" mobile", " string", " 客户手机号"],
		[" franchisee", " string", " 公司uuid"],
		[" staff", " string", " 员工uuid"],
		[" clientName", " string", " 客户名称"],
		[" clientJob", " string", " 客户职位"],
		[" companyName", " string", " 客户所属公司名称"],
		[" industry", " string", " 客户所属行业"],
		[" group", " string", " 客户分组(可选)"],
		[" gender", " int", " 性别", " 0/未知, 1/男, 2/女"],
		[" email", "string", "邮箱(可选)"],
		[" attention", "int", "关心(可选)", " 1/表示关注"],
		[" remark ", "string ", "备注(可选)"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 43865,
	"EndPos": 44035,
	"Title": [" 获取员工信息(即将删除)\n  "],
	"Header": [" application/x-www-form-urlencode\n  "],
	"Method": [" get\n  "],
	"Url": [" franchisee/StaffInfo\n  "],
	"Params": [
		[" staff", "string", "员工uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 47284,
	"EndPos": 47536,
	"Title": [" 判断是否为业务员(app显示)\n  "],
	"Header": [" application/x-www-form-urlencode\n  "],
	"Method": [" get\n  "],
	"Url": [" franchisee/isSalesman\n  "],
	"Params": [
		[" user", "string", "用户uuid", " 多个查询格式('user','user','user')\n  "],
		[" company", "string", "公司uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 48509,
	"EndPos": 48736,
	"Title": [" app显示\n  "],
	"Header": ["\n  "],
	"Method": [" post\n  "],
	"Url": [" franchisee/salesman\n  "],
	"Params": [
		[" user", "string", "员工uuid\n  "],
		[" name", "string", "员工姓名\n  "],
		[" company", "string", "公司uuid\n  "],
		[" mobile", "string", "员工手机号"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 50702,
	"EndPos": 50859,
	"Title": [" 查询员工"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" franchisee/franchiseeStaff"],
	"Params": [
		[" company", " string", " 公司uuid"],
		[" position", " string", " 部门uuid(可选)"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 52292,
	"EndPos": 52440,
	"Title": [" 删除上报类型"],
	"Header": [""],
	"Method": [" delete"],
	"Url": [" franchisee/tradeType"],
	"Params": [
		[" UUID", " string", " 公司uuid"],
		[" company", " string", " 公司uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 52889,
	"EndPos": 53030,
	"Title": [" 查询上报类型\n  "],
	"Header": ["\n  "],
	"Method": [" get\n  "],
	"Url": [" franchisee/Franchiseetradetype/search\n  "],
	"Params": [
		[" cond", "string", "查询条件"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 53574,
	"EndPos": 53992,
	"Title": [" 添加员工\n  "],
	"Header": ["\n  "],
	"Method": [" post\n  "],
	"Url": [" franchisee/franchiseeStaff\n  "],
	"Params": [
		[" name", "string", "员工姓名\n  "],
		[" company", "string", "公司uuid\n  "],
		[" position", "string", "部门uuid\n  "],
		[" reviewRole", "string", "审核角色(0)\n  "],
		[" mobile", "string", "员工手机号\n  "],
		[" manager", "string", "是否设置部门管理员", "设置为t(可选)\n  "]
	],
	"Return": [" 1.code为4003表示部门管理人大于三个"],
	"Other": null
}, {
	"StartPos": 57124,
	"EndPos": 57474,
	"Title": [" 添加上报类型"],
	"Header": [" application/x-www-form-urlencode"],
	"Method": [" post"],
	"Url": [" franchisee/tradeType"],
	"Params": [
		[" franchisee", " string", " 公司uuid"],
		[" type", " string", " 类型名称"],
		[" ratio", " double", " 兑换比例"],
		[" reviewRequirement", " string", " 审核级数"],
		[" reviewers", " string", " 审核人uuid 同一级用|拼接, 不同级用_拼接"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 40557,
	"EndPos": 40665,
	"Title": [" 查询商品分类\r"],
	"Header": [" application/x-www-form-urlencode\r"],
	"Method": [" GET\r"],
	"Url": [" goods/Category\r"],
	"Params": null,
	"Return": null,
	"Other": null
}, {
	"StartPos": 50112,
	"EndPos": 50255,
	"Title": [" 查询商品池(爆款)\r"],
	"Header": [" multipart/form-data\r"],
	"Method": [" GET\r"],
	"Url": [" goods/bestSalesPool\r"],
	"Params": [
		[" poolUid", "string", "商品池uuid\r"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 50399,
	"EndPos": 50685,
	"Title": [" 修改商品池(爆款)\r"],
	"Header": [" multipart/form-data\r"],
	"Method": [" put\r"],
	"Url": [" goods/bestSalesPool\r"],
	"Params": [
		[" poolUid", "string", "商品池uuid\r"],
		[" name", "string", "商品池名称", "可选\r"],
		[" background", "file", "商品池背景图片", "可选\r"],
		[" title", "string", "商品池标题", "可选\r"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 51096,
	"EndPos": 51255,
	"Title": [" 移除商品池(爆款)\r"],
	"Header": [" application/x-www-form-urlencode\r"],
	"Method": [" delete\r"],
	"Url": [" goods/bestSalesPool\r"],
	"Params": [
		[" poolUid", "string", "商品池uuid\r"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 52032,
	"EndPos": 52260,
	"Title": [" 添加商品池(爆款)\r"],
	"Header": [" multipart/form-data\r"],
	"Method": [" post\r"],
	"Url": [" goods/bestSalesPool\r"],
	"Params": [
		[" name", "string", "商品池名称\r"],
		[" background", "file", "商品池背景图片\r"],
		[" title", "string", "商品池标题\r"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 52625,
	"EndPos": 52775,
	"Title": [" 查询商品池商品(爆款)\r"],
	"Header": [" multipart/form-data\r"],
	"Method": [" get\r"],
	"Url": [" goods/bestSalesGoods\r"],
	"Params": [
		[" poolUid", "string", "商品池uuid\r"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 53759,
	"EndPos": 53890,
	"Title": [" 查询爆款所有商品(爆款)\r"],
	"Header": [" application/x-www-form-urlencode\r"],
	"Method": [" get\r"],
	"Url": [" goods/allBestSalesGoods\r"],
	"Params": null,
	"Return": null,
	"Other": null
}, {
	"StartPos": 54752,
	"EndPos": 55013,
	"Title": [" 修改商品池商品(爆款)\r"],
	"Header": [" application/x-www-form-urlencode\r"],
	"Method": [" put\r"],
	"Url": [" goods/bestSalesGoods\r"],
	"Params": [
		[" goodsUid", "string", "商品uuid\r"],
		[" pool", "string", "商品池uuid", "可选\r"],
		[" showOnMain", "int", "是否在主页显示(0/1)", "可选\r"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 55345,
	"EndPos": 55512,
	"Title": [" 删除商品池商品(爆款)\r"],
	"Header": [" application/x-www-form-urlencode\r"],
	"Method": [" delete\r"],
	"Url": [" goods/bestSalesGoods\r"],
	"Params": [
		[" goodsUid", "string", "商品池uuid\r"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 55713,
	"EndPos": 55971,
	"Title": [" 向商品池添加商品(爆款)\r"],
	"Header": [" application/x-www-form-urlencode\r"],
	"Method": [" post\r"],
	"Url": [" goods/bestSalesGoods\r"],
	"Params": [
		[" poolUid", "string", "商品池名称uuid\r"],
		[" shopgoods", "string", "上架商品uuid\r"],
		[" showOnMain", "int", "主页显示(0/1)\r"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 56310,
	"EndPos": 56423,
	"Title": [" 查询每日新品\r"],
	"Header": [" application/x-www-form-urlencode\r"],
	"Method": [" get\r"],
	"Url": [" goods/dailyNewGoods\r"],
	"Params": null,
	"Return": null,
	"Other": null
}, {
	"StartPos": 57732,
	"EndPos": 57904,
	"Title": [" 删除商品池商品(每日新品)\r"],
	"Header": [" application/x-www-form-urlencode\r"],
	"Method": [" delete\r"],
	"Url": [" goods/dailyNewGoods\r"],
	"Params": [
		[" goodsUid", "string", "商品池uuid\r"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 58104,
	"EndPos": 58281,
	"Title": [" 向商品池添加商品(每日新品)\r"],
	"Header": [" application/x-www-form-urlencode\r"],
	"Method": [" post\r"],
	"Url": [" goods/dailyNewGoods\r"],
	"Params": [
		[" shopgoods", "string", "上架商品uuid\r"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 58520,
	"EndPos": 58645,
	"Title": [" 获取商品池(每月新品)\r"],
	"Header": [" application/x-www-form-urlencode\r"],
	"Method": [" get\r"],
	"Url": [" goods/monthlyNewPool\r"],
	"Params": null,
	"Return": null,
	"Other": null
}, {
	"StartPos": 58791,
	"EndPos": 59084,
	"Title": [" 修改商品池(每月新品)\r"],
	"Header": [" multipart/form-data\r"],
	"Method": [" put\r"],
	"Url": [" goods/monthlyNewPool\r"],
	"Params": [
		[" poolUid", "string", "商品池uuid\r"],
		[" name", "string", "商品池名称", "可选\r"],
		[" background", "file", "商品池背景图片", "可选\r"],
		[" title", "string", "商品池标题", "可选\r"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 59527,
	"EndPos": 59739,
	"Title": [" 删除商品池(每月新品)\r"],
	"Header": [" application/x-www-form-urlencode\r"],
	"Method": [" delete\r"],
	"Url": [" goods/monthlyNewPool\r"],
	"Params": [
		[" poolUid", "string", "商品池uuid\r"],
		[" imgName", "string", "商品池背景图片\r"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 61726,
	"EndPos": 61961,
	"Title": [" 添加商品池(每月新品)\r"],
	"Header": [" multipart/form-data\r"],
	"Method": [" post\r"],
	"Url": [" goods/monthlyNewPool\r"],
	"Params": [
		[" name", "string", "商品池名称\r"],
		[" background", "file", "商品池背景图片\r"],
		[" title", "string", "商品池标题\r"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 62328,
	"EndPos": 62481,
	"Title": [" 查询每月新品\r"],
	"Header": [" application/x-www-form-urlencode\r"],
	"Method": [" get\r"],
	"Url": [" goods/monthlyNewGoods\r"],
	"Params": [
		[" poolUid", "string", "商品池uuid\r"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 63543,
	"EndPos": 63720,
	"Title": [" 移除商品池中商品(每月新品)\r"],
	"Header": [" application/x-www-form-urlencode\r"],
	"Method": [" delete\r"],
	"Url": [" goods/monthlyNewGoods\r"],
	"Params": [
		[" goodsUid", "string", "商品池uuid\r"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 63923,
	"EndPos": 64149,
	"Title": [" 向商品池中添加商品(每月新品)\r"],
	"Header": [" application/x-www-form-urlencode\r"],
	"Method": [" post\r"],
	"Url": [" goods/monthlyNewGoods\r"],
	"Params": [
		[" poolUid", "string", "商品池名称uuid\r"],
		[" shopgoods", "string", "上架商品uuid\r"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 64435,
	"EndPos": 64565,
	"Title": [" 查询每月新品所有数据\r"],
	"Header": [" application/x-www-form-urlencode\r"],
	"Method": [" get\r"],
	"Url": [" goods/allMonthlyNewGoods\r"],
	"Params": null,
	"Return": null,
	"Other": null
}, {
	"StartPos": 691,
	"EndPos": 994,
	"Title": [" 添加工作日志"],
	"Header": [" application/x-www-form-urlencode"],
	"Method": [" post"],
	"Url": [" franchisee/work_log/add"],
	"Params": [
		[" company", " string", " 公司uuid"],
		[" department", " string", " 部门uuid"],
		[" staff", " string", " 员工uuid"],
		[" content", " string", " 日志内容"],
		[" date", " string", " 填写日期(可选)"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 2585,
	"EndPos": 3010,
	"Title": [" 查询工作日志"],
	"Header": [" application/x-www-form-urlencode"],
	"Method": [" get"],
	"Url": [" franchisee/work_log/query"],
	"Params": [
		[" company", " string", " 记录uuid"],
		[" staff", " string", " 日志内容 1.单个(staff) 2.多个用英文逗号拼接(staff,staff)"],
		[" date", " string", " 评论内容(2020-12-13)(可选)"],
		[" startDate", " string", " 查询起始日期"],
		[" endDate", " string", " 查询结束日期"],
		[" department", " string", " 部门"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 6601,
	"EndPos": 6911,
	"Title": [" 修改工作日志"],
	"Header": [" application/x-www-form-urlencode"],
	"Method": [" put"],
	"Url": [" franchisee/work_log/edit"],
	"Params": [
		[" logUid", " string", " 记录uuid"],
		[" content", " string", " 日志内容"],
		[" comment", " string", " 评论内容"],
		[" commentator", " string", " 评论人uuid"],
		[" state", " string", " 状态('r','t'/'f')"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 9814,
	"EndPos": 10151,
	"Title": [" 添加日志查看周期"],
	"Header": [" application/x-www-form-urlencode"],
	"Method": [" post"],
	"Url": [" franchisee/work_log/period/add"],
	"Params": [
		[" company", " string", " 公司uuid"],
		[" department", " string", " 部门uuid(多个uuid$uuid)"],
		[" startDate", " string", " 开始时间"],
		[" endDate", " string", " 结束时间"],
		[" reqDays", " string", " 需打卡天数"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 12841,
	"EndPos": 13045,
	"Title": [" 查询日志周期记录"],
	"Header": [" application/x-www-form-urlencode"],
	"Method": [" get"],
	"Url": [" franchisee/work_log/period/query"],
	"Params": [
		[" company", " string", " 记录uuid"],
		[" department", " string", " 日志内容"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 14497,
	"EndPos": 14658,
	"Title": [" 删除日志周期记录"],
	"Header": [" application/x-www-form-urlencode"],
	"Method": [" post"],
	"Url": [" franchisee/work_log/period/del"],
	"Params": [
		[" logUid", " string", " 记录uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 14833,
	"EndPos": 15018,
	"Title": [" 查询打卡统计"],
	"Header": [" application/x-www-form-urlencode"],
	"Method": [" get"],
	"Url": [" franchisee/work_log/stats"],
	"Params": [
		[" company", " string", " 记录uuid"],
		[" period", " string", " 周期uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 13750,
	"EndPos": 13855,
	"Title": [" 查询订单"],
	"Header": [""],
	"Method": [" post"],
	"Url": [" order/Order/search"],
	"Params": [
		[" cond", " string", " 条件查询"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 2051,
	"EndPos": 2210,
	"Title": [" 查询推广收益"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" spread/spreadRevenue"],
	"Params": [
		[" staffUid", " string", " 推广专员uid"],
		[" year", " string", " 结束日期(2020)"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 2996,
	"EndPos": 3110,
	"Title": [" 查询推广记录"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" spread/spreadLog"],
	"Params": [
		[" staffUid", " string", " 推广专员uid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 4087,
	"EndPos": 4237,
	"Title": [" 验证推广记录"],
	"Header": [""],
	"Method": [" put"],
	"Url": [" spread/verifySpreadLog"],
	"Params": [
		[" logUid", " string", " 推广记录uid"],
		[" code", " string", " 验证码"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 4863,
	"EndPos": 4983,
	"Title": [" 查询推广专员信息"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" spread/staffInfo"],
	"Params": [
		[" staffUid", " string", " 推广专员uid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 5660,
	"EndPos": 6069,
	"Title": [" 修改推广专员信息"],
	"Header": [""],
	"Method": [" put"],
	"Url": [" spread/staffInfo"],
	"Params": [
		[" staffUid", " string", " 推广专员uid"],
		[" bankName", " string", " 银行名称"],
		["\taccountName", " string", " 帐号名称"],
		[" bankCardNum", " string", " 银行卡号"],
		[" mobile", " string", " 手机号"],
		[" email", " string", " 邮箱"],
		[" area", " string", " 推广区域"],
		[" name", " string", " 姓名"],
		[" company", " string", " 所属公司"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 6680,
	"EndPos": 7009,
	"Title": [" 申请成为推广专员"],
	"Header": [""],
	"Method": [" post"],
	"Url": [" spread/addStaff"],
	"Params": [
		[" bankName", " string", " 银行名称"],
		["\taccountName", " string", " 帐号名称"],
		[" bankCardNum", " string", " 银行卡号"],
		[" mobile", " string", " 手机号"],
		[" email", " string", " 邮箱"],
		[" area", " string", " 推广区域"],
		[" name", " string", " 姓名"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 13885,
	"EndPos": 14143,
	"Title": [" 添加推广信息"],
	"Header": [""],
	"Method": [" post"],
	"Url": [" spread/spreadLog"],
	"Params": [
		[" companyName", " string", " 公司名称"],
		[" registeredMobile", " string", " 注册人联系方式"],
		[" registeredName", " string", " 注册人姓名"],
		[" staffUid", " string", " 推广人uid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 5341,
	"EndPos": 5523,
	"Title": [" 查询周期是否可填写(销售表)"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" template/sales/inputter/state"],
	"Params": [
		[" company", " string", ""],
		[" inputter", " string", ""],
		[" cycleUid", " string", ""]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 6145,
	"EndPos": 6316,
	"Title": [" 销售表统计(total)"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" template/stats/sales/total"],
	"Params": [
		[" company", " string", " 公司uuid"],
		[" taskUid", " string"],
		[" cycleUid", " string"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 11998,
	"EndPos": 12323,
	"Title": [" 销售表统计(区间)"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" template/stats/sales/range"],
	"Params": [
		[" company", " string", " 公司uuid"],
		[" department", " string", " 部门"],
		[" staff", "string", " 员工"],
		[" startDate", " string", " 起始时间(2006-01)"],
		[" endDate", " string", " 结束时间(2006-01)"],
		[" taskUid", " string", " 周期任务uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 14862,
	"EndPos": 15103,
	"Title": [" 商机预测统计(按月)"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" template/stats/bus_predict/month"],
	"Params": [
		[" date", " string", " 日期(格式2006-01)"],
		[" company", " string", " 公司uuid"],
		[" department", " string", " 部门"],
		[" staff", " string", " 员工"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 15411,
	"EndPos": 15603,
	"Title": [" 商机预测统计(day)"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" template/stats/bus_predict/day"],
	"Params": [
		[" company", " string", " 公司uuid"],
		[" department", " string", " 部门"],
		[" staff", " string", " 员工"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 18909,
	"EndPos": 19164,
	"Title": [" 查询商机预测表(部门/员工)列表数据"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" template/stats/bus_predict/list"],
	"Params": [
		[" company", " string", " 公司uuid"],
		[" stype", " string", " 部门 (d", " 部门/ s", " 员工)"],
		[" object", " string", " 查询对象uuid(部门)"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 21155,
	"EndPos": 21447,
	"Title": [" 商机预测统计(区间)"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" template/stats/bus_predict/range"],
	"Params": [
		[" company", " string", " 公司uuid"],
		[" department", " string", " 部门"],
		[" staff", "string", " 员工"],
		[" startDate", " string", " 起始时间(2006-01)"],
		[" endDate", " string", " 结束时间(2006-01)"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 24327,
	"EndPos": 24528,
	"Title": [" 统计当天数据(包括前一天)"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" template/stats/client/month"],
	"Params": [
		[" company", " string", " 公司uuid"],
		[" department", " string", " 部门"],
		[" staff", " string", " 员工"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 25917,
	"EndPos": 26152,
	"Title": [" 查询(部门/员工)列表数据"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" template/state/client/list"],
	"Params": [
		[" company", " string", " 公司uuid"],
		[" stype", " string", " 部门 (d", " 部门/ s", " 员工)"],
		[" object", " string", " 查询对象uuid(部门)"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 28000,
	"EndPos": 28297,
	"Title": [" 查询指定区间客户统计数据"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" template/stats/client/range"],
	"Params": [
		[" company", " string", " 公司uuid"],
		[" department", " string", " 部门"],
		[" staff", "string", " 员工"],
		[" startDate", " string", " 起始时间(2006-01)"],
		[" endDate", " string", " 结束时间(2006-01)"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 30693,
	"EndPos": 30864,
	"Title": [" 设置模板周期启用状态"],
	"Header": [""],
	"Method": [" put"],
	"Url": [" template/setTplCycle"],
	"Params": [
		[" tplUid", " string", " 模板uuid"],
		[" cycle", " string", " 状态 0/关闭,1/设置"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 31121,
	"EndPos": 31234,
	"Title": [" 查询模板周期"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" template/templateCycle"],
	"Params": [
		[" tplUid", " string", " 模板uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 31489,
	"EndPos": 31723,
	"Title": [" 添加模板周期"],
	"Header": [""],
	"Method": [" post"],
	"Url": [" template/addTemplateCycle"],
	"Params": [
		[" tplUid", " string", " 模板uuid"],
		[" startDate", " string", " 开始时间"],
		[" endDate", " string", " 结束日期"],
		[" details", " string", " 周期说明\n"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 32095,
	"EndPos": 32309,
	"Title": [" 查询模板"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" template/templates"],
	"Params": [
		[" company", " string", " 公司uuid"],
		[" department", " string", " 部门uuid", "可选"],
		[" template", " string", " 用于获取单个模板信息", "可选"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 33646,
	"EndPos": 34047,
	"Title": [" 修改模板信息"],
	"Header": [""],
	"Method": [" put"],
	"Url": [" template/template"],
	"Params": [
		[" template", " string", " 模板uuid"],
		[" name", " string", " 名称 ", "可选"],
		[" type", " string", " 类型 ", "可选"],
		[" details", " string", " 详情 ", "可选"],
		[" department", " string", " 部门 ", "可选"],
		[" display_filed", " string", " 显示字段 ", "可选"],
		[" icon", " string", " 图标", " 可选"],
		[" enable", " string", " 是否启用", " 可选"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 35418,
	"EndPos": 35668,
	"Title": [" 修改模板标题信息"],
	"Header": [""],
	"Method": [" put"],
	"Url": [" template/templateTitle"],
	"Params": [
		[" title", " string", " 修改的内容 (`name`='test01',`details`='col01'$`name`='test02',`details`='col02' )"],
		[" titleUid", " string", "修改title的uuid (uuid$uuid)"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 36349,
	"EndPos": 36883,
	"Title": [" 查询模板数据"],
	"Header": [],
	"Method": [" get"],
	"Url": [" template/TemplateData"],
	"Params": [
		[" company", " string", " 模板所属公司uuid"],
		[" template", "string", "查询模板uuid"],
		[" user", "string", "用户uuid", "可选", " \"company + user\" 用于查询普通员工数据"],
		[" department", "string", "部门", "可选", " \"company + department\" 用于查询部门经理对应的数据"],
		[" startDate", " string", " 起始时间(可选)"],
		[" endDate", " string", " 结束时间(可选)"],
		[" cond", "string", "附加查询条件", "可选"],
		[" tempName", "string", "模板名称\n"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 38236,
	"EndPos": 38397,
	"Title": [" 查询模板数据的引用列"],
	"Header": [""],
	"Method": [" GET"],
	"Url": [" template/TemplateData"],
	"Params": [
		[" template", "string", "模板uuid"],
		[" user", "string", "查询用户uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 38743,
	"EndPos": 39088,
	"Title": [" 获取所有模板信息或单个模板信息"],
	"Header": [""],
	"Method": [" GET"],
	"Url": [" template/Templates"],
	"Params": [
		[" template", "string", "模板uuid", "用于获取单个模板信息(包括标题)其他参数不传"],
		[" company", "string", "公司uuid", "用于获取公司所有模板"],
		[" user", "string", "用户uuid", "可选"],
		[" department", "所属部门uuid", "可选"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 41090,
	"EndPos": 41441,
	"Title": [" 添加模板标题"],
	"Header": [""],
	"Method": [" POST"],
	"Url": [" template/AddTplColTitle"],
	"Params": [
		[" company", "string", "公司uuid"],
		[" template", "string", "模板uuid"],
		[" position", "string", "模板对应的列编号  01 - 30"],
		[" name", "string", "标题名称"],
		[" type", "string", "标题数据类型"],
		[" details", "string", "标题额外信息 (枚举内容或指定精度)"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 42230,
	"EndPos": 42341,
	"Title": [" 获取模板标题"],
	"Header": [""],
	"Method": [" GET"],
	"Url": [" template/TplColTitle"],
	"Params": [
		[" template", "string", "公司uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 42598,
	"EndPos": 43291,
	"Title": [" 添加模板或模板标题"],
	"Header": [""],
	"Method": [" POST"],
	"Url": [" template/AddTemplate"],
	"Params": [
		[" company", "string", "公司uuid"],
		[" name", "string", "模板名称", "只添加模板标题时可不传"],
		[" type", "string", "模板类型(s/p 统计模板/预测模板)", "只添加模板标题时可不传"],
		[" details", "string", "模板说明", "只添加模板标题时可不传"],
		[" department", "string", "部门uuid", "只添加模板标题时可不传"],
		[" icon", "string", "模板图标(可选)"],
		[" enable", "string", "是否启用(可选)", "默认启用"],
		[" display_filed", "string", "显示字段(可选)", "用逗号拼接"],
		[" cols", "string", "标题数据", " 格式 'UUID','company','template','position','name','type','details'"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 45573,
	"EndPos": 45885,
	"Title": [" 批量添加模板数据"],
	"Header": [""],
	"Method": [" POST"],
	"Url": [" template/BatchAddData"],
	"Params": [
		[" rowsId", "string", "数据对应的uuid", "以$拼接"],
		[" cols", "string", "批量添加数据", "格式 'uuid','company','template','user','col01','col02'....,'department',多条则以$拼接"],
		[" type", "string", " 1/销售表(可空)"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 49819,
	"EndPos": 50014,
	"Title": [" 修改模板数据(手机端)"],
	"Header": [""],
	"Method": [" PUT"],
	"Url": [" template/ModifyData"],
	"Params": [
		[" cols", "string", "数据01~30(多条以$拼接)"],
		[" rowId", "string", "修改数据的uuid(多条以$拼接)"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 52510,
	"EndPos": 52675,
	"Title": [" 批量修改数据"],
	"Header": [""],
	"Method": [" PUT"],
	"Url": [" template/BatchAddData"],
	"Params": [
		[" rowUuid", "string", "修改数据对应的uuid"],
		[" cols", "string", "批量添加数据"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 53675,
	"EndPos": 53780,
	"Title": [" 删除模板"],
	"Header": [""],
	"Method": [" DELETE"],
	"Url": [" template/Template"],
	"Params": [
		[" template", "string", "模板uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 55422,
	"EndPos": 55588,
	"Title": [" 删除模板数据某一行"],
	"Header": [""],
	"Method": [" DELETE"],
	"Url": [" template/TemplateRowData"],
	"Params": [
		[" row", "string", "删除数据uuid"],
		[" template", " string", " 模板uuids"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 55772,
	"EndPos": 56069,
	"Title": [" 获取模板数据长度"],
	"Header": [""],
	"Method": [" GET"],
	"Url": [" template/TemplateDataLen"],
	"Params": [
		[" template", "string", "模板uuid"],
		[" user", "string", "用户uuid", "可选(用于查询属于该员工的数据总长度)"],
		[" department", "string", "部门uuid", "可选(用于查询属于该部门的数据总长度)"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 56787,
	"EndPos": 57098,
	"Title": [" 查询模板指定列数据"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" template/TplDataCol"],
	"Params": [
		[" template", "string", "模板uuid"],
		[" pos", "string", "模板数据编号 01 ~ 30"],
		[" user", "string", "用户uuid", "可选(用于查询该员工的数据)"],
		[" department", "string", "部门uuid", "可选(用于查询该部门的数据)"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 58469,
	"EndPos": 58709,
	"Title": [" 搜索模板内容"],
	"Header": null,
	"Method": [" get"],
	"Url": [" template/search"],
	"Params": [
		[" content", " string", " 搜索内容"],
		[" tempName", "string", " 模板名称"],
		[" company", " string", " 公司uuid"],
		[" dep", " string", " 部门uuid"],
		[" staff", " string", " 员工uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 60687,
	"EndPos": 61073,
	"Title": [" 添加商机预测记录"],
	"Header": [""],
	"Method": [" post"],
	"Url": [" template/addBusPredict"],
	"Params": [
		[" company", " string", " 公司uuid"],
		[" staff", " string", " 员工uuid"],
		[" client", " string", " 客户uuid"],
		[" confidence", " string", " 商机属性"],
		[" amount", " string", " 商机金额"],
		[" pre_date", " string", " 预计落单日期"],
		[" state", " string", " 商机现状"],
		[" detail", " string", " 商机说明"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 70316,
	"EndPos": 70412,
	"Title": [" 删除商机"],
	"Header": [""],
	"Method": [" put"],
	"Url": [" /test"],
	"Params": [
		[" uid", " string", " 删除记录的uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 70585,
	"EndPos": 70938,
	"Title": [" 修改商机"],
	"Header": [""],
	"Method": [" put"],
	"Url": [" /test"],
	"Params": [
		[" uid", " string", " 记录uuid"],
		[" company", " string", " 公司uuid"],
		[" staff", " string", " 员工uuid"],
		[" confidence", " string", " 商机属性"],
		[" amount", " string", " 商机金额"],
		[" pre_date", " string", " 预计落单日期"],
		[" state", " string", " 商机现状"],
		[" detail", " string", " 商机说明"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 73820,
	"EndPos": 74053,
	"Title": [" 添加到款预测记录"],
	"Header": [""],
	"Method": [" post"],
	"Url": [" /test"],
	"Params": [
		[" company", " string", ""],
		[" staff", " string", ""],
		[" client", " string", ""],
		[" type", " string"],
		[" pre_amount", " string"],
		[" amount", " string"],
		[" ratio", " string"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 74657,
	"EndPos": 74766,
	"Title": [" 删除到款预测记录"],
	"Header": [""],
	"Method": [" put"],
	"Url": ["  /test"],
	"Params": [
		[" uid", " string", " 删除记录的uuid"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 75426,
	"EndPos": 75698,
	"Title": [" (销售表)添加模板周期"],
	"Header": [""],
	"Method": [" post"],
	"Url": [" template/stats/sales/cycle/add"],
	"Params": [
		[" company", "string", "公司uuid"],
		[" template", "string", "模板uuid"],
		[" startDate", "string", "开始日期"],
		[" endDate", "string", "结束日期"],
		[" inputter", "string", "对象"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 78233,
	"EndPos": 78468,
	"Title": [" (销售表)添加周期任务"],
	"Header": [""],
	"Method": [" post"],
	"Url": [" template/stats/sales/cycle/task/add"],
	"Params": [
		[" template", "string"],
		[" cycle", "string"],
		[" company", "string"],
		[" type", "string"],
		[" task", "string", "(object,amount,profit$)"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 80633,
	"EndPos": 80781,
	"Title": [" (销售表)查询周期任务"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" template/state/sales/cycle/task/query"],
	"Params": [
		[" cycle", "string"],
		[" company", "string"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 82435,
	"EndPos": 82635,
	"Title": [" 修改销售表任务(销售表)"],
	"Header": [],
	"Method": [" put"],
	"Url": [" template/state/sales/cycle/task/edit"],
	"Params": [
		[" logUid", " string", ""],
		[" amount", " string", ""],
		[" profit", " string", ""],
		[" staff", " string", ""]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 83823,
	"EndPos": 83979,
	"Title": [" 删除销售表任务(销售表)"],
	"Header": [],
	"Method": [" DELETE"],
	"Url": [" template/stats/sales/cycle/task/del"],
	"Params": [
		[" logUid", " string", ""],
		[" company", " string", ""]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 84169,
	"EndPos": 84307,
	"Title": [" 查询销售周期"],
	"Header": [],
	"Method": [" get"],
	"Url": [" template/stats/sales/cycle/query"],
	"Params": [
		[" company", " string", ""],
		[" template", " string", ""]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 85707,
	"EndPos": 85843,
	"Title": [" 删除周期(销售表)"],
	"Header": [],
	"Method": [" delete"],
	"Url": [" template/sales/cycle/del"],
	"Params": [
		[" logUid", " string", ""],
		[" company", " string", ""]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 87138,
	"EndPos": 87326,
	"Title": [" 修改周期(销售表)"],
	"Header": [],
	"Method": [" put"],
	"Url": [" template/sales/cycle/edit"],
	"Params": [
		[" logUid", " string", ""],
		[" startDate", " string", ""],
		[" endDate", " string", ""],
		[" inputter", " string", "\n"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 89855,
	"EndPos": 90072,
	"Title": [" 查查员工销售详情"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" template/sales/task/details"],
	"Params": [
		[" taskUid", " string", ""],
		[" company", " string", ""],
		[" cycleUid", " string", ""],
		[" startDate", " string", ""],
		[" endDate", " string", ""]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 93174,
	"EndPos": 93555,
	"Title": [" 添加销售记录"],
	"Header": [""],
	"Method": [" get"],
	"Url": [" /test"],
	"Params": [
		[" ord_num", " string", " 订单编号"],
		[" company", " string", " 公司uuid"],
		[" client", " string", " 客户uuid"],
		[" staff", " string", " 员工uuid"],
		[" amount", " string", " 金额"],
		[" profit", " string", " 利润"],
		[" ratio", " string", " 毛利率"],
		[" detail", " string", " 销售说明"],
		[" pre_date", " string", " 预计完结时间"]
	],
	"Return": null,
	"Other": null
}, {
	"StartPos": 21,
	"EndPos": 324,
	"Title": [" 添加工作日志"],
	"Header": [" application/x-www-form-urlencode"],
	"Method": [" post"],
	"Url": [" franchisee/work_log/add"],
	"Params": [
		[" company", " string", " 公司uuid"],
		[" department", " string", " 部门uuid"],
		[" staff", " string", " 员工uuid"],
		[" content", " string", " 日志内容"],
		[" date", " string", " 填写日期(可选)"]
	],
	"Return": null,
	"Other": null
}]