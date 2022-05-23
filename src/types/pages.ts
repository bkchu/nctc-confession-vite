export interface Page {
  id: number;
  created_at: string;
  title: string;
  slug: string;
  page_group: number;
  page_number: number;
  content: string;
}

export type PageLink = Pick<
  Page,
  'title' | 'slug' | 'page_group' | 'page_number'
>;

export type PageContent = Pick<Page, 'content' | 'slug'>;
