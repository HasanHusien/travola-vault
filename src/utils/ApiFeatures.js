class APIFeatures {
  constructor(query, queryString) {
    
    this.query = query;
    this.queryString = queryString;
  }

  // 1. filtering
  filter() {
    const queryObject = { ...this.queryString };
    const excludeFields = ['page', 'limit', 'sort', 'fields'];

    // ignore excludeFields from the query
    excludeFields.forEach(el => delete queryObject[el]);

    // add more advanced filtering ( graterThen, graterThen or Equals, etc..  )
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    const finalQueryStr = JSON.parse(queryStr);

    this.query = this.query.find(finalQueryStr);

    return this;
  }

  // 2. sorting
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  // 3. field limiting
  limit() {
    if (this.queryString.fields) {
      const limitBy = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(limitBy);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  // 4. pagination
  paginate() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
