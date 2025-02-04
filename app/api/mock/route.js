export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const lawyersPerPage = 10;
  const totalLawyers = 100;
  const totalPages = Math.ceil(totalLawyers / lawyersPerPage);

  // Generate dummy lawyers
  const lawyers = Array.from({ length: totalLawyers }, (_, index) => ({
    id: index + 1,
    name: `Lawyer ${index + 1}`,
    qualification: "LLB, Law Expert",
    avatar:
      "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611765.jpg",
    rating: Math.floor(Math.random() * 5) + 1, // Random rating (1-5)
  }));

  // Paginate results
  const startIndex = (page - 1) * lawyersPerPage;
  const endIndex = startIndex + lawyersPerPage;
  const paginatedLawyers = lawyers.slice(startIndex, endIndex);

  return Response.json({
    data: paginatedLawyers,
    current_page: page,
    last_page: totalPages,
    per_page: lawyersPerPage,
    total: totalLawyers,
  });
}
