import {Post} from '../../types/posts';
import {users} from './userData';

export const POSTS: Post[] = [
  {
    imageUrl:
      'https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2dyYW1taW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    user: users[0].username,
    likes: 7870,
    caption: 'Train Ride to Hogwarts. 😅🚆',
    profile_picture: users[0].image,
    comments: [
      {
        user: 'theqazman',
        comment: 'Wow! This build looks fire. Super excited about',
      },
      {
        user: 'theqazman.dev',
        comment: 'Wow! This build looks fire. Super excited about',
      },
    ],
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1602992708529-c9fdb12905c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvZGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    user: users[1].username,
    likes: 770,
    caption: 'Train Ride to Hogwarts. 😅🚆',
    profile_picture: users[1].image,
    comments: [
      {
        user: 'theqazman',
        comment: 'Wow!',
      },
      {
        user: 'theqazman.dev',
        comment: 'ohh man',
      },
    ],
  },
];
