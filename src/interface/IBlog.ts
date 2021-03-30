export interface IBlogList {
  page?: number;
  limit?: number;
  keyword?: string;
  categoryId?: number;
  searchType?: string;
}

export interface IPublish {
  UserId: number;
  content: string;
  CategoryId: number;
  title: string;
  img?: any;
  desc?: string;
  theme: string;
  isPublic: number;
  isComment: number;
}

export interface IComment {
  blogId: number;
  username: string;
  profile: string;
  time: number;
  comment: string;
  // children?: any;
}

export interface ILike {
  id: number;
  userId: number;
  isLike: boolean;
}
