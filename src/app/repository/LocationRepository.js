const LocationSchema = require('../schema/LocationSchema');

class CarRepository {
  async create(payload, data) {
    return LocationSchema.create(payload, data);
  }

  async find(payload) {
    const myCustomLabels = {
      totalDocs: 'total',
      docs: 'Locações',
      page: 'offset',
      nextPage: false,
      prevPage: false,
      totalPages: 'offsets',
      pagingCounter: false,
      meta: false,
      hasPrevPage: false,
      hasNextPage: false
    };
    const options = {
      page: 1,
      limit: 100,
      customLabels: myCustomLabels
    };
    return LocationSchema.paginate(payload, options, {});
  }

  async delete(id) {
    return LocationSchema.deleteOne({ _id: id });
  }

  async findId(id) {
    return LocationSchema.findOne({ _id: id });
  }

  async update(id, payload) {
    await LocationSchema.updateOne({ car_id: id }, payload);
    return LocationSchema.findOne({ car_id: id });
  }
}

module.exports = new CarRepository();
