const tableColumnsConfig = {
    // 每个模块表格要显示的字段
    todayRisk: {
      situation1: [
          {
            label: '工单号',
            prop: 'orderNumber',
            type: 'text',
            minWidth: 120,
            edit:true
          },
          {
            label: '功能位置',
            prop: 'functionalLocation',
            type: 'text',
            minWidth: 120,
            edit:true
          },
          {
            label: '工作内容',
            prop: 'workContent',
            type: 'text',
            minWidth: 200,
            edit:true
          },
          {
            label: '许可证',
            prop: 'permit',
            type: 'text',
            minWidth: 120,
            edit:true
          },
          {
            label: '专业',
            prop: 'specialty',
            type: 'text',
            minWidth: 120,
            edit:true
          },
          {
            label: '工作负责人',
            prop: 'workLeader',
            type: 'text',
            minWidth: 120,
            edit:true
          },
          {
            label: '责任人',
            prop: 'responsiblePerson',
            type: 'text',
            edit:true,
            minWidth:120
          },
          {
            label: '成员',
            prop: 'members',
            type: 'text',
            edit:true
          },
          {
            label: '计划开始',
            prop: 'planStart',
            type: 'time',
          },
          {
            label: '工期 (H)',
            prop: 'duration',
            type: 'text',
          },
          {
            label: '风险识别',
            prop: 'riskIdentification',
            type: 'text',
          },
          {
            label: '工单识别',
            prop: 'orderIdentification',
            type: 'text',
          },
          {
            label: '工单状态',
            prop: 'orderStatus',
            type: 'select',
            options: [
              { value: 'open', label: 'Open' },
              { value: 'closed', label: 'Closed' },
            ],
          },
          {
            label: '计划提醒',
            prop: 'planReminder',
            type: 'text',
          },
          {
            label: '执行情况',
            prop: 'executionStatus',
            type: 'text',
          }
      ],
      situation2: [
        { label: '许可证', prop: 'permit' },
        { label: '专业', prop: 'specialty' },
        { label: '工作负责人', prop: 'workLeader' },
      ],
    },
    highRisk: {
      situation1: [
        { label: '责任人', prop: 'responsiblePerson' },
        { label: '成员', prop: 'members' },
        { label: '计划开始', prop: 'planStart' },
      ],
      situation2: [
        { label: '工期（H）', prop: 'duration' },
        { label: '风险识别', prop: 'riskIdentification' },
        { label: '工单标识', prop: 'orderIdentification' },
      ],
    },
    levelSevenTicket: {
      situation1: [
        { label: '工单状态', prop: 'orderStatus' },
        { label: '计划提醒', prop: 'planReminder' },
        { label: '执行情况', prop: 'executionStatus' },
      ],
      situation2: [
        { label: '其他列', prop: 'otherColumn' },
      ],
    },
    sml: {
      situation1: [
        { label: '工单号', prop: 'orderNumber' },
        { label: '功能位置', prop: 'functionalLocation' },
      ],
      situation2: [
        { label: '工单状态', prop: 'orderStatus' },
      ],
    },
  };
  
  export default tableColumnsConfig;
  