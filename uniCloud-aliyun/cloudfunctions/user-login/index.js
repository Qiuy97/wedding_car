'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
  const { code } = event;
  
  try {
    // 获取微信用户信息
    const res = await uniCloud.getWeixinOpenid({
      appid: 'wxda0d32c7402bcb9a',
      secret: '', // 需要在uniCloud控制台配置
      code: code
    });
    
    const { openid } = res;
    
    // 查询用户是否存在
    const userRes = await db.collection('users').where({
      openid: openid
    }).get();
    
    let user;
    if (userRes.data.length === 0) {
      // 新用户，创建记录
      const addRes = await db.collection('users').add({
        openid: openid,
        user_type: 1, // 默认普通用户
        status: 1,
        create_time: new Date()
      });
      
      user = {
        _id: addRes.id,
        openid: openid,
        user_type: 1,
        status: 1
      };
    } else {
      user = userRes.data[0];
    }
    
    return {
      code: 0,
      message: '登录成功',
      data: {
        token: openid, // 简化处理，实际应该生成JWT
        user: user
      }
    };
  } catch (error) {
    return {
      code: -1,
      message: '登录失败',
      error: error.message
    };
  }
};
