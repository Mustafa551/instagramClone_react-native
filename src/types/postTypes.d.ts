import React from 'react';
import {Post} from './posts';

export interface PostProp {
  post: Post;
  index?: number;
  handlelike?: (value: Post) => void;
}
