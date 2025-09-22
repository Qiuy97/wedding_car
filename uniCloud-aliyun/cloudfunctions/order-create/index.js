'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
  const { 
    user_id,
    car_id,
    service_date,
    service_time,
    pickup_location,
    dropoff_location,
    special_requirements = ''
  } = event;
  
  try {
    // 获取车辆信息
    const carRes = await db.collection('cars').doc(car_id).get();
    if (carRes.data.length === 0) {
      return {
        code: -1,
        message: '车辆不存在'
      };
    }
    
    const car = carRes.data[0];
    
    // 计算费用（简化处理，按4小时计算）
    const hours = 4;
    const totalAmount = car.price_per_hour * hours;
    const platformFee = Math.round(totalAmount * 0.05); // 5%手续费
    const ownerAmount = totalAmount - platformFee;
    
    // 创建订单
    const orderData = {
      user_id: user_id,
      car_id: car_id,
      owner_id: car.owner_id,
      service_date: service_date,
      service_time: service_time,
      pickup_location: pickup_location,
      dropoff_location: dropoff_location,
      special_requirements: special_requirements,
      total_amount: totalAmount,
      platform_fee: platformFee,
      owner_amount: ownerAmount,
      status: 1, // 待支付
      create_time: new Date()
    };
    
    const addRes = await db.collection('orders').add(orderData);
    
    return {
      code: 0,
      message: '订单创建成功',
      data: {
        order_id: addRes.id,
        ...orderData
      }
    };
  } catch (error) {
    return {
      code: -1,
      message: '创建订单失败',
      error: error.message
    };
  }
};
