import { Dispatch, SetStateAction, useState } from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./pagination";



const GetButtonArray = (totalPages: number, page: number): (number | "ellipsis")[] => {
    // return Array.from({ length: totalPages }, (_, index) => ({ type: 'page', value: index + 1 }));
     if(totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if(totalPages <= 4) {
        return [1, 2, 3, 4, 5, "ellipsis", totalPages]
    }
    
    if(page >= totalPages -3) {
        return [1, 
            "ellipsis", 
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages]
    }

    return [1, "ellipsis", page -1, page, page + 1, "ellipsis", totalPages]
}

interface Props {
    totalPages: number;
     handlePageChange: Dispatch<SetStateAction<number>>;
     page: number;

}

export default function TablePagination({totalPages, handlePageChange, page}: Props) {
   
   

    const gotoPage = (page: number) => {
        handlePageChange(page)
    }

    const pages = GetButtonArray(totalPages, page);

   if(totalPages <= 1) {
    return null;
 }


    return(
         <Pagination>
            <PaginationContent>

           <PaginationItem>
              <PaginationPrevious
                       onClick={() => gotoPage(page - 1)}
                       aria-disabled={page === 1}
                       className={page === 1 ? "pointer-events-none opacity-50" : undefined}
                  />
            </PaginationItem>
           
           {
           pages.map((item, index) => 
            item === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${pages[index - 1]}-${pages[index + 1]}`}>
                    <PaginationEllipsis/>
                </PaginationItem>
            ) : (
                <PaginationItem key={`page-${item}`}>
                    <PaginationLink onClick={() => handlePageChange(item as number)} isActive={page === item}>
                        {item}
                    </PaginationLink>
                </PaginationItem>
            )
        )}
          
            <PaginationItem>
                   <PaginationNext
                       onClick={() => gotoPage(page + 1)}
                       aria-disabled={page === totalPages}
                       className={page === totalPages ? "pointer-events-none opacity-50" : undefined}
                   />      
            </PaginationItem>

            </PaginationContent>
         </Pagination>
    )
}