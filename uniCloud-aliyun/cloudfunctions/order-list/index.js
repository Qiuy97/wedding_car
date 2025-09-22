'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
  const { 
    user_id,
    status = '',
    page = 1,
    pageSize = 10
  } = event;
  
  if (!user_id) {
    return {
      code: -1,
      message: '用户ID不能为空'
    };
  }
  
  try {
    let query = db.collection('orders').where({
      user_id: user_id
    });
    
    // 状态筛选
    if (status) {
      query = query.where({
        status: parseInt(status)
      });
    }
    
    // 分页和排序
    const skip = (page - 1) * pageSize;
    query = query.orderBy('create_time', 'desc').skip(skip).limit(pageSize);
    
    const ordersRes = await query.get();
    
    // 获取车辆信息
    const carIds = [...new Set(ordersRes.data.map(order => order.car_id))];
    const carsRes = await db.collection('cars').where({
      _id: db.command.in(carIds)
    }).get();
    
    const carMap = {};
    carsRes.data.forEach(car => {
      carMap[car._id] = car;
    });
    
    // 组装订单数据
    const orders = ordersRes.data.map(order => ({
      ...order,
      car: carMap[order.car_id] || {}
    }));
    
    return {
      code: 0,
      message: '获取成功',
      data: {
        orders: orders,
        total: ordersRes.data.length,
        page: page,
        pageSize: pageSize
      }
    };
    
  } catch (error) {
    return {
      code: -1,
      message: '获取订单列表失败',
      error: error.message
    };
  }
};
