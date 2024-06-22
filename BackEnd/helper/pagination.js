export const pagination = (query, data, totalRecords) => {
  const page = parseInt(query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(query.limit) || 10; // Default to 10 items per page if not provided
  const skip = (page - 1) * limit;

  const totalPages = Math.ceil(totalRecords / limit);
  const currentPage = page;

  const startIndex = skip;
  const endIndex = Math.min(startIndex + limit - 1, totalRecords - 1);

  // Slice the data array to get the items for the current page
  const paginatedData = data.slice(startIndex, endIndex + 1);

  const result = {
    status: "success",
    data: paginatedData,
    totalRecords: totalRecords,
    totalPages: totalPages,
    currentPage: currentPage,
    endIndex: endIndex,
    limit: limit,
  };

  return result;
};

export default paginateResponse;
