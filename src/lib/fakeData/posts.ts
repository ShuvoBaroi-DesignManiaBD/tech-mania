"use client";
import { IPostCard } from "@/types/post.type";

export const postsData: IPostCard[] = [
    {
      id: "1",
      author: {
        name: "John Doe",
        image: "https://randomuser.me/api/portraits/men/10.jpg",
        id: "u001",
      },
      content: {
        image: "https://via.placeholder.com/600x300",
        text: "This is an example post content with an image. Sharing some thoughts on the project.",
      },
      upVotes: 15,
      downVotes: 3,
      commentsCount: 2,
      comments: [
        {
          author: {
            id: "u002",
            image: "https://randomuser.me/api/portraits/women/5.jpg",
            name: "Jane Smith",
          },
          comment: "Great post, John! I completely agree with your points.",
          upVotes: 5,
          downVotes: 0,
          repliesCount: 1,
          replies: [
            {
              author: {
                id: "u003",
                image: "https://randomuser.me/api/portraits/men/20.jpg",
                name: "Mike Johnson",
              },
              reply: "Absolutely, Jane! This could really help with our project discussions.",
            },
            {
              author: {
                id: "u003",
                image: "https://randomuser.me/api/portraits/men/20.jpg",
                name: "Mike Johnson",
              },
              reply: "Absolutely, Jane! This could really help with our project discussions.",
            },
            {
              author: {
                id: "u003",
                image: "https://randomuser.me/api/portraits/men/20.jpg",
                name: "Mike Johnson",
              },
              reply: "Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions.Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions.Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions.Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions.Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions.Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions.Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions.Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions.Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions.Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions.Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions.Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions. Absolutely, Jane! This could really help with our project discussions.",
            },
            {
              author: {
                id: "u003",
                image: "https://randomuser.me/api/portraits/men/20.jpg",
                name: "Mike Johnson",
              },
              reply: "Absolutely, Jane! This could really help with our project discussions.Absolutely, Jane! This could really help with our project discussions.",
            },
          ],
        },
        {
          author: {
            id: "u004",
            image: "https://randomuser.me/api/portraits/men/35.jpg",
            name: "David Green",
          },
          comment: "Thanks for sharing, John. This was a helpful read!",
          upVotes: 2,
          downVotes: 1,
          repliesCount: 0,
          replies: [],
        },
      ],
      createdAt: "2023-10-01T10:20:30Z",
    },
    {
      id: "2",
      author: {
        name: "Sarah Connor",
        image: "https://randomuser.me/api/portraits/women/12.jpg",
        id: "u004",
      },
      content: {
        image: null,
        text: "Here’s a quick update on the project. We’re making progress, but there’s a lot left to do!",
      },
      upVotes: 10,
      downVotes: 1,
      commentsCount: 1,
      comments: [
        {
          author: {
            id: "u005",
            image: "https://randomuser.me/api/portraits/men/35.jpg",
            name: "David Brown",
          },
          comment: "Thanks for the update, Sarah. Let me know if you need any help!",
          upVotes: 3,
          downVotes: 0,
          repliesCount: 2,
          replies: [
            {
              author: {
                id: "u004",
                image: "https://randomuser.me/api/portraits/women/12.jpg",
                name: "Sarah Connor",
              },
              reply: "Thanks, David! I’ll reach out if I need support.",
            },
            {
              author: {
                id: "u006",
                image: "https://randomuser.me/api/portraits/women/25.jpg",
                name: "Emily White",
              },
              reply: "Good luck, Sarah! Looking forward to the final outcome.",
            },
          ],
        },
      ],
      createdAt: "2023-09-28T14:35:00Z",
    },
    {
      id: "3",
      author: {
        name: "Michael Scott",
        image: "https://randomuser.me/api/portraits/men/22.jpg",
        id: "u007",
      },
      content: {
        image: null,
        text: "Just finished a brainstorming session. Some really great ideas for the next quarter!",
      },
      upVotes: 8,
      downVotes: 2,
      commentsCount: 0,
      comments: [],
      createdAt: "2023-10-02T09:10:15Z",
    },
    {
      id: "4",
      author: {
        name: "Anna Taylor",
        image: "https://randomuser.me/api/portraits/women/18.jpg",
        id: "u008",
      },
      content: {
        image: "https://via.placeholder.com/600x300",
        text: "Check out this amazing view from my recent trip. Nature is so refreshing!",
      },
      upVotes: 20,
      downVotes: 4,
      commentsCount: 1,
      comments: [
        {
          author: {
            id: "u009",
            image: "https://randomuser.me/api/portraits/men/45.jpg",
            name: "John Williams",
          },
          comment: "Wow, Anna! That looks like a wonderful place. Where is it?",
          upVotes: 7,
          downVotes: 0,
          repliesCount: 1,
          replies: [
            {
              author: {
                id: "u008",
                image: "https://randomuser.me/api/portraits/women/18.jpg",
                name: "Anna Taylor",
              },
              reply: "It’s in the Swiss Alps! Highly recommend visiting if you get the chance.",
            },
          ],
        },
      ],
      createdAt: "2023-09-25T16:10:00Z",
    },
  ];
  