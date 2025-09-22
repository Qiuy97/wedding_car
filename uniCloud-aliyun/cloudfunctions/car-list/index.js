'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
  const { 
    page = 1, 
    pageSize = 10, 
    brand = '', 
    minPrice = 0, 
    maxPrice = 999999,
    area = '',
    sortBy = 'rating' // rating, price, order_count
  } = event;
  
  try {
    let query = db.collection('cars').where({
      status: 1
    });
    
    // 品牌筛选
    if (brand) {
      query = query.where({
        brand: brand
      });
    }
    
    // 价格筛选
    if (minPrice > 0 || maxPrice < 999999) {
      query = query.where({
        price_per_hour: db.command.gte(minPrice).and(db.command.lte(maxPrice))
      });
    }
    
    // 地区筛选
    if (area) {
      query = query.where({
        service_area: new RegExp(area)
      });
    }
    
    // 排序
    const orderMap = {
      'rating': { rating: 'desc' },
      'price': { price_per_hour: 'asc' },
      'order_count': { order_count: 'desc' }
    };
    
    if (orderMap[sortBy]) {
      query = query.orderBy(Object.keys(orderMap[sortBy])[0], Object.values(orderMap[sortBy])[0]);
    }
    
    // 分页
    const skip = (page - 1) * pageSize;
    query = query.skip(skip).limit(pageSize);
    
    const res = await query.get();
    
    // 获取车主信息
    const ownerIds = [...new Set(res.data.map(car => car.owner_id))];
    const ownersRes = await db.collection('users').where({
      _id: db.command.in(ownerIds)
    }).get();
    
    const ownerMap = {};
    ownersRes.data.forEach(owner => {
      ownerMap[owner._id] = owner;
    });
    
    // 组装数据
    const cars = res.data.map(car => ({
      ...car,
      owner: ownerMap[car.owner_id] || {}
    }));
    
    return {
      code: 0,
      message: '获取成功',
      data: {
        cars: cars,
        total: res.data.length,
        page: page,
        pageSize: pageSize
      }
    };
  } catch (error) {
    return {
      code: -1,
      message: '获取失败',
      error: error.message
    };
  }
};
