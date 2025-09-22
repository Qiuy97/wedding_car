'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
  const { car_id } = event;
  
  if (!car_id) {
    return {
      code: -1,
      message: '车辆ID不能为空'
    };
  }
  
  try {
    // 获取车辆详情
    const carRes = await db.collection('cars').doc(car_id).get();
    
    if (carRes.data.length === 0) {
      return {
        code: -1,
        message: '车辆不存在'
      };
    }
    
    const car = carRes.data[0];
    
    // 获取车主信息
    const ownerRes = await db.collection('users').doc(car.owner_id).get();
    const owner = ownerRes.data[0] || {};
    
    // 获取评价信息
    const reviewsRes = await db.collection('reviews').where({
      car_id: car_id
    }).orderBy('create_time', 'desc').limit(10).get();
    
    // 获取评价用户信息
    const userIds = reviewsRes.data.map(review => review.user_id);
    const usersRes = await db.collection('users').where({
      _id: db.command.in(userIds)
    }).get();
    
    const userMap = {};
    usersRes.data.forEach(user => {
      userMap[user._id] = user;
    });
    
    // 组装评价数据
    const reviews = reviewsRes.data.map(review => ({
      ...review,
      user: userMap[review.user_id] || {}
    }));
    
    return {
      code: 0,
      message: '获取成功',
      data: {
        car: car,
        owner: owner,
        reviews: reviews
      }
    };
    
  } catch (error) {
    return {
      code: -1,
      message: '获取车辆详情失败',
      error: error.message
    };
  }
};
