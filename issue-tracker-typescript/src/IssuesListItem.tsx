import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import Link from './routing/Link';
import { IssuesListItem_issue$key } from './__generated__/IssuesListItem_issue.graphql';

/**
 * Renders a single item (issue) in the issues list.
 */
export default function IssuesListItem(props: {
  issue: IssuesListItem_issue$key;
}) {
  // Given a reference to a specific issue - props.issue - define *what*
  // data the component needs about the issue in order to render it.
  // Note that Relay will only give the component access to the exact fields
  // defined in the fragment. Relay will also subscribe for updates to just
  // those fields, updating the component if the values change due to a mutation
  // or the data being refetched.
  const issue = useFragment<IssuesListItem_issue$key>(
    graphql`
      fragment IssuesListItem_issue on Issue {
        id
        title
      }
    `,
    props.issue,
  );

  // Describe how to render the data:
  return <Link to={`/issue/${issue.id}`}>{issue.title}</Link>;
}
