import { MatPaginatorIntl } from '@angular/material';

const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 ne ${length}`; }
  
  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} ne ${length}`;
}


export function getDutchPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  
  paginatorIntl.itemsPerPageLabel = 'Rreshta per faqe:';
  paginatorIntl.nextPageLabel = 'Faqja tjeter';
  paginatorIntl.previousPageLabel = 'Faqja e mepareshme';
  paginatorIntl.getRangeLabel = dutchRangeLabel;
  paginatorIntl.firstPageLabel = "Faqja e pare";
  paginatorIntl.lastPageLabel = "Faqja e fundit";
  return paginatorIntl;
}