import React from 'react';
import { usePreloadedQuery } from 'react-relay/hooks';
import { PreloadedQuery } from 'react-relay/lib/relay-experimental/EntryPointTypes';
import graphql from 'babel-plugin-relay/macro';

import Issues from './Issues';
import { HomeRootIssuesQuery } from './__generated__/HomeRootIssuesQuery.graphql';

type Props = {
  prepared: {
    issuesQuery: PreloadedQuery<HomeRootIssuesQuery>;
  };
};

/**
 * The root component for the home route.
 */
export default function HomeRoot(props: Props) {
  // Defines *what* data the component needs via a query. The responsibility of
  // actually fetching this data belongs to the route definition: it calls
  // preloadQuery() with the query and variables, and the result is passed
  // on props.prepared.issuesQuery - see src/routes.js
  const data = usePreloadedQuery<HomeRootIssuesQuery>(
    graphql`
      query HomeRootIssuesQuery($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
          # Compose the data dependencies of child components
          # by spreading their fragments:
          ...Issues_repository
        }
      }
    `,
    props.prepared.issuesQuery,
  );
  const { repository } = data;

  return <Issues repository={repository!} />;
}
