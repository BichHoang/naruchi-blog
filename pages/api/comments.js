import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */

// export a default function for API route to work
export default async function asynchandler(req, res) {
  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
    },
  });

  const query = gql`
    mutation CreateComment($username: String!, $email: String!, $content: String!, $slug: String!) {
      createComment(data: {username: $username, email: $email, content: $content, post: {connect: {slug: $slug}}}) { id }
    }
  `;

  const result = await graphQLClient.request(query, {
    username: req.body.username,
    email: req.body.email,
    content: req.body.content,
    slug: req.body.slug,
  });

  return res.status(200).send(result);
}
