export const projectQueryParams = {
  search: {
    name: 'search',
    required: false,
    type: String,
  },
  orderBy: {
    name: 'orderBy',
    required: false,
    type: String,
    enum: ['name-asc', 'name-desc'],
  },
};
