import { request, gql, GraphQLClient } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphqlToken = process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN;

export const getPosts = async () => {
  const query = gql`
  query GetPosts {
    postsConnection(orderBy: createdAt_DESC) {
      edges {
        node {
          slug
          title
          parentId
          description
          createdAt
          views
          author {
            ... on Author {
              id
              name
              avatar {
                url
              }
            }
          }
          categories {
            ... on Category {
              id
              name
              slug
            }
          }
          featuredImage {
            url
          }
        }
      }
    }
  }`;

  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.categories;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: {slug: $slug}) {
        author {
          ... on Author {
            id
            name
            avatar {
              url
            }
          }
        }
        categories {
          ... on Category {
            id
            name
            slug
          }
        }
        isShowFeaturedImage
        description
        slug
        title
        content {
          raw
        }
        id
        score
        views
        createdAt
        parentId
        featuredImage {
          url
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query getSimilarPosts($slug: String!, $categories: [String!]) {
      categories(where: {slug_in: $categories, posts_some: {slug_not: $slug}}, orderBy: createdAt_DESC) {
        posts(last: 5) {
          slug
          title
          createdAt
          author {
            ... on Author {
              id
              name
              avatar {
                url
              }
            }
          }
          categories {
            ... on Category {
              id
              name
              slug
            }
          }
          featuredImage {
            url
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, categories });

  return result.length ?  result.categories[0].posts : [];
};

export const getPostsSameAuthor = async (authorId) => {
  const query = gql`
    query getPostsSameAuthor($authorId: ID!) {
      author(where: {id: $authorId}) {
        posts(last: 5) {
          slug
          title
          createdAt
          featuredImage {
            url
          }
          author {
            ... on Author {
              id
              name
              avatar {
                fileName
              }
            }
          }
        }
      }
    }`
  const response = await request(graphqlAPI, query, { authorId });
  const result = response.author.posts;

  return result || [];
}

export const getPostsSameSeries = async (selfId,id, parentId) => {
  const query = gql`
  query getPostsSameSeries($id: ID, $selfId: ID, $parentId: String) {
    posts(where: {
      OR: [{ id: $id }, { parentId: $parentId }], NOT: {id: $selfId}
    }) {
      slug
      title
      createdAt
      featuredImage {
        url
      }
      author {
        ... on Author {
          id
          name
          avatar {
            fileName
          }
        }
      }
    }
  }`
  const response = await request(graphqlAPI, query, { selfId, id, parentId });
  const result = response.posts;

  return result || [];
}

export const getCategoryPost = async (slug, first, skip) => {
  const query = gql`
  query getCategoryPost($slug:String, $first: Int, $skip: Int) {
    posts(
      where: {categories_every: {slug: $slug}}
      orderBy: publishedAt_DESC
      first: $first
      skip: $skip
    ) {
      author {
        ... on Author {
          id
          name
          avatar {
            url
          }
        }
      }
      categories {
        ... on Category {
          id
          name
          slug
        }
      }
      isShowFeaturedImage
      description
      slug
      title
      content {
        raw
      }
      id
      score
      views
      createdAt
      parentId
      featuredImage {
        url
      }
    }
    postsConnection(where: {categories_every: {slug: $slug}}) {
      aggregate {
        count
      }
    }
  }`;

  const result = await request(graphqlAPI, query, { slug, first, skip });

  return [result.posts, result.postsConnection.aggregate.count];
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query getFeaturedPosts {
      posts(where: {featuredPost: true}) {
        title
        slug
        createdAt
        views
        author {
          ... on Author {
            id
            name
            avatar {
              url
            }
          }
        }
        featuredImage {
          url
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug:String!) {
      comments(where: {post: {slug: $slug}}, orderBy: createdAt_DESC) {
        content
        username
        email
        createdAt
        id
        comments {
          content
          username
          email
          createdAt
          id
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
};

export const publishComment = async (id) => {
  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: "Bearer " + graphqlToken,
    },
  });

  const query = gql`
    mutation PublishComment($id: ID){
      publishComment(where: { id: $id }, to: PUBLISHED) {
        id
        post {
          slug
        }
      }
    }
  `;

  const result = await graphQLClient.request(query, {id});

  return result.publishComment;
};

export const getRecentPosts = async () => {
  const query = gql`
    query getRecentPosts() {
      posts(
        orderBy: createdAt_DESC
        last: 5
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getAboutMe = async () => {
  const query = gql`
    query getAboutMe {
      aboutMes(first: 1) {
        avatar {
          url
        }
        aboutMe {
          raw
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.aboutMes[0];
};

export const searchPosts = async (keyword, first, skip) => {
  const query = gql`
  query searchPosts($keyword: String, $first: Int, $skip: Int) {
    posts(
      where: {OR: [{title_contains: $keyword}, {slug_contains: $keyword}, {description_contains: $keyword}]}
      orderBy: publishedAt_DESC
      first: $first
      skip: $skip
    ) {
      slug
      title
      description
      createdAt
      views
      author {
        ... on Author {
          id
          name
          avatar {
            url
          }
        }
      }
      featuredImage {
        url
      }
    }
    postsConnection {
      aggregate {
        count
      }
    }
  }
`;

const result = await request(graphqlAPI, query, { keyword, first, skip });

return [result.posts, result.postsConnection.aggregate.count];
};
