import {getAllGroupsProfiles} from '@/apis/Handle/HandleGroup.ts'
import {GroupListsProps} from '@/utils/ModuleProps/GroupItemsProps.ts'
import {useEffect,useState } from 'react'
import { Select,InputNumber,Pagination } from 'antd'
import type { ProColumns } from '@ant-design/pro-components';
import {EditableProTable} from '@ant-design/pro-components';

const { Option }  = Select

const columns: ProColumns<GroupListsProps>[] = [
    {
      title: '群聊Id',
      dataIndex:'groupId',
      readonly: true,
    },
    {
      title: '群聊名称',
      dataIndex:'groupName',
    },
    {
      title: '成员数量',
      dataIndex:'memberCount',
    },
    {
      title: '人数上限',
      dataIndex:'memberLimit',
    },
    {
      title: '类型',
      dataIndex:'type',
    },
    {
      title: '请求批准',
      dataIndex:'requiresApproval',
    },
    {
      title: '是否删除',
      dataIndex:'isDeleted',
    },
    {
      title: '是否封禁',
      dataIndex:'isBanned',
    },
    {
      title: '群聊头像',
      dataIndex:'avatarUrl',
      render: (_, { avatarUrl }) => (
        <>
          <img className='w-4 h-4' src={avatarUrl}/>
        </>
      ),
    },
    {
      title: '群聊背景',
      dataIndex:'backgroundUrl',
      render: (_, { backgroundUrl }) => (
        <>
          <img className='w-4 h-4' src={backgroundUrl}/>
        </>
      ),
    },
    {
      title: '最近更新时间',
      dataIndex:'updateTime',
    },
    {
      title: '创建时间',
      dataIndex:'updateTime',
    },
    {
      title: '群聊描述',
      dataIndex:'description',
    },
    {
      title: '编辑',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>
      ],
    },
  ];

export default function GroupLists(){
    const handleGetProfiles = async ()=>{
        const res = await getAllGroupsProfiles(1,2)
        console.log(res);
        
    }
    return (
        <>
        <button className='bg-slate-400'>暂未开放</button>
          {/* <EditableProTable<GroupListsProps>
          rowKey="id"
          maxLength={5}
          columns={columns}
          request={async () => ({
            data: newdata,
            total: 3,
            success: true,
          })}
          value={newdata}
          onChange={()=>{console.log('数据修改了')}}
          editable={{
            type: 'multiple',
            onSave: async (rowKey, data) => {
              saveChangeUsersProfiles(rowKey,data)
              await waitTime(2000);
            },
          }} */}
        {/* /> */}
        </>
    )
}