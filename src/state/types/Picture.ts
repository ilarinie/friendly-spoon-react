export interface Picture {
  id: number;
  created_at: string;
  updated_at: string;
  picture: {
      /**
       * Relative to API path
       */
      url: string;
      thumb: {
         /**
          * Relative to API path
          */
          url: string;
      },
      medium: {
          /**
          * Relative to API path
          */
          url: string;
      }
  },
  recipe_id: number;
  index: number | null;
  author: string;
}