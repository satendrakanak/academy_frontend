import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const TestimonialsPagination = ({
  currentPage,
  totalPages,
  buildHref,
}: {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).slice(
    Math.max(currentPage - 2, 0),
    Math.min(Math.max(currentPage - 2, 0) + 5, totalPages),
  );

  return (
    <Pagination className="mt-10 justify-center">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={buildHref(Math.max(currentPage - 1, 1))}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink href={buildHref(page)} isActive={page === currentPage}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={buildHref(Math.min(currentPage + 1, totalPages))}
            className={
              currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
